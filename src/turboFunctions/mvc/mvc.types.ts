import {TurboController} from "../../mvc/controller/controller";
import {TurboHandler} from "../../mvc/handler/handler";
import {TurboInteractor} from "../../mvc/interactor/interactor";
import {TurboTool} from "../../mvc/tool/tool";
import {TurboSubstrate} from "../../mvc/substrate/substrate";
import {TurboView} from "../../mvc/view/view";
import {TurboModel} from "../../mvc/model/model";
import {TurboEmitter} from "../../mvc/emitter/emitter";
import {TurboViewProperties} from "../../mvc/view/view.types";
import {TurboControllerProperties} from "../../mvc/controller/controller.types";
import {TurboInteractorProperties} from "../../mvc/interactor/interactor.types";
import {TurboToolProperties} from "../../mvc/tool/tool.types";
import {TurboSubstrateProperties} from "../../mvc/substrate/substrate.types";

/**
 * @group MVC
 * @category MVC
 *
 * @type {MvcInstanceOrConstructor}
 * @template Type
 * @template PropertiesType
 * @description Type representing the constructor of a certain `Type` (which takes a single parameter), or an
 * instance of `Type`.
 */
export type MvcInstanceOrConstructor<Type, PropertiesType = any> = Type | (new (properties: PropertiesType) => Type);

/**
 * @group MVC
 * @category MVC
 *
 * @type {MvcManyInstancesOrConstructors}
 * @template Type
 * @template PropertiesType
 * @description Type representing a single entry or an array of {@link MvcInstanceOrConstructor}.
 */
export type MvcManyInstancesOrConstructors<Type, PropertiesType = any> = MvcInstanceOrConstructor<Type, PropertiesType>
    | MvcInstanceOrConstructor<Type, PropertiesType>[];


/**
 * @type {MvcGenerationProperties}
 * @group MVC
 * @category MVC
 *
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {object} DataType - The element's data type, if any.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Type representing a configuration object for an {@link Mvc} instance.
 * @property {MvcInstanceOrConstructor<ViewType, TurboViewProperties>} [view] - The view (or view constructor) to attach.
 * @property {ModelType | (new (data?: any, dataBlocksType?: "map" | "array") => ModelType)} [model] - The model
 * (or model constructor) to attach.
 * @property {MvcInstanceOrConstructor<EmitterType, ModelType>} [emitter] - The emitter (or emitter constructor) to
 * attach. If not defined, a default TurboEmitter will be created.
 * @property {MvcManyInstancesOrConstructors<TurboController, TurboControllerProperties>} [controllers] - The
 * controller, constructor of controller, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboHandler, ModelType>} [handlers] - The
 * handler, constructor of handler, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboInteractor, TurboInteractorProperties>} [interactors] - The
 * interactor, constructor of interactor, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboTool, TurboToolProperties>} [tools] - The
 * tool, constructor of tool, or array of the latter, to attach.
 * @property {MvcManyInstancesOrConstructors<TurboSubstrate, TurboSubstrateProperties>} [substrates] - The
 * substrate, constructor of substrate, or array of the latter, to attach.
 * @property {DataType} [data] - The data to attach to the model.
 * @property {boolean} [initialize] - Whether to initialize the MVC pieces after setting them or not. Defaults to true.
 */
type MvcGenerationProperties<
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = {
    view?: MvcInstanceOrConstructor<ViewType, TurboViewProperties>,
    model?: ModelType | (new (data?: any, dataBlocksType?: "map" | "array") => ModelType),
    emitter?: MvcInstanceOrConstructor<EmitterType, ModelType>,

    controllers?: MvcManyInstancesOrConstructors<TurboController, TurboControllerProperties>,
    handlers?: MvcManyInstancesOrConstructors<TurboHandler, ModelType>,

    interactors?: MvcManyInstancesOrConstructors<TurboInteractor, TurboInteractorProperties>,
    tools?: MvcManyInstancesOrConstructors<TurboTool, TurboToolProperties>,
    substrates?: MvcManyInstancesOrConstructors<TurboSubstrate, TurboSubstrateProperties>,

    data?: DataType,
    initialize?: boolean,
};

/**
 * @type {MvcProperties}
 * @group MVC
 * @category MVC
 *
 * @template {object} ElementType - The type of the element attached to the {@link Mvc} object.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {object} DataType - The element's data type, if any.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Type of the properties object used for instantiating an {@link Mvc} object.
 * @extends MvcGenerationProperties
 * @property {ElementType} [element] - The element to attach to the Mvc instance.
 */
type MvcProperties<
    ElementType extends object = object,
    ViewType extends TurboView = TurboView<any, any>,
    DataType extends object = object,
    ModelType extends TurboModel = TurboModel,
    EmitterType extends TurboEmitter = TurboEmitter
> = MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType> & {
    element?: ElementType,
};

declare module "../turboSelector" {
    interface TurboSelector<Type extends object = Node> {

        // -------------------------------------------------------------------------
        // Singular pieces
        // -------------------------------------------------------------------------

        /**
         * @description The model of the element's MVC structure.
         */
        model: any;

        /**
         * @description The view of the element's MVC structure.
         */
        view: any;

        /**
         * @description The emitter of the element's MVC structure.
         */
        emitter: any;

        // -------------------------------------------------------------------------
        // Data
        // -------------------------------------------------------------------------

        /**
         * @description The main data block attached to the element's model.
         */
        data: any;

        /**
         * @description The ID of the main data block of the element's model.
         */
        dataId: string;

        /**
         * @description The numerical index of the main data block of the element's model.
         */
        dataIndex: number;

        /**
         * @description The size (number) of the main data block of the element's model.
         */
        readonly dataSize: number;

        // -------------------------------------------------------------------------
        // Collections
        // -------------------------------------------------------------------------

        /**
         * @description The controllers of the element's MVC structure.
         */
        controllers: TurboController[];

        /**
         * @description The handlers attached to the element's model.
         * Returns an empty array if no model is set.
         */
        handlers: TurboHandler[];

        /**
         * @description The interactors of the element's MVC structure.
         */
        interactors: TurboInteractor[];

        /**
         * @description The tools of the element's MVC structure.
         */
        tools: TurboTool[];

        /**
         * @description The substrates of the element's MVC structure.
         */
        substrates: TurboSubstrate[];

        // -------------------------------------------------------------------------
        // MVC setup
        // -------------------------------------------------------------------------

        /**
         * @function setMvc
         * @description Configures the MVC structure for the element. Sets the provided MVC pieces (model, view,
         * emitter, controllers, handlers, interactors, tools, substrates) on the element, initializes a default
         * emitter if none is provided, and initializes all MVC pieces unless explicitly disabled.
         * @param {MvcGenerationProperties} properties - The properties to configure the MVC structure.
         * @returns {this} Itself, allowing for method chaining.
         */
        setMvc(properties: MvcGenerationProperties): this;

        /**
         * @function initializeMvc
         * @description Initializes all MVC pieces attached to the element, in the following order: view,
         * controllers, interactors, tools, substrates, and model. The model is initialized last to allow
         * the view and controllers to set up their change callbacks first.
         * @returns {this} Itself, allowing for method chaining.
         */
        initializeMvc(): this;

        /**
         * @function getMvcDifference
         * @template {TurboView} ViewType - The element's view type.
         * @template {object} DataType - The element's data type.
         * @template {TurboModel<DataType>} ModelType - The element's model type.
         * @template {TurboEmitter} EmitterType - The element's emitter type.
         * @description Computes the structural difference between the element's current MVC configuration
         * and a provided configuration description. The comparison is constructor-based (not instance-based):
         * - For singular fields (`view`, `model`, `emitter`), the constructors are compared.
         * - For collection fields (`controllers`, `handlers`, `interactors`, `tools`, `substrates`),
         *   the result contains constructors present in the current MVC but absent from the provided configuration.
         * @param {MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>} [properties={}] -
         *  The configuration to compare against.
         * @returns {MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>}
         *  A partial configuration of constructors describing pieces present in the current MVC
         *  but not in the provided configuration.
         */
        getMvcDifference<
            ViewType extends TurboView = TurboView<any, any>,
            DataType extends object = object,
            ModelType extends TurboModel = TurboModel,
            EmitterType extends TurboEmitter = TurboEmitter<any>
        >(properties?: MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>
        ): MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>;

        // -------------------------------------------------------------------------
        // Controllers
        // -------------------------------------------------------------------------

        /**
         * @function getController
         * @description Retrieves the attached MVC controller with the given key.
         * @param {string} key - The controller's key.
         * @returns {TurboController} - The controller.
         */
        getController(key: string): TurboController;

        /**
         * @function addController
         * @description Adds the given controller to the element's MVC structure.
         * @param {TurboController} controller - The controller to add.
         * @returns {this} Itself, allowing for method chaining.
         */
        addController(controller: TurboController): this;

        /**
         * @function removeController
         * @description Removes the given controller from the element's MVC structure and unlinks it.
         * @param {string | TurboController} keyOrInstance - The controller's key or instance to remove.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeController(keyOrInstance: string | TurboController): this;

        // -------------------------------------------------------------------------
        // Handlers
        // -------------------------------------------------------------------------

        /**
         * @function getHandler
         * @description Retrieves the attached MVC handler with the given key.
         * Returns undefined if no model is set.
         * @param {string} key - The handler's key.
         * @returns {TurboHandler} - The handler.
         */
        getHandler(key: string): TurboHandler;

        /**
         * @function addHandler
         * @description Adds the given handler to the element's model.
         * If no model is set, this operation is a no-op.
         * @param {TurboHandler} handler - The handler to add.
         * @returns {this} Itself, allowing for method chaining.
         */
        addHandler(handler: TurboHandler): this;

        /**
         * @function removeHandler
         * @description Removes the given handler from the element's model and unlinks it.
         * If no model is set, this operation is a no-op.
         * @param {string | TurboHandler} keyOrInstance - The handler's key or instance to remove.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeHandler(keyOrInstance: string | TurboHandler): this;

        // -------------------------------------------------------------------------
        // Interactors
        // -------------------------------------------------------------------------

        /**
         * @function getInteractor
         * @description Retrieves the attached MVC interactor with the given key.
         * @param {string} key - The interactor's key.
         * @returns {TurboInteractor} - The interactor.
         */
        getInteractor(key: string): TurboInteractor;

        /**
         * @function addInteractor
         * @description Adds the given interactor to the element's MVC structure.
         * @param {TurboInteractor} interactor - The interactor to add.
         * @returns {this} Itself, allowing for method chaining.
         */
        addInteractor(interactor: TurboInteractor): this;

        /**
         * @function removeInteractor
         * @description Removes the given interactor from the element's MVC structure and unlinks it.
         * @param {string | TurboInteractor} keyOrInstance - The interactor's key or instance to remove.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeInteractor(keyOrInstance: string | TurboInteractor): this;

        // -------------------------------------------------------------------------
        // Tools
        // -------------------------------------------------------------------------

        /**
         * @function getTool
         * @description Retrieves the attached MVC tool with the given key.
         * @param {string} key - The tool's key.
         * @returns {TurboTool} - The tool.
         */
        getTool(key: string): TurboTool;

        /**
         * @function addTool
         * @description Adds the given tool to the element's MVC structure.
         * @param {TurboTool} tool - The tool to add.
         * @returns {this} Itself, allowing for method chaining.
         */
        addTool(tool: TurboTool): this;

        /**
         * @function removeTool
         * @description Removes the given tool from the element's MVC structure and unlinks it.
         * @param {string | TurboTool} keyOrInstance - The tool's key or instance to remove.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeTool(keyOrInstance: string | TurboTool): this;

        // -------------------------------------------------------------------------
        // Substrates
        // -------------------------------------------------------------------------

        /**
         * @function getSubstrate
         * @description Retrieves the attached MVC substrate with the given key.
         * @param {string} key - The substrate's key.
         * @returns {TurboSubstrate} - The substrate.
         */
        getSubstrate(key: string): TurboSubstrate;

        /**
         * @function addSubstrate
         * @description Adds the given substrate to the element's MVC structure.
         * @param {TurboSubstrate} substrate - The substrate to add.
         * @returns {this} Itself, allowing for method chaining.
         */
        addSubstrate(substrate: TurboSubstrate): this;

        /**
         * @function removeSubstrate
         * @description Removes the given substrate from the element's MVC structure and unlinks it.
         * @param {string | TurboSubstrate} keyOrInstance - The substrate's key or instance to remove.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeSubstrate(keyOrInstance: string | TurboSubstrate): this;
    }
}

export {MvcProperties, MvcGenerationProperties};