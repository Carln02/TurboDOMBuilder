import {TurboTool, TurboDragEvent, Coordinate, Propagation, behavior} from "../../../../build/turbodombuilder.esm";

//Select tool
export class SelectTool extends TurboTool {
    public toolName = "select"; //Define the tool name

    //Equivalent to turbo(tool).addToolBehavior("turbo-drag", "select", (e, el) => {...});
    @behavior() public drag(e: TurboDragEvent, el: Node) {
        try {
            if ("modifiable" in el && !el.modifiable) return Propagation.propagate;
            else if ("move" in el && typeof el.move === "function") el.move(e.deltaPosition);
            else if ("translate" in el && typeof el.translate === "function") el.translate(e.deltaPosition);
            else if ("position" in el && typeof el.position === "object") el.position = e.deltaPosition.add(el.position as Coordinate);
            else return Propagation.propagate;
            return Propagation.stopPropagation;
        } catch (e) {return Propagation.stopPropagation}
    }
}