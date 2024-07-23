import {TurboSelectEntry} from "../../basics/select/selectEntry/selectEntry";
import {TurboSelectProperties} from "../../basics/select/select.types";
import {Transition} from "../../../domBuilding/transition/transition";
import {TransitionProperties} from "../../../domBuilding/transition/transition.types";

type MarkingMenuProperties<EntryType extends TurboSelectEntry<ValueType>, ValueType = string> =
    TurboSelectProperties<EntryType, ValueType> & {
    transition?: Transition | TransitionProperties,

    startAngle?: number,
    endAngle?: number,

    semiMajor?: number,
    semiMinor?: number,
    minDragDistance?: number
}

export {MarkingMenuProperties};