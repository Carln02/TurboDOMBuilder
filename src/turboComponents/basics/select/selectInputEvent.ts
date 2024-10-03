import {TurboEvent} from "../../../eventHandling/events/turboEvent";
import {ClickMode} from "../../../eventHandling/turboEventManager/turboEventManager.types";
import {TurboEventName} from "../../../eventHandling/eventNaming";
import {TurboSelectEntry} from "./selectEntry/selectEntry";
import {Point} from "../../../utils/datatypes/point/point";

class TurboSelectInputEvent<ValueType = string, EntryType extends TurboSelectEntry<ValueType>
    = TurboSelectEntry<ValueType>> extends TurboEvent {
    public readonly toggledEntry: EntryType;
    public readonly values: ValueType[];

    constructor(toggledEntry: EntryType, values: ValueType[], clickMode: ClickMode = ClickMode.left,
                authorizeScaling?: boolean | (() => boolean), scalePosition?: (position: Point) => Point,
                eventInitDict?: EventInit) {
        super(null, clickMode, null, TurboEventName.selectInput, authorizeScaling, scalePosition,
            eventInitDict);
        this.toggledEntry = toggledEntry;
        this.values = values;
    }
}

export {TurboSelectInputEvent};