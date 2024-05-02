import {ChildHandler, TurboCompatible} from "../../core/definitions/turbo-types";
import {TurboWrapper} from "../../core/turbo-wrapper";

/**
 * @description Returns the HTML child handler object associated with the provided Turbo compatible entity.
 * @param {TurboCompatible} element - The Turbo compatible entity to get the handler object from
 * @return The HTML element or its shadow root (if defined)
 */
function getChildHandler(element: TurboCompatible): ChildHandler {
    if ("element" in element && !(element instanceof Element)) element = (element as TurboWrapper).element;
    if (element.shadowRoot) return element.shadowRoot;
    return element;
}

export {getChildHandler};