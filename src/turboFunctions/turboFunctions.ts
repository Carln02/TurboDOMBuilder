import "./turboFunctions.types";
import {Turbo, TurbofyOptions} from "./turboFunctions.types";
import {setupHierarchyFunctions} from "./hierarchy/hierarchy";
import {setupMiscFunctions} from "./misc/misc";
import {setupClassFunctions} from "./class/class";
import {setupElementFunctions} from "./element/element";
import {setupEventFunctions} from "./event/event";
import {setupStyleFunctions} from "./style/style";
import {setupToolFunctions} from "./tool/tool";

let turbofied: boolean = false;

class TurboSelector<Type extends Node = Node> {
    public element: Type;

    public constructor() {
        return this.#generateProxy();
    }

    #generateProxy() {
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (prop in target) return Reflect.get(target, prop, receiver);
                const value = target.element?.[prop];
                return typeof value === "function" ? value.bind(target.element) : value;
            },
            set(target, prop, value, receiver) {
                if (prop in target) return Reflect.set(target, prop, value, receiver);
                target.element[prop] = value;
                return true;
            },
            has(target, prop) {
                return prop in target || prop in target.element;
            },
            ownKeys(target) {
                return Array.from([...Reflect.ownKeys(target), ...Reflect.ownKeys(target.element)]);
            },
            getOwnPropertyDescriptor(target, prop) {
                return Reflect.getOwnPropertyDescriptor(target, prop)
                    || Object.getOwnPropertyDescriptor(target.element, prop)
                    || undefined;
            }
        });
    }
}

function $<Type extends Node = Node>(element: Type): Turbo<Type> {
    if (!turbofied) turbofy();
    if (element instanceof TurboSelector) return element;
    const turboSelector = new TurboSelector<Type>();
    turboSelector.element = element;
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
    //todo addReifectManagementToNodePrototype();
}

export {TurboSelector, $, t, turbo, turbofy};