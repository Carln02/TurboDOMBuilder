/**
 * @typedef {Object} TurboCompatible
 * @description A type that encapsulates both HTML elements (and thus TurboElements), and TurboWrappers.
 */

/**
 * @typedef {Object} TurboProperties
 * @description Object containing properties for configuring a TurboWrapper or a TurboElement. Any HTML attribute can
 * be passed as key to be processed by the class/function. A few of these attributes were explicitly defined here
 * for autocompletion in JavaScript. Use TypeScript for optimal autocompletion (with the target generic type, if
 * needed). The type also has the following described custom properties:
 *
 * @property {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | keyof MathMLElementTagNameMap} [tag="div"] -
 * For TurboWrapper only. The HTML tag of the element (e.g., "div", "span", "input").
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
 * @property {boolean} [useProxy] - For TurboWrapper only. A boolean that indicates whether to use a proxy for
 * TurboWrappers or not. If set to true, every function called from the TurboWrapper instance will return a proxy
 * which, if trying to access a property or function non-existent on TurboWrapper, will try to delegate it to the
 * underlying HTML element. This proxy might lead to a small additional performance overhead.
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

/**
 * @typedef {Object} TurboButtonProperties
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
 * @property {keyof HTMLElementTagNameMap} [customTextTag] - The HTML tag to be used for the text element. If not
 * specified, the default tag specified in the Button class will be used.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Button
 * to this instance of Button.
 */

/**
 * @typedef {Object} ButtonChildren
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

/**
 * @typedef {Object} TurboButtonConfig
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {keyof HTMLElementTagNameMap} [defaultTextTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */

/**
 * @typedef {Object} TurboDropdownEntryProperties
 * @description Properties for configuring a DropdownEntry.
 * @extends TurboProperties
 *
 * @property {string} value - The value associated with the dropdown entry.
 * @property {boolean} [selected=false] - Indicates whether the entry is initially selected.
 * @property {string | string[]} [selectedClass=""] - CSS class(es) applied to the entry when it is selected.
 */

/**
 * @typedef {Object} TurboDropdownProperties
 * @description Properties for configuring a Dropdown.
 * @extends TurboProperties
 *
 * @property {(string | DropdownEntry)[]} values - The values or DropdownEntry instances to be used as dropdown options.
 * @property {string[]} [selectedValues=[]] - Array of values that are initially selected.
 * @property {(string | TurboCompatible)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {TurboCompatible} [popup] - The element used as a container for the dropdown entries.
 *
 * @property {boolean} [multiSelection=false] - Enables selection of multiple dropdown entries.
 * @property {string} [underlyingInputName] - Name attribute for a hidden input element to store the selected value(s).
 * If not declared, the hidden input will not be created.
 *
 * @property {keyof HTMLElementTagNameMap} [customSelectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 * @property {keyof HTMLElementTagNameMap} [customEntryTag] - Custom HTML tag for dropdown entries.  Overrides the
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

/**
 * @typedef {Object} TurboDropdownConfig
 * @description Configuration object for the Dropdown class. Set it via TurboConfig.Dropdown.
 *
 * @property {keyof HTMLElementTagNameMap} [defaultEntryTag] - The default HTML tag for the creation of generic
 * dropdown entries.
 * @property {keyof HTMLElementTagNameMap} [defaultSelectorTag] - The default HTML tag for the creation of the text
 * element in generic selectors (which are Buttons).
 *
 * @property {string | string[]} [defaultSelectorClasses] - The default classes to assign to the selector.
 * @property {string | string[]} [defaultPopupClasses] - The default classes to assign to the popup element.
 * @property {string | string[]} [defaultEntriesClasses] - The default classes to assign to the dropdown entries.
 * @property {string | string[]} [defaultSelectedEntriesClasses] - The default classes to assign to the selected
 * dropdown entries.
 */

/**
 * @typedef {Object} TurboIconProperties
 * @description Properties object that extends TurboElementProperties with properties specific to icons.
 * @extends TurboProperties
 *
 * @property {string} icon - The name of the icon.
 * @property {string} [iconColor] - The color of the icon.
 * @property {((svg: SVGElement) => {})} [executeOnLoad] - Custom function that takes an SVG element to execute on the
 * SVG icon (if it is one) once it is loaded. This property will be disregarded if the icon is not of type SVG.
 *
 * @property {string} [customType] - Custom type of the icon, overrides the default type assigned to Icon.type
 * (whose default value is "svg").
 * @property {string} [customPath] - Custom path to the icon, overrides the default path assigned to Icon.path.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Icon
 * to this instance of Icon.
 */

/**
 * @typedef {Object} TurboIconConfig
 * @description Configuration object for the Icon class. Set it via TurboConfig.Icon.
 *
 * @property {string} [type] - The default type to assign to newly created Icons. Defaults to "svg".
 * @property {string} [[path]] - The default path to the directory containing the icons in the project. Specify the
 * directory once here to not type it again at every Icon generation.
 * @property {string} [customType] - Custom type of the icon, overrides the default type assigned to Icon.type.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created icons.
 */

/**
 * @typedef {Object} TurboIconButtonConfig
 * @description Configuration object for the IconButton class. Set it via TurboConfig.IconButton. Note that all Icon
 * configs are also applied to the IconButton class.
 *
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created icons.
 */

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = exports.Icon = exports.DropdownEntry = exports.Dropdown = exports.Button = exports.input = exports.TurboInput = exports.image = exports.TurboImage = exports.div = exports.TurboDiv = exports.flexColCenter = exports.flexRowCenter = exports.flexCol = exports.flexRow = exports.spacer = exports.element = exports.TurboWrapper = exports.TurboElement = exports.Turbo = exports.addStylesheet = exports.css = exports.addListener = exports.addBefore = exports.removeChild = exports.addChild = exports.toggleClass = exports.removeClass = exports.addClass = exports.setProperties = exports.TurboConfig = void 0;
/**
 * @class {TurboConfig}
 * @description Static configuration class for TurboDOMBuilder.
 */
class TurboConfig {
}
exports.TurboConfig = TurboConfig;
TurboConfig.shadowDOM = false;
TurboConfig.useProxy = true;
TurboConfig.useWrapper = true;
/**
 * Sets the declared properties to the provided element.
 * @param {TurboCompatible} element - The element onto which the properties will be applied.
 * @param {TurboProperties} [properties] - The properties object.
 */
function setProperties(element, properties = {}) {
    Object.keys(properties).forEach(property => {
        switch (property) {
            case "tag" || "shadowDOM":
                return;
            case "text":
                if (!properties.text)
                    return;
                if (element instanceof TurboWrapper)
                    element.element.innerText = properties.text;
                else
                    element.innerText = properties.text;
                return;
            case "style":
                if (element instanceof TurboWrapper)
                    element.element.style.cssText += properties.style;
                else
                    element.style.cssText += properties.style;
                return;
            case "stylesheet":
                if (!properties.stylesheet)
                    return;
                addStylesheet(properties.stylesheet, "root" in element ? element.root : document.head);
                return;
            case "classes":
                addClass(element, properties.classes);
                return;
            case "listeners":
                if (!properties.listeners)
                    return;
                Object.keys(properties.listeners).forEach(listenerType => addListener(element, listenerType, properties.listeners[listenerType]));
                return;
            case "children":
                addChild(element, properties.children);
                return;
            case "parent":
                if (!properties.parent)
                    return;
                addChild(properties.parent, element);
                return;
            case "useProxy":
                if (!properties.useProxy)
                    return;
                if ("useProxy" in element)
                    element.useProxy = properties.useProxy;
                return;
            default:
                element.setAttribute(property, properties[property]);
                return;
        }
    });
}
exports.setProperties = setProperties;
/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboCompatible} element - Turbo wrapper or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
function addClass(element, classes) {
    if (!classes)
        return;
    //Extract HTML element
    let el = element instanceof TurboWrapper ? element.element : element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.forEach(entry => el.classList.add(entry));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
exports.addClass = addClass;
/**
 * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboCompatible} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
function removeClass(element, classes) {
    if (!classes)
        return;
    //Extract HTML element
    let el = element instanceof TurboWrapper ? element.element : element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.forEach(entry => el.classList.remove(entry));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
exports.removeClass = removeClass;
/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboCompatible} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 */
function toggleClass(element, classes, force) {
    if (!classes)
        return;
    //Extract HTML element
    let el = element instanceof TurboWrapper ? element.element : element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.forEach(entry => {
            if (force == undefined)
                el.classList.toggle(entry);
            else
                el.classList.toggle(entry);
        });
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
exports.toggleClass = toggleClass;
/**
 * @description Add children elements to a parent element.
 * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
 * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
function addChild(element, children) {
    if (!children)
        return;
    //Extract HTML element
    let el = element instanceof TurboWrapper ? element.element : element;
    //Try to append every provided child (according to its type)
    try {
        if (children instanceof TurboWrapper)
            el.appendChild(children.element);
        else if (children instanceof HTMLElement)
            el.appendChild(children);
        else
            children.forEach((child) => el.appendChild(child instanceof TurboWrapper ? child.element : child));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
exports.addChild = addChild;
/**
 * @description Remove children elements from a parent element.
 * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
 * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
function removeChild(element, children) {
    if (!children)
        return;
    //Extract HTML element
    let el = element instanceof TurboWrapper ? element.element : element;
    //Try to remove every provided child (according to its type)
    try {
        if (children instanceof TurboWrapper)
            el.removeChild(children.element);
        else if (children instanceof HTMLElement)
            el.removeChild(children);
        else
            children.forEach(child => el.removeChild(child instanceof TurboWrapper ? child.element : child));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
exports.removeChild = removeChild;
/**
 * @description Add children elements to a parent element.
 * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
 * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {TurboCompatible} sibling - Sibling Turbo or HTML DOM element
 */
function addBefore(element, children, sibling) {
    if (!children)
        return;
    //Extract HTML element
    let el = element instanceof TurboWrapper ? element.element : element;
    //Extract HTML sibling element
    let siblingEl = sibling instanceof TurboWrapper ? sibling.element : sibling;
    //Try to append every provided child (according to its type)
    try {
        if (children instanceof TurboWrapper)
            el.insertBefore(children.element, siblingEl);
        else if (children instanceof HTMLElement)
            el.insertBefore(children, siblingEl);
        else
            children.forEach((child) => el.insertBefore(child instanceof TurboWrapper ? child.element : child, siblingEl));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}
exports.addBefore = addBefore;
/**
 * @description Adds the provided event listener to the element.
 * @param {TurboCompatible} element - The element to which the event listener should be applied.
 * @param {string} type - The type of the event.
 * @param {EventListenerOrEventListenerObject | (e: Event, el: TurboCompatible) => void} listener - The function
 * or object that receives a notification. Has (optionally) two parameters: the event, and the element itself.
 * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
 */
function addListener(element, type, listener, options) {
    if (element instanceof TurboWrapper)
        element = element.element;
    const wrappedListener = (e) => {
        if (typeof listener === "function")
            listener(e, element);
        else if (typeof listener === "object" && listener.handleEvent)
            listener.handleEvent(e);
    };
    element.addEventListener(type, wrappedListener, options);
}
exports.addListener = addListener;
/**
 * @description Constructs a single CSS string from a template literal containing CSS rules.
 */
function css(strings, ...values) {
    let str = "";
    strings.forEach((string, i) => {
        str += string + (values[i] || '');
    });
    return str;
}
exports.css = css;
/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string} styles - The css string. Use the css literal function for autocompletion.
 * @param {HTMLHeadElement | ShadowRoot} [root] - The root to which the style element will be added.
 */
function addStylesheet(styles, root = document.head) {
    const stylesheet = document.createElement("style");
    stylesheet.innerHTML = styles;
    root.appendChild(stylesheet);
}
exports.addStylesheet = addStylesheet;
/**
 * @description Factory method that takes a class extending HTMLElement and returns a TurboBase class that extends the
 * provided HTML element with a few powerful tools and functions.
 */
function Turbo(Base) {
    var _a;
    //@ts-ignore
    return _a = class TurboBase extends Base {
            constructor(...args) {
                super(...args);
                this.root = document.head;
                const properties = args[0] || {};
                if (properties.shadowDOM)
                    this.root = this.attachShadow({ mode: "open" });
                this.setProperties(properties);
            }
            /**
             * @description Update the class's static configurations. Will only overwrite the set properties.
             * @property {typeof this.config} value - The object containing the new configurations.
             */
            static configure(value) {
                Object.entries(value).forEach(([key, val]) => {
                    if (val !== undefined)
                        this.config[key] = val;
                });
            }
            //Custom functions
            setProperties(properties) {
                setProperties(this, properties);
                return this;
            }
            addClass(classes) {
                addClass(this, classes);
                return this;
            }
            removeClass(classes) {
                removeClass(this, classes);
                return this;
            }
            toggleClass(classes, force) {
                toggleClass(this, classes, force);
                return this;
            }
            addChild(children) {
                addChild(this, children);
                return this;
            }
            remChild(children) {
                removeChild(this, children);
                return this;
            }
            addBefore(children, sibling) {
                addBefore(this, children, sibling);
                return this;
            }
            setStyle(attribute, value) {
                this.style[attribute] = value;
                return this;
            }
            setStyles(cssText) {
                this.style.cssText += cssText;
                return this;
            }
            //Method Chaining Declarations
            addListener(type, listener, options) {
                addListener(this, type, listener, options);
                return this;
            }
            removeListener(type, listener, options) {
                this.removeEventListener(type, listener, options);
                return this;
            }
            execute(callback) {
                callback(this);
                return this;
            }
            setAttribute(name, value) {
                if (value == undefined)
                    value = true;
                super.setAttribute(name, value.toString());
                return this;
            }
            removeAttribute(name) {
                super.removeAttribute(name);
                return this;
            }
            blur() {
                super.blur();
                return this;
            }
            focus() {
                super.focus();
                return this;
            }
            remove() {
                super.remove();
                return this;
            }
        },
        //Config
        /**
         * @description Static configuration object.
         */
        _a.config = {},
        _a;
}
exports.Turbo = Turbo;
/**
 * @class TurboElement
 * @extends HTMLElement
 * @implements ITurbo
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 */
class TurboElement extends Turbo(HTMLElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
exports.TurboElement = TurboElement;
/**
 * @class TurboWrapper
 * @description A Turbo wrapper class, wrapping an HTML elements and providing all the Turbo functionalities.
 */
class TurboWrapper {
    /**
     * @description Create a new Turbo element with the given properties.
     * @param {T extends HTMLElement | TurboElementProperties} properties - Object containing properties for
     * configuring a TurboElement, or the HTML element to create the TurboElement from.
     */
    constructor(properties = {}) {
        /**
         * @description Whether or not this wrapper uses its proxy.
         */
        this.useProxy = true;
        this.root = document.head;
        if (properties instanceof HTMLElement) {
            this.element = properties;
        }
        else {
            this.element = document.createElement(properties.tag || "div");
            if (properties.shadowDOM)
                this.root = this.element.attachShadow({ mode: "open" });
            this.setProperties(properties);
        }
        return this.useProxy ? this.proxy() : this;
    }
    /**
     * @description Generates a proxy for this element. When trying to access a property that does not exist on the
     * TurboWrapper, the proxy will automatically try to access it on the underlying HTML element
     * @returns The proxy
     */
    proxy() {
        return new Proxy(this, {
            get: (target, prop, receiver) => {
                //Check if the property exists directly on the TurboElement instance
                if (prop in target) {
                    const value = target[prop];
                    return typeof value === "function" ? value.bind(target) : value;
                }
                //If the property is not part of TurboElement, attempt to access it on the underlying HTMLElement
                const elementProp = target.element[prop];
                if (elementProp !== undefined) {
                    return typeof elementProp === "function" ? elementProp.bind(target.element) : elementProp;
                }
                //Default behavior
                return Reflect.get(target.element, prop, receiver);
            },
            set: (target, prop, value) => {
                //If trying to set a property that exists on the TurboElement, set it there
                if (prop in target) {
                    target[prop] = value;
                    return true;
                }
                //Otherwise, set the property on the underlying HTMLElement
                target.element[prop] = value;
                return true;
            }
        });
    }
    //Custom functions
    setProperties(properties) {
        setProperties(this, properties);
        return this.useProxy ? this.proxy() : this;
    }
    addClass(classes) {
        addClass(this.element, classes);
        return this.useProxy ? this.proxy() : this;
    }
    removeClass(classes) {
        removeClass(this.element, classes);
        return this.useProxy ? this.proxy() : this;
    }
    toggleClass(classes, force) {
        toggleClass(this.element, classes, force);
        return this.useProxy ? this.proxy() : this;
    }
    addChild(children) {
        addChild(this.element, children);
        return this.useProxy ? this.proxy() : this;
    }
    remChild(children) {
        removeChild(this.element, children);
        return this.useProxy ? this.proxy() : this;
    }
    addBefore(children, sibling) {
        addBefore(this.element, children, sibling);
        return this.useProxy ? this.proxy() : this;
    }
    setStyle(attribute, value) {
        this.element.style[attribute] = value;
        return this.useProxy ? this.proxy() : this;
    }
    setStyles(cssText) {
        this.element.style.cssText += cssText;
        return this.useProxy ? this.proxy() : this;
    }
    //Method Chaining Declarations
    addListener(type, listener, options) {
        addListener(this.element, type, listener, options);
        return this.useProxy ? this.proxy() : this;
    }
    removeListener(type, listener, options) {
        this.element.removeEventListener(type, listener, options);
        return this.useProxy ? this.proxy() : this;
    }
    execute(callback) {
        callback(this.proxy());
        return this.useProxy ? this.proxy() : this;
    }
    setAttribute(name, value) {
        if (value == undefined)
            value = true;
        this.element.setAttribute(name, value.toString());
        return this.useProxy ? this.proxy() : this;
    }
    removeAttribute(name) {
        this.element.removeAttribute(name);
        return this.useProxy ? this.proxy() : this;
    }
    blur() {
        this.element.blur();
        return this.useProxy ? this.proxy() : this;
    }
    focus() {
        this.element.focus();
        return this.useProxy ? this.proxy() : this;
    }
    remove() {
        this.element.remove();
        return this.useProxy ? this.proxy() : this;
    }
}
exports.TurboWrapper = TurboWrapper;
/**
 * @description Create an HTML element with specified properties.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created element.
 */
function element(properties = {}) {
    if (!properties.tag)
        properties.tag = "div";
    switch (properties.tag) {
        case "div" || "turbo-div":
            return new TurboDiv(properties);
        case "img" || "turbo-img":
            return new TurboImage(properties);
        case "input" || "turbo-input":
            return new TurboInput(properties);
        default:
            return new TurboWrapper(properties);
    }
}
exports.element = element;
/**
 * @description Create a spacer element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created spacer element
 */
function spacer(properties) {
    return element(properties).setStyle("flexGrow", "1");
}
exports.spacer = spacer;
/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created flex element
 */
function flexRow(properties) {
    return element(properties)
        .setStyle("display", "flex")
        .setStyle("flexDirection", "row");
}
exports.flexRow = flexRow;
/**
 * @description Create a flex column element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created flex element
 */
function flexCol(properties) {
    return element(properties)
        .setStyle("display", "flex")
        .setStyle("flexDirection", "column");
}
exports.flexCol = flexCol;
/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created flex element
 */
function flexRowCenter(properties) {
    return flexRow(properties)
        .setStyle("justifyContent", "center")
        .setStyle("alignItems", "center");
}
exports.flexRowCenter = flexRowCenter;
/**
 * @description Create a flex column element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created flex element
 */
function flexColCenter(properties) {
    return flexCol(properties)
        .setStyle("justifyContent", "center")
        .setStyle("alignItems", "center");
}
exports.flexColCenter = flexColCenter;
/**
 * @class TurboDiv
 * @extends HTMLDivElement
 * @implements ITurbo
 * @description Div TurboElement class, extending the base HTML Div element with a few powerful tools and functions.
 */
class TurboDiv extends Turbo(HTMLDivElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
exports.TurboDiv = TurboDiv;
customElements.define("turbo-div", TurboDiv, { extends: "div" });
/**
 * @description Creates a div TurboElement with the given properties.
 * @param {TurboProperties<HTMLDivElement>} [properties] - The properties object.
 * @returns The Turbo div element.
 */
function div(properties = {}) {
    return new TurboDiv(properties);
}
exports.div = div;
/**
 * @class TurboImage
 * @extends HTMLImageElement
 * @implements ITurbo
 * @description Image TurboElement class, extending the base HTML Image element with a few powerful tools and functions.
 */
class TurboImage extends Turbo(HTMLImageElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
exports.TurboImage = TurboImage;
customElements.define("turbo-img", TurboImage, { extends: "img" });
/**
 * @description Creates an image TurboElement with the given properties.
 * @param {TurboProperties<HTMLImageElement>} [properties] - The properties object.
 * @returns The Turbo image element.
 */
function image(properties = {}) {
    return new TurboImage(properties);
}
exports.image = image;
/**
 * @class TurboInput
 * @extends HTMLInputElement
 * @implements ITurbo
 * @description Input TurboElement class, extending the base HTML Input element with a few powerful tools and functions.
 */
class TurboInput extends Turbo(HTMLInputElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
exports.TurboInput = TurboInput;
customElements.define("turbo-input", TurboInput, { extends: "input" });
/**
 * @description Creates an input TurboElement with the given properties.
 * @param {TurboProperties<HTMLInputElement>} [properties] - The properties object.
 * @returns The Turbo input element.
 */
function input(properties = {}) {
    return new TurboInput(properties);
}
exports.input = input;
/**
 * Button class for creating Turbo button elements.
 * @class Button
 * @extends TurboElement
 */
class Button extends Turbo(HTMLButtonElement) {
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties) {
        properties.tag = "button";
        super(properties);
        this._elements = {
            leftCustomElements: null,
            leftIcon: null,
            buttonText: null,
            rightIcon: null,
            rightCustomElements: null,
        };
        this.elements = {
            leftCustomElements: null,
            leftIcon: null,
            buttonText: null,
            rightIcon: null,
            rightCustomElements: null,
        };
        this.textTag = properties.customTextTag ? properties.customTextTag
            : Button.config.defaultTextTag ? Button.config.defaultTextTag : "h4";
        if (!properties.unsetDefaultClasses)
            this.addClass(Button.config.defaultClasses);
        if (properties.leftCustomElements)
            this.leftCustomElements = properties.leftCustomElements;
        if (properties.leftIcon)
            this.leftIcon = properties.leftIcon;
        if (properties.buttonText)
            this.buttonText = properties.buttonText;
        if (properties.rightIcon)
            this.rightIcon = properties.rightIcon;
        if (properties.rightCustomElements)
            this.rightCustomElements = properties.rightCustomElements;
    }
    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {TurboCompatible | TurboCompatible[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    addAtPosition(element, type) {
        let nextSiblingIndex = 0;
        for (let key in this.elements) {
            if (key == type)
                break;
            if (this.elements[key])
                nextSiblingIndex++;
        }
        let nextSibling = this.children[nextSiblingIndex];
        if (element) {
            if (nextSibling)
                this.addBefore(element, nextSibling);
            else
                this.addChild(element);
        }
    }
    /**
     * @description Removes a given element or elements from the button.
     * @param {TurboCompatible | TurboCompatible[] | null} element - The element(s) to remove.
     */
    removeElement(element) {
        if (!element)
            return;
        if (element) {
            if (element instanceof HTMLElement)
                element.remove();
            else if (element instanceof TurboWrapper)
                element.remove();
            else
                element.forEach(el => {
                    if (el instanceof TurboWrapper)
                        el.element.remove();
                    else
                        el.remove();
                });
        }
    }
    // Getters and setters
    /**
     * @description Object containing the button's children.
     */
    get elements() {
        return this._elements;
    }
    set elements(value) {
        this._elements = value;
    }
    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    get leftCustomElements() {
        return this.elements.leftCustomElements;
    }
    set leftCustomElements(value) {
        this.addAtPosition(value, "leftCustomElements");
        this.removeElement(this.leftCustomElements);
        this.elements.leftCustomElements = value;
    }
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon() {
        return this.elements.leftIcon;
    }
    set leftIcon(value) {
        if (typeof value == "string")
            value = new Icon({ icon: value });
        this.addAtPosition(value, "leftIcon");
        this.removeElement(this.leftIcon);
        this.elements.leftIcon = value;
    }
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get buttonText() {
        return this.elements.buttonText;
    }
    set buttonText(value) {
        if (typeof value == "string") {
            if (value && this.buttonText) {
                this.buttonText.innerText = value;
                return;
            }
            value = element({ tag: this.textTag, text: value });
        }
        this.addAtPosition(value, "buttonText");
        this.removeElement(this.buttonText);
        this.elements.buttonText = value;
    }
    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon() {
        return this.elements.rightIcon;
    }
    set rightIcon(value) {
        if (typeof value == "string")
            value = new Icon({ icon: value });
        this.addAtPosition(value, "rightIcon");
        this.removeElement(this.rightIcon);
        this.elements.rightIcon = value;
    }
    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    get rightCustomElements() {
        return this.elements.rightCustomElements;
    }
    set rightCustomElements(value) {
        this.addAtPosition(value, "rightCustomElements");
        this.removeElement(this.rightCustomElements);
        this.elements.rightCustomElements = value;
    }
}
exports.Button = Button;
Button.config = { defaultTextTag: "h4" };
customElements.define("turbo-button", Button, { extends: "button" });
/**
 * Dropdown class for creating Turbo button elements.
 * @class Dropdown
 * @extends TurboElement
 */
class Dropdown extends TurboElement {
    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties) {
        super(properties);
        this.multiSelection = false;
        if (properties.multiSelection)
            this.multiSelection = properties.multiSelection;
        if (properties.underlyingInputName)
            this.underlyingInput = input({ type: "hidden", name: properties.underlyingInputName });
        this.selector = (properties.selector && typeof properties.selector != "string") ? properties.selector
            : new Button({
                buttonText: properties.selector, customTextTag: properties.customSelectorTag
                    ? properties.customSelectorTag : Dropdown.config.defaultSelectorTag
            });
        this.addChild(this.selector);
        addClass(this.selector, properties.customSelectorClasses ? properties.customSelectorClasses
            : Dropdown.config.defaultSelectorClasses);
        this.popup = properties.popup ? properties.popup : element({});
        this.addChild(this.popup);
        addClass(this.popup, properties.customPopupClasses ? properties.customPopupClasses
            : Dropdown.config.defaultPopupClasses);
        if (!properties.selectedValues)
            properties.selectedValues = [];
        this.entries = properties.values.map(entry => {
            var _a;
            if (typeof entry == "string")
                entry = new DropdownEntry({ value: entry,
                    tag: properties.customEntryTag ? properties.customEntryTag : Dropdown.config.defaultEntryTag });
            entry.addClass(properties.customEntriesClasses ? properties.customEntriesClasses
                : Dropdown.config.defaultEntriesClasses);
            entry.selectedClass += " " + (properties.customSelectedEntriesClasses
                ? properties.customSelectedEntriesClasses : Dropdown.config.defaultSelectedEntriesClasses);
            addChild(this.popup, entry);
            if ((_a = properties.selectedValues) === null || _a === void 0 ? void 0 : _a.includes(entry.value))
                this.select(entry);
            return entry;
        });
    }
    /**
     * @description Select an entry.
     * @param {string | DropdownEntry} entry - The DropdownEntry (or its string value) to select.
     * @return {Dropdown} - This Dropdown for chaining.
     */
    select(entry) {
        if (typeof entry == "string") {
            let el = this.entries.find(el => el.value == entry);
            if (!el)
                return this;
            entry = el;
        }
        if (!this.multiSelection)
            this.selectedEntries.forEach(entry => entry.toggle());
        entry.toggle();
        this.updateSelectorText();
        this.dispatchEvent(new CustomEvent("change", {
            detail: { selectedValues: this.selectedValues }
        }));
        return this;
    }
    /**
     * @description The dropdown's currently selected entries
     */
    get selectedEntries() {
        return this.entries.filter(entry => entry.selected);
    }
    /**
     * @description The dropdown's currently selected values
     */
    get selectedValues() {
        return this.selectedEntries.map(entry => entry.value);
    }
    updateSelectorText() {
        let newValue = this.selectedValues.join(", ");
        if (this.underlyingInput)
            this.underlyingInput.value = newValue;
        if (this.selector instanceof Button)
            this.selector.buttonText = newValue;
    }
}
exports.Dropdown = Dropdown;
Dropdown.config = { defaultEntryTag: "h4", defaultSelectorTag: "h4" };
/**
 * @class DropdownEntry
 * @description Class representing an entry within a Dropdown.
 * @extends TurboElement
 */
class DropdownEntry extends TurboElement {
    /**
     * @description DropdownEntry constructor
     * @param {TurboDropdownEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties) {
        super(properties);
        this._selected = false;
        this._selectedClass = "";
        //TODO maybe switch to setter
        this._value = properties.value;
        if (properties.selectedClass)
            this.selectedClass = properties.selectedClass;
        if (properties.selected)
            this.selected = properties.selected;
    }
    /**
     * @description Toggles the selection of this dropdown entry
     */
    toggle() {
        this.selected = !this.selected;
    }
    /**
     * @description The value of the dropdown entry
     */
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    /**
     * @description Whether or not the dropdown entry is selected
     */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.toggleClass(this.selectedClass, value);
    }
    /**
     * @description The class(es) assigned to the dropdown entry when it is selected
     */
    get selectedClass() {
        return this._selectedClass;
    }
    set selectedClass(value) {
        this._selectedClass = value;
    }
}
exports.DropdownEntry = DropdownEntry;
customElements.define("turbo-dropdown", Dropdown);
customElements.define("turbo-dropdown-entry", DropdownEntry);
/**
 * Icon class for creating icon elements.
 * @class Icon
 * @extends TurboElement
 */
class Icon extends TurboElement {
    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties) {
        let type = properties.customType ? properties.customType : Icon.config.type ? Icon.config.type : "svg";
        let path = (properties.customPath ? properties.customPath : Icon.config.path ? Icon.config.path : "")
            + properties.icon + (properties.icon.endsWith("." + type) || type.length == 0 ? "" : "." + type);
        if (type != "svg") {
            properties.tag = "img";
            properties.src = path;
            if (!properties.alt)
                properties.alt = properties.icon;
        }
        super(properties);
        this._iconColor = null;
        if (!properties.unsetDefaultClasses)
            this.addClass(Icon.config.defaultClasses);
        this._icon = properties.icon;
        if (properties.iconColor)
            this.iconColor = properties.iconColor;
        if (type == "svg") {
            fetch(path)
                .then(response => {
                if (!response.ok)
                    throw new Error("Network response was not ok while loading your SVG");
                return response.text();
            })
                .then(svgText => {
                this.innerHTML = svgText;
                this._svg = this.querySelector("svg");
                if (this._svg) {
                    if (this.iconColor)
                        this._svg.style.fill = this.iconColor;
                    if (properties.executeOnLoad)
                        properties.executeOnLoad(this._svg);
                }
            })
                .catch(error => console.error("Error fetching SVG:", error));
        }
    }
    /**
     * @description The name of the icon.
     */
    get icon() {
        return this._icon;
    }
    /**
     * @description The assigned color to the icon (if any)
     */
    get iconColor() {
        return this._iconColor;
    }
    set iconColor(value) {
        this._iconColor = value;
        if (this.svg && value)
            this.svg.style.fill = value;
    }
    /**
     * @description The underlying SVG element (if any).
     */
    get svg() {
        return this._svg;
    }
}
exports.Icon = Icon;
Icon.config = { type: "svg", path: "" };
/**
 * Class for creating icon buttons.
 * @class IconButton
 * @extends Icon
 */
class IconButton extends Icon {
    /**
     * Creates an instance of IconButton.
     * @param {TurboIconProperties} properties - Properties to configure the button and its icon.
     */
    constructor(properties) {
        super(properties);
        if (!properties.unsetDefaultClasses)
            this.addClass(IconButton.config.defaultClasses);
    }
}
exports.IconButton = IconButton;
IconButton.config = {};
customElements.define("turbo-icon", Icon);
customElements.define("turbo-icon-button", IconButton);
