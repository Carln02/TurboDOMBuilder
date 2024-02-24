import {TurboElement, TurboElementProperties} from "./turbo-element";
import {TurboConfig} from "./turbo-config";

//Basics

/**
 * @description Create an HTML element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
const element = (properties: TurboElementProperties): TurboElement => new TurboElement(properties);

/**
 * @description Create an image element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
const image = (properties: TurboElementProperties): TurboElement => {
    //Check for missing required field
    if (!properties.src) console.error("No src for image provided in the properties of the element");

    //Update properties as needed and create element
    properties.tag = "img";
    return element(properties);
};

/**
 * @description Create an input element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
const input = (properties: TurboElementProperties): TurboElement => {
    //Check for missing required field
    if (!properties.type) console.error("Input type not provided in the properties of the element");

    //Update properties as needed and create element
    properties.tag = "input";
    return element(properties);
};

//Buttons

/**
 * @description Create a text button element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
const textButton = (properties: TurboElementProperties): TurboElement => {
    //Check for missing required field
    if (!properties.text) console.error("Text content not provided in the properties of the element");

    //Update properties as needed and create element
    properties.tag = "input";
    properties.type = "button";
    return element(properties);
};

/**
 * @description Create an icon element with the specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
const icon = (properties: TurboElementProperties): TurboElement => {
    //Update properties as needed and create element
    properties.src = TurboConfig.pathToIcons + properties.icon + TurboConfig.iconsType;
    if (!properties.alt) properties.alt = properties.icon;
    return image(properties);
};

/**
 * @description Create a button with an icon element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
const iconButton = (properties: TurboElementProperties): TurboElement => {
    //Update properties as needed and create element
    properties.tag = "button";
    properties.children = [icon({icon: properties.icon, alt: properties.alt})];
    return element(properties);
};

//Misc useful functions

/**
 * @description Create a spacer element.
 * @param {TurboElement | HTMLElement} parent - The parent element to append the spacer to
 * @returns {TurboElement} The created spacer element
 */
const spacer = (parent: TurboElement | HTMLElement | undefined): TurboElement => {
    return element({style: "flex-grow: 1", parent: parent});
};

/**
 * @description Create a flex row element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
const flexRow = (properties: TurboElementProperties): TurboElement => {
    properties.flex = "row";
    return element(properties);
}

/**
 * @description Create a flex column element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
const flexCol = (properties: TurboElementProperties): TurboElement => {
    properties.flex = "column";
    return element(properties);
}

export {element, image, input, textButton, icon, iconButton, spacer, flexRow, flexCol};