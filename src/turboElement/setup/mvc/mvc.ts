import {MvcFields} from "../../../turboFunctions/mvc/mvc";
import {turbo} from "../../../turboFunctions/turboFunctions";

/**
 * Define MVC-style accessors on a class prototype via Object.defineProperty.
 * Adds: view, model, emitter, operators, handlers, interactors, tools, enforcers,
 * data, dataId, dataIndex, dataSize, and all add/get/remove methods.
 */
export function defineMvcAccessors<Type extends new (...args: any[]) => any>(constructor: Type) {
    const prototype = constructor.prototype;

    // Fields — proxy through turbo(this)
    [...MvcFields, "data", "dataId", "dataIndex"].forEach(fieldName => {
        Object.defineProperty(prototype, fieldName, {
            get() { return turbo(this)[fieldName]; },
            set(value) { turbo(this)[fieldName] = value; },
            configurable: true,
            enumerable: true,
        });
    });

    Object.defineProperty(prototype, "dataSize", {
        get() { return turbo(this).dataSize; },
        configurable: true,
        enumerable: true,
    });
}