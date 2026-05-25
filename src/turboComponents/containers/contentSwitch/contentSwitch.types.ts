import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {TurboElementProperties} from "../../../turboElement/turboElement.types";
import {Shown} from "../../../types/enums.types";
import {StatefulReifect} from "../../wrappers/statefulReifect/statefulReifect";
import {StatefulReifectProperties} from "../../wrappers/statefulReifect/statefulReifect.types";
import {TurboContentSwitch} from "./contentSwitch";

enum ContentSwitchMode {
    fadeLeft = "fadeLeft",
    fadeRight = "fadeRight",
    carousel = "carousel",
}

type TurboContentSwitchProperties<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & {
    mode?: ContentSwitchMode;
    transitionDuration?: number;
    transitionReifect?: StatefulReifect<Shown> | StatefulReifectProperties<Shown>;
};

declare module "../../../types/element.types" {
    interface TurboElementTagNameMap {
        "turbo-content-switch": TurboContentSwitch;
    }
}

export {ContentSwitchMode, TurboContentSwitchProperties};