import {TurboCompatible} from "../../core/definitions/turbo-types";
import {getElement} from "../element-manipulation/get-element";

/**
 * @description Remove children elements from a parent element.
 * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
 * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
function removeChild(element?: TurboCompatible, children?: TurboCompatible | TurboCompatible[]): TurboCompatible {
    if (!element || !children) return element;

    let htmlElement = getElement(element);

    //Try to remove every provided child (according to its type)
    try {
        if (!Array.isArray(children)) htmlElement.removeChild(getElement(children));
        else children.forEach(child => htmlElement.removeChild(getElement(child)));
    } catch (e) {
        console.error(e);
    }

    return element;
}

export {removeChild};