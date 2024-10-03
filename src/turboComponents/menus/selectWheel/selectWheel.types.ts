import {TurboSelectEntry} from "../../basics/select/selectEntry/selectEntry";
import {TurboSelectProperties} from "../../basics/select/select.types";
import {Direction, Range} from "../../../utils/datatypes/basicDatatypes.types";
import {PartialRecord} from "../../../domBuilding/core.types";
import {Reifect} from "../../wrappers/reifect/reifect";
import {StatelessReifectProperties} from "../../wrappers/reifect/reifect.types";

type TurboSelectWheelProperties<ValueType = string, EntryType extends TurboSelectEntry<ValueType>
    = TurboSelectEntry<ValueType>> = TurboSelectProperties<ValueType, EntryType> & {
    direction?: Direction,
    styleReifect?: Reifect | StatelessReifectProperties,

    generateCustomStyling?: (element: HTMLElement, translationValue: number, size: Record<Range, number>,
                             defaultComputedStyles: PartialRecord<keyof CSSStyleDeclaration, string | number>)
        => string | PartialRecord<keyof CSSStyleDeclaration, string | number>;

    size?: number | Record<Range, number>,
    opacity?: Record<Range, number>,
    scale?: Record<Range, number>,
}

export {TurboSelectWheelProperties};