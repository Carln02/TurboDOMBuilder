import {Effect, SignalEntry} from "./signal.types";
import {SignalUtils} from "./signal.utils";

const utils = new SignalUtils();

function effect(callback: () => void): () => void {
    const effect: Effect = {
        callback: callback,
        dependencies: new Set(),
        cleanups: [],
        scheduled: false,
        run() {
            for (const cleanup of this.cleanups) cleanup();
            this.cleanups = [];
            this.dependencies = new Set();

            utils.activeEffect = this;
            try {this.callback()} finally {utils.activeEffect = null}

            for (const dep of this.dependencies) {
                const unsub = dep.sub(() => utils.schedule(this));
                this.cleanups.push(unsub);
            }
        },
        dispose() {
            for (const cleanup of this.cleanups) cleanup();
            this.cleanups = [];
            this.dependencies.clear();
        }
    };

    effect.run();
    return () => effect.dispose();
}

/**
 * Works on:
 *  - fields:        `@signal foo = 0`
 *  - auto-accessors:`@signal accessor foo = 0`
 *  - getter:        `@signal get foo() { ... }`
 *  - setter:        `@signal set foo(v) { ... }`
 *
 * Private fields/getters/setters are NOT supported.
 */
//TODO MAYBE MAKE IT WORK FOR CHANGES IN NESTED FIELDS OF OBJECT/ARRAY VIA PROXY
function signal<Type extends object, Value>(
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
    const {kind, name, static: isStatic, private: isPrivate} = context;
    if (isPrivate) throw new Error("@signal does not support private class elements.");
    const key = name as PropertyKey;

    const backingKey = Symbol(`[[signal:${String(key)}]]`);
    const shadowKey = Symbol(`[[signal:${String(key)}:shadow]]`);

    context.addInitializer(function (this: any) {
        const prototype = isStatic ? this : this.constructor.prototype;

        let customGetter: (this: any) => Value;
        let customSetter: (this: any, value: Value) => void;

        const read = function (this: any) {
            if (customGetter && !this[shadowKey]) return customGetter.call(this);
            return this[backingKey];
        };

        const write = function (this: any, value: Value): void {
            if (customSetter) {
                customSetter.call(this, value);
                if (!customGetter) {
                    this[backingKey] = value;
                    this[shadowKey] = true;
                }
            } else {
                this[backingKey] = value;
                this[shadowKey] = true;
            }
        };

        function ensureEntry(self: any, diffOnWrite: boolean = true): SignalEntry<Value> {
            let entry = utils.getSignal<Value>(self, key);
            if (entry) return entry;

            if (kind === "field" && !customGetter) self[backingKey] = self[key];

            entry = utils.createSignalEntry<Value>(self, key, () => read.call(self),
                (value) => write.call(self, value), {diffOnWrite});
            utils.data(self).set(key, entry);

            if (kind === "field") delete self[key];
            return entry;
        }

        if (kind === "field" || kind === "accessor") {
            const accessor = value as {get?: (this: any) => Value; set?: (this: any, v: Value) => void};
            if (accessor?.get) customGetter = accessor.get;
            if (accessor?.set) customSetter = accessor.set;

           const entry = ensureEntry(this);

            const descriptor = Object.getOwnPropertyDescriptor(this, key);
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: descriptor?.enumerable ?? true,
                get: () => {
                    utils.track(entry);
                    return read.call(this);
                },
                set: (value: Value) => entry.set(value),
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
                get: function (this: any) {
                    const entry = ensureEntry(this, false);
                    utils.track(entry);
                    return read.call(this);
                },
                set: function (this: any, value: Value) {
                    const entry = ensureEntry(this, false);
                    entry.set(value);
                },
            });
        }
    });
}

function getSignal<Type = any>(target: object, key: PropertyKey): SignalEntry<Type> {
    return utils.getSignal(target, key);
}

function setSignal<Type = any>(target: object, key: PropertyKey, next: Type) {
    return utils.setSignal(target, key, next);
}

function markDirty(target: object, key: PropertyKey) {
    return utils.markDirty(target, key);
}

export {effect, setSignal, signal, getSignal, markDirty};