import {TurboDropdownConfig} from "./dropdown";
import {TurboButtonConfig} from "./button";
import {TurboIconButtonConfig, TurboIconConfig} from "./icon";

/**
 * @type {TurboConfigProperties}
 * @description Configuration object to update configurations for all classes. Set it via TurboConfig.configure().
 *
 * @property {TurboIconConfig} [Icon] - Icon configuration object.
 * @property {TurboIconButtonConfig} [IconButton] - IconButton configuration object.
 * @property {TurboButtonConfig} [Button] - Button configuration object.
 * @property {TurboDropdownConfig} [Dropdown] - Dropdown configuration object.
 */
type TurboConfigProperties = {
    Icon?: TurboIconConfig;
    IconButton?: TurboIconButtonConfig;
    Button?: TurboButtonConfig;
    Dropdown?: TurboDropdownConfig;
}

/**
 * @class {TurboConfig}
 * @description Static configuration class for TurboDOMBuilder.
 */
class TurboConfig {
    private static readonly icon: TurboIconConfig = {type: "svg", path: ""};
    private static readonly iconButton: TurboIconButtonConfig = {};
    private static readonly button: TurboButtonConfig = {defaultTextTag: "h4"};
    private static readonly dropdown: TurboDropdownConfig = {defaultEntryTag: "h4", defaultSelectorTag: "h4"};

    /**
     * @description Static configuration function to update any desired field. Will only overwrite set properties.
     * @param {TurboConfigProperties} config - The configuration object.
     */
    static configure(config: TurboConfigProperties) {
        if (config.Icon) this.Icon = config.Icon;
        if (config.IconButton) this.IconButton = config.IconButton;
        if (config.Button) this.Button = config.Button;
        if (config.Dropdown) this.Dropdown = config.Dropdown;
    }

    /**
     * @description Static Icon configuration object. Setting it will only overwrite the set properties.
     */
    static get Icon() {
        return this.icon;
    }

    static set Icon(value: TurboIconConfig) {
        Object.entries(value).forEach(([key, value]) => {
            if (value !== undefined) this.icon[key] = value;
        });
    }

    /**
     * @description Static IconButton configuration object. Setting it will only overwrite the set properties.
     */
    static get IconButton() {
        return this.iconButton;
    }

    static set IconButton(value: TurboIconButtonConfig) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) this.iconButton[key] = val;
        });
    }

    /**
     * @description Static Button configuration object. Setting it will only overwrite the set properties.
     */
    static get Button() {
        return this.button;
    }

    static set Button(value: TurboButtonConfig) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) this.button[key] = val;
        });
    }

    /**
     * @description Static Dropdown configuration object. Setting it will only overwrite the set properties.
     */
    static get Dropdown() {
        return this.dropdown;
    }

    static set Dropdown(value: TurboDropdownConfig) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) this.dropdown[key] = val;
        });
    }
}

export {TurboConfig, TurboConfigProperties};