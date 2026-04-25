import {TurboIcon} from "../icon/icon";
import {TurboRichElementProperties} from "./richElement.types";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {define} from "../../../decorators/define/define";
import {TurboElement} from "../../../turboElement/turboElement";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {auto} from "../../../decorators/auto/auto";
import {element} from "../../../elementCreation/element";
import {TurboProperties} from "../../../turboFunctions/element/element.types";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {ValidElement, ValidTag} from "../../../types/element.types";
import {getPrototypeChain} from "../../../utils/dataManipulation/prototype";

/**
 * @class TurboRichElement
 * @group Components
 * @category TurboRichElement
 *
 * @description Class for creating a rich turbo element (an element that is possibly accompanied by icons (or other elements) on
 * its left and/or right).
 * @extends TurboElement
 * @template {ValidTag} ElementTag - The tag of the main element to create the rich element from.
 */
class TurboRichElement<
    ElementTag extends ValidTag = any,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
     public declare readonly properties: TurboRichElementProperties;
    public static defaultProperties: TurboRichElementProperties = {
        elementTag: "h4"
    };

    protected static customCreate(properties: TurboRichElementProperties): object {
        if (properties.text && !properties.element) {
            properties.element = properties.text;
            properties.text = undefined;
        }
        if (properties.elementTag && typeof properties.element === "object" && !(properties.element instanceof Element)) {
            properties.element.tag = properties.elementTag;
        }
        return super.customCreate(properties);
    }

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
            const el = this[key];
            if (el && el instanceof Element) nextSiblingIndex++;
            else if (el && Array.isArray(el)) nextSiblingIndex += el.length;
        }
        turbo(this).addChild(element, nextSiblingIndex);
    }

    /**
     * @description The tag of the text element in the button
     */
    public elementTag: ElementTag;

    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    @auto({executeSetterBeforeStoring: true})
    public set leftCustomElements(value: Element | Element[]) {
        turbo(this).remChild(this.leftCustomElements);
        this.addAtPosition(value, "leftCustomElements");
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    @auto({
        preprocessValue: function (value: string | TurboIcon) {
            if (typeof value == "string") {
                if (this.leftIcon) {
                    this.leftIcon.icon = value;
                    return this.leftIcon;
                }
                value = TurboIcon.create({icon: value});
            }
            turbo(this).remChild(this.leftIcon);
            this.addAtPosition(value, "leftIcon");
            return value;
        }
    })
    public set leftIcon(value: string | TurboIcon) {}

    public get leftIcon(): TurboIcon {return}

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    @auto({
        preprocessValue: function (value: string | HTMLElement) {
            if (typeof value == "string") {
                if (this.prefixEntry) {
                    this.prefixEntry.textContent = value;
                    return this.prefixEntry;
                }
                value = element({text: value}) as HTMLElement;
            }
            turbo(this).remChild(this.prefixEntry);
            this.addAtPosition(value as HTMLElement, "prefixEntry");
            return value;
        }
    })
    public set prefixEntry(value: string | HTMLElement) {}

    public get prefixEntry(): HTMLElement {return}

    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's textContent with the given string.
     */
    @auto({
        preprocessValue: function (value: string | TurboProperties<ElementTag> | ValidElement<ElementTag>) {
            if (typeof value === "string") {
                if (this.element && "textContent" in this.element) {
                    this.element.textContent = value;
                    return this.element;
                }
                value = element({tag: this.elementTag, text: value} as TurboProperties<ElementTag>);
            } else if (typeof value === "object" && !(value instanceof Element)) {
                if (!value.tag) value.tag = this.elementTag;
                value = element(value);
            }
            turbo(this).remChild(this.element);
            this.addAtPosition(value, "element");
            return value;
        }
    })
    public set element(value: string | TurboProperties<ElementTag> | ValidElement<ElementTag>) {}

    public get element(): ValidElement<ElementTag> {return}

    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's textContent with the given string.
     */
    public get text(): string {
        const element = this.element;
        if (!element) return "";
        return element.textContent;
    }

    public set text(value: string) {
        if (!value) value = "";
        this.element = value;
    }

    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    @auto({
        preprocessValue: function (value: string | HTMLElement) {
            if (typeof value == "string") {
                if (this.suffixEntry) {
                    this.suffixEntry.textContent = value;
                    return this.suffixEntry;
                }
                value = element({text: value}) as HTMLElement;
            }
            turbo(this).remChild(this.suffixEntry);
            this.addAtPosition(value, "suffixEntry");
            return value;
        }
    })
    public set suffixEntry(value: string | HTMLElement) {}

    public get suffixEntry(): HTMLElement {return}

    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    @auto({
        preprocessValue: function (value: string | TurboIcon) {
            if (typeof value == "string") {
                if (this.rightIcon) {
                    this.rightIcon.icon = value;
                    return this.rightIcon;
                }
                value = TurboIcon.create({icon: value});
            }
            turbo(this).remChild(this.rightIcon);
            this.addAtPosition(value, "rightIcon");
            return value;
        }
    })
    public set rightIcon(value: string | TurboIcon) {}

    public get rightIcon(): TurboIcon {return}

    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    @auto({executeSetterBeforeStoring: true})
    public set rightCustomElements(value: Element | Element[]) {
        turbo(this).remChild(this.rightCustomElements);
        this.addAtPosition(value, "rightCustomElements");
    }
}

define(TurboRichElement);
export {TurboRichElement};