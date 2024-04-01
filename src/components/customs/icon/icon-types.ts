import {TurboProperties} from "../../../core/definitions/turbo-types";

/**
 * @type {TurboIconProperties}
 * @description Properties object that extends TurboElementProperties with properties specific to icons.
 * @extends TurboProperties
 *
 * @property {string} icon - The name of the icon.
 * @property {string} [iconColor] - The color of the icon.
 * @property {((svg: SVGElement) => {})} [executeOnLoad] - Custom function that takes an SVG element to execute on the
 * SVG icon (if it is one) once it is loaded. This property will be disregarded if the icon is not of type SVG.
 *
 * @property {string} [customType] - Custom type of the icon, overrides the default type assigned to Icon.type
 * (whose default value is "svg").
 * @property {string} [customPath] - Custom path to the icon, overrides the default path assigned to Icon.path.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Icon
 * to this instance of Icon.
 */
type TurboIconProperties = TurboProperties & {
    icon: string;
    iconColor?: string;
    executeOnLoad?: ((svg: SVGElement) => {});

    customType?: string;
    customPath?: string;
    unsetDefaultClasses?: boolean;
};

/**
 * @type {TurboIconConfig}
 * @description Configuration object for the Icon class. Set it via TurboConfig.Icon.
 *
 * @property {string} [type] - The default type to assign to newly created Icons. Defaults to "svg".
 * @property {string} [[path]] - The default path to the directory containing the icons in the project. Specify the
 * directory once here to not type it again at every Icon generation.
 * @property {string} [customType] - Custom type of the icon, overrides the default type assigned to Icon.type.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created icons.
 */
type TurboIconConfig = {
    type?: string;
    path?: string;
    defaultClasses?: string | string[];
}

/**
 * @type {TurboIconButtonConfig}
 * @description Configuration object for the IconButton class. Set it via TurboConfig.IconButton. Note that all Icon
 * configs are also applied to the IconButton class.
 *
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created icons.
 */
type TurboIconButtonConfig = {
    defaultClasses?: string | string[];
}

export {TurboIconProperties, TurboIconButtonConfig, TurboIconConfig};