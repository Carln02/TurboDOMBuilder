import { TurboElement } from "../../../domBuilding/turboElement/turboElement";
import { TurboIconProperties, TurboIconConfig } from "./icon.types";
/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
declare class TurboIcon extends TurboElement {
    private _element;
    private _type;
    private _directory;
    onLoaded: (element: Element) => void;
    static readonly config: TurboIconConfig;
    private static imageTypes;
    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties);
    update(properties: TurboIconProperties): void;
    /**
     * @description The type of the icon.
     */
    get type(): string;
    private set type(value);
    /**
     * @description The user-provided (or statically configured) directory to the icon's file.
     */
    get directory(): string;
    private set directory(value);
    /**
     * @description The path to the icon's source file.
     */
    get path(): string;
    /**
     * @description The name (or path) of the icon. Might include the file extension (to override the icon's type).
     * Setting it will update the icon accordingly.
     */
    set icon(value: string);
    /**
     * @description The assigned color to the icon (if any)
     */
    set iconColor(value: string);
    /**
     * @description The child element of the icon element (an HTML image or an SVG element).
     */
    private set element(value);
    get element(): Element;
    loadSvg(path: string): Promise<SVGElement>;
    private loadImg;
    private generateIcon;
    private getLoader;
    private setupLoadedElement;
    private clear;
}
declare function icon(properties: TurboIconProperties): TurboIcon;
export { TurboIcon, icon };
