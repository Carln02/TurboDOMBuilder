import {TurboEvent} from "../turboEvent";
import {ClickMode} from "../../turboEventManager/turboEventManager.types";
import {TurboEventName, TurboEventNameEntry} from "../../eventNaming";
import {Point} from "../../../utils/datatypes/point/point";

/**
 * @class TurboKeyEvent
 * @extends TurboEvent
 * @description Custom key event
 */
class TurboKeyEvent extends TurboEvent {
    /**
     * @description The key pressed (if any) when the event was fired
     */
    public readonly keyPressed: string;

    /**
     * @description The key released (if any) when the event was fired
     */
    public readonly keyReleased: string;

    constructor(keyPressed: string, keyReleased: string, clickMode: ClickMode, keys: string[],
                eventName: TurboEventNameEntry = TurboEventName.keyPressed, authorizeScaling?: boolean
            | (() => boolean), scalePosition?: (position: Point) => Point, eventInitDict?: EventInit) {
        super(null, clickMode, keys, eventName, authorizeScaling, scalePosition,
            {bubbles: true, cancelable: true, ...eventInitDict});
        this.keyPressed = keyPressed;
        this.keyReleased = keyReleased;
    }
}

export {TurboKeyEvent};