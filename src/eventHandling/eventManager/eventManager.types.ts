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

export {ActionMode, ClickMode, InputDevice};