import {$, TurboIcon, drawer, div, span, Side, h1, TurboEventManager} from "../../../build/turbodombuilder.esm";
import {box} from "./demoBox/demoBox";
import {setupIconTests} from "./cases/icon/icon";
import {setupRichElementTests} from "./cases/richElement/richElement";
import {setupInputTests} from "./cases/input/input";

TurboIcon.config.defaultDirectory = "assets";
TurboIcon.config.defaultClasses = "icon";
TurboEventManager.instance.preventDefaultWheel = false;

h1({text: "TurboIcon", parent: document.body});
setupIconTests();
h1({text: "TurboRichElement", parent: document.body});
setupRichElementTests();
h1({text: "TurboInput", parent: document.body});
setupInputTests();

const drawer1 = drawer({
    icon: "chevron",
    hideOverflow: true,
    side: Side.left,
    attachSideToIconName: true,
    rotateIconBasedOnSide: false,
    children: [div({text: "A div..."}), span({text: "A\nSpan\n..."})]
});

box("Drawer", drawer1);
drawer1.side = Side.left;