import {TurboView} from "./turboView";
import {TurboModel} from "./turboModel";
import {MvcGenerationProperties, MvcHandlerProperties} from "./mvc.types";
import {TurboController} from "./turboController";
import {TurboHandler} from "./turboHandler";
import {TurboEmitter} from "./turboEmitter";
import {auto} from "../decorators/auto/auto";

class MvcHandler<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
> {
    private readonly element: ElementType;

    private readonly _controllers: Map<string, TurboController> = new Map();
    private readonly _handlers: Map<string, TurboHandler> = new Map();

    public constructor(properties: MvcHandlerProperties<ElementType, ViewType, DataType, ModelType, EmitterType>) {
        if (properties.element) this.element = properties.element;
        if (properties.view) this.view = properties.view;
        if (properties.model) {
            this.model = properties.model;
            if (properties.data) this.model.data = properties.data;
        }
        if (properties.emitter) this.emitter = properties.emitter;
        if (properties.generate) this.generate(properties);
    }

    @auto()
    public set view(view: ViewType) {
    }

    @auto()
    public set model(model: ModelType) {
        this.linkModelToEmitter();
        this.linkModelToView();
    }

    @auto()
    public set emitter(emitter: EmitterType) {
    }

    public get data(): DataType {
        return this.model?.data;
    }

    public set data(data: DataType) {
        if (this.model) this.model.data = data;
    }

    public get dataId(): string {
        return this.model?.dataId;
    }

    public set dataId(value: string) {
        if (this.model) this.model.dataId = value;
    }

    public get dataIndex(): number {
        return Number.parseInt(this.dataId);
    }

    public set dataIndex(value: number) {
        if (this.model) this.model.dataId = value.toString();
    }

    public get dataSize(): number {
        return this.model?.getSize();
    }

    public getController(key: string): TurboController {
        return this._controllers.get(key);
    }

    public addController(key: string, controller: TurboController) {
        this._controllers.set(key, controller);
    }

    public getHandler(key: string): TurboHandler {
        return this._handlers.get(key);
    }

    public addHandler(key: string, handler: TurboHandler) {
        this._handlers.set(key, handler);
    }

    public generate(properties: MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType> = {}) {
        if (properties.initialize == undefined) properties.initialize = true;

        if (properties.modelConstructor && (!this.model || properties.force)) {
            this.model = new properties.modelConstructor(properties.data);
        }

        if (properties.viewConstructor && (!this.view || properties.force)) {
            this.view = new properties.viewConstructor(this, this.model);
            this.linkModelToView();
        }

        if ((properties.emitterConstructor || properties.modelConstructor || this.model)
            && (!this.emitter || properties.force)) {
            this.emitter = new properties.emitterConstructor();
            this.linkModelToEmitter();
        }

        if (properties.controllerConstructors) {
            const controllerProperties = {
                element: this.element,
                view: this.view,
                model: this.model,
                emitter: this.emitter,
            };

            properties.controllerConstructors.forEach(controllerConstructor =>
                this._controllers.set(controllerConstructor.name, new controllerConstructor(controllerProperties)));
        }

        if (properties.handlerConstructors) {
            properties.handlerConstructors.forEach(handlerConstructor =>
                this._handlers.set(handlerConstructor.name, new handlerConstructor(this.model)));
        }

        if (properties.initialize) this.initialize();
    }

    public initialize() {
        this.view?.initialize();
        this.model?.initialize();
    }

    private linkModelToView() {
        if (!this.view || !this.model) return;
        this.view.model = this.model;
    }

    private linkModelToEmitter() {
        if (!this.emitter || !this.model) return;
        this.model.keyChangedCallback = (keyName: string, blockKey: string, ...args: any[]) =>
            this.emitter.fire(keyName, blockKey, ...args);
    }
}

export {MvcHandler};