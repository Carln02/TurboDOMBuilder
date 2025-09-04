import {TurboWheelEventProperties} from "./turboEvent.types";
import {Point} from "../../utils/datatypes/point/point";
import {TurboEvent} from "./turboEvent";

/**
 * @class TurboWheelEvent
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