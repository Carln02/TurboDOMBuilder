import {childHandler} from "../element/childHandler";

/**
 * @description Remove children elements from a parent element.
 * @param {Element} element - Parent Turbo or HTML DOM element
 * @param {Element | Element[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
function removeChild(element?: Element, children?: Element | Element[]): Element {
    if (!element || !children) return element;

    let htmlElement = childHandler(element);

    //Try to remove every provided child (according to its type)
    try {
        if (!Array.isArray(children)) htmlElement.removeChild(children);
        else children.forEach(child => htmlElement.removeChild(child));
    } catch (e) {
        console.error(e);
    }

    return element;
}

export {removeChild};