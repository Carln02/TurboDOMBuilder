import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {TurboEventManagerStateProperties} from "../../eventHandling/turboEventManager/turboEventManager.types";

type ListenerEntry = {
    target: Node,
    type: string,
    toolName?: string,
    listener: ((e: Event, el: Node) => void),
    options?: ListenerOptions,
    manager: TurboEventManager,
}

type ListenerOptions = AddEventListenerOptions & {
    propagate?: boolean
};

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
    "wheel", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup",
] as const;

declare module "../turboFunctions" {
    interface TurboSelector {
        /**
         * @description Readonly map of listeners bound to this node.
         */
        readonly boundListeners: Map<string, Set<ListenerEntry>>;

        /**
         * @description If you want the element to bypass the event manager and allow native events to seep through,
         * you can set this field to a predicate that defines when to bypass the manager.
         * @param {TurboEvent} e The event.
         */
        bypassManagerOn: (e: TurboEvent) => boolean | TurboEventManagerStateProperties;

        /**
         * @description Adds an event listener to the element.
         * @param {string} type - The type of the event.
         * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
         * @param {ListenerOptions} [options] - An options object that specifies characteristics
         * about the event listener.
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        on<Type extends Node>(type: string, listener: ((e: Event, el: Type) => void),
                              options?: ListenerOptions, manager?: TurboEventManager): Type;

        /**
         * @description Adds an event listener to the element.
         * @param {string} type - The type of the event.
         * @param toolName - The name of the tool. Set to null or undefined to check for listeners not bound to a tool.
         * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
         * @param {ListenerOptions} [options] - An options object that specifies characteristics
         * about the event listener.
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        onTool<Type extends Node>(type: string, toolName: string, listener: ((e: Event, el: Type) => void),
                                  options?: ListenerOptions, manager?: TurboEventManager): Type;

        //TODO
        executeAction(type: string, toolName: string, event: Event, options?: ListenerOptions, manager?: TurboEventManager): boolean;

        /**
         * @description Checks if the given event listener is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {boolean} - Whether the element has the given listener.
         */
        hasListener(type: string, listener: ((e: Event, el: this) => void), manager?: TurboEventManager): boolean;

        /**
         * @description Checks if the given event listener is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {string} toolName - The name of the tool the listener is attached to. Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {boolean} - Whether the element has the given listener.
         */
        hasToolListener(type: string, toolName: string, listener: ((e: Event, el: this) => void),
                    manager?: TurboEventManager): boolean;

        /**
         * @description Checks if the element has bound listeners of the given type (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {string} toolName - The name of the tool to consider (if any). Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {boolean} - Whether the element has the given listener.
         */
        hasListenersByType(type: string, toolName?: string, manager?: TurboEventManager): boolean;

        /**
         * @description Removes an event listener that is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListener(type: string, listener: ((e: Event, el: this) => void), manager?: TurboEventManager): this;

        /**
         * @description Removes an event listener that is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {string} toolName - The name of the tool the listener is attached to. Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeToolListener(type: string, toolName: string, listener: ((e: Event, el: this) => void),
                           manager?: TurboEventManager): this;

        /**
         * @description Removes all event listeners bound to the element (in its boundListeners list) assigned to the
         * specified type.
         * @param {string} type - The type of the event. Set to null or undefined to consider all types.
         * @param {string} toolName - The name of the tool associated (if any). Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListenersByType(type: string, toolName?: string, manager?: TurboEventManager): this;

        /**
         * @description Removes all event listeners bound to the element (in its boundListeners list).
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllListeners(manager?: TurboEventManager): this;

        /**
         * @description Prevent default browser behavior on the provided event types. By default, all basic input events
         * will be processed.
         * @param {PreventDefaultOptions} options - An options object to customize the behavior of the function.
         */
        preventDefault(options?: PreventDefaultOptions): void;
    }
}

export {ListenerEntry, ListenerOptions, PreventDefaultOptions, BasicInputEvents, NonPassiveEvents};
