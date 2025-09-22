import {Square} from "./square/square";
import {Toolbar} from "./toolbar/toolbar";
import {TurboButton, $} from "../../../build/turbodombuilder.esm";
import {SelectTool} from "./tools/select.tool";
import {Bucket} from "./tools/bucket/bucket";
import {PusherTool} from "./tools/pusher/pusher.tool";
import {PusherSubstrate} from "./tools/pusher/pusher.substrate";

$(document)
    .makeSubstrate("main")
    .setSubstrateObjectList(document.body.children);

for (let i = 0; i < 4; i++) new Square({parent: document.body});

const toolbar = new Toolbar({parent: document.body});
toolbar.addTool(new TurboButton({text: "Select", tools: SelectTool}));
toolbar.addTool(new Bucket({text: "Bucket"}));
toolbar.addTool(new TurboButton({text: "Pusher", tools: PusherTool, substrates: PusherSubstrate}));