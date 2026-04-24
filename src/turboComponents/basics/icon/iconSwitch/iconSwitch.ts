import {TurboIcon} from "../icon";
import {StatefulReifect} from "../../../wrappers/statefulReifect/statefulReifect";
import {StatefulReifectProperties} from "../../../wrappers/statefulReifect/statefulReifect.types";
import {define} from "../../../../decorators/define/define";
import {TurboView} from "../../../../mvc/view/view";
import {TurboModel} from "../../../../mvc/model/model";
import {auto} from "../../../../decorators/auto/auto";
import {TurboEmitter} from "../../../../mvc/emitter/emitter";
import {OnOff} from "../../../../types/enums.types";
import {TurboIconSwitchProperties} from "./iconSwitch.types";

/**
 * @group Components
 * @category TurboIconSwitch
 */
class TurboIconSwitch<
    State extends string | number | symbol = OnOff,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboIcon<ViewType, DataType, ModelType, EmitterType> {
     public declare readonly properties: TurboIconSwitchProperties<any>;

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
            const properties: any = this.switchReifect.properties;
            this.switchReifect.states.forEach(state => {
               properties[state] = {...properties[state], icon: this.icon + "-" + state.toString()};
            });
            this.switchReifect.properties = properties;
        }
    }

    public initialize() {
        super.initialize();
        if (this.defaultState) this.switchReifect?.apply(this.defaultState, this);
    }
}

define(TurboIconSwitch);
export {TurboIconSwitch};