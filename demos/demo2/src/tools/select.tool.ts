import {TurboTool, TurboDragEvent, turbo, Coordinate} from "../../../../build/turbodombuilder.esm";

//Select tool
export class SelectTool extends TurboTool {
    public toolName = "select"; //Define the tool name

    //On activation --> add class
    public onActivation() {
        turbo(this.element).toggleClass("active-tool", true);
    }

    public onDeactivation() {
        turbo(this.element).toggleClass("active-tool", false);
    }

    //Equivalent to turbo(tool).addToolBehavior("turbo-drag", "select", (e, el) => {...});
    public drag(e: TurboDragEvent, el: Node): boolean {
        try {
            if ("move" in el && typeof el.move === "function") el.move(e.deltaPosition);
            else if ("translate" in el && typeof el.translate === "function") el.translate(e.deltaPosition);
            else if ("position" in el && typeof el.position === "object") el.position = e.deltaPosition.add(el.position as Coordinate);
            else return false;
            return true; //Return true to stop the event's propagation
        } catch (e) {return false}
    }
}