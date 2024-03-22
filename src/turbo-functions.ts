import {TurboElement, TurboElementProperties} from "./turbo-element";

//Basics

/**
 * @description Create an HTML element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
function element(properties?: TurboElementProperties): TurboElement {
    const effectiveProperties: TurboElementProperties & { tag: keyof HTMLElementTagNameMap } = {
        tag: properties.tag || "div",
        ...properties
    };
    return TurboElement.create(effectiveProperties);
}

/**
 * @description Create an image element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
function image(properties: TurboElementProperties): TurboElement<HTMLImageElement> {
    if (!properties.src) console.error("No src for image provided in the properties of the element");
    properties.tag = "img";
    return new TurboElement<HTMLImageElement>(properties);
}

/**
 * @description Create an input element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
function input(properties: TurboElementProperties): TurboElement<HTMLInputElement> {
    if (!properties.type) console.error("Input type not provided in the properties of the element");
    properties.tag = "input";
    return new TurboElement<HTMLInputElement>(properties);
}

//Misc useful functions

/**
 * @description Create a spacer element.
 * @param {TurboElement | HTMLElement} parent - The parent element to append the spacer to
 * @returns {TurboElement} The created spacer element
 */
function spacer(parent?: TurboElement | HTMLElement): TurboElement {
    return element({style: "flex-grow: 1", parent: parent});
}

/**
 * @description Create a flex row element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
function flexRow(properties: TurboElementProperties): TurboElement {
    properties.flex = "row";
    return element(properties);
}

/**
 * @description Create a flex column element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
function flexCol(properties: TurboElementProperties): TurboElement {
    properties.flex = "column";
    return element(properties);
}

export {element, image, input, spacer, flexRow, flexCol};