import {TurboCompatible} from "../../core/definitions/turbo-types";
import {getElement} from "../element-manipulation/get-element";
import {addChild} from "./add-child";
import {getChildHandler} from "../element-manipulation/get-child-handler";

/**
 * @description Add children elements to a parent element.
 * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
 * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {TurboCompatible} sibling - Sibling Turbo or HTML DOM element
 * @return The element itself
 */
function addChildBefore(element?: TurboCompatible, children?: TurboCompatible | TurboCompatible[],
                   sibling?: TurboCompatible): TurboCompatible {
    if (!element || !children) return element;
    if (!sibling) return addChild(element, children);

    let htmlElement = getChildHandler(element);
    let htmlSibling = getElement(sibling);

    //Try to append every provided child (according to its type)
    try {
        if (!Array.isArray(children)) htmlElement.insertBefore(getElement(children), htmlSibling);
        else children.forEach((child: TurboCompatible) => htmlElement.insertBefore(getElement(child), htmlSibling));
    } catch (e) {
        console.error(e);
    }

    return element;
}

export {addChildBefore};