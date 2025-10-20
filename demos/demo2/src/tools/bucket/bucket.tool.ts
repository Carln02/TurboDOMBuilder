import {TurboTool, TurboEvent} from "../../../../../build/turbodombuilder.esm";
import {Bucket} from "./bucket";

export class BucketTool extends TurboTool<Bucket> {
    public toolName = "bucket";

    public click(e: TurboEvent, el: Element) {
        if ("color" in el && typeof el.color === "string") el.color = this.element.colorValue;
        else return false;
        return true;
    }
}