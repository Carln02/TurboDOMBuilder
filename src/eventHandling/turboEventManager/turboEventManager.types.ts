import {Point} from "../../utils/datatypes/point/point";

type TurboEventManagerStateProperties = {
    enabled?: boolean,
    preventDefaultWheel?: boolean,
    preventDefaultMouse?: boolean,
    preventDefaultTouch?: boolean,
}

type DisabledTurboEventTypes = {
    disableKeyEvents?: boolean,
    disableWheelEvents?: boolean,
    disableMouseEvents?: boolean,
    disableTouchEvents?: boolean,

    disableClickEvents?: boolean,
    disableDragEvents?: boolean,
    disableMoveEvent?: boolean,
}

type TurboEventManagerProperties = TurboEventManagerStateProperties & DisabledTurboEventTypes & {
    moveThreshold?: number,
    longPressDuration?: number,

    authorizeEventScaling?: boolean | (() => boolean),
    scaleEventPosition?: (position: Point) => Point,
}

type TurboEventManagerLockStateProperties = TurboEventManagerStateProperties & {
    lockOrigin?: Node,
}

/**
 * @description Object representing options passed to the ToolManager's setTool() function.
 * @property select - Indicate whether to visually select the tool on all toolbars, defaults to true
 * @property activate - Indicate whether to fire activation on the tool when setting it, defaults to true
 * @property setAsNoAction - Indicate whether the tool will also be set as the tool for ClickMode == none, defaults
 * to true if the click mode is left.
 */
type SetToolOptions = {
    select?: boolean,
    activate?: boolean,
    setAsNoAction?: boolean,
};

enum ActionMode {
    none,
    click,
    longPress,
    drag
}

enum ClickMode {
    none,
    left,
    right,
    middle,
    other,
    key
}

enum InputDevice {
    unknown,
    mouse,
    trackpad,
    touch
}

export {
    TurboEventManagerProperties,
    DisabledTurboEventTypes,
    TurboEventManagerStateProperties,
    TurboEventManagerLockStateProperties,
    ActionMode,
    ClickMode,
    InputDevice,
    SetToolOptions,
};