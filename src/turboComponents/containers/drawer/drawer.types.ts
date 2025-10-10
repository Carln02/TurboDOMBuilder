import {Open, Side} from "../../../utils/datatypes/basicDatatypes.types";
import {TurboIconSwitchProperties} from "../../basics/icon/iconSwitch/iconSwitch.types";
import {TurboIconSwitch} from "../../basics/icon/iconSwitch/iconSwitch";
import {Reifect} from "../../wrappers/reifect/reifect";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboElementProperties} from "../../../turboElement/turboElement.types";
import {PartialRecord} from "../../../core.types";
import {TurboProperties} from "../../../turboFunctions/element/element.types";
import {TurboEmitter} from "../../../mvc/core/emitter";

type TurboDrawerProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & {
    side?: Side,
    offset?: PartialRecord<Open, number>
    hideOverflow?: boolean,

    panel?: TurboProperties | HTMLElement,
    thumb?: TurboProperties | HTMLElement,

    icon?: string | Element | TurboIconSwitchProperties<Side> | TurboIconSwitch<Side>;
    attachSideToIconName?: boolean;
    rotateIconBasedOnSide?: boolean;

    open?: boolean,
    transition?: Reifect<HTMLElement>
}

export {TurboDrawerProperties};