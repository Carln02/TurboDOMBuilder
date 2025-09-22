import {YMap, YArray, YManagerDataBlock, YArrayEvent, YMapEvent,YEvent} from "../../yManagement.types";
import {YModel} from "../yModel";
import {TurboElement} from "../../../turboElement/turboElement";
import {TurboProxiedElement} from "../../../turboElement/turboProxiedElement/turboProxiedElement";
import {MvcBlockKeyType} from "../../../mvc/core/core.types";

/**
 * @class YManagerModel
 * @template DataType - The type of the data stored in each block.
 * @template ComponentType - The type of component that corresponds to each entry/field of the data.
 * @template {string | number | symbol} KeyType - The type of the keys used to access data in blocks.
 * @template {YMap | YArray} YType - The type of the Yjs data (YMap or YArray).
 * @template {string | number | symbol} IdType - The type of the block IDs.
 * @template {"array" | "map"} BlocksType - Whether data blocks are stored as an array or a map.
 * @template {YManagerDataBlock<YType, IdType, ComponentType, KeyType>} BlockType - The structure of each data block.
 * @description MVC model that manages Yjs data and synchronizes it with a map or array of components, each attached to
 * one entry of the data object.
 */
export class YManagerModel<
    DataType,
    ComponentType,
    KeyType extends string | number,
    YType extends YMap | YArray,
    IdType extends string | number = string,
    BlocksType extends "array" | "map" = "map",
    BlockType extends YManagerDataBlock<YType, IdType, ComponentType, KeyType> = YManagerDataBlock<YType, IdType, ComponentType, KeyType>,
> extends YModel<DataType, YType, KeyType, IdType, BlocksType, BlockType> {
    public onAdded: (data: DataType, id: KeyType, blockKey: MvcBlockKeyType<BlocksType>) => ComponentType;

    public onUpdated: (data: DataType, instance: ComponentType, id: KeyType, blockKey: MvcBlockKeyType<BlocksType>) => void =
        (data, instance, id) => {
            if (!(instance instanceof TurboElement || instance instanceof TurboProxiedElement)) return;
            instance.data = data as object;
            instance.dataId = id.toString();
        };

    public onDeleted: (data: DataType, instance: ComponentType, id: KeyType, blockKey: MvcBlockKeyType<BlocksType>) => void =
        (_data, instance, id, blockKey) => {
            this.removeInstance(instance);
            this.getBlock(blockKey).instances?.delete(id);
        };

    /**
     * @function createBlock
     * @description Creates a data block entry.
     * @param {YType} value - The data of the block.
     * @param {IdType} [id] - The optional ID of the data.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The key of the block.
     * @protected
     * @return {BlockType} - The created block.
     */
    public createBlock(value: YType, id?: IdType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): BlockType {
        return {
            ...super.createBlock(value, id, blockKey),
            instances: new Map<KeyType, ComponentType>(),
        } as BlockType;
    }

    public getInstance(key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): ComponentType {
        for (const block of this.getAllBlocks(blockKey)) {
            if (!block.instances) continue;
            if (block.instances.has(key)) return block.instances.get(key);
        }
        return null;
    }

    public getAllComponents(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): ComponentType[] {
        const block = this.getBlock(blockKey);

        if (block && block.data instanceof YArray) {
            const instancesMap = this.getBlock(blockKey)?.instances;
            if (!instancesMap) return [];

            const instances: [KeyType, ComponentType][] = [];
            for (const [index, instance] of instancesMap.entries()) instances.push([index, instance]);
            instances.sort((a, b) => {
                if (typeof a[0] == "string" && typeof b[0] == "string") return a[0].localeCompare(b[0]);
                else if (typeof a[0] == "number" && typeof b[0] == "number") return a[0] - b[0];
                return 0;
            });
            return instances.map(([, instance]) => instance);
        }
        return this.getAllBlocks(blockKey).flatMap(block => Array.from(block.instances?.values()) || []);

    }

    /**
     * @function clear
     * @description Clears the block data at the given key.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    public clear(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey) {
        super.clear(blockKey);
        this.getAllBlocks(blockKey).forEach(block => {
            block?.instances?.forEach(instance => this.removeInstance(instance));
            block?.instances?.clear();
        });
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
        if (!this.getAllKeys(blockKey).includes(key)) {
            return super.fireKeyChangedCallback(key, blockKey, deleted);
        }

        if (!this.onAdded) return;

        const data = this.getData(key, blockKey) as DataType;
        const instance = this.onAdded(data, key, blockKey);
        this.getBlock(blockKey).instances?.set(key, instance);

        if (typeof instance === "object") {
            if ("data" in instance) instance.data = data;
            if ("dataId" in instance) instance.dataId = key.toString();
        }

        this.onUpdated?.(data, instance, key, blockKey);
    }

    private removeInstance(instance: ComponentType) {
        if (instance && typeof instance === "object" && "remove" in instance && typeof instance.remove == "function") instance?.remove();
    }

    protected observeChanges(event: YEvent, transaction: any, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
        //TODO
        const isLocal = !!transaction?.local;
        const origin  = transaction?.origin;

        if (event instanceof YMapEvent) {
            event.keysChanged.forEach(key => {
                const change = event.changes.keys.get(key);
                switch (change.action) {
                    case "add":
                        this.fireKeyChangedCallback(key, blockKey);
                        break;
                    case "delete":
                        this.onDeleted?.(change.oldValue as DataType, this.getInstance(key, blockKey), key, blockKey);
                        break;
                    case "update":
                        this.onUpdated?.(this.getData(key, blockKey), this.getInstance(key, blockKey), key, blockKey);
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
                    this.shiftIndices(currentIndex, count, blockKey);
                    for (let i = 0; i < count; i++) this.fireKeyChangedCallback((currentIndex + i) as KeyType, blockKey);
                    currentIndex += count;
                } else if (delta.delete) {
                    const count = delta.delete;
                    for (let i = 0; i < count; i++) {
                        this.onDeleted?.(undefined, this.getInstance((currentIndex + i) as KeyType, blockKey),
                            (currentIndex + i) as KeyType, blockKey);
                    }
                    this.shiftIndices(currentIndex + count, -count, blockKey);
                }
            }
        }
    }

    private shiftIndices(fromIndex: number, offset: number, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
        const block = this.getBlock(blockKey)?.instances;
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