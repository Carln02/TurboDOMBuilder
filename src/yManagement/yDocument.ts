import {YDoc, YDocumentProperties} from "./yManagement.types";
import {TurboElement} from "../turboElement/turboElement";
import {TurboView} from "../mvc/core/view";
import {TurboModel} from "../mvc/core/model";
import {TurboEmitter} from "../mvc/core/emitter";

class YDocument<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    protected readonly document: YDoc;

    public constructor(properties: YDocumentProperties<ViewType, DataType, ModelType, EmitterType>) {
        super(properties);
        this.document = properties.document;
    }
}

export {YDocument};