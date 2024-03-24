import {TurboElement, TurboElementProperties} from "./turbo-element";

//Basics

/**
 * @description Create an HTML element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
function element<T extends HTMLElement>(properties?: TurboElementProperties): TurboElement<T> {
    if (!properties) properties = {};
    return TurboElement.create(properties);
}

/**
 * @description Create an image element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
function image(properties: TurboElementProperties): TurboElement<HTMLImageElement> {
    if (!properties.src) console.error("No src for image provided in the properties of the element");
    properties.tag = "img";
    return TurboElement.create<HTMLImageElement>(properties);
}

/**
 * @description Create an input element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
function input(properties: TurboElementProperties): TurboElement<HTMLInputElement> {
    if (!properties.type) console.error("Input type not provided in the properties of the element");
    properties.tag = "input";
    return TurboElement.create<HTMLInputElement>(properties);
}

//Misc useful functions

/**
 * @description Create a spacer element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created spacer element
 */
function spacer<T extends HTMLElement>(properties?: TurboElementProperties): TurboElement<T> {
    if (!properties) properties = {};
    properties.flexGrow = "1";
    return TurboElement.create(properties);
}

/**
 * @description Create a flex row element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
function flexRow<T extends HTMLElement>(properties?: TurboElementProperties): TurboElement<T> {
    if (!properties) properties = {};
    properties.display = "flex";
    properties.flexDirection = "row";
    return element(properties);
}

/**
 * @description Create a flex column element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
function flexCol<T extends HTMLElement>(properties?: TurboElementProperties): TurboElement<T> {
    if (!properties) properties = {};
    properties.display = "flex";
    properties.flexDirection = "column";
    return element(properties);
}

export {element, image, input, spacer, flexRow, flexCol};