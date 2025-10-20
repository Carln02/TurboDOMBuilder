import {TurboController} from "../../../mvc/logic/controller";
import {TurboEventManager} from "../turboEventManager";
import {TurboEventManagerModel} from "../turboEventManager.model";
import {ActionMode, ClickMode, InputDevice} from "../turboEventManager.types";
import {Point} from "../../../utils/datatypes/point/point";
import {TurboMap} from "../../../utils/datatypes/turboMap/turboMap";
import {TurboEvent} from "../../events/turboEvent";
import {TurboEventName, TurboEventNameEntry} from "../../eventNaming";
import {TurboDragEvent} from "../../events/turboDragEvent";
import {clearCache} from "../../../decorators/cache/cache";

export class TurboEventManagerPointerController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    public keyName = "pointer";

    public pointerDown = (e: PointerEvent) => this.pointerDownFn(e);
    public pointerMove = (e: PointerEvent) => this.pointerMoveFn(e);
    public pointerUp = (e: PointerEvent) => this.pointerUpFn(e);
    public pointerCancel = (e: PointerEvent) => this.pointerCancelFn(e);
    public lostPointerCapture = (e: PointerEvent) => this.lostPointerCaptureFn(e);

    protected pointerDownFn(e: PointerEvent) {
        if (!e.composedPath().includes(this.model.lockState.lockOrigin)) {
            (document.activeElement as HTMLElement)?.blur?.();
            this.element.unlock();
        }
        if (!this.element.enabled) return;

        //Check if it's touch
        const isTouch = e.pointerType === "touch";

        //Prevent default actions (especially useful for touch events on iOS and iPadOS)
        if (this.element.preventDefaultMouse && !isTouch) e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch) e.preventDefault();

        //Update input device
        if (isTouch) this.model.inputDevice = InputDevice.touch;
        else if (this.model.inputDevice === InputDevice.unknown || this.model.inputDevice === InputDevice.touch)
            this.model.inputDevice = InputDevice.mouse;

        //Initialize origin & previous position using pointerId
        const id = e.pointerId;
        const position = new Point(e.clientX, e.clientY);
        this.model.origins.set(id, position);
        this.model.previousPositions.set(id, position);

        //Capture this pointer so we keep receiving move/up even if the pointer leaves the element
        const target = document.elementFromPoint(position.x, position.y) as Element;
        if (target) target.setPointerCapture?.(e.pointerId);

        //Update click mode
        this.model.activePointers.add(id);
        this.model.utils.setClickMode(isTouch ? this.model.activePointers.size : e.button, isTouch);

        //Return if click events are disabled
        if (!this.element.clickEventEnabled) return;

        // Fire click start
        this.fireClick(this.model.origins.first, TurboEventName.clickStart);
        this.model.currentAction = ActionMode.click;

        // Long-press timer
        this.model.utils.setTimer(TurboEventName.longPress, () => {
            if (this.model.currentAction !== ActionMode.click) return;
            this.model.currentAction = ActionMode.longPress;
            this.fireClick(this.model.origins.first, TurboEventName.longPress);
        }, this.model.longPressDuration);
    }

    protected pointerMoveFn(e: PointerEvent) {
        if (!this.element.enabled) return;
        if (!this.element.moveEventsEnabled && !this.element.dragEventEnabled) return;

        //Check if is touch
        const isTouch = e.pointerType === "touch";

        //Prevent default actions
        if (this.element.preventDefaultMouse && !isTouch) e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch) e.preventDefault();

        //New positions map
        this.model.positions = new TurboMap<number, Point>();

        // Only update the current pointer’s position (others remain tracked from prior moves)
        this.model.positions.set(e.pointerId, new Point(e.clientX, e.clientY));

        // Clear cached target origin if not dragging
        if (this.model.currentAction !== ActionMode.drag) this.model.lastTargetOrigin = null;

        //Fire move event if enabled
        if (this.element.moveEventsEnabled) this.fireDrag(this.model.positions, TurboEventName.move);

        //If drag events are enabled and user is interacting
        if (this.model.currentAction !== ActionMode.none && this.element.dragEventEnabled) {
            //Initialize drag
            if (this.model.currentAction !== ActionMode.drag) {
                //Check if any tracked origin moved beyond threshold
                if (!Array.from(this.model.origins.entries()).some(([key, origin]) => {
                    const p = (key === e.pointerId)
                        ? this.model.positions.get(key)
                        : this.model.previousPositions.get(key);
                    return p && Point.dist(p, origin) > this.model.moveThreshold;
                })) return;
                //If didn't return --> fire drag start and set action to drag
                clearCache(this);
                this.fireDrag(this.model.origins, TurboEventName.dragStart);
                this.model.currentAction = ActionMode.drag;
            }

            //Fire drag step
            this.fireDrag(this.model.positions);
        }

        //Update previous positions for the moved pointer
        this.model.previousPositions.set(e.pointerId, this.model.positions.get(e.pointerId)!);
    }

    protected pointerUpFn(e: PointerEvent) {
        if (!this.element.enabled) return;

        //Check if is touch
        const isTouch = e.pointerType === "touch";

        //Prevent default actions
        if (this.element.preventDefaultMouse && !isTouch) e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch) e.preventDefault();

        //Clear any timer set
        this.model.utils.clearTimer(TurboEventName.longPress);

        //Initialize a new positions map
        this.model.positions = new TurboMap<number, Point>();
        this.model.positions.set(e.pointerId, new Point(e.clientX, e.clientY));

        //If action was drag --> fire drag end
        if (this.model.currentAction === ActionMode.drag && this.element.dragEventEnabled) {
            this.fireDrag(this.model.positions, TurboEventName.dragEnd);
        }

        //If click events are enabled
        if (this.element.clickEventEnabled) {
            //If action is click --> fire click
            if (this.model.currentAction === ActionMode.click) {
                this.fireClick(this.model.positions.first, TurboEventName.click);
            }
            //Fire click end
            this.fireClick(this.model.origins.first, TurboEventName.clickEnd);
        }

        //Cleanup for this pointerId only
        this.model.origins.delete(e.pointerId);
        this.model.previousPositions.delete(e.pointerId);
        this.model.activePointers.delete(e.pointerId);

        //If no more active pointers, reset modes
        if (this.model.activePointers.size === 0) {
            this.model.currentAction = ActionMode.none;
            this.model.currentClick = ClickMode.none;
        }
    }

    protected pointerCancelFn(e: PointerEvent) {
        //Treat like an aborted drag/click
        this.model.utils.clearTimer(TurboEventName.longPress);
        this.model.origins.delete(e.pointerId);
        this.model.previousPositions.delete(e.pointerId);
        this.model.activePointers.delete(e.pointerId);

        if (this.model.activePointers.size === 0) {
            this.model.currentAction = ActionMode.none;
            this.model.currentClick = ClickMode.none;
        }
    }

    protected lostPointerCaptureFn(_e: PointerEvent) {
        // Optional: cleanup or fallback if needed
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
