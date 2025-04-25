import {TurboModel} from "./turboModel";

class TurboEmitter<ModelType extends TurboModel = TurboModel> {
    protected readonly callbacks: Map<string, Map<string, ((...args: any[]) => void)[]>> = new Map();

    public model: ModelType;

    public constructor(model: ModelType) {
        this.model = model;
    }

    protected getBlock(blockKey?: number | string) {
        return this.callbacks.get(blockKey.toString());
    }

    protected getOrGenerateBlock(blockKey?: number | string) {
        if (!this.callbacks.has(blockKey.toString())) this.callbacks.set(blockKey.toString(), new Map());
        return this.callbacks.get(blockKey.toString());
    }

    protected getKey(key: string, blockKey?: number | string) {
        const block = this.getBlock(blockKey);
        if (!block) return undefined;
        return block.get(key);
    }

    protected getOrGenerateKey(key: string, blockKey?: number | string) {
        const block = this.getOrGenerateBlock(blockKey);
        if (!block.has(key)) block.set(key, []);
        return block.get(key);
    }

    public addWithBlock(key: string, blockKey: number | string, callback: (...args: any[]) => void): void {
        this.getOrGenerateKey(key, blockKey).push(callback);
    }

    public add(key: string, callback: (...args: any[]) => void): void {
        this.addWithBlock(key, this.model.defaultBlockKey, callback);
    }

    public removeWithBlock(key: string, blockKey: number | string, callback?: (...args: any[]) => void): void {
        if (callback == undefined) this.getBlock(blockKey)?.delete(key);
        else {
            const callbacks = this.getKey(key, blockKey);
            const index = callbacks.indexOf(callback);
            if (index >= 0) callbacks.splice(index, 1);
        }
    }

    public remove(key: string, callback?: (...args: any[]) => void): void {
        this.removeWithBlock(key, this.model.defaultBlockKey, callback);
    }

    public fireWithBlock(key: string, blockKey: string | number, ...args: any[]): void {
        this.callbacks.get(blockKey.toString())?.get(key)?.forEach((callback) => {
            if (callback && typeof callback == "function") callback(...args);
        });
    }

    public fire(key: string, ...args: any[]): void {
        this.fireWithBlock(key, this.model.defaultBlockKey, ...args);
    }
}

export {TurboEmitter};