import {define, signal, TurboButton, TurboButtonProperties, $, DefaultEventName, effect, input} from "../../../../../build/turbodombuilder.esm";
import {BucketTool} from "./bucket.tool";

@define("demo-bucket")
export class Bucket extends TurboButton {
    @signal private _color: string = "#000000";

    private colorInput: HTMLInputElement;

    public constructor(properties: TurboButtonProperties) {
        super(properties as any);
        this.mvc.generate({tools: BucketTool});
        this.initializeUI();
    }

    public get color(): string {
        return this._color.toString();
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
        $(this.colorInput).on(DefaultEventName.input, () => this._color = this.colorInput.value);
    }

    protected setupChangedCallbacks() {
        super.setupChangedCallbacks();
        effect(() => $(this).setStyle("borderColor", this._color));
    }
}