import { TurboInput } from "../input";
import { TurboInputProperties } from "../input.types";
import { TurboNumericalInputProperties } from "./numericalInput.types";
declare class TurboNumericalInput extends TurboInput<"input", number> {
    multiplier: number;
    decimalPlaces: number;
    min: number;
    max: number;
    constructor(properties?: TurboInputProperties);
    get value(): number;
    set value(value: string | number);
}
declare function numericalInput(properties?: TurboNumericalInputProperties): TurboNumericalInput;
export { TurboNumericalInput, numericalInput };
