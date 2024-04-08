import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates a h3 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h3 element.
 */
function h3(properties: TurboProperties<HTMLHeadingElement> = {}): HTMLHeadingElement {
    properties.tag = "h3";
    return element(properties) as HTMLHeadingElement;
}

export {h3};