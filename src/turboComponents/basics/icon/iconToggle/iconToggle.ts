import {TurboIcon} from "../icon";
import {define} from "../../../../domBuilding/decorators/define";
import {TurboIconToggleProperties} from "./iconToggle.types";

@define("turbo-icon-toggle")
class TurboIconToggle extends TurboIcon {
    private _toggled: boolean = false;
    private readonly onToggle: (value: boolean, el: TurboIconToggle) => void;

    constructor(properties: TurboIconToggleProperties) {
        super(properties);
        this.toggled = properties.toggled;
        this.onToggle = properties.onToggle;
    }

    public get toggled() {
        return this._toggled;
    }

    public set toggled(value: boolean) {
        this._toggled = value;
        if (this.onToggle) this.onToggle(value, this);
    }

    public toggle() {
        this.toggled = !this.toggled;
    }
}

function iconToggle(properties: TurboIconToggleProperties): TurboIconToggle {
    return new TurboIconToggle(properties);
}

export {TurboIconToggle, iconToggle};