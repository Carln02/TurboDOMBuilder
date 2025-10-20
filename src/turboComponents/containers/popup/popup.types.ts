import {Coordinate} from "../../../utils/datatypes/point/point.types";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboElementProperties} from "../../../turboElement/turboElement.types";
import {TurboEmitter} from "../../../mvc/core/emitter";

type TurboPopupProperties<
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & {
    anchor?: Element,
    popupPosition?: Coordinate,
    parentPosition?: Coordinate,
    fallbackModes?: PopupFallbackMode | Coordinate<PopupFallbackMode>,
    viewportMargin?: number | Coordinate,
    offsetFromAnchor?: number | Coordinate,
};

type TurboPopupConfig = {
    defaultClasses?: string | string[],

    defaultPopupPosition?: Coordinate,
    defaultAnchorPosition?: Coordinate,

    defaultViewportMargin?: number | Coordinate,
    defaultOffsetFromAnchor?: number | Coordinate,
}

enum PopupFallbackMode {
    invert = "invert",
    offset = "offset",
    none = "none"
}

export {TurboPopupProperties, TurboPopupConfig, PopupFallbackMode};