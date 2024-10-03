import { TurboRichElementProperties } from "../richElement/richElement.types";
type TurboInputProperties<InputTag extends "input" | "textarea" = "input"> = TurboRichElementProperties<InputTag> & {
    label?: string;
    locked?: boolean;
    dynamicVerticalResize?: boolean;
    inputRegexCheck?: RegExp | string;
    blurRegexCheck?: RegExp | string;
    selectTextOnFocus?: boolean;
};
export { TurboInputProperties };
