import {TurboTool, TurboEvent, behavior} from "../../../../build/turbodombuilder.esm";
import {Square} from "../square/square";
import {Canvas} from "../canvas/canvas";

//Add square tool
export class AddSquareTool extends TurboTool {
    public toolName: string = "addSquare"; //Define the tool name

    //Equivalent to turbo(tool).addToolBehavior("click", "addSquare", (e, target) => {...});
    @behavior() public click(e: TurboEvent, target: Node) {
        if (target instanceof Canvas) Square.create({parent: target, position: e.position});
    }
}