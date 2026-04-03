import {NodeListSlot, NodeListType} from "./nodeList.types";
import {Delegate} from "../delegate/delegate";
import {auto} from "../../../decorators/auto/auto";
import {trim} from "../../../utils/computations/misc";

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
    private slots: WeakRef<NodeListSlot<Type>>[] = [];

    private ignoredMap: WeakMap<Type, boolean> = new WeakMap();
    private domListObservers: Map<HTMLCollection | NodeListOf<Type & Node>, MutationObserver> = new Map();
    private subNodeListHandlers: Map<TurboNodeList<Type>, (entry: Type, state: "added" | "removed") => void> = new Map();

    /**
     * @description Delegate fired whenever an entry is added to or removed from the list, including entries
     * from nested {@link TurboNodeList}s, {@link HTMLCollection}s, and {@link NodeListOf} instances.
     */
    public onChanged: Delegate<(entry: Type, state: "added" | "removed") => void> = new Delegate();

    /**
     * @constructor
     * @param {...(Type | NodeListType<Type>)[]} [values] - Optional initial value(s) to populate the list with.
     */
    public constructor(...values: (Type | NodeListType<Type>)[]) {
        this.add(...values);
    }

    /**
     * @description Whether to observe added {@link HTMLCollection}s and {@link NodeListOf} instances for DOM
     * mutations, automatically firing {@link onChanged} when nodes are added or removed from the DOM.
     */
    @auto({cancelIfUnchanged: true}) public set observeDomLists(value: boolean) {
        if (value) {
            for (const entry of this.slots) {
                const obj = entry.deref();
                if (this.isDomList(obj)) this.attachObserver(obj);
            }
        } else {
            for (const [, observer] of this.domListObservers) observer.disconnect();
            this.domListObservers.clear();
        }
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
     * @description The number of resolved unique entries in this list. For the number of slots, see
     * {@link slotCount}.
     */
    public get size(): number {
        let count = 0;
        for (const _ of this) count++;
        return count;
    }

    /**
     * @description The number of slots in this list. Individual entries, {@link HTMLCollection}s,
     * {@link NodeListOf} instances, and nested {@link TurboNodeList}s each count as one slot, regardless
     * of how many entries they contain. For the number of resolved entries, see {@link size}.
     */
    public get slotCount(): number {
        return this.slots.length;
    }

    /**
     * @function isTurboNodeList
     * @protected
     * @description Type guard — returns true if the given value is a {@link TurboNodeList}.
     * @param {any} entry - The value to check.
     * @returns {boolean} Whether the value is a {@link TurboNodeList}.
     */
    protected isTurboNodeList(entry: any): entry is TurboNodeList<Type> {
        return entry instanceof TurboNodeList;
    }

    /**
     * @function isDomList
     * @protected
     * @description Type guard — returns true if the given value is an {@link HTMLCollection} or
     * {@link NodeListOf}.
     * @param {any} entry - The value to check.
     * @returns {boolean} Whether the value is a DOM list.
     */
    protected isDomList(entry: any): entry is HTMLCollection | NodeListOf<Type & Node> {
        return entry instanceof NodeList || entry instanceof HTMLCollection;
    }

    /**
     * @function isSet
     * @protected
     * @description Type guard — returns true if the given value is a {@link Set} or an array.
     * @param {any} entry - The value to check.
     * @returns {boolean} Whether the value is a Set or array.
     */
    protected isSet(entry: any): entry is Set<Type> | Type[] {
        return entry instanceof Set || Array.isArray(entry);
    }

    /**
     * @function isEntry
     * @protected
     * @description Type guard — returns true if the given value is an individual node entry (i.e. not a
     * {@link TurboNodeList}, DOM list, Set, array, or {@link WeakRef}).
     * @param {any} entry - The value to check.
     * @returns {boolean} Whether the value is an individual entry.
     */
    protected isEntry(entry: any): entry is Type {
        return typeof entry === "object" && entry !== null
            && !this.isTurboNodeList(entry)
            && !this.isDomList(entry)
            && !this.isSet(entry)
            && !(entry instanceof WeakRef);
    }

    /**
     * @description Iterates over all resolved unique entries in slot order, skipping ignored and duplicate
     * entries.
     */
    public* [Symbol.iterator](): IterableIterator<Type> {
        const seen = new Set<Type>();
        for (const slot of this.slots) {
            for (const entry of this.resolveSlot(slot)) {
                if (!this.ignoredMap.get(entry) && !seen.has(entry)) {
                    seen.add(entry);
                    yield entry;
                }
            }
        }
    }

    /**
     * @function resolveSlot
     * @description Resolves a slot {@link WeakRef} into its constituent entries. Yields all entries from
     * sub-lists and DOM lists, or the single entry for individual node slots. Yields nothing if the
     * referent has been garbage collected.
     * @param {WeakRef<NodeListSlot<Type>>} slot - The slot to resolve.
     */
    protected* resolveSlot(slot: WeakRef<NodeListSlot<Type>>): IterableIterator<Type> {
        const obj = slot.deref();
        if (!obj) return;
        if (this.isTurboNodeList(obj)) yield* obj;
        else if (this.isDomList(obj)) yield* Array.from(obj as any) as Type[];
        else yield obj;
    }

    public forEach(callback: (value: Type, set: this) => void, thisArg?: any): this {
        for (const entry of this) {
            callback.call(thisArg, entry, entry, this);
        }
        return this;
    }

    /**
     * @function add
     * @description Adds one or more entries to the end of the list. Entries may be individual nodes,
     * arrays, {@link Set}s, {@link HTMLCollection}s, {@link NodeListOf} instances, or nested
     * {@link TurboNodeList}s.
     * @param {...(NodeListType<Type> | Type)[]} entries - The entries to add.
     * @returns {this} Itself, allowing for method chaining.
     */
    public add(...entries: (NodeListType<Type> | Type)[]): this {
        entries.forEach(entry => this.addEntry(entry));
        return this;
    }

    /**
     * @function addAt
     * @description Adds one or more entries at the given resolved size index. The index refers to the position
     * among resolved unique entries, not slots. Arrays and {@link Set}s are expanded inline.
     * @param {number} index - The resolved entry index to insert at.
     * @param {...(NodeListType<Type> | Type)[]} entries - The entries to add.
     * @returns {this} Itself, allowing for method chaining.
     */
    public addAt(index: number, ...entries: (NodeListType<Type> | Type)[]): this {
        return this.addAtSlot(this.sizeIndexToSlotIndex(index), ...entries);
    }

    /**
     * @function addAtSlot
     * @description Adds one or more entries at the given slot index. Subsequent entries are inserted
     * consecutively after the previous one. Arrays and {@link Set}s are expanded inline, each item
     * occupying the next slot index.
     * @param {number} index - The slot index to insert at.
     * @param {...(NodeListType<Type> | Type)[]} entries - The entries to add.
     * @returns {this} Itself, allowing for method chaining.
     */
    public addAtSlot(index: number, ...entries: (NodeListType<Type> | Type)[]): this {
        entries.forEach(entry => index = this.addEntry(entry, index));
        return this;
    }

    /**
     * @function remove
     * @description Removes one or more entries from the list. Entries may be individual nodes, arrays,
     * {@link Set}s, {@link HTMLCollection}s, {@link NodeListOf} instances, or nested
     * {@link TurboNodeList}s.
     * @param {...(NodeListType<Type> | Type)[]} entries - The entries to remove.
     * @returns {this} Itself, allowing for method chaining.
     */
    public remove(...entries: (NodeListType<Type> | Type)[]): this {
        entries.forEach(entry => this.removeEntry(entry));
        return this;
    }

    /**
     * @function removeAtSlot
     * @description Removes one or more slots starting at the given slot index. Each slot removed may
     * correspond to an individual entry, a DOM list, or a nested {@link TurboNodeList}.
     * @param {number} index - The slot index to start removing from.
     * @param {number} [count=1] - The number of consecutive slots to remove.
     * @returns {this} Itself, allowing for method chaining.
     */
    public removeAtSlot(index: number, count: number = 1): this {
        const toRemove = this.slots.slice(index, index + count)
            .map(s => s.deref()).filter(Boolean);
        for (const slot of toRemove) this.removeEntry(slot);
        return this;
    }

    /**
     * @function move
     * @description Moves an existing entry to the given resolved size index. If the entry is a member of a
     * nested {@link TurboNodeList}, it is moved within that sub-list. If it belongs to a DOM list, it is
     * repositioned in the DOM accordingly.
     * @param {Type} entry - The entry to move.
     * @param {number} index - The resolved entry index to move the entry to.
     * @returns {this} Itself, allowing for method chaining.
     */
    public move(entry: Type, index: number): this {
        const currentSlotIndex = this.slots.findIndex(s => s.deref() === entry);
        if (currentSlotIndex > -1) return this.moveToSlot(entry, this.sizeIndexToSlotIndex(index));

        const container = this.findContainingSlot(entry);
        if (!container) return this;

        if (this.isTurboNodeList(container)) {
            container.move(entry, index);
            return this;
        }

        if (this.isDomList(container)) {
            if (!(entry instanceof Node)) return this;
            const parent = (entry as unknown as Node).parentNode;
            if (!parent) return this;
            const siblings = Array.from(container as any).filter(n => n !== entry) as Node[];
            const ref = siblings[Math.max(0, Math.min(index, siblings.length))] ?? null;
            parent.insertBefore(entry as unknown as Node, ref);
            return this;
        }
    }

    /**
     * @function moveToSlot
     * @description Moves an existing entry to the given slot index.
     * @param {Type} entry - The entry to move.
     * @param {number} index - The slot index to move the entry to.
     * @returns {this} Itself, allowing for method chaining.
     */
    public moveToSlot(entry: Type, index: number): this {
        if (!entry || !this.has(entry)) return this;
        const currentSlotIndex = this.slots.findIndex(s => s.deref() === entry);
        if (currentSlotIndex === -1) return this;

        index = trim(index, this.slots.length, 0, this.slots.length);
        if (currentSlotIndex === index) return this;

        this.slots.splice(currentSlotIndex, 1);
        this.slots.splice(index > currentSlotIndex ? index - 1 : index, 0, new WeakRef(entry));
        return this;
    }

    /**
     * @function has
     * @description Checks whether the given entry or entries are present in the list.
     * - For {@link TurboNodeList}s and DOM lists, checks if they belong to this list.
     * - For arrays and {@link Set}s, returns true only if every item is present.
     * @param {Type | NodeListType<Type>} entry - The entry or entries to check.
     * @returns {boolean} Whether the entry or entries are present in the list.
     */
    public has(entry: Type | NodeListType<Type>): boolean {
        if (!entry) return false;
        if (this.isTurboNodeList(entry) || this.isDomList(entry))
            return this.slots.some(s => s.deref() === entry);
        if (this.isSet(entry)) {
            const arr = Array.from(entry);
            return arr.length > 0 && arr.every(item => this.has(item));
        }
        if (this.ignoredMap.get(entry)) return false;
        for (const resolved of this) if (resolved === entry) return true;
        return false;
    }

    /**
     * @function clear
     * @description Clears all entries from the list, firing {@link onChanged} for every resolved entry.
     * @returns {this} Itself, allowing for method chaining.
     */
    public clear(): this {
        for (const entry of this) this.onChanged.fire(entry, "removed");
        for (const [_, observer] of this.domListObservers) observer.disconnect();
        this.domListObservers.clear();
        for (const [subNodeList, handler] of this.subNodeListHandlers) subNodeList.onChanged.remove(handler);
        this.subNodeListHandlers.clear();
        this.slots = [];
        this.ignoredMap = new WeakMap();
        return this;
    }

    /**
     * @function addEntry
     * @description Core insertion method. Inserts a single entry, DOM list, sub-list, or expands an
     * array/Set inline. Skips already-present entries and duplicate slots. Registers sub-list handlers
     * and DOM observers as needed.
     * @param {Type | NodeListType<Type>} entry - The entry to add.
     * @param {number} [index] - The slot index to insert at. Defaults to the end of the slot array.
     * @returns {number} The next available slot index after this insertion, for consecutive chaining.
     */
    protected addEntry(entry: Type | NodeListType<Type>, index?: number): number {
        if (index === undefined) index = this.slots.length;
        if (!entry) return index;

        if (this.isSet(entry)) {
            for (const item of entry) index = this.addEntry(item, index);
            return index;
        }

        if (this.isEntry(entry) && !this.has(entry)) {
            this.ignoredMap.delete(entry);
            return this.insertOrRemoveSlot(entry, "added", index);
        }

        if (this.slots.some(s => s.deref() === entry)) return index;
        index = this.insertOrRemoveSlot(entry, "added", index);

        if (this.isTurboNodeList(entry)) {
            const handler = (subEntry, state) => {
                if (state === "added" && this.ignoredMap.get(subEntry)) return;
                this.onChanged.fire(subEntry, state);
            };
            this.subNodeListHandlers.set(entry, handler);
            entry.onChanged.add(handler);
        } else if (this.isDomList(entry) && this.observeDomLists) this.attachObserver(entry);
        return index;
    }

    /**
     * @function removeEntry
     * @description Core removal method. Removes a single entry, DOM list, sub-list, or expands an
     * array/Set inline. Marks removed individual entries in {@link ignoredMap}. Disconnects observers
     * and unregisters sub-list handlers as needed.
     * @param {Type | NodeListType<Type>} entry - The entry to remove.
     */
    protected removeEntry(entry: Type | NodeListType<Type>): void {
        if (!entry) return;

        if (this.isSet(entry)) {
            for (const item of entry) this.removeEntry(item);
            return;
        }

        if (this.isEntry(entry)) {
            if (this.has(entry)) {
                this.ignoredMap.set(entry, true);
                this.insertOrRemoveSlot(entry, "removed");
            }
            return;
        }

        if (this.isTurboNodeList(entry)) {
            const handler = this.subNodeListHandlers.get(entry);
            if (handler) {
                entry.onChanged.remove(handler);
                this.subNodeListHandlers.delete(entry);
            }
        } else if (this.isDomList(entry)) {
            const observer = this.domListObservers.get(entry);
            if (observer) {
                observer.disconnect();
                this.domListObservers.delete(entry);
            }
        }
        this.insertOrRemoveSlot(entry, "removed");
    }

    /**
     * @function insertOrRemoveSlot
     * @description Low-level slot mutation. On `"added"`, clamps the index and splices a new
     * {@link WeakRef} into {@link slots}. On `"removed"`, finds the slot by identity and splices it out.
     * Fires {@link onChanged} for all resolved entries of the slot.
     * @param {NodeListSlot<Type>} slot - The slot value to insert or remove.
     * @param {"added" | "removed"} state - Whether to insert or remove the slot.
     * @param {number} [index] - Slot index for insertion. Ignored on removal.
     * @returns {number} The next available slot index after the operation, for consecutive chaining.
     */
    protected insertOrRemoveSlot(slot: NodeListSlot<Type>, state: "added" | "removed", index?: number): number {
        if (state === "added") {
            index = trim(index, this.slots.length, 0, this.slots.length);
            this.slots.splice(index, 0, new WeakRef(slot));
        } else {
            index = this.slots.findIndex(s => s.deref() === slot);
            if (index !== -1) this.slots.splice(index, 1);
        }

        if (this.isEntry(slot)) this.onChanged.fire(slot, state);
        else for (const entry of this.isDomList(slot) ? Array.from(slot as any) : slot) {
            if (!this.ignoredMap.get(entry as Type)) this.onChanged.fire(entry as Type, state);
        }

        return index + 1;
    }

    /**
     * @function attachObserver
     * @description Attaches a {@link MutationObserver} to the parent of the first node in the given DOM
     * list, firing {@link onChanged} when nodes matching the list are added to or removed from the DOM.
     * Does nothing if an observer is already attached for this list, or if no parent node is found.
     * @param {HTMLCollection | NodeListOf<Type & Node>} domList - The DOM list to observe.
     */
    protected attachObserver(domList: HTMLCollection | NodeListOf<Type & Node>): void {
        if (this.domListObservers.has(domList)) return;

        const firstNode = domList[0];
        const parent: Node = firstNode?.parentElement ?? firstNode?.parentNode;
        if (!parent) return;

        const snapshot = new Set<Type>(Array.from(domList as any) as Type[]);
        const observer = new MutationObserver(mutations =>
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    const obj = node as Type;
                    if (snapshot.has(obj) || this.ignoredMap.get(obj) || node.parentNode !== parent) return;
                    snapshot.add(obj);
                    this.onChanged.fire(obj, "added");
                });
                mutation.removedNodes.forEach(node => {
                    const obj = node as Type;
                    if (!snapshot.has(obj) || this.ignoredMap.get(obj)) return;
                    snapshot.delete(obj);
                    this.onChanged.fire(obj, "removed");
                });
            }));

        observer.observe(parent, {childList: true, subtree: true});
        this.domListObservers.set(domList, observer);
    }

    protected sizeIndexToSlotIndex(sizeIndex: number): number {
        const size = this.size;
        sizeIndex = trim(sizeIndex, size, 0, size);
        let count = 0;
        for (let i = 0; i < this.slots.length; i++) {
            if (count === sizeIndex) return i;
            for (const _ of this.resolveSlot(this.slots[i])) {
                count++;
                if (count === sizeIndex) return i + 1;
            }
        }
        return this.slots.length;
    }

    /**
     * @function findContainingSlot
     * @protected
     * @description Finds the slot that directly contains or resolves to the given entry.
     * Returns the slot itself if the entry is a direct slot, the nested {@link TurboNodeList}
     * that contains it, or the DOM list that contains it.
     * @param {Type} entry - The entry to locate.
     * @returns {NodeListSlot<Type> | undefined} The containing slot, or undefined if not found.
     */
    protected findContainingSlot(entry: Type): NodeListSlot<Type> {
        for (const slot of this.slots) {
            const obj = slot.deref();
            if (!obj) continue;
            if (obj === entry) return obj;
            if (this.isTurboNodeList(obj) && obj.has(entry)) return obj;
            else if (this.isDomList(obj) && Array.from(obj as any).includes(entry)) return obj;
        }
    }
}

export {TurboNodeList};