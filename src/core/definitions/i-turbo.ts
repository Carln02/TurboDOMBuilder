import {TurboProperties} from "./turbo-types";

/**
 * @interface ITurbo
 * @description Interface declaring all the base functions to be implemented by Turbo classes.
 */
interface ITurbo {
    /**
     * @description The root of the element (the document's head or the shadow root - if enabled).
     */
    readonly root: ShadowRoot | HTMLHeadElement;

    //Custom functions

    /**
     * Sets the declared properties to the element.
     * @param {TurboProperties} properties - The properties object.
     * @returns {this} Itself, allowing for method chaining.
     */
    setProperties(properties: TurboProperties): this;

    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    addClass(classes: string | string[] | undefined): this;

    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    removeClass(classes: string | string[] | undefined): this;

    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns {this} Itself, allowing for method chaining.
     */
    toggleClass(classes: string | string[] | undefined, force?: boolean): this;

    /**
     * @description Add one or more child elements to the element.
     * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    addChild(children: HTMLElement | HTMLElement[] | undefined): this;

    /**
     * @description Remove one or more child elements from the element.
     * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    remChild(children: HTMLElement | HTMLElement[] | undefined): this;

    /**
     * @description Add one or more child elements to the element.
     * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child Turbo or HTML elements to
     * insert before sibling.
     * @param {HTMLElement} sibling - The sibling element
     * @returns {this} Itself, allowing for method chaining.
     */
    addChildBefore(children: HTMLElement | HTMLElement[] | undefined, sibling: HTMLElement): this;

    /**
     * @description Remove all child elements of the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    removeAllChildren(): this;

    /**
     * @description Set a certain style attribute of the element to the provided value.
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns {this} Itself, allowing for method chaining.
     */
    setStyle(attribute: keyof CSSStyleDeclaration, value: string): this;

    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons. Use the
     * css literal function for autocompletion.
     * @returns {this} Itself, allowing for method chaining.
     */
    setStyles(cssText: string): this;

    //Method Chaining Declarations

    /**
     * @description Adds an event listener to the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener The function
     * or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: this) => void),
                     options?: boolean | AddEventListenerOptions): this;

    /**
     * @description Removes an event listener from the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that was previously added as a listener.
     * @param {boolean | EventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean |
        EventListenerOptions): this;

    /**
     * @description Execute a callback while still benefiting from chaining.
     * @param {(el: ITurbo) => void} callback The function to execute, with 1 parameter representing the instance itself.
     * @returns {this} Itself, allowing for method chaining.
     */
    execute(callback: ((el: this) => void)): this;

    /**
     * @description Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | boolean} [value] The value of the attribute. Can be left blank to represent a true boolean.
     * @returns {this} Itself, allowing for method chaining.
     */
    setAttribute(name: string, value?: string | boolean): this;

    /**
     * @description Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {this} Itself, allowing for method chaining.
     */
    removeAttribute(name: string): this;

    /**
     * @description Causes the element to lose focus.
     * @returns {this} Itself, allowing for method chaining.
     */
    blur(): this;

    /**
     * @description Sets focus on the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    focus(): this;

    /**
     * @description Removes the element from its parent node.
     * @returns {this} Itself, allowing for method chaining.
     */
    remove(): this;

    //Others

    show(b: boolean): this;
}

export {ITurbo};