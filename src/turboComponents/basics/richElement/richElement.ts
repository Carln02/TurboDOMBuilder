import {icon, TurboIcon} from "../icon/icon";
import {TurboRichElementConfig, TurboRichElementProperties} from "./richElement.types";
import {TurboView} from "../../../mvc/core/view";
import {ValidElement, ValidTag} from "../../../core.types";
import {TurboModel} from "../../../mvc/core/model";
import {define} from "../../../decorators/define/define";
import {TurboElement} from "../../../turboElement/turboElement";
import {$} from "../../../turboFunctions/turboFunctions";
import {auto} from "../../../decorators/auto/auto";
import {element} from "../../../elementCreation/element";
import {TurboProperties} from "../../../turboFunctions/element/element.types";
import {TurboEmitter} from "../../../mvc/core/emitter";

/**
 * Class for creating a rich turbo element (an element that is possibly accompanied by icons (or other elements) on
 * its left and/or right).
 * @class TurboRichElement
 * @extends TurboElement
 * @template {ValidTag} ElementTag - The tag of the main element to create the rich element from.
 */
@define("turbo-rich-element")
class TurboRichElement<
    ElementTag extends ValidTag = any,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    public static readonly config: TurboRichElementConfig = {
        ...TurboElement.config,
        defaultElementTag: "h4"
    };

    public readonly childrenOrder = ["leftCustomElements", "leftIcon",
        "prefixEntry", "element", "suffixEntry", "rightIcon", "rightCustomElements"] as const;

    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {Element | Element[] | null} element - The element(s) to add.
     * @param {this["childrenOrder"][number]} type - The type of child element being added.
     */
    private addAtPosition(element?: Element | Element[], type?: this["childrenOrder"][number]) {
        if (!element || !type) return;
        let nextSiblingIndex = 0;
        for (let i = 0; i < this.childrenOrder.length; i++) {
            const key = this.childrenOrder[i];
            if (key === type) break;
            if (this[key]) nextSiblingIndex++;
        }
        $(this).addChild(element, nextSiblingIndex);
    }

    /**
     * @description The tag of the text element in the button
     */
    @auto({initialValueCallback: function () {return this.getPropertiesValue(undefined, "defaultElementTag", "h4")}})
    public elementTag: ElementTag;

    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    @auto({executeSetterBeforeStoring: true})
    public set leftCustomElements(value: Element | Element[]) {
        $(this).remChild(this.leftCustomElements);
        this.addAtPosition(value, "leftCustomElements");
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    public get leftIcon(): TurboIcon {return}

    @auto({executeSetterBeforeStoring: true})
    public set leftIcon(value: string | TurboIcon) {
        if (typeof value == "string") {
            if (this.leftIcon) {
                this.leftIcon.icon = value;
                return;
            }
            value = icon({icon: value});
        }
        $(this).remChild(this.leftIcon);
        this.addAtPosition(value as TurboIcon, "leftIcon");
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    public get prefixEntry(): HTMLElement {return}

    @auto({executeSetterBeforeStoring: true})
    public set prefixEntry(value: string | HTMLElement) {
        if (typeof value == "string") {
            if (this.prefixEntry) {
                this.prefixEntry.innerText = value;
                return;
            }
            value = element({text: value}) as HTMLElement;
        }
        $(this).remChild(this.prefixEntry);
        this.addAtPosition(value as HTMLElement, "prefixEntry");
    }

    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    public get element(): ValidElement<ElementTag> {return}

    @auto({executeSetterBeforeStoring: true})
    public set element(value: string | TurboProperties<ElementTag> | ValidElement<ElementTag>) {
        if (typeof value == "string") {
            if (this.element && "innerText" in this.element) {
                this.element.innerText = value;
                return;
            }
            value = element({tag: this.elementTag, text: value} as TurboProperties<ElementTag>);
        } else if (typeof value == "object" && !(value instanceof Element)) {
            value = element(value);
        }
        $(this).remChild(this.element);
        this.addAtPosition(value, "element");
    }

    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    public get text(): string {
        const element = this.element;
        if (!element) return "";
        if ("innerText" in element) return element.innerText;
        return element.innerHTML;
    }

    public set text(value: string) {
        if (!value) return;
        this.element = value;
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    public get suffixEntry(): HTMLElement {return}

    @auto({executeSetterBeforeStoring: true})
    public set suffixEntry(value: string | HTMLElement) {
        if (typeof value == "string") {
            if (this.suffixEntry) {
                this.suffixEntry.innerText = value;
                return;
            }
            value = element({text: value}) as HTMLElement;
        }

        $(this).remChild(this.suffixEntry);
        this.addAtPosition(value, "suffixEntry");
    }

    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    public get rightIcon(): TurboIcon {return}

    @auto({executeSetterBeforeStoring: true})
    public set rightIcon(value: string | TurboIcon) {
        if (typeof value == "string") {
            if (this.rightIcon) {
                this.rightIcon.icon = value;
                return;
            }
            value = icon({icon: value});
        }

        $(this).remChild(this.rightIcon);
        this.addAtPosition(value, "rightIcon");
    }

    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    @auto({executeSetterBeforeStoring: true})
    public set rightCustomElements(value: Element | Element[]) {
        $(this).remChild(this.rightCustomElements);
        this.addAtPosition(value, "rightCustomElements");
    }
}

function richElement<
    ElementTag extends ValidTag = any,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
>(properties: TurboRichElementProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>):
    TurboRichElement<ElementTag, ViewType, DataType, ModelType, EmitterType> {
    if (properties.text && !properties.element) properties.element = properties.text;
    return element({...properties, text: undefined, tag: "turbo-rich-element"} as any) as any;
}

export {TurboRichElement, richElement};