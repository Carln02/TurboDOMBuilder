import {TurboTool, TurboEvent} from "../../../../build/turbodombuilder.esm";
import {square} from "../square/square";

//Add square tool
export class AddSquareTool extends TurboTool {
    public toolName: string = "addSquare"; //Define the tool name

    //Equivalent to turbo(tool).addToolBehavior("click", "addSquare", (e, target) => {...});
    public click(e: TurboEvent, target: Node): boolean {
        if (target === document.body) {
            square({parent: document.body, position: e.position?.sub(50)});
            return true;
        }
    }
}