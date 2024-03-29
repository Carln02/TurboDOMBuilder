import {TurboCompatible, TurboProperties} from "../definitions/turbo-types";
import {TurboWrapper} from "../elements/turbo-wrapper";

/**
 * Sets the declared properties to the provided element.
 * @param {TurboCompatible} element - The element onto which the properties will be applied.
 * @param {TurboProperties} [properties] - The properties object.
 */
function setProperties(element: TurboCompatible, properties: TurboProperties = {}) {
    Object.keys(properties).forEach(property => {
        switch (property) {
            case "tag" || "shadowDOM":
                return;
            case "text":
                if (!properties.text) return;
                if (element instanceof TurboWrapper) element.element.innerText = properties.text;
                else element.innerText = properties.text;
                return;
            case "style":
                if (element instanceof TurboWrapper) element.element.style.cssText += properties.style;
                else element.style.cssText += properties.style;
                return;
            case "stylesheet":
                if (!properties.stylesheet) return;
                addStylesheet(properties.stylesheet, "root" in element ? element.root : document.head);
                return;
            case "classes":
                addClass(element, properties.classes);
                return;
            case "listeners":
                if (!properties.listeners) return;
                Object.keys(properties.listeners).forEach(listenerType =>
                    addListener(element, listenerType, properties.listeners[listenerType]));
                return;
            case "children":
                addChild(element, properties.children);
                return;
            case "parent":
                if (!properties.parent) return;
                addChild(properties.parent, element);
                return;
            case "useProxy":
                if (!properties.useProxy) return;
                if ("useProxy" in element) element.useProxy = properties.useProxy;
                return;
            default:
                element.setAttribute(property, properties[property]);
                return;
        }
    });
}

/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboCompatible} element - Turbo wrapper or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
function addClass(element: TurboCompatible, classes: string | string[] | undefined) {
    if (!classes) return;
    //Extract HTML element
    let el: HTMLElement = element instanceof TurboWrapper ? element.element : element;

    try {
        // If string provided --> split by spaces
        if (typeof classes === "string") classes = classes.split(" ");
        classes.forEach(entry => el.classList.add(entry));
    } catch (e) {
        console.error(e);
    }

    return element;
}

/**
 * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboCompatible} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
function removeClass(element: TurboCompatible, classes: string | string[] | undefined) {
    if (!classes) return;
    //Extract HTML element
    let el: HTMLElement = element instanceof TurboWrapper ? element.element : element;

    try {
        // If string provided --> split by spaces
        if (typeof classes === "string") classes = classes.split(" ");
        classes.forEach(entry => el.classList.remove(entry));
    } catch (e) {
        console.error(e);
    }

    return element;
}

/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboCompatible} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 */
function toggleClass(element: TurboCompatible, classes: string | string[] | undefined, force?: boolean) {
    if (!classes) return;
    //Extract HTML element
    let el: HTMLElement = element instanceof TurboWrapper ? element.element : element;

    try {
        // If string provided --> split by spaces
        if (typeof classes === "string") classes = classes.split(" ");
        classes.forEach(entry => {
            if (force == undefined) el.classList.toggle(entry);
            else el.classList.toggle(entry);
        });
    } catch (e) {
        console.error(e);
    }

    return element;
}

/**
 * @description Add children elements to a parent element.
 * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
 * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
function addChild(element: TurboCompatible, children: TurboCompatible | TurboCompatible[] | undefined) {
    if (!children) return;

    //Extract HTML element
    let el: HTMLElement = element instanceof TurboWrapper ? element.element : element;

    //Try to append every provided child (according to its type)
    try {
        if (children instanceof TurboWrapper) el.appendChild(children.element);
        else if (children instanceof HTMLElement) el.appendChild(children);
        else children.forEach((child: TurboWrapper | HTMLElement) =>
                el.appendChild(child instanceof TurboWrapper ? child.element : child));
    } catch (e) {
        console.error(e);
    }

    return element;
}

/**
 * @description Remove children elements from a parent element.
 * @param {TurboCompatible} element - Parent Turbo or HTML DOM element
 * @param {TurboCompatible | TurboCompatible[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
function removeChild(element: TurboCompatible, children: TurboCompatible | TurboCompatible[] | undefined) {
    if (!children) return;

    //Extract HTML element
    let el: HTMLElement = element instanceof TurboWrapper ? element.element : element;

    //Try to remove every provided child (according to its type)
    try {
        if (children instanceof TurboWrapper) el.removeChild(children.element);
        else if (children instanceof HTMLElement) el.removeChild(children);
        else children.forEach(child =>
                el.removeChild(child instanceof TurboWrapper ? child.element : child));
    } catch (e) {
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
 */
function addBefore(element: TurboCompatible, children: TurboCompatible | TurboCompatible[] | undefined,
                   sibling: TurboCompatible) {
    if (!children) return;

    //Extract HTML element
    let el: HTMLElement = element instanceof TurboWrapper ? element.element : element;

    //Extract HTML sibling element
    let siblingEl: HTMLElement = sibling instanceof TurboWrapper ? sibling.element : sibling;

    //Try to append every provided child (according to its type)
    try {
        if (children instanceof TurboWrapper) el.insertBefore(children.element, siblingEl);
        else if (children instanceof HTMLElement) el.insertBefore(children, siblingEl);
        else children.forEach((child: TurboWrapper | HTMLElement) =>
                el.insertBefore(child instanceof TurboWrapper ? child.element : child, siblingEl));
    } catch (e) {
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
 * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
 */
function addListener(element: TurboCompatible, type: string, listener: EventListenerOrEventListenerObject |
                              ((e: Event, el: TurboCompatible) => void), options?: boolean | AddEventListenerOptions) {
    if (element instanceof TurboWrapper) element = element.element;
    const wrappedListener = (e: Event) => {
        if (typeof listener === "function") listener(e, element);
        else if (typeof listener === "object" && listener.handleEvent) listener.handleEvent(e);
    };

    element.addEventListener(type, wrappedListener as EventListenerOrEventListenerObject, options);
}

/**
 * @description Constructs a single CSS string from a template literal containing CSS rules.
 */
function css(strings: TemplateStringsArray, ...values: any[]): string {
    let str = "";
    strings.forEach((string, i) => {
        str += string + (values[i] || '');
    });
    return str;
}

/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string} styles - The css string. Use the css literal function for autocompletion.
 * @param {HTMLHeadElement | ShadowRoot} [root] - The root to which the style element will be added.
 */
function addStylesheet(styles: string, root: HTMLHeadElement | ShadowRoot = document.head) {
    const stylesheet = document.createElement("style");
    stylesheet.innerHTML = styles;
    root.appendChild(stylesheet);
}

export {setProperties, addClass, removeClass, toggleClass, addChild, removeChild, addBefore, addListener,
    css, addStylesheet};