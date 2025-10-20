import {camelToKebabCase, stringify} from "../../utils/dataManipulation/stringManipulation";
import {getFirstDescriptorInChain, getFirstPrototypeInChainWith} from "../../utils/dataManipulation/prototypeManipulation";
import {ObserveUtils} from "./observe.utils";

// https://github.com/microsoft/TypeScript/issues/53461
// To make sure that metadata exists on decorator contexts.
/**
 * @internal
 */
declare global { interface SymbolConstructor {metadata: symbol} }
if (!("metadata" in Symbol)) {
    Object.defineProperty(Symbol, "metadata", {
        value: (Symbol as any).for("Symbol.metadata"),
        writable: false, enumerable: false, configurable: true,
    });
}

const utils = new ObserveUtils();

/**
 * @decorator
 * @function observe
 * @description Stage-3 decorator for fields, getters, setters, and accessors that reflects a property to an HTML
 * attribute. So when the value of the property changes, it is reflected in the element's HTML attributes.
 * It also records the attribute name into the class's`observedAttributed` to listen for changes on the HTML.
 *
 * @example
 * ```ts
 * @define()
 * class MyClass extends HTMLElement {
 *    @observe fieldName: string = "hello";
 * }
 * ```
 *
 * Leads to:
 * ```html
 * <my-class field-name="hello"></my-class>
 * ```
 *
 */
function observe<Type extends object, Value>(
    value:
        | ((initial: Value) => Value)
        | ((this: Type) => Value)
        | ((this: Type, v: Value) => void)
        | { get?: (this: Type) => Value; set?: (this: Type, value: Value) => void },
    context:
        | ClassFieldDecoratorContext<Type, Value>
        | ClassGetterDecoratorContext<Type, Value>
        | ClassSetterDecoratorContext<Type, Value>
        | ClassAccessorDecoratorContext<Type, Value>
): any {
    const {kind, name, static: isStatic} = context;
    const key = String(name);
    const attribute = camelToKebabCase(key);

    const backing = Symbol(`__observed_${key}`);

    if (context.metadata) {
        const observedAttributes = context.metadata.observedAttributes as Set<string>;
        if (!Object.prototype.hasOwnProperty.call(context.metadata, "observedAttributes"))
            context.metadata.observedAttributes = new Set(observedAttributes);
        else if (!observedAttributes) context.metadata.observedAttributes = new Set();
        (context.metadata.observedAttributes as Set<string>).add(attribute);
    }

    context.addInitializer(function (this: any) {
        const prototype = isStatic ? this : getFirstPrototypeInChainWith(this, key);

        let customGetter: (this: any) => Value;
        let customSetter: (this: any, value: Value) => void;

        if (kind === "field" || kind === "accessor") try {this[backing] = this[name]} catch {}

        const read = function (this: any) {
            return customGetter ? customGetter.call(this) : this[backing];
        };

        const write = function (this: any, value: Value): void {
            const previous = this[key];
            if (previous === value) return;
            if (customSetter) customSetter.call(this, value);
            else this[backing] = value;
            this.setAttribute?.(attribute, stringify(this[key]));
        };

        if (kind === "field" || kind === "accessor") {
            const accessor = value as {get?: (this: any) => Value; set?: (this: any, v: Value) => void};
            if (accessor?.get) customGetter = accessor.get;
            if (accessor?.set) customSetter = accessor.set;

            const descriptor = getFirstDescriptorInChain(this, key);
            if (descriptor?.get) customGetter = descriptor.get;
            if (descriptor?.set) customSetter = descriptor.set;

            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: descriptor?.enumerable ?? true,
                get: () => read.call(this),
                set: (value: Value) => write.call(this, value),
            });
        } else if (kind === "getter" || kind === "setter") {
            const installed = utils.constructorData(prototype).installed;
            if (installed.get(key)) return;
            installed.set(key, true);

            const descriptor = getFirstDescriptorInChain(prototype, key) ?? {};

            if (typeof descriptor.get === "function") customGetter = descriptor.get;
            if (typeof descriptor.set === "function") customSetter = descriptor.set;

            Object.defineProperty(prototype, key, {
                configurable: true,
                enumerable: !!descriptor?.enumerable,
                get: function (this: any) {return read.call(this)},
                set: function (this: any, value: Value) {write.call(this, value)},
            });
        }
    });
}

export {observe};