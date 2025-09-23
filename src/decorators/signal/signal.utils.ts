import {Effect, Read, SignalEntry, SignalSubscriber, Write} from "./signal.types";

/**
 * @internal
 */
type SignalConstructorType = {
    installed: Map<PropertyKey, boolean>
};

/**
 * @internal
 */
export class SignalUtils {
    private constructorMap = new WeakMap<object, SignalConstructorType>();
    private dataMap = new WeakMap<object, Map<PropertyKey, SignalEntry>>();

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

    public createSignalEntry<Type>(
        target: object,
        key: PropertyKey,
        read: Read<Type>,
        write?: Write<Type>,
        options?: {diffOnWrite: boolean}): SignalEntry<Type> {
        const subs = new Set<SignalSubscriber>();
        const self = this;
        if (!options) options = {diffOnWrite: true};

        const entry: SignalEntry<Type> = {
            get(): Type {
                self.track(entry);
                return read();
            },
            set(value: Type) {
                //If "write" is passed, setup emit() behavior. Otherwise, reflect to already defined setter.
                if (write && !options.diffOnWrite) {
                    write(value);
                    entry.emit();
                } else if (write) {
                    const prev = read();
                    write(value);
                    const next = read();
                    if (!Object.is(prev, next)) entry.emit();
                } else Reflect.set(target, key, value, target);
            },
            update(updater: (previous: Type) => Type) {
                entry.set(updater(read()));
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

    public getSignal<Type = any>(target: object, key: PropertyKey): SignalEntry<Type> {
        return this.data(target).get(key);
    }

    public setSignal<Type = any>(target: object, key: PropertyKey, next: Type) {
        const entry = this.data(target).get(key);
        if (entry) entry.set(next);
        else Reflect.set(target, key, next, target);
    }

    public markDirty(target: object, key: PropertyKey) {
        this.data(target).get(key)?.emit();
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