import {TurboProperties} from "../../core/definitions/turbo-types";
import {Turbo} from "../../core/turbo";
import {setProperties} from "../../turbo-functions/element-manipulation/set-properties";

/**
 * @class TurboH1
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H1 TurboElement class, extending the base HTML h1 element with a few powerful tools and functions.
 */
class TurboH1 extends Turbo(HTMLHeadingElement) {
    constructor(properties: TurboProperties<HTMLHeadingElement> = {}) {
        super(properties);
    }
}

customElements.define("turbo-h1", TurboH1, {extends: "h1"});

/**
 * @description Creates a h1 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h1 element.
 */
function h1(properties: TurboProperties<HTMLHeadingElement> = {}): TurboH1 {
    let el = document.createElement("turbo-h1") as TurboH1;
    setProperties(el, properties);
    return el;
}

export {TurboH1, h1};