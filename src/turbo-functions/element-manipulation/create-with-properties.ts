import {TurboProperties} from "../../core/definitions/turbo-types";
import {setProperties} from "./set-properties";

/**
 * Creates an HTML element from the given properties object
 * @param {TurboProperties} [properties] - The properties object.
 * @return {HTMLElement} The created element.
 */
function createWithProperties(properties: TurboProperties = {}): HTMLElement {
    let element = document.createElement(properties.tag || "div");
    setProperties(element, properties);
    return element;
}

export {createWithProperties};