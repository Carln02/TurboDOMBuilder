import {TurboObserver} from "./observer";

/**
 * @group Components
 * @category TurboDataBlock
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

type ScopedKey<
    KeyType extends string | number | symbol = string,
    BlockKeyType extends string | number = string
> = {
    blockKey?: BlockKeyType,
    key?: KeyType,
};

export {TurboObserverProperties, ScopedKey};