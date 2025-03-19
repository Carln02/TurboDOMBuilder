import {TurboIconProperties} from "../icon.types";
import {StatefulReifectProperties} from "../../../wrappers/statefulReifect/statefulReifect.types";
import {TurboIcon} from "../icon";
import {StatefulReifect} from "../../../wrappers/statefulReifect/statefulReifect";
import {TurboView} from "../../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../../domBuilding/mvc/turboModel";
import {TurboEmitter} from "../../../../domBuilding/mvc/turboEmitter";

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

export {TurboIconSwitchProperties};