import {define} from "../../../../domBuilding/decorators/define";
import "./dropdownEntry.css";
import {TurboSelectEntry} from "../../../basics/select/selectEntry/selectEntry";
import {TurboSelectEntryProperties} from "../../../basics/select/selectEntry/selectEntry.types";

/**
 * @class TurboDropdownEntry
 * @description Class representing an entry within a Dropdown.
 * @extends TurboElement
 */

@define("turbo-dropdown-entry")
class TurboDropdownEntry extends TurboSelectEntry {

    /**
     * @description DropdownEntry constructor
     * @param {TurboSelectEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties: TurboSelectEntryProperties) {
        super(properties);
    }
}

function dropdownEntry(properties: TurboSelectEntryProperties) {
    return new TurboDropdownEntry(properties);
}

export {TurboDropdownEntry, dropdownEntry};