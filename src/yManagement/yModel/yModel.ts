import {YAbstractType, YMap, YArray, YEvent} from "../yManagement.types";
import {auto} from "../../decorators/auto/auto";
import {TurboModel} from "../../mvc/core/model";
import {MvcBlockKeyType} from "../../mvc/core/core.types";
import {YDataBlock} from "./yModel.types";

/**
 * @class YModel
 * @abstract
 * @extends TurboModel
 * @template DataType - The plain shape of the shared data.
 * @template {YMap | YArray} YType - The Yjs type used (YMap or YArray).
 * @template {string | number} KeyType - The type of keys used to access values.
 * @template {string | number} IdType - The type of block identifiers.
 * @template {"array" | "map"} BlocksType - Either 'array' or 'map' depending on the block storage format.
 * @template {YDataBlock<YType, IdType>} BlockType - The structure of each block including observer.
 * @description A model that wraps and manages Yjs data structures (YMap/YArray), adding automatic observer support.
 *  */
abstract class YModel<
    DataType = any,
    YType extends YMap | YArray = YMap | YArray,
    KeyType extends string | number = string | number,
    IdType extends string | number = string,
    BlocksType extends "array" | "map" = "map",
    BlockType extends YDataBlock<YType, IdType> = YDataBlock<YType, IdType>,
> extends TurboModel<YType, KeyType, IdType, BlocksType, BlockType> {
    /**
     * @constructor
     * @param {DataType} [data] - Initial data. Not initialized if provided.
     * @param {BlocksType} [dataBlocksType] - Type of data blocks (array or map).
     */
    public constructor(data?: YType, dataBlocksType?: BlocksType) {
        super(data, dataBlocksType);
    }

    /**
     * @description The data of the default block.
     */
    public get data(): DataType & YType {
        return super.data as DataType & YType;
    }

    public set data(value: DataType | YType) {
        if (!(value instanceof YAbstractType)) return;
        super.data = value;
    }

    /**
     * @description Whether callbacks are enabled or disabled.
     */
    @auto()
    public set enabledCallbacks(value: boolean) {
        this.getAllBlocks().forEach(block => {
            if (!block.observer || !block.data) return;
            if (value) block.data.observe(block.observer);
            else block.data.unobserve(block.observer);
        });
    }

    /**
     * @function getData
     * @description Retrieves the value associated with a given key in the specified block.
     * @param {KeyType} key - The key to retrieve.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block from which to retrieve the
     * data.
     * @returns {unknown} The value associated with the key, or null if not found.
     */
    public getData(key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): any {
        const data = this.getBlockData(blockKey);
        if (data instanceof YMap) return data.get(key.toString());
        if (data instanceof YArray) {
            const index = Number(key);
            if (index >= 0 && index < data.length) return data.get(index);
        }
        return null;
    }

    /**
     * @function setData
     * @description Sets the value for a given key in the specified block and triggers callbacks (if enabled).
     * @param {KeyType} key - The key to update.
     * @param {unknown} value - The value to assign.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to update.
     */
    public setData(key: KeyType, value: unknown, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
        const data = this.getBlockData(blockKey);
        if (data instanceof YMap) data.set(key.toString(), value);
        else if (data instanceof YArray) {
            const index = Number(key);
            if (index < 0) return;
            if (index < data.length) data.delete(index, 1);
            data.insert(index, [value]);
        }
    }

    /**
     * @function getSize
     * @description Returns the size of the specified block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to check.
     * @returns {number} The size.
     */
    public getSize(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): number {
        const data = this.getBlockData(blockKey);
        if (data instanceof YMap || data instanceof YArray) return (data instanceof YArray) ? data.length : data.size;
        return 0;
    }

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
            ...super.createBlock(value, id),
            observer: (event: YEvent, transaction) => this.observeChanges(event, transaction, blockKey)
        } as BlockType;
    }

    /**
     * @function setBlock
     * @description Creates and sets a data block at the specified key.
     * @param {YType} value - The data to set.
     * @param {IdType} [id] - Optional block ID.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The key of the block.
     * @param {boolean} [initialize = true] - Whether to initialize the block after setting.
     */
    public setBlock(value: YType, id?: IdType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey, initialize: boolean = true) {
        if (this.enabledCallbacks) {
            const block = this.getBlock(blockKey);
            if (block && block.data && block.observer) block.data.unobserve(block.observer);
        }

        this.clear(blockKey);
        super.setBlock(value, id, blockKey, initialize);
    }

    /**
     * @function initialize
     * @description Initializes the block at the given key, and triggers callbacks for all the keys in its data.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    public initialize(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
        super.initialize(blockKey);
        const block = this.getBlock(blockKey);
        block?.data?.observe(block?.observer);
    }

    protected abstract observeChanges(event: YEvent, transaction: any, blockKey?: MvcBlockKeyType<BlocksType>): void;

    /**
     * @function getAllKeys
     * @description Retrieves all keys within the given block(s).
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {KeyType[]} Array of keys.
     */
    public getAllKeys(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): KeyType[] {
        const output: KeyType[] = [];
        for (const block of this.getAllBlocks(blockKey)) {
            const data = block.data;
            if (data instanceof YMap) output.push(...Array.from(data.keys()) as KeyType[]);
            else if (data instanceof YArray) {
                for (let i = 0; i < data.length; i++) output.push(i as KeyType);
            }
        }
        return output;
    }

    /**
     * @function getAllObservers
     * @description Retrieves all observers within the given block(s).
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {((event: YEvent) => void)[]} Array of observers.
     */
    protected getAllObservers(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey)
        : ((event: YEvent, transaction: any) => void)[] {
        return this.getAllBlocks(blockKey).map(block => block.observer);
    }
}

export {YModel};