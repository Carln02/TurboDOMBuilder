import { TurboProperties } from "../turboElement/turboElement.types";
import { ValidElement, ValidTag } from "../core.types";
/**
 * @description Create an element with the specified properties (and the specified namespace if applicable).
 * @param {TurboProperties<Tag>} [properties] - Object containing properties of the element.
 * @returns {ValidElement<Tag>} The created element.
 * @template Tag
 */
declare function element<Tag extends ValidTag>(properties?: TurboProperties<Tag>): ValidElement<Tag>;
/**
 * @description Create an element with the specified properties. Supports SVG and MathML.
 * @param {TurboProperties<Tag>} [properties] - Object containing properties of the element.
 * @returns {ValidElement<Tag>} The created element.
 * @template Tag
 */
declare function blindElement<Tag extends ValidTag>(properties?: TurboProperties<Tag>): ValidElement<Tag>;
export { element, blindElement };
