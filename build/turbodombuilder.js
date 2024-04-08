/**
 * @typedef {Object} TurboProperties
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
 * @property {HTMLTag} [customTextTag] - The HTML tag to be used for the buttonText element (if the latter is passed as
 * a string). If not specified, the default text tag specified in the Button class will be used.
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
 * @property {HTMLTag} [defaultTextTag] - The default HTML tag for the creation of the text
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

/**
 * @typedef {Object} TurboDropdownConfig
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

/**
 * @typedef {Object} TurboIconProperties
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

var Turbo = (function (exports) {
    'use strict';

    /**
     * @description Returns the HTML element from the provided Turbo compatible entity.
     * @param {TurboCompatible} element - The Turbo compatible entity to get the HTML element from
     * @return The HTML element
     */
    function getElement(element) {
        if (element instanceof Element)
            return element;
        if ("element" in element)
            return element.element;
    }

    /**
     * @description Remove children elements from a parent element.
     * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
     * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @return The element itself
     */
    function removeChild(element, children) {
        if (!element || !children)
            return element;
        let htmlElement = getElement(element);
        //Try to remove every provided child (according to its type)
        try {
            if (!Array.isArray(children))
                htmlElement.removeChild(getElement(children));
            else
                children.forEach(child => htmlElement.removeChild(getElement(child)));
        }
        catch (e) {
            console.error(e);
        }
        return element;
    }

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
    }

    /**
     * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
     * @param {TurboCompatible} element - Turbo or HTML DOM element
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
     * @return The element itself
     */
    function addClass(element, classes) {
        if (!element || !classes)
            return element;
        let htmlElement = getElement(element);
        try {
            // If string provided --> split by spaces
            if (typeof classes === "string")
                classes = classes.split(" ");
            classes.filter(entry => entry.trim().length > 0).forEach(entry => htmlElement.classList.add(entry));
        }
        catch (e) {
            console.error(e);
        }
        return element;
    }

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
    function addListener(element, type, listener, options) {
        if (!element)
            return element;
        const wrappedListener = (e) => {
            if (typeof listener === "function")
                listener(e, element);
            else if (typeof listener === "object" && listener.handleEvent)
                listener.handleEvent(e);
        };
        getElement(element).addEventListener(type, wrappedListener, options);
        return element;
    }

    /**
     * @description Add children elements to a parent element.
     * @param {TurboCompatible} [element] - Parent Turbo or HTML DOM element
     * @param {TurboCompatible | TurboCompatible[]} [children] - Array of (or single element) child
     * Turbo or HTML DOM elements
     * @return The element itself
     */
    function addChild(element, children) {
        if (!element || !children)
            return element;
        let htmlElement = getElement(element);
        //Try to append every provided child (according to its type)
        try {
            if (!Array.isArray(children))
                htmlElement.appendChild(getElement(children));
            else
                children.forEach((child) => htmlElement.appendChild(getElement(child)));
        }
        catch (e) {
            console.error(e);
        }
        return element;
    }

    /**
     * Sets the declared properties to the provided element.
     * @param {TurboCompatible} element - The element onto which the properties will be applied.
     * @param {TurboProperties} [properties] - The properties object.
     * @return The element itself.
     */
    function setProperties(element, properties = {}) {
        let htmlElement = getElement(element);
        Object.keys(properties).forEach(property => {
            switch (property) {
                case "tag" :
                    return;
                case "text":
                    if (!(htmlElement instanceof HTMLElement))
                        return;
                    htmlElement.innerText = properties.text;
                    return;
                case "style":
                    if (!(htmlElement instanceof HTMLElement || htmlElement instanceof SVGElement))
                        return;
                    htmlElement.style.cssText += properties.style;
                    return;
                case "stylesheet":
                    addStylesheet(properties.stylesheet, "root" in element ? element.root : document.head);
                    return;
                case "classes":
                    addClass(htmlElement, properties.classes);
                    return;
                case "listeners":
                    Object.keys(properties.listeners).forEach(listenerType => addListener(htmlElement, listenerType, properties.listeners[listenerType]));
                    return;
                case "children":
                    addChild(htmlElement, properties.children);
                    return;
                case "parent":
                    addChild(properties.parent, htmlElement);
                    return;
                default:
                    htmlElement.setAttribute(property, properties[property]);
                    return;
            }
        });
        return element;
    }

    /**
     * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
     * @param {TurboCompatible} element - Turbo or HTML DOM element
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
     * @return The element itself
     */
    function removeClass(element, classes) {
        if (!element || !classes)
            return element;
        let htmlElement = getElement(element);
        try {
            // If string provided --> split by spaces
            if (typeof classes === "string")
                classes = classes.split(" ");
            classes.filter(entry => entry.trim().length > 0).forEach(entry => htmlElement.classList.remove(entry));
        }
        catch (e) {
            console.error(e);
        }
        return element;
    }

    /**
     * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
     * @param {TurboCompatible} element - Turbo or HTML DOM element
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @return The element itself
     */
    function toggleClass(element, classes, force) {
        if (!element || !classes)
            return element;
        let htmlElement = getElement(element);
        try {
            // If string provided --> split by spaces
            if (typeof classes === "string")
                classes = classes.split(" ");
            classes.filter(entry => entry.trim().length > 0).forEach(entry => {
                if (force != undefined)
                    htmlElement.classList.toggle(entry, force);
                else
                    htmlElement.classList.toggle(entry);
            });
        }
        catch (e) {
            console.error(e);
        }
        return element;
    }

    /**
     * @description Add children elements to a parent element.
     * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
     * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child
     * Turbo or HTML DOM elements to insert before sibling
     * @param {TurboCompatible} sibling - Sibling Turbo or HTML DOM element
     * @return The element itself
     */
    function addChildBefore(element, children, sibling) {
        if (!element || !children)
            return element;
        if (!sibling)
            return addChild(element, children);
        let htmlElement = getElement(element);
        let htmlSibling = getElement(sibling);
        //Try to append every provided child (according to its type)
        try {
            if (!Array.isArray(children))
                htmlElement.insertBefore(getElement(children), htmlSibling);
            else
                children.forEach((child) => htmlElement.insertBefore(getElement(child), htmlSibling));
        }
        catch (e) {
            console.error(e);
        }
        return element;
    }

    /**
     * @description Remove all children of the given parent element.
     * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
     * @return The element itself
     */
    function removeAllChildren(element) {
        if (!element)
            return element;
        try {
            Array.from(getElement(element).children).forEach(child => child.remove());
        }
        catch (e) {
            console.error(e);
        }
        return element;
    }

    /**
     * @description Create an HTML element with the specified properties.
     * @param {TurboProperties} properties - Object containing properties of the element.
     * @returns {HTMLElement} The created HTML element.
     */
    function element(properties = {}) {
        let element = document.createElement(properties.tag || "div");
        setProperties(element, properties);
        return element;
    }

    /**
     * @description Adds the file at the provided path as a new style element to the provided root.
     * @param {string | undefined} href - The path to the CSS file to add.
     * @param {HTMLHeadElement | ShadowRoot} [root] - The root to which the style element will be added.
     */
    function addStylesheetFile(href, root = document.head) {
        if (!href)
            return;
        const stylesheet = element({ tag: "link", rel: "stylesheet", href: href, type: "text/css" });
        root.appendChild(stylesheet);
    }

    class StylesRecord {
        addedStylesheets = new Map();
        getStylesheets(root) {
            let stylesheets = this.addedStylesheets.get(root);
            if (!stylesheets) {
                this.addedStylesheets.set(root, new Set());
                stylesheets = this.addedStylesheets.get(root);
            }
            return stylesheets;
        }
        addStylesheet(styles, id, root = document.head) {
            if (!styles || styles.length == 0)
                return;
            let stylesheets = this.getStylesheets(root);
            if (stylesheets.has(id))
                return;
            addStylesheet(styles);
            stylesheets.add(id);
        }
        addStylesheetFile(href, id, root = document.head) {
            if (!href || href.length == 0)
                return;
            let stylesheets = this.getStylesheets(root);
            if (stylesheets.has(id))
                return;
            addStylesheetFile(href);
            stylesheets.add(id);
        }
    }

    /**
     * @description Retrieves the closest root to the provided element in  the document.
     * @param {TurboCompatible} [element] - The element from which to start the search.
     * @return The closest root, or the document's head.
     */
    function getClosestRoot(element) {
        while (element) {
            if (element.shadowRoot)
                return element.shadowRoot;
            element = element.parentElement;
        }
        return document.head;
    }

    /**
     * @class TurboElement
     * @extends HTMLElement
     * @implements ITurbo
     * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
     */
    class TurboElement extends HTMLElement {
        root = document.head;
        /**
         * @description The stylesheet associated to this class. It will automatically be added once to the document
         * (or once to the closest shadow root).
         */
        static stylesheet = "";
        static stylesRecord = new StylesRecord();
        pendingStyles = {};
        constructor(properties = {}) {
            super();
            if (properties.shadowDOM)
                this.root = this.attachShadow({ mode: "open" });
            TurboElement.stylesRecord.addStylesheet(this.constructor.stylesheet, this.className, getClosestRoot(this));
            TurboElement.stylesRecord.addStylesheetFile(this.constructor.stylesheetFile, this.className, getClosestRoot(this));
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
            this.pendingStyles[attribute] = value;
            this.applyStyles();
            return this;
        }
        setStyles(cssText) {
            this.pendingStyles["cssText"] = cssText;
            this.applyStyles();
            return this;
        }
        applyStyles() {
            requestAnimationFrame(() => {
                for (const property in this.pendingStyles) {
                    if (property == "cssText")
                        this.style.cssText += ";" + this.pendingStyles["cssText"];
                    else
                        this.style[property] = this.pendingStyles[property];
                }
                this.pendingStyles = {};
            });
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

    function getFileExtension(str) {
        if (!str)
            return "";
        const match = str.match(/\.\S{1,4}$/);
        return match ? match[0] : "";
    }

    /**
     * @description Creates an image TurboElement with the given properties.
     * @param {TurboProperties<HTMLImageElement>} [properties] - The properties object.
     * @returns The Turbo image element.
     */
    function img(properties = {}) {
        properties.tag = "img";
        return element(properties);
    }

    /**
     * Icon class for creating icon elements.
     * @class TurboIcon
     * @extends TurboElement
     */
    class TurboIcon extends TurboElement {
        _element = null;
        _type;
        _directory;
        _icon;
        _iconColor = null;
        _onLoaded = null;
        static config = { type: "svg", path: "" };
        static cache = new SvgCache();
        /**
         * Creates an instance of Icon.
         * @param {TurboIconProperties} properties - Properties to configure the icon.
         */
        constructor(properties) {
            super(properties);
            this.update(properties);
        }
        update(properties) {
            if (properties.unsetDefaultClasses)
                this.removeClass(TurboIcon.config.defaultClasses);
            else
                this.addClass(TurboIcon.config.defaultClasses);
            this.type = properties.type;
            this.directory = properties.directory;
            if (properties.iconColor)
                this.iconColor = properties.iconColor;
            if (properties.onLoaded)
                this._onLoaded = properties.onLoaded;
            this.icon = properties.icon;
        }
        generateSvg() {
            this.clear();
            TurboIcon.cache.fetchSvg(this.path, (svg) => {
                if (this.element)
                    return;
                this.element = svg;
                this.addChild(this.element);
                if (this.element) {
                    if (this.iconColor)
                        this.element.style.fill = this.iconColor;
                    if (this._onLoaded)
                        this._onLoaded(this.element);
                }
            });
        }
        generateImg() {
            if (this.element instanceof HTMLImageElement) {
                this.element.src = this.path;
                this.element.alt = this.icon;
                return;
            }
            this.clear();
            this.element = img({ src: this.path, alt: this.icon, parent: this });
        }
        clear() {
            this.removeAllChildren();
            this.element = null;
        }
        //Getters and setters
        /**
         * @description The type of the icon.
         */
        get type() {
            return this._type;
        }
        set type(value) {
            if (!value || value.length == 0)
                value = this.type || TurboIcon.config.type || "svg";
            this._type = value;
        }
        /**
         * @description The user-provided (or statically configured) directory to the icon's file.
         */
        get directory() {
            return this._directory;
        }
        set directory(value) {
            if (!value)
                value = this.directory || TurboIcon.config.path || "";
            if (value.length > 0 && !value.endsWith("/"))
                value += "/";
            this._directory = value;
        }
        /**
         * @description The path to the icon's source file.
         */
        get path() {
            let extension = (this.icon.endsWith("." + this.type) || this.type.length == 0) ? "" : "." + this.type;
            return this.directory + this.icon + extension;
        }
        /**
         * @description The name (or path) of the icon. Might include the file extension (to override the icon's type).
         * Setting it will update the icon accordingly.
         */
        get icon() {
            return this._icon;
        }
        set icon(value) {
            this.type = getFileExtension(value).substring(1);
            this._icon = value;
            if (this.type == "svg")
                this.generateSvg();
            else
                this.generateImg();
        }
        /**
         * @description The assigned color to the icon (if any)
         */
        get iconColor() {
            return this._iconColor;
        }
        set iconColor(value) {
            this._iconColor = value;
            if (this.element instanceof SVGElement && value)
                this.element.style.fill = value;
        }
        /**
         * @description The child element of the icon element (an HTML image or an SVG element).
         */
        set element(value) {
            this._element = value;
        }
        get element() {
            return this._element;
        }
    }
    customElements.define("turbo-icon", TurboIcon);
    function icon(properties) {
        return new TurboIcon(properties);
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z$2 = "turbo-button{align-items:center;background-color:#dadada;border:1px solid #000;border-radius:.4em;color:#000;display:inline-flex;flex-direction:row;gap:.4em;padding:.5em .7em;text-decoration:none}turbo-button>h4{flex-grow:1}";
    styleInject(css_248z$2);

    /**
     * Button class for creating Turbo button elements.
     * @class TurboButton
     * @extends TurboElement
     */
    class TurboButton extends TurboElement {
        _elements;
        _buttonTextTag;
        static config = { defaultTextTag: "h4" };
        /**
         * Initializes a new instance of the Button class.
         * @param {TurboButtonProperties} properties - Properties to configure the button.
         */
        constructor(properties) {
            super(properties);
            this.elements = {
                leftCustomElements: null,
                leftIcon: null,
                buttonText: null,
                rightIcon: null,
                rightCustomElements: null,
            };
            this.buttonTextTag = properties.customTextTag;
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
         * @param {TurboCompatible | TurboCompatible[] | null} element - The element(s) to add.
         * @param {keyof ButtonChildren} type - The type of child element being added.
         */
        addAtPosition(element, type) {
            if (!element)
                return;
            let nextSiblingIndex = 0;
            for (let key in this.elements) {
                if (key == type)
                    break;
                if (this.elements[key])
                    nextSiblingIndex++;
            }
            this.addChildBefore(element, this.children[nextSiblingIndex]);
        }
        /**
         * @description Removes a given element or elements from the button.
         * @param {TurboCompatible | TurboCompatible[] | null} element - The element(s) to remove.
         */
        removeElement(element) {
            if (!element)
                return;
            if (!Array.isArray(element))
                this.remChild(element);
            else
                element.forEach(el => this.remChild(el));
        }
        // Getters and setters
        /**
         * @description Object containing the children of the button.
         */
        get elements() {
            return this._elements;
        }
        set elements(value) {
            this._elements = value;
        }
        /**
         * @description The tag of the text element in the button
         */
        get buttonTextTag() {
            return this._buttonTextTag;
        }
        set buttonTextTag(value) {
            if (!value)
                value = TurboButton.config.defaultTextTag || "h4";
            this._buttonTextTag = value;
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
                value = new TurboIcon({ icon: value });
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
                if (this.buttonText && "innerText" in this.buttonText) {
                    this.buttonText.innerText = value;
                    return;
                }
                value = element({ tag: this.buttonTextTag, text: value });
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
                value = new TurboIcon({ icon: value });
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
    customElements.define("turbo-button", TurboButton);
    function button(properties) {
        return new TurboButton(properties);
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
        return new DropdownEntry(properties);
    }

    /**
     * @description Creates an input TurboElement with the given properties.
     * @param {TurboProperties<HTMLInputElement>} [properties] - The properties object.
     * @returns The Turbo input element.
     */
    function input(properties = {}) {
        properties.tag = "input";
        return element(properties);
    }

    var css_248z$1 = "turbo-dropdown{display:inline-block;position:relative}turbo-dropdown>:nth-child(2){background-color:#fff;border:.1em solid #5e5e5e;border-radius:.4em;display:flex;flex-direction:column;left:0;overflow:hidden;top:calc(100% + .4em);z-index:1}turbo-dropdown-entry{padding:.5em .7em;width:100%}turbo-dropdown-entry:hover{background-color:#d7d7d7}turbo-dropdown-entry:not(:last-child){border-bottom:.1em solid #bdbdbd}";
    styleInject(css_248z$1);

    var css_248z = "turbo-popup{position:fixed}";
    styleInject(css_248z);

    class TurboPopup extends TurboElement {
        viewportMargin = 0;
        offsetFromParent = 0;
        constructor(properties = {}) {
            super(properties);
            this.addListeners();
            this.show(false);
        }
        addListeners() {
            document.addEventListener("scroll", () => this.show(false));
            document.addEventListener("click", e => {
                if (this.isShown && !this.contains(e.target))
                    this.show(false);
            });
        }
        recomputePosition() {
            const rect = this.getBoundingClientRect();
            const parentRect = this.parentElement.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(this);
            const parentComputedStyle = window.getComputedStyle(this.parentElement);
            const top = this.recomputeTop(rect, parentRect);
            const left = this.recomputeLeft(rect, parentRect);
            this.recomputeMaxHeight(top, computedStyle, parentComputedStyle);
            this.recomputeMaxWidth(left, computedStyle, parentComputedStyle);
        }
        recomputeTop(rect, parentRect) {
            let top;
            const popupHeightWithMargins = rect.height + this.offsetFromParent + this.viewportMargin;
            if (window.innerHeight - parentRect.bottom >= popupHeightWithMargins)
                top = parentRect.bottom;
            else if (parentRect.top >= popupHeightWithMargins)
                top = parentRect.top - rect.height;
            else
                top = parentRect.bottom;
            this.setStyle("top", top + "px");
            return top;
        }
        recomputeLeft(rect, parentRect) {
            let left = parentRect.left + (parentRect.width / 2) - (rect.width / 2);
            if (left < this.viewportMargin)
                left = 0;
            else if (left + rect.width > window.innerWidth - this.viewportMargin)
                left = window.innerWidth - rect.width;
            this.setStyle("left", left + "px");
            return left;
        }
        recomputeMaxHeight(top, computedStyle, parentComputedStyle) {
            const maxHeight = window.innerHeight - top - this.viewportMargin
                - parseFloat(computedStyle.marginBottom) - parseFloat(computedStyle.marginTop)
                - parseFloat(parentComputedStyle.marginBottom) - parseFloat(parentComputedStyle.marginTop);
            if (computedStyle.maxHeight && parseFloat(computedStyle.maxHeight) <= maxHeight)
                return;
            this.setStyle("maxHeight", maxHeight + "px");
        }
        recomputeMaxWidth(left, computedStyle, parentComputedStyle) {
            const maxWidth = window.innerWidth - left - this.viewportMargin
                - parseFloat(computedStyle.marginLeft) - parseFloat(computedStyle.marginRight)
                - parseFloat(parentComputedStyle.marginLeft) - parseFloat(parentComputedStyle.marginRight);
            if (computedStyle.maxWidth && parseFloat(computedStyle.maxWidth) <= maxWidth)
                return;
            this.setStyle("maxWidth", maxWidth + "px");
        }
        clearMaxDimensions() {
            this.setStyle("maxHeight", "");
            this.setStyle("maxWidth", "");
        }
        get isShown() {
            return this.style.display != "none";
        }
        show(b) {
            if (this.isShown == b)
                return this;
            this.setStyle("display", b ? "" : "none");
            if (b)
                requestAnimationFrame(() => this.recomputePosition());
            else
                this.clearMaxDimensions();
            return this;
        }
        toggle() {
            return this.show(!this.isShown);
        }
    }
    customElements.define("turbo-popup", TurboPopup);
    function popup(properties = {}) {
        return new TurboPopup(properties);
    }

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
            this.entries.forEach(entry => {
                if (properties.selectedValues?.includes(entry.value))
                    this.select(entry);
            });
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
            let popupEl = properties.popup ? properties.popup : popup();
            let popupClasses = properties.customPopupClasses
                ? properties.customPopupClasses
                : Dropdown.config.defaultPopupClasses;
            this.addChild(popupEl);
            popupEl.style.display = "none";
            addClass(popupEl, popupClasses);
            return popupEl;
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
            if (this.popup instanceof TurboElement)
                this.popup.show(b);
            else
                this.popup.style.display = b ? "" : "none";
        }
    }
    customElements.define("turbo-dropdown", Dropdown);
    function dropdown(properties) {
        return new Dropdown(properties);
    }

    /**
     * @class {TurboConfig}
     * @description Static configuration class for TurboDOMBuilder.
     */
    class TurboConfig {
        static shadowDOM = false;
    }

    /**
     * @class TurboWrapper
     * @description A Turbo wrapper class, wrapping an HTML elements and providing all the Turbo functionalities.
     */
    class TurboWrapper {
        /**
         * @description The underlying HTML element.
         */
        element;
        /**
         * @description Whether or not this wrapper uses its proxy.
         */
        useProxy = true;
        root = document.head;
        /**
         * @description Create a new Turbo element with the given properties.
         * @param {T extends HTMLElement | TurboElementProperties} properties - Object containing properties for
         * configuring a TurboElement, or the HTML element to create the TurboElement from.
         */
        constructor(properties = {}) {
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
        addChildBefore(children, sibling) {
            addChildBefore(this.element, children, sibling);
            return this.useProxy ? this.proxy() : this;
        }
        removeAllChildren() {
            removeAllChildren(this.element);
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
        //Other
        show(b) {
            this.setStyle("display", b ? "" : "none");
            return this.useProxy ? this.proxy() : this;
        }
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

    /**
     * @description Creates a canvas TurboElement with the given properties.
     * @param {TurboProperties<HTMLCanvasElement>} [properties] - The properties object.
     * @returns The Turbo canvas element.
     */
    function canvas(properties = {}) {
        properties.tag = "canvas";
        return element(properties);
    }

    /**
     * @description Creates a div TurboElement with the given properties.
     * @param {TurboProperties<HTMLDivElement>} [properties] - The properties object.
     * @returns The Turbo div element.
     */
    function div(properties = {}) {
        properties.tag = "div";
        return element(properties);
    }

    /**
     * @description Creates a form TurboElement with the given properties.
     * @param {TurboProperties<HTMLFormElement>} [properties] - The properties object.
     * @returns The Turbo form element.
     */
    function form(properties = {}) {
        properties.tag = "form";
        return element(properties);
    }

    /**
     * @description Creates a h1 TurboElement with the given properties.
     * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
     * @returns The Turbo h1 element.
     */
    function h1(properties = {}) {
        properties.tag = "h1";
        return element(properties);
    }

    /**
     * @description Creates a h2 TurboElement with the given properties.
     * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
     * @returns The Turbo h2 element.
     */
    function h2(properties = {}) {
        properties.tag = "h2";
        return element(properties);
    }

    /**
     * @description Creates a h3 TurboElement with the given properties.
     * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
     * @returns The Turbo h3 element.
     */
    function h3(properties = {}) {
        properties.tag = "h3";
        return element(properties);
    }

    /**
     * @description Creates a h TurboElement with the given properties.
     * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
     * @returns The Turbo h element.
     */
    function h4(properties = {}) {
        properties.tag = "h4";
        return element(properties);
    }

    /**
     * @description Creates a h5 TurboElement with the given properties.
     * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
     * @returns The Turbo h5 element.
     */
    function h5(properties = {}) {
        properties.tag = "h5";
        return element(properties);
    }

    /**
     * @description Creates a h6 TurboElement with the given properties.
     * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
     * @returns The Turbo h6 element.
     */
    function h6(properties = {}) {
        properties.tag = "h6";
        return element(properties);
    }

    /**
     * @description Creates a p TurboElement with the given properties.
     * @param {TurboProperties<HTMLParagraphElement>} [properties] - The properties object.
     * @returns The Turbo p element.
     */
    function p(properties = {}) {
        properties.tag = "p";
        return element(properties);
    }

    /**
     * @description Creates a text area TurboElement with the given properties.
     * @param {TurboProperties<HTMLTextAreaElement>} [properties] - The properties object.
     * @returns The Turbo input element.
     */
    function textArea(properties = {}) {
        properties.tag = "textarea";
        return element(properties);
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
     * @description Constructs a single CSS string from a template literal containing CSS rules.
     */
    function css(strings, ...values) {
        let str = "";
        strings.forEach((string, i) => {
            str += string + (values[i] || '');
        });
        return str;
    }

    exports.Dropdown = Dropdown;
    exports.DropdownEntry = DropdownEntry;
    exports.StylesRecord = StylesRecord;
    exports.SvgCache = SvgCache;
    exports.Transition = Transition;
    exports.TurboButton = TurboButton;
    exports.TurboConfig = TurboConfig;
    exports.TurboElement = TurboElement;
    exports.TurboIcon = TurboIcon;
    exports.TurboPopup = TurboPopup;
    exports.TurboWrapper = TurboWrapper;
    exports.addChild = addChild;
    exports.addChildBefore = addChildBefore;
    exports.addClass = addClass;
    exports.addListener = addListener;
    exports.addStylesheet = addStylesheet;
    exports.addStylesheetFile = addStylesheetFile;
    exports.button = button;
    exports.canvas = canvas;
    exports.css = css;
    exports.div = div;
    exports.dropdown = dropdown;
    exports.dropdownEntry = dropdownEntry;
    exports.element = element;
    exports.fetchSvg = fetchSvg;
    exports.flexCol = flexCol;
    exports.flexColCenter = flexColCenter;
    exports.flexRow = flexRow;
    exports.flexRowCenter = flexRowCenter;
    exports.form = form;
    exports.getClosestRoot = getClosestRoot;
    exports.getElement = getElement;
    exports.getFileExtension = getFileExtension;
    exports.h1 = h1;
    exports.h2 = h2;
    exports.h3 = h3;
    exports.h4 = h4;
    exports.h5 = h5;
    exports.h6 = h6;
    exports.icon = icon;
    exports.img = img;
    exports.input = input;
    exports.p = p;
    exports.popup = popup;
    exports.removeAllChildren = removeAllChildren;
    exports.removeChild = removeChild;
    exports.removeClass = removeClass;
    exports.setProperties = setProperties;
    exports.spacer = spacer;
    exports.textArea = textArea;
    exports.toggleClass = toggleClass;

    return exports;

})({});
