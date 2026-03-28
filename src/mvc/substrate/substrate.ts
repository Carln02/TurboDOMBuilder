import {TurboView} from "../view/view";
import {TurboSubstrateProperties} from "./substrate.types";
import {turbo} from "../../turboFunctions/turboFunctions";
import {
    SubstrateSolver,
    SubstrateCallbackProperties,
    SubstrateAddCallbackProperties, SubstrateChecker, SubstrateMutator, SubstrateMutatorProperties
} from "../../turboFunctions/substrate/substrate.types";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboNodeList} from "../../turboComponents/datatypes/nodeList/nodeList";
import {TurboModel} from "../model/model";
import {TurboEmitter} from "../emitter/emitter";
import {TurboController} from "../controller/controller";

/**
 * @class TurboSubstrate
 * @group MVC
 * @category Substrate
 *
 * @extends TurboController
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 * @description Class representing a substrate in MVC, bound to the provided element.
 */
class TurboSubstrate<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboController<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the substrate. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the substrate's class name is MyElementSomethingSubstrate, the key would
     * default to "something".
     */
    public declare keyName: string;

    /**
     * @description The name of the substrate.
     */
    public readonly substrateName: string;

    /**
     * @description The property keys of the substrate solvers defined in the instance.
     */
    public readonly solversMetadata: SubstrateAddCallbackProperties<SubstrateSolver>[] = [];

    /**
     * @description The property keys of the substrate checkers defined in the instance.
     */
    public readonly checkersMetadata: SubstrateAddCallbackProperties<SubstrateChecker>[] = [];

    /**
     * @description The property keys of the substrate mutators defined in the instance.
     */
    public readonly mutatorsMetadata: SubstrateAddCallbackProperties<SubstrateMutator>[] = [];

    /**
     * @description The priority of the substrate. Higher priority substrates (lower number) should
     * be resolved first. Defaults to 10.
     */
    public priority: number;

    /**
     * @description The list of objects constrained by the substrate. To manipulate, check {@link TurboNodeList}.
     * Defaults to the children of the element the substrate is attached to.
     */
    public objectList: TurboNodeList;

    /**
     * @description The list of objects that trigger the substrate to resolve.
     * Interacting with any of these objects would typically lead to the solving of the given substrate.
     * To manipulate, check {@link TurboNodeList}. Defaults to the objects in this.objectList.
     */
    public triggerList: TurboNodeList;

    /**
     * @description The default queue template for the substrate, used when starting a new resolving pass.
     * It defaults to the substrate's object list.
     */
    public defaultQueue: object[] | TurboQueue<object>;

    /**
     * @description The maximum number of passes allowed per object for this substrate during resolving.
     * This helps prevent infinite cycles in constraint propagation. Defaults to 5.
     */
    public maxPasses: number;

    /**
     * @description Whether the substrate is active. Defaults to true.
     */
    public get active(): boolean {
        return turbo(this).activeSubstrates.includes(this.substrateName);
    }

    public set active(value: boolean) {
        turbo(this).toggleSubstrate(this.substrateName, value);
    }

    /**
     * @description Delegate fired whenever an object is added to or removed from the substrate's object list.
     */
    public get onObjectListChange(): Delegate<(object: object, status: "added" | "removed") => void> {
        return turbo(this).onSubstrateObjectListChange(this.substrateName);
    }

    /**
     * @description The current queue to be processed by the substrate while resolving.
     */
    public get queue(): TurboQueue<object> {
        return turbo(this).getSubstrateQueue(this.substrateName);
    }

    public constructor(properties: TurboSubstrateProperties<ElementType, ViewType, ModelType, EmitterType>) {
        super(properties);

        this.substrateName = properties.substrateName ?? this.substrateName ?? undefined;
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
     * @description Initialization function that calls {@link makeSubstrate} on `this.element`, sets it up, and attaches
     * all the defined solvers.
     */
    public initialize(): void {
        super.initialize();
        if (!this.substrateName) return;

        turbo(this).makeSubstrate(this.substrateName, {
            onActivate: typeof this.onActivate === "function" ? this.onActivate.bind(this) : undefined,
            onDeactivate: typeof this.onDeactivate === "function" ? this.onDeactivate.bind(this) : undefined,
            attachedInstance: this
        });

        this.solversMetadata.forEach(metadata => {
            if (!metadata.name) return;
            turbo(this).addSolver({
                name: metadata.name,
                substrate: this.substrateName,
                priority: metadata.priority,
                callback: props => this[metadata.name]?.(props)
            });
        });

        this.checkersMetadata.forEach(metadata => {
            if (!metadata.name) return;
            turbo(this).addChecker({
                name: metadata.name,
                substrate: this.substrateName,
                priority: metadata.priority,
                callback: props => this[metadata.name]?.(props)
            });
        });

        this.mutatorsMetadata.forEach(metadata => {
            if (!metadata.name) return;
            turbo(this).addMutator({
                name: metadata.name,
                substrate: this.substrateName,
                priority: metadata.priority,
                callback: props => this[metadata.name]?.(props)
            });
        });
    }

    /**
     * @function getObjectPasses
     * @description Retrieve how many times the given object has been processed for the current resolving session
     * of the substrate.
     * @param {object} object - The object to query.
     * @return {number} - Number of passes already performed on this object.
     */
    public getObjectPasses(object: object): number {
        return turbo(this).getObjectPassesForSubstrate(object, this.substrateName);
    }

    /**
     * @function getObjectData
     * @description Retrieve custom per-object data for this substrate. It is reset on every new
     * resolving session.
     * @param {object} object - The object to query.
     * @return {Record<string, any>} - The stored data object (or an empty object if none).
     */
    public getObjectData(object: object): Record<string, any> {
        return turbo(this).getObjectDataForSubstrate(object, this.substrateName);
    }

    /**
     * @function setObjectData
     * @description Set custom per-object data for this substrate. It is reset on every new resolving session.
     * @param {object} object - The object to update.
     * @param {Record<string, any>} [data] - The new data object to associate with this object.
     * @return {this} - Itself for chaining.
     */
    public setObjectData(object: object, data?: Record<string, any>): this {
        return turbo(this).setObjectDataForSubstrate(object, data, this.substrateName);
    }

    /**
     * @function addChecker
     * @description Register a checker in the substrate. Checkers dictate whether the event should continue
     * executing depending on the provided context (event, tool, target, etc.).
     * @param {SubstrateAddCallbackProperties<SubstrateChecker>} properties - Configuration object, including the
     * checker `callback` to be executed, the `name` of the checker to access it later, the name of the attached
     * `substrate`, and the `priority` of the checker.
     * @return {this} - Itself for chaining.
     */
    public addChecker(properties: SubstrateAddCallbackProperties<SubstrateChecker>): this {
        turbo(this).addChecker({...properties, substrate: this.substrateName});
        return this;
    }

    /**
     * @function removeChecker
     * @description Remove a checker from this substrate by its name.
     * @param {string} name - The checker name.
     * @return {this} - Itself for chaining.
     */
    public removeChecker(name: string): this {
        turbo(this).removeChecker(name, this.substrateName);
        return this;
    }

    /**
     * @function clearCheckers
     * @description Remove all checkers attached to this substrate.
     * @return {this} - Itself for chaining.
     */
    public clearCheckers(): this {
        turbo(this).clearCheckers(this.substrateName);
        return this;
    }

    /**
     * @function check
     * @description Evaluate all checkers for this substrate and return whether the event should proceed or halt.
     * @param {SubstrateCallbackProperties} [properties] - Context passed to each checker.
     * @return {boolean} - Whether the substrate passes all checks.
     */
    public check(properties?: SubstrateCallbackProperties): boolean {
        return turbo(this).checkSubstrate({...properties, substrate: this.substrateName});
    }

    //MUTATOR

    /**
     * @function addMutator
     * @description Register a mutator in the substrate. Mutators compute or transform a value based on the context.
     * @param {SubstrateAddCallbackProperties<SubstrateMutator>} properties - Configuration object, including the
     * mutator `callback` to be executed, the `name` of the mutator to access it later, and the `priority` of the mutator.
     * @return {this} - Itself for chaining.
     */
    public addMutator(properties: SubstrateAddCallbackProperties<SubstrateMutator>): this {
        turbo(this).addMutator({...properties, substrate: this.substrateName});
        return this;
    }

    /**
     * @function removeMutator
     * @description Remove a mutator from this substrate by its name.
     * @param {string} name - The mutator name.
     * @return {this} - Itself for chaining.
     */
    public removeMutator(name: string): this {
        turbo(this).removeMutator(name, this.substrateName);
        return this;
    }

    /**
     * @function clearMutators
     * @description Remove all mutators attached to this substrate.
     * @return {this} - Itself for chaining.
     */
    public clearMutators(): this {
        turbo(this).clearMutators(this.substrateName);
        return this;
    }

    /**
     * @function mutate
     * @template Type - The type of the value to mutate
     * @description Execute a mutator for this substrate and return the resulting value.
     * @param {SubstrateMutatorProperties<Type>} [properties] - Context object, including the
     * `mutation` to execute, and the input `value` to mutate.
     * @return {Type} - The mutated result.
     */
    public mutate<Type = any>(properties?: SubstrateMutatorProperties<Type>): Type {
        return turbo(this).mutate<Type>({...properties, substrate: this.substrateName});
    }

    /**
     * @function addSolver
     * @description Register a solver in the substrate. Solvers typically execute after an event is fired to
     * ensure the substrate's constraints are maintained. They process all objects in the substrate's queue,
     * one after the other.
     * @param {SubstrateAddCallbackProperties<SubstrateSolver>} properties - Configuration object, including the
     * solver `callback` to be executed, the `name` of the solver to access it later, and the `priority` of the solver.
     * @return {this} - Itself for chaining.
     */
    public addSolver(properties: SubstrateAddCallbackProperties<SubstrateSolver>): this {
        turbo(this).addSolver({...properties, substrate: this.substrateName});
        return this;
    }

    /**
     * @function removeSolver
     * @description Remove the given function from the substrate's list of solvers.
     * @param {string} name - The solver's name.
     * @return {this} - Itself for chaining.
     */
    public removeSolver(name: string): this {
        turbo(this).removeSolver(name, this.substrateName);
        return this;
    }

    /**
     * @function clearSolvers
     * @description Remove all solvers attached to the substrate.
     * @return {this} - Itself for chaining.
     */
    public clearSolvers(): this {
        turbo(this).clearSolvers(this.substrateName);
        return this;
    }

    /**
     * @function solveSubstrate
     * @description Solve the substrate by executing all of its attached solvers. Each solver will be executed
     * on every object in the substrate's queue, incrementing its number of passes in the process.
     * @param {SubstrateCallbackProperties} [properties] - Options object to configure the context.
     * @return {this} - Itself for chaining.
     */
    public solve(properties: SubstrateCallbackProperties = {}): this {
        turbo(this).solveSubstrate({...properties, substrate: this.substrateName});
        return this;
    }
}

export {TurboSubstrate};