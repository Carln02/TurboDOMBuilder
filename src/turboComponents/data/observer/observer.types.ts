import {TurboObserver} from "./observer";

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
    KeyType extends string | number | symbol = string,
    BlockKeyType extends string | number = string,
> = {
    customConstructor?: new (...args: any[]) => TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>,

    initialize?: boolean,

    onAdded?: (data: DataType, id: KeyType, self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>,
               blockKey?: BlockKeyType) => ComponentType | void,
    onUpdated?: (data: DataType, instance: ComponentType, id: KeyType,
                 self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>, blockKey?: BlockKeyType) => void,
    onDeleted?: (data: DataType, instance: ComponentType, id: KeyType,
                 self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>, blockKey?: BlockKeyType) => void,

    onInitialize?: (self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>) => void,
    onDestroy?: (self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>) => void,
};

export {TurboObserverProperties};