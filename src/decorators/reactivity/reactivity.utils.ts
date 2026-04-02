import {Effect, Read, SignalEntry, SignalSubscriber, Write} from "./reactivity.types";
import {isUndefined} from "../../utils/dataManipulation/misc";
import {KeyType} from "../../types/basic.types";

/**
 * @internal
 */
type SignalConstructorType = {
    installed: Map<PropertyKey, boolean>
};

type ReactivityData = {
    propertyKeyMap: Map<PropertyKey, ReactivityDataEntry>,
    pathMap: Map<string, PropertyKey>
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
            obj = {propertyKeyMap: new Map(), pathMap: new Map()};
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

    public bindPath(target: object, propertyKey: PropertyKey, keys: KeyType[]) {
        this.data(target).pathMap.set(this.serializePath(keys), propertyKey);
    }

    public getKeyFromPath(target: object, keys: KeyType[]): PropertyKey {
        return this.data(target).pathMap.get(this.serializePath(keys));
    }

    public serializePath(keys: KeyType[]): string {
        return keys.map(k => typeof k === "symbol" ? `@@${k.description ?? ""}` : String(k)).join("|");
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