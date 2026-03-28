import {TurboModel} from "../../../mvc/model/model";
import {Point} from "../../datatypes/point/point";
import {blockSignal} from "../../../decorators/reactivity/reactivity";
import {DataKeyType} from "../../../mvc/model/model.types";

class GridModel<
    DataType = any,
    KeyType extends DataKeyType = any,
    IdType extends DataKeyType = any,
    ComponentType extends object = any,
    DataEntryType = any
> extends TurboModel<DataType, KeyType, IdType, ComponentType, DataEntryType> {
    // @blockSignal() public positions: TurboDataBlock<Map<string, Point>, string> = new TurboDataBlock();
    // @blockSignal() public columnWidths: TurboDataBlock<Array<number>, number> = new TurboDataBlock();
    // @blockSignal() public rowHeights: TurboDataBlock<Array<number>, number> = new TurboDataBlock();
}