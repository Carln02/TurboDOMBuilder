import {PopupFallbackMode, TurboPopupConfig, TurboPopupProperties} from "./popup.types";
import "./popup.css";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboElement} from "../../../turboElement/turboElement";
import {cache} from "../../../decorators/cache/cache";
import {auto} from "../../../decorators/auto/auto";
import {TurboEmitter} from "../../../mvc/core/emitter";
import {element} from "../../../elementCreation/element";
import {div} from "../../../elementCreation/basicElements";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {Point} from "../../datatypes/point/point";
import {DefaultEventName} from "../../../types/eventNaming.types";
import {Direction} from "../../../types/enums.types";
import {Coordinate} from "../../../types/basic.types";

/**
 * @group Components
 * @category TurboPopup
 */
@define("turbo-popup")
class TurboPopup<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    public static readonly config: TurboPopupConfig = {
        ...TurboElement.config,
        defaultPopupPosition: {x: 0, y: -100},
        defaultAnchorPosition: {x: 0, y: 100},
        defaultViewportMargin: 4,
        defaultOffsetFromAnchor: {x: 0, y: 4}
    };

    @auto({defaultValue: div({parent: document.body, id: "turbo-popup-parent-element"})})
    protected static parentElement: HTMLElement;

    @auto({defaultValue: document.body}) public anchor: Element;

    @auto({
        initialValueCallback: function () {
            return this.getPropertiesValue(undefined, "defaultPopupAnchor", {x: 50, y: 0})
        },
        preprocessValue: (value: Coordinate) => new Point(value).bound(0, 100)
    }) public set popupPosition(value: Coordinate) {}

    public get popupPosition(): Point {return}

    @auto({
        initialValueCallback: function () {
            return this.getPropertiesValue(undefined, "defaultAnchorPosition", {x: 50, y: 100})
        },
        preprocessValue: (value: Coordinate) => new Point(value).bound(0, 100)
    }) public set anchorPosition(value: Coordinate) {}

    public get anchorPosition(): Point {return}

    @auto({
        initialValueCallback: function () {return this.getPropertiesValue(undefined, "defaultViewportMargin", 0)},
        preprocessValue: (value: Coordinate | number) => new Point(value)
    }) public set viewportMargin(value: Coordinate | number) {}

    public get viewportMargin(): Point {return}

    @auto({
        initialValueCallback: function () {return this.getPropertiesValue(undefined, "defaultOffsetFromAnchor", 0)},
        preprocessValue: (value: Coordinate | number) => new Point(value)
    }) public set offsetFromAnchor(value: Coordinate | number) {}

    public get offsetFromAnchor(): Point {return}

    @auto({
        preprocessValue: (value) => {
            return typeof value !== "object" ? {x: value, y: value} : value
        },
        initialValueCallback: function () {
            return {
                x: Math.abs(this.anchorPosition.x - 50) > 25 ? PopupFallbackMode.invert : PopupFallbackMode.offset,
                y: Math.abs(this.anchorPosition.y - 50) > 25 ? PopupFallbackMode.invert : PopupFallbackMode.offset,
            }
        }
    }) public set fallbackModes(value: PopupFallbackMode | Coordinate<PopupFallbackMode>) {}

    public get fallbackModes(): Coordinate<PopupFallbackMode> {return}

    @cache({clearOnNextFrame: true}) protected get rect(): DOMRect {
        return this.getBoundingClientRect();
    }

    @cache({clearOnNextFrame: true}) protected get anchorRect(): DOMRect {
        return this.anchor.getBoundingClientRect();
    }

    @cache({clearOnNextFrame: true}) protected get computedStyle(): CSSStyleDeclaration {
        return window.getComputedStyle(this);
    }

    @cache({clearOnNextFrame: true}) protected get anchorComputedStyle(): CSSStyleDeclaration {
        return window.getComputedStyle(this.anchor);
    }

    @cache({clearOnNextFrame: true}) protected get computedMargins(): Coordinate {
        return {
            x: parseFloat(this.computedStyle.marginLeft) + parseFloat(this.computedStyle.marginRight),
            y: parseFloat(this.computedStyle.marginTop) + parseFloat(this.computedStyle.marginBottom)
        };
    }

    public initialize() {
        super.initialize();
        this.show(false);
        if (!this.parentElement) turbo(this).addToParent(TurboPopup.parentElement);
    }

    protected setupUIListeners(): void {
        super.setupUIListeners();

        document.addEventListener(DefaultEventName.scroll, () => this.show(false), {capture: true, passive: true});
        window.addEventListener(DefaultEventName.resize, () => {if (turbo(this).isShown) this.recomputePosition()}, {passive: true});
        turbo(document.body).on(DefaultEventName.click, e => {
            if (!turbo(this).isShown) return;
            const t = e.target as Node;
            if (this.contains(t)) return;
            if (this.anchor instanceof Node && this.anchor.contains(t)) return;
            this.show(false);
        }, {capture: true});
    }

    private recomputePosition() {
        if (!this.anchor) return;
        turbo(this).setStyles({maxHeight: "", maxWidth: ""}, true);

        const left = this.computeAxis(Direction.horizontal);
        const top = this.computeAxis(Direction.vertical);
        turbo(this).setStyles({left: `${left}px`, top: `${top}px`});

        const maxWidth = Math.max(0, Math.min(
            window.innerWidth - 2 * this.viewportMargin.x,
            window.innerWidth - 2 * this.viewportMargin.x - this.computedMargins.x
        ));
        const maxHeight = Math.max(0, Math.min(
            window.innerHeight - 2 * this.viewportMargin.y,
            window.innerHeight - 2 * this.viewportMargin.y - this.computedMargins.y
        ));

        turbo(this).setStyle("maxWidth", `${maxWidth}px`);
        turbo(this).setStyle("maxHeight", `${maxHeight}px`);
    }

    private computeAxis(direction: Direction): number {
        const axis = direction === Direction.horizontal ? "x" : "y";
        const sizeAxis = direction === Direction.horizontal ? "width" : "height";

        const viewportSize = direction === Direction.horizontal ? window.innerWidth : window.innerHeight;
        const parentStart = this.anchorRect[direction === Direction.horizontal ? "left" : "top"];
        const popupSize = this.rect[sizeAxis] + this.computedMargins[axis];

        const min = this.viewportMargin[axis];
        const max = viewportSize - this.viewportMargin[axis] - popupSize;

        const base = parentStart + (this.anchorRect[sizeAxis] * this.anchorPosition[axis] / 100)
            - (popupSize * this.popupPosition[axis] / 100) + this.offsetFromAnchor[axis];

        const fitsBase = base >= min && base <= max;
        if (fitsBase || this.fallbackModes[axis] === PopupFallbackMode.offset) {
            return Math.min(Math.max(base, min), max);
        }

        const flipped = parentStart + this.anchorRect[sizeAxis] * (1 - this.anchorPosition[axis] / 100)
            - popupSize * (1 - this.popupPosition[axis] / 100) - this.offsetFromAnchor[axis];
        const fitsFlip = flipped >= min && flipped <= max;

        let finalOffset: number;
        if (fitsFlip) finalOffset = flipped;
        else if (fitsBase) finalOffset = base;
        else {
            const pick = Math.abs(base - Math.min(Math.max(base, min), max)) <=
            Math.abs(flipped - Math.min(Math.max(flipped, min), max)) ? base : flipped;
            finalOffset = Math.min(Math.max(pick, min), max);
        }

        return finalOffset;
    }

    public show(b: boolean): this {
        if (b) {
            this.style.visibility = "hidden";
            this.style.display = "";
            this.recomputePosition();
            this.style.visibility = "";
            turbo(this).show(true);
        } else {
            turbo(this).setStyles({maxHeight: "", maxWidth: ""}, true).show(false);
        }
        return this;
    }
}

/**
 * @group Components
 * @category TurboPopup
 */
function popup<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
>(properties: TurboPopupProperties<ViewType, DataType, ModelType, EmitterType> = {}):
    TurboPopup<ViewType, DataType, ModelType, EmitterType> {
    return element({...properties, text: undefined, tag: "turbo-popup"} as any) as any;
}

export {TurboPopup, popup};