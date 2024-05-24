import {TurboElement} from "../../../domBuilding/turboElement/turboElement";
import {TurboIconProperties, TurboIconConfig} from "./icon.types";
import {SvgCache} from "../../../utils/dataManipulation/svgManipulation/svgCache";
import {getFileExtension} from "../../../utils/dataManipulation/stringManipulation/getFileExtension";
import {img} from "../../../domBuilding/elementCreation/basic/basicGeneratedFunctions";
import {observe} from "../../../domBuilding/turboElement/decorators/observe";
import {define} from "../../../domBuilding/turboElement/decorators/define";

/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
@define("turbo-icon")
class TurboIcon extends TurboElement {
    private _element: HTMLImageElement | SVGElement | null = null;

    private _type: string;
    private _directory: string;
    private _icon: string;

    private _iconColor: string | null = null;
    private _onLoaded: ((svg: SVGElement) => void) | null = null;

    static readonly config: TurboIconConfig = {type: "svg", path: ""};

    private static cache: SvgCache = new SvgCache();

    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties) {
        super(properties);
        this.update(properties);
    }

    public update(properties: TurboIconProperties) {
        if (properties.unsetDefaultClasses) this.removeClass(TurboIcon.config.defaultClasses);
        else this.addClass(TurboIcon.config.defaultClasses);

        this.type = properties.type;
        this.directory = properties.directory;

        if (properties.iconColor) this.iconColor = properties.iconColor;
        if (properties.onLoaded) this._onLoaded = properties.onLoaded;

        this.icon = properties.icon;
    }

    private generateSvg() {
        this.clear();
        TurboIcon.cache.fetchSvg(this.path, (svg) => {
            if (this.element) return;
            this.element = svg;
            this.addChild(this.element);
            if (this.element) {
                if (this.iconColor) this.element.style.fill = this.iconColor;
                if (this._onLoaded) this._onLoaded(this.element);
            }
        });
    }

    private generateImg() {
        if (this.element instanceof HTMLImageElement) {
            this.element.src = this.path;
            this.element.alt = this.icon;
            return;
        }

        this.clear();
        this.element = img({src: this.path, alt: this.icon, parent: this});
    }

    private clear() {
        this.removeAllChildren();
        this.element = null;
    }

    //Getters and setters

    /**
     * @description The type of the icon.
     */
    public get type(): string {
        return this._type;
    }

    private set type(value: string | undefined) {
       if (!value || value.length == 0) value = this.type || TurboIcon.config.type || "svg";
       this._type = value;
    }

    /**
     * @description The user-provided (or statically configured) directory to the icon's file.
     */
    public get directory(): string {
        return this._directory;
    }

    private set directory(value: string | undefined) {
        if (!value) value = this.directory || TurboIcon.config.path || "";
        if (value.length > 0 && !value.endsWith("/")) value += "/";
        this._directory = value;
    }

    /**
     * @description The path to the icon's source file.
     */
    public get path(): string {
        let extension = (this.icon.endsWith("." + this.type) || this.type.length == 0) ? "" : "." + this.type;
        return this.directory + this.icon + extension;
    }

    /**
     * @description The name (or path) of the icon. Might include the file extension (to override the icon's type).
     * Setting it will update the icon accordingly.
     */
    @observe
    public get icon() {
        return this._icon;
    }

    public set icon(value: string) {
        this.type = getFileExtension(value).substring(1);
        this._icon = value;

        if (this.type == "svg") this.generateSvg();
        else this.generateImg();
    }

    /**
     * @description The assigned color to the icon (if any)
     */
    @observe
    public get iconColor() {
        return this._iconColor;
    }

    public set iconColor(value: string | null) {
        this._iconColor = value;
        if (this.element instanceof SVGElement && value) this.element.style.fill = value;
    }

    /**
     * @description The child element of the icon element (an HTML image or an SVG element).
     */
    private set element(value: HTMLImageElement | SVGElement) {
        this._element = value;
    }

    public get element() {
        return this._element;
    }
}

function icon(properties: TurboIconProperties): TurboIcon {
    return new TurboIcon(properties);
}

export {TurboIcon, icon};