import {TurboElement} from "../../../domBuilding/turboElement/turboElement";
import {define} from "../../../domBuilding/decorators/define";
import {selectEntry, TurboSelectEntry} from "./selectEntry/selectEntry";
import {TurboSelectConfig, TurboSelectProperties} from "./select.types";
import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {TurboSelectEntryProperties} from "./selectEntry/selectEntry.types";
import {TurboSelectInputEvent} from "./selectInputEvent";
import {trim} from "../../../utils/computations/misc";

/**
 * Base class for creating a selection menu
 * @class TurboSelect
 * @extends TurboElement
 */
@define("turbo-select")
class TurboSelect<ValueType = string, EntryType extends TurboSelectEntry<ValueType> = TurboSelectEntry<ValueType>>
    extends TurboElement {
    /**
     * The dropdown's entries.
     */
    public readonly entries: EntryType[] = [];

    protected entriesParent: Element;

    public enabled: boolean;

    /**
     * The dropdown's underlying hidden input. Might be undefined.
     */
    public readonly inputName: string;

    private readonly multiSelection: boolean = false;
    private readonly forceSelection: boolean = false;

    private readonly onSelect: (b: boolean, entry: EntryType, index: number) => void;

    private readonly selectedEntryClasses: string | string[];

    public static readonly config: TurboSelectConfig = {};

    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties: TurboSelectProperties<ValueType, EntryType>) {
        super(properties);

        if (!properties.unsetDefaultClasses) this.addClass(TurboSelect.config.defaultClasses);
        if (!properties.selectedValues) properties.selectedValues = [];

        this.entriesParent = properties.entriesParent ?? this;
        this.multiSelection = properties.multiSelection ?? false;
        this.forceSelection = properties.forceSelection ?? !this.multiSelection;

        this.inputName = properties.inputName;

        this.onSelect = properties.onSelect || (() => {});

        this.selectedEntryClasses = properties.customSelectedEntryClasses || TurboSelect.config.defaultSelectedEntryClasses;

        (properties.values ?? []).forEach(entry => {
            entry = this.addEntry(entry);
            if (properties.selectedValues?.includes(entry.value)) this.select(entry);
        });
    }

    protected addEntry(entry: ValueType | TurboSelectEntryProperties<ValueType> | EntryType): EntryType {
        if (!(entry instanceof TurboSelectEntry)) {
            if (typeof entry == "object" && "value" in entry) {
                if (!entry.inputName) entry.inputName = this.inputName;
                entry = selectEntry(entry) as EntryType;
            } else {
                entry = selectEntry({value: entry, inputName: this.inputName}) as EntryType;
            }
        }

        if (!entry.selectedClasses) entry.selectedClasses = this.selectedEntryClasses;
        entry.addListener(DefaultEventName.click, (e: Event) => this.onEntryClick(entry, e));
        this.entriesParent.addChild(entry);

        this.entries.push(entry);
        return entry;
    }

    protected onEntryClick(entry: EntryType, e?: Event) {
        this.select(entry);
    }

    /**
     * @description Select an entry.
     * @param {string | EntryType} entry - The DropdownEntry (or its string value) to select.
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    public select(entry: ValueType | EntryType): this {
        if (!(entry instanceof TurboSelectEntry)) {
            let el = this.enabledEntries.find(el => el.value == entry);
            if (!el) return this;
            entry = el;
        }

        if (!this.multiSelection) this.selectedEntries.forEach(selectedEntry => {
            if (entry != selectedEntry) selectedEntry.toggle();
        });
        if (!entry.selected && this.forceSelection && this.selectedEntries.length == 0) entry.toggle();

        this.onSelect(entry.selected, entry, this.getIndex(entry));
        this.dispatchEvent(new TurboSelectInputEvent(entry, this.selectedValues));
        return this;
    }

    /**
     * @description Select an entry.
     * @param {number} index - The index of the entry to select
     * @param {(index: number, entriesCount: number, zero?: number) => number} [preprocess=trim] - Callback to execute
     * on the index to preprocess it. Defaults to trim().
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    public selectByIndex(index: number, preprocess: (index: number, entriesCount: number, zero?: number)
        => number = trim): this {
        index = preprocess(index, this.entries.length - 1, 0);
        return this.select(this.entries[index]);
    }

    public getIndex(entry: EntryType) {
        return this.entries.indexOf(entry);
    }

    public deselectAll() {
        this.selectedEntries.forEach(entry => entry.toggle());
    }

    public reset() {
        this.deselectAll();
        this.onEntryClick(this.enabledEntries[0]);
    }

    public get enabledEntries(): EntryType[] {
        return this.entries.filter(entry => entry.enabled);
    }

    public get enabledValues(): ValueType[] {
        return this.enabledEntries.map(entry => entry.value);
    }

    public find(value: ValueType): EntryType {
        return this.entries.find((entry) => entry.value == value);
    }

    public findAll(...values: ValueType[]): EntryType[] {
        return this.entries.filter(entry => values.includes(entry.value));
    }

    public enable(b: boolean, ...entries: (ValueType | EntryType)[]) {
        entries.forEach(entry => {
            if (entry instanceof TurboSelectEntry) entry.enabled = b;
            else this.find(entry).enabled = b;
        });
    }

    /**
     * @description The dropdown's currently selected entries
     */
    public get selectedEntries(): EntryType[] {
        return this.entries.filter(entry => entry.selected);
    }

    public get selectedEntry(): EntryType {
        return this.entries.find(entry => entry.selected);
    }

    /**
     * @description The dropdown's currently selected values
     */
    public get selectedValues(): ValueType[] {
        return this.selectedEntries.map(entry => entry.value);
    }

    public get selectedValue(): ValueType {
        return this.selectedEntry.value;
    }

    public get stringSelectedValue(): string {
        return this.selectedEntries.map(entry => entry.stringValue).join(", ");
    }

    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    public get values(): ValueType[] {
        return this.entries.map(entry => entry.value);
    }

    public set values(values: (ValueType | TurboSelectEntryProperties<ValueType> | EntryType)[]) {
        const selectedEntriesIndices = [];
        this.entries.forEach((entry, index) => {
            if (entry.selected && index < values.length) selectedEntriesIndices.push(index);
        });

        for (const entry of this.entries) entry.remove();
        this.entries.splice(0, this.entries.length);
        for (const entry of values) this.addEntry(entry);
        for (const index of selectedEntriesIndices) this.select(this.entries[index]);
    }
}

function select<ValueType = string, EntryType extends TurboSelectEntry<ValueType> = TurboSelectEntry<ValueType>>
(properties: TurboSelectProperties<ValueType, EntryType>): TurboSelect<ValueType, EntryType> {
    return new TurboSelect<ValueType, EntryType>(properties);
}

export {TurboSelect, select};