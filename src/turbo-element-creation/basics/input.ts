import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates an input TurboElement with the given properties.
 * @param {TurboProperties<HTMLInputElement>} [properties] - The properties object.
 * @returns The Turbo input element.
 */
function input(properties: TurboProperties<HTMLInputElement> = {}): HTMLInputElement {
    properties.tag = "input";
    return element(properties) as HTMLInputElement;
}

export {input};