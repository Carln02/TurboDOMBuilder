import {TurboControllerProperties} from "../logic/logic.types";
import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";

type TurboSubstrateProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & {
    substrateName?: string,
};

declare module "./substrate" {
    interface TurboSubstrate {
        onActivate(): void;
        onDeactivate(): void;
    }
}

export {TurboSubstrateProperties}