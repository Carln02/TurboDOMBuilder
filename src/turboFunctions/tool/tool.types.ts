import {DefaultEventNameEntry} from "../../eventHandling/eventNaming";
import {Delegate} from "../../eventHandling/delegate/delegate";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ClickMode} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {Turbo} from "../turboFunctions.types";

/**
 * @type {MakeToolOptions}
 * @description Options used to create a new tool attached to an element via {@link makeTool}.
 * @property {() => void} [onActivate] - Function to execute when the tool is activated.
 * @property {() => void} [onDeactivate] - Function to execute when the tool is deactivated.
 * @property {DefaultEventNameEntry} [activationEvent] - Custom activation event to listen to. Defaults to the
 * default click event name.
 * @property {ClickMode} [clickMode] -  Click mode that will hold this tool when activated. Defaults to `ClickMode.left`.
 * @property {(element: Turbo<Element>, manager: TurboEventManager) => void} [customActivation] - Custom activation
 * function. If provided, is called with `(el, manager)` to define when the tool is activated.
 * @property {string} [key] - Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
 * to `TurboEventManager.instance`.
 */
type MakeToolOptions = {
    onActivate?: () => void,
    onDeactivate?: () => void,

    activationEvent?: DefaultEventNameEntry,
    clickMode?: ClickMode,
    customActivation?: (element: Turbo<Element>, manager: TurboEventManager) => void,
    key?: string,
    manager?: TurboEventManager
};

/**
 * @type {ToolBehaviorCallback}
 * @description Function signature for a tool behavior. Returning `true` marks the behavior as handled/consumed,
 * leading to stopping the propagation of the event.
 * @param {Event} event - The original DOM/Turbo event.
 * @param {Node} target - The node the behavior should operate on (the object or its embedded target).
 * @param {ToolBehaviorOptions} [options] - Additional info (embedded context, etc.).
 * @return {boolean} - Whether to stop the propagation.
 */
type ToolBehaviorCallback = (event: Event, target: Node, options?: ToolBehaviorOptions) => boolean;

/**
 * @type {ToolBehaviorOptions}
 * @description Options object passed to tool behaviors at execution time.
 * @property {boolean} [isEmbedded] - Indicates if the tool is embedded in a target node.
 * @property {Node} [embeddedTarget] - The target of the tool, if it is embedded.
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
         * @function makeTool
         * @description Turns the element into a tool identified by `toolName`, optionally wiring activation and
         * key mapping. By default, this function also sets up an event listener on the element to activate the
         * tool on click. This behavior can be overridden via the `options` parameter.
         * @param {string} toolName - The unique name of the tool to register under the manager. Reusing an existing
         * `toolName` will make this element another instance of `toolName`.
         * @param {MakeToolOptions} [options] - Tool creation options (custom activation, click mode, key mapping, manager).
         * @returns {this} - Itself for chaining.
         */
        makeTool(toolName: string, options?: MakeToolOptions): this;

        /**
         * @function isTool
         * @description Whether this element is registered as a tool for the provided manager.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if the element is a tool, false otherwise.
         */
        isTool(manager?: TurboEventManager): boolean;

        /**
         * @function getToolNames
         * @description Returns all tool names registered on this element for the provided manager.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {string[]} The list of tool names.
         */
        getToolNames(manager?: TurboEventManager): string[];

        /**
         * @function getToolName
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
         * @function onToolActivate
         * @description Retrieve the delegate fired when this tool is activated in the corresponding manager.
         * @param {string} [toolName=this.getToolName()] - The name of the tool.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {Delegate<() => void} - The delegate.
         */
        onToolActivate(toolName?: string, manager?: TurboEventManager): Delegate<() => void>;

        /**
         * @function onToolDeactivate
         * @description Retrieve the delegate fired when this tool is deactivated in the corresponding manager.
         * @param {string} [toolName=this.getToolName()] - The name of the tool.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {Delegate<() => void} - The delegate.
         */
        onToolDeactivate(toolName?: string, manager?: TurboEventManager): Delegate<() => void>;

        /*
         *
         *
         * Tool behavior manipulation
         *
         *
         */

        /**
         * @function addToolBehavior
         * @description Adds a behavior callback for a given tool and a given type. This callback will attempt to be
         * executed on the target element when a `type` event is fired and `toolName` is active. It is applied to
         * all instances of the tool.
         * @param {string} type - The type of the event (e.g., "pointerdown", "click", custom turbo event).
         * @param {ToolBehaviorCallback} callback - The behavior function. Return `true` to stop propagation.
         * @param {string} [toolName=this.getToolName()] - Tool name to bind the behavior to. Defaults to this
         * element's first tool.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @returns {this} Itself for chaining.
         */
        addToolBehavior(type: string, callback: ToolBehaviorCallback, toolName?: string,
                        manager?: TurboEventManager): this;

        /**
         * @function hasToolBehavior
         * @description Checks whether there is at least one tool behavior for the pair "`type`, `toolName`."
         * @param {string} type - The type of the event (e.g., "pointerdown", "click", custom turbo event).
         * @param {string} [toolName=this.getToolName()] - The tool name to check under. Defaults to this
         * element's first tool.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if one or more behaviors are registered.
         */
        hasToolBehavior(type: string, toolName?: string, manager?: TurboEventManager): boolean;

        /**
         * @function removeToolBehaviors
         * @description Removes all behaviors for the pair "`type`, `toolName`" under the given manager.
         * @param {string} type - The type of the event (e.g., "pointerdown", "click", custom turbo event).
         * @param {string} [toolName=this.getToolName()] - The tool name whose behaviors will be removed. Defaults to this
         * element's first tool.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @returns {this} Itself for chaining.
         */
        removeToolBehaviors(type: string, toolName?: string, manager?: TurboEventManager): this;

        /**
         * @function applyTool
         * @description Executes all behaviors registered for the pair "`type`, `toolName`" against this element.
         * @param {string} toolName - The name of the tool whose behaviors should run.
         * @param {string} type - The type of the event (e.g., "pointerdown", "click", custom turbo event).
         * @param {Event} event - The triggering event instance.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if at least one behavior returned `true` (to stop propagation of the event).
         */
        applyTool(toolName: string, type: string, event: Event, manager?: TurboEventManager): boolean;

        /**
         * @function clearToolBehaviors
         * @description Clears all registered behaviors for the tools attached to this element.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {this} Itself for chaining.
         */
        clearToolBehaviors(manager?: TurboEventManager): this;

        /*
         *
         *
         * Embedded tool manipulation
         *
         *
         */

        /**
         * @function embedTool
         * @description Embeds this tool into a target node, so all interactions on the tool element apply to the
         * defined target.
         * @param {Node} target - The node to manipulate when interacting with the tool element itself.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @returns {this} Itself for chaining.
         */
        embedTool(target: Node, manager?: TurboEventManager): this;

        /**
         * @function isEmbeddedTool
         * @description Whether this tool is embedded under the provided manager.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if an embedded target is present.
         */
        isEmbeddedTool(manager?: TurboEventManager): boolean;

        /**
         * @function getEmbeddedToolTarget
         * @description Returns the target node for this embedded tool under the provided manager.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {Node} The embedded tool's target node, if any.
         */
        getEmbeddedToolTarget(manager?: TurboEventManager): Node;

        /**
         * @function ignoreTool
         * @description Make the current element ignore the provided tool, so interacting with the tool on this
         * element will have no effect and propagate.
         * @param {string} toolName - The name of the tool to ignore.
         * @param {string} [type] - The type of the event. If undefined, all event types will be considered.
         * @param {boolean} [ignore] - Whether to ignore the tool. Defaults to true.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {this} Itself for chaining.
         */
        ignoreTool(toolName: string, type?: string, ignore?: boolean, manager?: TurboEventManager): this;

        /**
         * @function ignoreTool
         * @description Make the current element ignore all tools, so interacting with any tool on this
         * element will have no effect and propagate.
         * @param {boolean} [ignore] - Whether to ignore the tools. Defaults to true.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {this} Itself for chaining.
         */
        ignoreAllTools(ignore?: boolean, manager?: TurboEventManager): this;

        /**
         * @function isToolIgnored
         * @description Whether the current element is ignoring the provided tool.
         * @param {string} toolName - The name of the tool to check for.
         * @param {string} [type] - The type of the event. If undefined, all event types will be considered.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} Whether the tool is ignored for the provided event type.
         */
        isToolIgnored(toolName: string, type?: string, manager?: TurboEventManager): boolean;
    }
}

export {MakeToolOptions, ToolBehaviorCallback, ToolBehaviorOptions};
