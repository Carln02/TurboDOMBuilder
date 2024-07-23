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
}

type TurboEventManagerLockStateProperties = TurboEventManagerStateProperties & {
    lockOrigin?: Element,
}

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
    InputDevice
};