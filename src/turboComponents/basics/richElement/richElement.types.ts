import {TurboIcon} from "../icon/icon";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboProperties} from "../../../turboFunctions/element/element.types";
import {TurboElementConfig, TurboElementProperties} from "../../../turboElement/turboElement.types";
import {TurboEmitter} from "../../../mvc/core/emitter";
import {TurboRichElement} from "./richElement";
import {ValidElement, ValidTag} from "../../../types/element.types";
import {HTMLTag} from "../../../types/htmlElement.types";

/**
 * @type {TurboRichElementProperties}
 * @group Components
 * @category TurboRichElement
 *
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboProperties
 *
 * @property {string} [text] - The text to set to the rich element's main element.
 *
 * @property {Element | Element[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {string | TurboIcon} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | TurboProperties<ElementTag> | ValidElement<ElementTag>} [buttonText] - The text content of the button.
 * @property {string | TurboIcon} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {Element | Element[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 *
 * @property {ValidTag} [customTextTag] - The HTML tag to be used for the buttonText element (if the latter is passed as
 * a string). If not specified, the default text tag specified in the Button class will be used.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Button
 * to this instance of Button.
 *
 * @template {ValidTag} ElementTag="p"
 */
type TurboRichElementProperties<
    ElementTag extends ValidTag = "div",
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & {
    elementTag?: ElementTag,
    text?: string;

    leftCustomElements?: Element | Element[],
    leftIcon?: string | TurboIcon,
    prefixEntry?: string | HTMLElement,
    element?: string | TurboProperties<ElementTag> | ValidElement<ElementTag>,
    suffixEntry?: string | HTMLElement,
    rightIcon?: string | TurboIcon,
    rightCustomElements?: Element | Element[],
};

/**
 * @type {TurboRichElementConfig}
 * @group Components
 * @category TurboRichElement
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {HTMLTag} [defaultElementTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboRichElementConfig = TurboElementConfig & {
    defaultElementTag?: HTMLTag
}

declare module "../../../types/element.types" {
    interface TurboElementTagNameMap {
        "turbo-rich-element": TurboRichElement
    }
}

export {TurboRichElementProperties, TurboRichElementConfig};