import {childHandler} from "../element/childHandler";

/**
 * @description Add children elements to a parent element.
 * @param {Element} [element] - Parent Turbo or HTML DOM element
 * @param {Element | Element[]} [children] - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
function addChild(element?: Element, children?: Element | Element[]): Element {
    if (!element || !children) return element;

    let htmlElement = childHandler(element);

    //Try to append every provided child (according to its type)
    try {
        if (!Array.isArray(children)) htmlElement.appendChild(children);
        else children.forEach((child: Element) => htmlElement.appendChild(child));
    } catch (e) {
        console.error(e);
    }

    return element;
}

export {addChild};