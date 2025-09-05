import {
    ActionMode,
    ClickMode,
    InputDevice,
    TurboEventManagerLockStateProperties,
    TurboEventManagerStateProperties
} from "./turboEventManager.types";
import {TurboMap} from "../../utils/datatypes/turboMap/turboMap";
import {Point} from "../../utils/datatypes/point/point";
import {TurboModel} from "../../turboElement/mvc/turboModel";
import {Delegate} from "../delegate/delegate";
import {TurboEventManagerUtilsHandler} from "./handlers/turboEventManager.utilsHandler";
import {TurboWeakSet} from "../../utils/datatypes/weakSet/weakSet";

export class TurboEventManagerModel extends TurboModel {
    public readonly state: TurboEventManagerStateProperties = {};
    public readonly lockState: TurboEventManagerLockStateProperties = {};

    //Delegate fired when the input device changes
    public readonly onInputDeviceChange: Delegate<(device: InputDevice) => void>
        = new Delegate<(device: InputDevice) => void>();

    //Input events states
    public readonly currentKeys: string[] = [];
    public currentAction: ActionMode = ActionMode.none;
    public currentClick: ClickMode = ClickMode.none;
    public wasRecentlyTrackpad: boolean = false;

    //Threshold differentiating a click from a drag
    public moveThreshold: number;
    //Duration to reach long press
    public longPressDuration: number;

    public authorizeEventScaling: boolean | (() => boolean);
    public scaleEventPosition: (position: Point) => Point;

    //Saved values (Maps to account for different touch points and their IDs)
    public readonly origins: TurboMap<number, Point> = new TurboMap();
    public readonly previousPositions: TurboMap<number, Point> = new TurboMap();
    public positions: TurboMap<number, Point>;

    public lastTargetOrigin: Node;

    //Single timer instance --> easily cancel it and set it again
    public readonly timerMap: TurboMap<string, NodeJS.Timeout> = new TurboMap();

    //All created tools
    public readonly tools: Map<string, TurboWeakSet<Element>> = new Map();
    //Tools mapped to keys
    public readonly mappedKeysToTool: Map<string, string> = new Map();

    //Tools currently held by the user (one - or none - per each click button/mode)
    public readonly currentTools: Map<ClickMode, string> = new Map();

    private _inputDevice: InputDevice;

    public get inputDevice(): InputDevice {
        return this._inputDevice;
    }

    public set inputDevice(value: InputDevice) {
        if (this.inputDevice == value) return;
        if (value == InputDevice.trackpad) this.wasRecentlyTrackpad = true;
        this._inputDevice = value;
        this.onInputDeviceChange.fire(value);
    }

    public get utils(): TurboEventManagerUtilsHandler {
        return this.getHandler("utils") as TurboEventManagerUtilsHandler;
    }
}