import {TurboProperties} from "../turboElement/turboElement.types";
import {isMathMLTag, isSvgTag, MathMLNamespace, SvgNamespace} from "./namespaceIdentification";
import {ValidElement, ValidTag} from "../core.types";
import {$} from "../turboFunctions/turboFunctions";

/**
 * @description Create an element with the specified properties (and the specified namespace if applicable).
 * @param {TurboProperties<Tag>} [properties] - Object containing properties of the element.
 * @returns {ValidElement<Tag>} The created element.
 * @template Tag
 */
function element<Tag extends ValidTag>(properties: TurboProperties<Tag> = {} as TurboProperties<Tag>): ValidElement<Tag> {
    let element: Element;

    if (properties.namespace) {
        if (properties.namespace == "svg") element = document.createElementNS(SvgNamespace, properties.tag || "svg");
        else if (properties.namespace == "mathML") element = document.createElementNS(MathMLNamespace, properties.tag || "math");
        else element = document.createElementNS(properties.namespace, properties.tag || "div");
    } else {
        element = document.createElement(properties.tag || "div");
    }

    if (properties.shadowDOM) element.attachShadow({mode: "open"});
    $(element).setProperties(properties);
    return element as ValidElement<Tag>;
}

/**
 * @description Create an element with the specified properties. Supports SVG and MathML.
 * @param {TurboProperties<Tag>} [properties] - Object containing properties of the element.
 * @returns {ValidElement<Tag>} The created element.
 * @template Tag
 */
function blindElement<Tag extends ValidTag>(properties: TurboProperties<Tag> = {} as TurboProperties<Tag>): ValidElement<Tag> {
    let element: Element;

    if (isSvgTag(properties.tag)) element = document.createElementNS(SvgNamespace, properties.tag || "svg");
    else if (isMathMLTag(properties.tag)) element = document.createElementNS(MathMLNamespace, properties.tag || "math");
    else element = document.createElement(properties.tag || "div");

    if (properties.shadowDOM) element.attachShadow({mode: "open"});
    $(element).setProperties(properties);
    return element as ValidElement<Tag>;
}

export {element, blindElement};