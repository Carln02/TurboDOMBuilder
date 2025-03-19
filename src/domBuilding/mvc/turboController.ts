import {TurboView} from "./turboView";
import {TurboModel} from "./turboModel";
import {MvcControllerProperties} from "./mvc.types";
import {TurboEmitter} from "./turboEmitter";

class TurboController<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> {
    protected readonly element: ElementType;
    protected readonly view: ViewType;
    protected readonly model: ModelType;
    protected readonly emitter: EmitterType

    public constructor(properties: MvcControllerProperties<ElementType, ViewType, ModelType, EmitterType>) {
        this.element = properties.element;
        this.view = properties.view;
        this.model = properties.model;
        this.emitter = properties.emitter;

        this.attachEmitterCallbacks();
    }

    protected attachEmitterCallbacks(): void {
    }
}

export {TurboController};