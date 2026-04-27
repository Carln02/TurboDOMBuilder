import {TurboSelector} from "../turboSelector";
import {TurboModel} from "../../mvc/model/model";
import {TurboView} from "../../mvc/view/view";
import {TurboEmitter} from "../../mvc/emitter/emitter";
import {TurboOperator} from "../../mvc/operator/operator";
import {TurboInteractor} from "../../mvc/interactor/interactor";
import {TurboTool} from "../../mvc/tool/tool";
import {TurboEnforcer} from "../../mvc/enforcer/enforcer";
import {KeyType} from "../../types/basic.types";
import {TurboHandler} from "../../mvc/handler/handler";
import {MvcManyInstancesOrConstructors} from "./mvc.types";

type MvcData = {
    model?: TurboModel;
    view?: TurboView;
    emitter?: TurboEmitter;
    operators: Map<string, TurboOperator>;
    interactors: Map<string, TurboInteractor>;
    tools: Map<string, TurboTool>;
    enforcers: Map<string, TurboEnforcer>;
    emitterFireCallback: (value: any, ...keys: KeyType[]) => void;
};

export class MvcFunctionsUtils {
    private dataMap = new WeakMap<object, MvcData>;
    private modelLookupMap = new WeakMap<TurboModel, Set<object>>;

    public peek(element: object): MvcData | undefined {
        if (element instanceof TurboSelector) element = element.element;
        if (element instanceof TurboModel) element = this.modelLookupMap.get(element)?.values().next().value;
        return element ? this.dataMap.get(element) : undefined;
    }

    public data(element: object): MvcData {
        if (element instanceof TurboSelector) element = element.element;
        if (element instanceof TurboModel) element = this.modelLookupMap.get(element)?.values().next().value;
        if (!element) return;
        let entry = this.dataMap.get(element);
        if (!entry) {
            entry = {
                emitter: new TurboEmitter(),
                operators: new Map(), enforcers: new Map(), interactors: new Map(), tools: new Map(),
                emitterFireCallback: (value: any, ...keys: KeyType[]) => entry.emitter?.fireKey(value, ...keys)
            };
            this.dataMap.set(element, entry);
        }
        return entry;
    }

    public attachModel(element: object, model: TurboModel, attach: boolean = true) {
        if (!element || !model) return;
        if (attach && !this.modelLookupMap.has(model)) this.modelLookupMap.set(model, new Set());
        if (attach) this.modelLookupMap.get(model).add(element);
        else this.modelLookupMap.get(model).delete(element);
    }

    public updateModel(element: object, model: TurboModel, attach: boolean = true) {
        if (!element || !model) return;
        const mvc = this.peek(element);
        if (!mvc) return;
        if (attach) {
            if (!model.onKeyChanged.has(mvc.emitterFireCallback))
                model.onKeyChanged.add(mvc.emitterFireCallback);
        } else {
            model.onKeyChanged.remove(mvc.emitterFireCallback);
        }
    }

    public updateView(element: object, view: TurboView, attach: boolean = true) {
        if (!view || !element) return;
        const mvc = this.peek(element);
        if (!mvc) return;
        view.emitter = attach ? mvc.emitter : undefined;
        view.model = attach ? mvc.model : undefined;
    }

    public updateEmitter(element: object, emitter: TurboEmitter, attach: boolean = true) {
        if (!emitter || !element) return;
        const mvc = this.peek(element);
        if (!mvc) return;
        emitter.model = attach ? mvc.model : undefined;
    }

    public updateOperator(element: object, operator: TurboOperator, attach: boolean = true) {
        if (!operator || !element) return;
        const mvc = this.peek(element);
        if (!mvc) return;
        operator.emitter = attach ? mvc.emitter : undefined;
        operator.model = attach ? mvc.model : undefined;
        operator.view = attach ? mvc.view : undefined;
    }

    public updateHandler(element: object, handler: TurboHandler, attach: boolean = true) {
        if (!element || !handler) return;
        const mvc = this.peek(element);
        if (!mvc) return;
        handler.model = attach ? mvc.model : undefined;
    }

    public updateInteractor(element: object, interactor: TurboInteractor, attach: boolean = true) {
        if (!element || !interactor) return;
        const mvc = this.peek(element);
        if (!mvc) return;
        interactor.model = attach ? mvc.model : undefined;
        interactor.view = attach ? mvc.view : undefined;
        interactor.emitter = attach ? mvc.emitter : undefined;
    }

    public updateTool(element: object, tool: TurboTool, attach: boolean = true) {
        if (!element || !tool) return;
        const mvc = this.peek(element);
        if (!mvc) return;
        tool.model = attach ? mvc.model : undefined;
        tool.view = attach ? mvc.view : undefined;
        tool.emitter = attach ? mvc.emitter : undefined;
    }

    public updateEnforcer(element: object, enforcer: TurboEnforcer, attach: boolean = true) {
        if (!element || !enforcer) return;
        const mvc = this.peek(element);
        if (!mvc) return;
        enforcer.model = attach ? mvc.model : undefined;
        enforcer.view = attach ? mvc.view : undefined;
        enforcer.emitter = attach ? mvc.emitter : undefined;
    }

    public linkPieces(element: object) {
        if (!element) return;
        const mvc = this.peek(element);
        if (!mvc) return;
        this.updateModel(element, mvc.model);
        this.updateEmitter(element, mvc.emitter);
        this.updateView(element, mvc.view);
        mvc.operators.forEach(operator => this.updateOperator(element, operator));
        mvc.model?.handlers.forEach(handler => this.updateHandler(element, handler));
        mvc.interactors.forEach(interactor => this.updateInteractor(element, interactor));
        mvc.tools.forEach(tool => this.updateTool(element, tool));
        mvc.enforcers.forEach(enforcer => this.updateEnforcer(element, enforcer));
    }

    public removeInstance(element: object, kind: string, keyOrInstance: string | object) {
        if (!element) return;
        const map = kind === "handler" ? this.peek(element)?.model?.handlers : this.peek(element)?.[kind + "s"];
        if (!map) return;
        const key = typeof keyOrInstance === "string" ? keyOrInstance
            : Array.from(map.entries()).find(([, v]) => v === keyOrInstance)?.[0];
        if (!key) return;
        const methodName = "update" + kind.charAt(0).toUpperCase() + kind.slice(1);
        this[methodName]?.(element, map.get(key), false);
        map.delete(key);
    }

    public generateInstance<Type>(data: MvcManyInstancesOrConstructors<Type>, element?: object): Type {
        if (!data) return undefined;
        if (typeof data === "function") return new (data as any)(element ? {element} : undefined);
        return data as Type;
    }

    public generateInstances<Type>(data: MvcManyInstancesOrConstructors<Type>, element?: object): Type[] {
        if (!data) return [];
        if (typeof data !== "object" || !Array.isArray(data)) data = [data];
        const result: Type[] = [];
        data.forEach(constructor => {
            const instance = this.generateInstance(constructor, element);
            if (instance) result.push(instance);
        });
        return result;
    }

    /**
     * @protected
     * @function extractClassEssenceName
     * @description Utility that derives a shorter "essence" key name for an MVC piece from its constructor name.
     * It strips the element/class name prefix (if any) and the type suffix (e.g., "Operator", "Tool") to
     * produce a key that reads well in camelCase (e.g., `MyElementSnapOperator` -> `snap`).
     * @param element
     * @param {new (...args: any[]) => any} constructor - The constructor to derive the name from.
     * @param {string} type - The type suffix to strip (e.g., "Operator", "Handler", "Tool", "Enforcer").
     * @returns {string} - A lower-cased, camel-style key name derived from the constructor.
     */
    public extractClassEssenceName(element: object, constructor: new (...args: any[]) => any, type: string): string {
        let className = constructor.name;
        let prototype = Object.getPrototypeOf(element);

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
