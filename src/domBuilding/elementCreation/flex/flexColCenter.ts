import {ElementTagMap, TurboProperties} from "../../turboElement/turboElement.types";
import {flexCol} from "./flexCol";

/**
 * @description Create a flex column element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
function flexColCenter<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T] {
    let el = flexCol(properties);
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
    return el;
}

export {flexColCenter};