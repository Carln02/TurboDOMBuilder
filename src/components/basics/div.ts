import {TurboProperties} from "../../turbo/definitions/turbo-types";
import {Turbo} from "../../turbo/core/turbo";

/**
 * @class TurboDiv
 * @extends HTMLDivElement
 * @implements ITurbo
 * @description Div TurboElement class, extending the base HTML Div element with a few powerful tools and functions.
 */
class TurboDiv extends Turbo(HTMLDivElement) {
    constructor(properties: TurboProperties<HTMLDivElement> = {}) {
        super(properties);
    }
}

customElements.define("turbo-div", TurboDiv, {extends: "div"});

/**
 * @description Creates a div TurboElement with the given properties.
 * @param {TurboProperties<HTMLDivElement>} [properties] - The properties object.
 * @returns The Turbo div element.
 */
function div(properties: TurboProperties<HTMLDivElement> = {}): TurboDiv {
    return new TurboDiv(properties);
}

export {TurboDiv, div};