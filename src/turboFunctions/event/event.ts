import "./listenerManipulation.types";
import {ListenerEntry, ListenerOptions} from "./event.types";
import {$, TurboSelector} from "../turboFunctions";
import {Turbo} from "../turboFunctions.types";
import {TurboEventManagerStateProperties} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {callOnce} from "../../decorators/callOnce";
import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";

function setupEventFunctions() {
    /**
     * @description Initializes a `boundListeners` set in the Node prototype, that will hold all the element's bound
     * listeners.
     */
    Object.defineProperty(TurboSelector.prototype, "boundListeners", {
        value: new Set<ListenerEntry>(),
        writable: false,
        configurable: true,
        enumerable: true
    });

    Object.defineProperty(TurboSelector.prototype, "bypassManagerOn", {
        get: function() {
            return this.getValue("bypassCallback");
        },
        set: function (value: (e: TurboEvent) => boolean | TurboEventManagerStateProperties) {
            let bypassCallback = this.getValue("bypassCallback");
            const setupListeners = !bypassCallback;
            this.setValue("bypassCallback", value);
            bypassCallback = value;

            if (setupListeners) {
                this.addEventListener("mousedown", (e: TurboEvent) => TurboEventManager.allManagers
                    .forEach(manager => bypassManager(this, manager, bypassCallback(e))));
                this.addEventListener("touchstart", (e: TurboEvent) => TurboEventManager.allManagers
                    .forEach(manager => bypassManager(this, manager, bypassCallback(e))));
            }
        },
        configurable: true,
        enumerable: true
    });

    function bypassManager(element: Element, eventManager: TurboEventManager,
                           bypassResults:  boolean | TurboEventManagerStateProperties) {
        if (typeof bypassResults == "boolean") eventManager.lock(element, {
            enabled: bypassResults,
            preventDefaultWheel: bypassResults,
            preventDefaultMouse: bypassResults,
            preventDefaultTouch: bypassResults
        });

        else eventManager.lock(element, {
            enabled: bypassResults.enabled || false,
            preventDefaultWheel: bypassResults.preventDefaultWheel || false,
            preventDefaultMouse: bypassResults.preventDefaultMouse || false,
            preventDefaultTouch: bypassResults.preventDefaultTouch || false,
        });
    }

    /**
     * @description Adds an event listener to the element.
     * @param {string} type - The type of the event.
     * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function
     * or object that receives a notification.
     * @param {Node} [boundTo=this] - The element or node to which the listener is bound. Defaults to the element itself.
     * @param {boolean | AddEventListenerOptions} [options] - An options object that specifies characteristics about
     * the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.on = function _on<Type extends Node>
    (this: Turbo<Type>, type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: Turbo<Type>) => void),
     boundTo: Node = this, options?: boolean | ListenerOptions): Turbo<Type> {
        if (this.hasListener(type, listener, options)) return this;

        const wrappedListener = ((e: Event) => {
            if (
                !(this.element instanceof Document && this.element === document) &&
                !(this.element instanceof HTMLElement && this.element === document.body) &&
                !(typeof options === "object" && options.propagate)
            ) e.stopPropagation();
            if (typeof listener === "object" && listener.handleEvent) listener.handleEvent(e);
            if (typeof listener === "function") listener(e, this);
        }) as EventListenerOrEventListenerObject;

        if (boundTo && typeof options === "object" && !options?.temporary) {
            const boundSelector = boundTo instanceof TurboSelector ? boundTo : $(boundTo);
            boundSelector.boundListeners.add({
                target: this,
                type: type,
                originalListener: listener,
                listener: wrappedListener,
                options: options
            });
        }

        this.addEventListener(type, wrappedListener, options);
        return this;
    };

    TurboSelector.prototype.hasListener = function _hasListener
    (this: Turbo, type: string, listener: EventListenerOrEventListenerObject |
        ((e: Event, el: Turbo) => void), options?: boolean | EventListenerOptions) {
        for (let entry of this.boundListeners) {
            if (entry.type === type && entry.originalListener === listener && entry.options === options) return true;
        }
        return false;
    }

    /**
     * @description Removes an event listener that is bound to the element (in its boundListeners list).
     * @param {string} type - The type of the event.
     * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function
     * or object that receives a notification.
     * @param {boolean | EventListenerOptions} [options] - An options object that specifies characteristics about the
     * event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeListener = function _removeListener<Type extends Node>
    (this: Turbo<Type>, type: string, listener: EventListenerOrEventListenerObject |
         ((e: Event, el: Turbo<Type>) => void), options?: boolean | EventListenerOptions): Turbo<Type> {
        for (let entry of this.boundListeners) {
            if (entry.type === type && entry.originalListener === listener && entry.options === options) {
                entry.target.removeEventListener(type, entry.listener, options);
                this.boundListeners.delete(entry);
                break;
            }
        }

        return this;
    };

    /**
     * @description Removes all event listeners bound to the element (in its boundListeners list) assigned to the
     * specified type.
     * @param {string} type - The type of the event.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeListenersByType = function _removeListenersByType(this: TurboSelector, type: string): TurboSelector {
        for (let entry of this.boundListeners) {
            if (entry.type === type) {
                this.element.removeEventListener(type, entry.listener, entry.options);
                this.boundListeners.delete(entry);
            }
        }

        return this;
    };

    /**
     * @description Removes all event listeners bound to the element (in its boundListeners list).
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeAllListeners = function _removeListeners(this: TurboSelector): TurboSelector {
        for (let entry of this.boundListeners) {
            this.element.removeEventListener(entry.type, entry.listener, entry.options);
            this.boundListeners.delete(entry);
        }

        return this;
    };
}

export {setupEventFunctions};