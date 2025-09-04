import {TurboSelector} from "./turboFunctions";

type Turbo<Type extends Node> = TurboSelector<Type> & Type;

type TurbofyOptions = {
    excludeHierarchyFunctions?: boolean,
    excludeStyleFunctions?: boolean,
    excludeClassFunctions?: boolean,
    excludeElementFunctions?: boolean,
    excludeEventFunctions?: boolean,
    excludeMiscFunctions?: boolean,
};

declare module "./turboFunctions" {
    interface TurboSelector extends Node {
    }
}

export {Turbo, TurbofyOptions};