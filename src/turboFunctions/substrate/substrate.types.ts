import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ListenerOptions} from "../event/event.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";

/**
 * @type {MakeSubstrateOptions}
 * @group Types
 * @category Substrate
 *
 * @description Type representing objects used to configure the creation of substrates. Used in {@link makeSubstrate}.
 * @property {() => void} [onActivate] - Callback function to execute when the substrate is activated.
 * @property {() => void} [onDeactivate] - Callback function to execute when the substrate is deactivated.
 */
type MakeSubstrateOptions = {
    onActivate?: () => void,
    onDeactivate?: () => void,
    priority?: number,
};

/**
 * @type {SubstrateCallbackProperties}
 * @group Types
 * @category Substrate
 *
 * @description Type representing objects passed as context for resolving substrates. GIven as first parameters to
 * solvers when executing them via {@link resolveSubstrate}.
 * @property {string} [substrate] - The targeted substrate. Defaults to `currentSubstrate`.
 * @property {object} [target] - The current object being processed by the solver. Property set by
 * {@link resolveSubstrate} when processing every object in the substrate's list.
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
    target?: object,
    event?: Event,
    eventType?: string,
    eventTarget?: Node,
    toolName?: string,
    eventOptions?: ListenerOptions,
    manager?: TurboEventManager,
};

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
type SubstrateSolver = (properties: SubstrateCallbackProperties, ...args: any[]) => any;type SubstrateAddCallbackProperties<Type extends SubstrateChecker | SubstrateMutator | SubstrateSolver> = {
    name: string,
    callback: Type,
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
         * @description The current active substrate in the element.
         */
        currentSubstrate: string;

        /**
         * @function makeSubstrate
         * @description Creates a new substrate attached to this element. Useful to maintain certain constraints or
         * ensure some behaviors persist on a list of objects (by attaching solvers to this substrate).
         * @param {string} name - The name of the new substrate.
         * @param {MakeSubstrateOptions} [options] - Options parameter to configure the newly-created substrate.
         * @return {this} - Itself for chaining.
         */
        makeSubstrate(name: string, options?: MakeSubstrateOptions): this;

        /**
         * @description A delegate fired every time the current substrate changes.
         */
        readonly onSubstrateChange: Delegate<(prev: string, next: string) => void>;

        //ACTIVATION

        /**
         * @function onSubstrateActivate
         * @description Get the delegate fired when the substrate of the given name is activated (set as
         * {@link currentSubstrate}).
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {Delegate<() => void>} - The delegate.
         */
        onSubstrateActivate(substrate?: string): Delegate<() => void>;

        /**
         * @function onSubstrateDeactivate
         * @description Get the delegate fired when the substrate of the given name is deactivated.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {Delegate<() => void>} - The delegate.
         */
        onSubstrateDeactivate(substrate?: string): Delegate<() => void>;

        //PRIORITY

        getSubstratePriority(substrate?: string): number;
        setSubstratePriority(priority: number, substrate?: string): this;

        //OBJECT LIST

        /**
         * @function getSubstrateObjectList
         * @description Retrieve the list of objects that are constrained by the given substrate.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {Set<object>} - A shallow copy of the list of objects as a `Set`. To modify the list, use
         * {@link addObjectToSubstrate} and {@link removeObjectFromSubstrate}.
         */
        getSubstrateObjectList(substrate?: string): Set<object>;

        /**
         * @function setSubstrateObjectList
         * @description Set the list of objects that are constrained by the given substrate.
         * @param {HTMLCollection | NodeList | Set<object>} list - The list of objects to constrain.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {this} - Itself for chaining.
         */
        setSubstrateObjectList(list: HTMLCollection | NodeList | Set<object>, substrate?: string): this;

        /**
         * @function addObjectToSubstrate
         * @description Adds the given object to the substrate's list.
         * @param {object} object - The object to add to the list.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {this} - Itself for chaining.
         */
        addObjectToSubstrate(object: object, substrate?: string): this;

        /**
         * @function removeObjectFromSubstrate
         * @description Removes the given object from the substrate's list.
         * @param {object} object - The object to remove from the list.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {this} - Itself for chaining.
         */
        removeObjectFromSubstrate(object: object, substrate?: string): this;

        /**
         * @function hasObjectInSubstrate
         * @description Check if the given object is in the substrate's object list.
         * @param {object} object - The object to check.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {boolean} - Whether the object is in the list or not.
         */
        hasObjectInSubstrate(object: object, substrate?: string): boolean;

        //QUEUE

        getNextInSubstrateQueue(substrate?: string): object;

        addObjectToSubstrateQueue(object: object, substrate?: string): this;

        clearSubstrateQueue(substrate?: string): this;

        getDefaultSubstrateQueue(substrate?: string): TurboQueue<object>;

        setDefaultSubstrateQueue(queue: object[] | TurboQueue<object>, substrate?: string): this;

        //PASSES

        getObjectPassesForSubstrate(object: object, substrate?: string): number;

        getMaxPassesForSubstrate(substrate?: string): number;

        setMaxPassesForSubstrate(passes: number, substrate?: string): this;

        //CHECKER

        addChecker(properties: SubstrateAddCallbackProperties<SubstrateChecker>): this;

        removeChecker(name: string, substrate?: string): this;

        clearCheckers(substrate?: string): this;

        checkSubstrate(properties?: SubstrateCallbackProperties): boolean;

        checkSubstratesForEvent(properties?: SubstrateCallbackProperties): boolean;

        //MUTATOR

        addMutator(properties: SubstrateAddCallbackProperties<SubstrateMutator>): this;

        removeMutator(name: string, substrate?: string): this;

        clearMutators(substrate?: string): this;

        mutate<Type = any>(properties?: SubstrateMutatorProperties<Type>): Type;

        //SOLVER

        /**
         * @function addSolver
         * @description Add the given function as a solver in the substrate.
         * @return {this} - Itself for chaining.
         * @param properties
         */
        addSolver(properties: SubstrateAddCallbackProperties<SubstrateSolver>): this;

        /**
         * @function removeSolver
         * @description Remove the given function from the substrate's list of solvers.
         * @param name
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {this} - Itself for chaining.
         */
        removeSolver(name: string, substrate?: string): this;

        /**
         * @function clearSolvers
         * @description Remove all solvers attached to the substrate.
         * @param {string} [substrate] - The name of the targeted substrate. Defaults to the current substrate.
         * @return {this} - Itself for chaining.
         */
        clearSolvers(substrate?: string): this;

        /**
         * @function solveSubstrate
         * @description Resolve the substrate by executing all of its attached solvers. Each solver will be executed
         * on every object in the substrate's list of constrained objects, marking each as `processed` as it goes
         * through them.
         * @param {SubstrateCallbackProperties} [properties] - Options object to configure the context of the resolving
         * call.
         */
        solveSubstrate(properties?: SubstrateCallbackProperties): this;

        solveSubstratesForEvent(properties?: SubstrateCallbackProperties): this;
    }
}

export {MakeSubstrateOptions, SubstrateSolver, SubstrateChecker, SubstrateMutator, SubstrateMutatorProperties, SubstrateCallbackProperties, SubstrateAddCallbackProperties};