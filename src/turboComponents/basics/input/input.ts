import {TurboElement} from "../../../domBuilding/turboElement/turboElement";
import {TurboInputProperties} from "./input.types";
import {element} from "../../../domBuilding/elementCreation/element";
import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {define} from "../../../domBuilding/decorators/define";
import {TurboRichElement} from "../richElement/richElement";
import {TurboProperties} from "../../../domBuilding/turboElement/turboElement.types";
import {TurboView} from "../../../domBuilding/mvc/turboView";
import {TurboModel} from "../../../domBuilding/mvc/turboModel";
import {TurboEmitter} from "../../../domBuilding/mvc/turboEmitter";

@define("turbo-input")
class TurboInput<
    InputTag extends "input" | "textarea" = "input",
    ValueType extends string | number = string,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboElement {
    public readonly labelElement: HTMLLabelElement;
    public readonly inputElement: TurboRichElement<InputTag>;

    public locked: boolean;

    private lastValueWithInputCheck: string;
    private lastValueWithBlurCheck: string;

    constructor(properties: TurboInputProperties<InputTag, ViewType, DataType, ModelType> = {}) {
        super(properties);

        this.locked = properties.locked || false;
        this.lastValueWithInputCheck = "";
        this.lastValueWithBlurCheck = "";

        if (properties.label) this.labelElement = element({tag: "label", text: properties.label, parent: this});
        this.inputElement = new TurboRichElement({
            ...properties,
            elementTag: properties.elementTag || "input" as InputTag,
            element: properties.element || element({tag: properties.elementTag || "input"} as TurboProperties<InputTag>),
            parent: this
        });

        this.setupEvents(properties);
    }

    private setupEvents(properties: TurboInputProperties<InputTag, ViewType, DataType, ModelType>) {
        if ("bypassTurboEventManager" in this.inputElement.element) this.inputElement.element.bypassTurboEventManager();

        this.inputElement.element.addListener(DefaultEventName.blur, (e: Event) => {
            if (properties.blurRegexCheck && this.stringValue != this.lastValueWithBlurCheck)
                this.stringValue = this.lastValueWithBlurCheck;
            this.dispatchEvent(new FocusEvent(DefaultEventName.blur, e));
        });

        this.inputElement.element.addListener(DefaultEventName.focus, (e: Event) => {
            if (this.locked) this.inputElement.blur();
            if (properties.selectTextOnFocus) this.inputElement.element.select();
            this.dispatchEvent(new FocusEvent(DefaultEventName.focus, e));
        });

        this.inputElement.element.addListener(DefaultEventName.input, (e: Event) => {
            if (properties.dynamicVerticalResize) {
                this.inputElement.style.height = "";
                this.inputElement.style.height = this.inputElement.scrollHeight + "px";
            }

            if (properties.inputRegexCheck) {
                const regex = new RegExp(properties.inputRegexCheck, "g");
               if (!regex.test(this.stringValue)) this.stringValue = this.lastValueWithInputCheck;
            }
            this.lastValueWithInputCheck = this.stringValue;

            if (properties.blurRegexCheck) {
                const regex = new RegExp(properties.blurRegexCheck, "g");
                if (regex.test(this.stringValue)) this.lastValueWithBlurCheck = this.stringValue;
            }

            if (this.stringValue.length == 0) {
                this.lastValueWithInputCheck = "0";
                this.lastValueWithBlurCheck = "0";
            }

            this.dispatchEvent(new InputEvent(DefaultEventName.input, e));
        });
    }

    protected set stringValue(value: string) {
        this.inputElement.element.value = value;
    }

    protected get stringValue(): string {
        return this.inputElement.element.value;
    }

    public get value(): ValueType {
        const value = this.stringValue;
        // if (typeof value === "string" && value.trim() !== "") {
        //     if (typeof th === "number") {
        //         return parseFloat(value) as ValueType;
        //     }
        // }
        return value as ValueType;
    }

    public set value(value: string | ValueType) {
        this.stringValue = value.toString();
    }
}

export {TurboInput};