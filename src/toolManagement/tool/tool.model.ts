import {TurboModel} from "../../domBuilding/mvc/turboModel";
import {auto} from "../../domBuilding/decorators/auto/auto";
import {MvcDataBlock} from "../../domBuilding/mvc/mvc.types";

class ToolModel<
    DataType = any,
    KeyType extends string | number | symbol = any,
    IdType extends string | number | symbol = any,
    BlocksType extends "array" | "map" = "array" | "map",
    BlockType extends MvcDataBlock<DataType, IdType> = MvcDataBlock<DataType, IdType>
> extends TurboModel<DataType, KeyType, IdType, BlocksType, BlockType> {
    @auto()
    public set selected(value: boolean) {
        this.fireCallback("selected", value);
    }
}

export {ToolModel};