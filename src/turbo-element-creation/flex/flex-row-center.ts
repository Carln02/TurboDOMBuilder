import {ElementTagMap, TurboProperties} from "../../core/definitions/turbo-types";
import {flexRow} from "./flex-row";

/**
 * @description Create a flex row element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
function flexRowCenter<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T] {
    let el = flexRow(properties);
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
    return el;
}

export {flexRowCenter};