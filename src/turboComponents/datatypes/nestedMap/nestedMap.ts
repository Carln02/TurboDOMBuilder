import {alphabeticalSorting, isUndefined} from "../../../utils/dataManipulation/misc";
import {ScopedKey} from "./nestedMap.types";
import {stringify} from "../../../utils/dataManipulation/string";

/**
 * @class TurboNestedMap
 * @group Components
 * @category TurboNestedMap
 *
 * @template ValueType - The type of the nested map's values.
 * @template KeyType - The per-value key type.
 * @template BlockKeyType - The block-grouping key type.
 */
class TurboNestedMap<
    ValueType = any,
    KeyType = any,
    BlockKeyType = any,
> {
    protected readonly nestedMap: Map<BlockKeyType, Map<KeyType, ValueType>> = new Map();

    /**
     * @function get
     * @description Retrieve the value at the given `key` within the optional `blockKey`.
     * @param {KeyType} key - Item key.
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     * @returns {ValueType} - The associated value, or `undefined`.
     */
    public get(key: KeyType, blockKey: BlockKeyType = this.defaultBlockKey): ValueType {
        return this.nestedMap.get(blockKey)?.get(key);
    }

    /**
     * @function set
     * @description Set the given value at the given `key` and optional `blockKey`.
     * @param {ValueType} value - The value to set.
     * @param {KeyType} key - The key to set.
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     */
    public set(value: ValueType, key: KeyType, blockKey: BlockKeyType = this.defaultBlockKey) {
        let block = this.nestedMap.get(blockKey);
        if (!block) {
            this.nestedMap.set(blockKey, new Map());
            block = this.nestedMap.get(blockKey);
        }
        block?.set(key, value);
    }

    /**
     * @function getKey
     * @description Find the first (key, blockKey) pair for a given value.
     * @param {ValueType} value - The value to locate.
     * @returns {ScopedKey<KeyType, BlockKeyType>} - The scoped key, or `undefined` if not found.
     */
    public getKey(value: ValueType): ScopedKey<KeyType, BlockKeyType> {
        for (const [blockKey, map] of this.nestedMap.entries()) {
            for (const [key, entry] of map.entries()) {
                if (entry === value) return {blockKey, key};
            }
        }
    }

    /**
     * @function getKeys
     * @description Find all (key, blockKey) pairs for a given value.
     * @param {ValueType} value - The value to locate.
     * @returns {ScopedKey<KeyType, BlockKeyType>[]} - Array of scoped keys.
     */
    public getKeys(value: ValueType): ScopedKey<KeyType, BlockKeyType>[] {
        const result: ScopedKey<KeyType, BlockKeyType>[] = [];
        for (const [blockKey, map] of this.nestedMap.entries()) {
            for (const [key, entry] of map.entries()) {
                if (entry === value) result.push({blockKey, key});
            }
        }
        return result;
    }

    /**
     * @function getFlatKey
     * @description Return the first `flatKey` (global index or flattened string key) for the provided value.
     * @param {ValueType} value - The value to query.
     * @returns {string | number} - Flattened key, or undefined when value not found.
     */
    public getFlatKey(value: ValueType): string | number {
        const scoped = this.getKey(value);
        if (!scoped) return;
        return this.flattenKey(scoped.key, scoped.blockKey);
    }

    /**
     * @function getFromFlatKey
     * @description Get the value at the given `flatKey`.
     * @param {number | string} flatKey - Global index or flattened string key (produced by {@link flattenKey}).
     * @returns {ValueType} - The value, or undefined if not found.
     */
    public getFromFlatKey(flatKey: number | string): ValueType {
        const scoped = this.scopeKey(flatKey);
        if (isUndefined(scoped.blockKey) || isUndefined(scoped.key)) return;
        return this.get(scoped.key, scoped.blockKey);
    }

    /**
     * @function getEntriesForBlock
     * @description Return an array of `[key, value]` pairs for the given `blockKey`, alphabetically sorted by the
     * key values (if compatible).
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     * @returns {[KeyType, ValueType][]} - Array of pairs for the block.
     */
    public getEntriesForBlock(blockKey: BlockKeyType = this.defaultBlockKey): [KeyType, ValueType][] {
        const block = this.nestedMap.get(blockKey);
        if (!block) return [];
        return Array.from(block.entries()).sort((a, b) =>
            alphabeticalSorting(a[0] as any, b[0] as any));
    }

    /**
     * @function getKeysForBlock
     * @description Return the keys for a block alphabetically sorted (if compatible).
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     * @returns {KeyType[]} - Array of keys.
     */
    public getKeysForBlock(blockKey: BlockKeyType = this.defaultBlockKey): KeyType[] {
        return this.getEntriesForBlock(blockKey).map(entry => entry[0]);
    }

    /**
     * @function getValuesForBlock
     * @description Return the values for a block alphabetically sorted by their keys (if compatible).
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     * @returns {ValueType[]} - Array of values.
     */
    public getValuesForBlock(blockKey: BlockKeyType = this.defaultBlockKey): ValueType[] {
        return this.getEntriesForBlock(blockKey).map(entry => entry[1]);
    }

    /**
     * @function getAllKeys
     * @description Return all keys from all blocks. Blocks are visited in alphabetical order of their blockKey
     * (if compatible).
     * @returns {KeyType[]} - Flattened list of all keys.
     */
    public getAllKeys(): KeyType[] {
        return Array.from(this.nestedMap.keys())
            .sort(alphabeticalSorting as any)
            .flatMap(blockKey => this.getKeysForBlock(blockKey));
    }

    /**
     * @function getAllValues
     * @description Return all values from all blocks. Blocks are visited in alphabetical order of their blockKey
     * (if compatible).
     * @returns {ValueType[]} - Flattened list of all values.
     */
    public getAllValues(): ValueType[] {
        return Array.from(this.nestedMap.keys())
            .sort(alphabeticalSorting as any)
            .flatMap(blockKey => this.getValuesForBlock(blockKey));
    }

    /**
     * @function hasKey
     * @description Check whether a value exists at the given `key` inside `blockKey`.
     * @param {KeyType} key - The targeted key.
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     * @returns {boolean} Whether a value exists.
     */
    public hasKey(key: KeyType, blockKey: BlockKeyType = this.defaultBlockKey): boolean {
        return this.nestedMap.get(blockKey)?.has(key) ?? false;
    }

    /**
     * @function hasBlock
     * @description Check whether a block exists at `blockKey`.
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     * @returns {boolean} Whether a block exists.
     */
    public hasBlock(blockKey: BlockKeyType): boolean {
        return this.nestedMap.has(blockKey);
    }

    /**
     * @function getBlockSize
     * @description Get the number of entries inside the target block.
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     * @returns {number} The size of the block.
     */
    public getBlockSize(blockKey: BlockKeyType = this.defaultBlockKey): number {
        return this.nestedMap.get(blockKey)?.size ?? 0;
    }

    /**
     * @function removeKey
     * @description Remove the entry at the given `key` inside `blockKey`.
     * @param {KeyType} key - The key to remove.
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     */
    public removeKey(key: KeyType, blockKey: BlockKeyType = this.defaultBlockKey) {
        this.nestedMap.get(blockKey)?.delete(key);
    }


    /**
     * @function remove
     * @description Remove the first entry with the given value.
     * @param {ValueType} value - The value to remove.
     */
    public remove(value: ValueType) {
        const pos = this.getKey(value);
        if (pos) this.removeKey(pos.key, pos.blockKey);
    }

    /**
     * @function clear
     * @description Remove all entries and reset internal state.
     */
    public clear() {
        for (const [blockKey, map] of this.nestedMap.entries()) {
            for (const key of map.keys()) this.removeKey(key, blockKey);
        }
        this.nestedMap.clear();
    }

    /**
     * @function flattenKey
     * @description Produce a stable, serialized representation of (key, blockKey). For numeric block keys
     * the function returns a numeric global index; otherwise it returns a `"blockKey|key"` string.
     * @param {KeyType} key - Item key.
     * @param {BlockKeyType} [blockKey=this.defaultBlockKey] - Block grouping key.
     * @returns {number | string} - The flattened key.
     */
    public flattenKey(key: KeyType, blockKey: BlockKeyType = this.defaultBlockKey): string | number {
        const compatibleBlockKey = this.getFlatCompatibleKey(blockKey);
        const compatibleKey = this.getFlatCompatibleKey(key);

        if (compatibleBlockKey === undefined) return;
        if (typeof compatibleBlockKey === "string") return compatibleBlockKey + "|" + compatibleKey.toString();

        let globalIndex = 0;
        for (const bk of Array.from(this.nestedMap.keys()).sort(alphabeticalSorting as any)) {
            if (bk === blockKey) break;
            globalIndex += this.getEntriesForBlock(bk).length;
        }
        return globalIndex + Number(compatibleKey);
    }

    /**
     * @function scopeKey
     * @description Reverse {@link flattenKey}`: if given a string in the form `"blockKey|key"`, it returns `{blockKey, key}`.
     * @param {number | string} flatKey - Flattened key or global index.
     * @returns {ScopedKey<KeyType, BlockKeyType>} - The scoped key.
     */
    public scopeKey(flatKey: number | string): ScopedKey<KeyType, BlockKeyType> {
        if (typeof flatKey === "string") {
            const split = flatKey.toString().split("|");
            if (split.length < 2) return {};
            return {blockKey: split[0], key: split[1]} as ScopedKey<KeyType, BlockKeyType>;
        }

        const blockKeys = Array.from(this.nestedMap.keys()).sort(alphabeticalSorting as any);
        if (typeof flatKey === "number") {
            if (flatKey < 0) return {blockKey: blockKeys[0] ?? 0, key: 0} as ScopedKey<KeyType, BlockKeyType>;
            let index: number = flatKey;
            for (const blockKey of blockKeys) {
                const size = this.getEntriesForBlock(blockKey).length;
                if (index < size) return {blockKey, key: index as KeyType};
                index -= size;
            }
        }

        const lastBlockKey = blockKeys[blockKeys.length - 1];
        return {blockKey: lastBlockKey, key: this.getEntriesForBlock(lastBlockKey).length as KeyType};
    }

    /**
     * @property defaultBlockKey
     * @protected
     * @description Default block key used when none is supplied. It returns the first blockKey if present,
     * otherwise returns the sentinel `"__default__"`.
     * @returns {BlockKeyType}
     */
    protected get defaultBlockKey(): BlockKeyType {
        const key = Array.from(this.nestedMap.keys())?.[0];
        if (!isUndefined(key)) return key;
        return "__default__" as any;
    }

    protected getFlatCompatibleKey(key: BlockKeyType | KeyType): string | number {
        if (typeof key === "number" || typeof key === "string") return key;
        return stringify(key);
    }

}

export {TurboNestedMap};