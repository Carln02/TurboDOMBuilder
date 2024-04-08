import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates a h2 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h2 element.
 */
function h2(properties: TurboProperties<HTMLHeadingElement> = {}): HTMLHeadingElement {
    properties.tag = "h2";
    return element(properties) as HTMLHeadingElement;
}
export {h2};