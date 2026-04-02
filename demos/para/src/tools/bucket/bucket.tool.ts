import {TurboTool, TurboEvent, Propagation, behavior} from "../../../../../build/turbodombuilder.esm";
import {Bucket} from "./bucket";

//Bucket tool
export class BucketTool extends TurboTool<Bucket> {
    public toolName = "bucket"; //Define the tool name

    //Equivalent to turbo(tool).addToolBehavior("click", "bucket", (e, el) => {...});
    @behavior() public click(e: TurboEvent, el: Element) {
        if ("color" in el && typeof el.color === "string" && !(el instanceof Bucket)) {
            el.color = this.element.color;
            return Propagation.stopPropagation;
        }
    }
}