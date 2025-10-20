import {TurboKeyEventProperties} from "./turboEvent.types";
import {TurboEvent} from "./turboEvent";

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

    constructor(properties: TurboKeyEventProperties) {
        super({...properties, position: null});
        this.keyPressed = properties.keyPressed;
        this.keyReleased = properties.keyReleased;
    }
}

export {TurboKeyEvent};