import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates a p TurboElement with the given properties.
 * @param {TurboProperties<HTMLParagraphElement>} [properties] - The properties object.
 * @returns The Turbo p element.
 */
function p(properties: TurboProperties<HTMLParagraphElement> = {}): HTMLParagraphElement {
    properties.tag = "p";
    return element(properties) as HTMLParagraphElement;
}

export {p};