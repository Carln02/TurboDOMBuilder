import {button, div, popup, $, PopupFallbackMode, TurboPopupProperties} from "../../../../../build/turbodombuilder.esm";
import {box} from "../../demoBox/demoBox";
import "./popup.css";

function makeTrigger(label: string = "Trigger", popupProperties: TurboPopupProperties = {}) {
    const trg = button({text: label});
    const tip = popup({
        ...popupProperties,
        anchor: trg,
        children: [
            div({
                classes: "popup-body",
                text: "Popup content."
            })
        ]
    });

    $(trg).on("click", () => {tip.show(true)});
    return {trigger: trg, popup: tip};
}

function testBasics() {
    box("TurboPopup — Basics")
        .addSubBox("Below", makeTrigger("Below", {
            anchorPosition: {x: 50, y: 100},
            popupPosition: {x: 50, y: 0},
            offsetFromAnchor: {x: 0, y: 8}
        }).trigger)
        .addSubBox("Above", makeTrigger("Above", {
            anchorPosition: {x: 50, y: 0},
            popupPosition: {x: 50, y: 100},
            offsetFromAnchor: {x: 0, y: -8}
        }).trigger)
        .addSubBox("Left", makeTrigger("Left", {
            anchorPosition: {x: 0, y: 50},
            popupPosition: {x: 100, y: 50},
            offsetFromAnchor: {x: -8, y: 0}
        }).trigger)
        .addSubBox("Right", makeTrigger("Right", {
            anchorPosition: {x: 100, y: 50},
            popupPosition: {x: 0, y: 50},
            offsetFromAnchor: {x: 8, y: 0}
        }).trigger);
}

function testFallbackModes() {
    box("TurboPopup — Fallback: invert vs offset")
        .addSubBox("Near right viewport edge", makeTrigger("invert →", {
            anchorPosition: {x: 100, y: 50},
            popupPosition: {x: 0, y: 50},
            offsetFromAnchor: {x: 12, y: 0},
            fallbackModes: PopupFallbackMode.invert
        }).trigger, makeTrigger("offset →", {
            anchorPosition: {x: 100, y: 50},
            popupPosition: {x: 0, y: 50},
            offsetFromAnchor: {x: 12, y: 0},
            fallbackModes: PopupFallbackMode.offset
        }).trigger);
}

function testViewportMarginsAndMaxSize() {
    const b = box("TurboPopup — viewport margin & max size");

    const {trigger, popup} = makeTrigger("Open tall", {
        anchorPosition: {x: 50, y: 100},
        popupPosition: {x: 50, y: 0},
        viewportMargin: {x: 16, y: 24},
        offsetFromAnchor: {x: 0, y: 10},
    })

    //TODO FIX
    const bigContent = (lines: number = 40) => div({
        classes: "popup-body",
        text: Array.from({length: lines}, (_, i) => `Row ${i + 1}`).join("\n")
    });

    b.addSubBox("Margin=16/24, tall content", trigger);
    b.addContent(button({
        text: "Shorten (20 rows)",
        onClick: () => {
            popup.innerHTML = "";
            $(popup).addChild(bigContent(20));
            if ($(popup).isShown) popup["recomputePosition"]?.();
        }
    }));
    b.addContent(button({
        text: "Make taller (120 rows)",
        onClick: () => {
            popup.innerHTML = "";
            $(popup).addChild(bigContent(120));
            if ($(popup).isShown) popup["recomputePosition"]?.();
        }
    }));
}

function testDynamicUpdates() {
    const b = box("TurboPopup — dynamic updates");

    const {trigger, popup} = makeTrigger("Toggle props", {
        anchorPosition: {x: 50, y: 100},
        popupPosition: {x: 50, y: 0},
        viewportMargin: 8,
        offsetFromAnchor: {x: 0, y: 8},
    });

    b.addSubBox("Start below", trigger);
    b.addContent(button({
        text: "Flip vertical (above/below)",
        onClick: () => {
            const isBelow = popup.anchorPosition.y === 100;
            popup.anchorPosition = {x: 50, y: isBelow ? 0 : 100};
            popup.popupPosition = {x: 50, y: isBelow ? 100 : 0};
            popup.offsetFromAnchor = {x: 0, y: isBelow ? -8 : 8};
            if ($(popup).isShown) popup["recomputePosition"]?.();
        }
    }));
    b.addContent(button({
        text: "Fallback = invert",
        onClick: () => {
            popup.fallbackModes = {x: PopupFallbackMode.invert, y: PopupFallbackMode.invert};
            if ($(popup).isShown) popup["recomputePosition"]?.();
        }
    }));
    b.addContent(button({
        text: "Fallback = offset",
        onClick: () => {
            popup.fallbackModes = {x: PopupFallbackMode.offset, y: PopupFallbackMode.offset};
            if ($(popup).isShown) popup["recomputePosition"]?.();
        }
    }));
    b.addContent(button({
        text: "vmargin = 32",
        onClick: () => {
            popup.viewportMargin = 32;
            if ($(popup).isShown) popup["recomputePosition"]?.();
        }
    }));
    b.addContent(button({
        text: "vmargin = 0",
        onClick: () => {
            popup.viewportMargin = 0;
            if ($(popup).isShown) popup["recomputePosition"]?.();
        }
    }));
}

function testScrollScenario() {
    const b = box("TurboPopup — window scroll scenario");

    // Add big spacer to require scrolling
    const spacerTop = div({styles: {height: "40vh"}, text: ""});
    const spacerBot = div({styles: {height: "60vh"}, text: ""});

    const region = div({
        styles: {display: "grid", gap: "0.5rem", placeItems: "center"}
    });

    const {trigger, popup} = makeTrigger("Scroll then open", {
        anchorPosition: {x: 50, y: 100},
        popupPosition: {x: 50, y: 0},
        offsetFromAnchor: {x: 0, y: 10},
        viewportMargin: {x: 12, y: 12}
    });

    $(region).addChild([spacerTop, trigger, spacerBot]);
    b.addSubBox("Open after scrolling", region);

    // little helper buttons
    b.addContent(button({
        text: "Scroll to trigger",
        onClick: () => trigger.scrollIntoView({behavior: "smooth", block: "center"})
    }));
    b.addContent(button({text: "Open popup", onClick: () => popup.show(true)}));
    b.addContent(button({text: "Close popup", onClick: () => popup.show(false)}));
}

export function setupPopupTests() {
    testBasics();
    testFallbackModes();
    testViewportMarginsAndMaxSize();
    testDynamicUpdates();
    testScrollScenario();
}