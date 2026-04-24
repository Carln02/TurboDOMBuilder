import {TurboInput} from "../input";
import {define} from "../../../../decorators/define/define";
import {TurboView} from "../../../../mvc/view/view";
import {TurboModel} from "../../../../mvc/model/model";
import {TurboEmitter} from "../../../../mvc/emitter/emitter";
import {TurboNumericalInputProperties} from "./numericalInput.types";

/**
 * @group Components
 * @category TurboNumericalInput
 */
class TurboNumericalInput<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboInput<"input", number, ViewType, DataType, ModelType, EmitterType> {
     public declare readonly properties: TurboNumericalInputProperties;
    public static defaultProperties: TurboNumericalInputProperties = {
        inputRegexCheck: /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?\.?$|^-$|^$/,
        blurRegexCheck: /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/,
    }

    public multiplier: number = 1;
    public decimalPlaces: number;

    public min: number;
    public max: number;

    public get value(): number {
        return Number.parseFloat(this.element.value) / this.multiplier;
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

define(TurboNumericalInput);
export {TurboNumericalInput};

