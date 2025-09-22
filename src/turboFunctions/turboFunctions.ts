import {Turbo, TurbofyOptions} from "./turboFunctions.types";
import {setupHierarchyFunctions} from "./hierarchy/hierarchy";
import {setupMiscFunctions} from "./misc/misc";
import {setupClassFunctions} from "./class/class";
import {setupElementFunctions} from "./element/element";
import {setupEventFunctions} from "./event/event";
import {setupStyleFunctions} from "./style/style";
import {setupToolFunctions} from "./tool/tool";
import {setupSubstrateFunctions} from "./substrate/substrate";
import {TurboSelector} from "./turboSelector";

let turbofied: boolean = false;

function $<Type extends Node = Node>(element?: Type | object): Turbo<Type> {
    if (!turbofied) turbofy();
    if (!element) return new TurboSelector<Type>() as Turbo<Type>;
    if (element instanceof TurboSelector) return element;
    const turboSelector = new TurboSelector<Type>();
    if (element instanceof Node) turboSelector.element = element;
    else if (element["element"] && element["element"] as any instanceof Node) turboSelector.element = element["element"];
    return turboSelector as Turbo<Type>;
}

function t<Type extends Node = Node>(element: Type): Turbo<Type> {
    if (!turbofied) turbofy();
    if (element instanceof TurboSelector) return element;
    const turboSelector = new TurboSelector<Type>();
    turboSelector.element = element;
    return turboSelector as Turbo<Type>;
}

function turbo<Type extends Node = Node>(element: Type): Turbo<Type> {
    if (!turbofied) turbofy();
    if (element instanceof TurboSelector) return element;
    const turboSelector = new TurboSelector<Type>();
    turboSelector.element = element;
    return turboSelector as Turbo<Type>;
}

function turbofy(options: TurbofyOptions = {}) {
    turbofied = true;
    if (!options.excludeHierarchyFunctions) setupHierarchyFunctions();
    if (!options.excludeMiscFunctions) setupMiscFunctions();
    if (!options.excludeClassFunctions) setupClassFunctions();
    if (!options.excludeElementFunctions) setupElementFunctions();
    if (!options.excludeEventFunctions) setupEventFunctions();
    if (!options.excludeStyleFunctions) setupStyleFunctions();
    if (!options.excludeToolFunctions) setupToolFunctions();
    if (!options.excludeSubstrateFunctions) setupSubstrateFunctions();

    //todo addReifectManagementToNodePrototype();
}

export {$, t, turbo, turbofy};