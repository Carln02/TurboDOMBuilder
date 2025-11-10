/**
 * @group Components
 * @category TurboWeakSet
 */
class TurboWeakSet<Type extends object = object> {
    private readonly _weakRefs: Set<WeakRef<Type>>;

    constructor() {
        this._weakRefs = new Set();
    }

    // Add an object as a WeakRef if it's not already in the set
    public add(obj: Type): this {
        if (!this.has(obj)) this._weakRefs.add(new WeakRef(obj));
        return this;
    }

    // Check if the set contains a WeakRef to the given object
    public has(obj: Type): boolean {
        for (const weakRef of this._weakRefs) {
            if (weakRef.deref() === obj) return true;
        }
        return false;
    }

    // Delete the WeakRef associated with the given object
    public delete(obj: Type): boolean {
        for (const weakRef of this._weakRefs) {
            if (weakRef.deref() === obj) {
                this._weakRefs.delete(weakRef);
                return true;
            }
        }
        return false;
    }

    // Clean up any WeakRefs whose objects have been garbage-collected
    public cleanup() {
        for (const weakRef of this._weakRefs) {
            if (weakRef.deref() === undefined) this._weakRefs.delete(weakRef);
        }
    }

    // Convert live objects in the TurboWeakSet to an array
    public toArray(): Type[] {
        const result: Type[] = [];
        for (const weakRef of this._weakRefs) {
            const obj = weakRef.deref();
            if (obj !== undefined) result.push(obj);
            else this._weakRefs.delete(weakRef);
        }
        return result;
    }

    // Get the size of the TurboWeakSet (only live objects)
    public get size(): number {
        this.cleanup();
        return this.toArray().length;
    }

    // Clear all weak references
    public clear() {
        this._weakRefs.clear();
    }
}

export {TurboWeakSet};