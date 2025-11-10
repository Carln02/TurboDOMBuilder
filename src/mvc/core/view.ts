import {TurboModel} from "./model";
import {TurboEmitter} from "./emitter";
import {TurboViewProperties} from "./core.types";
import {initializeEffects} from "../../reactivity/reactivity";

/**
 * @class TurboView
 * @group MVC
 * @category View
 *
 * @template {object} ElementType - The type of the element attached to the view.
 * @template {TurboModel} ModelType - The model type used in this view.
 * @template {TurboEmitter} EmitterType - The emitter type used in this view.
 * @description A base view class for MVC elements, providing structure for initializing and managing UI setup and
 * event listeners. Designed to be devoid of logic and only handle direct UI changes.
 */
class TurboView<
    ElementType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> {
    /**
     * @description The main component this view is attached to.
     */
    public element: ElementType;

    /**
     * @description The model instance this view is bound to.
     */
    public model?: ModelType;

    /**
     * @description The emitter instance used for event communication.
     */
    public emitter?: EmitterType;

    /**
     * @constructor
     * @param {TurboViewProperties<ElementType, ModelType, EmitterType>} properties - Properties to initialize the view with.
     */
    public constructor(properties: TurboViewProperties<ElementType, ModelType, EmitterType>) {
        this.element = properties.element;
        if (properties.model) this.model = properties.model;
        if (properties.emitter) this.emitter = properties.emitter;
    }

    /**
     * @function initialize
     * @description Initializes the view by setting up change callbacks, UI elements, layout, and event listeners.
     */
    public initialize(): void {
        this.setupUIElements();
        this.setupUILayout();
        this.setupUIListeners();
        this.setupChangedCallbacks();
    }

    /**
     * @function setupChangedCallbacks
     * @description Setup method for initializing data/model change listeners and associated UI logic.
     * @protected
     */
    protected setupChangedCallbacks(): void {
        initializeEffects(this);
    }

    /**
     * @function setupUIElements
     * @description Setup method for initializing and storing sub-elements of the UI.
     * @protected
     */
    protected setupUIElements(): void {
    }

    /**
     * @function setupUILayout
     * @description Setup method for creating the layout structure and injecting sub-elements into the DOM tree.
     * @protected
     */
    protected setupUILayout(): void {
    }

    /**
     * @function setupUIListeners
     * @description Setup method for defining DOM and input event listeners.
     * @protected
     */
    protected setupUIListeners(): void {
    }
}

export {TurboView};