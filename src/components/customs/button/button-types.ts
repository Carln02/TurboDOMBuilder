import {TurboProperties} from "../../../core/definitions/turbo-types";

/**
 * @type {TurboButtonProperties}
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboProperties
 *
 * @property {string | HTMLElement} [buttonText] - The text content of the button.
 * @property {string | HTMLElement} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | HTMLElement} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {HTMLElement | HTMLElement[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {HTMLElement | HTMLElement[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 * @property {"button" | "submit" | "reset"} [type] - The type of the button (Can be "button", "submit", or "reset").
 * @property {keyof HTMLElementTagNameMap} [customTextTag] - The HTML tag to be used for the text element. If not
 * specified, the default tag specified in the Button class will be used.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Button
 * to this instance of Button.
 */
type TurboButtonProperties = TurboProperties & {
    buttonText?: string | HTMLElement;
    leftIcon?: string | HTMLElement;
    rightIcon?: string | HTMLElement;
    leftCustomElements?: HTMLElement | HTMLElement[];
    rightCustomElements?: HTMLElement | HTMLElement[];

    type?: "button" | "submit" | "reset";

    customTextTag?: keyof HTMLElementTagNameMap;
    unsetDefaultClasses?: boolean;
};

/**
 * @type {ButtonChildren}
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {HTMLElement | HTMLElement[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {HTMLElement | null} leftIcon - The icon placed on the left side of the button.
 * @property {HTMLElement | null} text - The text element of the button.
 * @property {HTMLElement | null} rightIcon - The icon placed on the right side of the button.
 * @property {HTMLElement | HTMLElement[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
 */
type ButtonChildren = {
    leftCustomElements: HTMLElement | HTMLElement[] | null,
    leftIcon: HTMLElement | null,
    buttonText: HTMLElement | null,
    rightIcon: HTMLElement | null,
    rightCustomElements: HTMLElement | HTMLElement[] | null,
};

/**
 * @type {TurboButtonConfig}
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {keyof HTMLElementTagNameMap} [defaultTextTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboButtonConfig = {
    defaultTextTag?: keyof HTMLElementTagNameMap;
    defaultClasses?: string | string[];
}

export {TurboButtonProperties, TurboButtonConfig, ButtonChildren};