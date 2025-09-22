import {TurboEventManager} from "../turboEventManager";
import {TurboEventManagerModel} from "../turboEventManager.model";
import {ActionMode, ClickMode, InputDevice} from "../turboEventManager.types";
import {Point} from "../../../utils/datatypes/point/point";
import {TurboEventName, TurboEventNameEntry} from "../../eventNaming";
import {TurboMap} from "../../../utils/datatypes/turboMap/turboMap";
import {clearCache} from "../../../decorators/cache/cache";
import {TurboEvent} from "../../events/turboEvent";
import {TurboDragEvent} from "../../events/turboDragEvent";
import {TurboController} from "../../../mvc/logic/controller";

export class TurboEventManagerPointerController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    public keyName: string = "pointer";

    public pointerDown = (e: MouseEvent | TouchEvent) => this.pointerDownFn(e);

    protected pointerDownFn(e: MouseEvent | TouchEvent) {
        if (!e.composedPath().includes(this.model.lockState.lockOrigin)) {
            (document.activeElement as HTMLElement)?.blur?.();
            this.element.unlock();
        }
        if (!this.element.enabled) return;

        //Check if it's touch
        const isTouch = e instanceof TouchEvent;

        //Prevent default actions (especially useful for touch events on iOS and iPadOS)
        if (this.element.preventDefaultMouse && !isTouch) e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch) e.preventDefault();

        //Update the input device
        if (isTouch) this.model.inputDevice = InputDevice.touch;
        else if (this.model.inputDevice == InputDevice.unknown || this.model.inputDevice == InputDevice.touch)
            this.model.inputDevice = InputDevice.mouse;

        //Touch start initialization
        if (isTouch) {
            //Loop on all changed touch points (new ones) and initialize them
            Array.from((e as TouchEvent).changedTouches).forEach(touchPoint => {
                const position = new Point(touchPoint);
                this.model.origins.set(touchPoint.identifier, position);
                this.model.previousPositions.set(touchPoint.identifier, position);
            });
            //Update click mode according to number of current touch points
            this.model.utils.setClickMode((e as TouchEvent).touches.length, true);
        }

        //Mouse down initialization
        else {
            //Initialize origin and previous position
            const position = new Point(e as MouseEvent);
            this.model.origins.set(0, position);
            this.model.previousPositions.set(0, position);
            //Update click mode
            this.model.utils.setClickMode((e as MouseEvent).button);
        }

        //Return if click events are disabled
        if (!this.element.clickEventEnabled) return;

        //Fire click start
        this.fireClick(this.model.origins.first, TurboEventName.clickStart);
        this.model.currentAction = ActionMode.click;

        //Set long press timer
        this.model.utils.setTimer(TurboEventName.longPress, () => {
            if (this.model.currentAction != ActionMode.click) return;
            //Turn a click into long press
            this.model.currentAction = ActionMode.longPress;
            //Fire long press
            this.fireClick(this.model.origins.first, TurboEventName.longPress);
        }, this.model.longPressDuration);
    };

    public pointerMove = (e: MouseEvent | TouchEvent) => this.pointerMoveFn(e);

    protected pointerMoveFn(e: MouseEvent | TouchEvent) {
        if (!this.element.enabled) return;
        if (!this.element.moveEventsEnabled && !this.element.dragEventEnabled) return;

        //Check if is touch
        const isTouch = e instanceof TouchEvent;

        //Prevent default actions
        if (this.element.preventDefaultMouse && !isTouch) e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch) e.preventDefault();

        //Initialize a new positions map
        this.model.positions = new TurboMap<number, Point>();

        //Get current position(s) for touch (or mouse)
        if (isTouch) {
            Array.from(e.touches).forEach(touchPoint =>
                this.model.positions.set(touchPoint.identifier, new Point(touchPoint)));
        } else {
            this.model.positions.set(0, new Point(e.clientX, e.clientY));
        }

        //Clear cached target origin if not dragging
        if (this.model.currentAction != ActionMode.drag) this.model.lastTargetOrigin = null;

        //Fire move event if enabled
        if (this.element.moveEventsEnabled) this.fireDrag(this.model.positions, TurboEventName.move);

        //If drag events are enabled and user is interacting
        if (this.model.currentAction != ActionMode.none && this.element.dragEventEnabled) {
            //Initialize drag
            if (this.model.currentAction != ActionMode.drag) {
                //Loop on saved origins points and check if any point's distance from its origin is greater than the threshold
                if (!Array.from(this.model.origins.entries()).some(([key, origin]) => {
                    const position = this.model.positions.get(key);
                    return position && Point.dist(position, origin) > this.model.moveThreshold;
                })) return;
                //If didn't return --> fire drag start and set action to drag
                clearCache(this);
                this.fireDrag(this.model.origins, TurboEventName.dragStart);
                this.model.currentAction = ActionMode.drag;
            }

            //Fire drag and update previous points
            this.fireDrag(this.model.positions);
        }

        //Update previous positions
        this.model.positions.forEach((position, key) => this.model.previousPositions.set(key, position));
    };

    public pointerUp = (e: MouseEvent | TouchEvent) => this.pointerUpFn(e);

    protected pointerUpFn(e: MouseEvent | TouchEvent) {
        if (!this.element.enabled) return;

        //Check if is touch
        const isTouch = e instanceof TouchEvent;

        //Prevent default actions
        if (this.element.preventDefaultMouse && !isTouch) e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch) e.preventDefault();

        //Clear any timer set
        this.model.utils.clearTimer(TurboEventName.longPress);

        //Initialize a new positions map
        this.model.positions = new TurboMap<number, Point>();

        //Get current position(s) for touch (or mouse)
        if (isTouch) {
            Array.from((e as TouchEvent).changedTouches).forEach(touchPoint => {
                this.model.positions.set(touchPoint.identifier, new Point(touchPoint));
            });
        } else {
            this.model.positions.set(0, new Point(e as MouseEvent));
        }

        //If action was drag --> fire drag end
        if (this.model.currentAction == ActionMode.drag && this.element.dragEventEnabled)
            this.fireDrag(this.model.positions, TurboEventName.dragEnd);

        //If click events are enabled
        if (this.element.clickEventEnabled) {
            //If action is click --> fire click
            if (this.model.currentAction == ActionMode.click) {
                this.fireClick(this.model.positions.first, TurboEventName.click);
            }

            //Fire click end
            this.fireClick(this.model.origins.first, TurboEventName.clickEnd);
        }

        //Clear saved positions (or removed lifted touch points)
        if (isTouch) {
            Array.from((e as TouchEvent).changedTouches).forEach(touchPoint => {
                this.model.origins.delete(touchPoint.identifier);
                this.model.previousPositions.delete(touchPoint.identifier);
            });
        } else {
            this.model.origins.clear();
            this.model.previousPositions.clear();
        }

        //Reset click mode and action
        this.model.currentAction = ActionMode.none;
        this.model.currentClick = ClickMode.none;
    };

    public pointerLeave = () => this.pointerLeaveFn();

    protected pointerLeaveFn()  {
        if (!this.element.enabled) return;
        if (this.model.currentAction == ActionMode.none) return;
        //Clear any timer set
        this.model.utils.clearTimer(TurboEventName.longPress);

        //If not drag --> fire click end
        if (this.model.currentAction != ActionMode.drag) {
            this.fireClick(this.model.origins.first, TurboEventName.clickEnd);
            this.model.currentAction = ActionMode.none;
        }
    }

    /**
     * @description Fires a custom Turbo click event at the click target with the click position
     * @param p
     * @param eventName
     * @private
     */
    private fireClick(p: Point, eventName: TurboEventNameEntry = TurboEventName.click) {
        if (!p) return;
        const target = document.elementFromPoint(p.x, p.y) as Element || document;
        this.emitter.fire("dispatchEvent", target, TurboEvent, {position: p, eventName: eventName});
    }

    /**
     * @description Fires a custom Turbo drag event at the target with the origin of the drag, the last drag position, and the current position
     * @param positions
     * @param eventName
     * @private
     */
    private fireDrag(positions: TurboMap<number, Point>, eventName: TurboEventNameEntry = TurboEventName.drag) {
        if (!positions) return;
        this.emitter.fire("dispatchEvent", this.getFireOrigin(positions), TurboDragEvent, {
            positions: positions,
            previousPositions: this.model.previousPositions,
            origins: this.model.origins,
            eventName: eventName
        });
    }

    private getFireOrigin(positions?: TurboMap<number, Point>, reload: boolean = false): Node {
        if (!this.model.lastTargetOrigin || reload) {
            const origin = this.model.origins.first ? this.model.origins.first : positions.first;
            this.model.lastTargetOrigin = document.elementFromPoint(origin.x, origin.y) as Node;
        }
        return this.model.lastTargetOrigin;
    }
}