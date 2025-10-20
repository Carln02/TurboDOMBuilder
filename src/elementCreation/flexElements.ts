import {element} from "./element";
import {HTMLTag, ValidHTMLElement} from "../core.types";
import {$} from "../turboFunctions/turboFunctions";
import {TurboProperties} from "../turboFunctions/element/element.types";

/**
 * @description Create a flex column element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
function flexCol<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag> {
    const el = element(properties) as ValidHTMLElement<Tag>;
    $(el).setStyles({display: "flex", flexDirection: "column"}, true);
    return el;
}

/**
 * @description Create a flex column element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
function flexColCenter<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag> {
    const el = flexCol(properties);
    $(el).setStyles({justifyContent: "center", alignItems: "center"}, true);
    return el;
}

/**
 * @description Create a flex row element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
function flexRow<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag> {
    const el = element(properties) as ValidHTMLElement<Tag>;
    $(el).setStyles({display: "flex", flexDirection: "row"}, true);
    return el;
}

/**
 * @description Create a flex row element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
function flexRowCenter<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag> {
    const el = flexRow(properties);
    $(el).setStyles({justifyContent: "center", alignItems: "center"}, true);
    return el;
}

/**
 * @description Create a spacer element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created spacer element.
 * @template {HTMLTag} Tag
 */
function spacer<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag> {
    const el = element(properties) as ValidHTMLElement<Tag>;
    $(el).setStyle("flexGrow", 1, true);
    return el;
}

export {flexCol, flexColCenter, flexRow, flexRowCenter, spacer};

