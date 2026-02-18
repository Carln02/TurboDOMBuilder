import {Delegate} from "../../datatypes/delegate/delegate";
import {TurboObserverProperties} from "./observer.types";
import {TurboModel} from "../../../mvc/core/model";
import {TurboNestedMap} from "../../datatypes/nestedMap/nestedMap";

/**
 * @class TurboObserver
 * @group Components
 * @category TurboObserver
 *
 * @extends TurboNestedMap
 * @description Generic observer that keeps a set of component instances organized by
 * block key and item key. Useful to maintain UI components or other per-entry objects synchronized with a
 * data source (e.g. a {@link TurboDataBlock} or a {@link TurboModel}).
 *
 * @template DataType - The type of data handled by the observer.
 * @template {object} ComponentType - The instance type created/managed by the observer.
 * @template {string | number | symbol} KeyType - The per-item key type.
 * @template {string | number} BlockKeyType - The block-grouping key type.
 */
class TurboObserver<
    DataType = any,
    ComponentType extends object = any,
    KeyType extends string | number | symbol = string,
    BlockKeyType extends string | number = string,
> extends TurboNestedMap<ComponentType, KeyType, BlockKeyType> {
    protected _isInitialized = false;

    /**
     * @property onAdded
     * @description Delegate called when an item appears for which no component instance exists.
     * Handlers may return a newly-created component instance which will be stored and then receive subsequent
     * `onUpdated` calls.
     */
    public readonly onAdded: Delegate<
        (data: DataType, id: KeyType, self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>,
         blockKey?: BlockKeyType) => ComponentType | void
    > = new Delegate();

    /**
     * @property onUpdated
     * @description Delegate called when an item already has an associated instance and its data changes.
     */
    public readonly onUpdated: Delegate<
        (data: DataType, instance: ComponentType, id: KeyType,
         self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>, blockKey?: BlockKeyType) => void
    > = new Delegate();

    /**
     * @property onDeleted
     * @description Delegate called when an item is removed.
     */
    public readonly onDeleted: Delegate<
        (data: DataType, instance: ComponentType, id: KeyType,
         self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>, blockKey?: BlockKeyType) => void
    > = new Delegate();

    /**
     * @property onInitialize
     * @description Delegate fired when the observer is initialized. Useful to perform initial population steps.
     */
    public readonly onInitialize: Delegate<(self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>) => void> = new Delegate();

    /**
     * @property onDestroy
     * @description Delegate fired when the observer is destroyed.
     */
    public readonly onDestroy: Delegate<(self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>) => void> = new Delegate();

    /**
     * @constructor
     * @description Create a TurboObserver.
     * By default, the observer wires `onUpdated` to update instance data if the instance
     * exposes a {@link TurboModel}, or `data` / `dataId` fields. It also wires `onDeleted` and removes the instance
     * when the associated key is deleted.
     * @param {TurboObserverProperties<DataType, ComponentType, KeyType, BlockKeyType>} [properties] - Initialization
     * options and lifecycle callbacks.
     */
    public constructor(properties: TurboObserverProperties<DataType, ComponentType, KeyType, BlockKeyType> = {}) {
        super();

        const self = this;
        if (properties.onAdded) this.onAdded.add((data, id, self, blockKey) =>
            properties.onAdded(data, id, self, blockKey));

        this.onUpdated.add((data, instance, id, self, blockKey) => {
            if (properties.onUpdated) properties.onUpdated(data, instance, id, self, blockKey);
            else {
                if (typeof instance !== "object") return;
                if ("model" in instance && instance.model instanceof TurboModel) instance.model.setBlock(data, id);
                else {
                    if ("data" in instance) instance.data = data;
                    if ("dataId" in instance) instance.dataId = id.toString();
                }
            }
        });

        this.onDeleted.add((data, instance, id, self, blockKey) => {
            if (properties.onDeleted) properties.onDeleted(data, instance, id, self, blockKey);
            else this.remove(instance);
        });

        if (properties.onInitialize) this.onInitialize.add(() => properties.onInitialize(self));
        if (properties.onDestroy) this.onDestroy.add(() => properties.onDestroy(self));

        if (properties.initialize) this.initialize();
    }

    /**
     * @function removeKey
     * @description Remove the instance associated with `key` inside `blockKey`.
     * @param {KeyType} key - The key to remove.
     * @param {boolean} [removeFromDOM=true] - Whether to call `instance.remove()` when available.
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     */
    public removeKey(key: KeyType, blockKey: BlockKeyType = this.defaultBlockKey, removeFromDOM: boolean = true) {
        const instance = this.get(key, blockKey);
        super.removeKey(key, blockKey);
        if (!instance) return;
        if (removeFromDOM && instance && typeof instance === "object"
            && "remove" in instance && typeof instance.remove == "function") instance?.remove();
    }


    /**
     * @function remove
     * @description Remove a given instance.
     * @param {ComponentType} instance - The instance to remove.
     * @param {boolean} [removeFromDOM=true] - Whether to call `instance.remove()` when available.
     */
    public remove(instance: ComponentType, removeFromDOM: boolean = true) {
        const pos = this.getKey(instance);
        if (pos) this.removeKey(pos.key, pos.blockKey ?? this.defaultBlockKey, removeFromDOM);
    }

    /**
     * @property isInitialized
     * @description Whether the observer has been initialized (i.e. {@link initialize} called).
     */
    public get isInitialized(): boolean {
        return this._isInitialized;
    }

    /**
     * @function initialize
     * @description Invoke `onInitialize` and mark the observer as initialized.
     */
    public initialize() {
        if (this.isInitialized) return;
        this.onInitialize.fire(this);
        this._isInitialized = true;
    }

    /**
     * @function clear
     * @description Remove and destroy all managed instances and reset internal state.
     */
    public clear() {
        super.clear();
        this._isInitialized = false;
    }

    /**
     * @function destroy
     * @description Clear then fire `onDestroy`.
     */
    public destroy() {
        this.clear();
        this.onDestroy.fire(this);
    }

    /**
     * @function keyChanged
     * @description Function to notify the observer of a change at a certain key.
     * @param {KeyType} key - The changed item key.
     * @param {DataType} value - The new value for the item.
     * @param {boolean} [deleted=false] - Whether the item was removed.
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     */
    public keyChanged(key: KeyType, value: DataType, deleted: boolean = false, blockKey: BlockKeyType = this.defaultBlockKey) {
        const existingInstance = this.get(key, blockKey);
        if (existingInstance) {
            if (deleted) this.onDeleted.fire(value, existingInstance, key, this, blockKey);
            else this.onUpdated.fire(value, existingInstance, key, this, blockKey);
            return;
        }
        if (deleted) return;
        const instance = this.onAdded.fire(value, key, this, blockKey);
        if (!instance) return;
        this.set(instance, key, blockKey);
        this.onUpdated.fire(value, instance, key, this, blockKey);
    }
}

export {TurboObserver};