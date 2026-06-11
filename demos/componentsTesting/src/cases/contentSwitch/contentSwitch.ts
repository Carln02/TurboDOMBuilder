import {
    div, p, h2, span, TurboButton, TurboContentSwitch, ContentSwitchMode
} from "../../../../../build/turbodombuilder.esm";
import {box} from "../../demoBox/demoBox";

const palette = ["#4a90d9", "#6bc76f", "#e07b4a", "#9b59b6", "#e74c3c", "#1abc9c"];

function makePanel(label: string, color: string, content: {
    subtitle?: string;
    body?: string;
    wide?: boolean;
    tall?: boolean;
    narrow?: boolean;
} = {}) {
    return div({
        styles: {
            background: color,
            padding: "1.5rem 2rem",
            borderRadius: "12px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: content.wide ? "420px" : content.narrow ? "160px" : "280px",
            minHeight: content.tall ? "200px" : "80px",
            boxSizing: "border-box",
        },
        children: [
            h2({
                styles: {margin: "0", fontSize: "1.1rem", fontWeight: "700"},
                text: label,
            }),
            content.subtitle && span({
                styles: {fontSize: "0.8rem", opacity: "0.85", fontWeight: "500"},
                text: content.subtitle,
            }),
            content.body && p({
                styles: {margin: "0", fontSize: "0.9rem", opacity: "0.9", lineHeight: "1.5"},
                text: content.body,
            }),
        ].filter(Boolean),
    });
}

function makeSwitch(mode?: ContentSwitchMode) {
    const cs = TurboContentSwitch.create({mode} as any);
    cs.select.forceSelection = false;
    return cs;
}

function navButtons(cs: TurboContentSwitch, panels: HTMLElement[], label = "") {
    return panels.map((p, i) =>
        TurboButton.create({text: `→ ${label || i + 1}`, onClick: () => cs.select.select(p)})
    );
}

/* 1) Same-size panels — baseline */
function csTest1() {
    const cs = makeSwitch();
    const panels = [
        makePanel("Panel A", palette[0], {subtitle: "First slide", body: "Consistent sizing across all panels."}),
        makePanel("Panel B", palette[1], {subtitle: "Second slide", body: "All panels are the same width and height."}),
        makePanel("Panel C", palette[2], {subtitle: "Third slide", body: "The container should not jump at all."}),
    ];
    panels.forEach(p => cs.appendChild(p));
    setTimeout(() => cs.select.select(panels[0]));

    box("ContentSwitch — Same size panels (fadeRight)")
        .addSubBox("switch", cs)
        .addContent(...panels.map((_, i) =>
            TurboButton.create({text: `→ Panel ${["A","B","C"][i]}`, onClick: () => cs.select.select(panels[i])})
        ));
}

/* 2) Varying widths */
function csTest2() {
    const cs = makeSwitch();
    const panels = [
        makePanel("Narrow", palette[3], {narrow: true, subtitle: "160px wide"}),
        makePanel("Normal Panel", palette[0], {subtitle: "280px wide", body: "Standard width."}),
        makePanel("Wide Panel — lots of content here", palette[4], {wide: true, subtitle: "420px wide", body: "This one is much wider than the others."}),
    ];
    panels.forEach(p => cs.appendChild(p));
    setTimeout(() => cs.select.select(panels[0]));

    box("ContentSwitch — Varying widths")
        .addSubBox("switch", cs)
        .addContent(...["Narrow","Normal","Wide"].map((label, i) =>
            TurboButton.create({text: `→ ${label}`, onClick: () => cs.select.select(panels[i])})
        ));
}

/* 3) Varying heights */
function csTest3() {
    const cs = makeSwitch(ContentSwitchMode.fadeLeft);
    const panels = [
        makePanel("Short", palette[1], {subtitle: "Just a title and subtitle"}),
        makePanel("Tall Panel", palette[2], {
            tall: true,
            subtitle: "Much more content",
            body: "This panel has a lot of text content inside it, making it significantly taller than the others. The container should animate its height smoothly when switching to or from this panel.",
        }),
        makePanel("Medium", palette[5], {
            subtitle: "In between",
            body: "A bit of body text here.",
        }),
    ];
    panels.forEach(p => cs.appendChild(p));
    setTimeout(() => cs.select.select(panels[0]));

    box("ContentSwitch — Varying heights (fadeLeft)")
        .addSubBox("switch", cs)
        .addContent(...["Short","Tall","Medium"].map((label, i) =>
            TurboButton.create({text: `→ ${label}`, onClick: () => cs.select.select(panels[i])})
        ));
}

/* 4) Carousel with varying sizes */
function csTest4() {
    const cs = makeSwitch(ContentSwitchMode.carousel);
    const panels = [
        makePanel("Slide 1", palette[0], {subtitle: "Narrow start", narrow: true}),
        makePanel("Slide 2", palette[1], {subtitle: "Normal", body: "Back to standard width."}),
        makePanel("Slide 3", palette[2], {wide: true, subtitle: "Wide slide", body: "Carousel with size change."}),
        makePanel("Slide 4", palette[3], {tall: true, subtitle: "Tall slide", body: "Height changes too."}),
    ];
    panels.forEach(p => cs.appendChild(p));

    let idx = 0;
    setTimeout(() => cs.select.select(panels[0]));

    box("ContentSwitch — Carousel + varying sizes")
        .addSubBox("switch", cs)
        .addContent(
            TurboButton.create({text: "← Prev", onClick: () => { if (idx > 0) cs.select.select(panels[--idx]); }}),
            TurboButton.create({text: "Next →", onClick: () => { if (idx < panels.length - 1) cs.select.select(panels[++idx]); }}),
            ...panels.map((_, i) =>
                TurboButton.create({text: `→ ${i + 1}`, onClick: () => { idx = i; cs.select.select(panels[i]); }})
            )
        );
}

/* 5) Slow transition to inspect size animation clearly */
function csTest5() {
    const cs = TurboContentSwitch.create({transitionDuration: 1.2} as any);
    cs.select.forceSelection = false;
    const panels = [
        makePanel("Slow A", palette[4], {narrow: true, subtitle: "Small start"}),
        makePanel("Slow B — bigger", palette[5], {wide: true, tall: true, subtitle: "Watch it grow", body: "The transition is intentionally slow so you can see width and height animating."}),
        makePanel("Slow C", palette[0], {subtitle: "Back to normal"}),
    ];
    panels.forEach(p => cs.appendChild(p));
    setTimeout(() => cs.select.select(panels[0]));

    box("ContentSwitch — Slow transition (1.2s) for visual inspection")
        .addSubBox("switch", cs)
        .addContent(...["A","B","C"].map((label, i) =>
            TurboButton.create({text: `→ Slow ${label}`, onClick: () => cs.select.select(panels[i])})
        ));
}

export function setupContentSwitchTests() {
    csTest1();
    csTest2();
    csTest3();
    csTest4();
    csTest5();
}