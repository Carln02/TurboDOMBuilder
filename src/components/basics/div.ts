import {TurboProperties} from "../../core/definitions/turbo-types";
import {Turbo} from "../../core/turbo";
import {setProperties} from "../../turbo-functions/element-manipulation/set-properties";

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
    let el = document.createElement("turbo-div") as TurboDiv;
    setProperties(el, properties);
    return el;
}

export {TurboDiv, div};