import {TurboRichElementProperties} from "../richElement/richElement.types";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboProperties} from "../../../turboFunctions/element/element.types";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {ValidElement} from "../../../types/element.types";
import {TurboInput} from "./input";
import {expose} from "../../../decorators/expose";

/**
 * @group Components
 * @category TurboInput
 */
type TurboInputProperties<
    InputTag extends "input" | "textarea" = "input",
    ValueType = string,
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

    value?: ValueType,
    type?: string,
    placeholder?: string,
    pattern?: string,
    size?: string
};


declare module "../../../types/element.types" {
    interface TurboElementTagNameMap {
        "turbo-inout": TurboInput
    }
}

export {TurboInputProperties};