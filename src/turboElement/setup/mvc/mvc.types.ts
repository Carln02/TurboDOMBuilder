import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";

interface TurboElementMvcInterface<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel
> {
    /**
     * @description The view (if any) of the element.
     */
    view: ViewType;

    /**
     * @description The model (if any) of the element.
     */
    model: ModelType;

    /**
     * @description The main data block (if any) attached to the element, taken from its model (if any).
     */
    data: DataType;

    /**
     * @description The ID of the main data block (if any) of the element, taken from its model (if any).
     */
    dataId: string;


    /**
     * @description The numerical index of the main data block (if any) of the element, taken from its model (if any).
     */
    dataIndex: number;

    /**
     * @description The size (number) of the main data block (if any) of the element, taken from its model (if any).
     */
    readonly dataSize: number;
}

export {TurboElementMvcInterface};