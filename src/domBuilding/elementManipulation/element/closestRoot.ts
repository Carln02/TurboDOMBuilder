import {StylesRoot} from "../../turboElement/turboElement.types";

/**
 * @description Retrieves the closest root to the provided element in  the document.
 * @param {Element} [element] - The element from which to start the search.
 * @return The closest root, or the document's head.
 */
function closestRoot(element?: Element): StylesRoot {
    while (element) {
        if (element.shadowRoot) return element.shadowRoot;
        element = element.parentElement;
    }

    return document.head;
}

export {closestRoot};