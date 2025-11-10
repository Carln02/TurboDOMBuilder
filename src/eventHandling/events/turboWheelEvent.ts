import {TurboWheelEventProperties} from "./turboEvent.types";
import {TurboEvent} from "./turboEvent";
import {Point} from "../../turboComponents/datatypes/point/point";

/**
 * @class TurboWheelEvent
 * @group Event Handling
 * @category TurboEvents
 *
 * @extends TurboEvent
 * @description Custom wheel event
 */
class TurboWheelEvent extends TurboEvent {
    /**
     * @description The delta amount of scrolling
     */
    public readonly delta: Point;

    constructor(properties: TurboWheelEventProperties) {
        super({...properties, position: null});
        this.delta = properties.delta;
    }
}

export {TurboWheelEvent};