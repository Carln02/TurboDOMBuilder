import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates an image TurboElement with the given properties.
 * @param {TurboProperties<HTMLImageElement>} [properties] - The properties object.
 * @returns The Turbo image element.
 */
function img(properties: TurboProperties<HTMLImageElement> = {}): HTMLImageElement {
    properties.tag = "img";
    return element(properties) as HTMLImageElement;
}

export {img};