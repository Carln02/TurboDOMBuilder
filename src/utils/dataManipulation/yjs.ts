import {YAbstractType, YArray, YArrayEvent, YEvent, YMap, YMapEvent } from "../../types/yjs.types";
import {randomId} from "../computations/random";
import {hashBySize} from "../computations/hash";

/**
 * @function createYMap
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @description Creates a YMap and populates it with key-value pairs from a plain object.
 * @param {object} data - The initial data to populate the YMap with.
 * @returns {YMap} A new YMap instance.
 */
function createYMap<DataType = object>(data: DataType): YMap & DataType {
    const map = new YMap();
    for (const [key, value] of Object.entries(data)) map.set(key, value);
    return map as YMap & DataType;
}

/**
 * @function createYArray
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @template DataType - The type of the array's content.
 * @description Creates a YArray and populates it with elements from a plain array.
 * @param {DataType[]} data - The array of data to populate the YArray with.
 * @returns {YArray} A new YArray instance.
 */
function createYArray<DataType = object>(data: DataType[]): YArray {
    const array = new YArray();
    array.push(data);
    return array;
}

/**
 * @function addInYMap
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @async
 * @description Adds the provided data in the provided parent in the Yjs document, with a unique ID as its field name.
 * @param {object} data - The data to append to the Yjs document.
 * @param {YMap} parentYMap - The YMap to add the data to.
 * @param {string} [id] - Optional ID to use. If not provided, a unique ID is generated.
 * @returns {Promise<string>} The ID of the inserted data.
 */
async function addInYMap(data: object, parentYMap: YMap, id?: string): Promise<string> {
    const generateId = async () =>
        await hashBySize(parentYMap?.doc?.clientID?.toString(32) + randomId());

    if (!id) {
        id = await generateId();
        while (parentYMap?.get(id) !== undefined) id = await generateId();
    }

    parentYMap.set(id, data);
    return id;
}

/**
 * @function addInYArray
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @description Adds the provided data in the provided parent array in the Yjs document.
 * @param {object} data - The data to append to the Yjs document.
 * @param {YArray} parentYArray - The YArray to which the data should be appended.
 * @param {number} [index] - The index to insert the data at. If omitted or invalid, it is appended at the end.
 * @returns {number} The index where the data was inserted.
 */
function addInYArray(data: object, parentYArray: YArray, index?: number): number {
    if (index == undefined || index > parentYArray.length) {
        index = parentYArray.length;
        parentYArray.push([data]);
    } else {
        if (index < 0) index = 0;
        parentYArray.insert(index, [data]);
    }
    return index;
}

/**
 * @function removeFromYArray
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @description Removes the first occurrence of the given entry from the YArray.
 * @param {unknown} entry - The entry to remove.
 * @param {YArray} parentYArray - The parent YArray.
 * @returns {boolean} True if removed, false otherwise.
 */
function removeFromYArray(entry: unknown, parentYArray: YArray): boolean {
    for (const [index, child] of parentYArray.toArray()) {
        if (entry != child) continue;
        parentYArray.delete(index);
        return true;
    }
    return false;
}

/**
 * @function deepObserveAny
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @description Observes deeply for changes to any of the specified fields and invokes callback when any field
 * changes.
 * @param {YAbstractType} data - The Yjs type to observe.
 * @param {(fieldChanged: string, event: YEvent, target: YAbstractType) => void} callback - The function to call
 * when a matching field changes.
 * @param {...string} fieldNames - List of field names to observe.
 */
function deepObserveAny(
    data: YAbstractType,
    callback: (fieldChanged: string, event: YEvent, target: YAbstractType) => void,
    ...fieldNames: string[]
): void {
    if (!data) return;
    const fields = new Set(fieldNames);
    data.observeDeep((events: YEvent[]) => {
        for (const event of events) {
            const target = event.target;
            const parentMap = target._item?.parent;
            const key = target._item?.parentSub;

            for (const field of fields) {
                if (
                    (event instanceof YMapEvent && event.changes.keys.has(field)) ||
                    (event instanceof YArrayEvent && parentMap instanceof YMap && key === field) ||
                    (event.path?.some(segment => segment === field))
                ) {
                    callback(field, event, target);
                    return;
                }
            }
        }
    });
}

/**
 * @function deepObserveAll
 * @group Utilities
 * @category Yjs
 *
 * @static
 * @description Observes deeply for changes to all specified fields and invokes callback only when all fields
 * have changed.
 * @param {YAbstractType} data - The Yjs type to observe.
 * @param {(event: YEvent, target: YAbstractType) => void} callback - The function to call when all fields change.
 * @param {...string} fieldNames - List of field names to observe.
 */
function deepObserveAll(
    data: YAbstractType,
    callback: (event: YEvent, target: YAbstractType) => void,
    ...fieldNames: string[]
): void {
    if (!data) return;
    const fields = new Set(fieldNames);
    data.observeDeep(events => {
        const changedFields = new Set<string>();

        for (const event of events) {
            const target = event.target;
            const parentMap = target._item?.parent;
            const key = target._item?.parentSub;

            for (const field of fields) {
                if (
                    (event instanceof YMapEvent && event.changes.keys.has(field)) ||
                    (event instanceof YArrayEvent && parentMap instanceof YMap && key === field) ||
                    (event.path?.some(segment => segment === field))
                ) changedFields.add(field);
            }

            if (changedFields.size === fields.size) {
                callback(event, target);
                return;
            }
        }
    });
}

export {deepObserveAll, deepObserveAny, createYMap, createYArray, addInYArray, addInYMap, removeFromYArray};