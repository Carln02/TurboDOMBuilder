import {TurboProperties} from "../../core/definitions/turbo-types";
import {Turbo} from "../../core/turbo";
import {setProperties} from "../../turbo-functions/element-manipulation/set-properties";

/**
 * @class TurboH6
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H6 TurboElement class, extending the base HTML h6 element with a few powerful tools and functions.
 */
class TurboH6 extends Turbo(HTMLHeadingElement) {
    constructor(properties: TurboProperties<HTMLHeadingElement> = {}) {
        super(properties);
    }
}

customElements.define("turbo-h6", TurboH6, {extends: "h6"});

/**
 * @description Creates a h6 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h6 element.
 */
function h6(properties: TurboProperties<HTMLHeadingElement> = {}): TurboH6 {
    let el = document.createElement("turbo-h6") as TurboH6;
    setProperties(el, properties);
    return el;
}

export {TurboH6, h6};