import {TurboRichElementProperties} from "../richElement/richElement.types";
import {TurboView} from "../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../domBuilding/mvc/turboModel";
import {TurboEmitter} from "../../../domBuilding/mvc/turboEmitter";

type TurboInputProperties<
    InputTag extends "input" | "textarea" = "input",
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboRichElementProperties<InputTag, ViewType, DataType, ModelType, EmitterType> & {
    label?: string,

    locked?: boolean,
    dynamicVerticalResize?: boolean,

    inputRegexCheck?: RegExp | string,
    blurRegexCheck?: RegExp | string,

    selectTextOnFocus?: boolean,
};

export {TurboInputProperties};