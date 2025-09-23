import {TurboIconProperties, TurboIconConfig} from "./icon.types";
import {fetchSvg} from "../../../utils/dataManipulation/svgManipulation";
import {getFileExtension} from "../../../utils/dataManipulation/stringManipulation";
import {$} from "../../../turboFunctions/turboFunctions";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboElement} from "../../../turboElement/turboElement";
import {observe} from "../../../decorators/observe";
import {auto} from "../../../decorators/auto/auto";
import {cache} from "../../../decorators/cache/cache";
import {img} from "../../../elementCreation/basicElements";
import {equalToAny} from "../../../utils/computations/equity";
import {TurboEmitter} from "../../../mvc/core/emitter";
import {element} from "../../../elementCreation/element";
import {signal} from "../../../decorators/signal/signal";

/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
@define("turbo-icon")
class TurboIcon<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    public static readonly config: TurboIconConfig = {
        ...TurboElement.config,
        defaultType: "svg",
        defaultDirectory: "",
        customLoaders: {}
    };

    private static imageTypes = ["png", "jpg", "jpeg", "gif", "webp",
        "PNG", "JPG", "JPEG", "GIF", "WEBP"] as const;

    private _element: Element;

    public onLoaded: (element: Element) => void;

    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties<ViewType, DataType, ModelType, EmitterType>) {
        super();
        if (properties.icon) this.update(properties);
    }

    public update(properties: TurboIconProperties) {
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
    @auto({
        callBefore: function (value: string) {
            if (!value || value.length == 0) value = this.type || (this.constructor as any).config.defaultType || "svg";
            if (value[0] == ".") value = value.substring(1);
            return value;
        }
    }) public set type(value: string) {
        this.generateIcon();
    }

    /**
     * @description The user-provided (or statically configured) directory to the icon's file.
     */
    @auto({
        callBefore: function (value: string) {
            if (!value) value = this.directory || (this.constructor as any).config.defaultDirectory || "";
            if (value.length > 0 && !value.endsWith("/")) value += "/";
            return value;
        }
    }) public set directory(value: string) {
        this.generateIcon();
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
    @observe @auto() public set icon(value: string) {
        console.log("HEIWHFHIFEWIWEIWEF")
        const ext = getFileExtension(value).substring(1);
        if (ext) this.type = ext;
        this.generateIcon();
    }

    /**
     * @description The assigned color to the icon (if any)
     */
    @observe
    @auto()
    public set iconColor(value: string) {
        this.updateColor(value);
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
    protected loadSvg(path: string): Promise<SVGElement> {
        return fetchSvg(path);
    }

    protected loadImg(path: string): HTMLImageElement {
        return img({src: path, alt: this.icon, parent: this});
    }

    protected updateColor(value: string = this.iconColor) {
        if (value && this.element instanceof SVGElement) this.element.style.fill = value;
    }

    protected generateIcon() {
        if (this.element instanceof HTMLImageElement
            && equalToAny(this.type, ...(this.constructor as any).imageTypes)) {
            this.element.src = this.path;
            this.element.alt = this.icon;
            return;
        }

        this.clear();
        if (!this.icon) return;

        const element = this.getLoader()(this.path);
        if (element instanceof Element) this.setupLoadedElement(element);
        else element.then(element => this.setupLoadedElement(element))
            .catch(error => console.error(`Failed to load icon: ${error}`));
    }

    private getLoader(): (path: string) => Element | Promise<Element> {
        if (!this.type) return;

        const customLoader = (this.constructor as any).config.customLoaders[this.type];
        if (customLoader) return customLoader;

        if (equalToAny(this.type, "svg", "SVG")) return this.loadSvg;
        if (equalToAny(this.type, ...(this.constructor as any).imageTypes)) return this.loadImg;
        throw new Error(`Unsupported icon type: ${this.type}`);
    }

    private setupLoadedElement(element: Element) {
        if (this.element || !element) return;
        if (element.parentElement) element = element.cloneNode(true) as Element;

        $(this).addChild(element);
        this.updateColor();
        this.onLoaded?.(element);
        this.element = element;
    }

    private clear() {
        $(this.element).destroy();
        this.element = null;
    }
}

function icon<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
>(properties: TurboIconProperties<ViewType, DataType, ModelType, EmitterType>): TurboIcon<ViewType, DataType, ModelType, EmitterType> {
    return new TurboIcon<ViewType, DataType, ModelType, EmitterType>(properties);
    // return element({...properties, tag: "turbo-icon"} as any) as any;
}

export {TurboIcon, icon};