import {TurboModel} from "../model/model";
import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {FlatKeyType, KeyType} from "../../types/basic.types";
import {addRegistryCategory, define} from "../../decorators/define/define";

/**
 * @class TurboEmitter
 * @group MVC
 * @category Emitter
 *
 * @template {TurboModel} ModelType - The element's MVC model type.
 * @template {KeyType} DataKeyType - The key type of the MVC's model.
 * @description The base MVC emitter class. Its role is basically an event bus. It allows the different parts of the
 * MVC structure to fire events or listen to some, with various methods.
 */
class TurboEmitter<ModelType extends TurboModel = TurboModel, DataKeyType extends KeyType = KeyType> {
    /**
     * @description Map containing all custom callbacks.
     * @protected
     */
    protected readonly callbacks: Map<string, Delegate<(...args: any[]) => void>> = new Map();

    /**
     * @description Map containing all data callbacks.
     * @protected
     */
    protected readonly dataCallbacks: Map<FlatKeyType, Delegate<(value: any, ...keys: DataKeyType[]) => void>> = new Map();

    /**
     * @description The attached MVC model.
     */
    public model?: ModelType;

    public constructor(model?: ModelType) {
        if (model) this.model = model;
    }

    /**
     * @function add
     * @description Register a callback for the given event name.
     * @param {string} event - The event name.
     * @param {(...args: any[]) => void} callback - The callback to invoke when the event fires.
     */
    public add(event: string, callback: (...args: any[]) => void): void {
        if (!this.callbacks.has(event)) this.callbacks.set(event, new Delegate());
        this.callbacks.get(event)?.add(callback);
    }

    /**
     * @function remove
     * @description Remove a specific callback from the given event, or all callbacks if omitted.
     * @param {string} event - The event name.
     * @param {(...args: any[]) => void} [callback] - The callback to remove. If omitted,
     * all callbacks for the event are removed.
     */
    public remove(event: string, callback?: (...args: any[]) => void): void {
        if (!callback) this.callbacks.delete(event);
        else this.callbacks.get(event)?.remove(callback);
    }

    /**
     * @function fire
     * @description Trigger all callbacks registered for the given event name.
     * @param {string} event - The event name.
     * @param {...any[]} args - Arguments passed to each callback.
     */
    public fire(event: string, ...args: any[]): void {
        this.callbacks.get(event)?.fire(...args);
    }

    /**
     * @function addKey
     * @description Register a callback fired when the entry at the given key path changes in the model.
     * The callback receives the new value as its first argument, followed by the key path as spread arguments.
     * @param {(value: any, ...keys: DataKeyType[]) => void} callback - The callback to register.
     * @param {...DataKeyType[]} keys - Ordered path from outermost to innermost key.
     */
    public addKey(callback: (value: any, ...keys: DataKeyType[]) => void, ...keys: DataKeyType[]): void {
        const flatKey = this.resolveFlatKey(keys);
        if (!this.dataCallbacks.has(flatKey)) this.dataCallbacks.set(flatKey, new Delegate());
        this.dataCallbacks.get(flatKey)?.add(callback);
    }

    /**
     * @function removeKey
     * @description Remove a specific callback for the given key path, or all callbacks if omitted.
     * @param {(value: any, ...keys: DataKeyType[]) => void} [callback] - The callback to remove. If omitted,
     * all callbacks for this path are removed.
     * @param {...DataKeyType[]} keys - Ordered path from outermost to innermost key.
     */
    public removeKey(callback: (value: any, ...keys: DataKeyType[]) => void, ...keys: DataKeyType[]): void {
        const flatKey = this.resolveFlatKey(keys);
        if (!callback) this.dataCallbacks.delete(flatKey);
        else this.dataCallbacks.get(flatKey)?.remove(callback);
    }

    /**
     * @function fireKey
     * @description Trigger all callbacks registered for the given key path.
     * Called automatically when the model fires a change notification at this path.
     * @param {any} value - The new value at the key path.
     * @param {...DataKeyType[]} keys - Ordered path from outermost to innermost key.
     */
    public fireKey(value: any, ...keys: DataKeyType[]): void {
        const flatKey = this.resolveFlatKey(keys);
        this.dataCallbacks.get(flatKey)?.fire(value, ...keys);
    }

    /**
     * @protected
     * @function resolveFlatKey
     * @description Convert a key path to a stable flat string key for internal storage lookup. Joins with `"|"`.
     * @param {DataKeyType[]} keys - The key path to flatten.
     * @returns {FlatKeyType}
     */
    protected resolveFlatKey(keys: DataKeyType[]): FlatKeyType {
        return keys.map(k => typeof k === "symbol" ? `@@${k.description ?? ""}` : String(k)).join("|");
    }
}

addRegistryCategory(TurboEmitter);
define(TurboEmitter);
export {TurboEmitter};