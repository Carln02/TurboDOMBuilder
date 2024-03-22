import {addChild, removeChild, addBefore, addClass, removeClass, toggleClass} from "./base-functions";

/**
 * @type {TurboElementProperties}
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
 */
type TurboElementProperties = {
    tag?: keyof HTMLElementTagNameMap;
    id?: string;
    classes?: string | string[];
    style?: string;
    children?: TurboElement | HTMLElement | (TurboElement | HTMLElement)[];
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

    margin?: string;
    padding?: string;

    flex?: string;
    alignItems?: string;
    justifyContent?: string;
    gap?: string;

    icon?: string;
};

interface TurboElement extends HTMLElement {
    [key: string]: any;
}

/**
 * @class TurboElement
 * @description A Turbo element. Basically an HTML element with added utility functions.
 */
class TurboElement<T extends HTMLElement = HTMLElement> {
    public element: T;

    /**
     * @description Create a new Turbo element with the given properties.
     * @param {T extends HTMLElement | TurboElementProperties} properties - Object containing properties for
     * configuring a TurboElement, or the HTML element to create the TurboElement from.
     */
    constructor(properties: T | TurboElementProperties = {}) {
        if (properties instanceof HTMLElement) this.element = properties as T;
        else {
            this.element = document.createElement(properties.tag || "div") as T;
            this.setProperties(properties);
        }
        return this.generateProxy();
    }

    /**
     * @description Factory method to create a TurboElement of the appropriate type based on the provided tag.
     * @param {TurboElementProperties} properties - Object containing properties for configuring a TurboElement.
     */
    static create<K extends keyof HTMLElementTagNameMap>(properties: TurboElementProperties):
        TurboElement<HTMLElementTagNameMap[K]> {
        return new TurboElement<HTMLElementTagNameMap[K]>(properties);
    }

    protected setProperties(properties: TurboElementProperties) {
        //Set ID and custom CSS style (if any)
        if (properties.id) this.element.id = properties.id;
        if (properties.style) this.element.style.cssText = properties.style;

        //Set inner text (if specified)
        if (properties.text) this.element.innerText = properties.text;

        //Set href attribute (if defined)
        if (this.element instanceof HTMLAnchorElement || this.element instanceof HTMLAreaElement
            || this.element instanceof HTMLLinkElement) {
            if (properties.href) this.element.href = properties.href;
        }

        //Set src attribute (if defined)
        if (this.element instanceof HTMLImageElement || this.element instanceof HTMLSourceElement
            || this.element instanceof HTMLIFrameElement || this.element instanceof HTMLScriptElement
            || this.element instanceof HTMLEmbedElement || this.element instanceof HTMLTrackElement
            || this.element instanceof HTMLVideoElement || this.element instanceof HTMLAudioElement) {
            if (properties.src) this.element.src = properties.src;
        }

        //Set alt attribute for image elements (if defined)
        if (this.element instanceof HTMLImageElement) {
            if (properties.alt) this.element.alt = properties.alt;
        }

        if (this.element instanceof HTMLInputElement || this.element instanceof HTMLSourceElement
            || this.element instanceof HTMLButtonElement  || this.element instanceof HTMLEmbedElement
            || this.element instanceof HTMLObjectElement  || this.element instanceof HTMLScriptElement
            || this.element instanceof HTMLStyleElement) {
            if (properties.type) this.element.type = properties.type;
        }

        //Set placeholder attribute (if defined)
        if (this.element instanceof HTMLInputElement || this.element instanceof HTMLTextAreaElement) {
            if (properties.placeholder) this.element.placeholder = properties.placeholder;
        }

        //Set input name attribute (if defined)
        if (this.element instanceof HTMLInputElement || this.element instanceof HTMLTextAreaElement
            || this.element instanceof HTMLSelectElement) {
            if (properties.name) this.element.name = properties.name;
        }

        //Set input value attribute (if defined)
        if (this.element instanceof HTMLInputElement || this.element instanceof HTMLTextAreaElement
            || this.element instanceof HTMLSelectElement || this.element instanceof HTMLOptionElement
            || this.element instanceof HTMLButtonElement || this.element instanceof HTMLLIElement
            || this.element instanceof HTMLMeterElement || this.element instanceof HTMLProgressElement) {
            if (properties.value) this.element.value = properties.value;

        }

        //Add custom attributes
        if (properties.customAttributes) {
            Object.entries(properties.customAttributes).forEach(([key, value]) =>
                this.element.setAttribute(key, value));
        }

        //Set margin and padding
        if (properties.margin) this.setStyle("margin", properties.margin);
        if (properties.padding) this.setStyle("padding", properties.padding);

        //Set flex value (if any), as well as the gap
        if (properties.flex) {
            this.element.style.display = "flex";
            this.element.style.flexDirection = properties.flex;
            if (properties.gap) this.element.style.gap = properties.gap;
        }

        //Set children alignment if specified
        if (properties.alignItems) this.setStyle("alignItems", properties.alignItems);
        if (properties.justifyContent) this.setStyle("justifyContent", properties.justifyContent);

        // Add classes and children
        this.addClass(properties.classes);
        this.addChild(properties.children);

        // Append to parent (if provided)
        if (properties.parent) addChild(properties.parent, this.element);
    }

    private generateProxy(): TurboElement<T> {
        return new Proxy(this, {
            get: (target: TurboElement<T>, prop, receiver) => {
                //Check if the property exists directly on the TurboElement instance
                if (prop in target) {
                    const value = (target as any)[prop];
                    return typeof value === "function" ? value.bind(target) : value;
                }

                //If the property is not part of TurboElement, attempt to access it on the underlying HTMLElement
                const elementProp = (target.element as any)[prop];
                if (elementProp !== undefined) {
                    return typeof elementProp === "function" ? elementProp.bind(target.element) : elementProp;
                }

                //Default behavior
                return Reflect.get(target.element, prop, receiver);
            },
            set: (target, prop, value) => {
                //If trying to set a property that exists on the TurboElement, set it there
                if (prop in target) {
                    (target as any)[prop] = value;
                    return true;
                }

                //Otherwise, set the property on the underlying HTMLElement
                (target.element as any)[prop] = value;
                return true;
            }
        }) as unknown as TurboElement<T>;
    }

    //Method Chaining Declarations

    /**
     * Adds an event listener to the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean |
        AddEventListenerOptions): TurboElement<T> {
        this.element.addEventListener(type, listener, options);
        return this.generateProxy();
    }

    /**
     * Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string} value The value of the attribute.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    setAttribute(name: string, value: string): TurboElement<T> {
        this.element.setAttribute(name, value);
        return this.generateProxy();
    }

    /**
     * Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    removeAttribute(name: string): TurboElement<T> {
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
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean |
        EventListenerOptions): TurboElement<T> {
        this.element.removeEventListener(type, listener, options);
        return this.generateProxy();
    }

    /**
     * Causes the element to lose focus.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    blur(): TurboElement<T> {
        this.element.blur();
        return this.generateProxy();
    }

    /**
     * Sets focus on the element.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    focus(): TurboElement<T> {
        this.element.focus();
        return this.generateProxy();
    }

    /**
     * Removes the element from its parent node.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    remove(): TurboElement<T> {
        this.element.remove();
        return this.generateProxy();
    }

    //Custom functions

    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    public addClass(classes: string | string[] | undefined): TurboElement<T> {
        addClass(this.element, classes);
        return this.generateProxy();
    }

    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    public removeClass(classes: string | string[] | undefined): TurboElement<T> {
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
    public toggleClass(classes: string | string[] | undefined, force?: boolean): TurboElement<T> {
        toggleClass(this.element, classes, force);
        return this.generateProxy();
    }

    /**
     * @description Add one or more child elements to the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    public addChild(children: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | undefined): TurboElement<T> {
        addChild(this.element, children);
        return this.generateProxy();
    }

    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    public remChild(children: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | undefined): TurboElement<T> {
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
    public addBefore(children: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | undefined,
                     sibling: TurboElement | HTMLElement): TurboElement<T> {
        addBefore(this.element, children, sibling);
        return this.generateProxy();
    }

    /**
     * @description Set a certain style attribute of the element to the provided value
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns This Turbo element instance for method chaining.
     */
    public setStyle(attribute: keyof CSSStyleDeclaration, value: string): TurboElement<T> {
        (this.element.style as any)[attribute] = value;
        return this.generateProxy();
    }

    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons.
     * @returns This Turbo element instance for method chaining.
     */
    public setStyles(cssText: string): TurboElement<T> {
        this.element.style.cssText += cssText;
        return this.generateProxy();
    }
}

export {TurboElementProperties, TurboElement};