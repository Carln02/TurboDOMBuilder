import {TurboModel} from "./turboModel";
import {TurboEmitter} from "./turboEmitter";
import {MvcViewProperties} from "./mvc.types";


class TurboView<
    ElementType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> {
    public element: ElementType;
    public model: ModelType;
    public emitter: EmitterType;

    public constructor(properties: MvcViewProperties<ElementType, ModelType, EmitterType>) {
        this.element = properties.element;
        this.emitter = properties.emitter;
        if (properties.model) this.model = properties.model;
    }

    public initialize(): void {
        this.setupChangedCallbacks();
        this.setupUIElements();
        this.setupUILayout();
        this.setupUIListeners();
    }

    protected setupChangedCallbacks(): void {
    }

    protected setupUIElements(): void {
    }

    protected setupUILayout(): void {
    }

    protected setupUIListeners(): void {
    }
}

export {TurboView};