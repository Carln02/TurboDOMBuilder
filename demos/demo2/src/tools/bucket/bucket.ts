import {define, signal, turbo, DefaultEventName, TurboButton, effect, input, element, TurboRichElementProperties} from "../../../../../build/turbodombuilder.esm";
import {BucketTool} from "./bucket.tool";

//Custom element for the bucket tool
@define("demo-bucket")
export class Bucket extends TurboButton {
    @signal private _color: string = "#000000"; //Signal to fire @effect callbacks when the value changes

    private colorInput: HTMLInputElement;

    public get color(): string {
        return this._color.toString();
    }

    //Function that sets up sub-elements. Called on creation.
    protected setupUIElements() {
        super.setupUIElements();
        this.colorInput = input({type: "color", style: "visibility: hidden; position: absolute"});
    }

    //Function that adds the sub-elements to the document. Called on creation.
    protected setupUILayout() {
        super.setupUILayout();
        turbo(this).addChild(this.colorInput);
    }

    //Function that sets up event listeners. Called on creation.
    protected setupUIListeners() {
        super.setupUIListeners();
        turbo(this).on(DefaultEventName.click, () => this.colorInput.click());
        turbo(this.colorInput).on(DefaultEventName.input, () => {this._color = this.colorInput.value});
    }

    @effect private updateBorderColor() {
        turbo(this).setStyle("borderColor", this._color);
    }
}

//Factory function to create bucket tool elements.
export function bucket(properties: TurboRichElementProperties = {}): Bucket {
    return element({...properties, tools: BucketTool, tag: "demo-bucket"}) as Bucket;
}