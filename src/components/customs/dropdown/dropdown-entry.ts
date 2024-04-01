import {TurboDropdownEntryProperties} from "./dropdown-types";
import {TurboElement} from "../../../core/turbo-element";
import {setProperties} from "../../../turbo-functions/element-manipulation/set-properties";

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
        this.value = properties.value;
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
        this.innerText = value;
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

customElements.define("turbo-dropdown-entry", DropdownEntry);

function dropdownEntry(properties: TurboDropdownEntryProperties): DropdownEntry {
    let el = document.createElement("turbo-dropdown-entry") as DropdownEntry;
    setProperties(el, properties);
    return el;
}

export {DropdownEntry, dropdownEntry};