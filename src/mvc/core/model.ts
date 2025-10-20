import {auto} from "../../decorators/auto/auto";
import {Delegate} from "../../eventHandling/delegate/delegate";
import {MvcBlockKeyType, MvcBlocksType, MvcDataBlock} from "./core.types";
import {TurboHandler} from "../logic/handler";
import {markDirty} from "../../reactivity/reactivity";

/**
 * @class TurboModel
 * @template DataType - The type of the data stored in each block.
 * @template {string | number | symbol} KeyType - The type of the keys used to access data in blocks.
 * @template {string | number | symbol} IdType - The type of the block IDs.
 * @template {"array" | "map"} BlocksType - Whether data blocks are stored as an array or a map.
 * @template {MvcDataBlock<DataType, IdType>} BlockType - The structure of each data block.
 * @description A base class representing a model in MVC, which manages one or more data blocks and handles change
 * propagation.
 */
class TurboModel<
    DataType = any,
    KeyType extends string | number | symbol = any,
    IdType extends string | number | symbol = any,
    BlocksType extends "array" | "map" = "array" | "map",
    BlockType extends MvcDataBlock<DataType, IdType> = MvcDataBlock<DataType, IdType>
> {
    protected readonly isDataBlocksArray: boolean = false;
    protected readonly dataBlocks: MvcBlocksType<BlocksType, BlockType>;

    public handlers: Map<string, TurboHandler>;

    /**
     * @description Delegate triggered when a key changes.
     */
    public keyChangedCallback: Delegate<(keyName: KeyType, blockKey: MvcBlockKeyType<BlocksType>, ...args: any[]) => void>;

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
        this.setBlock(data, undefined, this.defaultBlockKey, false);
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
     * @description Whether callbacks are enabled or disabled.
     */
    @auto() public accessor enabledCallbacks: boolean;

    /**
     * @function getData
     * @description Retrieves the value associated with a given key in the specified block.
     * @param {KeyType} key - The key to retrieve.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block from which to retrieve the
     * data.
     * @returns {unknown} The value associated with the key, or null if not found.
     */
    public getData(key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): unknown {
        if (!this.isValidBlockKey(blockKey)) return null;
        return this.getBlockData(blockKey)?.[key as any];
    }

    /**
     * @function setData
     * @description Sets the value for a given key in the specified block and triggers callbacks (if enabled).
     * @param {KeyType} key - The key to update.
     * @param {unknown} value - The value to assign.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to update.
     */
    public setData(key: KeyType, value: unknown, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): void {
        if (!this.isValidBlockKey(blockKey)) return;
        const data = this.getBlockData(blockKey);
        if (data) (data as any)[key] = value;
        if (this.enabledCallbacks) this.fireKeyChangedCallback(key, blockKey);
    }

    /**
     * @function getSize
     * @description Returns the size of the specified block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to check.
     * @returns {number} The size.
     */
    public getSize(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): number {
        return this.getAllKeys(blockKey)?.length ?? 0;
    }

    /**
     * @function getBlock
     * @description Retrieves the data block for the given blockKey.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key to retrieve.
     * @returns {BlockType | null} The block or null if it doesn't exist.
     */
    public getBlock(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): BlockType | null {
        if (!this.isValidBlockKey(blockKey)) return null;

        if (this.isDataBlocksArray) {
            const index = Number(blockKey);
            return Number.isInteger(index) && index >= 0
                ? (this.dataBlocks as BlockType[])[index] ?? null
                : null;
        } else {
            return (this.dataBlocks as Map<string, BlockType>).get(blockKey.toString()) ?? null;
        }
    }

    /**
     * @function createBlock
     * @description Creates a data block entry.
     * @param {DataType} value - The data of the block.
     * @param {IdType} [id] - The optional ID of the data.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The key of the block.
     * @protected
     * @return {BlockType} - The created block.
     */
    protected createBlock(value: DataType, id?: IdType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): BlockType {
        return {id: id ?? null, data: value} as BlockType;
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
        value: DataType,
        id?: IdType,
        blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey,
        initialize: boolean = true
    ) {
        if (!this.isValidBlockKey(blockKey) || value === null || value === undefined) return;
        const block = this.createBlock(value, id, blockKey);

        if (this.isDataBlocksArray) {
            const index = Number(blockKey);
            if (Number.isInteger(index) && index >= 0) {
                (this.dataBlocks as BlockType[])[index] = block;
            }
        } else {
            (this.dataBlocks as Map<string, BlockType>).set(blockKey.toString(), block);
        }

        if (initialize) this.initialize(blockKey);
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

    /**
     * @function addBlock
     * @description Adds a new block into the structure. Appends or inserts based on key if using array.
     * @param {DataType} value - The block data.
     * @param {IdType} [id] - Optional block ID.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey] - Block key (used for insertion in arrays).
     * @param {boolean} [initialize=true] - Whether to initialize after adding.
     */
    public addBlock(value: DataType, id?: IdType, blockKey?: MvcBlockKeyType<BlocksType>, initialize: boolean = true): void {
        if (!value) return;
        if (!this.isDataBlocksArray) return this.setBlock(value, id, blockKey, initialize);
        const block = this.createBlock(value, id, blockKey);

        let index = Number(blockKey);
        if (!Number.isInteger(index) || index < 0) index = (this.dataBlocks as BlockType[]).length;
        (this.dataBlocks as BlockType[]).splice(index, 0, block);
        if (initialize) this.initialize(index as MvcBlockKeyType<BlocksType>);
    }

    /**
     * @function getBlockData
     * @description Retrieves the data from a specific block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     * @returns {DataType | null} The block's data or  if it doesn't exist.
     */
    public getBlockData(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): DataType | null {
        const block = this.getBlock(blockKey);
        return block ? block.data : null;
    }

    /**
     * @function getBlockId
     * @description Retrieves the ID from a specific block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     * @returns {IdType | null} The block ID or null.
     */
    public getBlockId(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): IdType | null {
        const block = this.getBlock(blockKey);
        return block ? block.id : null;
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
     * @function fireKeyChangedCallback
     * @description Fires the emitter's change callback for the given key in a block, passing it the data at the key's value.
     * @param {KeyType} key - The key that changed.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block where the change occurred.
     * @param {boolean} [deleted=false] - Whether the key was deleted.
     */
    protected fireKeyChangedCallback(key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey, deleted: boolean = false) {
        if (!this.isValidBlockKey(blockKey)) blockKey = this.getAllBlockKeys()[0];
        markDirty(this, key); //TODO CHECK
        this.keyChangedCallback.fire(key, blockKey, deleted ? undefined : this.getData(key, blockKey));
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
    }

    /**
     * @function initialize
     * @description Initializes the block at the given key, and triggers callbacks for all the keys in its data.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    public initialize(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
        const keys = this.getAllKeys(blockKey);
        if (!keys || !this.enabledCallbacks) return;
        keys.forEach(key => this.fireKeyChangedCallback(key as KeyType, blockKey));
    }

    /**
     * @function clear
     * @description Clears the block data at the given key.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    public clear(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
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
     * @function getAllIds
     * @description Retrieves all block (data) IDs in the model.
     * @returns {IdType[]} Array of IDs.
     */
    public getAllIds(): IdType[] {
        if (this.isDataBlocksArray) return (this.dataBlocks as BlockType[]).map(entry => entry.id);
        else return Array.from((this.dataBlocks as Map<string, BlockType>).values()).map(entry => entry.id);
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

    /**
     * @function getAllKeys
     * @description Retrieves all keys within the given block(s).
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {KeyType[]} Array of keys.
     */
    public getAllKeys(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): KeyType[] {
        return this.getAllBlocks(blockKey).flatMap(block => Object.keys(block.data)) as KeyType[];
    }

    /**
     * @function getAllData
     * @description Retrieves all values across block(s).
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {unknown[]} Array of values.
     */
    public getAllData(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): unknown[] {
        return this.getAllBlocks(blockKey).flatMap(block => Object.values(block.data));
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
        return this.handlers.get(key);
    }

    /**
     * @function addHandler
     * @description Registers a TurboHandler for the given key.
     * @param {TurboHandler} handler - The handler instance to register.
     */
    public addHandler(handler: TurboHandler) {
        if (!handler.keyName) return;
        this.handlers.set(handler.keyName, handler);
    }
}

export {TurboModel};