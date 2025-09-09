import {TurboSelector} from "./turboFunctions";

type Turbo<Type extends Node = Node> = TurboSelector<Type> & Type;

type TurbofyOptions = {
    excludeHierarchyFunctions?: boolean,
    excludeStyleFunctions?: boolean,
    excludeClassFunctions?: boolean,
    excludeElementFunctions?: boolean,
    excludeEventFunctions?: boolean,
    excludeToolFunctions?: boolean,
    excludeMiscFunctions?: boolean,
};

declare module "./turboFunctions" {
    interface TurboSelector extends Node {
    }
}

export {Turbo, TurbofyOptions};