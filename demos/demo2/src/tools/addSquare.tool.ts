import {TurboTool, TurboEvent} from "../../../../build/turbodombuilder.esm";
import {square} from "../square/square";
import {Canvas} from "../canvas/canvas";

//Add square tool
export class AddSquareTool extends TurboTool {
    public toolName: string = "addSquare"; //Define the tool name

    //Equivalent to turbo(tool).addToolBehavior("click", "addSquare", (e, target) => {...});
    public click(e: TurboEvent, target: Node) {
        if (target instanceof Canvas) square({parent: target, position: e.position?.sub(50)});
    }
}