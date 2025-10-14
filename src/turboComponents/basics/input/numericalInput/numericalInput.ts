import {TurboInput} from "../input";
import {TurboInputProperties} from "../input.types";
import {define} from "../../../../decorators/define/define";
import {TurboView} from "../../../../mvc/core/view";
import {TurboModel} from "../../../../mvc/core/model";
import {TurboEmitter} from "../../../../mvc/core/emitter";
import {element} from "../../../../elementCreation/element";
import {TurboNumericalInputProperties} from "./numericalInput.types";

@define("turbo-numerical-input")
class TurboNumericalInput<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboInput<"input", number, ViewType, DataType, ModelType, EmitterType> {
    public multiplier: number = 1;
    public decimalPlaces: number;

    public min: number;
    public max: number;

    public get value(): number {
        return Number.parseFloat(this.stringValue) / this.multiplier;
    }

    public set value(value: string | number) {
        if (!value || value == "") value = 0;
        if (typeof value == "string") value = Number.parseFloat(value);

        value *= this.multiplier;

        if (this.min != undefined && value < this.min) value = this.min;
        if (this.max != undefined && value > this.max) value = this.max;

        if (this.decimalPlaces != undefined) {
            value = Math.round(value * Math.pow(10, this.decimalPlaces)) / Math.pow(10, this.decimalPlaces);
        }

        super.value = value;
    }
}

function numericalInput<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
>(
    properties: TurboNumericalInputProperties<ViewType, DataType, ModelType, EmitterType>
): TurboNumericalInput<ViewType, DataType, ModelType, EmitterType> {
    properties.element = properties.input;
    properties.elementTag = "input";
    if (!properties.element) properties.element = {};

    //Only allow numbers (positive, negative, and decimal)
    if (!properties.inputRegexCheck) properties.inputRegexCheck = /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?\.?$|^-$|^$/;
    if (!properties.blurRegexCheck) properties.blurRegexCheck = /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;

    return element({...properties, input: undefined, inputTag: undefined, tag: "turbo-input"}) as any;
}

export {TurboNumericalInput, numericalInput};

