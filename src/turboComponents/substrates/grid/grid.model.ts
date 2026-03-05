import {TurboModel} from "../../../mvc/core/model";
import {TurboDataBlock} from "../../data/dataBlock/dataBlock";
import {Point} from "../../datatypes/point/point";
import {blockSignal} from "../../../decorators/reactivity/reactivity";

class GridModel<
    DataType = any,
    KeyType extends string | number | symbol = any,
    IdType extends string | number | symbol = any,
    BlocksType extends "array" | "map" = "array" | "map",
    BlockType extends TurboDataBlock<DataType, KeyType, IdType> = TurboDataBlock<DataType, KeyType, IdType>
> extends TurboModel<DataType, KeyType, IdType, BlocksType, BlockType> {
    @blockSignal() public positions: TurboDataBlock<Map<string, Point>, string> = new TurboDataBlock();
    @blockSignal() public columnWidths: TurboDataBlock<Array<number>, number> = new TurboDataBlock();
    @blockSignal() public rowHeights: TurboDataBlock<Array<number>, number> = new TurboDataBlock();


}