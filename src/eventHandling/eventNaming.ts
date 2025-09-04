const TurboKeyEventName = {
    keyPressed: "turbo-key-pressed",
    keyReleased: "turbo-key-released"
} as const;

const DefaultKeyEventName = {
    keyPressed: "keydown",
    keyReleased: "keyup",
} as const;

const TurboClickEventName = {
    click: "turbo-click",
    clickStart: "turbo-click-start",
    clickEnd: "turbo-click-end",

    longPress: "turbo-long-press"
} as const;

const DefaultClickEventName = {
    click: "click",
    clickStart: "mousedown",
    clickEnd: "mouseup",

    longPress: TurboClickEventName.longPress
} as const;

const TurboMoveEventName = {
    move: "turbo-move"
} as const;

const DefaultMoveEventName = {
    move: "mousemove"
} as const;

const TurboDragEventName = {
    drag: "turbo-drag",
    dragStart: "turbo-drag-start",
    dragEnd: "turbo-drag-end"
} as const;

const DefaultDragEventName = {
    drag: TurboDragEventName.drag,
    dragStart: TurboDragEventName.dragStart,
    dragEnd: TurboDragEventName.dragEnd,
} as const;

const TurboWheelEventName = {
    trackpadScroll: "turbo-trackpad-scroll",
    trackpadPinch: "turbo-trackpad-pinch",

    mouseWheel: "turbo-mouse-wheel"
} as const;

const DefaultWheelEventName = {
    trackpadScroll: "wheel",
    trackpadPinch: "wheel",

    mouseWheel: "wheel"
} as const;

const TurboEventName = {
    ...TurboClickEventName,
    ...TurboKeyEventName,
    ...TurboMoveEventName,
    ...TurboDragEventName,
    ...TurboWheelEventName,

    selectInput: "turbo-select-input",
} as const;

/**
 * @description Object containing the names of events fired by default by the turboComponents. Modifying it (prior to
 * setting up new turbo components) will subsequently alter the events that the instantiated components will listen for.
 */
const DefaultEventName = {
    ...DefaultKeyEventName,
    ...DefaultClickEventName,
    ...DefaultMoveEventName,
    ...DefaultDragEventName,
    ...DefaultWheelEventName,
    wheel: "wheel",
    scroll: "scroll",

    input: "input",
    change: "change",

    focus: "focus",
    blur: "blur",

    resize: "resize"
};

type DefaultEventNameEntry = typeof DefaultEventName[keyof typeof DefaultEventName];

type TurboEventNameEntry = typeof TurboEventName[keyof typeof TurboEventName];

export {
    DefaultKeyEventName,
    DefaultMoveEventName,
    DefaultWheelEventName,
    DefaultClickEventName,
    DefaultDragEventName,
    TurboKeyEventName,
    TurboClickEventName,
    TurboMoveEventName,
    TurboDragEventName,
    TurboWheelEventName,
    DefaultEventName,
    DefaultEventNameEntry,
    TurboEventName,
    TurboEventNameEntry
};