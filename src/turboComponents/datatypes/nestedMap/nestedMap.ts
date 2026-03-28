import {alphabeticalSorting} from "../../../utils/dataManipulation/misc";
import {stringify} from "../../../utils/dataManipulation/string";

class TurboNestedMapNode<KeyType, ValueType> extends Map<KeyType, ValueType> {}

/**
 * @class TurboNestedMap
 * @group Components
 * @category TurboNestedMap
 *
 * @description A map of arbitrary nesting depth, addressed via `...keys` paths.
 *
 * @template ValueType - The type of stored values.
 * @template KeyType - The type of keys at each level of the path. Defaults to `string | symbol | number`.
 */
class TurboNestedMap<ValueType = any, KeyType = string | symbol | number> {
    protected readonly nestedMap: TurboNestedMapNode<KeyType, any> = new TurboNestedMapNode();

    /*
     *
     * GET
     *
     */

    /**
     * @function get
     * @description Retrieve the value at the given key path.
     * @param {...KeyType[]} keys - Ordered path from outermost to innermost key.
     * @returns {ValueType | undefined} The stored value, or `undefined` if not found.
     */
    public get(...keys: KeyType[]): ValueType {
        let node: any = this.nestedMap;
        for (const key of keys) {
            if (!(node instanceof TurboNestedMapNode)) return;
            node = node.get(key);
        }
        return node;
    }

    /**
     * @function getFlat
     * @description Retrieve the value at the given flat key.
     * @param {number | string} flatKey - A flat key produced by {@link flattenKey}.
     * @returns {ValueType | undefined} The stored value, or `undefined` if not found.
     */
    public getFlat(flatKey: number | string): ValueType {
        const keys = this.scopeKey(flatKey);
        if (keys.length) return this.get(...keys) as ValueType;
    }

    /**
     * @function getKey
     * @description Find the key path of the first occurrence of the given value.
     * @param {ValueType} value - The value to locate.
     * @returns {KeyType[] | undefined} The key path, or `undefined` if not found.
     */
    public getKey(value: ValueType): KeyType[] {
        return this.findPaths(this.nestedMap, value, false)[0];
    }

    /**
     * @function getKeys
     * @description Find the key paths of all occurrences of the given value.
     * @param {ValueType} value - The value to locate.
     * @returns {KeyType[][]} Array of key paths.
     */
    public getKeys(value: ValueType): KeyType[][] {
        return this.findPaths(this.nestedMap, value);
    }

    /**
     * @function getFlatKey
     * @description Return the flat key of the first occurrence of the given value.
     * @param {ValueType} value - The value to query.
     * @returns {string | number | undefined} The flat key, or `undefined` if not found.
     */
    public getFlatKey(value: ValueType): string | number {
        const path = this.findPaths(this.nestedMap, value, false)[0];
        if (!path) return undefined;
        return this.flattenKey(...path);
    }

    /*
     *
     * SET
     *
     */

    /**
     * @function set
     * @description Store a value at the given key path. Intermediate nodes are created automatically.
     * @param {ValueType} value - The value to store.
     * @param {...KeyType[]} keys - Ordered path from outermost to innermost key.
     */
    public set(value: ValueType, ...keys: KeyType[]) {
        if (!keys.length) return;
        let node = this.nestedMap;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!node.has(key) || !(node.get(key) instanceof TurboNestedMapNode)) node.set(key, new TurboNestedMapNode());
            node = node.get(key);
        }
        node.set(keys[keys.length - 1], value);
    }

    /**
     * @function setFlat
     * @description Store a value at the given flat key.
     * @param {ValueType} value - The value to store.
     * @param {number | string} flatKey - A flat key produced by {@link flattenKey}.
     */
    public setFlat(value: ValueType, flatKey: number | string) {
        const keys = this.scopeKey(flatKey);
        if (keys.length) this.set(value, ...keys);
    }

    /*
     *
     * HAS
     *
     */

    /**
     * @function has
     * @description Check whether an entry exists at the given key path.
     * @param {...KeyType[]} keys - Ordered path from outermost to innermost key.
     * @returns {boolean}
     */
    public has(...keys: KeyType[]): boolean {
        if (!keys.length) return false;
        const parent = this.get(...keys.slice(0, -1));
        if (!(parent instanceof TurboNestedMapNode)) return false;
        return parent.has(keys[keys.length - 1]);
    }

    /**
     * @function hasFlat
     * @description Check whether an entry exists at the given flat key.
     * @param {number | string} flatKey - A flat key produced by {@link flattenKey}.
     * @returns {boolean}
     */
    public hasFlat(flatKey: number | string): boolean {
        const keys = this.scopeKey(flatKey);
        return keys.length ? this.has(...keys) : false;
    }

    /**
     * @function hasValue
     * @description Check whether the given value exists anywhere in the map.
     * @param {ValueType} value - The value to look for.
     * @returns {boolean}
     */
    public hasValue(value: ValueType): boolean {
        return !!this.getKey(value);
    }

    /*
     *
     * REMOVE
     *
     */

    /**
     * @function remove
     * @description Remove the entry at the given key path.
     * @param {...KeyType[]} keys - Ordered path from outermost to innermost key.
     */
    public remove(...keys: KeyType[]): void {
        if (!keys.length) return;
        const parent = this.get(...keys.slice(0, -1));
        if (parent instanceof TurboNestedMapNode) parent.delete(keys[keys.length - 1]);
    }

    /**
     * @function removeValue
     * @description Remove the first occurrence of the given value.
     * @param {ValueType} value - The value to remove.
     */
    public removeValue(value: ValueType): void {
        const path = this.findPaths(this.nestedMap, value, false)[0];
        if (path) this.remove(...path);
    }

    /**
     * @function removeValues
     * @description Remove all occurrences of the given value.
     * @param {ValueType} value - The value to remove.
     */
    public removeValues(value: ValueType): void {
        this.findPaths(this.nestedMap, value).forEach(path => this.remove(...path));
    }

    /*
     *
     * ENTRIES
     *
     */

    /**
     * @function getEntriesAt
     * @description Return all leaf `[key, value]` pairs under the given path, sorted alphabetically by key.
     * Pass no keys to get all leaf entries in the map.
     * @param {...KeyType[]} keys - Path to the subtree root.
     * @returns {[KeyType, ValueType][]}
     */
    public getEntriesAt(...keys: KeyType[]): [KeyType, ValueType][] {
        return this.getPathsAt(...keys).map(path => [path[path.length - 1], this.get(...path)]);
    }

    /**
     * @description All leaf `[key, value]` pairs in the nested map, sorted alphabetically by key.
     */
    public get entries(): [KeyType, ValueType][] {
        return this.getEntriesAt();
    }

    /*
     *
     * KEYS
     *
     */

    /**
     * @function getKeysAt
     * @description Return all leaf keys under the given path, sorted alphabetically.
     * Pass no keys to get all leaf keys in the map.
     * @param {...KeyType[]} keys - Path to the parent node.
     * @returns {KeyType[]}
     */
    public getKeysAt(...keys: KeyType[]): KeyType[] {
        return this.getEntriesAt(...keys).map(e => e[0]);
    }

    /**
     * @description All leaf keys in the nested map, sorted alphabetically.
     */
    public get keys(): KeyType[] {
        return this.getKeysAt();
    }

    /*
     *
     * VALUES
     *
     */

    /**
     * @function getValuesAt
     * @description Return all leaf values under the given path, sorted alphabetically by key.
     * Pass no keys to get all leaf values in the map.
     * @param {...KeyType[]} keys - Path to the parent node.
     * @returns {ValueType[]}
     */
    public getValuesAt(...keys: KeyType[]): ValueType[] {
        return this.getEntriesAt(...keys).map(e => e[1]);
    }

    /**
     * @description All leaf values in the nested map, sorted alphabetically by key.
     */
    public get values(): ValueType[] {
        return this.getValuesAt();
    }

    /*
     *
     * PATHS
     *
     */

    /**
     * @function getPathsAt
     * @description Return all leaf key paths under the given path.
     * Pass no keys to get all leaf paths in the map.
     * @param {...KeyType[]} keys - Path to the subtree root.
     * @returns {KeyType[][]}
     */
    public getPathsAt(...keys: KeyType[]): KeyType[][] {
        return this.findPaths(this.get(...keys) as Map<KeyType, any>);
    }

    /**
     * @description All leaf key paths in the map.
     */
    public get paths(): KeyType[][] {
        return this.getPathsAt();
    }

    /*
     *
     * SIZE
     *
     */

    /**
     * @function getSizeAt
     * @description Return the number of leaf entries under the given path.
     * Pass no keys to get the number of all leaf entries.
     * @param {...KeyType[]} keys - Path to the root.
     * @returns {number}
     */
    public getSizeAt(...keys: KeyType[]): number {
        return this.getPathsAt(...keys).length;
    }

    /**
     * @description Number of all leaf entries in the nested map.
     */
    public get size(): number {
        return this.getSizeAt();
    }

    /*
     *
     * SCOPE AND FLAT UTILS
     *
     */

    /**
     * @function flattenKey
     * @description Serialize a key path into a single flat key.
     * - Fully numeric paths produce a numeric global leaf index.
     * - All other paths produce a `"k0|k1|k2|..."` string.
     * @param {...KeyType[]} keys - The key path to serialize.
     * @returns {string | number | undefined} The flat key, or `undefined` if the path is invalid.
     */
    public flattenKey(...keys: KeyType[]): string | number {
        if (!keys.length) return;

        const compatible = keys.map(k => this.getFlatCompatibleKey(k));
        if (compatible.some(k => k === undefined)) return;

        if (compatible.every(k => typeof k === "number")) {
            let index = 0;
            const allLeafPaths = this.findPaths(this.nestedMap);
            for (const path of allLeafPaths) {
                if (path.length === keys.length && path.every((k, i) => k === keys[i])) return index;
                index++;
            }
        }

        return compatible.map(k => k!.toString()).join("|");
    }

    /**
     * @function scopeKey
     * @description Convert a flat key back into a key path. Reverses {@link flattenKey}.
     * - A string `"k0|k1|k2"` becomes `[k0, k1, k2]`.
     * - A numeric global leaf index becomes the corresponding numeric path.
     * @param {number | string} flatKey - The flat key to convert.
     * @returns {KeyType[] | undefined} The key path, or `undefined` if conversion fails.
     */
    public scopeKey(flatKey: number | string): KeyType[] {
        if (typeof flatKey === "string") {
            const parts = flatKey.split("|") as any;
            return parts.length >= 1 ? parts : undefined;
        }

        if (typeof flatKey === "number") {
            const allLeafPaths = this.findPaths(this.nestedMap);
            if (flatKey < 0) return allLeafPaths[0];
            if (flatKey >= allLeafPaths.length) return allLeafPaths[allLeafPaths.length - 1];
            return allLeafPaths[flatKey];
        }

        return undefined;
    }

    /**
     * @function clear
     * @description Remove all entries from the map.
     */
    public clear(): void {
        this.nestedMap.clear();
    }

    /*
     *
     * PROTECTED
     *
     */

    protected findPaths(
        node: Map<KeyType, any>, target?: ValueType, allPaths: boolean = true, prefix: KeyType[] = []
    ): KeyType[][] {
        if (!node || !(node instanceof TurboNestedMapNode)) return [];

        const results: KeyType[][] = [];
        const entries = Array.from(node.entries())
            .sort((a, b) => alphabeticalSorting(a[0] as any, b[0] as any));

        for (const [key, value] of entries) {
            const path = [...prefix, key];
            if (value instanceof TurboNestedMapNode) {
                const nested = this.findPaths(value, target, allPaths, path);
                if (!allPaths && target !== undefined && nested.length) return nested;
                else results.push(...nested);
            } else {
                if (allPaths && target === undefined) results.push(path);
                else if (value === target) {
                    results.push(path);
                    if (!allPaths) return results;
                }
            }
        }
        return results;
    }

    protected getFlatCompatibleKey(key: any): string | number | undefined {
        if (typeof key === "number" || typeof key === "string") return key;
        const s = stringify(key);
        return s !== undefined ? s : undefined;
    }
}

export {TurboNestedMap};