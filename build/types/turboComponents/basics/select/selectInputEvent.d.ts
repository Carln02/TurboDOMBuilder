import { TurboEvent } from "../../../eventHandling/events/turboEvent";
import { ClickMode } from "../../../eventHandling/turboEventManager/turboEventManager.types";
import { TurboSelectEntry } from "./selectEntry/selectEntry";
import { Point } from "../../../utils/datatypes/point/point";
declare class TurboSelectInputEvent<ValueType = string, EntryType extends TurboSelectEntry<ValueType> = TurboSelectEntry<ValueType>> extends TurboEvent {
    readonly toggledEntry: EntryType;
    readonly values: ValueType[];
    constructor(toggledEntry: EntryType, values: ValueType[], clickMode?: ClickMode, authorizeScaling?: boolean | (() => boolean), scalePosition?: (position: Point) => Point, eventInitDict?: EventInit);
}
export { TurboSelectInputEvent };
