import {ValidTag} from "../../../types/element.types";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {TurboRichElementProperties} from "../richElement/richElement.types";

/**
 * @group Components
 * @category TurboLabelElement
 */
type TurboLabelElementProperties<
    ElementTag extends ValidTag = any,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboRichElementProperties<ElementTag, ViewType, DataType, ModelType, EmitterType> & {
    label?: string,
    locked?: boolean,
};

export {TurboLabelElementProperties};