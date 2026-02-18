import {
    $, drawer, div, button, h4, p, Side
} from "../../../../../build/turbodombuilder.esm";
import {box} from "../../demoBox/demoBox";
import "./drawer.css";

function drawerTest1_Basics() {
    const dLeft = drawer({
        icon: "chevron",
        side: Side.left,
        attachSideToIconName: true,
        hideOverflow: true,
        children: [p({text: "Left drawer content."})],
    });

    const dRight = drawer({
        icon: "chevron",
        side: Side.right,
        hideOverflow: true,
        children: [p({text: "Right drawer content."})],
    });

    const dTop = drawer({
        icon: "chevron",
        side: Side.top,
        attachSideToIconName: true,
        hideOverflow: true,
        children: [p({text: "Top drawer content."})],
    });

    const dBottom = drawer({
        icon: "chevron",
        side: Side.bottom,
        hideOverflow: true,
        children: [p({text: "Bottom drawer content."})],
    });

    box("TurboDrawer — Basics")
        .addSubBox("Left", dLeft, button({text: "Toggle", onClick: () => (dLeft.open = !dLeft.open)}))
        .addSubBox("Right", dRight, button({text: "Toggle", onClick: () => (dRight.open = !dRight.open)}))
        .addSubBox("Top", dTop, button({text: "Toggle", onClick: () => (dTop.open = !dTop.open)}))
        .addSubBox("Bottom", dBottom, button({text: "Toggle", onClick: () => (dBottom.open = !dBottom.open)}));
}

function drawerTest2_OverflowVsTransform() {
    const overflow = drawer({
        icon: "chevron",
        side: Side.left,
        hideOverflow: true, // container grows (width/height) instead of transform
        children: [div({text: "Overflow=hidden mode\n(Thumb drags should resize the container)"})],
    });

    const transform = drawer({
        icon: "chevron",
        side: Side.left,
        hideOverflow: false, // transform translate is used
        children: [div({text: "Transform mode\n(translateX/Y instead of resizing container)"})],
    });

    box("TurboDrawer — hideOverflow vs transform")
        .addSubBox("hideOverflow = true", overflow,
            button({text: "Open", onClick: () => (overflow.open = true)}),
            button({text: "Close", onClick: () => (overflow.open = false)}),
        )
        .addSubBox("hideOverflow = false", transform,
            button({text: "Open", onClick: () => (transform.open = true)}),
            button({text: "Close", onClick: () => (transform.open = false)}),
        );
}

function drawerTest3_Offsets() {
    const fixed = drawer({
        icon: "chevron",
        side: Side.bottom,
        hideOverflow: true,
        offset: 12,                 // same open/closed extra offset
        children: [div({text: "offset: 12 (both states)"})],
    });

    const perState = drawer({
        icon: "chevron",
        side: Side.bottom,
        hideOverflow: true,
        offset: {open: 24, closed: 4}, // different open/closed offsets
        children: [div({text: "offset: { open: 24, closed: 4 }"})],
    });

    box("TurboDrawer — offset")
        .addSubBox("Single number", fixed, button({text: "Toggle", onClick: () => (fixed.open = !fixed.open)}))
        .addSubBox("Per-state", perState, button({text: "Toggle", onClick: () => (perState.open = !perState.open)}));
}

function drawerTest4_IconBehavior() {
    const byName = drawer({
        icon: "chevron",                // icon-switch with appended side in name
        attachSideToIconName: true,
        side: Side.left,
        children: [p({text: "attachSideToIconName = true"})],
    });

    const byRotate = drawer({
        icon: "chevron",
        rotateIconBasedOnSide: true,    // rotate via reifect styles
        side: Side.left,
        children: [p({text: "rotateIconBasedOnSide = true"})],
    });

    box("TurboDrawer — icon modes")
        .addSubBox("Append side to icon name", byName,
            button({text: "Toggle", onClick: () => (byName.open = !byName.open)}),
            button({
                text: "Cycle side",
                onClick: () => {
                    const order = [Side.left, Side.top, Side.right, Side.bottom];
                    const i = order.indexOf(byName.side);
                    byName.side = order[(i + 1) % order.length];
                },
            }),
        )
        .addSubBox("Rotate icon based on side", byRotate,
            button({text: "Toggle", onClick: () => (byRotate.open = !byRotate.open)}),
            button({
                text: "Cycle side",
                onClick: () => {
                    const order = [Side.left, Side.top, Side.right, Side.bottom];
                    const i = order.indexOf(byRotate.side);
                    byRotate.side = order[(i + 1) % order.length];
                },
            }),
        );
}

function drawerTest5_LiveSideChanges() {
    const d = drawer({
        icon: "chevron",
        attachSideToIconName: true,
        side: Side.right,
        children: [div({text: "I move around as you change side"})],
    });

    box("TurboDrawer — live side changes")
        .addSubBox("Drawer", d,
            button({text: "Open/Close", onClick: () => (d.open = !d.open)}),
            button({text: "Side: Left", onClick: () => (d.side = Side.left)}),
            button({text: "Side: Right", onClick: () => (d.side = Side.right)}),
            button({text: "Side: Top", onClick: () => (d.side = Side.top)}),
            button({text: "Side: Bottom", onClick: () => (d.side = Side.bottom)}),
        );
}

function drawerTest6_ResizeObserver() {
    const d = drawer({
        icon: "chevron",
        side: Side.bottom,
        hideOverflow: true, // easiest to see height change
        children: [div({text: "Growing content…"})],
    });

    let lines = 1;
    box("TurboDrawer — content resize")
        .addSubBox("Resize on content change", d,
            button({
                text: "Add line",
                onClick: () => {
                    lines += 1;
                    $(d.panel).addChild(p({text: `Line ${lines}`}));
                    // drawer.refresh() is not needed; ResizeObserver should adjust translation
                },
            }),
            button({
                text: "Remove last line",
                onClick: () => {
                    const last = d.panel.lastElementChild;
                    if (last) last.remove();
                },
            }),
            button({text: "Open/Close", onClick: () => (d.open = !d.open)}),
        );
}

function drawerTest7_Nested() {
    const inner = drawer({
        icon: "chevron",
        side: Side.right,
        attachSideToIconName: true,
        hideOverflow: true,
        children: [p({text: "Inner drawer"})],
    });

    const outer = drawer({
        icon: "chevron",
        side: Side.left,
        attachSideToIconName: true,
        hideOverflow: true,
        children: [
            h4({text: "Outer drawer"}),
            div({text: "Has a nested drawer →"}),
            inner,
        ],
    });

    box("TurboDrawer — nested")
        .addSubBox("Outer + Inner",
            outer,
            button({text: "Toggle outer", onClick: () => (outer.open = !outer.open)}),
            button({text: "Toggle inner", onClick: () => (inner.open = !inner.open)}),
        );
}

function drawerTest8_RaceProps() {
    const racer = drawer({
        icon: "chevron",
        side: Side.left,
        hideOverflow: false,
        attachSideToIconName: true,
        children: [div({text: "Props change quickly; should stay consistent"})],
    });

    box("TurboDrawer — stress/race")
        .addSubBox("Racer", racer,
            button({
                text: "Go!",
                onClick: () => {
                    const sides = [Side.left, Side.top, Side.right, Side.bottom];
                    let i = 0;
                    const id = setInterval(() => {
                        racer.open = i % 2 === 0;
                        racer.side = sides[i % sides.length];
                        racer.offset = i % 3 === 0 ? {open: 18, closed: 2} : 8;
                        i++;
                        if (i > 12) clearInterval(id);
                    }, 120);
                },
            }),
        );
}

export function setupDrawerTests() {
    drawerTest1_Basics();
    drawerTest2_OverflowVsTransform();
    drawerTest3_Offsets();
    drawerTest4_IconBehavior();
    drawerTest5_LiveSideChanges();
    drawerTest6_ResizeObserver();
    drawerTest7_Nested();
    drawerTest8_RaceProps();
}