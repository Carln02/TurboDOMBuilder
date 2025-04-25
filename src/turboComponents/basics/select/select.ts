import {TurboElement} from "../../../domBuilding/turboElement/turboElement";
import {define} from "../../../domBuilding/decorators/define";
import {TurboSelectEntry} from "./selectEntry/selectEntry";
import {TurboSelectConfig, TurboSelectProperties} from "./select.types";
import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {TurboSelectEntryProperties} from "./selectEntry/selectEntry.types";
import {TurboSelectInputEvent} from "./selectInputEvent";
import {trim} from "../../../utils/computations/misc";
import {TurboView} from "../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../domBuilding/mvc/turboModel";

/**
 * Base class for creating a selection menu
 * @class TurboSelect
 * @extends TurboElement
 */
@define()
class TurboSelect<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboElement<ViewType, DataType, ModelType> {
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

    protected readonly multiSelection: boolean = false;
    protected readonly forceSelection: boolean = false;

    public onSelect: (b: boolean, entry: EntryType, index: number) => void;

    protected readonly selectedEntryClasses: string | string[];

    public static readonly config: TurboSelectConfig = {};

    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    public constructor(properties: TurboSelectProperties<ValueType, SecondaryValueType, EntryType, ViewType,
        DataType, ModelType>) {
        super(properties);

        if (!properties.unsetDefaultClasses) this.addClass(TurboSelect.config.defaultClasses);
        if (!properties.selectedValues) properties.selectedValues = [];

        this.entriesParent = properties.entriesParent ?? this;
        this.multiSelection = properties.multiSelection ?? false;
        this.forceSelection = properties.forceSelection ?? !this.multiSelection;

        this.inputName = properties.inputName;

        this.onSelect = properties.onSelect || (() => {});

        this.selectedEntryClasses = properties.customSelectedEntryClasses || TurboSelect.config.defaultSelectedEntryClasses;

        (properties.values ?? []).forEach(entry => this.addEntry(entry));
        //TODO MAKE IT BETTER SOMEHOW (I WANT TO RUN IT AFTER CHILD CLASSES FINISH SETTING UP)
        requestAnimationFrame(() => {
            this.entries.forEach(entry => {
                if (properties.selectedValues?.includes(entry.value)) this.select(entry);
            });
        });
    }

    public addEntry(entry: ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType): EntryType {
        if (!(entry instanceof TurboSelectEntry)) {
            if (typeof entry == "object" && "value" in entry) {
                if (!entry.inputName) entry.inputName = this.inputName;
                entry = new TurboSelectEntry(entry) as EntryType;
            } else {
                entry = new TurboSelectEntry({value: entry, inputName: this.inputName}) as EntryType;
            }
        }

        if (!entry.selectedClasses) entry.selectedClasses = this.selectedEntryClasses;
        entry.addListener(DefaultEventName.click, (e: Event) => this.onEntryClick(entry, e));
        entry.onAttach = () => requestAnimationFrame(() => this.select(this.selectedEntry));

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
        if (entry === undefined || entry === null) return this;
        if (!(entry instanceof TurboSelectEntry)) {
            let el = this.enabledEntries.find(el => el.value == entry);
            if (!el) return this;
            entry = el;
        }

        if (!this.multiSelection) this.selectedEntries.forEach(selectedEntry => selectedEntry.toggle());
        entry.toggle();

        this.onSelect(entry.selected, entry, this.getIndex(entry));
        this.dispatchEvent(new TurboSelectInputEvent<ValueType, SecondaryValueType>(entry, this.selectedValues));
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

    public get enabledSecondaryValues(): SecondaryValueType[] {
        return this.enabledEntries.map(entry => entry.secondaryValue);
    }

    public find(value: ValueType): EntryType {
        return this.entries.find((entry) => entry.value == value);
    }

    public findBySecondaryValue(value: SecondaryValueType): EntryType {
        return this.entries.find((entry) => entry.secondaryValue == value);
    }

    public findAll(...values: ValueType[]): EntryType[] {
        return this.entries.filter(entry => values.includes(entry.value));
    }

    public findAllBySecondaryValue(...values: SecondaryValueType[]): EntryType[] {
        return this.entries.filter((entry) => values.includes(entry.secondaryValue));
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
        return this.selectedEntry?.value;
    }

    public get selectedSecondaryValues(): SecondaryValueType[] {
        return this.selectedEntries.map(entry => entry.secondaryValue);
    }

    public get selectedSecondaryValue(): SecondaryValueType {
        return this.selectedEntry?.secondaryValue;
    }

    public get stringSelectedValue(): string {
        return this.selectedEntries.map(entry => entry.stringValue).join(", ");
    }

    public clear(): void {
        for (const entry of this.entries) entry.remove();
        this.entries.splice(0, this.entries.length);
    }

    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    public get values(): ValueType[] {
        return this.entries.map(entry => entry.value);
    }

    public set values(values: (ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType)[]) {
        const selectedEntriesIndices = [];
        this.entries.filter((entry, index) => entry.selected && index < values.length);

        this.clear();
        for (const entry of values) this.addEntry(entry);
        for (const index of selectedEntriesIndices) this.select(this.entries[index]);
        if (!this.selectedEntry && this.forceSelection) this.select(this.entries[0]);
        this.select(this.selectedEntry);
    }
}

export {TurboSelect};