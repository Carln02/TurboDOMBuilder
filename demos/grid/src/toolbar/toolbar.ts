import {define, TurboElement, turbo, effect, signal, element, auto} from "../../../../build/turbodombuilder.esm";
import "./toolbar.css";
import {ToolbarProperties} from "./toolbar.types";

@define("demo-toolbar")
export class Toolbar extends TurboElement {
    @signal public color: string = "white";

    @auto() public set entries(value: HTMLElement[]) {
        value.forEach(entry => this.addTool(entry));
    }

    public addTool(tool: HTMLElement) {
        turbo(this).addChild(tool);
    }

    @effect private updateBackground() {
        turbo(this).setStyle("backgroundColor", this.color);
    }
}