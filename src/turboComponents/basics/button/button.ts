import {TurboButtonConfig} from "./button.types";
import "./button.css";
import {define} from "../../../domBuilding/decorators/define";
import {ValidTag} from "../../../domBuilding/core.types";
import {TurboRichElement} from "../richElement/richElement";
import {auto} from "../../../domBuilding/decorators/auto/auto";
import {TurboRichElementProperties} from "../richElement/richElement.types";

/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
@define("turbo-button")
class TurboButton<ElementTag extends ValidTag = "p"> extends TurboRichElement<ElementTag> {

    static readonly config: TurboButtonConfig = {defaultTextTag: "h4"};

    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboRichElementProperties<ElementTag>) {
        super(properties);
    }

    /**
     * @description The tag of the text element in the button
     */
    @auto({callBefore: (value: ElementTag) => TurboRichElement.config.defaultElementTag || "h4"})
    public set elementTag(value: ElementTag) {}
}

function button<ElementTag extends ValidTag = "p">(properties: TurboRichElementProperties<ElementTag>)
    : TurboButton<ElementTag> {
    return new TurboButton<ElementTag>(properties);
}

export {TurboButton, button};