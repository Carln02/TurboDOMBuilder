import {TurboModel} from "../../../mvc/model/model";
import {Point} from "../../datatypes/point/point";
// import {blockSignal} from "../../../decorators/reactivity/reactivity";

class GridModel<
    DataType = any,
    DataKeyType extends KeyType = any,
    IdType extends KeyType = any,
    ComponentType extends object = any,
    DataEntryType = any
> extends TurboModel<DataType, DataKeyType, IdType, ComponentType, DataEntryType> {
    // @blockSignal() public positions: TurboDataBlock<Map<string, Point>, string> = new TurboDataBlock();
    // @blockSignal() public columnWidths: TurboDataBlock<Array<number>, number> = new TurboDataBlock();
    // @blockSignal() public rowHeights: TurboDataBlock<Array<number>, number> = new TurboDataBlock();
}