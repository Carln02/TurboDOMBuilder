import {TurboTool, TurboEvent, Propagation, behavior, turbo} from "../../../../build/turbodombuilder.esm";
import {Canvas} from "../canvas/canvas";
import {StickyLine} from "../stickyLine/stickyLine";

//Add square tool
export class AddStickyLineTool extends TurboTool {
    public toolName: string = "addStickyLine"; //Define the tool name

    //Equivalent to turbo(tool).addToolBehavior("click", "addSquare", (e, target) => {...});
    @behavior() public click(e: TurboEvent, target: Node) {
        if (target instanceof Canvas) {
            const x = StickyLine.create({parent: target, origin: e.scaledPosition});
            return Propagation.stopPropagation;
        }
    }
}