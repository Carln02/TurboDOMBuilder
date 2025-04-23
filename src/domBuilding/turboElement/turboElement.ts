import {TurboCustomProperties} from "./turboElement.types";
import {kebabToCamelCase, parse} from "../../utils/dataManipulation/stringManipulation";
import {auto} from "../decorators/auto/auto";
import {TurboView} from "../mvc/turboView";
import {TurboModel} from "../mvc/turboModel";
import {MvcHandler} from "../mvc/mvcHandler";
import {TurboEmitter} from "../mvc/turboEmitter";

/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 * @template ViewType - TurboView
 * @template DataType - object
 * @template ModelType - TurboModel<DataType>
 */
class TurboElement<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>
> extends HTMLElement {

    //STATIC CONFIG

    /**
     * @description Static configuration object.
     */
    public static readonly config: any = {shadowDOM: false, defaultSelectedClass: "selected"};

    protected mvc: MvcHandler<this, ViewType, DataType, ModelType, EmitterType>;

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

    public constructor(properties: TurboCustomProperties<ViewType, DataType, ModelType, EmitterType> = {}) {
        super();
        if (this.getPropertiesValue(properties.shadowDOM, "shadowDOM")) this.attachShadow({mode: "open"});
        this.setProperties(properties, true);
        this.mvc = new MvcHandler({...properties, element: this});
    }

    public connectedCallback() {
    }

    public disconnectedCallback() {
    }

    public adoptedCallback() {
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (!newValue || newValue == oldValue) return;
        this[kebabToCamelCase(name)] = parse(newValue);
    }

    public initializeUI(): void {
        this.setupChangedCallbacks();
        this.setupUIElements();
        this.setupUILayout();
        this.setupUIListeners();
    }

    protected setupChangedCallbacks(): void {
    }

    protected setupUIElements(): void {
    }

    protected setupUILayout(): void {
    }

    protected setupUIListeners(): void {
    }

    /**
     * @description Whether the element is selected or not. Setting it will accordingly toggle the "selected" CSS
     * class on the element and update the UI.
     */
    @auto()
    public set selected(value: boolean) {
        const selectedClass = this.getPropertiesValue<string>(null, "defaultSelectedClass", "selected");
        this.toggleClass(selectedClass, value);
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
        const configValue: Type = (this.constructor as typeof TurboElement).config[configFieldName];
        if (configValue !== undefined && configValue !== null) return configValue;
        return defaultValue;
    }
}

export {TurboElement};