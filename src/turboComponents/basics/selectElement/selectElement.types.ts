import {TurboSelectProperties} from "../select/select.types";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboElementProperties} from "../../../turboElement/turboElement.types";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {TurboSelectElement} from "./selectElement";

/**
 * @type {TurboSelectElementProperties}
 * @group Components
 * @category TurboDropdown
 *
 * @description Properties for configuring a Dropdown.
 * @extends TurboProperties
 *
 * @property {string | string[]} [entriesClasses] - CSS class(es) for dropdown entries.
 * @property {string | string[]} [selectedEntriesClasses] - CSS class(es) for selected entries.
 */
type TurboSelectElementProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<DataType>,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType>
    & TurboSelectProperties<ValueType, SecondaryValueType, EntryType> & {
    entriesClasses?: string | string[];
    selectedEntriesClasses?: string | string[];
};

declare module "../../../types/element.types" {
    interface TurboElementTagNameMap {
        "turbo-select-element": TurboSelectElement
    }
}

export {TurboSelectElementProperties};