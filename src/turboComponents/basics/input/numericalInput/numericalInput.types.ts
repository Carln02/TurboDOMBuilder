import {TurboInputProperties} from "../input.types";
import {TurboView} from "../../../../mvc/view/view";
import {TurboModel} from "../../../../mvc/model/model";
import {TurboEmitter} from "../../../../mvc/emitter/emitter";
import {TurboNumericalInput} from "./numericalInput";

/**
 * @group Components
 * @category TurboNumericalInput
 */
type TurboNumericalInputProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
> = TurboInputProperties<"input", ViewType, DataType, ModelType, EmitterType> & {
    multiplier?: number,
    decimalPlaces?: number,

    min?: number,
    max?: number,
};

declare module "../../../../types/element.types" {
    interface TurboElementTagNameMap {
        "turbo-numerical-inout": TurboNumericalInput
    }
}

export {TurboNumericalInputProperties};