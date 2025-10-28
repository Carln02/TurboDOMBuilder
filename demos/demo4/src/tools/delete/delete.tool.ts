import {TurboTool} from "../../../../../build/turbodombuilder.esm";

export class DeleteTool extends TurboTool {
    public toolName = "delete";

    public click(e: Event, target: Node): boolean {
        if ("delete" in target && typeof target.delete === "function") {
            target.delete();
            return true;
        }
    }
}