import {TurboDrawerProperties} from "./drawer.types";
import "./drawer.css";
import {TurboIconSwitch} from "../../basics/icon/iconSwitch/iconSwitch";
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

@define()
class TurboDrawer<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel
> extends TurboElement<ViewType, DataType, ModelType> {
    public readonly thumb: HTMLElement;
    public readonly panelContainer: HTMLElement;
    public readonly panel: HTMLElement;

    private _icon: TurboIconSwitch<Side> | Element;
    private _offset: PartialRecord<Open, number>;
    private _translation: number = 0;

    public readonly transition: Reifect;

    private dragging: boolean = false;
    private animationOn: boolean = false;

    protected resizeObserver: ResizeObserver;

    public constructor(properties: TurboDrawerProperties<ViewType, DataType, ModelType>) {
        super(properties);
        $(this).addClass("turbo-drawer");

        this.thumb = properties.thumb instanceof HTMLElement ? properties.thumb : div(properties.thumb);
        this.panelContainer = div();
        this.panel = properties.panel instanceof HTMLElement ? properties.panel : div(properties.panel);

        $(this.thumb).addClass("turbo-drawer-thumb");
        $(this.panelContainer).addClass("turbo-drawer-panel-container");
        $(this.panel).addClass("turbo-drawer-panel");

        $(this).addChild([this.thumb, this.panelContainer]);
        $(this.panelContainer).addChild(this.panel);

        this.hideOverflow = properties.hideOverflow ?? false;

        this.side = properties.side || Side.bottom;
        this.offset = {open: properties.offset?.open || 0, closed: properties.offset?.closed || 0};

        this.attachSideToIconName = properties.attachSideToIconName;
        this.rotateIconBasedOnSide = properties.rotateIconBasedOnSide;
        this.icon = properties.icon;

        $(this).childHandler = this.panel;

        //Transition
        this.transition = properties.transition ?? new Reifect({
            transitionProperties: ["transform", this.isVertical ? "height" : "width"],
            transitionDuration: 0.2,
            transitionTimingFunction: "ease-out",
            attachedObjects: [this, this.panelContainer]
        });

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

        this.open = properties.initiallyOpen || false;
        this.animationOn = true;
        this.initEvents();
    }

    public get icon(): TurboIconSwitch<Side> | Element {
        return this._icon;
    }

    public set icon(value: string | Element | TurboIconSwitchProperties<Side> | TurboIconSwitch<Side>) {
        if (this.icon?.parentElement === this.thumb) this.thumb.removeChild(this.icon);

        if (value instanceof Element) {
            this._icon = value;
            return;
        }

        let attachSideToIconName = this.attachSideToIconName;
        if (typeof value === "string" && !attachSideToIconName && !this.rotateIconBasedOnSide) attachSideToIconName = true;

        this._icon = new TurboIconSwitch(
            typeof value == "object"
                ? value
                : {
                    icon: value,
                    switchReifect: {states: Object.values(Side)},
                    defaultState: this.open ? this.getOppositeSide() : this.side,
                    appendStateToIconName: attachSideToIconName,
                });

        $(this.thumb).addChild(this.icon);
        this.attachSideToIconName = attachSideToIconName;
    }

    private initEvents() {
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

    @auto()
    public set hideOverflow(value: boolean) {
        $(this.panelContainer).setStyle("overflow", value ? "hidden" : "");
    }

    @auto()
    public set attachSideToIconName(value: boolean) {
        if (this.icon instanceof TurboIconSwitch) this.icon.appendStateToIconName = value;
        if (value) this.rotateIconBasedOnSide = false;
    }

    @auto()
    public set rotateIconBasedOnSide(value: boolean) {
        if (value) this.attachSideToIconName = false;
        if (this.icon instanceof TurboIconSwitch) this.icon.switchReifect.styles = {
            top: "transform: rotate(180deg)",
            bottom: "transform: rotate(0deg)",
            left: "transform: rotate(90deg)",
            right: "transform: rotate(270deg)",
        };
    }

    @auto()
    public set side(value: Side) {
        $(this).toggleClass("top-drawer", value == Side.top);
        $(this).toggleClass("bottom-drawer", value == Side.bottom);
        $(this).toggleClass("left-drawer", value == Side.left);
        $(this).toggleClass("right-drawer", value == Side.right);
        this.refresh();
    }

    public get offset(): PartialRecord<Open, number> {
        return this._offset;
    }

    public set offset(value: number | PartialRecord<Open, number>) {
        if (typeof value == "number") this._offset = {open: value, closed: value};
        else this._offset = {open: value?.open || 0, closed: value?.closed || 0};
    }

    public get isVertical() {
        return this.side == Side.top || this.side == Side.bottom;
    }

    @auto()
    public set open(value: boolean) {
        if (value) this.resizeObserver.observe(this.panel, {box: "border-box"});
        else this.resizeObserver.unobserve(this.panel);
        this.refresh();
    }

    public get translation(): number {
        return this._translation;
    }

    private set translation(value: number) {
        this._translation = value;

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

export {TurboDrawer};