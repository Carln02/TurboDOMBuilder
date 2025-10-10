import {TurboSelector} from "../turboSelector";
import {Delegate} from "../../eventHandling/delegate/delegate";
import {DefaultEventName} from "../../eventHandling/eventNaming";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ClickMode} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {MakeToolOptions, ToolBehaviorCallback, ToolBehaviorOptions} from "./tool.types";
import {ToolFunctionsUtils} from "./tool.utils";

const utils = new ToolFunctionsUtils();

function setupToolFunctions() {
    /*
     *
     * Basic tool manipulation
     *
     */

    TurboSelector.prototype.makeTool = function _makeTool(
        this: TurboSelector,
        toolName: string,
        options?: MakeToolOptions
    ): TurboSelector {
        if (!toolName) return this;
        if (!options) options = {};
        if (!options.manager) options.manager = TurboEventManager.instance;

        options.manager.addTool(toolName, this.element, options.key);
        if (options.customActivation && typeof options.customActivation === "function") options.customActivation(this, options.manager);
        else {
            options.activationEvent ??= DefaultEventName.click;
            options.clickMode ??= ClickMode.left;
            this.on(options.activationEvent, () => options.manager.setTool(this.element, options.clickMode),
                undefined, options.manager);
        }
        utils.saveTool(this, toolName, options.manager);

        if (options.onActivate) utils.getActivationDelegate(this, toolName, options.manager).add(options.onActivate);
        if (options.onDeactivate) utils.getDeactivationDelegate(this, toolName, options.manager).add(options.onDeactivate);

        return this;
    }

    TurboSelector.prototype.isTool = function _isTool(
        this: TurboSelector,
        manager: TurboEventManager = TurboEventManager.instance
    ): boolean {
        return utils.getToolNames(this.element, manager).length > 0;
    }

    TurboSelector.prototype.getToolNames = function _getToolName(
        this: TurboSelector,
        manager: TurboEventManager = TurboEventManager.instance
    ): string[] {
        return utils.getToolNames(this.element, manager);
    }

    TurboSelector.prototype.getToolName = function _getToolName(
        this: TurboSelector,
        manager: TurboEventManager = TurboEventManager.instance
    ): string {
        const toolNames = utils.getToolNames(this.element, manager);
        if (toolNames.length > 0) return toolNames[0];
    }

    /*
     *
     * Tool activation manipulation
     *
     */

    TurboSelector.prototype.onToolActivate = function _onActivate(
        this: TurboSelector,
        toolName: string,
        manager: TurboEventManager = TurboEventManager.instance
    ): Delegate<() => void> {
        return utils.getActivationDelegate(this, toolName, manager);
    }

    TurboSelector.prototype.onToolDeactivate = function _onDeactivate(
        this: TurboSelector,
        toolName: string,
        manager: TurboEventManager = TurboEventManager.instance
    ): Delegate<() => void> {
        return utils.getDeactivationDelegate(this, toolName, manager);
    }

    /*
     *
     * Tool behavior manipulation
     *
     */

    TurboSelector.prototype.addToolBehavior = function _addToolBehavior(
        this: TurboSelector,
        type: string,
        callback: ToolBehaviorCallback,
        toolName: string = this.getToolName(),
        manager: TurboEventManager = TurboEventManager.instance
    ): TurboSelector {
        if (type && toolName) {
            manager.setupCustomDispatcher?.(type);
            utils.addToolBehavior(toolName, type, callback, manager);
        }
        return this;
    }

    TurboSelector.prototype.hasToolBehavior = function _hasToolBehavior(
        this: TurboSelector,
        type: string,
        toolName: string = this.getToolName(),
        manager: TurboEventManager = TurboEventManager.instance
    ): boolean {
        if (!type || !toolName) return false;
        return utils.getToolBehaviors(toolName, type, manager).length > 0;
    }

    TurboSelector.prototype.removeToolBehaviors = function _removeToolBehaviors(
        this: TurboSelector,
        type: string,
        toolName: string = this.getToolName(),
        manager: TurboEventManager = TurboEventManager.instance
    ): TurboSelector {
        if (type && toolName) utils.removeToolBehaviors(toolName, type, manager);
        return this;
    }

    TurboSelector.prototype.clearToolBehaviors = function _clearToolBehaviors(
        this: TurboSelector,
        manager: TurboEventManager = TurboEventManager.instance
    ): TurboSelector {
        utils.clearToolBehaviors(manager);
        return this;
    }

    /*
     *
     * Embedded tool manipulation
     *
     */

    TurboSelector.prototype.embedTool = function _embedTool(
        this: TurboSelector,
        target: Node,
        manager: TurboEventManager = TurboEventManager.instance
    ): TurboSelector {
        if (this.isTool(manager)) utils.setEmbeddedToolTarget(this.element, target, manager);
        return this;
    }

    TurboSelector.prototype.isEmbeddedTool = function _isEmbeddedTool(
        this: TurboSelector,
        manager: TurboEventManager = TurboEventManager.instance
    ): boolean {
        return !!utils.getEmbeddedToolTarget(this.element, manager);
    }

    TurboSelector.prototype.getEmbeddedToolTarget = function _getEmbeddedToolTarget(
        this: TurboSelector,
        manager: TurboEventManager = TurboEventManager.instance
    ): Node {
        return utils.getEmbeddedToolTarget(this.element, manager);
    }

    /*
     *
     * Apply tool
     *
     */

    TurboSelector.prototype.applyTool = function _applyTool(
        this: TurboSelector,
        toolName: string,
        type: string,
        event: Event,
        manager: TurboEventManager = TurboEventManager.instance
    ): boolean {
        let pass: boolean = false;
        const behaviors = utils.getToolBehaviors(toolName, type, manager);

        const options: ToolBehaviorOptions = {};
        options.embeddedTarget = utils.getEmbeddedToolTarget(this.element, manager);
        options.isEmbedded = !!options.embeddedTarget;

        behaviors.forEach(behavior => {
            if (behavior(event, this.element, options)) pass = true;
        });

        return pass;
    }

    TurboSelector.prototype.ignoreTool = function _ignoreTool(
        this: TurboSelector,
        toolName: string,
        type?: string,
        ignore: boolean = true,
        manager: TurboEventManager = TurboEventManager.instance
    ): TurboSelector {
        utils.ignoreTool(this.element, toolName, type, ignore, manager);
        return this;
    }

    TurboSelector.prototype.isToolIgnored = function _isToolIgnored(
        this: TurboSelector,
        toolName: string,
        type?: string,
        manager: TurboEventManager = TurboEventManager.instance
    ): boolean {
        return utils.isToolIgnored(this.element, toolName, type, manager);
    }
}

export {setupToolFunctions};