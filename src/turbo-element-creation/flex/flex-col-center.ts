import {TurboProperties} from "../../core/definitions/turbo-types";
import {flexCol} from "./flex-col";

/**
 * @description Create a flex column element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
function flexColCenter(properties?: TurboProperties): HTMLElement {
    let el = flexCol(properties);
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
    return el;
}

export {flexColCenter};