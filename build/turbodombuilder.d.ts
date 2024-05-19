declare const a: (properties?: TurboProperties<"a">) => HTMLAnchorElement & SVGAElement;
declare const canvas: (properties?: TurboProperties<"canvas">) => HTMLCanvasElement;
declare const div: (properties?: TurboProperties<"div">) => HTMLDivElement;
declare const form: (properties?: TurboProperties<"form">) => HTMLFormElement;
declare const h1: (properties?: TurboProperties<"h1">) => HTMLHeadingElement;
declare const h2: (properties?: TurboProperties<"h2">) => HTMLHeadingElement;
declare const h3: (properties?: TurboProperties<"h3">) => HTMLHeadingElement;
declare const h4: (properties?: TurboProperties<"h4">) => HTMLHeadingElement;
declare const h5: (properties?: TurboProperties<"h5">) => HTMLHeadingElement;
declare const h6: (properties?: TurboProperties<"h6">) => HTMLHeadingElement;
declare const img: (properties?: TurboProperties<"img">) => HTMLImageElement;
declare const input: (properties?: TurboProperties<"input">) => HTMLInputElement;
declare const link: (properties?: TurboProperties<"link">) => HTMLLinkElement;
declare const p: (properties?: TurboProperties<"p">) => HTMLParagraphElement;
declare const style: (properties?: TurboProperties<"style">) => HTMLStyleElement & SVGStyleElement;
declare const textarea: (properties?: TurboProperties<"textarea">) => HTMLTextAreaElement;
declare const video: (properties?: TurboProperties<"video">) => HTMLVideoElement;

type HTMLElementNonFunctions<K extends Element = HTMLElement> = {
    [T in keyof K]: K[T] extends Function ? never : T;
}[keyof K];
type HTMLElementMutableFields<K extends Element = HTMLElement> = Omit<Partial<Pick<K, HTMLElementNonFunctions<K>>>, "children" | "className" | "style">;
/**
 * @type {ChildHandler}
 * @description A type that represents all entities that can hold and manage children (an element or a shadow root).
 */
type ChildHandler = Element | ShadowRoot;
/**
 * @type {StylesRoot}
 * @description A type that represents entities that can hold a <style> object (Shadow root or HTML head).
 */
type StylesRoot = ShadowRoot | HTMLHeadElement;
/**
 * @type {ElementTagMap}
 * @description A type that represents a union of HTML, SVG, and MathML tag name maps.
 */
type ElementTagMap = HTMLElementTagNameMap & SVGElementTagNameMap & MathMLElementTagNameMap;
/**
 * @type {ElementTagDefinition}
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {ElementTagMap} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svgManipulation" or "mathML" is provided,
 * the corresponding namespace will be used to create the element. Otherwise, the custom namespace provided will be used.
 */
type ElementTagDefinition<T extends keyof ElementTagMap = "div"> = {
    tag?: T;
    namespace?: string;
};
/**
 * @type {TurboProperties}
 * @description Object containing properties for configuring a TurboWrapper, a TurboElement, or any Element. A tag (and
 * possibly a namespace) can be provided for TurboWrappers or for element creation. TurboElements will ignore these
 * properties if set.
 * Any HTML attribute can be passed as key to be processed by the class/function. A few of these attributes were
 * explicitly defined here for autocompletion in JavaScript. Use TypeScript for optimal autocompletion (with the target
 * generic type, if needed). The type also has the following described custom properties:
 *
 * @property {string} [id] - The ID of the element.
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of
 * space-separated classes or an array of class names).
 * @property {string} [style] - The inline style of the element. Use the css literal function for autocompletion.
 * @property {string} [stylesheet] - The associated stylesheet (if any) with the element. Declaring this property will
 * generate automatically a new style element in the element's corresponding root. Use the css literal function
 * for autocompletion.
 * @property {Record<string, EventListenerOrEventListenerObject | ((e: Event, el: Element) => void)>} [listeners]
 * - An object containing event listeners to be applied to this element.
 * @property {Element | Element[]} [children] - An array of child wrappers or elements to append to
 * the created element.
 * @property {Element} [parent] - The parent element or wrapper to which the created element will be appended.
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
type TurboProperties<T extends keyof ElementTagMap = "div"> = HTMLElementMutableFields<ElementTagMap[T]> & ElementTagDefinition<T> & {
    id?: string;
    classes?: string | string[];
    style?: string;
    stylesheet?: string;
    listeners?: Record<string, EventListenerOrEventListenerObject | ((e: Event, el: Element) => void)>;
    children?: Element | Element[];
    parent?: Element;
    text?: string;
    shadowDOM?: boolean;
    [key: string]: any;
};

/**
 * @description returns a function that generates an HTML element with the provided tag that takes TurboProperties
 * as input.
 * @param {keyof ElementTagMap} tag - The tag to generate the function from.
 * @return The function
 */
declare function generateTagFunction<T extends keyof ElementTagMap>(tag: T): (properties?: TurboProperties<T>) => ElementTagMap[T];

/**
 * @description Create an element with the specified properties. Supports SVG and MathML.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created element.
 */
declare function blindElement<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T];

/**
 * @description Create an element with the specified properties (and the specified namespace if applicable).
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created element.
 */
declare function element<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T];

/**
 * @description Create a flex column element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
declare function flexCol<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T];

/**
 * @description Create a flex column element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
declare function flexColCenter<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T];

/**
 * @description Create a flex row element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
declare function flexRow<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T];

/**
 * @description Create a flex row element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
declare function flexRowCenter<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T];

/**
 * @description Create a spacer element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created spacer element
 */
declare function spacer<T extends keyof ElementTagMap>(properties?: TurboProperties<T>): ElementTagMap[T];

/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string | undefined} styles - The css string. Use the css literal function for autocompletion.
 * @param {StylesRoot} [root] - The root to which the style element will be added.
 */
declare function stylesheet(styles: string | undefined, root?: StylesRoot): void;

declare const MathMLNamespace = "http://www.w3.org/1998/Math/MathML";
declare const MathMLTagsDefinitions: Record<any, any>;
/**
 * @description Evaluates whether the provided string is a MathML tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the MathML namespace or not.
 */
declare function isMathMLTag(tag?: string): boolean;

declare const SvgNamespace = "http://www.w3.org/2000/svg";
declare const SvgTagsDefinitions: Record<any, any>;
/**
 * @description Evaluates whether the provided string is an SVG tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the SVG namespace or not.
 */
declare function isSvgTag(tag?: string): boolean;

/**
 * @description Add children elements to a parent element.
 * @param {Element} [element] - Parent Turbo or HTML DOM element
 * @param {Element | Element[]} [children] - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
declare function addChild(element?: Element, children?: Element | Element[]): Element;

/**
 * @description Add children elements to a parent element.
 * @param {Element} element - Parent Turbo or HTML DOM element
 * @param {Element | Element[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {Element} sibling - Sibling Turbo or HTML DOM element
 * @return The element itself
 */
declare function addChildBefore(element?: Element, children?: Element | Element[], sibling?: Element): Element;

/**
 * @description Remove all children of the given parent element.
 * @param {Element} element - Parent Turbo or HTML DOM element
 * @return The element itself
 */
declare function removeAllChildren(element?: Element): Element;

/**
 * @description Remove children elements from a parent element.
 * @param {Element} element - Parent Turbo or HTML DOM element
 * @param {Element | Element[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
declare function removeChild(element?: Element, children?: Element | Element[]): Element;

/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {Element} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
declare function addClass(element?: Element, classes?: string | string[]): Element;

/**
 * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
 * @param {Element} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
declare function removeClass(element?: Element, classes?: string | string[]): Element;

/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {Element} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 * @return The element itself
 */
declare function toggleClass(element?: Element, classes?: string | string[], force?: boolean): Element;

/**
 * @description Returns the HTML child handler object associated with the provided Turbo compatible entity.
 * @param {Element} element - The element to get the handler object from
 * @return The HTML element or its shadow root (if defined)
 */
declare function childHandler(element: Element): ChildHandler;

declare function closest<T extends Element>(element: Element, type: new (...args: any[]) => T): T | null;

/**
 * @description Retrieves the closest root to the provided element in  the document.
 * @param {Element} [element] - The element from which to start the search.
 * @return The closest root, or the document's head.
 */
declare function closestRoot(element?: Element): StylesRoot;

/**
 * Sets the declared properties to the provided element.
 * @param {Element} element - The element onto which the properties will be applied.
 * @param {TurboProperties} [properties] - The properties object.
 * @param {boolean} [setOnlyBaseProperties="false"] - If set to true, will only set the base turbo properties (classes,
 * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
 * @return The element itself.
 */
declare function setProperties<T extends keyof ElementTagMap = "div">(element: Element, properties?: TurboProperties<T>, setOnlyBaseProperties?: boolean): Element;

/**
 * @description Adds the provided event listener to the element.
 * @param {Element} element - The element to which the event listener should be applied.
 * @param {string} type - The type of the event.
 * @param {EventListenerOrEventListenerObject | (e: Event, el: Element) => void} listener - The function
 * or object that receives a notification. Has (optionally) two parameters: the event, and the element itself.
 * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the
 * event listener.
 * @return The element itself
 */
declare function addListener(element: Element | undefined, type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: Element) => void), options?: boolean | AddEventListenerOptions): Element;

/**
 * @description Defines the element as a custom element with the given name, and processes all observed fields
 * and handles them. Use as class decorator in TypeScript (e.g.: @define("my-class")), and as a regular function call
 * in JavaScript (e.g.: define("my-class")(MyClass)).
 * @param {string} elementName - The name of the custom element.
 * @return Function that takes as parameter "constructor," the class to define.
 */
declare const define: (elementName: string) => (constructor: any) => any;

/**
 * @description Sets the corresponding property as observed, to sync its changes with a corresponding HTML attribute.
 * @param {Object} target
 * @param {string} propertyKey
 */
declare function observe(target: Object, propertyKey: string): void;

/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 */
declare class TurboElement extends HTMLElement {
    private pendingStyles;
    constructor(properties?: TurboProperties);
    attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
    /**
     * @description Static configuration object.
     */
    static readonly config: any;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value: typeof this.config): void;
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
    getClosest<T extends Element>(type: {
        new (...args: any[]): T;
    }): T | null;
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
    private applyStyles;
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
    removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): this;
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

declare class Delegate<T extends (...args: any[]) => any> {
    private callbacks;
    /**
     * @description Adds a callback to the list.
     * @param callback - The callback function to add.
     */
    add(callback: T): void;
    /**
     * @description Removes a callback from the list.
     * @param callback - The callback function to remove.
     * @returns A boolean indicating whether the callback was found and removed.
     */
    remove(callback: T): boolean;
    /**
     * @description Invokes all callbacks with the provided arguments.
     * @param args - The arguments to pass to the callbacks.
     */
    fire(...args: Parameters<T>): void;
    /**
     * @description Clears added callbacks
     */
    clear(): void;
}

declare enum ActionMode {
    none = 0,
    click = 1,
    longPress = 2,
    drag = 3
}
declare enum ClickMode {
    none = 0,
    left = 1,
    right = 2,
    middle = 3,
    other = 4,
    key = 5
}
declare enum InputDevice {
    unknown = 0,
    mouse = 1,
    trackpad = 2,
    touch = 3
}

declare class EventManager {
    private static _instance;
    private _inputDevice;
    readonly onInputDeviceChange: Delegate<(device: InputDevice) => void>;
    private readonly currentKeys;
    private currentAction;
    private currentClick;
    private readonly origins;
    private readonly previousPositions;
    private timer;
    private readonly moveThreshold;
    private readonly longPressDuration;
    constructor();
    private initEvents;
    /**
     * @description The singleton instance.
     */
    static get instance(): EventManager;
    private static set instance(value);
    /**
     * @description The currently identified input device. It is not 100% accurate, especially when differentiating
     * between mouse and trackpad.
     */
    get inputDevice(): InputDevice;
    private set inputDevice(value);
    private keyDown;
    private keyUp;
    private wheel;
    private pointerDown;
    private pointerMove;
    private pointerUp;
    private pointerLeave;
    private fireClick;
    private fireDrag;
    private clickTimer;
    private setTimer;
    private clearTimer;
    private setClickMode;
}

type Coordinate = {
    x: number;
    y: number;
};

declare class Point {
    readonly x: number;
    readonly y: number;
    /**
     * @description Create a point with coordinates (0, 0)
     */
    constructor();
    /**
     * @description Create a point with coordinates (n, n)
     * @param {number} n - The input value
     */
    constructor(n: number);
    /**
     * @description Create a point with coordinates (x, y)
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     */
    constructor(x: number, y: number);
    /**
     * @description Create a point with the provided coordinates
     * @param {Coordinate} p - The coordinates (or Point)
     */
    constructor(p: Coordinate);
    /**
     * @description Create a point with the clientX/clientY values. Useful for events.
     * @param {{clientX: number, clientY: number}} e - The coordinates
     */
    constructor(e: {
        clientX: number;
        clientY: number;
    });
    /**
     * @description Create a point with the provided [x, y] values.
     * @param {[number, number]} arr - The array of size 2.
     */
    constructor(arr: [number, number]);
    /**
     * @description Calculate the distance between two Position2D points.
     * @param {Point} p1 - First point
     * @param {Point} p2 - Second point
     */
    static dist(p1: Coordinate, p2: Coordinate): number;
    /**
     * @description Calculate the mid-point from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static midPoint(...arr: Coordinate[]): Point;
    /**
     * @description Calculate the max on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static max(...arr: Coordinate[]): Point;
    /**
     * @description Calculate the min on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static min(...arr: Coordinate[]): Point;
    /**
     * @description Determine whether this point is equal to the provided coordinates
     * @param {Coordinate} p - The coordinates to compare it to
     * @return A boolean indicating whether they are equal
     */
    equals(p: Coordinate): boolean;
    /**
     * @description Determine whether this point is equal to the provided coordinates
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @return A boolean indicating whether they are equal
     */
    equals(x: number, y: number): boolean;
    /**
     * @description Add coordinates to this point
     * @param {number} n - The value to add to both x and y
     * @returns A new Point object with the result
     */
    add(n: number): Point;
    /**
     * @description Add coordinates to this point
     * @param {number} x - The value to add to the x coordinate
     * @param {number} y - The value to add to the y coordinate
     * @returns A new Point object with the result
     */
    add(x: number, y: number): Point;
    /**
     * @description Add coordinates to this point
     * @param {Coordinate} p - The coordinates to add
     * @returns A new Point object with the result
     */
    add(p: Coordinate): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {number} n - The value to subtract from both x and y
     * @returns A new Point object with the result
     */
    sub(n: number): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {number} x - The value to subtract from the x coordinate
     * @param {number} y - The value to subtract from the y coordinate
     * @returns A new Point object with the result
     */
    sub(x: number, y: number): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {Coordinate} p - The coordinates to subtract
     * @returns A new Point object with the result
     */
    sub(p: Coordinate): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {number} n - The value to multiply both x and y
     * @returns A new Point object with the result
     */
    mul(n: number): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {number} x - The value to multiply the x coordinate
     * @param {number} y - The value to multiply the y coordinate
     * @returns A new Point object with the result
     */
    mul(x: number, y: number): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {Coordinate} p - The coordinates to multiply
     * @returns A new Point object with the result
     */
    mul(p: Coordinate): Point;
    /**
     * @description Divide coordinates of this point
     * @param {number} n - The value to divide both x and y
     * @returns A new Point object with the result
     */
    div(n: number): Point;
    /**
     * @description Divide coordinates of this point
     * @param {number} x - The value to divide the x coordinate
     * @param {number} y - The value to divide the y coordinate
     * @returns A new Point object with the result
     */
    div(x: number, y: number): Point;
    /**
     * @description Divide coordinates of this point
     * @param {Coordinate} p - The coordinates to divide
     * @returns A new Point object with the result
     */
    div(p: Coordinate): Point;
    /**
     * @description Calculate the absolute value of the coordinates
     * @returns A new Point object with the absolute values
     */
    abs(): Point;
    /**
     * @description Get the maximum value between x and y coordinates
     * @returns The maximum value
     */
    max(): number;
    /**
     * @description Get the minimum value between x and y coordinates
     * @returns The minimum value
     */
    min(): number;
    /**
     * @description Create a copy of the current point
     * @returns A new Point object with the same coordinates
     */
    copy(): Point;
    /**
     * @description Get the coordinates as an array
     * @returns An array with x and y coordinates
     */
    arr(): number[];
}

declare class TurboMap<A, B> extends Map<A, B> {
    set(key: A, value: B): any;
    get(key: A): B;
    get first(): B | null;
    get last(): B | null;
    keysArray(): A[];
    valuesArray(): B[];
    private copy;
    mapKeys<C>(callback: (key: A, value: B) => C): TurboMap<C, B>;
    mapValues<C>(callback: (key: A, value: B) => C): TurboMap<A, C>;
    filter(callback: (key: A, value: B) => boolean): TurboMap<A, B>;
    merge(map: Map<A, B>): TurboMap<A, B>;
}

declare enum TurboEventName {
    keyPressed = "turbo-key-pressed",
    keyReleased = "turbo-key-released",
    click = "turbo-click",
    clickStart = "turbo-click-start",
    clickEnd = "turbo-click-end",
    move = "turbo-move",
    dragStart = "turbo-drag-start",
    drag = "turbo-drag",
    dragEnd = "turbo-drag-end",
    trackpadScroll = "turbo-trackpad-scroll",
    trackpadPinch = "turbo-trackpad-pinch",
    mouseWheel = "turbo-mouse-wheel"
}
type PositionsMap = TurboMap<number, Point>;

declare class TurboEvent extends Event {
    readonly clickMode: ClickMode;
    readonly keys: string[];
    readonly firePosition: Point;
    constructor(firePosition: Point, clickMode: ClickMode, keys: string[], eventName: TurboEventName, eventInitDict?: EventInit);
    closest<T extends Element>(type: new (...args: any[]) => T): T | null;
    get target(): Element | Document;
}

declare class TurboDragEvent extends TurboEvent {
    private _origins;
    private _previousPositions;
    private _positions;
    constructor(origins: PositionsMap, previousPositions: PositionsMap, positions: PositionsMap, clickMode: ClickMode, keys: string[], eventName?: TurboEventName, eventInitDict?: EventInit);
    get origins(): PositionsMap;
    private set origins(value);
    get previousPositions(): PositionsMap;
    private set previousPositions(value);
    get positions(): PositionsMap;
    private set positions(value);
}

declare class TurboKeyEvent extends TurboEvent {
    readonly keyPressed: string;
    readonly keyReleased: string;
    constructor(keyPressed: string, keyReleased: string, clickMode: ClickMode, keys: string[], eventName?: TurboEventName, eventInitDict?: EventInit);
}

declare class TurboWheelEvent extends TurboEvent {
    readonly delta: Point;
    constructor(delta: Point, keys: string[], eventName: TurboEventName, eventInitDict?: EventInit);
}

/**
 * @type {TurboButtonProperties}
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboProperties
 *
 * @property {string | Element} [buttonText] - The text content of the button.
 * @property {string | Element} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | Element} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {Element | Element[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {Element | Element[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 * @property {"button" | "submit" | "reset"} [type] - The type of the button (Can be "button", "submit", or "reset").
 * @property {keyof ElementTagMap} [customTextTag] - The HTML tag to be used for the buttonText element (if the latter is passed as
 * a string). If not specified, the default text tag specified in the Button class will be used.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Button
 * to this instance of Button.
 */
type TurboButtonProperties = TurboProperties & {
    buttonText?: string | Element;
    leftIcon?: string | Element;
    rightIcon?: string | Element;
    leftCustomElements?: Element | Element[];
    rightCustomElements?: Element | Element[];
    customTextTag?: keyof ElementTagMap;
    unsetDefaultClasses?: boolean;
};
/**
 * @type {ButtonChildren}
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {Element | Element[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {Element | null} leftIcon - The icon placed on the left side of the button.
 * @property {Element | null} text - The text element of the button.
 * @property {Element | null} rightIcon - The icon placed on the right side of the button.
 * @property {Element | Element[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
 */
type ButtonChildren = {
    leftCustomElements: Element | Element[] | null;
    leftIcon: Element | null;
    buttonText: Element | null;
    rightIcon: Element | null;
    rightCustomElements: Element | Element[] | null;
};
/**
 * @type {TurboButtonConfig}
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {keyof ElementTagMap} [defaultTextTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboButtonConfig = {
    defaultTextTag?: keyof ElementTagMap;
    defaultClasses?: string | string[];
};

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
     * @param {Element | Element[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    private addAtPosition;
    /**
     * @description Removes a given element or elements from the button.
     * @param {Element | Element[] | null} element - The element(s) to remove.
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
    get buttonTextTag(): keyof ElementTagMap;
    set buttonTextTag(value: keyof ElementTagMap | undefined);
    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    get leftCustomElements(): Element | Element[] | null;
    set leftCustomElements(value: Element | Element[] | null);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon(): Element | null;
    set leftIcon(value: string | Element | null);
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get buttonText(): Element | null;
    set buttonText(value: string | Element | null);
    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon(): Element | null;
    set rightIcon(value: string | Element | null);
    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    get rightCustomElements(): Element | Element[] | null;
    set rightCustomElements(value: Element | Element[] | null);
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
 * @class TurboDropdownEntry
 * @description Class representing an entry within a Dropdown.
 * @extends TurboElement
 */
declare class TurboDropdownEntry extends TurboElement {
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
declare function dropdownEntry(properties: TurboDropdownEntryProperties): TurboDropdownEntry;

/**
 * @type {TurboDropdownProperties}
 * @description Properties for configuring a Dropdown.
 * @extends TurboProperties
 *
 * @property {(string | TurboDropdownEntry)[]} values - The values or DropdownEntry instances to be used as dropdown options.
 * @property {string[]} [selectedValues=[]] - Array of values that are initially selected.
 * @property {(string | HTMLElement)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {HTMLElement} [popup] - The element used as a container for the dropdown entries.
 *
 * @property {boolean} [multiSelection=false] - Enables selection of multiple dropdown entries.
 * @property {string} [underlyingInputName] - Name attribute for a hidden input element to store the selected value(s).
 * If not declared, the hidden input will not be created.
 *
 * @property {keyof ElementTagMap} [customSelectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 * @property {keyof ElementTagMap} [customEntryTag] - Custom HTML tag for dropdown entries.  Overrides the
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
    values: (string | TurboDropdownEntry)[];
    selectedValues?: string[];
    selector?: string | HTMLElement;
    popup?: HTMLElement;
    multiSelection?: boolean;
    underlyingInputName?: string;
    customSelectorTag?: keyof ElementTagMap;
    customEntryTag?: keyof ElementTagMap;
    customSelectorClasses?: string;
    customPopupClasses?: string;
    customEntriesClasses?: string;
    customSelectedEntriesClasses?: string;
};
/**
 * @type {TurboDropdownConfig}
 * @description Configuration object for the Dropdown class. Set it via TurboConfig.Dropdown.
 *
 * @property {keyof ElementTagMap} [defaultEntryTag] - The default HTML tag for the creation of generic
 * dropdown entries.
 * @property {keyof ElementTagMap} [defaultSelectorTag] - The default HTML tag for the creation of the text
 * element in generic selectors (which are Buttons).
 *
 * @property {string | string[]} [defaultSelectorClasses] - The default classes to assign to the selector.
 * @property {string | string[]} [defaultPopupClasses] - The default classes to assign to the popup element.
 * @property {string | string[]} [defaultEntriesClasses] - The default classes to assign to the dropdown entries.
 * @property {string | string[]} [defaultSelectedEntriesClasses] - The default classes to assign to the selected
 * dropdown entries.
 */
type TurboDropdownConfig = {
    defaultEntryTag?: keyof ElementTagMap;
    defaultSelectorTag?: keyof ElementTagMap;
    defaultSelectorClasses?: string | string[];
    defaultPopupClasses?: string | string[];
    defaultEntriesClasses?: string | string[];
    defaultSelectedEntriesClasses?: string | string[];
};

/**
 * Dropdown class for creating Turbo button elements.
 * @class TurboDropdown
 * @extends TurboElement
 */
declare class TurboDropdown extends TurboElement {
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
     * @param {string | TurboDropdownEntry} entry - The DropdownEntry (or its string value) to select.
     * @return {TurboDropdown} - This Dropdown for chaining.
     */
    select(entry: string | TurboDropdownEntry): TurboDropdown;
    reset(): void;
    get entries(): TurboDropdownEntry[];
    private set entries(value);
    /**
     * @description The dropdown's currently selected entries
     */
    get selectedEntries(): TurboDropdownEntry[];
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
declare function dropdown(properties: TurboDropdownProperties): TurboDropdown;

/**
 * @type {TurboIconProperties}
 * @description Properties object that extends TurboElementProperties with properties specific to icons.
 * @extends TurboProperties
 *
 * @property {string} icon - The name of the icon.
 * @property {string} [iconColor] - The color of the icon.
 * @property {((svgManipulation: SVGElement) => {})} [onLoaded] - Custom function that takes an SVG element to execute on the
 * SVG icon (if it is one) once it is loaded. This property will be disregarded if the icon is not of type SVG.
 *
 * @property {string} [type] - Custom type of the icon, overrides the default type assigned to
 * TurboIcon.config.type (whose default value is "svgManipulation").
 * @property {string} [directory] - Custom directory to the icon, overrides the default directory assigned to
 * TurboIcon.config.directory.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in
 * TurboIcon.config.defaultClasses to this instance of Icon.
 */
type TurboIconProperties = TurboProperties & {
    type?: string;
    directory?: string;
    icon: string;
    iconColor?: string;
    onLoaded?: ((svg: SVGElement) => {});
    unsetDefaultClasses?: boolean;
};
/**
 * @type {TurboIconConfig}
 * @description Configuration object for the Icon class. Set it via TurboConfig.Icon.
 *
 * @property {string} [type] - The default type to assign to newly created Icons. Defaults to "svgManipulation".
 * @property {string} [[path]] - The default path to the directory containing the icons in the project. Specify the
 * directory once here to not type it again at every Icon generation.
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
    set icon(value: string);
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
    constructor(properties?: TurboPopupProperties);
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
 * @description Converts a string of tags into an Element.
 * @param {string} text - The string to convert
 * @return The Element
 */
declare function textToElement(text: string): Element;

/**
 * @description converts the provided string from camelCase to kebab-case.
 * @param {string} str - The string to convert
 */
declare function camelToKebabCase(str?: string): string;

/**
 * @description Extracts the extension from the given filename or path (e.g.: ".png").
 * @param {string} str - The filename or path
 * @return The extension, or an empty string if not found.
 */
declare function getFileExtension(str?: string): string;

/**
 * @description converts the provided string from kebab-case to camelCase.
 * @param {string} str - The string to convert
 */
declare function kebabToCamelCase(str?: string): string;

/**
 * @description Fetches an SVG from the given path, then executes on it the provided callback
 * @param {string} path - The path to the SVG
 * @param {(svgManipulation: SVGElement) => void} onLoaded - The callback to execute
 */
declare function fetchSvg(path: string, onLoaded: (svg: SVGElement) => void): void;

/**
 * @class SvgCache
 * @description Class representing a cache for SVG files. Use it to not fetch the same SVG file multiple times.
 */
declare class SvgCache {
    /**
     * @description The instance's current cache
     */
    readonly cache: Record<string, SVGElement>;
    /**
     * @description Fetches an SVG from the given path, then executes on it the provided callback, and stores it in
     * the cache.
     * @param {string} path - The path to the SVG
     * @param {(svgManipulation: SVGElement) => void} onLoaded - The callback to execute
     */
    fetchSvg(path: string, onLoaded: (svg: SVGElement) => void): void;
}

/**
 * @description Evaluates the best color out of two provided options to put on top of a base color in terms of contrast
 * (for readability).
 * @param {string} baseColor - The base color in Hex format.
 * @param {string} [overlayColor1="#000000"] - The first overlay color to evaluate in Hex format. Defaults to black.
 * @param {string} [overlayColor2="#FFFFFF"] - The second overlay color to evaluate in Hex format. Defaults to white.
 */
declare function bestOverlayColor(baseColor: string, overlayColor1?: string, overlayColor2?: string): string;

/**
 * @description Computes the contrast between two colors.
 * @param {string} color1 - The first color in Hex format
 * @param {string} color2 - The second color in Hex format
 * @return The contrast value, or NaN if one of the colors provided is not valid.
 */
declare function contrast(color1?: string, color2?: string): number;

/**
 * @description Computes the luminance of a color
 * @param {string} color - The color in Hex format
 * @return The luminance value, or NaN if the color is not valid.
 */
declare function luminance(color?: string): number;

/**
 * @description Constructs a single CSS string from a template literal containing CSS rules.
 */
declare function css(strings: TemplateStringsArray, ...values: any[]): string;

/**
 * @type {FontProperties}
 * @description An object representing a local font, or a family of fonts.
 *
 * @property {string} name - The name of the font. The font's filename should also match.
 * @property {string} pathOrDirectory - The path to the local font file, or the path to the local font family's directory.
 * @property {Record<string, string> | Record<number, Record<string, string>>} [weight] - If loading a single font, a
 * record in the form {weight: style}. Defaults to {"normal": "normal"}. If loading a family, a record in the form
 * {weight: {fontSubName: style}}, such that every font file in the family is named in the form fontName-fontSubName.
 * Defaults to an object containing common sub-names and styles for weights from 100 to 900.
 * @property {string} [format] - The format of the font. Defaults to "woff2".
 * @property {string} [extension] - The extension of the font file(s). Defaults to ".ttf".
 */
type FontProperties = {
    name: string;
    pathOrDirectory: string;
    stylesPerWeights?: Record<string, string> | Record<number, Record<string, string>>;
    format?: string;
    extension?: string;
};

/**
 * @description Loads a local font file, or a family of fonts from a directory.
 * @param {FontProperties} font - The font properties
 */
declare function loadLocalFont(font: FontProperties): void;

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

export { ActionMode, type ButtonChildren, type ChildHandler, ClickMode, type Coordinate, Delegate, type ElementTagMap, EventManager, type FontProperties, InputDevice, MathMLNamespace, MathMLTagsDefinitions, Point, type PositionsMap, type StylesRoot, SvgCache, SvgNamespace, SvgTagsDefinitions, Transition, type TransitionProperties, TurboButton, type TurboButtonConfig, type TurboButtonProperties, TurboDragEvent, TurboDropdown, type TurboDropdownConfig, TurboDropdownEntry, type TurboDropdownEntryProperties, type TurboDropdownProperties, TurboElement, TurboEvent, TurboEventName, TurboIcon, type TurboIconConfig, type TurboIconProperties, TurboKeyEvent, TurboMap, TurboPopup, type TurboPopupProperties, type TurboProperties, TurboWheelEvent, a, addChild, addChildBefore, addClass, addListener, bestOverlayColor, blindElement, button, camelToKebabCase, canvas, childHandler, closest, closestRoot, contrast, css, define, div, dropdown, dropdownEntry, element, fetchSvg, flexCol, flexColCenter, flexRow, flexRowCenter, form, generateTagFunction, getFileExtension, h1, h2, h3, h4, h5, h6, icon, img, input, isMathMLTag, isSvgTag, kebabToCamelCase, link, loadLocalFont, luminance, observe, p, popup, removeAllChildren, removeChild, removeClass, setProperties, spacer, style, stylesheet, textToElement, textarea, toggleClass, video };
