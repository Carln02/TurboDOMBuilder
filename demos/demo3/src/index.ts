import {TurboIcon, h1, TurboEventManager} from "../../../build/turbodombuilder.esm";
import {setupIconTests} from "./cases/icon/icon";
import {setupRichElementTests} from "./cases/richElement/richElement";
import {setupInputTests} from "./cases/input/input";
import {setupSelectTests} from "./cases/select/select";
import {setupDrawerTests} from "./cases/drawer/drawer";
import {setupPopupTests} from "./cases/popup/popup";
import {setupDropdownTests} from "./cases/dropdown/dropdown";

TurboIcon.config.defaultDirectory = "assets";
TurboIcon.config.defaultClasses = "icon";
TurboEventManager.instance.preventDefaultWheel = false;

h1({text: "TurboIcon", parent: document.body});
setupIconTests();
h1({text: "TurboRichElement", parent: document.body});
setupRichElementTests();
h1({text: "TurboInput", parent: document.body});
setupInputTests();
h1({text: "TurboSelect", parent: document.body});
setupSelectTests();
h1({text: "TurboDrawer", parent: document.body});
setupDrawerTests();
h1({text: "TurboPopup", parent: document.body});
setupPopupTests();
h1({text: "TurboDropdown", parent: document.body});
setupDropdownTests();