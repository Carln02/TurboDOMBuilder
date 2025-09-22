import {AutoOptions} from "./auto.types";
import {AutoUtils} from "./auto.utils";

const utils = new AutoUtils();

/**
 * @function auto
 * @description Stage-3 decorator that adds the “missing half” (getter or setter) and/or
 * wraps existing ones. Works with field / getter / setter / accessor. Designed to chain
 * cleanly with `@observe`.
 *
 * Options (use `autoFactory(opts)` if you need to pass them):
 *  - cancelIfUnchanged (default: true)
 *  - callBefore?: (value) => value    (preprocess before storing/forwarding)
 *  - returnDefinedGetterValue (default: false)  (when user getter exists)
 */
function auto(options?: AutoOptions) {
    return function <Type extends object, Value>(
        value:
            | ((initial: Value) => Value)
            | ((this: Type) => Value)
            | ((this: Type, v: Value) => void)
            | {get?: (this: Type) => Value; set?: (this: Type, value: Value) => void},
        context:
            | ClassFieldDecoratorContext<Type, Value>
            | ClassGetterDecoratorContext<Type, Value>
            | ClassSetterDecoratorContext<Type, Value>
            | ClassAccessorDecoratorContext<Type, Value>
    ): any {

        if (!options) options = {};

        const {kind, name, static: isStatic} = context;
        const key = name as string;
        const backing = Symbol(`__auto_${key}`);

        context.addInitializer(function (this: any) {
            const prototype = isStatic ? this : this.constructor.prototype;

            let customGetter: (this: any) => Value;
            let customSetter: (this: any, value: Value) => void;

            const read = function (this: any) {
                if (customGetter && options?.returnDefinedGetterValue) return customGetter.call(this);
                return this[backing];
            };

            const write = function (this: any, value: Value): void {
                const next = options?.callBefore ? options.callBefore.call(this, value) : value;
                if ((options.cancelIfUnchanged ?? true) && this[backing] === next) return;
                this[backing] = next;
                if (customSetter) customSetter.call(this, next);
            };

            if (kind === "field" || kind === "accessor") {
                const accessor = value as {get?: (this: any) => Value; set?: (this: any, v: Value) => void};
                if (accessor?.get) customGetter = accessor.get;
                if (accessor?.set) customSetter = accessor.set;

                const descriptor = Object.getOwnPropertyDescriptor(this, key);
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

                const descriptor = Object.getOwnPropertyDescriptor(prototype, key) ?? {};
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
}

export {auto};