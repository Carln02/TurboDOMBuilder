import {TurboProperties} from "../../../../domBuilding/turboElement/turboElement.types";
import {TurboRichElementProperties} from "../../richElement/richElement.types";
import {ValidTag} from "../../../../domBuilding/core.types";

/**
 * @type {TurboSelectEntryProperties}
 * @description Properties for configuring a DropdownEntry.
 * @extends TurboProperties
 *
 * @property {string} value - The value associated with the dropdown entry.
 * @property {boolean} [selected=false] - Indicates whether the entry is initially selected.
 * @property {string | string[]} [selectedClasses=""] - CSS class(es) applied to the entry when it is selected.
 */
type TurboSelectEntryProperties<ValueType = string, ElementTag extends ValidTag = "p"> =
    TurboRichElementProperties<ElementTag> & {
    unsetDefaultClasses?: boolean,
    selectedClasses?: string | string[],

    value: ValueType,
    selected?: boolean,
    enabled?: boolean,

    action?: () => void,
    onSelected?: (selected: boolean) => void,
    onEnabled?: (enabled: boolean) => void,

    reflectValueOn?: HTMLElement,
    inputName?: string
};

type TurboSelectEntryConfig = {
    defaultClasses?: string | string[],
};

export {TurboSelectEntryProperties, TurboSelectEntryConfig};