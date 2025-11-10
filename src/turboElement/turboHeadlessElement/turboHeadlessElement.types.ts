import {TurboView} from "../../mvc/core/view";
import {TurboModel} from "../../mvc/core/model";
import {TurboEmitter} from "../../mvc/core/emitter";
import {MvcProperties} from "../../mvc/mvc.types";
import {TurboElementMvcInterface} from "../setup/mvc/mvc.types";
import {TurboElementDefaultInterface} from "../setup/default/default.types";

/**
 * @type {TurboHeadlessProperties}
 * @group TurboElement
 * @category TurboHeadlessElement
 *
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * @description Object containing properties for configuring a headless (non-HTML) element, with possibly MVC properties.
 */
type TurboHeadlessProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = Omit<MvcProperties<object, ViewType, DataType, ModelType, EmitterType>, "element"> & {
    out?: string | Node,
    [key: string]: any
};

declare module "./turboHeadlessElement" {
    interface TurboHeadlessElement extends TurboElementDefaultInterface {}

    interface TurboHeadlessElement<
        ViewType extends TurboView = TurboView<any, any>,
        DataType extends object = object,
        ModelType extends TurboModel = TurboModel
    > extends TurboElementMvcInterface<ViewType, DataType, ModelType> {}
}

export {TurboHeadlessProperties};