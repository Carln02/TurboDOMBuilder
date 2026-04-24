import {TurboTool, TurboEvent, Propagation, behavior, DefaultEventName} from "../../../../build/turbodombuilder.esm";
import {Square} from "../square/square";
import {Canvas} from "../canvas/canvas";

//Add square tool
export class AddSquareTool extends TurboTool {
    public toolName: string = "addSquare"; //Define the tool name

    //Equivalent to turbo(tool).addToolBehavior("click", "addSquare", (e, target) => {...});
    @behavior() public click(e: TurboEvent, target: Node) {
        if (target instanceof Canvas) {
            const square = Square.create({parent: target});
            square.position = e.scaledPosition;
            return Propagation.stopPropagation;
        }
    }
}