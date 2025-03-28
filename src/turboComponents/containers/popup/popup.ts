import {TurboElement} from "../../../domBuilding/turboElement/turboElement";
import {DimensionProperties, PopupFallbackMode, TurboPopupConfig, TurboPopupProperties} from "./popup.types";
import {Coordinate} from "../../../utils/datatypes/point/point.types";
import {Point} from "../../../utils/datatypes/point/point";
import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {Direction} from "../../../utils/datatypes/basicDatatypes.types";
import {define} from "../../../domBuilding/decorators/define";
import {cache} from "../../../domBuilding/decorators/cache/cache";
import {TurboView} from "../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../domBuilding/mvc/turboModel";
import "./popup.css";

@define()
class TurboPopup<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboElement<ViewType, DataType, ModelType> {
    private _popupAnchor: Point;
    private _parentAnchor: Point;

    private _viewportMargin: Point;
    private _offsetFromParent: Point;

    public fallbackModes: Coordinate<PopupFallbackMode>;

    public static readonly config: TurboPopupConfig = {
        defaultPopupAnchor: {x: 0, y: -100},
        defaultParentAnchor: {x: 0, y: 100},
        defaultViewportMargin: 4,
        defaultOffsetFromParent: {x: 0, y: 4}
    };

    constructor(properties: TurboPopupProperties<ViewType, DataType, ModelType> = {}) {
        super(properties);
        this.addClass("turbo-popup");

        if (!properties.unsetDefaultClasses) this.addClass(TurboPopup.config.defaultClasses);

        this.popupAnchor = properties.popupAnchor || TurboPopup.config.defaultPopupAnchor || {x: 50, y: 0};
        this.parentAnchor = properties.parentAnchor || TurboPopup.config.defaultParentAnchor || {x: 50, y: 100};

        this.viewportMargin = properties.viewportMargin || TurboPopup.config.defaultViewportMargin || 0;
        this.offsetFromParent = properties.offsetFromParent || TurboPopup.config.defaultOffsetFromParent || 0;

        this.fallbackModes = properties.fallbackModes || {
            x: Math.abs(this.parentAnchor.x - 50) > 25 ? PopupFallbackMode.invert : PopupFallbackMode.offset,
            y: Math.abs(this.parentAnchor.y - 50) > 25 ? PopupFallbackMode.invert : PopupFallbackMode.offset,
        };

        this.addListeners();
        this.show(false);
    }

    private addListeners() {
        window.addEventListener(DefaultEventName.scroll, () => this.show(false));
        window.addEventListener(DefaultEventName.resize, () => {
            if (this.isShown) this.recomputePosition();
        });
        document.addListener(DefaultEventName.click, e => {
            if (this.isShown && !this.contains(e.target as Node)) this.show(false);
        });
    }

    public get popupAnchor(): Point {
        return this._popupAnchor;
    }

    public set popupAnchor(value: Coordinate) {
        this._popupAnchor = new Point(value).bound(0, 100);
    }

    public get parentAnchor(): Point {
        return this._parentAnchor;
    }

    public set parentAnchor(value: Coordinate) {
        this._parentAnchor = new Point(value).bound(0, 100);
    }

    public get viewportMargin(): Point {
        return this._viewportMargin;
    }

    public set viewportMargin(value: number | Coordinate) {
        this._viewportMargin = new Point(value);
    }

    public get offsetFromParent(): Point {
        return this._offsetFromParent;
    }

    public set offsetFromParent(value: number | Coordinate) {
        this._offsetFromParent = new Point(value);
    }

    @cache({clearOnNextFrame: true})
    public get rect(): DOMRect {
        return this.getBoundingClientRect();
    }

    @cache({clearOnNextFrame: true})
    public get parentRect(): DOMRect {
        return this.parentElement.getBoundingClientRect();
    }

    @cache({clearOnNextFrame: true})
    public get computedStyle(): CSSStyleDeclaration {
        return window.getComputedStyle(this);
    }

    @cache({clearOnNextFrame: true})
    public get parentComputedStyle(): CSSStyleDeclaration {
        return window.getComputedStyle(this.parentElement);
    }

    private recomputePosition() {
        if (!this.parentElement) return;
        this.clearMaxDimensions();

        const availableHeight = window.innerHeight - (2 * this.viewportMargin.y);
        const availableWidth = window.innerWidth - (2 * this.viewportMargin.x);

        this.setStyle("maxHeight", `${availableHeight}px`);
        this.setStyle("maxWidth", `${availableWidth}px`);

        const top = this.recomputeSide(Direction.vertical);
        const left = this.recomputeSide(Direction.horizontal);

        this.recomputeMaxSize(top, Direction.vertical);
        this.recomputeMaxSize(left, Direction.horizontal);
    }

    private recomputeSide(direction: Direction): number {
        const params = this.generateDimensionParameters(direction);

        const popupSizeWithMargins = this.rect[params.size] + this.offsetFromParent[params.coordinate]
            + parseFloat(this.computedStyle[params.marginStart]) + parseFloat(this.computedStyle[params.marginEnd]);

        const parentAnchorOffset = this.parentRect[params.size] * this.parentAnchor[params.coordinate] / 100;
        const popupSizeOffset = popupSizeWithMargins * this.popupAnchor[params.coordinate] / 100;
        const totalSizeOffset = parentAnchorOffset - popupSizeOffset;

        const incrementSign = totalSizeOffset > 0 ? 1 : -1;
        const offsetFromParent = this.offsetFromParent[params.coordinate] * incrementSign;
        const viewportMargin = this.viewportMargin[params.coordinate] * incrementSign;
        const totalSizeOffsetWithViewportMargin = totalSizeOffset + viewportMargin;

        let offset: number = this.parentRect[params.side] + totalSizeOffset + offsetFromParent;

        const maxOffset = window[params.innerSize] - popupSizeWithMargins - viewportMargin;
        const minOffset = viewportMargin;

        if (this.fallbackModes[params.coordinate] === PopupFallbackMode.invert) {
            const inverseTotalSizeOffset = (this.parentRect[params.size] - parentAnchorOffset)
                + (popupSizeWithMargins - popupSizeOffset);

            if ((offset + popupSizeWithMargins > maxOffset) || (offset < minOffset)) {
                const inverseOffset = this.parentRect[params.side] - inverseTotalSizeOffset * incrementSign;
                if (inverseOffset >= minOffset && (inverseOffset + popupSizeWithMargins) <= maxOffset) {
                    offset = inverseOffset;
                }
            }
        }

        // Final boundary check
        offset = Math.min(Math.max(offset, minOffset), maxOffset);

        this.style[params.side] = `${offset}px`;
        return offset;

        // if (this.fallbackModes[params.coordinate] == PopupFallbackMode.invert) {
        //     const inverseTotalSizeOffset = (this.parentRect[params.size] - parentAnchorOffset)
        //         + (popupSizeWithMargins - popupSizeOffset);
        //     const inverseTotalSizeOffsetWithViewportMargin = inverseTotalSizeOffset - viewportMargin;
        //
        //     if ((totalSizeOffset >= 0
        //             && window[params.innerSize] - this.parentRect[params.side] <
        //             popupSizeWithMargins + totalSizeOffsetWithViewportMargin
        //             && this.parentRect[params.side] >= popupSizeWithMargins - inverseTotalSizeOffsetWithViewportMargin)
        //         || (totalSizeOffset < 0
        //             && this.parentRect[params.side] < -totalSizeOffset - totalSizeOffsetWithViewportMargin
        //             && window[params.innerSize] - this.parentRect[params.side] >=
        //             inverseTotalSizeOffset + inverseTotalSizeOffsetWithViewportMargin)) {
        //         offset = this.parentRect[params.side] - inverseTotalSizeOffset * incrementSign;
        //     }
        // } else if (this.fallbackModes[params.coordinate] == PopupFallbackMode.offset) {
        //     if (totalSizeOffset < 0) {
        //         const outOfBoundsStart: number = this.parentRect[params.side] + totalSizeOffsetWithViewportMargin;
        //         if (outOfBoundsStart < 0) offset -= outOfBoundsStart;
        //     } else {
        //         const outOfBoundsEnd: number = (window[params.innerSize] - this.parentRect[params.side])
        //             - (popupSizeWithMargins + totalSizeOffsetWithViewportMargin);
        //         if (outOfBoundsEnd > 0) offset -= outOfBoundsEnd;
        //     }
        // }
        //
        // this.style[params.side] = offset + "px";
        // return offset;
    }

    private recomputeMaxSize(offset: number, direction: Direction) {
        const params = this.generateDimensionParameters(direction);
        const totalMargins = parseFloat(this.computedStyle[params.marginStart])
            + parseFloat(this.computedStyle[params.marginEnd])
            + (2 * this.viewportMargin[params.coordinate]);

        const maxSize = Math.min(
            window[params.innerSize] - totalMargins,  // Total available space
            window[params.innerSize] - offset - this.viewportMargin[params.coordinate] // Space from offset to edge
        );

        // Only set if we need to constrain the size
        const currentMaxSize = this.computedStyle[params.maxSize]
            ? parseFloat(this.computedStyle[params.maxSize])
            : Infinity;

        if (!currentMaxSize || currentMaxSize > maxSize) this.style[params.maxSize] = `${maxSize}px`;

        // const maxSize = window[params.innerSize] - offset - this.viewportMargin[params.coordinate]
        //     - parseFloat(this.computedStyle[params.marginStart]) - parseFloat(this.computedStyle[params.marginEnd])
        //     - parseFloat(this.parentComputedStyle[params.marginStart]) - parseFloat(this.parentComputedStyle[params.marginEnd]);
        //
        // if (this.computedStyle[params.maxSize] && parseFloat(this.computedStyle[params.maxSize]) <= maxSize) return;
        // this.style[params.maxSize] = maxSize + "px";
    }

    private clearMaxDimensions() {
        this.setStyle("maxHeight", "", true);
        this.setStyle("maxWidth", "", true);
    }

    public show(b: boolean): this {
        if (this.isShown == b) return this;
        requestAnimationFrame(() => {
            if (b) this.recomputePosition();
            else this.clearMaxDimensions();
            super.show(b);
        });
        return this;
    }

    public toggle(): this {
        return this.show(!this.isShown);
    }

    private generateDimensionParameters(direction: Direction): DimensionProperties {
        const isVertical = direction == Direction.vertical;
        return {
            size: isVertical ? "height" : "width",
            innerSize: isVertical ? "innerHeight" : "innerWidth",
            maxSize: isVertical ? "maxHeight" : "maxWidth",

            marginStart: isVertical ? "marginTop" : "marginLeft",
            marginEnd: isVertical ? "marginBottom" : "marginRight",

            side: isVertical ? "top" : "left",
            coordinate: isVertical ? "y" : "x"
        };
    }
}

export {TurboPopup};