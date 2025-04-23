import {TurboElement} from "../../../domBuilding/turboElement/turboElement";
import {TurboIconProperties, TurboIconConfig} from "./icon.types";
import {fetchSvg} from "../../../utils/dataManipulation/svgManipulation";
import {getFileExtension} from "../../../utils/dataManipulation/stringManipulation";
import {observe} from "../../../domBuilding/decorators/observe";
import {define} from "../../../domBuilding/decorators/define";
import {img} from "../../../domBuilding/elementCreation/basicElements";
import {cache} from "../../../domBuilding/decorators/cache/cache";
import {auto} from "../../../domBuilding/decorators/auto/auto";
import {equalToAny} from "../../../utils/computations/equity";
import {TurboView} from "../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../domBuilding/mvc/turboModel";
import {TurboEmitter} from "../../../domBuilding/mvc/turboEmitter";

/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
@define()
class TurboIcon<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboElement<ViewType, DataType, ModelType> {
    private _element: Element;

    private _type: string;
    private _directory: string;

    public onLoaded: (element: Element) => void;

    public static readonly config: TurboIconConfig = {...TurboElement.config, defaultType: "svg", defaultDirectory: "", customLoaders: {}};

    private static imageTypes = ["png", "jpg", "jpeg", "gif", "webp",
        "PNG", "JPG", "JPEG", "GIF", "WEBP"] as const;

    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties<ViewType, DataType, ModelType>) {
        super(properties);
        if (properties.icon) this.update(properties);
    }

    public update(properties: TurboIconProperties) {
        if (properties.unsetDefaultClasses) this.removeClass(TurboIcon.config.defaultClasses);
        else this.addClass(TurboIcon.config.defaultClasses);

        this.type = properties.type;
        this.directory = properties.directory;

        if (properties.iconColor) this.iconColor = properties.iconColor;
        if (properties.onLoaded) this.onLoaded = properties.onLoaded;
        if (properties.icon) this.icon = properties.icon;
    }

    //Getters and setters

    /**
     * @description The type of the icon.
     */
    public get type(): string {
        return this._type;
    }

    private set type(value: string) {
        if (!value || value.length == 0) value = this.type || TurboIcon.config.defaultType || "svg";
        if (value[0] == ".") value = value.substring(1);
        this._type = value;
    }

    /**
     * @description The user-provided (or statically configured) directory to the icon's file.
     */
    public get directory(): string {
        return this._directory;
    }

    private set directory(value: string) {
        if (!value) value = this.directory || TurboIcon.config.defaultDirectory || "";
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
    @auto()
    public set icon(value: string) {
        this.type = getFileExtension(value).substring(1);
        this.generateIcon();
    }

    /**
     * @description The assigned color to the icon (if any)
     */
    @observe
    @auto()
    public set iconColor(value: string) {
        if (value && this.element instanceof SVGElement) this.element.style.fill = value;
    }

    /**
     * @description The child element of the icon element (an HTML image or an SVG element).
     */
    private set element(value: Element) {
        this._element = value;
    }

    public get element(): Element {
        return this._element;
    }

    //Utilities

    @cache()
    public loadSvg(path: string): Promise<SVGElement> {
        return fetchSvg(path);
    }

    private loadImg(path: string): HTMLImageElement {
        return img({src: path, alt: this.icon, parent: this});
    }

    private generateIcon() {
        if (this.element instanceof HTMLImageElement
            && equalToAny(this.type, ...TurboIcon.imageTypes)) {
            this.element.src = this.path;
            this.element.alt = this.icon;
            return;
        }

        this.clear();
        const element = this.getLoader()(this.path);
        if (element instanceof Element) this.setupLoadedElement(element);
        else element.then(element => this.setupLoadedElement(element))
            .catch(error => console.error(`Failed to load icon: ${error}`));
    }

    private getLoader(): (path: string) => Element | Promise<Element> {
        if (!this.type) return;

        const customLoader = TurboIcon.config.customLoaders[this.type];
        if (customLoader) return customLoader;

        if (equalToAny(this.type, "svg", "SVG")) return this.loadSvg;
        if (equalToAny(this.type, ...TurboIcon.imageTypes)) return this.loadImg;
        throw new Error(`Unsupported icon type: ${this.type}`);
    }

    private setupLoadedElement(element: Element) {
        if (this.element || !element) return;
        if (element.parentElement) element = element.cloneNode(true) as Element;

        this.addChild(element);
        if (this.iconColor && element instanceof SVGElement) element.style.fill = this.iconColor;
        if (this.onLoaded) this.onLoaded(element);

        this.element = element;
    }

    private clear() {
        this.element?.destroy();
        this.element = null;
    }
}

function icon<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>,
>(properties: TurboIconProperties<ViewType, DataType, ModelType>): TurboIcon<ViewType, DataType, ModelType> {
    return new TurboIcon<ViewType, DataType, ModelType>(properties);
}

export {TurboIcon, icon};