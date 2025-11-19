import {ReactivityUtils} from "./reactivity.utils";
import {SignalBox, SignalEntry} from "./reactivity.types";
import {getFirstDescriptorInChain} from "../../utils/dataManipulation/prototype";
import {isUndefined} from "../../utils/dataManipulation/misc";

export class SignalUtils {
    public constructor(private readonly utils: ReactivityUtils) {}

    public createBoxFromEntry<Type>(entry: SignalEntry<Type>): SignalBox<Type> {
        return new Proxy({
            ...entry,
            toJSON: () => entry.get(),
            valueOf: () => entry.get(),
            [Symbol.toPrimitive]: (hint: "default" | "number" | "string") => {
                const value = entry.get() as any;
                if (hint === "string") return String(value);
                if (typeof value === "number") return value;
                if (value != null && typeof value.valueOf === "function") return value.valueOf();
                return value;
            },
            get value() {
                return entry.get();
            },
            set value(value: Type) {
                entry.set(value);
            }
        }, {
            get(target, key, receiver) {
                return Reflect.get(target, key, receiver);
            },
            set(target, key, value, receiver) {
                if (key === "value") {
                    target.value = value;
                    return true;
                }
                return Reflect.set(target, key, value, receiver);
            }
        }) as any;
    }

    public signalDecorator<Type extends object, Value>(
        value:
            | ((initial: Value) => Value)
            | ((this: Type) => Value)
            | ((this: Type, v: Value) => void)
            | { get?: (this: Type) => Value; set?: (this: Type, value: Value) => void },
        context:
            | ClassFieldDecoratorContext<Type, Value>
            | ClassGetterDecoratorContext<Type, Value>
            | ClassSetterDecoratorContext<Type, Value>
            | ClassAccessorDecoratorContext<Type, Value>,
        baseGetter?: (this: any) => Value,
        baseSetter?: (this: any, value: Value) => void,
        callSetterOnInitialize: boolean = false
    ): any {
        const {kind, name, static: isStatic, private: isPrivate} = context as any;
        if (isPrivate) throw new Error("@signal does not support private class elements.");
        const key = name as PropertyKey;

        const backingKey = Symbol(`[[signal:${String(key)}]]`);
        const shadowKey = Symbol(`[[signal:${String(key)}:shadow]]`);

        const utils = this.utils;

        context.addInitializer(function (this: any) {
            const prototype = isStatic ? this : this.constructor.prototype;

            let customGetter: (this: any) => Value;
            let customSetter: (this: any, value: Value) => void;

            const read = function (this: any) {
                if (baseGetter && !this[shadowKey]) return baseGetter.call(this);
                if (customGetter && !this[shadowKey]) return customGetter.call(this);
                return this[backingKey];
            };

            const write = function (this: any, v: Value) {
                if (!customSetter && !baseSetter) {
                    this[backingKey] = v;
                    this[shadowKey] = true;
                } else {
                    if (baseSetter) baseSetter.call(this, v);
                    if (customSetter) customSetter.call(this, v);
                    if (!customGetter && !baseGetter) {
                        this[backingKey] = v;
                        this[shadowKey] = true;
                    }
                }
            };

            const ensureEntry = (self: any, diffOnWrite = true): SignalEntry<Value> => {
                let entry = utils.getSignal<Value>(self, key);
                if (entry) return entry;

                if (kind === "field" && !customGetter && !baseGetter) self[backingKey] = self[key];
                entry = utils.createSignalEntry<Value>(undefined, self, key, () => read.call(self), (v) => write.call(self, v), {diffOnWrite});
                if (kind === "field") delete self[key];
                return entry;
            };

            if (kind === "field" || kind === "accessor") {
                const acc = value as { get?: (this: any) => Value; set?: (this: any, v: Value) => void };
                if (acc?.get) customGetter = acc.get;
                if (acc?.set) customSetter = acc.set;

                const entry = ensureEntry(this, !customGetter && !baseGetter);

                const descriptor = getFirstDescriptorInChain(this, key);
                Object.defineProperty(this, key, {
                    configurable: descriptor?.configurable ?? true,
                    enumerable: descriptor?.enumerable ?? true,
                    get: () => {
                        utils.track(entry);
                        return read.call(this);
                    },
                    set: (v: Value) => entry.set(v),
                });
            } else if (kind === "getter" || kind === "setter") {
                const installed = utils.constructorData(prototype).installed;
                if (installed.get(key)) return;
                installed.set(key, true);

                const descriptor = getFirstDescriptorInChain(prototype, key) ?? {};
                if (typeof descriptor.get === "function") customGetter = descriptor.get;
                if (typeof descriptor.set === "function") customSetter = descriptor.set;

                Object.defineProperty(prototype, key, {
                    configurable: descriptor?.configurable ?? true,
                    enumerable: !!descriptor?.enumerable,
                    get: function (this: any) {
                        const e = ensureEntry(this, !customGetter && !baseGetter);
                        utils.track(e);
                        return read.call(this);
                    },
                    set: function (this: any, v: Value) {
                        const e = ensureEntry(this, !customGetter && !baseGetter);
                        e.set(v);
                    },
                });
            }

            if (callSetterOnInitialize) {
                const current = baseGetter?.call(this) ?? customGetter?.call(this);
                if (isUndefined(current)) ensureEntry(this, !customGetter && !baseGetter).set(undefined);
            }
        });
    }
}