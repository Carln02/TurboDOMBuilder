import {ElementTagMap, TurboProperties} from "../turboElement/turboElement.types";
import {removeChild} from "../elementManipulation/child/removeChild";
import {setProperties} from "../elementManipulation/element/setProperties";
import {addClass} from "../elementManipulation/class/addClass";
import {removeClass} from "../elementManipulation/class/removeClass";
import {toggleClass} from "../elementManipulation/class/toggleClass";
import {addChild} from "../elementManipulation/child/addChild";
import {addChildBefore} from "../elementManipulation/child/addChildBefore";
import {removeAllChildren} from "../elementManipulation/child/removeAllChildren";
import {addListener} from "../elementManipulation/listener/addListener";
import {closest} from "../elementManipulation/element/closest";
import "./htmlElement.types";


function turbofy() {
    const originalSetAttribute = HTMLElement.prototype.setAttribute;
    const originalRemoveAttribute = HTMLElement.prototype.removeAttribute;
    const originalBlur = HTMLElement.prototype.blur;
    const originalFocus = HTMLElement.prototype.focus;
    const originalRemove = Element.prototype.remove;

    /**
     * Sets the declared properties to the element.
     * @param {TurboProperties<T>} properties - The properties object.
     * @param {boolean} [setOnlyBaseProperties="false"] - If set to true, will only set the base turbo properties (classes,
     * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.setProperties = function _setProperties<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], properties: TurboProperties<T>, setOnlyBaseProperties: boolean = false): ElementTagMap[T] {
        setProperties(this, properties, setOnlyBaseProperties);
        return this;
    };

    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.addClass = function _addClass<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], classes?: string | string[]): ElementTagMap[T] {
        addClass(this, classes);
        return this;
    };

    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.removeClass = function _removeClass<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], classes?: string | string[]): ElementTagMap[T] {
        removeClass(this, classes);
        return this;
    };

    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.toggleClass = function _toggleClass<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], classes?: string | string[], force?: boolean): ElementTagMap[T] {
        toggleClass(this, classes, force);
        return this;
    };

    /**
     * @description Add one or more child elements to the element.
     * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.addChild = function _addChild<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], children?: Element | Element[]): ElementTagMap[T] {
        addChild(this, children);
        return this;
    };

    /**
     * @description Remove one or more child elements from the element.
     * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.remChild = function _remChild<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], children?: Element | Element[]): ElementTagMap[T] {
        removeChild(this, children);
        return this;
    };

    /**
     * @description Add one or more child elements to the element.
     * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements to
     * insert before sibling.
     * @param {Element} sibling - The sibling element
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.addChildBefore = function _addChildBefore<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], children?: Element | Element[], sibling?: Element): ElementTagMap[T] {
        addChildBefore(this, children, sibling);
        return this;
    };

    /**
     * @description Remove all child elements of the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.removeAllChildren = function _removeAllChildren<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T]): ElementTagMap[T] {
        removeAllChildren(this);
        return this;
    };

    Element.prototype.getClosest = function _getClosest<T extends Element>
    (this: Element, type: { new(...args: any[]): T }): T | null {
        return closest(this, type);
    };

    /**
     * @description Adds an event listener to the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener The function
     * or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.addListener = function _addListener<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], type: string, listener: EventListenerOrEventListenerObject |
        ((e: Event, el: ElementTagMap[T]) => void), options?: boolean | AddEventListenerOptions): ElementTagMap[T] {
        // @ts-ignore
        addListener(this, type, listener, options);
        return this;
    };

    /**
     * @description Set a certain style attribute of the element to the provided value.
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.setStyle = function _setStyle<T extends keyof HTMLElementTagNameMap = "div">
    (this: ElementTagMap[T], attribute: keyof CSSStyleDeclaration, value: string): ElementTagMap[T] {
        if (!this.pendingStyles) this.pendingStyles = {};
        this.pendingStyles[attribute] = value;
        this.applyStyles();
        return this;
    };

    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons. Use the
     * css literal function for autocompletion.
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.setStyles = function _setStyles<T extends keyof HTMLElementTagNameMap = "div">
    (this: ElementTagMap[T], cssText: string): ElementTagMap[T] {
        if (!this.pendingStyles) this.pendingStyles = {};
        this.pendingStyles["cssText"] = cssText;
        this.applyStyles();
        return this;
    };

    HTMLElement.prototype.applyStyles = function _applyStyles<T extends keyof HTMLElementTagNameMap = "div">
    (this: ElementTagMap[T]): void {
        requestAnimationFrame(() => {
            for (const property in this.pendingStyles) {
                if (property == "cssText") this.style.cssText += ";" + (this.pendingStyles as any)["cssText"];
                else (this.style as any)[property] = this.pendingStyles[property];
            }
            this.pendingStyles = {};
        });
    };

    /**
     * @description Execute a callback while still benefiting from chaining.
     * @param {(el: this) => void} callback The function to execute, with 1 parameter representing the instance itself.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.execute = function _execute<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], callback: ((el: ElementTagMap[T]) => void)): ElementTagMap[T] {
        callback(this);
        return this;
    };

    /**
     * @description Removes an event listener from the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that was previously added as a listener.
     * @param {boolean | EventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.removeListener = function _removeListener<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], type: string, listener: EventListenerOrEventListenerObject,
     options?: boolean | EventListenerOptions): ElementTagMap[T] {
        this.removeEventListener(type, listener, options);
        return this;
    };

    /**
     * @description Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | boolean} [value] The value of the attribute. Can be left blank to represent a true boolean.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.setAttribute = function _setAttribute<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], name: string, value?: string | boolean): ElementTagMap[T] {
        originalSetAttribute.call(this, name, value?.toString() || "true");
        return this;
    };

    /**
     * @description Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.removeAttribute = function _removeAttribute<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T], name: string): ElementTagMap[T] {
        originalRemoveAttribute.call(this, name);
        return this;
    };

    /**
     * @description Causes the element to lose focus.
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.blur = function _blur<T extends keyof HTMLElementTagNameMap = "div">
    (this: HTMLElementTagNameMap[T]): HTMLElementTagNameMap[T] {
        originalBlur.call(this);
        return this;
    };

    /**
     * @description Sets focus on the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.focus = function _focus<T extends keyof HTMLElementTagNameMap = "div">
    (this: HTMLElementTagNameMap[T]): HTMLElementTagNameMap[T] {
        originalFocus.call(this);
        return this;
    };

    Element.prototype.remove = function _remove<T extends keyof ElementTagMap = "div">
    (this: ElementTagMap[T]): ElementTagMap[T] {
        originalRemove.call(this);
        return this;
    };

    /**
     * @description Show or hide the element (based on CSS)
     * @param {boolean} b - Whether to show the element or not
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.show = function _show<T extends keyof HTMLElementTagNameMap = "div">
    (this: HTMLElementTagNameMap[T], b: boolean): HTMLElementTagNameMap[T] {
        (this as HTMLElement).setStyle("display", b ? "" : "none");
        return this;
    };
}

export {turbofy};