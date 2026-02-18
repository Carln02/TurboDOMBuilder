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

export {ScopedKey};