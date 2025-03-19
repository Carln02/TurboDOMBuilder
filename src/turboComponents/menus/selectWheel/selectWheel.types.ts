import {TurboSelectEntry} from "../../basics/select/selectEntry/selectEntry";
import {TurboSelectProperties} from "../../basics/select/select.types";
import {Direction, Range} from "../../../utils/datatypes/basicDatatypes.types";
import {PartialRecord} from "../../../domBuilding/core.types";
import {Reifect} from "../../wrappers/reifect/reifect";
import {StatelessReifectProperties} from "../../wrappers/reifect/reifect.types";
import {TurboView} from "../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../domBuilding/mvc/turboModel";

type TurboSelectWheelProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>,
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel
> = TurboSelectProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType> & {
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