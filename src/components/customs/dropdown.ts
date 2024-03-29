import {TurboElement} from "../../turbo/elements/turbo-element";
import {TurboProperties, TurboCompatible} from "../../turbo/definitions/turbo-types";
import {element} from "../element";
import {input, TurboInput} from "../basics/input";
import {Button} from "./button";
import {addChild, addClass} from "../../turbo/core/base-functions";

/**
 * @type {TurboDropdownEntryProperties}
 * @description Properties for configuring a DropdownEntry.
 * @extends TurboProperties
 *
 * @property {string} value - The value associated with the dropdown entry.
 * @property {boolean} [selected=false] - Indicates whether the entry is initially selected.
 * @property {string | string[]} [selectedClass=""] - CSS class(es) applied to the entry when it is selected.
 */
type TurboDropdownEntryProperties = TurboProperties & {
    value: string;
    selected?: boolean;
    selectedClass?: string;
}

/**
 * @type {TurboDropdownProperties}
 * @description Properties for configuring a Dropdown.
 * @extends TurboProperties
 *
 * @property {(string | DropdownEntry)[]} values - The values or DropdownEntry instances to be used as dropdown options.
 * @property {string[]} [selectedValues=[]] - Array of values that are initially selected.
 * @property {(string | TurboCompatible)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {TurboCompatible} [popup] - The element used as a container for the dropdown entries.
 *
 * @property {boolean} [multiSelection=false] - Enables selection of multiple dropdown entries.
 * @property {string} [underlyingInputName] - Name attribute for a hidden input element to store the selected value(s).
 * If not declared, the hidden input will not be created.
 *
 * @property {keyof HTMLElementTagNameMap} [customSelectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 * @property {keyof HTMLElementTagNameMap} [customEntryTag] - Custom HTML tag for dropdown entries.  Overrides the
 * default tag set in TurboConfig.Dropdown.
 *
 * @property {string | string[]} [customSelectorClasses] - Custom CSS class(es) for the selector. Overrides the default
 * classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [customPopupClasses] - Custom CSS class(es) for the popup container. Overrides the
 * default classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [customEntriesClasses] - Custom CSS class(es) for dropdown entries.  Overrides the
 * default classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [customSelectedEntriesClasses] - Custom CSS class(es) for selected entries.  Overrides
 * the default classes set in TurboConfig.Dropdown.
 */
type TurboDropdownProperties = TurboProperties & {
    values: (string | DropdownEntry)[];
    selectedValues?: string[],

    selector?: string | TurboCompatible;
    popup?: TurboCompatible;

    multiSelection?: boolean;
    underlyingInputName?: string,

    customSelectorTag?: keyof HTMLElementTagNameMap;
    customEntryTag?: keyof HTMLElementTagNameMap;

    customSelectorClasses?: string;
    customPopupClasses?: string;
    customEntriesClasses?: string;
    customSelectedEntriesClasses?: string;
};

/**
 * @type {TurboDropdownConfig}
 * @description Configuration object for the Dropdown class. Set it via TurboConfig.Dropdown.
 *
 * @property {keyof HTMLElementTagNameMap} [defaultEntryTag] - The default HTML tag for the creation of generic
 * dropdown entries.
 * @property {keyof HTMLElementTagNameMap} [defaultSelectorTag] - The default HTML tag for the creation of the text
 * element in generic selectors (which are Buttons).
 *
 * @property {string | string[]} [defaultSelectorClasses] - The default classes to assign to the selector.
 * @property {string | string[]} [defaultPopupClasses] - The default classes to assign to the popup element.
 * @property {string | string[]} [defaultEntriesClasses] - The default classes to assign to the dropdown entries.
 * @property {string | string[]} [defaultSelectedEntriesClasses] - The default classes to assign to the selected
 * dropdown entries.
 */
type TurboDropdownConfig = {
    defaultEntryTag?: keyof HTMLElementTagNameMap;
    defaultSelectorTag?: keyof HTMLElementTagNameMap;

    defaultSelectorClasses?: string | string[]
    defaultPopupClasses?: string | string[];
    defaultEntriesClasses?: string | string[];
    defaultSelectedEntriesClasses?: string | string[];
}

/**
 * Dropdown class for creating Turbo button elements.
 * @class Dropdown
 * @extends TurboElement
 */
class Dropdown extends TurboElement {
    /**
     * The dropdown's selector element.
     */
    public readonly selector: TurboCompatible;

    /**
     * The dropdown's popup element.
     */
    public readonly popup: TurboCompatible;

    /**
     * The dropdown's entries.
     */
    public readonly entries: DropdownEntry[];

    /**
     * The dropdown's underlying hidden input. Might be undefined.
     */
    public readonly underlyingInput?: TurboInput;

    private readonly multiSelection: boolean = false;

    static readonly config: TurboDropdownConfig = {defaultEntryTag: "h4", defaultSelectorTag: "h4"};

    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties: TurboDropdownProperties) {
        super(properties);

        if (properties.multiSelection) this.multiSelection = properties.multiSelection;

        if (properties.underlyingInputName)
            this.underlyingInput = input({type: "hidden", name: properties.underlyingInputName});

        this.selector = (properties.selector && typeof properties.selector != "string") ? properties.selector
            : new Button({
                buttonText: properties.selector, customTextTag: properties.customSelectorTag
                    ? properties.customSelectorTag : Dropdown.config.defaultSelectorTag
            });
        this.addChild(this.selector as HTMLElement);
        addClass(this.selector, properties.customSelectorClasses ? properties.customSelectorClasses
            : Dropdown.config.defaultSelectorClasses);

        this.popup = properties.popup ? properties.popup : element({});
        this.addChild(this.popup);
        addClass(this.popup, properties.customPopupClasses ? properties.customPopupClasses
            : Dropdown.config.defaultPopupClasses);

        if (!properties.selectedValues) properties.selectedValues = [];

        this.entries = properties.values.map(entry => {
            if (typeof entry == "string") entry = new DropdownEntry({value: entry,
            tag: properties.customEntryTag ? properties.customEntryTag : Dropdown.config.defaultEntryTag});

            entry.addClass(properties.customEntriesClasses ? properties.customEntriesClasses
                : Dropdown.config.defaultEntriesClasses);

            entry.selectedClass += " " + (properties.customSelectedEntriesClasses
                ? properties.customSelectedEntriesClasses : Dropdown.config.defaultSelectedEntriesClasses);

            addChild(this.popup, entry);
            if (properties.selectedValues?.includes(entry.value)) this.select(entry);

            return entry;
        });
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

    private updateSelectorText() {
        let newValue = this.selectedValues.join(", ");
        if (this.underlyingInput) this.underlyingInput.value = newValue;
        if (this.selector instanceof Button) this.selector.buttonText = newValue;
    }
}

/**
 * @class DropdownEntry
 * @description Class representing an entry within a Dropdown.
 * @extends TurboElement
 */
class DropdownEntry extends TurboElement {
    private _value: string;
    private _selected: boolean = false;
    private _selectedClass: string | string[] = "";

    /**
     * @description DropdownEntry constructor
     * @param {TurboDropdownEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties: TurboDropdownEntryProperties) {
        super(properties);

        //TODO maybe switch to setter
        this._value = properties.value;
        if (properties.selectedClass) this.selectedClass = properties.selectedClass;
        if (properties.selected) this.selected = properties.selected;
    }

    /**
     * @description Toggles the selection of this dropdown entry
     */
    toggle() {
        this.selected = !this.selected;
    }

    /**
     * @description The value of the dropdown entry
     */
    get value() {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    /**
     * @description Whether or not the dropdown entry is selected
     */
    get selected() {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
        this.toggleClass(this.selectedClass, value);
    }

    /**
     * @description The class(es) assigned to the dropdown entry when it is selected
     */
    get selectedClass() {
        return this._selectedClass;
    }

    set selectedClass(value: string | string[]) {
        this._selectedClass = value;
    }
}

customElements.define("turbo-dropdown", Dropdown);
customElements.define("turbo-dropdown-entry", DropdownEntry);

export {TurboDropdownProperties, TurboDropdownEntryProperties, TurboDropdownConfig, Dropdown, DropdownEntry};