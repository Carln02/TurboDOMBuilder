import {element} from "./element";
import {TurboProperties} from "../turboFunctions/element/element.types";
import {ValidElement} from "../types/element.types";

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates an "a" element with the specified properties.
 * @param {TurboProperties<"a">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"a">} The created element.
 */
function a(properties: TurboProperties<"a"> = {}): ValidElement<"a"> {
    return element({...properties, tag: "a"}) as ValidElement<"a">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "canvas" element with the specified properties.
 * @param {TurboProperties<"canvas">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"canvas">} The created element.
 */
function canvas(properties: TurboProperties<"canvas"> = {}): ValidElement<"canvas"> {
    return element({...properties, tag: "canvas"}) as ValidElement<"canvas">;
}


/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "div" element with the specified properties.
 * @param {TurboProperties<"div">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"div">} The created element.
 */
function div(properties: TurboProperties = {}): ValidElement<"div"> {
    return element({...properties, tag: "div"}) as ValidElement<"div">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "form" element with the specified properties.
 * @param {TurboProperties<"form">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"form">} The created element.
 */
function form(properties: TurboProperties<"form"> = {}): ValidElement<"form"> {
    return element({...properties, tag: "form"}) as ValidElement<"form">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h1" element with the specified properties.
 * @param {TurboProperties<"h1">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h1">} The created element.
 */
function h1(properties: TurboProperties<"h1"> = {}): ValidElement<"h1"> {
    return element({...properties, tag: "h1"}) as ValidElement<"h1">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h2" element with the specified properties.
 * @param {TurboProperties<"h2">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h2">} The created element.
 */
function h2(properties: TurboProperties<"h2"> = {}): ValidElement<"h2"> {
    return element({...properties, tag: "h2"}) as ValidElement<"h2">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h3" element with the specified properties.
 * @param {TurboProperties<"h3">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h3">} The created element.
 */
function h3(properties: TurboProperties<"h3"> = {}): ValidElement<"h3"> {
    return element({...properties, tag: "h3"}) as ValidElement<"h3">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h4" element with the specified properties.
 * @param {TurboProperties<"h4">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h4">} The created element.
 */
function h4(properties: TurboProperties<"h4"> = {}): ValidElement<"h4"> {
    return element({...properties, tag: "h4"}) as ValidElement<"h4">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h5" element with the specified properties.
 * @param {TurboProperties<"h5">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h5">} The created element.
 */
function h5(properties: TurboProperties<"h5"> = {}): ValidElement<"h5"> {
    return element({...properties, tag: "h5"}) as ValidElement<"h5">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "h6" element with the specified properties.
 * @param {TurboProperties<"h6">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h6">} The created element.
 */
function h6(properties: TurboProperties<"h6"> = {}): ValidElement<"h6"> {
    return element({...properties, tag: "h6"}) as ValidElement<"h6">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates an "img" element with the specified properties.
 * @param {TurboProperties<"img">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"img">} The created element.
 */
function img(properties: TurboProperties<"img"> = {}): ValidElement<"img"> {
    return element({...properties, tag: "img"}) as ValidElement<"img">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates an "input" element with the specified properties.
 * @param {TurboProperties<"input">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"input">} The created element.
 */
function input(properties: TurboProperties<"input"> = {}): ValidElement<"input"> {
    return element({...properties, tag: "input"}) as ValidElement<"input">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "link" element with the specified properties.
 * @param {TurboProperties<"link">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"link">} The created element.
 */
function link(properties: TurboProperties<"link"> = {}): ValidElement<"link"> {
    return element({...properties, tag: "link"}) as ValidElement<"link">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "p" element with the specified properties.
 * @param {TurboProperties<"p">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"p">} The created element.
 */
function p(properties: TurboProperties<"p"> = {}): ValidElement<"p"> {
    return element({...properties, tag: "p"}) as ValidElement<"p">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "span" element with the specified properties.
 * @param {TurboProperties<"span">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"span">} The created element.
 */
function span(properties: TurboProperties<"span"> = {}): ValidElement<"span"> {
    return element({...properties, tag: "span"}) as ValidElement<"span">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "style" element with the specified properties.
 * @param {TurboProperties<"style">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"style">} The created element.
 */
function style(properties: TurboProperties<"style"> = {}): ValidElement<"style"> {
    return element({...properties, tag: "style"}) as ValidElement<"style">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "textarea" element with the specified properties.
 * @param {TurboProperties<"textarea">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"textarea">} The created element.
 */
function textarea(properties: TurboProperties<"textarea"> = {}): ValidElement<"textarea"> {
    return element({...properties, tag: "textarea"}) as ValidElement<"textarea">;
}

/**
 * @group Element Creation
 * @category Base Elements
 *
 * @description Creates a "video" element with the specified properties.
 * @param {TurboProperties<"video">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"video">} The created element.
 */
function video(properties: TurboProperties<"video"> = {}): ValidElement<"video"> {
    return element({...properties, tag: "video"}) as ValidElement<"video">;
}

export {
    a,
    canvas,
    div,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    img,
    input,
    link,
    p,
    span,
    style,
    textarea,
    video
};