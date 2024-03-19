/**
 * @typedef {Object} TurboElementProperties
 * @description Object containing properties for configuring a TurboElement.
 *
 * @property {keyof HTMLElementTagNameMap} [tag="div"] - The HTML tag for the element (e.g., "div", "span", "input").
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of space-separated
 * classes or an array of class names).
 * @property {string} [id] - The ID attribute of the element.
 * @property {string} [style] - The inline CSS styles for the element.
 * @property {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} [children] - An array of child Turbo or HTML
 * elements to append to the created element.
 * @property {TurboElement | HTMLElement} [parent] - The parent element to which the created element will be appended.
 *
 * @property {string} [text] - The text content of the element (if any).
 * @property {string} [href] - The address/URL of the link element (if it is one).
 *
 * @property {string} [src] - The source URL of the element (if any).
 * @property {string} [alt] - The alternate text for the image element (if it is one).
 *
 * @property {string} [type] - The type attribute of input elements (if it is one). If this entry is set, the element will
 * be turned into an input, disregarding the value of "tag".
 * @property {string} [value] - The value attribute of input elements (if it is one).
 * @property {string} [placeholder] - The placeholder attribute of input elements (if it is one).
 *
 * @property {Record<string, string>} [customAttributes] - Object containing custom attributes to set to the HTML element
 * in the form {"attribute": "value", ...}.
 *
 * @property {string} [margin] - Set the CSS margin property
 * @property {string} [padding] - Set the CSS padding property
 *
 * @property {string} [flex] - Set it to a flex-direction value to set the element's display to flex with the given direction.
 * @property {string} [alignItems] - The align items CSS property
 * @property {string} [justifyContent] - The justify content CSS property
 * @property {string} [gap] - The CSS gap for flex displays.
 *
 * @property {string} [icon] - The name of the icon (or the full path if the latter was not configured - {@link function:setIconsPath}) for
 * icon-based elements (e.g., "search", "close").
 */

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
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 */
function toggleClass(element, classes, force) {
    if (!classes)
        return;
    //Extract HTML element
    let el = element instanceof TurboElement ? element.element : element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.forEach(entry => {
            if (force == undefined)
                el.classList.toggle(entry);
            else
                el.classList.toggle(entry);
        });
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
            children.forEach((child) => el.appendChild(child instanceof TurboElement ? child.element : child));
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
     * @returns The previously set path to icons (or an empty string if not set).
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
     * @returns The previously set icons type (or an empty string if not set).
     */
    static set iconsType(type) {
        if (type.length > 0)
            this._iconsType = "." + type;
    }
    static get iconsType() {
        return this._iconsType;
    }
    /**
     * @function flexGap
     * @description Define the default gap for all created flex elements (both horizontal and vertical)
     * @example
     * TurboConfig.flexGap = "10px";
     * flexCol({children: [...]}) // Will automatically set the gap between children to 10px, without explicitly specifying it.
     * @param gap - a string representing the gap value to set.
     * @returns The value of the gap between elements (or an empty string if not set). If the vertical and horizontal gaps are
     * set to different values, it will return by default the value of the horizontal gap.
     */
    static set flexGap(gap) {
        this._horizontalFlexGap = gap;
        this._verticalFlexGap = gap;
    }
    static get flexGap() {
        return this._horizontalFlexGap;
    }
    /**
     * @function horizontalFlexGap
     * @description Define the default horizontal gap for all created flex elements.
     * @example
     * TurboConfig.horizontalFlexGap = "10px";
     * flexRow({children: [...]}) // Will automatically set the gap between children to 10px, without explicitly specifying it.
     * @param gap - a string representing the gap value to set.
     * @returns The value of the gap between elements (or an empty string if not set).
     */
    static set horizontalFlexGap(gap) {
        this._horizontalFlexGap = gap;
    }
    static get horizontalFlexGap() {
        return this._horizontalFlexGap;
    }
    /**
     * @function verticalFlexGap
     * @description Define the default vertical gap for all created flex elements.
     * @example
     * TurboConfig.verticalFlexGap = "10px";
     * flexCol({children: [...]}) // Will automatically set the gap between children to 10px, without explicitly specifying it.
     * @param gap - a string representing the gap value to set.
     * @returns The value of the gap between elements (or an empty string if not set).
     */
    static set verticalFlexGap(gap) {
        this._verticalFlexGap = gap;
    }
    static get verticalFlexGap() {
        return this._verticalFlexGap;
    }
}
TurboConfig._pathToIcons = "";
TurboConfig._iconsType = "";
TurboConfig._horizontalFlexGap = "";
TurboConfig._verticalFlexGap = "";
/**
 * @class TurboElement
 * @description A Turbo element. Basically an HTML element with added utility functions.
 */
class TurboElement {
    /**
     * @description Create a new Turbo element with the given properties.
     * @param {T extends HTMLElement} element - The HTML element to create the TurboElement from
     */
    constructor(element) {
        this.element = element;
    }
    /**
     * @description Factory method to create a TurboElement from the given properties and with an HTML element
     * of the corresponding type.
     * @param {TurboElementProperties | HTMLElement} properties - Object containing the properties of the element to
     * instantiate OR HTML element to create a TurboElement from
     */
    static create(properties = {}) {
        if (properties instanceof HTMLElement) {
            const turboElement = new TurboElement(properties);
            return turboElement.generateProxy();
        }
        const tagName = properties.tag || "div";
        const element = document.createElement(tagName);
        const turboElement = new TurboElement(element);
        turboElement.setProperties(properties);
        return turboElement.generateProxy();
    }
    setProperties(properties) {
        //Set ID and custom CSS style (if any)
        if (properties.id)
            this.element.id = properties.id;
        if (properties.style)
            this.element.style.cssText = properties.style;
        //Set inner text (if specified)
        if (properties.text)
            this.element.innerText = properties.text;
        //Set href attribute (if defined)
        if (this.element instanceof HTMLAnchorElement || this.element instanceof HTMLAreaElement
            || this.element instanceof HTMLLinkElement) {
            if (properties.href)
                this.element.href = properties.href;
        }
        //Set src attribute (if defined)
        if (this.element instanceof HTMLImageElement || this.element instanceof HTMLSourceElement
            || this.element instanceof HTMLIFrameElement || this.element instanceof HTMLScriptElement
            || this.element instanceof HTMLEmbedElement || this.element instanceof HTMLTrackElement
            || this.element instanceof HTMLVideoElement || this.element instanceof HTMLAudioElement) {
            if (properties.src)
                this.element.src = properties.src;
        }
        //Set alt attribute for image elements (if defined)
        if (this.element instanceof HTMLImageElement) {
            if (properties.alt)
                this.element.alt = properties.alt;
        }
        if (this.element instanceof HTMLInputElement || this.element instanceof HTMLSourceElement
            || this.element instanceof HTMLButtonElement || this.element instanceof HTMLEmbedElement
            || this.element instanceof HTMLObjectElement || this.element instanceof HTMLScriptElement
            || this.element instanceof HTMLStyleElement) {
            if (properties.type)
                this.element.type = properties.type;
        }
        //Set placeholder attribute (if defined)
        if (this.element instanceof HTMLInputElement || this.element instanceof HTMLTextAreaElement) {
            if (properties.placeholder)
                this.element.placeholder = properties.placeholder;
        }
        //Set input name attribute (if defined)
        if (this.element instanceof HTMLInputElement || this.element instanceof HTMLTextAreaElement
            || this.element instanceof HTMLSelectElement) {
            if (properties.name)
                this.element.name = properties.name;
        }
        //Set input value attribute (if defined)
        if (this.element instanceof HTMLInputElement || this.element instanceof HTMLTextAreaElement
            || this.element instanceof HTMLSelectElement || this.element instanceof HTMLOptionElement
            || this.element instanceof HTMLButtonElement || this.element instanceof HTMLLIElement
            || this.element instanceof HTMLMeterElement || this.element instanceof HTMLProgressElement) {
            if (properties.value)
                this.element.value = properties.value;
        }
        //Add custom attributes
        if (properties.customAttributes) {
            Object.entries(properties.customAttributes).forEach(([key, value]) => this.element.setAttribute(key, value));
        }
        //Set margin and padding
        if (properties.margin)
            this.setStyle("margin", properties.margin);
        if (properties.padding)
            this.setStyle("padding", properties.padding);
        //Set flex value (if any), as well as the gap
        if (properties.flex) {
            this.element.style.display = "flex";
            this.element.style.flexDirection = properties.flex;
            this.element.style.gap = properties.gap ? properties.gap : (properties.flex.includes("row") ?
                TurboConfig.horizontalFlexGap : TurboConfig.verticalFlexGap);
        }
        //Set children alignment if specified
        if (properties.alignItems)
            this.setStyle("alignItems", properties.alignItems);
        if (properties.justifyContent)
            this.setStyle("justifyContent", properties.justifyContent);
        // Add classes and children
        this.addClass(properties.classes);
        this.addChild(properties.children);
        // Append to parent (if provided)
        if (properties.parent)
            addChild(properties.parent, this.element);
    }
    generateProxy() {
        return new Proxy(this, {
            get: (target, prop, receiver) => {
                //Check if the property exists directly on the TurboElement instance
                if (prop in target) {
                    const value = target[prop];
                    return typeof value === "function" ? value.bind(target) : value;
                }
                //If the property is not part of TurboElement, attempt to access it on the underlying HTMLElement
                const elementProp = target.element[prop];
                if (elementProp !== undefined) {
                    return typeof elementProp === "function" ? elementProp.bind(target.element) : elementProp;
                }
                //Default behavior
                return Reflect.get(target.element, prop, receiver);
            },
            set: (target, prop, value) => {
                //If trying to set a property that exists on the TurboElement, set it there
                if (prop in target) {
                    target[prop] = value;
                    return true;
                }
                //Otherwise, set the property on the underlying HTMLElement
                target.element[prop] = value;
                return true;
            }
        });
    }
    //Method Chaining Declarations
    /**
     * Adds an event listener to the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    addEventListener(type, listener, options) {
        this.element.addEventListener(type, listener, options);
        return this;
    }
    /**
     * Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string} value The value of the attribute.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    setAttribute(name, value) {
        this.element.setAttribute(name, value);
        return this;
    }
    /**
     * Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    removeAttribute(name) {
        this.element.removeAttribute(name);
        return this;
    }
    /**
     * Removes an event listener from the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that was previously added as a listener.
     * @param {boolean | EventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    removeEventListener(type, listener, options) {
        this.element.removeEventListener(type, listener, options);
        return this;
    }
    /**
     * Causes the element to lose focus.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    blur() {
        this.element.blur();
        return this;
    }
    /**
     * Sets focus on the element.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    focus() {
        this.element.focus();
        return this;
    }
    /**
     * Removes the element from its parent node.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    remove() {
        this.element.remove();
        return this;
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
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns This Turbo element instance for method chaining.
     */
    toggleClass(classes, force) {
        toggleClass(this.element, classes, force);
        return this;
    }
    /**
     * @description Add one or more child elements to the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    addChild(children) {
        addChild(this.element, children);
        return this;
    }
    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    remChild(children) {
        removeChild(this.element, children);
        return this;
    }
    /**
     * @description Set a certain style attribute of the element to the provided value
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns This Turbo element instance for method chaining.
     */
    setStyle(attribute, value) {
        this.element.style[attribute] = value;
        return this;
    }
    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons.
     * @returns This Turbo element instance for method chaining.
     */
    setStyles(cssText) {
        this.element.style.cssText += cssText;
        return this;
    }
}
//Basics
/**
 * @description Create an HTML element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
const element = (properties) => {
    if (!properties)
        properties = {};
    properties.tag = properties.tag || "div";
    return TurboElement.create(properties);
};
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
//Buttons
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
//Misc useful functions
/**
 * @description Create a spacer element.
 * @param {TurboElement | HTMLElement} parent - The parent element to append the spacer to
 * @returns {TurboElement} The created spacer element
 */
const spacer = (parent) => {
    return element({ style: "flex-grow: 1", parent: parent });
};
/**
 * @description Create a flex row element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
const flexRow = (properties) => {
    properties.flex = "row";
    return element(properties);
};
/**
 * @description Create a flex column element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
const flexCol = (properties) => {
    properties.flex = "column";
    return element(properties);
};
