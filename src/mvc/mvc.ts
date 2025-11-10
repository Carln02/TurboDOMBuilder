import {TurboEmitter} from "./core/emitter";
import {TurboModel} from "./core/model";
import {TurboView} from "./core/view";
import {MvcGenerationProperties, MvcManyInstancesOrConstructors, MvcProperties} from "./mvc.types";
import {TurboInteractor} from "./interactor/interactor";
import {TurboController} from "./logic/controller";
import {TurboHandler} from "./logic/handler";
import {TurboTool} from "./tool/tool";
import {TurboSubstrate} from "./substrate/substrate";
import {TurboViewProperties} from "./core/core.types";
import {TurboInteractorProperties} from "./interactor/interactor.types";
import {TurboToolProperties} from "./tool/tool.types";
import {TurboSubstrateProperties} from "./substrate/substrate.types";
import {TurboControllerProperties} from "./logic/logic.types";

/**
 * @class Mvc
 * @group MVC
 * @category MVC
 * 
 * @description MVC -- Model-View-Component -- handler. Generates and manages an MVC structure for a certain object.
 * @template {object} ElementType - The type of the object that will be turned into MVC.
 * @template {TurboView} ViewType - The element's view type.
 * @template {object} DataType - The element's data type.
 * @template {TurboModel<DataType>} ModelType - The element's model type.
 * @template {TurboEmitter} EmitterType - The element's emitter type.
 * */
class Mvc<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>,
> {
    /**
     * @description The element/root of the MVC structure.
     */
    public readonly element: ElementType;

    private _view: ViewType;
    private _model: ModelType;
    private _emitter: EmitterType;

    private readonly _controllers: Map<string, TurboController> = new Map();
    private readonly _handlers: Map<string, TurboHandler> = new Map();
    private readonly _interactors: Map<string, TurboInteractor> = new Map();
    private readonly _tools: Map<string, TurboTool> = new Map();
    private readonly _substrates: Map<string, TurboSubstrate> = new Map();

    public constructor(properties: MvcProperties<ElementType, ViewType, DataType, ModelType, EmitterType>) {
        if (properties.element) this.element = properties.element;
        if (!properties.emitter) this.emitter = new TurboEmitter() as EmitterType;
        this.generate(properties);
    }

    /**
     * @description The view (if any) of the current MVC structure. Setting it will update the view and link it
     * with the existing pieces.
     */
    public get view(): ViewType {
        return this._view;
    }

    public set view(value: ViewType | (new (properties: TurboViewProperties) => ViewType)) {
        this._view = this.generateInstance(value, {element: this.element});
        this.linkPieces();
    }

    /**
     * @description The model (if any) of the current MVC structure. Setting it will update the model and link it
     * with the existing pieces.
     */
    public get model(): ModelType {
        return this._model;
    }

    public set model(model: ModelType | (new (data?: any, dataBlocksType?: "map" | "array") => ModelType)) {
        this.model?.keyChangedCallback.remove(this.emitterFireCallback);
        this._model = this.generateInstance(model);
        this._model.handlers = this._handlers;
        this._model.addHandler = (handler: TurboHandler) => this.addHandler(handler);
        this.linkPieces();
    }

    /**
     * @description The emitter (if any) of the current MVC structure. Setting it will update the emitter and link it
     * with the existing pieces.
     */
    public get emitter(): EmitterType {
        return this._emitter;
    }

    public set emitter(emitter: EmitterType | (new (properties: ModelType) => EmitterType)) {
        this._emitter = this.generateInstance(emitter);
        this.linkPieces();
    }

    /**
     * @description The controllers (if any) of the current MVC structure. Setting it will not override the existing
     * controllers, but only add the new values and link them with the existing pieces.
     */
    public get controllers(): TurboController[] {
        return Array.from(this._controllers.values()) || [];
    }

    public set controllers(value: MvcManyInstancesOrConstructors<TurboController, TurboControllerProperties>) {
        this.generateInstances(value, {element: this.element})
            .forEach(instance => this.addController(instance));
        this.linkPieces();
    }

    /**
     * @description The handlers (if any) of the current MVC structure. Setting it will not override the existing
     * handlers, but only add the new values and link them with the existing pieces.
     */
    public get handlers(): TurboHandler[] {
        return Array.from(this._handlers.values()) || [];
    }

    public set handlers(value: MvcManyInstancesOrConstructors<TurboHandler>) {
        this.generateInstances(value).forEach(instance => this.addHandler(instance));
        this.linkPieces();
    }

    /**
     * @description The interactors (if any) of the current MVC structure. Setting it will not override the existing
     * interactors, but only add the new values and link them with the existing pieces.
     */
    public get interactors(): TurboInteractor[] {
        return Array.from(this._interactors.values()) || [];
    }

    public set interactors(value: MvcManyInstancesOrConstructors<TurboInteractor, TurboInteractorProperties>) {
        this.generateInstances(value, {element: this.element})
            .forEach(instance => this.addInteractor(instance));
        this.linkPieces();
    }

    /**
     * @description The tools (if any) of the current MVC structure. Setting it will not override the existing
     * tools, but only add the new values and link them with the existing pieces.
     */
    public get tools(): TurboTool[] {
        return Array.from(this._tools.values()) || [];
    }

    public set tools(value: MvcManyInstancesOrConstructors<TurboTool, TurboToolProperties>) {
        this.generateInstances(value, {element: this.element})
            .forEach(instance => this.addTool(instance));
        this.linkPieces();
    }

    /**
     * @description The substrates (if any) of the current MVC structure. Setting it will not override the existing
     * substrates, but only add the new values and link them with the existing pieces.
     */
    public get substrates(): TurboSubstrate[] {
        return Array.from(this._substrates.values()) || [];
    }

    public set substrates(value: MvcManyInstancesOrConstructors<TurboSubstrate, TurboSubstrateProperties>) {
        this.generateInstances(value, {element: this.element})
            .forEach(instance => this.addSubstrate(instance));
        this.linkPieces();
    }

    /**
     * @description The main data block (if any) attached to the model (if any).
     */
    public get data(): DataType {
        return this.model?.data;
    }

    public set data(data: DataType) {
        if (this.model) this.model.data = data;
    }

    /**
     * @description The ID of the main data block (if any) attached to the model (if any).
     */
    public get dataId(): string {
        return this.model?.dataId;
    }

    public set dataId(value: string) {
        if (this.model) this.model.dataId = value;
    }

    /**
     * @description The numerical index of the main data block (if any) attached to the model (if any).
     */
    public get dataIndex(): number {
        return Number.parseInt(this.dataId);
    }

    public set dataIndex(value: number) {
        if (this.model) this.model.dataId = value.toString();
    }

    /**
     * @description The size (number) of the main data block (if any) attached to the model (if any).
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
        return this._controllers.get(key);
    }

    /**
     * @function addController
     * @description Adds the given controller to the MVC structure.
     * @param {TurboController} controller - The controller to add.
     */
    public addController(controller: TurboController) {
        if (!controller.keyName) controller.keyName =
            this.extractClassEssenceName(controller.constructor as new (...args: any[]) => any, "Controller");
        this._controllers.set(controller.keyName, controller);
        this.updateController(controller);
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
        return this._handlers.get(key);
    }

    /**
     * @function addHandler
     * @description Adds the given handler to the MVC structure.
     * @param {TurboHandler} handler - The handler to add.
     */
    public addHandler(handler: TurboHandler) {
        if (!handler.keyName) handler.keyName =
            this.extractClassEssenceName(handler.constructor as new (...args: any[]) => any, "Handler");
        this._handlers.set(handler.keyName, handler);
        this.updateHandler(handler);
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
        return this._interactors.get(key);
    }

    /**
     * @function addInteractor
     * @description Adds the given interactor to the MVC structure.
     * @param {TurboInteractor} interactor - The interactor to add.
     */
    public addInteractor(interactor: TurboInteractor) {
        if (!interactor.keyName) interactor.keyName =
            this.extractClassEssenceName(interactor.constructor as new (...args: any[]) => any, "Interactor");
        this._interactors.set(interactor.keyName, interactor);
        this.updateInteractor(interactor);
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
        return this._tools.get(key);
    }

    /**
     * @function addTool
     * @description Adds the given tool to the MVC structure.
     * @param {TurboTool} tool - The tool to add.
     */
    public addTool(tool: TurboTool) {
        if (!tool.keyName) tool.keyName =
            this.extractClassEssenceName(tool.constructor as new (...args: any[]) => any, "Tool");
        this._tools.set(tool.keyName, tool);
        this.updateTool(tool);
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
        return this._substrates.get(key);
    }

    /**
     * @function addSubstrate
     * @description Adds the given substrate to the MVC structure.
     * @param {TurboSubstrate} substrate - The substrate to add.
     */
    public addSubstrate(substrate: TurboSubstrate) {
        if (!substrate.keyName) substrate.keyName =
            this.extractClassEssenceName(substrate.constructor as new (...args: any[]) => any, "Substrate");
        this._substrates.set(substrate.keyName, substrate);
        this.updateSubstrate(substrate);
    }

    /**
     * @function generate
     * @description Generates the MVC structure based on the provided properties.
     * If no model or model constructor is defined, no model will be generated. The same applies for the view.
     * If not defined, a default emitter will be created.
     * @param {MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>} properties - The properties to use
     * to generate the MVC structure.
     */
    public generate(properties: MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType> = {}) {
        for (const property of Object.keys(properties)) {
            const value = properties[property];
            if (value === undefined || property === "initialize" || property === "data") continue;
            this[property] = value;
        }

        if (!this._emitter) this.emitter = new TurboEmitter() as EmitterType;
        if (properties.data && this.model) this.model.setBlock(properties.data, undefined, undefined, false);
        if (properties.initialize === undefined || properties.initialize) this.initialize();
    }

    /**
     * @function initialize
     * @description Initializes the MVC parts: the view, the controllers, the interactors, the tools, the substrates,
     * and the model (in this order). The model is initialized last to allow for the view and controllers to set up
     * their change callbacks.
     */
    public initialize() {
        this.view?.initialize();
        this._controllers.forEach(controller => controller.initialize());
        this._interactors.forEach(interactor => interactor.initialize());
        this._tools.forEach(tool => tool.initialize());
        this._substrates.forEach(substrate => substrate.initialize());
        this.model?.initialize();
    }

    protected updateController(controller: TurboController) {
        controller.emitter = this.emitter;
        controller.model = this.model;
        controller.view = this.view;
    }

    protected updateHandler(handler: TurboHandler) {
        handler.model = this.model;
    }

    protected updateInteractor(interactor: TurboInteractor) {
        interactor.model = this.model;
        interactor.view = this.view;
        interactor.emitter = this.emitter;
    }

    protected updateTool(tool: TurboTool) {
        tool.emitter = this.emitter;
        tool.model = this.model;
        tool.view = this.view;
    }

    protected updateSubstrate(substrate: TurboSubstrate) {
        substrate.model = this.model;
        substrate.view = this.view;
        substrate.emitter = this.emitter;
    }

    protected linkPieces() {
        if (this.model && !this.model.keyChangedCallback.has(this.emitterFireCallback)) {
            this.model.keyChangedCallback.add(this.emitterFireCallback);
        }

        if (this.emitter) this.emitter.model = this.model;
        if (this.view) {
            this.view.emitter = this.emitter;
            this.view.model = this.model;
        }

        this._controllers.forEach(controller => this.updateController(controller));
        this._handlers.forEach(handler => this.updateHandler(handler));
        this._interactors.forEach(interactor => this.updateInteractor(interactor));
        this._tools.forEach(tool => this.updateTool(tool));
        this._substrates.forEach(substrate => this.updateSubstrate(substrate));
    }

    private generateInstance<Type, PropertiesType>(
        data: MvcManyInstancesOrConstructors<Type, PropertiesType>,
        properties?: PropertiesType,
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
        properties?: PropertiesType,
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

    private emitterFireCallback = (keyName: string, blockKey: any, ...args: any[]) =>
        this.emitter?.fireWithBlock(keyName, blockKey, ...args);

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