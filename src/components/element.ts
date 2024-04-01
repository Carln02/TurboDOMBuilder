import {TurboProperties} from "../core/definitions/turbo-types";
import {TurboDiv} from "./basics/div";
import {TurboImage} from "./basics/img";
import {TurboInput} from "./basics/input";
import {createWithProperties} from "../turbo-functions/element-manipulation/create-with-properties";
import {TurboH1} from "./basics/h1";
import {TurboH4} from "./basics/h4";
import {TurboH5} from "./basics/h5";
import {TurboH3} from "./basics/h3";
import {TurboH2} from "./basics/h2";
import {TurboH6} from "./basics/h6";
import {TurboP} from "./basics/p";
import {TurboTextArea} from "./basics/textArea";

/**
 * @description Create a Turbo or HTML element with the specified properties.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created Turbo or HTML element.
 */
function element(properties: TurboProperties = {}): HTMLElement {
    if (!properties.tag) properties.tag = "div";
    switch (properties.tag) {
        case "div" || "turbo-div":
            return new TurboDiv(properties);
        case "h1" || "turbo-h1":
            return new TurboH1(properties);
        case "h2" || "turbo-h2":
            return new TurboH2(properties);
        case "h3" || "turbo-h3":
            return new TurboH3(properties);
        case "h4" || "turbo-h4":
            return new TurboH4(properties);
        case "h5" || "turbo-h5":
            return new TurboH5(properties);
        case "h6" || "turbo-h6":
            return new TurboH6(properties);
        case "img" || "turbo-img":
            return new TurboImage(properties);
        case "input" || "turbo-input":
            return new TurboInput(properties);
        case "p" || "turbo-p":
            return new TurboP(properties);
        case "textarea" || "turbo-textarea":
            return new TurboTextArea(properties);
        default:
            return createWithProperties(properties);
    }
}

export {element};