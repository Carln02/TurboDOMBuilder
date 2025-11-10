import {TurboInteractorProperties} from "./interactor/interactor.types";
import {TurboControllerProperties} from "./logic/logic.types";
import {TurboViewProperties} from "./core/core.types";
import {TurboView} from "./core/view";
import {TurboModel} from "./core/model";
import {TurboHandler} from "./logic/handler";
import {TurboController} from "./logic/controller";
import {TurboInteractor} from "./interactor/interactor";
import {TurboEmitter} from "./core/emitter";
import {TurboTool} from "./tool/tool";
import {TurboToolProperties} from "./tool/tool.types";
import {TurboSubstrate} from "./substrate/substrate";
import {TurboSubstrateProperties} from "./substrate/substrate.types";

/**
 * @group MVC
 * @category MVC
 *
 * @type {MvcInstanceOrConstructor}
 * @template Type
 * @template PropertiesType
 * @description Type representing the constructor of a certain `Type` (which takes a single parameter), or an
 * instance of `Type`.
 */
export type MvcInstanceOrConstructor<Type, PropertiesType = any> = Type | (new (properties: PropertiesType) => Type);

/**
 * @group MVC
 * @category MVC
 *
 * @type {MvcManyInstancesOrConstructors}
 * @template Type
 * @template PropertiesType
 * @description Type representing a single entry or an array of {@link MvcInstanceOrConstructor}.
 */
export type MvcManyInstancesOrConstructors<Type, PropertiesType = any> = MvcInstanceOrConstructor<Type, PropertiesType>
    | MvcInstanceOrConstructor<Type, PropertiesType>[];


/**
 * @type {MvcGenerationProperties}
 * @group MVC
 * @category MVC
 *
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {object} DataType - The element's data type, if any.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Type representing a configuration object for an {@link Mvc} instance.
 * @property {MvcInstanceOrConstructor<ViewType, TurboViewProperties>} [view] - The view (or view constructor) to attach.
 * @property {ModelType | (new (data?: any, dataBlocksType?: "map" | "array") => ModelType)} [model] - The model
 * (or model constructor) to attach.
 * @property {MvcInstanceOrConstructor<EmitterType, ModelType>} [emitter] - The emitter (or emitter constructor) to
 * attach. If not defined, a default TurboEmitter will be created.
 * @property {MvcManyInstancesOrConstructors<TurboController, TurboControllerProperties>} [controllers] - The
 * controller, constructor of controller, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboHandler, ModelType>} [handlers] - The
 * handler, constructor of handler, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboInteractor, TurboInteractorProperties>} [interactors] - The
 * interactor, constructor of interactor, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboTool, TurboToolProperties>} [tools] - The
 * tool, constructor of tool, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboSubstrate, TurboSubstrateProperties>} [substrates] - The
 * substrate, constructor of substrate, or array of the latter, to attach.
 * @property {DataType} [data] - The data to attach to the model.
 * @property {boolean} [initialize] - Whether to initialize the MVC pieces after setting them or not. Defaults to true.
 */
type MvcGenerationProperties<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = {
    view?: MvcInstanceOrConstructor<ViewType, TurboViewProperties>,
    model?: ModelType | (new (data?: any, dataBlocksType?: "map" | "array") => ModelType),
    emitter?: MvcInstanceOrConstructor<EmitterType, ModelType>,

    controllers?: MvcManyInstancesOrConstructors<TurboController, TurboControllerProperties>,
    handlers?: MvcManyInstancesOrConstructors<TurboHandler, ModelType>,

    interactors?: MvcManyInstancesOrConstructors<TurboInteractor, TurboInteractorProperties>,
    tools?: MvcManyInstancesOrConstructors<TurboTool, TurboToolProperties>,
    substrates?: MvcManyInstancesOrConstructors<TurboSubstrate, TurboSubstrateProperties>,

    data?: DataType,
    initialize?: boolean,
};

/**
 * @type {MvcProperties}
 * @group MVC
 * @category MVC
 *
 * @template {object} ElementType - The type of the element attached to the {@link Mvc} object.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {object} DataType - The element's data type, if any.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Type of the properties object used for instantiating an {@link Mvc} object.
 * @extends MvcGenerationProperties
 * @property {ElementType} [element] - The element to attach to the Mvc instance.
 */
type MvcProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType> & {
    element?: ElementType,
};

export {MvcProperties, MvcGenerationProperties};