import {TurboSelectProperties} from "../../basics/select/select.types";
import {StatefulReifect} from "../../wrappers/statefulReifect/statefulReifect";
import {InOut} from "../../../utils/datatypes/basicDatatypes.types";
import {StatefulReifectProperties} from "../../wrappers/statefulReifect/statefulReifect.types";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboElementProperties} from "../../../turboElement/turboElement.types";

type TurboMarkingMenuProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel
> = TurboElementProperties<ViewType, DataType, ModelType> & {
    transition?: StatefulReifect<InOut> | StatefulReifectProperties<InOut>,

    startAngle?: number,
    endAngle?: number,

    semiMajor?: number,
    semiMinor?: number,
    minDragDistance?: number
}

export {TurboMarkingMenuProperties};