import {camelToKebabCase, kebabToCamelCase, parse} from "../../utils/dataManipulation/stringManipulation";
import {DefineOptions} from "./define.types";

/**
 * Class decorator factory.
 * - Registers the element with customElements (name inferred if omitted).
 * - Publishes a *live* `observedAttributes` getter that merges attributes from
 *   this class and its ancestors, using metadata collected by your member decorator(s).
 *
 * Usage:
 *   @define()            // name comes from ClassName -> class-name
 *   class MyEl extends HTMLElement { ... }
 *
 *   @define("my-el")     // explicit name
 *   class MyEl extends HTMLElement { ... }
 */
function define(elementName?: string, options: DefineOptions = { injectAttributeBridge: true }) {
    return function <T extends { new(...args: any[]): HTMLElement }>(constructor: T, context: ClassDecoratorContext<T>) {
        Object.defineProperty(constructor, "observedAttributes", {
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
            const prototype = constructor.prototype as HTMLElement;

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

        const name = elementName ?? camelToKebabCase(constructor.name);
        if (name && !customElements.get(name)) customElements.define(name, constructor);

        return constructor;
    };
}

export {define};