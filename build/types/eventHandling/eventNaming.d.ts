declare const TurboKeyEventName: {
    readonly keyPressed: "turbo-key-pressed";
    readonly keyReleased: "turbo-key-released";
};
declare const TurboClickEventName: {
    readonly click: "turbo-click";
    readonly clickStart: "turbo-click-start";
    readonly clickEnd: "turbo-click-end";
    readonly longPress: "turbo-long-press";
};
declare const TurboMoveName: {
    readonly move: "turbo-move";
};
declare const TurboDragEventName: {
    readonly drag: "turbo-drag";
    readonly dragStart: "turbo-drag-start";
    readonly dragEnd: "turbo-drag-end";
};
declare const TurboWheelEventName: {
    readonly trackpadScroll: "turbo-trackpad-scroll";
    readonly trackpadPinch: "turbo-trackpad-pinch";
    readonly mouseWheel: "turbo-mouse-wheel";
};
declare const TurboEventName: {
    readonly selectInput: "turbo-select-input";
    readonly trackpadScroll: "turbo-trackpad-scroll";
    readonly trackpadPinch: "turbo-trackpad-pinch";
    readonly mouseWheel: "turbo-mouse-wheel";
    readonly drag: "turbo-drag";
    readonly dragStart: "turbo-drag-start";
    readonly dragEnd: "turbo-drag-end";
    readonly move: "turbo-move";
    readonly keyPressed: "turbo-key-pressed";
    readonly keyReleased: "turbo-key-released";
    readonly click: "turbo-click";
    readonly clickStart: "turbo-click-start";
    readonly clickEnd: "turbo-click-end";
    readonly longPress: "turbo-long-press";
};
/**
 * @description Object containing the names of events fired by default by the turboComponents. Modifying it (prior to
 * setting up new turbo components) will subsequently alter the events that the instantiated components will listen for.
 */
declare const DefaultEventName: {
    keyPressed: string;
    keyReleased: string;
    click: string;
    clickStart: string;
    clickEnd: string;
    longPress: "turbo-long-press";
    move: string;
    drag: "turbo-drag";
    dragStart: "turbo-drag-start";
    dragEnd: "turbo-drag-end";
    wheel: string;
    trackpadScroll: string;
    trackpadPinch: string;
    mouseWheel: string;
    scroll: string;
    input: string;
    change: string;
    focus: string;
    blur: string;
};
type DefaultEventNameEntry = typeof DefaultEventName[keyof typeof DefaultEventName];
type TurboEventNameEntry = typeof TurboEventName[keyof typeof TurboEventName];
export { TurboKeyEventName, TurboClickEventName, TurboMoveName, TurboDragEventName, TurboWheelEventName, DefaultEventName, DefaultEventNameEntry, TurboEventName, TurboEventNameEntry };
