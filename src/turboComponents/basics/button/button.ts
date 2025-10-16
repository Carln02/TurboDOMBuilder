import {TurboButtonConfig} from "./button.types";
import "./button.css";
import {richElement, TurboRichElement} from "../richElement/richElement";
import {TurboRichElementProperties} from "../richElement/richElement.types";
import {define} from "../../../decorators/define/define";
import {ValidTag} from "../../../core.types";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboEmitter} from "../../../mvc/core/emitter";

/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
@define("turbo-button")
class TurboButton<
    ElementTag extends ValidTag = "p",
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboRichElement<ElementTag, ViewType, DataType, ModelType, EmitterType> {
    public static readonly config: TurboButtonConfig = {...TurboRichElement.config, defaultElementTag: "h4"};
}

function button<
    ElementTag extends ValidTag = "p",
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
>(
    properties: TurboRichElementProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>
): TurboButton<ElementTag, ViewType, DataType, ModelType, EmitterType> {
    if (!properties.tag) properties.tag = "turbo-button";
    return richElement({...properties});
}

export {TurboButton, button};