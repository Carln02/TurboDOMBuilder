import {TurboProperties} from "../../core/definitions/turbo-types";
import {element} from "../element";

/**
 * @description Creates a text area TurboElement with the given properties.
 * @param {TurboProperties<HTMLTextAreaElement>} [properties] - The properties object.
 * @returns The Turbo input element.
 */
function textArea(properties: TurboProperties<HTMLTextAreaElement> = {}): HTMLTextAreaElement {
    properties.tag = "textarea";
    return element(properties) as HTMLTextAreaElement;
}

export {textArea};