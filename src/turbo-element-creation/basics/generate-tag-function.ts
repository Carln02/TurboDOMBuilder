import {ElementTagMap, TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description returns a function that generates an HTML element with the provided tag that takes TurboProperties
 * as input.
 * @param {keyof ElementTagMap} tag - The tag to generate the function from.
 * @return The function
 */
function generateTagFunction<T extends keyof ElementTagMap>(tag: T) {
    return (properties: TurboProperties<T> = {} as TurboProperties<T>): ElementTagMap[T] => {
        properties.tag = tag;
        return element(properties) as ElementTagMap[T];
    };
}

export {generateTagFunction};