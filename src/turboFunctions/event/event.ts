import {BasicInputEvents, ListenerEntry, ListenerOptions, NonPassiveEvents, PreventDefaultOptions} from "./event.types";
import {$, TurboSelector} from "../turboFunctions";
import {Turbo} from "../turboFunctions.types";
import {TurboEventManagerStateProperties} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {EventFunctionsUtils} from "./event.utils";

const utils = new EventFunctionsUtils();

function setupEventFunctions() {
    /**
     * @description Initializes a `boundListeners` set in the Node prototype, that will hold all the element's bound
     * listeners.
     */
    Object.defineProperty(TurboSelector.prototype, "boundListeners", {
        value: new Map<string, Set<ListenerEntry>>(),
        writable: false,
        configurable: true,
        enumerable: true
    });

    /**
     * @description If you want the element to bypass the event manager and allow native events to seep through,
     * you can set this field to a predicate that defines when to bypass the manager.
     * @param {TurboEvent} e The event.
     */
    Object.defineProperty(TurboSelector.prototype, "bypassManagerOn", {
        get: function () {
            return utils.data(this)["bypassCallback"];
        },
        set: function (value: (e: TurboEvent) => boolean | TurboEventManagerStateProperties) {
            let bypassCallback = utils.data(this)["bypassCallback"];
            const setupListeners = !bypassCallback;
            utils.data(this)["bypassCallback"] = value;
            bypassCallback = value;

            if (setupListeners) {
                this.addEventListener("mousedown", (e: TurboEvent) => TurboEventManager.allManagers
                    .forEach(manager => utils.bypassManager(this, manager, bypassCallback(e))));
                this.addEventListener("touchstart", (e: TurboEvent) => TurboEventManager.allManagers
                    .forEach(manager => utils.bypassManager(this, manager, bypassCallback(e))));
            }
        },
        configurable: true,
        enumerable: true
    });

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
    TurboSelector.prototype.onTool = function _onTool<Type extends Node>(
        this: Turbo<Type>,
        type: string,
        toolName: string,
        listener: ((e: Event, el: Turbo<Type>) => void),
        options?: ListenerOptions,
        manager: TurboEventManager = TurboEventManager.instance
    ): Turbo<Type> {
        if (this.hasToolListener(type, toolName, listener, manager)) return this;

        manager.setupCustomDispatcher?.(type);
        utils.getBoundListenersSet(this, type).add({
            target: this,
            type: type,
            toolName: toolName,
            listener: listener,
            options: options,
            manager: manager
        });

        return this;
    };

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
    TurboSelector.prototype.on = function _on<Type extends Node>(
        this: Turbo<Type>,
        type: string,
        listener: ((e: Event, el: Turbo<Type>) => void),
        options?: ListenerOptions,
        manager: TurboEventManager = TurboEventManager.instance
    ): Turbo<Type> {
        return this.onTool(type, undefined, listener, options, manager);
    };

    TurboSelector.prototype.executeAction = function _executeAction(
        this: TurboSelector,
        type: string,
        toolName: string,
        event: Event,
        options?: ListenerOptions,
        manager: TurboEventManager = TurboEventManager.instance
    ): boolean {
        if (!type) return false;
        const activeTool = toolName ?? manager.getCurrentToolName();

        const run = (target: Node, tool?: string): boolean => {
            const ts = target instanceof TurboSelector ? target : $(target);
            const boundSet = utils.getBoundListenersSet(target, type);
            const entries = [...utils.getBoundListeners(target, type, tool, options, manager)];
            if (entries.length === 0) return false;

            let propagate = false;
            for (const entry of entries) {
                try { entry.listener(event, ts); }
                finally {
                    if (entry.options?.once) boundSet.delete(entry);
                    if (entry.options?.propagate) propagate = true;
                }
            }
            return !propagate;
        };

        if (activeTool && run(this, activeTool)) return true;
        if (activeTool && this.applyTool(activeTool, type, event, manager)) return true;

        const embeddedTarget = this.getEmbeddedToolTarget(manager);
        const objectTools = this.getToolNames(manager);

        if (embeddedTarget && objectTools.length > 0) {
            let ret = false;
            for (const toolName of objectTools) {
                if (run(embeddedTarget, toolName)) ret = true;
            }
            if (ret) return true;

            for (const toolName of objectTools) {
                if ($(embeddedTarget).applyTool(toolName, type, event, manager)) ret = true;
            }
            if (ret) return true;
        }

        return run(this, undefined);
    };

    /**
     * @description Checks if the given event listener is bound to the element (in its boundListeners list).
     * @param {string} type - The type of the event. Set to null or undefined to get all event types.
     * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {boolean} - Whether the element has the given listener.
     */
    TurboSelector.prototype.hasListener = function _hasListener(
        this: Turbo,
        type: string,
        listener: ((e: Event, el: Turbo) => void),
        manager: TurboEventManager = TurboEventManager.instance
    ): boolean {
        return this.hasToolListener(type, undefined, listener, manager);
    }

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
    TurboSelector.prototype.hasToolListener = function _hasToolListener(
        this: Turbo,
        type: string,
        toolName: string,
        listener: ((e: Event, el: Turbo) => void),
        manager: TurboEventManager = TurboEventManager.instance
    ): boolean {
        return utils.getBoundListeners(this, type, toolName, undefined, manager)
            .filter(entry => entry.listener === listener).length > 0;
    }

    /**
     * @description Checks if the element has bound listeners of the given type (in its boundListeners list).
     * @param {string} type - The type of the event. Set to null or undefined to get all event types.
     * @param {string} toolName - The name of the tool to consider (if any). Set to null or undefined
     * to check for listeners not bound to a tool.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {boolean} - Whether the element has the given listener.
     */
    TurboSelector.prototype.hasListenersByType = function _hasListenersByType(
        type: string,
        toolName?: string,
        manager: TurboEventManager = TurboEventManager.instance
    ): boolean {
        return utils.getBoundListeners(this, type, toolName, undefined, manager).length > 0;
    }

    /**
     * @description Removes an event listener that is bound to the element (in its boundListeners list).
     * @param {string} type - The type of the event.
     * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeListener = function _removeListener<Type extends Node>(
        this: Turbo<Type>,
        type: string,
        listener: ((e: Event, el: Turbo<Type>) => void),
        manager: TurboEventManager = TurboEventManager.instance
    ): Turbo<Type> {
        return this.removeToolListener(type, undefined, listener, manager);
    };

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
    TurboSelector.prototype.removeToolListener = function _removeToolListener<Type extends Node>(
        this: Turbo<Type>,
        type: string,
        toolName: string,
        listener: ((e: Event, el: Turbo<Type>) => void),
        manager: TurboEventManager = TurboEventManager.instance
    ): Turbo<Type> {
        const boundListeners = utils.getBoundListenersSet(this, type);
        utils.getBoundListeners(this, type, toolName, undefined, manager)
            .filter(entry => entry.listener === listener)
            .forEach(entry => boundListeners.delete(entry));
        return this;
    };

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
    TurboSelector.prototype.removeListenersByType = function _removeListenersByType(
        this: Turbo,
        type: string,
        toolName?: string,
        manager: TurboEventManager = TurboEventManager.instance
    ): TurboSelector {
        const boundListeners = utils.getBoundListenersSet(this, type);
        utils.getBoundListeners(this, type, toolName, undefined, manager)
            .forEach(entry => boundListeners.delete(entry));
        return this;
    };

    /**
     * @description Removes all event listeners bound to the element (in its boundListeners list).
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeAllListeners = function _removeListeners(
        this: TurboSelector,
        manager: TurboEventManager = TurboEventManager.instance
    ): TurboSelector {
        this.boundListeners.forEach(set => [...set]
                .filter(entry => entry.manager === manager)
                .forEach(entry => set.delete(entry)));

        // const listeners = utils.getSingleListeners(this.element, manager);
        // if (listeners && typeof listeners === "object") Object.entries(listeners)
        //     .forEach(([type, listener]: [string, (e: Event) => void]) => {
        //         this.element.removeEventListener(type, listener);
        //         delete listeners[type];
        //     });
        return this;
    };

    /**
     * @description Prevent default browser behavior on the provided event types. By default, all basic input events
     * will be processed.
     * @param {PreventDefaultOptions} options - An options object to customize the behavior of the function.
     */
    TurboSelector.prototype.preventDefault = function _preventDefault(this: Turbo, options?: PreventDefaultOptions): void {
        if (!options) options = {};
        const manager = options.manager ?? TurboEventManager.instance;
        const types = options.types ?? BasicInputEvents;
        const phase = options.phase ?? "capture";
        const stop = options.stop ?? false;

        utils.data(this.element).preventDefaultOn = options.preventDefaultOn
            ?? utils.data(this.element).preventDefaultOn ?? (() => true);
        const preventDefaultListeners = utils.getPreventDefaultListeners(this);

        if (options.clearPreviousListeners)
            for (const [type, listener] of Object.entries(preventDefaultListeners)) {
                this.removeListener(type, listener);
                delete preventDefaultListeners[type];
            }

        const shouldNotBePassive = new Set<string>(NonPassiveEvents);

        for (const type of new Set(types)) {
            const handler = (event: Event) => {
                if (!utils.data(this.element).preventDefaultOn(type, event)) return;
                event.preventDefault?.();
                if (stop === "immediate") event.stopImmediatePropagation?.();
                else if (stop === "stop") event.stopPropagation?.();
            }
            preventDefaultListeners[type] = handler;
            const options: Record<string, boolean> = {};
            if (phase === "capture") options.capture = true;
            if (shouldNotBePassive.has(type)) options.passive = false;
            this.on(type, handler, options, manager);
        }
    }
}

export {setupEventFunctions};