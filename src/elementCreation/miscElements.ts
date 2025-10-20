import {style} from "./basicElements";
import {StylesRoot} from "../turboFunctions/style/style.types";
import {$} from "../turboFunctions/turboFunctions";

/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string} [styles] - The css string. Use the css literal function for autocompletion.
 * @param {StylesRoot} [root] - The root to which the style element will be added.
 */
function stylesheet(styles?: string, root: StylesRoot = document.head) {
    if (!styles) return;
    const stylesheet = style({innerHTML: styles});
    $(root).addChild(stylesheet);
}

export {stylesheet};