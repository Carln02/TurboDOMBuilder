import { TurboElement } from "../../../domBuilding/turboElement/turboElement";
import { Open, Side } from "../../../utils/datatypes/basicDatatypes.types";
import { TurboDrawerProperties } from "./drawer.types";
import { PartialRecord } from "../../../domBuilding/core.types";
import { TurboIconSwitch } from "../../basics/icon/iconSwitch/iconSwitch";
export declare class TurboDrawer extends TurboElement {
    readonly panel: HTMLElement;
    readonly thumb: Element;
    readonly icon: TurboIconSwitch<Side> | Element;
    private _open;
    private _offset;
    private _icons;
    hideOverflow: boolean;
    attachSizeToIconName: boolean;
    rotateIconBasedOnSide: boolean;
    private dragging;
    private _translation;
    private readonly fitSizeOf;
    private readonly invertOpenAndClosedValues;
    private animationOn;
    constructor(properties: TurboDrawerProperties);
    private genIcon;
    private initEvents;
    private initState;
    set side(value: Side);
    get offset(): Record<Open, number>;
    set offset(value: number | PartialRecord<Open, number>);
    get icons(): PartialRecord<Side, string>;
    set icons(value: string | PartialRecord<Side, string>);
    get currentIcon(): string;
    get oppositeSide(): Side;
    getOppositeSide(side?: Side): Side;
    getAdjacentSide(side?: Side): Side;
    get isVertical(): boolean;
    get open(): boolean;
    set open(value: boolean);
    get translation(): number;
    private set translation(value);
    refresh(): void;
    private translateBy;
    private enableTransition;
}
