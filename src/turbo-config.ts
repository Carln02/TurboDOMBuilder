/**
 * @class TurboConfig
 * @description A static configuration class to customize TurboDOMBuilder to your needs.
 */
abstract class TurboConfig {
    private static _pathToIcons: string = "";
    private static _iconsType = "";

    /**
     * @function pathToIcons
     * @description Define the path to icons, to not type it again on every icon creation. Check also
     * [iconsType]{@link TurboConfig.iconsType}.
     * @example
     * TurboConfig.pathToIcons = "assets/icons/";
     * icon({icon: "icon.svg"}); // provide "icon.svg" as parameter instead of "assets/icons/icon.svg"}
     * @param path - a string representing the path to the icons' directory.
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
     */
    public static set iconsType(type: string) {
        if (type.length > 0) this._iconsType = "." + type;
    }

    public static get iconsType(): string {
        return this._iconsType;
    }
}

export {TurboConfig};