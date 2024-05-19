import {element} from "../element";
import {ElementTagMap, TurboProperties} from "../../turboElement/turboElement.types";

/**
 * @description Create a spacer element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created spacer element
 */
function spacer<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T] {
    let el = element(properties);
    el.style.flexGrow = "1";
    return el;
}

export {spacer};