/**
 * @description Remove all children of the given parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @return The element itself
 */
function removeAllChildren(element: HTMLElement): HTMLElement {
    try {
        Array.from(element.children).forEach(child => child.remove());
        return element;
    } catch (e) {
        console.error(e);
        return element;
    }
}

export {removeAllChildren};
