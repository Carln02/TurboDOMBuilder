import {signal} from "../../../decorators/reactivity/reactivity";
import {DataBlockHost, DataBlockProperties} from "./dataBlock.types";
import {SignalBox} from "../../../decorators/reactivity/reactivity.types";
import {auto} from "../../../decorators/auto/auto";
import {TurboWeakSet} from "../../datatypes/weakSet/weakSet";
import {Delegate} from "../../datatypes/delegate/delegate";
import {TurboObserverProperties} from "../observer/observer.types";
import {TurboObserver} from "../observer/observer";
import {isUndefined} from "../../../utils/dataManipulation/misc";

/**
 * @class TurboDataBlock
 * @group Components
 * @category TurboDataBlock
 *
 * @template DataType - The type of the data held in the block.
 * @template {string | number | symbol} KeyType - The type of the data's keys.
 * @template IdType - The type of the data's ID.
 * @template ComponentType - For observers. The type of instances that react to changes in the block.
 * @template DataEntryType - For observers. The type of the data associated with each observer instance.
 *
 * @description Lightweight wrapper around a plain JS container (object, Array or Map) that exposes a consistent
 * API for reads/writes, signals, {@link TurboObserver}s and host callbacks.
 * Use this when you want change notifications and host integration around a simple data block.
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

    /**
     * @description The data held by this block. Setting it will clear attached observers and re-initialize the block.
     */
    public get data(): DataType {
        return this._data;
    }

    public set data(data: DataType) {
        this.clear(false);
        this._data = data;
        if (data) this.initialize();
    }

    /**
     * @description Whether callbacks are enabled.
     */
    @auto({defaultValue: true}) public accessor enabledCallbacks: boolean;

    protected isInitialized: boolean = false;

    private host: DataBlockHost<DataType, KeyType, IdType>;
    private signals: Map<KeyType, SignalBox<unknown>> = new Map();

    protected readonly changeObservers: TurboWeakSet<TurboObserver<DataEntryType, ComponentType, KeyType>> = new TurboWeakSet();

    /**
     * Delegate fired when the value changes at a certain key/index.
     */
    public readonly onKeyChanged = new Delegate<(key: KeyType, value: any) => void>();

    /**
     * The default class of observers to instantiate.
     */
    public observerConstructor: new (...args: any[]) => TurboObserver = TurboObserver as any;

    /**
     * @constructor
     * @description Create a new TurboDataBlock.
     * @param {DataBlockProperties} [properties] - Optional initialization properties.
     */
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

    /**
     * @function get
     * @description Retrieve the value stored at the given key.
     * @param {KeyType} key - The key/index to read.
     * @returns {any} - The stored value, or `undefined` if not present.
     */
    public get(key: KeyType): any {
        if (this.data instanceof Map) return this.data.get(key);
        return this.data?.[key as any];
    }

    /**
     * @function set
     * @description Set a value at the provided key and notify observers/signals if the value changed.
     * @param {KeyType} key - The key/index to write.
     * @param {unknown} value - The value to set.
     */
    public set(key: KeyType, value: unknown) {
        if (!this.data) return;
        const prev = this.get(key);
        if (Object.is(prev, value)) return;

        if (this.data instanceof Map) this.data.set(key, value);
        else (this.data as any)[key] = value;
        this.keyChanged(key, value);
    }


    /**
     * @function add
     * @description Append or insert a value into an array-backed data block. If the block is not an
     * array, the call forwards to {@link set}.
     * @param {unknown} value - The value to insert.
     * @param {KeyType} [key] - Optional numeric index to insert at. If omitted, the value is pushed.
     * @returns {KeyType | void} - The index where the value was inserted (for arrays), or void for non-arrays.
     */
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

    /**
     * @function has
     * @description Check whether the given key exists in the block.
     * @param {KeyType} key - The key/index to check.
     * @returns {boolean} - True, if present.
     */
    public has(key: KeyType): boolean {
        if (this.data instanceof Map) return this.data.has(key);
        return this.data?.[key as any] !== undefined;
    }

    /**
     * @function delete
     * @description Remove the entry at the given key/index and notify observers.
     * @param {KeyType} key - The key/index to remove.
     */
    public delete(key: KeyType) {
        if (!this.data || !this.has(key)) return;
        if (this.data instanceof Map) this.data.delete(key);
        else delete (this.data as any)[key];
        this.keyChanged(key, undefined, true);
    }

    /**
     * @property keys
     * @description Array of all keys currently present in the block.
     */
    public get keys(): KeyType[] {
        if (!this.data || typeof this.data !== "object") return [];

        if (Array.isArray(this.data)) return Array.from({length: this.data.length}, (_, i) => i) as KeyType[];
        if (this.data instanceof Map) return Array.from(this.data.keys());

        return [
            ...Object.keys(this.data),
            ...Object.getOwnPropertySymbols(this.data)
        ] as KeyType[];
    }

    /**
     * @property values
     * @description The block's values in an array (in the order implied by {@link keys}).
     */
    public get values(): any[] {
        return this.keys.map(key => this.get(key));
    }

    /**
     * @property size
     * @description Number of entries in the block.
     */
    public get size(): number {
        return this.keys.length;
    }

    /*
 *
 * Iteration
 *
 */

    /**
     * Default iteration → yields [key, value]
     */
    public *[Symbol.iterator](): IterableIterator<[KeyType, any]> {
        for (const key of this.keys) yield [key, this.get(key)];
    }

    public entries(): [KeyType, any][] {
        return this.keys.map(key => [key, this.get(key)]);
    }

    /**
     * forEach
     */
    public forEach(
        callback: (value: any, key: KeyType, block: this) => void,
        thisArg?: any
    ): void {
        for (const key of this.keys) callback.call(thisArg, this.get(key), key, this);
    }

    /*
     *
     * Utilities
     *
     */

    /**
     * @function initialize
     * @description Fire change notifications for every existing key, initializing the block.
     * @returns {void}
     */
    public initialize() {
        if (!this.data || this.isInitialized) return;
        this.isInitialized = true;
        for (const key of this.keys) this.keyChanged(key);
    }


    /**
     * @function clear
     * @description Clear the block and its observers.
     * @param {boolean} [clearData=true] - If true, also clears the stored data. Otherwise, only resets observers/state.
     */
    public clear(clearData: boolean = true) {
        if (clearData) this._data = undefined;
        this.changeObservers?.toArray().forEach(observer => observer.clear());
        this.isInitialized = false;
    }

    /**
     * @function toJSON
     * @description Convert the block into a plain object suitable for JSON serialization.
     * @returns {object} - Plain JSON-serializable representation.
     */
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

    /**
     * @function link
     * @description Attach a host object that will receive `onDirty` and `onChange` callbacks when keys change.
     * @param {DataBlockHost<DataType, KeyType, IdType>} host - The host to attach.
     */
    public link(host: DataBlockHost<DataType, KeyType, IdType>) {
        this.host = host;
    }

    /**
     * @function unlink
     * @description Detach any previously-linked host.
     */
    public unlink() {
        this.host = undefined;
    }

    /*
     *
     * Signals
     *
     */

    /**
     * @function makeSignal
     * @description Create (or return an existing) reactive {@link SignalBox} for the given key.
     * The returned signal reads from {@link get} and writes via {@link set}.
     * @template Type - The type of the signal's value.
     * @param {KeyType} key - The key for which to create the signal.
     * @returns {SignalBox<Type>} - The created or cached signal.
     */
    public makeSignal<Type = any>(key: KeyType): SignalBox<Type> {
        if (this.signals.has(key)) return this.signals.get(key) as SignalBox<Type>;
        const sig = signal(() => this.get(key) as Type,
            (value) => this.set(key, value), this, key);
        this.signals.set(key, sig);
        return sig;
    }

    /**
     * @function getSignal
     * @description Retrieve an existing {@link SignalBox} for the given key if present.
     * @param {KeyType} key - The key whose signal to retrieve.
     * @returns {SignalBox<any>} - The signal or undefined if none was created.
     */
    public getSignal(key: KeyType): SignalBox<any> {
        return this.signals.get(key);
    }

    /**
     * @function makeAllSignals
     * @description Create signals for every key currently present in the block.
     */
    public makeAllSignals() {
        this.keys.forEach(key => this.makeSignal(key));
    }

    /*
     *
     * Change observers
     *
     */

    /**
     * @function generateObserver
     * @description Create and register an observer tied to this block.
     * @param {TurboObserverProperties<DataEntryType, ComponentType, KeyType>} [properties={}] - Options for observer creation.
     * @returns {TurboObserver<DataEntryType, ComponentType, KeyType>} - The newly created observer.
     */
    public generateObserver(
        properties: TurboObserverProperties<DataEntryType, ComponentType, KeyType> = {}
    ): TurboObserver<DataEntryType, ComponentType, KeyType> {
        const observer = new (
            properties.customConstructor
            ?? this.observerConstructor
            ?? TurboObserver<DataEntryType, ComponentType, KeyType>
        )({
            ...properties,
            onDestroy: (self) => this.changeObservers?.delete(self as any),
            onInitialize: (self) => {
                if (!this.isInitialized) return;
                for (const key of this.keys) self.keyChanged(key, this.get(key));
            }
        }) as TurboObserver<DataEntryType, ComponentType, KeyType>;

        this.changeObservers?.add(observer);
        return observer;
    }

    /*
     *
     * Internal utilities
     *
     */

    /**
     * @protected
     * @function keyChanged
     * @description Internal hook called whenever a key is added/updated/deleted.
     * @param {KeyType} key - The key that changed.
     * @param {unknown} [value=this.get(key)] - The new value (or undefined for deletions).
     * @param {boolean} [deleted=false] - Whether the key was removed.
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