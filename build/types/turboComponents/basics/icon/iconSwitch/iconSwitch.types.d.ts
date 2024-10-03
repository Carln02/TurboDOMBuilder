import { TurboIconProperties } from "../icon.types";
import { StatefulReifectProperties } from "../../../wrappers/statefulReifect/statefulReifect.types";
import { TurboIcon } from "../icon";
import { StatefulReifect } from "../../../../../build/turbodombuilder";
type TurboIconSwitchProperties<State extends string | number | symbol> = TurboIconProperties & {
    switchReifect?: StatefulReifect<State, TurboIcon> | StatefulReifectProperties<State, TurboIcon>;
    appendStateToIconName?: boolean;
};
export { TurboIconSwitchProperties };
