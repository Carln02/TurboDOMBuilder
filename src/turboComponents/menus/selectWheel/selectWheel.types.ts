import {TurboSelectEntry} from "../../basics/select/selectEntry/selectEntry";
import {TurboSelectProperties} from "../../basics/select/select.types";
import {Direction, Range} from "../../../utils/datatypes/basicDatatypes.types";
import {Transition} from "../../../domBuilding/transition/transition";
import {TransitionProperties} from "../../../domBuilding/transition/transition.types";

type TurboSelectWheelProperties<EntryType extends TurboSelectEntry<ValueType>, ValueType = string> =
    TurboSelectProperties<EntryType, ValueType> & {
    direction?: Direction,
    transition?: Transition | TransitionProperties,

    size?: number | Record<Range, number>,
    opacity?: Record<Range, number>,
    scale?: Record<Range, number>,
}

export {TurboSelectWheelProperties};