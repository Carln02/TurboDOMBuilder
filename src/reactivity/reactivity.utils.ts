import {Effect, Read, SignalEntry, SignalSubscriber, Write} from "./reactivity.types";
import {isUndefined} from "../utils/dataManipulation/misc";

/**
 * @internal
 */
type SignalConstructorType = {
    installed: Map<PropertyKey, boolean>
};

type ReactivityData = {
    propertyKeyMap: Map<PropertyKey, ReactivityDataEntry>,
    blockKeyMap: Map<PropertyKey, Map<PropertyKey, PropertyKey>>
}

type ReactivityDataEntry = {
    signal?: SignalEntry,
    effect?: Effect
};

/**
 * @internal
 */
export class ReactivityUtils {
    private constructorMap = new WeakMap<object, SignalConstructorType>();
    private dataMap = new WeakMap<object, ReactivityData>();

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
        let obj = this.dataMap.get(target);
        if (!obj) {
            obj = {propertyKeyMap: new Map(), blockKeyMap: new Map()};
            this.dataMap.set(target, obj);
        }
        return obj!;
    }

    public track(entry: SignalEntry) {
        if (this.activeEffect) this.activeEffect.dependencies.add(entry);
    }

    public createSignalEntry<Type>(
        initial?: Type,
        target?: object,
        key?: PropertyKey,
        read?: Read<Type>,
        write?: Write<Type>,
        options?: { diffOnWrite: boolean }
    ): SignalEntry<Type> {
        const subs = new Set<SignalSubscriber>();
        const self = this;

        if (!options) options = {diffOnWrite: true};
        if (!write) write = (value) => Reflect.set(target, key, value, target);
        if (!read) {
            if (target && !isUndefined(key)) read = () => Reflect.get(target, key);
            else read = () => initial;
        }

        const entry: SignalEntry<Type> = {
            get(): Type {
                self.track(entry);
                return read();
            },
            set(value: Type) {
                if (!target || isUndefined(key)) {
                    const prev = initial;
                    initial = value;
                    if (!Object.is(prev, value)) entry.emit();
                }
                //If "write" is passed, setup emit() behavior. Otherwise, reflect to already defined setter.
                else if (!options.diffOnWrite) {
                    write(value);
                    entry.emit();
                } else {
                    const prev = read();
                    write(value);
                    const next = read();
                    if (!Object.is(prev, next)) entry.emit();
                }
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

        if (target && !isUndefined(key)) this.getReactivityData(target, key).signal = entry;

        return entry;
    }

    public getReactivityData(target: object, key: PropertyKey): ReactivityDataEntry {
        const data = this.data(target).propertyKeyMap;
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

    public bindBlockKey(target: object, key: PropertyKey, dataKey: PropertyKey, blockKey?: PropertyKey) {
        blockKey = blockKey ?? (target as any)?.defaultBlockKey ?? "__default__";
        const map = this.data(target).blockKeyMap;
        if (!map.has(blockKey)) map.set(blockKey, new Map());
        map.get(blockKey).set(dataKey, key);
    }

    public getKeyFromBlockKey(target: object, dataKey: PropertyKey, blockKey?: PropertyKey) {
        blockKey = blockKey ?? (target as any)?.defaultBlockKey ?? "__default__";
        return this.data(target).blockKeyMap.get(blockKey)?.get(dataKey);
    }
}