import {TurboCustomProperties} from "./turboElement.types";
import {kebabToCamelCase, parse} from "../../utils/dataManipulation/stringManipulation";
import {TurboModel} from "./turboModel";
import {TurboView} from "./turboView";
import {auto} from "../decorators/auto/auto";
import {Type} from "typedoc";

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
    ModelType extends TurboModel = TurboModel
> extends HTMLElement {

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

    private _model: ModelType;
    private _view: ViewType;

    public constructor(properties: TurboCustomProperties<ViewType, DataType, ModelType> = {}) {
        super();
        if (this.getPropertiesValue(properties.shadowDOM, "shadowDOM")) this.attachShadow({mode: "open"});
        this.setProperties(properties, true);

        if (properties.view) this.setView(properties.view);
        if (properties.model) {
            this.setModel(properties.model);
            if (properties.data) this.model.data = properties.data;
        }
        this.generateMvc(properties.viewConstructor, properties.modelConstructor, properties.data, properties.initializeMvc);
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (!newValue || newValue == oldValue) return;
        this[kebabToCamelCase(name)] = parse(newValue);
    }

    protected get view(): ViewType {
        return this._view;
    }

    protected get model(): ModelType {
        return this._model;
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

    public setView(view: ViewType) {
        this._view = view;
    }

    public setModel(model: ModelType) {
        this._model = model;
        this.linkModelToView();
    }

    public get data(): DataType {
        return this.model?.data;
    }

    public set data(data: DataType) {
        if (this.model) this.model.data = data;
    }

    public get dataId(): string {
        return this.model.dataId;
    }

    public set dataId(value: string) {
        this.model.dataId = value;
    }

    public get dataIndex(): number {
        return Number.parseInt(this.dataId);
    }

    public set dataIndex(value: number) {
        this.model.dataId = value.toString();
    }

    public get dataSize(): number {
        return this.model?.getSize();
    }

    protected generateMvc(
        viewConstructor: new (element: typeof this, model: ModelType) => ViewType,
        modelConstructor: new (data?: DataType) => ModelType,
        data?: DataType,
        initialize: boolean = true,
        force: boolean = false
    ) {
        if (modelConstructor && (!this.model || force)) this.setModel(new modelConstructor(data));
        if (viewConstructor && (!this.view || force)) {
            this.setView(new viewConstructor(this, this.model));
            this.linkModelToView();
        }
        if (initialize) this.initializeMvc();
    }

    protected initializeMvc() {
        this.view?.initialize();
        this.model?.initialize();
    }

    private linkModelToView() {
        if (!this.view || !this.model) return;
        this.view.model = this.model;
        this.model.keyChangedCallback = (keyName: string, ...args: any[]) =>
            this.view.fireChangedCallback(keyName, ...args);
    }

    protected getPropertiesValue<Type>(propertiesValue: Type, configFieldName?: string, defaultValue?: Type): Type {
        if (propertiesValue !== undefined && propertiesValue !== null) return propertiesValue;
        const configValue: Type = (this.constructor as typeof TurboElement).config[configFieldName];
        if (configValue !== undefined && configValue !== null) return configValue;
        return defaultValue;
    }
}

export {TurboElement};