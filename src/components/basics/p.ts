import {TurboProperties} from "../../core/definitions/turbo-types";
import {Turbo} from "../../core/turbo";
import {setProperties} from "../../turbo-functions/element-manipulation/set-properties";

/**
 * @class TurboP
 * @extends HTMLParagraphElement
 * @implements ITurbo
 * @description P TurboElement class, extending the base HTML p element with a few powerful tools and functions.
 */
class TurboP extends Turbo(HTMLParagraphElement) {
    constructor(properties: TurboProperties<HTMLParagraphElement> = {}) {
        super(properties);
    }
}

customElements.define("turbo-p", TurboP, {extends: "p"});

/**
 * @description Creates a p TurboElement with the given properties.
 * @param {TurboProperties<HTMLParagraphElement>} [properties] - The properties object.
 * @returns The Turbo p element.
 */
function p(properties: TurboProperties<HTMLParagraphElement> = {}): TurboP {
    let el = document.createElement("turbo-p") as TurboP;
    setProperties(el, properties);
    return el;
}

export {TurboP, p};