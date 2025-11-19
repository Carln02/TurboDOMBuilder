import {auto} from "../../decorators/auto/auto";
import {MvcBlockKeyType, MvcBlocksType, MvcFlatKeyType} from "./core.types";
import {TurboHandler} from "../logic/handler";
import {markDirty} from "../../decorators/reactivity/reactivity";
import {TurboDataBlock} from "../../turboComponents/data/dataBlock/dataBlock";
import {DataBlockHost} from "../../turboComponents/data/dataBlock/dataBlock.types";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboWeakSet} from "../../turboComponents/datatypes/weakSet/weakSet";
import {TurboObserver} from "../../turboComponents/data/observer/observer";
import {ScopedKey, TurboObserverProperties} from "../../turboComponents/data/observer/observer.types";
import {alphabeticalSorting, isUndefined} from "../../utils/dataManipulation/misc";

/**
 * @class TurboModel
 * @group MVC
 * @category Model
 *
 * @template DataType - The type of the data stored in each block.
 * @template {string | number | symbol} KeyType - The type of the keys used to access data in blocks.
 * @template {string | number | symbol} IdType - The type of the block IDs.
 * @template {"array" | "map"} BlocksType - Whether data blocks are stored as an array or a map.
 * @template {TurboDataBlock<DataType, KeyType, IdType>} BlockType - The structure of each data block.
 * @description A base class representing a model in MVC, which manages one or more data blocks and handles change
 * propagation.
 */
class TurboModel<
    DataType = any,
    KeyType extends string | number | symbol = any,
    IdType extends string | number | symbol = any,
    BlocksType extends "array" | "map" = "array" | "map",
    BlockType extends TurboDataBlock<DataType, KeyType, IdType> = TurboDataBlock<DataType, KeyType, IdType>
> implements DataBlockHost<DataType, KeyType, IdType> {
    protected readonly isDataBlocksArray: boolean = false;
    protected readonly dataBlocks: MvcBlocksType<BlocksType, BlockType>;
    protected readonly changeObservers: TurboWeakSet<TurboObserver<any, any, KeyType>> = new TurboWeakSet();

    public static dataBlockConstructor: new () => TurboDataBlock = TurboDataBlock;
    public observerConstructor: new () => TurboObserver = TurboObserver;

    public onSetBlock: Delegate<(blockKey: MvcBlockKeyType<BlocksType>) => void> = new Delegate();

    /**
     * @description Map of MVC handlers bound to this model.
     */
    public handlers: Map<string, TurboHandler>;

    /**
     * @description Delegate triggered when a key changes.
     */
    public keyChangedCallback: Delegate<(keyName: KeyType, blockKey: MvcBlockKeyType<BlocksType>, ...args: any[]) => void>;

    public onDirty(key: KeyType, block: TurboDataBlock<DataType, KeyType, IdType>): void {
        markDirty(this, key, this.getBlockKey(block));
    }

    public onChange(key: KeyType, value: unknown, block: TurboDataBlock<DataType, KeyType, IdType>) {
        this.fireBlockCallback(key, this.getBlockKey(block), value);
    }

    /**
     * @constructor
     * @param {DataType} [data] - Initial data. Not initialized if provided.
     * @param {BlocksType} [dataBlocksType] - Type of data blocks (array or map).
     */
    public constructor(data?: DataType, dataBlocksType?: BlocksType) {
        this.keyChangedCallback = new Delegate();

        if (dataBlocksType === "array") {
            this.isDataBlocksArray = true;
            this.dataBlocks = [] as unknown as MvcBlocksType<BlocksType, BlockType>;
        } else {
            this.isDataBlocksArray = false;
            this.dataBlocks = new Map<string, BlockType>() as unknown as MvcBlocksType<BlocksType, BlockType>;
        }

        this.enabledCallbacks = true;
        if (data) this.setBlock(data, undefined, this.defaultBlockKey, false);
        this.setup();
    }

    protected setup() {}

    /**
     * @description The default block.
     */
    public get block(): BlockType {
        return this.getBlock();
    }

    public set block(value: BlockType) {
        this.setBlock(value);
    }

    /**
     * @description The data of the default block.
     */
    public get data(): DataType {
        return this.getBlockData();
    }

    public set data(value: DataType) {
        this.setBlock(value);
    }

    /**
     * @description The ID of the default block.
     */
    public get dataId(): IdType {
        return this.getBlockId();
    }

    public set dataId(value: IdType) {
        this.setBlockId(value);
    }

    /**
     * @description Whether callbacks are enabled or not.
     */
    @auto() public set enabledCallbacks(value: boolean) {
        this.getAllBlocks().forEach(block => block.enabledCallbacks = value);
    }

    /**
     * @function getBlock
     * @description Retrieves the data block for the given blockKey.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key to retrieve.
     * @returns {BlockType | null} The block or null if it doesn't exist.
     */
    public getBlock(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): BlockType {
        if (!this.isValidBlockKey(blockKey)) return;

        if (this.isDataBlocksArray) {
            const index = Number(blockKey);
            if (Number.isInteger(index) && index >= 0 && index < (this.dataBlocks as BlockType[]).length) {
                return (this.dataBlocks as BlockType[])[index];
            }
        } else {
            return (this.dataBlocks as Map<string, BlockType>).get(blockKey.toString());
        }
    }

    /**
     * @function createBlock
     * @description Creates a data block entry.
     * @param {DataType} value - The data of the block.
     * @param {IdType} [id] - The optional ID of the data.
     * @param initialize
     * @protected
     * @return {BlockType} - The created block.
     */
    protected createBlock(value: DataType | BlockType, id?: IdType, initialize: boolean = true): BlockType {
        const block = value instanceof TurboDataBlock
            ? value
            : new ((this.constructor as any).dataBlockConstructor ?? TurboDataBlock)({id: id, data: value}) as BlockType;
        block.link(this);
        if (initialize) block.initialize();
        return block;
    }

    /**
     * @function setBlock
     * @description Creates and sets a data block at the specified key.
     * @param {DataType} value - The data to set.
     * @param {IdType} [id] - Optional block ID.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The key of the block.
     * @param {boolean} [initialize = true] - Whether to initialize the block after setting.
     */
    public setBlock(
        value: DataType | BlockType,
        id?: IdType,
        blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey,
        initialize: boolean = true
    ) {
        if (!this.isValidBlockKey(blockKey)) return;
        const prev = this.getBlock(blockKey);
        if (prev && !(value instanceof TurboDataBlock)) {
            prev.clear();
            prev.data = value;
            if (!isUndefined(id)) prev.id = id;
            this.onSetBlock.fire(blockKey);
            return;
        }

        prev?.clear();
        prev?.unlink();

        const block = this.createBlock(value, id, false);

        if (this.isDataBlocksArray) {
            const index = Number(blockKey);
            if (Number.isInteger(index) && index >= 0) {
                (this.dataBlocks as BlockType[])[index] = block;
            }
        } else {
            (this.dataBlocks as Map<string, BlockType>).set(blockKey.toString(), block);
        }
        if (initialize) this.initialize(blockKey);
        this.onSetBlock.fire(blockKey);
    }

    /**
     * @function hasBlock
     * @description Check if a block exists at the given key.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey] - Block key.
     * @return {boolean} - Whether the block exists or not.
     */
    public hasBlock(blockKey: MvcBlockKeyType<BlocksType>): boolean {
        if (this.isDataBlocksArray) {
            const index = Number(blockKey);
            return Number.isInteger(index) && index >= 0 && index < (this.dataBlocks as BlockType[]).length;
        }
        return (this.dataBlocks as Map<string, BlockType>).has(blockKey.toString());
    }

    public deleteBlock(blockKey: MvcBlockKeyType<BlocksType>) {
        const block = this.getBlock(blockKey);
        if (!block) return;
        block.clear();
        block.unlink();
        if (this.isDataBlocksArray) {
            const index = Number(blockKey);
            if (Number.isInteger(index) && index >= 0 && index < (this.dataBlocks as BlockType[]).length) {
                (this.dataBlocks as BlockType[]).splice(index, 1);
            }
        } else {
            (this.dataBlocks as Map<string, BlockType>).delete(blockKey.toString());
        }
    }

    /**
     * @function addBlock
     * @description Adds a new block into the structure. Appends or inserts based on key if using array.
     * @param {DataType} value - The block data.
     * @param {IdType} [id] - Optional block ID.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey] - Block key (used for insertion in arrays).
     * @param {boolean} [initialize=true] - Whether to initialize after adding.
     */
    public addBlock(value: DataType | BlockType, id?: IdType, blockKey?: MvcBlockKeyType<BlocksType>, initialize: boolean = true): number | void {
        if (!this.isDataBlocksArray) return this.setBlock(value, id, blockKey, initialize);
        const block = this.createBlock(value, id, false);

        let index = Number(blockKey);
        if (!Number.isInteger(index) || index < 0) index = (this.dataBlocks as BlockType[]).length;
        (this.dataBlocks as BlockType[]).splice(index, 0, block);
        if (initialize) this.initialize(index as any);
        return index;
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
        return this.getBlock(blockKey)?.get(key);
    }

    /**
     * @function getDataAt
     * @description Retrieves the value associated with a given flat key.
     * @param {MvcFlatKeyType<BlocksType>} flatKey - The flat key to retrieve.
     * @returns {unknown} The value associated with the key, or null if not found.
     */
    public getDataAt(flatKey: MvcFlatKeyType<BlocksType>): any {
        const scopedKey = this.scopeKey(flatKey);
        if (isUndefined(scopedKey.key) || isUndefined(scopedKey.blockKey)) return;
        return this.getData(scopedKey.key, scopedKey.blockKey);
    }

    /**
     * @function setData
     * @description Sets the value for a given key in the specified block and triggers callbacks (if enabled).
     * @param {KeyType} key - The key to update.
     * @param {unknown} value - The value to assign.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to update.
     */
    public setData(key: KeyType, value: unknown, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): void {
        return this.getBlock(blockKey)?.set(key, value);
    }

    /**
     * @function setDataAt
     * @description Sets the value for a given flat key and triggers callbacks (if enabled).
     * @param {MvcFlatKeyType<BlocksType>} flatKey - The flat key to update.
     * @param {unknown} value - The value to assign.
     */
    public setDataAt(flatKey: MvcFlatKeyType<BlocksType>, value: unknown): void {
        const scopedKey = this.scopeKey(flatKey);
        if (isUndefined(scopedKey.key) || isUndefined(scopedKey.blockKey)) return;
        return this.setData(scopedKey.key, value, scopedKey.blockKey);
    }

    public addData(value: unknown, key?: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): KeyType | void {
        return this.getBlock(blockKey)?.add(value, key);
    }

    public addDataAt(value: unknown, flatKey?: MvcFlatKeyType<BlocksType>): KeyType | void {
        const scopedKey = this.scopeKey(flatKey);
        if (isUndefined(scopedKey.key) || isUndefined(scopedKey.blockKey)) return;
        return this.addData(value, scopedKey.key, scopedKey.blockKey);
    }

    /**
     * @function hasData
     * @description Checks the value for a given key in the specified block and triggers callbacks (if enabled).
     * @param {KeyType} key - The key to update.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to update.
     */
    public hasData(key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): boolean {
        return this.getBlock(blockKey)?.has(key);
    }

    /**
     * @function hasDataAt
     * @description Sets the value for a given flat key in the specified block and triggers callbacks (if enabled).
     * @param {MvcFlatKeyType<BlocksType>} flatKey - The flat key to check.
     */
    public hasDataAt(flatKey: MvcFlatKeyType<BlocksType>): boolean {
        const scopedKey = this.scopeKey(flatKey);
        if (isUndefined(scopedKey.key) || isUndefined(scopedKey.blockKey)) return false;
        return this.hasData(scopedKey.key, scopedKey.blockKey);
    }

    public deleteData(key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
        return this.getBlock(blockKey)?.delete(key);
    }

    public deleteDataAt(flatKey: MvcFlatKeyType<BlocksType>) {
        const scopedKey = this.scopeKey(flatKey);
        if (isUndefined(scopedKey.key) || isUndefined(scopedKey.blockKey)) return false;
        return this.deleteData(scopedKey.key, scopedKey.blockKey);
    }

    /**
     * @function getSize
     * @description Returns the size of the specified block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to check.
     * @returns {number} The size.
     */
    public getSize(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): number {
        return this.getBlock(blockKey)?.size ?? 0;
    }

    public toJSON(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
        return this.getBlock(blockKey)?.toJSON();
    }

    /**
     * @function getBlockData
     * @description Retrieves the data from a specific block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     * @returns {DataType} The block's data or  if it doesn't exist.
     */
    public getBlockData(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): DataType {
        return this.getBlock(blockKey)?.data;
    }

    /**
     * @function getBlockId
     * @description Retrieves the ID from a specific block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     * @returns {IdType} The block ID or null.
     */
    public getBlockId(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): IdType {
        return this.getBlock(blockKey)?.id;
    }

    /**
     * @function setBlockId
     * @description Sets the ID for a specific block.
     * @param {IdType} value - The new ID.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block key.
     */
    public setBlockId(value: IdType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): void {
        if (!value) return;
        const block = this.getBlock(blockKey);
        if (block) block.id = value;
    }

    /**
     * @function fireCallback
     * @description Fires the emitter's change callback for the given key in the default blocks.
     * @param {string | KeyType} key - The key to fire for.
     * @param {...any[]} args - Additional arguments.
     */
    protected fireCallback(key: string | KeyType, ...args: any[]) {
        this.keyChangedCallback.fire(key as KeyType, this.defaultBlockKey, ...args);
    }

    /**
     * @function fireBlockCallback
     * @description Fires the emitter's change callback for the given key in a specific block with custom arguments.
     * @param {string | KeyType} key - The key to fire for.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block key.
     * @param {...any[]} args - Additional arguments.
     */
    protected fireBlockCallback(key: string | KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey, ...args: any[]) {
        if (!this.isValidBlockKey(blockKey)) blockKey = this.getAllBlockKeys()[0];
        this.keyChangedCallback.fire(key as KeyType, blockKey, ...args);
        const value = this.getBlock(blockKey)?.get(key as KeyType);
        this.changeObservers.toArray().forEach(observer =>
            observer.keyChanged(key as KeyType, value, false, blockKey as any));
    }

    /**
     * @function initialize
     * @description Initializes the block at the given key, and triggers callbacks for all the keys in its data.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    public initialize(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
        this.getBlock(blockKey)?.initialize();
    }

    /**
     * @function clear
     * @description Clears the block data at the given key.
     * @param clearData
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    public clear(clearData: boolean = true, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
        this.getBlock(blockKey)?.clear(clearData);
    }

    /**
     * @description The default block key based on whether the data structure is an array or map.
     */
    public get defaultBlockKey(): MvcBlockKeyType<BlocksType> {
        return (this.isDataBlocksArray ? 0 : "__turbo_default_block_key__") as MvcBlockKeyType<BlocksType>;
    }

    /**
     * @description The default block key if there's only one block, otherwise null.
     */
    protected get defaultComputationBlockKey(): MvcBlockKeyType<BlocksType> {
        const size = this.isDataBlocksArray
            ? (this.dataBlocks as BlockType[]).length
            : (this.dataBlocks as Map<string, BlockType>).size;
        return size > 1 ? null : this.defaultBlockKey;
    }

    /**
     * @function isValidBlockKey
     * @description Checks if the block key is a valid string or number.
     * @param {MvcBlockKeyType<BlocksType>} blockKey - The block key to validate.
     * @returns {boolean} True if valid, false otherwise.
     */
    protected isValidBlockKey(blockKey: MvcBlockKeyType<BlocksType>): boolean {
        return blockKey !== undefined && blockKey !== null
            && ((typeof blockKey === "string" && blockKey.length !== 0)
                || typeof blockKey === "number");
    }

    /**
     * @function getAllBlockKeys
     * @description Retrieves all block keys in the model.
     * @returns {MvcBlockKeyType<BlocksType>[]} Array of block keys.
     */
    public getAllBlockKeys(): MvcBlockKeyType<BlocksType>[] {
        if (this.isDataBlocksArray) return (this.dataBlocks as BlockType[]).map((_, index) => index as MvcBlockKeyType<BlocksType>);
        else return Array.from((this.dataBlocks as Map<string, BlockType>).keys()) as MvcBlockKeyType<BlocksType>[];
    }

    /**
     * @function getAllBlockIds
     * @description Retrieves all block (data) IDs in the model.
     * @returns {IdType[]} Array of IDs.
     */
    public getAllBlockIds(): IdType[] {
        return this.getAllBlocks().map(block => block.id);
    }

    /**
     * @function getAllBlocks
     * @description Retrieves all blocks or a specific one if blockKey is defined.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {BlockType[]} Array of blocks.
     */
    public getAllBlocks(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): BlockType[] {
        const output: BlockType[] = [];

        if (blockKey !== null) {
            const block = this.getBlock(blockKey);
            if (block) output.push(block);
        } else {
            for (const key of this.getAllBlockKeys()) {
                const block = this.getBlock(key);
                if (block) output.push(block);
            }
        }

        return output;
    }

    public getBlockKey(block: TurboDataBlock<DataType, KeyType, IdType>): MvcBlockKeyType<BlocksType> {
        for (const blockKey of this.getAllBlockKeys()) {
            if (this.getBlock(blockKey) === block) return blockKey;
        }
    }

    /**
     * @function getAllKeys
     * @description Retrieves all keys within the given block(s).
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {KeyType[]} Array of keys.
     */
    public getAllKeys(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): KeyType[] {
        return this.getAllBlocks(blockKey).flatMap(block => block.keys);
    }

    /**
     * @function getAllValues
     * @description Retrieves all values across block(s).
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {unknown[]} Array of values.
     */
    public getAllValues(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): any[] {
        return this.getAllBlocks(blockKey).flatMap(block => block.values);
    }

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

    public generateObserver<DataEntryType = any, ComponentType extends object = object>(
        properties: TurboObserverProperties<DataEntryType, ComponentType, KeyType, MvcBlockKeyType<BlocksType>> = {}
    ): TurboObserver<DataEntryType, ComponentType, KeyType, MvcBlockKeyType<BlocksType>> {
        const observer = new (
            properties.customConstructor
            ?? this.observerConstructor
            ?? TurboObserver<DataEntryType, ComponentType, KeyType>
        )({
            ...properties as any,
            onDestroy: () => this.changeObservers.delete(observer),
            onInitialize: () => {
                for (const blockKey of this.getAllBlockKeys()) {
                    for (const key of this.getAllKeys(blockKey)) {
                        observer.keyChanged(key, this.getData(key, blockKey), false, blockKey);
                    }
                }
            }
        }) as any;

        this.changeObservers.add(observer);
        return observer;
    }

    public flattenKey(key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): MvcFlatKeyType<BlocksType> {
        if (Array.isArray(this.dataBlocks)) {
            let globalIndex = 0;
            for (const bk of this.getAllBlockKeys().sort(alphabeticalSorting)) {
                if (bk === blockKey) break;
                globalIndex += this.getSize(bk);
            }

            return (globalIndex + Number(key)) as MvcFlatKeyType<BlocksType>;
        } else {
            return (blockKey.toString() + "|" + key.toString()) as MvcFlatKeyType<BlocksType>;
        }
    }

    public scopeKey(flatKey: MvcFlatKeyType<BlocksType>): ScopedKey<KeyType, MvcBlockKeyType<BlocksType>> {
        if (typeof flatKey === "string") {
            const split = flatKey.toString().split("|");
            if (split.length < 2) return {};
            return {blockKey: split[0], key: split[1]} as ScopedKey<KeyType, MvcBlockKeyType<BlocksType>>;
        }

        const blockKeys = this.getAllBlockKeys().sort(alphabeticalSorting);
        if (typeof flatKey === "number") {
            if (flatKey < 0) return {blockKey: 0, key: 0} as ScopedKey<KeyType, MvcBlockKeyType<BlocksType>>;
            let index: number = flatKey;
            for (const blockKey of blockKeys) {
                const size = this.getSize(blockKey);
                if (index < size) return {blockKey, key: index as KeyType};
                index -= size;
            }
        }

        const lastBlockKey = blockKeys[blockKeys.length - 1];
        return {blockKey: lastBlockKey, key: this.getSize(lastBlockKey) as KeyType};
    }
}

export {TurboModel};