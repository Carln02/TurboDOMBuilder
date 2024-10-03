import { TurboSelectConfig, TurboSelectProperties } from "../../basics/select/select.types";
import { HTMLTag } from "../../../domBuilding/core.types";
import { TurboSelectEntry } from "../../basics/select/selectEntry/selectEntry";
/**
 * @type {TurboDropdownProperties}
 * @description Properties for configuring a Dropdown.
 * @extends TurboProperties
 *
 * @property {(string | HTMLElement)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {HTMLElement} [popup] - The element used as a container for the dropdown entries.
 *
 * @property {boolean} [multiSelection=false] - Enables selection of multiple dropdown entries.
 *
 * @property {ValidTag} [customSelectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 * @property {ValidTag} [customEntryTag] - Custom HTML tag for dropdown entries.  Overrides the
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
type TurboDropdownProperties<ValueType = string, EntryType extends TurboSelectEntry<ValueType> = TurboSelectEntry<ValueType>> = TurboSelectProperties<ValueType, EntryType> & {
    selector?: string | HTMLElement;
    popup?: HTMLElement;
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
 * @property {ValidTag} [defaultEntryTag] - The default HTML tag for the creation of generic
 * dropdown entries.
 * @property {ValidTag} [defaultSelectorTag] - The default HTML tag for the creation of the text
 * element in generic selectors (which are Buttons).
 *
 * @property {string | string[]} [defaultSelectorClasses] - The default classes to assign to the selector.
 * @property {string | string[]} [defaultPopupClasses] - The default classes to assign to the popup element.
 * @property {string | string[]} [defaultEntriesClasses] - The default classes to assign to the dropdown entries.
 * @property {string | string[]} [defaultSelectedEntriesClasses] - The default classes to assign to the selected
 * dropdown entries.
 */
type TurboDropdownConfig = TurboSelectConfig & {
    defaultEntryTag?: HTMLTag;
    defaultSelectorTag?: HTMLTag;
    defaultSelectorClasses?: string | string[];
    defaultPopupClasses?: string | string[];
    defaultEntriesClasses?: string | string[];
    defaultSelectedEntriesClasses?: string | string[];
};
export { TurboDropdownProperties, TurboDropdownConfig };
