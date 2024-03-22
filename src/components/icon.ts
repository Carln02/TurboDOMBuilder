import {TurboElement, TurboElementProperties} from "../turbo-element";

/**
 * @type {TurboIconProperties}
 * @description Properties object that extends TurboElementProperties with properties specific to icons.
 * @extends TurboElementProperties
 *
 * @property {string} icon - The name of the icon.
 * @property {string} [color] - The color of the icon.
 * @property {string} [customType] - Custom type of the icon, overrides the default type assigned to Icon.type
 * (whose default value is "svg").
 * @property {string} [customPath] - Custom path to the icon, overrides the default path assigned to Icon.path.
 */
type TurboIconProperties = TurboElementProperties & {
    icon: string;
    color?: string;
    customType?: string;
    customPath?: string;
};

/**
 * Icon class for creating icon elements.
 * @class Icon
 * @extends TurboElement
 */
class Icon extends TurboElement<HTMLImageElement | HTMLButtonElement | HTMLElement> {
    private readonly _icon: string;
    private _color: string | null = null;

    private _svg: SVGElement | null;

    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties) {
        let type = properties.customType ? properties.customType : Icon.type;
        let path = (properties.customPath ? properties.customPath : Icon.path) + properties.icon +
            (properties.icon.endsWith("." + type) || type.length == 0 ? "" : "." + type);

        if (type != "svg") {
            properties.tag = "img";
            properties.src = path;
            if (!properties.alt) properties.alt = properties.icon;
        }

        super(properties);
        this.addClass(Icon.defaultClasses);

        this._icon = properties.icon;
        this.color = properties.color;

        if (type == "svg") {
            fetch(path)
                .then(response => {
                    if (!response.ok) throw new Error("Network response was not ok while loading your SVG");
                    return response.text();
                })
                .then(svgText => {
                    this.element.innerHTML = svgText;
                    this._svg = this.element.querySelector("svg");
                    this._svg.style.fill = this.color;
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
    get color() {
        return this._color;
    }

    set color(value: string | null) {
        this._color = value;
        if (this.svg) this.svg.style.fill = this.color;
    }

    /**
     * @description The underlying SVG element (if any).
     */
    get svg() {
        return this._svg;
    }

    //Static fields

    private static _type: string = "svg";
    private static _path: string = "";
    private static _defaultClasses: string | string[] = null;

    /**
     * @description The default type to assign to newly created Icons. Defaults to "svg".
     */
    static get type() {
        return this._type;
    }

    static set type(value: string) {
        this._type = value.toLowerCase();
    }

    /**
     * @description The default path to the directory containing the icons in the project. Specify the directory once
     * here to not type it again at every Icon generation.
     */
    static get path() {
        return this._path;
    }

    static set path(value: string) {
        this._path = value;
        if (value.length > 0 && !value.endsWith("/")) this._path += "/";
    }

    /**
     * @description The default classes to assign to newly created icons.
     */
    static get defaultClasses() {
        return this._defaultClasses;
    }

    static set defaultClasses(value: string | string[] | null) {
        this._defaultClasses = value;
    }
}

/**
 * Class for creating icon buttons.
 * @class IconButton
 * @extends Icon
 */
class IconButton extends Icon {
    /**
     * Creates an instance of IconButton.
     * @param {TurboIconProperties} properties - Properties to configure the button and its icon.
     */
    constructor(properties: TurboIconProperties) {
        properties.tag = "button";
        super(properties);
    }
}

/**
 * @description Creates a TurboElement Icon.
 * @param {TurboIconProperties} properties - Object containing properties of the icon.
 * @returns {Icon} The created Turbo icon.
 */
function icon(properties: TurboIconProperties): Icon {
    return new Icon(properties);
}

/**
 * @description Creates a TurboElement IconButton.
 * @param {TurboIconProperties} properties - Object containing properties of the icon and the button.
 * @returns {IconButton} The created Turbo icon button.
 */
function iconButton(properties: TurboIconProperties): IconButton {
    return new IconButton(properties);
}

export {Icon, IconButton, icon, iconButton, TurboIconProperties};