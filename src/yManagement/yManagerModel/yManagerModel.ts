import {TurboWeakSet} from "../../utils/datatypes/weakSet/weakSet";
import {YDataBlock} from "../yModel/yModel.types";
import {YMap} from "yjs/dist/src/types/YMap";
import {YArray} from "yjs/dist/src/types/YArray";
import {YManagerChangeObserver, YManagerChangeObserverProperties} from "./yManagerModel.types";
import {YModel} from "../yModel/yModel";
import {Delegate} from "../../eventHandling/delegate/delegate";
import {MvcBlockKeyType} from "../../mvc/core/core.types";
import {YArrayEvent, YEvent, YMapEvent} from "yjs";

/**
 * @class YManagerModel
 * @template DataType - The type of the data stored in each block.
 * @template ComponentType - The type of component that corresponds to each entry/field of the data.
 * @template {string | number | symbol} KeyType - The type of the keys used to access data in blocks.
 * @template {YMap | YArray} YType - The type of the Yjs data (YMap or YArray).
 * @template {string | number | symbol} IdType - The type of the block IDs.
 * @template {"array" | "map"} BlocksType - Whether data blocks are stored as an array or a map.
 * @template {YDataBlock<YType, IdType>} BlockType - The structure of each data block.
 * @description MVC model that manages Yjs data and synchronizes it with a map or array of components, each attached to
 * one entry of the data object.
 */
class YManagerModel<
    DataType,
    ComponentType,
    KeyType extends string | number = string,
    YType extends YMap | YArray = YMap,
    IdType extends string | number = string,
    BlocksType extends "array" | "map" = "map",
    BlockType extends YDataBlock<YType, IdType> = YDataBlock<YType, IdType>,
> extends YModel<DataType, YType, KeyType, IdType, BlocksType, BlockType> {
    protected readonly changeObservers: TurboWeakSet<YManagerChangeObserver<DataType, ComponentType, KeyType, BlocksType>> = new TurboWeakSet();

    /**
     * @constructor
     * @param {DataType} [data] - Initial data. Not initialized if provided.
     * @param {BlocksType} [dataBlocksType] - Type of data blocks (array or map).
     */
    public constructor(data?: YType, dataBlocksType?: BlocksType) {
        super(data, dataBlocksType);
    }

    public generateObserver(
        properties: YManagerChangeObserverProperties<DataType, ComponentType, KeyType, BlocksType> = {}
    ): YManagerChangeObserver<DataType, ComponentType, KeyType, BlocksType> {
        const observer: YManagerChangeObserver<DataType, ComponentType, KeyType, BlocksType> = {
            onAdded: new Delegate(),
            onUpdated: new Delegate(),
            onDeleted: new Delegate(),

            instances: new Map(),
            getInstance: (
                key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey
            ): ComponentType => this.getInstance(observer, key, blockKey),
            getAllInstances: (
                blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey
            ): ComponentType[] => this.getAllInstances(observer, blockKey),

            initialize: (blockKey?: MvcBlockKeyType<BlocksType>) => {
                if (!this.isInitialized.get(blockKey)) return;
                for (const key of this.getAllKeys(blockKey)) {
                    this.fireKeyChangedCallbackForObserver(observer, this.getData(key, blockKey), key, blockKey);
                }
            },
            clear: (blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey) =>
                this.clearInstances(observer, blockKey),
            destroy: () => {
                this.getAllBlockKeys().forEach(blockKey => observer.clear(blockKey));
                this.changeObservers?.delete(observer);
            }
        };

        observer.onUpdated.add((data, instance, id) => {
            if (typeof instance === "object") {
                if ("data" in instance) instance.data = data;
                if ("dataId" in instance) instance.dataId = id.toString();
            }
        });

        observer.onDeleted.add((_data, instance, id, blockKey) => {
            this.removeInstance(instance);
            this.getInstancesMaps(observer, blockKey).forEach(map => map.delete(id));
        });

        if (properties.onAdded) observer.onAdded.add((data, id, blockKey) =>
            properties.onAdded(data, id, blockKey));
        if (properties.onUpdated) observer.onUpdated.add((data, instance, id, blockKey) =>
            properties.onUpdated(data, instance, id, blockKey));
        if (properties.onDeleted) observer.onDeleted.add((data, instance, id, blockKey) =>
            properties.onDeleted(data, instance, id, blockKey));

        if (properties.initialize) for (const blockKey of this.getAllBlockKeys()) observer.initialize(blockKey);

        this.changeObservers?.add(observer);
        return observer;
    }

    /**
     * @function clear
     * @description Clears the block data at the given key.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    public clear(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey) {
        super.clear(blockKey);
        this.changeObservers?.toArray().forEach(observer =>
            this.clearInstances(observer, blockKey));
    }

    public getAllData(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): DataType[] {
        return super.getAllData(blockKey) as DataType[];
    }

    /**
     * @function fireKeyChangedCallback
     * @description Fires the emitter's change callback for the given key in a block, passing it the data at the key's value.
     * @param {KeyType} key - The key that changed.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block where the change occurred.
     * @param {boolean} [deleted=false] - Whether the key was deleted.
     */
    protected fireKeyChangedCallback(key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey, deleted: boolean = false) {
        if (!this.getAllKeys(blockKey).includes(key)) return super.fireKeyChangedCallback(key, blockKey, deleted);
        const data = this.getData(key, blockKey) as DataType;
        this.changeObservers?.toArray().forEach(observer =>
            this.fireKeyChangedCallbackForObserver(observer, data, key, blockKey));
    }

    protected fireKeyChangedCallbackForObserver(
        observer: YManagerChangeObserver<DataType, ComponentType, KeyType, BlocksType>,
        data: DataType, key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey
    ) {
        if (!observer.instances.has(blockKey)) observer.instances.set(blockKey, new Map());
        const map = observer.instances.get(blockKey);

        const existingInstance = map.get(key);
        if (existingInstance) {
            observer.onUpdated.fire(data, existingInstance, key, blockKey);
            return;
        }

        const instance = observer.onAdded.fire(data, key, blockKey);
        if (!instance) return;
        map.set(key, instance);
        observer.onUpdated.fire(data, instance, key, blockKey);
    }

    /*
     *
     * Utilities
     *
     */

    private getInstancesMaps(
        observer: YManagerChangeObserver<DataType, ComponentType, KeyType, BlocksType>,
        blockKey: MvcBlockKeyType<BlocksType>, sort: boolean = false
    ) {
        const maps: Map<KeyType, ComponentType>[] = [];
        if (blockKey !== null) {
            const map = observer.instances.get(blockKey);
            if (map) maps.push(map);
        } else {
            const blockKeys = this.getAllBlockKeys();
            if (sort) blockKeys.sort(this.sortingFunction);
            for (const curKey of blockKeys) {
                const map = observer.instances.get(curKey);
                if (map) maps.push(map);
            }
        }
        return maps;
    }

    private getInstance(
        observer: YManagerChangeObserver<DataType, ComponentType, KeyType, BlocksType>,
        key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey
    ): ComponentType {
        for (const map of this.getInstancesMaps(observer, blockKey)) {
            if (map.has(key)) return map.get(key);
        }
        return null;
    }

    private getAllInstances(
        observer: YManagerChangeObserver<DataType, ComponentType, KeyType, BlocksType>,
        blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey
    ): ComponentType[] {
        const maps = this.getInstancesMaps(observer, blockKey, true);
        if (!this.isDataBlocksArray) return maps.flatMap(map => Array.from(map.values()) || []);
        let instances: ComponentType[] = [];
        for (const map of maps) {
            const tempInstances: [KeyType, ComponentType][] = Array.from(map.entries());
            tempInstances.sort((a, b) => this.sortingFunction(a[0], b[0]));
            instances = instances.concat(...tempInstances.map(entry => entry[1]));
        }
        return instances;
    }

    private removeInstance(instance: ComponentType) {
        if (instance && typeof instance === "object" && "remove" in instance && typeof instance.remove == "function") instance?.remove();
    }

    private clearInstances(
        observer: YManagerChangeObserver<DataType, ComponentType, KeyType, BlocksType>,
        blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey
    ) {
        this.getInstancesMaps(observer, blockKey).forEach(map => {
            map.forEach(instance => this.removeInstance(instance));
            map.clear();
        });
    }

    private sortingFunction(a: string | number, b: string | number): number {
        if (typeof a == "string" && typeof b == "string") return a.localeCompare(b);
        else if (typeof a == "number" && typeof b == "number") return a - b;
        return 0;
    }

    protected observeChanges(event: YEvent, transaction: any, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
        //TODO
        const isLocal = !!transaction?.local;
        const origin = transaction?.origin;

        if (event instanceof YMapEvent) {
            event.keysChanged.forEach(key => {
                const change = event.changes.keys.get(key);
                switch (change.action) {
                    case "add":
                        this.fireKeyChangedCallback(key, blockKey);
                        break;
                    case "delete":
                        this.changeObservers?.toArray().forEach(observer =>
                            observer.onDeleted.fire(change.oldValue, this.getInstance(observer, key, blockKey), key, blockKey));
                        break;
                    case "update":
                        this.changeObservers?.toArray().forEach(observer =>
                            observer.onUpdated.fire(this.getData(key, blockKey), this.getInstance(observer, key, blockKey), key, blockKey));
                        break;
                }
            });
        } else if (event instanceof YArrayEvent) {
            let currentIndex = 0;
            for (const delta of event.delta) {
                if (delta.retain !== undefined) currentIndex += delta.retain;

                else if (delta.insert) {
                    const insertedItems = Array.isArray(delta.insert) ? delta.insert : [delta.insert];
                    const count = insertedItems.length;
                    this.changeObservers?.toArray().forEach(observer =>
                        this.shiftIndices(observer, currentIndex, count, blockKey));
                    for (let i = 0; i < count; i++) this.fireKeyChangedCallback((currentIndex + i) as KeyType, blockKey);
                    currentIndex += count;
                } else if (delta.delete) {
                    const count = delta.delete;
                    for (let i = 0; i < count; i++) {
                        this.changeObservers?.toArray().forEach(observer =>
                            observer.onDeleted.fire(
                                undefined,
                                this.getInstance(observer, (currentIndex + i) as KeyType, blockKey),
                                (currentIndex + i) as KeyType,
                                blockKey
                            ));
                    }
                    this.changeObservers?.toArray().forEach(observer =>
                        this.shiftIndices(observer, currentIndex + count, -count, blockKey));
                }
            }
        }
    }

    private shiftIndices(
        observer: YManagerChangeObserver<DataType, ComponentType, KeyType, BlocksType>,
        fromIndex: number, offset: number, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey
    ) {
        const block = this.getInstancesMaps(observer, blockKey)[0];
        if (!block) return;

        const itemsToShift: [number, ComponentType][] = [];
        for (const [oldIndexStr, instance] of block.entries()) {
            const oldIndex = Number(oldIndexStr);
            if (oldIndex >= fromIndex) itemsToShift.push([oldIndex, instance]);
        }

        itemsToShift.sort((a, b) => a[0] - b[0]);
        for (const [oldIndex] of itemsToShift) block.delete(oldIndex as KeyType);
        for (const [oldIndex, instance] of itemsToShift) {
            const newIndex = oldIndex + offset;
            if (typeof instance === "object" && "dataId" in instance) instance.dataId = newIndex;
            block.set((oldIndex + offset) as KeyType, instance);
        }
    }
}

export {YManagerModel};