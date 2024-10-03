import { TurboIcon } from "../icon";
import { TurboIconToggleProperties } from "./iconToggle.types";
declare class TurboIconToggle extends TurboIcon {
    private _toggled;
    private onToggle;
    constructor(properties: TurboIconToggleProperties);
    get toggled(): boolean;
    set toggled(value: boolean);
    toggle(): void;
}
declare function iconToggle(properties: TurboIconToggleProperties): TurboIconToggle;
export { TurboIconToggle, iconToggle };
