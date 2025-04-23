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
    EmitterType extends TurboEmitter = TurboEmitter<any>,
> {
    private readonly element: ElementType;

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
        return this.controllers.get(key);
    }

    public addController(controller: TurboController) {
        if (!controller.keyName) controller.keyName =
            this.extractClassEssenceName(controller.constructor as new (...args: any[]) => any);
        this.controllers.set(controller.keyName, controller);
    }

    public getHandler(key: string): TurboHandler {
        return this.model.getHandler(key);
    }

    public addHandler(handler: TurboHandler) {
        if (!handler.keyName) handler.keyName =
            this.extractClassEssenceName(handler.constructor as new (...args: any[]) => any);
        this.model.addHandler(handler.keyName, handler);
    }

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
            this.linkModelToEmitter();
        }

        if (properties.viewConstructor && (!this.view || properties.force)) {
            this.view = new properties.viewConstructor({
                element: this.element,
                model: this.model,
                emitter: this.emitter
            });
            this.linkModelToView();
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

    public initialize() {
        this.view?.initialize();
        this.controllers.forEach((controller: TurboController) => controller.initialize());
        this.model?.initialize();
    }

    private linkModelToView() {
        if (!this.view || !this.model) return;
        this.view.model = this.model;
    }

    private linkModelToEmitter() {
        if (!this.emitter || !this.model) return;
        this.emitter.model = this.model;
        this.model.keyChangedCallback = (keyName: string, blockKey: string, ...args: any[]) =>
            this.emitter.fireWithBlock(keyName, blockKey, ...args);
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