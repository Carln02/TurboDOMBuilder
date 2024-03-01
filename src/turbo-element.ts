import {addChild, addClass, removeChild, removeClass, toggleClass} from "./base-functions";
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
 * @property {TurboElement[] | HTMLElement[]} [children] - An array of child Turbo or HTML elements to append to the created element.
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
    children?: TurboElement[] | HTMLElement[];
    parent?: TurboElement | HTMLElement;

    text?: string;
    href?: string;

    src?: string;
    alt?: string;

    type?: string;
    value?: string;
    placeholder?: string;

    customAttributes?: Record<string, string>;

    flex?: string;
    gap?: string;

    icon?: string;
};

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
    constructor(properties: TurboElementProperties = {}) {
        //Set tag to input if type is set
        if (properties.type) properties.tag = "input";
        //Otherwise, if undefined, set tag to div
        else if (!properties.tag) properties.tag = "div";

        try {
            //Create element of given type
            this.element = document.createElement(properties.tag);

            //Set ID and custom CSS style (if any)
            if (properties.id) this.element.id = properties.id;
            if (properties.style) this.element.style.cssText = properties.style;

            //Set inner text (if specified)
            if (properties.text) this.innerText = properties.text;

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
        } catch (e) {
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
    public addClass(classes: string | string[] | undefined): TurboElement {
        addClass(this.element, classes);
        return this;
    }

    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    public removeClass(classes: string | string[] | undefined): TurboElement {
        removeClass(this.element, classes);
        return this;
    }

    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    public toggleClass(classes: string | string[] | undefined): TurboElement {
        toggleClass(this.element, classes);
        return this;
    }

    /**
     * @description Add one or more child elements to the element.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    public addChild(children: TurboElement[] | HTMLElement[] | undefined): TurboElement {
        addChild(this.element, children);
        return this;
    }

    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    public removeChild(children: TurboElement[] | HTMLElement[] | undefined): TurboElement {
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
    public addListener(event: string, fn: (arg0: Event) => void, options: any = false) {
        this.element.addEventListener(event, e => fn(e), options);
        return this;
    }

    /**
     * @description Retrieve the first Element in the current element's tree that matches the provided query. Check the
     * [official documentation]{@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector}
     * for more information.
     * @param {string} selectors - A string containing one or more selectors to match. It must be a valid CSS selector string.
     * @returns The first element in the tree that matches the specified set of CSS selectors, or null if none matches
     * the provided selectors.
     */
    public query = (selectors: string): Element | null => this.element.querySelector(selectors);

    /**
     * @description Retrieve a NodeList of Elements in the current element's tree that match the provided query. Check the
     * [official documentation]{@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll}
     * for more information.
     * @param {string} selectors - A string containing one or more selectors to match. It must be a valid CSS selector string.
     * @returns A NodeList of all elements in the tree that match the specified set of CSS selectors, or an empty NodeList if
     * none matches the provided selectors.
     */
    public queryAll = (selectors: string): NodeListOf<Element> => this.element.querySelectorAll(selectors);

    /**
     * @description Function that sets the focus on the underlying HTML element.
     * @param {any} options - (Optional) Object containing custom options to specify (if any)
     * @returns This Turbo element instance for method chaining.
     */
    public focus = (options? : any) => {
        this.element.focus(options);
        return this.element;
    }

    /**
     * @description Function that blurs the underlying HTML element.
     * @returns This Turbo element instance for method chaining.
     */
    public blur = () => {
        this.element.blur();
        return this.element;
    }

    /**
     * @description Set a certain style attribute of the element to the provided value
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns This Turbo element instance for method chaining.
     */
    public setStyle(attribute: keyof CSSStyleDeclaration, value: string): TurboElement {
        (this.element.style as any)[attribute] = value;
        return this;
    }

    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons.
     * @returns This Turbo element instance for method chaining.
     */
    public setStyles(cssText: string): TurboElement {
        this.element.style.cssText += cssText;
        return this;
    }

    //Getters and setters

    /**
     * @description Get the underlying HTMLElement's style property.
     */
    public get style(): CSSStyleDeclaration {
        return this.element.style;
    }

    /**
     * @description Get the underlying HTMLElement's classList property.
     */
    public get classList(): DOMTokenList {
        return this.element.classList;
    }

    /**
     * @description Get the underlying HTMLElement's innerText property.
     */
    public get innerText(): string {
        return this.element.innerText;
    }

    /**
     * @description Set the underlying HTMLElement's innerText property.
     */
    public set innerText(text: string) {
        this.element.innerText = text;
    }

    /**
     * @description Get the underlying HTMLElement's innerHTML property.
     */
    public get innerHTML(): string {
        return this.element.innerHTML;
    }

    /**
     * @description Set the underlying HTMLElement's innerHTML property.
     */
    public set innerHTML(text: string) {
        this.element.innerHTML = text;
    }

    /**
     * @description Get the parent of the underlying HTMLElement (or null if non-existent).
     */
    public get parentElement(): HTMLElement | null {
        return this.element.parentElement;
    }

    /**
     * @description Get the children of the underlying HTMLElement.
     */
    public get children(): HTMLCollection {
        return this.element.children;
    }
}

export {TurboElementProperties, TurboElement};