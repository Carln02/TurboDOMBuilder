import {TurboModel} from "./model";
import {TurboEmitter} from "./emitter";
import {TurboDataBlock} from "../../turboComponents/blocks/dataBlock/dataBlock";

/**
 * @group MVC
 * @category Model
 */
type MvcBlocksType<
    Type extends "array" | "map" = "map",
    BlockType extends TurboDataBlock = TurboDataBlock
> = Type extends "map" ? Map<string, BlockType> : BlockType[];

/**
 * @group MVC
 * @category Model
 */
type MvcBlockKeyType<Type extends "array" | "map" = "map"> = Type extends "map" ? string : number;

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

export {TurboViewProperties, MvcBlockKeyType, MvcBlocksType};