import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {richElement, TurboRichElement} from "../richElement/richElement";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {TurboElement} from "../../../turboElement/turboElement";
import {element} from "../../../elementCreation/element";
import {TurboProperties} from "../../../turboFunctions/element/element.types";
import {$} from "../../../turboFunctions/turboFunctions";
import {auto} from "../../../decorators/auto/auto";
import {TurboEmitter} from "../../../mvc/core/emitter";

@define("turbo-input")
class TurboInput<
    InputTag extends "input" | "textarea" = "input",
    ValueType extends string | number = string,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    protected labelElement: HTMLLabelElement;
    public inputElement: TurboRichElement<InputTag>;

    public locked: boolean = false;
    public  dynamicVerticalResize: boolean = false;
    public selectTextOnFocus: boolean = false;

    private lastValueWithInputCheck: string = "";
    private lastValueWithBlurCheck: string = "";

    public inputRegexCheck: RegExp | string;
    public blurRegexCheck?: RegExp | string;

    @auto() public set label(value: string) {
        if (!value || value.length === 0) {
            if (this.labelElement) this.labelElement.remove();
            return;
        }

        if (!this.labelElement) {
            this.labelElement = element({tag: "label"}) as HTMLLabelElement;
            $(this).addChild(this.labelElement, 0);
        }

        this.labelElement.textContent = value;
    }

    protected setupUIElements() {
        super.setupUIElements();
        //TODO MAYBE MAKE THIS EL EXTEND ITSELF TURBORICHELEMENT
            // this.inputElement = richElement({
            //     elementTag: properties.elementTag || "input" as InputTag,
            //     element: properties.element || element({tag: properties.elementTag || "input"} as TurboProperties<InputTag>),
            //     parent: this
            // });
    }

    protected setupUIListeners() {
        super.setupUIListeners();
        //TODO $(this.inputElement.element).bypassManagerOn = () => true;

        $(this.inputElement).on(DefaultEventName.blur, (e: Event) => {
            if (this.blurRegexCheck && this.stringValue != this.lastValueWithBlurCheck)
                this.stringValue = this.lastValueWithBlurCheck;
            this.dispatchEvent(new FocusEvent(DefaultEventName.blur, e));
        });

        $(this.inputElement).on(DefaultEventName.focus, (e: Event) => {
            if (this.locked) this.inputElement.blur();
            if (this.selectTextOnFocus) this.inputElement.element.select();
            this.dispatchEvent(new FocusEvent(DefaultEventName.focus, e));
        });

        $(this.inputElement).on(DefaultEventName.input, (e: Event) => {
            if (this.dynamicVerticalResize) {
                this.inputElement.style.height = "";
                this.inputElement.style.height = this.inputElement.scrollHeight + "px";
            }

            if (this.inputRegexCheck) {
                const regex = new RegExp(this.inputRegexCheck, "g");
               if (!regex.test(this.stringValue)) this.stringValue = this.lastValueWithInputCheck;
            }
            this.lastValueWithInputCheck = this.stringValue;

            if (this.blurRegexCheck) {
                const regex = new RegExp(this.blurRegexCheck, "g");
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