import {TurboTool, TurboEvent} from "../../../../build/turbodombuilder.esm";
import {square} from "../square/square";

export class AddSquareTool extends TurboTool {
    public toolName: string = "addSquare";

    public click(e: TurboEvent, target: Node): boolean {
        if (target === document.body) {
            square({parent: document.body, position: e.position?.sub(50)});
            return true;
        }
        return false;
    }
}