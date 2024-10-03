import { TurboSelectEntry } from "../../basics/select/selectEntry/selectEntry";
import { TurboSelectProperties } from "../../basics/select/select.types";
import { StatefulReifect } from "../../wrappers/statefulReifect/statefulReifect";
import { InOut } from "../../../utils/datatypes/basicDatatypes.types";
import { StatefulReifectProperties } from "../../wrappers/statefulReifect/statefulReifect.types";
type TurboMarkingMenuProperties<ValueType = string, EntryType extends TurboSelectEntry<ValueType> = TurboSelectEntry<ValueType>> = TurboSelectProperties<ValueType, EntryType> & {
    transition?: StatefulReifect<InOut> | StatefulReifectProperties<InOut>;
    startAngle?: number;
    endAngle?: number;
    semiMajor?: number;
    semiMinor?: number;
    minDragDistance?: number;
};
export { TurboMarkingMenuProperties };
