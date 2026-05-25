import { TurboSelectWheel, TurboButton
} from "../../../../../build/turbodombuilder.esm";
import { box } from "../../demoBox/demoBox";

function selectWheelTest1() {
    const wheel = TurboSelectWheel.create({});
    wheel.values = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"];

    box("TurboSelectWheel — Basics")
        .addSubBox("wheel", wheel)
        .addContent(TurboButton.create({
            text: "Select Beta",
            onClick: () => wheel.selector.select("Beta")
        }))
        .addContent(TurboButton.create({
            text: "selectByIndex(2)",
            onClick: () => wheel.selector.selectByIndex(2)
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

export function setupSelectWheelTests() {
    selectWheelTest1();
    selectWheelTest2();
}
