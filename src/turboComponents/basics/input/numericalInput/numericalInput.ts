import {TurboInput} from "../input";
import {TurboInputProperties} from "../input.types";
import {define} from "../../../../decorators/define/define";
import {TurboView} from "../../../../mvc/core/view";
import {TurboModel} from "../../../../mvc/core/model";

@define("turbo-numerical-input")
class TurboNumericalInput<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboInput<"input", number, ViewType, DataType, ModelType> {
    public multiplier: number;
    public decimalPlaces: number;

    public min: number;
    public max: number;

    public constructor(properties: TurboInputProperties<"input", ViewType, DataType, ModelType> = {}) {
        //Only allow numbers (positive, negative, and decimal)
        properties.inputRegexCheck = properties.inputRegexCheck || /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?\.?$|^-$|^$/;
        properties.blurRegexCheck = properties.blurRegexCheck || /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;
        super(properties);

        this.multiplier = properties.multiplier || 1;
        this.decimalPlaces = properties.decimalPlaces;

        this.min = properties.min;
        this.max = properties.max;
    }

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

export {TurboNumericalInput};

