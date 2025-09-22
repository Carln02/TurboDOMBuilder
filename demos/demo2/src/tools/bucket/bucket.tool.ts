import {TurboTool, $, TurboEvent} from "../../../../../build/turbodombuilder.esm";
import {Bucket} from "./bucket";

export class BucketTool extends TurboTool<Bucket> {
    public toolName = "bucket";

    public click(e: TurboEvent, el: Element) {
        if (!(el instanceof HTMLElement)) return false;
        $(el).setStyle("backgroundColor", this.element.color);
        return true;
    }
}