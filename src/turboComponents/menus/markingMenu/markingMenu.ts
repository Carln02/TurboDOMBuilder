import {StatefulReifect, statefulReifier} from "../../wrappers/statefulReifect/statefulReifect";
import {StatefulReifectProperties} from "../../wrappers/statefulReifect/statefulReifect.types";
import {TurboView} from "../../../mvc/core/view";
import {define} from "../../../decorators/define/define";
import {TurboModel} from "../../../mvc/core/model";
import {auto} from "../../../decorators/auto/auto";
import {$} from "../../../turboFunctions/turboFunctions";
import {TurboElement} from "../../../turboElement/turboElement";
import {InOut} from "../../../types/enums.types";
import {Point} from "../../datatypes/point/point";

/**
 * @group Components
 * @category TurboMarkingMenu
 */
@define("turbo-marking-menu")
class TurboMarkingMenu<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel
> extends TurboElement<ViewType, DataType, ModelType> {
    private readonly transition: StatefulReifect<InOut>;
    private currentOrigin: Point;

    public minDragDistance: number = 20;

    public semiMajor: number = 50;
    public semiMinor: number = 45;

    @auto({
        initialValue: 0,
        preprocessValue: (value) => value - Math.PI / 2
    }) public startAngle: number;

    @auto({
        initialValue: Math.PI * 2,
        preprocessValue: (value) => value - Math.PI / 2
    }) public endAngle: number;

    // public constructor(properties: TurboMarkingMenuProperties<ValueType, SecondaryValueType, EntryType, ViewType,
    //     DataType, ModelType> = {}) {
    //     super(properties);
    //     super.show(false);
    //
    //     // this.startAngle = 0;
    //     // this.endAngle = properties.endAngle ?? Math.PI * 2;
    //     //
    //     // this.semiMajor = properties.semiMajor ?? 50;
    //     // this.semiMinor = properties.semiMinor ?? 45;
    //     // this.minDragDistance = properties.minDragDistance ?? 20;
    //
    //     this.transition = properties.transition instanceof StatefulReifect ? properties.transition
    //         : this.initializeTransition(properties.transition ?? {});
    //     this.transition.initialize(InOut.out, this.entries);
    //
    //     $(this).setStyles({position: "fixed", top: 0, left: 0});
    //
    //     this.showTransition = this.showTransition.clone();
    //     this.showTransition.transitionDelay = {hidden: (index, totalCount) => 0.13 + totalCount * 0.02, visible: 0};
    //
    //     this.initEvents();
    // }
    //
    // public get totalAngle(): number {
    //     let totalAngle = this.endAngle - this.startAngle;
    //     while (totalAngle > Math.PI * 2) totalAngle -= Math.PI * 2;
    //     return totalAngle;
    // }
    //
    // private initEvents() {
    //     const hideOnEvent = (e: Event) => {
    //         if ($(e.target).findInParents(this)) return;
    //         if (this.isShown) $(this).show(false);
    //     };
    //
    //     $(document).on(DefaultEventName.scroll, hideOnEvent);
    //     $(document).on(DefaultEventName.clickEnd, hideOnEvent);
    //     $(document).on(DefaultEventName.dragStart, hideOnEvent);
    // }
    //
    // private initializeTransition(properties: StatefulReifectProperties<InOut>) {
    //     properties.states = [InOut.in, InOut.out];
    //
    //     if (!properties.transitionProperties) properties.transitionProperties = "opacity transform";
    //     if (properties.transitionDuration == undefined) properties.transitionDuration = 0.1;
    //     if (!properties.transitionTimingFunction) properties.transitionTimingFunction = {
    //         in: "ease-out",
    //         out: "ease-in"
    //     };
    //
    //     if (!properties.transitionDelay) properties.transitionDelay = {
    //         in: (index) => 0.01 + index * 0.02,
    //         out: (index, totalCount) => 0.01 + (totalCount - index) * 0.02
    //     };
    //
    //     if (!properties.styles) properties.styles = {
    //         in: (index, totalCount) => {
    //             //Compute angle of current entry (offset by 90 deg)
    //             const angle = this.computeAngle(index, totalCount);
    //
    //             //Compute x and y
    //             const x = this.semiMajor * Math.cos(angle);
    //             const y = this.semiMinor * Math.sin(angle);
    //
    //             //Translate the div to move its anchor as close as possible to the center
    //             //I.e., for x, the more it's close to 0, the more centered horizontally it gets,
    //             //and the farthest from 0, the closer it gets to the edge
    //             const translations = {
    //                 x: -50 * (1 - x / this.semiMajor),
    //                 y: -50 * (1 - y / this.semiMinor)
    //             };
    //
    //             return {
    //                 opacity: 1,
    //                 top: y + "px",
    //                 left: x + "px",
    //                 transform: `translate3d(${translations.x}%, ${translations.y}%, 0)`
    //             };
    //         },
    //         out: {opacity: 0, transform: `translate3d(-50%, -50%, 0)`}
    //     }
    //
    //     return statefulReifier(properties);
    // }
    //
    // private computeAngle(index: number, totalCount: number): number {
    //     const totalAngleEntriesCount = totalCount - (this.totalAngle < Math.PI * 2 ? 1 : 0);
    //     let angle = this.totalAngle * index / totalAngleEntriesCount + this.startAngle;
    //     angle += Math.sin((angle + (Math.PI / 2)) * 2) * 0.2;
    //     while (angle < 0) angle += Math.PI * 2;
    //     while (angle >= Math.PI * 2) angle -= Math.PI * 2;
    //     return angle;
    // }
    //
    // public addEntry(entry: ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType
    //                 , index: number = this.entries.length): EntryType {
    //     entry = super.addEntry(entry, index);
    //     this.transition?.initialize(this.isShown ? InOut.in : InOut.out, entry);
    //     $(entry).setStyles({position: "absolute"});
    //     return entry;
    // }
    //
    // public show(b: boolean = !this.isShown, position?: Point) {
    //     if (position) this.currentOrigin = position;
    //     else this.currentOrigin = new Point(this.offsetLeft, this.offsetTop);
    //
    //     if (position && b) $(this).setStyle("transform", `translate3d(${position.x}px, ${position.y}px, 0)`);
    //     this.transition.apply(b ? InOut.in : InOut.out, this.enabledEntries);
    //
    //     super.show(b);
    //     return this;
    // }
    //
    // public getEntryInDirection(position: Point): EntryType | null {
    //     if (!this.currentOrigin) return null;
    //     if (Point.dist(position, this.currentOrigin) < this.minDragDistance) return null;
    //
    //     let angle = Math.atan2(position.y - this.currentOrigin.y, position.x - this.currentOrigin.x);
    //     if (angle < 0) angle += Math.PI * 2;
    //
    //     // Find the closest entry based on the calculated angle
    //     let closestEntry: EntryType | null = null;
    //     let smallestAngleDifference = Infinity;
    //
    //     this.enabledEntries.forEach((entry, index) => {
    //         // Compute the angle of the current entry
    //         const entryAngle = this.computeAngle(index, this.enabledEntries.length);
    //
    //         // Calculate the absolute difference between the entry angle and the position angle
    //         const angleDifference = Math.abs(entryAngle - angle);
    //
    //         // Update the closest entry if this one is closer
    //         if (angleDifference < smallestAngleDifference) {
    //             smallestAngleDifference = angleDifference;
    //             closestEntry = entry;
    //         }
    //     });
    //
    //     return closestEntry;
    // }
    //
    // public selectEntryInDirection(position: Point) {
    //     this.select(this.getEntryInDirection(position));
    // }
    //
    // public attachTo(element: Element,
    //                 onClick: (e: Event) => void = (e: Event) => this.show(true, getEventPosition(e)),
    //                 onDragStart: (e: Event) => void = (e: Event) => this.show(true, getEventPosition(e)),
    //                 onDragEnd: (e: Event) => void = onDragStart
    //                     ? (e: Event) => this.selectEntryInDirection(getEventPosition(e))
    //                     : null) {
    //     //Cancel default hide operation on click end
    //     $(element).on(DefaultEventName.clickEnd, (e: Event) => e.stopImmediatePropagation());
    //
    //     //Setup click if defined
    //     if (onClick) $(element).on(DefaultEventName.click, (e: Event) => {
    //         e.stopImmediatePropagation();
    //         onClick(e);
    //     }, this);
    //
    //     //Cancel default hide operation on drag start
    //     $(element).on(DefaultEventName.dragStart, (e: Event) => {
    //         e.stopImmediatePropagation();
    //         //Setup drag start if defined
    //         if (onDragStart) onDragStart(e);
    //     }, this);
    //
    //     //Setup drag end if defined
    //     if (onDragEnd) $(element).on(DefaultEventName.dragEnd, (e: Event) => {
    //         e.stopImmediatePropagation();
    //         onDragEnd(e);
    //     }, this);
    // }
}

export {TurboMarkingMenu};