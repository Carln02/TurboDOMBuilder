import {Coordinate, turbo, TurboDragEvent, TurboTool} from "../../../../../build/turbodombuilder.esm";

export class SelectTool extends TurboTool {
    public toolName = "select";

    public onActivation() {
        turbo(this).toggleClass("selected", true);
    }

    public onDeactivation() {
        turbo(this).toggleClass("selected", false);
    }

    public drag(e: TurboDragEvent, target: Node): boolean {
        if ("origin" in target && typeof target.origin === "object") {
            target.origin = e.scaledDeltaPosition.add(target.origin as Coordinate).object;
            return true;
        }
    }
}