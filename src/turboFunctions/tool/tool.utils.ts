import {TurboSelector} from "../turboSelector";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ToolBehaviorCallback} from "./tool.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {Propagation} from "../event/event.types";
import {ListenerSet} from "../../turboComponents/datatypes/listener/listenerSet";
import {Listener} from "../../turboComponents/datatypes/listener/listener";

type ElementData = {
    tools: Set<string>,
    ignoreAllTools: boolean,
    ignoredTools: Map<string, "all" | Set<string>>,
    embeddedTarget?: Node,
    activationDelegates: Map<string, Delegate<() => void>>,
    deactivationDelegates: Map<string, Delegate<() => void>>
};

type ToolData = {
    behaviors: ListenerSet<Node, ToolBehaviorCallback>
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

    public getElementData(element: Node, manager: TurboEventManager): ElementData {
        if (element instanceof TurboSelector) element = element.element;
        const es = this.getOrCreate(this.elements, element,
            () => new WeakMap());
        return this.getOrCreate(es, manager, () => ({
            tools: new Set(),
            ignoreAllTools: false,
            ignoredTools: new Map(),
            activationDelegates: new Map(),
            deactivationDelegates: new Map(),
        }));
    }

    private getToolsData(manager: TurboEventManager, toolName: string): ToolData {
        const byTool = this.getOrCreate(this.tools, manager, () => new Map());
        return this.getOrCreate(byTool, toolName, () => ({
            behaviors: new ListenerSet()
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
        this.getToolsData(manager, toolName).behaviors?.addListener({callback, type, toolName, manager});
    }

    public getToolBehaviors(toolName: string, type: string, manager: TurboEventManager): Listener<Node, ToolBehaviorCallback>[] {
        return this.getToolsData(manager, toolName).behaviors?.getListeners({toolName, manager, type});
    }

    public removeToolBehaviors(toolName: string, type: string, manager: TurboEventManager): void {
        this.getToolsData(manager, toolName).behaviors?.removeMatchingListeners({toolName, manager, type});
    }

    public clearToolBehaviors(manager: TurboEventManager): void {
        this.getOrCreate(this.tools, manager, () => new Map()).clear();
    }

    public ignoreTool(element: Node, toolName: string, type: string, ignore: boolean, manager: TurboEventManager): void {
        const ignoredTools = this.getElementData(element, manager).ignoredTools;
        if (!type) {
            if (ignore) ignoredTools.set(toolName, "all");
            else ignoredTools.delete(toolName);
        }
        else {
            const ignoredTool = ignoredTools.get(toolName);
            if (!ignore) {
                if (ignoredTool instanceof Set) ignoredTool.delete(type);
                return;
            }
            if (!(ignoredTool instanceof Set)) ignoredTools.set(toolName, new Set());
            (ignoredTools.get(toolName) as Set<string>).add(type);
        }
    }

    public isToolIgnored(element: Node, toolName: string, type: string, manager: TurboEventManager): boolean {
        const ignoredTool = this.getElementData(element, manager).ignoredTools?.get(toolName);
        if (!ignoredTool) return false;
        if (ignoredTool === "all" || !type) return true;
        return ignoredTool.has(type);
    }

    public processPropagation(
        currentPropagation: Propagation | any,
        storedPropagation: Propagation = Propagation.propagate,
        defaultPropagation: Propagation = Propagation.stopPropagation
    ): Propagation {
        const orderedValues = [
            Propagation.propagate,
            Propagation.stopPropagation,
            Propagation.stopImmediatePropagation
        ];

        if (!orderedValues.includes(currentPropagation)) currentPropagation = defaultPropagation;
        return orderedValues.indexOf(currentPropagation) <= orderedValues.indexOf(storedPropagation)
            ? storedPropagation : currentPropagation;
    }
}