import {TurboIcon} from "../icon";
import {TurboIconToggleProperties} from "./iconToggle.types";
import {define} from "../../../../domBuilding/decorators/define";

@define()
class TurboIconToggle extends TurboIcon {
    private _toggled: boolean = false;
    private onToggle: (value: boolean, el: TurboIconToggle) => void;

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