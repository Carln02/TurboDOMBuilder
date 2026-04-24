import {define, TurboElement, turbo, effect, signal, auto} from "../../../../build/turbodombuilder.esm";
import "./toolbar.css";
import {ToolbarProperties} from "./toolbar.types";

export class Toolbar extends TurboElement {
    public declare readonly properties: ToolbarProperties;

    @signal public color: string = "white";

    @auto() public set entries(value: HTMLElement[]) {
        value.forEach(entry => this.addTool(entry));
    }

    public initialize() {
        super.initialize();
        effect(() => turbo(this).setStyle("backgroundColor", this.color));
    }

    public addTool(tool: HTMLElement) {
        turbo(this).addChild(tool);
    }
}

define(Toolbar, "demo-toolbar");