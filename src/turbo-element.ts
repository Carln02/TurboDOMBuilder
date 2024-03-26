import {addChild, removeChild, addBefore, addClass, removeClass, toggleClass} from "./base-functions";

/**
 * @type {HTMLElementAlmostSuperset}
 * @description Represents a type that is an almost superset of properties from various HTML element types. It
 * encapsulates partial properties from various HTMLElement types.
 */
type HTMLElementAlmostSuperset = Omit<
    Partial<Pick<HTMLElement, keyof HTMLElement>>
    & Partial<Pick<HTMLInputElement, keyof HTMLInputElement>>
    & Partial<Pick<HTMLSelectElement, keyof HTMLSelectElement>>
    & Partial<Pick<HTMLTextAreaElement, keyof HTMLTextAreaElement>>
    & Partial<Pick<HTMLButtonElement, keyof HTMLButtonElement>>
    & Partial<Pick<HTMLAnchorElement, keyof HTMLAnchorElement>>
    & Partial<Pick<HTMLImageElement, keyof HTMLImageElement>>
    & Partial<Pick<HTMLVideoElement, keyof HTMLVideoElement>>
    & Partial<Pick<HTMLTableElement, keyof HTMLTableElement>>
    & Partial<Pick<HTMLFormElement, keyof HTMLFormElement>>
    & Partial<Pick<HTMLLabelElement, keyof HTMLLabelElement>>
, "children" | "className">;

/**
 * @type {TurboElementProperties}
 * @description Object containing properties for configuring a TurboElement. Any CSS property or HTML attribute can
 * be passed as key, and will be processed by the TurboElement. A few of these properties were explicitly defined here
 * for autocompletion in JavaScript. Use TypeScript for optimal autocompletion. The type also has the following
 * described custom properties:
 *
 * @property {keyof HTMLElementTagNameMap | "svg"} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input").
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of space-separated
 * classes or an array of class names).
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} [children] - An array of child Turbo or HTML
 * elements to append to the created element.
 * @property {TurboElement | HTMLElement} [parent] - The parent element to which the created element will be appended.
 * @property {string} [text] - The text content of the element (if any).
 *
 * @property id
 * @property style
 * @property alt
 * @property src
 * @property href
 * @property target
 * @property action
 * @property method
 * @property type
 * @property value
 * @property placeholder
 * @property name
 * @property disabled
 * @property checked
 * @property selected
 *
 * @property width
 * @property height
 * @property margin
 * @property padding
 * @property border
 * @property backgroundColor
 * @property color
 * @property fontSize
 * @property fontWeight
 * @property textAlign
 * @property textDecoration
 * @property display
 * @property position
 * @property top
 * @property right
 * @property bottom
 * @property left
 * @property flexDirection
 * @property justifyContent
 * @property alignItems
 * @property gap
 * @property opacity
 * @property visibility
 * @property transition
 */
type TurboElementProperties = Partial<CSSStyleDeclaration> & HTMLElementAlmostSuperset & {
    tag?: keyof HTMLElementTagNameMap | "svg";
    classes?: string | string[];
    children?: TurboElement | HTMLElement | (TurboElement | HTMLElement)[];
    parent?: TurboElement | HTMLElement;
    text?: string;
    [key: string]: any;
};

interface TurboElement<T extends HTMLElement = HTMLElement> extends HTMLElementAlmostSuperset {
    [key: string]: any;
}

/**
 * @class TurboElement
 * @description A Turbo element. Basically an HTML element with added utility functions.
 */
class TurboElement<T extends HTMLElement = HTMLElement> {
    /**
     * @description The underlying HTML element.
     */
    public element: T;

    /**
     * @description Create a new Turbo element with the given properties.
     * @param {T extends HTMLElement | TurboElementProperties} properties - Object containing properties for
     * configuring a TurboElement, or the HTML element to create the TurboElement from.
     */
    constructor(properties: T | TurboElementProperties = undefined) {
        if (properties instanceof HTMLElement) {
            this.element = properties;
        } else {
            if (!properties) properties = {};
            this.element = document.createElement(properties.tag || "div") as T;
            this.setProperties(properties);
        }
        return this.generateProxy();
    }

    /**
     * @description Factory method to create a TurboElement of the appropriate type based on the provided tag.
     * @param {TurboElementProperties} properties - Object containing properties for configuring a TurboElement.
     */
    static create<K extends HTMLElement>(properties: TurboElementProperties): TurboElement<K> {
        return new TurboElement<K>(properties);
    }

    protected setProperties(properties: TurboElementProperties) {
        Object.keys(properties).forEach(property => {
            if (property in CSSStyleDeclaration.prototype && typeof properties[property] === 'string') {
                this.element.style[property] = properties[property];
            } else if (property in HTMLElement.prototype || property in HTMLInputElement.prototype) {
                this.element[property] = properties[property];
            } else {
                if (property == "text") this.element.innerText = properties.text;
                else if (property == "classes") this.addClass(properties.classes);
                else if (property == "children") this.addChild(properties.children);
                else if (property == "parent") addChild(properties.parent, this.element);
                else this.setAttribute(property, properties[property]);
            }
        });
    }

    protected generateProxy(): TurboElement<T> {
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
     * @param {EventListenerOrEventListenerObject | (e: Event, el: TurboElement<T>) => void} listener The function
     * or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    addEventListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: TurboElement<T>) => void),
                     options?: boolean | AddEventListenerOptions): TurboElement<T> {
        const wrappedListener = (e: Event) => {
            if (typeof listener === "function") listener(e, this.generateProxy());
            else if (typeof listener === "object" && listener.handleEvent) listener.handleEvent(e);
        };

        this.element.addEventListener(type, wrappedListener as EventListenerOrEventListenerObject, options);
        return this.generateProxy();
    }

    /**
     * Execute a callback while still benefiting from chaining.
     * @param {(el: TurboElement) => void} callback The function to execute.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    execute(callback: ((el: TurboElement<T>) => void)): TurboElement<T> {
        callback(this.generateProxy());
        return this.generateProxy();
    }

    /**
     * Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | boolean} [value] The value of the attribute. Can be left blank to represent a true boolean.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    setAttribute(name: string, value?: string | boolean): TurboElement<T> {
        if (value == undefined) value = true;
        this.element.setAttribute(name, value.toString());
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