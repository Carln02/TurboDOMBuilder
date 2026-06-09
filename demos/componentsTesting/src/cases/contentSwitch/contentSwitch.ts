import {
    div, TurboButton, TurboContentSwitch, ContentSwitchMode
} from "../../../../../build/turbodombuilder.esm";
import {box} from "../../demoBox/demoBox";

const panelColors = ["#4a90d9", "#6bc76f", "#e07b4a", "#9b59b6"];

const makePanel = (label: string, color: string) =>
    div({
        styles: {
            background: color,
            padding: "1.5rem 2rem",
            borderRadius: "12px",
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "#fff",
            minHeight: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        text: label,
    });

function makeSwitch(mode?: ContentSwitchMode, extraProps: object = {}) {
    const cs = TurboContentSwitch.create({mode, ...extraProps} as any);
    cs.select.forceSelection = false;
    return cs;
}

/* 1) fadeRight (default) */
function csTest1() {
    const cs = makeSwitch();

    const panels = ["Panel A", "Panel B", "Panel C"].map((label, i) => {
        const p = makePanel(label, panelColors[i]);
        cs.appendChild(p);
        return p;
    });

    // Let MO process entries, then show first panel
    setTimeout(() => cs.select.select(panels[0]));

    box("TurboContentSwitch — fadeRight (default)")
        .addSubBox("switch", cs)
        .addContent(TurboButton.create({text: "→ Panel A", onClick: () => cs.select.select(panels[0])}))
        .addContent(TurboButton.create({text: "→ Panel B", onClick: () => cs.select.select(panels[1])}))
        .addContent(TurboButton.create({text: "→ Panel C", onClick: () => cs.select.select(panels[2])}));
}

/* 2) fadeLeft */
function csTest2() {
    const cs = makeSwitch(ContentSwitchMode.fadeLeft);

    const panels = ["Left A", "Left B", "Left C"].map((label, i) => {
        const p = makePanel(label, [panelColors[0], panelColors[2], panelColors[3]][i]);
        cs.appendChild(p);
        return p;
    });

    setTimeout(() => cs.select.select(panels[0]));

    box("TurboContentSwitch — fadeLeft")
        .addSubBox("switch", cs)
        .addContent(TurboButton.create({text: "→ Left A", onClick: () => cs.select.select(panels[0])}))
        .addContent(TurboButton.create({text: "→ Left B", onClick: () => cs.select.select(panels[1])}))
        .addContent(TurboButton.create({text: "→ Left C", onClick: () => cs.select.select(panels[2])}));
}

/* 3) carousel — direction-aware, no wrap to avoid index-direction mismatch */
function csTest3() {
    const cs = makeSwitch(ContentSwitchMode.carousel);

    const panels = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"].map((label, i) => {
        const p = makePanel(label, panelColors[i]);
        cs.appendChild(p);
        return p;
    });

    let currentIndex = 0;
    setTimeout(() => cs.select.select(panels[0]));

    box("TurboContentSwitch — carousel")
        .addSubBox("switch", cs)
        .addContent(TurboButton.create({
            text: "← Prev",
            onClick: () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    cs.select.select(panels[currentIndex]);
                }
            }
        }))
        .addContent(TurboButton.create({
            text: "Next →",
            onClick: () => {
                if (currentIndex < panels.length - 1) {
                    currentIndex++;
                    cs.select.select(panels[currentIndex]);
                }
            }
        }))
        .addContent(TurboButton.create({
            text: "→ Slide 1",
            onClick: () => { currentIndex = 0; cs.select.select(panels[0]); }
        }))
        .addContent(TurboButton.create({
            text: "→ Slide 4",
            onClick: () => { currentIndex = 3; cs.select.select(panels[3]); }
        }));
}

/* 4) custom transitionDuration */
function csTest4() {
    const cs = TurboContentSwitch.create({transitionDuration: 0.8} as any);
    cs.select.forceSelection = false;

    const panels = ["Slow A", "Slow B"].map((label, i) => {
        const p = makePanel(label, [panelColors[1], panelColors[2]][i]);
        cs.appendChild(p);
        return p;
    });

    setTimeout(() => cs.select.select(panels[0]));

    box("TurboContentSwitch — custom transitionDuration (0.8s)")
        .addSubBox("switch", cs)
        .addContent(TurboButton.create({text: "→ Slow A", onClick: () => cs.select.select(panels[0])}))
        .addContent(TurboButton.create({text: "→ Slow B", onClick: () => cs.select.select(panels[1])}))
        .addContent(TurboButton.create({
            text: "duration = 0.2s",
            onClick: () => (cs as any).transitionDuration = 0.2
        }))
        .addContent(TurboButton.create({
            text: "duration = 1.5s",
            onClick: () => (cs as any).transitionDuration = 1.5
        }));
}

export function setupContentSwitchTests() {
    csTest1();
    csTest2();
    csTest3();
    csTest4();
}
