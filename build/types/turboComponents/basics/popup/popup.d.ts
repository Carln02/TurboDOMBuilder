import { TurboElement } from "../../../domBuilding/turboElement/turboElement";
import { TurboProperties } from "../../../domBuilding/turboElement/turboElement.types";
import { PopupFallbackMode, TurboPopupConfig, TurboPopupProperties } from "./popup.types";
import { Coordinate } from "../../../utils/datatypes/point/point.types";
import { Point } from "../../../utils/datatypes/point/point";
declare class TurboPopup extends TurboElement {
    private _popupAnchor;
    private _parentAnchor;
    private _viewportMargin;
    private _offsetFromParent;
    fallbackModes: Coordinate<PopupFallbackMode>;
    static readonly config: TurboPopupConfig;
    constructor(properties?: TurboPopupProperties);
    private addListeners;
    get popupAnchor(): Point;
    set popupAnchor(value: Coordinate);
    get parentAnchor(): Point;
    set parentAnchor(value: Coordinate);
    get viewportMargin(): Point;
    set viewportMargin(value: number | Coordinate);
    get offsetFromParent(): Point;
    set offsetFromParent(value: number | Coordinate);
    get rect(): DOMRect;
    get parentRect(): DOMRect;
    get computedStyle(): CSSStyleDeclaration;
    get parentComputedStyle(): CSSStyleDeclaration;
    private recomputePosition;
    private recomputeSide;
    private recomputeMaxSize;
    private clearMaxDimensions;
    show(b: boolean): this;
    toggle(): this;
    private generateDimensionParameters;
}
declare function popup(properties?: TurboProperties): TurboPopup;
export { TurboPopup, popup };
