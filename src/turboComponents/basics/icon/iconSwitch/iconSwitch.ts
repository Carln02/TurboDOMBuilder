import {TurboIcon} from "../icon";
import {TurboIconSwitchProperties} from "./iconSwitch.types";
import {StatefulReifect} from "../../../wrappers/statefulReifect/statefulReifect";
import {OnOff} from "../../../../utils/datatypes/basicDatatypes.types";
import {StatefulReifectProperties} from "../../../wrappers/statefulReifect/statefulReifect.types";
import {define} from "../../../../domBuilding/decorators/define";
import {TurboView} from "../../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../../domBuilding/mvc/turboModel";
import { auto } from "../../../../domBuilding/decorators/auto/auto";

@define()
class TurboIconSwitch<
    State extends string | number | symbol = OnOff,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>,
> extends TurboIcon<ViewType, DataType, ModelType> {
    public switchReifect: StatefulReifect<State, TurboIcon>;

    /**
     * Creates an instance of Icon.
     * @param {TurboIconSwitchProperties<State>} properties - Properties to configure the icon.
     */
    public constructor(properties: TurboIconSwitchProperties<State, ViewType, DataType, ModelType>) {
        super({...properties});

        if (properties.switchReifect instanceof StatefulReifect) this.switchReifect = properties.switchReifect;
        else this.switchReifect = new StatefulReifect<State, TurboIcon>(
            properties.switchReifect as StatefulReifectProperties<State, TurboIcon> || {});

        this.switchReifect.attach(this);
        this.appendStateToIconName = properties.appendStateToIconName;

        if (properties.defaultState) this.switchReifect.apply(properties.defaultState, this);
    }

    @auto()
    public set appendStateToIconName(value: boolean) {
        if (value) {
            const reifectProperties = this.switchReifect.properties as any;
            this.switchReifect.states.forEach(state => {
                if (!reifectProperties[state]) reifectProperties[state] = {};
                reifectProperties[state].icon = this.icon + "-" + state.toString();
            });
        }
    }
}

export {TurboIconSwitch};