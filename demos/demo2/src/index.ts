import {Toolbar} from "./toolbar/toolbar";
import {TurboButton, $} from "../../../build/turbodombuilder.esm";
import {SelectTool} from "./tools/select.tool";
import {Bucket} from "./tools/bucket/bucket";
import {PusherTool} from "./tools/pusher/pusher.tool";
import {PusherSubstrate} from "./tools/pusher/pusher.substrate";
import {AddSquareTool} from "./tools/addSquare.tool";

$(document)
    .makeSubstrate("main")
    .setSubstrateObjectList(document.body.children);

const toolbar = new Toolbar({parent: document.body});
toolbar.addTool(new TurboButton({text: "Select", tools: SelectTool, classes: "demo-button"}));
toolbar.addTool(new TurboButton({text: "Add Square", tools: AddSquareTool, classes: "demo-button"}));
toolbar.addTool(new Bucket({text: "Bucket", classes: "demo-button"}));
toolbar.addTool(new TurboButton({text: "Pusher", tools: PusherTool, substrates: PusherSubstrate, classes: "demo-button"}));