import { TurboProperties } from "../../../domBuilding/turboElement/turboElement.types";
import { TurboSelectEntry } from "./selectEntry/selectEntry";
import { TurboSelectEntryProperties } from "./selectEntry/selectEntry.types";
type TurboSelectProperties<ValueType = string, EntryType extends TurboSelectEntry<ValueType> = TurboSelectEntry<ValueType>> = TurboProperties & {
    unsetDefaultClasses?: boolean;
    customSelectedEntryClasses?: string;
    values?: (ValueType | TurboSelectEntryProperties<ValueType> | EntryType)[];
    selectedValues?: ValueType[];
    multiSelection?: boolean;
    forceSelection?: boolean;
    inputName?: string;
    entriesParent?: Element;
    onSelect?: (b: boolean, entry: EntryType, index: number) => void;
};
type TurboSelectConfig = {
    defaultClasses?: string | string[];
    defaultSelectedEntryClasses?: string | string[];
};
export { TurboSelectProperties, TurboSelectConfig };
