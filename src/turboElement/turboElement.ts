import {TurboElementProperties} from "./turboElement.types";
import {$} from "../turboFunctions/turboFunctions";
import {Mvc} from "../mvc/mvc";
import {TurboEmitter} from "../mvc/core/emitter";
import {TurboModel} from "../mvc/core/model";
import {TurboView} from "../mvc/core/view";
import {defineDefaultProperties} from "./setup/default/default";
import {defineMvcAccessors} from "./setup/mvc/mvc";
import {defineUIPrototype} from "./setup/ui/ui";
import { Delegate } from "../eventHandling/delegate/delegate";
import {callOnce} from "../decorators/callOnce";

/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * */
class TurboElement<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter<any>
> extends HTMLElement {
    /**
     * @description Static configuration object.
     */
    public static readonly config: any = {
        shadowDOM: false,
        defaultSelectedClass: "selected"
    };

    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    protected mvc: Mvc<this, ViewType, DataType, ModelType, EmitterType>;

    /**
     * @description Delegate fired when the element is attached to DOM.
     */
    public readonly onAttach: Delegate<() => void> = new Delegate<() => void>();

    /**
     * @description Delegate fired when the element is detached from the DOM.
     */
    public readonly onDetach: Delegate<() => void> = new Delegate<() => void>();

    /**
     * @description Delegate fired when the element is adopted by a new parent in the DOM.
     */
    public readonly onAdopt: Delegate<() => void> = new Delegate<() => void>();

    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    public static configure(value: typeof this.config) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined) (this.config as any)[key] = val;
        });
    }

    public constructor(properties: TurboElementProperties<ViewType, DataType, ModelType, EmitterType> = {}) {
        super();
        if (this.getPropertiesValue(properties.shadowDOM, "shadowDOM")) this.attachShadow({mode: "open"});
        $(this).setProperties(properties, true);
        this.mvc = new Mvc({...properties, element: this});
    }

    /**
     * @function setupChangedCallbacks
     * @description Setup method intended to initialize change listeners and callbacks.
     * @protected
     */
    protected setupChangedCallbacks(): void {
    }

    /**
     * @function setupUIElements
     * @description Setup method intended to initialize all direct sub-elements attached to this element, and store
     * them in fields.
     * @protected
     */
    protected setupUIElements(): void {
    }

    /**
     * @function setupUILayout
     * @description Setup method to create the layout structure of the element by adding all created sub-elements to
     * this element's child tree.
     * @protected
     */
    protected setupUILayout(): void {
    }

    /**
     * @function setupUIListeners
     * @description Setup method to initialize and define all input/DOM event listeners of the element.
     * @protected
     */
    protected setupUIListeners(): void {
    }

    public connectedCallback() {
        this.onAttach.fire();
    }

    public disconnectedCallback() {
        this.onDetach.fire();
    }

    public adoptedCallback() {
        this.onAdopt.fire();
    }
}

(() => {
    defineDefaultProperties(TurboElement);
    defineMvcAccessors(TurboElement);
    defineUIPrototype(TurboElement);
})();

export {TurboElement};