import {TurboProperties} from "../core/definitions/turbo-types";
import {setProperties} from "../turbo-functions/element-manipulation/set-properties";

/**
 * @description Create an HTML element with the specified properties.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created HTML element.
 */
function element(properties: TurboProperties = {}): HTMLElement {
    let element = document.createElement(properties.tag || "div");
    setProperties(element, properties);
    return element;
}

export {element};