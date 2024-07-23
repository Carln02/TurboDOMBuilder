import {MarkingMenuProperties} from "./markingMenu.types";
import {TurboSelectEntry} from "../../basics/select/selectEntry/selectEntry";
import {TurboSelect} from "../../basics/select/select";
import {define} from "../../../domBuilding/decorators/define";
import {Point} from "../../../utils/datatypes/point/point";
import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {auto} from "../../../domBuilding/decorators/auto/auto";
import {Transition, transition} from "../../../domBuilding/transition/transition";
import {TransitionProperties} from "../../../domBuilding/transition/transition.types";
import {InOut} from "../../../utils/datatypes/basicDatatypes.types";
import {TurboSelectEntryProperties} from "../../basics/select/selectEntry/selectEntry.types";

@define("turbo-marking-menu")
class MarkingMenu<EntryType extends TurboSelectEntry<ValueType>, ValueType = string>
    extends TurboSelect<EntryType, ValueType> {
    private readonly transition: Transition;

    public semiMajor: number;
    public semiMinor: number;

    private currentOrigin: Point;
    public minDragDistance: number;

    @auto({callBefore: (value) => value - Math.PI / 2})
    public set startAngle(value: number) {};

    @auto({callBefore: (value) => value - Math.PI / 2})
    public set endAngle(value: number) {};

    constructor(properties: MarkingMenuProperties<EntryType, ValueType> = {}) {
        super({...properties});
        super.show(false);

        this.startAngle = 0;
        this.endAngle = properties.endAngle ?? Math.PI * 2;

        this.semiMajor = properties.semiMajor ?? 50;
        this.semiMinor = properties.semiMinor ?? 45;
        this.minDragDistance = properties.minDragDistance ?? 20;

        this.transition = properties.transition instanceof Transition ? properties.transition
            : this.initializeTransition(properties.transition ?? {});
        this.transition.initialize(InOut.out, this.entries);

        this.setStyles({position: "fixed", top: 0, left: 0});

        this.showTransition = this.showTransition.clone();
        this.showTransition.delay = {out: (index, totalCount) => 0.13 + totalCount * 0.02, in: 0};

        this.initEvents();
    }

    public get totalAngle(): number {
        let totalAngle = this.endAngle - this.startAngle;
        while (totalAngle > Math.PI * 2) totalAngle -= Math.PI * 2;
        return totalAngle;
    }

    private initEvents() {
        const hideOnEvent = () => {
            if (this.isShown) this.show(false);
        };

        document.addEventListener(DefaultEventName.scroll, hideOnEvent);
        // document.addEventListener(DefaultEventName.clickEnd, hideOnEvent);
        document.addEventListener(DefaultEventName.dragStart, hideOnEvent);
    }

    private initializeTransition(properties: TransitionProperties) {
        if (!properties.properties) properties.properties = "opacity transform";
        if (properties.duration == undefined) properties.duration = 0.1;
        if (!properties.timingFunction) properties.timingFunction = {in: "ease-out", out: "ease-in"};

        if (!properties.delay) properties.delay = {
            in: (index) => 0.01 + index * 0.02,
            out: (index, totalCount) => 0.01 + (totalCount - index) * 0.02
        };

        if (!properties.defaultStyles) properties.defaultStyles = {
            in: (index, totalCount) => {
                //Compute angle of current entry (offset by 90 deg)
                const angle = this.computeAngle(index, totalCount);

                //Compute x and y
                const x = this.semiMajor * Math.cos(angle);
                const y = this.semiMinor * Math.sin(angle);

                //Translate the div to move its anchor as close as possible to the center
                //I.e., for x, the more it's close to 0, the more centered horizontally it gets,
                //and the farthest from 0, the closer it gets to the edge
                const translations = {
                    x: -50 * (1 - x / this.semiMajor),
                    y: -50 * (1 - y / this.semiMinor)
                };

                return {
                    opacity: 1,
                    top: y + "px",
                    left: x + "px",
                    transform: `translate3d(${translations.x}%, ${translations.y}%, 0)`
                };
            },
            out: {opacity: 0, transform: `translate3d(-50%, -50%, 0)`}
        }

        return transition(properties);
    }

    private computeAngle(index: number, totalCount: number): number {
        const totalAngleEntriesCount = totalCount - (this.totalAngle < Math.PI * 2 ? 1 : 0);
        let angle = this.totalAngle * index / totalAngleEntriesCount + this.startAngle;
        angle += Math.sin((angle + (Math.PI / 2)) * 2) * 0.2;
        while (angle < 0) angle += Math.PI * 2;
        while (angle >= Math.PI * 2) angle -= Math.PI * 2;
        return angle;
    }

    protected addEntry(entry: TurboSelectEntryProperties<ValueType> | ValueType | EntryType): EntryType {
        entry = super.addEntry(entry);
        this.transition?.initialize(this.isShown ? InOut.in : InOut.out, entry, true);
        entry.setStyles({position: "absolute"});
        return entry;
    }

    public show(b: boolean = !this.isShown, position?: Point) {
        if (position) this.currentOrigin = position;
        else this.currentOrigin = new Point(this.offsetLeft, this.offsetTop);

        if (position && b) this.setStyle("transform", `translate3d(${position.x}px, ${position.y}px, 0)`);
        this.transition.apply(b ? InOut.in : InOut.out, this.enabledEntries);

        super.show(b);
        return this;
    }

    public getEntryInDirection(position: Point): EntryType | null {
        if (!this.currentOrigin) return null;
        if (Point.dist(position, this.currentOrigin) < this.minDragDistance) return null;

        let angle = Math.atan2(position.y - this.currentOrigin.y, position.x - this.currentOrigin.x);
        if (angle < 0) angle += Math.PI * 2;

        // Find the closest entry based on the calculated angle
        let closestEntry: EntryType | null = null;
        let smallestAngleDifference = Infinity;

        this.enabledEntries.forEach((entry, index) => {
            // Compute the angle of the current entry
            const entryAngle = this.computeAngle(index, this.enabledEntries.length);

            // Calculate the absolute difference between the entry angle and the position angle
            const angleDifference = Math.abs(entryAngle - angle);

            // Update the closest entry if this one is closer
            if (angleDifference < smallestAngleDifference) {
                smallestAngleDifference = angleDifference;
                closestEntry = entry;
            }
        });

        return closestEntry;
    }
}

export {MarkingMenu};