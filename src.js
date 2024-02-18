/**
 * Add one or more classes to the provided HTML DOM Element's class list.
 * @param {HTMLElement} element - HTML DOM Element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
export const addClasses = (element, classes) => {
    if (!classes) return;

    try {
        // If string provided --> split by spaces
        if (typeof classes === "string") {
            let split = classes.split(" ");
            split.forEach(entry => element.classList.add(entry));
        }
        // If array provided --> process it
        else {
            classes.forEach(entry => element.classList.add(entry));
        }
    } catch (e) {
        console.error(e);
    }
};

/**
 * Add children elements to a parent element.
 * @param {HTMLElement} el - Parent HTML element
 * @param {HTMLElement[]} children - Array of child HTML elements
 */
export const addChildren = (el, children) => {
    if (!children) return;

    try {
        // Try to append every provided child
        children.forEach(child => el.appendChild(child));
    } catch (e) {
        console.error(e);
    }
};

/**
 * Object containing properties of an HTML element.
 * @typedef {Object} ElementProperties
 * @property {string} [type="div"] - The type of HTML element to create (e.g., "div", "span", "input").
 * @property {string | string[]} [classes] - The CSS classes to apply to the element (either a string of space-separated classes or an array of class names).
 * @property {string} [id] - The ID attribute of the element.
 * @property {string} [style] - The CSS style attribute of the element.
 * @property {HTMLElement[]} [children] - An array of child elements to append to the created element.
 * @property {HTMLElement} [parent] - The parent element to which the created element will be appended.
 *
 * @property {string} [text] - The text content of the element (applicable for text nodes or text-based elements like buttons).
 * @property {string} [src] - The source URL of the image element.
 * @property {string} [alt] - The alternate text for the image element (useful for accessibility).
 * @property {string} [value] - The value attribute of input elements.
 * @property {string} [icon] - The name of the icon for icon-based elements (e.g., "search", "close").
 */

/**
 * Create an HTML element with specified properties.
 * @param {ElementProperties} [properties] - Object containing properties of the element.
 * @returns {HTMLElement} The created HTML element.
 */
export const createElement = (properties = {type: "div", classes: undefined}) => {
    try {
        // Create element of given type
        let el = document.createElement(properties.type);

        // Set ID and custom CSS style (if any)
        if (properties.id && typeof properties.id === "string") el.id = properties.id;
        if (properties.style && typeof properties.style === "string") el.style.cssText = properties.style;

        // Add classes and children
        addClasses(el, properties.classes);
        addChildren(el, properties.children);

        // Append to parent (if provided)
        if (properties.parent) properties.parent.appendChild(el);

        return el;
    } catch (e) {
        console.error(e);
    }
};

/**
 * Object containing properties of an HTML Text element.
 * @typedef {Object} TextElementProperties
 * @property {string} [type="div"] - The type of HTML element to create (e.g., "h1", "span", "p").
 * @property {string} [text] - The text content of the element.
 * @property {string | string[]} [classes] - The CSS classes to apply to the element (either a string of space-separated classes or an array of class names).
 * @property {string} [id] - The ID attribute of the element.
 * @property {string} [style] - The CSS style attribute of the element.
 * @property {HTMLElement[]} [children] - An array of child elements to append to the created element.
 * @property {HTMLElement} [parent] - The parent element to which the created element will be appended.
 */

/**
 * Create a text element with specified properties.
 * @param {TextElementProperties} [properties] - Object containing properties of the element.
 * @returns {HTMLElement} The created Text element
 */
export const createText = properties => {
    //Check for missing required field
    if (!properties.text || (typeof properties.text) !== "string")
        console.error("No string text provided in the properties of the element");

    //Create element and update it with custom properties
    let el = createElement(properties);
    el.innerText = properties.text;

    //Return it
    return el;
};

/**
 * Object containing properties for creating an image element.
 * @typedef {Object} ImageElementProperties
 * @property {string} src - The source URL of the image.
 * @property {string} [alt] - The alternate text for the image (useful for accessibility).
 * @property {string | string[]} [classes] - The CSS classes to apply to the element (either a string of space-separated classes or an array of class names).
 * @property {string} [id] - The ID attribute of the element.
 * @property {string} [style] - The CSS style attribute of the element.
 * @property {HTMLElement[]} [children] - An array of child elements to append to the created element.
 * @property {HTMLElement} [parent] - The parent element to which the created element will be appended.
 */

/**
 * Create an image element with specified properties.
 * @param {ImageElementProperties} properties - Object containing properties of the image element.
 * @returns {HTMLImageElement} The created image element
 */
export const createImage = properties => {
    //Check for missing required field
    if (!properties.src)
        console.error("No src for image provided in the properties of the element");

    //Update properties as needed and create element
    properties.type = "img";
    let el = createElement(properties);

    //Update element with custom properties
    el.src = properties.src;
    if (properties.alt && (typeof properties.alt == "string")) el.alt = properties.alt;

    //Return it
    return el;
};

/**
 * Object containing properties for creating an input element.
 * @typedef {Object} InputElementProperties
 * @property {string} type - The type of the input element (e.g., "text", "checkbox", "button").
 * @property {string} [value] - The value attribute of the input element.
 * @property {string | string[]} [classes] - The CSS classes to apply to the element (either a string of space-separated classes or an array of class names).
 * @property {string} [id] - The ID attribute of the element.
 * @property {string} [style] - The CSS style attribute of the element.
 * @property {HTMLElement[]} [children] - An array of child elements to append to the created element.
 * @property {HTMLElement} [parent] - The parent element to which the created element will be appended.
 */

/**
 * Create an input element with specified properties.
 * @param {InputElementProperties} properties - Object containing properties of the input element.
 * @returns {HTMLInputElement} The created input element
 */
export const createInput = properties => {
    //Check for missing required field
    if (!properties.type || (typeof properties.type) !== "string")
        console.error("Input type not provided in the properties of the element");

    //Update properties as needed and create element
    let type = properties.type;
    properties.type = "input";
    let el = createElement(properties);

    //Update element with custom properties
    el.type = type;
    if (properties.value) el.value = properties.value;

    //Return it
    return el;
};

/**
 * Object containing properties for creating a text button element.
 * @typedef {Object} TextButtonElementProperties
 * @property {string} text - The text content of the button element.
 * @property {string | string[]} [classes] - The CSS classes to apply to the element (either a string of space-separated classes or an array of class names).
 * @property {string} [id] - The ID attribute of the element.
 * @property {string} [style] - The CSS style attribute of the element.
 * @property {HTMLElement[]} [children] - An array of child elements to append to the created element.
 * @property {HTMLElement} [parent] - The parent element to which the created element will be appended.
 */

/**
 * Create a text button element with specified properties.
 * @param {TextButtonElementProperties} properties - Object containing properties of the button element.
 * @returns {HTMLInputElement} The created button element
 */
export const createTextButton = properties => {
    //Create element
    properties.type = "input";
    let el = createElement(properties);

    //Set its type
    el.type = "button";

    //Set its text value
    if (properties.text && (typeof properties.text) === "string") el.value = properties.text;

    //Return it
    return el;
};

/**
 * Object containing properties for creating an icon button element.
 * @typedef {Object} IconButtonElementProperties
 * @property {string} icon - The name of the icon for the button element (e.g., "search", "close").
 * @property {string | string[]} [classes] - The CSS classes to apply to the element (either a string of space-separated classes or an array of class names).
 * @property {string} [id] - The ID attribute of the element.
 * @property {string} [style] - The CSS style attribute of the element.
 * @property {HTMLElement[]} [children] - An array of child elements to append to the created element.
 * @property {HTMLElement} [parent] - The parent element to which the created element will be appended.
 */

/**
 * Create a button with an icon element with specified properties.
 * @param {IconButtonElementProperties} properties - Object containing properties of the button element.
 * @returns {HTMLButtonElement} The created button element
 */
export const createIconButton = properties => {
    //Create element
    properties.type = "button";
    let el = createElement(properties);

    //Create icon
    createImage({src: "assets/icons/" + properties.icon + ".svg", alt: properties.icon, parent: el});

    //Return it
    return el;
};

/**
 * Create a spacer element.
 * @param {HTMLElement} parent - The parent element to append the spacer to
 * @returns {HTMLDivElement} The created spacer element
 */
export const createSpacer = parent => {
    return createElement({type: "div", style: "flex-grow: 1", parent: parent});
};