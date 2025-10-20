import {CacheOptions} from "./cache.types";
import {$} from "../../turboFunctions/turboFunctions";
import {getFirstDescriptorInChain} from "../../utils/dataManipulation/prototypeManipulation";

/**
 * @internal
 */
export function keyFromArgs(args: any[]): string {
    if (!args || args.length === 0) return "__no_args__";
    return JSON.stringify(
        args.map((v) => {
            if (typeof v === "function") return `function:${v.name}`;
            if (v && typeof v === "object") {
                try {
                    return JSON.stringify(Object.entries(v).sort());
                } catch {
                    return "[[unserializable-object]]";
                }
            }
            return v === undefined ? "undefined" : v;
        }),
    );
}

/**
 * @internal
 */
export function cacheKeySymbolFor(name: string) {
    return Symbol(`__cache__${name}`);
}

/**
 * @internal
 */
export function initInvalidation(
    instance: any,
    name: string,
    isGetterCache: boolean,
    cacheKey: symbol,
    timeouts: NodeJS.Timeout[],
    options: CacheOptions,
    deleteFn: (hard?: boolean) => void
) {
    // onEvent: attach to instance if it’s an EventTarget, else to document
    if (options.onEvent) {
        const target: any =
            typeof instance?.addEventListener === "function" ? instance : document;
        const names = Array.isArray(options.onEvent)
            ? options.onEvent
            : String(options.onEvent).split(/\s+/).filter(Boolean);

        for (const evt of names) $(target).on(evt, () => deleteFn());
    }

    // onFieldChange: wrap methods / define property setters to invalidate
    if (options.onFieldChange) {
        const list = Array.isArray(options.onFieldChange)
            ? options.onFieldChange
            : [options.onFieldChange];

        for (const fieldOrFn of list) {
            const fieldName =
                typeof fieldOrFn === "string" ? fieldOrFn : fieldOrFn.name;
            if (!fieldName) continue;

            const desc = getFirstDescriptorInChain(instance, fieldName);

            // If it's a method, wrap it (on the instance) to invalidate before/after
            const existing = instance[fieldName];
            if (typeof existing === "function") {
                const originalFn = existing;
                Object.defineProperty(instance, fieldName, {
                    configurable: true,
                    enumerable: desc?.enumerable ?? true,
                    writable: true,
                    value: function (...args: any[]) {
                        deleteFn(); // invalidate first
                        return originalFn.apply(this, args);
                    },
                });
            } else {
                // Data / accessor property — define an instance-level accessor that invalidates on set
                const getFallback = () =>
                    desc?.get ? desc.get.call(instance) : existing;
                const setFallback = (nv: any) => {
                    if (desc?.set) desc.set.call(instance, nv);
                    else {
                        // define on instance to shadow proto
                        Object.defineProperty(instance, fieldName, {
                            configurable: true,
                            enumerable: true,
                            writable: true,
                            value: nv,
                        });
                    }
                };

                Object.defineProperty(instance, fieldName, {
                    configurable: true,
                    enumerable: desc?.enumerable ?? true,
                    get() {
                        return getFallback();
                    },
                    set(nv: any) {
                        deleteFn();
                        setFallback(nv);
                    },
                });
            }
        }
    }

    // onCallback (polling) — clears on a "destroy" event if the instance supports it
    if (options.onCallback) {
        const id = setInterval(() => {
            const res = options.onCallback!.call(instance);
            if (res instanceof Promise) {
                res.then((v) => deleteFn(Boolean(v)));
            } else {
                deleteFn(Boolean(res));
            }
        }, options.onCallbackFrequency ?? 50);

        if (typeof instance?.addEventListener === "function") {
            instance.addEventListener("destroy", () => clearInterval(id), { once: true });
        }
    }

    // convenience time-based deletion helpers are scheduled where we write cache
}