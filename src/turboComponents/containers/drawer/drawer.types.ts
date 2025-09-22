import {Open, Side} from "../../../utils/datatypes/basicDatatypes.types";
import {TurboIconSwitchProperties} from "../../basics/icon/iconSwitch/iconSwitch.types";
import {TurboIconSwitch} from "../../basics/icon/iconSwitch/iconSwitch";
import {Reifect} from "../../wrappers/reifect/reifect";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboElementProperties} from "../../../turboElement/turboElement.types";
import {PartialRecord} from "../../../core.types";
import {TurboProperties} from "../../../turboFunctions/element/element.types";

type TurboDrawerProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
> = TurboElementProperties<ViewType, DataType, ModelType> & {
    side?: Side,
    offset?: PartialRecord<Open, number>
    hideOverflow?: boolean,

    panel?: TurboProperties | HTMLElement,
    thumb?: TurboProperties | HTMLElement,

    icon?: string | Element | TurboIconSwitchProperties<Side> | TurboIconSwitch<Side>;
    attachSideToIconName?: boolean;
    rotateIconBasedOnSide?: boolean;

    initiallyOpen?: boolean,
    transition?: Reifect<HTMLElement>
}

export {TurboDrawerProperties};