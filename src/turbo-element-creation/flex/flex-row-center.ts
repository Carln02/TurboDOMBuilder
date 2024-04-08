import {TurboProperties} from "../../core/definitions/turbo-types";
import {flexRow} from "./flex-row";

/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
function flexRowCenter(properties?: TurboProperties): HTMLElement {
    let el = flexRow(properties);
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
    return el;
}

export {flexRowCenter};