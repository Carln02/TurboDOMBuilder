import {addChild, addClass, removeChild, removeClass, toggleClass} from "./base-functions";

/**
 * @description Object containing properties for configuring a TurboElement.
 *
 * @property {string} [tag="div"] - The HTML tag for the element (e.g., "div", "span", "input").
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of space-separated classes or an array of class names).
 * @property {string} [id] - The ID attribute of the element.
 * @property {string} [style] - The inline CSS styles for the element.
 * @property {TurboElement[] | HTMLElement[]} [children] - An array of child Turbo or HTML elements to append to the created element.
 * @property {TurboElement | HTMLElement} [parent] - The parent element to which the created element will be appended.
 *
 * @property {string} [text] - The text content of the element (if any).
 * @property {string} [src] - The source URL of the element (if any).
 * @property {string} [alt] - The alternate text for the image element (if it is one).
 * @property {string} [type] - The type attribute of input elements (if it is one).
 * @property {string} [value] - The value attribute of input elements (if it is one).
 * @property {string} [icon] - The name of the icon (or the full path if the latter was not configured - {@link function:setIconsPath}) for
 * icon-based elements (e.g., "search", "close").
 */
type TurboElementProperties = {
    tag?: string;
    id?: string;
    classes?: string | string[];
    style?: string;
    children?: TurboElement[] | HTMLElement[];
    parent?: TurboElement | HTMLElement;
    text?: string;
    src?: string;
    alt?: string;
    type?: string;
    value?: string;
    icon?: string;
};

/**
 * @description A Turbo element. Basically an HTML element with added utility functions.
 */
class TurboElement {
    public element: HTMLElement;

    /**
     * @description Create a new Turbo element with the given properties.
     * @param {TurboElementProperties} properties - Object containing the properties of the element to instantiate
     */
    constructor(properties: TurboElementProperties = {}) {
        if (!properties.type) properties.type = "div";

        try {
            //Create element of given type
            this.element = document.createElement(properties.type);

            //Set ID and custom CSS style (if any)
            if (properties.id) this.element.id = properties.id;
            if (properties.style) this.element.style.cssText = properties.style;

            if (properties.text) this.innerText = properties.text;

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
     */
    public addChild(children: TurboElement[] | HTMLElement[] | undefined): TurboElement {
        addChild(this.element, children);
        return this;
    }

    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     */
    public removeChild(children: TurboElement[] | HTMLElement[] | undefined): TurboElement {
        removeChild(this.element, children);
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
}

export {TurboElementProperties, TurboElement};