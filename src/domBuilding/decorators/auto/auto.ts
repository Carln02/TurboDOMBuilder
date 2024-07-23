import {AutoOptions} from "./auto.types";

/**
 * @function auto
 * @description A decorator that automatically creates a getter or setter if only one of them is defined. Works only
 * with public fields.
 * @param {AutoOptions} [options] - Optional object to configure the decorator.
 * @returns {Function} - The updated property descriptor.
 * @template Type
 */
function auto<Type = any>(options?: AutoOptions): Function {
    return function (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<Type>)
        : TypedPropertyDescriptor<Type> {

        const originalGetter = descriptor?.get;
        const originalSetter = descriptor?.set;

        if (!originalSetter && !(options?.callBefore)) return descriptor;

        const hiddenPropertyKey = Symbol(`__${String(propertyKey)}__`);

        const newGetter = function () {
            if (originalGetter) {
                const value = originalGetter.call(this);
                if (options?.returnDefinedGetterValue) return value;
            }
            return this[hiddenPropertyKey];
        };

        const newSetter = function (value: Type) {
            if (options?.cancelIfUnchanged != false && value == this[hiddenPropertyKey]) return;
            if (options?.callBefore) value = (function () {
                return options.callBefore.call(this, value);
            }).call(this);

            this[hiddenPropertyKey] = value;
            if (originalSetter) originalSetter.call(this, value);
        };

        if (descriptor) {
            if (options?.returnDefinedGetterValue || !originalGetter) descriptor.get = newGetter;
            descriptor.set = newSetter;
        } else {
            Object.defineProperty(target, propertyKey, {
                get: newGetter,
                set: newSetter,
                enumerable: true,
                configurable: true
            });
        }

        return descriptor;
    };
}

export {auto};