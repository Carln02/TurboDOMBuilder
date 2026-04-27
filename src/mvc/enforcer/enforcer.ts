import {TurboView} from "../view/view";
import {TurboEnforcerProperties} from "./enforcer.types";
import {turbo} from "../../turboFunctions/turboFunctions";
import {
    EnforcerSolver,
    EnforcerCallbackProperties,
    EnforcerAddCallbackProperties, EnforcerChecker, EnforcerMutator, EnforcerMutatorProperties
} from "../../turboFunctions/enforcer/enforcer.types";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboNodeList} from "../../turboComponents/datatypes/nodeList/nodeList";
import {TurboModel} from "../model/model";
import {TurboEmitter} from "../emitter/emitter";
import {TurboOperator} from "../operator/operator";
import {addRegistryCategory, define} from "../../decorators/define/define";

/**
 * @class TurboEnforcer
 * @group MVC
 * @category Enforcer
 *
 * @extends TurboOperator
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 * @description Class representing an enforcer in MVC, bound to the provided element.
 */
class TurboEnforcer<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboOperator<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the enforcer. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the enforcer's class name is MyElementSomethingEnforcer, the key would
     * default to "something".
     */
    public declare keyName: string;

    /**
     * @description The name of the enforcer.
     */
    public readonly enforcerName: string;

    /**
     * @description The property keys of the enforcer solvers defined in the instance.
     */
    public readonly solversMetadata: EnforcerAddCallbackProperties<EnforcerSolver>[] = [];

    /**
     * @description The property keys of the enforcer checkers defined in the instance.
     */
    public readonly checkersMetadata: EnforcerAddCallbackProperties<EnforcerChecker>[] = [];

    /**
     * @description The property keys of the enforcer mutators defined in the instance.
     */
    public readonly mutatorsMetadata: EnforcerAddCallbackProperties<EnforcerMutator>[] = [];

    /**
     * @description The priority of the enforcer. Higher priority enforcers (lower number) should
     * be resolved first. Defaults to 10.
     */
    public priority: number;

    /**
     * @description The list of objects constrained by the enforcer. To manipulate, check {@link TurboNodeList}.
     * Defaults to the children of the element the enforcer is attached to.
     */
    public objectList: TurboNodeList;

    /**
     * @description The list of objects that trigger the enforcer to resolve.
     * Interacting with any of these objects would typically lead to the solving of the given enforcer.
     * To manipulate, check {@link TurboNodeList}. Defaults to the objects in this.objectList.
     */
    public triggerList: TurboNodeList;

    /**
     * @description The default queue template for the enforcer, used when starting a new resolving pass.
     * It defaults to the enforcer's object list.
     */
    public defaultQueue: object[] | TurboQueue<object>;

    /**
     * @description The maximum number of passes allowed per object for this enforcer during resolving.
     * This helps prevent infinite cycles in constraint propagation. Defaults to 5.
     */
    public maxPasses: number;

    /**
     * @description Whether the enforcer is active. Defaults to true.
     */
    public get active(): boolean {
        return turbo(this).activeEnforcers.includes(this.enforcerName);
    }

    public set active(value: boolean) {
        turbo(this).toggleEnforcer(this.enforcerName, value);
    }

    /**
     * @description Delegate fired whenever an object is added to or removed from the enforcer's object list.
     */
    public get onObjectListChange(): Delegate<(object: object, status: "added" | "removed") => void> {
        return turbo(this).onEnforcerObjectListChange(this.enforcerName);
    }

    /**
     * @description The current queue to be processed by the enforcer while resolving.
     */
    public get queue(): TurboQueue<object> {
        return turbo(this).getEnforcerQueue(this.enforcerName);
    }

    public constructor(properties: TurboEnforcerProperties<ElementType, ViewType, ModelType, EmitterType>) {
        super(properties);

        this.enforcerName = properties.enforcerName ?? this.enforcerName ?? undefined;
        if (properties.onActivate) this.onActivate = properties.onActivate;
        if (properties.onDeactivate) this.onDeactivate = properties.onDeactivate;
        if (properties.active !== undefined) this.active = properties.active;
        if (typeof properties.priority === "number") this.priority = properties.priority;

        if (!this.objectList) this.objectList = new TurboNodeList(
            this.element instanceof Element ? this.element.children
                : this.element instanceof Node ? this.element.childNodes
                    : []);
        if (!this.triggerList) this.triggerList = new TurboNodeList(this.objectList);

        this.setup();
    }

    /**
     * @function initialize
     * @override
     * @description Initialization function that calls {@link makeEnforcer} on `this.element`, sets it up, and attaches
     * all the defined solvers.
     */
    public initialize(): void {
        super.initialize();
        if (!this.enforcerName) return;

        turbo(this).makeEnforcer(this.enforcerName, {
            onActivate: typeof this.onActivate === "function" ? this.onActivate.bind(this) : undefined,
            onDeactivate: typeof this.onDeactivate === "function" ? this.onDeactivate.bind(this) : undefined,
            attachedInstance: this
        });

        this.solversMetadata.forEach(metadata => {
            if (!metadata.name) return;
            turbo(this).addSolver({
                name: metadata.name,
                enforcer: this.enforcerName,
                priority: metadata.priority,
                callback: props => this[metadata.name]?.(props)
            });
        });

        this.checkersMetadata.forEach(metadata => {
            if (!metadata.name) return;
            turbo(this).addChecker({
                name: metadata.name,
                enforcer: this.enforcerName,
                priority: metadata.priority,
                callback: props => this[metadata.name]?.(props)
            });
        });

        this.mutatorsMetadata.forEach(metadata => {
            if (!metadata.name) return;
            turbo(this).addMutator({
                name: metadata.name,
                enforcer: this.enforcerName,
                priority: metadata.priority,
                callback: props => this[metadata.name]?.(props)
            });
        });
    }

    /**
     * @function getObjectPasses
     * @description Retrieve how many times the given object has been processed for the current resolving session
     * of the enforcer.
     * @param {object} object - The object to query.
     * @return {number} - Number of passes already performed on this object.
     */
    public getObjectPasses(object: object): number {
        return turbo(this).getObjectPassesForEnforcer(object, this.enforcerName);
    }

    /**
     * @function getObjectData
     * @description Retrieve custom per-object data for this enforcer. It is reset on every new
     * resolving session.
     * @param {object} object - The object to query.
     * @return {Record<string, any>} - The stored data object (or an empty object if none).
     */
    public getObjectData(object: object): Record<string, any> {
        return turbo(this).getObjectDataForEnforcer(object, this.enforcerName);
    }

    /**
     * @function setObjectData
     * @description Set custom per-object data for this enforcer. It is reset on every new resolving session.
     * @param {object} object - The object to update.
     * @param {Record<string, any>} [data] - The new data object to associate with this object.
     * @return {this} - Itself for chaining.
     */
    public setObjectData(object: object, data?: Record<string, any>): this {
        return turbo(this).setObjectDataForEnforcer(object, data, this.enforcerName);
    }

    /**
     * @function addChecker
     * @description Register a checker in the enforcer. Checkers dictate whether the event should continue
     * executing depending on the provided context (event, tool, target, etc.).
     * @param {EnforcerAddCallbackProperties<EnforcerChecker>} properties - Configuration object, including the
     * checker `callback` to be executed, the `name` of the checker to access it later, the name of the attached
     * `enforcer`, and the `priority` of the checker.
     * @return {this} - Itself for chaining.
     */
    public addChecker(properties: EnforcerAddCallbackProperties<EnforcerChecker>): this {
        turbo(this).addChecker({...properties, enforcer: this.enforcerName});
        return this;
    }

    /**
     * @function removeChecker
     * @description Remove a checker from this enforcer by its name.
     * @param {string} name - The checker name.
     * @return {this} - Itself for chaining.
     */
    public removeChecker(name: string): this {
        turbo(this).removeChecker(name, this.enforcerName);
        return this;
    }

    /**
     * @function clearCheckers
     * @description Remove all checkers attached to this enforcer.
     * @return {this} - Itself for chaining.
     */
    public clearCheckers(): this {
        turbo(this).clearCheckers(this.enforcerName);
        return this;
    }

    /**
     * @function check
     * @description Evaluate all checkers for this enforcer and return whether the event should proceed or halt.
     * @param {EnforcerCallbackProperties} [properties] - Context passed to each checker.
     * @return {boolean} - Whether the enforcer passes all checks.
     */
    public check(properties?: EnforcerCallbackProperties): boolean {
        return turbo(this).checkEnforcer({...properties, enforcer: this.enforcerName});
    }

    /**
     * @function addMutator
     * @description Register a mutator in the enforcer. Mutators compute or transform a value based on the context.
     * @param {EnforcerAddCallbackProperties<EnforcerMutator>} properties - Configuration object, including the
     * mutator `callback` to be executed, the `name` of the mutator to access it later, and the `priority` of the mutator.
     * @return {this} - Itself for chaining.
     */
    public addMutator(properties: EnforcerAddCallbackProperties<EnforcerMutator>): this {
        turbo(this).addMutator({...properties, enforcer: this.enforcerName});
        return this;
    }

    /**
     * @function removeMutator
     * @description Remove a mutator from this enforcer by its name.
     * @param {string} name - The mutator name.
     * @return {this} - Itself for chaining.
     */
    public removeMutator(name: string): this {
        turbo(this).removeMutator(name, this.enforcerName);
        return this;
    }

    /**
     * @function clearMutators
     * @description Remove all mutators attached to this enforcer.
     * @return {this} - Itself for chaining.
     */
    public clearMutators(): this {
        turbo(this).clearMutators(this.enforcerName);
        return this;
    }

    /**
     * @function mutate
     * @template Type - The type of the value to mutate
     * @description Execute a mutator for this enforcer and return the resulting value.
     * @param {EnforcerMutatorProperties<Type>} [properties] - Context object, including the
     * `mutation` to execute, and the input `value` to mutate.
     * @return {Type} - The mutated result.
     */
    public mutate<Type = any>(properties?: EnforcerMutatorProperties<Type>): Type {
        return turbo(this).mutate<Type>({...properties, enforcer: this.enforcerName});
    }

    /**
     * @function addSolver
     * @description Register a solver in the enforcer. Solvers typically execute after an event is fired to
     * ensure the enforcer's constraints are maintained. They process all objects in the enforcer's queue,
     * one after the other.
     * @param {EnforcerAddCallbackProperties<EnforcerSolver>} properties - Configuration object, including the
     * solver `callback` to be executed, the `name` of the solver to access it later, and the `priority` of the solver.
     * @return {this} - Itself for chaining.
     */
    public addSolver(properties: EnforcerAddCallbackProperties<EnforcerSolver>): this {
        turbo(this).addSolver({...properties, enforcer: this.enforcerName});
        return this;
    }

    /**
     * @function removeSolver
     * @description Remove the given function from the enforcer's list of solvers.
     * @param {string} name - The solver's name.
     * @return {this} - Itself for chaining.
     */
    public removeSolver(name: string): this {
        turbo(this).removeSolver(name, this.enforcerName);
        return this;
    }

    /**
     * @function clearSolvers
     * @description Remove all solvers attached to the enforcer.
     * @return {this} - Itself for chaining.
     */
    public clearSolvers(): this {
        turbo(this).clearSolvers(this.enforcerName);
        return this;
    }

    /**
     * @function solve
     * @description Solve the enforcer by executing all of its attached solvers. Each solver will be executed
     * on every object in the enforcer's queue, incrementing its number of passes in the process.
     * @param {EnforcerCallbackProperties} [properties] - Options object to configure the context.
     * @return {this} - Itself for chaining.
     */
    public solve(properties: EnforcerCallbackProperties = {}): this {
        turbo(this).solveEnforcer({...properties, enforcer: this.enforcerName});
        return this;
    }
}

addRegistryCategory(TurboEnforcer);
define(TurboEnforcer);
export {TurboEnforcer};
