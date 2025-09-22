import {TurboEmitter} from "./core/emitter";
import {TurboModel} from "./core/model";
import {TurboView} from "./core/view";
import {MvcGenerationProperties, MvcManyInstancesOrConstructors, MvcProperties} from "./mvc.types";
import {TurboInteractor} from "./interactor/interactor";
import {TurboController} from "./logic/controller";
import {auto} from "../decorators/auto/auto";
import {TurboHandler} from "./logic/handler";
import {TurboTool} from "./tool/tool";
import {TurboSubstrate} from "./substrate/substrate";

/**
 * @class Mvc
 * @description MVC -- Model-View-Component -- handler. Generates and manages an MVC structure for a certain object.
 * @template {object} ElementType - The type of the object that will be turned into MVC.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * */
class Mvc<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>,
> {
    private readonly element: ElementType;
    private _model: ModelType;

    private readonly controllers: Map<string, TurboController> = new Map();
    private readonly interactors: Map<string, TurboInteractor> = new Map();
    private readonly tools: Map<string, TurboTool> = new Map();
    private readonly substrates: Map<string, TurboSubstrate> = new Map();

    public constructor(properties: MvcProperties<ElementType, ViewType, DataType, ModelType, EmitterType>) {
        if (properties.element) this.element = properties.element;
        this.generate(properties);
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
        return this.model?.getSize?.();
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
            this.extractClassEssenceName(controller.constructor as new (...args: any[]) => any, "Controller");

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
            this.extractClassEssenceName(handler.constructor as new (...args: any[]) => any, "Handler");
        this.model.addHandler(handler.keyName, handler);
    }

    /**
     * @function getInteractor
     * @description Retrieves the attached MVC interactor with the given key.
     * By default, unless manually defined in the interactor, if the element's class name is MyElement
     * and the interactor's class name is MyElementSomethingInteractor, the key would be "something".
     * @param {string} key - The interactor's key.
     * @return {TurboInteractor} - The interactor.
     */
    public getInteractor(key: string): TurboInteractor {
        return this.interactors.get(key);
    }

    /**
     * @function addInteractor
     * @description Adds the given interactor to the MVC structure.
     * @param {TurboInteractor} interactor - The interactor to add.
     */
    public addInteractor(interactor: TurboInteractor) {
        if (!interactor.keyName) interactor.keyName =
            this.extractClassEssenceName(interactor.constructor as new (...args: any[]) => any, "Interactor");
        this.interactors.set(interactor.keyName, interactor);
    }

    /**
     * @function getTool
     * @description Retrieves the attached MVC Tool with the given key.
     * By default, unless manually defined in the tool, if the element's class name is MyElement
     * and the tool's class name is MyElementSomethingTool, the key would be "something".
     * @param {string} key - The tool's key.
     * @return {TurboTool} - The tool.
     */
    public getTool(key: string): TurboTool {
        return this.tools.get(key);
    }

    /**
     * @function addTool
     * @description Adds the given tool to the MVC structure.
     * @param {TurboTool} tool - The tool to add.
     */
    public addTool(tool: TurboTool) {
        if (!tool.keyName) tool.keyName =
            this.extractClassEssenceName(tool.constructor as new (...args: any[]) => any, "Tool");
        this.tools.set(tool.keyName, tool);
    }

    /**
     * @function getSubstrate
     * @description Retrieves the attached MVC Substrate with the given key.
     * By default, unless manually defined in the substrate, if the element's class name is MyElement
     * and the substrate's class name is MyElementSomethingSubstrate, the key would be "something".
     * @param {string} key - The substrate's key.
     * @return {TurboSubstrate} - The substrate.
     */
    public getSubstrate(key: string): TurboSubstrate {
        return this.substrates.get(key);
    }

    /**
     * @function addSubstrate
     * @description Adds the given substrate to the MVC structure.
     * @param {TurboSubstrate} substrate - The substrate to add.
     */
    public addSubstrate(substrate: TurboSubstrate) {
        if (!substrate.keyName) substrate.keyName =
            this.extractClassEssenceName(substrate.constructor as new (...args: any[]) => any, "Substrate");
        this.substrates.set(substrate.keyName, substrate);
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
        const {
            view, model, emitter, controllers, handlers, interactors, tools, substrates,
            data, initialize = true, force = false
        }: MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType> = properties;

        //Model
        if (model && (force || !this.model)) this.model = this.generateInstance(model, data, false);
        if (data !== undefined && this.model && this.model.data !== data) this.model.data = data;
        //Emitter
        if ((emitter || this.model) && (force || !this.emitter)) {
            this.emitter = this.generateInstance(emitter ?? TurboEmitter, this.model, false) as EmitterType;
        }

        const constructorProperties = {
            element: this.element,
            model: this.model,
            emitter: this.emitter,
            view: undefined
        };

        //View
        if (view && (force || !this.view)) {
            this.view = this.generateInstance(view, constructorProperties);
            if (typeof view !== "function") {
                this.view.model = this.model;
                this.view.emitter = this.emitter;
                this.view.element = this.element;
            }
        }

        constructorProperties.view = this.view;

        //Controllers
        this.generateInstances(controllers, constructorProperties)
            .forEach(instance => this.addController(instance));
        //Handlers
        this.generateInstances(handlers, this.model, false)
            .forEach(instance => this.addHandler(instance));

        //Interactors
        this.generateInstances(interactors, constructorProperties)
            .forEach(instance => this.addInteractor(instance));
        //Tools
        this.generateInstances(tools, constructorProperties)
            .forEach(instance => this.addTool(instance));
        //Substrates
        this.generateInstances(substrates, constructorProperties)
            .forEach(instance => this.addSubstrate(instance));

        if (initialize) this.initialize();
    }

    private generateInstance<Type, PropertiesType>(
        data: MvcManyInstancesOrConstructors<Type, PropertiesType>,
        properties: PropertiesType,
        shallowCopyProperties: boolean = true
    ): Type {
        if (!data) return undefined;
        if (typeof data === "function") {
            const shouldClone = shallowCopyProperties && properties && typeof properties === "object";
            const prop = shouldClone ? {...properties} : properties;
            return new (data as new (properties: PropertiesType) => Type)(prop);
        }
        return data as Type;
    }

    private generateInstances<Type, PropertiesType>(
        data: MvcManyInstancesOrConstructors<Type, PropertiesType>,
        properties: PropertiesType,
        shallowCopyProperties: boolean = true
        ): Type[] {
        if (!data) return [];
        if (typeof data !== "object" || !Array.isArray(data)) data = [data];

        const result: Type[] = [];
        data.forEach(constructor=> {
            const instance = this.generateInstance(constructor, properties, shallowCopyProperties);
            if (instance) result.push(instance);
        })
        return result;
    }


    /**
     * @function initialize
     * @description Initializes the MVC parts: the view, the controllers, and the model (in this order). The model is
     * initialized last to allow for the view and controllers to setup their change callbacks.
     */
    public initialize() {
        this.view?.initialize();
        this.controllers.forEach(controller => controller.initialize());
        this.model?.initialize();
        this.interactors.forEach(interactor => interactor.initialize());
        this.tools.forEach(tool => tool.initialize());
        this.substrates.forEach(substrate => substrate.initialize());
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


    protected extractClassEssenceName(constructor: new (...args: any[]) => any, type: string): string {
        let className = constructor.name;
        let prototype = Object.getPrototypeOf(this.element);

        while (prototype && prototype.constructor !== Object) {
            const name = prototype.constructor.name.replaceAll("_", "");
            if (className.startsWith(name)) {
                className = className.slice(name.length);
                break;
            }
            prototype = Object.getPrototypeOf(prototype);
        }

        if (className.endsWith(type)) className = className.slice(0, -(type.length));
        return className.charAt(0).toLowerCase() + className.slice(1);
    }
}

export {Mvc};