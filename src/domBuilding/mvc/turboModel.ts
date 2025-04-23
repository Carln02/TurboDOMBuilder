import {auto} from "../decorators/auto/auto";
import {TurboHandler} from "./turboHandler";

class TurboModel<
    DataType extends object = any,
    DataKeyType extends string | number | symbol = any
> {
    protected readonly dataMap: Map<string, DataType> = new Map();
    protected readonly idMap: Map<string, string> = new Map();

    protected readonly handlers: Map<string, TurboHandler> = new Map();

    public keyChangedCallback: (keyName: DataKeyType, blockKey: string, ...args: any[]) => void;

    public constructor(data?: DataType) {
        this.enabledCallbacks = true;
        this.setDataBlock(data, undefined, this.defaultBlockKey, false);
    }

    public get data(): DataType {
        return this.getDataBlock() as DataType;
    }

    public set data(value: DataType) {
        this.setDataBlock(value);
    }

    public get dataId(): string {
        return this.getDataBlockId();
    }

    public set dataId(value: string) {
        this.setDataBlockId(value);
    }

    @auto()
    public set enabledCallbacks(value: boolean) {}

    protected getData(key: DataKeyType, blockKey?: string): unknown {
        if (!blockKey) return null;
        return this.dataMap.get(blockKey)?.[key as any];
    }

    protected setData(key: DataKeyType, value: unknown, blockKey?: string): void {
        if (!blockKey) return;
        const block = this.dataMap.get(blockKey);
        if (block) block[key as any] = value;
        if (this.enabledCallbacks) this.fireKeyChangedCallback(key, blockKey);
    }

    public getSize(blockKey: string = this.defaultBlockKey): number {
        const block = this.dataMap.get(blockKey);
        return block ? Object.keys(block).length : 0;
    }

    protected getDataBlock(blockKey: string = this.defaultBlockKey): DataType {
        if (!blockKey) return null;
        return this.dataMap.get(blockKey);
    }

    protected setDataBlock(value: DataType, id?: string, blockKey: string = this.defaultBlockKey, initialize: boolean = true) {
        if (!value) return;
        this.dataMap.set(blockKey, value);
        if (id) this.dataMap.set(id, value);
        if (initialize) this.initialize(blockKey);
    }

    protected getDataBlockId(blockKey: string = this.defaultBlockKey): string {
        if (!blockKey) return null;
        return this.idMap.get(blockKey);
    }

    protected setDataBlockId(value: string, blockKey: string = this.defaultBlockKey): void {
        if (!value) return;
        this.idMap.set(blockKey, value);
    }

    protected fireKeyChangedCallback(key: DataKeyType, blockKey: string = this.defaultBlockKey, deleted: boolean = false) {
        if (blockKey == undefined) blockKey = this.dataMap.keys().next().value;
        this.keyChangedCallback(key, blockKey, deleted ? undefined : this.getData(key, blockKey));
    }

    protected fireCallback(key: string | DataKeyType, ...args: any[]) {
        this.keyChangedCallback(key as DataKeyType, this.defaultBlockKey, ...args);
    }

    protected fireBlockCallback(key: string | DataKeyType, blockKey: string = this.defaultBlockKey, ...args: any[]) {
        this.keyChangedCallback(key as DataKeyType, blockKey, ...args);
    }

    public initialize(blockKey: string = this.defaultBlockKey) {
        const block = this.getDataBlock(blockKey);
        if (!block || !this.enabledCallbacks) return;
        Object.keys(block).forEach(key => this.fireKeyChangedCallback(key as DataKeyType, blockKey));
    }

    public clear(blockKey: string = this.defaultBlockKey) {
    }

    public get defaultBlockKey(): string {
        return "__turbo_default_block_key__";
    }

    protected get defaultComputationBlockKey(): string {
        return this.dataMap.size > 1 ? null : this.defaultBlockKey;
    }

    public getAllBlockKeys(): string[] {
        return Array.from(this.dataMap.keys());
    }

    public getAllIds(): string[] {
        return Array.from(this.idMap.values());
    }

    public getAllKeys(blockKey: string = this.defaultComputationBlockKey): DataKeyType[] {
        const output: DataKeyType[] = [];
        if (blockKey) {
            const block = this.dataMap.get(blockKey);
            if (block) output.push(...Object.keys(block) as DataKeyType[]);
        } else {
            for (const block of this.dataMap.values()) {
                if (block) output.push(...Object.keys(block) as DataKeyType[]);
            }
        }
        return output;
    }

    public getAllData(blockKey: string = this.defaultComputationBlockKey): unknown[] {
        const output = [];
        if (blockKey) {
            this.getAllKeys(blockKey)?.forEach(key => output.push(this.getData(key, blockKey)));
        } else {
            for (const curBlockKey of this.dataMap.keys()) {
                this.getAllKeys(curBlockKey)?.forEach(key => output.push(this.getData(key, curBlockKey)));
            }
        }
        return output;
    }

    public getHandler(key: string): TurboHandler {
        return this.handlers.get(key);
    }

    public addHandler(key: string, handler: TurboHandler) {
        this.handlers.set(key, handler);
    }
}

export {TurboModel};