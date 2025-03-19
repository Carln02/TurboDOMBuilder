import {TurboProperties} from "./turboElement.types";
import {kebabToCamelCase, parse} from "../../utils/dataManipulation/stringManipulation";
import {TurboView} from "../mvc/turboView";
import {TurboModel} from "../mvc/turboModel";
import {auto} from "../decorators/auto/auto";
import {ValidElement, ValidTag} from "../core.types";
import {blindElement} from "../elementCreation/element";
import {MvcHandler} from "../mvc/mvcHandler";
import {TurboEmitter} from "../mvc/turboEmitter";

/**
 * @class TurboProxiedElement
 * @description TurboProxiedElement class, similar to TurboElement but containing an HTML element instead of being one.
 * @template ViewType - TurboView
 * @template DataType - object
 * @template ModelType - TurboModel<DataType>
 */
class TurboProxiedElement<
    ElementTag extends ValidTag = ValidTag,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> {

    //STATIC CONFIG

    /**
     * @description Static configuration object.
     */
    public static readonly config: any = {shadowDOM: false, defaultSelectedClass: "selected"};

    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    public static configure(value: typeof this.config) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) (this.config as any)[key] = val;
        });
    }

    //ELEMENT

    public readonly element: ValidElement<ElementTag>;
    protected mvc: MvcHandler<this, ViewType, DataType, ModelType, EmitterType>;

    public constructor(properties: TurboProperties<ElementTag, ViewType, DataType, ModelType, EmitterType> =
                       {} as TurboProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>) {
        this.element = blindElement(properties);
        if (this.getPropertiesValue(properties.shadowDOM, "shadowDOM")) this.element.attachShadow({mode: "open"});
        this.mvc = new MvcHandler({...properties, element: this});
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (!newValue || newValue == oldValue) return;
        this[kebabToCamelCase(name)] = parse(newValue);
    }

    /**
     * @description Whether the element is selected or not. Setting it will accordingly toggle the "selected" CSS
     * class on the element and update the UI.
     */
    @auto()
    public set selected(value: boolean) {
        const selectedClass = this.getPropertiesValue<string>(null, "defaultSelectedClass", "selected");
        this.element.toggleClass(selectedClass, value);
    }

    protected get view(): ViewType {
        return this.mvc.view;
    }

    protected set view(view: ViewType) {
        this.mvc.view = view;
    }

    protected get model(): ModelType {
        return this.mvc.model;
    }

    protected set model(model: ModelType) {
        this.mvc.model = model;
    }

    public get data(): DataType {
        return this.mvc.data;
    }

    public set data(data: DataType) {
        this.mvc.data = data;
    }

    public get dataId(): string {
        return this.mvc.dataId;
    }

    public set dataId(value: string) {
        this.mvc.dataId = value;
    }

    public get dataIndex(): number {
        return this.mvc.dataIndex;
    }

    public set dataIndex(value: number) {
        this.mvc.dataIndex = value;
    }

    public get dataSize(): number {
        return this.mvc.dataSize;
    }

    protected getPropertiesValue<Type>(propertiesValue: Type, configFieldName?: string, defaultValue?: Type): Type {
        if (propertiesValue !== undefined && propertiesValue !== null) return propertiesValue;
        const configValue: Type = (this.constructor as typeof TurboProxiedElement).config[configFieldName];
        if (configValue !== undefined && configValue !== null) return configValue;
        return defaultValue;
    }
}

export {TurboProxiedElement};