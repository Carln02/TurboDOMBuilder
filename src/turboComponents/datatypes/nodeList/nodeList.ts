import {TurboWeakSet} from "../weakSet/weakSet";
import {NodeListType} from "./nodeList.types";

/**
 * @class TurboNodeList
 * @group Components
 * @category TurboNodeList
 *
 * @description A composable, Set-like collection for managing nodes. Supports individual nodes, live DOM
 * collections ({@link HTMLCollection} or {@link NodeListOf}), and nested {@link TurboNodeList} instances as
 * sub-lists. Changes to sub-lists and live DOM collections propagate automatically on iteration.
 *
 * @template {object} Type - The type of the nodes held in the list.
 */
class TurboNodeList<Type extends object = object> {
    private customNodes: TurboWeakSet<Type> = new TurboWeakSet();
    private ignoredMap: WeakMap<Type, boolean> = new WeakMap();
    private domLists: TurboWeakSet<HTMLCollection | NodeListOf<Type & Node>> = new TurboWeakSet();
    private subNodeLists: TurboWeakSet<TurboNodeList<Type>> = new TurboWeakSet();

    /**
     * @constructor
     * @param {NodeListType<Type>} value - The initial value to populate the list with.
     */
    public constructor(value?: NodeListType<Type>) {
        this.list = value;
    }

    /**
     * @description A {@link Set} snapshot of all entries in this list, without duplicates.
     */
    public get list(): Set<Type> {
        return new Set<Type>(this);
    }

    public set list(value: NodeListType<Type>) {
        if (!value) return;
        this.clear();
        this.addEntry(value);
    }

    /**
     * @description An array snapshot of all entries in this list, without duplicates.
     */
    public get array(): Type[] {
        return Array.from(this);
    }

    /**
     * @description The number of entries in this list, ignoring duplicates.
     */
    public get size(): number {
        let count = 0;
        for (const _ of this) count++;
        return count;
    }

    public* [Symbol.iterator](): IterableIterator<Type> {
        const seen = new Set<Type>();
        for (const subNodeList of this.subNodeLists)
            for (const entry of subNodeList)
                if (!this.ignoredMap.get(entry) && !seen.has(entry)) {
                    seen.add(entry);
                    yield entry;
                }
        for (const domList of this.domLists)
            for (const entry of Array.from(domList as any) as Type[])
                if (!this.ignoredMap.get(entry) && !seen.has(entry)) {
                    seen.add(entry);
                    yield entry;
                }
        for (const entry of this.customNodes)
            if (!this.ignoredMap.get(entry) && !seen.has(entry)) {
                seen.add(entry);
                yield entry;
            }
    }

    /**
     * @function add
     * @description Adds one or more entries to the list. Entries may be individual nodes, arrays, sets,
     * {@link HTMLCollection}s, {@link NodeListOf} instances, or nested {@link TurboNodeList}s.
     * @param {...(NodeListType<Type> | Type)[]} entries - The entries to add.
     * @returns {this} Itself, allowing for method chaining.
     */
    public add(...entries: (NodeListType<Type> | Type)[]): this {
        entries.forEach(entry => this.addEntry(entry));
        return this;
    }

    /**
     * @function remove
     * @description Removes one or more entries from the list. Entries may be individual nodes, arrays, sets,
     * {@link HTMLCollection}s, {@link NodeListOf} instances, or nested {@link TurboNodeList}s.
     * @param {...(NodeListType<Type> | Type)[]} entries - The entries to remove.
     * @returns {this} Itself, allowing for method chaining.
     */
    public remove(...entries: (NodeListType<Type> | Type)[]): this {
        entries.forEach(entry => this.removeEntry(entry));
        return this;
    }

    /**
     * @function has
     * @description Checks whether the given entry (or entries) is present in the list.
     * @param {Type | NodeListType<Type>} entry - The entry (or entries) to check.
     * @returns {boolean} Whether the entry (or entries) is present in the list.
     */
    public has(entry: Type | NodeListType<Type>): boolean {
        if (entry instanceof TurboNodeList) return this.subNodeLists.has(entry);
        if (entry instanceof HTMLCollection || entry instanceof NodeList) return this.domLists.has(entry);
        if (entry instanceof Set || entry instanceof Array) {
            const arr = Array.from(entry);
            if (arr.length === 0) return false;
            return arr.every(item => this.has(item));
        }
        if (this.ignoredMap.get(entry)) return false;
        if (this.customNodes.has(entry)) return true;
        for (const subNodeList of this.subNodeLists)
            for (const item of subNodeList.array)
                if (entry === item && !this.ignoredMap.get(item)) return true;
        for (const domList of this.domLists)
            for (const item of Array.from(domList as any) as Type[])
                if (entry === item && !this.ignoredMap.get(item)) return true;
        return false;
    }

    /**
     * @function clear
     * @description Clears all entries from the list.
     * @returns {this} Itself, allowing for method chaining.
     */
    public clear(): this {
        this.customNodes.clear();
        this.ignoredMap = new WeakMap();
        this.domLists.clear();
        this.subNodeLists.clear();
        return this;
    }

    protected addEntry(entry: Type | NodeListType<Type>) {
        if (entry instanceof TurboNodeList) this.subNodeLists.add(entry);
        else if (entry instanceof HTMLCollection || entry instanceof NodeList) this.domLists.add(entry);
        else if (entry instanceof Set || entry instanceof Array)
            for (const item of entry) {
                this.customNodes.add(item);
                this.ignoredMap.set(item, false);
            }
        else {
            this.customNodes.add(entry);
            this.ignoredMap.set(entry, false);
        }
    }

    protected removeEntry(entry: Type | NodeListType<Type>) {
        if (entry instanceof TurboNodeList) this.subNodeLists.delete(entry);
        else if (entry instanceof HTMLCollection || entry instanceof NodeList) this.domLists.delete(entry);
        else if (entry instanceof Set || entry instanceof Array)
            for (const item of entry) {
                this.customNodes.delete(item);
                this.ignoredMap.set(item, true);
            }
        else {
            this.customNodes.delete(entry);
            this.ignoredMap.set(entry, true);
        }
    }
}

export {TurboNodeList};