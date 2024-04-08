import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates a h5 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h5 element.
 */
function h5(properties: TurboProperties<HTMLHeadingElement> = {}): HTMLHeadingElement {
    properties.tag = "h5";
    return element(properties) as HTMLHeadingElement;
}

export {h5};