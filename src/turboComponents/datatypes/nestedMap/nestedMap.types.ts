/**
 * @type ScopedKey
 * @group Components
 * @category TurboNestedMap
 *
 * @template KeyType - The per-item key type.
 * @template BlockKeyType - The block-grouping key type.
 *
 * @description Pair containing a `blockKey` and an item `key`.
 */
type ScopedKey<KeyType = any, BlockKeyType = any> = {
    blockKey?: BlockKeyType,
    key?: KeyType,
};

/**
 * @group Components
 * @category TurboNestedStore
 */
type BlockStoreType<
    Type extends "array" | "map" = "map",
    BlockType extends object = object
> = Type extends "map" ? Map<string, BlockType> : BlockType[];

export {ScopedKey, BlockStoreType};