import {TurboCompatible} from "../../core/definitions/turbo-types";
import {getElement} from "../element-manipulation/get-element";

/**
 * @description Add children elements to a parent element.
 * @param {TurboCompatible} [element] - Parent Turbo or HTML DOM element
 * @param {TurboCompatible | TurboCompatible[]} [children] - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
function addChild(element?: TurboCompatible, children?: TurboCompatible | TurboCompatible[]): TurboCompatible {
    if (!element || !children) return element;

    let htmlElement = getElement(element);

    //Try to append every provided child (according to its type)
    try {
        if (!Array.isArray(children)) htmlElement.appendChild(getElement(children));
        else children.forEach((child: TurboCompatible) => htmlElement.appendChild(getElement(child)));
    } catch (e) {
        console.error(e);
    }

    return element;
}

export {addChild};