import "./button.types";
import "./button.css";
import {TurboRichElement} from "../richElement/richElement";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {ValidTag} from "../../../types/element.types";

/**
 * @class TurboButton
 * @group Components
 * @category TurboButton
 *
 * @description Button class for creating Turbo button elements.
 * @extends TurboElement
 */
class TurboButton<
    ElementTag extends ValidTag = any,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboRichElement<ElementTag, ViewType, DataType, ModelType, EmitterType> {
}

define(TurboButton);
export {TurboButton};