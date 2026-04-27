import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {TurboOperator} from "../../../mvc/operator/operator";
import {TurboHandler} from "../../../mvc/handler/handler";
import {TurboInteractor} from "../../../mvc/interactor/interactor";
import {TurboTool} from "../../../mvc/tool/tool";
import {TurboSubstrate} from "../../../mvc/substrate/substrate";

/**
 * @internal
 */
interface TurboElementMvcInterface<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
> {
    // -------------------------------------------------------------------------
    // Singular pieces
    // -------------------------------------------------------------------------

    /**
     * @description The view (if any) of the element.
     */
    view: ViewType;

    /**
     * @description The model (if any) of the element.
     */
    model: ModelType;

    /**
     * @description The emitter (if any) of the element.
     */
    emitter: EmitterType;

    // -------------------------------------------------------------------------
    // Data
    // -------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------
    // Others
    // -------------------------------------------------------------------------

    /**
     * @description The operators (if any) attached to the element's MVC structure.
     */
    operators: TurboOperator[];

    /**
     * @description The handlers (if any) attached to the element's model.
     * Returns an empty array if no model is set.
     */
    handlers: TurboHandler[];

    /**
     * @description The interactors (if any) attached to the element's MVC structure.
     */
    interactors: TurboInteractor[];

    /**
     * @description The tools (if any) attached to the element's MVC structure.
     */
    tools: TurboTool[];

    /**
     * @description The substrates (if any) attached to the element's MVC structure.
     */
    substrates: TurboSubstrate[];
}

export {TurboElementMvcInterface};