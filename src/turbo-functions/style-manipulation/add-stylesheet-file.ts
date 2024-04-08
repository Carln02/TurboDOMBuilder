import {element} from "../../turbo-element-creation/element";

/**
 * @description Adds the file at the provided path as a new style element to the provided root.
 * @param {string | undefined} href - The path to the CSS file to add.
 * @param {HTMLHeadElement | ShadowRoot} [root] - The root to which the style element will be added.
 */
function addStylesheetFile(href: string | undefined, root: HTMLHeadElement | ShadowRoot = document.head) {
    if (!href) return;
    const stylesheet = element({tag: "link", rel: "stylesheet", href: href, type: "text/css"});
    root.appendChild(stylesheet);
}

export {addStylesheetFile};