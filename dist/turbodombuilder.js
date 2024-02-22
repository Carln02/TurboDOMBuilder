"use strict";
/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
function addClass(element, classes) {
    if (!classes)
        return;
    //Extract HTML element
    let el = element instanceof TurboElement ? element.element : element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.forEach(entry => el.classList.add(entry));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
/**
 * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
function removeClass(element, classes) {
    if (!classes)
        return;
    //Extract HTML element
    let el = element instanceof TurboElement ? element.element : element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.forEach(entry => el.classList.remove(entry));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
function toggleClass(element, classes) {
    if (!classes)
        return;
    //Extract HTML element
    let el = element instanceof TurboElement ? element.element : element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.forEach(entry => el.classList.toggle(entry));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
/**
 * @description Add children elements to a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
function addChild(element, children) {
    if (!children)
        return;
    //Extract HTML element
    let el = element instanceof TurboElement ? element.element : element;
    //Try to append every provided child (according to its type)
    try {
        if (children instanceof TurboElement)
            el.appendChild(children.element);
        else if (children instanceof HTMLElement)
            el.appendChild(children);
        else
            children.forEach(child => el.appendChild(child instanceof TurboElement ? child.element : child));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
/**
 * @description Remove children elements from a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
function removeChild(element, children) {
    if (!children)
        return;
    //Extract HTML element
    let el = element instanceof TurboElement ? element.element : element;
    //Try to remove every provided child (according to its type)
    try {
        if (children instanceof TurboElement)
            el.removeChild(children.element);
        else if (children instanceof HTMLElement)
            el.removeChild(children);
        else
            children.forEach(child => el.removeChild(child instanceof TurboElement ? child.element : child));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
/**
 * @class TurboConfig
 * @description A static configuration class to customize TurboDOMBuilder to your needs.
 */
class TurboConfig {
    /**
     * @function pathToIcons
     * @description Define the path to icons, to not type it again on every icon creation. Check also
     * [iconsType]{@link TurboConfig.iconsType}.
     * @example
     * TurboConfig.pathToIcons = "assets/icons/";
     * icon({icon: "icon.svg"}); // provide "icon.svg" as parameter instead of "assets/icons/icon.svg"}
     * @param path - a string representing the path to the icons' directory.
     */
    static set pathToIcons(path) {
        this._pathToIcons = path;
    }
    static get pathToIcons() {
        return this._pathToIcons;
    }
    /**
     * @function iconsType
     * @description Define the extension type of icons, to not type it again on every icon creation. Check also
     * [pathToIcons]{@link TurboConfig.pathToIcons}.
     * @example
     * TurboConfig.iconsType = "svg";
     * icon({icon: "assets/icons/icon"}); // provide "assets/icons/icon" as parameter instead of "assets/icons/icon.svg"}
     * @param type - a string representing the extension of the icons.
     */
    static set iconsType(type) {
        if (type.length > 0)
            this._iconsType = "." + type;
    }
    static get iconsType() {
        return this._iconsType;
    }
}
TurboConfig._pathToIcons = "";
TurboConfig._iconsType = "";
/**
 * @description A Turbo element. Basically an HTML element with added utility functions.
 */
class TurboElement {
    /**
     * @description Create a new Turbo element with the given properties.
     * @param {TurboElementProperties} properties - Object containing the properties of the element to instantiate
     */
    constructor(properties = {}) {
        if (!properties.type)
            properties.type = "div";
        try {
            //Create element of given type
            this.element = document.createElement(properties.type);
            //Set ID and custom CSS style (if any)
            if (properties.id)
                this.element.id = properties.id;
            if (properties.style)
                this.element.style.cssText = properties.style;
            if (properties.text)
                this.innerText = properties.text;
            // Add classes and children
            this.addClass(properties.classes);
            this.addChild(properties.children);
            // Append to parent (if provided)
            if (properties.parent)
                addChild(properties.parent, this.element);
        }
        catch (e) {
            //Create element of given type
            this.element = document.createElement("div");
            console.error(e);
        }
    }
    //Custom functions
    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    addClass(classes) {
        addClass(this.element, classes);
        return this;
    }
    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    removeClass(classes) {
        removeClass(this.element, classes);
        return this;
    }
    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    toggleClass(classes) {
        toggleClass(this.element, classes);
        return this;
    }
    /**
     * @description Add one or more child elements to the element.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     */
    addChild(children) {
        addChild(this.element, children);
        return this;
    }
    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     */
    removeChild(children) {
        removeChild(this.element, children);
        return this;
    }
    //Getters and setters
    /**
     * @description Get the underlying HTMLElement's style property.
     */
    get style() {
        return this.element.style;
    }
    /**
     * @description Get the underlying HTMLElement's classList property.
     */
    get classList() {
        return this.element.classList;
    }
    /**
     * @description Get the underlying HTMLElement's innerText property.
     */
    get innerText() {
        return this.element.innerText;
    }
    /**
     * @description Set the underlying HTMLElement's innerText property.
     */
    set innerText(text) {
        this.element.innerText = text;
    }
    /**
     * @description Get the underlying HTMLElement's innerHTML property.
     */
    get innerHTML() {
        return this.element.innerHTML;
    }
    /**
     * @description Set the underlying HTMLElement's innerHTML property.
     */
    set innerHTML(text) {
        this.element.innerHTML = text;
    }
}
/**
 * @description Create an HTML element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
const element = (properties) => new TurboElement(properties);
/**
 * @description Create an image element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
const image = (properties) => {
    //Check for missing required field
    if (!properties.src)
        console.error("No src for image provided in the properties of the element");
    //Update properties as needed and create element
    properties.tag = "img";
    return element(properties);
};
/**
 * @description Create an input element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
const input = (properties) => {
    //Check for missing required field
    if (!properties.type)
        console.error("Input type not provided in the properties of the element");
    //Update properties as needed and create element
    properties.tag = "input";
    return element(properties);
};
/**
 * @description Create a text button element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
const textButton = (properties) => {
    //Check for missing required field
    if (!properties.text)
        console.error("Text content not provided in the properties of the element");
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
const icon = (properties) => {
    //Update properties as needed and create element
    properties.src = TurboConfig.pathToIcons + properties.icon + TurboConfig.iconsType;
    if (!properties.alt)
        properties.alt = properties.icon;
    return image(properties);
};
/**
 * @description Create a button with an icon element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
const iconButton = (properties) => {
    //Update properties as needed and create element
    properties.tag = "button";
    properties.children = [icon({ icon: properties.icon, alt: properties.alt })];
    return element(properties);
};
/**
 * @description Create a spacer element.
 * @param {TurboElement | HTMLElement} parent - The parent element to append the spacer to
 * @returns {TurboElement} The created spacer element
 */
const spacer = (parent) => {
    return element({ style: "flex-grow: 1", parent: parent });
};
