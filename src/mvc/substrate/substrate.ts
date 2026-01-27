import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";
import {TurboController} from "../logic/controller";
import {TurboSubstrateProperties} from "./substrate.types";
import {turbo} from "../../turboFunctions/turboFunctions";
import {
    SubstrateSolver,
    SubstrateCallbackProperties,
    SubstrateAddCallbackProperties, SubstrateChecker, SubstrateMutator, SubstrateMutatorProperties
} from "../../turboFunctions/substrate/substrate.types";
import {TurboQueue} from "../../turboComponents/datatypes/queue/queue";

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

    public get priority(): number {
        return turbo(this).getSubstratePriority(this.substrateName);
    }

    public set priority(value: number) {
        turbo(this).setSubstratePriority(value, this.substrateName);
    }

    public get active(): boolean {
        return turbo(this).activeSubstrates.includes(this.substrateName);
    }

    public set active(value: boolean) {
        turbo(this).activateSubstrate(this.substrateName, value);
    }

    /**
     * @description The list of objects constrained by the substrate. Retrieving it will return a shallow copy as a
     * Set. Use {@link addObject} and {@link removeObject} to manipulate the list.
     */
    public get objectList(): Set<object> {
        return turbo(this).getSubstrateObjectList(this.substrateName);
    }

    public set objectList(value: HTMLCollection | NodeList | Set<object>) {
        turbo(this).setSubstrateObjectList(value, this.substrateName);
    }

    public get queue(): TurboQueue<object> {
        return turbo(this).getSubstrateQueue(this.substrateName);
    }

    public get defaultQueue(): TurboQueue<object> {
        return turbo(this).getDefaultSubstrateQueue(this.substrateName);
    }

    public set defaultQueue(value: object[] | TurboQueue<object>) {
        turbo(this).setDefaultSubstrateQueue(value, this.substrateName);
    }

    public get maxPasses(): number {
        return turbo(this).getMaxPassesForSubstrate(this.substrateName);
    }

    public set maxPasses(value: number) {
        turbo(this).setMaxPassesForSubstrate(value, this.substrateName);
    }

    public constructor(properties: TurboSubstrateProperties<ElementType, ViewType, ModelType, EmitterType>) {
        super(properties);
        this.substrateName = properties.substrateName ?? this.substrateName ?? undefined;
        if (properties.onActivate) this.onActivate = properties.onActivate;
        if (properties.onDeactivate) this.onDeactivate = properties.onDeactivate;
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
     * @function addObject
     * @description Adds the provided object to the substrate's list.
     * @param {object} object - The object to add.
     */
    public addObject(object: object): this {
        turbo(this).addObjectToSubstrate(object, this.substrateName);
        return this;
    }

    /**
     * @function removeObject
     * @description Removes the provided object from the substrate's list.
     * @param {object} object - The object to remove.
     */
    public removeObject(object: object): this {
        turbo(this).removeObjectFromSubstrate(object, this.substrateName);
        return this;
    }

    /**
     * @function hasObject
     * @description Whether the provided object is included in the substrate's list.
     * @param {object} object - The object to check.
     * @return {boolean} - Whether the object is present.
     */
    public hasObject(object: object): boolean {
        return turbo(this).hasObjectInSubstrate(object, this.substrateName);
    }

    // public addToQueue(object: object): this {
    //     turbo(this).addObjectToSubstrateQueue(object, this.substrateName);
    //     return this;
    // }
    //
    // public clearQueue(): this {
    //     turbo(this).clearSubstrateQueue(this.substrateName);
    //     return this;
    // }

    public getObjectPasses(object: object): number {
        return turbo(this).getObjectPassesForSubstrate(object, this.substrateName);
    }

    public getObjectData(object: object): Record<string, any> {
        return turbo(this).getObjectDataForSubstrate(object, this.substrateName);
    }

    public setObjectData(object: object, data?: Record<string, any>): this {
        return turbo(this).setObjectDataForSubstrate(object, data, this.substrateName);
    }

    public addChecker(properties: SubstrateAddCallbackProperties<SubstrateChecker>): this {
        turbo(this).addChecker({...properties, substrate: this.substrateName});
        return this;
    }

    public removeChecker(name: string): this {
        turbo(this).removeChecker(name, this.substrateName);
        return this;
    }

    public clearCheckers(): this {
        turbo(this).clearCheckers(this.substrateName);
        return this;
    }

    public check(properties?: SubstrateCallbackProperties): boolean {
        return turbo(this).checkSubstrate({...properties, substrate: this.substrateName});
    }

    //MUTATOR

    public addMutator(properties: SubstrateAddCallbackProperties<SubstrateMutator>): this {
        turbo(this).addMutator({...properties, substrate: this.substrateName});
        return this;
    }

    public removeMutator(name: string): this {
        turbo(this).removeMutator(name, this.substrateName);
        return this;
    }

    public clearMutators(): this {
        turbo(this).clearMutators(this.substrateName);
        return this;
    }

    public mutate<Type = any>(properties?: SubstrateMutatorProperties<Type>): Type {
        return turbo(this).mutate<Type>({...properties, substrate: this.substrateName});
    }

    /**
     * @function addSolver
     * @description Add the given function as a solver in the substrate.
     * @param properties
     */
    public addSolver(properties: SubstrateAddCallbackProperties<SubstrateSolver>): this {
        turbo(this).addSolver({...properties, substrate: this.substrateName});
        return this;
    }

    /**
     * @function removeSolver
     * @description Remove the given function from the substrate's list of solvers.
     * @param name
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
     * @function resolve
     * @description Resolve the substrate by calling all the solvers on each of the objects in the substrate's list.
     * @param {SubstrateCallbackProperties} [properties={}] - Optional properties to provide context to the resolving loop.
     */
    public solve(properties: SubstrateCallbackProperties = {}): this {
        turbo(this).solveSubstrate({...properties, substrate: this.substrateName});
        return this;
    }
}

export {TurboSubstrate};