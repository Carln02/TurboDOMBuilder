import {ValidElement, ValidTag} from "../../../types/element.types";
import {TurboView} from "../../../mvc/view/view";
import {TurboModel} from "../../../mvc/model/model";
import {TurboEmitter} from "../../../mvc/emitter/emitter";
import {TurboRichElement} from "../richElement/richElement";
import {define} from "../../../decorators/define/define";
import {effect, signal} from "../../../decorators/reactivity/reactivity";
import {randomId} from "../../../utils/computations/random";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {TurboProperties} from "../../../turboFunctions/element/element.types";
import {div} from "../../../elementCreation/basicElements";
import {TurboLabelElementProperties} from "./labelElement.types";
import {element} from "../../../elementCreation/element";

class TurboLabelElement<
    ElementTag extends ValidTag = any,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboRichElement<ElementTag, ViewType, DataType, ModelType, EmitterType> {
    public declare readonly properties: TurboLabelElementProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>;

    @signal public defaultId: string = "turbo-id-" + randomId();

    @signal protected labelElement: HTMLLabelElement;
    public content: HTMLElement;

    public set label(value: string) {
        if (!value || value.length === 0) {
            if (this.labelElement) this.labelElement.remove();
            return;
        }

        if (!this.labelElement) {
            this.labelElement = element({tag: "label"});
            turbo(this).childHandler = this;
            turbo(this).addChild(this.labelElement, 0);
            if (this.content) turbo(this).childHandler = this.content;
        }

        this.labelElement.textContent = value;
    }

    public get label(): string {
        return this.labelElement?.textContent;
    }

    @signal public get element(): ValidElement<ElementTag> {
        return super.element;
    }

    public set element(value: TurboProperties<ElementTag> | ValidElement<ElementTag>) {
        super.element = value;
        if (this.element) {
            if (!this.element.id) this.element.id = this.defaultId;
            else if (this.labelElement) this.labelElement.htmlFor = this.element.id;
        }
    }

    protected setupUIElements() {
        super.setupUIElements();
        this.content = div();
    }

    protected setupUILayout() {
        super.setupUILayout();
        turbo(this.content).addChild(turbo(this).childrenArray);
        turbo(this).addChild([this.labelElement, this.content]);
        turbo(this).childHandler = this.content;
    }

    @effect private updateId() {
        if (this.element && !this.element.id) this.element.id = this.defaultId;
        if (this.labelElement) this.labelElement.htmlFor = this.element?.id ?? this.defaultId;
    }
}

define(TurboLabelElement);
export {TurboLabelElement};