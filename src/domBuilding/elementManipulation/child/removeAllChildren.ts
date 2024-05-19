import {childHandler} from "../element/childHandler";

/**
 * @description Remove all children of the given parent element.
 * @param {Element} element - Parent Turbo or HTML DOM element
 * @return The element itself
 */
function removeAllChildren(element?: Element): Element {
    if (!element) return element;

    try {
        Array.from(childHandler(element).children).forEach(child => child.remove());
    } catch (e) {
        console.error(e);
    }

    return element;
}

export {removeAllChildren};
