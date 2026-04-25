import {camelToKebabCase, kebabToCamelCase, parse, stringify} from "../../utils/dataManipulation/string";
import {DefineOptions, RegistryCategory, RegistryEntry} from "./define.types";
import {DefineDecoratorUtils} from "./define.utils";
import {getSuperMethod} from "../../utils/dataManipulation/prototype";
import {TurboElementProperties} from "../../turboElement/turboElement.types";
import {turbo} from "../../turboFunctions/turboFunctions";

const utils = new DefineDecoratorUtils();

/**
 * @decorator
 * @function define
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Stage-3 **class** decorator factory that registers a class in the TurboDom registry
 * and, if the class extends a DOM element, also registers it as a custom HTML element. Specifically, it:
 * - Registers the class in the registry by {@link RegistryCategory}, inferring the category
 *   from the class's inheritance chain.
 * - If the class extends a DOM `Element`:
 *   - Registers it with the browser's `customElements` registry under the provided or inferred tag name.
 *   - Stores the tag name on the class as a static `tagName` property.
 *   - Adds the tag name as a CSS class to all instances (enabling CSS targeting by class hierarchy).
 *   - Wraps the static `create()` method to automatically inject the tag name into creation properties.
 *   - Publishes a live `observedAttributes` getter aggregating all `@observe`-decorated fields
 *     across the entire class hierarchy.
 *   - Optionally injects an `attributeChangedCallback` that mirrors HTML attribute changes to
 *     their corresponding `@observe`-decorated fields, and vice versa.
 *
 * @param {string} className - The class name, used as the registry key and to infer the tag name.
 * @param {string} [elementName] - The custom element tag name. Inferred as the kebab-case of
 * `className` if omitted (e.g. `"MyEl"` → `"my-el"`).
 * @param {DefineOptions} [options] - Configuration options. See {@link DefineOptions}.
 *
 * @example
 * ```ts
 * @define("MyEl")           // tag inferred as "my-el"
 * class MyEl extends TurboElement { ... }
 *
 * @define("MyEl", "my-el") // explicit tag name
 * class MyEl extends TurboElement { ... }
 *
 * @define("MyModel")        // non-element: only registered in TurboDom registry
 * class MyModel extends TurboModel { ... }
 * ```
 */
function define(className: string, elementName?: string, options?: DefineOptions): any;

/**
 * @function define
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Imperative equivalent of the `@define` decorator. Applies identical registration
 * and setup logic without requiring decorator syntax — useful for dynamically registering classes
 * at runtime, or in build environments where class decorators cause unwanted output transformations.
 *
 * When the class extends a DOM `Element`, it:
 * - Registers it with the browser's `customElements` registry.
 * - Stores the tag name as a static `tagName` property.
 * - Adds the tag name as a CSS class to all instances.
 * - Wraps the static `create()` method to automatically inject the tag.
 * - Publishes a live `observedAttributes` getter across the class hierarchy.
 * - Optionally injects an `attributeChangedCallback` attribute bridge.
 *
 * For all classes (element or not), it registers the class in the registry by {@link RegistryCategory}.
 *
 * @param {Type} Base - The class to register.
 * @param {string} [elementName] - The custom element tag name. Inferred as the kebab-case of
 * `className` if omitted.
 * @param {string} [className] - The class name, used as the registry key. Inferred from
 * `Base.name` if omitted.
 * @param {DefineOptions} [options] - Configuration options. See {@link DefineOptions}.
 * @returns {Type} The class, unchanged, after all setup has been applied.
 *
 * @example
 * ```ts
 * class MyEl extends TurboElement { ... }
 * define(MyEl);                    // className → "MyEl", tag → "my-el"
 * define(MyEl, "my-el");           // explicit tag, className inferred
 * define(MyEl, "my-el", "MyEl");   // both explicit
 *
 * class MyModel extends TurboModel { ... }
 * define(MyModel, undefined, "MyModel"); // non-element, registry only
 * ```
 */
function define<Type extends new (...args: any[]) => any>(
    Base: Type, elementName?: string, className?: string, options?: DefineOptions): Type;
function define(...args: any[]): any {
    if (typeof args[0] === "function") {
        let [Base, elementName, className, options] = args;
        if (!className) className = Base?.name;
        if (!elementName) elementName = camelToKebabCase(className);
        return applyDefine(Base, className, elementName, options);
    }
    let [className, elementName, options] = args;
    return function (Base: any, context: ClassDecoratorContext) {
        if (!className) className = context.name ?? Base?.constructor.name;
        if (!elementName) elementName = camelToKebabCase(className);
        return applyDefine(Base, className, elementName, options);
    };
}

function applyDefine<T extends { new(...args: any[]): HTMLElement }>(
    Base: T,
    className?: string,
    elementName?: string,
    options: DefineOptions = {injectAttributeBridge: true},
): T {
    const prototype = Base.prototype as HTMLElement;
    utils.register(Base, className, prototype instanceof Element ? elementName : undefined);
    if (!(prototype instanceof Element)) return Base;

    if (elementName) utils.prototype(prototype).name = elementName;
    Object.defineProperty(Base, "tagName", {
        configurable: true,
        enumerable: false,
        writable: false,
        value: elementName
    });

    if (typeof Base["create"] === "function" && !utils.prototype(Base.prototype).wrappedCreate) {
        utils.prototype(Base.prototype).wrappedCreate = true;
        const originalCreate = Base["create"];
        Object.defineProperty(Base, "create", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: function (this: any, properties: TurboElementProperties = {}) {
                turbo(properties).applyDefaults({tag: elementName, ...(this.defaultProperties ?? {})});
                return originalCreate.call(this, properties);
            }
        });
    }

    Object.defineProperty(Base, "observedAttributes", {
        configurable: true,
        enumerable: false,
        get: function (this: any) {
            const combined = new Set<string>();
            let constructor: any = this;
            while (constructor && constructor !== Function.prototype) {
                const set = constructor[Symbol.metadata]?.observedAttributes as Set<string>;
                if (set) for (const entry of set) combined.add(entry);
                constructor = Object.getPrototypeOf(constructor);
            }
            return Array.from(combined);
        },
    });

    if (options.injectAttributeBridge !== false && !utils.skipAttributeChangedCallback(prototype)) {
        utils.prototype(prototype).setupAttributeChangedCallback = true;

        const wrapper = function (name: string, oldValue?: string, newValue?: string) {
            getSuperMethod(this, "attributeChangedCallback", wrapper)?.call(this, name, oldValue, newValue);
            if (newValue === oldValue) return;
            if (utils.data(this).attributeBridgePass) return;

            const property = kebabToCamelCase(name);
            if (!(property in this)) return;

            try {
                utils.data(this).attributeBridgePass = true;
                this[property] = newValue === null ? undefined : parse(newValue);
            } finally {
                utils.data(this).attributeBridgePass = false;
            }
        };

        Object.defineProperty(prototype, "attributeChangedCallback", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: wrapper
        });
    }

    if (!utils.skipConnectedCallback(prototype)) {
        utils.prototype(prototype).setupConnectedCallback = true;

        const wrapper = function () {
            getSuperMethod(this, "connectedCallback", wrapper)?.call(this);
            if (!(this instanceof HTMLElement)) return;

            for (const attribute of this.constructor.observedAttributes ?? []) {
                const value = this[kebabToCamelCase(attribute)];
                if (value === undefined) continue;
                const stringValue = stringify(value);
                if (this.getAttribute(attribute) !== stringValue) this.setAttribute(attribute, stringValue);
            }

            utils.getNamesOfPrototypeChain(Object.getPrototypeOf(this)).forEach(name => this.classList?.add(name));
        };

        Object.defineProperty(prototype, "connectedCallback", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: wrapper,
        });
    }

    if (elementName && !customElements.get(elementName)) customElements.define(elementName, Base);
    return Base;
}

/**
 * @function findRegistered
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Finds a registered entry by name, optionally scoped to a specific category.
 * If no category is provided, searches across all categories and returns the first match.
 * @param {string} name - The registered name to search for.
 * @param {RegistryCategory} [category] - The category to scope the search to. Searches all categories if omitted.
 * @returns {RegistryEntry} The matching registry entry, or `undefined` if not found.
 */
function findRegistered(name: string, category?: RegistryCategory): RegistryEntry {
    if (category) return utils.registry.get(category)?.get(name);
    for (const map of utils.registry.values()) {
        const entry = map.get(name);
        if (entry) return entry;
    }
    return undefined;
}

/**
 * @function getRegisteredByCategories
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Returns all registered entries across one or more specified categories.
 * @param {...RegistryCategory[]} categories - The categories to retrieve entries from.
 * @returns {RegistryEntry[]} An array of all registry entries in the specified categories.
 */
function getRegisteredByCategories(...categories: RegistryCategory[]): RegistryEntry[] {
    return categories.flatMap(category => Array.from(utils.registry.get(category)?.values() ?? []));
}

/**
 * @function getAllRegistered
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Returns all registered entries across every category in the registry.
 * @returns {RegistryEntry[]} An array of all registry entries.
 */
function getAllRegistered(): RegistryEntry[] {
    return Array.from(utils.registry.values()).flatMap(map => Array.from(map.values()));
}

/**
 * @function getRegisteredMvc
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Returns all registered entries belonging to MVC-related categories:
 * `TurboController`, `TurboEmitter`, `TurboHandler`, `TurboInteractor`, `TurboModel`,
 * `TurboSubstrate`, `TurboTool`, and `TurboView`.
 * @returns {RegistryEntry[]} An array of all MVC registry entries.
 */
function getRegisteredMvc(): RegistryEntry[] {
    return getRegisteredByCategories(RegistryCategory.TurboController, RegistryCategory.TurboEmitter,
        RegistryCategory.TurboHandler, RegistryCategory.TurboInteractor, RegistryCategory.TurboModel,
        RegistryCategory.TurboSubstrate, RegistryCategory.TurboTool, RegistryCategory.TurboView);
}

/**
 * @function getRegisteredElements
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Returns all registered entries belonging to element-related categories:
 * `TurboElement`, `TurboProxiedElement`, `Element`, `HTMLElement`, `SVGElement`, and `MathMLElement`.
 * @returns {RegistryEntry[]} An array of all element registry entries.
 */
function getRegisteredElements(): RegistryEntry[] {
    return getRegisteredByCategories(RegistryCategory.TurboElement, RegistryCategory.TurboProxiedElement,
        RegistryCategory.Element, RegistryCategory.HTMLElement, RegistryCategory.SVGElement,
        RegistryCategory.MathMLElement);
}

/**
 * @function addRegistryCategory
 * @group Decorators
 * @category Registry
 *
 * @description Associates a class constructor with a {@link RegistryCategory} in the TurboDom registry's
 * category inference map. When {@link define} is called on a subclass, it walks the prototype chain and
 * uses this map to determine the appropriate category without requiring direct imports of the base classes
 * (which would cause circular dependencies).
 *
 * This should be called once per base class, after its definition, by the TurboDom internals.
 * User-defined subclasses do not need to call this — category inference propagates automatically
 * through the prototype chain.
 *
 * @param {new (...args: any[]) => object} type - The base class constructor to associate with a category.
 * @param {RegistryCategory} [category] - The category to associate with the class. Defaults to the
 * class name if omitted, which is useful when the class name matches a {@link RegistryCategory} value.
 *
 * @example
 * ```ts
 * // At the bottom of turboModel.ts, after class definition:
 * addRegistryCategory(TurboModel, RegistryCategory.TurboModel);
 *
 * // Later, when a subclass is defined:
 * class MyModel extends TurboModel { ... }
 * define(MyModel, "MyModel"); // infers RegistryCategory.TurboModel automatically
 * ```
 */
function addRegistryCategory(type: new (...args: any[]) => object, category?: RegistryCategory) {
    utils.setCategory(type, category ?? type.name);
}

export {
    define,
    addRegistryCategory,
    getRegisteredByCategories,
    getAllRegistered,
    getRegisteredElements,
    getRegisteredMvc,
    findRegistered
};