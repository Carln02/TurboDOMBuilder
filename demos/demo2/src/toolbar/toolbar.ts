import {define, TurboElement, turbo, effect, signal, element, TurboElementProperties} from "../../../../build/turbodombuilder.esm";
import "./toolbar.css";

@define("demo-toolbar")
export class Toolbar extends TurboElement {
    @signal public color: string = "white";

    public initialize() {
        super.initialize();
        effect(() => turbo(this).setStyle("backgroundColor", this.color));
    }

    public addTool(tool: HTMLElement) {
        turbo(this).addChild(tool);
    }
}

export function toolbar(properties: TurboElementProperties) {
    return element({...properties, tag: "demo-toolbar"}) as Toolbar;
}