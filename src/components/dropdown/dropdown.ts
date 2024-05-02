import {TurboElement} from "../../core/turbo-element";
import {input} from "../../turbo-element-creation/basics/basic-generated-functions";
import {button, TurboButton} from "../button/button";
import {dropdownEntry, DropdownEntry} from "./dropdown-entry";
import {TurboDropdownConfig, TurboDropdownProperties} from "./dropdown-types";
import {addClass} from "../../turbo-functions/class-manipulation/add-class";
import {addChild} from "../../turbo-functions/child-manipulation/add-child";
import {ElementTagMap} from "../../core/definitions/turbo-types";
import "./dropdown.css";
import { popup } from "../popup/popup";
import {define} from "../../core/descriptors/define";

/**
 * Dropdown class for creating Turbo button elements.
 * @class Dropdown
 * @extends TurboElement
 */
@define("turbo-dropdown")
class Dropdown extends TurboElement {
    /**
     * The dropdown's selector element.
     */
    public readonly selector: HTMLElement;

    /**
     * The dropdown's popup element.
     */
    public readonly popup: HTMLElement;

    /**
     * The dropdown's entries.
     */
    private _entries: DropdownEntry[] = [];

    /**
     * The dropdown's underlying hidden input. Might be undefined.
     */
    public readonly underlyingInput?: HTMLInputElement;

    private popupOpen: boolean = false;
    private readonly multiSelection: boolean = false;

    static readonly config: TurboDropdownConfig = {defaultEntryTag: "h4", defaultSelectorTag: "h4"};

    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties: TurboDropdownProperties) {
        super(properties);

        if (!properties.selectedValues) properties.selectedValues = [];

        if (properties.multiSelection) this.multiSelection = properties.multiSelection;

        if (properties.underlyingInputName)
            this.underlyingInput = input({type: "hidden", name: properties.underlyingInputName});

        this.selector = this.createSelector(properties);
        this.popup = this.createPopup(properties);

        this.entries = properties.values.map(entry => this.createDropdownEntry(entry, properties));
        this.entries.forEach(entry => {
            if (properties.selectedValues?.includes(entry.value)) this.select(entry);
        });

        document.addEventListener("click", e => {
            if (this.popupOpen && !this.contains(e.target as Node)) this.openPopup(false);
        });
    }

    private createSelector(properties: TurboDropdownProperties) {
        let selector: HTMLElement;

        if (properties.selector instanceof HTMLElement) {
            selector = properties.selector;
        } else {
            let textTag: keyof ElementTagMap = properties.customSelectorTag
                ? properties.customSelectorTag
                : Dropdown.config.defaultSelectorTag;

            let initialText = typeof properties.selector == "string"
                ? properties.selector
                : typeof properties.values[0] == "string"
                    ? properties.values[0]
                    : properties.values[0].value;

            selector = button({buttonText: initialText, customTextTag: textTag});
        }

        let selectorClasses = properties.customSelectorClasses
            ? properties.customSelectorClasses
            : Dropdown.config.defaultSelectorClasses;

        selector.addEventListener("click", () => this.openPopup(!this.popupOpen));
        this.addChild(selector);
        addClass(selector, selectorClasses);

        return selector;
    }

    private createPopup(properties: TurboDropdownProperties) {
        let popupEl = properties.popup ? properties.popup : popup();
        let popupClasses = properties.customPopupClasses
            ? properties.customPopupClasses
            : Dropdown.config.defaultPopupClasses;

        this.addChild(popupEl);
        popupEl.style.display = "none";
        addClass(popupEl, popupClasses);

        return popupEl;
    }

    private createDropdownEntry(entry: string | DropdownEntry, properties: TurboDropdownProperties) {
        if (typeof entry == "string") entry = dropdownEntry({value: entry});

        entry.addClass(properties.customEntriesClasses
            ? properties.customEntriesClasses
            : Dropdown.config.defaultEntriesClasses);

        entry.selectedClass += " " + (properties.customSelectedEntriesClasses
            ? properties.customSelectedEntriesClasses
            : Dropdown.config.defaultSelectedEntriesClasses);

        entry.addEventListener("click", () => {
            this.select(entry);
            this.openPopup(false);
        });

        addChild(this.popup, entry);
        return entry;
    }

    /**
     * @description Select an entry.
     * @param {string | DropdownEntry} entry - The DropdownEntry (or its string value) to select.
     * @return {Dropdown} - This Dropdown for chaining.
     */
    select(entry: string | DropdownEntry): Dropdown {
        if (typeof entry == "string") {
            let el = this.entries.find(el => el.value == entry);
            if (!el) return this;
            entry = el;
        }

        if (!this.multiSelection) this.selectedEntries.forEach(entry => entry.toggle());
        entry.toggle();
        this.updateSelectorText();
        this.dispatchEvent(new CustomEvent("change", {
            detail: {selectedValues: this.selectedValues}
        }));
        return this;
    }

    public reset() {
        this.entries[0].click();
    }

    public get entries(): DropdownEntry[] {
        return this._entries;
    }

    private set entries(values: DropdownEntry[]) {
        this._entries = values;
    }

    /**
     * @description The dropdown's currently selected entries
     */
    get selectedEntries(): DropdownEntry[] {
        return this.entries.filter(entry => entry.selected);
    }

    /**
     * @description The dropdown's currently selected values
     */
    get selectedValues(): string[] {
        return this.selectedEntries.map(entry => entry.value);
    }

    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    get values() {
        return this.entries.map(entry => entry.value);
    }

    set values(values: string[]) {
        for (let i = 0; i < Math.min(this.entries.length, values.length); i++) {
            this.entries[i].value = values[i];
        }

        this.updateSelectorText();
    }

    private updateSelectorText() {
        let newValue = this.selectedValues.join(", ");
        if (this.underlyingInput) this.underlyingInput.value = newValue;
        if (this.selector instanceof TurboButton) this.selector.buttonText = newValue;
    }

    private openPopup(b: boolean) {
        if (this.popupOpen == b) return;
        this.popupOpen = b;
        if (this.popup instanceof TurboElement) this.popup.show(b);
        else this.popup.style.display = b ? "" : "none";
    }
}

function dropdown(properties: TurboDropdownProperties): Dropdown {
    return new Dropdown(properties);
}

export {Dropdown, dropdown};