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
import {Transition, transition} from "../../../domBuilding/transition/transition";
import {TransitionMode, TransitionProperties} from "../../../domBuilding/transition/transition.types";

@define("turbo-select-wheel")
class TurboSelectWheel<EntryType extends TurboSelectEntry<ValueType>, ValueType = string>
    extends TurboSelect<EntryType, ValueType> {

    private readonly transition: Transition;

    private sizePerEntry: number[] = [];

    private readonly direction: Direction;

    private readonly opacity: Record<Range, number>;
    private readonly scale: Record<Range, number>;
    private readonly size: Record<Range, number>;

    private dragging: boolean;

    private openTimeout: NodeJS.Timeout;

    constructor(properties: TurboSelectWheelProperties<EntryType, ValueType>) {
        properties.multiSelection = false;
        properties.forceSelection = true;
        super(properties);

        this.opacity = properties.opacity ?? {max: 1, min: 0};
        this.scale = properties.scale ?? {max: 1, min: 0.5};
        this.size = typeof properties.size == "object" ? properties.size
            : {max: properties.size ?? 100, min: -(properties.size ?? 100)};

        this.direction = properties.direction || Direction.horizontal;
        this.transition = properties.transition instanceof Transition ? properties.transition
            : this.initializeTransition(properties.transition ?? {});

        this.setStyles({display: "block", position: "relative", margin: "100px"});
        this.index = 0;
        this.open = false;

        this.initEvents();
        requestAnimationFrame(() => {
            this.transition.apply(InOut.out, this.entries);
            this.snapTo(0);
        });
    }

    private initializeTransition(properties: TransitionProperties): Transition {
        if (!properties.properties) properties.properties = "opacity transform";
        if (properties.duration == undefined) properties.duration = 0.2;
        if (!properties.timingFunction) properties.timingFunction = "ease-in-out";
        return transition(properties);
    }

    private reloadStyles(reloadSizes: boolean = false) {
        let lastSize: number = 0;
        const elements = this.transition.getEnabledEntriesData();

        if (reloadSizes) elements.forEach(entry => {
            const size = entry.element[this.direction == Direction.vertical ? "offsetHeight" : "offsetWidth"];
            if (this.sizePerEntry[entry.elementIndex]) this.sizePerEntry[entry.elementIndex] = size;
            else this.sizePerEntry.push(size);
            lastSize += size;
        });

        const firstEntrySize = this.sizePerEntry[0];
        const halfFirstEntrySize = firstEntrySize / 2;

        const lastEntrySize = this.sizePerEntry[elements.length - 1];
        const halfLastEntrySize = lastEntrySize / 2;

        let currentIndex = Math.floor(this.index);

        let afterOffset = -Math.abs(this.index - currentIndex) * this.sizePerEntry[this.flooredTrimmedIndex];
        let beforeOffset = afterOffset;

        while (currentIndex >= elements.length) {
            beforeOffset -= firstEntrySize;
            currentIndex--;
        }

        while (currentIndex < 0) {
            afterOffset += lastEntrySize;
            currentIndex++;
        }

        if (beforeOffset < this.size.min + halfFirstEntrySize) beforeOffset = this.size.min + halfFirstEntrySize;
        if (afterOffset > this.size.max + halfLastEntrySize) afterOffset = this.size.max + halfLastEntrySize;

        this.applyStyling(elements[currentIndex].element, currentIndex == elements.length - 1
                ? beforeOffset : afterOffset, halfFirstEntrySize, halfLastEntrySize);

        for (let i = currentIndex - 1; i >= 0; i--) {
            beforeOffset -= this.sizePerEntry[i];
            if (beforeOffset < this.size.min + halfFirstEntrySize) beforeOffset = this.size.min + halfFirstEntrySize;
            this.applyStyling(elements[i].element, beforeOffset, halfFirstEntrySize, halfLastEntrySize);
        }

        for (let i = currentIndex + 1; i < elements.length; i++) {
            afterOffset += this.sizePerEntry[i];
            if (afterOffset > this.size.max + halfLastEntrySize) afterOffset = this.size.max + halfLastEntrySize;
            this.applyStyling(elements[i].element, afterOffset, halfFirstEntrySize, halfLastEntrySize);
        }
    }

    private applyStyling(element: HTMLElement, translationValue: number,
                         halfFirstEntrySize: number = this.sizePerEntry[0] / 2,
                         halfLastEntrySize: number = this.sizePerEntry[this.sizePerEntry.length - 1] / 2) {
        let opacityValue: number, scaleValue: number;

        if (translationValue > 0) {
            opacityValue = linearInterpolation(translationValue, 0,
                this.size.max + halfLastEntrySize, this.opacity.max, this.opacity.min);
            scaleValue = linearInterpolation(translationValue, 0,
                this.size.max + halfLastEntrySize, this.scale.max, this.scale.min);
        } else {
            opacityValue = Math.abs(linearInterpolation(translationValue, 0,
                this.size.min + halfFirstEntrySize, this.opacity.max, this.opacity.min));
            scaleValue = Math.abs(linearInterpolation(translationValue, 0,
                this.size.min + halfFirstEntrySize, this.scale.max, this.scale.min));
        }

        element.setStyles({
            opacity: opacityValue,
            transform: `translate3d(
                        calc(${this.direction == Direction.horizontal ? translationValue : 0}px - 50%), 
                        calc(${this.direction == Direction.vertical ? translationValue : 0}px - 50%),
                        0) scale3d(${scaleValue}, ${scaleValue}, 1)`
        });
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

    protected onEntryClick(entry: EntryType, e?: Event) {
        super.onEntryClick(entry, e);
        e.stopImmediatePropagation();
        this.open = true;
        this.snapTo(this.entries.indexOf(entry));
        this.setOpenTimeout();
    }

    protected addEntry(entry: TurboSelectEntryProperties<ValueType> | ValueType | EntryType): EntryType {
        entry = super.addEntry(entry);
        entry.setStyles({position: "absolute", left: "50%", top: "50%"});

        entry.addEventListener(DefaultEventName.dragStart, (e: Event) => {
            e.stopImmediatePropagation();
            this.clearOpenTimeout();
            this.open = true;
            this.dragging = true;
            this.transition.enabled = TransitionMode.stylesOnly;
            this.reloadStyles(true);
        });

        if (this.transition) {
            this.transition.attach(entry);
            this.transition.apply();
            this.reloadStyles(true);
        }
        return entry;
    }

    public reset() {
        this.snapTo(0);
    }

    private snapTo(value: number) {
        this.index = value;
        this.transition.enabled = TransitionMode.enabled;
        this.reloadStyles(true);

        const computedStyle = getComputedStyle(this.selectedEntry);
        this.setStyles({minWidth: computedStyle.width, minHeight: computedStyle.height}, true);
    }

    private clearOpenTimeout() {
        if (this.openTimeout) clearTimeout(this.openTimeout);
    }

    private setOpenTimeout() {
        this.clearOpenTimeout();
        this.openTimeout = setTimeout(() => this.open = false, 3000);
    }

    private initEvents() {
        const coordinate = this.direction == Direction.vertical ? "y" : "x";

        document.addEventListener(DefaultEventName.drag, (e: TurboDragEvent) => {
            if (!this.dragging) return;
            e.stopImmediatePropagation();
            this.index -= e.scaledDeltaPosition[coordinate] / this.sizePerEntry[this.flooredTrimmedIndex];
            this.reloadStyles();
        });

        document.addEventListener(DefaultEventName.dragEnd, (e: TurboDragEvent) => {
            if (!this.dragging) return;
            e.stopImmediatePropagation();
            this.dragging = false;
            this.snapTo(this.trimmedIndex);
            this.setOpenTimeout();
        });

        document.addEventListener(DefaultEventName.click, () => this.open = false);
    }
}

function selectWheel<EntryType extends TurboSelectEntry<ValueType>, ValueType = string>(
    properties: TurboSelectProperties<EntryType, ValueType>): TurboSelectWheel<EntryType, ValueType> {
    return new TurboSelectWheel<EntryType, ValueType>(properties);
}

export {TurboSelectWheel, selectWheel};