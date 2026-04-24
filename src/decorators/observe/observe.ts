import {camelToKebabCase, stringify} from "../../utils/dataManipulation/string";
import {getFirstDescriptorInChain, getFirstPrototypeInChainWith} from "../../utils/dataManipulation/prototype";
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
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Stage-3 decorator for fields, getters, setters, and accessors that reflects a property to an HTML
 * attribute. So when the value of the property changes, it is reflected in the element's HTML attributes.
 * It also records the attribute name into the class's `observedAttributed` to listen for changes on the HTML.
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
): any;
/**
 * @function observe
 * @group Decorators
 * @category Registry, Attributes & DOM
 *
 * @description Imperatively applies the same attribute-reflection logic as the `@observe` decorator,
 * without requiring decorator syntax. Useful for dynamically observing properties at runtime,
 * or in environments where decorators are not available.
 *
 * It:
 * - Reflects the property value to its corresponding HTML attribute (in kebab-case) whenever the
 *   property changes.
 * - Records the attribute name into the class's `observedAttributes` so the browser fires
 *   `attributeChangedCallback` when the attribute changes in HTML.
 *
 * @param {object} host - The object or prototype to apply the observation to.
 * @param {string} key - The property key to observe.
 *
 * @example
 * ```ts
 * class MyEl extends HTMLElement {
 *     fieldName: string = "hello";
 * }
 * observe(MyEl.prototype, "fieldName");
 * define(MyEl); // name inferred as "my-el"
 * ```
 *
 * Leads to:
 * ```html
 * <my-el field-name="hello"></my-el>
 * ```
 */
function observe(host: object, key: string): void;
function observe(...args: any[]): any {
    if (typeof args[0] === "object" && typeof args[1] === "string") {
        const [host, key] = args;
        const descriptor = getFirstDescriptorInChain(host, key) ?? {};
        const {read, write} = makeReadWrite(
            Symbol(`__observed_${key}`),
            camelToKebabCase(key),
            descriptor.get,
            descriptor.set
        );
        applyDescriptor(host, key, read, write, descriptor?.enumerable ?? true);
        return;
    }

    const [value, context] = args;
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

        let customGetter: (this: any) => any;
        let customSetter: (this: any, value: any) => void;

        if (kind === "field" || kind === "accessor") {
            try { this[backing] = this[name]; } catch {}

            const accessor = value as {get?: (this: any) => any; set?: (this: any, v: any) => void};
            if (accessor?.get) customGetter = accessor.get;
            if (accessor?.set) customSetter = accessor.set;

            const descriptor = getFirstDescriptorInChain(this, key);
            if (descriptor?.get) customGetter = descriptor.get;
            if (descriptor?.set) customSetter = descriptor.set;

            const {read, write} = makeReadWrite(backing, attribute, customGetter, customSetter);
            applyDescriptor(this, key, read, write, descriptor?.enumerable ?? true);

        } else if (kind === "getter" || kind === "setter") {
            const installed = utils.constructorData(prototype).installed;
            if (installed.get(key)) return;
            installed.set(key, true);

            const descriptor = getFirstDescriptorInChain(prototype, key) ?? {};
            if (typeof descriptor.get === "function") customGetter = descriptor.get;
            if (typeof descriptor.set === "function") customSetter = descriptor.set;

            const {read, write} = makeReadWrite(backing, attribute, customGetter, customSetter);
            applyDescriptor(prototype, key, read, write, !!descriptor?.enumerable, true);
        }
    });
}

function makeReadWrite(
    backing: symbol,
    attribute: string,
    customGetter?: (this: any) => any,
    customSetter?: (this: any, value: any) => void
) {
    const read = function (this: any) {
        return customGetter ? customGetter.call(this) : this[backing];
    };
    const write = function (this: any, value: any) {
        const previous = this[backing];
        if (previous === value) return;
        if (customSetter) customSetter.call(this, value);
        else this[backing] = value;
        this.setAttribute?.(attribute, stringify(this[backing]));
    };
    return {read, write};
}

function applyDescriptor(
    target: any,
    key: string,
    read: (this: any) => any,
    write: (this: any, value: any) => void,
    enumerable: boolean,
    bindToThis: boolean = false
) {
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable,
        get: bindToThis ? function (this: any) { return read.call(this); } : () => read.call(target),
        set: bindToThis ? function (this: any, v: any) { write.call(this, v); } : (v: any) => write.call(target, v),
    });
}

export {observe};