import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {TurboRichElement} from "../richElement/richElement";
import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {element} from "../../../elementCreation/element";
import {$} from "../../../turboFunctions/turboFunctions";
import {auto} from "../../../decorators/auto/auto";
import {TurboEmitter} from "../../../mvc/core/emitter";
import {div} from "../../../elementCreation/basicElements";
import {TurboRichElementConfig} from "../richElement/richElement.types";
import {TurboInputProperties} from "./input.types";
import {randomId} from "../../../utils/computations/random";
import {TurboProperties} from "../../../turboFunctions/element/element.types";
import {ValidElement} from "../../../core.types";

@define("turbo-input")
class TurboInput<
    InputTag extends "input" | "textarea" = "input",
    ValueType extends string | number = string,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
> extends TurboRichElement<InputTag, ViewType, DataType, ModelType, EmitterType> {
    public static config: TurboRichElementConfig = {
        ...TurboRichElement.config,
        defaultElementTag: "input"
    };

    protected labelElement: HTMLLabelElement;
    protected content: HTMLElement;

    public locked: boolean = false;
    public selectTextOnFocus: boolean = false;

    private lastValueWithInputCheck: string = "";
    private lastValueWithBlurCheck: string = "";

    public inputRegexCheck: RegExp | string;
    public blurRegexCheck: RegExp | string;

    public dynamicVerticalResize: boolean = false;

    public defaultId: string = "turbo-input-" + randomId();

    @auto() public set label(value: string) {
        if (!value || value.length === 0) {
            if (this.labelElement) this.labelElement.remove();
            return;
        }

        if (!this.labelElement) {
            this.labelElement = element({tag: "label", htmlFor: this.element?.id ?? this.defaultId}) as HTMLLabelElement;
            $(this).childHandler = this;
            $(this).addChild(this.labelElement, 0);
            if (this.content) $(this).childHandler = this.content;
        }

        this.labelElement.textContent = value;
    }

    public set element(value: TurboProperties<InputTag> | ValidElement<InputTag>) {
        if (!(value instanceof Node) && typeof value === "object") {
            if (!value.name) (value as any).name = randomId();
            if (this.elementTag === "input" && !value.type) (value as any).type = "text";
        }
        super.element = value;
        if (this.element) {
            if (!this.element.id) this.element.id = this.defaultId;
            else if (this.labelElement) this.labelElement.htmlFor = this.element.id;
        }
    }

    public get element(): ValidElement<InputTag> {
        return super.element;
    }

    protected setupUIElements() {
        super.setupUIElements();
        this.content = div();
    }

    protected setupUILayout() {
        super.setupUILayout();
        $(this.content).addChild($(this).childrenArray);
        $(this).addChild([this.labelElement, this.content]);
        $(this).childHandler = this.content;
    }

    protected setupUIListeners() {
        super.setupUIListeners();

        $(this.element).on(DefaultEventName.click, () => {
            this.element.focus();
        });

        $(this.element).bypassManagerOn = () => true;

        $(this.element).on(DefaultEventName.blur, (e: Event) => {
            if (this.blurRegexCheck && this.stringValue != this.lastValueWithBlurCheck)
                this.stringValue = this.lastValueWithBlurCheck;
            this.dispatchEvent(new FocusEvent(DefaultEventName.blur, {...e}));
        });

        $(this.element).on(DefaultEventName.focus, (e: Event) => {
            if (this.locked) this.element.blur();
            if (this.selectTextOnFocus) this.element.select();
            this.dispatchEvent(new FocusEvent(DefaultEventName.focus, {...e}));
        });

        $(this.element).on(DefaultEventName.input, (e: Event) => {
            if (this.dynamicVerticalResize && this.element instanceof HTMLTextAreaElement) {
                this.element.style.height = "";
                this.element.style.height = this.element.scrollHeight + "px";
            }

            if (this.inputRegexCheck) {
                const regex = new RegExp(this.inputRegexCheck);
               if (!regex.test(this.stringValue)) this.stringValue = this.lastValueWithInputCheck;
            }
            this.lastValueWithInputCheck = this.stringValue;

            if (this.blurRegexCheck) {
                const regex = new RegExp(this.blurRegexCheck);
                if (regex.test(this.stringValue)) this.lastValueWithBlurCheck = this.stringValue;
            }

            if (this.stringValue.length == 0) {
                this.lastValueWithInputCheck = "0";
                this.lastValueWithBlurCheck = "0";
            }

            this.dispatchEvent(new InputEvent(DefaultEventName.input, {...e}));
        });
    }

    protected set stringValue(value: string) {
        this.element.value = value;
    }

    protected get stringValue(): string {
        return this.element.value;
    }

    public get value(): ValueType {
        const value = this.stringValue;
        try {
            const num = parseFloat(value);
            if (!isNaN(num)) return num as ValueType;
        } catch {}
        return value as ValueType;
    }

    public set value(value: string | ValueType) {
        this.stringValue = value.toString();
    }
}

function turboInput<
    InputTag extends "input" | "textarea" = "input",
    ValueType extends string | number = string,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
>(
    properties: TurboInputProperties<InputTag, ViewType, DataType, ModelType, EmitterType>
): TurboInput<InputTag, ValueType, ViewType, DataType, ModelType, EmitterType> {
    properties.element = properties.input;
    properties.elementTag = properties.inputTag;
    if (!properties.elementTag) properties.elementTag = "input";
    if (!properties.element) properties.element = {};
    return element({...properties, input: undefined, inputTag: undefined, tag: "turbo-input"}) as any;
}

export {TurboInput, turboInput};