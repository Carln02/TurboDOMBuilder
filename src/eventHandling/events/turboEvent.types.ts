import {Point} from "../../utils/datatypes/point/point";
import {ClickMode} from "../turboEventManager/turboEventManager.types";
import {TurboEventNameEntry} from "../eventNaming";
import {TurboMap} from "../../utils/datatypes/turboMap/turboMap";
import {TurboEventManager} from "../turboEventManager/turboEventManager";

enum ClosestOrigin {
    target = "target",
    position = "position",
}

type TurboRawEventProperties = {
    clickMode: ClickMode,
    keys: string[],
    eventName: TurboEventNameEntry,
    eventManager: TurboEventManager,
    toolName?: string,
    authorizeScaling?: boolean | (() => boolean),
    scalePosition?: (position: Point) => Point,
    eventInitDict?: EventInit
};

type TurboEventProperties = TurboRawEventProperties & {
    position: Point,
};

type TurboDragEventProperties = TurboRawEventProperties & {
    origins: TurboMap<number, Point>,
    previousPositions: TurboMap<number, Point>,
    positions: TurboMap<number, Point>,
}

type TurboKeyEventProperties = TurboRawEventProperties & {
    keyPressed: string,
    keyReleased: string
};

type TurboWheelEventProperties = TurboRawEventProperties & {
    delta: Point
};

export {
    ClosestOrigin,
    TurboRawEventProperties,
    TurboEventProperties,
    TurboDragEventProperties,
    TurboKeyEventProperties,
    TurboWheelEventProperties
};