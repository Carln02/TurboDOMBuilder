/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {HTMLElement} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 * @return The element itself
 */
function toggleClass(element: HTMLElement, classes: string | string[] | undefined, force?: boolean): HTMLElement {
    if (!classes) return element;

    try {
        // If string provided --> split by spaces
        if (typeof classes === "string") classes = classes.split(" ");
        classes.filter(entry => entry.trim().length > 0).forEach(entry => {
            if (force != undefined) element.classList.toggle(entry, force);
            else element.classList.toggle(entry);
        });
    } catch (e) {
        console.error(e);
        return element
    }

    return element;
}

export {toggleClass};