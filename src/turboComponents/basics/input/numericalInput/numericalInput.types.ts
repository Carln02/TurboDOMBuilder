import {TurboInputProperties} from "../input.types";

type TurboNumericalInputProperties = TurboInputProperties & {
    multiplier?: number,
    decimalPlaces?: number,

    min?: number,
    max?: number,
};

export {TurboNumericalInputProperties};