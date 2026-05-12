import {define} from "../../../decorators/define/define";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {TurboInputProperties} from "./input.types";
import {randomId} from "../../../utils/computations/random";
import {TurboProperties} from "../../../turboFunctions/element/element.types";
import {TurboInputInputInteractor} from "./input.inputInteractor";
import {Delegate} from "../../datatypes/delegate/delegate";
import {ValidElement} from "../../../types/element.types";
import {expose} from "../../../decorators/expose";
import {Propagation} from "../../../turboFunctions/event/event.types";
import {DefaultEventName} from "../../../types/eventNaming.types";
import {markDirty, signal} from "../../../decorators/reactivity/reactivity";
import {TurboLabelElement} from "../labelElement/labelElement";

/**
 * @group Components
 * @category TurboInput
 */
class TurboInput<
    InputTag extends "input" | "textarea" = "input",
    ValueType = string,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter,
> extends TurboLabelElement<InputTag, ViewType, DataType, ModelType, EmitterType> {
    public declare readonly properties: TurboInputProperties<InputTag, ValueType, ViewType, DataType, ModelType, EmitterType>;

    public static defaultProperties: TurboInputProperties = {
        inputTag: "input",
        interactors: TurboInputInputInteractor
    };

    protected static customCreate(properties: TurboInputProperties): object {
        const element: object = properties.input ?? {};
        const elementTag: any = properties.inputTag ?? "input";
        const value = properties.value;
        const input = super.customCreate({...properties, elementTag, element,
            value: undefined, input: undefined, inputTag: undefined});
        if (value !== undefined && value !== null) (input as any).value = value;
        return input;
    }

    @signal public locked: boolean = false;
    @signal public selectTextOnFocus: boolean = false;
    @signal public dynamicVerticalResize: boolean = false;

    public inputRegexCheck: RegExp | string;
    public blurRegexCheck: RegExp | string;

    private lastValidForInput = "";
    private lastValidForBlur = "";

    public readonly onFocus: Delegate<() => void> = new Delegate();
    public readonly onBlur: Delegate<() => void> = new Delegate();
    public readonly onInput: Delegate<() => void> = new Delegate();

    public get input(): ValidElement<InputTag> {
        return this.element;
    }

    public set input(value: TurboProperties<InputTag> | ValidElement<InputTag>) {
        this.element = value;
    }

    @signal public get element(): ValidElement<InputTag> {
        return super.element;
    }

    public set element(value: TurboProperties<InputTag> | ValidElement<InputTag>) {
        if (!(value instanceof Node) && typeof value === "object") {
            if (!value.name) (value as any).name = randomId();
            if (this.elementTag === "input" && !value.type) (value as any).type = "text";
        }
        super.element = value;
    }

    @expose("element") public accessor type: string;
    @expose("element") public accessor placeholder: string;
    @expose("element") public accessor pattern: string;
    @expose("element") public accessor size: string;

    protected setupChangedCallbacks() {
        super.setupChangedCallbacks();
        this.emitter.add("processValue", () => this.processInputValue());
    }

    protected setupUIListeners() {
        super.setupUIListeners();
        turbo(this).on(DefaultEventName.click, () => {
            if (!this.locked) this.element?.focus();
            return Propagation.propagate;
        });
    }

    @signal public get value(): ValueType {
        const value = this.rawValue;
        if (!value) return undefined;
        try {
            const num = parseFloat(value);
            if (!isNaN(num)) return num as ValueType;
        } catch {}
        try {
            const current = this.value;
            if (current && typeof current === "object" && "fromString" in current
                && typeof current.fromString === "function") return current.fromString(value) as ValueType;
        } catch {}
        try {return JSON.parse(value) as ValueType;} catch {}
        return value as ValueType;
    }

    public set value(value: ValueType) {
        this.rawValue = value.toString();
    }

    @signal public get rawValue(): string {
        return this.element?.value ?? "";
    }

    public set rawValue(value: string) {
        if (!(this.element instanceof HTMLInputElement) && !(this.element instanceof HTMLTextAreaElement)) return;
        let strValue = value.toString();
        if (this.blurRegexCheck) {
            const re = new RegExp(this.blurRegexCheck as any);
            if (!re.test(strValue)) strValue = this.lastValidForBlur;
        }
        this.element.value = strValue;
        this.emitter.fire("valueSet");
    }

    public setValueSilently(value: ValueType) {
        if (!(this.element instanceof HTMLInputElement) && !(this.element instanceof HTMLTextAreaElement)) return;
        this.element.value = typeof (value as any)?.toString === "function" ? (value as any).toString() : String(value);
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

        if (this.element instanceof HTMLInputElement || this.element instanceof HTMLTextAreaElement)
            this.element.value = value;
        markDirty(this, "rawValue");
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

define(TurboInput);
export {TurboInput};