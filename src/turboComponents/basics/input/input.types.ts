import {TurboRichElementProperties} from "../richElement/richElement.types";
import {TurboView} from "../../../domBuilding/turboElement/turboView";
import {TurboModel} from "../../../domBuilding/turboElement/turboModel";

type TurboInputProperties<
    InputTag extends "input" | "textarea" = "input",
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
> = TurboRichElementProperties<InputTag, ViewType, DataType, ModelType> & {
    label?: string,

    locked?: boolean,
    dynamicVerticalResize?: boolean,

    inputRegexCheck?: RegExp | string,
    blurRegexCheck?: RegExp | string,

    selectTextOnFocus?: boolean,
};

export {TurboInputProperties};