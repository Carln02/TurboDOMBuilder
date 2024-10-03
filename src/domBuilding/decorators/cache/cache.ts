import {CacheOptions} from "./cache.types";
import {callOncePerInstance} from "../callOnce";

/**
 * @function cache
 * @description Decorator for caching the result of a method or getter.
 * @param {CacheOptions} [options={}] - Configuration options for the cache.
 * @returns {Function} - A decorator function.
 */
function cache(options: CacheOptions = {}): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor =
        Object.getOwnPropertyDescriptor(target, propertyKey)) {
        const originalMethod = descriptor?.value || descriptor?.get;
        if (!originalMethod) throw new Error(`No method ${propertyKey} found on target`);

        const isGetter = !!descriptor.get;

        const cacheKey = Symbol(`__cache__${propertyKey}`);
        const setupKey = Symbol(`__cache__setup__${propertyKey}`);

        const timeoutIds: NodeJS.Timeout[] = [];

        const deleteCallback = function (this: any, b: boolean = true) {
            deleteCacheEntry.call(this, isGetter, cacheKey, timeoutIds, b);
        };

        const setupOptionsCallback = callOncePerInstance(function (instance: any) {
            setupOptions(instance, propertyKey, options, target, deleteCallback);
        }, setupKey);

        if (isGetter) {
            descriptor.get = function () {
                const instance = this || target;

                if (!instance[cacheKey]) {
                    setupOptionsCallback.call(instance, instance);
                    instance[cacheKey] = originalMethod.apply(instance);
                    if (options.timeout) timeoutIds.push(setTimeout(() => deleteCallback.call(instance), options.timeout));
                    if (options.clearOnNextFrame) requestAnimationFrame(() => deleteCallback.call(instance));
                }
                return instance[cacheKey];
            };
        } else {
            descriptor.value = function (...args: any[]) {
                const instance = this || target;

                if (!instance[cacheKey]) {
                    instance[cacheKey] = new Map();
                    setupOptionsCallback.call(instance, instance);
                }

                const key = args.length == 0 ? "__no_args__" : JSON.stringify(
                    args.map(value => {
                        if (typeof value == "function") return `function:${value.name}`;
                        if (typeof value == "object" && value != null) return JSON.stringify(Object.entries(value).sort());
                        return value == undefined ? "undefined" : value;
                    })
                );

                if (instance[cacheKey].has(key)) {
                    return instance[cacheKey].get(key);
                } else {
                    const result = originalMethod.apply(instance, args);
                    instance[cacheKey].set(key, result);

                    if (options.timeout) timeoutIds.push(setTimeout(() => instance[cacheKey].delete(key), options.timeout));
                    if (options.clearOnNextFrame) requestAnimationFrame(() => deleteCallback.call(instance));
                    return result;
                }
            };
        }
    };
}

/**
 * @function deleteCacheEntry
 * @description Deletes the cache entry for the given property.
 * @param {boolean} isGetter - Whether the cache is for a getter.
 * @param {symbol} cacheKey - The cache key.
 * @param {NodeJS.Timeout[]} timeoutIds - List of timeout IDs.
 * @param {boolean} [b] - Whether to proceed with the deletion.
 */
function deleteCacheEntry(this: any, isGetter: boolean, cacheKey: symbol, timeoutIds: NodeJS.Timeout[], b: boolean) {
    if (!b) return;
    if (isGetter) delete this[cacheKey];
    else this[cacheKey]?.clear();

    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutIds.splice(0, timeoutIds.length);
}

/**
 * @function setupOptions
 * @description Sets up the cache invalidation options.
 * @param {any} instance - The instance of the class.
 * @param {string} propertyKey - The property key.
 * @param {CacheOptions} options - The cache options.
 * @param {any} target - The target class.
 * @param {Function} deleteCallback - The callback to delete the cache.
 */
function setupOptions(instance: any, propertyKey: string, options: CacheOptions, target: any, deleteCallback: Function) {
    //Handle onEvent
    if (options.onEvent) {
        const eventTarget = typeof target.addEventListener == "function" ? target : document;
        const eventNames = Array.isArray(options.onEvent)
            ? options.onEvent
            : options.onEvent.split(" ");

        eventNames.forEach(eventName =>
            eventTarget.addEventListener(eventName, () => deleteCallback.call(instance)));
    }

    //Handle onFieldChange
    if (options.onFieldChange) {
        const observedFields = Array.isArray(options.onFieldChange)
            ? options.onFieldChange
            : [options.onFieldChange];

        observedFields.forEach(fieldOrFunction => {
            if (typeof fieldOrFunction == "string") fieldOrFunction.split(" ")
                .forEach(entry => clearCacheOnFieldChange(instance, entry, propertyKey, deleteCallback));
            else clearCacheOnFieldChange(instance, fieldOrFunction.name, propertyKey, deleteCallback);
        });
    }

    //Handle onCallback
    if (options.onCallback) {
        const intervalId = setInterval(() => {
            const result = options.onCallback!.call(instance);
            if (result instanceof Promise) result.then(value => deleteCallback.call(instance, value));
            else deleteCallback.call(instance, result);
        }, options.onCallbackFrequency || 50);

        if (typeof target.addEventListener == "function") {
            target.addEventListener("destroy", () => clearInterval(intervalId));
        }
    }
}

/**
 * @function clearCacheOnFieldChange
 * @description Clears the cache when the specified field or method is changed or called.
 * @param {any} instance - The instance of the class.
 * @param {string} fieldName - The field name.
 * @param {string} propertyKey - The property key.
 * @param {Function} deleteCallback - The callback to delete the cache.
 */
function clearCacheOnFieldChange(instance: any, fieldName: string, propertyKey: string, deleteCallback: Function) {
    const originalField = instance[fieldName];
    if (originalField == undefined) {
        console.warn(`No method ${propertyKey} found on target. It will be ignored.`);
        return;
    }

    if (typeof originalField == "function") {
        instance[fieldName] = function (...args: any[]) {
            deleteCallback.call(instance);
            return originalField.apply(instance, args);
        };
    } else {
        const originalFieldDescriptor = Object.getOwnPropertyDescriptor(instance, fieldName);
        console.log(originalFieldDescriptor);

        Object.defineProperty(instance, fieldName, {
            get() {
                return originalFieldDescriptor?.get?.call(instance) || instance[originalField];
            },
            set(newValue) {
                deleteCallback.call(instance);
                if (originalFieldDescriptor?.set) originalFieldDescriptor.set.call(instance, newValue);
                else instance[originalField] = newValue;
            },
            configurable: true,
            enumerable: true
        });
    }
}

/**
 * @function clearCache
 * @description Clears all cache entries for the given instance.
 * @param {any} instance - The instance to clear the cache from.
 */
function clearCache(instance: any): void {
    for (const key of Object.getOwnPropertySymbols(instance)) {
        if (key.toString().startsWith("Symbol(__cache__)")) delete instance[key];
    }
}

/**
 * @function clearCacheEntry
 * @description Clears the cache entry for the provided field in the given instance.
 * @param {any} instance - The instance to clear the cache from.
 * @param {string | Function} field - The name of the field or the field itself (if it is a method) to clear.
 */
function clearCacheEntry(instance: any, field: string | Function): void {
    const fieldName = typeof field === "function" ? field.name : field;
    const cacheKey = Object.getOwnPropertySymbols(instance)
        .find(symbol => symbol.toString() === `Symbol(__cache__${fieldName})`);

    if (cacheKey && instance[cacheKey]) delete instance[cacheKey];
}

export {cache, clearCache, clearCacheEntry};