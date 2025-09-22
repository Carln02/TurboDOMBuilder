import {define, TurboElement, $, TurboElementProperties} from "../../../../build/turbodombuilder.esm";
import "./toolbar.css";

@define("demo-toolbar")
export class Toolbar extends TurboElement {
    public constructor(properties: TurboElementProperties = {}) {
        super(properties);
    }

    public addTool(tool: TurboElement) {
        $(this).addChild(tool);
    }
}