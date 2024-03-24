/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
declare function addClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined): HTMLElement | TurboElement<HTMLElement>;
/**
 * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
declare function removeClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined): HTMLElement | TurboElement<HTMLElement>;
/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 */
declare function toggleClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined, force?: boolean): HTMLElement | TurboElement<HTMLElement>;
/**
 * @description Add children elements to a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
declare function addChild(element: TurboElement | HTMLElement, children: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | undefined): HTMLElement | TurboElement<HTMLElement>;
/**
 * @description Remove children elements from a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
declare function removeChild(element: TurboElement | HTMLElement, children: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | undefined): HTMLElement | TurboElement<HTMLElement>;
/**
 * @description Add children elements to a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {TurboElement | HTMLElement} sibling - Sibling Turbo or HTML DOM element
 */
declare function addBefore(element: TurboElement | HTMLElement, children: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | undefined, sibling: TurboElement | HTMLElement): HTMLElement | TurboElement<HTMLElement>;
type HTMLElementAlmostSuperset = Partial<Pick<HTMLElement, keyof HTMLElement>> & Partial<Pick<HTMLInputElement, keyof HTMLInputElement>> & Partial<Pick<HTMLSelectElement, keyof HTMLSelectElement>> & Partial<Pick<HTMLTextAreaElement, keyof HTMLTextAreaElement>> & Partial<Pick<HTMLButtonElement, keyof HTMLButtonElement>> & Partial<Pick<HTMLAnchorElement, keyof HTMLAnchorElement>> & Partial<Pick<HTMLImageElement, keyof HTMLImageElement>> & Partial<Pick<HTMLVideoElement, keyof HTMLVideoElement>> & Partial<Pick<HTMLTableElement, keyof HTMLTableElement>> & Partial<Pick<HTMLFormElement, keyof HTMLFormElement>> & Partial<Pick<HTMLLabelElement, keyof HTMLLabelElement>>;
/**
 * @type {TurboElementProperties}
 * @description Object containing properties for configuring a TurboElement. Any CSS property or HTML attribute can
 * be passed as key, and will be processed by the TurboElement. The type also has the following custom properties:
 *
 * @property {keyof HTMLElementTagNameMap} [tag="div"] - The HTML tag for the element (e.g., "div", "span", "input").
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of space-separated
 * classes or an array of class names).
 * @property {string} [style] - The inline CSS styles for the element.
 * @property {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} [children] - An array of child Turbo or HTML
 * elements to append to the created element.
 * @property {TurboElement | HTMLElement} [parent] - The parent element to which the created element will be appended.
 * @property {string} [text] - The text content of the element (if any).
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
declare class TurboElement<T extends HTMLElement = HTMLElement> {
    element: T;
    /**
     * @description Create a new Turbo element with the given properties.
     * @param {T extends HTMLElement | TurboElementProperties} properties - Object containing properties for
     * configuring a TurboElement, or the HTML element to create the TurboElement from.
     */
    constructor(properties?: T | TurboElementProperties);
    /**
     * @description Factory method to create a TurboElement of the appropriate type based on the provided tag.
     * @param {TurboElementProperties} properties - Object containing properties for configuring a TurboElement.
     */
    static create<K extends HTMLElement>(properties: TurboElementProperties): TurboElement<K>;
    protected setProperties(properties: TurboElementProperties): void;
    protected generateProxy(): TurboElement<T>;
    /**
     * Adds an event listener to the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject | (e: Event, el: TurboElement<T>) => void} listener The function
     * or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {TurboElement<T>} The instance of TurboElement, allowing for method chaining.
     */
    addEventListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: TurboElement<T>) => void), options?: boolean | AddEventListenerOptions): TurboElement<T>;
    /**
     * Execute a callback while still benefiting from chaining.
     * @param {(el: TurboElement<T>) => void} callback The function to execute.
     * @returns {TurboElement<T>} The instance of TurboElement, allowing for method chaining.
     */
    execute(callback: ((el: TurboElement<T>) => void)): TurboElement<T>;
    /**
     * Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | boolean} [value] The value of the attribute. Can be left blank to represent a true boolean.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    setAttribute(name: string, value?: string | boolean): TurboElement<T>;
    /**
     * Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    removeAttribute(name: string): TurboElement<T>;
    /**
     * Removes an event listener from the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that was previously added as a listener.
     * @param {boolean | EventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): TurboElement<T>;
    /**
     * Causes the element to lose focus.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    blur(): TurboElement<T>;
    /**
     * Sets focus on the element.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    focus(): TurboElement<T>;
    /**
     * Removes the element from its parent node.
     * @returns {TurboElement} The instance of TurboElement, allowing for method chaining.
     */
    remove(): TurboElement<T>;
    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    addClass(classes: string | string[] | undefined): TurboElement<T>;
    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns This Turbo element instance for method chaining.
     */
    removeClass(classes: string | string[] | undefined): TurboElement<T>;
    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns This Turbo element instance for method chaining.
     */
    toggleClass(classes: string | string[] | undefined, force?: boolean): TurboElement<T>;
    /**
     * @description Add one or more child elements to the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    addChild(children: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | undefined): TurboElement<T>;
    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @returns This Turbo element instance for method chaining.
     */
    remChild(children: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | undefined): TurboElement<T>;
    /**
     * @description Add one or more child elements to the element.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements to insert before sibling.
     * @param {TurboElement | HTMLElement} sibling - The sibling element
     * @returns This Turbo element instance for method chaining.
     */
    addBefore(children: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | undefined, sibling: TurboElement | HTMLElement): TurboElement<T>;
    /**
     * @description Set a certain style attribute of the element to the provided value
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns This Turbo element instance for method chaining.
     */
    setStyle(attribute: keyof CSSStyleDeclaration, value: string): TurboElement<T>;
    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons.
     * @returns This Turbo element instance for method chaining.
     */
    setStyles(cssText: string): TurboElement<T>;
}
/**
 * @description Create an HTML element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
declare function element<T extends HTMLElement>(properties?: TurboElementProperties): TurboElement<T>;
/**
 * @description Create an image element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element.
 */
declare function image(properties: TurboElementProperties): TurboElement<HTMLImageElement>;
/**
 * @description Create an input element with specified properties.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created Turbo element
 */
declare function input(properties: TurboElementProperties): TurboElement<HTMLInputElement>;
/**
 * @description Create a spacer element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created spacer element
 */
declare function spacer<T extends HTMLElement>(properties?: TurboElementProperties): TurboElement<T>;
/**
 * @description Create a flex row element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
declare function flexRow<T extends HTMLElement>(properties?: TurboElementProperties): TurboElement<T>;
/**
 * @description Create a flex column element.
 * @param {TurboElementProperties} properties - Object containing properties of the element.
 * @returns {TurboElement} The created flex element
 */
declare function flexCol<T extends HTMLElement>(properties?: TurboElementProperties): TurboElement<T>;
/**
 * @type {TurboButtonProperties}
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboElementProperties
 *
 * @property {string | TurboElement | HTMLElement} [buttonText] - The text content of the button.
 * @property {string | Icon} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | Icon} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 * @property {"button" | "submit" | "reset"} [type] - The type of the button (Can be "button", "submit", or "reset").
 * @property {keyof HTMLElementTagNameMap} [customTextTag] - The HTML tag to be used for the text element. If not
 * specified, the default tag specified in the Button class will be used.
 */
type TurboButtonProperties = TurboElementProperties & {
    buttonText?: string | TurboElement | HTMLElement;
    leftIcon?: string | Icon;
    rightIcon?: string | Icon;
    leftCustomElements?: TurboElement | HTMLElement | (TurboElement | HTMLElement)[];
    rightCustomElements?: TurboElement | HTMLElement | (TurboElement | HTMLElement)[];
    type?: "button" | "submit" | "reset";
    customTextTag?: keyof HTMLElementTagNameMap;
};
/**
 * @type {ButtonChildren}
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {Icon | HTMLElement | null} leftIcon - The icon placed on the left side of the button.
 * @property {TurboElement | HTMLElement | null} text - The text element of the button.
 * @property {Icon | HTMLElement | null} rightIcon - The icon placed on the right side of the button.
 * @property {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
 */
type ButtonChildren = {
    leftCustomElements: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null;
    leftIcon: Icon | HTMLElement | null;
    buttonText: TurboElement | HTMLElement | null;
    rightIcon: Icon | HTMLElement | null;
    rightCustomElements: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null;
};
/**
 * Button class for creating Turbo button elements.
 * @class Button
 * @extends TurboElement
 */
declare class Button extends TurboElement<HTMLButtonElement> {
    private customTextTag;
    private _elements;
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboButtonProperties);
    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    private addAtPosition;
    /**
     * @description Removes a given element or elements from the button.
     * @param {TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null} element - The element(s) to remove.
     */
    private removeElement;
    /**
     * @description Object containing the button's children.
     */
    private get elements();
    private set elements(value);
    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    get leftCustomElements(): TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null;
    set leftCustomElements(value: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon(): Icon | HTMLElement | null;
    set leftIcon(value: string | Icon | HTMLElement | null);
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get buttonText(): TurboElement | HTMLElement | null;
    set buttonText(value: string | TurboElement | HTMLElement | null);
    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon(): Icon | HTMLElement | null;
    set rightIcon(value: string | Icon | HTMLElement | null);
    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    get rightCustomElements(): TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null;
    set rightCustomElements(value: TurboElement | HTMLElement | (TurboElement | HTMLElement)[] | null);
    private static _defaultTextTag;
    private static _defaultClasses;
    /**
     * @description The default tag for the text element in buttons.
     */
    static get defaultTextTag(): keyof HTMLElementTagNameMap;
    static set defaultTextTag(value: keyof HTMLElementTagNameMap);
    /**
     * @description The default classes to assign to newly created icons.
     */
    static get defaultClasses(): string | string[] | null;
    static set defaultClasses(value: string | string[] | null);
}
/**
 * @description Creates a TurboElement Button.
 * @param {TurboButtonProperties} properties - Object containing properties of the button.
 * @returns {Button} The created Turbo button.
 */
declare function button(properties: TurboButtonProperties): Button;
/**
 * @type {TurboIconProperties}
 * @description Properties object that extends TurboElementProperties with properties specific to icons.
 * @extends TurboElementProperties
 *
 * @property {string} icon - The name of the icon.
 * @property {string} [color] - The color of the icon.
 * @property {string} [customType] - Custom type of the icon, overrides the default type assigned to Icon.type
 * (whose default value is "svg").
 * @property {string} [customPath] - Custom path to the icon, overrides the default path assigned to Icon.path.
 */
type TurboIconProperties = TurboElementProperties & {
    icon: string;
    color?: string;
    customType?: string;
    customPath?: string;
};
/**
 * Icon class for creating icon elements.
 * @class Icon
 * @extends TurboElement
 */
declare class Icon extends TurboElement<HTMLImageElement | HTMLButtonElement | HTMLElement> {
    private readonly _icon;
    private _color;
    private _svg;
    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties);
    /**
     * @description The name of the icon.
     */
    get icon(): string;
    /**
     * @description The assigned color to the icon (if any)
     */
    get color(): string | null;
    set color(value: string | null);
    /**
     * @description The underlying SVG element (if any).
     */
    get svg(): SVGElement;
    private static _type;
    private static _path;
    private static _defaultClasses;
    /**
     * @description The default type to assign to newly created Icons. Defaults to "svg".
     */
    static get type(): string;
    static set type(value: string);
    /**
     * @description The default path to the directory containing the icons in the project. Specify the directory once
     * here to not type it again at every Icon generation.
     */
    static get path(): string;
    static set path(value: string);
    /**
     * @description The default classes to assign to newly created icons.
     */
    static get defaultClasses(): string | string[] | null;
    static set defaultClasses(value: string | string[] | null);
}
/**
 * Class for creating icon buttons.
 * @class IconButton
 * @extends Icon
 */
declare class IconButton extends Icon {
    /**
     * Creates an instance of IconButton.
     * @param {TurboIconProperties} properties - Properties to configure the button and its icon.
     */
    constructor(properties: TurboIconProperties);
}
/**
 * @description Creates a TurboElement Icon.
 * @param {TurboIconProperties} properties - Object containing properties of the icon.
 * @returns {Icon} The created Turbo icon.
 */
declare function icon(properties: TurboIconProperties): Icon;
/**
 * @description Creates a TurboElement IconButton.
 * @param {TurboIconProperties} properties - Object containing properties of the icon and the button.
 * @returns {IconButton} The created Turbo icon button.
 */
declare function iconButton(properties: TurboIconProperties): IconButton;
