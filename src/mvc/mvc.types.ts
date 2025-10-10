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

export type MvcInstanceOrConstructor<Type, PropertiesType> = Type | (new (properties: PropertiesType) => Type);
export type MvcManyInstancesOrConstructors<Type, PropertiesType = any> = MvcInstanceOrConstructor<Type, PropertiesType>
    | MvcInstanceOrConstructor<Type, PropertiesType>[];

type MvcGenerationProperties<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = {
    view?: ViewType | (new (properties: TurboViewProperties) => ViewType),
    model?: ModelType | (new (data?: any, dataBlocksType?: "map" | "array") => ModelType),
    emitter?: EmitterType | (new (properties: ModelType) => EmitterType),

    controllers?: MvcManyInstancesOrConstructors<TurboController, TurboControllerProperties>,
    handlers?: MvcManyInstancesOrConstructors<TurboHandler, ModelType>,

    interactors?: MvcManyInstancesOrConstructors<TurboInteractor, TurboInteractorProperties>,
    tools?: MvcManyInstancesOrConstructors<TurboTool, TurboToolProperties>,
    substrates?: MvcManyInstancesOrConstructors<TurboSubstrate, TurboSubstrateProperties>,

    data?: DataType,
    initialize?: boolean,
};

type MvcProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = Omit<MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>, "force"> & {
    element?: ElementType,
};

export {MvcProperties, MvcGenerationProperties};