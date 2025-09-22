import {TurboSelectEntry} from "./selectEntry/selectEntry";
import {TurboSelectEntryProperties} from "./selectEntry/selectEntry.types";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import { TurboElementProperties } from "../../../turboElement/turboElement.types";
import {TurboEvent} from "../../../eventHandling/events/turboEvent";
import {TurboRawEventProperties} from "../../../eventHandling/events/turboEvent.types";

type TurboSelectProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>,
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
> = TurboElementProperties<ViewType, DataType, ModelType> & {
    unsetDefaultClasses?: boolean,
    customSelectedEntryClasses?: string,

    values?: (ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType)[],
    selectedValues?: ValueType[],

    multiSelection?: boolean,
    forceSelection?: boolean,
    inputName?: string,

    entriesParent?: Element,
    onSelect?: (b: boolean, entry: EntryType, index: number) => void,
};

type TurboSelectConfig = {
    defaultClasses?: string | string[],
    defaultSelectedEntryClasses?: string | string[]
};

type TurboSelectInputEventProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>
> = TurboRawEventProperties & {
    toggledEntry: EntryType,
    values: ValueType[]
};

export {TurboSelectProperties, TurboSelectConfig, TurboSelectInputEventProperties};