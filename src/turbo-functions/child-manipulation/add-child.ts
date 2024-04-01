/**
 * @description Add children elements to a parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
function addChild(element: HTMLElement, children: HTMLElement | HTMLElement[] | undefined): HTMLElement {
    if (!children) return element;

    //Try to append every provided child (according to its type)
    try {
        if (children instanceof HTMLElement) element.appendChild(children);
        else children.forEach(child => element.appendChild(child));
    } catch (e) {
        console.error(e);
        return element;
    }

    return element;
}

export {addChild};