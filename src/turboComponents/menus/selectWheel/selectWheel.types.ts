import {TurboSelectProperties} from "../../basics/select/select.types";
import {Direction, Range} from "../../../utils/datatypes/basicDatatypes.types";
import {Reifect} from "../../wrappers/reifect/reifect";
import {StatelessReifectProperties} from "../../wrappers/reifect/reifect.types";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {PartialRecord} from "../../../core.types";
import {TurboElementProperties} from "../../../turboElement/turboElement.types";

type TurboSelectWheelProperties<
    ValueType = string,
    SecondaryValueType = string,
    EntryType extends HTMLElement = HTMLElement,
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel
> = TurboElementProperties<ViewType, DataType, ModelType> & {
    direction?: Direction,
    styleReifect?: Reifect | StatelessReifectProperties,

    generateCustomStyling?: (properties: TurboSelectWheelStylingProperties)
        => string | PartialRecord<keyof CSSStyleDeclaration, string | number>;

    size?: number | Record<Range, number>,
    opacity?: Record<Range, number>,
    scale?: Record<Range, number>,

    alwaysOpen?: boolean,
}

type TurboSelectWheelStylingProperties = {
    element: HTMLElement,
    translationValue: number,
    scaleValue: number,
    opacityValue: number,
    size: Record<Range, number>,
    defaultComputedStyles: PartialRecord<keyof CSSStyleDeclaration, string | number>
};

export {TurboSelectWheelProperties, TurboSelectWheelStylingProperties};