import {TurboCompatible} from "../../core/definitions/turbo-types";
import {getElement} from "../element-manipulation/get-element";

/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboCompatible} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
function addClass(element?: TurboCompatible, classes?: string | string[]): TurboCompatible {
    if (!element || !classes) return element;

    let htmlElement = getElement(element);

    try {
        // If string provided --> split by spaces
        if (typeof classes === "string") classes = classes.split(" ");
        classes.filter(entry => entry.trim().length > 0).forEach(entry => htmlElement.classList.add(entry));
    } catch (e) {
        console.error(e);
    }

    return element;
}

export {addClass};