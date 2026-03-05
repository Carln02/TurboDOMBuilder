import {TurboNodeList} from "./nodeList";

/**
 * @type {NodeListType}
 * @group Components
 * @category TurboNodeList
 *
 * @description Union type representing any value that can be added to or removed from a
 * {@link TurboNodeList}. Accepts a {@link TurboNodeList}, a live DOM {@link HTMLCollection},
 * a {@link NodeListOf}, a {@link Set}, or a plain array.
 *
 * @template {object} EntryType - The type of the nodes held in the collection.
 */
type NodeListType<EntryType extends object = object> = TurboNodeList<EntryType> | HTMLCollection
    | NodeListOf<EntryType & Node> | Set<EntryType> | EntryType[];

export {NodeListType};