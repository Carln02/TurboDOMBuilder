import {TurboSelectProperties} from "../../basics/select/select.types";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboElementProperties} from "../../../turboElement/turboElement.types";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {HTMLTag} from "../../../types/htmlElement.types";
import {TurboSelectElementProperties} from "../../basics/selectElement/selectElement.types";
import {TurboDropdown} from "./dropdown";

/**
 * @type {TurboDropdownProperties}
 * @group Components
 * @category TurboDropdown
 *
 * @description Properties for configuring a Dropdown.
 * @extends TurboProperties
 *
 * @property {(string | HTMLElement)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {HTMLElement} [popup] - The element used as a container for the dropdown entries.
 *
 * @property {boolean} [multiSelection=false] - Enables selection of multiple dropdown entries.
 *
 * @property {ValidTag} [selectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 *
 * @property {string | string[]} [selectorClasses] - Custom CSS class(es) for the selector. Overrides the default
 * classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [popupClasses] - Custom CSS class(es) for the popup container. Overrides the
 * default classes set in TurboConfig.Dropdown.
 */
type TurboDropdownProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<DataType>,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboSelectElementProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType, EmitterType> & {
    selector?: string | HTMLElement;
    popup?: HTMLElement;
    selectorTag?: HTMLTag;
    selectorClasses?: string | string[];
    popupClasses?: string | string[];
};


declare module "../../../types/element.types" {
    interface TurboElementTagNameMap {
        "turbo-dropdown": TurboDropdown
    }
}

export {TurboDropdownProperties};