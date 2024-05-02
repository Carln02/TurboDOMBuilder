import {StylesRoot, TurboCompatible} from "../../core/definitions/turbo-types";

/**
 * @description Retrieves the closest root to the provided element in  the document.
 * @param {TurboCompatible} [element] - The element from which to start the search.
 * @return The closest root, or the document's head.
 */
function getClosestRoot(element?: TurboCompatible): StylesRoot {
    while (element) {
        if (element.shadowRoot) return element.shadowRoot;
        element = element.parentElement;
    }

    return document.head;
}

export {getClosestRoot};