import {TurboProperties} from "../../../domBuilding/turboElement/turboElement.types";

type ValidInputElement<Tag extends "input" | "textarea"> = Tag extends "input" ? HTMLInputElement : HTMLTextAreaElement;

type TurboInputProperties<InputTag extends "input" | "textarea" = "input"> = TurboProperties & {
    inputTag?: InputTag,
    inputProperties?: TurboProperties<InputTag>,
    label?: string,
    prefix?: string
    suffix?: string,

    locked?: boolean,
    dynamicVerticalResize?: boolean,
    regexCheck?: RegExp | string,

    selectTextOnFocus?: boolean,
    onClick?: (e: Event) => void,
    onInput?: (e: Event) => void,
    onBlur?: (e: Event) => void,
};

export {ValidInputElement, TurboInputProperties};