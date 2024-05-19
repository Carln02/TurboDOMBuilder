import {TurboEvent} from "../turboEvent";
import {Point} from "../../../utils/datatypes/point/point";
import {ClickMode} from "../../eventManager/eventManager.types";
import {TurboEventName} from "../turboEvent.types";

class TurboWheelEvent extends TurboEvent {
    public readonly delta: Point;

    constructor(delta: Point, keys: string[], eventName: TurboEventName, eventInitDict?: EventInit) {
        super(null, ClickMode.none, keys, eventName, {bubbles: true, cancelable: true, ...eventInitDict});
        this.delta = delta;
    }
}

export {TurboWheelEvent};