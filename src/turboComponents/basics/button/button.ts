import {TurboButtonConfig} from "./button.types";
import "./button.css";
import {TurboRichElement} from "../richElement/richElement";
import {TurboRichElementProperties} from "../richElement/richElement.types";
import {$} from "../../../turboFunctions/turboFunctions";
import {define} from "../../../decorators/define/define";
import {ValidTag} from "../../../core.types";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {auto} from "../../../decorators/auto/auto";
import {TurboEmitter} from "../../../mvc/core/emitter";
import {element} from "../../../elementCreation/element";

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
    if (properties.text && !properties.element) properties.element = properties.text;
    return element({...properties, text: undefined, tag: "turbo-button"} as any) as any;
}

export {TurboButton, button};