import {element} from "../element";
import {TurboProperties} from "../../core/definitions/turbo-types";

/**
 * @description Create a spacer element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created spacer element
 */
function spacer(properties?: TurboProperties): HTMLElement {
    let el = element(properties);
    el.style.flexGrow = "1";
    return el;
}

export {spacer};