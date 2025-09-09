import {TurboSelector} from "../turboFunctions";
import {Delegate} from "../../eventHandling/delegate/delegate";
import {DefaultEventName, DefaultEventNameEntry} from "../../eventHandling/eventNaming";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ClickMode} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {MakeToolOptions} from "./tool.types";
import {ToolFunctionsUtils} from "./tool.utils";
import {TurboEventManagerModel} from "../../eventHandling/turboEventManager/turboEventManager.model";

const utils = new ToolFunctionsUtils();

function setupToolFunctions() {
    Object.defineProperty(TurboSelector.prototype, "onToolActivation", {
        value: new Delegate<() => void>(),
        writable: false,
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(TurboSelector.prototype, "onToolDeactivation", {
        value: new Delegate<() => void>(),
        writable: false,
        configurable: true,
        enumerable: true
    });

    TurboSelector.prototype.isTool = function _isTool(
        this: TurboSelector, manager: TurboEventManager = TurboEventManager.instance): boolean {
        return !!utils.getToolName(this.element, manager);
    }

    TurboSelector.prototype.getToolName = function _getToolName(
        this: TurboSelector, manager: TurboEventManager = TurboEventManager.instance): string {
        return utils.getToolName(this.element, manager);
    }

    TurboSelector.prototype.isEmbeddedTool = function _isEmbeddedTool(
        this: TurboSelector, manager: TurboEventManager = TurboEventManager.instance): boolean {
        return !!utils.getEmbeddedToolTarget(this.element, manager);
    }

    TurboSelector.prototype.getEmbeddedToolTarget = function _getEmbeddedToolTarget(
        this: TurboSelector, manager: TurboEventManager = TurboEventManager.instance): Node {
        return utils.getEmbeddedToolTarget(this.element, manager);
    }

    TurboSelector.prototype.makeTool = function _makeTool
    (this: TurboSelector, toolName: string, options?: MakeToolOptions): TurboSelector {
        if (!toolName) return this;
        if (!options) options = {};
        if (!options.manager) options.manager = TurboEventManager.instance;

        options.manager.addTool(toolName, this.element, options.key);
        if (options.activateOn && typeof options.activateOn === "function") options.activateOn(this, options.manager);
        else {
            options.activationEvent ??= DefaultEventName.click;
            options.clickMode ??= ClickMode.left;
            this.on(options.activationEvent, () => options.manager.setTool(toolName, options.clickMode));
        }

        return this;
    }

    TurboSelector.prototype.addToolBehavior = function _addToolBehavior
    (this: TurboSelector, eventName: DefaultEventNameEntry, callback: (event: Event, target: Node) => void,
     manager: TurboEventManager = TurboEventManager.instance): void {
        if (!eventName || !this.isTool(manager)) return;
    }
}

export {setupToolFunctions};