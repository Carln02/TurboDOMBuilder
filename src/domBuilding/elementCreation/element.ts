import {ElementTagMap, TurboProperties} from "../turboElement/turboElement.types";
import {setProperties} from "../elementManipulation/element/setProperties";
import {SvgNamespace} from "./tagDefinitions/svgTagsDefinitions";
import {MathMLNamespace} from "./tagDefinitions/mathMLTagsDefinitions";

/**
 * @description Create an element with the specified properties (and the specified namespace if applicable).
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created element.
 */
function element<T extends keyof ElementTagMap>(properties: TurboProperties<T> = {} as TurboProperties<T>): ElementTagMap[T] {
    let element: ElementTagMap[T];

    if (properties.namespace) {
        if (properties.namespace == "svg")
            element = document.createElementNS(SvgNamespace, properties.tag) as ElementTagMap[T];
        else if (properties.namespace == "mathML")
            element = document.createElementNS(MathMLNamespace, properties.tag) as ElementTagMap[T];
        else
            element = document.createElementNS(properties.namespace, properties.tag) as ElementTagMap[T];
    } else {
        element = document.createElement(properties.tag || "div") as ElementTagMap[T];
    }

    if (properties.shadowDOM) element.attachShadow({mode: "open"});
    setProperties(element, properties);
    return element;
}

export {element};