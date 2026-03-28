import {Delegate} from "../../turboComponents/datatypes/delegate/delegate";
import {TurboNestedMap} from "../../turboComponents/datatypes/nestedMap/nestedMap";
import {DataKeyType, TurboObserverProperties} from "./model.types";
import {TurboModel} from "./model";

/**
 * @class TurboObserver
 * @group MVC
 * @category TurboModel
 *
 * @extends TurboNestedMap
 * @description Generic observer that keeps a set of component instances organized by key path.
 * Useful to maintain UI components or other per-entry objects synchronized with a data source
 * ({@link TurboModel}).
 *
 * @template DataType - The type of data handled by the observer.
 * @template {object} ComponentType - The instance type created/managed by the observer.
 * @template {string | number | symbol} KeyType - The key type used at each level of the path.
 */
class TurboObserver<
    DataType = any,
    ComponentType extends object = any,
    KeyType extends DataKeyType = DataKeyType,
> extends TurboNestedMap<ComponentType, KeyType> {
    protected _isInitialized = false;

    /**
     * @property onAdded
     * @description Delegate called when a change is reported at a key path for which no component instance exists yet.
     * Handlers may return a newly-created component instance, which will be stored and passed to subsequent
     * `onUpdated` calls.
     */
    public readonly onAdded: Delegate<
        (data: DataType, self: TurboObserver<DataType, ComponentType, KeyType>, ...keys: KeyType[]) => ComponentType | void
    > = new Delegate();

    /**
     * @property onUpdated
     * @description Delegate called when a change is reported at a key path that already has an associated instance.
     */
    public readonly onUpdated: Delegate<
        (data: DataType, instance: ComponentType,
         self: TurboObserver<DataType, ComponentType, KeyType>, ...keys: KeyType[]) => void
    > = new Delegate();

    /**
     * @property onDeleted
     * @description Delegate called when a key path is reported as deleted.
     */
    public readonly onDeleted: Delegate<
        (data: DataType, instance: ComponentType,
         self: TurboObserver<DataType, ComponentType, KeyType>, ...keys: KeyType[]) => void
    > = new Delegate();

    /**
     * @property onInitialize
     * @description Delegate fired once when the observer is initialized. Useful for initial population.
     */
    public readonly onInitialize: Delegate<(self: TurboObserver<DataType, ComponentType, KeyType>) => void> = new Delegate();

    /**
     * @property onDestroy
     * @description Delegate fired when the observer is destroyed.
     */
    public readonly onDestroy: Delegate<(self: TurboObserver<DataType, ComponentType, KeyType>) => void> = new Delegate();

    /**
     * @constructor
     * @description Create a TurboObserver.
     * By default, `onUpdated` updates the data of the mapped instance if it exposes a {@link TurboModel} model,
     * or `data` / `dataId` fields. `onDeleted` removes the instance from the map and the DOM.
     * @param {TurboObserverProperties<DataType, ComponentType, KeyType>} [properties] - Initialization
     * options and lifecycle callbacks.
     */
    public constructor(properties: TurboObserverProperties<DataType, ComponentType, KeyType> = {}) {
        super();

        if (properties.onAdded) this.onAdded.add((data, self, ...keys) =>
            properties.onAdded(data, self, ...keys));

        this.onUpdated.add((data, instance, self, ...keys) => {
            if (properties.onUpdated) properties.onUpdated(data, instance, self, ...keys);
            else {
                if (typeof instance !== "object") return;
                if ("model" in instance && instance.model instanceof TurboModel) instance.model.set(data, ...keys);
                else {
                    if ("data" in instance) instance.data = data;
                    if ("dataId" in instance) instance.dataId = keys[keys.length - 1].toString();
                }
            }
        });

        this.onDeleted.add((data, instance, self, ...keys) => {
            if (properties.onDeleted) properties.onDeleted(data, instance, self, ...keys);
            else this.removeValue(instance);
        });

        if (properties.onInitialize) this.onInitialize.add((self) => properties.onInitialize(self));
        if (properties.onDestroy) this.onDestroy.add((self) => properties.onDestroy(self));

        if (properties.initialize) this.initialize();
    }

    /**
     * @function remove
     * @description Remove the instance at the given key path from the map and call `instance.remove()` if available.
     * @param {...KeyType[]} keys - Ordered path to the instance.
     */
    public remove(...keys: KeyType[]): void {
        const instance = this.get(...keys);
        super.remove(...keys);
        if (!instance) return;
        if (instance && typeof instance === "object"
            && "remove" in instance && typeof instance.remove == "function") instance?.remove();
    }

    /**
     * @function detach
     * @description Remove the instance at the given key path from the map without calling `instance.remove()`,
     * detaching it from the observer.
     * @param {...KeyType[]} keys - Ordered path to the instance.
     */
    public detach(...keys: KeyType[]): void {
        super.remove(...keys);
    }

    /**
     * @property isInitialized
     * @description Whether the observer has been initialized (i.e. {@link initialize} has been called).
     */
    public get isInitialized(): boolean {
        return this._isInitialized;
    }

    /**
     * @function initialize
     * @description Initialization method that fires `onInitialize`. No-op if already initialized.
     */
    public initialize() {
        if (this.isInitialized) return;
        this.onInitialize.fire(this);
        this._isInitialized = true;
    }

    /**
     * @function clear
     * @description Remove all managed instances, reset the observer to an uninitialized state, and optionally
     * call `instance.remove()` on each instance.
     * @param {boolean} [removeFromDom=true] - Whether to call `instance.remove()` on each managed instance.
     */
    public clear(removeFromDom: boolean = true): void {
        if (removeFromDom) this.values.forEach(instance => {
            if (typeof instance === "object" && "remove" in instance && typeof instance.remove == "function")
                instance.remove();
        });
        super.clear();
        this._isInitialized = false;
    }

    /**
     * @function destroy
     * @description Remove all managed instances, reset the observer to an uninitialized state, optionally
     * call `instance.remove()` on each instance, and fire `onDestroy`.
     * @param {boolean} [removeFromDom=true] - Whether to call `instance.remove()` on each managed instance.
     */
    public destroy(removeFromDom: boolean = true) {
        this.clear(removeFromDom);
        this.onDestroy.fire(this);
    }

    /**
     * @function keyChanged
     * @description Notify the observer of a change at the given key path.
     * Fires `onDeleted` if `deleted` is `true` and an instance exists, `onAdded` if no instance exists yet
     * (storing the returned instance if any), and `onUpdated` otherwise.
     * @param {KeyType[]} keys - The key path that changed.
     * @param {DataType} value - The new value at that path.
     * @param {boolean} [deleted=false] - Whether the entry was deleted.
     */
    public keyChanged(keys: KeyType[], value: DataType, deleted: boolean = false) {
        let instance: ComponentType | void = this.get(...keys);

        if (!instance && deleted) return;
        else if (instance && deleted) {
            this.onDeleted.fire(value, instance, this, ...keys);
            return;
        } else if (!instance) {
            instance = this.onAdded.fire(value, this, ...keys);
            if (!instance) return;
            this.set(instance, ...keys);
        }
        this.onUpdated.fire(value, instance, this, ...keys);
    }
}

export {TurboObserver};