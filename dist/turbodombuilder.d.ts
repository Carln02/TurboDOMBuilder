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
 * @type TurboElementProperties
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
 *
 * @property {string} [flex] - Set it to a flex-direction value to set the element's display to flex with the given direction.
 * @property {string} [gap] - The gap between children elements (if it is a flex element)
 *
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
    flex?: string;
    gap?: string;
    icon?: string;
};
/**
 * @class TurboElement
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
     * @returns This Turbo element instance for method chaining.
     */
    addChild(children: TurboElement[] | HTMLElement[] | undefined): TurboElement;
    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    removeChild(children: TurboElement[] | HTMLElement[] | undefined): TurboElement;
    /**
     * @description Add an event listener to the element. Check the
     * [official documentation]{@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
     * for more information.
     * @param {string} event - The JavaScript event to listen for. E.g.: click, mousedown, etc.
     * @param {(arg0: Event) => void} fn - The callback function to execute when the event occurs
     * @param {any} options - (Optional) Object containing custom options to specify (if any)
     * @returns This Turbo element instance for method chaining.
     */
    addListener(event: string, fn: (arg0: Event) => void, options?: any): this;
    /**
     * @description Retrieve the first Element in the current element's tree that matches the provided query. Check the
     * [official documentation]{@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector}
     * for more information.
     * @param {string} selectors - A string containing one or more selectors to match. It must be a valid CSS selector string.
     * @returns The first element in the tree that matches the specified set of CSS selectors, or null if none matches
     * the provided selectors.
     */
    query: (selectors: string) => Element | null;
    /**
     * @description Retrieve a NodeList of Elements in the current element's tree that match the provided query. Check the
     * [official documentation]{@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll}
     * for more information.
     * @param {string} selectors - A string containing one or more selectors to match. It must be a valid CSS selector string.
     * @returns A NodeList of all elements in the tree that match the specified set of CSS selectors, or an empty NodeList if
     * none matches the provided selectors.
     */
    queryAll: (selectors: string) => NodeListOf<Element>;
    /**
     * @description Set a certain style attribute of the element to the provided value
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns This Turbo element instance for method chaining.
     */
    setStyle(attribute: keyof CSSStyleDeclaration, value: string): TurboElement;
    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons.
     * @returns This Turbo element instance for method chaining.
     */
    setStyles(cssText: string): TurboElement;
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
    /**
     * @description Get the parent of the underlying HTMLElement (or null if non-existent).
     */
    get parentElement(): HTMLElement | null;
    /**
     * @description Get the children of the underlying HTMLElement.
     */
    get children(): HTMLCollection;
}
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
