import {Toolbar} from "./toolbar/toolbar";
import {TurboButton, ClickMode, TurboEventManager} from "../../../build/turbodombuilder.esm";
import {SelectTool} from "./tools/select.tool";
import {Bucket} from "./tools/bucket/bucket";
import {Canvas} from "./canvas/canvas";
import {AddSquareTool} from "./tools/addSquare.tool";
import {EditObject} from "./editObject/editObject";

Canvas.create({parent: document.body});
Toolbar.create({
    parent: document.body,
    entries: [
        TurboButton.create({text: "Select", tools: SelectTool, classes: "demo-button"}),
        TurboButton.create({text: "Add Square", tools: AddSquareTool, classes: "demo-button"}),
        Bucket.create({text: "Bucket", classes: "demo-button"}),
    ]
});

TurboEventManager.instance.setTool(EditObject.create(), ClickMode.right);