import {HTMLTag, TurboProperties} from "../../core/definitions/turbo-types";
import {DropdownEntry} from "./dropdown-entry";

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
 * @property {(string | HTMLElement)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {HTMLElement} [popup] - The element used as a container for the dropdown entries.
 *
 * @property {boolean} [multiSelection=false] - Enables selection of multiple dropdown entries.
 * @property {string} [underlyingInputName] - Name attribute for a hidden input element to store the selected value(s).
 * If not declared, the hidden input will not be created.
 *
 * @property {HTMLTag} [customSelectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 * @property {HTMLTag} [customEntryTag] - Custom HTML tag for dropdown entries.  Overrides the
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

    selector?: string | HTMLElement;
    popup?: HTMLElement;

    multiSelection?: boolean;
    underlyingInputName?: string,

    customSelectorTag?: HTMLTag;
    customEntryTag?: HTMLTag;

    customSelectorClasses?: string;
    customPopupClasses?: string;
    customEntriesClasses?: string;
    customSelectedEntriesClasses?: string;
};

/**
 * @type {TurboDropdownConfig}
 * @description Configuration object for the Dropdown class. Set it via TurboConfig.Dropdown.
 *
 * @property {HTMLTag} [defaultEntryTag] - The default HTML tag for the creation of generic
 * dropdown entries.
 * @property {HTMLTag} [defaultSelectorTag] - The default HTML tag for the creation of the text
 * element in generic selectors (which are Buttons).
 *
 * @property {string | string[]} [defaultSelectorClasses] - The default classes to assign to the selector.
 * @property {string | string[]} [defaultPopupClasses] - The default classes to assign to the popup element.
 * @property {string | string[]} [defaultEntriesClasses] - The default classes to assign to the dropdown entries.
 * @property {string | string[]} [defaultSelectedEntriesClasses] - The default classes to assign to the selected
 * dropdown entries.
 */
type TurboDropdownConfig = {
    defaultEntryTag?: HTMLTag;
    defaultSelectorTag?: HTMLTag;

    defaultSelectorClasses?: string | string[]
    defaultPopupClasses?: string | string[];
    defaultEntriesClasses?: string | string[];
    defaultSelectedEntriesClasses?: string | string[];
}

export {TurboDropdownProperties, TurboDropdownEntryProperties, TurboDropdownConfig};