import {camelToKebabCase, stringify} from "../utils/dataManipulation/stringManipulation";

// https://github.com/microsoft/TypeScript/issues/53461

declare global { interface SymbolConstructor {metadata: symbol} }
if (!("metadata" in Symbol)) {
    Object.defineProperty(Symbol, "metadata", {
        value: (Symbol as any).for("Symbol.metadata"),
        writable: false, enumerable: false, configurable: true,
    });
}

/** * @description Member decorator for fields or accessors that reflects a property to an HTML attribute. * Also records the attribute name into class metadata so @useObservedAttributes() can expose it. * @param {unknown} value - Optional explicit attribute name. Defaults to camelCase → kebab-case. * @param context */
function observe<Type extends object, Value>(
    value:
        | ((initial: Value) => Value)
        | ((this: Type) => Value)
        | ((this: Type, v: Value) => void) | { get?: (this: Type) => Value; set?: (this: Type, value: Value) => void },
    context:
        | ClassFieldDecoratorContext<Type, Value>
        | ClassGetterDecoratorContext<Type, Value>
        | ClassSetterDecoratorContext<Type, Value>
        | ClassAccessorDecoratorContext<Type, Value>
): any {
    const propName = String(context.name);
    const attr = camelToKebabCase(propName);

    if (context.metadata) {
        const curList = context.metadata.observedAttributes as Set<string> | undefined;
        if (!Object.prototype.hasOwnProperty.call(context.metadata, "observedAttributes"))
            context.metadata.observedAttributes = new Set(curList);
        (context.metadata.observedAttributes as Set<string>).add(attr);
    }

    const backing = Symbol(`__observed_${propName}`);

    if (context.kind === "getter") return generateGetter(value as any, backing);
    if (context.kind === "setter") return generateSetter(value as any, backing, propName, attr);
    if (context.kind === "accessor") return {
        get(this: any) {return generateGetter((value as any)?.get, backing).call(this)},
        set(this: any, v: any) {generateSetter((value as any)?.set, backing, propName, attr).call(this, v)}
    };
    if (context.kind === "field") {
        const init = value as (initial: unknown) => unknown;
        context.addInitializer(function () {
            const hadOwn = Object.prototype.hasOwnProperty.call(this, propName);
            const initial = hadOwn ? this[propName] : undefined;
            Object.defineProperty(this, propName, {
                configurable: true,
                enumerable: true,
                get: function () { return this[backing]; },
                set: function (nv: any) {
                    if (this[backing] === nv) return;
                    this[backing] = nv;
                    this.setAttribute?.(attr, stringify(nv));
                },
            });
            if (hadOwn) (this as any)[propName] = initial;
        });
        return (value: unknown) => (typeof init === "function" ? init(value) : value);
    }
}

function generateGetter<T extends object, V>(getter: (this: T) => V, backingField: symbol) {
    return getter ?? function (this: any) { return this[backingField]; };
}

function generateSetter<T extends object, V>(setter: (this: T, v: V) => void, backingField: symbol, propName: string, attr: string) {
    return function (this: any, value: any) {
        const prev = this[propName];
        if (prev === value) return;
        if (setter) setter.call(this, value); else this[backingField] = value;
        this.setAttribute?.(attr, stringify(this[propName]));
    }
}

export {observe};