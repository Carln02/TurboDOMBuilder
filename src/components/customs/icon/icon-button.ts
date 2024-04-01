import {TurboIconButtonConfig, TurboIconProperties} from "./icon-types";
import {TurboIcon} from "./icon";
import {setProperties} from "../../../turbo-functions/element-manipulation/set-properties";

/**
 * Class for creating icon buttons.
 * @class TurboIconButton
 * @extends TurboIcon
 */
class TurboIconButton extends TurboIcon {
    static readonly config: TurboIconButtonConfig = {};

    /**
     * Creates an instance of TurboIconButton.
     * @param {TurboIconProperties} properties - Properties to configure the button and its icon.
     */
    constructor(properties: TurboIconProperties) {
        super(properties);
        if (!properties.unsetDefaultClasses) this.addClass(TurboIconButton.config.defaultClasses);
    }
}

customElements.define("turbo-icon-button", TurboIconButton);

function iconButton(properties: TurboIconProperties): TurboIconButton {
    let el = document.createElement("turbo-icon-button") as TurboIconButton;
    setProperties(el, properties);
    return el;
}

export {TurboIconButton, iconButton};