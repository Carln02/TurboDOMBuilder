import {TurboProperties} from "../../core/definitions/turbo-types";
import {Turbo} from "../../core/turbo";
import {setProperties} from "../../turbo-functions/element-manipulation/set-properties";

/**
 * @class TurboTextArea
 * @extends HTMLTextAreaElement
 * @implements ITurbo
 * @description TextArea TurboElement class, extending the base HTML TextArea element with a few powerful tools and functions.
 */
class TurboTextArea extends Turbo(HTMLTextAreaElement) {
    constructor(properties: TurboProperties<HTMLTextAreaElement> = {}) {
        super(properties);
    }
}

customElements.define("turbo-textarea", TurboTextArea, {extends: "textarea"});

/**
 * @description Creates a text area TurboElement with the given properties.
 * @param {TurboProperties<HTMLTextAreaElement>} [properties] - The properties object.
 * @returns The Turbo input element.
 */
function textArea(properties: TurboProperties<HTMLTextAreaElement> = {}): TurboTextArea {
    let el = document.createElement("turbo-textarea") as TurboTextArea;
    setProperties(el, properties);
    return el;
}

export {TurboTextArea, textArea};