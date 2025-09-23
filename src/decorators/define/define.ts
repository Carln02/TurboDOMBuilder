import {camelToKebabCase, kebabToCamelCase, parse} from "../../utils/dataManipulation/stringManipulation";
import {DefineOptions} from "./define.types";

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
function define(elementName?: string, options: DefineOptions = { injectAttributeBridge: true }) {
    return function <T extends { new(...args: any[]): HTMLElement }>(Base: T, context: ClassDecoratorContext<T>) {
        const name = elementName ?? camelToKebabCase(Base.name);

        class Wrapped extends Base {
            constructor(...args: any[]) {
                super(...args);
                try {this.classList?.add(name)} catch {}
            }
        }

        Object.setPrototypeOf(Wrapped, Base);

        Object.defineProperty(Wrapped, "observedAttributes", {
            configurable: true,
            enumerable: false,
            get(this: any) {
                const combined = new Set<string>();
                let constructor: any = this;
                while (constructor) {
                    const set: Set<string> | undefined = context.metadata.observedAttributes as Set<string>;
                    if (set) for (const entry of set) combined.add(entry);
                    constructor = Object.getPrototypeOf(constructor);
                }
                return Array.from(combined);
            },
        });

        if (options.injectAttributeBridge !== false) {
            const prototype = Wrapped.prototype as HTMLElement;
            if (typeof prototype["attributeChangedCallback"] !== "function") {
                Object.defineProperty(prototype, "attributeChangedCallback", {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value(name: string, oldValue: string | null, newValue: string | null) {
                        if (newValue === null || newValue === oldValue) return;
                        const prop = kebabToCamelCase(name);
                        if (!(prop in this)) return;
                        try {this[prop] = parse(newValue)} catch {this[prop] = newValue}
                    },
                });
            }
        }

        if (name && !customElements.get(name)) customElements.define(name, Wrapped);
        return Wrapped;
    };
}

export {define};