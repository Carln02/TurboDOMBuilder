import {TurboProperties} from "../../core/definitions/turbo-types";
import {Turbo} from "../../core/turbo";
import {setProperties} from "../../turbo-functions/element-manipulation/set-properties";

/**
 * @class TurboH3
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H3 TurboElement class, extending the base HTML h3 element with a few powerful tools and functions.
 */
class TurboH3 extends Turbo(HTMLHeadingElement) {
    constructor(properties: TurboProperties<HTMLHeadingElement> = {}) {
        super(properties);
    }
}

customElements.define("turbo-h3", TurboH3, {extends: "h3"});

/**
 * @description Creates a h3 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h3 element.
 */
function h3(properties: TurboProperties<HTMLHeadingElement> = {}): TurboH3 {
    let el = document.createElement("turbo-h3") as TurboH3;
    setProperties(el, properties);
    return el;
}

export {TurboH3, h3};