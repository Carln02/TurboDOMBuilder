import { TurboProperties } from "../../../domBuilding/turboElement/turboElement.types";
import { Coordinate } from "../../../utils/datatypes/point/point.types";
type TurboPopupProperties = TurboProperties & {
    popupAnchor?: Coordinate;
    parentAnchor?: Coordinate;
    fallbackModes?: Coordinate<PopupFallbackMode>;
    viewportMargin?: number | Coordinate;
    offsetFromParent?: number | Coordinate;
    unsetDefaultClasses?: boolean;
};
type DimensionProperties = {
    side: "top" | "left";
    coordinate: "y" | "x";
    size: "height" | "width";
    innerSize: "innerHeight" | "innerWidth";
    maxSize: "maxHeight" | "maxWidth";
    marginStart: "marginTop" | "marginLeft";
    marginEnd: "marginBottom" | "marginRight";
};
type TurboPopupConfig = {
    defaultClasses?: string | string[];
    defaultPopupAnchor?: Coordinate;
    defaultParentAnchor?: Coordinate;
    defaultViewportMargin?: number | Coordinate;
    defaultOffsetFromParent?: number | Coordinate;
};
declare enum PopupFallbackMode {
    invert = "invert",
    offset = "offset",
    none = "none"
}
export { TurboPopupProperties, DimensionProperties, TurboPopupConfig, PopupFallbackMode };
