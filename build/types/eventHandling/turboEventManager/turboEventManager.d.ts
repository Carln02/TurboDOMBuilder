import { InputDevice, TurboEventManagerProperties, TurboEventManagerStateProperties } from "./turboEventManager.types";
import { Delegate } from "../delegate/delegate";
import { TurboElement } from "../../domBuilding/turboElement/turboElement";
/**
 * @description Class that manages default mouse, trackpad, and touch events, and accordingly fires custom events for
 * easier management of input.
 */
declare class TurboEventManager extends TurboElement {
    private _inputDevice;
    readonly onInputDeviceChange: Delegate<(device: InputDevice) => void>;
    readonly defaultState: TurboEventManagerStateProperties;
    private readonly lockState;
    private readonly disabledEventTypes;
    private readonly currentKeys;
    private currentAction;
    private currentClick;
    private wasRecentlyTrackpad;
    private readonly origins;
    private readonly previousPositions;
    private positions;
    private lastTargetOrigin;
    private readonly timerMap;
    private readonly moveThreshold;
    private readonly longPressDuration;
    private readonly authorizeEventScaling;
    private readonly scaleEventPosition;
    constructor(properties?: TurboEventManagerProperties);
    private initEvents;
    /**
     * @description The currently identified input device. It is not 100% accurate, especially when differentiating
     * between mouse and trackpad.
     */
    get inputDevice(): InputDevice;
    private set inputDevice(value);
    /**
     * @description Sets the lock state for the event manager.
     * @param origin - The element that initiated the lock state.
     * @param value - The state properties to set.
     */
    setLockState(origin: Element, value: TurboEventManagerStateProperties): void;
    /**
     * @description Resets the lock state to the default values.
     */
    resetLockState(): void;
    get enabled(): boolean;
    get preventDefaultWheel(): boolean;
    get preventDefaultMouse(): boolean;
    get preventDefaultTouch(): boolean;
    private keyDown;
    private keyUp;
    private wheel;
    private pointerDown;
    private pointerMove;
    private pointerUp;
    private pointerLeave;
    private getFireOrigin;
    /**
     * @description Fires a custom Turbo click event at the click target with the click position
     * @param p
     * @param eventName
     * @private
     */
    private fireClick;
    /**
     * @description Fires a custom Turbo drag event at the target with the origin of the drag, the last drag position, and the current position
     * @param positions
     * @param eventName
     * @private
     */
    private fireDrag;
    private setTimer;
    private clearTimer;
    private setClickMode;
    private applyEventNames;
}
export { TurboEventManager };
