import {TurboDataBlock} from "./dataBlock";
import {Delegate} from "../../datatypes/delegate/delegate";

/**
 * @group Components
 * @category TurboDataBlock
 */
type DataBlockProperties<
    DataType = any,
    IdType extends string | number | symbol = any
> = {
    id?: IdType,
    data?: DataType,
};

/**
 * @group Components
 * @category TurboDataBlock
 */
type DataBlockHost<
    DataType = any,
    KeyType extends string | number | symbol = any,
    IdType extends string | number | symbol = any
> = {
    onDirty?: (key: KeyType, block: TurboDataBlock<DataType, KeyType, IdType>) => void;
    onChange?: (key: KeyType, value: unknown, block: TurboDataBlock<DataType, KeyType, IdType>) => void;
};

/**
 * @group Components
 * @category TurboDataBlock
 */
type BlockChangeObserver<
    DataType = any,
    ComponentType extends object = any,
    KeyType extends string | number | symbol = string
> = {
    onAdded: Delegate<(data: DataType, id: KeyType) => ComponentType | void>;
    onUpdated: Delegate<(data: DataType, instance: ComponentType, id: KeyType) => void>;
    onDeleted: Delegate<(data: DataType, instance: ComponentType, id: KeyType) => void>;

    instances: Map<KeyType, ComponentType>;
    getInstance(key: KeyType): ComponentType;
    getAllInstances(): ComponentType[];

    initialize(): void;
    clear(): void;
    destroy(): void;
};

/**
 * @group Components
 * @category TurboDataBlock
 */
type BlockChangeObserverProperties<
    DataType = any,
    ComponentType extends object = any,
    KeyType extends string | number | symbol = string,
> = {
    initialize?: boolean,
    onAdded?: (data: DataType, id: KeyType) => ComponentType | void,
    onUpdated?: (data: DataType, instance: ComponentType, id: KeyType) => void,
    onDeleted?: (data: DataType, instance: ComponentType, id: KeyType) => void
};

export {DataBlockProperties, DataBlockHost, BlockChangeObserver, BlockChangeObserverProperties};