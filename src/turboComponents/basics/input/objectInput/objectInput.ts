import {TurboInput} from "../input";
import {TurboView} from "../../../../mvc/view/view";
import {TurboModel} from "../../../../mvc/model/model";
import {TurboEmitter} from "../../../../mvc/emitter/emitter";
import {signal} from "../../../../decorators/reactivity/reactivity";
import {ValidElement} from "../../../../types/element.types";
import {TurboProperties} from "../../../../turboFunctions/element/element.types";

class TurboObjectInput<
    InputTag extends "input" | "textarea" = "input",
    ValueType = string,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
> extends TurboInput<InputTag, ValueType, ViewType, DataType, ModelType, EmitterType> {
    @signal public get element(): ValidElement<InputTag> {
        return super.element;
    }

    public set element(value: TurboProperties<InputTag> | ValidElement<InputTag>) {
        super.element = value;
    }
}