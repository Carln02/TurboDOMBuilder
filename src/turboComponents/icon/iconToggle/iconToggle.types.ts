import {TurboIconProperties} from "../icon/icon.types";
import {TurboIconToggle} from "./iconToggle";

type TurboIconToggleProperties = TurboIconProperties & {
    toggled?: boolean,
    onToggle?: (value: boolean, el: TurboIconToggle) => void,
}

export {TurboIconToggleProperties};