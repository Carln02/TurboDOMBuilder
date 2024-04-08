import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates a h6 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h6 element.
 */
function h6(properties: TurboProperties<HTMLHeadingElement> = {}): HTMLHeadingElement {
    properties.tag = "h6";
    return element(properties) as HTMLHeadingElement;
}

export {h6};