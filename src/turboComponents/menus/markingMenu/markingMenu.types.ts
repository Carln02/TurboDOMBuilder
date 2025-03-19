import {TurboSelectEntry} from "../../basics/select/selectEntry/selectEntry";
import {TurboSelectProperties} from "../../basics/select/select.types";
import {StatefulReifect} from "../../wrappers/statefulReifect/statefulReifect";
import {InOut} from "../../../utils/datatypes/basicDatatypes.types";
import {StatefulReifectProperties} from "../../wrappers/statefulReifect/statefulReifect.types";
import {TurboView} from "../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../domBuilding/mvc/turboModel";

type TurboMarkingMenuProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>,
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel
> = TurboSelectProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType> & {
    transition?: StatefulReifect<InOut> | StatefulReifectProperties<InOut>,

    startAngle?: number,
    endAngle?: number,

    semiMajor?: number,
    semiMinor?: number,
    minDragDistance?: number
}

export {TurboMarkingMenuProperties};