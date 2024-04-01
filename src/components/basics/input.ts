import {TurboProperties} from "../../core/definitions/turbo-types";
import {Turbo} from "../../core/turbo";
import {setProperties} from "../../turbo-functions/element-manipulation/set-properties";

/**
 * @class TurboInput
 * @extends HTMLInputElement
 * @implements ITurbo
 * @description Input TurboElement class, extending the base HTML Input element with a few powerful tools and functions.
 */
class TurboInput extends Turbo(HTMLInputElement) {
    constructor(properties: TurboProperties<HTMLInputElement> = {}) {
        super(properties);
    }
}

customElements.define("turbo-input", TurboInput, {extends: "input"});

/**
 * @description Creates an input TurboElement with the given properties.
 * @param {TurboProperties<HTMLInputElement>} [properties] - The properties object.
 * @returns The Turbo input element.
 */
function input(properties: TurboProperties<HTMLInputElement> = {}): TurboInput {
    let el = document.createElement("turbo-input") as TurboInput;
    setProperties(el, properties);
    return el;
}

export {TurboInput, input};