import {TurboCustomProperties, TurboProperties} from "../../../domBuilding/turboElement/turboElement.types";
import {HTMLTag, ValidElement, ValidTag} from "../../../domBuilding/core.types";
import {TurboIcon} from "../icon/icon";
import {TurboView} from "../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../domBuilding/mvc/turboModel";
import {TurboEmitter} from "../../../domBuilding/mvc/turboEmitter";

/**
 * @type {TurboRichElementProperties}
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
    ModelType extends TurboModel = TurboModel
> = TurboCustomProperties<ViewType, DataType, ModelType> & {
    elementTag?: ElementTag,
    text?: string;

    leftCustomElements?: Element | Element[],
    leftIcon?: string | TurboIcon,
    prefixEntry?: string | HTMLElement,
    element?: string | TurboProperties<ElementTag> | ValidElement<ElementTag>,
    suffixEntry?: string | HTMLElement,
    rightIcon?: string | TurboIcon,
    rightCustomElements?: Element | Element[],

    unsetDefaultClasses?: boolean
};

type TurboRichElementData = {
    leftCustomElements?: Element | Element[];
    leftIcon?: string;
    prefixEntry?: string;
    text?: string;
    suffixEntry?: string;
    rightIcon?: string;
    rightCustomElements?: Element | Element[];
    elementTag?: string;
};


/**
 * @type {TurboRichElementChildren}
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {Element | Element[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {Element | null} leftIcon - The icon placed on the left side of the button.
 * @property {Element | null} text - The text element of the button.
 * @property {Element | null} rightIcon - The icon placed on the right side of the button.
 * @property {Element | Element[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
 */
type TurboRichElementChildren<ElementTag extends ValidTag = "p"> = {
    leftCustomElements: Element | Element[],
    leftIcon: TurboIcon,
    prefixEntry?: HTMLElement,
    element: ValidElement<ElementTag>,
    suffixEntry?: HTMLElement,
    rightIcon: TurboIcon,
    rightCustomElements: Element | Element[],
};

/**
 * @type {TurboRichElementConfig}
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {HTMLTag} [defaultElementTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboRichElementConfig = {
    defaultElementTag?: HTMLTag,
    defaultClasses?: string | string[],
}

export {TurboRichElementProperties, TurboRichElementConfig, TurboRichElementChildren, TurboRichElementData};