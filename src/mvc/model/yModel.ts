import {auto} from "../../decorators/auto/auto";
import {trim} from "../../utils/computations/misc";
import {YAbstractType, YArray, YMap, YArrayEvent, YEvent, YMapEvent} from "../../types/yjs.types";
import {isUndefined} from "../../utils/dataManipulation/misc";
import {TurboModel} from "./model";
import {KeyType} from "../../types/basic.types";

/**
 * @group MVC
 * @category TurboModel
 */
class TurboYModel<
    DataType = any,
    DataKeyType extends KeyType = any,
    IdType extends KeyType = any,
    ComponentType extends object = any,
    DataEntryType = any
> extends TurboModel<DataType, DataKeyType, IdType, ComponentType, DataEntryType> {
    private readonly observer = (event: any, transaction: any) => this.observeChanges(event, transaction);

    /**
     * @inheritDoc
     */
    public modelConstructor: new (...args: any[]) => TurboModel = TurboYModel;

    /**
     * @inheritDoc
     */
    @auto({override: true}) public set enabledCallbacks(value: boolean) {
        if (!this.data || !(this.data instanceof YAbstractType)) return;
        if (value) this.attachNestedObservers(this.data);
        else this.detachNestedObservers(this.data);
    }

    /*
     *
     * Basics
     *
     */

    /**
     * @inheritDoc
     */
    protected getAction(data: any, key: KeyType): any {
        if (data instanceof YMap) return data.get(key.toString());
        if (data instanceof YArray) return data.get(trim(Number(key), data.length));
        return super.getAction(data, key);
    }

    /**
     * @inheritDoc
     */
    protected setAction(data: any, value: any, key: KeyType) {
        if (data instanceof YMap) data.doc.transact(() => data.set(key.toString(), value), this);
        else if (data instanceof YArray) {
            const index = trim(Number(key), data.length + 1);
            if (index < data.length) data.delete(index, 1);
            data.doc.transact(() =>  data.insert(index, [value]), this);
        } else super.setAction(data, value, key);
    }

    /**
     * @inheritDoc
     */
    protected addAction(model: TurboModel, data: any, value: any, key: KeyType): KeyType {
        if (data instanceof YArray) {
            let index = key as number;
            if (isUndefined(index) || typeof index !== "number" || index > data.length) {
                index = data.length;
                data.doc.transact(() =>  data.push([value]), this);
            } else {
                if (index < 0) index = 0;
                data.doc.transact(() =>  data.insert(index, [value]), this);
            }
            return index as DataKeyType;
        }
        return super.addAction(model, data, value, key);
    }

    /**
     * @inheritDoc
     */
    protected hasAction(data: any, key: KeyType): boolean {
        if (data instanceof YMap) return data.has(key.toString());
        if (data instanceof YArray) return typeof key === "number" && key >= 0 && key < this.dataSize;
        return super.hasAction(data, key);
    }

    /**
     * @inheritDoc
     */
    protected deleteAction(data: any, key: KeyType) {
        if (data instanceof YMap)  data.doc.transact(() =>  data.delete(key.toString()), this);
        else if (data instanceof YArray && typeof key === "number" && key >= 0 && key < this.dataSize)
            data.doc.transact(() =>  data.delete(key, 1), this);
        else super.deleteAction(data, key);
    }

    /**
     * @inheritDoc
     */
    protected getKeysAction(data: any): KeyType[] {
        if (data instanceof YMap) return Array.from(data.keys());
        if (data instanceof YArray) {
            const output: KeyType[] = [];
            for (let i = 0; i < data.length; i++) output.push(i);
            return output;
        }
        return super.getKeysAction(data);
    }

    /**
     * @inheritDoc
     */
    public initialize() {
        super.initialize();
        if (this.enabledCallbacks && this.data instanceof YAbstractType) this.attachNestedObservers(this.data);
    }

    /**
     * @inheritDoc
     */
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
        const isLocal = !!transaction?.local; //TODO
        const origin = transaction?.origin;
        if (origin === this) return;

        const basePath = this.getPathToTarget(event.target);

        if (event instanceof YMapEvent) {
            event.keysChanged.forEach(key => {
                const change = event.changes.keys.get(key);
                if (!change) return;
                if (change.action === "delete") this.keyChanged([...basePath, key], undefined, true);
                else {
                    this.attachNestedObservers(this.getAction(event.target, key));
                    this.keyChanged([...basePath, key]);
                }
            });
        } else if (event instanceof YArrayEvent) {
            let currentIndex = 0;
            for (const delta of event.delta) {
                if (delta.retain !== undefined) {
                    currentIndex += delta.retain;
                } else if (delta.insert) {
                    const insertedItems = Array.isArray(delta.insert) ? delta.insert : [delta.insert];
                    const count = insertedItems.length;
                    this.shiftIndices(currentIndex, count);
                    for (let i = 0; i < count; i++) {
                        this.attachNestedObservers(this.getAction(event.target, currentIndex + i));
                        this.keyChanged([...basePath, currentIndex + i]);
                    }
                    currentIndex += count;
                } else if (delta.delete) {
                    const count = delta.delete;
                    for (let i = 0; i < count; i++) this.keyChanged([...basePath, currentIndex + i], undefined, true);
                    this.shiftIndices(currentIndex + count, -count);
                }
            }
        }
    }

    private attachNestedObservers(value: any) {
        if (!(value instanceof YAbstractType)) return;
        value.observe(this.observer);
        for (const key of this.getKeysAction(value)) {
            if (!this.nestedModels.has(key as any)) this.attachNestedObservers(this.getAction(value, key));
        }
    }

    private detachNestedObservers(value: any) {
        if (!(value instanceof YAbstractType)) return;
        value.unobserve(this.observer);
        for (const key of this.getKeysAction(value)) this.detachNestedObservers(this.getAction(value, key));
    }

    private shiftIndices(fromIndex: number, offset: number) {
        Array.from(this.changeObservers).forEach(entry => {
            const observer = entry.observer;
            const pathsToShift = observer.paths
                .filter(path => Number(path[0]) >= fromIndex);

            const itemsToShift: [number, DataKeyType[], any][] = pathsToShift
                .map(path => [Number(path[0]), path, observer.get(...path)]);
            itemsToShift.sort((a, b) => a[0] - b[0]);

            pathsToShift.forEach(path => observer.detach(...path));
            for (const [oldIndex, path, instance] of itemsToShift) {
                const newIndex = oldIndex + offset;
                if (typeof instance === "object" && "dataId" in instance) instance.dataId = newIndex;
                observer.set(instance, newIndex as DataKeyType, ...path.slice(1));
            }
        });
    }

    private getPathToTarget(target: any): KeyType[] {
        const search = (current: any, path: KeyType[]): KeyType[] => {
            if (current === target) return path;
            for (const key of this.getKeysAction(current)) {
                const child = this.getAction(current, key);
                const result = search(child, [...path, key]);
                if (result) return result;
            }
            return null;
        };
        return search(this.data, []) ?? [];
    }
}

export {TurboYModel};