import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {Point} from "../datatypes/point/point";

function getEventPosition(e: Event): Point {
    if (e instanceof TurboEvent) return e.scaledPosition;
    if (e instanceof PointerEvent) return new Point(e.clientX, e.clientY);
    return;
}

export {getEventPosition}