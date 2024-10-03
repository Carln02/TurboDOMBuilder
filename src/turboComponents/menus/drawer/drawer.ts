import {TurboElement} from "../../../domBuilding/turboElement/turboElement";
import {define} from "../../../domBuilding/decorators/define";
import {Open, Side} from "../../../utils/datatypes/basicDatatypes.types";
import {TurboDrawerProperties} from "./drawer.types";
import {DefaultEventName, TurboEventName} from "../../../eventHandling/eventNaming";
import {TurboDragEvent} from "../../../eventHandling/events/basic/turboDragEvent";
import {Point} from "../../../utils/datatypes/point/point";
import {PartialRecord} from "../../../domBuilding/core.types";
import {auto} from "../../../domBuilding/decorators/auto/auto";
import {div} from "../../../domBuilding/elementCreation/basicElements";
import {TurboIconSwitch} from "../../basics/icon/iconSwitch/iconSwitch";
import {TurboIconSwitchProperties} from "../../basics/icon/iconSwitch/iconSwitch.types";
import {Reifect} from "../../wrappers/reifect/reifect";
import "./drawer.css";

@define()
export class TurboDrawer extends TurboElement {
    public readonly thumb: HTMLElement;
    public readonly panelContainer: HTMLElement;
    public readonly panel: HTMLElement;

    public readonly icon: TurboIconSwitch<Side> | Element;

    private readonly hideOverflow: boolean;

    private dragging: boolean = false;

    private _offset: PartialRecord<Open, number>;
    private _translation: number = 0;

    private readonly transitionReifect: Reifect;
    private animationOn: boolean = false;

    constructor(properties: TurboDrawerProperties) {
        super(properties);

        this.side = properties.side || Side.bottom;
        this.offset = {open: properties.offset?.open || 0, closed: properties.offset?.closed || 0};

        this.hideOverflow = properties.hideOverflow ?? false;
        if (this.hideOverflow) this.panelContainer.setStyle("overflow", "hidden");

        this.thumb = properties.thumb instanceof HTMLElement ? properties.thumb : div(properties.thumb);
        this.panelContainer = div();
        this.panel = properties.panel instanceof HTMLElement ? properties.panel : div(properties.panel);

        this.addChild([this.thumb, this.panelContainer]);
        this.panelContainer.addChild(this.panel);

        this.icon = this.generateIcon(properties);
        this.thumb.addChild(this.icon);

        this.childHandler = this.panel;

        //Transition
        this.transitionReifect = new Reifect({
            transitionProperties: this.isVertical ? "height" : "width",
            transitionDuration: 0.2,
            transitionTimingFunction: "ease-out",
            attachedObjects: [this.panelContainer]
        });

        this.initState(properties.initiallyClosed);
        this.initEvents();
    }

    private generateIcon(properties: TurboDrawerProperties) {
        if (properties.icon instanceof Element) return properties.icon;

        const attachSideToIconName = properties.attachSideToIconName ?? typeof properties.icons == "string";
        const rotateIconBasedOnSide = properties.rotateIconBasedOnSide ?? !attachSideToIconName;

        const iconProperties: TurboIconSwitchProperties<Side> = typeof properties.icon == "object"
            ? properties.icon : {
                icon: properties.icon,
                switchReifect: {states: Object.values(Side)},
                appendStateToIconName: attachSideToIconName
            };

        const iconElement = new TurboIconSwitch(iconProperties);

        if (rotateIconBasedOnSide) {
            iconElement.switchReifect.styles = {
                top: "transform: rotate(180deg)",
                bottom: "transform: rotate(0deg)",
                left: "transform: rotate(90deg)",
                right: "transform: rotate(270deg)",
            };
        }

        return iconElement;
    }

    private initEvents() {
        this.addEventListener(DefaultEventName.click, (e) => {
            e.stopImmediatePropagation();
            this.open = !this.open;
        });

        this.addEventListener(TurboEventName.dragStart, (e: TurboDragEvent) => {
            e.stopImmediatePropagation();
            this.dragging = true;
            if (this.animationOn) this.transitionReifect.enabled = false;
        });

        this.addEventListener(TurboEventName.drag, (e: TurboDragEvent) => {
            if (!this.dragging) return;
            e.stopImmediatePropagation();
            this.translateBy(e.scaledDeltaPosition);
        });

        this.addEventListener(TurboEventName.dragEnd, (e: TurboDragEvent) => {
            if (!this.dragging) return;
            e.stopImmediatePropagation();
            this.dragging = false;
            const delta = e.positions.first.sub(e.origins.first);

            switch (this.side) {
                case Side.top:
                    if (this.open && delta.y < -100) this.open = false;
                    else if (!this.open && delta.y > 100) this.open = true;
                    break;
                case Side.bottom:
                    if (this.open && delta.y > 100) this.open = false;
                    else if (!this.open && delta.y < -100) this.open = true;
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

    private initState(isClosed: boolean) {
        // switch (this.side) {
        //     case Side.top:
        //         this.panel.setStyle("top", this.offsetHeight + "px");
        //         break;
        //     case Side.bottom:
        //         this.panel.setStyle("bottom", this.offsetHeight + "px");
        //         break;
        //     case Side.right:
        //         this.panel.setStyle("right", this.offsetWidth + "px");
        //         break
        //     case Side.left:
        //         this.panel.setStyle("left", this.offsetWidth + "px");
        //         break;
        // }
        this.open = !isClosed;
        this.animationOn = true;
    }

    @auto()
    public set side(value: Side) {
        this.toggleClass("top-drawer", value == Side.top);
        this.toggleClass("bottom-drawer", value == Side.bottom);
        this.toggleClass("left-drawer", value == Side.left);
        this.toggleClass("right-drawer", value == Side.right);
    }

    public get offset(): PartialRecord<Open, number> {
        return this._offset;
    }

    public set offset(value: number | PartialRecord<Open, number>) {
        if (typeof value == "number") this._offset = {open: value, closed: value};
        else this._offset = {open: value?.open || 0, closed: value?.closed || 0};
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

    public get isVertical() {
        return this.side == Side.top || this.side == Side.bottom;
    }

    @auto()
    public set open(value: boolean) {
        if (this.animationOn) this.transitionReifect.enabled = true;
        requestAnimationFrame(() => {
            const translationAmount = value ? (this.isVertical ? this.panel.offsetHeight : this.panel.offsetWidth) : 0;
            this.translation = translationAmount + (!value ? this.offset.closed : this.offset.open);
            if (this.icon instanceof TurboIconSwitch) this.icon.switchReifect.apply(this.open ? this.getOppositeSide() : this.side);
        });
    }

    public get translation(): number {
        return this._translation;
    }

    private set translation(value: number) {
        this._translation = value;
        switch (this.side) {
            case Side.top:
                if (this.hideOverflow) this.setStyle("height", value + this.thumb.offsetHeight + "px");
                else this.panel.setStyle("transform", `translate(-50%, ${value}px)`);
                break;
            case Side.bottom:
                if (this.hideOverflow) this.setStyle("height", value + this.thumb.offsetHeight + "px");
                else this.panel.setStyle("transform", `translate(-50%, -${value}px)`);
                break;
            case Side.left:
                if (this.hideOverflow) this.setStyle("width", value + this.thumb.offsetWidth + "px");
                else this.panel.setStyle("transform", `translate(-${value}px, -50%)`);
                break;
            case Side.right:
                if (this.hideOverflow) this.setStyle("width", value + this.thumb.offsetWidth + "px");
                else this.panel.setStyle("transform", `translate(${value}px, -50%)`);
                break;
        }
    }

    private translateBy(delta: Point) {
        this.translation += this.isVertical ? delta.y : delta.x;
    }

    public refresh() {
        this.open = this.open;
    }
}