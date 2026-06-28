import { TurboSelectWheel, TurboButton, TurboRichElement
} from "../../../../../build/turbodombuilder.esm";
import { box } from "../../demoBox/demoBox";
import "./selectWheel.css";

function selectWheelTest1() {
    const wheel = TurboSelectWheel.create({});
    wheel.values = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"];

    box("TurboSelectWheel — Basics")
        .addSubBox("wheel", wheel)
        .addContent(TurboButton.create({
            text: "Select Beta",
            onClick: () => wheel.select.select("Beta")
        }))
        .addContent(TurboButton.create({
            text: "selectByIndex(2)",
            onClick: () => wheel.select.selectByIndex(2)
        }))
        .addContent(TurboButton.create({
            text: "Log selected",
            onClick: () => console.log("[wheel1] selected:", wheel.selectedValue)
        }));
}

function selectWheelTest2() {
    const wheel = TurboSelectWheel.create({});
    wheel.alwaysOpen = true;
    wheel.values = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    box("TurboSelectWheel — alwaysOpen")
        .addSubBox("wheel (always visible)", wheel)
        .addContent(TurboButton.create({
            text: "Log selected",
            onClick: () => console.log("[wheel2] selected:", wheel.selectedValue)
        }))
        .addContent(TurboButton.create({
            text: "alwaysOpen = false",
            onClick: () => wheel.alwaysOpen = false
        }))
        .addContent(TurboButton.create({
            text: "alwaysOpen = true",
            onClick: () => wheel.alwaysOpen = true
        }));
}

// Tests Bug 2 fix (zero-size retry) and removeEntry.
// The wheel starts populated. Entries added/removed dynamically should size correctly.
function selectWheelTest3() {
    const initialValues = ["One", "Two", "Three"];
    const wheel = TurboSelectWheel.create({});
    wheel.alwaysOpen = true;
    wheel.values = [...initialValues];

    box("TurboSelectWheel — Dynamic add/remove (Bug 2: size retry)")
        .addSubBox("wheel", wheel)
        .addContent(TurboButton.create({
            text: "Add 'Four'",
            onClick: () => { wheel.values = [...wheel.values as string[], "Four"]; }
        }))
        .addContent(TurboButton.create({
            text: "Remove last entry",
            onClick: () => {
                const last = wheel.entries[wheel.entries.length - 1];
                if (last) wheel.select.removeEntry(last as any);
            }
        }))
        .addContent(TurboButton.create({
            text: "Clear all",
            onClick: () => { wheel.values = []; }
        }))
        .addContent(TurboButton.create({
            text: "Restore original",
            onClick: () => { wheel.values = [...initialValues]; }
        }))
        .addContent(TurboButton.create({
            text: "Log selected",
            onClick: () => console.log("[wheel3] selected:", wheel.selectedValue)
        }));
}

// Tests Bug 1 fix (drag propagation isolation).
// A parent div has a border that turns red if it receives a dragStart behavior.
// Dragging the wheel entries should NOT trigger the parent's drag — border stays neutral.
function selectWheelTest4() {
    const wheel = TurboSelectWheel.create({});
    wheel.alwaysOpen = true;
    wheel.values = ["North", "South", "East", "West", "Centre"];

    const status = TurboRichElement.create({text: "Parent drag: NOT fired ✓"}) as HTMLElement;
    (status as HTMLElement).style.cssText = "padding:6px 10px; border-radius:4px; background:#d4f5d4; color:#1a6b1a; font-size:12px;";

    const parent = document.createElement("div");
    parent.style.cssText = "padding:16px; border:2px solid #aaa; border-radius:8px; display:inline-flex; flex-direction:column; gap:8px; align-items:flex-start;";
    parent.appendChild(wheel as unknown as Node);
    parent.appendChild(status);

    // Simulate what a parent Card behavior would do
    parent.addEventListener("turbo-drag-start", () => {
        parent.style.borderColor = "#e55";
        (status as HTMLElement).textContent = "Parent drag: FIRED ✗ (Bug 1 regression!)";
        (status as HTMLElement).style.background = "#fdd";
        (status as HTMLElement).style.color = "#a00";
    }, {capture: false});

    box("TurboSelectWheel — Drag propagation isolation (Bug 1)")
        .addContent(parent)
        .addContent(TurboButton.create({
            text: "Reset indicator",
            onClick: () => {
                parent.style.borderColor = "#aaa";
                (status as HTMLElement).textContent = "Parent drag: NOT fired ✓";
                (status as HTMLElement).style.background = "#d4f5d4";
                (status as HTMLElement).style.color = "#1a6b1a";
            }
        }))
        .addContent(TurboButton.create({
            text: "Log selected",
            onClick: () => console.log("[wheel4] selected:", wheel.selectedValue)
        }));
}

// Tests that dragging is smooth (no transition lag) — the wheel should track your finger instantly.
function selectWheelTest5() {
    const wheel = TurboSelectWheel.create({});
    wheel.alwaysOpen = true;
    wheel.transitionDuration = 0.4;
    wheel.values = ["🍎 Apple", "🍋 Lemon", "🍇 Grape", "🍊 Orange", "🍓 Berry", "🥝 Kiwi", "🍑 Peach"];

    box("TurboSelectWheel — Drag smoothness (transition disabled during drag)")
        .addSubBox("wheel", wheel)
        .addContent(TurboButton.create({
            text: "transition 0.1s",
            onClick: () => wheel.transitionDuration = 0.1
        }))
        .addContent(TurboButton.create({
            text: "transition 0.4s",
            onClick: () => wheel.transitionDuration = 0.4
        }))
        .addContent(TurboButton.create({
            text: "transition 1s",
            onClick: () => wheel.transitionDuration = 1
        }))
        .addContent(TurboButton.create({
            text: "Log selected",
            onClick: () => console.log("[wheel5] selected:", wheel.selectedValue)
        }));
}

export function setupSelectWheelTests() {
    selectWheelTest1();
    selectWheelTest2();
    selectWheelTest3();
    selectWheelTest4();
    selectWheelTest5();
}
