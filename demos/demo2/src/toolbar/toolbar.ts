import {define, TurboElement, $, TurboElementProperties, effect, signal} from "../../../../build/turbodombuilder.esm";
import "./toolbar.css";

@define("demo-toolbar")
export class Toolbar extends TurboElement {
    @signal public color: string = "white";

    public constructor(properties: TurboElementProperties = {}) {
        super(properties);
        effect(() => $(this).setStyle("backgroundColor", this.color));
    }

    public addTool(tool: TurboElement) {
        $(this).addChild(tool);
    }
}