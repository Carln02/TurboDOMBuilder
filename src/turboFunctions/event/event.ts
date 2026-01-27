import {
    BasicInputEvents,
    NonPassiveEvents,
    PreventDefaultOptions,
    Propagation
} from "./event.types";
import {turbo} from "../turboFunctions";
import {Turbo} from "../turboFunctions.types";
import {TurboEventManagerStateProperties} from "../../eventHandling/turboEventManager/turboEventManager.types";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {EventFunctionsUtils} from "./event.utils";
import {TurboSelector} from "../turboSelector";
import {Listener} from "../listener/listener";
import {ListenerCallback, ListenerOptions} from "../listener/listener.types";

const utils = new EventFunctionsUtils();

export function setupEventFunctions() {
    /**
     * @description Initializes a `boundListeners` set in the Node prototype, that will hold all the element's bound
     * listeners.
     */
    Object.defineProperty(TurboSelector.prototype, "boundListeners", {
        get: function (): Set<Listener> {
            return utils.getBoundListenersSet(this);
        },
        configurable: true,
        enumerable: true
    });

    /**
     * @description If you want the element to bypass the event manager and allow native events to seep through,
     * you can set this field to a predicate that defines when to bypass the manager.
     * @param {Event} e The event.
     */
    Object.defineProperty(TurboSelector.prototype, "bypassManagerOn", {
        get: function () {
            return utils.data(this)["bypassCallback"];
        },
        set: function (value: (e: Event) => boolean | TurboEventManagerStateProperties) {
            utils.data(this)["bypassCallback"] = value;
        },
        configurable: true,
        enumerable: true
    });

    /**
     * @description Adds an event listener to the element.
     * @param {string} type - The type of the event.
     * @param toolName - The name of the tool. Set to null or undefined to check for listeners not bound to a tool.
     * @param {ListenerCallback} listener - The function that receives a notification.
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
        listener: ListenerCallback<Type>,
        options?: ListenerOptions,
        manager: TurboEventManager = TurboEventManager.instance
    ): Turbo<Type> {
        if (this.hasToolListener(type, toolName, listener, manager)) return this;
        manager.setupCustomDispatcher?.(type);
        utils.getBoundListenersSet(this).add(new Listener({
            target: this,
            type,
            toolName,
            callback: listener,
            options,
            manager
        }));
        return this;
    };

    /**
     * @description Adds an event listener to the element.
     * @param {string} type - The type of the event.
     * @param {ListenerCallback} listener - The function that receives a notification.
     * @param {ListenerOptions} [options] - An options object that specifies characteristics
     * about the event listener.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.on = function _on<Type extends Node>(
        this: Turbo<Type>,
        type: string,
        listener: ListenerCallback<Turbo<Type>>,
        options?: ListenerOptions,
        manager: TurboEventManager = TurboEventManager.instance
    ): Turbo<Type> {
        return this.onTool(type, undefined, listener, options, manager);
    };

    /**
     * @description
     * @param type
     * @param toolName
     * @param event
     * @param options
     * @param manager
     */
    TurboSelector.prototype.executeAction = function _executeAction(
        this: TurboSelector,
        type: string,
        toolName: string,
        event: Event,
        options?: ListenerOptions,
        manager: TurboEventManager = TurboEventManager.instance
    ): Propagation {
        if (!type) return Propagation.propagate;

        if (!options) options = {};
        turbo(options).applyDefaults({checkSubstrates: true, solveSubstrates: true});

        const activeTool = toolName ?? manager.getCurrentToolName();
        const checkedSubstratesFor: Set<Node> = new Set();
        const checkedObjectsToolMap: Map<Node, string> = new Map();
        const firedListeners: Set<Listener> = new Set();
        let propagation: Propagation = Propagation.propagate;

        if (this.bypassManagerOn) utils.bypassManager(this, manager, this.bypassManagerOn(event));

        const checkSubstrates = (target: Node, tool?: string) => {
            if (checkedSubstratesFor.has(target)) return;
            checkedSubstratesFor.add(target);
            if (tool) checkedObjectsToolMap.set(target, tool);
            if (!options.checkSubstrates) return;
            if (!this.checkSubstratesForEvent({
                event,
                toolName: tool,
                eventType: type,
                eventTarget: target,
                eventOptions: options,
                manager: manager
            })) propagation = Propagation.stopImmediatePropagation;
        };

        const runListeners = (target: Node, tool?: string) => {
            const ts = target instanceof TurboSelector ? target : turbo(target);
            const boundSet = utils.getBoundListenersSet(target);
            const entries = [...utils.getBoundListeners(target, type, tool, options, manager)];
            if (entries.length === 0) return;

            checkSubstrates(target, tool);
            if (propagation === Propagation.stopImmediatePropagation) return;

            for (const entry of entries) {
                if (firedListeners.has(entry)) continue;
                try {
                    propagation = utils.processPropagation(entry.executeOn(event, ts), propagation);
                } finally {
                    firedListeners.add(entry);
                    if (entry.options?.once) boundSet.delete(entry);
                }
                if (propagation === Propagation.stopImmediatePropagation) return;
            }
        };

        const applyTool = (target: Node, tool?: string) => {
            if (options.capture || !tool) return;
            if (turbo(target).isToolIgnored(tool, type, manager)) return;
            if (!this.hasToolBehavior(type, toolName, manager)) return;

            checkSubstrates(target, tool);
            if (propagation === Propagation.stopImmediatePropagation) return;
            propagation = turbo(target).applyTool(tool, type, event, manager);
        };

        const main = () => {
            if (activeTool) {
                runListeners(this, activeTool);
                if (propagation !== Propagation.propagate) return;
            }

            applyTool(this.element, activeTool);
            if (propagation !== Propagation.propagate) return;

            const embeddedTarget = this.getEmbeddedToolTarget(manager);
            const objectTools = this.getToolNames(manager);

            if (embeddedTarget && objectTools.length > 0) {
                for (const toolName of objectTools) {
                    runListeners(embeddedTarget, toolName);
                    if (propagation as any === Propagation.stopImmediatePropagation) return;
                }
                if (propagation !== Propagation.propagate) return;

                if (!options.capture) for (const toolName of objectTools) {
                    applyTool(embeddedTarget, toolName);
                    if (propagation as any === Propagation.stopImmediatePropagation) return;
                }
                if (propagation !== Propagation.propagate) return;
            }

            runListeners(this, undefined);
        };

        main();
        if (options.solveSubstrates) checkedSubstratesFor.forEach(entry =>
            turbo(this).solveSubstratesForEvent({
                event,
                toolName: checkedObjectsToolMap.get(entry),
                eventType: type,
                eventTarget: entry,
                eventOptions: options,
                manager: manager
            }));
        return propagation;
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
        listener: ((e: Event, el: Turbo) => boolean | void),
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
        listener: ((e: Event, el: Turbo) => boolean | void),
        manager: TurboEventManager = TurboEventManager.instance
    ): boolean {
        return utils.getBoundListeners(this, type, toolName, undefined, manager)
            .filter(entry => entry.callback === listener).length > 0;
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
        listener: ((e: Event, el: Turbo<Type>) => boolean | void),
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
        listener: ((e: Event, el: Turbo<Type>) => boolean | void),
        manager: TurboEventManager = TurboEventManager.instance
    ): Turbo<Type> {
        const boundListeners = utils.getBoundListenersSet(this);
        utils.getBoundListeners(this, type, toolName, undefined, manager)
            .filter(entry => entry.callback === listener)
            .forEach(entry => {
                entry.target.removeEventListener(entry.type, entry.bundledListener, entry.options);
                boundListeners.delete(entry);
            });
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
        const boundListeners = utils.getBoundListenersSet(this);
        utils.getBoundListeners(this, type, toolName, undefined, manager)
            .forEach(entry => {
                entry.target.removeEventListener(entry.type, entry.bundledListener, entry.options);
                boundListeners.delete(entry);
            });
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
        const set = this.boundListeners;
        [...set].filter(entry => entry.manager === manager)
            .forEach(entry => {
                entry.target.removeEventListener(entry.type, entry.bundledListener, entry.options);
                set.delete(entry);
            });
        return this;
    };

    /**
     * @description Prevent default browser behavior on the provided event types. By default, all basic input events
     * will be processed.
     * @param {PreventDefaultOptions} options - An options object to customize the behavior of the function.
     */
    TurboSelector.prototype.preventDefault = function _preventDefault(this: Turbo, options?: PreventDefaultOptions): TurboSelector {
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
                if (!utils.data(this.element).preventDefaultOn(type, event)) return false;
                event.preventDefault?.();
                if (stop === "immediate") event.stopImmediatePropagation?.();
                else if (stop === "stop") event.stopPropagation?.();
                return true;
            }
            preventDefaultListeners[type] = handler;
            const options: Record<string, boolean> = {};
            if (phase === "capture") options.capture = true;
            if (shouldNotBePassive.has(type)) options.passive = false;
            this.on(type, handler, options, manager);
        }

        return this;
    }
}