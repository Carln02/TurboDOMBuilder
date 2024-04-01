/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {HTMLElement} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
function addClass(element: HTMLElement, classes: string | string[] | undefined): HTMLElement {
    if (!classes) return element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string") classes = classes.split(" ");
        classes.filter(entry => entry.trim().length > 0).forEach(entry => element.classList.add(entry));
    } catch (e) {
        console.error(e);
        return element;
    }

    return element;
}

export {addClass};