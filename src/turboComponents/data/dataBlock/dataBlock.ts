import {signal} from "../../../decorators/reactivity/reactivity";
import {DataBlockHost, DataBlockProperties} from "./dataBlock.types";
import {SignalBox} from "../../../decorators/reactivity/reactivity.types";
import {auto} from "../../../decorators/auto/auto";
import {TurboWeakSet} from "../../datatypes/weakSet/weakSet";
import {Delegate} from "../../datatypes/delegate/delegate";
import {DataBlockObserver} from "../blockObserver/blockObserver";
import {TurboObserverProperties} from "../observer/observer.types";
import {TurboObserver} from "../observer/observer";
import {isUndefined} from "../../../utils/dataManipulation/misc";

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
    private _data: DataType;
    public id: IdType;

    public get data(): DataType {
        return this._data;
    }

    public set data(data: DataType) {
        this.clear(false);
        this._data = data;
        if (data) this.initialize();
    }

    @auto({defaultValue: true}) public accessor enabledCallbacks: boolean;
    protected isInitialized: boolean = false;

    private host: DataBlockHost<DataType, KeyType, IdType>;
    private signals: Map<KeyType, SignalBox<unknown>> = new Map();

    protected readonly changeObservers: TurboWeakSet<DataBlockObserver<DataEntryType, ComponentType, KeyType>> = new TurboWeakSet();

    public readonly onKeyChanged = new Delegate<(key: KeyType, value: any) => void>();

    public observerConstructor: new (...args: any[]) => TurboObserver = DataBlockObserver as any;

    public constructor(properties: DataBlockProperties = {}) {
        this.id = properties.id;
        this._data = properties.data;
        if (properties.initialize) this.initialize();
    }

    /*
     *
     * Basics
     *
     */

    public get(key: KeyType): any {
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

    public add(value: unknown, key?: KeyType): KeyType | void {
        if (!this.data || !Array.isArray(this.data)) return this.set(key, value);
        let index = key as number;
        if (isUndefined(index) || typeof index !== "number" || index > this.data.length) {
            index = this.data.length;
            this.data.push(value);
        } else {
            if (index < 0) index = 0;
            this.data.splice(index, 0, value);
        }
        return index as KeyType;
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

    public get values(): any[] {
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
        if (!this.data || this.isInitialized) return;
        this.isInitialized = true;
        for (const key of this.keys) this.keyChanged(key);
    }

    /**
     * @function clear
     * @description Clears the block data.
     */
    public clear(clearData: boolean = true) {
        if (clearData) this._data = undefined;
        this.changeObservers?.toArray().forEach(observer => observer.clear());
        this.isInitialized = false;
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

    public getSignal(key: KeyType): SignalBox<any> {
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
        properties: TurboObserverProperties<DataEntryType, ComponentType, KeyType> = {}
    ): DataBlockObserver<DataEntryType, ComponentType, KeyType> {
        const observer = new (
            properties.customConstructor
            ?? this.observerConstructor
            ?? DataBlockObserver<DataEntryType, ComponentType, KeyType>
        )({
            ...properties,
            onDestroy: (self) => this.changeObservers?.delete(self as any),
            onInitialize: (self) => {
                if (!this.isInitialized) return;
                for (const key of this.keys) self.keyChanged(key, this.get(key));
            }
        }) as DataBlockObserver<DataEntryType, ComponentType, KeyType>;

        this.changeObservers?.add(observer);
        return observer;
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
            observer.keyChanged(key, value as any, deleted));
    }

}

export {TurboDataBlock};