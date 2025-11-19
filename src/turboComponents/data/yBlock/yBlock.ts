import {TurboDataBlock} from "../dataBlock/dataBlock";
import {auto} from "../../../decorators/auto/auto";
import {trim} from "../../../utils/computations/misc";
import {YAbstractType, YArray, YMap, YArrayEvent, YEvent, YMapEvent} from "../../../types/yjs.types";
import {isUndefined} from "../../../utils/dataManipulation/misc";

/**
 * @group Components
 * @category TurboYBlock
 */
class TurboYBlock<
    YType extends YMap | YArray = YMap | YArray,
    KeyType extends string | number | symbol = any,
    IdType extends string | number | symbol = any
> extends TurboDataBlock<YType, KeyType, IdType> {
    private observer = (event: any, transaction: any) => this.observeChanges(event, transaction);

    @auto({override: true}) public set enabledCallbacks(value: boolean) {
        if (!this.data || !(this.data instanceof YAbstractType)) return;
        if (value) this.data.observe(this.observer);
        else this.data.unobserve(this.observer);
    }

    /*
     *
     * Basics
     *
     */

    /**
     * @function get
     * @description Retrieves the value associated with a given key in the specified block.
     * @param {KeyType} key - The key to retrieve.
     * @returns {unknown} The value associated with the key, or null if not found.
     */
    public get(key: KeyType): unknown {
        if (!this.data || typeof this.data !== "object") return;
        if (this.data instanceof YMap) return this.data.get(key.toString());
        if (this.data instanceof YArray) return this.data.get(trim(Number(key), this.data.length));
        return super.get(key);
    }

    /**
     * @function set
     * @description Sets the value for a given key in the specified block and triggers callbacks (if enabled).
     * @param {KeyType} key - The key to update.
     * @param {unknown} value - The value to assign.
     */
    public set(key: KeyType, value: unknown) {
        if (!this.data || typeof this.data !== "object") return;
        if (this.data instanceof YMap) this.data.set(key.toString(), value);
        else if (this.data instanceof YArray) {
            const index = trim(Number(key), this.data.length + 1);
            if (index < this.data.length) this.data.delete(index, 1);
            this.data.insert(index, [value]);
        } else super.set(key, value);
    }

    public add(value: unknown, key?: KeyType) {
        if (this.data instanceof YArray) {
            let index = key as number;
            if (isUndefined(index) || typeof index !== "number" || index > this.data.length) {
                index = this.data.length;
                this.data.push([value]);
            } else {
                if (index < 0) index = 0;
                this.data.insert(index, [value]);
            }
            return index as KeyType;
        } else if (this.data instanceof YAbstractType) return this.set(key, value);
        return super.add(value, key);
    }

    public has(key: KeyType): boolean {
        if (!this.data || typeof this.data !== "object") return false;
        if (this.data instanceof YMap) return this.data.has(key.toString());
        if (this.data instanceof YArray) return typeof key === "number" && key >= 0 && key < this.size;
        return super.has(key);
    }

    public delete(key: KeyType) {
        if (!this.data || typeof this.data !== "object") return;
        if (this.data instanceof YMap) this.data.delete(key.toString());
        else if (this.data instanceof YArray && typeof key === "number" && key >= 0 && key < this.size) this.data.delete(key, 1);
        else super.delete(key);
    }

    /**
     * @function keys
     * @description Retrieves all keys within the given block(s).
     * @returns {KeyType[]} Array of keys.
     */
    public get keys(): KeyType[] {
        if (this.data instanceof YMap) return Array.from(this.data.keys()) as KeyType[];
        if (this.data instanceof YArray) {
            const output: KeyType[] = [];
            for (let i = 0; i < this.data.length; i++) output.push(i as KeyType);
            return output;
        }
        return super.keys;
    }

    /**
     * @function size
     * @description Returns the size of the specified block.
     * @returns {number} The size.
     */
    public get size(): number {
        if (this.data instanceof YMap) return this.data.size;
        if (this.data instanceof YArray) return this.data.length;
        return 0;
    }

    /*
     *
     * Utilities
     *
     */

    /**
     * @function initialize
     * @description Initializes the block at the given key, and triggers callbacks for all the keys in its data.
     */
    public initialize() {
        super.initialize();
        if (this.enabledCallbacks && this.data instanceof YAbstractType) this.data?.observe(this.observer);
    }

    public clear(clearData: boolean = true) {
        if (clearData && this.data instanceof YAbstractType) this.data?.unobserve(this.observer);
        super.clear(clearData);
    }

    /*
     *
     * Utilities
     *
     */

    protected observeChanges(event: YEvent, transaction: any) {
        //TODO
        const isLocal = !!transaction?.local;
        const origin = transaction?.origin;

        if (event instanceof YMapEvent) {
            event.keysChanged.forEach(key => {
                const change = event.changes.keys.get(key);
                if (!change) return;
                if (change.action === "delete") this.keyChanged(key, undefined, true);
                else this.keyChanged(key);
            });
        } else if (event instanceof YArrayEvent) {
            let currentIndex = 0;
            for (const delta of event.delta) {
                if (delta.retain !== undefined) currentIndex += delta.retain;

                else if (delta.insert) {
                    const insertedItems = Array.isArray(delta.insert) ? delta.insert : [delta.insert];
                    const count = insertedItems.length;
                    this.shiftIndices(currentIndex, count);
                    for (let i = 0; i < count; i++) this.keyChanged((currentIndex + i) as KeyType);
                    currentIndex += count;
                } else if (delta.delete) {
                    const count = delta.delete;
                    for (let i = 0; i < count; i++) this.keyChanged((currentIndex + i) as KeyType, undefined, true);
                    this.shiftIndices(currentIndex + count, -count);
                }
            }
        }
    }

    private shiftIndices(fromIndex: number, offset: number) {
        this.changeObservers?.toArray().forEach(observer => {
            const itemsToShift: [number, any][] = [];
            for (const [oldIndexStr, instance] of observer.getBlockInstancesAndKeys()) {
                const oldIndex = Number(oldIndexStr);
                if (oldIndex >= fromIndex) itemsToShift.push([oldIndex, instance]);
            }

            itemsToShift.sort((a, b) => a[0] - b[0]);
            for (const [oldIndex] of itemsToShift) observer.removeInstanceByKey(oldIndex as KeyType, false);
            for (const [oldIndex, instance] of itemsToShift) {
                const newIndex = oldIndex + offset;
                if (typeof instance === "object" && "dataId" in instance) instance.dataId = newIndex;
                observer.setInstance(instance, (oldIndex + offset) as KeyType);
            }
        });
    }
}

export {TurboYBlock};