import {EntryData, TurboSelectConfig, TurboSelectProperties} from "./select.types";
import {TurboSelectInputEvent} from "./selectInputEvent";
import {trim} from "../../../utils/computations/misc";
import {$, turbo} from "../../../turboFunctions/turboFunctions";
import {TurboBaseElement} from "../../../turboElement/turboBaseElement/turboBaseElement";
import {auto} from "../../../decorators/auto/auto";
import {richElement, TurboRichElement} from "../richElement/richElement";
import {isNull, isUndefined} from "../../../utils/dataManipulation/misc";
import {input} from "../../../elementCreation/basicElements";
import {Delegate} from "../../datatypes/delegate/delegate";
import {DefaultEventName} from "../../../types/eventNaming.types";
import {stringify} from "../../../utils/dataManipulation/string";

/**
 * @class TurboSelect
 * @group Components
 * @category TurboSelect
 *
 * @description Base class for creating a selection menu

 * @extends TurboElement
 */
class TurboSelect<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends object = HTMLElement,
> extends TurboBaseElement {
    public static readonly config: TurboSelectConfig = {defaultSelectedEntryClasses: "selected"};

    private _inputField: HTMLInputElement;
    private _entries: EntryType[] = [];
    private readonly _entriesData: WeakMap<EntryType, EntryData> = new WeakMap();

    private parentObserver: MutationObserver;
    public readonly onSelectDelegate: Delegate<(b: boolean, entry: EntryType, index: number) => void> = new Delegate();
    public readonly onEnabledDelegate: Delegate<(b: boolean, entry: EntryType, index: number) => void> = new Delegate();

    /**
     * The dropdown's entries.
     */
    public get entries(): EntryType[] {
        return this._entries;
    }

    public set entries(value: HTMLCollection | NodeList | EntryType[]) {
        this.enableObserver(false);

        const previouslySelectedValues = this.selectedValues;
        this.clear();
        this._entries = (Array.isArray(value) ? value : Array.from(value) as EntryType[])
            .filter(entry => entry !== this.inputField);

        if (value instanceof HTMLCollection && value.item(0)) this.parent = value.item(0).parentElement;

        const array = this.entries;
        for (let i = 0; i < array.length; i++) this.onEntryAdded?.call(this, array[i], i);

        this.deselectAll();
        for (let i = 0; i < array.length; i++) {
            if (previouslySelectedValues.includes(this.getValue(array[i]))) this.select(array[i]);
        }

        if (this.selectedEntries.length === 0) this.initializeSelection();
        this.refreshInputField();
        this.enableObserver(true);
    }

    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    public get values(): ValueType[] {
        return this.entries.map(entry => this.getValue(entry));
    }

    public set values(values: ValueType[]) {
        const entries = [];
        values.forEach(value => {
            const entry = this.createEntry(value);
            if (entry instanceof Node && this.parent) $(this.parent).addChild(entry);
            entries.push(entry);
        });
        this.entries = entries;
    }

    public get selectedEntries(): EntryType[] {
        return this.entries.filter(entry => this.getEntryData(entry).selected);
    }

    public set selectedEntries(value: EntryType[]) {
        this.deselectAll();
        if (!value) return;
        value.forEach(entry => this.select(entry));
    }

    @auto() public set parent(value: Element) {
        if (!(value instanceof Element)) return;
        $(value).addChild(this.entries.filter(entry => entry instanceof Node) as Node[]);
        if (this.inputField) value.appendChild(this.inputField);
        this.setupParentObserver();
    }

    @auto({
        defaultValue: (entry: EntryType) => entry instanceof TurboRichElement ? entry.text
            : entry instanceof HTMLElement ? entry.textContent
                : entry instanceof Element ? entry.innerHTML
                    : undefined
    }) public getValue: (entry: EntryType) => ValueType;

    @auto({defaultValue: () => ""}) public getSecondaryValue: (entry: EntryType) => SecondaryValueType;

    @auto({
        defaultValue: (value: ValueType) => richElement({text: stringify(value)})
    }) public createEntry: (value: ValueType) => EntryType;

    @auto({
        defaultValue: function (entry: EntryType) {
            this.initializeSelection();
            $(entry).on(DefaultEventName.click, () => {
                this.select(entry, !this.isSelected(entry));
                return true;
            });
        },
    }) public onEntryAdded: (entry: EntryType, index: number) => void;

    @auto({
        defaultValue: function (entry: EntryType) {},
    }) public onEntryRemoved: (entry: EntryType) => void;

    /**
     * The dropdown's underlying hidden input. Might be undefined.
     */
    public get inputName(): string {
        return this.inputField?.name;
    }

    public set inputName(value: string) {
        if (!this._inputField) this._inputField = input({
            value: this.stringSelectedValue,
            type: "hidden",
            parent: this.parent ?? document.body
        });
        this.inputField.name = value;
    }

    public get inputField(): HTMLInputElement {
        return this._inputField;
    }

    @auto({defaultValue: false}) public set multiSelection(value: boolean) {
        this.forceSelection = !value;
    }

    @auto({defaultValueCallback: function () {return !this.multiSelection}}) public forceSelection: boolean;

    public set onSelect(value: (b: boolean, entry: EntryType, index: number) => void) {
        if (value) this.onSelectDelegate.add(value);
    }

    public set onEnabled(value: (b: boolean, entry: EntryType, index: number) => void) {
        if (value) this.onEnabledDelegate.add(value);
    }

    @auto({
        callBefore: function () {this.selectedEntries?.forEach(entry => turbo(entry).removeClass(this.selectedEntryClasses))},
        callAfter: function () {this.selectedEntries?.forEach(entry => turbo(entry).addClass(this.selectedEntryClasses))},
        initialValueCallback: function () {return this.getPropertiesValue(undefined, "defaultSelectedEntryClasses")},
    }) public selectedEntryClasses: string | string[];

    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    public constructor(properties: TurboSelectProperties<ValueType, SecondaryValueType, EntryType> = {}) {
        super();
        const selectedValues = properties.selectedValues || [];
        properties.selectedValues = undefined;

        if (!properties.onEnabled) properties.onEnabled = (b, entry) => {
            if (!(entry instanceof HTMLElement)) return;
            $(entry).setStyle("visibility", b ? "" : "hidden");
        };

        for (const property of Object.keys(properties)) {
            try {this[property] = properties[property]} catch {}
        }

        if (!this.forceSelection) this.deselectAll();
        this.entries.forEach(entry => {
            if (selectedValues.includes(this.getValue(entry))) {
                this.select(entry)
            }
        });
    }

    protected getEntryData(entry: EntryType): EntryData {
        if (!entry) return {};
        let data = this._entriesData.get(entry);
        if (!data) {
            data = {selected: false, enabled: true};
            this._entriesData.set(entry, data);
        }
        return data;
    }

    protected clearEntryData(entry: EntryType) {
        this._entriesData.delete(entry);
        const index = this.entries.indexOf(entry);
        if (index >= 0) this.entries.splice(index, 1);
    }

    public addEntry(entry: EntryType, index: number = this.entries.length) {
        if (index === undefined || typeof index !== "number" || index > this.entries.length) index = this.entries.length;
        if (index < 0) index = 0;

        this.enableObserver(false);
        this.onEntryAdded?.call(this, entry, index);

        if (Array.isArray(this.entries) && !this.entries.includes(entry)) this.entries.splice(index, 0, entry);
        if (entry instanceof Node && !entry.parentElement && this.parent) $(this.parent).addChild(entry, index);

        this.enableObserver(true);
        requestAnimationFrame(() => this.select(this.selectedEntry));
    }

    public getEntryFromSecondaryValue(value: SecondaryValueType): EntryType {
        return this.entries.find((entry: EntryType) => this.getSecondaryValue(entry) === value);
    }

    public isSelected(entry: EntryType): boolean {
        return this.selectedEntries.includes(entry);
    }

    protected getEntry(value: EntryType | ValueType): EntryType {
        let entry: EntryType;
        try {
            const fromValue = this.find(value as any);
            if (fromValue) entry = fromValue;
            else {
                const isEntry = this.entries.find(entry => entry === value);
                if (isEntry) entry = isEntry;
            }
        } catch {}
        return entry;
    }

    /**
     * @description Select an entry.
     * @param {string | EntryType} value - The DropdownEntry (or its string value) to select.
     * @param selected
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    public select(value: ValueType | EntryType, selected: boolean = true): this {
        if (isNull(value) || isUndefined(value)) return this;

        let entry: EntryType;
        try {
            const fromValue = this.getEntry(value as any);
            if (fromValue) entry = fromValue;
            else {
                const isEntry = this.entries.find(entry => entry === value);
                if (isEntry) entry = isEntry;
            }
        } catch {}
        if (!entry) return this;

        const wasSelected = this.isSelected(entry);
        if (selected === wasSelected) return this;
        if (!selected && wasSelected && this.selectedEntries.length <= 1 && this.forceSelection) return this;
        if (!this.multiSelection) this.deselectAll();

        this.getEntryData(entry).selected = selected;
        if (entry instanceof HTMLElement) $(entry).toggleClass(this.selectedEntryClasses, selected);

        this.initializeSelection();
        this.refreshInputField();

        this.onSelectDelegate.fire(selected, entry, this.getIndex(entry));
        (this.parent ?? document).dispatchEvent(new TurboSelectInputEvent<ValueType, SecondaryValueType, EntryType>({
            toggledEntry: entry,
            values: this.selectedValues
        }));

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
        this.selectedEntries.forEach(entry => {
            if (entry instanceof HTMLElement) $(entry).toggleClass(this.selectedEntryClasses, false);
            this.getEntryData(entry).selected = false;
        });
        this.refreshInputField();
    }

    public reset() {
        this.deselectAll();
        // todo this.onEntryClick(this.enabledEntries[0]);
    }

    public get enabledEntries(): EntryType[] {
        return this.entries.filter(entry => this.getEntryData(entry).enabled);
    }

    public get enabledValues(): ValueType[] {
        return this.enabledEntries.map(entry => this.getValue(entry));
    }

    public get enabledSecondaryValues(): SecondaryValueType[] {
        return this.enabledEntries.map(entry => this.getSecondaryValue(entry));
    }

    public find(value: ValueType): EntryType {
        return this.entries.find((entry) => this.getValue(entry) === value);
    }

    public findBySecondaryValue(value: SecondaryValueType): EntryType {
        return this.entries.find((entry) => this.getSecondaryValue(entry) === value);
    }

    public findAll(...values: ValueType[]): EntryType[] {
        return this.entries.filter(entry => values.includes(this.getValue(entry)));
    }

    public findAllBySecondaryValue(...values: SecondaryValueType[]): EntryType[] {
        return this.entries.filter((entry) => values.includes(this.getSecondaryValue(entry)));
    }

    public enable(b: boolean, ...entries: (ValueType | EntryType)[]) {
        if (!entries || entries.length === 0) entries = this.entries;
        entries.forEach(value => {
            const entry = this.getEntry(value);
            if (!entry) return;
            this.getEntryData(entry).enabled = b;
            this.onEnabledDelegate.fire(b, entry, this.getIndex(entry));
        });
    }

    /**
     * @description The dropdown's currently selected entries
     */

    public get selectedEntry(): EntryType {
        return this.selectedEntries[0];
    }

    /**
     * @description The dropdown's currently selected values
     */
    public get selectedValues(): ValueType[] {
        return this.selectedEntries.map(entry => this.getValue(entry));
    }

    public get selectedValue(): ValueType {
        const selectedEntry = this.selectedEntry;
        if (!selectedEntry) return;
        return this.getValue(selectedEntry);
    }

    public get selectedSecondaryValues(): SecondaryValueType[] {
        return this.selectedEntries.map(entry => this.getSecondaryValue(entry));
    }

    public get selectedSecondaryValue(): SecondaryValueType {
        const selectedEntry = this.selectedEntry;
        if (!selectedEntry) return;
        return this.getSecondaryValue(selectedEntry);
    }

    public get stringSelectedValue(): string {
        return this.selectedEntries.map(entry => stringify(this.getValue(entry))).join(", ");
    }

    public clear(): void {
        this.enableObserver(false);

        for (const entry of this.entries) {
            this.clearEntryData(entry);
            this.onEntryRemoved(entry);
            if (this.parent && entry instanceof HTMLElement) entry.remove();
        }
        this._entries = [];
        this.refreshInputField();
        this.enableObserver(true);
    }

    public refreshInputField() {
        if (this.inputField) this.inputField.value = this.stringSelectedValue;
    }

    public destroy() {
        this.enableObserver(false);
        this.parentObserver = null;
        return this;
    }

    protected enableObserver(value: boolean) {
        if (!value) return this.parentObserver?.disconnect();
        if (this.parent instanceof Element && this.parentObserver) this.parentObserver.observe(this.parent, {childList: true});
    }

    protected initializeSelection() {
        if (this.forceSelection && this.enabledEntries.length && this.selectedEntries.length === 0) {
            const fallback = this.enabledEntries[0];
            if (fallback) this.select(fallback);
        }
    }

    protected setupParentObserver() {
        this.enableObserver(false);
        this.parentObserver = new MutationObserver(records => {
            for (const record of records) {
                for (const node of record.addedNodes) {
                    if (!(node instanceof Element) || node.parentElement !== this.parent) continue;
                    if (node === this.inputField) continue;

                    const entry = node as EntryType;
                    const children: EntryType[] = (Array.from(this.parent!.children) as EntryType[])
                        .filter(el => el !== this.inputField)
                        .filter(el => this.entries.includes(el) || el === entry);

                    const targetIndex = children.indexOf(entry);
                    if (targetIndex < 0) continue;
                    if (targetIndex === 0) this.entries.splice(targetIndex, 0, entry);
                    else {
                        const previousIndex = this.entries.indexOf(children[targetIndex - 1]);
                        this.entries.splice(previousIndex + 1, 0, entry);
                    }

                    this.getEntryData(entry);
                    this.onEntryAdded?.call(this, entry, this.getIndex(entry));
                }

                for (const node of record.removedNodes) {
                    if (!(node instanceof Element)) continue;
                    if (node === this.inputField) continue;
                    queueMicrotask(() => {
                        if (node.isConnected) return;
                        const data = this.getEntryData(node as any);

                        if (data.selected && this.forceSelection && this.enabledEntries.length) {
                            const fallback = this.enabledEntries[0];
                            if (fallback) this.select(fallback);
                        }

                        data.selected = false;
                        this.onEntryRemoved?.call(this, node);
                        this.clearEntryData(node as any);
                    });
                }
            }
        });
        this.enableObserver(true);
    }
}

export {TurboSelect};