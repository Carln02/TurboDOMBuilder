import {TurboView} from "../core/view";
import {TurboModel} from "../core/model";
import {TurboEmitter} from "../core/emitter";
import {TurboController} from "../logic/controller";
import {TurboSubstrateProperties} from "./substrate.types";
import {$} from "../../turboFunctions/turboFunctions";
import {SubstrateSolverProperties} from "../../turboFunctions/substrate/substrate.types";

class TurboSubstrate<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboController<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the substrate. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the substrate's class name is MyElementSomethingSubstrate, the key would
     * default to "something".
     */
    public declare keyName: string;

    public readonly substrateName: string;

    public get objectList(): HTMLCollection | NodeList | Set<object> {
        return $(this).getSubstrateObjectList(this.substrateName);
    }

    public set objectList(value: HTMLCollection | NodeList | Set<object>) {
        $(this).setSubstrateObjectList(value, this.substrateName);
    }

    public constructor(properties: TurboSubstrateProperties<ElementType, ViewType, ModelType, EmitterType>) {
        super(properties);
        this.substrateName = properties.substrateName ?? this.substrateName ?? undefined;
    }

    public initialize(): void {
        super.initialize();
        if (!this.substrateName) return;

        $(this).makeSubstrate(this.substrateName, {
            onActivate: typeof this["onActivate"] === "function" ? this["onActivate"] : undefined,
            onDeactivate: typeof this["onDeactivate"] === "function" ? this["onDeactivate"] : undefined,
        });
    }

    public addObject(object: object) {
        $(this).addObjectToSubstrate(object, this.substrateName);
    }

    public removeObject(object: object) {
        return $(this).removeObjectFromSubstrate(object, this.substrateName);
    }

    public hasObject(object: object) {
        return $(this).hasObjectInSubstrate(object, this.substrateName);
    }

    public isProcessed(object: object) {
        return $(this).wasObjectProcessedBySubstrate(object, this.substrateName);
    }

    public resolve(properties: SubstrateSolverProperties = {}) {
        $(this).resolveSubstrate({...properties, substrate: this.substrateName});
    }

    public addSolver(callback: (...args: any[]) => any) {
        $(this).addSolver(callback, this.substrateName);
    }

    public removeSolver(callback: (...args: any[]) => any) {
        $(this).removeSolver(callback, this.substrateName);
    }

    public clearSolvers() {
        $(this).clearSolvers(this.substrateName);
    }
}

export {TurboSubstrate};