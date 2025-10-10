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
    popupAnchor?: Coordinate,
    parentAnchor?: Coordinate,
    fallbackModes?: Coordinate<PopupFallbackMode>,
    viewportMargin?: number | Coordinate,
    offsetFromParent?: number | Coordinate,
};

type DimensionProperties = {
    side: "top" | "left",
    coordinate: "y" | "x",

    size: "height" | "width",
    innerSize: "innerHeight" | "innerWidth",
    maxSize: "maxHeight" | "maxWidth",

    marginStart: "marginTop" | "marginLeft",
    marginEnd: "marginBottom" | "marginRight"
}

type TurboPopupConfig = {
    defaultClasses?: string | string[],

    defaultPopupAnchor?: Coordinate,
    defaultParentAnchor?: Coordinate,

    defaultViewportMargin?: number | Coordinate,
    defaultOffsetFromParent?: number | Coordinate,
}

enum PopupFallbackMode {
    invert = "invert",
    offset = "offset",
    none = "none"
}

export {TurboPopupProperties, DimensionProperties, TurboPopupConfig, PopupFallbackMode};