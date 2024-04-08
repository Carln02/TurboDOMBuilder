import {TurboCompatible} from "../../core/definitions/turbo-types";
import {TurboWrapper} from "../../core/turbo-wrapper";

/**
 * @description Returns the HTML element from the provided Turbo compatible entity.
 * @param {TurboCompatible} element - The Turbo compatible entity to get the HTML element from
 * @return The HTML element
 */
function getElement(element: TurboCompatible): Element {
    if (element instanceof Element) return element;
    if ("element" in element) return (element as TurboWrapper).element;
}

export {getElement};