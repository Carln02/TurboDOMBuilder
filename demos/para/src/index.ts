import {Toolbar} from "./toolbar/toolbar";
import {TurboButton} from "../../../build/turbodombuilder.esm";
import {SelectTool} from "./tools/select.tool";
import {Bucket} from "./tools/bucket/bucket";
import {Canvas} from "./canvas/canvas";
import {AddSquareListTool} from "./tools/addSquareList.tool";

Canvas.create({parent: document.body});
Toolbar.create({
    parent: document.body,
    entries: [
        TurboButton.create({text: "Select", tools: SelectTool, classes: "demo-button"}),
        // button({text: "Add Square", tools: AddSquareTool, classes: "demo-button"}),
        TurboButton.create({text: "Add SquareList", tools: AddSquareListTool, classes: "demo-button"}),
        Bucket.create({text: "Bucket", classes: "demo-button"}),
    ]
});