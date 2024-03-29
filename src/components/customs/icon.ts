import {TurboElement} from "../../turbo/elements/turbo-element";
import {TurboProperties} from "../../turbo/definitions/turbo-types";

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

/**
 * Icon class for creating icon elements.
 * @class Icon
 * @extends TurboElement
 */
class Icon extends TurboElement {
    private readonly _icon: string;
    private _iconColor: string | null = null;

    private _svg?: SVGElement | null;

    static readonly config: TurboIconConfig = {type: "svg", path: ""};

    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties) {
        let type = properties.customType ? properties.customType : Icon.config.type ? Icon.config.type : "svg";
        let path = (properties.customPath ? properties.customPath : Icon.config.path ? Icon.config.path : "")
            + properties.icon + (properties.icon.endsWith("." + type) || type.length == 0 ? "" : "." + type);

        if (type != "svg") {
            properties.tag = "img";
            properties.src = path;
            if (!properties.alt) properties.alt = properties.icon;
        }

        super(properties);
        if (!properties.unsetDefaultClasses) this.addClass(Icon.config.defaultClasses);

        this._icon = properties.icon;
        if (properties.iconColor) this.iconColor = properties.iconColor;

        if (type == "svg") {
            fetch(path)
                .then(response => {
                    if (!response.ok) throw new Error("Network response was not ok while loading your SVG");
                    return response.text();
                })
                .then(svgText => {
                    this.innerHTML = svgText;
                    this._svg = this.querySelector("svg");

                    if (this._svg) {
                        if (this.iconColor) this._svg.style.fill = this.iconColor;
                        if (properties.executeOnLoad) properties.executeOnLoad(this._svg);
                    }
                })
                .catch(error => console.error("Error fetching SVG:", error));
        }
    }

    /**
     * @description The name of the icon.
     */
    get icon() {
        return this._icon;
    }

    /**
     * @description The assigned color to the icon (if any)
     */
    get iconColor() {
        return this._iconColor;
    }

    set iconColor(value: string | null) {
        this._iconColor = value;
        if (this.svg && value) this.svg.style.fill = value;
    }

    /**
     * @description The underlying SVG element (if any).
     */
    get svg() {
        return this._svg;
    }
}

/**
 * Class for creating icon buttons.
 * @class IconButton
 * @extends Icon
 */
class IconButton extends Icon {
    static readonly config: TurboIconButtonConfig = {};

    /**
     * Creates an instance of IconButton.
     * @param {TurboIconProperties} properties - Properties to configure the button and its icon.
     */
    constructor(properties: TurboIconProperties) {
        super(properties);
        if (!properties.unsetDefaultClasses) this.addClass(IconButton.config.defaultClasses);
    }
}

customElements.define("turbo-icon", Icon);
customElements.define("turbo-icon-button", IconButton);

export {Icon, IconButton, TurboIconProperties, TurboIconConfig, TurboIconButtonConfig};