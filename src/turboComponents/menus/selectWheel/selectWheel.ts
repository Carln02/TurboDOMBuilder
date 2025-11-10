import {linearInterpolation} from "../../../utils/computations/interpolation";
import {trim} from "../../../utils/computations/misc";
import {TurboSelectWheelProperties, TurboSelectWheelStylingProperties} from "./selectWheel.types";
import {Reifect} from "../../wrappers/reifect/reifect";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {$} from "../../../turboFunctions/turboFunctions";
import {auto} from "../../../decorators/auto/auto";
import {TurboDragEvent} from "../../../eventHandling/events/turboDragEvent";
import {TurboElement} from "../../../turboElement/turboElement";
import {Direction, Range} from "../../../types/enums.types";
import {DefaultEventName} from "../../../types/eventNaming.types";
import {Point} from "../../datatypes/point/point";
import {PartialRecord} from "../../../types/basic.types";

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
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboElement<ViewType, DataType, ModelType> {
    private _currentPosition: number = 0;
    private _reifect: Reifect;
    private _size: Record<Range, number> = {max: 100, min: -100};

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

    // public constructor(properties: TurboSelectWheelProperties<ValueType, SecondaryValueType, EntryType, ViewType,
    //     DataType, ModelType>) {
    //     properties.multiSelection = false;
    //     properties.forceSelection = true;
    //     super();
    //
    //     if (properties.scale) this.scale = properties.scale;
    //     if (properties.direction) this.direction = properties.direction;
    //
    //     this.opacity = properties.opacity ?? {max: 1, min: 0};
    //     this.size = properties.size;
    //     this.generateCustomStyling = properties.generateCustomStyling;
    //     this.reifect = properties.styleReifect;
    //
    //     $(this).setStyles({display: "block", position: "relative"});
    //     this.alwaysOpen = properties.alwaysOpen ?? false;
    //
    //     // this.initializeUI();
    //
    //     if (properties.selectedValues?.length > 0) this.select(properties.selectedValues[0]);
    //     requestAnimationFrame(() => this.refresh());
    // }
    //
    // public connectedCallback() {
    //     //TODO super.connectedCallback();
    //     requestAnimationFrame(() => this.refresh());
    // }
    //
    // @auto({preprocessValue: (value) => trim(value, 1)})
    // public set opacity(value: Record<Range, number>) {}
    //
    // public get size(): Record<Range, number> {
    //     return this._size;
    // }
    //
    // public set size(value: Record<Range, number> | number) {
    //     this._size = typeof value == "object" ? value : {max: value ?? 100, min: -(value ?? 100)};
    // }
    //
    // public get reifect(): Reifect {
    //     return this._reifect;
    // }
    //
    // public set reifect(value: Reifect | StatelessReifectProperties) {
    //     if (value instanceof Reifect) this._reifect = value;
    //     else {
    //         if (!value) value = {};
    //         if (!value.transitionProperties) value.transitionProperties = "opacity transform";
    //         if (value.transitionDuration == undefined) value.transitionDuration = 0.2;
    //         if (!value.transitionTimingFunction) value.transitionTimingFunction = "ease-in-out";
    //         this._reifect = new Reifect(value);
    //     }
    //     this._reifect.attachAll(...this.entries);
    // }

    @auto()
    public set alwaysOpen(value: boolean) {
        if (value) $(document).removeListener(DefaultEventName.click, this.closeOnClick);
        else $(document).on(DefaultEventName.click, this.closeOnClick);
        this.open = value;
    }

    private readonly closeOnClick = () => this.open = false;

    public get isVertical() {
        return this.direction == Direction.vertical;
    }

    // @auto({cancelIfUnchanged: false})
    // public set index(value: number) {
    //     this.selectByIndex(this.trimmedIndex);
    // }
    //
    // protected get trimmedIndex() {
    //     return trim(Math.round(this.index), this.entries.length - 1);
    // }
    //
    // protected get flooredTrimmedIndex() {
    //     return trim(Math.floor(this.index), this.entries.length - 1);
    // }

    @auto()
    public set open(value: boolean) {
        $(this).setStyle("overflow", value ? "visible" : "hidden");
    }

    public get currentPosition(): number {
        return this._currentPosition;
    }

    // protected set currentPosition(value: number) {
    //     const min = -this.dragLimitOffset - this.sizePerEntry[0] / 2;
    //     const max = this.totalSize + this.dragLimitOffset - this.sizePerEntry[this.sizePerEntry.length - 1] / 2;
    //
    //     if (value < min) value = min;
    //     if (value > max) value = max;
    //
    //     this._currentPosition = value;
    //     const elements = this.reifect.getEnabledObjectsData();
    //     if (elements.length === 0) return;
    //
    //     elements.forEach((el, index) =>
    //         this.computeAndApplyStyling(el.object.deref() as HTMLElement, this.positionPerEntry[index] - value));
    // }

    // protected setupUIListeners() {
    //     super.setupUIListeners();
    //
    //     $(document.body).on(DefaultEventName.drag, (e: TurboDragEvent) => {
    //         if (!this.dragging) return;
    //         e.stopImmediatePropagation();
    //         this.currentPosition += this.computeDragValue(e.scaledDeltaPosition);
    //     });
    //
    //     $(document.body).on(DefaultEventName.dragEnd, (e: TurboDragEvent) => {
    //         if (!this.dragging) return;
    //         e.stopImmediatePropagation();
    //         this.dragging = false;
    //         this.recomputeIndex();
    //         // this.snapTo(this.trimmedIndex);
    //         if (!this.alwaysOpen) this.setOpenTimer();
    //     });
    // }

    protected computeDragValue(delta: Point): number {
        return -delta[this.isVertical ? "y" : "x"];
    }

    /**
     * Recalculates the dimensions and positions of all entries
     */
    // protected reloadEntrySizes() {
    //     if (!this.reifect) return;
    //
    //     this.sizePerEntry.length = 0;
    //     this.positionPerEntry.length = 0;
    //     this.totalSize = 0;
    //
    //     this.reifect.getEnabledObjectsData().forEach(entry => {
    //         const object = entry.object.deref();
    //         const size = object ? object[this.isVertical ? "offsetHeight" : "offsetWidth"] : 0;
    //         this.sizePerEntry.push(size);
    //         this.positionPerEntry.push(this.totalSize);
    //         this.totalSize += size;
    //     });
    //     const flooredIndex = Math.floor(this.index);
    //     const indexOffset = this.index - Math.floor(this.index);
    //
    //     this.currentPosition = 0;
    //     if (this.index < 0) this.currentPosition = -Math.abs(this.index) * this.sizePerEntry[0];
    //     else if (this.index >= this.sizePerEntry.length) this.currentPosition =
    //         (this.index - this.sizePerEntry.length + 1) * this.sizePerEntry[this.sizePerEntry.length - 1];
    //     else this.currentPosition = this.positionPerEntry[flooredIndex] + this.sizePerEntry[flooredIndex] * indexOffset;
    // }
    //
    // protected recomputeIndex() {
    //     let index = 0;
    //     while (index < this.positionPerEntry.length - 1 && this.positionPerEntry[index + 1] < this.currentPosition) index++;
    //     if (this.currentPosition - this.positionPerEntry[index] > this.sizePerEntry[index + 1] / 2) index++;
    //     this.index = index;
    // }

    // protected computeAndApplyStyling(element: HTMLElement, translationValue: number, size: Record<Range, number> = this.size) {
    //     let opacityValue: number, scaleValue: number;
    //     const bound = translationValue > 0 ? size.max : size.min;
    //     opacityValue = linearInterpolation(translationValue, 0, bound, this.opacity.max, this.opacity.min);
    //     scaleValue = linearInterpolation(translationValue, 0, bound, this.scale.max, this.scale.min);
    //
    //     let styles: string | PartialRecord<keyof CSSStyleDeclaration, string | number> = {
    //         left: "50%", top: "50%", opacity: opacityValue, transform: `translate3d(
    //         calc(${!this.isVertical ? translationValue : 0}px - 50%),
    //         calc(${this.isVertical ? translationValue : 0}px - 50%),
    //         0) scale3d(${scaleValue}, ${scaleValue}, 1)`
    //     };
    //
    //     if (this.generateCustomStyling) styles = this.generateCustomStyling({
    //         element: element,
    //         translationValue: translationValue,
    //         opacityValue: opacityValue,
    //         scaleValue: scaleValue,
    //         size: size,
    //         defaultComputedStyles: styles
    //     });
    //
    //     $(element).setStyles(styles);
    // }

    // public select(entry: ValueType | EntryType, selected: boolean = true): this {
    //     // super.select(entry, selected);
    //     if (entry === undefined || entry === null) return this;
    //
    //     const index = this.getIndex(this.selectedEntry);
    //     if (index != this.index) this.index = index;
    //
    //     if (this.reifect) {
    //         this.reifect.transitionEnabled = true;
    //         this.reloadEntrySizes();
    //     }
    //
    //     const computedStyle = getComputedStyle(this.selectedEntry);
    //     $(this).setStyles({minWidth: computedStyle.width, minHeight: computedStyle.height}, true);
    //     return this;
    // }
    //
    // protected onEntryClick(entry: EntryType, e?: Event) {
    //     super.onEntryClick(entry, e);
    //     e.stopImmediatePropagation();
    //     this.open = true;
    //     if (!this.alwaysOpen) this.setOpenTimer();
    // }
    //
    // public addEntry(entry: ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType,
    //                 index: number = this.entries.length): EntryType {
    //     entry = this.createEntry(entry);
    //     entry.onDetach.add(() => this.reifect?.detach(entry as TurboSelectEntry));
    //     entry.onAttach.add(() => {
    //         this.reifect?.attach(entry as TurboSelectEntry);
    //         this.reloadEntrySizes();
    //     });
    //
    //     entry = super.addEntry(entry, index);
    //     $(entry).setStyles({position: "absolute"});
    //
    //     $(entry).on(DefaultEventName.dragStart, (e: Event) => {
    //         e.stopImmediatePropagation();
    //         this.clearOpenTimer();
    //         this.open = true;
    //         this.dragging = true;
    //         this.reifect.transitionEnabled = false;
    //         this.reloadEntrySizes();
    //     });
    //
    //     let showTimer: NodeJS.Timeout;
    //     $(entry).on("mouseover", () => {
    //         clearTimeout(showTimer);
    //         showTimer = setTimeout(() => this.open = true, 1000);
    //     });
    //     $(entry).on("mouseout", () => {
    //         if (showTimer) clearTimeout(showTimer);
    //         showTimer = null;
    //     });
    //
    //     this.refresh();
    //     return entry;
    // }
    //
    // public clear(): void {
    //     this.reifect.detach(...this.entries);
    //     super.clear();
    // }
    //
    // public refresh() {
    //     if (this.selectedEntry) this.select(this.selectedEntry);
    //     else this.reset();
    // }
    //
    // public reset() {
    //     this.select(this.entries[0]);
    // }

    protected clearOpenTimer() {
        if (this.openTimer) clearTimeout(this.openTimer);
    }

    protected setOpenTimer() {
        this.clearOpenTimer();
        if (typeof this.openTimeout !== "number" || this.openTimeout < 0) return;
        this.openTimer = setTimeout(() => this.open = false, this.openTimeout);
    }
}

export {TurboSelectWheel};