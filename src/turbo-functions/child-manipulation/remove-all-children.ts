import {TurboCompatible} from "../../core/definitions/turbo-types";
import {getElement} from "../element-manipulation/get-element";

/**
 * @description Remove all children of the given parent element.
 * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
 * @return The element itself
 */
function removeAllChildren(element?: TurboCompatible): TurboCompatible {
    if (!element) return element;

    try {
        Array.from(getElement(element).children).forEach(child => child.remove());
    } catch (e) {
        console.error(e);
    }

    return element;
}

export {removeAllChildren};
