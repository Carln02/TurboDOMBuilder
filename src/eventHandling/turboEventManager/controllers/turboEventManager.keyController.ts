import {TurboEventManagerModel} from "../turboEventManager.model";
import {TurboKeyEvent} from "../../events/turboKeyEvent";
import {TurboKeyEventName} from "../../eventNaming";
import {TurboController} from "../../../turboElement/mvc/turboController";
import {TurboEventManager} from "../turboEventManager";

export class TurboEventManagerKeyController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    public keyDown = (e: KeyboardEvent) => {
        if (!this.element.enabled) return;
        //Return if key already pressed
        if (this.model.currentKeys.includes(e.key)) return;
        //Add key to currentKeys
        this.model.currentKeys.push(e.key);
        //Fire a keyPressed event (only once)
        this.emitter.fire("dispatchEvent", document, TurboKeyEvent, {eventName: TurboKeyEventName.keyPressed, keyPressed: e.key});
    }

    public keyUp = (e: KeyboardEvent) => {
        if (!this.element.enabled) return;
        //Return if key not pressed
        if (!this.model.currentKeys.includes(e.key)) return;
        //Remove key from currentKeys
        this.model.currentKeys.splice(this.model.currentKeys.indexOf(e.key), 1);
        //Fire a keyReleased event
        this.emitter.fire("dispatchEvent", document, TurboKeyEvent, {eventName: TurboKeyEventName.keyReleased, keyReleased: e.key});
    }
}