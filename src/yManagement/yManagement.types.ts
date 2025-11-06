import {
    Map as YMap,
    Array as YArray,
    AbstractType as YAbstractType,
    Text as YText,
    Doc as YDoc,
    YMapEvent,
    YArrayEvent,
    YEvent
} from "yjs";
import {TurboElementProperties} from "../turboElement/turboElement.types";
import {TurboView} from "../mvc/core/view";
import {TurboModel} from "../mvc/core/model";
import {TurboEmitter} from "../mvc/core/emitter";

declare module "yjs" {
    interface Map<MapType = any> {}

    interface Array<T = any> {}

    interface AbstractType<EventType = any> {}

    interface YEvent<T = any, EventType = any> {}

    interface YMapEvent<T = any, EventType = any> {}

    interface YArrayEvent<T = any, EventType = any> {}
}

type YDocumentProperties<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel<DataType> = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & {
    document: YDoc
};

export {
    YMap,
    YArray,
    YAbstractType,
    YText,
    YDoc,
    YEvent,
    YMapEvent,
    YArrayEvent,
    YDocumentProperties,
};