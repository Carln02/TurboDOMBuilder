import {HTMLTag} from "../../../core.types";
import {TurboButton} from "./button";
import {TurboRichElementConfig} from "../richElement/richElement.types";

/**
 * @type {TurboButtonConfig}
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {ValidTag} [defaultElementTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboButtonConfig = TurboRichElementConfig;

declare module "../../../core.types" {
    interface TurboElementTagNameMap {
        "turbo-button": TurboButton
    }
}

export {TurboButtonConfig};