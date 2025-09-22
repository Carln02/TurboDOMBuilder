import {TurboTool, TurboDragEvent, $, Coordinate} from "../../../../build/turbodombuilder.esm";

export class SelectTool extends TurboTool {
    public toolName = "select";

    public onActivation() {
        $(this.element).toggleClass("active-tool", true);
    }

    public onDeactivation() {
        $(this.element).toggleClass("active-tool", false);
    }

    public drag(e: TurboDragEvent, el: Node): boolean {
        try {
            if ("move" in el && typeof el.move === "function") el.move(e.deltaPosition);
            else if ("translate" in el && typeof el.translate === "function") el.translate(e.deltaPosition);
            else if ("position" in el && typeof el.position === "object") el.position = e.deltaPosition.add(el.position as Coordinate);
            else return false;
            return true;
        } catch (e) {return false}
    }
}