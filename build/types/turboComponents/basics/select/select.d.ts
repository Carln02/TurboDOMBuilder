import { TurboElement } from "../../../domBuilding/turboElement/turboElement";
import { TurboSelectEntry } from "./selectEntry/selectEntry";
import { TurboSelectConfig, TurboSelectProperties } from "./select.types";
import { TurboSelectEntryProperties } from "./selectEntry/selectEntry.types";
/**
 * Base class for creating a selection menu
 * @class TurboSelect
 * @extends TurboElement
 */
declare class TurboSelect<ValueType = string, EntryType extends TurboSelectEntry<ValueType> = TurboSelectEntry<ValueType>> extends TurboElement {
    /**
     * The dropdown's entries.
     */
    readonly entries: EntryType[];
    protected entriesParent: Element;
    enabled: boolean;
    /**
     * The dropdown's underlying hidden input. Might be undefined.
     */
    readonly inputName: string;
    private readonly multiSelection;
    private readonly forceSelection;
    private readonly onSelect;
    private readonly selectedEntryClasses;
    static readonly config: TurboSelectConfig;
    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties: TurboSelectProperties<ValueType, EntryType>);
    protected addEntry(entry: ValueType | TurboSelectEntryProperties<ValueType> | EntryType): EntryType;
    protected onEntryClick(entry: EntryType, e?: Event): void;
    /**
     * @description Select an entry.
     * @param {string | EntryType} entry - The DropdownEntry (or its string value) to select.
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    select(entry: ValueType | EntryType): this;
    /**
     * @description Select an entry.
     * @param {number} index - The index of the entry to select
     * @param {(index: number, entriesCount: number, zero?: number) => number} [preprocess=trim] - Callback to execute
     * on the index to preprocess it. Defaults to trim().
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    selectByIndex(index: number, preprocess?: (index: number, entriesCount: number, zero?: number) => number): this;
    getIndex(entry: EntryType): number;
    deselectAll(): void;
    reset(): void;
    get enabledEntries(): EntryType[];
    get enabledValues(): ValueType[];
    find(value: ValueType): EntryType;
    findAll(...values: ValueType[]): EntryType[];
    enable(b: boolean, ...entries: (ValueType | EntryType)[]): void;
    /**
     * @description The dropdown's currently selected entries
     */
    get selectedEntries(): EntryType[];
    get selectedEntry(): EntryType;
    /**
     * @description The dropdown's currently selected values
     */
    get selectedValues(): ValueType[];
    get selectedValue(): ValueType;
    get stringSelectedValue(): string;
    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    get values(): ValueType[];
    set values(values: (ValueType | TurboSelectEntryProperties<ValueType> | EntryType)[]);
}
declare function select<ValueType = string, EntryType extends TurboSelectEntry<ValueType> = TurboSelectEntry<ValueType>>(properties: TurboSelectProperties<ValueType, EntryType>): TurboSelect<ValueType, EntryType>;
export { TurboSelect, select };
