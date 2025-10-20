import {DefaultEventNameEntry} from "../../eventHandling/eventNaming";
import {Delegate} from "../../eventHandling/delegate/delegate";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ClickMode} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {Turbo} from "../turboFunctions.types";

/**
 * @type {MakeToolOptions}
 * @description Options used when turning an element into a tool via `makeTool`.
 * @property {DefaultEventNameEntry} [activationEvent] - Custom activation event to listen to
 * (defaults to the framework's default click event name).
 * @property {ClickMode} [clickMode] -  Click mode that will hold this tool when activated (defaults to `ClickMode.left`).
 * @property {(el: Turbo, manager: TurboEventManager) => void} [activateOn] - Custom activator. If provided, is called with `(el, manager)` and should wire activation itself.
 * @property {string} [key] - Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults to `TurboEventManager.instance`.
 */
type MakeToolOptions = {
    onActivate?: () => void,
    onDeactivate?: () => void,

    activationEvent?: DefaultEventNameEntry,
    clickMode?: ClickMode,
    customActivation?: (element: Turbo, manager: TurboEventManager) => void,
    key?: string,
    manager?: TurboEventManager
};

/**
 * @type {ToolBehaviorCallback}
 * @description Function signature for a tool behavior. Returning `true` marks the behavior as handled/consumed.
 * @param {Event} event - The original DOM/Turbo event.
 * @param {Node} target - The node the behavior should operate on (the object or its embedded target).
 * @param {ToolBehaviorOptions} [options] - Additional info (embedded context, etc.).
 * @return {boolean} Whether the behavior handled the action.
 */
type ToolBehaviorCallback = (event: Event, target: Node, options?: any) => boolean;

/**
 * @type {ToolBehaviorOptions}
 * @description Options passed to tool behaviors at execution time.
 * @property {boolean} [isEmbedded] - Indicates if the tool is embedded in a target node (so behaviors may adjust accordingly).
 * @property {Node} [embeddedTarget] - The embedded target node, if any. Behaviors can use this as the operation target when appropriate.
 */
type ToolBehaviorOptions = {
    isEmbedded?: boolean,
    embeddedTarget?: Node,
}

declare module "../turboSelector" {
    interface TurboSelector {
        /*
         *
         *
         * Basic tool manipulation
         *
         *
         */

        /**
         * @description Turns the element into a tool identified by `toolName`, optionally wiring activation and key mapping.
         * @param {string} toolName - The unique name of the tool to register under the manager.
         * @param {MakeToolOptions} [options] - Tool creation options (activation, click mode, key mapping, manager).
         * @returns {void}
         */
        makeTool(toolName: string, options?: MakeToolOptions): this;

        /**
         * @description Whether this element is registered as a tool for the provided manager.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if the element is a tool, false otherwise.
         */
        isTool(manager?: TurboEventManager): boolean;

        /**
         * @description Returns all tool names registered on this element for the provided manager.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {string[]} The list of tool names.
         */
        getToolNames(manager?: TurboEventManager): string[];

        /**
         * @description Returns the first registered tool name on this element for the provided manager.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {string} The first tool name, if any.
         */
        getToolName(manager?: TurboEventManager): string;

        /*
         *
         * Tool activation manipulation
         *
         */

        /**
         * @description Delegate fired when this tool is activated (selected + activated by the manager).
         */
        onToolActivate(toolName: string, manager?: TurboEventManager): Delegate<() => void>;

        /**
         * @description Delegate fired when this tool is deactivated.
         */
        onToolDeactivate(toolName: string, manager?: TurboEventManager): Delegate<() => void>;

        /*
         *
         *
         * Tool behavior manipulation
         *
         *
         */

        /**
         * @description Adds a behavior callback for a given tool and a given type. It is applied to all instances of the tool.
         * @param {string} type - The behavior type/event name (e.g., "pointerdown", "click", custom turbo event).
         * @param {ToolBehaviorCallback} callback - The behavior function. Return `true` to consume.
         * @param {string} [toolName=this.getToolName()] - Tool name to bind the behavior to. Defaults to this element's first tool.
         * @param {TurboEventManager} [manager] - The manager under which the behavior is registered.
         * @returns {void}
         */
        addToolBehavior(type: string, callback: ToolBehaviorCallback, toolName?: string,
                        manager?: TurboEventManager): this;

        /**
         * @description Checks whether there is at least one behavior for `(type, toolName)`.
         * @param {string} type - The behavior/event type to check.
         * @param {string} [toolName=this.getToolName()] - The tool name to check under.
         * @param {TurboEventManager} [manager] - The associated manager.
         * @return {boolean} True if one or more behaviors are registered.
         */
        hasToolBehavior(type: string, toolName?: string, manager?: TurboEventManager): boolean;

        /**
         * @description Removes all behaviors for `(type, toolName)` under the given manager.
         * @param {string} type - The behavior/event type to clear.
         * @param {string} [toolName=this.getToolName()] - The tool name whose behaviors will be removed.
         * @param {TurboEventManager} [manager] - The associated manager.
         * @returns {void}
         */
        removeToolBehaviors(type: string, toolName?: string, manager?: TurboEventManager): this;

        /**
         * @description Executes all behaviors registered for `(toolName, type)` against this element.
         * @param {string} toolName - The tool whose behaviors should run.
         * @param {string} type - The behavior/event type to execute.
         * @param {Event} event - The triggering event instance.
         * @param {TurboEventManager} [manager] - The associated manager.
         * @return {boolean} True if at least one behavior returned `true` (consumed).
         */
        applyTool(toolName: string, type: string, event: Event, manager?: TurboEventManager): boolean;

        clearToolBehaviors(manager?: TurboEventManager): this;

        /*
         *
         *
         * Embedded tool manipulation
         *
         *
         */

        /**
         * @description Embeds this tool into a target node, so interactions on the tool apply to the target.
         * @param {Node} target - The node to manipulate when interacting with the element itself.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @returns {void}
         */
        embedTool(target: Node, manager?: TurboEventManager): this;

        /**
         * @description Whether this tool is embedded under the provided manager.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if an embedded target is present.
         */
        isEmbeddedTool(manager?: TurboEventManager): boolean;

        /**
         * @description Returns the target node for this embedded tool under the provided manager.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {Node} The embedded target node, if any.
         */
        getEmbeddedToolTarget(manager?: TurboEventManager): Node;

        ignoreTool(toolName: string, type?: string, ignore?: boolean, manager?: TurboEventManager): this;
        isToolIgnored(toolName: string, type?: string, manager?: TurboEventManager): boolean;
    }
}

export {MakeToolOptions, ToolBehaviorCallback, ToolBehaviorOptions};
