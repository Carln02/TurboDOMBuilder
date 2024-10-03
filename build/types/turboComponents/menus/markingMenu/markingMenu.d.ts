import { TurboMarkingMenuProperties } from "./markingMenu.types";
import { TurboSelectEntry } from "../../basics/select/selectEntry/selectEntry";
import { TurboSelect } from "../../basics/select/select";
import { Point } from "../../../utils/datatypes/point/point";
import { TurboSelectEntryProperties } from "../../basics/select/selectEntry/selectEntry.types";
declare class TurboMarkingMenu<ValueType = string, EntryType extends TurboSelectEntry<ValueType, any> = TurboSelectEntry<ValueType, any>> extends TurboSelect<ValueType, EntryType> {
    private readonly transition;
    semiMajor: number;
    semiMinor: number;
    private currentOrigin;
    minDragDistance: number;
    set startAngle(value: number);
    set endAngle(value: number);
    constructor(properties?: TurboMarkingMenuProperties<ValueType, EntryType>);
    get totalAngle(): number;
    private initEvents;
    private initializeTransition;
    private computeAngle;
    protected addEntry(entry: TurboSelectEntryProperties<ValueType> | ValueType | EntryType): EntryType;
    show(b?: boolean, position?: Point): this;
    getEntryInDirection(position: Point): EntryType | null;
    selectEntryInDirection(position: Point): void;
    attachTo(element: Element, onClick?: (e: Event) => void, onDragStart?: (e: Event) => void, onDragEnd?: (e: Event) => void): void;
}
declare function markingMenu<ValueType = string, EntryType extends TurboSelectEntry<ValueType> = TurboSelectEntry<ValueType>>(properties?: TurboMarkingMenuProperties<ValueType, EntryType>): TurboMarkingMenu<ValueType, EntryType>;
export { TurboMarkingMenu, markingMenu };
