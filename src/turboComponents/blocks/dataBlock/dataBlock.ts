import {signal} from "../../../reactivity/reactivity";
import {
    BlockChangeObserver,
    BlockChangeObserverProperties,
    DataBlockHost,
    DataBlockProperties
} from "./dataBlock.types";
import {SignalBox} from "../../../reactivity/reactivity.types";
import {auto} from "../../../decorators/auto/auto";
import {TurboWeakSet} from "../../datatypes/weakSet/weakSet";
import {Delegate} from "../../datatypes/delegate/delegate";

/**
 * @group Components
 * @category TurboDataBlock
 */
class TurboDataBlock<
    DataType = any,
    KeyType extends string | number | symbol = any,
    IdType extends string | number | symbol = any,
    ComponentType extends object = any,
    DataEntryType = any
> {
    public id: IdType;
    public data: DataType;

    @auto({defaultValue: true}) public accessor enabledCallbacks: boolean;
    protected isInitialized: boolean = false;

    private host: DataBlockHost<DataType, KeyType, IdType>;
    private signals: Map<KeyType, SignalBox<unknown>> = new Map();

    protected readonly changeObservers: TurboWeakSet<BlockChangeObserver<DataEntryType, ComponentType, KeyType>> = new TurboWeakSet();

    public readonly onKeyChanged = new Delegate<(key: KeyType, value: any) => void>();

    public constructor(properties: DataBlockProperties = {}) {
        this.id = properties.id;
        this.data = properties.data;
    }

    /*
     *
     * Basics
     *
     */

    public get(key: KeyType): unknown {
        if (this.data instanceof Map) return this.data.get(key);
        return this.data?.[key as any];
    }

    public set(key: KeyType, value: unknown) {
        if (!this.data) return;
        const prev = this.get(key);
        if (Object.is(prev, value)) return;

        if (this.data instanceof Map) this.data.set(key, value);
        else (this.data as any)[key] = value;
        this.keyChanged(key, value);
    }

    public has(key: KeyType): boolean {
        if (this.data instanceof Map) return this.data.has(key);
        return this.data?.[key as any] !== undefined;
    }

    public delete(key: KeyType) {
        if (!this.data || !this.has(key)) return;
        if (this.data instanceof Map) this.data.delete(key);
        else delete (this.data as any)[key];
        this.keyChanged(key, undefined, true);
    }

    public get keys(): KeyType[] {
        if (!this.data || typeof this.data !== "object") return [];
        if (this.data instanceof Map) return Array.from(this.data.keys());
        return [
            ...Object.keys(this.data),
            ...Object.getOwnPropertySymbols(this.data)
        ] as KeyType[];
    }

    public get values(): unknown[] {
        return this.keys.map(key => this.get(key));
    }

    public get size(): number {
        return this.keys.length;
    }

    /*
     *
     * Utilities
     *
     */

    public initialize() {
        if (!this.data) return;
        for (const key of this.keys) this.keyChanged(key);
        this.isInitialized = true;
        this.changeObservers.toArray().forEach(observer => observer.initialize());
    }

    /**
     * @function clear
     * @description Clears the block data.
     */
    public clear(clearData: boolean = true) {
        if (clearData) this.data = undefined;
        this.changeObservers?.toArray().forEach(observer => observer.clear());
    }

    public toJSON(): object {
        if (this.data instanceof Map) return Object.fromEntries(this.data as Map<any, any>);
        if (this.data && typeof this.data === "object") {
            const out: any = {};
            for (const k of this.keys) out[k as any] = this.get(k);
            return out;
        }
        return {};
    }

    /*
     *
     * Host
     *
     */

    public link(host: DataBlockHost<DataType, KeyType, IdType>) {
        this.host = host;
    }

    public unlink() {
        this.host = undefined;
    }

    /*
     *
     * Signals
     *
     */

    public makeSignal<Type = any>(key: KeyType): SignalBox<Type> {
        if (this.signals.has(key)) return this.signals.get(key) as SignalBox<Type>;
        const sig = signal(() => this.get(key) as Type,
            (value) => this.set(key, value), this, key);
        this.signals.set(key, sig);
        return sig;
    }

    public getSignal(key: KeyType): SignalBox<unknown> {
        return this.signals.get(key);
    }

    public makeAllSignals() {
        this.keys.forEach(key => this.makeSignal(key));
    }

    /*
     *
     * Change observers
     *
     */

    public generateObserver(
        properties: BlockChangeObserverProperties<DataEntryType, ComponentType, KeyType> = {}
    ): BlockChangeObserver<DataEntryType, ComponentType, KeyType> {
        const observer: BlockChangeObserver<DataEntryType, ComponentType, KeyType> = {
            onAdded: new Delegate(),
            onUpdated: new Delegate(),
            onDeleted: new Delegate(),

            instances: new Map(),
            getInstance: (key: KeyType): ComponentType => observer.instances.get(key),
            getAllInstances: (): ComponentType[] => {
                const temp: [KeyType, ComponentType][] = Array.from(observer.instances.entries());
                temp.sort((a, b) => this.sortingFunction(a[0], b[0]));
                return temp.map(entry => entry[1]);
            },

            initialize: () => {
                if (!this.isInitialized) return;
                for (const key of this.keys) this.observerKeyChanged(observer, key);
            },
            clear: () => {
                observer.instances.forEach(instance => this.removeInstance(instance));
                observer.instances.clear();
            },
            destroy: () => {
                observer.clear();
                this.changeObservers?.delete(observer);
            }
        };


        observer.onUpdated.add((data, instance, id) => {
            if (typeof instance === "object") {
                if ("data" in instance) instance.data = data;
                if ("dataId" in instance) instance.dataId = id.toString();
            }
        });

        observer.onDeleted.add((_data, instance, id) => {
            this.removeInstance(instance);
            observer.instances.delete(id);
        });

        if (properties.onAdded) observer.onAdded.add((data, id) =>
            properties.onAdded(data, id));
        if (properties.onUpdated) observer.onUpdated.add((data, instance, id) =>
            properties.onUpdated(data, instance, id));
        if (properties.onDeleted) observer.onDeleted.add((data, instance, id) =>
            properties.onDeleted(data, instance, id));
        if (properties.initialize) observer.initialize();

        this.changeObservers?.add(observer);
        return observer;
    }

    private observerKeyChanged(
        observer: BlockChangeObserver<any, any, KeyType>,
        key: KeyType,
        value: unknown = this.get(key),
        deleted: boolean = false
    ) {
        const existingInstance = observer.instances.get(key);
        if (existingInstance) {
            if (deleted) {
                observer.onDeleted.fire(value as DataEntryType, existingInstance, key);
                observer.instances.delete(key);
                this.removeInstance(existingInstance);
            } else observer.onUpdated.fire(value, existingInstance, key);
            return;
        }
        if (deleted) return;
        const instance = observer.onAdded.fire(value, key);
        if (!instance) return;
        observer.instances.set(key, instance);
        observer.onUpdated.fire(value, instance, key);
    }

    /*
     *
     * Internal utilities
     *
     */

    protected keyChanged(key: KeyType, value: unknown = this.get(key), deleted: boolean = false) {
        this.signals.get(key)?.emit();
        this.host?.onDirty?.(key, this);
        if (deleted) this.signals.delete(key);

        if (!this.enabledCallbacks) return;
        this.onKeyChanged.fire(key, value);
        this.host?.onChange?.(key, value, this);
        this.changeObservers?.toArray().forEach(observer =>
            this.observerKeyChanged(observer, key, value, deleted));
    }

    private sortingFunction(a: KeyType, b: KeyType): number {
        if (typeof a == "string" && typeof b == "string") return a.localeCompare(b);
        else if (typeof a == "number" && typeof b == "number") return a - b;
        return 0;
    }

    private removeInstance(instance: any) {
        if (instance && typeof instance === "object" && "remove" in instance && typeof instance.remove == "function") instance?.remove();
    }
}

export {TurboDataBlock};