import {AutoOptions} from "./auto.types";
import {AutoUtils} from "./auto.utils";
import {isNull, isUndefined} from "../../utils/dataManipulation/misc";
import {
    getFirstDescriptorInChain,
    getFirstPrototypeInChainWith,
    getSuperDescriptor
} from "../../utils/dataManipulation/prototype";

const utils = new AutoUtils();

/**
 * @decorator
 * @function auto
 * @group Decorators
 * @category Augmentation
 *
 * @description Stage-3 decorator that augments fields, getters, setters, and accessors. Useful to quickly create a setter
 * and only define additional functionality on set. The decorator takes an optional object as parameter to configure
 * it, allowing you to, among other things:
 * - Preprocess the value when it is set,
 * - Specify callbacks to call before/after the value is set,
 * - Define a default value to return instead of `undefined` when calling the getter, and
 * - Fire the setter when the underlying value is `undefined`.
 *
 * *Note: If you want to chain decorators, place `@auto` closest to the property to ensure it runs first and sets
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
            const superDescriptor = getSuperDescriptor(this, key);

            let customGetter: (this: any) => Value;
            let customSetter: (this: any, value: Value) => void;

            const baseRead = function (this: any) {
                if (customGetter && options?.returnDefinedGetterValue) return customGetter.call(this);
                if (options.override && superDescriptor?.get) return superDescriptor.get.call(this);
                return this[backing];
            }

            const baseWrite = function (this: any, value: any) {
                if (options.override && superDescriptor?.set) superDescriptor.set.call(this, value);
                this[backing] = value;
            }

            let readFlag = false;
            const read = function (this: any) {
                let value = baseRead.call(this);
                if (readFlag) return value;
                readFlag = true;
                if (!options.returnDefinedGetterValue && isUndefined(value)) {
                    if (options.defaultValue) value = options.defaultValue;
                    else if (options.defaultValueCallback) value = options.defaultValueCallback.call(this);
                    if (options.setIfUndefined || options.defaultValue || options.defaultValueCallback) {
                        write.call(this, value);
                        value = baseRead.call(this);
                    }
                }
                readFlag = false;
                return value;
            };

            let writeFlag = false;
            const write = function (this: any, value: Value): void {
                if (writeFlag) return baseWrite.call(this, value);
                writeFlag = true;

                options.callBefore?.call(this, value);
                let next = options?.preprocessValue ? options.preprocessValue.call(this, value) : value;
                if ((options.cancelIfUnchanged ?? true) && baseRead.call(this) === next) {
                    writeFlag = false;
                    return;
                }

                if (options.executeSetterBeforeStoring && customSetter) customSetter.call(this, next);
                baseWrite.call(this, next);
                if (!options.executeSetterBeforeStoring && customSetter) customSetter.call(this, next);
                options.callAfter?.call(this, next);

                writeFlag = false;
            };

            if (isUndefined(baseRead.call(this))) {
                let initialValue: any = kind === "field" ? value : undefined;
                if (isUndefined(initialValue)) {
                    if (options.initialValue) initialValue = options.initialValue;
                    else if (options.initialValueCallback) initialValue = options.initialValueCallback.call(this);
                }
                if (!isUndefined(initialValue) && options.preprocessValue) initialValue = options.preprocessValue.call(this, initialValue);
                this[backing] = initialValue;
            }

            if (kind === "field" || kind === "accessor") {
                const accessor = value as {get?: (this: any) => Value; set?: (this: any, v: Value) => void};
                if (accessor?.get) customGetter = accessor.get;
                if (accessor?.set) customSetter = accessor.set;

                const descriptor = getFirstDescriptorInChain(this, key) ?? {enumerable: true};
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable ?? true,
                    get: () => read.call(this),
                    set: (value: Value) => write.call(this, value),
                });
            } else if (kind === "getter" || kind === "setter") {
                const installed = utils.constructorData(prototype).installed;
                if (installed.get(key)) return;
                installed.set(key, true);

                const descriptor = getFirstDescriptorInChain(prototype, key) ?? {enumerable: true};
                if (typeof descriptor.get === "function") customGetter = descriptor.get;
                if (typeof descriptor.set === "function") customSetter = descriptor.set;

                Object.defineProperty(prototype, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable ?? true,
                    get: function (this: any) {return read.call(this)},
                    set: function (this: any, value: Value) {write.call(this, value)},
                });
            }
        });
    }
}

export {auto};