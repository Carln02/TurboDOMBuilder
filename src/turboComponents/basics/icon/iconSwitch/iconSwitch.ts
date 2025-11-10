import {icon, TurboIcon} from "../icon";
import {TurboIconSwitchProperties} from "./iconSwitch.types";
import {StatefulReifect} from "../../../wrappers/statefulReifect/statefulReifect";
import {StatefulReifectProperties} from "../../../wrappers/statefulReifect/statefulReifect.types";
import {define} from "../../../../decorators/define/define";
import {TurboView} from "../../../../mvc/core/view";
import {TurboModel} from "../../../../mvc/core/model";
import {auto} from "../../../../decorators/auto/auto";
import {TurboEmitter} from "../../../../mvc/core/emitter";
import {TurboIconConfig} from "../icon.types";
import {OnOff} from "../../../../types/enums.types";

/**
 * @group Components
 * @category TurboIconSwitch
 */
@define("turbo-icon-switch")
class TurboIconSwitch<
    State extends string | number | symbol = OnOff,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboIcon<ViewType, DataType, ModelType, EmitterType> {
    public config: TurboIconConfig = {...TurboIcon.config};

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

/**
 * @group Components
 * @category TurboIconSwitch
 */
function iconSwitch<
    State extends string | number | symbol = OnOff,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
>(properties: TurboIconSwitchProperties<State, ViewType, DataType, ModelType, EmitterType>):
    TurboIconSwitch<State, ViewType, DataType, ModelType, EmitterType> {
    if (!properties.tag) properties.tag = "turbo-icon-switch";
    return icon({...properties}) as any;
}

export {TurboIconSwitch, iconSwitch};