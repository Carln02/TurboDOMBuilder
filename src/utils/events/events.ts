import {TurboEvent} from "../../eventHandling/events/turboEvent";
import {Point} from "../../turboComponents/datatypes/point/point";

/**
 * @group Utilities
 * @category Event
 * @param e
 */
function getEventPosition(e: Event): Point {
    if (e instanceof TurboEvent) return e.scaledPosition;
    if (e instanceof PointerEvent) return new Point(e.clientX, e.clientY);
    return;
}

export {getEventPosition};