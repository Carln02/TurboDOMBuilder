import {richElement, TurboRichElement} from "../richElement/richElement";
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
import {TurboInputInputInteractor} from "./input.inputInteractor";
import {Delegate} from "../../datatypes/delegate/delegate";
import {ValidElement} from "../../../types/element.types";

/**
 * @group Components
 * @category TurboInput
 */
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
    private _content: HTMLElement;
    public get content(): HTMLElement {return this._content}
    public set content(value: HTMLElement) {this._content = value}

    public defaultId: string = "turbo-input-" + randomId();
    public locked: boolean = false;
    public selectTextOnFocus: boolean = false;
    public dynamicVerticalResize: boolean = false;

    public inputRegexCheck: RegExp | string;
    public blurRegexCheck: RegExp | string;

    private lastValidForInput = "";
    private lastValidForBlur = "";

    public readonly onFocus: Delegate<() => void> = new Delegate();
    public readonly onBlur: Delegate<() => void> = new Delegate();
    public readonly onInput: Delegate<() => void> = new Delegate();

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

    public initialize() {
        super.initialize();
        this.mvc.generate({interactors: [TurboInputInputInteractor]});
        this.mvc.getInteractor("__input__interactor__").target = this.content;
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

    protected setupChangedCallbacks() {
        super.setupChangedCallbacks();
        this.mvc.emitter.add("processValue", () => this.processInputValue());
    }

    public get value(): ValueType {
        const value = this.element?.value;
        try {
            const num = parseFloat(value);
            if (!isNaN(num)) return num as ValueType;
        } catch {}
        return value as ValueType;
    }

    public set value(value: string | ValueType) {
        if (!(this.element instanceof HTMLInputElement) && !(this.element instanceof HTMLTextAreaElement)) return;
        let strValue = value.toString();
        if (this.blurRegexCheck) {
            const re = new RegExp(this.blurRegexCheck as any);
            if (!re.test(strValue)) strValue = this.lastValidForBlur;
        }
        this.element.value = strValue;
        this.mvc.emitter.fire("valueSet");
    }

    protected processInputValue(value: string = this.element.value) {
        if (this.inputRegexCheck) {
            const re = new RegExp(this.inputRegexCheck as any);
            if (!re.test(value)) {
                const attemptSanitize = this.sanitizeByRegex(value, this.inputRegexCheck);
                if (re.test(attemptSanitize)) value = attemptSanitize;
                else value = this.lastValidForInput;
            }
        }

        this.lastValidForInput = value.toString();
        if (this.blurRegexCheck) {
            const re = new RegExp(this.blurRegexCheck as any);
            if (re.test(value.toString())) this.lastValidForBlur = value;
        } else {
            this.lastValidForBlur = value;
        }

        this.element.value = value;
        this.onInput.fire();
    }

    private sanitizeByRegex(value: string, rule: RegExp | string): string {
        const src = typeof rule === "string" ? rule : rule.source;
        const flags = typeof rule === "string" ? "" : rule.flags.replace("g", "");
        const re = new RegExp(src, flags);

        let out = "";
        for (const ch of value) {
            const candidate = out + ch;
            re.lastIndex = 0;
            if (re.test(candidate)) out = candidate;
        }
        return out;
    }
}

/**
 * @group Components
 * @category TurboInput
 */
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
    if (!properties.tag) properties.tag = "turbo-input";
    return richElement({...properties, input: undefined, inputTag: undefined}) as any;
}

export {TurboInput, turboInput};