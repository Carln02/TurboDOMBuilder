import {TurboProperties} from "./turboElement.types";
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
import {kebabToCamelCase} from "../../utils/dataManipulation/stringManipulation/kebabToCamelCase";

/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 */
class TurboElement extends HTMLElement {
    private pendingStyles: Record<keyof CSSStyleDeclaration, string> | {} = {};

    constructor(properties: TurboProperties = {}) {
        super();
        if (properties.shadowDOM) this.attachShadow({mode: "open"});
        this.setProperties(properties, true);
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        if (newValue == null || newValue == oldValue) return;
        this[kebabToCamelCase(name)] = newValue;
    }

    //Config

    /**
     * @description Static configuration object.
     */
    static readonly config: any = {shadowDOM: false};

    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    public static configure(value: typeof this.config) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) (this.config as any)[key] = val;
        });
    }

    //Custom functions

    /**
     * Sets the declared properties to the element.
     * @param {TurboProperties<T>} properties - The properties object.
     * @param {boolean} [setOnlyBaseProperties="false"] - If set to true, will only set the base turbo properties (classes,
     * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
     * @returns {this} Itself, allowing for method chaining.
     */
    public setProperties(properties: TurboProperties, setOnlyBaseProperties: boolean = false): this {
        setProperties(this, properties, setOnlyBaseProperties);
        return this;
    }

    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    public addClass(classes?: string | string[]): this {
        addClass(this, classes);
        return this;
    }

    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    public removeClass(classes?: string | string[]): this {
        removeClass(this, classes);
        return this;
    }

    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns {this} Itself, allowing for method chaining.
     */
    public toggleClass(classes?: string | string[], force?: boolean): this {
        toggleClass(this, classes, force);
        return this;
    }

    /**
     * @description Add one or more child elements to the element.
     * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    public addChild(children?: Element | Element[]): this {
        addChild(this, children);
        return this;
    }

    /**
     * @description Remove one or more child elements from the element.
     * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    public remChild(children?: Element | Element[]): this {
        removeChild(this, children);
        return this;
    }

    /**
     * @description Add one or more child elements to the element.
     * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements to
     * insert before sibling.
     * @param {Element} sibling - The sibling element
     * @returns {this} Itself, allowing for method chaining.
     */
    public addChildBefore(children?: Element | Element[], sibling?: Element): this {
        addChildBefore(this, children, sibling);
        return this;
    }

    /**
     * @description Remove all child elements of the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    public removeAllChildren(): this {
        removeAllChildren(this);
        return this;
    }

    public getClosest<T extends Element>(type: { new(...args: any[]): T }): T | null {
        return closest(this, type);
    }

    /**
     * @description Adds an event listener to the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener The function
     * or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    public addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: this) => void),
                       options?: boolean | AddEventListenerOptions): this {
        addListener(this, type, listener, options);
        return this;
    }

    /**
     * @description Set a certain style attribute of the element to the provided value.
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns {this} Itself, allowing for method chaining.
     */
    public setStyle(attribute: keyof CSSStyleDeclaration, value: string): this {
        this.pendingStyles[attribute] = value;
        this.applyStyles();
        return this;
    }

    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons. Use the
     * css literal function for autocompletion.
     * @returns {this} Itself, allowing for method chaining.
     */
    public setStyles(cssText: string): this {
        this.pendingStyles["cssText"] = cssText;
        this.applyStyles();
        return this;
    }

    private applyStyles() {
        requestAnimationFrame(() => {
            for (const property in this.pendingStyles) {
                if (property == "cssText") this.style.cssText += ";" + this.pendingStyles["cssText"];
                else (this.style as any)[property] = this.pendingStyles[property];
            }
            this.pendingStyles = {};
        });
    }

    //Method Chaining Declarations

    /**
     * @description Execute a callback while still benefiting from chaining.
     * @param {(el: ITurbo) => void} callback The function to execute, with 1 parameter representing the instance itself.
     * @returns {this} Itself, allowing for method chaining.
     */
    public execute(callback: ((el: this) => void)): this {
        callback(this);
        return this;
    }

    /**
     * @description Removes an event listener from the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that was previously added as a listener.
     * @param {boolean | EventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    public removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean |
        EventListenerOptions): this {
        this.removeEventListener(type, listener, options);
        return this;
    }

    /**
     * @description Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | boolean} [value] The value of the attribute. Can be left blank to represent a true boolean.
     * @returns {this} Itself, allowing for method chaining.
     */
    public setAttribute(name: string, value?: string | boolean): this {
        super.setAttribute(name, value?.toString() || "true");
        return this;
    }

    /**
     * @description Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {this} Itself, allowing for method chaining.
     */
    public removeAttribute(name: string): this {
        super.removeAttribute(name);
        return this;
    }

    /**
     * @description Causes the element to lose focus.
     * @returns {this} Itself, allowing for method chaining.
     */
    public blur(): this {
        super.blur();
        return this;
    }

    /**
     * @description Sets focus on the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    public focus(): this {
        super.focus();
        return this;
    }

    /**
     * @description Removes the element from its parent node.
     * @returns {this} Itself, allowing for method chaining.
     */
    public remove(): this {
        super.remove();
        return this;
    }

    //Other

    public show(b: boolean): this {
        this.setStyle("display", b ? "" : "none");
        return this;
    }
}

export {TurboElement};