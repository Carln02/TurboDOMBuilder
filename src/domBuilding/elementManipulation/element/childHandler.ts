import {ChildHandler} from "../../turboElement/turboElement.types";

/**
 * @description Returns the HTML child handler object associated with the provided Turbo compatible entity.
 * @param {Element} element - The element to get the handler object from
 * @return The HTML element or its shadow root (if defined)
 */
function childHandler(element: Element): ChildHandler {
    if (element.shadowRoot) return element.shadowRoot;
    return element;
}

export {childHandler};