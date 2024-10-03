type ListenerEntry = {
    target: Node;
    type: string;
    originalListener: EventListenerOrEventListenerObject | ((e: Event, el: Node) => void);
    listener: EventListenerOrEventListenerObject;
    options?: boolean | AddEventListenerOptions;
};
declare global {
    interface Node {
        /**
         * @description Readonly set of listeners bound to this node.
         */
        readonly boundListeners: Set<ListenerEntry>;
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
        addListener<Type extends Node>(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: Type) => void), boundTo?: Node, options?: boolean | AddEventListenerOptions): Type;
        /**
         * @description Removes an event listener that is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function or object
         * that receives a notification.
         * @param {boolean | EventListenerOptions} [options] - An options object that specifies characteristics about
         * the event listener.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): this;
        /**
         * @description Removes all event listeners bound to the element (in its boundListeners list) assigned to the
         * specified type.
         * @param {string} type - The type of the event.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListenersByType(type: string): this;
        /**
         * @description Removes all event listeners bound to the element (in its boundListeners list).
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllListeners(): this;
    }
}
export { ListenerEntry };
