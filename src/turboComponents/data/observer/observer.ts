import {Delegate} from "../../datatypes/delegate/delegate";
import {alphabeticalSorting, isUndefined} from "../../../utils/dataManipulation/misc";
import {ScopedKey, TurboObserverProperties} from "./observer.types";
import {TurboModel} from "../../../mvc/core/model";

class TurboObserver<
    DataType = any,
    ComponentType extends object = any,
    KeyType extends string | number | symbol = string,
    BlockKeyType extends string | number = string,
> {
    protected _isInitialized = false;

    public readonly onAdded: Delegate<
        (data: DataType, id: KeyType, self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>,
         blockKey?: BlockKeyType) => ComponentType | void
    > = new Delegate();
    public readonly onUpdated: Delegate<
        (data: DataType, instance: ComponentType, id: KeyType,
         self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>, blockKey?: BlockKeyType) => void
    > = new Delegate();
    public readonly onDeleted: Delegate<
        (data: DataType, instance: ComponentType, id: KeyType,
         self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>, blockKey?: BlockKeyType) => void
    > = new Delegate();

    public readonly onInitialize: Delegate<(self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>) => void> = new Delegate();
    public readonly onDestroy: Delegate<(self: TurboObserver<DataType, ComponentType, KeyType, BlockKeyType>) => void> = new Delegate();

    protected readonly instances: Map<BlockKeyType, Map<KeyType, ComponentType>> = new Map();

    public constructor(properties: TurboObserverProperties<DataType, ComponentType, KeyType, BlockKeyType> = {}) {
        const self = this;
        if (properties.onAdded) this.onAdded.add((data, id, self, blockKey) =>
            properties.onAdded(data, id, self, blockKey));

        this.onUpdated.add((data, instance, id, self, blockKey) => {
            if (properties.onUpdated) properties.onUpdated(data, instance, id, self, blockKey);
            else {
                if (typeof instance !== "object") return;
                if ("model" in instance && instance.model instanceof TurboModel) instance.model.setBlock(data, id);
                else {
                    if ("data" in instance) instance.data = data;
                    if ("dataId" in instance) instance.dataId = id.toString();
                }
            }
        });

        this.onDeleted.add((data, instance, id, self, blockKey) => {
            if (properties.onDeleted) properties.onDeleted(data, instance, id, self, blockKey);
            else this.removeInstance(instance);
        });

        if (properties.onInitialize) this.onInitialize.add(() => properties.onInitialize(self));
        if (properties.onDestroy) this.onDestroy.add(() => properties.onDestroy(self));

        if (properties.initialize) this.initialize();
    }

    public getInstance(key: KeyType, blockKey: BlockKeyType = this.defaultBlockKey): ComponentType {
        return this.instances.get(blockKey)?.get(key);
    }

    public getBlockInstancesAndKeys(blockKey: BlockKeyType = this.defaultBlockKey): [KeyType, ComponentType][] {
        const block = this.instances.get(blockKey);
        if (!block) return [];
        return Array.from(block.entries());
    }

    public getBlockInstances(blockKey: BlockKeyType = this.defaultBlockKey): ComponentType[] {
        return this.getBlockInstancesAndKeys(blockKey)
            .sort((a, b) => alphabeticalSorting(a[0], b[0]))
            .map(entry => entry[1]);
    }

    public getAllInstances(): ComponentType[] {
        return Array.from(this.instances.keys())
            .sort(alphabeticalSorting)
            .flatMap(blockKey => this.getBlockInstances(blockKey));
    }

    public getInstanceKey(instance: ComponentType): { blockKey?: BlockKeyType, key: KeyType } {
        for (const [blockKey, map] of this.instances.entries()) {
            for (const [key, entry] of map.entries()) {
                if (entry === instance) return {blockKey, key};
            }
        }
    }

    public getInstanceAt(flatKey: number | string): ComponentType {
        const scoped = this.scopeKey(flatKey);
        if (isUndefined(scoped.blockKey) || isUndefined(scoped.key)) return;
        return this.getInstance(scoped.key as KeyType, scoped.blockKey as BlockKeyType);
    }

    public getInstanceFlatKey(instance: ComponentType): string | number {
        const scoped = this.getInstanceKey(instance);
        if (!scoped) return;
        return this.flattenKey(scoped.key, scoped.blockKey);
    }

    public setInstance(instance: ComponentType, key: KeyType, blockKey: BlockKeyType = this.defaultBlockKey) {
        let instancesBlock = this.instances.get(blockKey);
        if (!instancesBlock) {
            this.instances.set(blockKey, new Map());
            instancesBlock = this.instances.get(blockKey);
        }
        instancesBlock?.set(key, instance);
    }

    public removeInstanceByKey(key: KeyType, removeFromDOM: boolean = true, blockKey: BlockKeyType = this.defaultBlockKey) {
        const block = this.instances.get(blockKey);
        if (!block) return;
        const instance = block.get(key);
        block.delete(key);
        if (!instance) return;
        if (removeFromDOM && instance && typeof instance === "object"
            && "remove" in instance && typeof instance.remove == "function") instance?.remove();
    }

    public removeInstance(instance: ComponentType, removeFromDOM: boolean = true) {
        const pos = this.getInstanceKey(instance);
        if (pos) this.removeInstanceByKey(pos.key, removeFromDOM, pos.blockKey ?? this.defaultBlockKey);
    }

    public get isInitialized(): boolean {
        return this._isInitialized;
    }

    public initialize() {
        if (this.isInitialized) return;
        this.onInitialize.fire(this);
        this._isInitialized = true;
    }

    public clear() {
        this.getAllInstances().forEach(instance => this.removeInstance(instance));
        this.instances.clear();
        this._isInitialized = false;
    }

    public destroy() {
        this.clear();
        this.onDestroy.fire(this);
    }

    public keyChanged(key: KeyType, value: DataType, deleted: boolean = false, blockKey: BlockKeyType = this.defaultBlockKey) {
        const existingInstance = this.getInstance(key, blockKey);
        if (existingInstance) {
            if (deleted) this.onDeleted.fire(value, existingInstance, key, this, blockKey);
            else this.onUpdated.fire(value, existingInstance, key, this, blockKey);
            return;
        }
        if (deleted) return;
        const instance = this.onAdded.fire(value, key, this, blockKey);
        if (!instance) return;
        this.setInstance(instance, key, blockKey);
        this.onUpdated.fire(value, instance, key, this, blockKey);
    }

    public flattenKey(key: KeyType, blockKey: BlockKeyType = this.defaultBlockKey): number | string {
        if (typeof blockKey === "number") {
            let globalIndex = 0;
            for (const bk of Array.from(this.instances.keys()).sort(alphabeticalSorting)) {
                if (bk === blockKey) break;
                globalIndex += this.getBlockInstancesAndKeys(bk).length;
            }
            return globalIndex + Number(key);
        } else {
            return blockKey.toString() + "|" + key.toString();
        }
    }

    public scopeKey(flatKey: number | string): ScopedKey<KeyType, BlockKeyType> {
        if (typeof flatKey === "string") {
            const split = flatKey.toString().split("|");
            if (split.length < 2) return {};
            return {blockKey: split[0], key: split[1]} as ScopedKey<KeyType, BlockKeyType>;
        }

        const blockKeys = Array.from(this.instances.keys()).sort(alphabeticalSorting);
        if (typeof flatKey === "number") {
            if (flatKey < 0) return {blockKey: blockKeys[0] ?? 0, key: 0} as ScopedKey<KeyType, BlockKeyType>;
            let index: number = flatKey;
            for (const blockKey of blockKeys) {
                const size = this.getBlockInstancesAndKeys(blockKey).length;
                if (index < size) return {blockKey, key: index as KeyType};
                index -= size;
            }
        }

        const lastBlockKey = blockKeys[blockKeys.length - 1];
        return {blockKey: lastBlockKey, key: this.getBlockInstancesAndKeys(lastBlockKey).length as KeyType};
    }

    protected get defaultBlockKey(): BlockKeyType {
        const key = Array.from(this.instances.keys())?.[0];
        if (!isUndefined(key)) return key;
        return "__default__" as any;
    }
}

export {TurboObserver};