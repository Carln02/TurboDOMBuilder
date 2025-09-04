import {
    ActionMode,
    ClickMode,
    DisabledTurboEventTypes,
    InputDevice,
    TurboEventManagerLockStateProperties,
    TurboEventManagerProperties,
    TurboEventManagerStateProperties
} from "./turboEventManager.types";
import {Delegate} from "../delegate/delegate";
import {TurboMap} from "../../utils/datatypes/turboMap/turboMap";
import {Point} from "../../utils/datatypes/point/point";
import {TurboEvent} from "../events/turboEvent";
import {setupTurboEventManagerBypassing} from "./managerBypassing/managerBypassing";
import {
    DefaultClickEventName, DefaultDragEventName,
    DefaultEventName, DefaultKeyEventName, DefaultMoveEventName, DefaultWheelEventName,
    TurboClickEventName,
    TurboDragEventName,
    TurboEventName,
    TurboEventNameEntry,
    TurboKeyEventName,
    TurboMoveEventName,
    TurboWheelEventName
} from "../eventNaming";
import {$} from "../../turboFunctions/turboFunctions";
import {clearCache} from "../../decorators/cache/cache";
import {auto} from "../../decorators/auto/auto";
import {TurboKeyEvent} from "../events/turboKeyEvent";
import {TurboWheelEvent} from "../events/turboWheelEvent";
import {TurboDragEvent} from "../events/turboDragEvent";
import {TurboDragEventProperties, TurboEventProperties, TurboRawEventProperties} from "../events/turboEvent.types";

/**
 * @description Class that manages default mouse, trackpad, and touch events, and accordingly fires custom events for
 * easier management of input.
 */
class TurboEventManager {
    private _inputDevice: InputDevice = InputDevice.unknown;

    //Delegate fired when the input device changes
    public readonly onInputDeviceChange: Delegate<(device: InputDevice) => void>;

    //Manager states
    public readonly defaultState: TurboEventManagerStateProperties = {};
    private readonly lockState: TurboEventManagerLockStateProperties = {};

    //Input events states
    protected readonly currentKeys: string[] = [];
    protected currentAction: ActionMode = ActionMode.none;
    protected currentClick: ClickMode = ClickMode.none;
    private wasRecentlyTrackpad: boolean = false;

    //Saved values (Maps to account for different touch points and their IDs)
    private readonly origins: TurboMap<number, Point>;
    private readonly previousPositions: TurboMap<number, Point>;
    private positions: TurboMap<number, Point>;

    private lastTargetOrigin: Node;

    //Single timer instance --> easily cancel it and set it again
    private readonly timerMap: TurboMap<string, NodeJS.Timeout>;

    //Threshold differentiating a click from a drag
    private readonly moveThreshold: number;
    //Duration to reach long press
    private readonly longPressDuration: number;

    public authorizeEventScaling: boolean | (() => boolean);
    public scaleEventPosition: (position: Point) => Point;

    public constructor(properties: TurboEventManagerProperties = {}) {
        this.onInputDeviceChange = new Delegate<(device: InputDevice) => void>();
        this.authorizeEventScaling = properties.authorizeEventScaling;
        this.scaleEventPosition = properties.scaleEventPosition;

        this.defaultState = {
            enabled: properties.enabled ?? true,
            preventDefaultWheel: properties.preventDefaultWheel ?? true,
            preventDefaultMouse: properties.preventDefaultMouse ?? true,
            preventDefaultTouch: properties.preventDefaultTouch ?? true,
        };
        this.resetLockState();

        this.moveThreshold = properties.moveThreshold || 10;
        this.longPressDuration = properties.longPressDuration || 500;

        //Init positions
        this.origins = new TurboMap<number, Point>();
        this.previousPositions = new TurboMap<number, Point>();

        this.timerMap = new TurboMap<TurboEventNameEntry, NodeJS.Timeout>();

        if (!properties.disableKeyEvents) this.keyEventsEnabled = true;
        if (!properties.disableWheelEvents) this.wheelEventsEnabled = true;
        if (!properties.disableMouseEvents) this.mouseEventsEnabled = true;
        if (!properties.disableTouchEvents) this.touchEventsEnabled = true;
        if (!properties.disableDragEvents) this.dragEventEnabled = true;
        if (!properties.disableClickEvents) this.clickEventEnabled = true;
        if (!properties.disableMoveEvent) this.moveEventsEnabled = true;

        setupTurboEventManagerBypassing(this);
    }

    @auto({cancelIfUnchanged: true})
    public set keyEventsEnabled(value: boolean) {
        if (value) {
            $(document).on("keydown", this.keyDown);
            $(document).on("keyup", this.keyUp);
        } else {
            $(document).removeListener("keydown", this.keyDown);
            $(document).removeListener("keyup", this.keyUp);
        }
        this.applyEventNames(value ? TurboKeyEventName : DefaultKeyEventName);
    }

    @auto({cancelIfUnchanged: true})
    public set wheelEventsEnabled(value: boolean) {
        if (value) $(document.body).on("wheel", this.wheel, document, {passive: false, propagate: true});
        else $(document).removeListener("wheel", this.wheel);
        this.applyEventNames(value ? TurboWheelEventName : DefaultWheelEventName);
    }

    @auto({cancelIfUnchanged: true})
    public set moveEventsEnabled(value: boolean) {
        this.applyEventNames(value ? TurboMoveEventName : DefaultMoveEventName);
    }

    @auto({cancelIfUnchanged: true})
    public set mouseEventsEnabled(value: boolean) {
        if (value) {
            $(document).on("mousedown", this.pointerDown, document, {propagate: true});
            $(document).on("mousemove", this.pointerMove, document, {propagate: true});
            $(document).on("mouseup", this.pointerUp, document, {propagate: true});
            $(document).on("mouseleave", this.pointerLeave, document, {propagate: true});
        } else {
            $(document).removeListener("mousedown", this.pointerDown);
            $(document).removeListener("mousemove", this.pointerMove);
            $(document).removeListener("mouseup", this.pointerUp);
            $(document).removeListener("mouseleave", this.pointerLeave);
        }
    }

    @auto({cancelIfUnchanged: true})
    public set touchEventsEnabled(value: boolean) {
        if (value) {
            $(document).on("touchstart", this.pointerDown, document, {passive: false, propagate: true});
            $(document).on("touchmove", this.pointerMove, document, {passive: false, propagate: true});
            $(document).on("touchend", this.pointerUp, document, {passive: false, propagate: true});
            $(document).on("touchcancel", this.pointerUp, document, {passive: false, propagate: true});
        } else {
            $(document).removeListener("touchstart", this.pointerDown);
            $(document).removeListener("touchmove", this.pointerMove);
            $(document).removeListener("touchend", this.pointerUp);
            $(document).removeListener("touchcancel", this.pointerUp);
        }
    }

    @auto({cancelIfUnchanged: true})
    public set clickEventEnabled(value: boolean) {
        this.applyEventNames(value ? TurboClickEventName : DefaultClickEventName);
    }

    @auto({cancelIfUnchanged: true})
    public set dragEventEnabled(value: boolean) {
        this.applyEventNames(value ? TurboDragEventName : DefaultDragEventName);
    }

    /**
     * @description The currently identified input device. It is not 100% accurate, especially when differentiating
     * between mouse and trackpad.
     */
    public get inputDevice() {
        return this._inputDevice;
    }

    private set inputDevice(value: InputDevice) {
        if (this.inputDevice == value) return;
        if (value == InputDevice.trackpad) this.wasRecentlyTrackpad = true;
        this._inputDevice = value;
        this.onInputDeviceChange.fire(value);
    }

    /**
     * @description Sets the lock state for the event manager.
     * @param origin - The element that initiated the lock state.
     * @param value - The state properties to set.
     */
    public setLockState(origin: Element, value: TurboEventManagerStateProperties) {
        this.lockState.lockOrigin = origin;
        for (const key in value) this.lockState[key] = value[key];
    }

    /**
     * @description Resets the lock state to the default values.
     */
    public resetLockState() {
        this.lockState.enabled = this.defaultState.enabled;
        this.lockState.preventDefaultWheel = this.defaultState.preventDefaultWheel;
        this.lockState.preventDefaultMouse = this.defaultState.preventDefaultMouse;
        this.lockState.preventDefaultTouch = this.defaultState.preventDefaultTouch;
        this.lockState.lockOrigin = document.body;
    }

    public get enabled() {
        return this.defaultState.enabled && this.lockState.enabled;
    }

    public get preventDefaultWheel() {
        return this.defaultState.preventDefaultWheel && this.lockState.preventDefaultWheel;
    }

    public get preventDefaultMouse() {
        return this.defaultState.preventDefaultMouse && this.lockState.preventDefaultMouse;
    }

    public get preventDefaultTouch() {
        return this.defaultState.preventDefaultTouch && this.lockState.preventDefaultTouch;
    }

    //Key Events

    private keyDown = (e: KeyboardEvent) => {
        if (!this.enabled) return;
        //Return if key already pressed
        if (this.currentKeys.includes(e.key)) return;
        //Add key to currentKeys
        this.currentKeys.push(e.key);
        //Fire a keyPressed event (only once)
        this.dispatchEvent(document, TurboKeyEvent, {eventName: TurboKeyEventName.keyPressed, keyPressed: e.key});
    }

    private keyUp = (e: KeyboardEvent) => {
        if (!this.enabled) return;
        //Return if key not pressed
        if (!this.currentKeys.includes(e.key)) return;
        //Remove key from currentKeys
        this.currentKeys.splice(this.currentKeys.indexOf(e.key), 1);
        //Fire a keyReleased event
        this.dispatchEvent(document, TurboKeyEvent, {eventName: TurboKeyEventName.keyReleased, keyReleased: e.key});
    }

    //Wheel Event

    private wheel = (e: WheelEvent) => {
        if (!this.enabled) return;
        //Prevent default scroll behavior
        if (this.preventDefaultWheel) e.preventDefault();

        //Most likely trackpad
        if (Math.abs(e.deltaY) <= 40 || e.deltaX != 0) this.inputDevice = InputDevice.trackpad;
        //Set input device to mouse if it wasn't trackpad recently
        if (!this.wasRecentlyTrackpad) this.inputDevice = InputDevice.mouse;

        //Reset trackpad timer
        this.clearTimer("recentlyTrackpadTimer");
        //Set timer to clear recently trackpad boolean after a delay
        this.setTimer("recentlyTrackpadTimer", () => {
            if (this.inputDevice == InputDevice.trackpad) this.wasRecentlyTrackpad = false;
        }, 800);

        //Get name of event according to input type
        let eventName: TurboEventNameEntry;
        //Trackpad pinching (for some reason Ctrl key is marked as pressed in the WheelEvent)
        if (this.inputDevice == InputDevice.trackpad && e.ctrlKey) eventName = TurboEventName.trackpadPinch;
        //Trackpad zooming
        else if (this.inputDevice == InputDevice.trackpad) eventName = TurboEventName.trackpadScroll;
        //Mouse scrolling
        else eventName = TurboEventName.mouseWheel;

        this.dispatchEvent(document, TurboWheelEvent, {delta: new Point(e.deltaX, e.deltaY), eventName: eventName});
    };

    //Mouse and Touch Events

    private pointerDown = (e: MouseEvent | TouchEvent) => {
        if (!e.composedPath().includes(this.lockState.lockOrigin)) {
            (document.activeElement as HTMLElement)?.blur();
            this.resetLockState();
        }
        if (!this.enabled) return;

        //Check if it's touch
        const isTouch = e instanceof TouchEvent;

        //Prevent default actions (especially useful for touch events on iOS and iPadOS)
        if (this.preventDefaultMouse && !isTouch) e.preventDefault();
        if (this.preventDefaultTouch && isTouch) e.preventDefault();

        //Update the input device
        if (isTouch) this.inputDevice = InputDevice.touch;
        else if (this.inputDevice == InputDevice.unknown || this.inputDevice == InputDevice.touch)
            this.inputDevice = InputDevice.mouse;

        //Touch start initialization
        if (isTouch) {
            //Loop on all changed touch points (new ones) and initialize them
            Array.from((e as TouchEvent).changedTouches).forEach(touchPoint => {
                const position = new Point(touchPoint);
                this.origins.set(touchPoint.identifier, position);
                this.previousPositions.set(touchPoint.identifier, position);
            });
            //Update click mode according to number of current touch points
            this.setClickMode((e as TouchEvent).touches.length, true);
        }

        //Mouse down initialization
        else {
            //Initialize origin and previous position
            const position = new Point(e as MouseEvent);
            this.origins.set(0, position);
            this.previousPositions.set(0, position);
            //Update click mode
            this.setClickMode((e as MouseEvent).button);
        }

        //Return if click events are disabled
        if (!this.clickEventEnabled) return;

        //Fire click start
        this.fireClick(this.origins.first, TurboEventName.clickStart);
        this.currentAction = ActionMode.click;

        //Set long press timer
        this.setTimer(TurboEventName.longPress, () => {
            if (this.currentAction != ActionMode.click) return;
            //Turn a click into long press
            this.currentAction = ActionMode.longPress;
            //Fire long press
            this.fireClick(this.origins.first, TurboEventName.longPress);
        }, this.longPressDuration);
    };

    private pointerMove = (e: MouseEvent | TouchEvent) => {
        if (!this.enabled) return;
        if (!this.moveEventsEnabled && !this.dragEventEnabled) return;

        //Check if is touch
        const isTouch = e instanceof TouchEvent;

        //Prevent default actions
        if (this.preventDefaultMouse && !isTouch) e.preventDefault();
        if (this.preventDefaultTouch && isTouch) e.preventDefault();

        //Initialize a new positions map
        this.positions = new TurboMap<number, Point>();

        //Get current position(s) for touch (or mouse)
        if (isTouch) {
            Array.from(e.touches).forEach(touchPoint =>
                this.positions.set(touchPoint.identifier, new Point(touchPoint)));
        } else {
            this.positions.set(0, new Point(e.clientX, e.clientY));
        }

        //Clear cached target origin if not dragging
        if (this.currentAction != ActionMode.drag) this.lastTargetOrigin = null;

        //Fire move event if enabled
        if (this.moveEventsEnabled) this.fireDrag(this.positions, TurboEventName.move);

        //If drag events are enabled and user is interacting
        if (this.currentAction != ActionMode.none && this.dragEventEnabled) {
            //Initialize drag
            if (this.currentAction != ActionMode.drag) {
                //Loop on saved origins points and check if any point's distance from its origin is greater than the threshold
                if (!Array.from(this.origins.entries()).some(([key, origin]) => {
                    const position = this.positions.get(key);
                    return position && Point.dist(position, origin) > this.moveThreshold;
                })) return;
                //If didn't return --> fire drag start and set action to drag
                clearCache(this);
                this.fireDrag(this.origins, TurboEventName.dragStart);
                this.currentAction = ActionMode.drag;
            }

            //Fire drag and update previous points
            this.fireDrag(this.positions);
        }

        //Update previous positions
        this.positions.forEach((position, key) => this.previousPositions.set(key, position));
    };

    private pointerUp = (e: MouseEvent | TouchEvent) => {
        if (!this.enabled) return;

        //Check if is touch
        const isTouch = e instanceof TouchEvent;

        //Prevent default actions
        if (this.preventDefaultMouse && !isTouch) e.preventDefault();
        if (this.preventDefaultTouch && isTouch) e.preventDefault();

        //Clear any timer set
        this.clearTimer(TurboEventName.longPress);

        //Initialize a new positions map
        this.positions = new TurboMap<number, Point>();

        //Get current position(s) for touch (or mouse)
        if (isTouch) {
            Array.from((e as TouchEvent).changedTouches).forEach(touchPoint => {
                this.positions.set(touchPoint.identifier, new Point(touchPoint));
            });
        } else {
            this.positions.set(0, new Point(e as MouseEvent));
        }

        //If action was drag --> fire drag end
        if (this.currentAction == ActionMode.drag && this.dragEventEnabled)
            this.fireDrag(this.positions, TurboEventName.dragEnd);

        //If click events are enabled
        if (this.clickEventEnabled) {
            //If action is click --> fire click
            if (this.currentAction == ActionMode.click) {
                this.fireClick(this.positions.first, TurboEventName.click);
            }

            //Fire click end
            this.fireClick(this.origins.first, TurboEventName.clickEnd);
        }

        //Clear saved positions (or removed lifted touch points)
        if (isTouch) {
            Array.from((e as TouchEvent).changedTouches).forEach(touchPoint => {
                this.origins.delete(touchPoint.identifier);
                this.previousPositions.delete(touchPoint.identifier);
            });
        } else {
            this.origins.clear();
            this.previousPositions.clear();
        }

        //Reset click mode and action
        this.currentAction = ActionMode.none;
        this.currentClick = ClickMode.none;
    };

    private pointerLeave = () => {
        if (!this.enabled) return;
        if (this.currentAction == ActionMode.none) return;
        //Clear any timer set
        this.clearTimer(TurboEventName.longPress);

        //If not drag --> fire click end
        if (this.currentAction != ActionMode.drag) {
            this.fireClick(this.origins.first, TurboEventName.clickEnd);
            this.currentAction = ActionMode.none;
        }
    }

    private getFireOrigin(positions?: TurboMap<number, Point>, reload: boolean = false): Node {
        if (!this.lastTargetOrigin || reload) {
            const origin = this.origins.first ? this.origins.first : positions.first;
            this.lastTargetOrigin = document.elementFromPoint(origin.x, origin.y) as Node;
        }
        return this.lastTargetOrigin;
    }

    //Event triggering

    /**
     * @description Fires a custom Turbo click event at the click target with the click position
     * @param p
     * @param eventName
     * @private
     */
    private fireClick(p: Point, eventName: TurboEventNameEntry = TurboEventName.click) {
        if (!p) return;
        const target = document.elementFromPoint(p.x, p.y) as Element || document;
        this.dispatchEvent(target, TurboEvent, {position: p, eventName: eventName});
    }

    /**
     * @description Fires a custom Turbo drag event at the target with the origin of the drag, the last drag position, and the current position
     * @param positions
     * @param eventName
     * @private
     */
    private fireDrag(positions: TurboMap<number, Point>, eventName: TurboEventNameEntry = TurboEventName.drag) {
        if (!positions) return;
        this.dispatchEvent(this.getFireOrigin(positions), TurboDragEvent, {
            positions: positions,
            previousPositions: this.previousPositions,
            origins: this.origins,
            eventName: eventName
        });
    }

    protected dispatchEvent<
        EventType extends TurboEvent = TurboEvent,
        PropertiesType extends TurboRawEventProperties = TurboEventProperties
    >(target: Node, eventType: new (properties: PropertiesType) => EventType, properties: Partial<PropertiesType>) {
        properties.clickMode = this.currentClick;
        properties.keys = this.currentKeys;
        properties.eventManager = this;
        properties.authorizeScaling = this.authorizeEventScaling;
        properties.scalePosition = this.scaleEventPosition;
        target.dispatchEvent(new eventType(properties as any));
    }

    //Timer

    //Sets a timer function associated with a certain event name, with its duration
    private setTimer(timerName: string, callback: () => void, duration: number) {
        this.clearTimer(timerName);
        this.timerMap.set(timerName, setTimeout(() => {
            callback();
            this.clearTimer(timerName);
        }, duration));
    }

    //Clears timer associated with the provided event name
    private clearTimer(timerName: string) {
        const timer = this.timerMap.get(timerName);
        if (!timer) return;
        clearTimeout(timer);
        this.timerMap.delete(timerName);
    }

    //Click mode

    private setClickMode(button: number, isTouch: boolean = false): ClickMode {
        if (isTouch) button--;
        switch (button) {
            case -1:
                this.currentClick = ClickMode.none;
                return;
            case 0:
                this.currentClick = ClickMode.left;
                return;
            case 1:
                this.currentClick = ClickMode.middle;
                return;
            case 2:
                this.currentClick = ClickMode.right;
                return;
            default:
                this.currentClick = ClickMode.other;
                return;
        }
    }

    private applyEventNames(eventNames: Record<string, string>) {
        for (const eventName in eventNames) DefaultEventName[eventName] = eventNames[eventName];
    }
}

export {TurboEventManager};