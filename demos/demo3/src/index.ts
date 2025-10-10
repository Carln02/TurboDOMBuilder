import {$, TurboIcon, iconToggle, button, drawer, div, span, Side, icon} from "../../../build/turbodombuilder.esm";
import {box} from "./demoBox/demoBox";

TurboIcon.config.defaultDirectory = "assets";
TurboIcon.config.defaultClasses = "icon";

box("Icons",
    icon({icon: "share", type: "jpg"}),
    iconToggle({icon: "link", toggleOnClick: true, onToggle: (b) => console.log(b)})
);

box("Button", button({leftIcon: "chevron-top", text: "Button Text", prefixEntry: "pre-"}));

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