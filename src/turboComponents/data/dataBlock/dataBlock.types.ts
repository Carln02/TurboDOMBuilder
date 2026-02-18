import {TurboDataBlock} from "./dataBlock";

/**
 * @type DataBlockProperties
 * @group Components
 * @category TurboDataBlock
 *
 * @description Configuration object used when creating a {@link TurboDataBlock}.
 * @template DataType - The type of data stored in the block.
 * @template IdType - The type of the data's ID.
 * @property {IdType} [id] - Optional ID attached to the block. Useful to reference the data in a nested structure.
 * @property {DataType} [data] - Initial data.
 * @property {boolean} [initialize] - If true, {@link TurboDataBlock.initialize} is called immediately after
 * construction.
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
 * @type DataBlockHost
 * @group Components
 * @category TurboDataBlock
 *
 * @description Interface implemented by objects that host a {@link TurboDataBlock}.
 * The host receives lifecycle callbacks whenever the block mutates. This allows
 * higher-level structures (such as TurboModels) to react to low-level data changes.
 *
 * @template DataType - The type stored in the block.
 * @template KeyType - The key/index type of entries.
 * @template IdType - The identifier type of the block.
 *
 * @property {(key: KeyType, block: TurboDataBlock<DataType, KeyType, IdType>) => void} [onDirty] -
 * Called whenever a key is modified *before* external callbacks are fired. Useful to mark bound signals as dirty.
 * @property {(key: KeyType, value: unknown, block: TurboDataBlock<DataType, KeyType, IdType>) => void} [onChange]
 * Called after a change has been committed and callbacks are enabled. Provides the key that changed and its new value.
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