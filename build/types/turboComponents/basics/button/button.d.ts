import { TurboButtonConfig } from "./button.types";
import "./button.css";
import { ValidTag } from "../../../domBuilding/core.types";
import { TurboRichElement } from "../richElement/richElement";
import { TurboRichElementProperties } from "../richElement/richElement.types";
/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
declare class TurboButton<ElementTag extends ValidTag = "p"> extends TurboRichElement<ElementTag> {
    static readonly config: TurboButtonConfig;
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboRichElementProperties<ElementTag>);
    /**
     * @description The tag of the text element in the button
     */
    set elementTag(value: ElementTag);
}
declare function button<ElementTag extends ValidTag = "p">(properties: TurboRichElementProperties<ElementTag>): TurboButton<ElementTag>;
export { TurboButton, button };
