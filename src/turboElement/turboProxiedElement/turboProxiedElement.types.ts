import {TurboProperties} from "../../turboFunctions/element/element.types";
import {TurboHeadlessProperties} from "../turboHeadlessElement/turboHeadlessElement.types";
import {TurboView} from "../../mvc/view/view";
import {TurboEmitter} from "../../mvc/emitter/emitter";
import {TurboModel} from "../../mvc/model/model";
import {TurboElementDefaultInterface} from "../setup/default/default.types";
import {TurboElementMvcInterface} from "../setup/mvc/mvc.types";
import {TurboElementUiInterface} from "../setup/ui/ui.types";
import {ValidTag} from "../../types/element.types";

/**
 * @group TurboElement
 * @category TurboProxiedElement
 */
type TurboProxiedProperties<
    Tag extends ValidTag = "div",
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboProperties<Tag> & TurboHeadlessProperties<ViewType, DataType, ModelType, EmitterType> & {
    unsetDefaultClasses?: boolean,
    shadowDOM?: boolean,
    defaultSelectedClasses?: string | string[]
    defaultClasses?: string | string[],
};

declare module "./turboProxiedElement" {
    interface TurboProxiedElement extends TurboElementDefaultInterface {}

    interface TurboProxiedElement<
        ElementTag extends ValidTag = ValidTag,
        ViewType extends TurboView = TurboView<any, any>,
        DataType extends object = object,
        ModelType extends TurboModel = TurboModel
    > extends TurboElementMvcInterface<ViewType, DataType, ModelType> {}

    interface TurboProxiedElement extends TurboElementUiInterface {}
}

export {TurboProxiedProperties};