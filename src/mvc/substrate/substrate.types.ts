import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";
import {TurboControllerProperties} from "../logic/logic.types";
import {Turbo} from "../../turboFunctions/turboFunctions.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";

type TurboSubstrateProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
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