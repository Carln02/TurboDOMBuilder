import {TurboEvent} from "../../../eventHandling/events/turboEvent";
import {TurboSelectInputEventProperties} from "./select.types";

class TurboSelectInputEvent<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends object = HTMLElement,
> extends TurboEvent {
    public readonly toggledEntry: EntryType;
    public readonly values: ValueType[];

    public constructor(properties: TurboSelectInputEventProperties<ValueType, SecondaryValueType, EntryType>) {
        super(properties);
        this.toggledEntry = properties.toggledEntry;
        this.values = properties.values;
    }
}

export {TurboSelectInputEvent};