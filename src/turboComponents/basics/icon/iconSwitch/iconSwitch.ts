import {TurboIcon} from "../icon";
import {TurboIconSwitchProperties} from "./iconSwitch.types";
import {StatefulReifect} from "../../../wrappers/statefulReifect/statefulReifect";
import {OnOff} from "../../../../utils/datatypes/basicDatatypes.types";
import {StatefulReifectProperties} from "../../../wrappers/statefulReifect/statefulReifect.types";
import {define} from "../../../../decorators/define/define";
import {TurboView} from "../../../../mvc/core/view";
import {TurboModel} from "../../../../mvc/core/model";
import {auto} from "../../../../decorators/auto/auto";
import {TurboEmitter} from "../../../../mvc/core/emitter";
import {element} from "../../../../elementCreation/element";

@define("turbo-icon-switch")
class TurboIconSwitch<
    State extends string | number | symbol = OnOff,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboIcon<ViewType, DataType, ModelType, EmitterType> {
    public get switchReifect(): StatefulReifect<State, TurboIcon> {return}

    @auto({
        preprocessValue: function (value: StatefulReifect<State, TurboIcon> | StatefulReifectProperties<State, TurboIcon>) {
            if (value instanceof StatefulReifect) return value;
            else return new StatefulReifect<State, TurboIcon>(value || {});
        }
    }) public set switchReifect(value: StatefulReifect<State, TurboIcon> | StatefulReifectProperties<State, TurboIcon>) {
        this.switchReifect.attach(this);
        if (this.defaultState) this.switchReifect.apply(this.defaultState, this);
    }

    @auto() public set defaultState(value: State) {
        this.switchReifect?.apply(value, this);
    }

    @auto() public set appendStateToIconName(value: boolean) {
        if (value) {
            const reifectProperties = this.switchReifect?.properties as any;
            this.switchReifect.states.forEach(state => {
                if (!reifectProperties[state]) reifectProperties[state] = {};
                reifectProperties[state].icon = this.icon + "-" + state.toString();
            });
        }
    }

    public initialize() {
        super.initialize();
        if (this.defaultState && this.switchReifect) this.switchReifect.apply(this.defaultState, this);
    }
}

function iconSwitch<
    State extends string | number | symbol = OnOff,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
>(properties: TurboIconSwitchProperties<State, ViewType, DataType, ModelType, EmitterType>):
    TurboIconSwitch<State, ViewType, DataType, ModelType, EmitterType> {
    return element({...properties, tag: "turbo-icon-switch"} as any) as any;
}

export {TurboIconSwitch, iconSwitch};