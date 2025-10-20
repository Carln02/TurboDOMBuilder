import {TurboIconProperties} from "../icon.types";
import {StatefulReifectProperties} from "../../../wrappers/statefulReifect/statefulReifect.types";
import {TurboIcon} from "../icon";
import {StatefulReifect} from "../../../wrappers/statefulReifect/statefulReifect";
import {TurboModel} from "../../../../mvc/core/model";
import {TurboView} from "../../../../mvc/core/view";
import {TurboEmitter} from "../../../../mvc/core/emitter";
import {TurboIconSwitch} from "./iconSwitch";

type TurboIconSwitchProperties<
    State extends string | number | symbol,
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboIconProperties<ViewType, DataType, ModelType, EmitterType> & {
    switchReifect?: StatefulReifect<State, TurboIcon> | StatefulReifectProperties<State, TurboIcon>;
    defaultState?: State;
    appendStateToIconName?: boolean
};

declare module "../../../../core.types" {
    interface TurboElementTagNameMap {
        "turbo-icon-switch": TurboIconSwitch
    }
}

export {TurboIconSwitchProperties};