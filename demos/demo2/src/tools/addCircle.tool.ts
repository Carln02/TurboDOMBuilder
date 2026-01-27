import {TurboTool, TurboEvent} from "../../../../build/turbodombuilder.esm";
import {circle} from "../circle/circle";
import {Canvas} from "../canvas/canvas";

//Add circle tool
export class AddCircleTool extends TurboTool {
    public toolName: string = "addCircle"; //Define the tool name

    //Equivalent to turbo(tool).addToolBehavior("click", "addCircle", (e, target) => {...});
    public click(e: TurboEvent, target: Node) {
        if (target instanceof Canvas) circle({parent: target, position: e.position?.sub(50)});
    }
}