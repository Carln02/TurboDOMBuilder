import {linearInterpolation} from "../../../utils/computations/interpolation";
import {trim} from "../../../utils/computations/misc";
import {TurboSelectWheelProperties, TurboSelectWheelStylingProperties} from "./selectWheel.types";
import {Reifect} from "../../wrappers/reifect/reifect";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {$, turbo} from "../../../turboFunctions/turboFunctions";
import {auto} from "../../../decorators/auto/auto";
import {TurboDragEvent} from "../../../eventHandling/events/turboDragEvent";
import {Direction, Range} from "../../../types/enums.types";
import {DefaultEventName} from "../../../types/eventNaming.types";
import {Point} from "../../datatypes/point/point";
import {PartialRecord} from "../../../types/basic.types";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {StatelessReifectProperties} from "../../wrappers/reifect/reifect.types";
import {Propagation} from "../../../turboFunctions/event/event.types";
import {TurboSelectElement} from "../../basics/selectElement/selectElement";

/**
 * @class TurboSelectWheel
 * @group Components
 * @category TurboSelectWheel
 *
 * @extends TurboSelectElement
 * @description A swipeable selection wheel. Entries are always position absolute, fanned out by a
 * continuous pixel offset. Dragging moves all entries in real time; releasing snaps to the nearest.
 * The container sizes to the selected entry. Visual state is driven by `entryTransitionReifect`
 * (CSS transitions) and `computeAndApplyStyling` (per-entry opacity/scale/transform).
 */
class TurboSelectWheel<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboSelectElement<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType> {
    public static defaultProperties = {transitionDuration: 0.3};

    public declare readonly properties: TurboSelectWheelProperties<ValueType, SecondaryValueType, EntryType,
        ViewType, DataType, ModelType, EmitterType>;

    private _currentPosition: number = 0;
    private _index: number = 0;

    protected readonly sizePerEntry: number[] = [];
    protected readonly positionPerEntry: number[] = [];
    protected totalSize: number = 0;

    public dragLimitOffset: number = 30;
    public openTimeout: number = 3000;
    public direction: Direction = Direction.horizontal;
    public scale: Record<Range, number> = {max: 1, min: 0.5};

    public generateCustomStyling: (properties: TurboSelectWheelStylingProperties)
        => string | PartialRecord<keyof CSSStyleDeclaration, string | number>;

    protected dragging: boolean = false;
    protected openTimer: ReturnType<typeof setTimeout>;

    public initialize(): void {
        const initEntry = (entry: EntryType) => {
            turbo(entry).setStyles({position: "absolute", whiteSpace: "nowrap"}, true);
            this.entryTransitionReifect?.attach(entry);
            this.customReifect?.attach(entry);

            turbo(entry)
                .on(DefaultEventName.dragStart, () => {
                    this.clearOpenTimer();
                    this.open = true;
                    this.dragging = true;
                    // Remove transitions instantly so the first drag frame isn't animated.
                    if (this.entryTransitionReifect) this.entryTransitionReifect.unapply(undefined, {applyStylesInstantly: true});
                    this.reloadEntrySizes();
                    return Propagation.stopImmediatePropagation;
                })
                .on(DefaultEventName.drag, (e: TurboDragEvent) => {
                    if (!this.dragging) return;
                    this.currentPosition += this.computeDragDelta(e.scaledDeltaPosition);
                    return Propagation.stopImmediatePropagation;
                })
                .on(DefaultEventName.dragEnd, () => {
                    if (!this.dragging) return;
                    this.dragging = false;
                    // recomputeProperties is required because unapplyStyles() clears resolvedValues.styles,
                    // so apply() without it finds styles["default"] === undefined and returns early,
                    // never calling reloadReifectsChainableStyles — leaving transition: "none" stuck.
                    if (this.entryTransitionReifect) this.entryTransitionReifect.apply(undefined, {recomputeProperties: true});
                    this.snapToNearest();
                    if (!this.alwaysOpen) this.setOpenTimer();
                    return Propagation.stopImmediatePropagation;
                });

            requestAnimationFrame(() => this.reloadEntrySizes());
        };

        this.select.onEntryAdded.add(initEntry);

        this.select.onEntryRemoved.add(entry => {
            this.entryTransitionReifect?.detach(entry);
            this.customReifect?.detach(entry);
            requestAnimationFrame(() => this.reloadEntrySizes());
        });

        super.initialize();

        turbo(this).setStyles({display: "inline-block", position: "relative", overflow: "hidden"});

        // Entries set via create({values: [...]}) fire onEntryAdded before initialize() has a
        // chance to add the callback above. Replay initEntry for any such pre-existing entries.
        this.entries.forEach(initEntry);
    }

    @auto({
        defaultValue: {max: 1, min: 0},
        preprocessValue: (value) => ({
            max: trim(value?.max ?? 1, 1),
            min: trim(value?.min ?? 0, 1),
        }),
    }) public opacity: Record<Range, number>;

    @auto({
        defaultValue: {max: 100, min: -100},
        preprocessValue: (value) =>
            typeof value === "object" ? value : {max: value ?? 100, min: -(value ?? 100)},
    }) public set size(value: Record<Range, number> | number) {
    }

    public get size(): Record<Range, number> {
        return;
    }

    @auto({
        preprocessValue: function (value) {
            if (!value) return;
            if (value instanceof Reifect) return value;
            return new Reifect(value);
        }
    }) public set entryTransitionReifect(value: Reifect | StatelessReifectProperties) {
        if (!value) return;
        if (this.entries.length > 0) value.attach(...this.entries);
    }

    public get entryTransitionReifect(): Reifect {
        return;
    }

    @auto({override: true}) public set transitionDuration(value: number) {
        if (value <= 0) return;
        if (!this.entryTransitionReifect) this.entryTransitionReifect = new Reifect({});
        this.entryTransitionReifect.styles = `transition: transform ${value}s ease-in-out, opacity ${value}s ease-in-out`;
    }

    @auto({
        preprocessValue: function (value) {
            if (!value) return null;
            if (value instanceof Reifect) return value;
            return new Reifect(value as StatelessReifectProperties);
        },
    }) public set customReifect(value: Reifect | StatelessReifectProperties | null) {
        if (this.customReifect && this.entries.length > 0) this.customReifect.attach(...this.entries);
    }

    public get customReifect(): Reifect {
        return;
    }

    private readonly _closeOnClick = () => this.open = false;

    @auto({defaultValue: false}) public set alwaysOpen(value: boolean) {
        if (value) turbo(document.body).removeListener(DefaultEventName.click, this._closeOnClick);
        else turbo(document.body).on(DefaultEventName.click, this._closeOnClick);
        this.open = value;
    }

    @auto() public set open(value: boolean) {
        turbo(this).setStyle("overflow", value ? "visible" : "hidden");
        // When opening, entries may have had zero layout size if the wheel was off-screen or
        // hidden when first populated. Reload now that the wheel is visible.
        if (value) requestAnimationFrame(() => this.reloadEntrySizes());
    }

    public get isVertical() {
        return this.direction === Direction.vertical;
    }

    /** Fractional index — integer when snapped, fractional mid-drag. */
    public get index(): number {
        return this._index;
    }

    protected set index(value: number) {
        this._index = value;
        this.select.selectByIndex(trim(Math.round(value), this.entries.length - 1));
    }

    // -------------------------------------------------------------------------
    // Position
    // -------------------------------------------------------------------------

    public get currentPosition(): number {
        return this._currentPosition;
    }

    protected set currentPosition(value: number) {
        if (!this.sizePerEntry.length) return;
        const min = -this.dragLimitOffset - this.sizePerEntry[0] / 2;
        const max = this.totalSize + this.dragLimitOffset - this.sizePerEntry[this.sizePerEntry.length - 1] / 2;
        this._currentPosition = Math.min(Math.max(value, min), max);
        this._index = this.positionToIndex(this._currentPosition);
        this.applyAllEntryStyles();
    }

    protected computeDragDelta(delta: Point): number {
        return -delta[this.isVertical ? "y" : "x"];
    }

    // -------------------------------------------------------------------------
    // Layout
    // -------------------------------------------------------------------------

    protected reloadEntrySizes() {
        this.sizePerEntry.length = 0;
        this.positionPerEntry.length = 0;
        this.totalSize = 0;

        this.entries.forEach(entry => {
            const size = entry[this.isVertical ? "offsetHeight" : "offsetWidth"];
            this.sizePerEntry.push(size);
            this.positionPerEntry.push(this.totalSize);
            this.totalSize += size;
        });

        if (!this.sizePerEntry.length) {
            this._currentPosition = 0;
            return;
        }
        // If the wheel or its ancestors weren't in layout yet (e.g. off-screen, hidden, or
        // added to the DOM after entries were created), all sizes read as 0. Retry next frame
        // so the browser has time to perform layout.
        if (this.totalSize === 0) {
            requestAnimationFrame(() => this.reloadEntrySizes());
            return;
        }
        this._currentPosition = this.indexToPosition(this._index);
        this.applyAllEntryStyles();
        if (this.selectedIndex >= 0) this.applyTransition();
    }

    protected indexToPosition(index: number): number {
        if (!this.sizePerEntry.length) return 0;
        if (index < 0) return -Math.abs(index) * this.sizePerEntry[0];
        if (index >= this.sizePerEntry.length)
            return this.totalSize - this.sizePerEntry[this.sizePerEntry.length - 1] / 2;
        const floor = trim(Math.floor(index), this.sizePerEntry.length - 1);
        return this.positionPerEntry[floor] + this.sizePerEntry[floor] * (index - Math.floor(index));
    }

    protected positionToIndex(position: number): number {
        if (!this.positionPerEntry.length) return 0;
        let i = 0;
        while (i < this.positionPerEntry.length - 1 && this.positionPerEntry[i + 1] <= position) i++;
        if (i >= this.sizePerEntry.length - 1) return i;
        return i + Math.min((position - this.positionPerEntry[i]) / (this.sizePerEntry[i] || 1), 1);
    }

    protected snapToNearest() {
        const nearest = trim(Math.round(this.positionToIndex(this._currentPosition)), this.entries.length - 1);
        this.index = nearest;
        this._currentPosition = this.indexToPosition(nearest);
        this.applyAllEntryStyles();
    }

    // -------------------------------------------------------------------------
    // Transition (overrides TurboSelectElement — wheel sizes to selected entry directly)
    // -------------------------------------------------------------------------

    protected applyTransition() {
        const i = this.selectedIndex;
        if (i < 0) return;

        this._index = i;
        this._currentPosition = this.indexToPosition(i);
        this.applyAllEntryStyles();

        // Size container to selected entry
        if (this.sizePerEntry.length) {
            const entry = this.entries[i] as HTMLElement;
            const w = this.isVertical ? entry.offsetWidth : this.sizePerEntry[i];
            const h = this.isVertical ? this.sizePerEntry[i] : entry.offsetHeight;
            $(this).setStyles({width: `${w}px`, height: `${h}px`});
        }
    }

    // -------------------------------------------------------------------------
    // Styling
    // -------------------------------------------------------------------------

    protected applyAllEntryStyles() {
        // Apply instantly during drag so transforms aren't queued behind a rAF while a CSS
        // transition is still active on the element, which would cause visual lag.
        const instant = this.dragging;
        this.entries.forEach((el, i) => {
            const translationValue = (this.positionPerEntry[i] ?? 0) - this._currentPosition;
            if (this.customReifect) {
                this.customReifect.apply(el as any, {recomputeProperties: true});
            } else {
                this.computeAndApplyStyling(el, translationValue, undefined, instant);
            }
        });
    }

    protected computeAndApplyStyling(
        element: HTMLElement,
        translationValue: number,
        size: Record<Range, number> = this.size,
        instant: boolean = false,
    ) {
        const bound = translationValue > 0 ? size.max : size.min;
        const opacityValue = linearInterpolation(translationValue, 0, bound, this.opacity.max, this.opacity.min);
        const scaleValue = linearInterpolation(translationValue, 0, bound, this.scale.max, this.scale.min);

        // `transition` is a "chainable style field" — Reifect.unapply() clears its own
        // resolved state but reloadReifectsChainableStyles() only writes keys that still
        // have an active contribution, so the old inline transition is never explicitly
        // removed. Writing "none" here overrides it every drag frame.
        let styles: string | PartialRecord<keyof CSSStyleDeclaration, string | number> = {
            left: "50%",
            top: "50%",
            opacity: opacityValue,
            ...(instant && {transition: "none"}),
            transform: `translate3d(
                calc(${!this.isVertical ? translationValue : 0}px - 50%),
                calc(${this.isVertical ? translationValue : 0}px - 50%),
                0) scale3d(${scaleValue}, ${scaleValue}, 1)`,
        };

        if (this.generateCustomStyling) styles = this.generateCustomStyling({
            element, translationValue, opacityValue, scaleValue, size, defaultComputedStyles: styles,
        });

        $(element).setStyles(styles, instant);
    }

    // -------------------------------------------------------------------------
    // Timer helpers
    // -------------------------------------------------------------------------

    protected clearOpenTimer() {
        if (this.openTimer) clearTimeout(this.openTimer);
    }

    protected setOpenTimer() {
        this.clearOpenTimer();
        if (typeof this.openTimeout !== "number" || this.openTimeout < 0) return;
        this.openTimer = setTimeout(() => this.open = false, this.openTimeout);
    }
}

define(TurboSelectWheel);
export {TurboSelectWheel};