import {TurboProperties} from "../../core/definitions/turbo-types";
import {Turbo} from "../../core/turbo";
import {setProperties} from "../../turbo-functions/element-manipulation/set-properties";

/**
 * @class TurboH2
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H2 TurboElement class, extending the base HTML h2 element with a few powerful tools and functions.
 */
class TurboH2 extends Turbo(HTMLHeadingElement) {
    constructor(properties: TurboProperties<HTMLHeadingElement> = {}) {
        super(properties);
    }
}

customElements.define("turbo-h2", TurboH2, {extends: "h2"});

/**
 * @description Creates a h2 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h2 element.
 */
function h2(properties: TurboProperties<HTMLHeadingElement> = {}): TurboH2 {
    let el = document.createElement("turbo-h2") as TurboH2;
    setProperties(el, properties);
    return el;
}

export {TurboH2, h2};