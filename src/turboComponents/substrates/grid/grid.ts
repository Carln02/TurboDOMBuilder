import {TurboElement} from "../../../turboElement/turboElement";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboEmitter} from "../../../mvc/core/emitter";

class TurboGrid<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {

}

export {TurboGrid};