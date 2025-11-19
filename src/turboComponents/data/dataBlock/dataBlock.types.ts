import {TurboDataBlock} from "./dataBlock";

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
    initialize?: boolean
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

export {DataBlockProperties, DataBlockHost};