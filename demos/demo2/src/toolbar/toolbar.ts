import {define, TurboElement, turbo, effect, signal, element, auto} from "../../../../build/turbodombuilder.esm";
import "./toolbar.css";
import {ToolbarProperties} from "./toolbar.types";

@define("demo-toolbar")
export class Toolbar extends TurboElement {
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

export function toolbar(properties: ToolbarProperties = {}) {
    return element({...properties, tag: "demo-toolbar"}) as Toolbar;
}