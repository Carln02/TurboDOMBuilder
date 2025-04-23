import {TurboView} from "./turboView";
import {TurboModel} from "./turboModel";
import {TurboController} from "./turboController";
import {TurboHandler} from "./turboHandler";
import {TurboEmitter} from "./turboEmitter";

type MvcHandlerProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = {
    element?: ElementType,

    view?: ViewType,
    model?: ModelType,
    emitter?: EmitterType,

    data?: DataType,

    viewConstructor?: new (properties: MvcViewProperties) => ViewType,
    modelConstructor?: new (data?: DataType) => ModelType,
    emitterConstructor?: new (model: ModelType) => EmitterType,
    controllerConstructors?: (new (properties: MvcControllerProperties) => TurboController)[],
    handlerConstructors?: (new (model: ModelType) => TurboHandler)[],

    generate?: boolean,
    initialize?: boolean
};

type MvcGenerationProperties<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = {
    viewConstructor?: new (properties: MvcViewProperties) => ViewType,
    modelConstructor?: new (data?: DataType) => ModelType,
    emitterConstructor?: new (model: ModelType) => EmitterType,
    controllerConstructors?: (new (properties: MvcControllerProperties) => TurboController)[],
    handlerConstructors?: (new (model: ModelType) => TurboHandler)[],

    data?: DataType,
    initialize?: boolean,
    force?: boolean
};

type MvcViewProperties<
    ElementType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = {
    element: ElementType,
    model: ModelType,
    emitter: EmitterType
};

type MvcControllerProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = MvcViewProperties<ElementType, ModelType, EmitterType> & {
    view: ViewType,
};

export {MvcHandlerProperties, MvcGenerationProperties, MvcControllerProperties, MvcViewProperties};