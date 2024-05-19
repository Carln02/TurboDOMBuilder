import {style} from "../basic/basicGeneratedFunctions";
import {StylesRoot} from "../../turboElement/turboElement.types";

/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string | undefined} styles - The css string. Use the css literal function for autocompletion.
 * @param {StylesRoot} [root] - The root to which the style element will be added.
 */
function stylesheet(styles: string | undefined, root: StylesRoot = document.head) {
    if (!styles) return;
    const stylesheet = style({innerHTML: styles});
    root.appendChild(stylesheet);
}

export {stylesheet};