import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {TurboEventManagerStateProperties} from "../../eventHandling/turboEventManager/turboEventManager.types";

type ListenerEntry = {
    target: Node,
    type: string,
    toolName?: string,
    originalListener: EventListenerOrEventListenerObject | ((e: Event, el: Node) => void),
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
}

type ListenerOptions = AddEventListenerOptions & {
    propagate?: boolean,
    temporary?: boolean,
};

declare module "../turboFunctions" {
    interface TurboSelector {
        /**
         * @description Readonly set of listeners bound to this node.
         */
        readonly boundListeners: Set<ListenerEntry>;

        /**
         * @description If you want the element to bypass the event manager and allow native events to seep through,
         * you can set this field to a predicate that defines when to bypass the manager.
         * @param {TurboEvent} e The event.
         */
        bypassManagerOn: (e: TurboEvent) => boolean | TurboEventManagerStateProperties;

        /**
         * @description Adds an event listener to the element.
         * @param {string} type - The type of the event.
         * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function
         * or object that receives a notification.
         * @param {Node} [boundTo=this] - The element or node to which the listener is bound. Defaults to the element
         * itself.
         * @param {boolean | AddEventListenerOptions} [options] - An options object that specifies characteristics
         * about the event listener.
         * @returns {this} Itself, allowing for method chaining.
         */
        on<Type extends Node>(
            type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: Type) => void),
            boundTo?: Node, options?: boolean | ListenerOptions): Type;

        /**
         * @description Adds an event listener to the element.
         * @param {string} type - The type of the event.
         * @param toolName - The name of the current tool.
         * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function
         * or object that receives a notification.
         * @param {Node} [boundTo=this] - The element or node to which the listener is bound. Defaults to the element
         * itself.
         * @param {boolean | AddEventListenerOptions} [options] - An options object that specifies characteristics
         * about the event listener.
         * @param eventManager
         * @returns {this} Itself, allowing for method chaining.
         */
        onTool<Type extends Node>(
            type: string, toolName: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: Type) => void),
            boundTo?: Node, options?: boolean | ListenerOptions, eventManager?: TurboEventManager): Type;

        /**
         * @description Checks if the given event listener is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function or object
         * that receives a notification.
         * @param {boolean | EventListenerOptions} [options] - An options object that specifies characteristics about
         * the event listener.
         * @returns {boolean} Whether the element has the given listener.
         */
        hasListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: this) => void),
                    options?: boolean | EventListenerOptions): boolean;

        /**
         * @description Checks if the given event listener is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {string} toolName - The name of the tool the listener is attached to.
         * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function or object
         * that receives a notification.
         * @param {boolean | EventListenerOptions} [options] - An options object that specifies characteristics about
         * the event listener.
         * @returns {boolean} Whether the element has the given listener.
         */
        hasToolListener(type: string, toolName: string, listener: EventListenerOrEventListenerObject
            | ((e: Event, el: this) => void), options?: boolean | EventListenerOptions): boolean;

        /**
         * @description Checks if the element has bound listeners of the given type (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {string} toolName - The name of the tool to consider (if any).
         * @returns {ListenerEntry[]} - Array of listener objects.
         */
        hasListenersByType(type: string, toolName?: string): ListenerEntry[];

        /**
         * @description Removes an event listener that is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function or object
         * that receives a notification.
         * @param {boolean | EventListenerOptions} [options] - An options object that specifies characteristics about
         * the event listener.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: this) => void),
                       options?: boolean | EventListenerOptions): this;

        /**
         * @description Removes an event listener that is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {string} toolName - The name of the tool the listener is attached to
         * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function or object
         * that receives a notification.
         * @param {boolean | EventListenerOptions} [options] - An options object that specifies characteristics about
         * the event listener.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeToolListener(type: string, toolName: string, listener: EventListenerOrEventListenerObject
            | ((e: Event, el: this) => void), options?: boolean | EventListenerOptions): this;

        /**
         * @description Removes all event listeners bound to the element (in its boundListeners list) assigned to the
         * specified type.
         * @param {string} type - The type of the event. Set to null or undefined to consider all types.
         * @param {string} toolName - The name of the tool associated (if any).
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListenersByType(type: string, toolName?: string): this;

        /**
         * @description Removes all event listeners bound to the element (in its boundListeners list).
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllListeners(): this;

        //TODO
        preventDefault(options?: any): void;
    }
}

export {ListenerEntry, ListenerOptions};
