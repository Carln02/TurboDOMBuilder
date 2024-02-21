import {TurboElement, TurboElementProperties} from "./turbo-element";

let _pathToIcons: string = "";
let _iconsType: string = "";

/**
 * @function setIconsPath
 * @description Define the path to icons and their type, to not type them again on every icon creation.
 * @example
 * setIconsPath("assets/icons/", "svg");
 * icon({icon: "icon"}); // provide "icon" as parameter instead of "assets/icons/icon.svg"}
 * @param pathToIcons - a string representing the path to the icons' directory. E.g.: "assets/icons/". Keep empty to
 * not assign any path.
 * @param iconsType - a string representing the type of the icons. E.g.: "svg". Keep empty to not assign any type.
 */
const setIconsPath = (pathToIcons: string | undefined, iconsType: string | undefined): void => {
    if (pathToIcons) _pathToIcons = pathToIcons;
    if (iconsType && iconsType.length > 0) _iconsType = "." + iconsType;
};

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
    properties.src = _pathToIcons + properties.icon + _iconsType;
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

/**
 * @description Create a spacer element.
 * @param {TurboElement | HTMLElement} parent - The parent element to append the spacer to
 * @returns {TurboElement} The created spacer element
 */
const spacer = (parent: TurboElement | HTMLElement | undefined): TurboElement => {
    return element({style: "flex-grow: 1", parent: parent});
};

export {setIconsPath, element, image, input, textButton, icon, iconButton, spacer};