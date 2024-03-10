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
export { addClass, removeClass, toggleClass, addChild, removeChild };
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
export { TurboConfig };
/**
 * @class TurboElement
 * @description A Turbo element. Basically an HTML element with added utility functions.
 */
class TurboElement {
    /**
     * @description Create a new Turbo element with the given properties.
     * @param {TurboElementProperties} properties - Object containing the properties of the element to instantiate
     */
    constructor(properties = {}) {
        /**
         * @description Retrieve the first Element in the current element's tree that matches the provided query. Check the
         * [official documentation]{@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector}
         * for more information.
         * @param {string} selectors - A string containing one or more selectors to match. It must be a valid CSS selector string.
         * @returns The first element in the tree that matches the specified set of CSS selectors, or null if none matches
         * the provided selectors.
         */
        this.query = (selectors) => this.element.querySelector(selectors);
        /**
         * @description Retrieve a NodeList of Elements in the current element's tree that match the provided query. Check the
         * [official documentation]{@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll}
         * for more information.
         * @param {string} selectors - A string containing one or more selectors to match. It must be a valid CSS selector string.
         * @returns A NodeList of all elements in the tree that match the specified set of CSS selectors, or an empty NodeList if
         * none matches the provided selectors.
         */
        this.queryAll = (selectors) => this.element.querySelectorAll(selectors);
        /**
         * @description Function that sets the focus on the underlying HTML element.
         * @param {any} options - (Optional) Object containing custom options to specify (if any)
         * @returns This Turbo element instance for method chaining.
         */
        this.focus = (options) => {
            this.element.focus(options);
            return this.element;
        };
        /**
         * @description Function that blurs the underlying HTML element.
         * @returns This Turbo element instance for method chaining.
         */
        this.blur = () => {
            this.element.blur();
            return this.element;
        };
        //Set tag to input if type is set
        if (properties.type)
            properties.tag = "input";
        //Otherwise, if undefined, set tag to div
        else if (!properties.tag)
            properties.tag = "div";
        try {
            //Create element of given type
            this.element = document.createElement(properties.tag);
            //Set ID and custom CSS style (if any)
            if (properties.id)
                this.element.id = properties.id;
            if (properties.style)
                this.element.style.cssText = properties.style;
            //Set inner text (if specified)
            if (properties.text)
                this.innerText = properties.text;
            //Set link attributes (if defined)
            if (this.element instanceof HTMLLinkElement) {
                if (properties.href)
                    this.element.href = properties.href;
            }
            //Set image attributes (if defined)
            if (this.element instanceof HTMLImageElement) {
                if (properties.src)
                    this.element.src = properties.src;
                if (properties.alt)
                    this.element.alt = properties.alt;
            }
            //Set input attributes (if defined)
            if (this.element instanceof HTMLInputElement) {
                if (properties.type)
                    this.element.type = properties.type;
                if (properties.value)
                    this.element.value = properties.value;
                if (properties.placeholder)
                    this.element.placeholder = properties.placeholder;
            }
            //Add custom attributes
            if (properties.customAttributes) {
                Object.entries(properties.customAttributes).forEach(([key, value]) => this.element.setAttribute(key, value));
            }
            //Set flex value (if any), as well as the gap
            if (properties.flex) {
                this.element.style.display = "flex";
                this.element.style.flexDirection = properties.flex;
                this.element.style.gap = properties.gap ? properties.gap : (properties.flex.includes("row") ?
                    TurboConfig.horizontalFlexGap : TurboConfig.verticalFlexGap);
            }
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
     * @returns This Turbo element instance for method chaining.
     */
    addChild(children) {
        addChild(this.element, children);
        return this;
    }
    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    removeChild(children) {
        removeChild(this.element, children);
        return this;
    }
    /**
     * @description Add an event listener to the element. Check the
     * [official documentation]{@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
     * for more information.
     * @param {string} event - The JavaScript event to listen for. E.g.: click, mousedown, etc.
     * @param {(arg0: Event) => void} fn - The callback function to execute when the event occurs
     * @param {any} options - (Optional) Object containing custom options to specify (if any)
     * @returns This Turbo element instance for method chaining.
     */
    addListener(event, fn, options = false) {
        this.element.addEventListener(event, e => fn(e), options);
        return this;
    }
    /**
     * @description Remove this element from the DOM tree.
     * @returns This Turbo element instance for method chaining.
     */
    remove() {
        this.element.remove();
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
    /**
     * @description Get the parent of the underlying HTMLElement (or null if non-existent).
     */
    get parentElement() {
        return this.element.parentElement;
    }
    /**
     * @description Get the children of the underlying HTMLElement.
     */
    get children() {
        return this.element.children;
    }
}
export { TurboElement };
//Basics
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
export { element, image, input, textButton, icon, iconButton, spacer, flexRow, flexCol };
