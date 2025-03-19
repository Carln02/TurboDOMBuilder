import {TurboSelect} from "../../basics/select/select";
import {TurboSelectEntry} from "../../basics/select/selectEntry/selectEntry";
import {define} from "../../../domBuilding/decorators/define";
import {TurboSelectProperties} from "../../basics/select/select.types";
import {TurboSelectEntryProperties} from "../../basics/select/selectEntry/selectEntry.types";
import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {TurboDragEvent} from "../../../eventHandling/events/basic/turboDragEvent";
import {linearInterpolation} from "../../../utils/computations/interpolation";
import {trim} from "../../../utils/computations/misc";
import {auto} from "../../../domBuilding/decorators/auto/auto";
import {TurboSelectWheelProperties} from "./selectWheel.types";
import {Direction, InOut, Range} from "../../../utils/datatypes/basicDatatypes.types";
import {PartialRecord} from "../../../domBuilding/core.types";
import {Reifect, reifect} from "../../wrappers/reifect/reifect";
import {StatelessReifectProperties} from "../../wrappers/reifect/reifect.types";
import {TurboView} from "../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../domBuilding/mvc/turboModel";

/**
 * @class TurboSelectWheel
 * @extends TurboSelect
 * @description Class to create a dynamic selection wheel.
 * @template {string} ValueType
 * @template {TurboSelectEntry<ValueType, any>} EntryType
 */
@define("turbo-select-wheel")
class TurboSelectWheel<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboSelect<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType> {

    private readonly reifect: Reifect;

    private readonly sizePerEntry: number[] = [];

    private readonly direction: Direction;

    @auto({callBefore: (value) => trim(value, 1)})
    public set opacity(value: Record<Range, number>) {}

    public scale: Record<Range, number>;
    public size: Record<Range, number>;

    public openTimeout: number = 3000;

    public generateCustomStyling: (element: HTMLElement, translationValue: number, size: Record<Range, number>,
                                   defaultComputedStyles: PartialRecord<keyof CSSStyleDeclaration, string | number>)
        => string | PartialRecord<keyof CSSStyleDeclaration, string | number>;

    private dragging: boolean;

    private openTimer: NodeJS.Timeout;

    public constructor(properties: TurboSelectWheelProperties<ValueType, SecondaryValueType, EntryType, ViewType,
        DataType, ModelType>) {
        properties.multiSelection = false;
        properties.forceSelection = true;
        super(properties);

        this.opacity = properties.opacity ?? {max: 1, min: 0};
        this.scale = properties.scale ?? {max: 1, min: 0.5};
        this.size = typeof properties.size == "object" ? properties.size
            : {max: properties.size ?? 100, min: -(properties.size ?? 100)};

        this.generateCustomStyling = properties.generateCustomStyling;

        this.direction = properties.direction || Direction.horizontal;
        this.reifect = properties.styleReifect instanceof Reifect ? properties.styleReifect
            : this.initializeStyleReifect(properties.styleReifect);

        this.setStyles({display: "block", position: "relative"});
        this.index = 0;
        this.open = false;

        this.initEvents();
        requestAnimationFrame(() => {
            this.reifect.apply(this.entries);
            this.snapTo(0);
        });
    }

    public get isVertical() {
        return this.direction == Direction.vertical;
    }

    @auto()
    public set index(value: number) {
        this.selectByIndex(this.trimmedIndex);
    }

    private get trimmedIndex() {
        return trim(Math.round(this.index), this.entries.length - 1);
    }

    private get flooredTrimmedIndex() {
        return trim(Math.floor(this.index), this.entries.length - 1);
    }

    @auto()
    public set open(value: boolean) {
        this.setStyle("overflow", value ? "visible" : "hidden");
    }

    private initializeStyleReifect(properties?: StatelessReifectProperties): Reifect {
        if (!properties) properties = {};
        if (!properties.transitionProperties) properties.transitionProperties = "opacity transform";
        if (properties.transitionDuration == undefined) properties.transitionDuration = 0.2;
        if (!properties.transitionTimingFunction) properties.transitionTimingFunction = "ease-in-out";
        return reifect(properties);
    }

    private initEvents() {
        const coordinate = this.direction == Direction.vertical ? "y" : "x";

        this.addListener(DefaultEventName.drag, (e: TurboDragEvent) => {
            if (!this.dragging) return;
            e.stopImmediatePropagation();
            const currentEntrySize = this.sizePerEntry[this.flooredTrimmedIndex];

            if (currentEntrySize != 0) this.index -= e.scaledDeltaPosition[coordinate] / currentEntrySize;
            this.reloadStyles();
        });

        this.addListener(DefaultEventName.dragEnd, (e: TurboDragEvent) => {
            if (!this.dragging) return;
            e.stopImmediatePropagation();
            this.dragging = false;
            this.snapTo(Math.round(this.index));
            this.setOpenTimer();
        });

        document.addListener(DefaultEventName.click, () => this.open = false);
    }

    private reloadStyles(reloadSizes: boolean = false) {
        const elements = this.reifect.getEnabledObjectsData();

        if (reloadSizes) {
            this.sizePerEntry.length = 0;
            elements.forEach(entry => {
                const object = entry.object.deref();
                const size = object ? object[this.isVertical ? "offsetHeight" : "offsetWidth"] : 0;
                this.sizePerEntry.push(size);
            });
        }

        const firstEntrySize = this.sizePerEntry[0];
        const halfFirstEntrySize = firstEntrySize / 2;

        const lastEntrySize = this.sizePerEntry[elements.length - 1];
        const halfLastEntrySize = lastEntrySize / 2;

        const offsetSize = {
            min: this.size.min - firstEntrySize / 2,
            max: this.size.max + lastEntrySize / 2
        };

        let currentIndex = Math.round(this.index);

        let currentElementOffset = -Math.abs(this.index - currentIndex) * this.sizePerEntry[currentIndex];
        let afterOffset = currentElementOffset;
        let beforeOffset = currentElementOffset;

        if (currentIndex < 0) {
            const computedOffset = -currentIndex * firstEntrySize;
            currentElementOffset -= computedOffset;
            beforeOffset -= computedOffset;
            currentIndex = 0;
        }

        if (currentIndex > elements.length - 1) {
            const computedOffset = (currentIndex - elements.length + 1) * lastEntrySize;
            currentElementOffset -= computedOffset;
            beforeOffset -= computedOffset;
            currentIndex = elements.length - 1;
        }

        // while (currentIndex >= elements.length) {
        //     const computedOffest = (currentIndex - elements.length)
        //     currentElementOffset -= firstEntrySize;
        //     beforeOffset -= firstEntrySize;
        //     currentIndex--;
        // }
        //
        // while (currentIndex < 0) {
        //     currentElementOffset += lastEntrySize;
        //     afterOffset += lastEntrySize;
        //     currentIndex++;
        // }

        // if (beforeOffset < this.size.min + halfFirstEntrySize) beforeOffset = this.size.min + halfFirstEntrySize;
        // if (afterOffset > this.size.max + halfLastEntrySize) afterOffset = this.size.max + halfLastEntrySize;

        this.applyStyling(elements[currentIndex].object.deref() as HTMLElement,
            currentElementOffset + this.sizePerEntry[currentIndex] / 2, offsetSize);

        for (let i = currentIndex - 1; i >= 0; i--) {
            beforeOffset -= this.sizePerEntry[i];
            // if (beforeOffset < this.size.min + halfFirstEntrySize) beforeOffset = this.size.min + halfFirstEntrySize;
            this.applyStyling(elements[i].object.deref() as HTMLElement, beforeOffset
                + this.sizePerEntry[i] / 2, offsetSize);
        }

        for (let i = currentIndex + 1; i < elements.length; i++) {
            afterOffset += this.sizePerEntry[i];
            // if (afterOffset > this.size.max + halfLastEntrySize) afterOffset = this.size.max + halfLastEntrySize;
            this.applyStyling(elements[i].object.deref() as HTMLElement, afterOffset
                + this.sizePerEntry[i] / 2, offsetSize);
        }
    }

    private applyStyling(element: HTMLElement, translationValue: number, size: Record<Range, number> = {
        min: this.size.min + this.sizePerEntry[0] / 2,
        max: this.size.max - this.sizePerEntry[this.sizePerEntry.length - 1] / 2
    }) {
        let opacityValue: number, scaleValue: number;

        if (translationValue > 0) {
            opacityValue = linearInterpolation(translationValue, 0, size.max, this.opacity.max, this.opacity.min);
            scaleValue = linearInterpolation(translationValue, 0, size.max, this.scale.max, this.scale.min);
        } else {
            opacityValue = Math.abs(linearInterpolation(translationValue, 0, size.min, this.opacity.max, this.opacity.min));
            scaleValue = Math.abs(linearInterpolation(translationValue, 0, size.min, this.scale.max, this.scale.min));
        }

        let styles: string | PartialRecord<keyof CSSStyleDeclaration, string | number> = {
            left: "50%", top: "50%", opacity: opacityValue, transform: `translate3d(
            calc(${!this.isVertical ? translationValue : 0}px - 50%), 
            calc(${this.isVertical ? translationValue : 0}px - 50%),
            0) scale3d(${scaleValue}, ${scaleValue}, 1)`
        };

        if (this.generateCustomStyling) styles = this.generateCustomStyling(element, translationValue, size, styles);
        element.setStyles(styles);
    }

    protected onEntryClick(entry: EntryType, e?: Event) {
        super.onEntryClick(entry, e);
        e.stopImmediatePropagation();
        this.open = true;
        this.snapTo(this.entries.indexOf(entry));
        this.setOpenTimer();
    }

    protected addEntry(entry: ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType): EntryType {
        entry = super.addEntry(entry);
        entry.setStyles({position: "absolute"});

        entry.addListener(DefaultEventName.dragStart, (e: Event) => {
            e.stopImmediatePropagation();
            this.clearOpenTimer();
            this.open = true;
            this.dragging = true;
            this.reifect.enabled.transition = false;
            this.reloadStyles(true);
        });

        if (this.reifect) {
            this.reifect.attach(entry);
            this.reifect.apply();
            this.reloadStyles(true);
        }
        return entry;
    }

    public reset() {
        this.snapTo(0);
    }

    private snapTo(value: number) {
        this.index = value;
        this.reifect.enabled.transition = true;
        this.reloadStyles(true);

        const computedStyle = getComputedStyle(this.selectedEntry);
        this.setStyles({minWidth: computedStyle.width, minHeight: computedStyle.height}, true);
    }

    private clearOpenTimer() {
        if (this.openTimer) clearTimeout(this.openTimer);
    }

    private setOpenTimer() {
        this.clearOpenTimer();
        this.openTimer = setTimeout(() => this.open = false, this.openTimeout);
    }
}

export {TurboSelectWheel};