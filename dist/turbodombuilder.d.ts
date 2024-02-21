/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
declare function addClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined): TurboElement | HTMLElement | undefined;
/**
 * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
declare function removeClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined): TurboElement | HTMLElement | undefined;
/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
declare function toggleClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined): TurboElement | HTMLElement | undefined;
/**
 * @description Add children elements to a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
declare function addChild(element: TurboElement | HTMLElement, children: TurboElement | HTMLElement | TurboElement[] | HTMLElement[] | undefined): TurboElement | HTMLElement | undefined;
/**
 * @description Remove children elements from a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
declare function removeChild(element: TurboElement | HTMLElement, children: TurboElement | HTMLElement | TurboElement[] | HTMLElement[] | undefined): TurboElement | HTMLElement | undefined;
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
declare class TurboElement {
    element: HTMLElement;
    /**
     * @description Create a new Turbo element with the given properties.
     * @param {TurboElementProperties} properties - Object containing the properties of the element to instantiate
     */
    constructor(properties?: TurboElementProperties);
    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    addClass(classes: string | string[] | undefined): TurboElement;
    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    removeClass(classes: string | string[] | undefined): TurboElement;
    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    toggleClass(classes: string | string[] | undefined): TurboElement;
    /**
     * @description Add one or more child elements to the element.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     */
    addChild(children: TurboElement[] | HTMLElement[] | undefined): TurboElement;
    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     */
    removeChild(children: TurboElement[] | HTMLElement[] | undefined): TurboElement;
    /**
     * @description Get the underlying HTMLElement's style property.
     */
    get style(): CSSStyleDeclaration;
    /**
     * @description Get the underlying HTMLElement's classList property.
     */
    get classList(): DOMTokenList;
    /**
     * @description Get the underlying HTMLElement's innerText property.
     */
    get innerText(): string;
    /**
     * @description Set the underlying HTMLElement's innerText property.
     */
    set innerText(text: string);
    /**
     * @description Get the underlying HTMLElement's innerHTML property.
     */
    get innerHTML(): string;
    /**
     * @description Set the underlying HTMLElement's innerHTML property.
     */
    set innerHTML(text: string);
}
declare let _pathToIcons: string;
declare let _iconsType: string;
/**
 * @function setIconsPath
 * @description Define the path to icons and their type, to not type them again on every icon creation.
 * @example
 * setIconsPath("assets/icons/", "svg");
 * icon({icon: "icon"}); // provide "icon" as parameter instead of "assets/icons/icon.svg"}
 * @param pathToIcons - a string representing the path to the icons' directory. E.g.: "assets/icons/". Keep empty to
 * not assign any path.
 * @param iconsType - a string representing the type of the icons. E.g.: "svg". Keep empty to not assign any type.
 */
declare const setIconsPath: (pathToIcons: string | undefined, iconsType: string | undefined) => void;
/**
 * @description Create an HTML element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
declare const element: (properties: TurboElementProperties) => TurboElement;
/**
 * @description Create an image element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
declare const image: (properties: TurboElementProperties) => TurboElement;
/**
 * @description Create an input element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
declare const input: (properties: TurboElementProperties) => TurboElement;
/**
 * @description Create a text button element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
declare const textButton: (properties: TurboElementProperties) => TurboElement;
/**
 * @description Create an icon element with the specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
declare const icon: (properties: TurboElementProperties) => TurboElement;
/**
 * @description Create a button with an icon element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
declare const iconButton: (properties: TurboElementProperties) => TurboElement;
/**
 * @description Create a spacer element.
 * @param {TurboElement | HTMLElement} parent - The parent element to append the spacer to
 * @returns {TurboElement} The created spacer element
 */
declare const spacer: (parent: TurboElement | HTMLElement | undefined) => TurboElement;
