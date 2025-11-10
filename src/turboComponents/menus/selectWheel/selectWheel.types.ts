import {Reifect} from "../../wrappers/reifect/reifect";
import {StatelessReifectProperties} from "../../wrappers/reifect/reifect.types";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboElementProperties} from "../../../turboElement/turboElement.types";
import {Direction, Range} from "../../../types/enums.types";
import {PartialRecord} from "../../../types/basic.types";

/**
 * @group Components
 * @category TurboSelectWheel
 */
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

/**
 * @group Components
 * @category TurboSelectWheel
 */
type TurboSelectWheelStylingProperties = {
    element: HTMLElement,
    translationValue: number,
    scaleValue: number,
    opacityValue: number,
    size: Record<Range, number>,
    defaultComputedStyles: PartialRecord<keyof CSSStyleDeclaration, string | number>
};

export {TurboSelectWheelProperties, TurboSelectWheelStylingProperties};