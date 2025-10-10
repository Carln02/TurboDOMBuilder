import {Delegate} from "../../eventHandling/delegate/delegate";
import {TurboEventManager} from "../../eventHandling/turboEventManager/turboEventManager";
import {ListenerOptions} from "../event/event.types";

type MakeSubstrateOptions = {
    onActivate?: () => void,
    onDeactivate?: () => void,
};

type SubstrateSolverProperties = {
    substrate?: string,
    target?: object,

    event?: Event,
    eventType?: string,
    eventTarget?: Node,
    toolName?: string,
    eventOptions?: ListenerOptions,
    manager?: TurboEventManager,
};

type SubstrateSolver =  (properties: SubstrateSolverProperties, ...args: any[]) => any;

declare module "../turboSelector" {
    interface TurboSelector {
        makeSubstrate(name: string, options?: MakeSubstrateOptions): this;
        getSubstrates(): string[];

        getSubstrateObjectList(substrate?: string): Set<object>;
        setSubstrateObjectList(list: HTMLCollection | NodeList | Set<object>, substrate?: string): this;

        addObjectToSubstrate(object: object, substrate?: string): this;
        removeObjectFromSubstrate(object: object, substrate?: string): this;

        hasObjectInSubstrate(object: object, substrate?: string): boolean;
        wasObjectProcessedBySubstrate(object: object, substrate?: string): boolean;

        setSubstrate(name: string): this;
        currentSubstrate: string;
        readonly onSubstrateChange: Delegate<(prev: string, next: string) => void>;

        onSubstrateActivate(name?: string): Delegate<() => void>;
        onSubstrateDeactivate(name?: string): Delegate<() => void>;

        addSolver(callback: SubstrateSolver, name?: string): this;
        removeSolver(callback: SubstrateSolver, name?: string): this;
        clearSolvers(name?: string): this;

        resolveSubstrate(properties?: SubstrateSolverProperties): this;
    }
}

export {MakeSubstrateOptions, SubstrateSolver, SubstrateSolverProperties};