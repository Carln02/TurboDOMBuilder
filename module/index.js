/**
 * @typedef {Object} TurboElementProperties
 * @description Object containing properties for configuring a TurboElement. Any CSS property or HTML attribute can
 * be passed as key, and will be processed by the TurboElement. The type also has the following custom properties:
 *
 * @property {keyof HTMLElementTagNameMap} [tag="div"] - The HTML tag for the element (e.g., "div", "span", "input").
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of space-separated
 * classes or an array of class names).
 * @property {string} [style] - The inline CSS styles for the element.
 * @property {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} [children] - An array of child Turbo or HTML
 * elements to append to the created element.
 * @property {TurboElement | HTMLElement} [parent] - The parent element to which the created element will be appended.
 * @property {string} [text] - The text content of the element (if any).
 */

/**
 * @typedef {Object} TurboButtonProperties
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboElementProperties
 *
 * @property {string | TurboElement | HTMLElement} [buttonText] - The text content of the button.
 * @property {string | Icon} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | Icon} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 * @property {"button" | "submit" | "reset"} [type] - The type of the button (Can be "button", "submit", or "reset").
 * @property {keyof HTMLElementTagNameMap} [customTextTag] - The HTML tag to be used for the text element. If not
 * specified, the default tag specified in the Button class will be used.
 */

/**
 * @typedef {Object} ButtonChildren
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {Icon | HTMLElement | null} leftIcon - The icon placed on the left side of the button.
 * @property {TurboElement | HTMLElement | null} text - The text element of the button.
 * @property {Icon | HTMLElement | null} rightIcon - The icon placed on the right side of the button.
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
 */

/**
 * @typedef {Object} TurboIconProperties
 * @description Properties object that extends TurboElementProperties with properties specific to icons.
 * @extends TurboElementProperties
 *
 * @property {string} icon - The name of the icon.
 * @property {string} [color] - The color of the icon.
 * @property {string} [customType] - Custom type of the icon, overrides the default type assigned to Icon.type
 * (whose default value is "svg").
 * @property {string} [customPath] - Custom path to the icon, overrides the default path assigned to Icon.path.
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
 * @description Add children elements to a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {TurboElement | HTMLElement} sibling - Sibling Turbo or HTML DOM element
 */
function addBefore(element, children, sibling) {
    if (!children)
        return;
    //Extract HTML element
    let el = element instanceof TurboElement ? element.element : element;
    //Extract HTML sibling element
    let siblingEl = sibling instanceof TurboElement ? sibling.element : sibling;
    //Try to append every provided child (according to its type)
    try {
        if (children instanceof TurboElement)
            el.insertBefore(children.element, siblingEl);
        else if (children instanceof HTMLElement)
            el.insertBefore(children, siblingEl);
        else
            children.forEach((child) => el.insertBefore(child instanceof TurboElement ? child.element : child, siblingEl));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
export { addClass, removeClass, toggleClass, addChild, removeChild, addBefore };
/**
 * @class TurboElement
 * @description A Turbo element. Basically an HTML element with added utility functions.
 */
class TurboElement {
    /**
     * @description Create a new Turbo element with the given properties.
     * @param {T extends HTMLElement | TurboElementProperties} properties - Object containing properties for
     * configuring a TurboElement, or the HTML element to create the TurboElement from.
     */
    constructor(properties = undefined) {
        if (properties instanceof HTMLElement) {
            this.element = properties;
        }
        else {
            if (!properties)
                properties = {};
            this.element = document.createElement(properties.tag || "div");
            this.setProperties(properties);
        }
        return this.generateProxy();
    }
    /**
     * @description Factory method to create a TurboElement of the appropriate type based on the provided tag.
     * @param {TurboElementProperties} properties - Object containing properties for configuring a TurboElement.
     */
    static create(properties) {
        return new TurboElement(properties);
    }
    setProperties(properties) {
        Object.keys(properties).forEach(property => {
            if (property in CSSStyleDeclaration.prototype && typeof properties[property] === 'string') {
                this.element.style[property] = properties[property];
            }
            else if (property in HTMLElement.prototype || property in HTMLInputElement.prototype) {
                this.element[property] = properties[property];
            }
            else {
                if (property == "text")
                    this.element.innerText = properties.text;
                else if (property == "classes")
                    this.addClass(properties.classes);
                else if (property == "children")
                    this.addChild(properties.children);
                else if (property == "parent")
                    addChild(properties.parent, this.element);
                else
                    this.setAttribute(property, properties[property]);
            }
        });
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
     * @param {EventListenerOrEventListenerObject | (e: Event, el: TurboElement<T>) => void} listener The function
     * or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {TurboElement<T>} The instance of TurboElement, allowing for method chaining.
     */
    addEventListener(type, listener, options) {
        const wrappedListener = (e) => {
            if (typeof listener === "function")
                listener(e, this.generateProxy());
            else if (typeof listener === "object" && listener.handleEvent)
                listener.handleEvent(e);
        };
        this.element.addEventListener(type, wrappedListener, options);
        return this.generateProxy();
    }
    /**
     * Execute a callback while still benefiting from chaining.
     * @param {(el: TurboElement<T>) => void} callback The function to execute.
     * @returns {TurboElement<T>} The instance of TurboElement, allowing for method chaining.
     */
    execute(callback) {
        callback(this.generateProxy());
        return this.generateProxy();
    }
    /**
     * Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | boolean} [value] The value of the attribute. Can be left blank to represent a true boolean.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    setAttribute(name, value) {
        if (value == undefined)
            value = true;
        this.element.setAttribute(name, value.toString());
        return this.generateProxy();
    }
    /**
     * Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    removeAttribute(name) {
        this.element.removeAttribute(name);
        return this.generateProxy();
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
        return this.generateProxy();
    }
    /**
     * Causes the element to lose focus.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    blur() {
        this.element.blur();
        return this.generateProxy();
    }
    /**
     * Sets focus on the element.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    focus() {
        this.element.focus();
        return this.generateProxy();
    }
    /**
     * Removes the element from its parent node.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    remove() {
        this.element.remove();
        return this.generateProxy();
    }
    //Custom functions
    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    addClass(classes) {
        addClass(this.element, classes);
        return this.generateProxy();
    }
    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    removeClass(classes) {
        removeClass(this.element, classes);
        return this.generateProxy();
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
        return this.generateProxy();
    }
    /**
     * @description Add one or more child elements to the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    addChild(children) {
        addChild(this.element, children);
        return this.generateProxy();
    }
    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    remChild(children) {
        removeChild(this.element, children);
        return this.generateProxy();
    }
    /**
     * @description Add one or more child elements to the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements to insert before sibling.
     * @param {TurboElement | HTMLElement} sibling - The sibling element
     * @returns This Turbo element instance for method chaining.
     */
    addBefore(children, sibling) {
        addBefore(this.element, children, sibling);
        return this.generateProxy();
    }
    /**
     * @description Set a certain style attribute of the element to the provided value
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns This Turbo element instance for method chaining.
     */
    setStyle(attribute, value) {
        this.element.style[attribute] = value;
        return this.generateProxy();
    }
    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons.
     * @returns This Turbo element instance for method chaining.
     */
    setStyles(cssText) {
        this.element.style.cssText += cssText;
        return this.generateProxy();
    }
}
export { TurboElement };
//Basics
/**
 * @description Create an HTML element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
function element(properties) {
    if (!properties)
        properties = {};
    return TurboElement.create(properties);
}
/**
 * @description Create an image element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
function image(properties) {
    if (!properties.src)
        console.error("No src for image provided in the properties of the element");
    properties.tag = "img";
    return TurboElement.create(properties);
}
/**
 * @description Create an input element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
function input(properties) {
    if (!properties.type)
        console.error("Input type not provided in the properties of the element");
    properties.tag = "input";
    return TurboElement.create(properties);
}
//Misc useful functions
/**
 * @description Create a spacer element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created spacer element
 */
function spacer(properties) {
    if (!properties)
        properties = {};
    properties.flexGrow = "1";
    return TurboElement.create(properties);
}
/**
 * @description Create a flex row element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
function flexRow(properties) {
    if (!properties)
        properties = {};
    properties.display = "flex";
    properties.flexDirection = "row";
    return element(properties);
}
/**
 * @description Create a flex column element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
function flexCol(properties) {
    if (!properties)
        properties = {};
    properties.display = "flex";
    properties.flexDirection = "column";
    return element(properties);
}
export { element, image, input, spacer, flexRow, flexCol };
/**
 * Button class for creating Turbo button elements.
 * @class Button
 * @extends TurboElement
 */
class Button extends TurboElement {
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties) {
        properties.tag = "button";
        super(properties);
        this.customTextTag = null;
        this._elements = null;
        this.elements = {
            leftCustomElements: null,
            leftIcon: null,
            buttonText: null,
            rightIcon: null,
            rightCustomElements: null,
        };
        if (properties.leftCustomElements)
            this.leftCustomElements = properties.leftCustomElements;
        if (properties.leftIcon)
            this.leftIcon = properties.leftIcon;
        if (properties.buttonText)
            this.buttonText = properties.buttonText;
        if (properties.rightIcon)
            this.rightIcon = properties.rightIcon;
        if (properties.rightCustomElements)
            this.rightCustomElements = properties.rightCustomElements;
        return this.generateProxy();
    }
    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    addAtPosition(element, type) {
        let nextSiblingIndex = 0;
        for (let key in this.elements) {
            if (key == type)
                break;
            if (this.elements[key])
                nextSiblingIndex++;
        }
        let nextSibling = this.element.children[nextSiblingIndex];
        if (element) {
            if (nextSibling)
                this.addBefore(element, nextSibling);
            else
                this.addChild(element);
        }
    }
    /**
     * @description Removes a given element or elements from the button.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} element - The element(s) to remove.
     */
    removeElement(element) {
        if (!element)
            return;
        if (element) {
            if (element instanceof HTMLElement)
                element.remove();
            else if (element instanceof TurboElement)
                element.remove();
            else
                element.forEach(el => {
                    if (el instanceof TurboElement)
                        el.element.remove();
                    else
                        el.remove();
                });
        }
    }
    // Getters and setters
    /**
     * @description Object containing the button's children.
     */
    get elements() {
        return this._elements;
    }
    set elements(value) {
        this._elements = value;
    }
    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    get leftCustomElements() {
        return this.elements.leftCustomElements;
    }
    set leftCustomElements(value) {
        this.addAtPosition(value, "leftCustomElements");
        this.removeElement(this.leftCustomElements);
        this.elements.leftCustomElements = value;
    }
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon() {
        return this.elements.leftIcon;
    }
    set leftIcon(value) {
        if (typeof value == "string")
            value = icon({ icon: value });
        this.addAtPosition(value, "leftIcon");
        this.removeElement(this.leftIcon);
        this.elements.leftIcon = value;
    }
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get buttonText() {
        return this.elements.buttonText;
    }
    set buttonText(value) {
        if (typeof value == "string") {
            if (value && this.buttonText) {
                this.buttonText.innerText = value;
                return;
            }
            value = element({ tag: this.customTextTag ?
                    this.customTextTag : Button.defaultTextTag, text: value });
        }
        this.addAtPosition(value, "buttonText");
        this.removeElement(this.buttonText);
        this.elements.buttonText = value;
    }
    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon() {
        return this.elements.rightIcon;
    }
    set rightIcon(value) {
        if (typeof value == "string")
            value = icon({ icon: value });
        this.addAtPosition(value, "rightIcon");
        this.removeElement(this.rightIcon);
        this.elements.rightIcon = value;
    }
    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    get rightCustomElements() {
        return this.elements.rightCustomElements;
    }
    set rightCustomElements(value) {
        this.addAtPosition(value, "rightCustomElements");
        this.removeElement(this.rightCustomElements);
        this.elements.rightCustomElements = value;
    }
    /**
     * @description The default tag for the text element in buttons.
     */
    static get defaultTextTag() {
        return this._defaultTextTag;
    }
    static set defaultTextTag(value) {
        this._defaultTextTag = value;
    }
    /**
     * @description The default classes to assign to newly created icons.
     */
    static get defaultClasses() {
        return this._defaultClasses;
    }
    static set defaultClasses(value) {
        this._defaultClasses = value;
    }
}
//Static fields
Button._defaultTextTag = "h4";
Button._defaultClasses = null;
/**
 * @description Creates a TurboElement Button.
 * @param {TurboButtonProperties} properties - Object containing properties of the button.
 * @returns {Button} The created Turbo button.
 */
function button(properties) {
    return new Button(properties);
}
export { Button, button };
/**
 * Icon class for creating icon elements.
 * @class Icon
 * @extends TurboElement
 */
class Icon extends TurboElement {
    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties) {
        let type = properties.customType ? properties.customType : Icon.type;
        let path = (properties.customPath ? properties.customPath : Icon.path) + properties.icon +
            (properties.icon.endsWith("." + type) || type.length == 0 ? "" : "." + type);
        if (type != "svg") {
            properties.tag = "img";
            properties.src = path;
            if (!properties.alt)
                properties.alt = properties.icon;
        }
        super(properties);
        this._color = null;
        this.addClass(Icon.defaultClasses);
        this._icon = properties.icon;
        this.color = properties.color;
        if (type == "svg") {
            fetch(path)
                .then(response => {
                if (!response.ok)
                    throw new Error("Network response was not ok while loading your SVG");
                return response.text();
            })
                .then(svgText => {
                this.element.innerHTML = svgText;
                this._svg = this.element.querySelector("svg");
                this._svg.style.fill = this.color;
            })
                .catch(error => console.error("Error fetching SVG:", error));
        }
    }
    /**
     * @description The name of the icon.
     */
    get icon() {
        return this._icon;
    }
    /**
     * @description The assigned color to the icon (if any)
     */
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        if (this.svg)
            this.svg.style.fill = this.color;
    }
    /**
     * @description The underlying SVG element (if any).
     */
    get svg() {
        return this._svg;
    }
    /**
     * @description The default type to assign to newly created Icons. Defaults to "svg".
     */
    static get type() {
        return this._type;
    }
    static set type(value) {
        this._type = value.toLowerCase();
    }
    /**
     * @description The default path to the directory containing the icons in the project. Specify the directory once
     * here to not type it again at every Icon generation.
     */
    static get path() {
        return this._path;
    }
    static set path(value) {
        this._path = value;
        if (value.length > 0 && !value.endsWith("/"))
            this._path += "/";
    }
    /**
     * @description The default classes to assign to newly created icons.
     */
    static get defaultClasses() {
        return this._defaultClasses;
    }
    static set defaultClasses(value) {
        this._defaultClasses = value;
    }
}
//Static fields
Icon._type = "svg";
Icon._path = "";
Icon._defaultClasses = null;
/**
 * Class for creating icon buttons.
 * @class IconButton
 * @extends Icon
 */
class IconButton extends Icon {
    /**
     * Creates an instance of IconButton.
     * @param {TurboIconProperties} properties - Properties to configure the button and its icon.
     */
    constructor(properties) {
        properties.tag = "button";
        super(properties);
        return this.generateProxy();
    }
}
/**
 * @description Creates a TurboElement Icon.
 * @param {TurboIconProperties} properties - Object containing properties of the icon.
 * @returns {Icon} The created Turbo icon.
 */
function icon(properties) {
    return new Icon(properties);
}
/**
 * @description Creates a TurboElement IconButton.
 * @param {TurboIconProperties} properties - Object containing properties of the icon and the button.
 * @returns {IconButton} The created Turbo icon button.
 */
function iconButton(properties) {
    return new IconButton(properties);
}
export { Icon, IconButton, icon, iconButton };
