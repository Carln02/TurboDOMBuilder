import {TurboRichElementProperties} from "../richElement/richElement.types";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboProperties} from "../../../turboFunctions/element/element.types";
import {TurboEmitter} from "../../../mvc/core/emitter";
import {ValidElement} from "../../../types/element.types";

/**
 * @group Components
 * @category TurboInput
 */
type TurboInputProperties<
    InputTag extends "input" | "textarea" = "input",
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
> = Omit<TurboRichElementProperties<InputTag, ViewType, DataType, ModelType, EmitterType>, "element" | "elementTag"> & {
    inputTag?: InputTag;
    input?: TurboProperties<InputTag> | ValidElement<InputTag>,
    label?: string,

    locked?: boolean,
    dynamicVerticalResize?: boolean,

    inputRegexCheck?: RegExp | string,
    blurRegexCheck?: RegExp | string,

    selectTextOnFocus?: boolean,
};

export {TurboInputProperties};