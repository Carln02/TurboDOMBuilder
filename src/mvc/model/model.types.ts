import {TurboObserver} from "./observer";
import {KeyType} from "../../types/basic.types";

/**
 * @type TurboModelProperties
 * @group MVC
 * @category TurboModel
 *
 * @description Configuration object used when creating a {@link TurboModel}.
 * @template DataType - The type of data stored in the model.
 * @template IdType - The type of the data's ID.
 * @property {IdType} [id] - Optional ID attached to the model. Useful to reference the data in a nested structure.
 * @property {DataType} [data] - Initial data.
 * @property {boolean} [initialize] - If true, {@link TurboModel.initialize} is called immediately after
 * construction.
 */
type TurboModelProperties<
    DataType = any,
    IdType extends KeyType = any
> = {
    id?: IdType,
    data?: DataType,
    initialize?: boolean,
    enabledCallbacks?: boolean,
    bubbleChanges?: boolean,
};

/**
 * @type TurboObserverProperties
 * @group Components
 * @category TurboDataBlock
 *
 * @description Configuration object to create a new {@link TurboObserver}.
 *
 * @template DataType - The type of data handled by the observer.
 * @template {object} ComponentType - The instance type created/managed by the observer.
 * @template {string | number | symbol} KeyType - The per-item key type.
 * @template {string | number} BlockKeyType - The block-grouping key type.
 *
 * @property {new(...args:any[]) => TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>} [customConstructor] -
 * Optional custom observer constructor to instantiate instead of the default `TurboObserver`.
 * @property {boolean} [initialize] - If true, the observer is initialized immediately.
 * @property {(data, id, self, blockKey?) => ComponentType | void} [onAdded] - Called when a new item appears.
 * @property {(data, instance, id, self, blockKey?) => void} [onUpdated] - Called when an existing item changes.
 * @property {(data, instance, id, self, blockKey?) => void} [onDeleted] - Called when an item is deleted.
 * @property {(self) => void} [onInitialize] - Called when the observer is initialized.
 * @property {(self) => void} [onDestroy] - Called when the observer is destroyed.
 */
type TurboObserverProperties<
    DataType = any,
    ComponentType extends object = any,
    DataKeyType extends KeyType = KeyType
> = {
    customConstructor?: new (...args: any[]) => TurboObserver<DataType, ComponentType, DataKeyType>,

    depth?: number,
    initialize?: boolean,

    onAdded?: (data: DataType, self: TurboObserver<DataType, ComponentType, DataKeyType>, ...keys: KeyType[]) => ComponentType | void,
    onUpdated?: (data: DataType, instance: ComponentType,
                 self: TurboObserver<DataType, ComponentType, DataKeyType>, ...keys: KeyType[]) => void,
    onDeleted?: (data: DataType, instance: ComponentType,
                 self: TurboObserver<DataType, ComponentType, DataKeyType>, ...keys: KeyType[]) => void,

    onInitialize?: (self: TurboObserver<DataType, ComponentType, DataKeyType>) => void,
    onDestroy?: (self: TurboObserver<DataType, ComponentType, DataKeyType>) => void,
};

export {TurboModelProperties, TurboObserverProperties};