import {TurboDrawerProperties} from "./drawer.types";
import "./drawer.css";
import {iconSwitch, TurboIconSwitch} from "../../basics/icon/iconSwitch/iconSwitch";
import {Reifect} from "../../wrappers/reifect/reifect";
import {Open, Side} from "../../../utils/datatypes/basicDatatypes.types";
import {TurboIconSwitchProperties} from "../../basics/icon/iconSwitch/iconSwitch.types";
import {DefaultEventName, TurboEventName} from "../../../eventHandling/eventNaming";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboElement} from "../../../turboElement/turboElement";
import {PartialRecord} from "../../../core.types";
import {$} from "../../../turboFunctions/turboFunctions";
import {div} from "../../../elementCreation/basicElements";
import {TurboDragEvent} from "../../../eventHandling/events/turboDragEvent";
import {auto} from "../../../decorators/auto/auto";
import {TurboEmitter} from "../../../mvc/core/emitter";
import {TurboProperties} from "../../../turboFunctions/element/element.types";
import {element} from "../../../elementCreation/element";

@define("turbo-drawer")
class TurboDrawer<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EMitterType extends TurboEmitter = TurboEmitter
> extends TurboElement<ViewType, DataType, ModelType, EMitterType> {
    @auto() private set panelContainer(_value: HTMLElement) {}
    public get panelContainer(): HTMLElement {return}

    private dragging: boolean = false;
    private animationOn: boolean = false;

    protected resizeObserver: ResizeObserver;

    @auto({
        setIfUndefined: true,
        callBefore: function () {if (this.thumb) $(this).remChild(this.thumb)},
        preprocessValue: (value: TurboProperties | HTMLElement) => value instanceof HTMLElement ? value : div(value)
    }) public set thumb(value: TurboProperties | HTMLElement) {
        $(value).addClass("turbo-drawer-thumb");
        if (this.initialized) this.setupUILayout();
    }

    public get thumb(): HTMLElement {return}

    @auto({
        setIfUndefined: true,
        callBefore: function () {if (this.panel) $(this).remChild(this.panel)},
        preprocessValue: (value: TurboProperties | HTMLElement) =>
            value instanceof HTMLElement ? value : div(value)
    }) public set panel(value: TurboProperties | HTMLElement) {
        $(value).addClass("turbo-drawer-panel");
        if (this.initialized) this.setupUILayout();
    }

    public get panel(): HTMLElement {return}

    @auto({
        callBefore: function () {if (this.icon?.parentElement === this.thumb) this.thumb.removeChild(this.icon)},
        preprocessValue: function (value: string | Element | TurboIconSwitchProperties<Side> | TurboIconSwitch<Side>) {
            if (value instanceof Element) return value;
            if (typeof value === "string" && !this.attachSideToIconName && !this.rotateIconBasedOnSide)
                this.attachSideToIconName = true;
            return iconSwitch(typeof value === "object" ? value : {
                icon: value,
                switchReifect: {states: Object.values(Side)},
                defaultState: this.open ? this.getOppositeSide() : this.side,
                appendStateToIconName: this.attachSideToIconName,
            });
        }
    }) public set icon(_value: string | Element | TurboIconSwitchProperties<Side> | TurboIconSwitch<Side>) {
        if (this.initialized) this.setupUILayout();
    }

    public get icon(): TurboIconSwitch<Side> | Element {return}

    @auto({initialValue: false}) public set hideOverflow(value: boolean) {
        $(this.panelContainer).setStyle("overflow", value ? "hidden" : "");
    }

    @auto({initialValue: false}) public set attachSideToIconName(value: boolean) {
        if (this.icon instanceof TurboIconSwitch) this.icon.appendStateToIconName = value;
        if (value) this.rotateIconBasedOnSide = false;
    }

    @auto({initialValue: false}) public set rotateIconBasedOnSide(value: boolean) {
        if (value) this.attachSideToIconName = false;
        if (this.icon instanceof TurboIconSwitch) this.icon.switchReifect.styles = {
            top: "transform: rotate(180deg)",
            bottom: "transform: rotate(0deg)",
            left: "transform: rotate(90deg)",
            right: "transform: rotate(270deg)",
        };
    }

    @auto({initialValue: Side.bottom}) public set side(value: Side) {
        $(this).toggleClass("top-drawer", value == Side.top);
        $(this).toggleClass("bottom-drawer", value == Side.bottom);
        $(this).toggleClass("left-drawer", value == Side.left);
        $(this).toggleClass("right-drawer", value == Side.right);
        this.refresh();
    }

    @auto({
        initialValue: {open: 0, closed: 0},
        preprocessValue: (value: number | PartialRecord<Open, number>) =>
            typeof value === "number" ? {open: value, closed: value} : {
                open: value?.open || 0,
                closed: value?.closed || 0
            }
    }) public set offset(value: number | PartialRecord<Open, number>) {}

    public get offset(): PartialRecord<Open, number> {return}

    public get isVertical() {
        return this.side == Side.top || this.side == Side.bottom;
    }

    @auto({initialValue: false}) public set open(value: boolean) {
        if (value) this.resizeObserver.observe(this.panel, {box: "border-box"});
        else this.resizeObserver.unobserve(this.panel);
        this.refresh();
    }

    @auto() private set translation(value: number) {
        switch (this.side) {
            case Side.top:
                if (this.hideOverflow) $(this.panelContainer).setStyle("height", value + "px");
                else $(this).setStyle("transform", `translateY(${-value}px)`);
                break;
            case Side.bottom:
                if (this.hideOverflow) $(this.panelContainer).setStyle("height", value + "px");
                else $(this).setStyle("transform", `translateY(${-value}px)`);
                break;
            case Side.left:
                if (this.hideOverflow) $(this.panelContainer).setStyle("width", value + "px");
                else $(this).setStyle("transform", `translateX(${-value}px)`);
                break;
            case Side.right:
                if (this.hideOverflow) $(this.panelContainer).setStyle("width", value + "px");
                else $(this).setStyle("transform", `translateX(${-value}px)`);
                break;
        }
    }

    @auto({
        initialValueCallback: function () {
            return new Reifect({
                transitionProperties: ["transform", this.isVertical ? "height" : "width"],
                transitionDuration: 0.2,
                transitionTimingFunction: "ease-out",
            })
        },
        callAfter: function () {this.transition.attachAll(this, this.panelContainer)},
    }) public transition: Reifect;

    public get translation(): number {return}

    public initialize() {
        super.initialize();
        this.transition.attachAll(this, this.panelContainer);

        let pending = false;
        this.resizeObserver = new ResizeObserver(entries => {
            if (!this.open || this.dragging) return;
            if (pending) return;
            pending = true;

            requestAnimationFrame(() => {
                const size = Array.isArray(entries[0].borderBoxSize)
                    ? entries[0].borderBoxSize[0] : entries[0].borderBoxSize;
                this.translation = (this.open ? this.offset.open : this.offset.closed)
                    + (this.isVertical ? size.blockSize : size.inlineSize);
                pending = false;
            });
        });

        this.animationOn = true;
    }

    protected setupUIElements() {
        super.setupUIElements();
        this.panelContainer = div({classes: "turbo-drawer-panel-container"})
    }

    protected setupUILayout() {
        super.setupUILayout();
        $(this).childHandler = this;
        $(this.panel).addChild($(this).childrenArray.filter(el => el !== this.panel.parentElement));
        $(this).addChild([this.thumb, this.panelContainer]);
        $(this.panelContainer).addChild(this.panel);
        $(this.thumb).addChild(this.icon);
        $(this).childHandler = this.panel;
    }

    protected setupUIListeners() {
        this.thumb.addEventListener(DefaultEventName.click, (e) => {
            e.stopImmediatePropagation();
            this.open = !this.open;
        });

        this.thumb.addEventListener(TurboEventName.dragStart, (e: TurboDragEvent) => {
            e.stopImmediatePropagation();
            this.dragging = true;
            if (this.animationOn) this.transition.enabled = false;
        });

        this.thumb.addEventListener(TurboEventName.drag, (e: TurboDragEvent) => {
            if (!this.dragging) return;
            e.stopImmediatePropagation();
            this.translation += this.isVertical ? e.scaledDeltaPosition.y : e.scaledDeltaPosition.x;
        });

        this.thumb.addEventListener(TurboEventName.dragEnd, (e: TurboDragEvent) => {
            if (!this.dragging) return;
            e.stopImmediatePropagation();
            this.dragging = false;
            const delta = e.positions.first.sub(e.origins.first);

            switch (this.side) {
                case Side.top:
                    if (this.open && delta.y > 100) this.open = false;
                    else if (!this.open && delta.y < -100) this.open = true;
                    break;
                case Side.bottom:
                    if (this.open && delta.y < -100) this.open = false;
                    else if (!this.open && delta.y > 100) this.open = true;
                    break;
                case Side.left:
                    if (this.open && delta.x > 100) this.open = false;
                    else if (!this.open && delta.x < -100) this.open = true;
                    break;
                case Side.right:
                    if (this.open && delta.x < -100) this.open = false;
                    else if (!this.open && delta.x > 100) this.open = true;
                    break;
            }
            this.refresh();
        });
    }

    public getOppositeSide(side: Side = this.side): Side {
        switch (side) {
            case Side.top:
                return Side.bottom;
            case Side.bottom:
                return Side.top;
            case Side.left:
                return Side.right;
            case Side.right:
                return Side.left;
        }
    }

    public getAdjacentSide(side: Side = this.side): Side {
        switch (side) {
            case Side.top:
                return Side.right;
            case Side.bottom:
                return Side.left;
            case Side.left:
                return Side.top;
            case Side.right:
                return Side.bottom;
        }
    }

    public refresh() {
        if (this.animationOn) {
            this.transition.enabled = true;
            this.transition.apply();
        }

        if (this.hideOverflow) $(this.panel).setStyle("position", "absolute", true);

        if (this.icon instanceof TurboIconSwitch)
            this.icon.switchReifect.apply(this.open ? this.getOppositeSide() : this.side);

        requestAnimationFrame(() => {
            this.translation = (this.open ? this.offset.open : this.offset.closed)
                + (this.open ? (this.isVertical ? this.panel.offsetHeight : this.panel.offsetWidth) : 0);

            if (this.hideOverflow) $(this.panel).setStyle("position", "relative", true);
        });
    }
}

function drawer<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
>(properties: TurboDrawerProperties<ViewType, DataType, ModelType, EmitterType>):
    TurboDrawer<ViewType, DataType, ModelType, EmitterType> {
    return element({...properties, text: undefined, tag: "turbo-drawer", initialize: true} as any) as any;
}

export {TurboDrawer, drawer};