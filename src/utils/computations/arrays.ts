/**
 * Inserts `item` into `array` using binary search.
 * Keeps array sorted according to `compare`.
 *
 * @returns the index where the item was inserted
 */
export function binaryInsert<Type = any>(array: Type[], item: Type, compare: (a: Type, b: Type) => number): number {
    let low = 0;
    let high = array.length;

    while (low < high) {
        const mid = (low + high) >>> 1;
        if (compare(array[mid], item) <= 0) low = mid + 1;
        else high = mid;
    }

    array.splice(low, 0, item);
    return low;
}
