import {TurboProperties} from "../turboElement/turboElement.types";

// src/global.d.ts

declare global {
    interface Element {
        /**
         * Sets the declared properties to the element.
         * @param {TurboProperties<T>} properties - The properties object.
         * @param {boolean} [setOnlyBaseProperties="false"] - If set to true, will only set the base turbo properties (classes,
         * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
         * @returns {this} Itself, allowing for method chaining.
         */
        setProperties(properties: TurboProperties, setOnlyBaseProperties?: boolean): this;

        /**
         * @description Add one or more CSS classes to the element.
         * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
         * @returns {this} Itself, allowing for method chaining.
         */
        addClass(classes?: string | string[]): this;

        /**
         * @description Remove one or more CSS classes from the element.
         * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeClass(classes?: string | string[]): this;

        /**
         * @description Toggle one or more CSS classes in the element.
         * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
         * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
         * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
         * @returns {this} Itself, allowing for method chaining.
         */
        toggleClass(classes?: string | string[], force?: boolean): this;

        /**
         * @description Add one or more child elements to the element.
         * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements.
         * @returns {this} Itself, allowing for method chaining.
         */
        addChild(children?: Element | Element[]): this;

        /**
         * @description Remove one or more child elements from the element.
         * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements.
         * @returns {this} Itself, allowing for method chaining.
         */
        remChild(children?: Element | Element[]): this;

        /**
         * @description Add one or more child elements to the element.
         * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements to
         * insert before sibling.
         * @param {Element} sibling - The sibling element
         * @returns {this} Itself, allowing for method chaining.
         */
        addChildBefore(children?: Element | Element[], sibling?: Element): this;

        /**
         * @description Remove all child elements of the element.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllChildren(): this;

        getClosest<T extends Element>(type: { new(...args: any[]): T }): T | null;

        /**
         * @description Adds an event listener to the element.
         * @param {string} type The type of the event.
         * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener The function
         * or object that receives a notification.
         * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
         * @returns {this} Itself, allowing for method chaining.
         */
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: Element) => void),
                    options?: boolean | AddEventListenerOptions): this;

        /**
         * @description Execute a callback while still benefiting from chaining.
         * @param {(el: ITurbo) => void} callback The function to execute, with 1 parameter representing the instance itself.
         * @returns {this} Itself, allowing for method chaining.
         */
        execute(callback: ((el: this) => void)): this;

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
    }

    interface HTMLElement extends Element {
        pendingStyles: Record<keyof CSSStyleDeclaration, string> | {};

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
        applyStyles(): void;

        //Method Chaining Declarations

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

        //Other

        show(b: boolean): this;
    }
}

export {};
