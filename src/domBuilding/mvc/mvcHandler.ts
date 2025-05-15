import {TurboView} from "./turboView";
import {TurboModel} from "./turboModel";
import {MvcGenerationProperties, MvcHandlerProperties} from "./mvc.types";
import {TurboController} from "./turboController";
import {TurboHandler} from "./turboHandler";
import {TurboEmitter} from "./turboEmitter";
import {auto} from "../decorators/auto/auto";

/**
 * @class MvcHandler
 * @description MVC -- Model-View-Component -- handler. Generates and manages an MVC structure for a certain object.
 * @template {object} ElementType - The type of the object that will be turned into MVC.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * */
class MvcHandler<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>,
> {
    private readonly element: ElementType;
    private _model: ModelType;

    private readonly controllers: Map<string, TurboController> = new Map();

    public constructor(properties: MvcHandlerProperties<ElementType, ViewType, DataType, ModelType, EmitterType>) {
        if (properties.element) this.element = properties.element;
        if (properties.emitter) this.emitter = properties.emitter;
        if (properties.view) this.view = properties.view;
        if (properties.model) {
            this.model = properties.model;
            if (properties.data) this.model.data = properties.data;
        }

        if (properties.generate) this.generate(properties);
    }

    /**
     * @description The view (if any) of the current MVC structure. Setting it will link the current model (if any)
     * to this new view.
     */
    @auto()
    public set view(value: ViewType) {
        this.linkModelToView();
    }

    /**
     * @description The model (if any) of the current MVC structure. Setting it will de-link the previous model and link
     * the new one to the current view (if any) and emitter (if any).
     */
    public get model(): ModelType {
        return this._model;
    }

    public set model(model: ModelType) {
        this.deLinkModelFromEmitter();
        this._model = model;

        this.linkModelToEmitter();
        this.linkModelToView();
    }

    /**
     * @description The emitter (if any) of the current MVC structure. Setting it will link the current model (if any)
     * to this new emitter.
     */
    @auto()
    public set emitter(emitter: EmitterType) {
        this.linkModelToEmitter();
    }

    /**
     * @description The main data block (if any) attached to the element, taken from its model (if any).
     */
    public get data(): DataType {
        return this.model?.data;
    }

    public set data(data: DataType) {
        if (this.model) this.model.data = data;
    }

    /**
     * @description The ID of the main data block (if any) of the element, taken from its model (if any).
     */
    public get dataId(): string {
        return this.model?.dataId;
    }

    public set dataId(value: string) {
        if (this.model) this.model.dataId = value;
    }

    /**
     * @description The numerical index of the main data block (if any) of the element, taken from its model (if any).
     */
    public get dataIndex(): number {
        return Number.parseInt(this.dataId);
    }

    public set dataIndex(value: number) {
        if (this.model) this.model.dataId = value.toString();
    }

    /**
     * @description The size (number) of the main data block (if any) of the element, taken from its model (if any).
     */
    public get dataSize(): number {
        return this.model?.getSize();
    }

    /**
     * @function getController
     * @description Retrieves the attached MVC controller with the given key.
     * By default, unless manually defined in the controller, if the element's class name is MyElement
     * and the controller's class name is MyElementSomethingController, the key would be "something".
     * @param {string} key - The controller's key.
     * @return {TurboController} - The controller.
     */
    public getController(key: string): TurboController {
        return this.controllers.get(key);
    }

    /**
     * @function addController
     * @description Adds the given controller to the MVC structure.
     * @param {TurboController} controller - The controller to add.
     */
    public addController(controller: TurboController) {
        if (!controller.keyName) controller.keyName =
            this.extractClassEssenceName(controller.constructor as new (...args: any[]) => any);
        this.controllers.set(controller.keyName, controller);
    }

    /**
     * @function getHandler
     * @description Retrieves the attached MVC handler with the given key.
     * By default, unless manually defined in the handler, if the element's class name is MyElement
     * and the handler's class name is MyElementSomethingHandler, the key would be "something".
     * @param {string} key - The handler's key.
     * @return {TurboHandler} - The handler.
     */
    public getHandler(key: string): TurboHandler {
        return this.model.getHandler(key);
    }

    /**
     * @function addHandler
     * @description Adds the given handler to the MVC structure.
     * @param {TurboHandler} handler - The handler to add.
     */
    public addHandler(handler: TurboHandler) {
        if (!handler.keyName) handler.keyName =
            this.extractClassEssenceName(handler.constructor as new (...args: any[]) => any);
        this.model.addHandler(handler.keyName, handler);
    }

    /**
     * @function generate
     * @description Generates the MVC structure based on the provided properties.
     * If no model or modelConstructor is defined, no model will be generated. Similarly for the view.
     * If the structure contains a model, an emitter will be created, even if it is not defined in the properties.
     * @param {MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>} properties - The properties to use
     * to generate the MVC structure.
     */
    public generate(properties: MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType> = {}) {
        if (properties.initialize == undefined) properties.initialize = true;

        if (properties.modelConstructor && (!this.model || properties.force)) {
            this.model = new properties.modelConstructor(properties.data);
        }

        if ((properties.emitterConstructor || properties.modelConstructor || this.model)
            && (!this.emitter || properties.force)) {
            this.emitter = properties.emitterConstructor
                ? new properties.emitterConstructor(this.model)
                : new TurboEmitter(this.model) as any;
        }

        if (properties.viewConstructor && (!this.view || properties.force)) {
            this.view = new properties.viewConstructor({
                element: this.element,
                model: this.model,
                emitter: this.emitter
            });
        }

        if (properties.controllerConstructors) {
            const controllerProperties = {
                element: this.element,
                view: this.view,
                model: this.model,
                emitter: this.emitter
            };

            properties.controllerConstructors.forEach(controllerConstructor =>
                this.addController(new controllerConstructor(controllerProperties)));
        }

        if (properties.handlerConstructors) {
            properties.handlerConstructors.forEach(handlerConstructor =>
                this.addHandler(new handlerConstructor(this.model)));
        }

        if (properties.initialize) this.initialize();
    }

    /**
     * @function initialize
     * @description Initializes the MVC parts: the view, the controllers, and the model (in this order). The model is
     * initialized last to allow for the view and controllers to setup their change callbacks.
     */
    public initialize() {
        this.view?.initialize();
        this.controllers.forEach((controller: TurboController) => controller.initialize());
        this.model?.initialize();
    }

    private linkModelToView() {
        if (!this.view || !this.model) return;
        this.view.model = this.model;
    }

    private emitterFireCallback = (keyName: string, blockKey: any, ...args: any[]) =>
        this.emitter.fireWithBlock(keyName, blockKey, ...args);

    private deLinkModelFromEmitter() {
        if (!this.emitter || !this.model) return;
        this.model.keyChangedCallback.remove(this.emitterFireCallback);
    }

    private linkModelToEmitter() {
        if (!this.emitter || !this.model) return;
        this.emitter.model = this.model;
        this.model.keyChangedCallback.add(this.emitterFireCallback);
    }


    protected extractClassEssenceName(constructor: new (...args: any[]) => any): string {
        let className = constructor.name;
        let prototype = Object.getPrototypeOf(this.element);

        while (prototype && prototype.constructor !== Object) {
            const name = prototype.constructor.name;
            if (className.startsWith(name)) {
                className = className.slice(name.length);
                break;
            }
            prototype = Object.getPrototypeOf(prototype);
        }

        if (className.endsWith("Handler")) className = className.slice(0, -("Handler".length));
        else if (className.endsWith("Controller")) className = className.slice(0, -("Controller".length));

        return className.charAt(0).toLowerCase() + className.slice(1);
    }

}

export {MvcHandler};