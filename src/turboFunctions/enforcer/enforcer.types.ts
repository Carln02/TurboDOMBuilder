import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {Propagation} from "../event/event.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";
import {ListenerOptions} from "../../turboComponents/datatypes/listener/listener.types";
import {TurboEnforcer} from "../../mvc/enforcer/enforcer";
import {TurboNodeList} from "../../turboComponents/datatypes/nodeList/nodeList";

/**
 * @type {MakeEnforcerOptions}
 * @group Types
 * @category Enforcer
 *
 * @description Type representing objects used to configure the creation of enforcers. Used in {@link makeEnforcer}.
 * @property {() => void} [onActivate] - Callback function to execute when the enforcer is activated.
 * @property {() => void} [onDeactivate] - Callback function to execute when the enforcer is deactivated.
 * @property {number} [priority] - The priority of the enforcer. Higher priority enforcers (lower number) should
 * be resolved first. Defaults to 10.
 * @property {boolean} [active] - Whether the enforcer is active. Defaults to true.
 * @property {TurboEnforcer} [attachedInstance] - The optional TurboEnforcer instance to attach to the enforcer.
 */
type MakeEnforcerOptions = {
    onActivate?: () => void,
    onDeactivate?: () => void,
    priority?: number,
    active?: boolean,
    attachedInstance?: TurboEnforcer
};

/**
 * @type {EnforcerCallbackProperties}
 * @group Types
 * @category Enforcer
 *
 * @description Type representing objects passed as context for resolving enforcers. Given as first parameter to
 * solvers when executing them via {@link solveEnforcer}.
 * @property {string} [enforcer] - The targeted enforcer. Defaults to `currentEnforcer`.
 * @property {object} [enforcerHost] - The object to which the target enforcer is attached.
 * @property {object} [target] - The current object being processed by the solver. Property set by
 * {@link solveEnforcer} when processing every object in the enforcer's list.
 * @property {Event} [event] - The event (if any) that fired the resolving of the enforcer.
 * @property {string} [eventType] - The type of the event.
 * @property {Node} [eventTarget] - The target of the event.
 * @property {string} [toolName] - The name of the active tool when the event was fired.
 * @property {ListenerOptions} [eventOptions] - The options of the event.
 * @property {TurboEventManager} [manager] - The event manager that captured the event. Defaults to the first
 * instantiated event manager.
 */
type EnforcerCallbackProperties = {
    enforcer?: string,
    enforcerHost?: object,
    target?: object,
    event?: Event,
    eventType?: string,
    eventTarget?: Node,
    toolName?: string,
    eventOptions?: ListenerOptions,
    manager?: TurboEventManager,
};

/**
 * @type {EnforcerMutatorProperties}
 * @group Types
 * @category Enforcer
 *
 * @extends EnforcerCallbackProperties
 * @template Type - The type of the value to mutate.
 * @description Type representing objects passed as context to mutate a value in an enforcer. Given as first parameter to
 * mutators when executing them via {@link mutate}.
 * @property {string} [mutation] - The name of the mutator to execute.
 * @property {Type} [value] - The value to mutate.
 */
type EnforcerMutatorProperties<Type = any> = EnforcerCallbackProperties & {
    mutation?: string,
    value?: Type
};

/**
 * @type {EnforcerChecker}
 * @group Types
 * @category Enforcer
 *
 * @description Type representing the signature of checker functions that enforcers expect.
 */
type EnforcerChecker = (properties: EnforcerCallbackProperties, ...args: any[]) => boolean;

/**
 * @type {EnforcerMutator}
 * @group Types
 * @category Enforcer
 *
 * @description Type representing the signature of mutator functions that enforcers expect.
 */
type EnforcerMutator<Type = any> = (properties: EnforcerMutatorProperties<Type>, ...args: any[]) => Type;

/**
 * @type {EnforcerSolver}
 * @group Types
 * @category Enforcer
 *
 * @description Type representing the signature of solver functions that enforcers expect.
 */
type EnforcerSolver = (properties: EnforcerCallbackProperties, ...args: any[]) => Propagation | void;

/**
 * @type {EnforcerAddCallbackProperties}
 * @group Types
 * @category Enforcer
 * @template {EnforcerChecker | EnforcerMutator | EnforcerSolver} Type - The type of callback.
 *
 * @description Type representing a configuration object to add a new callback to the given enforcer.
 * @property {string} [name] - The name of the callback to add.
 * @property {Type} [callback] - The callback to add.
 * @property {string} [enforcer] - The enforcer to add the callback to.
 * @property {number} [priority] - The priority of the callback.
 */
type EnforcerAddCallbackProperties<Type extends EnforcerChecker | EnforcerMutator | EnforcerSolver> = {
    name?: string,
    callback?: Type,
    enforcer?: string,
    priority?: number,
};

declare module "../turboSelector" {
    interface TurboSelector {
        /**
         * @description Array of all the enforcers attached to this element.
         */
        readonly enforcersNames: string[];

        /**
         * @function makeEnforcer
         * @description Creates a new enforcer attached to this element. Useful to maintain certain constraints or
         * ensure some behaviors persist on a list of objects (by attaching solvers to this enforcer).
         * @param {string} name - The name of the new enforcer.
         * @param {MakeEnforcerOptions} [options] - Options parameter to configure the newly-created enforcer.
         * @return {this} - Itself for chaining.
         */
        makeEnforcer(name: string, options?: MakeEnforcerOptions): this;

        //ACTIVATION

        /**
         * @description Array of active enforcers on this element.
         */
        readonly activeEnforcers: string[];

        /**
         * @function activateEnforcer
         * @description Activate the given enforcer.
         * @param {string[]} enforcers - The name of the enforcer(s) to activate. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        activateEnforcer(...enforcers: string[]): this;

        /**
         * @function deactivateEnforcer
         * @description Deactivate the given enforcer.
         * @param {string[]} enforcers - The name of the enforcer(s) to deactivate. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        deactivateEnforcer(...enforcers: string[]): this;

        /**
         * @function toggleEnforcer
         * @description Toggle the active state of the given enforcer.
         * @param {string} enforcer - The name of the enforcer to toggle. Defaults to the first active enforcer.
         * @param {boolean} [force] - If set, the enforcer's active state will be set to this value.
         * @return {this} - Itself for chaining.
         */
        toggleEnforcer(enforcer?: string, force?: boolean): this;

        /**
         * @function activateOnlyEnforcer
         * @description Activate the provided enforcer and deactivate all other enforcers attached to this element.
         * @param {string} enforcer - The enforcer name to activate as the single active enforcer. Defaults to the
         * first active enforcer.
         * @return {this} - Itself for chaining.
         */
        activateOnlyEnforcer(enforcer: string): this;

        /**
         * @function activateAllEnforcers
         * @description Activate all the enforcers attached to this element.
         * @return {this} - Itself for chaining.
         */
        activateAllEnforcers(): this;

        /**
         * @function deactivateAllEnforcers
         * @description Deactivate all the enforcers attached to this element.
         * @return {this} - Itself for chaining.
         */
        deactivateAllEnforcers(): this;

        /**
         * @function onEnforcerActivate
         * @description Get the delegate fired when the enforcer of the given name is activated.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {Delegate<() => void>} - The delegate.
         */
        onEnforcerActivate(enforcer?: string): Delegate<() => void>;

        /**
         * @function onEnforcerDeactivate
         * @description Get the delegate fired when the enforcer of the given name is deactivated.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {Delegate<() => void>} - The delegate.
         */
        onEnforcerDeactivate(enforcer?: string): Delegate<() => void>;

        //PRIORITY

        /**
         * @function getEnforcerPriority
         * @description Get the priority of the targeted enforcer. Higher priority enforcers (lower number) should
         * be resolved first.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {number} - The enforcer priority.
         */
        getEnforcerPriority(enforcer?: string): number;

        /**
         * @function setEnforcerPriority
         * @description Set the priority of the targeted enforcer. Higher priority enforcers (lower number) should
         * be resolved first.
         * @param {number} priority - The priority value to set.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        setEnforcerPriority(priority: number, enforcer?: string): this;

        //OBJECT LIST

        /**
         * @function getEnforcerObjectList
         * @description Retrieve the list of objects that are constrained by the given enforcer.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {TurboNodeList} - The list of objects. To manipulate, check {@link TurboNodeList}.
         */
        getEnforcerObjectList(enforcer?: string): TurboNodeList;

        /**
         * @function onEnforcerObjectListChange
         * @description Get the delegate fired whenever an object is added to or removed from the enforcer's object list.
         * Defaults to the children of the element the enforcer is attached to.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {Delegate<(object: object, status: "added" | "removed") => void>} - The delegate.
         */
        onEnforcerObjectListChange(enforcer?: string): Delegate<(object: object, status: "added" | "removed") => void>;

        //TRIGGER LIST

        /**
         * @function getEnforcerTriggerList
         * @description Retrieve the list of objects that trigger the given enforcer to resolve.
         * Interacting with any of these objects would typically lead to the solving of the given enforcer.
         * Defaults to the enforcer's object list.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {TurboNodeList} - The list of trigger objects. To manipulate, check {@link TurboNodeList}.
         */
        getEnforcerTriggerList(enforcer?: string): TurboNodeList;

        //QUEUE

        /**
         * @function getEnforcerQueue
         * @description Retrieve the current queue to be processed by the enforcer while resolving.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {TurboQueue<object>} - The current enforcer queue.
         */
        getEnforcerQueue(enforcer?: string): TurboQueue<object>;

        /**
         * @function getDefaultEnforcerQueue
         * @description Retrieve the default queue template for the enforcer, used when starting a new resolving pass.
         * It defaults to the enforcer's object list.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {TurboQueue<object>} - The default enforcer queue.
         */
        getDefaultEnforcerQueue(enforcer?: string): TurboQueue<object>;

        /**
         * @function setDefaultEnforcerQueue
         * @description Define the default queue template for the enforcer, used when starting a new resolving pass.
         * @param {object[] | TurboQueue<object>} queue - The queue (or list to build a queue from).
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        setDefaultEnforcerQueue(queue: object[] | TurboQueue<object>, enforcer?: string): this;

        //PASSES

        /**
         * @function getObjectPassesForEnforcer
         * @description Retrieve how many times the given object has been processed for the current resolving session
         * of the enforcer.
         * @param {object} object - The object to query.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {number} - Number of passes already performed on this object.
         */
        getObjectPassesForEnforcer(object: object, enforcer?: string): number;

        /**
         * @function getMaxPassesForEnforcer
         * @description Get the maximum number of passes allowed per object for this enforcer during resolving.
         * This helps prevent infinite cycles in constraint propagation.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {number} - The maximum allowed passes.
         */
        getMaxPassesForEnforcer(enforcer?: string): number;

        /**
         * @function setMaxPassesForEnforcer
         * @description Set the maximum number of passes allowed per object for this enforcer during resolving. This
         * helps prevent infinite cycles in constraint propagation.
         * @param {number} passes - Maximum number of passes.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        setMaxPassesForEnforcer(passes: number, enforcer?: string): this;

        //CUSTOM DATA

        /**
         * @function getObjectDataForEnforcer
         * @description Retrieve custom per-object data for this enforcer. It is reset on every new
         * resolving session.
         * @param {object} object - The object to query.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {Record<string, any>} - The stored data object (or an empty object if none).
         */
        getObjectDataForEnforcer(object: object, enforcer?: string): Record<string, any>;

        /**
         * @function setObjectDataForEnforcer
         * @description Set custom per-object data for this enforcer. It is reset on every new resolving session.
         * @param {object} object - The object to update.
         * @param {Record<string, any>} [data] - The new data object to associate with this object.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        setObjectDataForEnforcer(object: object, data?: Record<string, any>, enforcer?: string): this;

        //CHECKER

        /**
         * @function addChecker
         * @description Register a checker in the enforcer. Checkers dictate whether the event should continue
         * executing depending on the provided context (event, tool, target, etc.).
         * @param {EnforcerAddCallbackProperties<EnforcerChecker>} properties - Configuration object, including the
         * checker `callback` to be executed, the `name` of the checker to access it later, the name of the attached
         * `enforcer`, and the `priority` of the checker.
         * @return {this} - Itself for chaining.
         */
        addChecker(properties: EnforcerAddCallbackProperties<EnforcerChecker>): this;

        /**
         * @function removeChecker
         * @description Remove a checker from the given enforcer by its name.
         * @param {string} name - The checker name.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        removeChecker(name: string, enforcer?: string): this;

        /**
         * @function clearCheckers
         * @description Remove all checkers attached to the given enforcer.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        clearCheckers(enforcer?: string): this;

        /**
         * @function checkEnforcer
         * @description Evaluate all checkers for the targeted enforcer and return whether the event should proceed or halt.
         * @param {EnforcerCallbackProperties} [properties] - Context passed to each checker.
         * @return {boolean} - Whether the enforcer passes all checks.
         */
        checkEnforcer(properties?: EnforcerCallbackProperties): boolean;

        /**
         * @function checkEnforcersForEvent
         * @description Evaluate checkers for all relevant enforcers for a given event context.
         * @param {EnforcerCallbackProperties} [properties] - Event context.
         * @return {boolean} - Whether all the checkers allowed the event to proceed.
         */
        checkEnforcersForEvent(properties?: EnforcerCallbackProperties): boolean;

        //MUTATOR

        /**
         * @function addMutator
         * @description Register a mutator in the enforcer. Mutators compute or transform a value based on the context.
         * @param {EnforcerAddCallbackProperties<EnforcerMutator>} properties - Configuration object, including the
         * mutator `callback` to be executed, the `name` of the mutator to access it later, the name of the attached
         * `enforcer`, and the `priority` of the mutator.
         * @return {this} - Itself for chaining.
         */
        addMutator(properties: EnforcerAddCallbackProperties<EnforcerMutator>): this;

        /**
         * @function removeMutator
         * @description Remove a mutator from the given enforcer by its name.
         * @param {string} name - The mutator name.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        removeMutator(name: string, enforcer?: string): this;

        /**
         * @function clearMutators
         * @description Remove all mutators attached to the given enforcer.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        clearMutators(enforcer?: string): this;

        /**
         * @function mutate
         * @template Type - The type of the value to mutate
         * @description Execute a mutator for the targeted enforcer and return the resulting value.
         * @param {EnforcerMutatorProperties<Type>} [properties] - Context object, including the
         * `mutation` to execute, and the input `value` to mutate.
         * @return {Type} - The mutated result.
         */
        mutate<Type = any>(properties?: EnforcerMutatorProperties<Type>): Type;

        //SOLVER

        /**
         * @function addSolver
         * @description Register a solver in the enforcer. Solvers typically execute after an event is fired to
         * ensure the enforcer's constraints are maintained. They process all objects in the enforcer's queue,
         * one after the other.
         * @param {EnforcerAddCallbackProperties<EnforcerSolver>} properties - Configuration object, including the
         * solver `callback` to be executed, the `name` of the solver to access it later, the name of the attached
         * `enforcer`, and the `priority` of the solver.
         * @return {this} - Itself for chaining.
         */
        addSolver(properties: EnforcerAddCallbackProperties<EnforcerSolver>): this;

        /**
         * @function removeSolver
         * @description Remove the given function from the enforcer's list of solvers.
         * @param {string} name - The solver's name.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        removeSolver(name: string, enforcer?: string): this;

        /**
         * @function clearSolvers
         * @description Remove all solvers attached to the enforcer.
         * @param {string} [enforcer] - The name of the targeted enforcer. Defaults to the first active enforcer.
         * @return {this} - Itself for chaining.
         */
        clearSolvers(enforcer?: string): this;

        /**
         * @function solveEnforcer
         * @description Solve the enforcer by executing all of its attached solvers. Each solver will be executed
         * on every object in the enforcer's queue, incrementing its number of passes in the process.
         * @param {EnforcerCallbackProperties} [properties] - Options object to configure the context.
         * @return {this} - Itself for chaining.
         */
        solveEnforcer(properties?: EnforcerCallbackProperties): this;

        /**
         * @function solveEnforcersForEvent
         * @description Solve all relevant enforcers for a given event context.
         * @param {EnforcerCallbackProperties} [properties] - Event context to pass to solvers.
         * @return {this} - Itself for chaining.
         */
        solveEnforcersForEvent(properties?: EnforcerCallbackProperties): this;
    }
}

export {MakeEnforcerOptions, EnforcerSolver, EnforcerChecker, EnforcerMutator, EnforcerMutatorProperties, EnforcerCallbackProperties, EnforcerAddCallbackProperties};
