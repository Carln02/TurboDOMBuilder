/**
 * @description Remove children elements from a parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
function removeChild(element: HTMLElement, children: HTMLElement | HTMLElement[] | undefined): HTMLElement {
    if (!children) return element;

    //Try to remove every provided child (according to its type)
    try {
        if (children instanceof HTMLElement) element.removeChild(children);
        else children.forEach(child => element.removeChild(child));
    } catch (e) {
        console.error(e);
        return element;
    }

    return element;
}

export {removeChild};