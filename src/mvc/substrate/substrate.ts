import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";
import {TurboController} from "../logic/controller";
import {TurboSubstrateProperties} from "./substrate.types";
import {$} from "../../turboFunctions/turboFunctions";
import {SubstrateSolver, SubstrateSolverProperties} from "../../turboFunctions/substrate/substrate.types";

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
    public readonly solverKeys: string[] = [];

    /**
     * @description The list of objects constrained by the substrate. Retrieving it will return a shallow copy as a
     * Set. Use {@link addObject} and {@link removeObject} to manipulate the list.
     */
    public get objectList(): Set<object> {
        return $(this).getSubstrateObjectList(this.substrateName);
    }

    public set objectList(value: HTMLCollection | NodeList | Set<object>) {
        $(this).setSubstrateObjectList(value, this.substrateName);
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

        $(this).makeSubstrate(this.substrateName, {
            onActivate: typeof this.onActivate === "function" ? this.onActivate.bind(this) : undefined,
            onDeactivate: typeof this.onDeactivate === "function" ? this.onDeactivate.bind(this) : undefined,
        });

        this.solverKeys.forEach((key: string) => {
            $(this).addSolver(props => this[key]?.(props));
        });
    }

    /**
     * @function addObject
     * @description Adds the provided object to the substrate's list.
     * @param {object} object - The object to add.
     */
    public addObject(object: object) {
        $(this).addObjectToSubstrate(object, this.substrateName);
    }

    /**
     * @function removeObject
     * @description Removes the provided object from the substrate's list.
     * @param {object} object - The object to remove.
     */
    public removeObject(object: object) {
        $(this).removeObjectFromSubstrate(object, this.substrateName);
    }

    /**
     * @function hasObject
     * @description Whether the provided object is included in the substrate's list.
     * @param {object} object - The object to check.
     * @return {boolean} - Whether the object is present.
     */
    public hasObject(object: object): boolean {
        return $(this).hasObjectInSubstrate(object, this.substrateName);
    }

    /**
     * @function isProcessed
     * @description Whether the provided object is processed within the current resolving loop.
     * @param {object} object - The object to check.
     * @return {boolean} - Whether the object was processed.
     */
    public isProcessed(object: object): boolean {
        return $(this).wasObjectProcessedBySubstrate(object, this.substrateName);
    }

    /**
     * @function addSolver
     * @description Add the given function as a solver in the substrate.
     * @param {SubstrateSolver} fn - The solver function to execute when calling {@link resolve}.
     */
    public addSolver(fn: SubstrateSolver) {
        $(this).addSolver(fn, this.substrateName);
    }

    /**
     * @function removeSolver
     * @description Remove the given function from the substrate's list of solvers.
     * @param {SubstrateSolver} fn - The solver function to remove.
     */
    public removeSolver(fn: SubstrateSolver) {
        $(this).removeSolver(fn, this.substrateName);
    }

    /**
     * @function clearSolvers
     * @description Remove all solvers attached to the substrate.
     */
    public clearSolvers() {
        $(this).clearSolvers(this.substrateName);
    }

    /**
     * @function resolve
     * @description Resolve the substrate by calling all the solvers on each of the objects in the substrate's list.
     * @param {SubstrateSolverProperties} [properties={}] - Optional properties to provide context to the resolving loop.
     */
    public resolve(properties: SubstrateSolverProperties = {}) {
        $(this).resolveSubstrate({...properties, substrate: this.substrateName});
    }
}

export {TurboSubstrate};