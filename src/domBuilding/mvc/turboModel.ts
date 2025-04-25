import {auto} from "../decorators/auto/auto";
import {TurboHandler} from "./turboHandler";
import {MvcBlockKeyType, MvcBlocksType, MvcDataBlock} from "./mvc.types";

class TurboModel<
    DataType = any,
    KeyType extends string | number | symbol = any,
    IdType extends string | number | symbol = any,
    BlocksType extends "array" | "map" = "array" | "map",
    BlockType extends MvcDataBlock<DataType, IdType> = MvcDataBlock<DataType, IdType>
> {
    protected readonly isDataBlocksArray: boolean = false;
    protected readonly dataBlocks: MvcBlocksType<BlocksType, BlockType>;

    protected readonly handlers: Map<string, TurboHandler> = new Map();

    public keyChangedCallback: (keyName: KeyType, blockKey: MvcBlockKeyType<BlocksType>, ...args: any[]) => void;

    public constructor(data?: DataType, dataBlocksType?: BlocksType) {
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

    public get data(): DataType {
        return this.getBlockData();
    }

    public set data(value: DataType) {
        this.setBlock(value);
    }

    public get dataId(): IdType {
        return this.getBlockId();
    }

    public set dataId(value: IdType) {
        this.setBlockId(value);
    }

    @auto()
    public set enabledCallbacks(value: boolean) {}

    protected getData(key: KeyType, blockKey?: MvcBlockKeyType<BlocksType>): unknown {
        if (!blockKey === undefined) return null;
        return this.getBlockData(blockKey)?.[key as any];
    }

    protected setData(key: KeyType, value: unknown, blockKey?: MvcBlockKeyType<BlocksType>): void {
        if (!blockKey === undefined) return;
        const data = this.getBlockData(blockKey);
        if (data) (data as any)[key] = value;
        if (this.enabledCallbacks) this.fireKeyChangedCallback(key, blockKey);
    }

    public getSize(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): number {
        return this.getAllKeys(blockKey)?.length ?? 0;
    }

    protected getBlock(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): BlockType | null {
        if (blockKey === undefined) return null;

        if (this.isDataBlocksArray) {
            const index = Number(blockKey);
            return Number.isInteger(index) && index >= 0
                ? (this.dataBlocks as BlockType[])[index] ?? null
                : null;
        } else {
            return (this.dataBlocks as Map<string, BlockType>).get(blockKey.toString()) ?? null;
        }
    }

    protected createBlock(value: DataType, id?: IdType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): BlockType {
        return {id: id ?? null, data: value} as BlockType;
    }

    protected setBlock(
        value: DataType,
        id?: IdType,
        blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey,
        initialize: boolean = true
    ) {
        if (!value || !blockKey) return;
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

    protected hasBlock(blockKey: MvcBlockKeyType<BlocksType>): boolean {
        if (this.isDataBlocksArray) {
            const index = Number(blockKey);
            return Number.isInteger(index) && index >= 0 && index < (this.dataBlocks as BlockType[]).length;
        }
        return (this.dataBlocks as Map<string, BlockType>).has(blockKey.toString());
    }

    public addBlock(value: DataType, id?: IdType, blockKey?: MvcBlockKeyType<BlocksType>, initialize: boolean = true): void {
        if (!value) return;
        if (!this.isDataBlocksArray) return this.setBlock(value, id, blockKey, initialize);
        const block = this.createBlock(value, id, blockKey);

        let index = Number(blockKey);
        if (!Number.isInteger(index) || index < 0) index = (this.dataBlocks as BlockType[]).length;
        (this.dataBlocks as BlockType[]).splice(index, 0, block);
        if (initialize) this.initialize(index as MvcBlockKeyType<BlocksType>);
    }

    protected getBlockData(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): DataType | null {
        const block = this.getBlock(blockKey);
        return block ? block.data : null;
    }

    protected getBlockId(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): IdType | null {
        const block = this.getBlock(blockKey);
        return block ? block.id : null;
    }

    protected setBlockId(value: IdType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey): void {
        if (!value) return;
        const block = this.getBlock(blockKey);
        if (block) block.id = value;
    }

    protected fireKeyChangedCallback(key: KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey, deleted: boolean = false) {
        if (blockKey === undefined) blockKey = this.getAllBlockKeys()[0];
        this.keyChangedCallback(key, blockKey, deleted ? undefined : this.getData(key, blockKey));
    }

    protected fireCallback(key: string | KeyType, ...args: any[]) {
        this.keyChangedCallback(key as KeyType, this.defaultBlockKey, ...args);
    }

    protected fireBlockCallback(key: string | KeyType, blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey, ...args: any[]) {
        this.keyChangedCallback(key as KeyType, blockKey, ...args);
    }

    public initialize(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
        const keys = this.getAllKeys(blockKey);
        if (!keys || !this.enabledCallbacks) return;
        keys.forEach(key => this.fireKeyChangedCallback(key as KeyType, blockKey));
    }

    public clear(blockKey: MvcBlockKeyType<BlocksType> = this.defaultBlockKey) {
    }

    public get defaultBlockKey(): MvcBlockKeyType<BlocksType> {
        return (this.isDataBlocksArray ? 0 : "__turbo_default_block_key__") as MvcBlockKeyType<BlocksType>;
    }

    protected get defaultComputationBlockKey(): MvcBlockKeyType<BlocksType> {
        const size = this.isDataBlocksArray
            ? (this.dataBlocks as BlockType[]).length
            : (this.dataBlocks as Map<string, BlockType>).size;
        return size > 1 ? null : this.defaultBlockKey;
    }

    public getAllBlockKeys(): MvcBlockKeyType<BlocksType>[] {
        if (this.isDataBlocksArray) return (this.dataBlocks as BlockType[]).map((_, index) => index as MvcBlockKeyType<BlocksType>);
        else return Array.from((this.dataBlocks as Map<string, BlockType>).keys()) as MvcBlockKeyType<BlocksType>[];
    }

    public getAllIds(): IdType[] {
        if (this.isDataBlocksArray) return (this.dataBlocks as BlockType[]).map(entry => entry.id);
        else return Array.from((this.dataBlocks as Map<string, BlockType>).values()).map(entry => entry.id);
    }

    protected getAllBlocks(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): BlockType[] {
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

    public getAllKeys(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): KeyType[] {
        return this.getAllBlocks(blockKey).flatMap(block => Object.keys(block.data)) as KeyType[];
    }

    public getAllData(blockKey: MvcBlockKeyType<BlocksType> = this.defaultComputationBlockKey): unknown[] {
        return this.getAllBlocks(blockKey).flatMap(block => Object.values(block.data));
    }

    public getHandler(key: string): TurboHandler {
        return this.handlers.get(key);
    }

    public addHandler(key: string, handler: TurboHandler) {
        this.handlers.set(key, handler);
    }
}

export {TurboModel};