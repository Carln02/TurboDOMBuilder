import {TurboSelector} from "../turboFunctions";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ToolBehaviorCallback} from "./tool.types";

type ElementData = {
    tools: Set<string>,
    embeddedTarget?: Node
};

type BehaviorMap = Map<string, Set<ToolBehaviorCallback>>;

export class ToolFunctionsUtils {
    private elements: WeakMap<Node, WeakMap<TurboEventManager, ElementData>> = new WeakMap();
    private behaviors: WeakMap<TurboEventManager, Map<string, BehaviorMap>> = new WeakMap();

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

    private getElementData(el: Node, manager: TurboEventManager): ElementData {
        const es = this.getOrCreate(this.elements, el,
            () => new WeakMap());
        return this.getOrCreate(es, manager, () => ({tools: new Set()}));
    }

    private getBehaviorData(manager: TurboEventManager, toolName: string): BehaviorMap {
        const byTool = this.getOrCreate(this.behaviors, manager, () => new Map());
        return this.getOrCreate(byTool, toolName, () => new Map());
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
        const behaviors = this.getBehaviorData(manager, toolName);
        const set = this.getOrCreate(behaviors, type, () => new Set());
        set.add(callback);
    }

    public getToolBehaviors(toolName: string, type: string, manager: TurboEventManager): ToolBehaviorCallback[] {
        const behaviors = this.getBehaviorData(manager, toolName);
        return [...this.getOrCreate(behaviors, type, () => new Set())];
    }

    public removeToolBehaviors(toolName: string, type: string, manager: TurboEventManager): void {
        const behaviors = this.getBehaviorData(manager, toolName);
        this.getOrCreate(behaviors, type, () => new Set()).clear();
    }
}