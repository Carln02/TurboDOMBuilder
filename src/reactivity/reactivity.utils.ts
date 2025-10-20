import {Effect, Read, SignalEntry, SignalSubscriber, Write} from "./reactivity.types";
import {Type} from "typedoc";

/**
 * @internal
 */
type SignalConstructorType = {
    installed: Map<PropertyKey, boolean>
};

type ReactivityDataEntry = {
    signal?: SignalEntry,
    effect?: Effect
};

/**
 * @internal
 */
export class ReactivityUtils {
    private constructorMap = new WeakMap<object, SignalConstructorType>();
    private dataMap = new WeakMap<object, Map<PropertyKey, ReactivityDataEntry>>();

    public activeEffect: Effect = null;

    public constructorData(target: object) {
        let obj = this.constructorMap.get(target);
        if (!obj) {
            obj = {installed: new Map()};
            this.constructorMap.set(target, obj);
        }
        return obj!;
    }

    public data(target: object) {
        let map = this.dataMap.get(target);
        if (!map) {
            map = new Map();
            this.dataMap.set(target, map);
        }
        return map!;
    }

    public track(entry: SignalEntry) {
        if (this.activeEffect) this.activeEffect.dependencies.add(entry);
    }

    public createSignalEntry<Type>(initial: Type): SignalEntry<Type>;
    public createSignalEntry<Type>(
        target: object,
        key: PropertyKey,
        read: Read<Type>,
        write?: Write<Type>,
        options?: {diffOnWrite: boolean}
    ): SignalEntry<Type>;
    public createSignalEntry<Type>(
        targetOrInitial: any,
        key?: PropertyKey,
        read?: Read<Type>,
        write?: Write<Type>,
        options?: {diffOnWrite: boolean}
    ): SignalEntry<Type> {
        const subs = new Set<SignalSubscriber>();
        const self = this;
        const isBound = key !== undefined || read !== undefined;

        let underlyingValue = targetOrInitial;
        if (!options) options = {diffOnWrite: true};

        const entry: SignalEntry<Type> = {
            get(): Type {
                self.track(entry);
                return isBound ? read() : underlyingValue;
            },
            set(value: Type) {
                if (!isBound) {
                    const prev = underlyingValue;
                    underlyingValue = value;
                    if (!Object.is(prev, value)) entry.emit();
                }
                //If "write" is passed, setup emit() behavior. Otherwise, reflect to already defined setter.
                else if (write && !options.diffOnWrite) {
                    write(value);
                    entry.emit();
                } else if (write) {
                    const prev = read();
                    write(value);
                    const next = read();
                    if (!Object.is(prev, next)) entry.emit();
                } else Reflect.set(targetOrInitial, key, value, targetOrInitial);
            },
            update(updater: (previous: Type) => Type) {
                entry.set(updater(isBound ? read() : underlyingValue));
            },
            sub(fn: SignalSubscriber) {
                subs.add(fn);
                return () => subs.delete(fn);
            },
            emit() {
                for (const fn of Array.from(subs)) queueMicrotask(fn);
            }
        };

        return entry;
    }

    public getReactivityData(target: object, key: PropertyKey): ReactivityDataEntry {
        const data = this.data(target);
        if (!data.has(key)) data.set(key, {});
        return data.get(key);
    }

    public getSignal<Type = any>(target: object, key: PropertyKey): SignalEntry<Type> {
        return this.getReactivityData(target, key).signal;
    }

    public setSignal<Type = any>(target: object, key: PropertyKey, next: Type) {
        const entry = this.getSignal(target, key);
        if (entry) entry.set(next);
        else Reflect.set(target, key, next, target);
    }

    public getEffect(target: object, key: PropertyKey): Effect {
        return this.getReactivityData(target, key).effect;
    }

    public setEffect(target: object, key: PropertyKey, effect: Effect) {
        this.getReactivityData(target, key).effect = effect;
    }

    public markDirty(target: object, key: PropertyKey) {
        this.getSignal(target, key)?.emit();
    }

    public schedule(effect: Effect) {
        if (effect.scheduled) return;
        effect.scheduled = true;
        queueMicrotask(() => {
            effect.scheduled = false;
            effect.run();
        });
    }
}