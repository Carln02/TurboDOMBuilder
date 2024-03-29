import {TurboProperties} from "../../turbo/definitions/turbo-types";
import {Turbo} from "../../turbo/core/turbo";

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
    return new TurboInput(properties);
}

export {TurboInput, input};