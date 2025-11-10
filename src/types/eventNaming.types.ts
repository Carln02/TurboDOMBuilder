
/**
 * @group Types
 * @category Event Names
 */
const TurboKeyEventName = {
    keyPressed: "turbo-key-pressed",
    keyReleased: "turbo-key-released"
} as const;

/**
 * @group Types
 * @category Event Names
 */
const DefaultKeyEventName = {
    keyPressed: "keydown",
    keyReleased: "keyup",
} as const;

/**
 * @group Types
 * @category Event Names
 */
const TurboClickEventName = {
    click: "turbo-click",
    clickStart: "turbo-click-start",
    clickEnd: "turbo-click-end",

    longPress: "turbo-long-press"
} as const;

/**
 * @group Types
 * @category Event Names
 */
const DefaultClickEventName = {
    click: "click",
    clickStart: "mousedown",
    clickEnd: "mouseup",

    longPress: TurboClickEventName.longPress
} as const;

/**
 * @group Types
 * @category Event Names
 */
const TurboMoveEventName = {
    move: "turbo-move"
} as const;

/**
 * @group Types
 * @category Event Names
 */
const DefaultMoveEventName = {
    move: "mousemove"
} as const;

/**
 * @group Types
 * @category Event Names
 */
const TurboDragEventName = {
    drag: "turbo-drag",
    dragStart: "turbo-drag-start",
    dragEnd: "turbo-drag-end"
} as const;

/**
 * @group Types
 * @category Event Names
 */
const DefaultDragEventName = {
    drag: TurboDragEventName.drag,
    dragStart: TurboDragEventName.dragStart,
    dragEnd: TurboDragEventName.dragEnd,
} as const;

/**
 * @group Types
 * @category Event Names
 */
const TurboWheelEventName = {
    trackpadScroll: "turbo-trackpad-scroll",
    trackpadPinch: "turbo-trackpad-pinch",

    mouseWheel: "turbo-mouse-wheel"
} as const;

/**
 * @group Types
 * @category Event Names
 */
const DefaultWheelEventName = {
    trackpadScroll: "wheel",
    trackpadPinch: "wheel",

    mouseWheel: "wheel"
} as const;

/**
 * @group Types
 * @category Event Names
 */
const TurboEventName = {
    ...TurboClickEventName,
    ...TurboKeyEventName,
    ...TurboMoveEventName,
    ...TurboDragEventName,
    ...TurboWheelEventName,

    selectInput: "turbo-select-input",
} as const;

/**
 * @group Types
 * @category Event Names
 *
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
    focusIn: "focusin",
    focusOut: "focusout",
    blur: "blur",

    resize: "resize",

    compositionStart: "compositionstart",
    compositionEnd: "compositionend",
};

/**
 * @group Types
 * @category Event Names
 */
type DefaultEventNameKey = keyof typeof DefaultEventName;
/**
 * @group Types
 * @category Event Names
 */
type DefaultEventNameEntry = typeof DefaultEventName[DefaultEventNameKey];
/**
 * @group Types
 * @category Event Names
 */
type TurboEventNameKey = keyof typeof TurboEventName;
/**
 * @group Types
 * @category Event Names
 */
type TurboEventNameEntry = typeof TurboEventName[TurboEventNameKey];

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
    TurboEventNameEntry,
    DefaultEventNameKey,
    TurboEventNameKey
};