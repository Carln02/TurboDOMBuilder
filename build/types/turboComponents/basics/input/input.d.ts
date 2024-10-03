import { TurboElement } from "../../../domBuilding/turboElement/turboElement";
import { TurboInputProperties } from "./input.types";
import { TurboRichElement } from "../richElement/richElement";
declare class TurboInput<InputTag extends "input" | "textarea" = "input", ValueType extends string | number = string> extends TurboElement {
    readonly labelElement: HTMLLabelElement;
    readonly inputElement: TurboRichElement<InputTag>;
    locked: boolean;
    private lastValueWithInputCheck;
    private lastValueWithBlurCheck;
    constructor(properties?: TurboInputProperties<InputTag>);
    private setupEvents;
    protected set stringValue(value: string);
    protected get stringValue(): string;
    get value(): ValueType;
    set value(value: string | ValueType);
}
declare function turboInput<InputTag extends "input" | "textarea" = "input", ValueType extends string | number = string>(properties?: TurboInputProperties<InputTag>): TurboInput<InputTag, ValueType>;
export { TurboInput, turboInput };
