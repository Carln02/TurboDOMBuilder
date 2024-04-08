import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates a canvas TurboElement with the given properties.
 * @param {TurboProperties<HTMLCanvasElement>} [properties] - The properties object.
 * @returns The Turbo canvas element.
 */
function canvas(properties: TurboProperties<HTMLCanvasElement> = {}): HTMLCanvasElement {
    properties.tag = "canvas";
    return element(properties) as HTMLCanvasElement;
}

export {canvas};