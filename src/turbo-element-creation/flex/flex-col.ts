import {element} from "../element";
import {ElementTagMap, TurboProperties} from "../../core/definitions/turbo-types";

/**
 * @description Create a flex column element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
function flexCol<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T] {
    let el = element(properties);
    el.style.display = "flex";
    el.style.flexDirection = "column";
    return el;
}

export {flexCol};