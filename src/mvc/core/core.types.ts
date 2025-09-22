import {TurboEmitter} from "./emitter";
import {TurboModel} from "./model";

type MvcBlocksType<
    Type extends "array" | "map" = "map",
    BlockType extends MvcDataBlock = MvcDataBlock
> = Type extends "map" ? Map<string, BlockType> : BlockType[];

type MvcBlockKeyType<Type extends "array" | "map" = "map"> = Type extends "map" ? string : number;

type MvcDataBlock<
    DataType = any,
    IdType extends string | number | symbol = any
> = {
    id: IdType,
    data: DataType,
};

type TurboViewProperties<
    ElementType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = {
    element: ElementType,
    model: ModelType,
    emitter: EmitterType
};

export {TurboViewProperties, MvcBlockKeyType, MvcBlocksType, MvcDataBlock};