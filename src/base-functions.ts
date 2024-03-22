import {TurboElement} from "./turbo-element";

/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
function addClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined) {
    if (!classes) return;
    //Extract HTML element
    let el: HTMLElement = element instanceof TurboElement ? element.element : element;

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
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 */
function removeClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined) {
    if (!classes) return;
    //Extract HTML element
    let el: HTMLElement = element instanceof TurboElement ? element.element : element;

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
 * @param {TurboElement | HTMLElement} element - Turbo element or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 */
function toggleClass(element: TurboElement | HTMLElement, classes: string | string[] | undefined, force?: boolean) {
    if (!classes) return;
    //Extract HTML element
    let el: HTMLElement = element instanceof TurboElement ? element.element : element;

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
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
function addChild(element: TurboElement | HTMLElement, children: TurboElement | HTMLElement |
    TurboElement[] | HTMLElement[] | undefined) {
    if (!children) return;

    //Extract HTML element
    let el: HTMLElement = element instanceof TurboElement ? element.element : element;

    //Try to append every provided child (according to its type)
    try {
        if (children instanceof TurboElement) el.appendChild(children.element);
        else if (children instanceof HTMLElement) el.appendChild(children);
        else children.forEach((child: TurboElement | HTMLElement) =>
                el.appendChild(child instanceof TurboElement ? child.element : child));
    } catch (e) {
        console.error(e);
    }

    return element;
}

/**
 * @description Remove children elements from a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 */
function removeChild(element: TurboElement | HTMLElement, children: TurboElement | HTMLElement |
    TurboElement[] | HTMLElement[] | undefined) {
    if (!children) return;

    //Extract HTML element
    let el: HTMLElement = element instanceof TurboElement ? element.element : element;

    //Try to remove every provided child (according to its type)
    try {
        if (children instanceof TurboElement) el.removeChild(children.element);
        else if (children instanceof HTMLElement) el.removeChild(children);
        else children.forEach(child =>
                el.removeChild(child instanceof TurboElement ? child.element : child));
    } catch (e) {
        console.error(e);
    }

    return element;
}

/**
 * @description Add children elements to a parent element.
 * @param {TurboElement | HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {TurboElement | HTMLElement} sibling - Sibling Turbo or HTML DOM element
 */
function addBefore(element: TurboElement | HTMLElement, children: TurboElement |
    HTMLElement | (TurboElement | HTMLElement)[] | undefined, sibling: TurboElement | HTMLElement) {
    if (!children) return;

    //Extract HTML element
    let el: HTMLElement = element instanceof TurboElement ? element.element : element;

    //Extract HTML sibling element
    let siblingEl: HTMLElement = sibling instanceof TurboElement ? sibling.element : sibling;

    //Try to append every provided child (according to its type)
    try {
        if (children instanceof TurboElement) el.insertBefore(children.element, siblingEl);
        else if (children instanceof HTMLElement) el.insertBefore(children, siblingEl);
        else children.forEach((child: TurboElement | HTMLElement) =>
                el.insertBefore(child instanceof TurboElement ? child.element : child, siblingEl));
    } catch (e) {
        console.error(e);
    }

    return element;
}

export {addClass, removeClass, toggleClass, addChild, removeChild, addBefore};