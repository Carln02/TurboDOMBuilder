import {TurboViewProperties} from "../core/core.types";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";

type TurboControllerProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboViewProperties<ElementType, ModelType, EmitterType> & {
    view?: ViewType
};

export {TurboControllerProperties};