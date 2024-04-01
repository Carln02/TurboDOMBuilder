import {TurboElement} from "../../../core/turbo-element";
import {TurboIconProperties, TurboIconConfig} from "./icon-types";
import {SvgCache} from "../../../utils/svg/svg-cache";
import {setProperties} from "../../../turbo-functions/element-manipulation/set-properties";

/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
class TurboIcon extends TurboElement {
    private _icon: string;
    private _iconColor: string | null = null;

    private _svg?: SVGElement | null;

    static readonly config: TurboIconConfig = {type: "svg", path: ""};

    private static cache: SvgCache = new SvgCache();

    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties) {
        let type = TurboIcon.getType(properties);
        let path = TurboIcon.getPath(properties, type);

        if (type != "svg") {
            properties.tag = "img";
            properties.src = path;
            if (!properties.alt) properties.alt = properties.icon;
        }

        super(properties);

        if (!properties.unsetDefaultClasses) this.addClass(TurboIcon.config.defaultClasses);
        this.icon = properties.icon;
        this.iconColor = properties.iconColor;

        if (type == "svg") {
            TurboIcon.cache.fetchSvg(path, (svg) => {
                this.svg = svg;
                this.appendChild(this.svg);
                if (this.svg) {
                    if (this.iconColor) this.svg.style.fill = this.iconColor;
                    if (properties.executeOnLoad) properties.executeOnLoad(this.svg);
                }
            });
        }
    }

    private static getType(properties: TurboIconProperties) {
        if (properties.customType) {
            return properties.customType;
        }
        return TurboIcon.config.type || "svg";
    }

    private static getPath(properties: TurboIconProperties, type: string) {
        let directory = properties.customPath
            ? properties.customPath
            : TurboIcon.config.path
                ? TurboIcon.config.path
                : "";

        if (directory.length > 0 && !directory.endsWith("/")) directory += "/";

        return directory + properties.icon + (properties.icon.endsWith("." + type) || type.length == 0 ? "" : "." + type);
    }

    /**
     * @description The name of the icon.
     */
    get icon() {
        return this._icon;
    }

    private set icon(value: string) {
        this._icon = value;
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

    private set svg(value: SVGElement) {
        this._svg = value;
    }

    /**
     * @description The underlying SVG element (if any).
     */
    get svg() {
        return this._svg;
    }
}

customElements.define("turbo-icon", TurboIcon);

function icon(properties: TurboIconProperties): TurboIcon {
    let el = document.createElement("turbo-icon") as TurboIcon;
    setProperties(el, properties);
    return el;
}

export {TurboIcon, icon};