import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates a div TurboElement with the given properties.
 * @param {TurboProperties<HTMLDivElement>} [properties] - The properties object.
 * @returns The Turbo div element.
 */
function div(properties: TurboProperties<HTMLDivElement> = {}): HTMLDivElement {
    properties.tag = "div";
    return element(properties) as HTMLDivElement;
}

export {div};