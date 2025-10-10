import {AutoOptions} from "./auto.types";
import {AutoUtils} from "./auto.utils";
import {
    getFirstDescriptorInChain,
    getFirstPrototypeInChainWith
} from "../../utils/dataManipulation/prototypeManipulation";
import {isNull, isUndefined} from "../../utils/dataManipulation/misc";

/**
 * @internal
 */
const utils = new AutoUtils();

/**
 * @decorator
 * @function auto
 * @description Stage-3 decorator that augments fields, getters, setters, and accessors. Useful to quickly create a setter
 * and only define additional functionality on set. The decorator takes an optional object as parameter to configure
 * it, allowing you to, among other things:
 * - Preprocess the value when it is set,
 * - Specify callbacks to call before/after the value is set,
 * - Defining a default value to return instead of `undefined` when calling the getter, and
 * - Fire the setter when the underlying value is `undefined`.
 *
 * *Note: If you want to chain decorators, place @auto closest to the property to ensure it runs first and sets
 * up the accessor for other decorators.*
 *
 * @param {AutoOptions} [options] - Options object to define custom behaviors.
 *
 * @example
 * ```ts
 * @auto() public set color(value: string) {
 *    this.style.backgroundColor = value;
 * }
 * ```
 *Is equivalent to:
 * ```ts
 * private _color: string;
 * public get color(): string {
 *    return this._color;
 * }
 *
 * public set color(value: string) {
 *    this._color = value;
 *    this.style.backgroundColor = value;
 * }
 * ```
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
            const prototype = isStatic ? this : getFirstPrototypeInChainWith(this, key);

            if (isUndefined(this[backing])) {
                let initialValue = kind === "field" ? value : undefined;
                if (isUndefined(initialValue)) {
                    if (options.initialValue) initialValue = options.initialValue;
                    else if (options.initialValueCallback) initialValue = options.initialValueCallback.call(this);
                }
                if (options.preprocessValue) initialValue = options.preprocessValue.call(this, initialValue);
                this[backing] = initialValue;
            }

            let customGetter: (this: any) => Value;
            let customSetter: (this: any, value: Value) => void;

            const write = function (this: any, value: Value): void {
                let next = options?.preprocessValue ? options.preprocessValue.call(this, value) : value;
                if ((options.cancelIfUnchanged ?? true) && this[backing] === next) return;
                options.callBefore?.call(this, value);
                if (options.executeSetterBeforeStoring && customSetter) customSetter.call(this, next);
                this[backing] = next;
                if (!options.executeSetterBeforeStoring && customSetter) customSetter.call(this, next);
                options.callAfter?.call(this, value);
            };

            const baseRead = function (this: any) {
                if (customGetter && options?.returnDefinedGetterValue) return customGetter.call(this);
                let value = this[backing];
                if (isNull(value) || isUndefined(value)) {
                    if (options.defaultValue) this[backing] = options.defaultValue;
                    else if (options.defaultValueCallback) this[backing] = options.defaultValueCallback.call(this);
                }
                return this[backing];
            }

            const read = function (this: any) {
                let value = baseRead.call(this);
                if (value === undefined && options.setIfUndefined) {
                    write.call(this, value);
                    return baseRead.call(this);
                }
                return value;
            };

            if (kind === "field" || kind === "accessor") {
                const accessor = value as {get?: (this: any) => Value; set?: (this: any, v: Value) => void};
                if (accessor?.get) customGetter = accessor.get;
                if (accessor?.set) customSetter = accessor.set;

                const descriptor = getFirstDescriptorInChain(this, key);
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
}

export {auto};