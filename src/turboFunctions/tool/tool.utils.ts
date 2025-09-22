import {TurboSelector} from "../turboSelector";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ToolBehaviorCallback} from "./tool.types";
import {Delegate} from "../../eventHandling/delegate/delegate";

type ElementData = {
    tools: Set<string>,
    embeddedTarget?: Node,
    activationDelegates: Map<string, Delegate<() => void>>,
    deactivationDelegates: Map<string, Delegate<() => void>>
};

type ToolData = {
    behaviors: Map<string, Set<ToolBehaviorCallback>>
};

export class ToolFunctionsUtils {
    private elements: WeakMap<Node, WeakMap<TurboEventManager, ElementData>> = new WeakMap();
    private tools: WeakMap<TurboEventManager, Map<string, ToolData>> = new WeakMap();

    private getOrCreate<Key, Value>(map: Map<Key, Value>, key: Key, factory: () => Value): Value;
    private getOrCreate<Key extends object, Value>(map: WeakMap<Key, Value>, key: Key, factory: () => Value): Value;
    private getOrCreate(map: any, key: any, factory: () => any): any {
        let value = map.get(key);
        if (!value) {
            value = factory();
            map.set(key, value);
        }
        return value;
    }

    private getElementData(element: Node, manager: TurboEventManager): ElementData {
        if (element instanceof TurboSelector) element = element.element;
        const es = this.getOrCreate(this.elements, element,
            () => new WeakMap());
        return this.getOrCreate(es, manager, () => ({
            tools: new Set(),
            activationDelegates: new Map(),
            deactivationDelegates: new Map()
        }));
    }

    private getToolsData(manager: TurboEventManager, toolName: string): ToolData {
        const byTool = this.getOrCreate(this.tools, manager, () => new Map());
        return this.getOrCreate(byTool, toolName, () => ({
            behaviors: new Map()
        }));
    }

    public getActivationDelegate(element: Node, toolName: string, manager: TurboEventManager): Delegate<() => void> {
        const map = this.getElementData(element, manager).activationDelegates;
        if (!map.get(toolName)) map.set(toolName, new Delegate());
        return map.get(toolName);
    }

    public getDeactivationDelegate(element: Node, toolName: string, manager: TurboEventManager): Delegate<() => void> {
        const map = this.getElementData(element, manager).deactivationDelegates;
        if (!map.get(toolName)) map.set(toolName, new Delegate());
        return map.get(toolName);
    }

    public saveTool(element: Node, toolName: string, manager: TurboEventManager): void {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return;
        this.getElementData(element, manager).tools.add(toolName);
    }

    public getToolNames(element: Node, manager: TurboEventManager): string[] {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return [];
        return [...this.getElementData(element, manager).tools];
    }

    public setEmbeddedToolTarget(element: Node, target: Node, manager: TurboEventManager): void {
        if (target instanceof TurboSelector) target = target.element;
        if (!target) return;
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return;
        this.getElementData(element, manager).embeddedTarget = target;
    }

    public getEmbeddedToolTarget(element: Node, manager: TurboEventManager): Node {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return;
        return this.getElementData(element, manager).embeddedTarget;
    }

    public addToolBehavior(toolName: string, type: string, callback: ToolBehaviorCallback, manager: TurboEventManager): void {
        const behaviors = this.getToolsData(manager, toolName).behaviors;
        const set = this.getOrCreate(behaviors, type, () => new Set());
        set.add(callback);
    }

    public getToolBehaviors(toolName: string, type: string, manager: TurboEventManager): ToolBehaviorCallback[] {
        const behaviors = this.getToolsData(manager, toolName).behaviors;
        return [...this.getOrCreate(behaviors, type, () => new Set())];
    }

    public removeToolBehaviors(toolName: string, type: string, manager: TurboEventManager): void {
        const behaviors = this.getToolsData(manager, toolName).behaviors;
        this.getOrCreate(behaviors, type, () => new Set()).clear();
    }

    public clearToolBehaviors(manager: TurboEventManager): void {
        this.getOrCreate(this.tools, manager, () => new Map()).clear();
    }
}