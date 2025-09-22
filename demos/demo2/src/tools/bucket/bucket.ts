import {define, signal, TurboButtonProperties, $, DefaultEventName, TurboButton, effect, input} from "../../../../../build/turbodombuilder.esm";
import {BucketTool} from "./bucket.tool";

@define("demo-bucket")
export class Bucket extends TurboButton {
    @signal private _colorValue: string = "#000000";

    private colorInput: HTMLInputElement;

    public constructor(properties: TurboButtonProperties) {
        super(properties as any);
        this.mvc.generate({tools: BucketTool});
        this.initializeUI();
    }

    public get colorValue(): string {
        return this._colorValue.toString();
    }

    protected setupUIElements() {
        super.setupUIElements();
        this.colorInput = input({type: "color", style: "visibility: hidden; position: absolute"});
    }

    protected setupUILayout() {
        super.setupUILayout();
        $(this).addChild(this.colorInput);
    }

    protected setupUIListeners() {
        super.setupUIListeners();
        $(this).on(DefaultEventName.click, () => this.colorInput.click());
        $(this.colorInput).on(DefaultEventName.input, () => this._colorValue = this.colorInput.value);
    }

    protected setupChangedCallbacks() {
        super.setupChangedCallbacks();
        effect(() => $(this).setStyle("borderColor", this._colorValue));
    }
}