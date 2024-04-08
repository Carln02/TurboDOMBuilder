/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string | undefined} styles - The css string. Use the css literal function for autocompletion.
 * @param {HTMLHeadElement | ShadowRoot} [root] - The root to which the style element will be added.
 */
function addStylesheet(styles: string | undefined, root: HTMLHeadElement | ShadowRoot = document.head) {
    if (!styles) return;
    const stylesheet = document.createElement("style");
    stylesheet.innerHTML = styles;
    root.appendChild(stylesheet);
}

export {addStylesheet};