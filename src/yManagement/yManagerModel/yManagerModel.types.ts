import {Delegate} from "../../eventHandling/delegate/delegate";
import {MvcBlockKeyType} from "../../mvc/core/core.types";
import {YDataBlock} from "../yModel/yModel.types";

type YManagerDataBlock<
    DataType = any,
    IdType extends string | number | symbol = any,
    ComponentType = object,
    KeyType extends string | number = string | number,
> = YDataBlock<DataType, IdType> & {
    instances: Map<KeyType, ComponentType>
};

type YManagerChangeObserver<
    DataType,
    ComponentType,
    KeyType extends string | number = string,
    BlocksType extends "array" | "map" = "map"
> = {
    onAdded: Delegate<(data: DataType, id: KeyType, blockKey: MvcBlockKeyType<BlocksType>) => ComponentType | void>;
    onUpdated: Delegate<(data: DataType, instance: ComponentType, id: KeyType, blockKey: MvcBlockKeyType<BlocksType>) => void>;
    onDeleted: Delegate<(data: DataType, instance: ComponentType, id: KeyType, blockKey: MvcBlockKeyType<BlocksType>) => void>;

    instances: Map<MvcBlockKeyType<BlocksType>, Map<KeyType, ComponentType>>;
    getInstance(key: KeyType, blockKey?: MvcBlockKeyType<BlocksType>): ComponentType;
    getAllInstances(blockKey?: MvcBlockKeyType<BlocksType>): ComponentType[];

    initialize(blockKey?: MvcBlockKeyType<BlocksType>): void;
    clear(blockKey?: MvcBlockKeyType<BlocksType>): void;
    destroy(): void;
};

type YManagerChangeObserverProperties<
    DataType,
    ComponentType,
    KeyType extends string | number = string,
    BlocksType extends "array" | "map" = "map"
> = {
    initialize?: boolean,
    onAdded?: (data: DataType, id: KeyType, blockKey: MvcBlockKeyType<BlocksType>) => ComponentType | void,
    onUpdated?: (data: DataType, instance: ComponentType, id: KeyType, blockKey: MvcBlockKeyType<BlocksType>) => void,
    onDeleted?: (data: DataType, instance: ComponentType, id: KeyType, blockKey: MvcBlockKeyType<BlocksType>) => void
};

export {YManagerDataBlock, YManagerChangeObserver, YManagerChangeObserverProperties};