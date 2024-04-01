import {TurboProperties} from "../../core/definitions/turbo-types";
import {Turbo} from "../../core/turbo";
import {setProperties} from "../../turbo-functions/element-manipulation/set-properties";

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
function img(properties: TurboProperties<HTMLImageElement> = {}): TurboImage {
    let el = document.createElement("turbo-img") as TurboImage;
    setProperties(el, properties);
    return el;
}

export {TurboImage, img};