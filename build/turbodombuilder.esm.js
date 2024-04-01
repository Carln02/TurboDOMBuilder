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
 * @property {Record<string, EventListenerOrEventListenerObject | ((e: Event, el: HTMLElement) => void)>} [listeners]
 * - An object containing event listeners to be applied to this element.
 * @property {HTMLElement | HTMLElement[]} [children] - An array of child wrappers or elements to append to
 * the created element.
 * @property {HTMLElement} [parent] - The parent element or wrapper to which the created element will be appended.
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

/**
 * @typedef {Object} TurboButtonProperties
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboProperties
 *
 * @property {string | HTMLElement} [buttonText] - The text content of the button.
 * @property {string | HTMLElement} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | HTMLElement} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {HTMLElement | HTMLElement[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {HTMLElement | HTMLElement[]} [rightCustomElements] - Custom elements
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
 * @property {HTMLElement | HTMLElement[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {HTMLElement | null} leftIcon - The icon placed on the left side of the button.
 * @property {HTMLElement | null} text - The text element of the button.
 * @property {HTMLElement | null} rightIcon - The icon placed on the right side of the button.
 * @property {HTMLElement | HTMLElement[] | null} rightCustomElements - Elements placed
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
 * @property {(string | HTMLElement)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {HTMLElement} [popup] - The element used as a container for the dropdown entries.
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

/**
 * @typedef {Object} TransitionProperties
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

/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string | undefined} styles - The css string. Use the css literal function for autocompletion.
 * @param {HTMLHeadElement | ShadowRoot} [root] - The root to which the style element will be added.
 */
function addStylesheet(styles, root = document.head) {
    if (!styles)
        return;
    const stylesheet = document.createElement("style");
    stylesheet.innerHTML = styles;
    root.appendChild(stylesheet);
    console.log("HI");
}

/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {HTMLElement} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
function addClass(element, classes) {
    if (!classes)
        return element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.filter(entry => entry.trim().length > 0).forEach(entry => element.classList.add(entry));
    }
    catch (e) {
        console.error(e);
        return element;
    }
    return element;
}

/**
 * @description Adds the provided event listener to the element.
 * @param {HTMLElement} element - The element to which the event listener should be applied.
 * @param {string} type - The type of the event.
 * @param {EventListenerOrEventListenerObject | (e: Event, el: HTMLElement) => void} listener - The function
 * or object that receives a notification. Has (optionally) two parameters: the event, and the element itself.
 * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the
 * event listener.
 * @return The element itself
 */
function addListener(element, type, listener, options) {
    const wrappedListener = (e) => {
        if (typeof listener === "function")
            listener(e, element);
        else if (typeof listener === "object" && listener.handleEvent)
            listener.handleEvent(e);
    };
    element.addEventListener(type, wrappedListener, options);
    return element;
}

/**
 * @description Add children elements to a parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
function addChild(element, children) {
    if (!children)
        return element;
    //Try to append every provided child (according to its type)
    try {
        if (children instanceof HTMLElement)
            element.appendChild(children);
        else
            children.forEach(child => element.appendChild(child));
    }
    catch (e) {
        console.error(e);
        return element;
    }
    return element;
}

/**
 * Sets the declared properties to the provided element.
 * @param {HTMLElement} element - The element onto which the properties will be applied.
 * @param {TurboProperties} [properties] - The properties object.
 * @return The element itself.
 */
function setProperties(element, properties = {}) {
    Object.keys(properties).forEach(property => {
        switch (property) {
            case "tag" :
                return;
            case "text":
                if (properties.text)
                    element.innerText = properties.text;
                return;
            case "style":
                element.style.cssText += properties.style;
                return;
            case "stylesheet":
                addStylesheet(properties.stylesheet, "root" in element ? element.root : document.head);
                return;
            case "classes":
                addClass(element, properties.classes);
                return;
            case "listeners":
                if (properties.listeners)
                    Object.keys(properties.listeners).forEach(listenerType => addListener(element, listenerType, properties.listeners[listenerType]));
                return;
            case "children":
                addChild(element, properties.children);
                return;
            case "parent":
                if (properties.parent)
                    addChild(properties.parent, element);
                return;
            default:
                element.setAttribute(property, properties[property]);
                return;
        }
    });
    return element;
}

/**
 * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
 * @param {HTMLElement} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
function removeClass(element, classes) {
    if (!classes)
        return element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.filter(entry => entry.trim().length > 0).forEach(entry => element.classList.remove(entry));
    }
    catch (e) {
        console.error(e);
        return element;
    }
    return element;
}

/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {HTMLElement} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 * @return The element itself
 */
function toggleClass(element, classes, force) {
    if (!classes)
        return element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.filter(entry => entry.trim().length > 0).forEach(entry => {
            if (force != undefined)
                element.classList.toggle(entry, force);
            else
                element.classList.toggle(entry);
        });
    }
    catch (e) {
        console.error(e);
        return element;
    }
    return element;
}

/**
 * @description Add children elements to a parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {HTMLElement} sibling - Sibling Turbo or HTML DOM element
 * @return The element itself
 */
function addChildBefore(element, children, sibling) {
    if (!children)
        return element;
    //Try to append every provided child (according to its type)
    try {
        if (children instanceof HTMLElement)
            element.insertBefore(children, sibling);
        else
            children.forEach((child) => element.insertBefore(child, sibling));
    }
    catch (e) {
        console.error(e);
        return element;
    }
    return element;
}

/**
 * @description Remove children elements from a parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
function removeChild(element, children) {
    if (!children)
        return element;
    //Try to remove every provided child (according to its type)
    try {
        if (children instanceof HTMLElement)
            element.removeChild(children);
        else
            children.forEach(child => element.removeChild(child));
    }
    catch (e) {
        console.error(e);
        return element;
    }
    return element;
}

/**
 * @description Remove all children of the given parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @return The element itself
 */
function removeAllChildren(element) {
    try {
        Array.from(element.children).forEach(child => child.remove());
        return element;
    }
    catch (e) {
        console.error(e);
        return element;
    }
}

/**
 * @description Factory method that takes a class extending HTMLElement and returns a TurboBase class that extends the
 * provided HTML element with a few powerful tools and functions.
 */
function Turbo(BaseElement) {
    //@ts-ignore
    return class TurboBase extends BaseElement {
        root = document.head;
        constructor(...args) {
            super(...args);
            const properties = args[0] || {};
            if (properties.shadowDOM)
                this.root = this.attachShadow({ mode: "open" });
            this.setProperties(properties);
        }
        //Config
        /**
         * @description Static configuration object.
         */
        static config = {};
        /**
         * @description Update the class's static configurations. Will only overwrite the set properties.
         * @property {typeof this.config} value - The object containing the new configurations.
         */
        static configure(value) {
            Object.entries(value).forEach(([key, val]) => {
                if (val !== undefined)
                    this.config[key] = val;
            });
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
        addChildBefore(children, sibling) {
            addChildBefore(this, children, sibling);
            return this;
        }
        removeAllChildren() {
            removeAllChildren(this);
            return this;
        }
        addListener(type, listener, options) {
            addListener(this, type, listener, options);
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
        execute(callback) {
            callback(this);
            return this;
        }
        removeListener(type, listener, options) {
            this.removeEventListener(type, listener, options);
            return this;
        }
        setAttribute(name, value) {
            super.setAttribute(name, value?.toString() || "true");
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
        //Other
        show(b) {
            this.setStyle("display", b ? "" : "none");
            return this;
        }
    };
}

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
customElements.define("turbo-div", TurboDiv, { extends: "div" });
/**
 * @description Creates a div TurboElement with the given properties.
 * @param {TurboProperties<HTMLDivElement>} [properties] - The properties object.
 * @returns The Turbo div element.
 */
function div(properties = {}) {
    let el = document.createElement("turbo-div");
    setProperties(el, properties);
    return el;
}

/**
 * @class TurboH1
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H1 TurboElement class, extending the base HTML h1 element with a few powerful tools and functions.
 */
class TurboH1 extends Turbo(HTMLHeadingElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
customElements.define("turbo-h1", TurboH1, { extends: "h1" });
/**
 * @description Creates a h1 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h1 element.
 */
function h1(properties = {}) {
    let el = document.createElement("turbo-h1");
    setProperties(el, properties);
    return el;
}

/**
 * @class TurboH2
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H2 TurboElement class, extending the base HTML h2 element with a few powerful tools and functions.
 */
class TurboH2 extends Turbo(HTMLHeadingElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
customElements.define("turbo-h2", TurboH2, { extends: "h2" });
/**
 * @description Creates a h2 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h2 element.
 */
function h2(properties = {}) {
    let el = document.createElement("turbo-h2");
    setProperties(el, properties);
    return el;
}

/**
 * @class TurboH3
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H3 TurboElement class, extending the base HTML h3 element with a few powerful tools and functions.
 */
class TurboH3 extends Turbo(HTMLHeadingElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
customElements.define("turbo-h3", TurboH3, { extends: "h3" });
/**
 * @description Creates a h3 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h3 element.
 */
function h3(properties = {}) {
    let el = document.createElement("turbo-h3");
    setProperties(el, properties);
    return el;
}

/**
 * @class TurboH4
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H4 TurboElement class, extending the base HTML h4 element with a few powerful tools and functions.
 */
class TurboH4 extends Turbo(HTMLHeadingElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
customElements.define("turbo-h4", TurboH4, { extends: "h4" });
/**
 * @description Creates a h4 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h4 element.
 */
function h4(properties = {}) {
    let el = document.createElement("turbo-h4");
    setProperties(el, properties);
    return el;
}

/**
 * @class TurboH5
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H5 TurboElement class, extending the base HTML h5 element with a few powerful tools and functions.
 */
class TurboH5 extends Turbo(HTMLHeadingElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
customElements.define("turbo-h5", TurboH5, { extends: "h5" });
/**
 * @description Creates a h5 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h5 element.
 */
function h5(properties = {}) {
    let el = document.createElement("turbo-h5");
    setProperties(el, properties);
    return el;
}

/**
 * @class TurboH6
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H6 TurboElement class, extending the base HTML h6 element with a few powerful tools and functions.
 */
class TurboH6 extends Turbo(HTMLHeadingElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
customElements.define("turbo-h6", TurboH6, { extends: "h6" });
/**
 * @description Creates a h6 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h6 element.
 */
function h6(properties = {}) {
    let el = document.createElement("turbo-h6");
    setProperties(el, properties);
    return el;
}

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
customElements.define("turbo-img", TurboImage, { extends: "img" });
/**
 * @description Creates an image TurboElement with the given properties.
 * @param {TurboProperties<HTMLImageElement>} [properties] - The properties object.
 * @returns The Turbo image element.
 */
function img(properties = {}) {
    let el = document.createElement("turbo-img");
    setProperties(el, properties);
    return el;
}

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
customElements.define("turbo-input", TurboInput, { extends: "input" });
/**
 * @description Creates an input TurboElement with the given properties.
 * @param {TurboProperties<HTMLInputElement>} [properties] - The properties object.
 * @returns The Turbo input element.
 */
function input(properties = {}) {
    let el = document.createElement("turbo-input");
    setProperties(el, properties);
    return el;
}

/**
 * @class TurboP
 * @extends HTMLParagraphElement
 * @implements ITurbo
 * @description P TurboElement class, extending the base HTML p element with a few powerful tools and functions.
 */
class TurboP extends Turbo(HTMLParagraphElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
customElements.define("turbo-p", TurboP, { extends: "p" });
/**
 * @description Creates a p TurboElement with the given properties.
 * @param {TurboProperties<HTMLParagraphElement>} [properties] - The properties object.
 * @returns The Turbo p element.
 */
function p(properties = {}) {
    let el = document.createElement("turbo-p");
    setProperties(el, properties);
    return el;
}

/**
 * @class TurboTextArea
 * @extends HTMLTextAreaElement
 * @implements ITurbo
 * @description TextArea TurboElement class, extending the base HTML TextArea element with a few powerful tools and functions.
 */
class TurboTextArea extends Turbo(HTMLTextAreaElement) {
    constructor(properties = {}) {
        super(properties);
    }
}
customElements.define("turbo-textarea", TurboTextArea, { extends: "textarea" });
/**
 * @description Creates a text area TurboElement with the given properties.
 * @param {TurboProperties<HTMLTextAreaElement>} [properties] - The properties object.
 * @returns The Turbo input element.
 */
function textArea(properties = {}) {
    let el = document.createElement("turbo-textarea");
    setProperties(el, properties);
    return el;
}

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

/**
 * Creates an HTML element from the given properties object
 * @param {TurboProperties} [properties] - The properties object.
 * @return {HTMLElement} The created element.
 */
function createWithProperties(properties = {}) {
    let element = document.createElement(properties.tag || "div");
    setProperties(element, properties);
    return element;
}

/**
 * @description Create a Turbo or HTML element with the specified properties.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created Turbo or HTML element.
 */
function element(properties = {}) {
    if (!properties.tag)
        properties.tag = "div";
    switch (properties.tag) {
        case "div" :
            return new TurboDiv(properties);
        case "h1" :
            return new TurboH1(properties);
        case "h2" :
            return new TurboH2(properties);
        case "h3" :
            return new TurboH3(properties);
        case "h4" :
            return new TurboH4(properties);
        case "h5" :
            return new TurboH5(properties);
        case "h6" :
            return new TurboH6(properties);
        case "img" :
            return new TurboImage(properties);
        case "input" :
            return new TurboInput(properties);
        case "p" :
            return new TurboP(properties);
        case "textarea" :
            return new TurboTextArea(properties);
        default:
            return createWithProperties(properties);
    }
}

function convertTextToElement(text) {
    let wrapper = element();
    wrapper.innerHTML = text;
    return wrapper.children[0];
}
function fetchSvg(path, onLoaded) {
    fetch(path)
        .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok while loading your SVG");
        }
        return response.text();
    })
        .then(svgText => {
        let svg = convertTextToElement(svgText);
        if (svg && onLoaded) {
            onLoaded(svg);
        }
    })
        .catch(error => console.error("Error fetching SVG:", error));
}

class SvgCache {
    cache = {};
    fetchSvg(path, onLoaded) {
        let savedEl = this.cache[path];
        if (savedEl) {
            onLoaded(savedEl.cloneNode(true));
            return;
        }
        fetchSvg(path, (svg) => {
            this.cache[path] = svg.cloneNode(true);
            onLoaded(svg);
        });
    }
}

/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
class TurboIcon extends TurboElement {
    _icon;
    _iconColor = null;
    _svg;
    static config = { type: "svg", path: "" };
    static cache = new SvgCache();
    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties) {
        let type = TurboIcon.getType(properties);
        let path = TurboIcon.getPath(properties, type);
        if (type != "svg") {
            properties.tag = "img";
            properties.src = path;
            if (!properties.alt)
                properties.alt = properties.icon;
        }
        super(properties);
        if (!properties.unsetDefaultClasses)
            this.addClass(TurboIcon.config.defaultClasses);
        this.icon = properties.icon;
        this.iconColor = properties.iconColor;
        if (type == "svg") {
            TurboIcon.cache.fetchSvg(path, (svg) => {
                this.svg = svg;
                this.appendChild(this.svg);
                if (this.svg) {
                    if (this.iconColor)
                        this.svg.style.fill = this.iconColor;
                    if (properties.executeOnLoad)
                        properties.executeOnLoad(this.svg);
                }
            });
        }
    }
    static getType(properties) {
        if (properties.customType) {
            return properties.customType;
        }
        return TurboIcon.config.type || "svg";
    }
    static getPath(properties, type) {
        let directory = properties.customPath
            ? properties.customPath
            : TurboIcon.config.path
                ? TurboIcon.config.path
                : "";
        if (directory.length > 0 && !directory.endsWith("/"))
            directory += "/";
        return directory + properties.icon + (properties.icon.endsWith("." + type) || type.length == 0 ? "" : "." + type);
    }
    /**
     * @description The name of the icon.
     */
    get icon() {
        return this._icon;
    }
    set icon(value) {
        this._icon = value;
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
    set svg(value) {
        this._svg = value;
    }
    /**
     * @description The underlying SVG element (if any).
     */
    get svg() {
        return this._svg;
    }
}
customElements.define("turbo-icon", TurboIcon);
function icon(properties) {
    let el = document.createElement("turbo-icon");
    setProperties(el, properties);
    return el;
}

/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
class TurboButton extends Turbo(HTMLButtonElement) {
    textTag;
    _elements;
    static config = { defaultTextTag: "h4" };
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties) {
        properties.tag = "button";
        super(properties);
        this.elements = {
            leftCustomElements: null,
            leftIcon: null,
            buttonText: null,
            rightIcon: null,
            rightCustomElements: null,
        };
        this.textTag = properties.customTextTag ? properties.customTextTag
            : TurboButton.config.defaultTextTag ? TurboButton.config.defaultTextTag : "h4";
        if (!properties.unsetDefaultClasses)
            this.addClass(TurboButton.config.defaultClasses);
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
     * @param {HTMLElement | HTMLElement[] | null} element - The element(s) to add.
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
                this.addChildBefore(element, nextSibling);
            else
                this.addChild(element);
        }
    }
    /**
     * @description Removes a given element or elements from the button.
     * @param {HTMLElement | HTMLElement[] | null} element - The element(s) to remove.
     */
    removeElement(element) {
        if (!element)
            return;
        if (element) {
            if (element instanceof HTMLElement)
                element.remove();
            else
                element.forEach(el => el.remove());
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
            value = icon({ icon: value });
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
            value = icon({ icon: value });
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
customElements.define("turbo-button", TurboButton, { extends: "button" });
function button(properties) {
    let el = document.createElement("turbo-button");
    setProperties(el, properties);
    return el;
}

/**
 * @class DropdownEntry
 * @description Class representing an entry within a Dropdown.
 * @extends TurboElement
 */
class DropdownEntry extends TurboElement {
    _value;
    _selected = false;
    _selectedClass = "";
    /**
     * @description DropdownEntry constructor
     * @param {TurboDropdownEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties) {
        super(properties);
        //TODO maybe switch to setter
        this.value = properties.value;
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
        this.innerText = value;
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
customElements.define("turbo-dropdown-entry", DropdownEntry);
function dropdownEntry(properties) {
    let el = document.createElement("turbo-dropdown-entry");
    setProperties(el, properties);
    return el;
}

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

const dropdownStylesheet = css `
    turbo-dropdown {
        position: relative;
    }

    turbo-dropdown > :first-child {
        width: 100%;
        height: 100%;
    }

    turbo-dropdown > :nth-child(2) {
        position: absolute;
        top: calc(100% + 0.4em);
        left: 0;

        min-width: calc(100% - 2 * 0.1em);
        max-width: 200%;
        background-color: white;

        display: flex;
        flex-direction: column;
        border: solid 0.1em #5e5e5e;
        border-radius: 0.4em;

        overflow: hidden;
        z-index: 1;
    }

    turbo-dropdown-entry {
        width: 100%;
        padding: 0.5em 0.7em;
    }

    turbo-dropdown-entry:hover {
        background-color: #d7d7d7;
    }

    turbo-dropdown-entry:not(:last-child) {
        border-bottom: solid 0.1em #bdbdbd;
    }
`;
addStylesheet(dropdownStylesheet);

/**
 * Dropdown class for creating Turbo button elements.
 * @class Dropdown
 * @extends TurboElement
 */
class Dropdown extends TurboElement {
    /**
     * The dropdown's selector element.
     */
    selector;
    /**
     * The dropdown's popup element.
     */
    popup;
    /**
     * The dropdown's entries.
     */
    _entries = [];
    /**
     * The dropdown's underlying hidden input. Might be undefined.
     */
    underlyingInput;
    popupOpen = false;
    multiSelection = false;
    static config = { defaultEntryTag: "h4", defaultSelectorTag: "h4" };
    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties) {
        super(properties);
        if (!properties.selectedValues)
            properties.selectedValues = [];
        if (properties.multiSelection)
            this.multiSelection = properties.multiSelection;
        if (properties.underlyingInputName)
            this.underlyingInput = input({ type: "hidden", name: properties.underlyingInputName });
        this.selector = this.createSelector(properties);
        this.popup = this.createPopup(properties);
        this.entries = properties.values.map(entry => this.createDropdownEntry(entry, properties));
        document.addEventListener("click", e => {
            if (this.popupOpen && !this.contains(e.target))
                this.openPopup(false);
        });
    }
    createSelector(properties) {
        let selector;
        if (properties.selector instanceof HTMLElement) {
            selector = properties.selector;
        }
        else {
            let textTag = properties.customSelectorTag
                ? properties.customSelectorTag
                : Dropdown.config.defaultSelectorTag;
            let initialText = typeof properties.selector == "string"
                ? properties.selector
                : typeof properties.values[0] == "string"
                    ? properties.values[0]
                    : properties.values[0].value;
            selector = button({ buttonText: initialText, customTextTag: textTag });
        }
        let selectorClasses = properties.customSelectorClasses
            ? properties.customSelectorClasses
            : Dropdown.config.defaultSelectorClasses;
        selector.addEventListener("click", () => this.openPopup(!this.popupOpen));
        this.addChild(selector);
        addClass(selector, selectorClasses);
        return selector;
    }
    createPopup(properties) {
        let popup = properties.popup ? properties.popup : div();
        let popupClasses = properties.customPopupClasses
            ? properties.customPopupClasses
            : Dropdown.config.defaultPopupClasses;
        this.addChild(popup);
        popup.style.display = "none";
        addClass(popup, popupClasses);
        return popup;
    }
    createDropdownEntry(entry, properties) {
        if (typeof entry == "string") {
            entry = dropdownEntry({
                value: entry,
                tag: properties.customEntryTag ? properties.customEntryTag : Dropdown.config.defaultEntryTag
            });
        }
        entry.addClass(properties.customEntriesClasses
            ? properties.customEntriesClasses
            : Dropdown.config.defaultEntriesClasses);
        entry.selectedClass += " " + (properties.customSelectedEntriesClasses
            ? properties.customSelectedEntriesClasses
            : Dropdown.config.defaultSelectedEntriesClasses);
        entry.addEventListener("click", () => {
            this.select(entry);
            this.openPopup(false);
        });
        addChild(this.popup, entry);
        if (properties.selectedValues?.includes(entry.value))
            this.select(entry);
        return entry;
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
    reset() {
        this.entries[0].click();
    }
    get entries() {
        return this._entries;
    }
    set entries(values) {
        this._entries = values;
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
    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    get values() {
        return this.entries.map(entry => entry.value);
    }
    set values(values) {
        for (let i = 0; i < Math.min(this.entries.length, values.length); i++) {
            this.entries[i].value = values[i];
        }
        this.updateSelectorText();
    }
    updateSelectorText() {
        let newValue = this.selectedValues.join(", ");
        if (this.underlyingInput)
            this.underlyingInput.value = newValue;
        if (this.selector instanceof TurboButton)
            this.selector.buttonText = newValue;
    }
    openPopup(b) {
        if (this.popupOpen == b)
            return;
        this.popupOpen = b;
        this.popup.style.display = b ? "" : "none";
    }
}
customElements.define("turbo-dropdown", Dropdown);
function dropdown(properties) {
    let el = document.createElement("turbo-dropdown");
    setProperties(el, properties);
    return el;
}

/**
 * Class for creating icon buttons.
 * @class TurboIconButton
 * @extends TurboIcon
 */
class TurboIconButton extends TurboIcon {
    static config = {};
    /**
     * Creates an instance of TurboIconButton.
     * @param {TurboIconProperties} properties - Properties to configure the button and its icon.
     */
    constructor(properties) {
        super(properties);
        if (!properties.unsetDefaultClasses)
            this.addClass(TurboIconButton.config.defaultClasses);
    }
}
customElements.define("turbo-icon-button", TurboIconButton);
function iconButton(properties) {
    let el = document.createElement("turbo-icon-button");
    setProperties(el, properties);
    return el;
}

/**
 * @description Create a flex column element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
function flexCol(properties) {
    let el = element(properties);
    el.style.display = "flex";
    el.style.flexDirection = "column";
    return el;
}

/**
 * @description Create a flex column element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
function flexColCenter(properties) {
    let el = flexCol(properties);
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
    return el;
}

/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
function flexRow(properties) {
    let el = element(properties);
    el.style.display = "flex";
    el.style.flexDirection = "row";
    return el;
}

/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
function flexRowCenter(properties) {
    let el = flexRow(properties);
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
    return el;
}

/**
 * @description Create a spacer element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created spacer element
 */
function spacer(properties) {
    let el = element(properties);
    el.style.flexGrow = "1";
    return el;
}

/**
 * @class {TurboConfig}
 * @description Static configuration class for TurboDOMBuilder.
 */
class TurboConfig {
    static shadowDOM = false;
}

/**
 * @class Transition
 * @description A class representing a CSS transition. It has two states (in and out), which you can set up
 * almost independently (they must only share the animation property). Use a Transition to transition one or more
 * TurboElement(s) or HTMLElement(s) easily using your predefined transition.
 */
class Transition {
    transitionProperties = [];
    /**
     * @constructor
     * @param {TransitionProperties} transition - The transition properties to apply to this newly created Transition
    */
    constructor(transition) {
        if (!transition.property)
            transition.property = "all";
        //Create fixed transition in and out values
        for (let i = 0; i < 2; i++) {
            let k = i === 0 ? "In" : "Out";
            this.transitionProperties.push({
                property: transition.property,
                duration: transition["duration" + k] ? transition["duration" + k] : (transition.duration ? transition.duration : 0),
                delay: transition["delay" + k] ? transition["delay" + k] : (transition.delay ? transition.delay : 0),
                timingFunction: transition["timingFunction" + k] ? transition["timingFunction" + k] :
                    (transition.timingFunction ? transition.timingFunction : "linear")
            });
        }
    }
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
    transition(element, customTransitionProperties, out = false) {
        let i = out ? 1 : 0;
        let k = out ? "Out" : "In";
        let list = (element instanceof TurboElement) ||
            (element instanceof HTMLElement) ? [element] : element;
        list.forEach(el => {
            el.style.transitionProperty = customTransitionProperties.property ? customTransitionProperties.property :
                this.transitionProperties[i].property;
            el.style.transitionDuration = (customTransitionProperties["duration" + k] ? customTransitionProperties["duration" + k] :
                (customTransitionProperties.duration ? customTransitionProperties.duration :
                    this.transitionProperties[i].duration)) + "s";
            el.style.transitionDelay = (customTransitionProperties["delay" + k] ? customTransitionProperties["delay" + k] :
                (customTransitionProperties.delay ? customTransitionProperties.delay :
                    this.transitionProperties[i].delay)) + "s";
            el.style.transitionTimingFunction = (customTransitionProperties["timingFunction" + k] ?
                customTransitionProperties["timingFunction" + k] : (customTransitionProperties.timingFunction ?
                customTransitionProperties.timingFunction : this.transitionProperties[i].timingFunction));
        });
    }
    /**
     * @function transitionIn
     * @description A function to apply the transition in on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    transitionIn(element, customTransitionProperties) {
        this.transition(element, customTransitionProperties, false);
    }
    /**
     * @function transitionOut
     * @description A function to apply the transition out on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    transitionOut(element, customTransitionProperties) {
        this.transition(element, customTransitionProperties, true);
    }
    /**
     * @function update
     * @description Function to update certain (or every) properties of the current Transition.
     * @param {TransitionProperties} changedProperties - The updated transition properties
     */
    update(changedProperties) {
        if (changedProperties.property) {
            this.transitionProperties[0].property = changedProperties.property;
            this.transitionProperties[1].property = changedProperties.property;
        }
        if (changedProperties.durationIn)
            this.transitionProperties[0].duration = changedProperties.durationIn;
        else if (changedProperties.duration)
            this.transitionProperties[0].duration = changedProperties.duration;
        if (changedProperties.durationOut)
            this.transitionProperties[1].duration = changedProperties.durationOut;
        else if (changedProperties.duration)
            this.transitionProperties[1].duration = changedProperties.duration;
        if (changedProperties.delayIn)
            this.transitionProperties[0].delay = changedProperties.delayIn;
        else if (changedProperties.delay)
            this.transitionProperties[0].delay = changedProperties.delay;
        if (changedProperties.delayOut)
            this.transitionProperties[1].delay = changedProperties.delayOut;
        else if (changedProperties.delay)
            this.transitionProperties[1].delay = changedProperties.delay;
        if (changedProperties.timingFunctionIn)
            this.transitionProperties[0].timingFunction = changedProperties.timingFunctionIn;
        else if (changedProperties.timingFunction)
            this.transitionProperties[0].timingFunction = changedProperties.timingFunction;
        if (changedProperties.timingFunctionOut)
            this.transitionProperties[1].timingFunction = changedProperties.timingFunctionOut;
        else if (changedProperties.timingFunction)
            this.transitionProperties[1].timingFunction = changedProperties.timingFunction;
    }
}

export { Dropdown, DropdownEntry, SvgCache, Transition, Turbo, TurboButton, TurboConfig, TurboDiv, TurboElement, TurboH1, TurboH2, TurboH3, TurboH4, TurboH5, TurboH6, TurboIcon, TurboIconButton, TurboImage, TurboInput, TurboP, TurboTextArea, addChild, addChildBefore, addClass, addListener, addStylesheet, button, createWithProperties, css, div, dropdown, dropdownEntry, element, fetchSvg, flexCol, flexColCenter, flexRow, flexRowCenter, h1, h2, h3, h4, h5, h6, icon, iconButton, img, input, p, removeAllChildren, removeChild, removeClass, setProperties, spacer, textArea, toggleClass };
