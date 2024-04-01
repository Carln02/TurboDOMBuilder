import {TurboProperties} from "../../core/definitions/turbo-types";
import {Turbo} from "../../core/turbo";
import {setProperties} from "../../turbo-functions/element-manipulation/set-properties";

/**
 * @class TurboH4
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H4 TurboElement class, extending the base HTML h4 element with a few powerful tools and functions.
 */
class TurboH4 extends Turbo(HTMLHeadingElement) {
    constructor(properties: TurboProperties<HTMLHeadingElement> = {}) {
        super(properties);
    }
}

customElements.define("turbo-h4", TurboH4, {extends: "h4"});

/**
 * @description Creates a h4 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h4 element.
 */
function h4(properties: TurboProperties<HTMLHeadingElement> = {}): TurboH4 {
    let el = document.createElement("turbo-h4") as TurboH4;
    setProperties(el, properties);
    return el;
}

export {TurboH4, h4};