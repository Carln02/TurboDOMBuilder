import {linearInterpolation} from "../../../utils/computations/interpolation";
import {trim} from "../../../utils/computations/misc";
import {TurboSelectWheelProperties, TurboSelectWheelStylingProperties} from "./selectWheel.types";
import {Reifect} from "../../wrappers/reifect/reifect";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {$, turbo} from "../../../turboFunctions/turboFunctions";
import {auto} from "../../../decorators/auto/auto";
import {TurboDragEvent} from "../../../eventHandling/events/turboDragEvent";
import {TurboElement} from "../../../turboElement/turboElement";
import {Direction, Range} from "../../../types/enums.types";
import {DefaultEventName} from "../../../types/eventNaming.types";
import {Point} from "../../datatypes/point/point";
import {PartialRecord} from "../../../types/basic.types";
import {TurboEmitter} from "../../../mvc/core/emitter";
import {element} from "../../../elementCreation/element";
import {expose} from "../../../decorators/expose";
import {TurboSelect} from "../../basics/select/select";
import {StatelessReifectProperties} from "../../wrappers/reifect/reifect.types";

/**
 * @class TurboSelectWheel
 * @group Components
 * @category TurboSelectWheel
 *
 * @extends TurboSelect
 * @description Class to create a dynamic selection wheel.
 * @template {string} ValueType
 * @template {TurboSelectEntry<ValueType, any>} EntryType
 */
@define("turbo-select-wheel")
class TurboSelectWheel<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    public selector: TurboSelect<ValueType, SecondaryValueType, EntryType>;

    @expose("selector") public accessor entries: EntryType[];
    @expose("selector") public accessor values: ValueType[];
    @expose("selector", false) public accessor selectedEntry: EntryType;
    @expose("selector", false) public accessor selectedValue: ValueType;

    private _currentPosition: number = 0;

    protected readonly sizePerEntry: number[] = [];
    protected readonly positionPerEntry: number[] = [];
    protected totalSize: number = 0;

    public dragLimitOffset: number = 30;

    /**
     * @description Hides after the set time has passed. Set to a negative value to never hide the wheel. In ms.
     */
    public openTimeout: number = 3000;
    public direction: Direction = Direction.horizontal;
    public scale: Record<Range, number> = {max: 1, min: 0.5};

    public generateCustomStyling: (properties: TurboSelectWheelStylingProperties)
        => string | PartialRecord<keyof CSSStyleDeclaration, string | number>;

    protected dragging: boolean;
    protected openTimer: NodeJS.Timeout;


    public initialize(): void {
        this.selector = new TurboSelect();
        this.selector.multiSelection = false;
        this.selector.forceSelection = true;

        this.selector.onSelectDelegate.add((b) => {
            if (!b) return;
            this.open = true;
            if (!this.alwaysOpen) this.setOpenTimer();
        });

        this.selector.onEntryRemoved.add((entry) => this.reifect?.detach(entry));
        this.selector.onEntryAdded.add((entry) => {
            if (entry instanceof Element && entry.parentElement) {
                this.reifect?.attach(entry);
                this.reloadEntrySizes();
            }

            let showTimer: NodeJS.Timeout;
            turbo(entry)
                .setStyles({position: "absolute"})
                .on(DefaultEventName.dragStart, (e: Event) => {
                    e.stopImmediatePropagation();
                    this.clearOpenTimer();
                    this.open = true;
                    this.dragging = true;
                    this.reifect.enabled.transition = false;
                    this.reloadEntrySizes();
                })
                .on("pointerover", () => {
                    clearTimeout(showTimer);
                    showTimer = setTimeout(() => this.open = true, 1000);
                })
                .on("pointerout", () => {
                    if (showTimer) clearTimeout(showTimer);
                    showTimer = null;
                });

            this.refresh();
        });

        super.initialize();
        this.refresh();

        turbo(this).setStyles({display: "block", position: "relative"});
    }

    @auto({
        defaultValue: {max: 1, min: 0},
        preprocessValue: (value) => {
            return {
                max: trim(value?.max, 1),
                min: trim(value?.min, 1)
            }
        }
    }) public opacity: Record<Range, number>;

    @auto({
        preprocessValue: (value) => typeof value == "object" ? value : {max: value ?? 100, min: -(value ?? 100)}
    }) public set size(value: Record<Range, number> | number) {}

    public get size(): Record<Range, number> {return}

    @auto({
        preprocessValue: function (value) {
            if (value instanceof Reifect) return value;
            if (!value) value = {};
            if (!value.transitionProperties) value.transitionProperties = "opacity transform";
            if (value.transitionDuration == undefined) value.transitionDuration = 0.2;
            if (!value.transitionTimingFunction) value.transitionTimingFunction = "ease-in-out";
            return new Reifect(value);
        }
    }) public get reifect(): Reifect {return}

    public set reifect(value: Reifect | StatelessReifectProperties) {
        this.reifect.attachAll(...this.entries);
    }

    private readonly closeOnClick = () => this.open = false;

    @auto({defaultValue: false}) public set alwaysOpen(value: boolean) {
        if (value) turbo(document.body).removeListener(DefaultEventName.click, this.closeOnClick);
        else turbo(document.body).on(DefaultEventName.click, this.closeOnClick);
        this.open = value;
    }

    public get isVertical() {
        return this.direction == Direction.vertical;
    }

    @auto({cancelIfUnchanged: false}) public set index(value: number) {
        this.selector.selectByIndex(this.trimmedIndex);
    }

    protected get trimmedIndex() {
        return trim(Math.round(this.index), this.entries.length - 1);
    }

    protected get flooredTrimmedIndex() {
        return trim(Math.floor(this.index), this.entries.length - 1);
    }

    @auto() public set open(value: boolean) {
        turbo(this).setStyle("overflow", value ? "visible" : "hidden");
    }

    public get currentPosition(): number {
        return this._currentPosition;
    }

    protected set currentPosition(value: number) {
        const min = -this.dragLimitOffset - this.sizePerEntry[0] / 2;
        const max = this.totalSize + this.dragLimitOffset - this.sizePerEntry[this.sizePerEntry.length - 1] / 2;

        if (value < min) value = min;
        if (value > max) value = max;

        this._currentPosition = value;
        const elements = this.reifect.getEnabledObjectsData();
        if (elements.length === 0) return;

        elements.forEach((el, index) =>
            this.computeAndApplyStyling(el.object.deref() as HTMLElement, this.positionPerEntry[index] - value));
    }

    protected setupUIListeners() {
        super.setupUIListeners();

        turbo(document.body)
            .on(DefaultEventName.drag, (e: TurboDragEvent) => {
                if (!this.dragging) return;
                e.stopImmediatePropagation();
                this.currentPosition += this.computeDragValue(e.scaledDeltaPosition);
            })
            .on(DefaultEventName.dragEnd, (e: TurboDragEvent) => {
                if (!this.dragging) return;
                e.stopImmediatePropagation();
                this.dragging = false;
                this.recomputeIndex();
                // this.snapTo(this.trimmedIndex);
                if (!this.alwaysOpen) this.setOpenTimer();
            });
    }

    protected computeDragValue(delta: Point): number {
        return -delta[this.isVertical ? "y" : "x"];
    }

    /**
     * Recalculates the dimensions and positions of all entries
     */
    protected reloadEntrySizes() {
        if (!this.reifect) return;

        this.sizePerEntry.length = 0;
        this.positionPerEntry.length = 0;
        this.totalSize = 0;

        this.reifect.getEnabledObjectsData().forEach(entry => {
            const object = entry.object.deref();
            const size = object ? object[this.isVertical ? "offsetHeight" : "offsetWidth"] : 0;
            this.sizePerEntry.push(size);
            this.positionPerEntry.push(this.totalSize);
            this.totalSize += size;
        });
        const flooredIndex = Math.floor(this.index);
        const indexOffset = this.index - Math.floor(this.index);

        this.currentPosition = 0;
        if (this.index < 0) this.currentPosition = -Math.abs(this.index) * this.sizePerEntry[0];
        else if (this.index >= this.sizePerEntry.length) this.currentPosition =
            (this.index - this.sizePerEntry.length + 1) * this.sizePerEntry[this.sizePerEntry.length - 1];
        else this.currentPosition = this.positionPerEntry[flooredIndex] + this.sizePerEntry[flooredIndex] * indexOffset;
    }

    protected recomputeIndex() {
        let index = 0;
        while (index < this.positionPerEntry.length - 1 && this.positionPerEntry[index + 1] < this.currentPosition) index++;
        if (this.currentPosition - this.positionPerEntry[index] > this.sizePerEntry[index + 1] / 2) index++;
        this.index = index;
    }

    protected computeAndApplyStyling(element: HTMLElement, translationValue: number, size: Record<Range, number> = this.size) {
        let opacityValue: number, scaleValue: number;
        const bound = translationValue > 0 ? size.max : size.min;
        opacityValue = linearInterpolation(translationValue, 0, bound, this.opacity.max, this.opacity.min);
        scaleValue = linearInterpolation(translationValue, 0, bound, this.scale.max, this.scale.min);

        let styles: string | PartialRecord<keyof CSSStyleDeclaration, string | number> = {
            left: "50%", top: "50%", opacity: opacityValue, transform: `translate3d(
            calc(${!this.isVertical ? translationValue : 0}px - 50%),
            calc(${this.isVertical ? translationValue : 0}px - 50%),
            0) scale3d(${scaleValue}, ${scaleValue}, 1)`
        };

        if (this.generateCustomStyling) styles = this.generateCustomStyling({
            element: element,
            translationValue: translationValue,
            opacityValue: opacityValue,
            scaleValue: scaleValue,
            size: size,
            defaultComputedStyles: styles
        });

        $(element).setStyles(styles);
    }

    public select(entry: ValueType | EntryType, selected: boolean = true): this {
        // super.select(entry, selected);
        if (entry === undefined || entry === null) return this;

        const index = this.selector.getIndex(this.selectedEntry);
        if (index != this.index) this.index = index;

        if (this.reifect) {
            this.reifect.enabled.transition = true;
            this.reloadEntrySizes();
        }

        const computedStyle = getComputedStyle(this.selectedEntry);
        $(this).setStyles({minWidth: computedStyle.width, minHeight: computedStyle.height}, true);
        return this;
    }

    public clear(): void {
        this.reifect.detach(...this.entries);
        this.selector.clear();
    }

    public refresh() {
        if (this.selectedEntry) this.select(this.selectedEntry);
        else this.reset();
    }

    public reset() {
        this.select(this.entries[0]);
    }

    protected clearOpenTimer() {
        if (this.openTimer) clearTimeout(this.openTimer);
    }

    protected setOpenTimer() {
        this.clearOpenTimer();
        if (typeof this.openTimeout !== "number" || this.openTimeout < 0) return;
        this.openTimer = setTimeout(() => this.open = false, this.openTimeout);
    }
}

function selectWheel<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
>(
    properties: TurboSelectWheelProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType>
): TurboSelectWheel<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType> {
    turbo(properties).applyDefaults({tag: "turbo-select-wheel"});
    return element({...properties}) as TurboSelectWheel<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType>;
}

export {TurboSelectWheel, selectWheel};