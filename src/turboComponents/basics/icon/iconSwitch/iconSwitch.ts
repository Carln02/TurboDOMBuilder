import {TurboIcon} from "../icon";
import {TurboIconSwitchProperties} from "./iconSwitch.types";
import {StatefulReifect} from "../../../wrappers/statefulReifect/statefulReifect";
import {OnOff} from "../../../../utils/datatypes/basicDatatypes.types";
import {StatefulReifectProperties} from "../../../wrappers/statefulReifect/statefulReifect.types";

class TurboIconSwitch<State extends string | number | symbol = OnOff> extends TurboIcon {
    public switchReifect: StatefulReifect<State, TurboIcon>;

    constructor(properties: TurboIconSwitchProperties<State>) {
        super(properties);

        if (properties.switchReifect instanceof StatefulReifect) this.switchReifect = properties.switchReifect;
        else this.switchReifect = new StatefulReifect<State, TurboIcon>(
            properties.switchReifect as StatefulReifectProperties<State, TurboIcon> || {});

        if (properties.appendStateToIconName || !(properties.switchReifect.properties as any)?.icon) {
            (this.switchReifect.properties as any).icon = {};

            this.switchReifect.states.forEach(state =>
                (this.switchReifect.properties as any)[state] = properties.icon + "-" + state.toString());
        }

        this.switchReifect.attach(this);
    }
}

function iconSwitch<State extends string | number | symbol = OnOff>(properties: TurboIconSwitchProperties<State>)
    : TurboIconSwitch<State> {
    return new TurboIconSwitch<State>(properties);
}

export {TurboIconSwitch, iconSwitch};