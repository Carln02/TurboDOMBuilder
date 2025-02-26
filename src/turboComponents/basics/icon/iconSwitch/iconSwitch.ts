import {TurboIcon} from "../icon";
import {TurboIconSwitchProperties} from "./iconSwitch.types";
import {StatefulReifect} from "../../../wrappers/statefulReifect/statefulReifect";
import {OnOff} from "../../../../utils/datatypes/basicDatatypes.types";
import {StatefulReifectProperties} from "../../../wrappers/statefulReifect/statefulReifect.types";
import {define} from "../../../../domBuilding/decorators/define";
import {TurboView} from "../../../../domBuilding/turboElement/turboView";
import {TurboModel} from "../../../../domBuilding/turboElement/turboModel";

@define()
class TurboIconSwitch<
    State extends string | number | symbol = OnOff,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboIcon<ViewType, DataType, ModelType> {
    public readonly switchReifect: StatefulReifect<State, TurboIcon>;

    /**
     * Creates an instance of Icon.
     * @param {TurboIconSwitchProperties<State>} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconSwitchProperties<State, ViewType, DataType, ModelType>) {
        super({...properties, icon: undefined});

        if (properties.switchReifect instanceof StatefulReifect) this.switchReifect = properties.switchReifect;
        else this.switchReifect = new StatefulReifect<State, TurboIcon>(
            properties.switchReifect as StatefulReifectProperties<State, TurboIcon> || {});

        const reifectProperties = this.switchReifect.properties as any;
        this.switchReifect.attach(this);

        if (properties.appendStateToIconName) this.switchReifect.states.forEach(state => {
            if (!reifectProperties[state]) reifectProperties[state] = {};
            reifectProperties[state].icon = properties.icon + "-" + state.toString();
        });

        this.update(properties.appendStateToIconName ? {...properties, icon: undefined} : properties);
        if (properties.defaultState) this.switchReifect.apply(properties.defaultState, this);
    }
}

export {TurboIconSwitch};