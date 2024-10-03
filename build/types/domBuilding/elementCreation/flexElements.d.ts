import { TurboProperties } from "../turboElement/turboElement.types";
import { HTMLTag, ValidHTMLElement } from "../core.types";
/**
 * @description Create a flex column element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexCol<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @description Create a flex column element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexColCenter<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @description Create a flex row element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexRow<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @description Create a flex row element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexRowCenter<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @description Create a spacer element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created spacer element.
 * @template {HTMLTag} Tag
 */
declare function spacer<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
export { flexCol, flexColCenter, flexRow, flexRowCenter, spacer };
