import {ValidTag} from "../../core.types";
import {TurboProperties} from "../../turboFunctions/element/element.types";
import {TurboHeadlessProperties} from "../turboHeadlessElement/turboHeadlessElement.types";
import {TurboView} from "../../mvc/core/view";
import {TurboEmitter} from "../../mvc/core/emitter";
import {TurboModel} from "../../mvc/core/model";
import {TurboElementDefaultInterface} from "../setup/default/default.types";
import {TurboElementMvcInterface} from "../setup/mvc/mvc.types";
import {TurboElementUiInterface} from "../setup/ui/ui.types";

type TurboProxiedProperties<
    Tag extends ValidTag = "div",
    ViewType extends TurboView = TurboView,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboProperties<Tag> & TurboHeadlessProperties<ViewType, DataType, ModelType, EmitterType>;

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