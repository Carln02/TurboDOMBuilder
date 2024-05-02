import {element} from "../../turbo-element-creation/element";
import {StylesRoot} from "../../core/definitions/turbo-types";

/**
 * @description Adds the file at the provided path as a new style element to the provided root.
 * @param {string | undefined} href - The path to the CSS file to add.
 * @param {StylesRoot} [root] - The root to which the style element will be added.
 */
function addStylesheetFile(href: string | undefined, root: StylesRoot = document.head) {
    if (!href) return;
    const stylesheet = element({tag: "link", rel: "stylesheet", href: href, type: "text/css"});
    root.appendChild(stylesheet);
}

export {addStylesheetFile};