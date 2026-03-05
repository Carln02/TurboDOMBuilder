import {button, turbo} from "../../../build/turbodombuilder.esm";
import {SelectTool} from "./tools/select.tool";
import {PusherSubstrateTool} from "./tools/pusherSubstrate.tool";
import {AddSquareTool} from "./tools/addSquare.tool";
import {Canvas} from "./canvas/canvas";
import {MakePusherTool} from "./tools/makePusher.tool";
import {MakeSpacerTool} from "./tools/makeSpacer.tool";
import {SpacerSubstrateTool} from "./tools/spacerSubstrate.tool";
import {Toolbar} from "./toolbar/toolbar";
import {Bucket} from "./tools/bucket/bucket";
import {TurboGrid} from "./grid/grid";

TurboGrid.create({parent: document.body});

// Canvas.create({parent: document.body});
// Toolbar.create({
//     parent: document.body,
//     entries: [
//         button({text: "Select", tools: SelectTool, classes: "demo-button"}),
//         button({text: "Add Square", tools: AddSquareTool, classes: "demo-button"}),
//         Bucket.create({text: "Bucket", classes: "demo-button"}),
//         button({text: "Pusher Substrate", tools: PusherSubstrateTool, classes: "demo-button"}),
//         button({text: "Spacer Substrate", tools: SpacerSubstrateTool, classes: "demo-button"}),
//         button({text: "Make Pusher", tools: MakePusherTool, classes: "demo-button"}),
//         button({text: "Make Spacer", tools: MakeSpacerTool, classes: "demo-button"}),
//     ]
// });