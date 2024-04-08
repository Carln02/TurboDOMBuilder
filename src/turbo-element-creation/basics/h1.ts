import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates a h1 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h1 element.
 */
function h1(properties: TurboProperties<HTMLHeadingElement> = {}): HTMLHeadingElement {
    properties.tag = "h1";
    return element(properties) as HTMLHeadingElement;
}

export {h1};