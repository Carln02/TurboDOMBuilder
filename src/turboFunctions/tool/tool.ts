import {$, TurboSelector} from "../turboFunctions";
import {Delegate} from "../../eventHandling/delegate/delegate";
import {DefaultEventName} from "../../eventHandling/eventNaming";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ClickMode} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {MakeToolOptions, ToolBehaviorCallback, ToolBehaviorOptions} from "./tool.types";
import {ToolFunctionsUtils} from "./tool.utils";

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

    /*
     *
     * Basic tool manipulation
     *
     */

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
        utils.saveTool(this, toolName, options.manager);

        return this;
    }

    TurboSelector.prototype.isTool = function _isTool(
        this: TurboSelector, manager: TurboEventManager = TurboEventManager.instance): boolean {
        return utils.getToolNames(this.element, manager).length > 0;
    }

    TurboSelector.prototype.getToolNames = function _getToolName(
        this: TurboSelector, manager: TurboEventManager = TurboEventManager.instance): string[] {
        return utils.getToolNames(this.element, manager);
    }

    TurboSelector.prototype.getToolName = function _getToolName(
        this: TurboSelector, manager: TurboEventManager = TurboEventManager.instance): string {
        const toolNames = utils.getToolNames(this.element, manager);
        if (toolNames.length > 0) return toolNames[0];
    }

    /*
     *
     * Tool behavior manipulation
     *
     */

    TurboSelector.prototype.addToolBehavior = function _addToolBehavior
    (this: TurboSelector, type: string, callback: ToolBehaviorCallback, toolName: string = this.getToolName(),
     manager: TurboEventManager = TurboEventManager.instance): void {
        if (!type || !toolName || !this.isTool(manager)) return;
        utils.addToolBehavior(toolName, type, callback, manager);
    }

    TurboSelector.prototype.hasToolBehavior = function _hasToolBehavior
    (this: TurboSelector, type: string, toolName: string = this.getToolName(),
     manager: TurboEventManager = TurboEventManager.instance): boolean {
        if (!type || !toolName || !this.isTool(manager)) return false;
        return utils.getToolBehaviors(toolName, type, manager).length > 0;
    }

    TurboSelector.prototype.removeToolBehaviors = function _removeToolBehaviors
    (this: TurboSelector, type: string, toolName: string = this.getToolName(),
     manager: TurboEventManager = TurboEventManager.instance) {
        if (!type || !toolName || !this.isTool(manager)) return;
        utils.removeToolBehaviors(toolName, type, manager);
    }

    /*
     *
     * Embedded tool manipulation
     *
     */

    TurboSelector.prototype.embedTool = function _embedTool(
        this: TurboSelector, target: Node, manager: TurboEventManager = TurboEventManager.instance) {
        if (!this.isTool(manager)) return;
        utils.setEmbeddedToolTarget(this.element, target, manager);
    }

    TurboSelector.prototype.isEmbeddedTool = function _isEmbeddedTool(
        this: TurboSelector, manager: TurboEventManager = TurboEventManager.instance): boolean {
        return !!utils.getEmbeddedToolTarget(this.element, manager);
    }

    TurboSelector.prototype.getEmbeddedToolTarget = function _getEmbeddedToolTarget(
        this: TurboSelector, manager: TurboEventManager = TurboEventManager.instance): Node {
        return utils.getEmbeddedToolTarget(this.element, manager);
    }

    /*
     *
     * Apply tool
     *
     */

    TurboSelector.prototype.applyTool = function _applyTool(
        this: TurboSelector, toolName: string, type: string, event: Event,
        manager: TurboEventManager = TurboEventManager.instance): boolean {
        let pass: boolean = false;
        const behaviors = utils.getToolBehaviors(toolName, type, manager);

        const options: ToolBehaviorOptions = {};
        options.embeddedTarget = utils.getEmbeddedToolTarget(this.element, manager);
        options.isEmbedded = !!options.embeddedTarget;

        behaviors.forEach(behavior => {
            if (behavior(event, this, options)) pass = true;
        });
        // if (pass) return true;
        //
        // if (options.embeddedTarget && $(this).getToolNames(manager).includes(toolName))
        //     behaviors.forEach(behavior => {
        //         if (behavior(event, options.embeddedTarget, options)) pass = true;
        //     });

        return pass;
    }
}

export {setupToolFunctions};