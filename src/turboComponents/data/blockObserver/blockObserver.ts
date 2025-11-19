import {Delegate} from "../../datatypes/delegate/delegate";
import {TurboObserver} from "../observer/observer";

class DataBlockObserver<
    DataType = any,
    ComponentType extends object = any,
    KeyType extends string | number | symbol = string
> extends TurboObserver<DataType, ComponentType, KeyType> {
    public keyChanged(key: KeyType, value: DataType, deleted: boolean = false) {
        super.keyChanged(key, value, deleted, this.defaultBlockKey);
    }

    // @ts-ignore
    public getInstanceKey(instance: ComponentType): KeyType {
        return super.getInstanceKey(instance)?.key;
    }

    public setInstance(instance: ComponentType, key: KeyType) {
        super.setInstance(instance, key);
    }
}

export {DataBlockObserver};