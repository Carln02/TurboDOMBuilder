import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates a form TurboElement with the given properties.
 * @param {TurboProperties<HTMLFormElement>} [properties] - The properties object.
 * @returns The Turbo form element.
 */
function form(properties: TurboProperties<HTMLFormElement> = {}): HTMLFormElement {
    properties.tag = "form";
    return element(properties) as HTMLFormElement;
}

export {form};