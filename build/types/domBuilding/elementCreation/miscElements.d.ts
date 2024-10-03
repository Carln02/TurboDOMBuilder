import { StylesRoot } from "../turbofication/styleManipulation/styleManipulation.types";
/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string} [styles] - The css string. Use the css literal function for autocompletion.
 * @param {StylesRoot} [root] - The root to which the style element will be added.
 */
declare function stylesheet(styles?: string, root?: StylesRoot): void;
export { stylesheet };
