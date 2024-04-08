import {HTMLTag, TurboCompatible, TurboProperties} from "../../core/definitions/turbo-types";

/**
 * @type {TurboButtonProperties}
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboProperties
 *
 * @property {string | TurboCompatible} [buttonText] - The text content of the button.
 * @property {string | TurboCompatible} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | TurboCompatible} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {TurboCompatible | TurboCompatible[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {TurboCompatible | TurboCompatible[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 * @property {"button" | "submit" | "reset"} [type] - The type of the button (Can be "button", "submit", or "reset").
 * @property {HTMLTag} [customTextTag] - The HTML tag to be used for the buttonText element (if the latter is passed as
 * a string). If not specified, the default text tag specified in the Button class will be used.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Button
 * to this instance of Button.
 */
type TurboButtonProperties = TurboProperties & {
    buttonText?: string | TurboCompatible;
    leftIcon?: string | TurboCompatible;
    rightIcon?: string | TurboCompatible;
    leftCustomElements?: TurboCompatible | TurboCompatible[];
    rightCustomElements?: TurboCompatible | TurboCompatible[];

    type?: "button" | "submit" | "reset";

    customTextTag?: HTMLTag;
    unsetDefaultClasses?: boolean;
};

/**
 * @type {ButtonChildren}
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {TurboCompatible | TurboCompatible[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {TurboCompatible | null} leftIcon - The icon placed on the left side of the button.
 * @property {TurboCompatible | null} text - The text element of the button.
 * @property {TurboCompatible | null} rightIcon - The icon placed on the right side of the button.
 * @property {TurboCompatible | TurboCompatible[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
 */
type ButtonChildren = {
    leftCustomElements: TurboCompatible | TurboCompatible[] | null,
    leftIcon: TurboCompatible | null,
    buttonText: TurboCompatible | null,
    rightIcon: TurboCompatible | null,
    rightCustomElements: TurboCompatible | TurboCompatible[] | null,
};

/**
 * @type {TurboButtonConfig}
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {HTMLTag} [defaultTextTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboButtonConfig = {
    defaultTextTag?: HTMLTag;
    defaultClasses?: string | string[];
}

export {TurboButtonProperties, TurboButtonConfig, ButtonChildren};