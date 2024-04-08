import {element} from "../element";
import {TurboProperties} from "../../core/definitions/turbo-types";

/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
function flexRow(properties?: TurboProperties): HTMLElement {
    let el = element(properties);
    el.style.display = "flex";
    el.style.flexDirection = "row";
    return el;
}

export {flexRow};