import {TurboRichElementProperties} from "../richElement/richElement.types";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";

type TurboInputProperties<
    InputTag extends "input" | "textarea" = "input",
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel
> = Omit<TurboRichElementProperties<InputTag, ViewType, DataType, ModelType>, "element"> & {
    label?: string,

    locked?: boolean,
    dynamicVerticalResize?: boolean,

    inputRegexCheck?: RegExp | string,
    blurRegexCheck?: RegExp | string,

    selectTextOnFocus?: boolean,
};

export {TurboInputProperties};