import { div, TurboSelectWheel
} from "../../../../../build/turbodombuilder.esm";
import { box } from "../../demoBox/demoBox";

/* 1) Basics: values[] -> single select, forceSelection default */
function selectWheelTest1() {
    const host = div({classes: "select-parent"});
    const wheel = TurboSelectWheel.create({});
    wheel.selector.values = ["Alpha", "Beta", "Gamma"];

    const b = box("TurboSelectWheel — Basics");
    b.addSubBox("host", host);
}

export function setupSelectWheelTests() {
    selectWheelTest1();
}
