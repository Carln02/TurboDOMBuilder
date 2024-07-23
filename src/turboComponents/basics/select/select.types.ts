import {TurboProperties} from "../../../domBuilding/turboElement/turboElement.types";
import {TurboSelectEntry} from "./selectEntry/selectEntry";
import {TurboSelectEntryProperties} from "./selectEntry/selectEntry.types";

type TurboSelectProperties<EntryType extends TurboSelectEntry<ValueType>, ValueType = string> = TurboProperties & {
    unsetDefaultClasses?: boolean,
    customSelectedEntryClasses?: string,

    values?: (ValueType | TurboSelectEntryProperties<ValueType> | EntryType)[],
    selectedValues?: ValueType[],

    multiSelection?: boolean,
    forceSelection?: boolean,
    inputName?: string,

    entriesParent?: Element,
};

type TurboSelectConfig = {
    defaultClasses?: string | string[],
    defaultSelectedEntryClasses?: string | string[]
};

export {TurboSelectProperties, TurboSelectConfig};