import {TurboProxiedProperties} from "./turboProxiedElement/turboProxiedElement.types";
import {TurboEmitter} from "../mvc/core/emitter";
import {TurboModel} from "../mvc/core/model";
import {TurboView} from "../mvc/core/view";
import {TurboElementDefaultInterface} from "./setup/default/default.types";
import {TurboElementMvcInterface} from "./setup/mvc/mvc.types";
import {TurboElementUiInterface} from "./setup/ui/ui.types";

/**
 * @type {TurboElementProperties}
 * @extends TurboProperties
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 *
 * @description Object containing properties for configuring a custom HTML element. Is basically TurboProperties
 * without the tag.
 */
type TurboElementProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboProxiedProperties<"div", ViewType, DataType, ModelType, EmitterType>;

type TurboElementConfig = {
    shadowDOM?: boolean,
    defaultSelectedClass?: string | string[]
    defaultClasses?: string | string[],
    [key: string]: any
};

declare module "./turboElement" {
    interface TurboElement extends TurboElementDefaultInterface {}

    interface TurboElement<
        ViewType extends TurboView = TurboView<any, any>,
        DataType extends object = object,
        ModelType extends TurboModel = TurboModel
    > extends TurboElementMvcInterface<ViewType, DataType, ModelType> {}

    interface TurboElement extends TurboElementUiInterface {}
}

export {TurboElementProperties, TurboElementConfig};