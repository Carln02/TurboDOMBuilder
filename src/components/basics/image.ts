import {TurboProperties} from "../../turbo/definitions/turbo-types";
import {Turbo} from "../../turbo/core/turbo";

/**
 * @class TurboImage
 * @extends HTMLImageElement
 * @implements ITurbo
 * @description Image TurboElement class, extending the base HTML Image element with a few powerful tools and functions.
 */
class TurboImage extends Turbo(HTMLImageElement) {
    constructor(properties: TurboProperties<HTMLImageElement> = {}) {
        super(properties);
    }
}

customElements.define("turbo-img", TurboImage, {extends: "img"});

/**
 * @description Creates an image TurboElement with the given properties.
 * @param {TurboProperties<HTMLImageElement>} [properties] - The properties object.
 * @returns The Turbo image element.
 */
function image(properties: TurboProperties<HTMLImageElement> = {}): TurboImage {
    return new TurboImage(properties);
}

export {TurboImage, image};