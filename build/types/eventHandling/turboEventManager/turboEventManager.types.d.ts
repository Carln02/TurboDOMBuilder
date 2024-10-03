import { Point } from "../../utils/datatypes/point/point";
type TurboEventManagerStateProperties = {
    enabled?: boolean;
    preventDefaultWheel?: boolean;
    preventDefaultMouse?: boolean;
    preventDefaultTouch?: boolean;
};
type DisabledTurboEventTypes = {
    disableKeyEvents?: boolean;
    disableWheelEvents?: boolean;
    disableMouseEvents?: boolean;
    disableTouchEvents?: boolean;
    disableClickEvents?: boolean;
    disableDragEvents?: boolean;
    disableMoveEvent?: boolean;
};
type TurboEventManagerProperties = TurboEventManagerStateProperties & DisabledTurboEventTypes & {
    moveThreshold?: number;
    longPressDuration?: number;
    authorizeEventScaling?: boolean | (() => boolean);
    scaleEventPosition?: (position: Point) => Point;
};
type TurboEventManagerLockStateProperties = TurboEventManagerStateProperties & {
    lockOrigin?: Element;
};
declare enum ActionMode {
    none = 0,
    click = 1,
    longPress = 2,
    drag = 3
}
declare enum ClickMode {
    none = 0,
    left = 1,
    right = 2,
    middle = 3,
    other = 4,
    key = 5
}
declare enum InputDevice {
    unknown = 0,
    mouse = 1,
    trackpad = 2,
    touch = 3
}
export { TurboEventManagerProperties, DisabledTurboEventTypes, TurboEventManagerStateProperties, TurboEventManagerLockStateProperties, ActionMode, ClickMode, InputDevice };
