import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {Propagation} from "../event/event.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";
import {ListenerOptions} from "../listener/listener.types";
import {TurboSubstrate} from "../../mvc/substrate/substrate";

/**
 * @type {MakeSubstrateOptions}
 * @group Types
 * @category Substrate
 *
 * @description Type representing objects used to configure the creation of substrates. Used in {@link makeSubstrate}.
 * @property {() => void} [onActivate] - Callback function to execute when the substrate is activated.
 * @property {() => void} [onDeactivate] - Callback function to execute when the substrate is deactivated.
 * @property {number} [priority] - The priority of the substrate. Higher priority substrates (lower number) should
 * be resolved first. Defaults to 10.
 * @property {boolean} [active] - Whether the substrate is active. Defaults to true.
 * @property {TurboSubstrate} [attachedInstance] - The optional TurboSubstrate instance to attach to the substrate.
 */
type MakeSubstrateOptions = {
    onActivate?: () => void,
    onDeactivate?: () => void,
    priority?: number,
    active?: boolean,
    attachedInstance?: TurboSubstrate
};

/**
 * @type {SubstrateCallbackProperties}
 * @group Types
 * @category Substrate
 *
 * @description Type representing objects passed as context for resolving substrates. Given as first parameter to
 * solvers when executing them via {@link solveSubstrate}.
 * @property {string} [substrate] - The targeted substrate. Defaults to `currentSubstrate`.
 * @property {object} [substrateHost] - The object to which the target substrate is attached.
 * @property {object} [target] - The current object being processed by the solver. Property set by
 * {@link solveSubstrate} when processing every object in the substrate's list.
 * @property {Event} [event] - The event (if any) that fired the resolving of the substrate.
 * @property {string} [eventType] - The type of the event.
 * @property {Node} [eventTarget] - The target of the event.
 * @property {string} [toolName] - The name of the active tool when the event was fired.
 * @property {ListenerOptions} [eventOptions] - The options of the event.
 * @property {TurboEventManager} [manager] - The event manager that captured the event. Defaults to the first
 * instantiated event manager.
 */
type SubstrateCallbackProperties = {
    substrate?: string,
    substrateHost?: object,
    target?: object,
    event?: Event,
    eventType?: string,
    eventTarget?: Node,
    toolName?: string,
    eventOptions?: ListenerOptions,
    manager?: TurboEventManager,
};

/**
 * @type {SubstrateMutatorProperties}
 * @group Types
 * @category Substrate
 *
 * @extends SubstrateCallbackProperties
 * @template Type - The type of the value to mutate.
 * @description Type representing objects passed as context to mutate a value in a substrate. Given as first parameter to
 * mutators when executing them via {@link mutate}.
 * @property {string} [mutation] - The name of the mutator to execute.
 * @property {Type} [value] - The value to mutate.
 */
type SubstrateMutatorProperties<Type = any> = SubstrateCallbackProperties & {
    mutation?: string,
    value?: Type
};

/**
 * @type {SubstrateChecker}
 * @group Types
 * @category Substrate
 *
 * @description Type representing the signature of checker functions that substrates expect.
 */
type SubstrateChecker = (properties: SubstrateCallbackProperties, ...args: any[]) => boolean;

/**
 * @type {SubstrateChecker}
 * @group Types
 * @category Substrate
 *
 * @description Type representing the signature of checker functions that substrates expect.
 */
type SubstrateMutator<Type = any> = (properties: SubstrateMutatorProperties<Type>, ...args: any[]) => Type;

/**
 * @type {SubstrateSolver}
 * @group Types
 * @category Substrate
 *
 * @description Type representing the signature of solver functions that substrates expect.
 */
type SubstrateSolver = (properties: SubstrateCallbackProperties, ...args: any[]) => Propagation | void;

/**
 * @type {SubstrateAddCallbackProperties}
 * @group Types
 * @category Substrate
 * @template {SubstrateChecker | SubstrateMutator | SubstrateSolver} Type - The type of callback.
 *
 * @description Type representing a configuration object to add a new callback to the given substrate.
 * @property {string} [name] - The name of the callback to add.
 * @property {Type} [callback] - The callback to add.
 * @property {string} [substrate] - The substrate to add the callback to.
 * @property {number} [priority] - The priority of the callback.
 */
type SubstrateAddCallbackProperties<Type extends SubstrateChecker | SubstrateMutator | SubstrateSolver> = {
    name?: string,
    callback?: Type,
    substrate?: string,
    priority?: number,
};

declare module "../turboSelector" {
    interface TurboSelector {
        /**
         * @description Array of all the substrates attached to this element.
         */
        readonly substrates: string[];

        /**
         * @function makeSubstrate
         * @description Creates a new substrate attached to this element. Useful to maintain certain constraints or
         * ensure some behaviors persist on a list of objects (by attaching solvers to this substrate).
         * @param {string} name - The name of the new substrate.
         * @param {MakeSubstrateOptions} [options] - Options parameter to configure the newly-created substrate.
         * @return {this} - Itself for chaining.
         */
        makeSubstrate(name: string, options?: MakeSubstrateOptions): this;

        //ACTIVATION

        /**
         * @description Array of active substrates on this element.
         */
        readonly activeSubstrates: string[];

        /**
         * @function activateSubstrate
         * @description Activate the given substrate.
         * @param {string[]} substrates - The name of the substrate(s) to activate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        activateSubstrate(...substrates: string[]): this;

        /**
         * @function deactivateSubstrate
         * @description Deactivate the given substrate.
         * @param {string[]} substrates - The name of the substrate(s) to deactivate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        deactivateSubstrate(...substrates: string[]): this;

        /**
         * @function toggleSubstrate
         * @description Toggle the active state of the given substrate.
         * @param {string} substrate - The name of the substrate to toggle. Defaults to the first active substrate.
         * @param {boolean} [force] - If set, the substrate's active state will be set to this value.
         * @return {this} - Itself for chaining.
         */
        toggleSubstrate(substrate?: string, force?: boolean): this;

        /**
         * @function activateOnlySubstrate
         * @description Activate the provided substrate and deactivate all other substrates attached to this element.
         * @param {string} substrate - The substrate name to activate as the single active substrate. Defaults to the
         * first active substrate.
         * @return {this} - Itself for chaining.
         */
        activateOnlySubstrate(substrate: string): this;

        /**
         * @function activateAllSubstrates
         * @description Activate all the substrates attached to this element.
         * @return {this} - Itself for chaining.
         */
        activateAllSubstrates(): this;

        /**
         * @function deactivateAllSubstrates
         * @description Deactivate all the substrates attached to this element.
         * @return {this} - Itself for chaining.
         */
        deactivateAllSubstrates(): this;

        /**
         * @function onSubstrateActivate
         * @description Get the delegate fired when the substrate of the given name is activated.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {Delegate<() => void>} - The delegate.
         */
        onSubstrateActivate(substrate?: string): Delegate<() => void>;

        /**
         * @function onSubstrateDeactivate
         * @description Get the delegate fired when the substrate of the given name is deactivated.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {Delegate<() => void>} - The delegate.
         */
        onSubstrateDeactivate(substrate?: string): Delegate<() => void>;

        //PRIORITY

        /**
         * @function getSubstratePriority
         * @description Get the priority of the targeted substrate. Higher priority substrates (lower number) should
         * be resolved first.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {number} - The substrate priority.
         */
        getSubstratePriority(substrate?: string): number;

        /**
         * @function setSubstratePriority
         * @description Set the priority of the targeted substrate. Higher priority substrates (lower number) should
         * be resolved first.
         * @param {number} priority - The priority value to set.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        setSubstratePriority(priority: number, substrate?: string): this;

        //OBJECT LIST

        /**
         * @function getSubstrateObjectList
         * @description Retrieve the list of objects that are constrained by the given substrate.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {Set<object>} - A shallow copy of the list of objects as a `Set`. To modify the list, use
         * {@link addObjectToSubstrate} and {@link removeObjectFromSubstrate}.
         */
        getSubstrateObjectList(substrate?: string): Set<object>;

        /**
         * @function setSubstrateObjectList
         * @description Set the list of objects that are constrained by the given substrate.
         * @param {HTMLCollection | NodeList | Set<object>} list - The list of objects to constrain.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        setSubstrateObjectList(list: HTMLCollection | NodeList | Set<object>, substrate?: string): this;

        /**
         * @function addObjectToSubstrate
         * @description Adds the given object to the substrate's list.
         * @param {object} object - The object to add to the list.
         * @param {boolean} [addToQueue=true] - Whether to also add the object to the current queue, if the substrate
         * is currently resolving.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        addObjectToSubstrate(object: object, addToQueue?: boolean, substrate?: string): this;

        /**
         * @function removeObjectFromSubstrate
         * @description Removes the given object from the substrate's list.
         * @param {object} object - The object to remove from the list.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        removeObjectFromSubstrate(object: object, substrate?: string): this;

        /**
         * @function hasObjectInSubstrate
         * @description Check if the given object is in the substrate's object list.
         * @param {object} object - The object to check.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {boolean} - Whether the object is in the list or not.
         */
        hasObjectInSubstrate(object: object, substrate?: string): boolean;

        /**
         * @function onSubstrateObjectListChange
         * @description Get the delegate fired whenever an object is added to or removed from the substrate's object list.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {Delegate<(object: object, status: "added" | "removed") => void>} - The delegate.
         */
        onSubstrateObjectListChange(substrate?: string): Delegate<(object: object, status: "added" | "removed") => void>;

        //QUEUE

        /**
         * @function getSubstrateQueue
         * @description Retrieve the current queue to be processed by the substrate while resolving.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {TurboQueue<object>} - The current substrate queue.
         */
        getSubstrateQueue(substrate?: string): TurboQueue<object>;

        /**
         * @function getDefaultSubstrateQueue
         * @description Retrieve the default queue template for the substrate, used when starting a new resolving pass.
         * It defaults to the substrate's object list.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {TurboQueue<object>} - The default substrate queue.
         */
        getDefaultSubstrateQueue(substrate?: string): TurboQueue<object>;

        /**
         * @function setDefaultSubstrateQueue
         * @description Define the default queue template for the substrate, used when starting a new resolving pass.
         * @param {object[] | TurboQueue<object>} queue - The queue (or list to build a queue from).
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        setDefaultSubstrateQueue(queue: object[] | TurboQueue<object>, substrate?: string): this;

        //PASSES

        /**
         * @function getObjectPassesForSubstrate
         * @description Retrieve how many times the given object has been processed for the current resolving session 
         * of the substrate.
         * @param {object} object - The object to query.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {number} - Number of passes already performed on this object.
         */
        getObjectPassesForSubstrate(object: object, substrate?: string): number;

        /**
         * @function getMaxPassesForSubstrate
         * @description Get the maximum number of passes allowed per object for this substrate during resolving.
         * This helps prevent infinite cycles in constraint propagation.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {number} - The maximum allowed passes.
         */
        getMaxPassesForSubstrate(substrate?: string): number;

        /**
         * @function setMaxPassesForSubstrate
         * @description Set the maximum number of passes allowed per object for this substrate during resolving. This
         * helps prevent infinite cycles in constraint propagation.
         * @param {number} passes - Maximum number of passes.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        setMaxPassesForSubstrate(passes: number, substrate?: string): this;

        //CUSTOM DATA

        /**
         * @function getObjectDataForSubstrate
         * @description Retrieve custom per-object data for this substrate. It is reset on every new
         * resolving session.
         * @param {object} object - The object to query.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {Record<string, any>} - The stored data object (or an empty object if none).
         */
        getObjectDataForSubstrate(object: object, substrate?: string): Record<string, any>;

        /**
         * @function setObjectDataForSubstrate
         * @description Set custom per-object data for this substrate. It is reset on every new resolving session.
         * @param {object} object - The object to update.
         * @param {Record<string, any>} [data] - The new data object to associate with this object.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        setObjectDataForSubstrate(object: object, data?: Record<string, any>, substrate?: string): this;

        //CHECKER

        /**
         * @function addChecker
         * @description Register a checker in the substrate. Checkers dictate whether the event should continue
         * executing depending on the provided context (event, tool, target, etc.).
         * @param {SubstrateAddCallbackProperties<SubstrateChecker>} properties - Configuration object, including the
         * checker `callback` to be executed, the `name` of the checker to access it later, the name of the attached
         * `substrate`, and the `priority` of the checker.
         * @return {this} - Itself for chaining.
         */
        addChecker(properties: SubstrateAddCallbackProperties<SubstrateChecker>): this;

        /**
         * @function removeChecker
         * @description Remove a checker from the given substrate by its name.
         * @param {string} name - The checker name.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        removeChecker(name: string, substrate?: string): this;

        /**
         * @function clearCheckers
         * @description Remove all checkers attached to the given substrate.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        clearCheckers(substrate?: string): this;

        /**
         * @function checkSubstrate
         * @description Evaluate all checkers for the targeted substrate and return whether the event should proceed or halt.
         * @param {SubstrateCallbackProperties} [properties] - Context passed to each checker.
         * @return {boolean} - Whether the substrate passes all checks.
         */
        checkSubstrate(properties?: SubstrateCallbackProperties): boolean;

        /**
         * @function checkSubstratesForEvent
         * @description Evaluate checkers for all relevant substrates for a given event context.
         * @param {SubstrateCallbackProperties} [properties] - Event context.
         * @return {boolean} - Whether all the checkers allowed the event to proceed.
         */
        checkSubstratesForEvent(properties?: SubstrateCallbackProperties): boolean;

        //MUTATOR

        /**
         * @function addMutator
         * @description Register a mutator in the substrate. Mutators compute or transform a value based on the context.
         * @param {SubstrateAddCallbackProperties<SubstrateMutator>} properties - Configuration object, including the
         * mutator `callback` to be executed, the `name` of the mutator to access it later, the name of the attached
         * `substrate`, and the `priority` of the mutator.
         * @return {this} - Itself for chaining.
         */
        addMutator(properties: SubstrateAddCallbackProperties<SubstrateMutator>): this;

        /**
         * @function removeMutator
         * @description Remove a mutator from the given substrate by its name.
         * @param {string} name - The mutator name.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        removeMutator(name: string, substrate?: string): this;

        /**
         * @function clearMutators
         * @description Remove all mutators attached to the given substrate.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        clearMutators(substrate?: string): this;

        /**
         * @function mutate
         * @template Type - The type of the value to mutate
         * @description Execute a mutator for the targeted substrate and return the resulting value.
         * @param {SubstrateMutatorProperties<Type>} [properties] - Context object, including the
         * `mutation` to execute, and the input `value` to mutate.
         * @return {Type} - The mutated result.
         */
        mutate<Type = any>(properties?: SubstrateMutatorProperties<Type>): Type;

        //SOLVER

        /**
         * @function addSolver
         * @description Add the given function as a solver in the substrate.
         * @return {this} - Itself for chaining.
         * @param properties
         */

        /**
         * @function addSolver
         * @description Register a solver in the substrate. Solvers typically execute after an event is fired to
         * ensure the substrate's constraints are maintained. They process all objects in the substrate's queue,
         * one after the other.
         * @param {SubstrateAddCallbackProperties<SubstrateSolver>} properties - Configuration object, including the
         * solver `callback` to be executed, the `name` of the solver to access it later, the name of the attached
         * `substrate`, and the `priority` of the solver.
         * @return {this} - Itself for chaining.
         */
        addSolver(properties: SubstrateAddCallbackProperties<SubstrateSolver>): this;

        /**
         * @function removeSolver
         * @description Remove the given function from the substrate's list of solvers.
         * @param {string} name - The solver's name.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        removeSolver(name: string, substrate?: string): this;

        /**
         * @function clearSolvers
         * @description Remove all solvers attached to the substrate.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the first active substrate.
         * @return {this} - Itself for chaining.
         */
        clearSolvers(substrate?: string): this;

        /**
         * @function solveSubstrate
         * @description Solve the substrate by executing all of its attached solvers. Each solver will be executed
         * on every object in the substrate's queue, incrementing its number of passes in the process.
         * @param {SubstrateCallbackProperties} [properties] - Options object to configure the context.
         * @return {this} - Itself for chaining.
         */
        solveSubstrate(properties?: SubstrateCallbackProperties): this;

        /**
         * @function solveSubstratesForEvent
         * @description Solve all relevant substrates for a given event context.
         * @param {SubstrateCallbackProperties} [properties] - Event context to pass to solvers.
         * @return {this} - Itself for chaining.
         */
        solveSubstratesForEvent(properties?: SubstrateCallbackProperties): this;
    }
}

export {MakeSubstrateOptions, SubstrateSolver, SubstrateChecker, SubstrateMutator, SubstrateMutatorProperties, SubstrateCallbackProperties, SubstrateAddCallbackProperties};