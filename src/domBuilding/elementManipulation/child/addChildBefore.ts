import {addChild} from "./addChild";
import {childHandler} from "../element/childHandler";

/**
 * @description Add children elements to a parent element.
 * @param {Element} element - Parent Turbo or HTML DOM element
 * @param {Element | Element[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {Element} sibling - Sibling Turbo or HTML DOM element
 * @return The element itself
 */
function addChildBefore(element?: Element, children?: Element | Element[],
                   sibling?: Element): Element {
    if (!element || !children) return element;
    if (!sibling) return addChild(element, children);

    let htmlElement = childHandler(element);

    //Try to append every provided child (according to its type)
    try {
        if (!Array.isArray(children)) htmlElement.insertBefore(children, sibling);
        else children.forEach((child: Element) => htmlElement.insertBefore(child, sibling));
    } catch (e) {
        console.error(e);
    }

    return element;
}

export {addChildBefore};