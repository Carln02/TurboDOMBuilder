import {toolbar, Toolbar} from "./toolbar/toolbar";
import {$, button} from "../../../build/turbodombuilder.esm";
import {SelectTool} from "./tools/select.tool";
import {bucket} from "./tools/bucket/bucket";
import {PusherTool} from "./tools/pusher/pusher.tool";
import {PusherSubstrate} from "./tools/pusher/pusher.substrate";
import {AddSquareTool} from "./tools/addSquare.tool";

$(document)
    .makeSubstrate("main")
    .setSubstrateObjectList(document.body.children);

const tb = toolbar({parent: document.body}) as Toolbar;
tb.addTool(button({text: "Select", tools: SelectTool, classes: "demo-button"}));
tb.addTool(button({text: "Add Square", tools: AddSquareTool, classes: "demo-button"}));
tb.addTool(bucket({text: "Bucket", classes: "demo-button"}));
tb.addTool(button({text: "Pusher", tools: PusherTool, substrates: PusherSubstrate, classes: "demo-button"}));