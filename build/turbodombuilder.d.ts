/**
 * @interface ITurbo
 * @description Interface declaring all the base functions to be implemented by Turbo classes.
 */
interface ITurbo {
    /**
     * @description The root of the element (the document's head or the shadow root - if enabled).
     */
    readonly root: ShadowRoot | HTMLHeadElement;
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
     * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    addChild(children?: TurboCompatible | TurboCompatible[]): this;
    /**
     * @description Remove one or more child elements from the element.
     * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    remChild(children?: TurboCompatible | TurboCompatible[]): this;
    /**
     * @description Add one or more child elements to the element.
     * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child Turbo or HTML elements to
     * insert before sibling.
     * @param {TurboCompatible} sibling - The sibling element
     * @returns {this} Itself, allowing for method chaining.
     */
    addChildBefore(children?: TurboCompatible | TurboCompatible[], sibling?: TurboCompatible): this;
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
    /**
     * @description Adds an event listener to the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener The function
     * or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: this) => void), options?: boolean | AddEventListenerOptions): this;
    /**
     * @description Removes an event listener from the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that was previously added as a listener.
     * @param {boolean | EventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): this;
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
    show(b: boolean): this;
}

interface TurboWrapper extends HTMLElement {
    [key: string]: any;
}
/**
 * @class TurboWrapper
 * @description A Turbo wrapper class, wrapping an HTML elements and providing all the Turbo functionalities.
 */
declare class TurboWrapper implements ITurbo {
    /**
     * @description The underlying HTML element.
     */
    element: HTMLElement;
    /**
     * @description Whether or not this wrapper uses its proxy.
     */
    useProxy: boolean;
    root: ShadowRoot | HTMLHeadElement;
    /**
     * @description Create a new Turbo element with the given properties.
     * @param {T extends HTMLElement | TurboElementProperties} properties - Object containing properties for
     * configuring a TurboElement, or the HTML element to create the TurboElement from.
     */
    constructor(properties?: HTMLElement | TurboProperties);
    /**
     * @description Generates a proxy for this element. When trying to access a property that does not exist on the
     * TurboWrapper, the proxy will automatically try to access it on the underlying HTML element
     * @returns The proxy
     */
    proxy(): this;
    setProperties(properties: TurboProperties): this;
    addClass(classes: string | string[] | undefined): this;
    removeClass(classes: string | string[] | undefined): this;
    toggleClass(classes: string | string[] | undefined, force?: boolean): this;
    addChild(children: HTMLElement | HTMLElement[] | undefined): this;
    remChild(children: HTMLElement | HTMLElement[] | undefined): this;
    addChildBefore(children: HTMLElement | HTMLElement[] | undefined, sibling: HTMLElement): this;
    removeAllChildren(): this;
    setStyle(attribute: keyof CSSStyleDeclaration, value: string): this;
    setStyles(cssText: string): this;
    addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: this) => void), options?: boolean | AddEventListenerOptions): this;
    removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): this;
    execute(callback: ((el: this) => void)): this;
    setAttribute(name: string, value?: string | boolean): this;
    removeAttribute(name: string): this;
    blur(): this;
    focus(): this;
    remove(): this;
    show(b: boolean): this;
}

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
type ReadonlyKeys<T> = {
    [P in keyof T]-?: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P>;
}[keyof T];
type RemoveReadonly<T> = Pick<T, Exclude<keyof T, ReadonlyKeys<T>>>;
type HTMLElementNonFunctions<K extends Element = HTMLElement> = {
    [T in keyof K]: K[T] extends Function ? never : T;
}[keyof K];
type HTMLElementMutableFields<K extends Element = HTMLElement> = RemoveReadonly<Omit<Partial<Pick<K, HTMLElementNonFunctions<K>>>, "children" | "className" | "style">>;
type TurboCompatible = Element | TurboWrapper;
type HTMLTag = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | keyof MathMLElementTagNameMap;
/**
 * @type {TurboProperties}
 * @description Object containing properties for configuring a TurboWrapper or a TurboElement. Any HTML attribute can
 * be passed as key to be processed by the class/function. A few of these attributes were explicitly defined here
 * for autocompletion in JavaScript. Use TypeScript for optimal autocompletion (with the target generic type, if
 * needed). The type also has the following described custom properties:
 *
 * @property {HTMLTag} [tag="div"] - For TurboWrapper only. The HTML tag of the element (e.g., "div", "span", "input").
 * @property {string} [id] - The ID of the element.
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of
 * space-separated classes or an array of class names).
 * @property {string} [style] - The inline style of the element. Use the css literal function for autocompletion.
 * @property {string} [stylesheet] - The associated stylesheet (if any) with the element. Declaring this property will
 * generate automatically a new style element in the element's corresponding root. Use the css literal function
 * for autocompletion.
 * @property {Record<string, EventListenerOrEventListenerObject | ((e: Event, el: TurboCompatible) => void)>} [listeners]
 * - An object containing event listeners to be applied to this element.
 * @property {TurboCompatible | TurboCompatible[]} [children] - An array of child wrappers or elements to append to
 * the created element.
 * @property {TurboCompatible} [parent] - The parent element or wrapper to which the created element will be appended.
 * @property {string} [text] - The text content of the element (if any).
 * @property {boolean} [shadowDOM] - If true, indicate that the element or wrapper will be created under a shadow root.
 *
 * @property alt
 * @property src
 * @property href
 * @property target
 * @property action
 * @property method
 * @property type
 * @property value
 * @property placeholder
 * @property name
 * @property disabled
 * @property checked
 * @property selected
 */
type TurboProperties<K extends Element = HTMLElement> = HTMLElementMutableFields<K> & {
    tag?: HTMLTag;
    id?: string;
    classes?: string | string[];
    style?: string;
    stylesheet?: string;
    listeners?: Record<string, EventListenerOrEventListenerObject | ((e: Event, el: TurboCompatible) => void)>;
    children?: TurboCompatible | TurboCompatible[];
    parent?: TurboCompatible;
    text?: string;
    shadowDOM?: boolean;
    [key: string]: any;
};

/**
 * @type {TurboButtonProperties}
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboProperties
 *
 * @property {string | TurboCompatible} [buttonText] - The text content of the button.
 * @property {string | TurboCompatible} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | TurboCompatible} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {TurboCompatible | TurboCompatible[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {TurboCompatible | TurboCompatible[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 * @property {"button" | "submit" | "reset"} [type] - The type of the button (Can be "button", "submit", or "reset").
 * @property {HTMLTag} [customTextTag] - The HTML tag to be used for the buttonText element (if the latter is passed as
 * a string). If not specified, the default text tag specified in the Button class will be used.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Button
 * to this instance of Button.
 */
type TurboButtonProperties = TurboProperties & {
    buttonText?: string | TurboCompatible;
    leftIcon?: string | TurboCompatible;
    rightIcon?: string | TurboCompatible;
    leftCustomElements?: TurboCompatible | TurboCompatible[];
    rightCustomElements?: TurboCompatible | TurboCompatible[];
    type?: "button" | "submit" | "reset";
    customTextTag?: HTMLTag;
    unsetDefaultClasses?: boolean;
};
/**
 * @type {ButtonChildren}
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {TurboCompatible | TurboCompatible[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {TurboCompatible | null} leftIcon - The icon placed on the left side of the button.
 * @property {TurboCompatible | null} text - The text element of the button.
 * @property {TurboCompatible | null} rightIcon - The icon placed on the right side of the button.
 * @property {TurboCompatible | TurboCompatible[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
 */
type ButtonChildren = {
    leftCustomElements: TurboCompatible | TurboCompatible[] | null;
    leftIcon: TurboCompatible | null;
    buttonText: TurboCompatible | null;
    rightIcon: TurboCompatible | null;
    rightCustomElements: TurboCompatible | TurboCompatible[] | null;
};
/**
 * @type {TurboButtonConfig}
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {HTMLTag} [defaultTextTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboButtonConfig = {
    defaultTextTag?: HTMLTag;
    defaultClasses?: string | string[];
};

/**
 * @class TurboElement
 * @extends HTMLElement
 * @implements ITurbo
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 */
declare class TurboElement extends HTMLElement implements ITurbo {
    readonly root: ShadowRoot | HTMLHeadElement;
    /**
     * @description The stylesheet associated to this class. It will automatically be added once to the document
     * (or once to the closest shadow root).
     */
    static readonly stylesheet: string;
    private static stylesRecord;
    private pendingStyles;
    constructor(properties?: TurboProperties);
    /**
     * @description Static configuration object.
     */
    static readonly config: any;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value: typeof this.config): void;
    setProperties(properties: TurboProperties): this;
    addClass(classes?: string | string[]): this;
    removeClass(classes?: string | string[]): this;
    toggleClass(classes?: string | string[], force?: boolean): this;
    addChild(children?: TurboCompatible | TurboCompatible[]): this;
    remChild(children?: TurboCompatible | TurboCompatible[]): this;
    addChildBefore(children?: TurboCompatible | TurboCompatible[], sibling?: TurboCompatible): this;
    removeAllChildren(): this;
    addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: this) => void), options?: boolean | AddEventListenerOptions): this;
    setStyle(attribute: keyof CSSStyleDeclaration, value: string): this;
    setStyles(cssText: string): this;
    private applyStyles;
    execute(callback: ((el: this) => void)): this;
    removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): this;
    setAttribute(name: string, value?: string | boolean): this;
    removeAttribute(name: string): this;
    blur(): this;
    focus(): this;
    remove(): this;
    show(b: boolean): this;
}

/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
declare class TurboButton extends TurboElement {
    private _elements;
    private _buttonTextTag;
    static readonly config: TurboButtonConfig;
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboButtonProperties);
    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {TurboCompatible | TurboCompatible[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    private addAtPosition;
    /**
     * @description Removes a given element or elements from the button.
     * @param {TurboCompatible | TurboCompatible[] | null} element - The element(s) to remove.
     */
    private removeElement;
    /**
     * @description Object containing the children of the button.
     */
    private get elements();
    private set elements(value);
    /**
     * @description The tag of the text element in the button
     */
    get buttonTextTag(): HTMLTag;
    set buttonTextTag(value: HTMLTag | undefined);
    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    get leftCustomElements(): TurboCompatible | TurboCompatible[] | null;
    set leftCustomElements(value: TurboCompatible | TurboCompatible[] | null);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon(): TurboCompatible | null;
    set leftIcon(value: string | TurboCompatible | null);
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get buttonText(): TurboCompatible | null;
    set buttonText(value: string | TurboCompatible | null);
    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon(): TurboCompatible | null;
    set rightIcon(value: string | TurboCompatible | null);
    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    get rightCustomElements(): TurboCompatible | TurboCompatible[] | null;
    set rightCustomElements(value: TurboCompatible | TurboCompatible[] | null);
}
declare function button(properties: TurboButtonProperties): TurboButton;

/**
 * @type {TurboDropdownEntryProperties}
 * @description Properties for configuring a DropdownEntry.
 * @extends TurboProperties
 *
 * @property {string} value - The value associated with the dropdown entry.
 * @property {boolean} [selected=false] - Indicates whether the entry is initially selected.
 * @property {string | string[]} [selectedClass=""] - CSS class(es) applied to the entry when it is selected.
 */
type TurboDropdownEntryProperties = TurboProperties & {
    value: string;
    selected?: boolean;
    selectedClass?: string;
};
/**
 * @type {TurboDropdownProperties}
 * @description Properties for configuring a Dropdown.
 * @extends TurboProperties
 *
 * @property {(string | DropdownEntry)[]} values - The values or DropdownEntry instances to be used as dropdown options.
 * @property {string[]} [selectedValues=[]] - Array of values that are initially selected.
 * @property {(string | HTMLElement)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {HTMLElement} [popup] - The element used as a container for the dropdown entries.
 *
 * @property {boolean} [multiSelection=false] - Enables selection of multiple dropdown entries.
 * @property {string} [underlyingInputName] - Name attribute for a hidden input element to store the selected value(s).
 * If not declared, the hidden input will not be created.
 *
 * @property {HTMLTag} [customSelectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 * @property {HTMLTag} [customEntryTag] - Custom HTML tag for dropdown entries.  Overrides the
 * default tag set in TurboConfig.Dropdown.
 *
 * @property {string | string[]} [customSelectorClasses] - Custom CSS class(es) for the selector. Overrides the default
 * classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [customPopupClasses] - Custom CSS class(es) for the popup container. Overrides the
 * default classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [customEntriesClasses] - Custom CSS class(es) for dropdown entries.  Overrides the
 * default classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [customSelectedEntriesClasses] - Custom CSS class(es) for selected entries.  Overrides
 * the default classes set in TurboConfig.Dropdown.
 */
type TurboDropdownProperties = TurboProperties & {
    values: (string | DropdownEntry)[];
    selectedValues?: string[];
    selector?: string | HTMLElement;
    popup?: HTMLElement;
    multiSelection?: boolean;
    underlyingInputName?: string;
    customSelectorTag?: HTMLTag;
    customEntryTag?: HTMLTag;
    customSelectorClasses?: string;
    customPopupClasses?: string;
    customEntriesClasses?: string;
    customSelectedEntriesClasses?: string;
};
/**
 * @type {TurboDropdownConfig}
 * @description Configuration object for the Dropdown class. Set it via TurboConfig.Dropdown.
 *
 * @property {HTMLTag} [defaultEntryTag] - The default HTML tag for the creation of generic
 * dropdown entries.
 * @property {HTMLTag} [defaultSelectorTag] - The default HTML tag for the creation of the text
 * element in generic selectors (which are Buttons).
 *
 * @property {string | string[]} [defaultSelectorClasses] - The default classes to assign to the selector.
 * @property {string | string[]} [defaultPopupClasses] - The default classes to assign to the popup element.
 * @property {string | string[]} [defaultEntriesClasses] - The default classes to assign to the dropdown entries.
 * @property {string | string[]} [defaultSelectedEntriesClasses] - The default classes to assign to the selected
 * dropdown entries.
 */
type TurboDropdownConfig = {
    defaultEntryTag?: HTMLTag;
    defaultSelectorTag?: HTMLTag;
    defaultSelectorClasses?: string | string[];
    defaultPopupClasses?: string | string[];
    defaultEntriesClasses?: string | string[];
    defaultSelectedEntriesClasses?: string | string[];
};

/**
 * @class DropdownEntry
 * @description Class representing an entry within a Dropdown.
 * @extends TurboElement
 */
declare class DropdownEntry extends TurboElement {
    private _value;
    private _selected;
    private _selectedClass;
    /**
     * @description DropdownEntry constructor
     * @param {TurboDropdownEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties: TurboDropdownEntryProperties);
    /**
     * @description Toggles the selection of this dropdown entry
     */
    toggle(): void;
    /**
     * @description The value of the dropdown entry
     */
    get value(): string;
    set value(value: string);
    /**
     * @description Whether or not the dropdown entry is selected
     */
    get selected(): boolean;
    set selected(value: boolean);
    /**
     * @description The class(es) assigned to the dropdown entry when it is selected
     */
    get selectedClass(): string | string[];
    set selectedClass(value: string | string[]);
}
declare function dropdownEntry(properties: TurboDropdownEntryProperties): DropdownEntry;

/**
 * Dropdown class for creating Turbo button elements.
 * @class Dropdown
 * @extends TurboElement
 */
declare class Dropdown extends TurboElement {
    /**
     * The dropdown's selector element.
     */
    readonly selector: HTMLElement;
    /**
     * The dropdown's popup element.
     */
    readonly popup: HTMLElement;
    /**
     * The dropdown's entries.
     */
    private _entries;
    /**
     * The dropdown's underlying hidden input. Might be undefined.
     */
    readonly underlyingInput?: HTMLInputElement;
    private popupOpen;
    private readonly multiSelection;
    static readonly config: TurboDropdownConfig;
    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties: TurboDropdownProperties);
    private createSelector;
    private createPopup;
    private createDropdownEntry;
    /**
     * @description Select an entry.
     * @param {string | DropdownEntry} entry - The DropdownEntry (or its string value) to select.
     * @return {Dropdown} - This Dropdown for chaining.
     */
    select(entry: string | DropdownEntry): Dropdown;
    reset(): void;
    get entries(): DropdownEntry[];
    private set entries(value);
    /**
     * @description The dropdown's currently selected entries
     */
    get selectedEntries(): DropdownEntry[];
    /**
     * @description The dropdown's currently selected values
     */
    get selectedValues(): string[];
    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    get values(): string[];
    set values(values: string[]);
    private updateSelectorText;
    private openPopup;
}
declare function dropdown(properties: TurboDropdownProperties): Dropdown;

/**
 * @type {TurboIconProperties}
 * @description Properties object that extends TurboElementProperties with properties specific to icons.
 * @extends TurboProperties
 *
 * @property {string} icon - The name of the icon.
 * @property {string} [iconColor] - The color of the icon.
 * @property {((svg: SVGElement) => {})} [onLoaded] - Custom function that takes an SVG element to execute on the
 * SVG icon (if it is one) once it is loaded. This property will be disregarded if the icon is not of type SVG.
 *
 * @property {string} [type] - Custom type of the icon, overrides the default type assigned to
 * TurboIcon.config.type (whose default value is "svg").
 * @property {string} [directory] - Custom directory to the icon, overrides the default directory assigned to
 * TurboIcon.config.directory.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in
 * TurboIcon.config.defaultClasses to this instance of Icon.
 */
type TurboIconProperties = TurboProperties & {
    icon: string;
    iconColor?: string;
    onLoaded?: ((svg: SVGElement) => {});
    type?: string;
    directory?: string;
    unsetDefaultClasses?: boolean;
};
/**
 * @type {TurboIconConfig}
 * @description Configuration object for the Icon class. Set it via TurboConfig.Icon.
 *
 * @property {string} [type] - The default type to assign to newly created Icons. Defaults to "svg".
 * @property {string} [[path]] - The default path to the directory containing the icons in the project. Specify the
 * directory once here to not type it again at every Icon generation.
 * @property {string} [customType] - Custom type of the icon, overrides the default type assigned to Icon.type.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created icons.
 */
type TurboIconConfig = {
    type?: string;
    path?: string;
    defaultClasses?: string | string[];
};

/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
declare class TurboIcon extends TurboElement {
    private _element;
    private _type;
    private _directory;
    private _icon;
    private _iconColor;
    private _onLoaded;
    static readonly config: TurboIconConfig;
    private static cache;
    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties);
    update(properties: TurboIconProperties): void;
    private generateSvg;
    private generateImg;
    private clear;
    /**
     * @description The type of the icon.
     */
    get type(): string;
    private set type(value);
    /**
     * @description The user-provided (or statically configured) directory to the icon's file.
     */
    get directory(): string;
    private set directory(value);
    /**
     * @description The path to the icon's source file.
     */
    get path(): string;
    /**
     * @description The name (or path) of the icon. Might include the file extension (to override the icon's type).
     * Setting it will update the icon accordingly.
     */
    get icon(): string;
    private set icon(value);
    /**
     * @description The assigned color to the icon (if any)
     */
    get iconColor(): string | null;
    set iconColor(value: string | null);
    /**
     * @description The child element of the icon element (an HTML image or an SVG element).
     */
    private set element(value);
    get element(): HTMLImageElement | SVGElement;
}
declare function icon(properties: TurboIconProperties): TurboIcon;

type TurboPopupProperties = TurboProperties & {
    viewportMargin?: number;
    offsetFromParent?: number;
};

declare class TurboPopup extends TurboElement {
    viewportMargin: number;
    offsetFromParent: number;
    constructor(properties?: TurboProperties);
    private addListeners;
    private recomputePosition;
    private recomputeTop;
    private recomputeLeft;
    private recomputeMaxHeight;
    private recomputeMaxWidth;
    private clearMaxDimensions;
    get isShown(): boolean;
    show(b: boolean): this;
    toggle(): this;
}
declare function popup(properties?: TurboProperties): TurboPopup;

/**
 * @class {TurboConfig}
 * @description Static configuration class for TurboDOMBuilder.
 */
declare class TurboConfig {
    static shadowDOM: boolean;
}

/**
 * @type {TransitionProperties}
 * @description Object containing properties for a Transition element.
 *
 * @property {string} [property] - The CSS property (or properties) to apply the transition on. Set to "all" or don't
 * specify to apply to all CSS properties.
 *
 * @property {number} [duration] - The duration of the transition in seconds.
 * @property {string} [durationIn] - The duration of transitioning in, in seconds. Has priority over the "duration" property
 * (if the latter is set).
 * @property {string} [durationOut] - The duration of transitioning out, in seconds. Has priority over the "duration" property
 * (if the latter is set).
 *
 * @property {number} [delay] - The delay of the transition in seconds.
 * @property {string} [delayIn] - The delay before transitioning in, in seconds. Has priority over the "delay" property
 * (if the latter is set).
 * @property {string} [delayOut] - The delay before transitioning out, in seconds. Has priority over the "delay" property
 * (if the latter is set).
 *
 * @property {number} [timingFunction] - The timing function to apply to the transition.
 * @property {string} [timingFunctionIn] - The timing function to apply for transitioning in. Has priority over the
 * "timingFunction" property (if the latter is set).
 * @property {string} [timingFunctionOut] - The timing function to apply for transitioning out. Has priority over the
 * "timingFunction" property (if the latter is set).
 */
type TransitionProperties = {
    property?: string;
    duration?: number;
    durationIn?: number;
    durationOut?: number;
    delay?: number;
    delayIn?: number;
    delayOut?: number;
    timingFunction?: string;
    timingFunctionIn?: string;
    timingFunctionOut?: string;
};
/**
 * @class Transition
 * @description A class representing a CSS transition. It has two states (in and out), which you can set up
 * almost independently (they must only share the animation property). Use a Transition to transition one or more
 * TurboElement(s) or HTMLElement(s) easily using your predefined transition.
 */
declare class Transition {
    private transitionProperties;
    /**
     * @constructor
     * @param {TransitionProperties} transition - The transition properties to apply to this newly created Transition
    */
    constructor(transition: TransitionProperties);
    /**
     * @function transition
     * @description A function to apply the transition (in or out) on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {boolean} out - Set to true to transition out, and false to transition in.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    transition(element: TurboElement | HTMLElement | TurboElement[] | HTMLElement[], customTransitionProperties: TransitionProperties, out?: boolean): void;
    /**
     * @function transitionIn
     * @description A function to apply the transition in on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    transitionIn(element: TurboElement | HTMLElement, customTransitionProperties: TransitionProperties): void;
    /**
     * @function transitionOut
     * @description A function to apply the transition out on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    transitionOut(element: TurboElement | HTMLElement, customTransitionProperties: TransitionProperties): void;
    /**
     * @function update
     * @description Function to update certain (or every) properties of the current Transition.
     * @param {TransitionProperties} changedProperties - The updated transition properties
     */
    update(changedProperties: TransitionProperties): void;
}

/**
 * @description Creates a canvas TurboElement with the given properties.
 * @param {TurboProperties<HTMLCanvasElement>} [properties] - The properties object.
 * @returns The Turbo canvas element.
 */
declare function canvas(properties?: TurboProperties<HTMLCanvasElement>): HTMLCanvasElement;

/**
 * @description Creates a div TurboElement with the given properties.
 * @param {TurboProperties<HTMLDivElement>} [properties] - The properties object.
 * @returns The Turbo div element.
 */
declare function div(properties?: TurboProperties<HTMLDivElement>): HTMLDivElement;

/**
 * @description Creates a form TurboElement with the given properties.
 * @param {TurboProperties<HTMLFormElement>} [properties] - The properties object.
 * @returns The Turbo form element.
 */
declare function form(properties?: TurboProperties<HTMLFormElement>): HTMLFormElement;

/**
 * @description Creates a h1 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h1 element.
 */
declare function h1(properties?: TurboProperties<HTMLHeadingElement>): HTMLHeadingElement;

/**
 * @description Creates a h2 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h2 element.
 */
declare function h2(properties?: TurboProperties<HTMLHeadingElement>): HTMLHeadingElement;

/**
 * @description Creates a h3 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h3 element.
 */
declare function h3(properties?: TurboProperties<HTMLHeadingElement>): HTMLHeadingElement;

/**
 * @description Creates a h TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h element.
 */
declare function h4(properties?: TurboProperties<HTMLHeadingElement>): HTMLHeadingElement;

/**
 * @description Creates a h5 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h5 element.
 */
declare function h5(properties?: TurboProperties<HTMLHeadingElement>): HTMLHeadingElement;

/**
 * @description Creates a h6 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h6 element.
 */
declare function h6(properties?: TurboProperties<HTMLHeadingElement>): HTMLHeadingElement;

/**
 * @description Creates an image TurboElement with the given properties.
 * @param {TurboProperties<HTMLImageElement>} [properties] - The properties object.
 * @returns The Turbo image element.
 */
declare function img(properties?: TurboProperties<HTMLImageElement>): HTMLImageElement;

/**
 * @description Creates an input TurboElement with the given properties.
 * @param {TurboProperties<HTMLInputElement>} [properties] - The properties object.
 * @returns The Turbo input element.
 */
declare function input(properties?: TurboProperties<HTMLInputElement>): HTMLInputElement;

/**
 * @description Creates a p TurboElement with the given properties.
 * @param {TurboProperties<HTMLParagraphElement>} [properties] - The properties object.
 * @returns The Turbo p element.
 */
declare function p(properties?: TurboProperties<HTMLParagraphElement>): HTMLParagraphElement;

/**
 * @description Creates a text area TurboElement with the given properties.
 * @param {TurboProperties<HTMLTextAreaElement>} [properties] - The properties object.
 * @returns The Turbo input element.
 */
declare function textArea(properties?: TurboProperties<HTMLTextAreaElement>): HTMLTextAreaElement;

/**
 * @description Create an HTML element with the specified properties.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created HTML element.
 */
declare function element(properties?: TurboProperties): HTMLElement;

/**
 * @description Create a flex column element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
declare function flexColCenter(properties?: TurboProperties): HTMLElement;

/**
 * @description Create a flex column element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
declare function flexCol(properties?: TurboProperties): HTMLElement;

/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
declare function flexRowCenter(properties?: TurboProperties): HTMLElement;

/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
declare function flexRow(properties?: TurboProperties): HTMLElement;

/**
 * @description Create a spacer element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created spacer element
 */
declare function spacer(properties?: TurboProperties): HTMLElement;

/**
 * @description Add children elements to a parent element.
 * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
 * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {TurboCompatible} sibling - Sibling Turbo or HTML DOM element
 * @return The element itself
 */
declare function addChildBefore(element?: TurboCompatible, children?: TurboCompatible | TurboCompatible[], sibling?: TurboCompatible): TurboCompatible;

/**
 * @description Add children elements to a parent element.
 * @param {TurboCompatible} [element] - Parent Turbo or HTML DOM element
 * @param {TurboCompatible | TurboCompatible[]} [children] - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
declare function addChild(element?: TurboCompatible, children?: TurboCompatible | TurboCompatible[]): TurboCompatible;

/**
 * @description Remove all children of the given parent element.
 * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
 * @return The element itself
 */
declare function removeAllChildren(element?: TurboCompatible): TurboCompatible;

/**
 * @description Remove children elements from a parent element.
 * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
 * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
declare function removeChild(element?: TurboCompatible, children?: TurboCompatible | TurboCompatible[]): TurboCompatible;

/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboCompatible} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
declare function addClass(element?: TurboCompatible, classes?: string | string[]): TurboCompatible;

/**
 * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboCompatible} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
declare function removeClass(element?: TurboCompatible, classes?: string | string[]): TurboCompatible;

/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboCompatible} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 * @return The element itself
 */
declare function toggleClass(element?: TurboCompatible, classes?: string | string[], force?: boolean): TurboCompatible;

/**
 * @description Retrieves the closest root to the provided element in  the document.
 * @param {TurboCompatible} [element] - The element from which to start the search.
 * @return The closest root, or the document's head.
 */
declare function getClosestRoot(element?: TurboCompatible): ShadowRoot | HTMLHeadElement;

/**
 * @description Returns the HTML element from the provided Turbo compatible entity.
 * @param {TurboCompatible} element - The Turbo compatible entity to get the HTML element from
 * @return The HTML element
 */
declare function getElement(element: TurboCompatible): Element;

/**
 * Sets the declared properties to the provided element.
 * @param {TurboCompatible} element - The element onto which the properties will be applied.
 * @param {TurboProperties} [properties] - The properties object.
 * @return The element itself.
 */
declare function setProperties(element: TurboCompatible, properties?: TurboProperties): TurboCompatible;

/**
 * @description Adds the provided event listener to the element.
 * @param {TurboCompatible} element - The element to which the event listener should be applied.
 * @param {string} type - The type of the event.
 * @param {EventListenerOrEventListenerObject | (e: Event, el: TurboCompatible) => void} listener - The function
 * or object that receives a notification. Has (optionally) two parameters: the event, and the element itself.
 * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the
 * event listener.
 * @return The element itself
 */
declare function addListener(element: TurboCompatible | undefined, type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: TurboCompatible) => void), options?: boolean | AddEventListenerOptions): TurboCompatible;

/**
 * @description Adds the file at the provided path as a new style element to the provided root.
 * @param {string | undefined} href - The path to the CSS file to add.
 * @param {HTMLHeadElement | ShadowRoot} [root] - The root to which the style element will be added.
 */
declare function addStylesheetFile(href: string | undefined, root?: HTMLHeadElement | ShadowRoot): void;

/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string | undefined} styles - The css string. Use the css literal function for autocompletion.
 * @param {HTMLHeadElement | ShadowRoot} [root] - The root to which the style element will be added.
 */
declare function addStylesheet(styles: string | undefined, root?: HTMLHeadElement | ShadowRoot): void;

/**
 * @description Constructs a single CSS string from a template literal containing CSS rules.
 */
declare function css(strings: TemplateStringsArray, ...values: any[]): string;

declare function getFileExtension(str?: string): string;

declare class StylesRecord {
    private addedStylesheets;
    private getStylesheets;
    addStylesheet(styles: string, id: string, root?: ShadowRoot | HTMLHeadElement): void;
    addStylesheetFile(href: string, id: string, root?: ShadowRoot | HTMLHeadElement): void;
}

declare class SvgCache {
    cache: Record<string, SVGElement>;
    fetchSvg(path: any, onLoaded: (svg: SVGElement) => void): void;
}

declare function fetchSvg(path: any, onLoaded: (svg: SVGElement) => void): void;

export { type ButtonChildren, Dropdown, DropdownEntry, type HTMLTag, type ITurbo, StylesRecord, SvgCache, Transition, type TransitionProperties, TurboButton, type TurboButtonConfig, type TurboButtonProperties, type TurboCompatible, TurboConfig, type TurboDropdownConfig, type TurboDropdownEntryProperties, type TurboDropdownProperties, TurboElement, TurboIcon, type TurboIconConfig, type TurboIconProperties, TurboPopup, type TurboPopupProperties, type TurboProperties, TurboWrapper, addChild, addChildBefore, addClass, addListener, addStylesheet, addStylesheetFile, button, canvas, css, div, dropdown, dropdownEntry, element, fetchSvg, flexCol, flexColCenter, flexRow, flexRowCenter, form, getClosestRoot, getElement, getFileExtension, h1, h2, h3, h4, h5, h6, icon, img, input, p, popup, removeAllChildren, removeChild, removeClass, setProperties, spacer, textArea, toggleClass };
