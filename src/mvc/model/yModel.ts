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
    YType extends YMap | YArray = YMap | YArray,
    DataKeyType extends KeyType = any,
    IdType extends KeyType = any,
    ComponentType extends object = any,
    DataEntryType = any
> extends TurboModel<YType, DataKeyType, IdType, ComponentType, DataEntryType> {
    private observer = (event: any, transaction: any) => this.observeChanges(event, transaction);

    /**
     * @inheritDoc
     */
    public modelConstructor: new (...args: any[]) => TurboModel = TurboYModel;

    /**
     * @inheritDoc
     */
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
        if (data instanceof YMap) data.set(key.toString(), value);
        else if (data instanceof YArray) {
            const index = trim(Number(key), data.length + 1);
            if (index < data.length) data.delete(index, 1);
            data.insert(index, [value]);
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
                data.push([value]);
            } else {
                if (index < 0) index = 0;
                data.insert(index, [value]);
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
        if (data instanceof YArray) return typeof key === "number" && key >= 0 && key < this.size;
        return super.hasAction(data, key);
    }

    /**
     * @inheritDoc
     */
    protected deleteAction(data: any, key: KeyType) {
        if (data instanceof YMap) data.delete(key.toString());
        else if (data instanceof YArray && typeof key === "number" && key >= 0 && key < this.size) data.delete(key, 1);
        else super.deleteAction(data, key);
    }

    /**
     * @inheritDoc
     */
    public get keys(): DataKeyType[] {
        if (this.data instanceof YMap) return Array.from(this.data.keys()) as DataKeyType[];
        if (this.data instanceof YArray) {
            const output: DataKeyType[] = [];
            for (let i = 0; i < this.data.length; i++) output.push(i as DataKeyType);
            return output;
        }
        return super.keys;
    }

    /**
     * @inheritDoc
     */
    public initialize() {
        super.initialize();
        if (this.enabledCallbacks && this.data instanceof YAbstractType) this.data?.observe(this.observer);
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
        //TODO
        const isLocal = !!transaction?.local;
        const origin = transaction?.origin;

        if (event instanceof YMapEvent) {
            event.keysChanged.forEach(key => {
                const change = event.changes.keys.get(key);
                if (!change) return;
                if (change.action === "delete") this.keyChanged([key], undefined, true);
                else this.keyChanged([key]);
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
                    for (let i = 0; i < count; i++) this.keyChanged([currentIndex + i as DataKeyType]);
                    currentIndex += count;
                } else if (delta.delete) {
                    const count = delta.delete;
                    for (let i = 0; i < count; i++) this.keyChanged([currentIndex + i as DataKeyType], undefined, true);
                    this.shiftIndices(currentIndex + count, -count);
                }
            }
        }
    }

    private shiftIndices(fromIndex: number, offset: number) {
        this.changeObservers?.toArray().forEach(observer => {
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
}

export {TurboYModel};