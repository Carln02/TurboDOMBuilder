import {TurboButtonConfig} from "./button.types";
import "./button.css";
import {TurboRichElement} from "../richElement/richElement";
import {TurboRichElementProperties} from "../richElement/richElement.types";
import {$} from "../../../turboFunctions/turboFunctions";
import {define} from "../../../decorators/define/define";
import {ValidTag} from "../../../core.types";
import {TurboView} from "../../../mvc/core/view";
import {TurboModel} from "../../../mvc/core/model";
import {auto} from "../../../decorators/auto/auto";

/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
@define()
class TurboButton<
    ElementTag extends ValidTag = "p",
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel<any>
> extends TurboRichElement<ElementTag, ViewType, DataType, ModelType> {

    public static readonly config: TurboButtonConfig = {...TurboRichElement.config, defaultElementTag: "h4"};

    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    public constructor(properties: TurboRichElementProperties<ElementTag, ViewType, DataType, ModelType>) {
        super(properties);
        if (!properties.unsetDefaultClasses) $(this).addClass(TurboButton.config.defaultClasses);
    }

    /**
     * @description The tag of the text element in the button
     */
    @auto({callBefore: (value: ElementTag) => TurboButton.config.defaultElementTag || "h4"})
    public set elementTag(value: ElementTag) {}
}

function button<ElementTag extends ValidTag = "p">(properties: TurboRichElementProperties<ElementTag>)
    : TurboButton<ElementTag> {
    return new TurboButton<ElementTag>(properties);
}

export {TurboButton, button};