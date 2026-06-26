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
    private readonly observedYTypes = new WeakSet<object>();

    /**
     * @inheritDoc
     */
    public modelConstructor: new (...args: any[]) => TurboModel = TurboYModel;

    /**
     * @inheritDoc
     */
    @auto({override: true}) public set enabledCallbacks(value: boolean) {
        if (!this.data) return;
        if (this.data instanceof YAbstractType) {
            if (value) this.attachNestedObservers(this.data);
            else this.detachNestedObservers(this.data);
        } else if (Array.isArray(this.data)) {
            for (const item of this.data) {
                if (value) this.attachNestedObservers(item);
                else this.detachNestedObservers(item);
            }
        }
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
        } else {
            const oldValue = this.getAction(data, key);
            if (oldValue !== value && oldValue != null && typeof oldValue === "object")
                this.detachNestedObservers(oldValue);
            super.setAction(data, value, key);
            if (oldValue !== value && value != null && typeof value === "object")
                this.attachNestedObservers(value);
        }
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
        if (Array.isArray(data)) {
            const index = super.addAction(model, data, value, key);
            if (index !== undefined && value != null && typeof value === "object")
                this.attachNestedObservers(value);
            return index;
        }
        return super.addAction(model, data, value, key);
    }

    /**
     * @inheritDoc
     */
    protected hasAction(data: any, key: KeyType): boolean {
        if (data instanceof YMap) return data.has(key.toString());
        if (data instanceof YArray) return typeof key === "number" && key >= 0 && key < data.length;
        return super.hasAction(data, key);
    }

    /**
     * @inheritDoc
     */
    protected deleteAction(data: any, key: KeyType) {
        if (data instanceof YMap)  data.doc.transact(() =>  data.delete(key.toString()), this);
        else if (data instanceof YArray && typeof key === "number" && key >= 0 && key < data.length)
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
        if (!this.enabledCallbacks) return;
        if (this.data instanceof YAbstractType) this.attachNestedObservers(this.data);
        else if (Array.isArray(this.data)) {
            for (const item of this.data) this.attachNestedObservers(item);
        }
    }

    /**
     * @inheritDoc
     */
    public clear(clearData: boolean = true) {
        if (clearData) {
            if (this.data instanceof YAbstractType) this.detachNestedObservers(this.data);
            else if (Array.isArray(this.data)) {
                for (const item of this.data) this.detachNestedObservers(item);
            }
        }
        super.clear(clearData);
    }

    /*
     *
     * Utilities
     *
     */

    protected observeChanges(event: YEvent, transaction: any) {
        const selfOriginated = transaction?.origin === this;
        const basePath = this.getPathToTarget(event.target);

        if (event instanceof YMapEvent) {
            if (selfOriginated) return;
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
                    this.shiftIndices(basePath, currentIndex, count);
                    if (!selfOriginated) {
                        for (let i = 0; i < count; i++) {
                            this.attachNestedObservers(this.getAction(event.target, currentIndex + i));
                            this.keyChanged([...basePath, currentIndex + i]);
                        }
                    }
                    currentIndex += count;
                } else if (delta.delete) {
                    const count = delta.delete;
                    if (!selfOriginated) {
                        for (let i = 0; i < count; i++)
                            this.keyChanged([...basePath, currentIndex + i], undefined, true);
                    }
                    this.shiftIndices(basePath, currentIndex + count, -count);
                }
            }
        }
    }

    protected attachNestedObservers(value: any) {
        if (value instanceof YAbstractType) {
            if (!this.observedYTypes.has(value)) {
                value.observe(this.observer);
                this.observedYTypes.add(value);
            }
            for (const key of this.getKeysAction(value)) {
                if (!this.nestedModels.has(key as any)) this.attachNestedObservers(this.getAction(value, key));
            }
        } else if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) this.attachNestedObservers(value[i]);
        }
    }

    protected detachNestedObservers(value: any) {
        if (value instanceof YAbstractType) {
            if (this.observedYTypes.has(value)) {
                value.unobserve(this.observer);
                this.observedYTypes.delete(value);
            }
            for (const key of this.getKeysAction(value)) this.detachNestedObservers(this.getAction(value, key));
        } else if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) this.detachNestedObservers(value[i]);
        }
    }

    private shiftIndices(basePath: KeyType[], fromIndex: number, offset: number) {
        const depth = basePath.length;
        Array.from(this.changeObservers).forEach(entry => {
            const observer = entry.observer;
            const pathsToShift = observer.paths.filter(path =>
                path.length > depth &&
                basePath.every((k, i) => path[i] == k) &&
                Number(path[depth]) >= fromIndex
            );

            const itemsToShift: [number, KeyType[], any][] = pathsToShift
                .map(path => [Number(path[depth]), path, observer.get(...path)]);
            itemsToShift.sort((a, b) => offset < 0 ? a[0] - b[0] : b[0] - a[0]);

            pathsToShift.forEach(path => observer.detach(...path));
            for (const [oldIndex, path, instance] of itemsToShift) {
                const newIndex = oldIndex + offset;
                if (typeof instance === "object" && "dataId" in instance)
                    instance.dataId = String(newIndex);
                const newPath = [...basePath, newIndex, ...path.slice(depth + 1)] as KeyType[];
                observer.set(instance, ...newPath as DataKeyType[]);
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