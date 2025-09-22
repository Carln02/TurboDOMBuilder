import {TurboIconProperties} from "../icon.types";
import {StatefulReifectProperties} from "../../../wrappers/statefulReifect/statefulReifect.types";
import {TurboIcon} from "../icon";
import {StatefulReifect} from "../../../wrappers/statefulReifect/statefulReifect";
import {TurboModel} from "../../../../mvc/core/model";
import {TurboView} from "../../../../mvc/core/view";

type TurboIconSwitchProperties<
    State extends string | number | symbol,
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel
> = TurboIconProperties<ViewType, DataType, ModelType> & {
    switchReifect?: StatefulReifect<State, TurboIcon> | StatefulReifectProperties<State, TurboIcon>;
    defaultState?: State;
    appendStateToIconName?: boolean
};

export {TurboIconSwitchProperties};