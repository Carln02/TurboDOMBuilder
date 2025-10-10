import { CacheOptions } from "./cache.types";
import {cacheKeySymbolFor, initInvalidation, keyFromArgs} from "./cache.utils";

/**
 * @decorator
 * @function cache
 * @description Stage-3 cache decorator:
 *  - When used on a method, it will cache the return value per arguments.
 *  - When used on a getter, it will cache its value once per instance.
 *  - When used on an accessor, it will wrap the getter similar to a cached getter.
 *  @param {CacheOptions} [options] - Optional caching options.
 */
//TODO FIX THEN TEST ON ICON loadSvg
function cache(options: CacheOptions = {}) {
    return function<Type extends object, Value>(
        value:
            | ((this: Type, ...args: any[]) => any)
            | ((this: Type) => Value)
            | {get?: (this: Type) => Value; set?: (this: Type, value: Value) => void},
        context:
            | ClassMethodDecoratorContext<Type>
            | ClassGetterDecoratorContext<Type, Value>
            | ClassAccessorDecoratorContext<Type, Value>
    ): any {
        const {kind, name, static: isStatic} = context;
        const key = name as string;

        const cacheKey = cacheKeySymbolFor(key);
        const setupKey = Symbol(`__cache__setup__${key}`);

        const timeouts: NodeJS.Timeout[] = [];

        const deleteCallback = function (this: any, hard: boolean = true) {
            if (!hard) return;
            const slot = this[cacheKey];
            if (!slot) return;

            if (slot instanceof Map) slot.clear();
            else delete this[cacheKey];

            for (const t of timeouts) clearTimeout(t);
            timeouts.length = 0;
        };

        // one-time per-instance setup
        const ensureSetup = function (this: any) {
            if (this[setupKey]) return;
            this[setupKey] = true;
            initInvalidation(this, key, kind === "getter" || kind === "accessor", cacheKey, timeouts, options, deleteCallback.bind(this));
        };

        if (kind === "method") {
            const original = value as (...args: any[]) => any;

            context.addInitializer(function () {
                if (!this[cacheKey]) this[cacheKey] = new Map<string, any>();
            });

            return function (this: any, ...args: any[]) {
                ensureSetup.call(this);

                const map: Map<string, any> = this[cacheKey] ?? (this[cacheKey] = new Map());
                const k = keyFromArgs(args);
                if (map.has(k)) return map.get(k);

                const result = original.apply(this, args);
                map.set(k, result);

                // timeouts/RAF per-entry:
                if (options.timeout) {
                    const tid = setTimeout(() => map.delete(k), options.timeout);
                    timeouts.push(tid);
                }
                if (options.clearOnNextFrame) {
                    const raf = (typeof requestAnimationFrame === "function"
                        ? requestAnimationFrame
                        : (fn: FrameRequestCallback) => setTimeout(fn, 0)) as any;
                    raf(() => deleteCallback.call(this));
                }

                return result;
            };
        }

        // ---- GETTER -----------------------------------------------------------
        if (kind === "getter") {
            const originalGet = value as () => any;

            return function (this: any) {
                ensureSetup.call(this);

                if (this[cacheKey] === undefined) {
                    this[cacheKey] = originalGet.call(this);

                    if (options.timeout) {
                        const tid = setTimeout(() => deleteCallback.call(this), options.timeout);
                        timeouts.push(tid);
                    }
                    if (options.clearOnNextFrame) {
                        const raf = (typeof requestAnimationFrame === "function"
                            ? requestAnimationFrame
                            : (fn: FrameRequestCallback) => setTimeout(fn, 0)) as any;
                        raf(() => deleteCallback.call(this));
                    }
                }
                return this[cacheKey];
            };
        }

        // ---- ACCESSOR (wrap read path; keep set untouched) --------------------
        if (kind === "accessor") {
            const orig = value as { get?: () => any; set?: (v: any) => void };

            return {
                get(this: any) {
                    ensureSetup.call(this);

                    if (this[cacheKey] === undefined) {
                        const out = orig.get ? orig.get.call(this) : undefined;
                        this[cacheKey] = out;

                        if (options.timeout) {
                            const tid = setTimeout(() => deleteCallback.call(this), options.timeout);
                            timeouts.push(tid);
                        }
                        if (options.clearOnNextFrame) {
                            const raf = (typeof requestAnimationFrame === "function"
                                ? requestAnimationFrame
                                : (fn: FrameRequestCallback) => setTimeout(fn, 0)) as any;
                            raf(() => deleteCallback.call(this));
                        }
                    }
                    return this[cacheKey];
                },
                set(this: any, v: any) {
                    // when the underlying value changes, invalidate cache immediately
                    deleteCallback.call(this);
                    if (orig.set) orig.set.call(this, v);
                },
                init(this: any, initial: any) {
                    // keep normal accessor init behavior
                    return initial;
                },
            };
        }
    };
}

/**
 * @function clearCache
 * @description Clear *all* cache entries created by `@cache` on an instance.
 * @param {any} instance - The instance for which the cache should be cleared.
 */
function clearCache(instance: any): void {
    for (const sym of Object.getOwnPropertySymbols(instance)) {
        if (String(sym).startsWith("Symbol(__cache__")) {
            delete (instance as any)[sym];
        }
    }
}

/**
 * @function clearCacheEntry
 * @description Clear a specific cache entry for a given method, function, or getter.
 * @param {any} instance - The instance for which the cache should be cleared.
 * @param {string | Function} field - The name (or the function itself) of the field to clear.
 */
function clearCacheEntry(instance: any, field: string | Function): void {
    const name = typeof field === "function" ? field.name : field;
    const sym = Object.getOwnPropertySymbols(instance).find(
        (s) => String(s) === `Symbol(__cache__${name})`
    );
    if (sym) delete (instance as any)[sym];
}

export {cache, clearCache, clearCacheEntry};
