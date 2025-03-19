class TurboEmitter {
    protected readonly callbacks: Map<string, Map<string, ((...args: any[]) => void)[]>> = new Map();

    protected getBlock(blockKey?: string) {
        return this.callbacks.get(blockKey);
    }

    protected getOrGenerateBlock(blockKey?: string) {
        if (!this.callbacks.has(blockKey)) this.callbacks.set(blockKey, new Map());
        return this.callbacks.get(blockKey);
    }

    protected getKey(key: string, blockKey?: string) {
        const block = this.getBlock(blockKey);
        if (!block) return undefined;
        return block.get(key);
    }

    protected getOrGenerateKey(key: string, blockKey?: string) {
        const block = this.getOrGenerateBlock(blockKey);
        if (!block.has(key)) block.set(key, []);
        return block.get(key);
    }

    public add(key: string, callback: (...args: any[]) => void, blockKey?: string): void {
        this.getOrGenerateKey(key, blockKey).push(callback);
    }

    public remove(key: string, callback?: (...args: any[]) => void, blockKey?: string): void {
        if (callback == undefined) this.getBlock(blockKey)?.delete(key);
        else {
            const callbacks = this.getKey(key, blockKey);
            const index = callbacks.indexOf(callback);
            if (index >= 0) callbacks.splice(index, 1);
        }
    }

    public fire(key: string, blockKey: string, ...args: any[]): void {
        this.callbacks.get(blockKey)?.get(key)?.forEach((callback) => {
            if (callback && typeof callback == "function") callback(...args);
        });
    }
}

export {TurboEmitter};