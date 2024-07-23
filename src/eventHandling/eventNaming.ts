const TurboKeyEventName = {
    keyPressed: "turbo-key-pressed",
    keyReleased: "turbo-key-released"
} as const;

const TurboClickEventName = {
    click: "turbo-click",
    clickStart: "turbo-click-start",
    clickEnd: "turbo-click-end",

    longPress: "turbo-long-press"
} as const;

const TurboMoveName = {
    move: "turbo-move"
} as const;

const TurboDragEventName = {
    drag: "turbo-drag",
    dragStart: "turbo-drag-start",
    dragEnd: "turbo-drag-end"
} as const;

const TurboWheelEventName = {
    trackpadScroll: "turbo-trackpad-scroll",
    trackpadPinch: "turbo-trackpad-pinch",

    mouseWheel: "turbo-mouse-wheel"
} as const;

const TurboEventName = {
    ...TurboClickEventName,
    ...TurboKeyEventName,
    ...TurboMoveName,
    ...TurboDragEventName,
    ...TurboWheelEventName,

    selectInput: "turbo-select-input",
} as const;

/**
 * @description Object containing the names of events fired by default by the turboComponents. Modifying it (prior to
 * setting up new turbo components) will subsequently alter the events that the instantiated components will listen for.
 */
const DefaultEventName = {
    keyPressed: "keydown",
    keyReleased: "keyup",

    click: "click",
    clickStart: "mousedown",
    clickEnd: "mouseup",

    longPress: TurboEventName.longPress,

    move: "mousemove",

    drag: TurboEventName.drag,
    dragStart: TurboEventName.dragStart,
    dragEnd: TurboEventName.dragEnd,

    wheel: "wheel",

    trackpadScroll: "wheel",
    trackpadPinch: "wheel",

    mouseWheel: "wheel",

    scroll: "scroll",

    input: "input",
    change: "change",

    focus: "focus",
    blur: "blur",
};

type DefaultEventNameEntry = typeof DefaultEventName[keyof typeof DefaultEventName];

type TurboEventNameEntry = typeof TurboEventName[keyof typeof TurboEventName];

export {
    TurboKeyEventName,
    TurboClickEventName,
    TurboMoveName,
    TurboDragEventName,
    TurboWheelEventName,
    DefaultEventName,
    DefaultEventNameEntry,
    TurboEventName,
    TurboEventNameEntry
};