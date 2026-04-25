import {define, signal, turbo, DefaultEventName, TurboButton, effect, input, Color} from "../../../../../build/turbodombuilder.esm";
import {BucketTool} from "./bucket.tool";

//Custom element for the bucket tool
export class Bucket extends TurboButton {
    @signal private _color: Color = new Color(); //Signal to fire @effect callbacks when the value changes

    private colorInput: HTMLInputElement;

    public static defaultProperties = {
        tools: BucketTool
    };

    public get color(): Color {
        return this._color;
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
        turbo(this.colorInput).on(DefaultEventName.input, () => {this._color = Color.from(this.colorInput.value)});
    }

    @effect private updateBorderColor() {
        turbo(this).setStyle("borderColor", this._color.toString());
    }
}

define(Bucket, "demo-bucket");