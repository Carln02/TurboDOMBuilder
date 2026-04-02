import {initializeEffects, signal} from "../../decorators/reactivity/reactivity";
import {TurboModelProperties, TurboObserverProperties} from "./model.types";
import {SignalBox} from "../../decorators/reactivity/reactivity.types";
import {auto} from "../../decorators/auto/auto";
import {TurboWeakSet} from "../../turboComponents/datatypes/weakSet/weakSet";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboObserver} from "./observer";
import {isUndefined} from "../../utils/dataManipulation/misc";
import {turbo} from "../../turboFunctions/turboFunctions";
import {TurboHandler} from "../handler/handler";
import {FlatKeyType, KeyType} from "../../types/basic.types";

/**
 * @class TurboModel
 * @group MVC
 * @category TurboModel
 *
 * @template DataType - The type of the data held in the model.
 * @template {KeyType} KeyType - The type of the data's keys.
 * @template {KeyType} IdType - The type of the data's ID.
 * @template ComponentType - The type of instances managed by attached observers.
 * @template DataEntryType - The type of data associated with each observer instance.
 *
 * @description Wrapper around a plain JS container (object, Array, or Map) that exposes a
 * consistent API for reads/writes, signals, and {@link TurboObserver}s.
 */
class TurboModel<
    DataType = any,
    DataKeyType extends KeyType = any,
    IdType extends KeyType = any,
    ComponentType extends object = any,
    DataEntryType = any
> {
    /**
     * @description Symbol used in {@link nestAll}, {@link makeSignals}, and {@link generateObserver}
     * to target all entries at a certain level inside the data.
     */
    public static readonly ALL = Symbol("ALL");

    /**
     * @description The default constructor used to create nested {@link TurboModel} instances.
     */
    public modelConstructor: new (...args: any[]) => TurboModel = TurboModel;

    /**
     * @description The default constructor used to create {@link TurboObserver} instances via {@link generateObserver}.
     */
    public observerConstructor: new (...args: any[]) => TurboObserver = TurboObserver;

    /**
     * @description Map of MVC handlers bound to this model.
     */
    public handlers: Map<string, TurboHandler> = new Map();

    /**
     * @description Whether change callbacks and observer notifications are enabled.
     */
    @auto({defaultValue: true}) public accessor enabledCallbacks: boolean;

    /**
     * @description Whether changes bubble up from nested models to their parent.
     */
    @auto({defaultValue: false}) public accessor bubbleChanges: boolean;

    /**
     * @description Delegate fired whenever a value changes at a key path. Receives the new value followed
     * by the key path as spread arguments.
     */
    public readonly onKeyChanged = new Delegate<(value: any, ...keys: KeyType[]) => void>();

    protected isInitialized: boolean = false;

    private readonly signals: Map<DataKeyType, SignalBox<unknown>> = new Map();

    protected readonly changeObservers: TurboWeakSet<TurboObserver<DataEntryType, ComponentType, DataKeyType>> = new TurboWeakSet();
    protected readonly nestedModels: Map<DataKeyType, TurboModel> = new Map();
    protected readonly nestListeners: Set<(model: TurboModel, key: DataKeyType) => void> = new Set();

    /**
     * @description The ID of the data held by this model.
     */
    public id: IdType;

    private _data: DataType;

    /**
     * @description The data held by this model. Setting it clears the current state and re-initializes the model.
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
     * @constructor
     * @description Create a new TurboModel.
     * @param {TurboModelProperties} [properties] - Optional initialization properties.
     */
    public constructor(properties: TurboModelProperties = {}) {
        this.id = properties.id;
        this._data = properties.data;
        if (typeof properties.enabledCallbacks === "boolean") this.enabledCallbacks = properties.enabledCallbacks;
        if (typeof properties.bubbleChanges === "boolean") this.bubbleChanges = properties.bubbleChanges;
        this.setup();
        if (properties.initialize) this.initialize();
    }

    /**
     * @function setup
     * @description Called in the constructor. Use for setup that should happen at instantiation,
     * before `this.initialize()` is called.
     * @protected
     */
    protected setup() {
        initializeEffects(this);
    }

    /*
     *
     * GET
     *
     */

    /**
     * @protected
     * @function getAction
     * @description Read a single key from a data container. Override this method to support other datatypes.
     * @param {any} data - The container to read from.
     * @param {KeyType} key - The key to read.
     * @returns {any} The value at the key, or `undefined` if not found.
     */
    protected getAction(data: any, key: KeyType) {
        if (data instanceof Map) return data.get(key);
        return data?.[key as any];
    }

    /**
     * @function get
     * @description Retrieve the value at the given key.
     * @param {KeyType} key - The key to read.
     * @returns {any} The stored value, or `undefined` if not found.
     */
    public get(key: DataKeyType): any;

    /**
     * @function get
     * @description Retrieve the value at the given key path. Pass no keys to get the root data.
     * @param {...KeyType[]} keys - Ordered path from outermost to innermost key.
     * @returns {any} The stored value, or `undefined` if not found.
     */
    public get(...keys: KeyType[]): any;
    public get(...keys: KeyType[]): any {
        if (keys.length === 0) return this.data;
        let current: any = this.data;
        for (const key of keys) {
            if (!current || typeof current !== "object") return undefined;
            current = this.getAction(current, key);
        }
        return current;
    }

    /**
     * @function getFlat
     * @description Retrieve the value at the given flat key.
     * @param {FlatKeyType} flatKey - A flat key produced by {@link flattenKey}.
     * @param {number} [depth] - Required when `flatKey` is a numeric index. The depth of the key path.
     * @returns {any} The stored value, or `undefined` if not found.
     */
    public getFlat(flatKey: FlatKeyType, depth?: number): any {
        const keys = this.scopeKey(flatKey as any, depth);
        if (!keys?.length) return undefined;
        return this.get(...keys);
    }

    /**
     * @function getKey
     * @description Find the key path of the first occurrence of the given value, searching depth-first.
     * @param {any} value - The value to locate.
     * @returns {KeyType[]} The key path, or `undefined` if not found.
     */
    public getKey(value: any): KeyType[] {
        const search = (data: any, path: KeyType[]): KeyType[] => {
            if (!data || typeof data !== "object") return undefined;
            const keys: KeyType[] = data instanceof Map
                ? Array.from(data.keys())
                : [...Object.keys(data), ...Object.getOwnPropertySymbols(data)];
            for (const key of keys) {
                const entry = this.getAction(data, key);
                if (Object.is(entry, value)) return [...path, key];
                const nested = search(entry, [...path, key]);
                if (nested) return nested;
            }
            return undefined;
        };
        return search(this.data, []);
    }

    /**
     * @function getFlatKey
     * @description Return the flat key of the first occurrence of the given value.
     * @param {any} value - The value to query.
     * @returns {FlatKeyType | undefined} The flat key, or `undefined` if not found.
     */
    public getFlatKey(value: any): FlatKeyType {
        const path = this.getKey(value);
        if (!path?.length) return undefined;
        return this.flattenKey(...path);
    }

    /**
     * @function getKeys
     * @description Find the key paths of all occurrences of the given value, searching depth-first.
     * @param {any} value - The value to locate.
     * @returns {KeyType[][]} Array of key paths.
     */
    public getKeys(value: any): KeyType[][] {
        const results: KeyType[][] = [];
        const search = (data: any, path: KeyType[]) => {
            if (!data || typeof data !== "object") return;
            const keys: KeyType[] = data instanceof Map
                ? Array.from(data.keys())
                : [...Object.keys(data), ...Object.getOwnPropertySymbols(data)];
            for (const key of keys) {
                const entry = this.getAction(data, key);
                const currentPath = [...path, key];
                if (Object.is(entry, value)) results.push(currentPath);
                else search(entry, currentPath);
            }
        };
        search(this.data, []);
        return results;
    }

    /**
     * @function getFlatKeys
     * @description Return the flat keys of all occurrences of the given value.
     * @param {any} value - The value to query.
     * @returns {FlatKeyType[]} Array of flat keys.
     */
    public getFlatKeys(value: any): FlatKeyType[] {
        return this.getKeys(value).map(path => this.flattenKey(...path)).filter(k => k !== undefined);
    }

    /*
     *
     * SET
     *
     */

    /**
     * @protected
     * @function setAction
     * @description Write a single key to a data container. Override this method to support other datatypes.
     * @param {any} data - The container to write to.
     * @param {KeyType} key - The key to write.
     * @param {any} value - The value to set.
     */
    protected setAction(data: any, value: any, key: KeyType) {
        if (data instanceof Map) data.set(key, value);
        else (data as any)[key] = value;
    }

    /**
     * @protected
     * @function internalSet
     * @description Write a value at a key, propagating the change to a nested model if one exists,
     * and firing {@link keyChanged} if the value actually changed.
     * @param {TurboModel} model - The owning model (used for nested model lookup and change notification),
     * or `undefined` if operating on a non-root container.
     * @param {any} data - The container to write to.
     * @param {KeyType} key - The key to write.
     * @param {any} value - The value to set.
     */
    protected internalSet(model: TurboModel, data: any, value: any, key: KeyType) {
        if (model) {
            const nested = model.getNested(key);
            if (nested) nested.data = value;
        }

        if (!data) return;
        const prev = this.getAction(data, key);
        if (Object.is(prev, value)) return;
        this.setAction(data, value, key);
        if (model) model.keyChanged([key], value);
    }

    /**
     * @function set
     * @description Set a value at the given key and notify observers and signals if the value changed.
     * @param {KeyType} key - The key to write.
     * @param {unknown} value - The value to set.
     */
    public set(value: unknown, key: DataKeyType): void;

    /**
     * @function set
     * @description Set a value at the given key path and notify observers and signals if the value changed.
     * @param {...KeyType[]} keys - Ordered path from outermost to innermost key.
     * @param {unknown} value - The value to set.
     */
    public set(value: unknown, ...keys: KeyType[]): void;
    public set(value: unknown, ...keys: KeyType[]): void {
        this.routeMutation(
            keys,
            (data, key) => this.internalSet(data === this.data ? this : undefined, data, value, key),
            (model, keys) => model.set(value, ...keys),
        );
    }

    /**
     * @function setFlat
     * @description Set a value at the given flat key.
     * @param {unknown} value - The value to set.
     * @param {FlatKeyType} flatKey - A flat key produced by {@link flattenKey}.
     * @param {number} [depth] - Required when `flatKey` is a numeric index. The depth of the key path.
     */
    public setFlat(value: unknown, flatKey: FlatKeyType, depth?: number): void {
        const keys = this.scopeKey(flatKey as any, depth);
        if (keys?.length) this.set(value, ...keys);
    }

    /*
     *
     * ADD
     *
     */

    /**
     * @protected
     * @function internalAdd
     * @description Insert a value into a container via {@link addAction} and fire {@link keyChanged}.
     * @param {TurboModel} model - The owning model for change notification, or `undefined` for non-root containers.
     * @param {any} data - The container to insert into.
     * @param {any} value - The value to insert.
     * @param {KeyType} key - The target index or key.
     * @returns {KeyType} The index or key where the value was stored.
     */
    protected internalAdd(model: TurboModel, data: any, value: any, key: KeyType): KeyType {
        if (!data) return key;
        key = this.addAction(model, data, value, key);
        if (model) model.keyChanged([key], value);
        return key;
    }

    /**
     * @protected
     * @function addAction
     * @description Perform the raw insertion. Override this method to support other datatypes.
     * @param {TurboModel} model - The owning model.
     * @param {any} data - The container to insert into.
     * @param {any} value - The value to insert.
     * @param {KeyType} key - The target index or key. Clamped to valid array bounds for array containers.
     * @returns {KeyType} The index or key where the value was stored.
     */
    protected addAction(model: TurboModel, data: any, value: any, key: KeyType): KeyType {
        if (Array.isArray(data)) {
            let index = key as number;
            if (isUndefined(index) || typeof index !== "number" || index > data.length) index = data.length;
            else if (index < 0) index = 0;
            data.splice(index, 0, value);
            return index;
        }
        this.internalSet(model, data, value, key);
        return key;
    }

    /**
     * @function add
     * @description Push a value to the end of an array-backed model. For non-array models, forwards to {@link set}.
     * @param {unknown} value - The value to insert.
     * @returns {KeyType} The index where the value was stored.
     */
    public add(value: unknown): DataKeyType;

    /**
     * @function add
     * @description Insert a value into an array-backed model at the given index, or push it if no index is given.
     * For non-array models, forwards to {@link set}.
     * @param {unknown} value - The value to insert.
     * @param {KeyType} [key] - The index to insert at. If omitted, the value is pushed to the end.
     * @returns {KeyType} The index where the value was stored.
     */
    public add(value: unknown, key?: DataKeyType): DataKeyType;

    /**
     * @function add
     * @description Insert a value at the given key path. For array-backed nodes, the last key is the insertion index.
     * For non-array models, forwards to {@link set}.
     * @param {unknown} value - The value to insert.
     * @param {...KeyType[]} keys - Key path to the target node, with the last key as the insertion index.
     * @returns {KeyType} The index or key where the value was stored.
     */
    public add(value: unknown, ...keys: KeyType[]): KeyType;
    public add(value: unknown, ...keys: KeyType[]): KeyType {
        return this.routeMutation(
            keys,
            (data, key) => this.internalAdd(data === this.data ? this : undefined, data, value, key),
            (nested, keys) => nested.add(value, ...keys)
        );
    }

    /**
     * @function addFlat
     * @description Insert a value at the position described by the given flat key.
     * @param {unknown} value - The value to insert.
     * @param {FlatKeyType} flatKey - A flat key produced by {@link flattenKey}.
     * @param {number} [depth] - Required when `flatKey` is a numeric index. The depth of the key path.
     * @returns {KeyType} The index or key where the value was stored.
     */
    public addFlat(value: unknown, flatKey: FlatKeyType, depth?: number): KeyType {
        const keys = this.scopeKey(flatKey as any, depth);
        if (keys?.length) return this.add(value, ...keys);
    }

    /*
     *
     * HAS
     *
     */

    /**
     * @protected
     * @function hasAction
     * @description Check whether a key exists in a container. Override this method to support other datatypes.
     * @param {any} data - The container to check.
     * @param {KeyType} key - The key to check.
     * @returns {boolean} `true` if the key is present.
     */
    protected hasAction(data: any, key: KeyType): boolean {
        if (data instanceof Map) return data.has(key);
        return data?.[key as any] !== undefined;
    }

    /**
     * @function has
     * @description Check whether the given key exists in the model.
     * @param {KeyType} key - The key to check.
     * @returns {boolean} `true` if the entry exists.
     */
    public has(key: DataKeyType): boolean;

    /**
     * @function has
     * @description Check whether the given key path exists in the model.
     * @param {...KeyType[]} keys - Ordered path from outermost to innermost key.
     * @returns {boolean} `true` if the entry exists.
     */
    public has(...keys: KeyType[]): boolean;
    public has(...keys: KeyType[]): boolean {
        const data = this.get(...keys.slice(0, -1));
        const key = keys[keys.length - 1];
        if (!data || key === undefined) return false;
        return this.hasAction(data, key);
    }

    /**
     * @function hasFlat
     * @description Check whether an entry exists at the given flat key.
     * @param {FlatKeyType} flatKey - A flat key produced by {@link flattenKey}.
     * @param {number} [depth] - Required when `flatKey` is a numeric index. The depth of the key path.
     * @returns {boolean}
     */
    public hasFlat(flatKey: FlatKeyType, depth?: number): boolean {
        const keys = this.scopeKey(flatKey as any, depth);
        if (!keys?.length) return false;
        return this.has(...keys);
    }

    /*
     *
     * DELETE
     *
     */

    /**
     * @protected
     * @function deleteAction
     * @description Remove a single key from a container. Override this method to support other datatypes.
     * @param {any} data - The container to remove from.
     * @param {KeyType} key - The key to remove.
     */
    protected deleteAction(data: any, key: KeyType) {
        if (data instanceof Map) data.delete(key);
        else if (Array.isArray(data)) data.splice(key as number, 1);
        else delete (data as any)[key];
    }

    /**
     * @protected
     * @function internalDelete
     * @description Remove a key from a container, clearing any associated nested model, and firing {@link keyChanged}.
     * No-op if the key does not exist.
     * @param {TurboModel} model - The owning model for nested model cleanup and change notification,
     * or `undefined` for non-root containers.
     * @param {any} data - The container to remove from.
     * @param {KeyType} key - The key to remove.
     */
    protected internalDelete(model: TurboModel, data: any, key: KeyType) {
        if (!data || !this.hasAction(data, key)) return;
        if (model) {
            const nested = model.getNested(key);
            if (nested) {
                nested.clear();
                model.nestedModels.delete(key);
            }
        }
        this.deleteAction(data, key);
        if (model) model.keyChanged([key], undefined, true);
    }

    /**
     * @function delete
     * @description Remove the entry at the given key and notify observers.
     * @param {KeyType} key - The key to remove.
     */
    public delete(key: DataKeyType): void;

    /**
     * @function delete
     * @description Remove the entry at the given key path and notify observers.
     * @param {...KeyType[]} keys - Ordered path from outermost to innermost key.
     */
    public delete(...keys: KeyType[]): void;
    public delete(...keys: KeyType[]): void {
        return this.routeMutation(
            keys,
            (data, key) => this.internalDelete(data === this.data ? this : undefined, data, key),
            (nested, keys) => nested.delete(...keys)
        );
    }

    /**
     * @function deleteFlat
     * @description Remove the entry at the given flat key.
     * @param {FlatKeyType} flatKey - A flat key produced by {@link flattenKey}.
     * @param {number} [depth] - Required when `flatKey` is a numeric index. The depth of the key path.
     */
    public deleteFlat(flatKey: FlatKeyType, depth?: number): void {
        const keys = this.scopeKey(flatKey as any, depth);
        if (keys?.length) this.delete(...keys);
    }

    /*
     *
     * KEYS
     *
     */

    /**
     * @property keys
     * @description All keys currently present in the model.
     */
    public get keys(): DataKeyType[] {
        if (!this.data || typeof this.data !== "object") return [];

        if (Array.isArray(this.data)) return Array.from({length: this.data.length}, (_, i) => i) as DataKeyType[];
        if (this.data instanceof Map) return Array.from(this.data.keys());

        return [
            ...Object.keys(this.data),
            ...Object.getOwnPropertySymbols(this.data)
        ] as DataKeyType[];
    }

    /**
     * @property values
     * @description All values in the model, in the order of {@link keys}.
     */
    public get values(): any[] {
        return this.keys.map(key => this.get(key));
    }

    /**
     * @property size
     * @description Number of entries in the model.
     */
    public get size(): number {
        return this.keys.length;
    }

    /**
     * @function flatSize
     * @description Return the total number of entries reachable from this model at the given depth.
     * @param {number} depth - How many levels deep to count.
     * @returns {number}
     */
    public flatSize(depth: number): number {
        return TurboModel.flattenSize(this.data, depth);
    }

    /*
     *
     * Iteration
     *
     */

    /**
     * @description Iterate over `[key, value]` pairs.
     */
    public* [Symbol.iterator](): IterableIterator<[DataKeyType, any]> {
        for (const key of this.keys) yield [key, this.get(key)];
    }

    /**
     * @function entries
     * @description Return all `[key, value]` pairs in the model.
     * @returns {[KeyType, any][]}
     */
    public entries(): [DataKeyType, any][] {
        return this.keys.map(key => [key, this.get(key)]);
    }

    /**
     * @function forEach
     * @description Execute a callback for each entry in the model.
     * @param {(value: any, key: KeyType, model: this) => void} callback - Called with the value, key, and model.
     * @param {any} [thisArg] - Value to use as `this` when calling the callback.
     */
    public forEach(
        callback: (value: any, key: DataKeyType, model: this) => void,
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
     * @description Fire change notifications for all existing keys, marking the model as initialized.
     * No-op if already initialized or if data is empty.
     */
    public initialize() {
        if (!this.data || this.isInitialized) return;
        this.isInitialized = true;
        for (const key of this.keys) this.keyChanged([key]);
    }

    /**
     * @function clear
     * @description Reset the model, clearing nested models, observers, and signals.
     * @param {boolean} [clearData=true] - Whether to also clear the stored data.
     */
    public clear(clearData: boolean = true) {
        if (clearData) this._data = undefined;
        this.nestedModels.forEach(nested => nested.clear());
        this.nestedModels.clear();
        this.signals.clear();
        this.nestListeners.clear();
        this.changeObservers?.toArray().forEach(observer => observer.clear());
        this.isInitialized = false;
    }

    /**
     * @function toJSON
     * @description Convert the model's data into a JSON-serializable form.
     * Maps become plain objects. For non-object data types, the raw value is returned.
     * @returns {object | DataType}
     */
    public toJSON(): object | DataType {
        if (typeof this.data !== "object") return this.data;
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
     * Signals
     *
     */

    /**
     * @function makeSignal
     * @description Return an existing reactive {@link SignalBox} for the given key, or create one if absent.
     * The signal reads via {@link get} and writes via {@link set}.
     * @template Type - The type of the signal's value.
     * @param {KeyType} key - The key to create a signal for.
     * @returns {SignalBox<Type>}
     */
    public makeSignal<Type = any>(key: DataKeyType): SignalBox<Type>;

    /**
     * @function makeSignal
     * @description Return an existing reactive {@link SignalBox} for the given key path, or create one if absent.
     * The last key in the path is the signal's target; preceding keys navigate to the parent nested model.
     * The signal reads via {@link get} and writes via {@link set}.
     * @template Type - The type of the signal's value.
     * @param {...KeyType[]} keys - Key path, with the last key as the signal target.
     * @returns {SignalBox<Type>}
     */
    public makeSignal<Type = any>(...keys: KeyType[]): SignalBox<Type>;
    public makeSignal<Type = any>(...keys: KeyType[]): SignalBox<Type> {
        return this.makeSignals<Type>(...keys)[0];
    }

    /**
     * @function makeSignals
     * @description Return reactive {@link SignalBox} instances for multiple keys at the given path.
     * Pass {@link TurboModel.ALL} at any level of the path to expand all entries at that level.
     * @template Type - The type of the signals' values.
     * @param {...KeyType[]} keys - Key path to the signal targets. Use `ALL` at any level to target all entries there.
     * @returns {SignalBox<Type>[]}
     */
    public makeSignals<Type = any>(...keys: KeyType[]): SignalBox<Type>[] {
        if (keys.length === 0) keys = [TurboModel.ALL];
        const maker = (key: KeyType, model: TurboModel) => {
            if (model.signals.has(key)) return model.signals.get(key);
            const sig = signal(() => model.get(key), (value) => model.set(value, key), this, key);
            model.signals.set(key, sig);
            return sig;
        };

        const pathKeys = keys.slice(0, -1);
        const signalKey = keys[keys.length - 1] as DataKeyType;
        const models = pathKeys.length === 0 ? [this] : this.nestAll(pathKeys[0], ...pathKeys.slice(1));
        if (signalKey === TurboModel.ALL) return models.flatMap(model => model.keys.map(k => maker(k, model)));
        return models.map(model => maker(signalKey, model));
    }

    /**
     * @function getSignal
     * @description Retrieve an existing {@link SignalBox} for the given key, or `undefined` if none exists.
     * @param {KeyType} key - The key whose signal to retrieve.
     * @returns {SignalBox<any>}
     */
    public getSignal(key: DataKeyType): SignalBox<any>;

    /**
     * @function getSignal
     * @description Retrieve an existing {@link SignalBox} for the given key path, or `undefined` if none exists.
     * The last key in the path is the signal's target; preceding keys navigate to the parent nested model.
     * @param {...KeyType[]} keys - Key path, with the last key as the signal target.
     * @returns {SignalBox<any>}
     */
    public getSignal(...keys: KeyType[]): SignalBox<any>;
    public getSignal(...keys: KeyType[]): SignalBox<any> {
        return this.getNested(...keys.slice(0, -1)).signals.get(keys[keys.length - 1]);
    }

    /*
     *
     * Nesting
     *
     */

    /**
     * @function nestAll
     * @description Create or retrieve nested {@link TurboModel} instances at each entry under the given key path.
     * Use {@link TurboModel.ALL} in the path to expand all entries at that level.
     * @param {...KeyType[]} keys - Key path to the subtree to expand.
     * @returns {TurboModel[]} Array of nested models.
     */
    public nestAll<NestedDataType = any, NestedKeyType extends KeyType = any>(
        ...keys: KeyType[]
    ): TurboModel<NestedDataType, NestedKeyType>[];

    /**
     * @function nestAll
     * @description Create or retrieve nested {@link TurboModel} instances at each entry under the given key path,
     * with custom initialization properties for the nested models.
     * Use {@link TurboModel.ALL} in the path to expand all entries at that level.
     * @param {...[...KeyType[], TurboModelProperties]} keysAndProperties - Key path followed by optional properties.
     * @returns {TurboModel[]} Array of nested models.
     */
    public nestAll<NestedDataType = any, NestedKeyType extends KeyType = any>(
        ...keysAndProperties: [...KeyType[], TurboModelProperties]
    ): TurboModel<NestedDataType, NestedKeyType>[];
    public nestAll<NestedDataType = any, NestedKeyType extends KeyType = any>(
        ...args: (KeyType | TurboModelProperties)[]
    ): TurboModel<NestedDataType, NestedKeyType>[] {
        const lastEntry = args[args.length - 1];
        const properties: any = lastEntry !== null && typeof lastEntry === "object" ? lastEntry : {};
        const keys = args.slice(0, lastEntry !== null && typeof lastEntry === "object" ? -1 : undefined) as KeyType[];
        if (keys.length === 0) keys.push(TurboModel.ALL);

        turbo(properties).applyDefaults({bubbleChanges: this.bubbleChanges, enabledCallbacks: this.enabledCallbacks});

        const createChild = (model: TurboModel, key: KeyType): TurboModel => {
            if (model.nestedModels.has(key)) return model.nestedModels.get(key);

            const child = new this.modelConstructor({...properties, data: model.get(key), initialize: true});
            child.onKeyChanged.add((_value, ...keys: KeyType[]) => {
                if (!model.enabledCallbacks || !model.bubbleChanges) return;
                model.keyChanged(keys, model.get(key));
            });

            model.nestedModels.set(key, child);
            return child;
        };

        let results: TurboModel[] = [this];
        for (const entry of keys) {
            if (entry === TurboModel.ALL) {
                const parents = [...results];
                results = parents.flatMap(parent => parent.keys.map(k => createChild(parent, k)));

                for (const parent of parents) {
                    parent.nestListeners.add(child => {
                        const sibling: TurboModel = [...parent.nestedModels.values()].find((model: TurboModel) => model !== child);
                        if (!sibling) return;
                        sibling.nestListeners.forEach(listener => child.nestListeners.add(listener));
                        sibling.changeObservers?.toArray().forEach(obs => child.changeObservers?.add(obs));
                    });
                }
            } else {
                results = results.map(parent => createChild(parent, entry));
            }
        }

        return results;
    }

    /**
     * @function nest
     * @description Create or retrieve a single nested {@link TurboModel} at the given key.
     * @param {KeyType} key - The key of the nested model.
     * @returns {TurboModel}
     */
    public nest<NestedDataType = any, NestedKeyType extends KeyType = any>(
        key: DataKeyType
    ): TurboModel<NestedDataType, NestedKeyType>;

    /**
     * @function nest
     * @description Create or retrieve a single nested {@link TurboModel} at the given key path.
     * @param {...KeyType[]} keys - Ordered path from outermost to innermost key.
     * @returns {TurboModel}
     */
    public nest<NestedDataType = any, NestedKeyType extends KeyType = any>(
        ...keys: KeyType[]
    ): TurboModel<NestedDataType, NestedKeyType>;

    /**
     * @function nest
     * @description Create or retrieve a single nested {@link TurboModel} at the given key path,
     * with custom initialization properties.
     * @param {...[...KeyType[], TurboModelProperties]} keysAndProperties - Key path followed by optional properties.
     * @returns {TurboModel}
     */
    public nest<NestedDataType = any, NestedKeyType extends KeyType = any>(
        ...keysAndProperties: [...KeyType[], TurboModelProperties]
    ): TurboModel<NestedDataType, NestedKeyType>;
    public nest<NestedDataType = any, NestedKeyType extends KeyType = any>(
        ...keysAndProperties: (KeyType | TurboModelProperties)[]
    ): TurboModel<NestedDataType, NestedKeyType> {
        return this.nestAll(...keysAndProperties as any)[0];
    }

    /**
     * @function getNested
     * @description Return `this`.
     * @returns {TurboModel}
     */
    public getNested(): TurboModel;

    /**
     * @function getNested
     * @description Retrieve an already-created nested model at the given key, or `undefined` if none exists.
     * @param {KeyType} key - The key of the nested model.
     * @returns {TurboModel | undefined}
     */
    public getNested(key: DataKeyType): TurboModel;

    /**
     * @function getNested
     * @description Retrieve an already-created nested model at the given key path, or `undefined` if none exists.
     * @param {...KeyType[]} keys - Ordered path from outermost to innermost key.
     * @returns {TurboModel | undefined}
     */
    public getNested(...keys: KeyType[]): TurboModel;
    public getNested(...keys: KeyType[]): TurboModel {
        if (keys.length === 0) return this;
        const nested = this.nestedModels.get(keys[0] as any);
        if (keys.length > 1 && nested instanceof TurboModel) return nested.getNested(...keys.slice(1));
        return nested;
    }

    /*
     *
     * Change observers
     *
     */

    /**
     * @function generateObserver
     * @description Create and attach a {@link TurboObserver} to this model.
     * If a key path is provided, the observer is attached to the nested model(s) at that path instead.
     * Pass {@link TurboModel.ALL} at any level of the path to process all entries at that level,
     * allowing a single observer to track multiple subtrees simultaneously.
     * @param {TurboObserverProperties<DataEntryType, ComponentType, KeyType>} [properties={}] - Observer options and lifecycle callbacks.
     * @param {...KeyType[]} keys - Optional key path to the nested model(s) to observe. Use `ALL` at
     * any level to process all entries there.
     * @returns {TurboObserver<DataEntryType, ComponentType, KeyType>}
     */
    public generateObserver(
        properties: TurboObserverProperties<DataEntryType, ComponentType, DataKeyType> = {},
        ...keys: KeyType[]
    ): TurboObserver<DataEntryType, ComponentType, DataKeyType> {
        const models = keys.length === 0 ? [this] : this.nestAll(keys[0] as DataKeyType, ...keys.slice(1));
        const observer = new (
            properties.customConstructor
            ?? this.observerConstructor
            ?? TurboObserver<DataEntryType, ComponentType, DataKeyType>
        )({
            initialize: true,
            ...properties,
            onDestroy: (self) => {
                models.forEach(model => model.changeObservers?.delete(self));
                properties.onDestroy?.(self);
            },
            onInitialize: (self) => {
                for (const model of models) {
                    if (!model.isInitialized) continue;
                    for (const key of model.keys) self.keyChanged([key], model.get(key));
                }
                properties.onInitialize?.(self);
            }
        }) as TurboObserver<DataEntryType, ComponentType, DataKeyType>;

        models.forEach(model => model.changeObservers?.add(observer));
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
     * @description Called internally whenever an entry is added, updated, or deleted.
     * Emits signals, fires {@link onKeyChanged}, and notifies attached observers.
     * @param {KeyType[]} keys - The key path that changed.
     * @param {unknown} [value] - The new value. Defaults to the current value at the key.
     * @param {boolean} [deleted=false] - Whether the entry was removed.
     */
    protected keyChanged(keys: KeyType[], value: unknown = this.get(keys[0] as any), deleted: boolean = false) {
        const key = keys[0] as DataKeyType;
        if (key === undefined) return;

        this.signals.get(key)?.emit();
        //TODO markDirty(this, ...keys);
        if (deleted) this.signals.delete(key);

        if (!this.enabledCallbacks) return;

        if (!deleted && !this.nestedModels.has(key) && this.nestListeners.size > 0) {
            const model = this.nest(key);
            this.nestListeners.forEach(listener => listener(model, key));
        }

        this.onKeyChanged.fire(value, ...keys);
        this.changeObservers?.toArray().forEach(observer =>
            observer.keyChanged(keys as any[], value as any, deleted));
    }

    private static flattenSize(data: any, depth: number): number {
        if (!data || depth <= 0 || !Array.isArray(data)) return 1;
        let total = 0;
        for (const item of data) total += this.flattenSize(item, depth - 1);
        return total;
    }

    /**
     * @function flattenKey
     * @description Serialize a key path into a single flat key.
     * - Fully numeric paths into array-backed data produce a numeric global leaf index.
     * - All other paths produce a `"k0|k1|k2|..."` string, with symbols encoded as `"@@description"`.
     * @param {...KeyType[]} keys - The key path to serialize.
     * @returns {FlatKeyType}
     */
    public flattenKey(...keys: KeyType[]): FlatKeyType {
        const stringFLatKey = () => keys.map(k =>
            typeof k === "symbol" ? `@@${k.description ?? ""}` : String(k)).join("|");

        if (keys.some(k => typeof k !== "number")) return stringFLatKey();

        let index = 0;
        let current: any = this.data;

        for (let i = 0; i < keys.length; i++) {
            if (!Array.isArray(current)) return stringFLatKey();

            const key = keys[i] as number;
            for (let sibling = 0; sibling < key; sibling++) {
                const siblingData = current[sibling];
                index += TurboModel.flattenSize(siblingData, keys.length - i - 1);
            }
            current = current[key];
        }

        return index;
    }

    /**
     * @function scopeKey
     * @description Convert a flat string key back into a key path. Reverses the string form of {@link flattenKey}.
     * Segments starting with `"@@"` are decoded back to symbols.
     * @param {string} flatKey - The flat string key to convert.
     * @returns {KeyType[]}
     */
    public scopeKey(flatKey: string): KeyType[];

    /**
     * @function scopeKey
     * @description Convert a numeric global index back into a numeric key path.
     * Reverses the numeric form of {@link flattenKey}.
     * @param {number} flatKey - The numeric index to convert.
     * @param {number} depth - The depth of the key path to reconstruct.
     * @returns {KeyType[]}
     */
    public scopeKey(flatKey: number, depth: number): KeyType[];
    public scopeKey(flatKey: FlatKeyType, depth?: number): KeyType[] {
        if (typeof flatKey === "string") {
            return flatKey.split("|").map(k => {
                if (k.startsWith("@@")) return Symbol(k.slice(2));
                const n = Number(k);
                return isNaN(n) || k === "" ? k : n;
            });
        }

        const keys: number[] = [];
        let remaining = flatKey as number;
        let current: any = this.data;

        for (let i = 0; i < depth; i++) {
            if (!Array.isArray(current)) break;
            const remainingDepth = depth - i - 1;

            for (let j = 0; j < current.length; j++) {
                const size = TurboModel.flattenSize(current[j], remainingDepth);
                if (remaining < size) {
                    keys.push(j);
                    current = current[j];
                    break;
                }
                remaining -= size;
            }
        }

        return keys;
    }

    /*
     *
     * HANDLER
     *
     */

    /**
     * @function getHandler
     * @description Retrieves the attached MVC handler with the given key.
     * By default, unless manually defined in the handler, if the element's class name is MyElement
     * and the handler's class name is MyElementSomethingHandler, the key would be "something".
     * @param {string} key - The handler's key.
     * @return {TurboHandler} - The handler.
     */
    public getHandler(key: string): TurboHandler {
        return this.handlers?.get(key);
    }

    /**
     * @function addHandler
     * @description Registers a TurboHandler for the given key.
     * @param {TurboHandler} handler - The handler instance to register.
     */
    public addHandler(handler: TurboHandler) {
        if (!handler.keyName) return;
        this.handlers?.set(handler.keyName, handler);
    }

    public setDataWithoutInitializing(data: DataType) {
        this.clear(false);
        this._data = data;
    }

    private routeMutation<Type = any>(
        keys: KeyType[],
        rawCallback: (data: any, key: KeyType) => Type,
        nestedCallback: (model: TurboModel, keys: KeyType[]) => Type
    ): Type {
        const firstKey = keys[0] as DataKeyType;
        const childKeys = keys.slice(1);
        const nested = this.getNested(firstKey);

        if (childKeys.length === 0) return rawCallback(this.data, firstKey);
        if (nested) return nestedCallback(nested, childKeys);
        const parentData = this.get(firstKey, ...childKeys.slice(0, -1));
        if (typeof parentData !== "object") return;
        return rawCallback(parentData, childKeys[childKeys.length - 1]);
    }
}

export {TurboModel};