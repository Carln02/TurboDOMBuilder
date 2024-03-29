import {TurboProperties} from "../turbo/definitions/turbo-types";
import {TurboWrapper} from "../turbo/elements/turbo-wrapper";
import {TurboDiv} from "./basics/div";
import {TurboImage} from "./basics/image";
import {TurboInput} from "./basics/input";

/**
 * @description Create an HTML element with specified properties.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created element.
 */
function element(properties: TurboProperties = {}) {
    if (!properties.tag) properties.tag = "div";
    switch (properties.tag) {
        case "div" || "turbo-div":
            return new TurboDiv(properties);
        case "img" || "turbo-img":
            return new TurboImage(properties);
        case "input" || "turbo-input":
            return new TurboInput(properties);
        default:
            return new TurboWrapper(properties);
    }
}

/**
 * @description Create a spacer element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created spacer element
 */
function spacer(properties?: TurboProperties<HTMLDivElement>) {
    return element(properties).setStyle("flexGrow", "1");
}

/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created flex element
 */
function flexRow(properties?: TurboProperties) {
    return element(properties)
        .setStyle("display", "flex")
        .setStyle("flexDirection", "row");
}

/**
 * @description Create a flex column element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created flex element
 */
function flexCol(properties?: TurboProperties) {
    return element(properties)
        .setStyle("display", "flex")
        .setStyle("flexDirection", "column");
}

/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created flex element
 */
function flexRowCenter(properties?: TurboProperties) {
    return flexRow(properties)
        .setStyle("justifyContent", "center")
        .setStyle("alignItems", "center");
}

/**
 * @description Create a flex column element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns The created flex element
 */
function flexColCenter(properties?: TurboProperties) {
    return flexCol(properties)
        .setStyle("justifyContent", "center")
        .setStyle("alignItems", "center");
}

export {element, spacer, flexRow, flexCol, flexRowCenter, flexColCenter};