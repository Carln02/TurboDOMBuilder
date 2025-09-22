import { TurboView } from "../..";
import {TurboViewProperties} from "../core/core.types";
import {TurboEmitter} from "../core/emitter";
import {TurboModel} from "../core/model";

type TurboControllerProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboViewProperties<ElementType, ModelType, EmitterType> & {
    view: ViewType,
};

export {TurboControllerProperties};