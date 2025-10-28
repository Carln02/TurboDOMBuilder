import {TurboEventManagerStateProperties} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";

type ListenerEntry = {
    target: Node,
    type: string,
    toolName?: string,
    listener: ((e: Event, el: Node) => boolean | void),
    bundledListener: ((e: Event) => boolean | void),
    options?: ListenerOptions,
    manager: TurboEventManager,
}

type ListenerOptions = AddEventListenerOptions;

type PreventDefaultOptions = {
    types?: string[],
    phase?: "capture" | "bubble",
    stop?: false | "stop" | "immediate",
    preventDefaultOn?: (type: string, e: Event) => boolean,
    clearPreviousListeners?: boolean,
    manager?: TurboEventManager
};

const BasicInputEvents = [
    "mousedown", "mouseup", "mousemove", "click", "dblclick", "contextmenu",
    "dragstart", "selectstart",
    "touchstart", "touchmove", "touchend", "touchcancel",
    "pointerdown", "pointermove", "pointerup",
    "wheel"
] as const;

const NonPassiveEvents = [
    "wheel", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointercancel"
] as const;

declare module "../turboSelector" {
    interface TurboSelector {
        /**
         * @description Readonly set of listeners bound to this node.
         */
        readonly boundListeners: Set<ListenerEntry>;

        /**
         * @description If you want the element to bypass the event manager and allow native events to seep through
         * (in case you are preventing default events), you can set this field to a predicate that
         * defines when to bypass the manager according to the passed event.
         */
        bypassManagerOn: (e: Event) => boolean | TurboEventManagerStateProperties;

        /**
         * @function on
         * @description Adds an event listener to the element.
         * @template {Node} Type - The type of the element.
         * @param {string} type - The type of the event.
         * @param {(e: Event, el: this) => boolean | void} listener - The function that receives a notification.
         * @param {ListenerOptions} [options] - An options object that specifies characteristics
         * about the event listener.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        on<Type extends Node>(type: string, listener: ((e: Event, el: Type) => boolean | void),
                              options?: ListenerOptions, manager?: TurboEventManager): this;

        /**
         * @function onTool
         * @template {Node} Type - The type of the element.
         * @description Adds an event listener to the element.
         * @param {string} type - The type of the event.
         * @param {string} toolName - The name of the tool. Set to null or undefined to check for listeners not bound
         * to a tool.
         * @param {(e: Event, el: this) => boolean | void} listener - The function that receives a notification.
         * @param {ListenerOptions} [options] - An options object that specifies characteristics
         * about the event listener.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        onTool<Type extends Node>(type: string, toolName: string, listener: ((e: Event, el: Type) => boolean | void),
                                  options?: ListenerOptions, manager?: TurboEventManager): this;

        /**
         * @function executeAction
         * @description Execute the listeners bound on this element for the given `type` and `toolName`. Simulates
         * firing a `type` event on the element with `toolName` active.
         * @param {string} type -  The type of the event.
         * @param {string} toolName - The name of the tool. Set to null or undefined to fire listeners not bound
         * to a tool.
         * @param {Event} event - The event to pass as parameter to the listeners.
         * @param {ListenerOptions} [options] - Options object that specifies characteristics
         * about the event listeners to fire.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         */
        executeAction(type: string, toolName: string, event: Event, options?: ListenerOptions, manager?:
        TurboEventManager): boolean;

        /**
         * @function hasListener
         * @description Checks if the given event listener is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {(e: Event, el: this) => boolean | void} listener - The function that receives a notification.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {boolean} - Whether the element has the given listener.
         */
        hasListener(type: string, listener: ((e: Event, el: this) => boolean | void), manager?: TurboEventManager): boolean;

        /**
         * @function hasToolListener
         * @description Checks if the given event listener is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {string} toolName - The name of the tool the listener is attached to. Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {(e: Event, el: this) => boolean | void} listener - The function that receives a notification.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {boolean} - Whether the element has the given listener.
         */
        hasToolListener(type: string, toolName: string, listener: ((e: Event, el: this) => boolean | void),
                    manager?: TurboEventManager): boolean;

        /**
         * @function hasListenersByType
         * @description Checks if the element has bound listeners of the given type (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {string} toolName - The name of the tool to consider (if any). Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {boolean} - Whether the element has a listener of this type.
         */
        hasListenersByType(type: string, toolName?: string, manager?: TurboEventManager): boolean;

        /**
         * @function removeListener
         * @description Removes an event listener that is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {(e: Event, el: this) => boolean | void} listener - The function that receives a notification.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListener(type: string, listener: ((e: Event, el: this) => boolean | void), manager?: TurboEventManager): this;

        /**
         * @function removeToolListener
         * @description Removes an event listener that is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {string} toolName - The name of the tool the listener is attached to. Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {(e: Event, el: this) => boolean | void} listener - The function that receives a notification.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeToolListener(type: string, toolName: string, listener: ((e: Event, el: this) => boolean | void),
                           manager?: TurboEventManager): this;

        /**
         * @function removeListenersByType
         * @description Removes all event listeners bound to the element (in its boundListeners list) assigned to the
         * specified type.
         * @param {string} type - The type of the event. Set to null or undefined to consider all types.
         * @param {string} [toolName] - The name of the tool associated (if any). Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListenersByType(type: string, toolName?: string, manager?: TurboEventManager): this;

        /**
         * @function removeAllListeners
         * @description Removes all event listeners bound to the element (in its boundListeners list).
         * @param {TurboEventManager} [manager] - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllListeners(manager?: TurboEventManager): this;

        /**
         * @description Prevent default browser behavior on the provided event types. By default, all basic input events
         * will be processed.
         * @param {PreventDefaultOptions} [options] - An options object to customize the behavior of the function.
         */
        preventDefault(options?: PreventDefaultOptions): this;
    }
}

export {ListenerEntry, ListenerOptions, PreventDefaultOptions, BasicInputEvents, NonPassiveEvents};
