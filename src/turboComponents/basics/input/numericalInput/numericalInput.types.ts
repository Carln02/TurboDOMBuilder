import {TurboInputProperties} from "../input.types";
import {TurboView} from "../../../../mvc/core/view";
import {TurboModel} from "../../../../mvc/core/model";

type TurboNumericalInputProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
> = TurboInputProperties<"input", ViewType, DataType, ModelType> & {
    multiplier?: number,
    decimalPlaces?: number,

    min?: number,
    max?: number,
};

export {TurboNumericalInputProperties};