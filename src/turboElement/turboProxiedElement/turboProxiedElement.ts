import {ValidElement, ValidTag} from "../../core.types";
import {Mvc} from "../../mvc/mvc";
import {TurboProxiedProperties} from "./turboProxiedElement.types";
import {blindElement} from "../../elementCreation/element";
import {auto} from "../../decorators/auto/auto";
import {$} from "../../turboFunctions/turboFunctions";
import {TurboEmitter} from "../../mvc/core/emitter";
import {TurboModel} from "../../mvc/core/model";
import {TurboView} from "../../mvc/core/view";
import {defineDefaultProperties} from "../setup/default/default";
import {defineMvcAccessors} from "../setup/mvc/mvc";
import {defineUIPrototype} from "../setup/ui/ui";

let isSetup: boolean = false;
function setup() {
    if (isSetup) return;
    defineDefaultProperties(TurboProxiedElement);
    defineMvcAccessors(TurboProxiedElement);
    defineUIPrototype(TurboProxiedElement);
}

/**
 * @class TurboProxiedElement
 * @description TurboProxiedElement class, similar to TurboElement but containing an HTML element instead of being one.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
class TurboProxiedElement<
    ElementTag extends ValidTag = ValidTag,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>
> {
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
            if (val !== undefined) this.config[key] = val;
        });
    }

    /**
     * @description The HTML (or other) element wrapped inside this instance.
     */
    public readonly element: ValidElement<ElementTag>;

    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    protected mvc: Mvc<this, ViewType, DataType, ModelType, EmitterType>;

    public constructor(properties: TurboProxiedProperties<ElementTag, ViewType, DataType, ModelType, EmitterType> =
                       {} as TurboProxiedProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>) {
        setup();
        this.element = blindElement(properties);
        if (this.getPropertiesValue(properties.shadowDOM, "shadowDOM")) this.element.attachShadow({mode: "open"});
        this.mvc = new Mvc({...properties, element: this});
    }

    protected setupChangedCallbacks(): void {
    }

    protected setupUIElements(): void {
    }

    protected setupUILayout(): void {
    }

    protected setupUIListeners(): void {
    }


    @auto()
    public set selected(value: boolean) {
        const selectedClass = this.getPropertiesValue(null, "defaultSelectedClass", "selected");
        $(this.element).toggleClass(selectedClass, value);
    }
}

export {TurboProxiedElement};