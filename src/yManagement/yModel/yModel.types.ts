import {MvcDataBlock} from "../../mvc/core/core.types";
import {YEvent} from "yjs";

type YDataBlock<
    DataType = any,
    IdType extends string | number | symbol = any
> = MvcDataBlock<DataType, IdType> & {
    observer: (event: YEvent, transaction: any) => void,
    data: DataType,
};

export {YDataBlock};