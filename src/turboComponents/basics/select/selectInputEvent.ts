import {TurboEvent} from "../../../eventHandling/events/turboEvent";
import {ClickMode} from "../../../eventHandling/turboEventManager/turboEventManager.types";
import {TurboEventName} from "../../../eventHandling/eventNaming";
import {TurboSelectEntry} from "./selectEntry/selectEntry";

class TurboSelectInputEvent<EntryType extends TurboSelectEntry<ValueType>, ValueType = string> extends TurboEvent {
    public readonly toggledEntry: EntryType;
    public readonly values: ValueType[];

    constructor(toggledEntry: EntryType, values: ValueType[], clickMode: ClickMode = ClickMode.left,
                eventInitDict?: EventInit) {
        super(null, clickMode, null, TurboEventName.selectInput, eventInitDict);
        this.toggledEntry = toggledEntry;
        this.values = values;
    }
}

export {TurboSelectInputEvent};