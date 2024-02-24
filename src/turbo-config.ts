/**
 * @class TurboConfig
 * @description A static configuration class to customize TurboDOMBuilder to your needs.
 */
abstract class TurboConfig {
    private static _pathToIcons: string = "";
    private static _iconsType = "";

    private static _horizontalFlexGap = "";
    private static _verticalFlexGap = "";

    /**
     * @function pathToIcons
     * @description Define the path to icons, to not type it again on every icon creation. Check also
     * [iconsType]{@link TurboConfig.iconsType}.
     * @example
     * TurboConfig.pathToIcons = "assets/icons/";
     * icon({icon: "icon.svg"}); // provide "icon.svg" as parameter instead of "assets/icons/icon.svg"}
     * @param path - a string representing the path to the icons' directory.
     * @returns The previously set path to icons (or an empty string if not set).
     */
    public static set pathToIcons(path: string) {
        this._pathToIcons = path;
    }

    public static get pathToIcons(): string {
        return this._pathToIcons;
    }

    /**
     * @function iconsType
     * @description Define the extension type of icons, to not type it again on every icon creation. Check also
     * [pathToIcons]{@link TurboConfig.pathToIcons}.
     * @example
     * TurboConfig.iconsType = "svg";
     * icon({icon: "assets/icons/icon"}); // provide "assets/icons/icon" as parameter instead of "assets/icons/icon.svg"}
     * @param type - a string representing the extension of the icons.
     * @returns The previously set icons type (or an empty string if not set).
     */
    public static set iconsType(type: string) {
        if (type.length > 0) this._iconsType = "." + type;
    }

    public static get iconsType(): string {
        return this._iconsType;
    }

    /**
     * @function flexGap
     * @description Define the default gap for all created flex elements (both horizontal and vertical)
     * @example
     * TurboConfig.flexGap = "10px";
     * flexCol({children: [...]}) // Will automatically set the gap between children to 10px, without explicitly specifying it.
     * @param gap - a string representing the gap value to set.
     * @returns The value of the gap between elements (or an empty string if not set). If the vertical and horizontal gaps are
     * set to different values, it will return by default the value of the horizontal gap.
     */
    public static set flexGap(gap: string) {
        this._horizontalFlexGap = gap;
        this._verticalFlexGap = gap;
    }

    public static get flexGap(): string {
        return this._horizontalFlexGap;
    }

    /**
     * @function horizontalFlexGap
     * @description Define the default horizontal gap for all created flex elements.
     * @example
     * TurboConfig.horizontalFlexGap = "10px";
     * flexRow({children: [...]}) // Will automatically set the gap between children to 10px, without explicitly specifying it.
     * @param gap - a string representing the gap value to set.
     * @returns The value of the gap between elements (or an empty string if not set).
     */
    public static set horizontalFlexGap(gap: string) {
        this._horizontalFlexGap = gap;
    }

    public static get horizontalFlexGap(): string {
        return this._horizontalFlexGap;
    }

    /**
     * @function verticalFlexGap
     * @description Define the default vertical gap for all created flex elements.
     * @example
     * TurboConfig.verticalFlexGap = "10px";
     * flexCol({children: [...]}) // Will automatically set the gap between children to 10px, without explicitly specifying it.
     * @param gap - a string representing the gap value to set.
     * @returns The value of the gap between elements (or an empty string if not set).
     */
    public static set verticalFlexGap(gap: string) {
        this._verticalFlexGap = gap;
    }

    public static get verticalFlexGap(): string {
        return this._verticalFlexGap;
    }
}

export {TurboConfig};