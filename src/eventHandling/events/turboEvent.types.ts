import {ClickMode} from "../turboEventManager/turboEventManager.types";
import {Point} from "../../turboComponents/datatypes/point/point";
import {TurboMap} from "../../turboComponents/datatypes/map/map";
import {TurboEventManager} from "../turboEventManager/turboEventManager";
import {TurboEventNameEntry} from "../../types/eventNaming.types";

/**
 * @group Event Handling
 * @category Enums
 */
enum ClosestOrigin {
    target = "target",
    position = "position",
}

/**
 * @group Event Handling
 * @category TurboEvents
 */
type TurboRawEventProperties = {
    clickMode?: ClickMode,
    keys?: string[],
    eventName?: TurboEventNameEntry,
    eventManager?: TurboEventManager,
    toolName?: string,
    authorizeScaling?: boolean | (() => boolean),
    scalePosition?: (position: Point) => Point,
    eventInitDict?: EventInit
};

/**
 * @group Event Handling
 * @category TurboEvents
 */
type TurboEventProperties = TurboRawEventProperties & {
    position?: Point,
};

/**
 * @group Event Handling
 * @category TurboEvents
 */
type TurboDragEventProperties = TurboRawEventProperties & {
    origins?: TurboMap<number, Point>,
    previousPositions?: TurboMap<number, Point>,
    positions?: TurboMap<number, Point>,
}

/**
 * @group Event Handling
 * @category TurboEvents
 */
type TurboKeyEventProperties = TurboRawEventProperties & {
    keyPressed?: string,
    keyReleased?: string
};

/**
 * @group Event Handling
 * @category TurboEvents
 */
type TurboWheelEventProperties = TurboRawEventProperties & {
    delta?: Point
};

export {
    ClosestOrigin,
    TurboRawEventProperties,
    TurboEventProperties,
    TurboDragEventProperties,
    TurboKeyEventProperties,
    TurboWheelEventProperties
};