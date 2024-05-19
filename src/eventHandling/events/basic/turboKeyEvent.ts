import {TurboEvent} from "../turboEvent";
import {ClickMode} from "../../eventManager/eventManager.types";
import {TurboEventName} from "../turboEvent.types";

class TurboKeyEvent extends TurboEvent {
    public readonly keyPressed: string;
    public readonly keyReleased: string;

    constructor(keyPressed: string, keyReleased: string, clickMode: ClickMode, keys: string[],
                eventName: TurboEventName = TurboEventName.keyPressed, eventInitDict?: EventInit) {
        super(null, clickMode, keys, eventName, {bubbles: true, cancelable: true, ...eventInitDict});
        this.keyPressed = keyPressed;
        this.keyReleased = keyReleased;
    }
}

export {TurboKeyEvent};