import {TurboInputProperties} from "../input.types";
import {TurboView} from "../../../../domBuilding/turboElement/turboView";
import {TurboModel} from "../../../../domBuilding/turboElement/turboModel";

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