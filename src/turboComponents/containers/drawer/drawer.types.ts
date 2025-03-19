import {TurboCustomProperties, TurboProperties} from "../../../domBuilding/turboElement/turboElement.types";
import {Open, Side} from "../../../utils/datatypes/basicDatatypes.types";
import {PartialRecord} from "../../../domBuilding/core.types";
import {TurboIconSwitchProperties} from "../../basics/icon/iconSwitch/iconSwitch.types";
import {TurboIconSwitch} from "../../basics/icon/iconSwitch/iconSwitch";
import {Reifect} from "../../wrappers/reifect/reifect";
import {TurboView} from "../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../domBuilding/mvc/turboModel";

type TurboDrawerProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
> = TurboCustomProperties<ViewType, DataType, ModelType> & {
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