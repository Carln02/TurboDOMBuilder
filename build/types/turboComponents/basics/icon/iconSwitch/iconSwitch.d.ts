import { TurboIcon } from "../icon";
import { TurboIconSwitchProperties } from "./iconSwitch.types";
import { StatefulReifect } from "../../../wrappers/statefulReifect/statefulReifect";
import { OnOff } from "../../../../utils/datatypes/basicDatatypes.types";
declare class TurboIconSwitch<State extends string | number | symbol = OnOff> extends TurboIcon {
    switchReifect: StatefulReifect<State, TurboIcon>;
    constructor(properties: TurboIconSwitchProperties<State>);
}
declare function iconSwitch<State extends string | number | symbol = OnOff>(properties: TurboIconSwitchProperties<State>): TurboIconSwitch<State>;
export { TurboIconSwitch, iconSwitch };
