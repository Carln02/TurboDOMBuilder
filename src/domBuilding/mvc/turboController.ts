import {TurboView} from "./turboView";
import {TurboModel} from "./turboModel";
import {MvcControllerProperties} from "./mvc.types";
import {TurboEmitter} from "./turboEmitter";

/**
 * @class TurboController
 * @description The MVC base controller class. Its main job is to handle  (some part of or all of) the logic of the
 * component. It has access to the element, the model to read and write data, the view to update the UI, and the
 * emitter to listen for changes in the model. It can only communicate with other controllers via the emitter
 * (by firing or listening for changes on a certain key).
 * @template {object} ElementType - The type of the main component.
 * @template {TurboView} ViewType - The element's MVC view type.
 * @template {TurboModel} ModelType - The element's MVC model type.
 * @template {TurboEmitter} EmitterType - The element's MVC emitter type.
 */
class TurboController<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> {
    /**
     * @description The key of the controller. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the controller's class name is MyElementSomethingController, the key would
     * default to "something".
     */
    public keyName: string;

    /**
     * @description A reference to the component.
     * @protected
     */
    protected readonly element: ElementType;

    /**
     * @description A reference to the MVC view.
     * @protected
     */
    protected readonly view: ViewType;

    /**
     * @description A reference to the MVC model.
     * @protected
     */
    protected readonly model: ModelType;

    /**
     * @description A reference to the MVC emitter.
     * @protected
     */
    protected readonly emitter: EmitterType;

    public constructor(properties: MvcControllerProperties<ElementType, ViewType, ModelType, EmitterType>) {
        this.element = properties.element;
        this.view = properties.view;
        this.model = properties.model;
        this.emitter = properties.emitter;
    }

    /**
     * @function initialize
     * @description Initializes the controller. Specifically, it will setup the change callbacks.
     */
    public initialize(): void {
        this.setupChangedCallbacks();
    }

    /**
     * @function setupChangedCallbacks
     * @description Setup method intended to initialize change listeners and callbacks.
     * @protected
     */
    protected setupChangedCallbacks(): void {
    }
}

export {TurboController};