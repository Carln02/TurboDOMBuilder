import {TurboEventManager} from "../turboEventManager";
import {TurboEventManagerModel} from "../turboEventManager.model";
import {InputDevice} from "../turboEventManager.types";
import {TurboEventName, TurboEventNameEntry} from "../../eventNaming";
import {TurboWheelEvent} from "../../events/turboWheelEvent";
import {Point} from "../../../utils/datatypes/point/point";
import {TurboController} from "../../../mvc/logic/controller";

export class TurboEventManagerWheelController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    public keyName: string = "wheel";

    public wheel = (e: WheelEvent) => {
        if (!this.element.enabled) return;
        //Prevent default scroll behavior
        if (this.element.preventDefaultWheel) e.preventDefault();

        //Most likely trackpad
        if (Math.abs(e.deltaY) <= 40 || e.deltaX != 0) this.model.inputDevice = InputDevice.trackpad;
        //Set input device to mouse if it wasn't trackpad recently
        if (!this.model.wasRecentlyTrackpad) this.model.inputDevice = InputDevice.mouse;

        //Reset trackpad timer
        this.model.utils.clearTimer("recentlyTrackpadTimer");
        //Set timer to clear recently trackpad boolean after a delay
        this.model.utils.setTimer("recentlyTrackpadTimer", () => {
            if (this.model.inputDevice == InputDevice.trackpad) this.model.wasRecentlyTrackpad = false;
        }, 800);

        //Get name of event according to input type
        let eventName: TurboEventNameEntry;
        //Trackpad pinching (for some reason Ctrl key is marked as pressed in the WheelEvent)
        if (this.model.inputDevice == InputDevice.trackpad && e.ctrlKey) eventName = TurboEventName.trackpadPinch;
        //Trackpad zooming
        else if (this.model.inputDevice == InputDevice.trackpad) eventName = TurboEventName.trackpadScroll;
        //Mouse scrolling
        else eventName = TurboEventName.mouseWheel;

        this.emitter.fire("dispatchEvent", document, TurboWheelEvent, {delta: new Point(e.deltaX, e.deltaY), eventName: eventName});
    };
}