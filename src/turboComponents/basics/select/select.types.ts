import {TurboCustomProperties} from "../../../domBuilding/turboElement/turboElement.types";
import {TurboSelectEntry} from "./selectEntry/selectEntry";
import {TurboSelectEntryProperties} from "./selectEntry/selectEntry.types";
import {TurboView} from "../../../domBuilding/turboElement/turboView";
import {TurboModel} from "../../../domBuilding/turboElement/turboModel";

type TurboSelectProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>,
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
> = TurboCustomProperties<ViewType, DataType, ModelType> & {
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

export {TurboSelectProperties, TurboSelectConfig};