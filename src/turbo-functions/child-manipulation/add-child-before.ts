/**
 * @description Add children elements to a parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {HTMLElement} sibling - Sibling Turbo or HTML DOM element
 * @return The element itself
 */
function addChildBefore(element: HTMLElement, children: HTMLElement | HTMLElement[] | undefined,
                   sibling: HTMLElement): HTMLElement {
    if (!children) return element;

    //Try to append every provided child (according to its type)
    try {
        if (children instanceof HTMLElement) element.insertBefore(children, sibling);
        else children.forEach((child: HTMLElement) => element.insertBefore(child, sibling));
    } catch (e) {
        console.error(e);
        return element
    }

    return element;
}

export {addChildBefore};