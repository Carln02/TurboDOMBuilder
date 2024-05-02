import {ElementTagMap, TurboProperties} from "../core/definitions/turbo-types";
import {isSvgTag, SvgNamespace} from "../utils/element-tags-definitions/svg-tags-definitions";
import {isMathMLTag, MathMLNamespace} from "../utils/element-tags-definitions/math-ml-tags-definitions";
import {setProperties} from "../turbo-functions/element-manipulation/set-properties";

/**
 * @description Create an element with the specified properties. Supports SVG and MathML.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created element.
 */
function blindElement<T extends keyof ElementTagMap>(properties: TurboProperties<T> = {} as TurboProperties<T>): ElementTagMap[T] {
    let element: ElementTagMap[T];

    if (isSvgTag(properties.tag)) element = document.createElementNS(SvgNamespace, properties.tag) as ElementTagMap[T];
    else if (isMathMLTag(properties.tag)) element = document.createElementNS(MathMLNamespace, properties.tag) as ElementTagMap[T];
    else element = document.createElement(properties.tag || "div") as ElementTagMap[T];

    if (properties.shadowDOM) element.attachShadow({mode: "open"});
    setProperties(element, properties);
    return element;
}

export {blindElement};