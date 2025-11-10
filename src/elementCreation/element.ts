import {$} from "../turboFunctions/turboFunctions";
import {TurboProperties} from "../turboFunctions/element/element.types";
import {ValidElement, ValidTag} from "../types/element.types";
import {SvgNamespace, SvgTags} from "../types/svgElement.types";
import {MathMLNamespace, MathMLTags} from "../types/mathMlElement.types";

/**
 * @group Element Creation
 * @category Creation Functions
 *
 * @description returns a function that generates an HTML element with the provided tag that takes TurboProperties
 * as input.
 * @param {keyof ElementTagMap} tag - The tag to generate the function from.
 * @return The function
 */
function generateTagFunction<Tag extends ValidTag>(tag: Tag) {
    return (properties: TurboProperties<Tag> = {} as TurboProperties<Tag>): ValidElement<Tag> => {
        properties.tag = tag;
        return element({...properties, tag: tag}) as ValidElement<Tag>;
    };
}

/**
 * @group Element Creation
 * @category Creation Functions
 *
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
 * @group Element Creation
 * @category Creation Functions
 *
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

/**
 * @group Element Creation
 * @category Tag Functions
 *
 * @description Evaluates whether the provided string is an SVG tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the SVG namespace or not.
 */
function isSvgTag(tag?: string): boolean {
    return SvgTags.has(tag as any) || tag?.startsWith("svg");
}

/**
 * @group Element Creation
 * @category Tag Functions
 *
 * @description Evaluates whether the provided string is a MathML tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the MathML namespace or not.
 */
function isMathMLTag(tag?: string): boolean {
    return MathMLTags.has(tag as any) || tag?.startsWith("math");
}

export {element, blindElement, generateTagFunction};