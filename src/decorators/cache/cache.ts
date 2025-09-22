import { CacheOptions } from "./cache.types";
import {cacheKeySymbolFor, initInvalidation, keyFromArgs} from "./cache.utils";

/**
 * Stage-3 cache decorator:
 *  - method: caches per arguments
 *  - getter: caches once per instance
 *  - accessor: wraps the getter like a cached getter (setter unchanged)
 */
function cache(options: CacheOptions = {}) {
    return function (
        value:
            | ((...args: any[]) => any) // method
            | (() => any)               // getter
            | { get?: () => any; set?: (v: any) => void }, // accessor
        ctx:
            | ClassMethodDecoratorContext
            | ClassGetterDecoratorContext
            | ClassAccessorDecoratorContext
    ): any {
        const name = String(ctx.name);
        const cacheKey = cacheKeySymbolFor(name);
        const setupKey = Symbol(`__cache__setup__${name}`);
        const timeouts: NodeJS.Timeout[] = [];

        // delete function shared by variants
        const deleteCallback = function (this: any, hard: boolean = true) {
            if (!hard) return;
            const slot = this[cacheKey];
            if (!slot) return;

            // getter: single value; method: Map
            if (slot instanceof Map) slot.clear();
            else delete this[cacheKey];

            // clear pending timers
            for (const t of timeouts) clearTimeout(t);
            timeouts.length = 0;
        };

        // one-time per-instance setup
        const ensureSetup = function (this: any) {
            if (this[setupKey]) return;
            this[setupKey] = true;
            initInvalidation(this, name, ctx.kind === "getter" || ctx.kind === "accessor", cacheKey, timeouts, options, deleteCallback.bind(this));
        };

        // ---- METHOD -----------------------------------------------------------
        if (ctx.kind === "method") {
            const original = value as (...args: any[]) => any;

            ctx.addInitializer(function () {
                // initialize storage
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
        if (ctx.kind === "getter") {
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
        if (ctx.kind === "accessor") {
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

        // fields not supported by the original decorator; ignore
    };
}

/**
 * Clear *all* cache entries on an instance created by @cache
 * (we scan for symbols named Symbol(__cache__...)).
 */
function clearCache(instance: any): void {
    for (const sym of Object.getOwnPropertySymbols(instance)) {
        if (String(sym).startsWith("Symbol(__cache__")) {
            delete (instance as any)[sym];
        }
    }
}

/**
 * Clear a specific cache entry for a given method/getter name (or function).
 */
function clearCacheEntry(instance: any, field: string | Function): void {
    const name = typeof field === "function" ? field.name : field;
    const sym = Object.getOwnPropertySymbols(instance).find(
        (s) => String(s) === `Symbol(__cache__${name})`
    );
    if (sym) delete (instance as any)[sym];
}

export {cache, clearCache, clearCacheEntry};
