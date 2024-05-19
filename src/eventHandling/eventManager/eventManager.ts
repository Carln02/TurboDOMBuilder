import {ActionMode, ClickMode, InputDevice} from "./eventManager.types";
import {Delegate} from "../delegate/delegate";
import {PositionsMap, TurboEventName} from "../events/turboEvent.types";
import {Point} from "../../utils/datatypes/point/point";
import {TurboMap} from "../../utils/datatypes/turboMap/turboMap";
import {TurboKeyEvent} from "../events/basic/turboKeyEvent";
import {TurboWheelEvent} from "../events/basic/turboWheelEvent";
import {TurboEvent} from "../events/turboEvent";
import {TurboDragEvent} from "../events/basic/turboDragEvent";

class EventManager {
    private static _instance: EventManager;

    private _inputDevice: InputDevice = InputDevice.unknown;
    public readonly onInputDeviceChange = new Delegate<(device: InputDevice) => void>();

    //States
    private readonly currentKeys: string[] = [];
    private currentAction: ActionMode = ActionMode.none;
    private currentClick: ClickMode = ClickMode.none;

    //Saved values
    private readonly origins: PositionsMap;
    private readonly previousPositions: PositionsMap;

    private timer: NodeJS.Timeout | null = null;

    private readonly moveThreshold = 10;
    private readonly longPressDuration = 500;

    constructor() {
        //Cancel construction if exists already
        if (EventManager.instance) return EventManager.instance;
        EventManager.instance = this;

        this.origins = new TurboMap<number, Point>();
        this.previousPositions = new TurboMap<number, Point>();

        this.initEvents();
    }

    private initEvents() {
        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);

        document.addEventListener("wheel", this.wheel, {passive: false});

        document.addEventListener("mousedown", this.pointerDown);
        document.addEventListener("mousemove", this.pointerMove);
        document.addEventListener("mouseup", this.pointerUp);
        document.addEventListener("mouseleave", this.pointerLeave);

        document.addEventListener("touchstart", this.pointerDown, {passive: false});
        document.addEventListener("touchmove",this.pointerMove, {passive: false});
        document.addEventListener("touchend", this.pointerUp, {passive: false});
    }

    /**
     * @description The singleton instance.
     */
    public static get instance() {
        return this._instance;
    }

    private static set instance(value: EventManager) {
        this._instance = value;
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
        this._inputDevice = value;
        this.onInputDeviceChange.fire(value);
    }

    //Key Events

    private keyDown = (e: KeyboardEvent) => {
        if (this.currentKeys.includes(e.key)) return;
        this.currentKeys.push(e.key);
        document.dispatchEvent(new TurboKeyEvent(e.key, null, this.currentClick, this.currentKeys, TurboEventName.keyPressed));
    }

    private keyUp = (e: KeyboardEvent) => {
        if (!this.currentKeys.includes(e.key)) return;
        this.currentKeys.splice(this.currentKeys.indexOf(e.key), 1);
        document.dispatchEvent(new TurboKeyEvent(null, e.key, this.currentClick, this.currentKeys, TurboEventName.keyReleased));
    }

    //Wheel Event

    private wheel = (e: WheelEvent) => {
        e.preventDefault();

        if (this.inputDevice != InputDevice.trackpad) this.inputDevice = InputDevice.mouse;
        //Most likely trackpad
        if (Math.abs(e.deltaY) <= 40 || e.deltaX != 0) this.inputDevice = InputDevice.trackpad;

        //Reset trackpad timer
        this.clearTimer();
        this.setTimer(() => {
            if (this.inputDevice == InputDevice.trackpad) this.inputDevice = InputDevice.mouse;
        });

        //Get name of event according to input type
        let eventName: TurboEventName;
        //Trackpad pinching
        if (this.inputDevice == InputDevice.trackpad && e.ctrlKey) eventName = TurboEventName.trackpadPinch;
        //Trackpad zooming
        else if (e.ctrlKey) eventName = TurboEventName.trackpadScroll;
        //Mouse scrolling
        else eventName = TurboEventName.mouseWheel;

        document.dispatchEvent(new TurboWheelEvent(new Point(e.deltaX, e.deltaY), this.currentKeys, eventName));
    };

    //Mouse and Touch Events

    private pointerDown = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();

        const isTouch = e instanceof TouchEvent;
        if (isTouch) this.inputDevice = InputDevice.touch;
        else if (this.inputDevice == InputDevice.unknown) this.inputDevice = InputDevice.mouse;

        //Touch start initialization
        if (isTouch) {
            Array.from((e as TouchEvent).touches).forEach(touchPoint => {
                const position = new Point(touchPoint);
                this.origins.set(touchPoint.identifier, position);
                this.previousPositions.set(touchPoint.identifier, position);
            });
            this.setClickMode((e as TouchEvent).touches.length, true);
        }

        //Mouse down initialization
        else {
            const position = new Point(e as MouseEvent);
            this.origins.set(0, position);
            this.previousPositions.set(0, position);
            this.setClickMode((e as MouseEvent).button);
        }

        //Fire click start and set click timer
        if (this.origins.first) {
            this.currentAction = ActionMode.click;
            this.setTimer(this.clickTimer);
            this.fireClick(this.origins.first, TurboEventName.clickStart);
        }
    };

    private pointerMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();

        const isTouch = e instanceof TouchEvent;
        const positions = new TurboMap<number, Point>();

        //Get current positions
        if (isTouch) {
            Array.from((e as TouchEvent).touches).forEach(touchPoint => {
                positions.set(touchPoint.identifier, new Point(touchPoint));
            });
        } else {
            positions.set(0, new Point(e as MouseEvent));
        }

        //Fire move event
        this.fireDrag(positions, TurboEventName.move);
        if (this.currentAction == ActionMode.none) return;

        //Initialize drag
        if (this.currentAction != ActionMode.drag) {
            if (!Array.from(this.origins.entries()).some(([key, origin]) => {
                const position = positions.get(key);
                return position && Point.dist(position, origin) > this.moveThreshold;
            })) return;
            this.fireDrag(positions, TurboEventName.dragStart);
            this.currentAction = ActionMode.drag;
        }

        //Fire drag and update previous points
        this.fireDrag(positions);
        positions.forEach((position, key) => this.previousPositions.set(key, position));
    };

    private pointerUp = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        this.clearTimer();

        const positions = new TurboMap<number, Point>();
        const isTouch = e instanceof TouchEvent;

        if (isTouch) {
            Array.from((e as TouchEvent).changedTouches).forEach(touchPoint => {
                positions.set(touchPoint.identifier, new Point(touchPoint));
            });
        } else {
            positions.set(0, new Point(e as MouseEvent));
        }

        if (this.currentAction == ActionMode.click) this.fireClick(positions.first);
        if (this.currentAction == ActionMode.drag) this.fireDrag(positions, TurboEventName.dragEnd);

        this.fireClick(this.origins.first, TurboEventName.clickEnd);

        if (isTouch) {
            Array.from((e as TouchEvent).changedTouches).forEach(touchPoint => {
                this.origins.delete(touchPoint.identifier);
                this.previousPositions.delete(touchPoint.identifier);
            });
        } else {
            this.origins.clear();
            this.previousPositions.clear();
        }

        this.currentAction = ActionMode.none;
        this.currentClick = ClickMode.none;
    };

    private pointerLeave = () => {
        if (this.currentAction == ActionMode.none) return;
        this.clearTimer();

        if (this.currentAction != ActionMode.drag) {
            this.fireClick(this.origins.first, TurboEventName.clickEnd);
            this.currentAction = ActionMode.none;
        }
    }

    //Event triggering

    //Fires a custom VC click event at the click target with the click position
    //All this to deal with issues caused by Apple...
    private fireClick(p: Point, eventName: TurboEventName = TurboEventName.click) {
        (document.elementFromPoint(p.x, p.y) as HTMLElement || document).dispatchEvent(
            new TurboEvent(p, this.currentClick, this.currentKeys, eventName)
        );
    }

    //Fires a custom VC drag event at the target with the origin of the drag, the last drag position,
    //and the current position
    private fireDrag(positions: PositionsMap, eventName: TurboEventName = TurboEventName.drag) {
        (document.elementFromPoint(positions.first.x, positions.first.y) as HTMLElement || document).dispatchEvent(
            new TurboDragEvent(this.origins, this.previousPositions, positions, this.currentClick, this.currentKeys, eventName)
        );
    }

    //Timer

    //Timer function, executed when timer ends
    private clickTimer = () => {
        //Turn a click into long press
        if (this.currentAction == ActionMode.click) this.currentAction = ActionMode.longPress;
    }

    //Sets a timer function with its duration (defaults to longPressDuration)
    private setTimer(callback: () => void, duration: number = this.longPressDuration) {
        this.clearTimer();
        this.timer = setTimeout(() => {
            callback();
            this.clearTimer();
        }, duration);
    }

    //Clears timer and sets it to null
    private clearTimer() {
        if (!this.timer) return;
        clearTimeout(this.timer);
        this.timer = null;
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
}

export {EventManager};