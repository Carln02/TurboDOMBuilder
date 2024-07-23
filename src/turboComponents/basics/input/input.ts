import {TurboElement} from "../../../domBuilding/turboElement/turboElement";
import {TurboInputProperties, ValidInputElement} from "./input.types";
import {element} from "../../../domBuilding/elementCreation/element";
import {DefaultEventName} from "../../../eventHandling/eventNaming";
import {define} from "../../../domBuilding/decorators/define";

@define("turbo-input")
class TurboInput<InputTag extends "input" | "textarea"> extends TurboElement {
    public readonly inputElement: ValidInputElement<InputTag>;
    public readonly labelElement: HTMLLabelElement;

    public readonly prefixElement: HTMLSpanElement;
    public readonly suffixElement: HTMLSpanElement;

    public locked: boolean;

    constructor(properties: TurboInputProperties<InputTag> = {}) {
        super(properties);

        this.locked = properties.locked || false;

        if (properties.label) this.labelElement = element({tag: "label", text: properties.label, parent: this});

        const flexElement = element({parent: this});

        if (properties.prefix) this.prefixElement = element({
            tag: "span",
            text: properties.prefix,
            parent: flexElement
        });

        this.inputElement = element({
            ...properties.inputProperties,
            tag: properties.inputTag,
            parent: flexElement
        }) as ValidInputElement<InputTag>;

        if (properties.suffix) this.suffixElement = element({
            tag: "span",
            text: properties.suffix,
            parent: flexElement
        });

        this.setupEvents(properties);
    }

    private setupEvents(properties: TurboInputProperties<InputTag>) {
        if ("bypassTurboEventManager" in this.inputElement) this.inputElement.bypassTurboEventManager();

        if (properties.onClick) this.inputElement.addEventListener(DefaultEventName.click, (e: Event) => properties.onClick(e));
        if (properties.onBlur) this.inputElement.addEventListener(DefaultEventName.blur, (e: Event) => properties.onBlur(e));

        this.inputElement.addEventListener(DefaultEventName.focus, () => {
            if (this.locked) this.inputElement.blur();
            if (properties.selectTextOnFocus) this.inputElement.select();
        });

        this.inputElement.addEventListener(DefaultEventName.input, (e: Event) => {
            if (properties.dynamicVerticalResize) {
                this.inputElement.style.height = "";
                this.inputElement.style.height = this.inputElement.scrollHeight + "px";
            }
            if (properties.regexCheck) {
                const regex = properties.regexCheck instanceof RegExp
                    ? properties.regexCheck
                    : new RegExp(properties.regexCheck, "g");
                this.value = this.value.toString().replace(regex, "");
            }
            else this.value = this.value;
            if (properties.onInput) properties.onInput(e);
        });
    }

    public get value(): string | number {
        return this.inputElement.value;
    }

    public set value(value: string | number) {
        this.inputElement.value = value.toString();
    }
}

function turboInput<T extends ("input" | "textarea")>(properties: TurboInputProperties<T> = {}): TurboInput<T> {
    return new TurboInput(properties);
}

export {TurboInput, turboInput};