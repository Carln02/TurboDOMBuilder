import {camelToKebabCase, kebabToCamelCase, parse, stringify} from "../../utils/dataManipulation/stringManipulation";
import {DefineOptions} from "./define.types";
import {DefineDecoratorUtils} from "./define.utils";
import {getSuperMethod} from "../../utils/dataManipulation/prototypeManipulation";

const utils = new DefineDecoratorUtils();

/**
 * @decorator
 * @function define
 * @description Stage-3 class decorator factory. It:
 * - Registers the element with customElements (name inferred if omitted).
 * - Adds the defined (or inferred) customElement name as a class to all instances of this class (and the class's children).
 * - Publishes a *live* `observedAttributes` getter that lists all attributes associated with `@observed` fields in
 *   this class and its ancestors.
 * - Sets up an `attributeChangedCallback()` function to mirror changes from attributes to their associated
 * `@observed` fields.
 *
 * @param {string} [elementName] - The name of the custom HTML element. It is inferred if omitted.
 * @param {DefineOptions} [options] - Custom {@link DefineOptions} options object.
 *
 * @example
 * ```ts
 * @define() // name will be "my-el" (kebab case of class name).
 * class MyEl extends HTMLElement { ... }
 *
 * @define("my-el") // explicit name
 * class MyEl extends HTMLElement { ... }
 * ````
 */
function define(elementName?: string, options: DefineOptions = {injectAttributeBridge: true}) {
    return function <T extends { new(...args: any[]): HTMLElement }>(Base: T, context: ClassDecoratorContext<T>) {
        const name = elementName ?? camelToKebabCase(context.name);
        const prototype = Base.prototype as HTMLElement;
        if (name) utils.prototype(prototype).name = name;

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

        context.addInitializer(function () {
            if (name && !customElements.get(name)) customElements.define(name, Base);
        });

        return Base;
    };
}

export {define};