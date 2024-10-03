import { TurboProperties } from "../../../domBuilding/turboElement/turboElement.types";
import { Open, Side } from "../../../utils/datatypes/basicDatatypes.types";
import { PartialRecord } from "../../../domBuilding/core.types";
import { TurboIconSwitchProperties } from "../../basics/icon/iconSwitch/iconSwitch.types";
import { TurboIconSwitch } from "../../basics/icon/iconSwitch/iconSwitch";
type TurboDrawerProperties = TurboProperties & {
    side?: Side;
    offset?: PartialRecord<Open, number>;
    hideOverflow?: boolean;
    panel?: TurboProperties | HTMLElement;
    thumb?: TurboProperties | Element;
    icon?: string | Element | TurboIconSwitchProperties<Side> | TurboIconSwitch<Side>;
    attachSideToIconName?: boolean;
    rotateIconBasedOnSide?: boolean;
    initiallyOpen?: boolean;
};
export { TurboDrawerProperties };
