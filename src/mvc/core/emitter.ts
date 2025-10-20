import {TurboModel} from "./model";

/**
 * @class TurboEmitter
 * @template {TurboModel} ModelType -The element's MVC model type.
 * @description The base MVC emitter class. Its role is basically an event bus. It allows the different parts of the
 * MVC structure to fire events or listen to some, with various methods.
 */
class TurboEmitter<ModelType extends TurboModel = TurboModel> {
    /**
     * @description Map containing all callbacks.
     * @protected
     */
    protected readonly callbacks: Map<string, Map<string, ((...args: any[]) => void)[]>> = new Map();

    /**
     * @description The attached MVC model.
     */
    public model?: ModelType;

    public constructor(model?: ModelType) {
        if (model) this.model = model;
    }

    private get defaultBlockKey(): string | number {
        if (this.model) return this.model.defaultBlockKey;
        return "__defaultBlockKey__";
    }
    /**
     * @function getBlock
     * @description Retrieves the callback block by the given blockKey.
     * @param {number | string} [blockKey] - The key of the block to retrieve.
     * @protected
     */
    protected getBlock(blockKey?: number | string) {
        return this.callbacks.get(blockKey?.toString());
    }

    /**
     * @function getOrGenerateBlock
     * @description Retrieves or creates a callback map for a given blockKey.
     * @param {number | string} [blockKey] - The block key.
     * @returns {Map<string, ((...args: any[]) => void)[]>} - The ensured callback map.
     * @protected
     */
    protected getOrGenerateBlock(blockKey?: number | string): Map<string, ((...args: any[]) => void)[]> {
        if (!this.callbacks.has(blockKey.toString())) this.callbacks.set(blockKey.toString(), new Map());
        return this.callbacks.get(blockKey.toString());
    }

    /**
     * @function getKey
     * @description Gets all callbacks for a given event key within a block.
     * @param {string} key - The event name.
     * @param {number | string} [blockKey] - The block in which the event is scoped.
     * @returns {((...args: any[]) => void)[]} - An array of callbacks for that event.
     * @protected
     */
    protected getKey(key: string, blockKey?: number | string): ((...args: any[]) => void)[] {
        const block = this.getBlock(blockKey);
        return block ? block.get(key) : [];
    }

    /**
     * @function getOrGenerateKey
     * @description Ensures and returns the array of callbacks for a given event key within a block.
     * @param {string} key - The event name.
     * @param {number | string} [blockKey] - The block in which the event is scoped.
     * @returns {((...args: any[]) => void)[]} - An array of callbacks for that event.
     * @protected
     */
    protected getOrGenerateKey(key: string, blockKey?: number | string): ((...args: any[]) => void)[] {
        const block = this.getOrGenerateBlock(blockKey);
        if (!block.has(key)) block.set(key, []);
        return block.get(key);
    }

    /**
     * @function addWithBlock
     * @description Registers a callback for an event key within a specified block -- usually for the corresponding
     * data block in the model.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block to register the event in.
     * @param {(...args: any[]) => void} callback - The callback function to invoke when the event is fired.
     */
    public addWithBlock(key: string, blockKey: number | string, callback: (...args: any[]) => void): void {
        this.getOrGenerateKey(key, blockKey).push(callback);
    }

    /**
     * @function add
     * @description Registers a callback for an event key in the default block.
     * @param {string} key - The event name.
     * @param {(...args: any[]) => void} callback - The callback function.
     */
    public add(key: string, callback: (...args: any[]) => void): void {
        this.addWithBlock(key, this.defaultBlockKey, callback);
    }

    /**
     * @function removeWithBlock
     * @description Removes a specific callback or all callbacks for a key within a block.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block from which to remove the event.
     * @param {(...args: any[]) => void} [callback] - The specific callback to remove. If undefined, all callbacks
     * for the key are removed.
     */
    public removeWithBlock(key: string, blockKey: number | string, callback?: (...args: any[]) => void): void {
        if (callback == undefined) this.getBlock(blockKey)?.delete(key);
        else {
            const callbacks = this.getKey(key, blockKey);
            const index = callbacks.indexOf(callback);
            if (index >= 0) callbacks.splice(index, 1);
        }
    }

    /**
     * @function remove
     * @description Removes a specific callback or all callbacks for a key in the default block.
     * @param {string} key - The event name.
     * @param {(...args: any[]) => void} [callback] - The callback to remove. If omitted, all callbacks are removed.
     */
    public remove(key: string, callback?: (...args: any[]) => void): void {
        this.removeWithBlock(key, this.defaultBlockKey, callback);
    }

    /**
     * @function fireWithBlock
     * @description Triggers all callbacks associated with an event key in a specified block.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block in which the event is scoped.
     * @param {...any[]} args - Arguments passed to each callback.
     */
    public fireWithBlock(key: string, blockKey: string | number, ...args: any[]): void {
        this.callbacks.get(blockKey.toString())?.get(key)?.forEach((callback) => {
            if (callback && typeof callback == "function") callback(...args);
        });
    }

    /**
     * @function fire
     * @description Triggers all callbacks associated with an event key in the default block.
     * @param {string} key - The event name.
     * @param {...any[]} args - Arguments passed to the callback.
     */
    public fire(key: string, ...args: any[]): void {
        this.fireWithBlock(key, this.defaultBlockKey, ...args);
    }
}

export {TurboEmitter};