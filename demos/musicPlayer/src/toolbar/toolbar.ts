import "./toolbar.css";
import {define, element, turbo, TurboElement, TurboElementProperties} from "../../../../build/turbodombuilder.esm";

@define("turbo-toolbar")
export class Toolbar extends TurboElement {
    public addTool(tool: HTMLElement) {
        turbo(this).addChild(tool);
    }
}

export function toolbar(properties: TurboElementProperties) {
    if (!properties.tag) properties.tag = "turbo-toolbar";
    return element({...properties}) as Toolbar;
}