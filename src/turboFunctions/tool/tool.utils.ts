import {TurboSelector} from "../turboFunctions";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";

export class ToolFunctionsUtils {
    private dataMap = new WeakMap<Node, Record<string, any>>;

    public data(element: Node) {
        if (element instanceof TurboSelector) element = element.element;
        if (!element) return {};
        if (!this.dataMap.has(element)) this.dataMap.set(element, {});
        return this.dataMap.get(element);
    }

    public saveTool(element: Node, toolName: string, target: Node, manager: TurboEventManager) {
        const data = this.data(element);
        if (!data.managerMap) data.managerMap = new WeakMap<TurboEventManager, Record<string, any>>();
        data.managerMap.set(manager, {toolName, target});
    }

    public getToolName(element: Node, manager: TurboEventManager) {
        return this.data(element).managerMap?.get(manager)?.toolName;
    }

    public getEmbeddedToolTarget(element: Node, manager: TurboEventManager) {
        return this.data(element).managerMap?.get(manager)?.target;
    }
}