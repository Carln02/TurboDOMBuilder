import {TurboTool, TurboEvent} from "../../../../build/turbodombuilder.esm";
import {circle} from "../circle/circle";

//Add circle tool
export class AddCircleTool extends TurboTool {
    public toolName: string = "addCircle"; //Define the tool name

    //Equivalent to turbo(tool).addToolBehavior("click", "addCircle", (e, target) => {...});
    public click(e: TurboEvent, target: Node): boolean {
        if (target === document.body) {
            circle({parent: document.body, position: e.position?.sub(50)});
            return true;
        }
    }
}