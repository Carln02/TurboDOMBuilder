import {TurboSelector} from "./turboSelector";

type Turbo<Type extends object = Node> = TurboSelector<Type> & Type;

type TurbofyOptions = {
    excludeHierarchyFunctions?: boolean,
    excludeStyleFunctions?: boolean,
    excludeClassFunctions?: boolean,
    excludeElementFunctions?: boolean,
    excludeEventFunctions?: boolean,
    excludeToolFunctions?: boolean,
    excludeSubstrateFunctions?: boolean,
    excludeMiscFunctions?: boolean,
    excludeReifectFunctions?: boolean
};

declare module "./turboSelector" {
    interface TurboSelector extends Node {
    }
}

export {Turbo, TurbofyOptions};