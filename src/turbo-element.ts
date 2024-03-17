import {addChild, removeChild, addClass, removeClass, toggleClass} from "./base-functions";
import {TurboConfig} from "./turbo-config";

/**
 * @typedef {Object} TurboElementProperties
 * @description Object containing properties for configuring a TurboElement.
 *
 * @property {string} [tag="div"] - The HTML tag for the element (e.g., "div", "span", "input").
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
 * @property {string} [flex] - Set it to a flex-direction value to set the element's display to flex with the given direction.
 * @property {string} [gap] - The gap between children elements (if it is a flex element)
 *
 * @property {string} [icon] - The name of the icon (or the full path if the latter was not configured - {@link function:setIconsPath}) for
 * icon-based elements (e.g., "search", "close").
 */

/**
 * @type {TurboElementProperties}
 */
type TurboElementProperties = {
    tag?: string;
    id?: string;
    classes?: string | string[];
    style?: string;
    children?: TurboElement | HTMLElement | TurboElement[] | HTMLElement[];
    parent?: TurboElement | HTMLElement;

    text?: string;
    href?: string;

    src?: string;
    alt?: string;

    type?: string;
    name?: string;
    value?: string;
    placeholder?: string;

    customAttributes?: Record<string, string>;

    flex?: string;
    gap?: string;

    icon?: string;
};

//Allow all methods of HTMLElement to be called from TurboElement
interface TurboElement extends HTMLElement {
    [key: string]: any;
}

/**
 * @class TurboElement
 * @description A Turbo element. Basically an HTML element with added utility functions.
 */
class TurboElement {
    public element: HTMLElement;

    /**
     * @description Create a new Turbo element with the given properties.
     * @param {TurboElementProperties} properties - Object containing the properties of the element to instantiate
     */
    constructor(properties: TurboElementProperties | HTMLElement = {}) {
        //If HTMLElement provided as parameter --> create TurboElement from the latter and return Proxy
        if (properties instanceof HTMLElement) {
            this.element = properties;
            return this.generateProxy();
        }

        //Set tag to input if type is set
        if (properties.type) properties.tag = "input";
        //Otherwise, if undefined, set tag to div
        else if (!properties.tag) properties.tag = "div";

        try {
            //Create element of given type, set its properties, and return proxy
            this.element = document.createElement(properties.tag);
            this.setProperties(properties);
            return this.generateProxy();

        } catch (e) {
            //Create element of given type
            this.element = document.createElement("div");
            console.error(e);
        }
    }

    private setProperties(properties: TurboElementProperties) {
        //Set ID and custom CSS style (if any)
        if (properties.id) this.element.id = properties.id;
        if (properties.style) this.element.style.cssText = properties.style;

        //Set inner text (if specified)
        if (properties.text) this.element.innerText = properties.text;

        //Set link attributes (if defined)
        if (this.element instanceof HTMLLinkElement) {
            if (properties.href) this.element.href = properties.href;
        }

        //Set image attributes (if defined)
        if (this.element instanceof HTMLImageElement) {
            if (properties.src) this.element.src = properties.src;
            if (properties.alt) this.element.alt = properties.alt;
        }

        //Set input attributes (if defined)
        if (this.element instanceof HTMLInputElement) {
            if (properties.type) this.element.type = properties.type;
            if (properties.name) this.element.name = properties.name;
            if (properties.value) this.element.value = properties.value;
            if (properties.placeholder) this.element.placeholder = properties.placeholder;
        }

        //Add custom attributes
        if (properties.customAttributes) {
            Object.entries(properties.customAttributes).forEach(([key, value]) =>
                this.element.setAttribute(key, value));
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
        if (properties.parent) addChild(properties.parent, this.element);
    }

    private generateProxy() {
        return new Proxy(this, {
            get: (target, prop, receiver) => {
                //Ignore if prop not string (for now)
                if (typeof prop !== "string") return receiver;

                const turboMethod = (target as TurboElement)[prop];
                const elementMethod = (target.element as any)[prop];

                //If property exists on TurboElement --> return it directly
                if (turboMethod) return (typeof turboMethod === "function") ? turboMethod.bind(target) : turboMethod;

                //Otherwise, if function
                if (elementMethod && (typeof elementMethod === "function")) return elementMethod.bind(target.element);

                //Other cases --> delegate to the HTMLElement
                return Reflect.get(target.element, prop);
            },
            set: (target, prop, value, receiver) => {
                //If found in TurboElement --> set in itself
                if (prop in target) return Reflect.set(target, prop, value, receiver);
                //Otherwise --> delegate to the HTMLElement
                return Reflect.set(target.element, prop, value);
            }
        }) as unknown as TurboElement;
    }

    //Method Chaining Declarations

    /**
     * Adds an event listener to the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this {
        this.element.addEventListener(type, listener, options);
        return this;
    }

    /**
     * Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string} value The value of the attribute.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    setAttribute(name: string, value: string): this {
        this.element.setAttribute(name, value);
        return this;
    }

    /**
     * Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    removeAttribute(name: string): this {
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
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): this {
        this.element.removeEventListener(type, listener, options);
        return this;
    }

    /**
     * Causes the element to lose focus.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    blur(): this {
        this.element.blur();
        return this;
    }

    /**
     * Sets focus on the element.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    focus(): this {
        this.element.focus();
        return this;
    }

    /**
     * Removes the element from its parent node.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    remove(): this {
        this.element.remove();
        return this;
    }

    //Custom functions

    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    public addClass(classes: string | string[] | undefined): this {
        addClass(this.element, classes);
        return this;
    }

    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    public removeClass(classes: string | string[] | undefined): this {
        removeClass(this.element, classes);
        return this;
    }

    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    public toggleClass(classes: string | string[] | undefined): this {
        toggleClass(this.element, classes);
        return this;
    }

    /**
     * @description Add one or more child elements to the element.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    public addChild(children: TurboElement | HTMLElement | TurboElement[] | HTMLElement[] | undefined): this {
        addChild(this.element, children);
        return this;
    }

    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    public remChild(children: TurboElement | HTMLElement | TurboElement[] | HTMLElement[] | undefined): this {
        removeChild(this.element, children);
        return this;
    }

    /**
     * @description Set a certain style attribute of the element to the provided value
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns This Turbo element instance for method chaining.
     */
    public setStyle(attribute: keyof CSSStyleDeclaration, value: string): this {
        (this.element.style as any)[attribute] = value;
        return this;
    }

    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons.
     * @returns This Turbo element instance for method chaining.
     */
    public setStyles(cssText: string): this {
        this.element.style.cssText += cssText;
        return this;
    }
}

export {TurboElementProperties, TurboElement};