import {element} from "../element";
import {ElementTagMap, TurboProperties} from "../../turboElement/turboElement.types";

/**
 * @description Create a flex row element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
function flexRow<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T] {
    let el = element(properties);
    el.style.display = "flex";
    el.style.flexDirection = "row";
    return el;
}

export {flexRow};