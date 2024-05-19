import {TurboMap} from "../../utils/datatypes/turboMap/turboMap";
import {Point} from "../../utils/datatypes/point/point";

enum TurboEventName {
    keyPressed = "turbo-key-pressed",
    keyReleased = "turbo-key-released",

    click = "turbo-click",
    clickStart = "turbo-click-start",
    clickEnd = "turbo-click-end",

    move = "turbo-move",

    dragStart = "turbo-drag-start",
    drag = "turbo-drag",
    dragEnd = "turbo-drag-end",

    trackpadScroll = "turbo-trackpad-scroll",
    trackpadPinch = "turbo-trackpad-pinch",

    mouseWheel = "turbo-mouse-wheel",
}

type PositionsMap = TurboMap<number, Point>;

export {TurboEventName, PositionsMap};