import {toolbar} from "./toolbar/toolbar";
import {button, turbo} from "../../../build/turbodombuilder.esm";
import {SelectTool} from "./tools/select.tool";
import {bucket} from "./tools/bucket/bucket";
import {PusherSubstrateTool} from "./tools/pusherSubstrate.tool";
import {AddSquareTool} from "./tools/addSquare.tool";
import {AddCircleTool} from "./tools/addCircle.tool";
import {myCanvas} from "./canvas/canvas";
import {MakePusherTool} from "./tools/makePusher.tool";
import {MakeSpacerTool} from "./tools/makeSpacer.tool";
import {CanvasPusherSubstrate} from "./canvas/canvas.pusherSubstrate";
import {CanvasSubstrate} from "./canvas/canvas.mainSubstrate";

const canvas = myCanvas({parent: document.body, substrates: [CanvasPusherSubstrate, CanvasSubstrate]});
turbo(canvas).activateSubstrate("main");

//Create a toolbar and populate it
toolbar({
    parent: document.body,
    entries: [
        button({text: "Select", tools: SelectTool, classes: "demo-button"}),
        button({text: "Add Square", tools: AddSquareTool, classes: "demo-button"}),
        button({text: "Add Circle", tools: AddCircleTool, classes: "demo-button"}),
        bucket({text: "Bucket", classes: "demo-button"}),
        button({text: "Pusher Substrate", tools: PusherSubstrateTool, classes: "demo-button"}),
        button({text: "Make Pusher", tools: MakePusherTool, classes: "demo-button"}),
        button({text: "Make Spacer", tools: MakeSpacerTool, classes: "demo-button"}),
    ]
});