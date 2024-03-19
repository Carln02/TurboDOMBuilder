/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
declare function addClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined): HTMLElement;
/**
 * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
declare function removeClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined): HTMLElement;
/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 */
declare function toggleClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined, force?: boolean): HTMLElement;
/**
 * @description Add children elements to a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
declare function addChild(element: TurboElement | HTMLElement, children: TurboElement | HTMLElement | TurboElement[] | HTMLElement[] | undefined): HTMLElement;
/**
 * @description Remove children elements from a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
declare function removeChild(element: TurboElement | HTMLElement, children: TurboElement | HTMLElement | TurboElement[] | HTMLElement[] | undefined): HTMLElement;
/**
 * @class TurboConfig
 * @description A static configuration class to customize TurboDOMBuilder to your needs.
 */
declare abstract class TurboConfig {
    private static _pathToIcons;
    private static _iconsType;
    private static _horizontalFlexGap;
    private static _verticalFlexGap;
    /**
     * @function pathToIcons
     * @description Define the path to icons, to not type it again on every icon creation. Check also
     * [iconsType]{@link TurboConfig.iconsType}.
     * @example
     * TurboConfig.pathToIcons = "assets/icons/";
     * icon({icon: "icon.svg"}); // provide "icon.svg" as parameter instead of "assets/icons/icon.svg"}
     * @param path - a string representing the path to the icons' directory.
     * @returns The previously set path to icons (or an empty string if not set).
     */
    static set pathToIcons(path: string);
    static get pathToIcons(): string;
    /**
     * @function iconsType
     * @description Define the extension type of icons, to not type it again on every icon creation. Check also
     * [pathToIcons]{@link TurboConfig.pathToIcons}.
     * @example
     * TurboConfig.iconsType = "svg";
     * icon({icon: "assets/icons/icon"}); // provide "assets/icons/icon" as parameter instead of "assets/icons/icon.svg"}
     * @param type - a string representing the extension of the icons.
     * @returns The previously set icons type (or an empty string if not set).
     */
    static set iconsType(type: string);
    static get iconsType(): string;
    /**
     * @function flexGap
     * @description Define the default gap for all created flex elements (both horizontal and vertical)
     * @example
     * TurboConfig.flexGap = "10px";
     * flexCol({children: [...]}) // Will automatically set the gap between children to 10px, without explicitly specifying it.
     * @param gap - a string representing the gap value to set.
     * @returns The value of the gap between elements (or an empty string if not set). If the vertical and horizontal gaps are
     * set to different values, it will return by default the value of the horizontal gap.
     */
    static set flexGap(gap: string);
    static get flexGap(): string;
    /**
     * @function horizontalFlexGap
     * @description Define the default horizontal gap for all created flex elements.
     * @example
     * TurboConfig.horizontalFlexGap = "10px";
     * flexRow({children: [...]}) // Will automatically set the gap between children to 10px, without explicitly specifying it.
     * @param gap - a string representing the gap value to set.
     * @returns The value of the gap between elements (or an empty string if not set).
     */
    static set horizontalFlexGap(gap: string);
    static get horizontalFlexGap(): string;
    /**
     * @function verticalFlexGap
     * @description Define the default vertical gap for all created flex elements.
     * @example
     * TurboConfig.verticalFlexGap = "10px";
     * flexCol({children: [...]}) // Will automatically set the gap between children to 10px, without explicitly specifying it.
     * @param gap - a string representing the gap value to set.
     * @returns The value of the gap between elements (or an empty string if not set).
     */
    static set verticalFlexGap(gap: string);
    static get verticalFlexGap(): string;
}
/**
 * @typedef {Object} TurboElementProperties
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
 *
 * @property {string} [icon] - The name of the icon (or the full path if the latter was not configured - {@link function:setIconsPath}) for
 * icon-based elements (e.g., "search", "close").
 */
/**
 * @type {TurboElementProperties}
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
declare class TurboElement<T extends HTMLElement = HTMLElement> {
    element: T;
    /**
     * @description Create a new Turbo element with the given properties.
     * @param {T extends HTMLElement} element - The HTML element to create the TurboElement from
     */
    constructor(element: T);
    /**
     * @description Factory method to create a TurboElement from the given properties and with an HTML element
     * of the corresponding type.
     * @param {TurboElementProperties | HTMLElement} properties - Object containing the properties of the element to
     * instantiate OR HTML element to create a TurboElement from
     */
    static create<K extends keyof HTMLElementTagNameMap>(properties?: TurboElementProperties | HTMLElementTagNameMap[K]): TurboElement;
    private setProperties;
    private generateProxy;
    /**
     * Adds an event listener to the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): this;
    /**
     * Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string} value The value of the attribute.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    setAttribute(name: string, value: string): this;
    /**
     * Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    removeAttribute(name: string): this;
    /**
     * Removes an event listener from the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that was previously added as a listener.
     * @param {boolean | EventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): this;
    /**
     * Causes the element to lose focus.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    blur(): this;
    /**
     * Sets focus on the element.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    focus(): this;
    /**
     * Removes the element from its parent node.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    remove(): this;
    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    addClass(classes: string | string[] | undefined): this;
    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    removeClass(classes: string | string[] | undefined): this;
    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns This Turbo element instance for method chaining.
     */
    toggleClass(classes: string | string[] | undefined, force?: boolean): this;
    /**
     * @description Add one or more child elements to the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    addChild(children: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | undefined): this;
    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    remChild(children: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | undefined): this;
    /**
     * @description Set a certain style attribute of the element to the provided value
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns This Turbo element instance for method chaining.
     */
    setStyle(attribute: keyof CSSStyleDeclaration, value: string): this;
    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons.
     * @returns This Turbo element instance for method chaining.
     */
    setStyles(cssText: string): this;
}
/**
 * @description Create an HTML element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
declare const element: (properties?: TurboElementProperties) => TurboElement;
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
declare const spacer: (parent?: TurboElement | HTMLElement) => TurboElement;
/**
 * @description Create a flex row element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
declare const flexRow: (properties: TurboElementProperties) => TurboElement;
/**
 * @description Create a flex column element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
declare const flexCol: (properties: TurboElementProperties) => TurboElement;
