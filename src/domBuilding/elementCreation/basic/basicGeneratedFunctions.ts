import {generateTagFunction} from "./generateTagFunction";

/**
 * @description Creates an "a" element with the specified properties.
 * @param {TurboProperties<"a">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["a"]} The created element.
 */
const a = generateTagFunction("a");

/**
 * @description Creates a canvas element with the specified properties.
 * @param {TurboProperties<"canvas">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["canvas"]} The created element.
 */
const canvas = generateTagFunction("canvas");

/**
 * @description Creates a div element with the specified properties.
 * @param {TurboProperties<"div">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["div"]} The created element.
 */
const div = generateTagFunction("div");

/**
 * @description Creates a form element with the specified properties.
 * @param {TurboProperties<"form">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["form"]} The created element.
 */
const form = generateTagFunction("form");

/**
 * @description Creates a h1 element with the specified properties.
 * @param {TurboProperties<"h1">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h1"]} The created element.
 */
const h1 = generateTagFunction("h1");

/**
 * @description Creates a h2 element with the specified properties.
 * @param {TurboProperties<"h2">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h2"]} The created element.
 */
const h2 = generateTagFunction("h2");

/**
 * @description Creates a h3 element with the specified properties.
 * @param {TurboProperties<"h3">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h3"]} The created element.
 */
const h3 = generateTagFunction("h3");

/**
 * @description Creates a h4 element with the specified properties.
 * @param {TurboProperties<"h4">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h4"]} The created element.
 */
const h4 = generateTagFunction("h4");

/**
 * @description Creates a h5 element with the specified properties.
 * @param {TurboProperties<"h5">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h5"]} The created element.
 */
const h5 = generateTagFunction("h5");

/**
 * @description Creates a h6 element with the specified properties.
 * @param {TurboProperties<"h6">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h6"]} The created element.
 */
const h6 = generateTagFunction("h6");

/**
 * @description Creates an image element with the specified properties.
 * @param {TurboProperties<"img">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["img"]} The created element.
 */
const img = generateTagFunction("img");

/**
 * @description Creates an input element with the specified properties.
 * @param {TurboProperties<"input">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["input"]} The created element.
 */
const input = generateTagFunction("input");

/**
 * @description Creates a link element with the specified properties.
 * @param {TurboProperties<"link">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["link"]} The created element.
 */
const link = generateTagFunction("link");

/**
 * @description Creates a p element with the specified properties.
 * @param {TurboProperties<"p">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["p"]} The created element.
 */
const p = generateTagFunction("p");

/**
 * @description Creates a style element with the specified properties.
 * @param {TurboProperties<"style">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["style"]} The created element.
 */
const style = generateTagFunction("style");

/**
 * @description Creates a textarea element with the specified properties.
 * @param {TurboProperties<"textarea">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["textarea"]} The created element.
 */
const textarea = generateTagFunction("textarea");

/**
 * @description Creates a video element with the specified properties.
 * @param {TurboProperties<"video">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["video"]} The created element.
 */
const video = generateTagFunction("video");

export {a, canvas, div, form, h1, h2, h3, h4, h5, h6, img, input, link, p, style, textarea, video};