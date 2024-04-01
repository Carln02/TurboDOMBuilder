import {TurboProperties} from "../../core/definitions/turbo-types";
import {Turbo} from "../../core/turbo";
import {setProperties} from "../../turbo-functions/element-manipulation/set-properties";

/**
 * @class TurboH5
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H5 TurboElement class, extending the base HTML h5 element with a few powerful tools and functions.
 */
class TurboH5 extends Turbo(HTMLHeadingElement) {
    constructor(properties: TurboProperties<HTMLHeadingElement> = {}) {
        super(properties);
    }
}

customElements.define("turbo-h5", TurboH5, {extends: "h5"});

/**
 * @description Creates a h5 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h5 element.
 */
function h5(properties: TurboProperties<HTMLHeadingElement> = {}): TurboH5 {
    let el = document.createElement("turbo-h5") as TurboH5;
    setProperties(el, properties);
    return el;
}

export {TurboH5, h5};