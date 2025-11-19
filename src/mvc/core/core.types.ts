import {TurboModel} from "./model";
import {TurboEmitter} from "./emitter";
import {TurboDataBlock} from "../../turboComponents/data/dataBlock/dataBlock";

/**
 * @group MVC
 * @category Model
 */
type MvcBlocksType<
    Type extends "array" | "map" = "map",
    BlockType extends object = object
> = Type extends "map" ? Map<string, BlockType> : BlockType[];

/**
 * @group MVC
 * @category Model
 */
type MvcBlockKeyType<Type extends "array" | "map" = "map"> = Type extends "map" ? string : number;

type MvcFlatKeyType<B extends "array" | "map"> = B extends "array" ? number : string;

/**
 * @group MVC
 * @category View
 */
type TurboViewProperties<
    ElementType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
> = {
    element: ElementType,
    model?: ModelType,
    emitter?: EmitterType,
};

export {TurboViewProperties, MvcBlockKeyType, MvcBlocksType, MvcFlatKeyType};