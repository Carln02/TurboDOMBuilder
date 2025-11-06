/**
 * @typedef {Object} AutoOptions
 * @template Type
 * @description Options for configuring the `@auto` decorator.
 * @property {boolean} [override] - If true, will try to override the defined property in `super`.
 * @property {boolean} [cancelIfUnchanged=true] - If true, cancels the setter if the new value is the same as the
 * current value. Defaults to `true`.
 * @property {(value: Type) => Type} [preprocessValue] - Optional callback to execute on the value and preprocess it
 * just before it is set. The returned value will be stored.
 * @property {(value: Type) => void} [callBefore] - Optional function to call before preprocessing and setting the value.
 * @property {(value: Type) => void} [callAfter] - Optional function to call after setting the value.
 * @property {boolean} [setIfUndefined] - If true, will fire the setter when the underlying value is `undefined` and
 * the program is trying to access it (maybe through its getter).
 * @property {boolean} [returnDefinedGetterValue] - If true and a custom getter is defined, the return value of this
 * getter will be returned when accessing the property. Otherwise, the underlying saved value will always be returned.
 * Defaults to `false`.
 * @property {boolean} [executeSetterBeforeStoring] - If true, when setting the value, the setter will execute first,
 * and then the value will be stored. In this case, accessing the value in the setter will return the previous value.
 * Defaults to `false`.
 * @property {Type} [defaultValue] - If defined, whenever the underlying value is `undefined` and trying to be
 * accessed, it will be set to `defaultValue` through the setter before getting accessed.
 * @property {() => Type} [defaultValueCallback] - If defined, whenever the underlying value is `undefined` and
 * trying to be accessed, it will be set to the return value of `defaultValueCallback` through the setter before
 * getting accessed.
 * @property {Type} [initialValue] - If defined, on initialization, the property will be set to `initialValue`.
 * @property {() => Type} [initialValueCallback] - If defined, on initialization, the property will be set to the
 * return value of `initialValueCallback`.
 */

/**
 * @typedef {Object} CacheOptions
 * @description Options for configuring the `@cache` decorator.
 *
 * Defines when and how cached values should expire, refresh, or invalidate.
 * These options apply equally to cached **methods**, **getters**, and **accessors**.
 *
 * @property {number} [timeout]
 *  Duration in milliseconds after which the cached value automatically expires.
 *  Useful for time-based caching where values should refresh periodically.
 *
 * @property {string | string[]} [onEvent]
 *  One or more event names (space-separated string or array) that, when fired on the instance,
 *  immediately clear the cache.
 *  This allows integration with custom event systems or reactive models.
 *
 * @property {() => boolean | Promise<boolean>} [onCallback]
 *  Function (sync or async) periodically called to decide whether to invalidate the cache.
 *  If it returns `true`, the cache is cleared.
 *
 * @property {number} [onCallbackFrequency]
 *  Frequency in milliseconds at which `onCallback` should be executed.
 *  Ignored if `onCallback` is not provided.
 *
 * @property {string | Function | (string | Function)[]} [onFieldChange]
 *  One or more property names or methods to watch for changes.
 *  Whenever any of these fields or functions change, the cache for the decorated member is cleared.
 *  Can be a string, a function reference, or an array of both.
 *
 * @property {boolean} [clearOnNextFrame]
 *  If `true`, clears the cache automatically on the **next animation frame** (or equivalent microtask fallback).
 *  Useful when the cached value is only valid for the current render/update cycle.
 */

/**
 * @typedef {Object} TurboControllerProperties
 * @extends {TurboViewProperties}
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description  Options used to create a new {@link TurboController} attached to an element.
 * @property {ViewType} [view] - The MVC view.
 */

/**
 * @typedef {Object} TurboToolProperties
 * @extends TurboControllerProperties
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Options used to create a new {@link TurboTool} attached to an element.
 * @property {string} [toolName] - The name of the tool.
 * @property {Node} [embeddedTarget] - If the tool is embedded, its target.
 * @property {() => void} [onActivate] - Function to execute when the tool is activated.
 * @property {() => void} [onDeactivate] - Function to execute when the tool is deactivated.
 * @property {DefaultEventNameEntry} [activationEvent] - Custom activation event to listen to. Defaults to the
 * default click event name.
 * @property {ClickMode} [clickMode] -  Click mode that will hold this tool when activated. Defaults to `ClickMode.left`.
 * @property {(element: Turbo<Element>, manager: TurboEventManager) => void} [customActivation] - Custom activation
 * function. If provided, is called with `(el, manager)` to define when the tool is activated.
 * @property {string} [key] - Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
 * to `TurboEventManager.instance`.
 */

/**
 * @typedef {Object} TurboSubstrateProperties
 * @extends TurboControllerProperties
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Options used to create a new {@link TurboSubstrate} attached to an element.
 * @property {string} [substrateName] - The name of the substrate.
 * @property {() => void} [onActivate] - Function to execute when the tool is activated.
 * @property {() => void} [onDeactivate] - Function to execute when the tool is deactivated.
 */

/**
 * @typedef {Object} MakeSubstrateOptions
 * @description Type representing objects used to configure the creation of substrates. Used in {@link makeSubstrate}.
 * @property {() => void} [onActivate] - Callback function to execute when the substrate is activated.
 * @property {() => void} [onDeactivate] - Callback function to execute when the substrate is deactivated.
 */

/**
 * @typedef {Object} SubstrateSolverProperties
 * @description Type representing objects passed as context for resolving substrates. GIven as first parameters to
 * solvers when executing them via {@link resolveSubstrate}.
 * @property {string} [substrate] - The targeted substrate. Defaults to `currentSubstrate`.
 * @property {object} [target] - The current object being processed by the solver. Property set by
 * {@link resolveSubstrate} when processing every object in the substrate's list.
 * @property {Event} [event] - The event (if any) that fired the resolving of the substrate.
 * @property {string} [eventType] - The type of the event.
 * @property {Node} [eventTarget] - The target of the event.
 * @property {string} [toolName] - The name of the active tool when the event was fired.
 * @property {ListenerOptions} [eventOptions] - The options of the event.
 * @property {TurboEventManager} [manager] - The event manager that captured the event. Defaults to the first
 * instantiated event manager.
 */

/**
 * @typedef {Object} SubstrateSolver
 * @description Type representing the signature of solver functions that substrates expect.
 */

/**
 * @typedef {Object} TurboHeadlessProperties
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * @description Object containing properties for configuring a headless (non-HTML) element, with possibly MVC properties.
 */

/**
 * @typedef {Object} TurboInteractorProperties
 * @extends {TurboControllerProperties}
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description  Options used to create a new {@link TurboInteractor} attached to an element.
 * @property {string} [toolName] - The name of the tool (if any) that the event listeners will listen for.
 * @property {Node} [target] - The target that will listen for the events.
 * @property {PartialRecord<DefaultEventNameKey, ListenerOptions>} [listenerOptions] - Custom options to define per
 * event type.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
 * to `TurboEventManager.instance`.
 */

/**
 * @typedef {Object} MvcInstanceOrConstructor
 * @template Type
 * @template PropertiesType
 * @description Type representing the constructor of a certain `Type` (which takes a single parameter), or an
 * instance of `Type`.
 */

/**
 * @typedef {Object} MvcManyInstancesOrConstructors
 * @template Type
 * @template PropertiesType
 * @description Type representing a single entry or an array of {@link MvcInstanceOrConstructor}.
 */

/**
 * @typedef {Object} MvcGenerationProperties
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

/**
 * @typedef {Object} MvcProperties
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

/**
 * @typedef {Object} ElementTagDefinition
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {string} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svgManipulation" or "mathML"
 * is provided, the corresponding namespace will be used to create the element. Otherwise, the custom namespace
 * provided will be used.
 */

/**
 * @typedef {Object} TurboProperties
 * @template {ValidTag} Tag - The HTML (or other) tag of the element, if passing it as a property. Defaults to "div".
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {object} DataType - The element's data type, if any.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Object containing properties for configuring an Element. A tag (and
 * possibly a namespace) can be provided for element creation. Already-created elements will ignore these
 * properties if set.
 * Any HTML attribute can be passed as key to be processed by the class/function. The type has the following
 * described custom properties:
 *
 * @property {string} [id] - The ID of the element.
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of
 * space-separated classes or an array of class names).
 * @property {string} [style] - The inline style of the element. Use the css literal function for autocompletion.
 * @property {string} [stylesheet] - The associated stylesheet (if any) with the element. Declaring this property will
 * generate automatically a new style element in the element's corresponding root. Use the css literal function
 * for autocompletion.
 * @property {Record<string, EventListenerOrEventListenerObject | ((e: Event, el: Element) => boolean)>} [listeners]
 * - An object containing event listeners to be applied to this element.
 * @property {(e: Event, el: Element) => boolean} [onClick] - Click event listener.
 * @property {(e: Event, el: Element) => boolean} [onDrag] - Drag event listener.
 * @property {Element | Element[]} [children] - An array of child wrappers or elements to append to
 * the created element.
 * @property {Element} [parent] - The parent element to which the created element will be appended.
 * @property {string | Element} [out] - If defined, declares (or sets) the element in the parent as a field with the
 * given value as key.
 * @property {string} [text] - The text content of the element (if any).
 * @property {boolean} [shadowDOM] - If true, indicate that the element will be created under a shadow root.
 */

/**
 * @typedef {Object} StylesRoot
 * @description A type that represents entities that can hold a <style> object (Shadow root or HTML head).
 */

/**
 * @typedef {Object} StylesType
 * @description A type that represents the types that are accepted as styles entries (mainly by the HTMLElement.setStyles()
 * method). It includes strings, numbers, and records of CSS attributes to strings or numbers.
 */

/**
 * @typedef {Object} SignalEntry
 * @template Type
 * @description Type that represents a base signal object.
 * @property {function(): Type} get - Retrieve the signal value.
 * @property {function(value: Type): void} set - Set the signal value.
 * @property {function(updater: (previous: Type) => Type): void} update - Set the value using a pure updater based
 * on the previous value.
 * @property {(fn: SignalSubscriber) => () => void} sub - Subscribe to change notifications. Returns an unsubscribe
 * function.
 * @property {() => void} emit - Force a notification cycle without changing the value (useful after in-place
 * mutation of structural data).
 *
 * @example
 * ```ts
 * const count: SignalEntry<number> = makeSignal(0);
 * const unsub = count.sub(() => console.log("count:", count.get()));
 * count.set(1); // logs "count: 1"
 * count.update(c => c+1); // logs "count: 2"
 * unsub();
 * ```
 */

/**
 * @typedef {Object} SignalBox
 * @template Type
 * @description A signal entry that is also usable like its underlying primitive/object.
 *
 * ### Interop Notes
 * - `toJSON()` returns the raw value.
 * - `valueOf()` returns the raw value.
 * - `Symbol.toPrimitive(hint)`:
 *    - `"number"` → numeric coercion from the inner value
 *    - `"string"` or `"default"` → string coercion from the inner value
 * - The `value` getter/setter mirrors `get()`/`set()` for ergonomic usage.
 *
 * @example
 * ```ts
 * const count: SignalBox<number> = signal(0);
 *
 * // Read
 * console.log(count.get()); // 0
 * console.log(count.value); // 0
 * console.log(+count); // 0
 *
 * // Write
 * count.set(5);
 * count.value = 6;
 * count.update(v => v + 1); // 7
 *
 * // JSON / string
 * console.log(`${count}`); // "7"
 * console.log(JSON.stringify(count)); // 7
 *
 * // Reactivity
 * const unsub = count.sub(() => console.log("changed to", count.get()));
 * count.set(8); // triggers subscriber
 * unsub();
 * ```
 */

/**
 * @typedef {Object} TurboElementProperties
 * @extends TurboProperties
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {object} DataType - The element's data type, if any.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 *
 * @description Object containing properties for configuring a custom HTML element. Is basically TurboProperties
 * without the tag.
 */

/**
 * @typedef {Object} TurboIconProperties
 * @description Properties object that extends TurboElementProperties with properties specific to icons.
 * @extends TurboProperties
 *
 * @property {string} icon - The name of the icon.
 * @property {string} [iconColor] - The color of the icon.
 * @property {((svgManipulation: SVGElement) => {})} [onLoaded] - Custom function that takes an SVG element to execute on the
 * SVG icon (if it is one) once it is loaded. This property will be disregarded if the icon is not of type SVG.
 *
 * @property {string} [type] - Custom type of the icon, overrides the default type assigned to
 * TurboIcon.config.type (whose default value is "svgManipulation").
 * @property {string} [directory] - Custom directory to the icon, overrides the default directory assigned to
 * TurboIcon.config.directory.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in
 * TurboIcon.config.defaultClasses to this instance of Icon.
 */

/**
 * @typedef {Object} TurboIconConfig
 * @description Configuration object for the Icon class. Set it via TurboConfig.Icon.
 *
 * @property {string} [type] - The default type to assign to newly created Icons. Defaults to "svgManipulation".
 * @property {string} [[path]] - The default path to the directory containing the icons in the project. Specify the
 * directory once here to not type it again at every Icon generation.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created icons.
 */

/**
 * @typedef {Object} TurboRichElementProperties
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboProperties
 *
 * @property {string} [text] - The text to set to the rich element's main element.
 *
 * @property {Element | Element[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {string | TurboIcon} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | TurboProperties<ElementTag> | ValidElement<ElementTag>} [buttonText] - The text content of the button.
 * @property {string | TurboIcon} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {Element | Element[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 *
 * @property {ValidTag} [customTextTag] - The HTML tag to be used for the buttonText element (if the latter is passed as
 * a string). If not specified, the default text tag specified in the Button class will be used.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Button
 * to this instance of Button.
 *
 * @template {ValidTag} ElementTag="p"
 */

/**
 * @typedef {Object} TurboRichElementConfig
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {HTMLTag} [defaultElementTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */

/**
 * @typedef {Object} TurboButtonConfig
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {ValidTag} [defaultElementTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */

/**
 * @typedef {Object} TurboDropdownProperties
 * @description Properties for configuring a Dropdown.
 * @extends TurboProperties
 *
 * @property {(string | HTMLElement)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {HTMLElement} [popup] - The element used as a container for the dropdown entries.
 *
 * @property {boolean} [multiSelection=false] - Enables selection of multiple dropdown entries.
 *
 * @property {ValidTag} [selectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 *
 * @property {string | string[]} [selectorClasses] - Custom CSS class(es) for the selector. Overrides the default
 * classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [popupClasses] - Custom CSS class(es) for the popup container. Overrides the
 * default classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [customEntriesClasses] - Custom CSS class(es) for dropdown entries.  Overrides the
 * default classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [customSelectedEntriesClasses] - Custom CSS class(es) for selected entries.  Overrides
 * the default classes set in TurboConfig.Dropdown.
 */

/**
 * @typedef {Object} TurboDropdownConfig
 * @description Configuration object for the Dropdown class. Set it via TurboConfig.Dropdown.
 *
 * @property {ValidTag} [defaultSelectorTag] - The default HTML tag for the creation of the text
 * element in generic selectors (which are Buttons).
 *
 * @property {string | string[]} [defaultSelectorClasses] - The default classes to assign to the selector.
 * @property {string | string[]} [defaultPopupClasses] - The default classes to assign to the popup element.
 * @property {string | string[]} [defaultEntriesClasses] - The default classes to assign to the dropdown entries.
 * @property {string | string[]} [defaultSelectedEntriesClasses] - The default classes to assign to the selected
 * dropdown entries.
 */

/**
 * @typedef {Object} ChildHandler
 * @description A type that represents all entities that can hold and manage children (an element or a shadow root).
 */

/**
 * @typedef {Object} ApplyDefaultsOptions
 * @description Options for {@link TurboSelector.applyDefaults}.
 * @property {string[]} [mergeProperties] - Array-like keys to merge. Defaults to {@link ApplyDefaultsMergeProperties}.
 * @property {boolean} [removeDuplicates] - Whether to remove duplicates when merging arrays. Defaults to `true`.
 */

/**
 * @typedef {Object} MakeToolOptions
 * @description Options used to create a new tool attached to an element via {@link makeTool}.
 * @property {() => void} [onActivate] - Function to execute when the tool is activated.
 * @property {() => void} [onDeactivate] - Function to execute when the tool is deactivated.
 * @property {DefaultEventNameEntry} [activationEvent] - Custom activation event to listen to. Defaults to the
 * default click event name.
 * @property {ClickMode} [clickMode] -  Click mode that will hold this tool when activated. Defaults to `ClickMode.left`.
 * @property {(element: Turbo<Element>, manager: TurboEventManager) => void} [customActivation] - Custom activation
 * function. If provided, is called with `(el, manager)` to define when the tool is activated.
 * @property {string} [key] - Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults
 * to `TurboEventManager.instance`.
 */

/**
 * @typedef {Object} ToolBehaviorCallback
 * @description Function signature for a tool behavior. Returning `true` marks the behavior as handled/consumed,
 * leading to stopping the propagation of the event.
 * @param {Event} event - The original DOM/Turbo event.
 * @param {Node} target - The node the behavior should operate on (the object or its embedded target).
 * @param {ToolBehaviorOptions} [options] - Additional info (embedded context, etc.).
 * @return {boolean} - Whether to stop the propagation.
 */

/**
 * @typedef {Object} ToolBehaviorOptions
 * @description Options object passed to tool behaviors at execution time.
 * @property {boolean} [isEmbedded] - Indicates if the tool is embedded in a target node.
 * @property {Node} [embeddedTarget] - The target of the tool, if it is embedded.
 */

/**
 * @typedef {Object} FontProperties
 * @description An object representing a local font, or a family of fonts.
 *
 * @property {string} name - The name of the font. The font's filename should also match.
 * @property {string} pathOrDirectory - The path to the local font file, or the path to the local font family's directory.
 * @property {Record<string, string> | Record<number, Record<string, string>>} [weight] - If loading a single font, a
 * record in the form {weight: style}. Defaults to {"normal": "normal"}. If loading a family, a record in the form
 * {weight: {fontSubName: style}}, such that every font file in the family is named in the form fontName-fontSubName.
 * Defaults to an object containing common sub-names and styles for weights from 100 to 900.
 * @property {string} [format] - The format of the font. Defaults to "woff2".
 * @property {string} [extension] - The extension of the font file(s). Defaults to ".ttf".
 */

'use strict';

var tslib = require('tslib');
var yjs = require('yjs');

/**
 * @internal
 */
class AutoUtils {
    constructorMap = new WeakMap();
    constructorData(target) {
        let obj = this.constructorMap.get(target);
        if (!obj) {
            obj = { installed: new Map() };
            this.constructorMap.set(target, obj);
        }
        return obj;
    }
}

function getFirstDescriptorInChain(object, key) {
    let currentObject = object;
    while (currentObject && currentObject !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        if (descriptor)
            return descriptor;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}
function hasPropertyInChain(object, key) {
    let currentObject = object;
    while (currentObject && currentObject !== Object.prototype) {
        if (Object.prototype.hasOwnProperty.call(currentObject, key))
            return true;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return false;
}
function getFirstPrototypeInChainWith(object, key) {
    let currentObject = Object.getPrototypeOf(object);
    while (currentObject && currentObject !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        if (descriptor)
            return currentObject;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}
function getSuperMethod(object, key, wrapperFn) {
    let currentObject = Object.getPrototypeOf(object);
    while (currentObject && currentObject !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        const fn = descriptor?.value ?? descriptor?.get ?? descriptor?.set;
        if (typeof fn === "function" && fn !== wrapperFn)
            return fn;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
}
const getSuperDescriptor = (object, key) => {
    let currentObject = Object.getPrototypeOf(object);
    if (currentObject)
        currentObject = Object.getPrototypeOf(currentObject);
    while (currentObject && currentObject !== Object.prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(currentObject, key);
        if (descriptor)
            return descriptor;
        currentObject = Object.getPrototypeOf(currentObject);
    }
    return undefined;
};

function isNull(value) {
    return value == null && value != undefined;
}
function isUndefined(value) {
    return typeof value == "undefined";
}

const utils$a = new AutoUtils();
/**
 * @decorator
 * @function auto
 * @description Stage-3 decorator that augments fields, getters, setters, and accessors. Useful to quickly create a setter
 * and only define additional functionality on set. The decorator takes an optional object as parameter to configure
 * it, allowing you to, among other things:
 * - Preprocess the value when it is set,
 * - Specify callbacks to call before/after the value is set,
 * - Define a default value to return instead of `undefined` when calling the getter, and
 * - Fire the setter when the underlying value is `undefined`.
 *
 * *Note: If you want to chain decorators, place `@auto` closest to the property to ensure it runs first and sets
 * up the accessor for other decorators.*
 *
 * @param {AutoOptions} [options] - Options object to define custom behaviors.
 *
 * @example
 * ```ts
 * @auto() public set color(value: string) {
 *    this.style.backgroundColor = value;
 * }
 * ```
 *Is equivalent to:
 * ```ts
 * private _color: string;
 * public get color(): string {
 *    return this._color;
 * }
 *
 * public set color(value: string) {
 *    this._color = value;
 *    this.style.backgroundColor = value;
 * }
 * ```
 */
function auto(options) {
    return function (value, context) {
        if (!options)
            options = {};
        const { kind, name, static: isStatic } = context;
        const key = name;
        const backing = Symbol(`__auto_${key}`);
        context.addInitializer(function () {
            const prototype = isStatic ? this : getFirstPrototypeInChainWith(this, key);
            // const superDescriptor = getSuperDescriptor(this, key);
            let customGetter;
            let customSetter;
            const baseRead = function () {
                if (customGetter && options?.returnDefinedGetterValue)
                    return customGetter.call(this);
                // if (options.override && superDescriptor?.get) return superDescriptor.get.call(this);
                return this[backing];
            };
            const baseWrite = function (value) {
                // if (options.override && superDescriptor?.set) superDescriptor.set.call(this, value);
                this[backing] = value;
            };
            let undefinedFlag = false;
            const read = function () {
                let value = baseRead.call(this);
                if (!undefinedFlag && !options.returnDefinedGetterValue && isUndefined(value)) {
                    undefinedFlag = true;
                    if (options.defaultValue)
                        value = options.defaultValue;
                    else if (options.defaultValueCallback)
                        value = options.defaultValueCallback.call(this);
                    else if (!options.setIfUndefined)
                        return value;
                    write.call(this, value);
                    value = baseRead.call(this);
                    undefinedFlag = false;
                }
                return value;
            };
            const write = function (value) {
                options.callBefore?.call(this, value);
                let next = options?.preprocessValue ? options.preprocessValue.call(this, value) : value;
                if ((options.cancelIfUnchanged ?? true) && baseRead.call(this) === next)
                    return;
                if (options.executeSetterBeforeStoring && customSetter)
                    customSetter.call(this, next);
                baseWrite.call(this, next);
                if (!options.executeSetterBeforeStoring && customSetter)
                    customSetter.call(this, next);
                options.callAfter?.call(this, next);
            };
            if (isUndefined(baseRead.call(this))) {
                let initialValue = kind === "field" ? value : undefined;
                if (isUndefined(initialValue)) {
                    if (options.initialValue)
                        initialValue = options.initialValue;
                    else if (options.initialValueCallback)
                        initialValue = options.initialValueCallback.call(this);
                }
                if (!isUndefined(initialValue) && options.preprocessValue)
                    initialValue = options.preprocessValue.call(this, initialValue);
                this[backing] = initialValue;
            }
            if (kind === "field" || kind === "accessor") {
                const accessor = value;
                if (accessor?.get)
                    customGetter = accessor.get;
                if (accessor?.set)
                    customSetter = accessor.set;
                const descriptor = getFirstDescriptorInChain(this, key) ?? { enumerable: true };
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable ?? true,
                    get: () => read.call(this),
                    set: (value) => write.call(this, value),
                });
            }
            else if (kind === "getter" || kind === "setter") {
                const installed = utils$a.constructorData(prototype).installed;
                if (installed.get(key))
                    return;
                installed.set(key, true);
                const descriptor = getFirstDescriptorInChain(prototype, key) ?? { enumerable: true };
                if (typeof descriptor.get === "function")
                    customGetter = descriptor.get;
                if (typeof descriptor.set === "function")
                    customSetter = descriptor.set;
                Object.defineProperty(prototype, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable ?? true,
                    get: function () { return read.call(this); },
                    set: function (value) { write.call(this, value); },
                });
            }
        });
    };
}

/**
 * @class TurboSelector
 * @template {object} Type - The type of the object it wraps.
 * @description Selector class that wraps an object and augments it with useful functions to manipulate it. It also
 * proxies the object, so you can access properties and methods on the underlying object directly through the selector.
 */
class TurboSelector {
    /**
     * @description The underlying, wrapped object.
     */
    element;
    #generateProxy() {
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (prop in target)
                    return Reflect.get(target, prop, receiver);
                const value = target.element?.[prop];
                return typeof value === "function" ? value.bind(target.element) : value;
            },
            set(target, prop, value, receiver) {
                if (prop in target)
                    return Reflect.set(target, prop, value, receiver);
                target.element[prop] = value;
                return true;
            },
            has(target, prop) {
                return prop in target || prop in target.element;
            },
            ownKeys(target) {
                return Array.from([...Reflect.ownKeys(target), ...Reflect.ownKeys(target.element)]);
            },
            getOwnPropertyDescriptor(target, prop) {
                return Reflect.getOwnPropertyDescriptor(target, prop)
                    || Object.getOwnPropertyDescriptor(target.element, prop)
                    || undefined;
            }
        });
    }
    constructor() {
        return this.#generateProxy();
    }
}

class HierarchyFunctionsUtils {
    dataMap = new WeakMap;
    data(element) {
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return {};
        if (!this.dataMap.has(element))
            this.dataMap.set(element, {});
        return this.dataMap.get(element);
    }
}

const utils$9 = new HierarchyFunctionsUtils();
function setupHierarchyFunctions() {
    //Readonly fields
    /**
     * @description The child handler object associated with the node. It is the node itself (if it is handling
     * its children) or its shadow root (if defined). Set it to change the node where the children are added/removed/
     * queried from when manipulating the node's children.
     */
    Object.defineProperty(TurboSelector.prototype, "childHandler", {
        set: function (value) {
            if (value instanceof TurboSelector)
                value = value.element;
            utils$9.data(this).childHandler = value;
        },
        get: function () {
            const childHandler = utils$9.data(this).childHandler;
            if (childHandler)
                return childHandler;
            if (this.element instanceof Element && this.element.shadowRoot)
                return this.element.shadowRoot;
            return this.element;
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Static array of all the child nodes of the node.
     */
    Object.defineProperty(TurboSelector.prototype, "childNodesArray", {
        get: function () {
            if (!this.element)
                return [];
            return Array.from(this.childHandler?.childNodes) || [];
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Static array of all the child elements of the node.
     */
    Object.defineProperty(TurboSelector.prototype, "childrenArray", {
        get: function () {
            return this.childNodesArray.filter((node) => node.nodeType === 1);
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Static array of all the sibling nodes (including the node itself) of the node.
     */
    Object.defineProperty(TurboSelector.prototype, "siblingNodes", {
        get: function () {
            const parent = this.element?.parentNode;
            if (!parent)
                return [];
            return $(parent).childNodesArray || [];
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Static array of all the sibling elements (including the element itself, if it is one) of the node.
     */
    Object.defineProperty(TurboSelector.prototype, "siblings", {
        get: function () {
            const parent = this.element?.parentElement;
            if (!parent)
                return [];
            return $(parent).childrenArray || [];
        },
        configurable: false,
        enumerable: true
    });
    //Self manipulation
    TurboSelector.prototype.bringToFront = function _bringToFront() {
        const parent = this.element?.parentNode;
        if (!parent)
            return this;
        $(parent).addChild(this.element);
        return this;
    };
    TurboSelector.prototype.sendToBack = function _sendToBack() {
        const parent = this.element?.parentNode;
        if (!parent)
            return this;
        $(parent).addChild(this.element, 0);
        return this;
    };
    /**
     * @description Removes the node from the document.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.remove = function _remove() {
        this.element?.parentNode?.removeChild(this.element);
        return this;
    };
    //Child manipulation
    /**
     * @description Add one or more children to the referenced parent node.
     * @param {Node | Node[]} [children] - Array of (or single) child nodes.
     * @param {number} [index] - The position at which to add the child relative to the parent's child list.
     * Leave undefined to add the child at the end.
     * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
     * use as computation reference for index placement. Defaults to the node's `childrenArray`.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.addChild = function _addChild(children, index, referenceList = this.childrenArray) {
        if (!this.element || !children)
            return this;
        if (index !== undefined && (index < 0 || index > referenceList.length))
            index = undefined;
        if (index != undefined)
            this.addChildBefore(children, referenceList[index]);
        else
            try {
                // Try to append every provided child (according to its type)
                if (!Array.isArray(children))
                    children = [children];
                children.forEach((child) => {
                    if (!child)
                        return;
                    if (child instanceof TurboSelector)
                        child = child.element;
                    this.childHandler.appendChild(child);
                    //TODO
                    // if (child["__outName"] && !this[child["__outName"]]) this[child["__outName"]] = child;
                });
            }
            catch (e) {
                console.error(e);
            }
        return this;
    };
    /**
     * @description Remove one or more children from the referenced parent node.
     * @param {Node | Node[]} [children] - Array of (or single) child nodes.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.remChild = function _remChild(children) {
        if (!this.element || !children)
            return this;
        // Try to remove every provided child (according to its type)
        try {
            if (!Array.isArray(children))
                children = [children];
            children.forEach(child => {
                if (!child)
                    return;
                if (child instanceof TurboSelector)
                    child = child.element;
                this.childHandler.removeChild(child);
            });
        }
        catch (e) {
            console.error(e);
        }
        return this;
    };
    /**
     * @description Add one or more children to the referenced parent node before the provided sibling. If the
     * sibling is not found in the parent's children, the nodes will be added to the end of the parent's child list.
     * @param {Node | Node[]} [children] - Array of (or single) child nodes to insert before sibling.
     * @param {Node} [sibling] - The sibling node to insert the children before.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.addChildBefore = function _addChildBefore(children, sibling) {
        if (!this.element || !children)
            return this;
        if (!sibling)
            return this.addChild(children);
        // Try to append every provided child (according to its type)
        try {
            if (!Array.isArray(children))
                children = [children];
            children.forEach((child) => {
                if (!child)
                    return;
                if (child instanceof TurboSelector)
                    child = child.element;
                this.childHandler.insertBefore(child, sibling);
            });
        }
        catch (e) {
            console.error(e);
        }
        return this;
    };
    /**
     * @description Remove one or more child nodes from the referenced parent node.
     * @param {number} [index] - The index of the child(ren) to remove.
     * @param {number} [count=1] - The number of children to remove.
     * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
     * use as computation reference for index placement and count. Defaults to the node's `childrenArray`.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeChildAt = function _removeChildAt(index, count = 1, referenceList = this.childrenArray) {
        if (!this.element || index === undefined || index < 0)
            return this;
        if (index >= referenceList.length)
            return this;
        // Try to remove every provided child (according to its type)
        try {
            for (let i = index + count - 1; i >= index; i--) {
                if (i >= referenceList.length)
                    continue;
                this.removeChild(referenceList[i]);
            }
        }
        catch (e) {
            console.error(e);
        }
        return this;
    };
    /**
     * @description Remove all children of the node.
     * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
     * representing all the nodes to remove. Defaults to the node's `childrenArray`.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeAllChildren = function _removeAllChildren(referenceList = this.childrenArray) {
        if (!this.element)
            return this;
        try {
            for (let i = 0; i < referenceList.length; i++)
                this.removeChild(referenceList[i]);
        }
        catch (e) {
            console.error(e);
        }
        return this;
    };
    //Child identification
    /**
     * @description Returns the child of the parent node at the given index. Any number inputted (including negatives)
     * will be reduced modulo length of the list size.
     * @param {number} [index] - The index of the child to retrieve.
     * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
     * use as computation reference for index placement. Defaults to the node's `childrenArray`.
     * @returns {Node | Element | null} The child at the given index, or `null` if the index is invalid.
     */
    TurboSelector.prototype.childAt = function _childAt(index, referenceList = this.childrenArray) {
        if (!this.element || index === undefined)
            return null;
        if (index >= referenceList.length)
            index = referenceList.length - 1;
        while (index < 0)
            index += referenceList.length;
        return referenceList[index];
    };
    /**
     * @description Returns the index of the given child.
     * @param {Node} [child] - The child element to find.
     * @param {Node[] | Element[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
     * use as computation reference for index placement. Defaults to the node's `childrenArray`.
     * @returns {number} The index of the child node in the provided list, or -1 if the child is not found.
     */
    TurboSelector.prototype.indexOfChild = function _indexOfChild(child, referenceList = this.childrenArray) {
        if (!this.element || !child)
            return -1;
        if (!(referenceList instanceof Array))
            referenceList = Array.from(referenceList);
        return referenceList.indexOf(child);
    };
    /**
     * @description Identify whether one or more children belong to this parent node.
     * @param {Node | Node[]} [children] - Array of (or single) child nodes.
     * @returns {boolean} A boolean indicating whether the provided nodes belong to the parent or not.
     */
    TurboSelector.prototype.hasChild = function _hasChild(children) {
        if (!this.element || !children)
            return false;
        const nodesArray = Array.from(this.element?.childNodes);
        if (children instanceof Node)
            return nodesArray.includes(children);
        for (const child of children) {
            if (!nodesArray.includes(child))
                return false;
        }
        return true;
    };
    /**
     * Finds the closest ancestor of the current element (or the current element itself) that matches the provided
     * CSS selector or element type.
     * @param {ValidTag | (new (...args: any[]) => Element)} type - The (valid) CSS selector string, or element
     * constructor/class to match.
     * @returns {Element | null} The matching ancestor element, or null if no match is found.
     */
    TurboSelector.prototype.closest = function _closest(type) {
        if (!this.element || !type || !(this.element instanceof Element))
            return null;
        if (typeof type === "string") {
            return this.element.closest(type);
        }
        else if (typeof type === "function") {
            let element = this.element;
            while (element && !(element instanceof type))
                element = element.parentElement;
            return element || null;
        }
        return null;
    };
    //Parent identification
    /**
     * @description Finds whether this node is within the given parent(s).
     * @param {Node | Node[]} [parents] - The parent(s) to check.
     * @returns {boolean} True if the node is within the given parents, false otherwise.
     */
    TurboSelector.prototype.findInParents = function _findInParents(parents) {
        if (!parents || !this.element)
            return false;
        if (parents instanceof Node)
            parents = [parents];
        let element = this.element;
        let count = 0;
        while (element && count < parents.length) {
            if (parents.includes(element))
                count++;
            element = element.parentNode;
        }
        return count === parents.length;
    };
    /**
     * @description Finds whether one or more children belong to this node.
     * @param {Node | Node[]} [children] - The child or children to check.
     * @returns {boolean} True if the children belong to the node, false otherwise.
     */
    TurboSelector.prototype.findInSubTree = function _findInSubTree(children) {
        if (!children || !this.element)
            return false;
        if (children instanceof Node)
            children = [children];
        let count = 0;
        const recur = (node) => {
            if (children.includes(node))
                count++;
            if (count >= children.length)
                return;
            node.childNodes.forEach(child => recur(child));
        };
        recur(this.element);
        return count >= children.length;
    };
    /**
     * @description Finds whether one or more children belong to this node.
     * @param {Node[]} [referenceList=this.siblings] - The siblings list to use as computation
     * reference for index placement. Defaults to the node's `siblings`.
     * @returns {boolean} True if the children belong to the node, false otherwise.
     */
    TurboSelector.prototype.indexInParent = function _indexInParent(referenceList = this.siblings) {
        if (!referenceList || !this.element)
            return -1;
        return referenceList.indexOf(this.element);
    };
    //Parent manipulation
    /**
     * @description Add one or more children to the referenced parent node.
     * @param {Node} [parent] - Array of (or single) child nodes.
     * @param {number} [index] - The position at which to add the child relative to the parent's child list.
     * Leave undefined to add the child at the end.
     * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
     * use as computation reference for index placement. Defaults to the node's `childrenArray`.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.addToParent = function _addToParent(parent, index, referenceList) {
        if (!this.element || !parent)
            return this;
        $(parent).addChild(this.element, index, referenceList);
        return this;
    };
}

/**
 * @constant
 * @description Default array-like keys to merge when applying defaults with {@link TurboSelector.applyDefaults}.
 */
const ApplyDefaultsMergeProperties = ["interactors", "tools", "substrates", "controllers", "handlers"];

function setupMiscFunctions() {
    /**
     * @description Execute a callback on the node while still benefiting from chaining.
     * @param {(el: this) => void} callback The function to execute, with 1 parameter representing the instance itself.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.execute = function _execute(callback) {
        callback(this);
        return this;
    };
    TurboSelector.prototype.applyDefaults = function applyDefaults(defaults, options = {}) {
        if (!this.element || typeof this.element !== "object")
            return this;
        const { mergeProperties = ApplyDefaultsMergeProperties, removeDuplicates = true } = options;
        for (const [key, value] of Object.entries(defaults)) {
            const isMergeKey = mergeProperties?.includes(key);
            if (isMergeKey) {
                const defaultArray = Array.isArray(value) ? value : [value];
                const currentArray = isUndefined(this.element[key]) ? []
                    : Array.isArray(this.element[key]) ? this.element[key].slice()
                        : [this.element[key]];
                let merged = currentArray.concat(defaultArray);
                if (removeDuplicates)
                    merged = Array.from(new Set(merged));
                this.element[key] = merged;
            }
            else if (isUndefined(this.element[key])) {
                this.element[key] = value;
            }
        }
        return this;
    };
}

class ClassFunctionsUtils {
    /**
     * @description Utility function to operate on the provided classes
     * @param selector
     * @param classes
     * @param callback
     */
    operateOnClasses(selector, classes, callback = (() => { })) {
        if (!selector || !classes || !selector.element)
            return selector;
        try {
            // If string provided --> split by spaces
            if (typeof classes === "string")
                classes = classes.split(" ");
            classes.filter(entry => entry.trim().length > 0)
                .forEach(entry => callback(entry));
        }
        catch (e) {
            console.error(e);
        }
        return selector;
    }
}

const utils$8 = new ClassFunctionsUtils();
function setupClassFunctions() {
    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.addClass = function _addClass(classes) {
        if (!(this.element instanceof Element))
            return this;
        return utils$8.operateOnClasses(this, classes, entry => this.element.classList.add(entry));
    };
    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeClass = function _removeClass(classes) {
        if (!(this.element instanceof Element))
            return this;
        return utils$8.operateOnClasses(this, classes, entry => this.element.classList.remove(entry));
    };
    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.toggleClass = function _toggleClass(classes, force) {
        if (!(this.element instanceof Element))
            return this;
        return utils$8.operateOnClasses(this, classes, entry => this.element.classList.toggle(entry, force));
    };
    /**
     * @description Check if the element's class list contains the provided class(es).
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings
     * @return A boolean indicating whether the provided classes are included
     */
    TurboSelector.prototype.hasClass = function _hasClass(classes) {
        if (!classes || !(this.element instanceof Element))
            return false;
        if (typeof classes === "string")
            return this.element.classList.contains(classes);
        for (let entry of classes) {
            if (!this.element.classList.contains(entry))
                return false;
        }
        return true;
    };
}

const SvgNamespace = "http://www.w3.org/2000/svg";
const MathMLNamespace = "http://www.w3.org/1998/Math/MathML";
const SvgTags = new Set([
    "a", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "ellipse",
    "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting",
    "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR",
    "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight",
    "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "image",
    "line", "linearGradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline",
    "radialGradient", "rect", "script", "set", "stop", "style", "svg", "switch", "symbol", "text", "textPath",
    "title", "tspan", "use", "view",
]);
const MathMLTags = new Set([
    "annotation", "annotation-xml", "maction", "math", "merror", "mfrac", "mi", "mmultiscripts", "mn", "mo",
    "mover", "mpadded", "mphantom", "mprescripts", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub",
    "msubsup", "msup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "semantics",
]);
/**
 * @description Evaluates whether the provided string is an SVG tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the SVG namespace or not.
 */
function isSvgTag(tag) {
    return SvgTags.has(tag) || tag?.startsWith("svg");
}
/**
 * @description Evaluates whether the provided string is a MathML tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the MathML namespace or not.
 */
function isMathMLTag(tag) {
    return MathMLTags.has(tag) || tag?.startsWith("math");
}

/**
 * @description Create an element with the specified properties (and the specified namespace if applicable).
 * @param {TurboProperties<Tag>} [properties] - Object containing properties of the element.
 * @returns {ValidElement<Tag>} The created element.
 * @template Tag
 */
function element(properties = {}) {
    let element;
    if (properties.namespace) {
        if (properties.namespace == "svg")
            element = document.createElementNS(SvgNamespace, properties.tag || "svg");
        else if (properties.namespace == "mathML")
            element = document.createElementNS(MathMLNamespace, properties.tag || "math");
        else
            element = document.createElementNS(properties.namespace, properties.tag || "div");
    }
    else {
        element = document.createElement(properties.tag || "div");
    }
    if (properties.shadowDOM)
        element.attachShadow({ mode: "open" });
    $(element).setProperties(properties);
    return element;
}
/**
 * @description Create an element with the specified properties. Supports SVG and MathML.
 * @param {TurboProperties<Tag>} [properties] - Object containing properties of the element.
 * @returns {ValidElement<Tag>} The created element.
 * @template Tag
 */
function blindElement(properties = {}) {
    let element;
    if (isSvgTag(properties.tag))
        element = document.createElementNS(SvgNamespace, properties.tag || "svg");
    else if (isMathMLTag(properties.tag))
        element = document.createElementNS(MathMLNamespace, properties.tag || "math");
    else
        element = document.createElement(properties.tag || "div");
    if (properties.shadowDOM)
        element.attachShadow({ mode: "open" });
    $(element).setProperties(properties);
    return element;
}

/**
 * @description returns a function that generates an HTML element with the provided tag that takes TurboProperties
 * as input.
 * @param {keyof ElementTagMap} tag - The tag to generate the function from.
 * @return The function
 */
function generateTagFunction(tag) {
    return (properties = {}) => {
        properties.tag = tag;
        return element({ ...properties, tag: tag });
    };
}
/**
 * @description Creates an "a" element with the specified properties.
 * @param {TurboProperties<"a">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"a">} The created element.
 */
function a(properties = {}) {
    return element({ ...properties, tag: "a" });
}
/**
 * @description Creates a "canvas" element with the specified properties.
 * @param {TurboProperties<"canvas">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"canvas">} The created element.
 */
function canvas(properties = {}) {
    return element({ ...properties, tag: "canvas" });
}
/**
 * @description Creates a "div" element with the specified properties.
 * @param {TurboProperties<"div">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"div">} The created element.
 */
function div(properties = {}) {
    return element({ ...properties, tag: "div" });
}
/**
 * @description Creates a "form" element with the specified properties.
 * @param {TurboProperties<"form">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"form">} The created element.
 */
function form(properties = {}) {
    return element({ ...properties, tag: "form" });
}
/**
 * @description Creates a "h1" element with the specified properties.
 * @param {TurboProperties<"h1">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h1">} The created element.
 */
function h1(properties = {}) {
    return element({ ...properties, tag: "h1" });
}
/**
 * @description Creates a "h2" element with the specified properties.
 * @param {TurboProperties<"h2">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h2">} The created element.
 */
function h2(properties = {}) {
    return element({ ...properties, tag: "h2" });
}
/**
 * @description Creates a "h3" element with the specified properties.
 * @param {TurboProperties<"h3">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h3">} The created element.
 */
function h3(properties = {}) {
    return element({ ...properties, tag: "h3" });
}
/**
 * @description Creates a "h4" element with the specified properties.
 * @param {TurboProperties<"h4">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h4">} The created element.
 */
function h4(properties = {}) {
    return element({ ...properties, tag: "h4" });
}
/**
 * @description Creates a "h5" element with the specified properties.
 * @param {TurboProperties<"h5">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h5">} The created element.
 */
function h5(properties = {}) {
    return element({ ...properties, tag: "h5" });
}
/**
 * @description Creates a "h6" element with the specified properties.
 * @param {TurboProperties<"h6">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h6">} The created element.
 */
function h6(properties = {}) {
    return element({ ...properties, tag: "h6" });
}
/**
 * @description Creates an "img" element with the specified properties.
 * @param {TurboProperties<"img">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"img">} The created element.
 */
function img(properties = {}) {
    return element({ ...properties, tag: "img" });
}
/**
 * @description Creates an "input" element with the specified properties.
 * @param {TurboProperties<"input">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"input">} The created element.
 */
function input(properties = {}) {
    return element({ ...properties, tag: "input" });
}
/**
 * @description Creates a "link" element with the specified properties.
 * @param {TurboProperties<"link">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"link">} The created element.
 */
function link(properties = {}) {
    return element({ ...properties, tag: "link" });
}
/**
 * @description Creates a "p" element with the specified properties.
 * @param {TurboProperties<"p">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"p">} The created element.
 */
function p(properties = {}) {
    return element({ ...properties, tag: "p" });
}
/**
 * @description Creates a "span" element with the specified properties.
 * @param {TurboProperties<"span">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"span">} The created element.
 */
function span(properties = {}) {
    return element({ ...properties, tag: "span" });
}
/**
 * @description Creates a "style" element with the specified properties.
 * @param {TurboProperties<"style">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"style">} The created element.
 */
function style(properties = {}) {
    return element({ ...properties, tag: "style" });
}
/**
 * @description Creates a "textarea" element with the specified properties.
 * @param {TurboProperties<"textarea">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"textarea">} The created element.
 */
function textarea(properties = {}) {
    return element({ ...properties, tag: "textarea" });
}
/**
 * @description Creates a "video" element with the specified properties.
 * @param {TurboProperties<"video">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"video">} The created element.
 */
function video(properties = {}) {
    return element({ ...properties, tag: "video" });
}

/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string} [styles] - The css string. Use the css literal function for autocompletion.
 * @param {StylesRoot} [root] - The root to which the style element will be added.
 */
function stylesheet(styles, root = document.head) {
    if (!styles)
        return;
    const stylesheet = style({ innerHTML: styles });
    $(root).addChild(stylesheet);
}

/**
 * @class TurboEmitter
 * @template {TurboModel} ModelType -The element's MVC model type.
 * @description The base MVC emitter class. Its role is basically an event bus. It allows the different parts of the
 * MVC structure to fire events or listen to some, with various methods.
 */
class TurboEmitter {
    /**
     * @description Map containing all callbacks.
     * @protected
     */
    callbacks = new Map();
    /**
     * @description The attached MVC model.
     */
    model;
    constructor(model) {
        if (model)
            this.model = model;
    }
    get defaultBlockKey() {
        if (this.model)
            return this.model.defaultBlockKey;
        return "__defaultBlockKey__";
    }
    /**
     * @function getBlock
     * @description Retrieves the callback block by the given blockKey.
     * @param {number | string} [blockKey] - The key of the block to retrieve.
     * @protected
     */
    getBlock(blockKey) {
        return this.callbacks.get(blockKey?.toString());
    }
    /**
     * @function getOrGenerateBlock
     * @description Retrieves or creates a callback map for a given blockKey.
     * @param {number | string} [blockKey] - The block key.
     * @returns {Map<string, ((...args: any[]) => void)[]>} - The ensured callback map.
     * @protected
     */
    getOrGenerateBlock(blockKey) {
        if (!this.callbacks.has(blockKey.toString()))
            this.callbacks.set(blockKey.toString(), new Map());
        return this.callbacks.get(blockKey.toString());
    }
    /**
     * @function getKey
     * @description Gets all callbacks for a given event key within a block.
     * @param {string} key - The event name.
     * @param {number | string} [blockKey] - The block in which the event is scoped.
     * @returns {((...args: any[]) => void)[]} - An array of callbacks for that event.
     * @protected
     */
    getKey(key, blockKey) {
        const block = this.getBlock(blockKey);
        return block ? block.get(key) : [];
    }
    /**
     * @function getOrGenerateKey
     * @description Ensures and returns the array of callbacks for a given event key within a block.
     * @param {string} key - The event name.
     * @param {number | string} [blockKey] - The block in which the event is scoped.
     * @returns {((...args: any[]) => void)[]} - An array of callbacks for that event.
     * @protected
     */
    getOrGenerateKey(key, blockKey) {
        const block = this.getOrGenerateBlock(blockKey);
        if (!block.has(key))
            block.set(key, []);
        return block.get(key);
    }
    /**
     * @function addWithBlock
     * @description Registers a callback for an event key within a specified block -- usually for the corresponding
     * data block in the model.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block to register the event in.
     * @param {(...args: any[]) => void} callback - The callback function to invoke when the event is fired.
     */
    addWithBlock(key, blockKey, callback) {
        this.getOrGenerateKey(key, blockKey).push(callback);
    }
    /**
     * @function add
     * @description Registers a callback for an event key in the default block.
     * @param {string} key - The event name.
     * @param {(...args: any[]) => void} callback - The callback function.
     */
    add(key, callback) {
        this.addWithBlock(key, this.defaultBlockKey, callback);
    }
    /**
     * @function removeWithBlock
     * @description Removes a specific callback or all callbacks for a key within a block.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block from which to remove the event.
     * @param {(...args: any[]) => void} [callback] - The specific callback to remove. If undefined, all callbacks
     * for the key are removed.
     */
    removeWithBlock(key, blockKey, callback) {
        if (callback == undefined)
            this.getBlock(blockKey)?.delete(key);
        else {
            const callbacks = this.getKey(key, blockKey);
            const index = callbacks.indexOf(callback);
            if (index >= 0)
                callbacks.splice(index, 1);
        }
    }
    /**
     * @function remove
     * @description Removes a specific callback or all callbacks for a key in the default block.
     * @param {string} key - The event name.
     * @param {(...args: any[]) => void} [callback] - The callback to remove. If omitted, all callbacks are removed.
     */
    remove(key, callback) {
        this.removeWithBlock(key, this.defaultBlockKey, callback);
    }
    /**
     * @function fireWithBlock
     * @description Triggers all callbacks associated with an event key in a specified block.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block in which the event is scoped.
     * @param {...any[]} args - Arguments passed to each callback.
     */
    fireWithBlock(key, blockKey, ...args) {
        this.callbacks.get(blockKey.toString())?.get(key)?.forEach((callback) => {
            if (callback && typeof callback == "function")
                callback(...args);
        });
    }
    /**
     * @function fire
     * @description Triggers all callbacks associated with an event key in the default block.
     * @param {string} key - The event name.
     * @param {...any[]} args - Arguments passed to the callback.
     */
    fire(key, ...args) {
        this.fireWithBlock(key, this.defaultBlockKey, ...args);
    }
}

/**
 * @class Mvc
 * @description MVC -- Model-View-Component -- handler. Generates and manages an MVC structure for a certain object.
 * @template {object} ElementType - The type of the object that will be turned into MVC.
 * @template {TurboView} ViewType - The element's view type.
 * @template {object} DataType - The element's data type.
 * @template {TurboModel<DataType>} ModelType - The element's model type.
 * @template {TurboEmitter} EmitterType - The element's emitter type.
 * */
class Mvc {
    /**
     * @description The element/root of the MVC structure.
     */
    element;
    _view;
    _model;
    _emitter;
    _controllers = new Map();
    _handlers = new Map();
    _interactors = new Map();
    _tools = new Map();
    _substrates = new Map();
    constructor(properties) {
        if (properties.element)
            this.element = properties.element;
        if (!properties.emitter)
            this.emitter = new TurboEmitter();
        this.generate(properties);
    }
    /**
     * @description The view (if any) of the current MVC structure. Setting it will update the view and link it
     * with the existing pieces.
     */
    get view() {
        return this._view;
    }
    set view(value) {
        this._view = this.generateInstance(value, { element: this.element });
        this.linkPieces();
    }
    /**
     * @description The model (if any) of the current MVC structure. Setting it will update the model and link it
     * with the existing pieces.
     */
    get model() {
        return this._model;
    }
    set model(model) {
        this.model?.keyChangedCallback.remove(this.emitterFireCallback);
        this._model = this.generateInstance(model);
        this._model.handlers = this._handlers;
        this._model.addHandler = (handler) => this.addHandler(handler);
        this.linkPieces();
    }
    /**
     * @description The emitter (if any) of the current MVC structure. Setting it will update the emitter and link it
     * with the existing pieces.
     */
    get emitter() {
        return this._emitter;
    }
    set emitter(emitter) {
        this._emitter = this.generateInstance(emitter);
        this.linkPieces();
    }
    /**
     * @description The controllers (if any) of the current MVC structure. Setting it will not override the existing
     * controllers, but only add the new values and link them with the existing pieces.
     */
    get controllers() {
        return Array.from(this._controllers.values()) || [];
    }
    set controllers(value) {
        this.generateInstances(value, { element: this.element })
            .forEach(instance => this.addController(instance));
        this.linkPieces();
    }
    /**
     * @description The handlers (if any) of the current MVC structure. Setting it will not override the existing
     * handlers, but only add the new values and link them with the existing pieces.
     */
    get handlers() {
        return Array.from(this._handlers.values()) || [];
    }
    set handlers(value) {
        this.generateInstances(value).forEach(instance => this.addHandler(instance));
        this.linkPieces();
    }
    /**
     * @description The interactors (if any) of the current MVC structure. Setting it will not override the existing
     * interactors, but only add the new values and link them with the existing pieces.
     */
    get interactors() {
        return Array.from(this._interactors.values()) || [];
    }
    set interactors(value) {
        this.generateInstances(value, { element: this.element })
            .forEach(instance => this.addInteractor(instance));
        this.linkPieces();
    }
    /**
     * @description The tools (if any) of the current MVC structure. Setting it will not override the existing
     * tools, but only add the new values and link them with the existing pieces.
     */
    get tools() {
        return Array.from(this._tools.values()) || [];
    }
    set tools(value) {
        this.generateInstances(value, { element: this.element })
            .forEach(instance => this.addTool(instance));
        this.linkPieces();
    }
    /**
     * @description The substrates (if any) of the current MVC structure. Setting it will not override the existing
     * substrates, but only add the new values and link them with the existing pieces.
     */
    get substrates() {
        return Array.from(this._substrates.values()) || [];
    }
    set substrates(value) {
        this.generateInstances(value, { element: this.element })
            .forEach(instance => this.addSubstrate(instance));
        this.linkPieces();
    }
    /**
     * @description The main data block (if any) attached to the model (if any).
     */
    get data() {
        return this.model?.data;
    }
    set data(data) {
        if (this.model)
            this.model.data = data;
    }
    /**
     * @description The ID of the main data block (if any) attached to the model (if any).
     */
    get dataId() {
        return this.model?.dataId;
    }
    set dataId(value) {
        if (this.model)
            this.model.dataId = value;
    }
    /**
     * @description The numerical index of the main data block (if any) attached to the model (if any).
     */
    get dataIndex() {
        return Number.parseInt(this.dataId);
    }
    set dataIndex(value) {
        if (this.model)
            this.model.dataId = value.toString();
    }
    /**
     * @description The size (number) of the main data block (if any) attached to the model (if any).
     */
    get dataSize() {
        return this.model?.getSize?.();
    }
    /**
     * @function getController
     * @description Retrieves the attached MVC controller with the given key.
     * By default, unless manually defined in the controller, if the element's class name is MyElement
     * and the controller's class name is MyElementSomethingController, the key would be "something".
     * @param {string} key - The controller's key.
     * @return {TurboController} - The controller.
     */
    getController(key) {
        return this._controllers.get(key);
    }
    /**
     * @function addController
     * @description Adds the given controller to the MVC structure.
     * @param {TurboController} controller - The controller to add.
     */
    addController(controller) {
        if (!controller.keyName)
            controller.keyName =
                this.extractClassEssenceName(controller.constructor, "Controller");
        this._controllers.set(controller.keyName, controller);
        this.updateController(controller);
    }
    /**
     * @function getHandler
     * @description Retrieves the attached MVC handler with the given key.
     * By default, unless manually defined in the handler, if the element's class name is MyElement
     * and the handler's class name is MyElementSomethingHandler, the key would be "something".
     * @param {string} key - The handler's key.
     * @return {TurboHandler} - The handler.
     */
    getHandler(key) {
        return this._handlers.get(key);
    }
    /**
     * @function addHandler
     * @description Adds the given handler to the MVC structure.
     * @param {TurboHandler} handler - The handler to add.
     */
    addHandler(handler) {
        if (!handler.keyName)
            handler.keyName =
                this.extractClassEssenceName(handler.constructor, "Handler");
        this._handlers.set(handler.keyName, handler);
        this.updateHandler(handler);
    }
    /**
     * @function getInteractor
     * @description Retrieves the attached MVC interactor with the given key.
     * By default, unless manually defined in the interactor, if the element's class name is MyElement
     * and the interactor's class name is MyElementSomethingInteractor, the key would be "something".
     * @param {string} key - The interactor's key.
     * @return {TurboInteractor} - The interactor.
     */
    getInteractor(key) {
        return this._interactors.get(key);
    }
    /**
     * @function addInteractor
     * @description Adds the given interactor to the MVC structure.
     * @param {TurboInteractor} interactor - The interactor to add.
     */
    addInteractor(interactor) {
        if (!interactor.keyName)
            interactor.keyName =
                this.extractClassEssenceName(interactor.constructor, "Interactor");
        this._interactors.set(interactor.keyName, interactor);
        this.updateInteractor(interactor);
    }
    /**
     * @function getTool
     * @description Retrieves the attached MVC Tool with the given key.
     * By default, unless manually defined in the tool, if the element's class name is MyElement
     * and the tool's class name is MyElementSomethingTool, the key would be "something".
     * @param {string} key - The tool's key.
     * @return {TurboTool} - The tool.
     */
    getTool(key) {
        return this._tools.get(key);
    }
    /**
     * @function addTool
     * @description Adds the given tool to the MVC structure.
     * @param {TurboTool} tool - The tool to add.
     */
    addTool(tool) {
        if (!tool.keyName)
            tool.keyName =
                this.extractClassEssenceName(tool.constructor, "Tool");
        this._tools.set(tool.keyName, tool);
        this.updateTool(tool);
    }
    /**
     * @function getSubstrate
     * @description Retrieves the attached MVC Substrate with the given key.
     * By default, unless manually defined in the substrate, if the element's class name is MyElement
     * and the substrate's class name is MyElementSomethingSubstrate, the key would be "something".
     * @param {string} key - The substrate's key.
     * @return {TurboSubstrate} - The substrate.
     */
    getSubstrate(key) {
        return this._substrates.get(key);
    }
    /**
     * @function addSubstrate
     * @description Adds the given substrate to the MVC structure.
     * @param {TurboSubstrate} substrate - The substrate to add.
     */
    addSubstrate(substrate) {
        if (!substrate.keyName)
            substrate.keyName =
                this.extractClassEssenceName(substrate.constructor, "Substrate");
        this._substrates.set(substrate.keyName, substrate);
        this.updateSubstrate(substrate);
    }
    /**
     * @function generate
     * @description Generates the MVC structure based on the provided properties.
     * If no model or model constructor is defined, no model will be generated. The same applies for the view.
     * If not defined, a default emitter will be created.
     * @param {MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>} properties - The properties to use
     * to generate the MVC structure.
     */
    generate(properties = {}) {
        for (const property of Object.keys(properties)) {
            const value = properties[property];
            if (value === undefined || property === "initialize" || property === "data")
                continue;
            this[property] = value;
        }
        if (!this._emitter)
            this.emitter = new TurboEmitter();
        if (properties.data && this.model)
            this.model.setBlock(properties.data, undefined, undefined, false);
        if (properties.initialize === undefined || properties.initialize)
            this.initialize();
    }
    /**
     * @function initialize
     * @description Initializes the MVC parts: the view, the controllers, the interactors, the tools, the substrates,
     * and the model (in this order). The model is initialized last to allow for the view and controllers to set up
     * their change callbacks.
     */
    initialize() {
        this.view?.initialize();
        this._controllers.forEach(controller => controller.initialize());
        this._interactors.forEach(interactor => interactor.initialize());
        this._tools.forEach(tool => tool.initialize());
        this._substrates.forEach(substrate => substrate.initialize());
        this.model?.initialize();
    }
    updateController(controller) {
        controller.emitter = this.emitter;
        controller.model = this.model;
        controller.view = this.view;
    }
    updateHandler(handler) {
        handler.model = this.model;
    }
    updateInteractor(interactor) {
        interactor.model = this.model;
        interactor.view = this.view;
        interactor.emitter = this.emitter;
    }
    updateTool(tool) {
        tool.emitter = this.emitter;
        tool.model = this.model;
        tool.view = this.view;
    }
    updateSubstrate(substrate) {
        substrate.model = this.model;
        substrate.view = this.view;
        substrate.emitter = this.emitter;
    }
    linkPieces() {
        if (this.model && !this.model.keyChangedCallback.has(this.emitterFireCallback)) {
            this.model.keyChangedCallback.add(this.emitterFireCallback);
        }
        if (this.emitter)
            this.emitter.model = this.model;
        if (this.view) {
            this.view.emitter = this.emitter;
            this.view.model = this.model;
        }
        this._controllers.forEach(controller => this.updateController(controller));
        this._handlers.forEach(handler => this.updateHandler(handler));
        this._interactors.forEach(interactor => this.updateInteractor(interactor));
        this._tools.forEach(tool => this.updateTool(tool));
        this._substrates.forEach(substrate => this.updateSubstrate(substrate));
    }
    generateInstance(data, properties, shallowCopyProperties = true) {
        if (!data)
            return undefined;
        if (typeof data === "function") {
            const shouldClone = shallowCopyProperties && properties && typeof properties === "object";
            const prop = shouldClone ? { ...properties } : properties;
            return new data(prop);
        }
        return data;
    }
    generateInstances(data, properties, shallowCopyProperties = true) {
        if (!data)
            return [];
        if (typeof data !== "object" || !Array.isArray(data))
            data = [data];
        const result = [];
        data.forEach(constructor => {
            const instance = this.generateInstance(constructor, properties, shallowCopyProperties);
            if (instance)
                result.push(instance);
        });
        return result;
    }
    emitterFireCallback = (keyName, blockKey, ...args) => this.emitter?.fireWithBlock(keyName, blockKey, ...args);
    extractClassEssenceName(constructor, type) {
        let className = constructor.name;
        let prototype = Object.getPrototypeOf(this.element);
        while (prototype && prototype.constructor !== Object) {
            const name = prototype.constructor.name.replaceAll("_", "");
            if (className.startsWith(name)) {
                className = className.slice(name.length);
                break;
            }
            prototype = Object.getPrototypeOf(prototype);
        }
        if (className.endsWith(type))
            className = className.slice(0, -(type.length));
        return className.charAt(0).toLowerCase() + className.slice(1);
    }
}

/**
 * @class Delegate
 * @template {(...args: any[]) => any} CallbackType - The type of callbacks accepted by the delegate.
 * @description Class representing a set of callbacks that can be maintained and executed together.
 */
class SimpleDelegate {
    callbacks = new Set();
    /**
     * @description Adds a callback to the list.
     * @param callback - The callback function to add.
     */
    add(callback) {
        this.callbacks.add(callback);
    }
    /**
     * @description Removes a callback from the list.
     * @param callback - The callback function to remove.
     * @returns A boolean indicating whether the callback was found and removed.
     */
    remove(callback) {
        return this.callbacks.delete(callback);
    }
    /**
     * @description Checks whether a callback is in the list.
     * @param callback - The callback function to check for.
     * @returns A boolean indicating whether the callback was found.
     */
    has(callback) {
        return this.callbacks.has(callback);
    }
    /**
     * @description Invokes all callbacks with the provided arguments.
     * @param args - The arguments to pass to the callbacks.
     */
    fire(...args) {
        let returnValue;
        for (const callback of this.callbacks) {
            try {
                const value = callback(...args);
                if (!isUndefined(value))
                    returnValue = value;
            }
            catch (error) {
                console.error("Error invoking callback:", error);
            }
        }
        return returnValue;
    }
    /**
     * @description Clears added callbacks
     */
    clear() {
        this.callbacks.clear();
    }
}
/**
 * @class Delegate
 * @template {(...args: any[]) => any} CallbackType - The type of callbacks accepted by the delegate.
 * @description Class representing a set of callbacks that can be maintained and executed together.
 */
class Delegate extends SimpleDelegate {
    /**
     * @description Delegate fired when a callback is added.
     */
    onAdded = new SimpleDelegate();
    /**
     * @description Adds a callback to the list.
     * @param callback - The callback function to add.
     */
    add(callback) {
        super.add(callback);
        this.onAdded.fire(callback);
    }
}

/**
 * @internal
 */
class ReactivityUtils {
    constructorMap = new WeakMap();
    dataMap = new WeakMap();
    activeEffect = null;
    constructorData(target) {
        let obj = this.constructorMap.get(target);
        if (!obj) {
            obj = { installed: new Map() };
            this.constructorMap.set(target, obj);
        }
        return obj;
    }
    data(target) {
        let map = this.dataMap.get(target);
        if (!map) {
            map = new Map();
            this.dataMap.set(target, map);
        }
        return map;
    }
    track(entry) {
        if (this.activeEffect)
            this.activeEffect.dependencies.add(entry);
    }
    createSignalEntry(targetOrInitial, key, read, write, options) {
        const subs = new Set();
        const self = this;
        const isBound = key !== undefined || read !== undefined;
        let underlyingValue = targetOrInitial;
        if (!options)
            options = { diffOnWrite: true };
        const entry = {
            get() {
                self.track(entry);
                return isBound ? read() : underlyingValue;
            },
            set(value) {
                if (!isBound) {
                    const prev = underlyingValue;
                    underlyingValue = value;
                    if (!Object.is(prev, value))
                        entry.emit();
                }
                //If "write" is passed, setup emit() behavior. Otherwise, reflect to already defined setter.
                else if (write && !options.diffOnWrite) {
                    write(value);
                    entry.emit();
                }
                else if (write) {
                    const prev = read();
                    write(value);
                    const next = read();
                    if (!Object.is(prev, next))
                        entry.emit();
                }
                else
                    Reflect.set(targetOrInitial, key, value, targetOrInitial);
            },
            update(updater) {
                entry.set(updater(isBound ? read() : underlyingValue));
            },
            sub(fn) {
                subs.add(fn);
                return () => subs.delete(fn);
            },
            emit() {
                for (const fn of Array.from(subs))
                    queueMicrotask(fn);
            }
        };
        return entry;
    }
    getReactivityData(target, key) {
        const data = this.data(target);
        if (!data.has(key))
            data.set(key, {});
        return data.get(key);
    }
    getSignal(target, key) {
        return this.getReactivityData(target, key).signal;
    }
    setSignal(target, key, next) {
        const entry = this.getSignal(target, key);
        if (entry)
            entry.set(next);
        else
            Reflect.set(target, key, next, target);
    }
    getEffect(target, key) {
        return this.getReactivityData(target, key).effect;
    }
    setEffect(target, key, effect) {
        this.getReactivityData(target, key).effect = effect;
    }
    markDirty(target, key) {
        this.getSignal(target, key)?.emit();
    }
    schedule(effect) {
        if (effect.scheduled)
            return;
        effect.scheduled = true;
        queueMicrotask(() => {
            effect.scheduled = false;
            effect.run();
        });
    }
}

class SignalUtils {
    utils;
    constructor(utils) {
        this.utils = utils;
    }
    createBoxFromEntry(entry) {
        return new Proxy({
            ...entry,
            toJSON: () => entry.get(),
            valueOf: () => entry.get(),
            [Symbol.toPrimitive]: (hint) => {
                const value = entry.get();
                if (hint === "string")
                    return String(value);
                if (typeof value === "number")
                    return value;
                if (value != null && typeof value.valueOf === "function")
                    return value.valueOf();
                return value;
            },
            get value() {
                return entry.get();
            },
            set value(value) {
                entry.set(value);
            }
        }, {
            get(target, key, receiver) {
                return Reflect.get(target, key, receiver);
            },
            set(target, key, value, receiver) {
                if (key === "value") {
                    target.value = value;
                    return true;
                }
                return Reflect.set(target, key, value, receiver);
            }
        });
    }
    signalDecorator(value, context, baseGetter, baseSetter) {
        const { kind, name, static: isStatic, private: isPrivate } = context;
        if (isPrivate)
            throw new Error("@signal does not support private class elements.");
        const key = name;
        const backingKey = Symbol(`[[signal:${String(key)}]]`);
        const shadowKey = Symbol(`[[signal:${String(key)}:shadow]]`);
        const utils = this.utils;
        context.addInitializer(function () {
            const prototype = isStatic ? this : this.constructor.prototype;
            let customGetter;
            let customSetter;
            const read = function () {
                if (baseGetter && !this[shadowKey])
                    return baseGetter.call(this);
                if (customGetter && !this[shadowKey])
                    return customGetter.call(this);
                return this[backingKey];
            };
            const write = function (v) {
                if (!customSetter && !baseSetter) {
                    this[backingKey] = v;
                    this[shadowKey] = true;
                }
                else {
                    if (baseSetter)
                        baseSetter.call(this, v);
                    if (customSetter)
                        customSetter.call(this, v);
                    if (!customGetter && !baseGetter) {
                        this[backingKey] = v;
                        this[shadowKey] = true;
                    }
                }
            };
            const ensureEntry = (self, diffOnWrite = true) => {
                let entry = utils.getSignal(self, key);
                if (entry)
                    return entry;
                if (kind === "field" && !customGetter && !baseGetter)
                    self[backingKey] = self[key];
                entry = utils.createSignalEntry(self, key, () => read.call(self), (v) => write.call(self, v), { diffOnWrite });
                utils.getReactivityData(self, key).signal = entry;
                if (kind === "field")
                    delete self[key];
                return entry;
            };
            if (kind === "field" || kind === "accessor") {
                const acc = value;
                if (acc?.get)
                    customGetter = acc.get;
                if (acc?.set)
                    customSetter = acc.set;
                const entry = ensureEntry(this, !customGetter && !baseGetter);
                const descriptor = getFirstDescriptorInChain(this, key);
                Object.defineProperty(this, key, {
                    configurable: descriptor?.configurable ?? true,
                    enumerable: descriptor?.enumerable ?? true,
                    get: () => {
                        utils.track(entry);
                        return read.call(this);
                    },
                    set: (v) => entry.set(v),
                });
            }
            else if (kind === "getter" || kind === "setter") {
                const installed = utils.constructorData(prototype).installed;
                if (installed.get(key))
                    return;
                installed.set(key, true);
                const descriptor = getFirstDescriptorInChain(prototype, key) ?? {};
                if (typeof descriptor.get === "function")
                    customGetter = descriptor.get;
                if (typeof descriptor.set === "function")
                    customSetter = descriptor.set;
                Object.defineProperty(prototype, key, {
                    configurable: descriptor?.configurable ?? true,
                    enumerable: !!descriptor?.enumerable,
                    get: function () {
                        const e = ensureEntry(this, !customGetter && !baseGetter);
                        utils.track(e);
                        return read.call(this);
                    },
                    set: function (v) {
                        const e = ensureEntry(this, !customGetter && !baseGetter);
                        e.set(v);
                    },
                });
            }
        });
    }
}

class EffectUtils {
    utils;
    constructor(utils) {
        this.utils = utils;
    }
    makeEffect(callback) {
        const utils = this.utils;
        return {
            callback,
            dependencies: new Set(),
            cleanups: [],
            scheduled: false,
            run() {
                for (const c of this.cleanups)
                    c();
                this.cleanups = [];
                this.dependencies = new Set();
                utils.activeEffect = this;
                try {
                    this.callback();
                }
                finally {
                    utils.activeEffect = null;
                }
                for (const dep of this.dependencies) {
                    const unsub = dep.sub(() => utils.schedule(this));
                    this.cleanups.push(unsub);
                }
            },
            dispose() {
                for (const c of this.cleanups)
                    c();
                this.cleanups = [];
                this.dependencies.clear();
            }
        };
    }
}

const utils$7 = new ReactivityUtils();
const signalUtils = new SignalUtils(utils$7);
const effectUtils = new EffectUtils(utils$7);
function signal(...args) {
    if (args[1] && typeof args[1] === "object" && "kind" in args[1]
        && "name" in args[1] && "static" in args[1] && "private" in args[1])
        return signalUtils.signalDecorator(args[0], args[1]);
    const initial = args[0];
    return signalUtils.createBoxFromEntry(utils$7.createSignalEntry(initial));
}
/**
 * @decorator
 * @function modelSignal
 * @description Decorator that binds a reactive signal to a **model field**
 * retrieved via `this.getData(key, blockKey)` and stored via `this.setData(key, value, blockKey)`.
 * Useful to create signals in TurboModel classes.
 *
 * @param {string} dataKey - key to read/write (defaults to decorated member name when falsy).
 * @param {string | number} [blockKey] - Optional blockKey identifier.
 *
 * @example
 * ```ts
 * class TodoModel extends TurboModel {
 *   @modelSignal() title = "";
 * }
 * ```
 * Is equivalent to:
 * ```ts
 * class TodoModel extends TurboModel {
 *   @signal public get title() {
 *      return this.getData("title");
 *   }
 *
 *   public set title(value) {
 *      this.setData("title", value);
 *   }
 * }
 *
 * ```
 */
function modelSignal(dataKey, blockKey) {
    return function (value, context) {
        const key = dataKey ?? String(context.name);
        return signalUtils.signalDecorator(value, context, function () { return this.getData?.(key, blockKey); }, function (value) { this.setData?.(key, value, blockKey); });
    };
}
/**
 * @decorator
 * @function blockSignal
 * Binds a signal to an entire data-block of a TurboModel/YModel.
 * - Getter returns `this.getBlockData(blockKey)`
 * - Setter calls `this.setBlock(value, this.getBlockId(blockKey), blockKey)`
 *
 * @param {string|number} [blockKey] the block key, defaults to model.defaultBlockKey
 * @param id
 */
function blockSignal(blockKey, id) {
    return function (value, context) {
        const key = blockKey ?? String(context.name);
        return signalUtils.signalDecorator(value, context, function () { return this.getBlockData?.(key); }, function (value) { this.setBlock?.(value, id, key); });
    };
}
/**
 * @decorator
 * @function blockIdSignal
 * Same idea but binds the block **id**.
 */
function blockIdSignal(blockKey) {
    return function (value, context) {
        const key = blockKey ?? String(context.name);
        return signalUtils.signalDecorator(value, context, function () { return this.getBlockId?.(key); }, function (value) { this.setBlockId?.(value, key); });
    };
}
function effect(...args) {
    const value = args[0];
    const context = args[1];
    if (context && typeof context === "object" && "kind" in context
        && "name" in context && "static" in context && "private" in context) {
        const { kind, name, static: isStatic } = context;
        const key = String(name);
        if (kind !== "method" && kind !== "getter" && !(kind === "field" && typeof value === "function"))
            throw new Error("@effect can only decorate zero-arg instance methods or getters.");
        if (isStatic)
            throw new Error("@effect does not support static methods/getters.");
        context.addInitializer?.(function () {
            const self = this;
            const fn = function () { value?.call(this); };
            const eff = effectUtils.makeEffect(() => fn.call(self));
            utils$7.setEffect(self, key, eff);
        });
    }
    else if (typeof value === "function") {
        const eff = effectUtils.makeEffect(value);
        eff.run();
        return () => eff.dispose();
    }
}
/**
 * @function getSignal
 * @template Type
 * @description Retrieve the signal at the given `key` inside `target`.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 * @return {SignalEntry<Type>} - The signal entry.
 */
function getSignal(target, key) {
    return utils$7.getSignal(target, key);
}
/**
 * @function setSignal
 * @template Type
 * @description Set the value of the signal at the given `key` inside `target`.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 * @param {Type} value - The new value of the signal.
 */
function setSignal(target, key, value) {
    return utils$7.setSignal(target, key, value);
}
/**
 * @function markDirty
 * @description Marks the signal at the given `key` inside `target` as dirty and fires all of its attached effects.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 */
function markDirty(target, key) {
    return utils$7.markDirty(target, key);
}
/**
 * @function initializeEffects
 * @description Initializes and runs all the effects attached to the given `target`.
 * @param {object} target - The target to which the effects are bound.
 */
function initializeEffects(target) {
    for (const [, entry] of utils$7.data(target))
        entry.effect?.run();
}
/**
 * @function disposeEffect
 * @description Disposes of the effect at the given `key` inside `target`.
 * @param {object} target - The target to which the signal is bound.
 * @param {PropertyKey} key - The key of the signal inside `target`.
 */
function disposeEffect(target, key) {
    const data = utils$7.getReactivityData(target, key);
    data.effect?.dispose();
    data.effect = undefined;
}
/**
 * @function disposeEffects
 * @description Disposes of all the effects attached to the given `target`.
 * @param {object} target - The target to which the effects are bound.
 */
function disposeEffects(target) {
    for (const [, entry] of utils$7.data(target)) {
        entry.effect?.dispose();
        entry.effect = undefined;
    }
}

/**
 * @class TurboModel
 * @template DataType - The type of the data stored in each block.
 * @template {string | number | symbol} KeyType - The type of the keys used to access data in blocks.
 * @template {string | number | symbol} IdType - The type of the block IDs.
 * @template {"array" | "map"} BlocksType - Whether data blocks are stored as an array or a map.
 * @template {MvcDataBlock<DataType, IdType>} BlockType - The structure of each data block.
 * @description A base class representing a model in MVC, which manages one or more data blocks and handles change
 * propagation.
 */
let TurboModel = (() => {
    let _enabledCallbacks_decorators;
    let _enabledCallbacks_initializers = [];
    let _enabledCallbacks_extraInitializers = [];
    return class TurboModel {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _enabledCallbacks_decorators = [auto()];
            tslib.__esDecorate(this, null, _enabledCallbacks_decorators, { kind: "accessor", name: "enabledCallbacks", static: false, private: false, access: { has: obj => "enabledCallbacks" in obj, get: obj => obj.enabledCallbacks, set: (obj, value) => { obj.enabledCallbacks = value; } }, metadata: _metadata }, _enabledCallbacks_initializers, _enabledCallbacks_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        isInitialized = new Map();
        isDataBlocksArray = false;
        dataBlocks;
        /**
         * @description Map of MVC handlers bound to this model.
         */
        handlers;
        /**
         * @description Delegate triggered when a key changes.
         */
        keyChangedCallback;
        /**
         * @constructor
         * @param {DataType} [data] - Initial data. Not initialized if provided.
         * @param {BlocksType} [dataBlocksType] - Type of data blocks (array or map).
         */
        constructor(data, dataBlocksType) {
            tslib.__runInitializers(this, _enabledCallbacks_extraInitializers);
            this.keyChangedCallback = new Delegate();
            if (dataBlocksType === "array") {
                this.isDataBlocksArray = true;
                this.dataBlocks = [];
            }
            else {
                this.isDataBlocksArray = false;
                this.dataBlocks = new Map();
            }
            this.enabledCallbacks = true;
            this.setBlock(data, undefined, this.defaultBlockKey, false);
        }
        /**
         * @description The data of the default block.
         */
        get data() {
            return this.getBlockData();
        }
        set data(value) {
            this.setBlock(value);
        }
        /**
         * @description The ID of the default block.
         */
        get dataId() {
            return this.getBlockId();
        }
        set dataId(value) {
            this.setBlockId(value);
        }
        #enabledCallbacks_accessor_storage = tslib.__runInitializers(this, _enabledCallbacks_initializers, void 0);
        /**
         * @description Whether callbacks are enabled or not.
         */
        get enabledCallbacks() { return this.#enabledCallbacks_accessor_storage; }
        set enabledCallbacks(value) { this.#enabledCallbacks_accessor_storage = value; }
        /**
         * @function getData
         * @description Retrieves the value associated with a given key in the specified block.
         * @param {KeyType} key - The key to retrieve.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block from which to retrieve the
         * data.
         * @returns {unknown} The value associated with the key, or null if not found.
         */
        getData(key, blockKey = this.defaultBlockKey) {
            if (!this.isValidBlockKey(blockKey))
                return null;
            return this.getBlockData(blockKey)?.[key];
        }
        /**
         * @function setData
         * @description Sets the value for a given key in the specified block and triggers callbacks (if enabled).
         * @param {KeyType} key - The key to update.
         * @param {unknown} value - The value to assign.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to update.
         */
        setData(key, value, blockKey = this.defaultBlockKey) {
            if (!this.isValidBlockKey(blockKey))
                return;
            const data = this.getBlockData(blockKey);
            if (data)
                data[key] = value;
            if (this.enabledCallbacks)
                this.fireKeyChangedCallback(key, blockKey);
        }
        /**
         * @function getSize
         * @description Returns the size of the specified block.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to check.
         * @returns {number} The size.
         */
        getSize(blockKey = this.defaultBlockKey) {
            return this.getAllKeys(blockKey)?.length ?? 0;
        }
        /**
         * @function getBlock
         * @description Retrieves the data block for the given blockKey.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key to retrieve.
         * @returns {BlockType | null} The block or null if it doesn't exist.
         */
        getBlock(blockKey = this.defaultBlockKey) {
            if (!this.isValidBlockKey(blockKey))
                return null;
            if (this.isDataBlocksArray) {
                const index = Number(blockKey);
                return Number.isInteger(index) && index >= 0
                    ? this.dataBlocks[index] ?? null
                    : null;
            }
            else {
                return this.dataBlocks.get(blockKey.toString()) ?? null;
            }
        }
        /**
         * @function createBlock
         * @description Creates a data block entry.
         * @param {DataType} value - The data of the block.
         * @param {IdType} [id] - The optional ID of the data.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The key of the block.
         * @protected
         * @return {BlockType} - The created block.
         */
        createBlock(value, id, blockKey = this.defaultBlockKey) {
            return { id: id ?? null, data: value };
        }
        /**
         * @function setBlock
         * @description Creates and sets a data block at the specified key.
         * @param {DataType} value - The data to set.
         * @param {IdType} [id] - Optional block ID.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The key of the block.
         * @param {boolean} [initialize = true] - Whether to initialize the block after setting.
         */
        setBlock(value, id, blockKey = this.defaultBlockKey, initialize = true) {
            if (!this.isValidBlockKey(blockKey) || value === null || value === undefined)
                return;
            const block = this.createBlock(value, id, blockKey);
            if (this.isDataBlocksArray) {
                const index = Number(blockKey);
                if (Number.isInteger(index) && index >= 0) {
                    this.dataBlocks[index] = block;
                }
            }
            else {
                this.dataBlocks.set(blockKey.toString(), block);
            }
            if (initialize)
                this.initialize(blockKey);
            else
                this.isInitialized.set(blockKey, false);
        }
        /**
         * @function hasBlock
         * @description Check if a block exists at the given key.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey] - Block key.
         * @return {boolean} - Whether the block exists or not.
         */
        hasBlock(blockKey) {
            if (this.isDataBlocksArray) {
                const index = Number(blockKey);
                return Number.isInteger(index) && index >= 0 && index < this.dataBlocks.length;
            }
            return this.dataBlocks.has(blockKey.toString());
        }
        /**
         * @function addBlock
         * @description Adds a new block into the structure. Appends or inserts based on key if using array.
         * @param {DataType} value - The block data.
         * @param {IdType} [id] - Optional block ID.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey] - Block key (used for insertion in arrays).
         * @param {boolean} [initialize=true] - Whether to initialize after adding.
         */
        addBlock(value, id, blockKey, initialize = true) {
            if (!value)
                return;
            if (!this.isDataBlocksArray)
                return this.setBlock(value, id, blockKey, initialize);
            const block = this.createBlock(value, id, blockKey);
            let index = Number(blockKey);
            if (!Number.isInteger(index) || index < 0)
                index = this.dataBlocks.length;
            this.dataBlocks.splice(index, 0, block);
            if (initialize)
                this.initialize(index);
        }
        /**
         * @function getBlockData
         * @description Retrieves the data from a specific block.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
         * @returns {DataType | null} The block's data or  if it doesn't exist.
         */
        getBlockData(blockKey = this.defaultBlockKey) {
            const block = this.getBlock(blockKey);
            return block ? block.data : null;
        }
        /**
         * @function getBlockId
         * @description Retrieves the ID from a specific block.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
         * @returns {IdType | null} The block ID or null.
         */
        getBlockId(blockKey = this.defaultBlockKey) {
            const block = this.getBlock(blockKey);
            return block ? block.id : null;
        }
        /**
         * @function setBlockId
         * @description Sets the ID for a specific block.
         * @param {IdType} value - The new ID.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block key.
         */
        setBlockId(value, blockKey = this.defaultBlockKey) {
            if (!value)
                return;
            const block = this.getBlock(blockKey);
            if (block)
                block.id = value;
        }
        /**
         * @function fireKeyChangedCallback
         * @description Fires the emitter's change callback for the given key in a block, passing it the data at the key's value.
         * @param {KeyType} key - The key that changed.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block where the change occurred.
         * @param {boolean} [deleted=false] - Whether the key was deleted.
         */
        fireKeyChangedCallback(key, blockKey = this.defaultBlockKey, deleted = false) {
            if (!this.isValidBlockKey(blockKey))
                blockKey = this.getAllBlockKeys()[0];
            markDirty(this, key); //TODO CHECK
            this.keyChangedCallback.fire(key, blockKey, deleted ? undefined : this.getData(key, blockKey));
        }
        /**
         * @function fireCallback
         * @description Fires the emitter's change callback for the given key in the default blocks.
         * @param {string | KeyType} key - The key to fire for.
         * @param {...any[]} args - Additional arguments.
         */
        fireCallback(key, ...args) {
            this.keyChangedCallback.fire(key, this.defaultBlockKey, ...args);
        }
        /**
         * @function fireBlockCallback
         * @description Fires the emitter's change callback for the given key in a specific block with custom arguments.
         * @param {string | KeyType} key - The key to fire for.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block key.
         * @param {...any[]} args - Additional arguments.
         */
        fireBlockCallback(key, blockKey = this.defaultBlockKey, ...args) {
            if (!this.isValidBlockKey(blockKey))
                blockKey = this.getAllBlockKeys()[0];
            this.keyChangedCallback.fire(key, blockKey, ...args);
        }
        /**
         * @function initialize
         * @description Initializes the block at the given key, and triggers callbacks for all the keys in its data.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
         */
        initialize(blockKey = this.defaultBlockKey) {
            const keys = this.getAllKeys(blockKey);
            if (!keys || !this.enabledCallbacks)
                return;
            keys.forEach(key => this.fireKeyChangedCallback(key, blockKey));
            this.isInitialized.set(blockKey, true);
        }
        /**
         * @function clear
         * @description Clears the block data at the given key.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
         */
        clear(blockKey = this.defaultBlockKey) {
        }
        /**
         * @description The default block key based on whether the data structure is an array or map.
         */
        get defaultBlockKey() {
            return (this.isDataBlocksArray ? 0 : "__turbo_default_block_key__");
        }
        /**
         * @description The default block key if there's only one block, otherwise null.
         */
        get defaultComputationBlockKey() {
            const size = this.isDataBlocksArray
                ? this.dataBlocks.length
                : this.dataBlocks.size;
            return size > 1 ? null : this.defaultBlockKey;
        }
        /**
         * @function isValidBlockKey
         * @description Checks if the block key is a valid string or number.
         * @param {MvcBlockKeyType<BlocksType>} blockKey - The block key to validate.
         * @returns {boolean} True if valid, false otherwise.
         */
        isValidBlockKey(blockKey) {
            return blockKey !== undefined && blockKey !== null
                && ((typeof blockKey === "string" && blockKey.length !== 0)
                    || typeof blockKey === "number");
        }
        /**
         * @function getAllBlockKeys
         * @description Retrieves all block keys in the model.
         * @returns {MvcBlockKeyType<BlocksType>[]} Array of block keys.
         */
        getAllBlockKeys() {
            if (this.isDataBlocksArray)
                return this.dataBlocks.map((_, index) => index);
            else
                return Array.from(this.dataBlocks.keys());
        }
        /**
         * @function getAllIds
         * @description Retrieves all block (data) IDs in the model.
         * @returns {IdType[]} Array of IDs.
         */
        getAllIds() {
            if (this.isDataBlocksArray)
                return this.dataBlocks.map(entry => entry.id);
            else
                return Array.from(this.dataBlocks.values()).map(entry => entry.id);
        }
        /**
         * @function getAllBlocks
         * @description Retrieves all blocks or a specific one if blockKey is defined.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
         * @returns {BlockType[]} Array of blocks.
         */
        getAllBlocks(blockKey = this.defaultComputationBlockKey) {
            const output = [];
            if (blockKey !== null) {
                const block = this.getBlock(blockKey);
                if (block)
                    output.push(block);
            }
            else {
                for (const key of this.getAllBlockKeys()) {
                    const block = this.getBlock(key);
                    if (block)
                        output.push(block);
                }
            }
            return output;
        }
        /**
         * @function getAllKeys
         * @description Retrieves all keys within the given block(s).
         * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
         * @returns {KeyType[]} Array of keys.
         */
        getAllKeys(blockKey = this.defaultComputationBlockKey) {
            return this.getAllBlocks(blockKey).flatMap(block => Object.keys(block.data));
        }
        /**
         * @function getAllData
         * @description Retrieves all values across block(s).
         * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
         * @returns {unknown[]} Array of values.
         */
        getAllData(blockKey = this.defaultComputationBlockKey) {
            return this.getAllBlocks(blockKey).flatMap(block => Object.values(block.data));
        }
        /**
         * @function getHandler
         * @description Retrieves the attached MVC handler with the given key.
         * By default, unless manually defined in the handler, if the element's class name is MyElement
         * and the handler's class name is MyElementSomethingHandler, the key would be "something".
         * @param {string} key - The handler's key.
         * @return {TurboHandler} - The handler.
         */
        getHandler(key) {
            return this.handlers.get(key);
        }
        /**
         * @function addHandler
         * @description Registers a TurboHandler for the given key.
         * @param {TurboHandler} handler - The handler instance to register.
         */
        addHandler(handler) {
            if (!handler.keyName)
                return;
            this.handlers.set(handler.keyName, handler);
        }
    };
})();

const TurboKeyEventName = {
    keyPressed: "turbo-key-pressed",
    keyReleased: "turbo-key-released"
};
const DefaultKeyEventName = {
    keyPressed: "keydown",
    keyReleased: "keyup",
};
const TurboClickEventName = {
    click: "turbo-click",
    clickStart: "turbo-click-start",
    clickEnd: "turbo-click-end",
    longPress: "turbo-long-press"
};
const DefaultClickEventName = {
    click: "click",
    clickStart: "mousedown",
    clickEnd: "mouseup",
    longPress: TurboClickEventName.longPress
};
const TurboMoveEventName = {
    move: "turbo-move"
};
const DefaultMoveEventName = {
    move: "mousemove"
};
const TurboDragEventName = {
    drag: "turbo-drag",
    dragStart: "turbo-drag-start",
    dragEnd: "turbo-drag-end"
};
const DefaultDragEventName = {
    drag: TurboDragEventName.drag,
    dragStart: TurboDragEventName.dragStart,
    dragEnd: TurboDragEventName.dragEnd,
};
const TurboWheelEventName = {
    trackpadScroll: "turbo-trackpad-scroll",
    trackpadPinch: "turbo-trackpad-pinch",
    mouseWheel: "turbo-mouse-wheel"
};
const DefaultWheelEventName = {
    trackpadScroll: "wheel",
    trackpadPinch: "wheel",
    mouseWheel: "wheel"
};
const TurboEventName = {
    ...TurboClickEventName,
    ...TurboKeyEventName,
    ...TurboMoveEventName,
    ...TurboDragEventName,
    ...TurboWheelEventName,
    selectInput: "turbo-select-input",
};
/**
 * @description Object containing the names of events fired by default by the turboComponents. Modifying it (prior to
 * setting up new turbo components) will subsequently alter the events that the instantiated components will listen for.
 */
const DefaultEventName = {
    ...DefaultKeyEventName,
    ...DefaultClickEventName,
    ...DefaultMoveEventName,
    ...DefaultDragEventName,
    ...DefaultWheelEventName,
    wheel: "wheel",
    scroll: "scroll",
    input: "input",
    change: "change",
    focus: "focus",
    focusIn: "focusin",
    focusOut: "focusout",
    blur: "blur",
    resize: "resize",
    compositionStart: "compositionstart",
    compositionEnd: "compositionend",
};

/**
 * @description Converts the passed variable into a string.
 * @param value - The variable to convert to string
 * @returns {string} - The string representation of the value
 */
function stringify(value) {
    if (value === null || value === undefined)
        return undefined;
    switch (typeof value) {
        case "string":
            return value;
        case "number":
        case "boolean":
        case "bigint":
        case "symbol":
        case "function":
            return value.toString();
        case "object":
            if (Array.isArray(value))
                return JSON.stringify(value);
            else if (value instanceof Date)
                return value.toISOString();
            else {
                try {
                    return JSON.stringify(value);
                }
                catch {
                    return "[object Object]";
                }
            }
        default:
            return String(value);
    }
}
/**
 * @description Attempts to convert the passed string back to its original type.
 * @param str - The string to convert back to its original type
 * @returns {any} - The original value
 */
function parse(str) {
    if (isUndefined(str))
        return undefined;
    switch (str) {
        case "null":
            return null;
        case "true":
            return true;
        case "false":
            return false;
    }
    if (!isNaN(Number(str)))
        return Number(str);
    if (/^\d+n$/.test(str))
        return BigInt(str.slice(0, -1));
    if (str.startsWith("function") || str.startsWith("(")) {
        try {
            const parsedFunction = new Function(`return (${str})`)();
            if (typeof parsedFunction === "function")
                return parsedFunction;
        }
        catch {
        }
    }
    try {
        const parsed = JSON.parse(str);
        if (typeof parsed === "object" && parsed != null)
            return parsed;
    }
    catch {
    }
    return str;
}
/**
 * @description Extracts the extension from the given filename or path (e.g.: ".png").
 * @param {string} str - The filename or path
 * @return The extension, or an empty string if not found.
 */
function getFileExtension(str) {
    if (!str || str.length == 0)
        return "";
    const match = str.match(/\.\S{1,4}$/);
    return match ? match[0] : "";
}
/**
 * @description converts the provided string from camelCase to kebab-case.
 * @param {string} str - The string to convert
 */
function camelToKebabCase(str) {
    if (!str || str.length == 0)
        return;
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
/**
 * @description converts the provided string from kebab-case to camelCase.
 * @param {string} str - The string to convert
 */
function kebabToCamelCase(str) {
    if (!str || str.length == 0)
        return;
    return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

function setupElementFunctions() {
    /**
     * Sets the declared properties to the element.
     * @param {TurboProperties<Tag>} [properties] - The properties object.
     * @param {boolean} [setOnlyBaseProperties=false] - If set to true, will only set the base turbo properties (classes,
     * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
     * @returns {this} Itself, allowing for method chaining.
     * @template Tag
     */
    TurboSelector.prototype.setProperties = function _setProperties(properties = {}, setOnlyBaseProperties = false) {
        if (!this)
            return this;
        if (properties.out) {
            if (typeof properties.out == "string")
                this["__outName"] = properties.out;
            else
                Object.assign(properties.out, this);
        }
        if (!this.element.shadowRoot) {
            let shadowDOM = !!properties.shadowDOM;
            if ("getPropertiesValue" in this.element && typeof this.element.getPropertiesValue === "function")
                shadowDOM = this.element.getPropertiesValue(properties.shadowDOM, "shadowDOM");
            if (shadowDOM)
                try {
                    this.element.attachShadow({ mode: "open" });
                }
                catch { }
        }
        const mvc = this.element?.["mvc"] instanceof Mvc ? this.element["mvc"]
            : "model" in this.element && "view" in this.element ? this.element : undefined;
        for (const property of Object.keys(properties)) {
            const value = properties[property];
            if (value === undefined)
                continue;
            switch (property) {
                case "tag":
                case "namespace":
                case "shadowDOM":
                    break;
                case "text":
                    if (this.element instanceof HTMLElement)
                        this.element.innerText = value;
                    break;
                case "style":
                    if (!(this.element instanceof HTMLElement || this.element instanceof SVGElement))
                        break;
                    this.setStyles(value, true);
                    break;
                case "stylesheet":
                    stylesheet(value, this.closestRoot);
                    break;
                case "id":
                    this.element.id = value;
                    break;
                case "classes":
                    this.addClass(value);
                    break;
                case "listeners":
                    Object.entries(value).forEach(([type, callback]) => this.on(type, callback));
                    break;
                case "onClick":
                    this.on(DefaultEventName.click, value);
                    break;
                case "onDrag":
                    this.on(DefaultEventName.drag, value);
                    break;
                case "children":
                    this.addChild(value);
                    break;
                case "parent":
                    $(value).addChild(this.element);
                    break;
                case "data":
                case "initialize":
                    if (mvc)
                        break;
                case "model":
                case "view":
                case "emitter":
                case "controllers":
                case "handlers":
                case "interactors":
                case "tools":
                case "substrates":
                    if (setOnlyBaseProperties)
                        break;
                    if (mvc) {
                        try {
                            mvc[property] = value;
                            if (property === "model" && properties.data && mvc["model"] instanceof TurboModel) {
                                mvc["model"].setBlock(properties.data, undefined, undefined, false);
                            }
                        }
                        catch { }
                        break;
                    }
                default:
                    if (setOnlyBaseProperties)
                        break;
                    try {
                        this.element[property] = value;
                    }
                    catch (e) {
                        try {
                            this.setAttribute(property, stringify(value));
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    break;
            }
        }
        if (properties.initialize === undefined || properties.initialize) {
            if (this.element && "initialize" in this.element && typeof this.element.initialize === "function")
                this.element.initialize();
            else if (mvc && "initialize" in mvc && typeof mvc.initialize === "function")
                mvc.initialize();
        }
        return this;
    };
    TurboSelector.prototype.setMvc = function _setMvc(properties) {
        if (!this.element)
            return undefined;
        if ("mvc" in this.element && this.element.mvc instanceof Mvc) {
            this.element.mvc.generate(properties);
            return this.element.mvc;
        }
        return new Mvc({ ...properties, element: this.element });
    };
    /**
     * @description Destroys the node by removing it from the document and removing all its bound listeners.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.destroy = function _destroy() {
        this.removeAllListeners();
        this.remove();
        if (this.element && "destroy" in this.element && typeof this.element.destroy === "function")
            this.element.destroy();
        return this;
    };
    /**
     * @description Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | number | boolean} [value] The value of the attribute. Can be left blank to represent a
     * true boolean.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.setAttribute = function _setAttribute(name, value) {
        if (this.element instanceof Element)
            this.element.setAttribute(name, value?.toString() || "true");
        return this;
    };
    /**
     * @description Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeAttribute = function _removeAttribute(name) {
        if (this.element instanceof Element)
            this.element.removeAttribute(name);
        return this;
    };
    /**
     * @description Causes the element to lose focus.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.blur = function _blur() {
        if (this.element instanceof HTMLElement)
            this.element.blur();
        return this;
    };
    /**
     * @description Sets focus on the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.focus = function _focus() {
        if (this.element instanceof HTMLElement)
            this.element.focus();
        return this;
    };
}

const BasicInputEvents = [
    "mousedown", "mouseup", "mousemove", "click", "dblclick", "contextmenu",
    "dragstart", "selectstart",
    "touchstart", "touchmove", "touchend", "touchcancel",
    "pointerdown", "pointermove", "pointerup",
    "wheel"
];
const NonPassiveEvents = [
    "wheel", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointercancel"
];

exports.ActionMode = void 0;
(function (ActionMode) {
    ActionMode[ActionMode["none"] = 0] = "none";
    ActionMode[ActionMode["click"] = 1] = "click";
    ActionMode[ActionMode["longPress"] = 2] = "longPress";
    ActionMode[ActionMode["drag"] = 3] = "drag";
})(exports.ActionMode || (exports.ActionMode = {}));
exports.ClickMode = void 0;
(function (ClickMode) {
    ClickMode[ClickMode["none"] = 0] = "none";
    ClickMode[ClickMode["left"] = 1] = "left";
    ClickMode[ClickMode["right"] = 2] = "right";
    ClickMode[ClickMode["middle"] = 3] = "middle";
    ClickMode[ClickMode["other"] = 4] = "other";
    ClickMode[ClickMode["key"] = 5] = "key";
})(exports.ClickMode || (exports.ClickMode = {}));
exports.InputDevice = void 0;
(function (InputDevice) {
    InputDevice[InputDevice["unknown"] = 0] = "unknown";
    InputDevice[InputDevice["mouse"] = 1] = "mouse";
    InputDevice[InputDevice["trackpad"] = 2] = "trackpad";
    InputDevice[InputDevice["touch"] = 3] = "touch";
})(exports.InputDevice || (exports.InputDevice = {}));

class TurboMap extends Map {
    enforceImmutability = true;
    set(key, value) {
        return super.set(key, this.enforceImmutability ? this.copy(value) : value);
    }
    get(key) {
        const result = super.get(key);
        return this.enforceImmutability ? this.copy(result) : result;
    }
    get first() {
        if (this.size == 0)
            return null;
        const result = this.values().next().value;
        return this.enforceImmutability ? this.copy(result) : result;
    }
    get last() {
        if (this.size == 0)
            return null;
        const result = this.valuesArray()[this.size - 1];
        return this.enforceImmutability ? this.copy(result) : result;
    }
    keysArray() {
        return Array.from(this.keys());
    }
    valuesArray() {
        return Array.from(this.values());
    }
    copy(value) {
        if (value && typeof value == "object") {
            if (value instanceof Array)
                return value.map(item => this.copy(item));
            if (value.constructor && value.constructor != Object) {
                if (typeof value.clone == "function")
                    return value.clone();
                if (typeof value.copy == "function")
                    return value.copy();
            }
            return { ...value };
        }
        return value;
    }
    mapKeys(callback) {
        const newMap = new TurboMap();
        for (let [key, value] of this) {
            newMap.set(callback(key, value), value);
        }
        return newMap;
    }
    mapValues(callback) {
        const newMap = new TurboMap();
        for (let [key, value] of this) {
            newMap.set(key, callback(key, value));
        }
        return newMap;
    }
    filter(callback) {
        const newMap = new TurboMap();
        for (let [key, value] of this) {
            if (callback(key, value))
                newMap.set(key, value);
        }
        return newMap;
    }
    merge(map) {
        for (let [key, value] of map) {
            this.set(key, value);
        }
        return this;
    }
}

/**
 * @internal
 */
function inferKey(name, type, context) {
    return name ?? (String(context.name).endsWith(type)
        ? String(context.name).slice(0, -type.length)
        : String(context.name));
}
/**
 * @internal
 */
function generateField(context, type, name) {
    const cacheKey = Symbol(`__${type.toLowerCase()}_${String(context.name)}`);
    const keyName = inferKey(name, type, context);
    context.addInitializer(function () {
        Object.defineProperty(this, context.name, {
            configurable: true,
            enumerable: false,
            get: function () {
                if (this[cacheKey])
                    return this[cacheKey];
                let value;
                let functionName;
                switch (type) {
                    case "Controller":
                        functionName = "getController";
                        break;
                    case "Handler":
                        functionName = "getHandler";
                        break;
                    case "Interactor":
                        functionName = "getInteractor";
                        break;
                    case "Tool":
                        functionName = "getTool";
                        break;
                    case "Substrate":
                        functionName = "getSubstrate";
                        break;
                }
                if (!functionName)
                    return;
                if (this.mvc && this.mvc instanceof Mvc)
                    value = this.mvc[functionName](keyName);
                else if (this[functionName] && typeof this[functionName] === "function")
                    value = this[functionName](keyName);
                if (!value)
                    throw new Error(`${type} "${keyName}" not found on ${this?.constructor?.name}.`);
                this[cacheKey] = value;
                return value;
            },
            set: function (value) { this[cacheKey] = value; }
        });
    });
}
/**
 * @decorator
 * @function controller
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched controller.
 * @param {string} [name] - The key name of the controller in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingController`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @controller() protected textController: TurboController;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textController(): TurboController {
 *    if (this.mvc instanceof Mvc) return this.mvc.getController("text");
 *    if (typeof this.getController === "function") return this.getController("text");
 * }
 * ```
 */
function controller(name) {
    return function (_unused, context) {
        generateField(context, "Controller", name);
    };
}
/**
 * @decorator
 * @function handler
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched handler.
 * @param {string} [name] - The key name of the handler in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingHandler`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @handler() protected textHandler: TurboHandler;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textHandler(): TurboHandler {
 *    if (this.mvc instanceof Mvc) return this.mvc.getHandler("text");
 *    if (typeof this.getHandler === "function") return this.getHandler("text");
 * }
 * ```
 */
function handler(name) {
    return function (_unused, context) {
        generateField(context, "Handler", name);
    };
}
/**
 * @decorator
 * @function interactor
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched interactor.
 * @param {string} [name] - The key name of the interactor in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingInteractor`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @interactor() protected textInteractor: TurboInteractor;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textInteractor(): TurboInteractor {
 *    if (this.mvc instanceof Mvc) return this.mvc.getInteractor("text");
 *    if (typeof this.getInteractor === "function") return this.getInteractor("text");
 * }
 * ```
 */
function interactor(name) {
    return function (_unused, context) {
        generateField(context, "Interactor", name);
    };
}
/**
 * @decorator
 * @function tool
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched tool.
 * @param {string} [name] - The key name of the tool in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingTool`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @tool() protected textTool: TurboTool;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textTool(): TurboTool {
 *    if (this.mvc instanceof Mvc) return this.mvc.getTool("text");
 *    if (typeof this.getTool === "function") return this.getTool("text");
 * }
 * ```
 */
function tool(name) {
    return function (_unused, context) {
        generateField(context, "Tool", name);
    };
}
/**
 * @decorator
 * @function substrate
 * @description Stage-3 field decorator for MVC structure. It reduces code by turning the decorated field into a
 * fetched substrate.
 * @param {string} [name] - The key name of the substrate in the MVC instance (if any). By default, it is inferred
 * from the name of the field. If the field is named `somethingSubstrate`, the key name will be `something`.
 *
 * @example
 * ```ts
 * @tool() protected textSubstrate: TurboSubstrate;
 * ```
 * Is equivalent to:
 * ```ts
 * protected get textSubstrate(): TurboSubstrate {
 *    if (this.mvc instanceof Mvc) return this.mvc.getSubstrate("text");
 *    if (typeof this.getSubstrate === "function") return this.getSubstrate("text");
 * }
 * ```
 */
function substrate(name) {
    return function (_unused, context) {
        generateField(context, "Substrate", name);
    };
}

let TurboEventManagerModel = (() => {
    let _classSuper = TurboModel;
    let _instanceExtraInitializers = [];
    let _utils_decorators;
    let _utils_initializers = [];
    let _utils_extraInitializers = [];
    let _set_inputDevice_decorators;
    return class TurboEventManagerModel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _utils_decorators = [handler()];
            _set_inputDevice_decorators = [auto({ callBefore: function (value) { if (value == exports.InputDevice.trackpad)
                        this.wasRecentlyTrackpad = true; } })];
            tslib.__esDecorate(this, null, _set_inputDevice_decorators, { kind: "setter", name: "inputDevice", static: false, private: false, access: { has: obj => "inputDevice" in obj, set: (obj, value) => { obj.inputDevice = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, null, _utils_decorators, { kind: "field", name: "utils", static: false, private: false, access: { has: obj => "utils" in obj, get: obj => obj.utils, set: (obj, value) => { obj.utils = value; } }, metadata: _metadata }, _utils_initializers, _utils_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        utils = (tslib.__runInitializers(this, _instanceExtraInitializers), tslib.__runInitializers(this, _utils_initializers, void 0));
        state = (tslib.__runInitializers(this, _utils_extraInitializers), {});
        lockState = {};
        //Delegate fired when the input device changes
        onInputDeviceChange = new Delegate();
        /**
         * @description Delegate fired when a tool is changed on a certain click button/mode
         */
        onToolChange = new Delegate();
        //Input events states
        currentKeys = [];
        currentAction = exports.ActionMode.none;
        currentClick = exports.ClickMode.none;
        wasRecentlyTrackpad = false;
        //Threshold differentiating a click from a drag
        moveThreshold;
        //Duration to reach long press
        longPressDuration;
        authorizeEventScaling;
        scaleEventPosition;
        activePointers = new Set();
        //Saved values (Maps to account for different touch points and their IDs)
        origins = new TurboMap();
        previousPositions = new TurboMap();
        positions;
        lastTargetOrigin;
        //Single timer instance --> easily cancel it and set it again
        timerMap = new TurboMap();
        //All created tools
        tools = new Map();
        //Tools mapped to keys
        mappedKeysToTool = new Map();
        //Tools currently held by the user (one - or none - per each click button/mode)
        currentTools = new Map();
        set inputDevice(value) {
            this.onInputDeviceChange.fire(value);
        }
    };
})();

exports.ClosestOrigin = void 0;
(function (ClosestOrigin) {
    ClosestOrigin["target"] = "target";
    ClosestOrigin["position"] = "position";
})(exports.ClosestOrigin || (exports.ClosestOrigin = {}));

/**
 * Generic turbo event
 */
let TurboEvent = (() => {
    let _classSuper = Event;
    let _instanceExtraInitializers = [];
    let _closest_decorators;
    let _get_scaledPosition_decorators;
    return class TurboEvent extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _closest_decorators = [cache()];
            _get_scaledPosition_decorators = [cache()];
            tslib.__esDecorate(this, null, _closest_decorators, { kind: "method", name: "closest", static: false, private: false, access: { has: obj => "closest" in obj, get: obj => obj.closest }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_scaledPosition_decorators, { kind: "getter", name: "scaledPosition", static: false, private: false, access: { has: obj => "scaledPosition" in obj, get: obj => obj.scaledPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * @description The event manager that fired this event.
         */
        eventManager = tslib.__runInitializers(this, _instanceExtraInitializers);
        /**
         * @description The name of the tool (if any) associated with this event.
         */
        toolName;
        /**
         * @description The name of the event.
         */
        eventName;
        /**
         * @description The click mode of the fired event
         */
        clickMode;
        /**
         * @description The keys pressed when the event was fired
         */
        keys;
        /**
         * @description The screen position from where the event was fired
         */
        position;
        /**
         * @description Callback function (or boolean) to be overridden to specify when to allow transformation
         * and/or scaling.
         */
        authorizeScaling;
        /**
         * @description Callback function to be overridden to specify how to transform a position from screen to
         * document space.
         */
        scalePosition;
        constructor(properties) {
            super(properties.eventName, { bubbles: true, cancelable: true, ...properties.eventInitDict });
            this.eventManager = properties.eventManager ?? TurboEventManager.instance;
            this.authorizeScaling = properties.authorizeScaling ?? true;
            this.scalePosition = properties.scalePosition ?? ((position) => position);
            this.clickMode = properties.clickMode ?? TurboEventManager.instance.currentClick;
            this.keys = properties.keys ?? TurboEventManager.instance.currentKeys;
            this.eventName = properties.eventName;
            this.position = properties.position;
            this.toolName = properties.toolName;
        }
        /**
         * @description The tool (if any) associated with this event.
         */
        get tool() {
            if (!this.toolName || !(this.eventManager instanceof TurboEventManager))
                return null;
            return this.eventManager.getToolByName(this.toolName);
        }
        /**
         * @description Returns the closest element of the provided type to the target (Searches through the element and
         * all its parents to find one of matching type).
         * @param type
         * @param strict
         * @param from
         */
        closest(type, strict = true, from = exports.ClosestOrigin.target) {
            const elements = from == exports.ClosestOrigin.target ? [this.target]
                : document.elementsFromPoint(this.position.x, this.position.y);
            const strictElement = strict instanceof Element ? strict : null;
            const isStrict = strict === true || strictElement !== null;
            for (let element of elements) {
                while (element && !((element instanceof type)
                    && (!isStrict || this.isPositionInsideElement(this.position, strictElement ?? element))))
                    element = element.parentElement;
                if (element)
                    return element;
            }
            return null;
        }
        /**
         * @description Checks if the position is inside the given element's bounding box.
         * @param position
         * @param element
         */
        isPositionInsideElement(position, element) {
            const rect = element.getBoundingClientRect();
            return position.x >= rect.left && position.x <= rect.right
                && position.y >= rect.top && position.y <= rect.bottom;
        }
        /**
         * @description The target of the event (as an Element - or the document)
         */
        get target() {
            return super.target || document;
        }
        /**
         * @description The position of the fired event transformed and/or scaled using the class's scalePosition().
         */
        get scaledPosition() {
            if (!this.scalingAuthorized)
                return this.position;
            return this.scalePosition(this.position);
        }
        /**
         * @description Specifies whether to allow transformation and/or scaling.
         */
        get scalingAuthorized() {
            return typeof this.authorizeScaling == "function" ? this.authorizeScaling() : this.authorizeScaling;
        }
        /**
         * @private
         * @description Takes a map of points and returns a new map where each point is transformed accordingly.
         * @param positions
         */
        scalePositionsMap(positions) {
            return positions.mapValues((key, position) => this.scalePosition(position));
        }
    };
})();

/**
 * @class TurboKeyEvent
 * @extends TurboEvent
 * @description Custom key event
 */
class TurboKeyEvent extends TurboEvent {
    /**
     * @description The key pressed (if any) when the event was fired
     */
    keyPressed;
    /**
     * @description The key released (if any) when the event was fired
     */
    keyReleased;
    constructor(properties) {
        super({ ...properties, position: null });
        this.keyPressed = properties.keyPressed;
        this.keyReleased = properties.keyReleased;
    }
}

/**
 * @class TurboController
 * @description The MVC base controller class. Its main job is to handle some part of (or all of) the logic of the
 * component. It has access to the element, the model to read and write data, the view to update the UI, and the
 * emitter to listen for changes in the model or any other internal events. It can only communicate with other
 * controllers via the emitter (by firing or listening for changes on a certain key).
 * @template {object} ElementType - The type of the main component.
 * @template {TurboView} ViewType - The element's MVC view type.
 * @template {TurboModel} ModelType - The element's MVC model type.
 * @template {TurboEmitter} EmitterType - The element's MVC emitter type.
 */
class TurboController {
    /**
     * @description The key of the controller. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the controller's class name is MyElementSomethingController, the key would
     * default to "something".
     */
    keyName;
    /**
     * @description The element it is bound to.
     */
    element;
    /**
     * @description The MVC view.
     */
    view;
    /**
     * @description The MVC model.
     */
    model;
    /**
     * @description The MVC emitter.
     */
    emitter;
    constructor(properties) {
        this.element = properties.element;
        if (properties.model)
            this.model = properties.model;
        if (properties.emitter)
            this.emitter = properties.emitter;
        if (properties.view)
            this.view = properties.view;
    }
    /**
     * @function initialize
     * @description Initializes the controller. Specifically, it will set up the change callbacks.
     */
    initialize() {
        this.setupChangedCallbacks();
    }
    /**
     * @function setupChangedCallbacks
     * @description Setup method intended to initialize change listeners and callbacks.
     * @protected
     */
    setupChangedCallbacks() {
        initializeEffects(this);
    }
}

class TurboEventManagerKeyController extends TurboController {
    keyName = "key";
    keyDown = (e) => this.keyDownFn(e);
    keyDownFn(e) {
        if (!this.element.enabled)
            return;
        //Return if key already pressed
        if (this.model.currentKeys.includes(e.key))
            return;
        //Add key to currentKeys
        this.model.currentKeys.push(e.key);
        //Fire a keyPressed event (only once)
        this.emitter.fire("dispatchEvent", document, TurboKeyEvent, { eventName: TurboKeyEventName.keyPressed, keyPressed: e.key });
    }
    keyUp = (e) => this.keyUpFn(e);
    keyUpFn(e) {
        if (!this.element.enabled)
            return;
        //Return if key not pressed
        if (!this.model.currentKeys.includes(e.key))
            return;
        //Remove key from currentKeys
        this.model.currentKeys.splice(this.model.currentKeys.indexOf(e.key), 1);
        //Fire a keyReleased event
        this.emitter.fire("dispatchEvent", document, TurboKeyEvent, { eventName: TurboKeyEventName.keyReleased, keyReleased: e.key });
    }
}

/**
 * @class TurboWheelEvent
 * @extends TurboEvent
 * @description Custom wheel event
 */
class TurboWheelEvent extends TurboEvent {
    /**
     * @description The delta amount of scrolling
     */
    delta;
    constructor(properties) {
        super({ ...properties, position: null });
        this.delta = properties.delta;
    }
}

class Point {
    x;
    y;
    constructor(x = 0, y = typeof x == "number" ? x : 0) {
        if (typeof x == "number") {
            this.x = x;
            this.y = y;
        }
        else if ("clientX" in x) {
            this.x = x.clientX;
            this.y = x.clientY;
        }
        else if ("x" in x) {
            this.x = x.x;
            this.y = x.y;
        }
        else {
            this.x = x[0];
            this.y = x[1];
        }
    }
    // Static methods
    /**
     * @description Calculate the distance between two Position2D points.
     * @param {Point} p1 - First point
     * @param {Point} p2 - Second point
     */
    static dist(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
    /**
     * @description Calculate the mid-point from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static midPoint(...arr) {
        if (arr.length == 0)
            return null;
        const x = arr.reduce((sum, p) => sum + p.x, 0) / arr.length;
        const y = arr.reduce((sum, p) => sum + p.y, 0) / arr.length;
        return new Point(x, y);
    }
    /**
     * @description Calculate the max on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static max(...arr) {
        if (arr.length == 0)
            return null;
        const x = arr.reduce((max, p) => Math.max(max, p.x), -Infinity);
        const y = arr.reduce((max, p) => Math.max(max, p.y), -Infinity);
        return new Point(x, y);
    }
    /**
     * @description Calculate the min on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static min(...arr) {
        if (arr.length == 0)
            return null;
        const x = arr.reduce((min, p) => Math.min(min, p.x), Infinity);
        const y = arr.reduce((min, p) => Math.min(min, p.y), Infinity);
        return new Point(x, y);
    }
    // Instance methods
    get object() {
        return { x: this.x, y: this.y };
    }
    equals(x, y = 0) {
        if (typeof x == "number")
            return this.x == x && this.y == y;
        return this.x == x.x && this.y == x.y;
    }
    boundX(x1, x2) {
        return this.x < x1 ? x1
            : this.x > x2 ? x2
                : this.x;
    }
    boundY(y1, y2) {
        return this.y < y1 ? y1
            : this.y > y2 ? y2
                : this.y;
    }
    bound(x1, x2, y1 = x1, y2 = x2) {
        return new Point(this.boundX(x1, x2), this.boundY(y1, y2));
    }
    add(x, y) {
        if (typeof x == "number")
            return new Point(this.x + x, this.y + (y || y == 0 ? y : x));
        return new Point(this.x + x.x, this.y + x.y);
    }
    sub(x, y) {
        if (typeof x == "number")
            return new Point(this.x - x, this.y - (y || y == 0 ? y : x));
        return new Point(this.x - x.x, this.y - x.y);
    }
    mul(x, y) {
        if (typeof x == "number")
            return new Point(this.x * x, this.y * (y || y == 0 ? y : x));
        return new Point(this.x * x.x, this.y * x.y);
    }
    div(x, y) {
        if (typeof x == "number")
            return new Point(this.x / x, this.y / (y || y == 0 ? y : x));
        return new Point(this.x / x.x, this.y / x.y);
    }
    mod(x, y) {
        const modDiv = typeof x == "number" ?
            { x: x, y: (y || y == 0 ? y : x) } : { x: x.x, y: x.y };
        const temp = this.object;
        while (temp.x < 0)
            temp.x += modDiv.x;
        while (temp.x >= modDiv.x)
            temp.x -= modDiv.x;
        while (temp.y < 0)
            temp.y += modDiv.y;
        while (temp.y >= modDiv.y)
            temp.y -= modDiv.y;
        return new Point(temp);
    }
    /**
     * @description Calculate the absolute value of the coordinates
     * @returns A new Point object with the absolute values
     */
    get abs() {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    }
    /**
     * @description Get the maximum value between x and y coordinates
     * @returns The maximum value
     */
    get max() {
        return Math.max(this.x, this.y);
    }
    /**
     * @description Get the minimum value between x and y coordinates
     * @returns The minimum value
     */
    get min() {
        return Math.min(this.x, this.y);
    }
    get length2() {
        return this.x * this.x + this.y * this.y;
    }
    get length() {
        return Math.sqrt(this.length2);
    }
    dot(p) {
        return this.x * p.x + this.y * p.y;
    }
    /**
     * @description Create a copy of the current point
     * @returns A new Point object with the same coordinates
     */
    copy() {
        return new Point(this.x, this.y);
    }
    /**
     * @description Get the coordinates as an array
     * @returns An array with x and y coordinates
     */
    arr() {
        return [this.x, this.y];
    }
}

class TurboEventManagerWheelController extends TurboController {
    keyName = "wheel";
    wheel = (e) => {
        if (!this.element.enabled)
            return;
        //Prevent default scroll behavior
        if (this.element.preventDefaultWheel)
            e.preventDefault();
        //Most likely trackpad
        if (Math.abs(e.deltaY) <= 40 || e.deltaX != 0)
            this.model.inputDevice = exports.InputDevice.trackpad;
        //Set input device to mouse if it wasn't trackpad recently
        if (!this.model.wasRecentlyTrackpad)
            this.model.inputDevice = exports.InputDevice.mouse;
        //Reset trackpad timer
        this.model.utils.clearTimer("recentlyTrackpadTimer");
        //Set timer to clear recently trackpad boolean after a delay
        this.model.utils.setTimer("recentlyTrackpadTimer", () => {
            if (this.model.inputDevice == exports.InputDevice.trackpad)
                this.model.wasRecentlyTrackpad = false;
        }, 800);
        //Get name of event according to input type
        let eventName;
        //Trackpad pinching (for some reason Ctrl key is marked as pressed in the WheelEvent)
        if (this.model.inputDevice == exports.InputDevice.trackpad && e.ctrlKey)
            eventName = TurboEventName.trackpadPinch;
        //Trackpad zooming
        else if (this.model.inputDevice == exports.InputDevice.trackpad)
            eventName = TurboEventName.trackpadScroll;
        //Mouse scrolling
        else
            eventName = TurboEventName.mouseWheel;
        this.emitter.fire("dispatchEvent", document, TurboWheelEvent, { delta: new Point(e.deltaX, e.deltaY), eventName: eventName });
    };
}

/**
 * @class TurboDragEvent
 * @extends TurboEvent
 * @description Turbo drag event class, fired on turbo-drag, turbo-drag-start, turbo-drag-end, etc.
 */
let TurboDragEvent = (() => {
    let _classSuper = TurboEvent;
    let _instanceExtraInitializers = [];
    let _get_scaledOrigins_decorators;
    let _get_scaledPreviousPositions_decorators;
    let _get_scaledPositions_decorators;
    let _get_deltaPositions_decorators;
    let _get_deltaPosition_decorators;
    let _get_scaledDeltaPositions_decorators;
    let _get_scaledDeltaPosition_decorators;
    return class TurboDragEvent extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _get_scaledOrigins_decorators = [cache()];
            _get_scaledPreviousPositions_decorators = [cache()];
            _get_scaledPositions_decorators = [cache()];
            _get_deltaPositions_decorators = [cache()];
            _get_deltaPosition_decorators = [cache()];
            _get_scaledDeltaPositions_decorators = [cache()];
            _get_scaledDeltaPosition_decorators = [cache()];
            tslib.__esDecorate(this, null, _get_scaledOrigins_decorators, { kind: "getter", name: "scaledOrigins", static: false, private: false, access: { has: obj => "scaledOrigins" in obj, get: obj => obj.scaledOrigins }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_scaledPreviousPositions_decorators, { kind: "getter", name: "scaledPreviousPositions", static: false, private: false, access: { has: obj => "scaledPreviousPositions" in obj, get: obj => obj.scaledPreviousPositions }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_scaledPositions_decorators, { kind: "getter", name: "scaledPositions", static: false, private: false, access: { has: obj => "scaledPositions" in obj, get: obj => obj.scaledPositions }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_deltaPositions_decorators, { kind: "getter", name: "deltaPositions", static: false, private: false, access: { has: obj => "deltaPositions" in obj, get: obj => obj.deltaPositions }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_deltaPosition_decorators, { kind: "getter", name: "deltaPosition", static: false, private: false, access: { has: obj => "deltaPosition" in obj, get: obj => obj.deltaPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_scaledDeltaPositions_decorators, { kind: "getter", name: "scaledDeltaPositions", static: false, private: false, access: { has: obj => "scaledDeltaPositions" in obj, get: obj => obj.scaledDeltaPositions }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_scaledDeltaPosition_decorators, { kind: "getter", name: "scaledDeltaPosition", static: false, private: false, access: { has: obj => "scaledDeltaPosition" in obj, get: obj => obj.scaledDeltaPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * @description Map containing the origins of the dragging points
         */
        origins = tslib.__runInitializers(this, _instanceExtraInitializers);
        /**
         * @description Map containing the previous positions of the dragging points
         */
        previousPositions;
        /**
         * @description Map containing the positions of the dragging points
         */
        positions;
        constructor(properties) {
            super({ ...properties, position: properties.positions.first });
            this.origins = properties.origins;
            this.previousPositions = properties.previousPositions;
            this.positions = properties.positions; //TODO MOVE TO DEFAULT EVENT
        }
        /**
         * @description Map of the origins mapped to the current canvas translation and scale
         */
        get scaledOrigins() {
            if (!this.scalingAuthorized)
                return this.origins;
            return this.scalePositionsMap(this.origins);
        }
        /**
         * @description Map of the previous positions mapped to the current canvas translation and scale
         */
        get scaledPreviousPositions() {
            if (!this.scalingAuthorized)
                return this.previousPositions;
            return this.scalePositionsMap(this.previousPositions);
        }
        /**
         * @description Map of the positions mapped to the current canvas translation and scale
         */
        get scaledPositions() {
            if (!this.scalingAuthorized)
                return this.positions;
            return this.scalePositionsMap(this.positions);
        }
        get deltaPositions() {
            return this.positions.mapValues((key, position) => {
                const previousPosition = this.previousPositions.get(key);
                if (previousPosition)
                    return position.sub(previousPosition);
            });
        }
        get deltaPosition() {
            return Point.midPoint(...this.deltaPositions.valuesArray());
        }
        get scaledDeltaPositions() {
            return this.scaledPositions.mapValues((key, position) => {
                const previousPosition = this.scaledPreviousPositions.get(key);
                if (previousPosition)
                    return position.sub(previousPosition);
            });
        }
        get scaledDeltaPosition() {
            return Point.midPoint(...this.scaledDeltaPositions.valuesArray());
        }
    };
})();

class TurboEventManagerPointerController extends TurboController {
    keyName = "pointer";
    pointerDown = (e) => this.pointerDownFn(e);
    pointerMove = (e) => this.pointerMoveFn(e);
    pointerUp = (e) => this.pointerUpFn(e);
    pointerCancel = (e) => this.pointerCancelFn(e);
    lostPointerCapture = (e) => this.lostPointerCaptureFn(e);
    pointerDownFn(e) {
        if (!e.composedPath().includes(this.model.lockState.lockOrigin)) {
            document.activeElement?.blur?.();
            this.element.unlock();
        }
        if (!this.element.enabled)
            return;
        //Check if it's touch
        const isTouch = e.pointerType === "touch";
        //Prevent default actions (especially useful for touch events on iOS and iPadOS)
        if (this.element.preventDefaultMouse && !isTouch)
            e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch)
            e.preventDefault();
        //Update input device
        if (isTouch)
            this.model.inputDevice = exports.InputDevice.touch;
        else if (this.model.inputDevice === exports.InputDevice.unknown || this.model.inputDevice === exports.InputDevice.touch)
            this.model.inputDevice = exports.InputDevice.mouse;
        //Initialize origin & previous position using pointerId
        const id = e.pointerId;
        const position = new Point(e.clientX, e.clientY);
        this.model.origins.set(id, position);
        this.model.previousPositions.set(id, position);
        //Capture this pointer so we keep receiving move/up even if the pointer leaves the element
        const target = document.elementFromPoint(position.x, position.y);
        if (target)
            target.setPointerCapture?.(e.pointerId);
        //Update click mode
        this.model.activePointers.add(id);
        this.model.utils.setClickMode(isTouch ? this.model.activePointers.size : e.button, isTouch);
        //Return if click events are disabled
        if (!this.element.clickEventEnabled)
            return;
        // Fire click start
        this.fireClick(this.model.origins.first, TurboEventName.clickStart);
        this.model.currentAction = exports.ActionMode.click;
        // Long-press timer
        this.model.utils.setTimer(TurboEventName.longPress, () => {
            if (this.model.currentAction !== exports.ActionMode.click)
                return;
            this.model.currentAction = exports.ActionMode.longPress;
            this.fireClick(this.model.origins.first, TurboEventName.longPress);
        }, this.model.longPressDuration);
    }
    pointerMoveFn(e) {
        if (!this.element.enabled)
            return;
        if (!this.element.moveEventsEnabled && !this.element.dragEventEnabled)
            return;
        //Check if is touch
        const isTouch = e.pointerType === "touch";
        //Prevent default actions
        if (this.element.preventDefaultMouse && !isTouch)
            e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch)
            e.preventDefault();
        //New positions map
        this.model.positions = new TurboMap();
        // Only update the current pointer’s position (others remain tracked from prior moves)
        this.model.positions.set(e.pointerId, new Point(e.clientX, e.clientY));
        // Clear cached target origin if not dragging
        if (this.model.currentAction !== exports.ActionMode.drag)
            this.model.lastTargetOrigin = null;
        //Fire move event if enabled
        if (this.element.moveEventsEnabled)
            this.fireDrag(this.model.positions, TurboEventName.move);
        //If drag events are enabled and user is interacting
        if (this.model.currentAction !== exports.ActionMode.none && this.element.dragEventEnabled) {
            //Initialize drag
            if (this.model.currentAction !== exports.ActionMode.drag) {
                //Check if any tracked origin moved beyond threshold
                if (!Array.from(this.model.origins.entries()).some(([key, origin]) => {
                    const p = (key === e.pointerId)
                        ? this.model.positions.get(key)
                        : this.model.previousPositions.get(key);
                    return p && Point.dist(p, origin) > this.model.moveThreshold;
                }))
                    return;
                //If didn't return --> fire drag start and set action to drag
                clearCache(this);
                this.fireDrag(this.model.origins, TurboEventName.dragStart);
                this.model.currentAction = exports.ActionMode.drag;
            }
            //Fire drag step
            this.fireDrag(this.model.positions);
        }
        //Update previous positions for the moved pointer
        this.model.previousPositions.set(e.pointerId, this.model.positions.get(e.pointerId));
    }
    pointerUpFn(e) {
        if (!this.element.enabled)
            return;
        //Check if is touch
        const isTouch = e.pointerType === "touch";
        //Prevent default actions
        if (this.element.preventDefaultMouse && !isTouch)
            e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch)
            e.preventDefault();
        //Clear any timer set
        this.model.utils.clearTimer(TurboEventName.longPress);
        //Initialize a new positions map
        this.model.positions = new TurboMap();
        this.model.positions.set(e.pointerId, new Point(e.clientX, e.clientY));
        //If action was drag --> fire drag end
        if (this.model.currentAction === exports.ActionMode.drag && this.element.dragEventEnabled) {
            this.fireDrag(this.model.positions, TurboEventName.dragEnd);
        }
        //If click events are enabled
        if (this.element.clickEventEnabled) {
            //If action is click --> fire click
            if (this.model.currentAction === exports.ActionMode.click) {
                this.fireClick(this.model.positions.first, TurboEventName.click);
            }
            //Fire click end
            this.fireClick(this.model.origins.first, TurboEventName.clickEnd);
        }
        //Cleanup for this pointerId only
        this.model.origins.delete(e.pointerId);
        this.model.previousPositions.delete(e.pointerId);
        this.model.activePointers.delete(e.pointerId);
        //If no more active pointers, reset modes
        if (this.model.activePointers.size === 0) {
            this.model.currentAction = exports.ActionMode.none;
            this.model.currentClick = exports.ClickMode.none;
        }
    }
    pointerCancelFn(e) {
        //Treat like an aborted drag/click
        this.model.utils.clearTimer(TurboEventName.longPress);
        this.model.origins.delete(e.pointerId);
        this.model.previousPositions.delete(e.pointerId);
        this.model.activePointers.delete(e.pointerId);
        if (this.model.activePointers.size === 0) {
            this.model.currentAction = exports.ActionMode.none;
            this.model.currentClick = exports.ClickMode.none;
        }
    }
    lostPointerCaptureFn(_e) {
        // Optional: cleanup or fallback if needed
    }
    /**
     * @description Fires a custom Turbo click event at the click target with the click position
     * @param p
     * @param eventName
     * @private
     */
    fireClick(p, eventName = TurboEventName.click) {
        if (!p)
            return;
        const target = document.elementFromPoint(p.x, p.y) || document;
        this.emitter.fire("dispatchEvent", target, TurboEvent, { position: p, eventName: eventName });
    }
    /**
     * @description Fires a custom Turbo drag event at the target with the origin of the drag, the last drag position, and the current position
     * @param positions
     * @param eventName
     * @private
     */
    fireDrag(positions, eventName = TurboEventName.drag) {
        if (!positions)
            return;
        this.emitter.fire("dispatchEvent", this.getFireOrigin(positions), TurboDragEvent, {
            positions: positions,
            previousPositions: this.model.previousPositions,
            origins: this.model.origins,
            eventName: eventName
        });
    }
    getFireOrigin(positions, reload = false) {
        if (!this.model.lastTargetOrigin || reload) {
            const origin = this.model.origins.first ? this.model.origins.first : positions.first;
            this.model.lastTargetOrigin = document.elementFromPoint(origin.x, origin.y);
        }
        return this.model.lastTargetOrigin;
    }
}

class TurboWeakSet {
    _weakRefs;
    constructor() {
        this._weakRefs = new Set();
    }
    // Add an object as a WeakRef if it's not already in the set
    add(obj) {
        if (!this.has(obj))
            this._weakRefs.add(new WeakRef(obj));
        return this;
    }
    // Check if the set contains a WeakRef to the given object
    has(obj) {
        for (const weakRef of this._weakRefs) {
            if (weakRef.deref() === obj)
                return true;
        }
        return false;
    }
    // Delete the WeakRef associated with the given object
    delete(obj) {
        for (const weakRef of this._weakRefs) {
            if (weakRef.deref() === obj) {
                this._weakRefs.delete(weakRef);
                return true;
            }
        }
        return false;
    }
    // Clean up any WeakRefs whose objects have been garbage-collected
    cleanup() {
        for (const weakRef of this._weakRefs) {
            if (weakRef.deref() === undefined)
                this._weakRefs.delete(weakRef);
        }
    }
    // Convert live objects in the TurboWeakSet to an array
    toArray() {
        const result = [];
        for (const weakRef of this._weakRefs) {
            const obj = weakRef.deref();
            if (obj !== undefined)
                result.push(obj);
            else
                this._weakRefs.delete(weakRef);
        }
        return result;
    }
    // Get the size of the TurboWeakSet (only live objects)
    get size() {
        this.cleanup();
        return this.toArray().length;
    }
    // Clear all weak references
    clear() {
        this._weakRefs.clear();
    }
}

class TurboEventManagerDispatchController extends TurboController {
    keyName = "dispatch";
    boundHooks = new Map();
    setupChangedCallbacks() {
        super.setupChangedCallbacks();
        this.emitter.add("dispatchEvent", this.dispatchEvent);
    }
    dispatchEvent = (target, eventType, properties) => {
        if (!target)
            return;
        properties.keys = this.model.currentKeys;
        properties.toolName = this.element.getCurrentToolName(this.model.currentClick);
        properties.clickMode = this.model.currentClick;
        properties.eventManager = this.element;
        properties.eventInitDict = { bubbles: true, cancelable: true, composed: true };
        properties.authorizeScaling = this.element.authorizeEventScaling;
        properties.scalePosition = this.element.scaleEventPosition;
        if (properties.eventName === TurboKeyEventName.keyPressed)
            this.element.setToolByKey(properties["keyPressed"]);
        else if (properties.eventName === TurboKeyEventName.keyReleased)
            this.element.setTool(undefined, exports.ClickMode.key, { select: false });
        target.dispatchEvent(new eventType(properties));
    };
    getToolHandlingCallback(type, e) {
        const toolName = this.element.getCurrentToolName(this.model.currentClick);
        const path = e.composedPath?.() || [];
        for (let i = path.length - 1; i >= 0; i--) {
            if (!(path[i] instanceof Node))
                continue;
            if ($(path[i]).executeAction(type, toolName, e, { capture: true }, this.element)) {
                e.stopPropagation();
                break;
            }
        }
        for (let i = 0; i < path.length; i++) {
            if (!(path[i] instanceof Node))
                continue;
            if ($(path[i]).executeAction(type, toolName, e, undefined, this.element)) {
                e.stopPropagation();
                break;
            }
        }
    }
    setupCustomDispatcher(type) {
        if (this.boundHooks.has(type))
            return;
        const hook = (e) => this.getToolHandlingCallback(type, e);
        this.boundHooks.set(type, hook);
        document.addEventListener(type, hook, { capture: true });
    }
    removeCustomDispatcher(type) {
        const hook = this.boundHooks.get(type);
        if (!hook)
            return;
        document.removeEventListener(type, hook, { capture: true });
        this.boundHooks.delete(type);
    }
}

/**
 * @class TurboHandler
 * @description The MVC base handler class. It's an extension of the model, and its main job is to provide some utility
 * functions to manipulate some of (or all of) the model's data.
 * @template {TurboModel} ModelType - The element's MVC model type.
 */
class TurboHandler {
    /**
     * @description The key of the handler. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the handler's class name is MyElementSomethingHandler, the key would
     * default to "something".
     */
    keyName;
    /**
     * @description The MVC model.
     * @protected
     */
    model;
    constructor(model) {
        if (this.model)
            this.model = model;
    }
}

class TurboEventManagerUtilsHandler extends TurboHandler {
    keyName = "utils";
    setClickMode(button, isTouch = false) {
        if (isTouch)
            button--;
        switch (button) {
            case -1:
                this.model.currentClick = exports.ClickMode.none;
                return;
            case 0:
                this.model.currentClick = exports.ClickMode.left;
                return;
            case 1:
                this.model.currentClick = exports.ClickMode.middle;
                return;
            case 2:
                this.model.currentClick = exports.ClickMode.right;
                return;
            default:
                this.model.currentClick = exports.ClickMode.other;
                return;
        }
    }
    applyEventNames(eventNames) {
        for (const eventName in eventNames)
            DefaultEventName[eventName] = eventNames[eventName];
    }
    //Sets a timer function associated with a certain event name, with its duration
    setTimer(timerName, callback, duration) {
        this.clearTimer(timerName);
        this.model.timerMap.set(timerName, setTimeout(() => {
            callback();
            this.clearTimer(timerName);
        }, duration));
    }
    //Clears timer associated with the provided event name
    clearTimer(timerName) {
        const timer = this.model.timerMap.get(timerName);
        if (!timer)
            return;
        clearTimeout(timer);
        this.model.timerMap.delete(timerName);
    }
    selectTool(element, value) {
        if ("selected" in element && typeof element["selected"] === "boolean")
            element["selected"] = value;
    }
    activateTool(element, toolName, value) {
        if (value)
            $(element).onToolActivate(toolName).fire();
        else
            $(element).onToolDeactivate(toolName).fire();
    }
}

/**
 * Define MVC-style accessors on a class prototype via Object.defineProperty.
 * Adds: selected, view, model, data, dataId, dataIndex, dataSize
 */
function defineMvcAccessors(constructor) {
    const prototype = constructor.prototype;
    Object.defineProperty(prototype, "view", {
        get() { return this.mvc?.view; },
        set(view) {
            if (!this.mvc)
                throw new Error("view: missing this.mvc");
            this.mvc.view = view;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(prototype, "model", {
        get() { return this.mvc?.model; },
        set(model) {
            if (!this.mvc)
                throw new Error("model: missing this.mvc");
            this.mvc.model = model;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(prototype, "data", {
        get() { return this.mvc?.data; },
        set(data) {
            if (!this.mvc)
                throw new Error("data: missing this.mvc");
            this.mvc.data = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(prototype, "dataId", {
        get() { return this.mvc?.dataId; },
        set(v) {
            if (!this.mvc)
                throw new Error("dataId: missing this.mvc");
            this.mvc.dataId = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(prototype, "dataIndex", {
        get() { return this.mvc?.dataIndex; },
        set(v) {
            if (!this.mvc)
                throw new Error("dataIndex: missing this.mvc");
            this.mvc.dataIndex = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(prototype, "dataSize", {
        get() { return this.mvc?.dataSize; },
        enumerable: true,
        configurable: true
    });
}

function defineDefaultProperties(constructor) {
    const prototype = constructor.prototype;
    const selectedKey = Symbol("__selected__");
    const selectedClass = Symbol("__selectedClass__");
    const initializedKey = Symbol("__initialized__");
    Object.defineProperty(prototype, "selected", {
        get() { return !!this[selectedKey]; },
        set(value) {
            const element = this instanceof Element ? this : this.element instanceof Element ? this.element : undefined;
            if (!element) {
                this[selectedKey] = value;
                return;
            }
            const prevClass = this[selectedClass];
            const nextClass = this.getPropertiesValue?.(null, "defaultSelectedClass", "selected") ?? "selected";
            this[selectedKey] = value;
            this[selectedClass] = nextClass;
            if (prevClass && prevClass !== nextClass)
                $(element).toggleClass(prevClass, false);
            $(element).toggleClass(nextClass, !!value);
        },
        enumerable: true,
        configurable: true,
    });
    Object.defineProperty(prototype, "getPropertiesValue", {
        value: function (propertiesValue, configFieldName, defaultValue) {
            if (propertiesValue !== undefined && propertiesValue !== null)
                return propertiesValue;
            let constructor = this.constructor;
            while (constructor) {
                const configValue = constructor.config?.[configFieldName];
                if (configValue !== undefined && configValue !== null)
                    return configValue;
                constructor = Object.getPrototypeOf(constructor);
            }
            return defaultValue;
        },
        configurable: true,
        enumerable: false,
    });
    Object.defineProperty(prototype, "destroy", {
        value: function () { },
        configurable: true,
        enumerable: false,
    });
    Object.defineProperty(prototype, "initialized", {
        get: function () {
            return this[initializedKey] ?? false;
        },
        configurable: true,
        enumerable: false,
    });
    Object.defineProperty(prototype, "initialize", {
        value: function () {
            if (this[initializedKey])
                return;
            this.setupUIElements?.();
            this.setupUILayout?.();
            this.setupUIListeners?.();
            this.setupChangedCallbacks?.();
            if (this.mvc && this.mvc instanceof Mvc)
                this.mvc.initialize();
            initializeEffects(this);
            this[initializedKey] = true;
        },
        configurable: true,
        enumerable: false,
    });
}

/**
 * @class TurboHeadlessElement
 * @description TurboHeadlessElement class, similar to TurboElement but without extending HTMLElement.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
class TurboHeadlessElement {
    /**
     * @description Static configuration object.
     */
    static config = {};
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined)
                this.config[key] = val;
        });
    }
    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    mvc;
    constructor(properties = {}) {
        this.mvc = new Mvc({ ...properties, element: this });
    }
}
(() => {
    defineDefaultProperties(TurboHeadlessElement);
    defineMvcAccessors(TurboHeadlessElement);
})();

//TODO Create merged events maybe --> fire event x when "mousedown" | "touchstart" | "mousemove" etc.
//ToDO Create "interaction" event --> when element interacted with
/**
 * @description Class that manages default mouse, trackpad, and touch events, and accordingly fires custom events for
 * easier management of input.
 */
let TurboEventManager = (() => {
    let _classSuper = TurboHeadlessElement;
    let _instanceExtraInitializers = [];
    let _keyController_decorators;
    let _keyController_initializers = [];
    let _keyController_extraInitializers = [];
    let _wheelController_decorators;
    let _wheelController_initializers = [];
    let _wheelController_extraInitializers = [];
    let _pointerController_decorators;
    let _pointerController_initializers = [];
    let _pointerController_extraInitializers = [];
    let _dispatchController_decorators;
    let _dispatchController_initializers = [];
    let _dispatchController_extraInitializers = [];
    let _set_keyEventsEnabled_decorators;
    let _set_wheelEventsEnabled_decorators;
    let _set_moveEventsEnabled_decorators;
    let _set_mouseEventsEnabled_decorators;
    let _set_touchEventsEnabled_decorators;
    let _set_clickEventEnabled_decorators;
    let _set_dragEventEnabled_decorators;
    return class TurboEventManager extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _keyController_decorators = [controller()];
            _wheelController_decorators = [controller()];
            _pointerController_decorators = [controller()];
            _dispatchController_decorators = [controller()];
            _set_keyEventsEnabled_decorators = [auto()];
            _set_wheelEventsEnabled_decorators = [auto()];
            _set_moveEventsEnabled_decorators = [auto()];
            _set_mouseEventsEnabled_decorators = [auto()];
            _set_touchEventsEnabled_decorators = [auto()];
            _set_clickEventEnabled_decorators = [auto()];
            _set_dragEventEnabled_decorators = [auto()];
            tslib.__esDecorate(this, null, _set_keyEventsEnabled_decorators, { kind: "setter", name: "keyEventsEnabled", static: false, private: false, access: { has: obj => "keyEventsEnabled" in obj, set: (obj, value) => { obj.keyEventsEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_wheelEventsEnabled_decorators, { kind: "setter", name: "wheelEventsEnabled", static: false, private: false, access: { has: obj => "wheelEventsEnabled" in obj, set: (obj, value) => { obj.wheelEventsEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_moveEventsEnabled_decorators, { kind: "setter", name: "moveEventsEnabled", static: false, private: false, access: { has: obj => "moveEventsEnabled" in obj, set: (obj, value) => { obj.moveEventsEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_mouseEventsEnabled_decorators, { kind: "setter", name: "mouseEventsEnabled", static: false, private: false, access: { has: obj => "mouseEventsEnabled" in obj, set: (obj, value) => { obj.mouseEventsEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_touchEventsEnabled_decorators, { kind: "setter", name: "touchEventsEnabled", static: false, private: false, access: { has: obj => "touchEventsEnabled" in obj, set: (obj, value) => { obj.touchEventsEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_clickEventEnabled_decorators, { kind: "setter", name: "clickEventEnabled", static: false, private: false, access: { has: obj => "clickEventEnabled" in obj, set: (obj, value) => { obj.clickEventEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_dragEventEnabled_decorators, { kind: "setter", name: "dragEventEnabled", static: false, private: false, access: { has: obj => "dragEventEnabled" in obj, set: (obj, value) => { obj.dragEventEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, null, _keyController_decorators, { kind: "field", name: "keyController", static: false, private: false, access: { has: obj => "keyController" in obj, get: obj => obj.keyController, set: (obj, value) => { obj.keyController = value; } }, metadata: _metadata }, _keyController_initializers, _keyController_extraInitializers);
            tslib.__esDecorate(null, null, _wheelController_decorators, { kind: "field", name: "wheelController", static: false, private: false, access: { has: obj => "wheelController" in obj, get: obj => obj.wheelController, set: (obj, value) => { obj.wheelController = value; } }, metadata: _metadata }, _wheelController_initializers, _wheelController_extraInitializers);
            tslib.__esDecorate(null, null, _pointerController_decorators, { kind: "field", name: "pointerController", static: false, private: false, access: { has: obj => "pointerController" in obj, get: obj => obj.pointerController, set: (obj, value) => { obj.pointerController = value; } }, metadata: _metadata }, _pointerController_initializers, _pointerController_extraInitializers);
            tslib.__esDecorate(null, null, _dispatchController_decorators, { kind: "field", name: "dispatchController", static: false, private: false, access: { has: obj => "dispatchController" in obj, get: obj => obj.dispatchController, set: (obj, value) => { obj.dispatchController = value; } }, metadata: _metadata }, _dispatchController_initializers, _dispatchController_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /*
         *
         *
         * Static stuff
         *
         *
         */
        static managers = [];
        static get instance() {
            if (TurboEventManager.managers.length > 0)
                return TurboEventManager.managers[0];
            else
                return new TurboEventManager();
        }
        static get allManagers() {
            return [...this.managers];
        }
        static set allManagers(managers) {
            this.managers = managers;
        }
        /*
         *
         *
         * Controllers & handlers
         *
         *
         */
        keyController = (tslib.__runInitializers(this, _instanceExtraInitializers), tslib.__runInitializers(this, _keyController_initializers, void 0));
        wheelController = (tslib.__runInitializers(this, _keyController_extraInitializers), tslib.__runInitializers(this, _wheelController_initializers, void 0));
        pointerController = (tslib.__runInitializers(this, _wheelController_extraInitializers), tslib.__runInitializers(this, _pointerController_initializers, void 0));
        dispatchController = (tslib.__runInitializers(this, _pointerController_extraInitializers), tslib.__runInitializers(this, _dispatchController_initializers, void 0));
        /*
         *
         *
         * Constructor
         *
         *
         */
        constructor(properties = {}) {
            super();
            tslib.__runInitializers(this, _dispatchController_extraInitializers);
            this.mvc.generate({
                model: TurboEventManagerModel,
                controllers: [
                    TurboEventManagerKeyController,
                    TurboEventManagerWheelController,
                    TurboEventManagerPointerController,
                    TurboEventManagerDispatchController
                ],
                handlers: [TurboEventManagerUtilsHandler]
            });
            TurboEventManager.managers.push(this);
            this.model.authorizeEventScaling = properties.authorizeEventScaling;
            this.model.scaleEventPosition = properties.scaleEventPosition;
            this.model.state.enabled = properties.enabled ?? true;
            this.model.state.preventDefaultMouse = properties.preventDefaultMouse ?? true;
            this.model.state.preventDefaultTouch = properties.preventDefaultTouch ?? true;
            this.model.state.preventDefaultWheel = properties.preventDefaultWheel ?? true;
            this.unlock();
            this.model.moveThreshold = properties.moveThreshold || 10;
            this.model.longPressDuration = properties.longPressDuration || 500;
            if (!properties.disableKeyEvents)
                this.keyEventsEnabled = true;
            if (!properties.disableWheelEvents)
                this.wheelEventsEnabled = true;
            if (!properties.disableMouseEvents)
                this.mouseEventsEnabled = true;
            if (!properties.disableTouchEvents)
                this.touchEventsEnabled = true;
            if (!properties.disableDragEvents)
                this.dragEventEnabled = true;
            if (!properties.disableClickEvents)
                this.clickEventEnabled = true;
            if (!properties.disableMoveEvent)
                this.moveEventsEnabled = true;
            document.addEventListener("pointerdown", this.pointerController.pointerDown, { passive: false });
            document.addEventListener("pointermove", this.pointerController.pointerMove, { passive: false });
            document.addEventListener("pointerup", this.pointerController.pointerUp, { passive: false });
            document.addEventListener("pointercancel", this.pointerController.pointerCancel, { passive: false });
            //TODO
            this.dispatchController.setupCustomDispatcher("pointerdown");
        }
        /*
         *
         *
         * Getters and setters
         *
         *
         *
         */
        /**
         * @description The currently identified input device. It is not 100% accurate, especially when differentiating
         * between mouse and trackpad.
         */
        get inputDevice() {
            return this.model.inputDevice;
        }
        //Delegate fired when the input device changes
        get onInputDeviceChange() {
            return this.model.onInputDeviceChange;
        }
        get currentClick() {
            return this.model.currentClick;
        }
        get currentKeys() {
            return this.model.currentKeys;
        }
        /**
         * @description Delegate fired when a tool is changed on a certain click button/mode
         */
        get onToolChange() {
            return this.model.onToolChange;
        }
        get authorizeEventScaling() {
            return this.model.authorizeEventScaling;
        }
        set authorizeEventScaling(value) {
            this.model.authorizeEventScaling = value;
        }
        get scaleEventPosition() {
            return this.model.scaleEventPosition;
        }
        set scaleEventPosition(value) {
            this.model.scaleEventPosition = value;
        }
        get moveThreshold() {
            return this.model.moveThreshold;
        }
        set moveThreshold(value) {
            this.model.moveThreshold = value;
        }
        get longPressDuration() {
            return this.model.longPressDuration;
        }
        set longPressDuration(value) {
            this.model.longPressDuration = value;
        }
        /*
         *
         *
         * Enabling events setters
         *
         *
         *
         */
        set keyEventsEnabled(value) {
            if (value) {
                document.addEventListener("keydown", this.keyController.keyDown);
                document.addEventListener("keyup", this.keyController.keyUp);
            }
            else {
                document.removeEventListener("keydown", this.keyController.keyDown);
                document.removeEventListener("keyup", this.keyController.keyUp);
            }
            this.applyAndHookEvents(TurboKeyEventName, DefaultKeyEventName, value);
        }
        set wheelEventsEnabled(value) {
            if (value)
                document.body.addEventListener("wheel", this.wheelController.wheel, { passive: false });
            else
                document.body.removeEventListener("wheel", this.wheelController.wheel);
            this.applyAndHookEvents(TurboWheelEventName, DefaultWheelEventName, value);
        }
        set moveEventsEnabled(value) {
            this.applyAndHookEvents(TurboMoveEventName, DefaultMoveEventName, value);
        }
        set mouseEventsEnabled(value) {
            //TODO
            // if (value) {
            //     doc.on("pointerdown", this.pointerController.pointerDown, {passive: false, propagate: true});
            //     doc.on("pointermove", this.pointerController.pointerMove, {passive: false, propagate: true});
            //     doc.on("pointerup", this.pointerController.pointerUp, {passive: false, propagate: true});
            //     doc.on("pointercancel", this.pointerController.pointerCancel, {passive: false, propagate: true});
            // } else {
            //     doc.removeListener("mousedown", this.pointerController.pointerDown);
            //     doc.removeListener("mousemove", this.pointerController.pointerMove);
            //     doc.removeListener("mouseup", this.pointerController.pointerUp);
            //     doc.removeListener("mouseleave", this.pointerController.pointerLeave);
            // }
        }
        set touchEventsEnabled(value) {
            // if (value) {
            //     doc.on("touchstart", this.pointerController.pointerDown, {passive: false, propagate: true});
            //     doc.on("touchmove", this.pointerController.pointerMove, {passive: false, propagate: true});
            //     doc.on("touchend", this.pointerController.pointerUp, {passive: false, propagate: true});
            //     doc.on("touchcancel", this.pointerController.pointerUp, {passive: false, propagate: true});
            // } else {
            //     doc.removeListener("touchstart", this.pointerController.pointerDown);
            //     doc.removeListener("touchmove", this.pointerController.pointerMove);
            //     doc.removeListener("touchend", this.pointerController.pointerUp);
            //     doc.removeListener("touchcancel", this.pointerController.pointerUp);
            // }
        }
        set clickEventEnabled(value) {
            this.applyAndHookEvents(TurboClickEventName, DefaultClickEventName, value);
        }
        set dragEventEnabled(value) {
            this.applyAndHookEvents(TurboDragEventName, DefaultDragEventName, value);
        }
        /*
         *
         *
         * State and lock management
         *
         *
         *
         */
        /**
         * @description Sets the lock state for the event manager.
         * @param origin - The element that initiated the lock state.
         * @param value - The state properties to set.
         */
        lock(origin, value) {
            this.unlock();
            this.model.lockState.lockOrigin = origin;
            for (const key in value)
                this.model.lockState[key] = value[key];
        }
        /**
         * @description Resets the lock state to the default values.
         */
        unlock() {
            const s = this.model.state;
            const l = this.model.lockState;
            l.enabled = s.enabled;
            l.preventDefaultMouse = s.preventDefaultMouse;
            l.preventDefaultTouch = s.preventDefaultTouch;
            l.preventDefaultWheel = s.preventDefaultWheel;
            l.lockOrigin = document.body;
        }
        get enabled() {
            return this.model.state.enabled && this.model.lockState.enabled;
        }
        set enabled(value) {
            this.model.state.enabled = value;
        }
        get preventDefaultWheel() {
            return this.model.state.preventDefaultWheel && this.model.lockState.preventDefaultWheel;
        }
        set preventDefaultWheel(value) {
            this.model.state.preventDefaultWheel = value;
        }
        get preventDefaultMouse() {
            return this.model.state.preventDefaultMouse && this.model.lockState.preventDefaultMouse;
        }
        set preventDefaultMouse(value) {
            this.model.state.preventDefaultMouse = value;
        }
        get preventDefaultTouch() {
            return this.model.state.preventDefaultTouch && this.model.lockState.preventDefaultTouch;
        }
        set preventDefaultTouch(value) {
            this.model.state.preventDefaultTouch = value;
        }
        /*
         *
         *
         * Tool management
         *
         *
         *
         */
        /**
         * @description All attached tools in an array
         */
        get toolsArray() {
            const array = [];
            for (const tools of this.model.tools.values())
                array.push(...tools.toArray());
            return array;
        }
        getCurrentTool(mode = this.model.currentClick) {
            return this.model.currentTools.get(mode);
        }
        /**
         * @description Returns the instances of the tool currently held by the provided click mode
         * @param mode
         */
        getCurrentTools(mode = this.model.currentClick) {
            return this.getToolsByName(this.getCurrentToolName(mode));
        }
        /**
         * @description Returns the name of the tool currently held by the provided click mode
         * @param mode
         */
        getCurrentToolName(mode = this.model.currentClick) {
            return this.getToolName(this.getCurrentTool(mode));
        }
        getToolName(tool) {
            for (const [toolName, weakSet] of this.model.tools.entries()) {
                if (weakSet.has(tool))
                    return toolName;
            }
        }
        getSimilarTools(tool) {
            for (const [toolName, weakSet] of this.model.tools.entries()) {
                if (weakSet.has(tool))
                    return weakSet.toArray();
            }
            return [];
        }
        /**
         * @description Returns the tool with the given name (or undefined)
         * @param name
         */
        getToolsByName(name) {
            return this.model.tools.get(name)?.toArray() || [];
        }
        /**
         * @description Returns the first tool with the given name (or undefined)
         * @param name
         * @param predicate
         */
        getToolByName(name, predicate) {
            const tools = this.getToolsByName(name);
            return predicate ? tools?.find(predicate) : tools?.[0];
        }
        /**
         * @description Returns the tools associated with the given key
         * @param key
         */
        getToolsByKey(key) {
            const toolName = this.model.mappedKeysToTool.get(key);
            if (!toolName)
                return [];
            return this.getToolsByName(toolName);
        }
        /**
         * @description Returns the first tool associated with the given key
         * @param key
         * @param predicate
         */
        getToolByKey(key, predicate) {
            const tools = this.getToolsByKey(key);
            return predicate ? tools?.find(predicate) : tools?.[0];
        }
        /**
         * @description Adds a tool to the tools map, identified by its name. Optionally, provide a key to bind the tool to.
         * @param toolName
         * @param tool
         * @param key
         */
        addTool(toolName, tool, key) {
            if (!this.model.tools.has(toolName))
                this.model.tools.set(toolName, new TurboWeakSet());
            const tools = this.model.tools.get(toolName);
            if (!tools.has(tool))
                tools.add(tool);
            if (key)
                this.model.mappedKeysToTool.set(key, toolName);
        }
        /**
         * @description Sets the provided tool as a current tool associated with the provided type
         * @param tool
         * @param type
         * @param options
         */
        setTool(tool, type, options = {}) {
            if (!isUndefined(tool) && !$(tool).isTool(this))
                return;
            //Initialize undefined options
            if (options.select == undefined)
                options.select = true;
            if (options.activate == undefined)
                options.activate = true;
            if (options.setAsNoAction == undefined)
                options.setAsNoAction = type == exports.ClickMode.left;
            //Get previous tool
            const previousTool = this.model.currentTools.get(type);
            if (previousTool) {
                //Return if it's the same
                if (previousTool === tool)
                    return;
                //Deselect and deactivate previous tool
                this.getSimilarTools(previousTool).forEach(element => {
                    if (options.select)
                        this.model.utils.selectTool(element, false);
                    if (options.activate)
                        this.model.utils.activateTool(element, this.getToolName(previousTool), false);
                });
            }
            //Select new tool (and maybe set it as the tool for no click mode)
            this.model.currentTools.set(type, tool);
            if (options.setAsNoAction)
                this.model.currentTools.set(exports.ClickMode.none, tool);
            //Select and activate the tool
            this.getSimilarTools(tool).forEach(element => {
                if (options.activate)
                    this.model.utils.activateTool(element, this.getToolName(tool), true);
                if (options.select)
                    this.model.utils.selectTool(element, true);
            });
            //Fire tool changed
            this.onToolChange.fire(previousTool, tool, type);
        }
        /**
         * @description Sets tool associated with the provided key as the current tool for the key mode
         * @param key
         */
        setToolByKey(key) {
            const toolName = this.model.mappedKeysToTool.get(key);
            if (!toolName)
                return false;
            this.setTool(this.getToolByName(toolName), exports.ClickMode.key, { select: false });
            return true;
        }
        /*
         *
         *
         * Utils
         *
         *
         */
        setupCustomDispatcher(type) {
            return this.dispatchController.setupCustomDispatcher(type);
        }
        applyAndHookEvents(turboEventNames, defaultEventNames, applyTurboEvents) {
            this.model.utils.applyEventNames(applyTurboEvents ? turboEventNames : defaultEventNames);
            for (const name in turboEventNames) {
                if (applyTurboEvents)
                    this.dispatchController.setupCustomDispatcher(name);
                else
                    this.dispatchController.removeCustomDispatcher(name);
            }
        }
        destroy() {
            this.keyEventsEnabled = false;
            this.wheelEventsEnabled = false;
            this.mouseEventsEnabled = false;
            this.touchEventsEnabled = false;
            this.dragEventEnabled = false;
            this.clickEventEnabled = false;
            this.onToolChange.clear();
            return this;
        }
    };
})();

class EventFunctionsUtils {
    dataMap = new WeakMap;
    data(element) {
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return {};
        if (!this.dataMap.has(element))
            this.dataMap.set(element, {});
        return this.dataMap.get(element);
    }
    getBoundListenersSet(element) {
        let set = this.data(element).boundListeners;
        if (!set) {
            set = new Set();
            this.data(element).boundListeners = set;
        }
        return set;
    }
    getPreventDefaultListeners(element) {
        let map = this.data(element).preventDefaultListeners;
        if (!map) {
            map = {};
            this.data(element).preventDefaultListeners = map;
        }
        return map;
    }
    bypassManager(element, eventManager, bypassResults) {
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return;
        if (typeof bypassResults == "boolean")
            eventManager.lock(element, {
                enabled: bypassResults,
                preventDefaultWheel: bypassResults,
                preventDefaultMouse: bypassResults,
                preventDefaultTouch: bypassResults
            });
        else
            eventManager.lock(element, {
                enabled: bypassResults.enabled ?? false,
                preventDefaultWheel: bypassResults.preventDefaultWheel ?? false,
                preventDefaultMouse: bypassResults.preventDefaultMouse ?? false,
                preventDefaultTouch: bypassResults.preventDefaultTouch ?? false,
            });
    }
    getBoundListeners(element, type, toolName, options, manager = TurboEventManager.instance) {
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return [];
        if (!options)
            options = {};
        return [...this.getBoundListenersSet(element)]
            .filter(entry => entry.type === type && entry.manager === manager && entry.toolName === toolName)
            .filter(entry => {
            if (!options)
                return true;
            for (const [option, value] of Object.entries(options)) {
                if (entry.options?.[option] !== value)
                    return false;
            }
            return true;
        });
    }
}

const utils$6 = new EventFunctionsUtils();
function setupEventFunctions() {
    /**
     * @description Initializes a `boundListeners` set in the Node prototype, that will hold all the element's bound
     * listeners.
     */
    Object.defineProperty(TurboSelector.prototype, "boundListeners", {
        get: function () {
            return utils$6.getBoundListenersSet(this);
        },
        configurable: true,
        enumerable: true
    });
    /**
     * @description If you want the element to bypass the event manager and allow native events to seep through,
     * you can set this field to a predicate that defines when to bypass the manager.
     * @param {Event} e The event.
     */
    Object.defineProperty(TurboSelector.prototype, "bypassManagerOn", {
        get: function () {
            return utils$6.data(this)["bypassCallback"];
        },
        set: function (value) {
            utils$6.data(this)["bypassCallback"] = value;
        },
        configurable: true,
        enumerable: true
    });
    /**
     * @description Adds an event listener to the element.
     * @param {string} type - The type of the event.
     * @param toolName - The name of the tool. Set to null or undefined to check for listeners not bound to a tool.
     * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
     * @param {ListenerOptions} [options] - An options object that specifies characteristics
     * about the event listener.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.onTool = function _onTool(type, toolName, listener, options, manager = TurboEventManager.instance) {
        if (this.hasToolListener(type, toolName, listener, manager))
            return this;
        const bundledListener = (e) => listener(e, this);
        manager.setupCustomDispatcher?.(type);
        utils$6.getBoundListenersSet(this).add({ target: this, type, toolName, listener, bundledListener, options, manager });
        return this;
    };
    /**
     * @description Adds an event listener to the element.
     * @param {string} type - The type of the event.
     * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
     * @param {ListenerOptions} [options] - An options object that specifies characteristics
     * about the event listener.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.on = function _on(type, listener, options, manager = TurboEventManager.instance) {
        return this.onTool(type, undefined, listener, options, manager);
    };
    /**
     * @description
     * @param type
     * @param toolName
     * @param event
     * @param options
     * @param manager
     */
    TurboSelector.prototype.executeAction = function _executeAction(type, toolName, event, options, manager = TurboEventManager.instance) {
        if (!type)
            return false;
        if (!options)
            options = {};
        const activeTool = toolName ?? manager.getCurrentToolName();
        if (this.bypassManagerOn)
            utils$6.bypassManager(this, manager, this.bypassManagerOn(event));
        const firedListeners = new Set();
        const run = (target, tool) => {
            const ts = target instanceof TurboSelector ? target : $(target);
            const boundSet = utils$6.getBoundListenersSet(target);
            const entries = [...utils$6.getBoundListeners(target, type, tool, options, manager)];
            if (entries.length === 0)
                return false;
            let stopPropagation = false;
            for (const entry of entries) {
                if (firedListeners.has(entry))
                    continue;
                try {
                    if (entry.listener(event, ts))
                        stopPropagation = true;
                }
                finally {
                    firedListeners.add(entry);
                    if (entry.options?.once)
                        boundSet.delete(entry);
                }
            }
            return stopPropagation;
        };
        if (activeTool && run(this, activeTool))
            return true;
        if (!options.capture && activeTool && !this.isToolIgnored(activeTool, type, manager)
            && this.applyTool(activeTool, type, event, manager))
            return true;
        const embeddedTarget = this.getEmbeddedToolTarget(manager);
        const objectTools = this.getToolNames(manager);
        if (embeddedTarget && objectTools.length > 0) {
            let ret = false;
            for (const toolName of objectTools) {
                if (run(embeddedTarget, toolName))
                    ret = true;
            }
            if (ret)
                return true;
            const embeddedTargetSel = $(embeddedTarget);
            if (!options.capture)
                for (const toolName of objectTools) {
                    if (!embeddedTargetSel.isToolIgnored(toolName, type, manager)
                        && $(embeddedTarget).applyTool(toolName, type, event, manager))
                        ret = true;
                }
            if (ret)
                return true;
        }
        return run(this, undefined);
    };
    /**
     * @description Checks if the given event listener is bound to the element (in its boundListeners list).
     * @param {string} type - The type of the event. Set to null or undefined to get all event types.
     * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {boolean} - Whether the element has the given listener.
     */
    TurboSelector.prototype.hasListener = function _hasListener(type, listener, manager = TurboEventManager.instance) {
        return this.hasToolListener(type, undefined, listener, manager);
    };
    /**
     * @description Checks if the given event listener is bound to the element (in its boundListeners list).
     * @param {string} type - The type of the event. Set to null or undefined to get all event types.
     * @param {string} toolName - The name of the tool the listener is attached to. Set to null or undefined
     * to check for listeners not bound to a tool.
     * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {boolean} - Whether the element has the given listener.
     */
    TurboSelector.prototype.hasToolListener = function _hasToolListener(type, toolName, listener, manager = TurboEventManager.instance) {
        return utils$6.getBoundListeners(this, type, toolName, undefined, manager)
            .filter(entry => entry.listener === listener).length > 0;
    };
    /**
     * @description Checks if the element has bound listeners of the given type (in its boundListeners list).
     * @param {string} type - The type of the event. Set to null or undefined to get all event types.
     * @param {string} toolName - The name of the tool to consider (if any). Set to null or undefined
     * to check for listeners not bound to a tool.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {boolean} - Whether the element has the given listener.
     */
    TurboSelector.prototype.hasListenersByType = function _hasListenersByType(type, toolName, manager = TurboEventManager.instance) {
        return utils$6.getBoundListeners(this, type, toolName, undefined, manager).length > 0;
    };
    /**
     * @description Removes an event listener that is bound to the element (in its boundListeners list).
     * @param {string} type - The type of the event.
     * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeListener = function _removeListener(type, listener, manager = TurboEventManager.instance) {
        return this.removeToolListener(type, undefined, listener, manager);
    };
    /**
     * @description Removes an event listener that is bound to the element (in its boundListeners list).
     * @param {string} type - The type of the event.
     * @param {string} toolName - The name of the tool the listener is attached to. Set to null or undefined
     * to check for listeners not bound to a tool.
     * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeToolListener = function _removeToolListener(type, toolName, listener, manager = TurboEventManager.instance) {
        const boundListeners = utils$6.getBoundListenersSet(this);
        utils$6.getBoundListeners(this, type, toolName, undefined, manager)
            .filter(entry => entry.listener === listener)
            .forEach(entry => {
            entry.target.removeEventListener(entry.type, entry.bundledListener, entry.options);
            boundListeners.delete(entry);
        });
        return this;
    };
    /**
     * @description Removes all event listeners bound to the element (in its boundListeners list) assigned to the
     * specified type.
     * @param {string} type - The type of the event. Set to null or undefined to consider all types.
     * @param {string} toolName - The name of the tool associated (if any). Set to null or undefined
     * to check for listeners not bound to a tool.
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeListenersByType = function _removeListenersByType(type, toolName, manager = TurboEventManager.instance) {
        const boundListeners = utils$6.getBoundListenersSet(this);
        utils$6.getBoundListeners(this, type, toolName, undefined, manager)
            .forEach(entry => {
            entry.target.removeEventListener(entry.type, entry.bundledListener, entry.options);
            boundListeners.delete(entry);
        });
        return this;
    };
    /**
     * @description Removes all event listeners bound to the element (in its boundListeners list).
     * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
     * or a new instantiated one if none already exist.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeAllListeners = function _removeListeners(manager = TurboEventManager.instance) {
        const set = this.boundListeners;
        [...set].filter(entry => entry.manager === manager)
            .forEach(entry => {
            entry.target.removeEventListener(entry.type, entry.bundledListener, entry.options);
            set.delete(entry);
        });
        return this;
    };
    /**
     * @description Prevent default browser behavior on the provided event types. By default, all basic input events
     * will be processed.
     * @param {PreventDefaultOptions} options - An options object to customize the behavior of the function.
     */
    TurboSelector.prototype.preventDefault = function _preventDefault(options) {
        if (!options)
            options = {};
        const manager = options.manager ?? TurboEventManager.instance;
        const types = options.types ?? BasicInputEvents;
        const phase = options.phase ?? "capture";
        const stop = options.stop ?? false;
        utils$6.data(this.element).preventDefaultOn = options.preventDefaultOn
            ?? utils$6.data(this.element).preventDefaultOn ?? (() => true);
        const preventDefaultListeners = utils$6.getPreventDefaultListeners(this);
        if (options.clearPreviousListeners)
            for (const [type, listener] of Object.entries(preventDefaultListeners)) {
                this.removeListener(type, listener);
                delete preventDefaultListeners[type];
            }
        const shouldNotBePassive = new Set(NonPassiveEvents);
        for (const type of new Set(types)) {
            const handler = (event) => {
                if (!utils$6.data(this.element).preventDefaultOn(type, event))
                    return false;
                event.preventDefault?.();
                if (stop === "immediate")
                    event.stopImmediatePropagation?.();
                else if (stop === "stop")
                    event.stopPropagation?.();
                return true;
            };
            preventDefaultListeners[type] = handler;
            const options = {};
            if (phase === "capture")
                options.capture = true;
            if (shouldNotBePassive.has(type))
                options.passive = false;
            this.on(type, handler, options, manager);
        }
        return this;
    };
}

class StyleFunctionsUtils {
    dataMap = new WeakMap;
    data(element) {
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return {};
        if (!this.dataMap.has(element))
            this.dataMap.set(element, {});
        return this.dataMap.get(element);
    }
    setStyle(selector, attribute, value, instant = false, apply = true) {
        if (instant) {
            selector.element.style[attribute] = value.toString();
            return;
        }
        let pendingStyles = this.data(selector.element)["pendingStyles"];
        if (!pendingStyles || typeof pendingStyles !== "object") {
            pendingStyles = {};
            this.data(selector.element)["pendingStyles"] = pendingStyles;
        }
        pendingStyles[attribute] = value;
        if (apply)
            this.applyStyles(selector);
        return;
    }
    /**
     * @description Apply the pending styles to the element.
     */
    applyStyles(selector) {
        const pendingStyles = this.data(selector.element)["pendingStyles"];
        if (!pendingStyles || typeof pendingStyles !== "object")
            return;
        requestAnimationFrame(() => {
            for (const property in pendingStyles) {
                if (property == "cssText")
                    selector.element.style.cssText += ";" + pendingStyles["cssText"];
                else
                    selector.element.style[property] = pendingStyles[property];
            }
            this.data(selector.element)["pendingStyles"] = {};
        });
    }
}

const utils$5 = new StyleFunctionsUtils();
function setupStyleFunctions() {
    /**
     * @description The closest root to the element in the document (the closest ShadowRoot, or the document's head).
     */
    Object.defineProperty(TurboSelector.prototype, "closestRoot", {
        get: function () {
            let node = this.element;
            while (node) {
                if (node instanceof Element && node.shadowRoot)
                    return node.shadowRoot;
                node = node.parentElement;
            }
            return document.head;
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Set a certain style attribute of the element to the provided value.
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string | number} value - A string representing the value to set the attribute to.
     * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
     * animation frame.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.setStyle = function _setStyle(attribute, value, instant = false) {
        if (!attribute || value == undefined)
            return this;
        if (!(this.element instanceof HTMLElement) && !(this.element instanceof SVGElement))
            return this;
        utils$5.setStyle(this, attribute, value, instant);
        return this;
    };
    /**
     * @description Set a certain style attribute of the element to the provided value.
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @param {string} [separator=", "] - The separator to use between the existing and new value.
     * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
     * animation frame.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.appendStyle = function _appendStyle(attribute, value, separator = ", ", instant = false) {
        if (!attribute || value == undefined)
            return this;
        if (!(this.element instanceof HTMLElement) && !(this.element instanceof SVGElement))
            return this;
        const currentStyle = (this.element.style[attribute] || "");
        separator = currentStyle.length > 0 ? separator : "";
        utils$5.setStyle(this, attribute, currentStyle + separator + value, instant);
        return this;
    };
    /**
     * @description Parses and applies the given CSS to the element's inline styles.
     * @param {StylesType} styles - A CSS string of style attributes and their values, seperated by semicolons,
     * or an object of CSS properties. Use the css literal function for autocompletion.
     * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
     * animation frame.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.setStyles = function _setStyles(styles, instant = false) {
        if (!styles || typeof styles == "number")
            return this;
        if (!(this.element instanceof HTMLElement) && !(this.element instanceof SVGElement))
            return this;
        let stylesObject = {};
        if (typeof styles === "object")
            stylesObject = styles;
        else if (typeof styles == "string") {
            styles.split(";").forEach(entry => {
                const [property, value] = entry.split(":").map(part => part.trim());
                if (!property || !value)
                    return;
                stylesObject[property] = value;
            });
        }
        Object.entries(stylesObject).forEach(([key, value]) => utils$5.setStyle(this, key, value, instant, false));
        if (!instant)
            utils$5.applyStyles(this);
        return this;
    };
}

class ToolFunctionsUtils {
    elements = new WeakMap();
    tools = new WeakMap();
    getOrCreate(map, key, factory) {
        let value = map.get(key);
        if (!value) {
            value = factory();
            map.set(key, value);
        }
        return value;
    }
    getElementData(element, manager) {
        if (element instanceof TurboSelector)
            element = element.element;
        const es = this.getOrCreate(this.elements, element, () => new WeakMap());
        return this.getOrCreate(es, manager, () => ({
            tools: new Set(),
            ignoreAllTools: false,
            ignoredTools: new Map(),
            activationDelegates: new Map(),
            deactivationDelegates: new Map(),
        }));
    }
    getToolsData(manager, toolName) {
        const byTool = this.getOrCreate(this.tools, manager, () => new Map());
        return this.getOrCreate(byTool, toolName, () => ({
            behaviors: new Map()
        }));
    }
    getActivationDelegate(element, toolName, manager) {
        const map = this.getElementData(element, manager).activationDelegates;
        if (!map.get(toolName))
            map.set(toolName, new Delegate());
        return map.get(toolName);
    }
    getDeactivationDelegate(element, toolName, manager) {
        const map = this.getElementData(element, manager).deactivationDelegates;
        if (!map.get(toolName))
            map.set(toolName, new Delegate());
        return map.get(toolName);
    }
    saveTool(element, toolName, manager) {
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return;
        this.getElementData(element, manager).tools.add(toolName);
    }
    getToolNames(element, manager) {
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return [];
        return [...this.getElementData(element, manager).tools];
    }
    setEmbeddedToolTarget(element, target, manager) {
        if (target instanceof TurboSelector)
            target = target.element;
        if (!target)
            return;
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return;
        this.getElementData(element, manager).embeddedTarget = target;
    }
    getEmbeddedToolTarget(element, manager) {
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return;
        return this.getElementData(element, manager).embeddedTarget;
    }
    addToolBehavior(toolName, type, callback, manager) {
        const behaviors = this.getToolsData(manager, toolName).behaviors;
        const set = this.getOrCreate(behaviors, type, () => new Set());
        set.add(callback);
    }
    getToolBehaviors(toolName, type, manager) {
        const behaviors = this.getToolsData(manager, toolName).behaviors;
        return [...this.getOrCreate(behaviors, type, () => new Set())];
    }
    removeToolBehaviors(toolName, type, manager) {
        const behaviors = this.getToolsData(manager, toolName).behaviors;
        this.getOrCreate(behaviors, type, () => new Set()).clear();
    }
    clearToolBehaviors(manager) {
        this.getOrCreate(this.tools, manager, () => new Map()).clear();
    }
    ignoreTool(element, toolName, type, ignore, manager) {
        const ignoredTools = this.getElementData(element, manager).ignoredTools;
        if (!type) {
            if (ignore)
                ignoredTools.set(toolName, "all");
            else
                ignoredTools.delete(toolName);
        }
        else {
            const ignoredTool = ignoredTools.get(toolName);
            if (!ignore) {
                if (ignoredTool instanceof Set)
                    ignoredTool.delete(type);
                return;
            }
            if (!(ignoredTool instanceof Set))
                ignoredTools.set(toolName, new Set());
            ignoredTools.get(toolName).add(type);
        }
    }
    isToolIgnored(element, toolName, type, manager) {
        const ignoredTool = this.getElementData(element, manager).ignoredTools?.get(toolName);
        if (!ignoredTool)
            return false;
        if (ignoredTool === "all" || !type)
            return true;
        return ignoredTool.has(type);
    }
}

const utils$4 = new ToolFunctionsUtils();
function setupToolFunctions() {
    /*
     *
     * Basic tool manipulation
     *
     */
    TurboSelector.prototype.makeTool = function _makeTool(toolName, options) {
        if (!toolName)
            return this;
        if (!options)
            options = {};
        if (!options.manager)
            options.manager = TurboEventManager.instance;
        options.manager.addTool(toolName, this.element, options.key);
        if (options.customActivation && typeof options.customActivation === "function") {
            options.customActivation(this, options.manager);
        }
        else {
            options.activationEvent ??= DefaultEventName.click;
            options.clickMode ??= exports.ClickMode.left;
            this.on(options.activationEvent, () => {
                options.manager.setTool(this.element, options.clickMode);
                return true;
            }, undefined, options.manager);
        }
        utils$4.saveTool(this, toolName, options.manager);
        if (options.onActivate)
            utils$4.getActivationDelegate(this, toolName, options.manager).add(options.onActivate);
        if (options.onDeactivate)
            utils$4.getDeactivationDelegate(this, toolName, options.manager).add(options.onDeactivate);
        return this;
    };
    TurboSelector.prototype.isTool = function _isTool(manager = TurboEventManager.instance) {
        return utils$4.getToolNames(this.element, manager).length > 0;
    };
    TurboSelector.prototype.getToolNames = function _getToolName(manager = TurboEventManager.instance) {
        return utils$4.getToolNames(this.element, manager);
    };
    TurboSelector.prototype.getToolName = function _getToolName(manager = TurboEventManager.instance) {
        const toolNames = utils$4.getToolNames(this.element, manager);
        if (toolNames.length > 0)
            return toolNames[0];
    };
    /*
     *
     * Tool activation manipulation
     *
     */
    TurboSelector.prototype.onToolActivate = function _onActivate(toolName, manager = TurboEventManager.instance) {
        if (!toolName)
            toolName = this.getToolName(manager);
        return utils$4.getActivationDelegate(this, toolName, manager);
    };
    TurboSelector.prototype.onToolDeactivate = function _onDeactivate(toolName, manager = TurboEventManager.instance) {
        if (!toolName)
            toolName = this.getToolName(manager);
        return utils$4.getDeactivationDelegate(this, toolName, manager);
    };
    /*
     *
     * Tool behavior manipulation
     *
     */
    TurboSelector.prototype.addToolBehavior = function _addToolBehavior(type, callback, toolName = this.getToolName(), manager = TurboEventManager.instance) {
        if (type && toolName) {
            manager.setupCustomDispatcher?.(type);
            utils$4.addToolBehavior(toolName, type, callback, manager);
        }
        return this;
    };
    TurboSelector.prototype.hasToolBehavior = function _hasToolBehavior(type, toolName = this.getToolName(), manager = TurboEventManager.instance) {
        if (!type || !toolName)
            return false;
        return utils$4.getToolBehaviors(toolName, type, manager).length > 0;
    };
    TurboSelector.prototype.removeToolBehaviors = function _removeToolBehaviors(type, toolName = this.getToolName(), manager = TurboEventManager.instance) {
        if (type && toolName)
            utils$4.removeToolBehaviors(toolName, type, manager);
        return this;
    };
    TurboSelector.prototype.clearToolBehaviors = function _clearToolBehaviors(manager = TurboEventManager.instance) {
        utils$4.clearToolBehaviors(manager);
        return this;
    };
    /*
     *
     * Embedded tool manipulation
     *
     */
    TurboSelector.prototype.embedTool = function _embedTool(target, manager = TurboEventManager.instance) {
        if (this.isTool(manager))
            utils$4.setEmbeddedToolTarget(this.element, target, manager);
        return this;
    };
    TurboSelector.prototype.isEmbeddedTool = function _isEmbeddedTool(manager = TurboEventManager.instance) {
        return !!utils$4.getEmbeddedToolTarget(this.element, manager);
    };
    TurboSelector.prototype.getEmbeddedToolTarget = function _getEmbeddedToolTarget(manager = TurboEventManager.instance) {
        return utils$4.getEmbeddedToolTarget(this.element, manager);
    };
    /*
     *
     * Apply tool
     *
     */
    TurboSelector.prototype.applyTool = function _applyTool(toolName, type, event, manager = TurboEventManager.instance) {
        let pass = false;
        const behaviors = utils$4.getToolBehaviors(toolName, type, manager);
        const options = {};
        options.embeddedTarget = utils$4.getEmbeddedToolTarget(this.element, manager);
        options.isEmbedded = !!options.embeddedTarget;
        behaviors.forEach(behavior => {
            if (behavior(event, this.element, options))
                pass = true;
        });
        return pass;
    };
    TurboSelector.prototype.ignoreTool = function _ignoreTool(toolName, type, ignore = true, manager = TurboEventManager.instance) {
        utils$4.ignoreTool(this.element, toolName, type, ignore, manager);
        return this;
    };
    TurboSelector.prototype.ignoreAllTools = function _ignoreAllTools(ignore = true, manager = TurboEventManager.instance) {
        utils$4.getElementData(this.element, manager).ignoreAllTools = ignore;
        return this;
    };
    TurboSelector.prototype.isToolIgnored = function _isToolIgnored(toolName, type, manager = TurboEventManager.instance) {
        if (utils$4.getElementData(this.element, manager).ignoreAllTools)
            return true;
        return utils$4.isToolIgnored(this.element, toolName, type, manager);
    };
}

class SubstrateFunctionsUtils {
    dataMap = new WeakMap;
    data(element) {
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return {};
        if (!this.dataMap.has(element))
            this.dataMap.set(element, {
                substrates: new Map(),
                onChange: new Delegate()
            });
        return this.dataMap.get(element);
    }
    createSubstrate(element, substrate) {
        const data = {
            objects: element instanceof Element ? element.children : element.childNodes,
            temporaryMetadata: new WeakMap(),
            persistentMetadata: new WeakMap(),
            onActivate: new Delegate(),
            onDeactivate: new Delegate(),
            solvers: new Set()
        };
        this.data(element).substrates.set(substrate, data);
        return data;
    }
    setCurrent(element, substrate) {
        if (!this.getSubstrates(element).includes(substrate))
            return false;
        this.data(element).current = substrate;
        return true;
    }
    getSubstrateData(element, substrate) {
        return this.data(element).substrates.get(substrate);
    }
    getSubstrates(element) {
        return [...this.data(element).substrates.keys()];
    }
    getPersistentMetadata(element, substrate, object) {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.persistentMetadata)
            return {};
        let metadata = substrateData.persistentMetadata.get(object);
        if (!metadata) {
            metadata = {};
            substrateData.persistentMetadata.set(object, metadata);
        }
        return metadata;
    }
    setPersistentMetadata(element, substrate, object, metadata) {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.persistentMetadata)
            return;
        substrateData.persistentMetadata.set(object, metadata);
    }
    getTemporaryMetadata(element, substrate, object) {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.temporaryMetadata)
            return;
        let metadata = substrateData.temporaryMetadata.get(object);
        if (!metadata) {
            metadata = {};
            substrateData.temporaryMetadata.set(object, metadata);
        }
        return metadata;
    }
    setTemporaryMetadata(element, substrate, object, metadata) {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.temporaryMetadata)
            return;
        substrateData.temporaryMetadata.set(object, metadata);
    }
}

const utils$3 = new SubstrateFunctionsUtils();
function setupSubstrateFunctions() {
    TurboSelector.prototype.makeSubstrate = function _makeSubstrate(name, options) {
        utils$3.createSubstrate(this, name);
        if (options?.onActivate)
            this.onSubstrateActivate(name).add(options.onActivate);
        if (options?.onDeactivate)
            this.onSubstrateDeactivate(name).add(options.onDeactivate);
        if (!this.currentSubstrate)
            this.currentSubstrate = name;
        return this;
    };
    Object.defineProperty(TurboSelector.prototype, "substrates", {
        get: function () { return utils$3.getSubstrates(this.element); },
        configurable: false,
        enumerable: true
    });
    Object.defineProperty(TurboSelector.prototype, "currentSubstrate", {
        get: function () { return utils$3.data(this).current; },
        set: function (value) {
            if (!value)
                return;
            const prev = this.currentSubstrate;
            if (utils$3.setCurrent(this, value))
                this.onSubstrateChange.fire(prev, value);
        },
        configurable: false,
        enumerable: true
    });
    Object.defineProperty(TurboSelector.prototype, "onSubstrateChange", {
        get: function () { return utils$3.data(this).onChange; },
        configurable: false,
        enumerable: true
    });
    TurboSelector.prototype.onSubstrateActivate = function _onSubstrateActivate(name = this.currentSubstrate) {
        return utils$3.getSubstrateData(this, name)?.onActivate ?? new Delegate();
    };
    TurboSelector.prototype.onSubstrateDeactivate = function _onSubstrateDeactivate(name = this.currentSubstrate) {
        return utils$3.getSubstrateData(this, name)?.onDeactivate ?? new Delegate();
    };
    TurboSelector.prototype.getSubstrateObjectList = function _getSubstrateObjectList(substrate = this.currentSubstrate) {
        const set = new Set();
        if (!substrate)
            return set;
        Array.from(utils$3.getSubstrateData(this, substrate).objects).forEach(object => {
            if (!utils$3.getPersistentMetadata(this, substrate, object).ignored)
                set.add(object);
        });
        return set;
    };
    TurboSelector.prototype.setSubstrateObjectList = function _setSubstrateObjectList(list, substrate = this.currentSubstrate) {
        if (!list || !substrate)
            return this;
        utils$3.getSubstrateData(this, substrate).objects = list;
        return this;
    };
    TurboSelector.prototype.addObjectToSubstrate = function _addObjectToSubstrate(object, substrate = this.currentSubstrate) {
        if (!object || !substrate)
            return this;
        utils$3.getPersistentMetadata(this, substrate, object).ignored = false;
        const list = utils$3.getSubstrateData(this, substrate).objects;
        if (list instanceof HTMLCollection || list instanceof NodeList)
            return this;
        try {
            if (!list.has(object))
                list.add(object);
        }
        catch { }
        return this;
    };
    TurboSelector.prototype.removeObjectFromSubstrate = function _removeObjectFromSubstrate(object, substrate = this.currentSubstrate) {
        if (!object || !substrate)
            return this;
        utils$3.getPersistentMetadata(this, substrate, object).ignored = true;
        const list = utils$3.getSubstrateData(this, substrate).objects;
        if (list instanceof Set)
            list.delete(object);
        return this;
    };
    TurboSelector.prototype.hasObjectInSubstrate = function _hasObjectInSubstrate(object, substrate = this.currentSubstrate) {
        if (!object || !substrate)
            return false;
        const list = this.getSubstrateObjectList(substrate);
        for (const obj of list) {
            if (obj === object)
                return true;
        }
        return false;
    };
    TurboSelector.prototype.wasObjectProcessedBySubstrate = function _wasObjectProcessedBySubstrate(object, substrate = this.currentSubstrate) {
        if (!object || !substrate)
            return false;
        return !!utils$3.getTemporaryMetadata(this, substrate, object)?.processed;
    };
    TurboSelector.prototype.addSolver = function _addSolver(callback, name = this.currentSubstrate) {
        utils$3.getSubstrateData(this, name).solvers?.add(callback);
        return this;
    };
    TurboSelector.prototype.removeSolver = function _removeSolver(callback, name = this.currentSubstrate) {
        utils$3.getSubstrateData(this, name).solvers?.delete(callback);
        return this;
    };
    TurboSelector.prototype.clearSolvers = function _clearSolvers(name = this.currentSubstrate) {
        utils$3.getSubstrateData(this, name).solvers?.clear();
        return this;
    };
    TurboSelector.prototype.resolveSubstrate = function _resolveSubstrate(properties = {}, substrate = this.currentSubstrate) {
        if (!properties)
            properties = {};
        properties.substrate = properties.substrate ?? substrate;
        if (!properties.substrate)
            return this;
        if (!properties.manager)
            properties.manager = TurboEventManager.instance;
        if (!properties.eventOptions)
            properties.eventOptions = {};
        const data = utils$3.getSubstrateData(this, properties.substrate);
        if (!data)
            return this;
        data.solvers?.forEach(solver => {
            data.temporaryMetadata = new WeakMap();
            if (properties.eventTarget) {
                data.temporaryMetadata.set(properties.eventTarget, { processed: true, isMainTarget: true });
                solver({ ...properties, target: properties.eventTarget });
            }
            let target;
            do {
                target = Array
                    .from(this.getSubstrateObjectList(properties.substrate))
                    .find(entry => !data.temporaryMetadata.get(entry)?.processed);
                if (target) {
                    data.temporaryMetadata.set(target, { processed: true });
                    solver({ ...properties, target });
                }
            } while (target);
        });
        return this;
    };
}

const onceRegistry = new WeakMap();
/**
 * @function callOnce
 * @template {(...args: any[]) => any} Type
 * @description Function wrapper that ensures the passed function is called only once.
 * Subsequent calls will just return the cached computed result (if any) of the first call of that function.
 * @param {Type} fn - The function to process.
 *
 * @example
 * ```ts
 * const init = callOnce(function () { ... });
 * const out = init();
 * ```
 */
function callOnce(fn) {
    if (onceRegistry.has(fn))
        return onceRegistry.get(fn);
    let called = false;
    let result;
    let promise;
    const wrapper = function (...args) {
        if (called)
            return result;
        if (promise)
            return promise;
        try {
            const out = fn.apply(this, args);
            if (out instanceof Promise) {
                promise = out.then((val) => {
                    result = val;
                    called = true;
                    promise = null;
                    return val;
                }).catch((err) => {
                    promise = null;
                    throw err;
                });
                return promise;
            }
            else {
                result = out;
                called = true;
                return out;
            }
        }
        catch (err) {
            throw err;
        }
    };
    onceRegistry.set(fn, wrapper);
    return wrapper;
}
/**
 * @decorator
 * @function callOncePerInstance
 * @description Stage-3 method decorator. It ensures a method in a class is called only once per instance.
 * Subsequent calls will be canceled and log a warning. Works for instance or static methods.
 *
 * @example
 * ```ts
 *   class A {
 *     @callOnce init() { ... }
 *   }
 * ```
 */
function callOncePerInstance(value, context) {
    if (context.kind !== "method")
        throw new Error(`@callOnce can only be used on methods (got: ${context.kind}).`);
    const name = String(context.name);
    const flag = Symbol(`__callOnce__${name}`);
    return function (...args) {
        if (this[flag]) {
            console.warn(`Function ${name} has already been called once on this instance and will not be called again.`);
            return;
        }
        this[flag] = true;
        return value.apply(this, args);
    };
}

function areEqual(...entries) {
    if (entries.length < 2)
        return true;
    for (let i = 0; i < entries.length - 1; i++) {
        if (entries[i] != entries[i + 1])
            return false;
    }
    return true;
}
function equalToAny(entry, ...values) {
    if (values.length < 1)
        return true;
    for (const value of values) {
        if (entry == value)
            return true;
    }
    return false;
}
function eachEqualToAny(values, ...entries) {
    if (entries.length < 1)
        return true;
    for (const entry of entries) {
        let equals = false;
        for (const value of values) {
            if (entry == value)
                equals = true;
        }
        if (!equals)
            return false;
    }
    return true;
}

function trim(value, max, min = 0) {
    if (value < min)
        value = min;
    if (value > max)
        value = max;
    return value;
}
function mod(value, modValue = 0) {
    while (value < 0)
        value += modValue;
    while (value >= modValue)
        value -= modValue;
    return value;
}

/**
 * @class StatefulReifect
 * @description A class to manage and apply dynamic state-based properties, styles, classes, and transitions to a
 * set of objects.
 *
 * @template {string | number | symbol} State - The type of the reifier's states.
 * @template {object} ClassType - The object type this reifier will be applied to.
 */
let StatefulReifect = (() => {
    let _instanceExtraInitializers = [];
    let _set_enabled_decorators;
    let _set_propertiesEnabled_decorators;
    let _set_stylesEnabled_decorators;
    let _set_classesEnabled_decorators;
    let _set_replaceWithEnabled_decorators;
    let _set_transitionEnabled_decorators;
    let _set_properties_decorators;
    let _set_styles_decorators;
    let _set_classes_decorators;
    let _set_replaceWith_decorators;
    let _set_transitionProperties_decorators;
    let _set_transitionDuration_decorators;
    let _set_transitionTimingFunction_decorators;
    let _set_transitionDelay_decorators;
    let _set_transition_decorators;
    return class StatefulReifect {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _set_enabled_decorators = [auto()];
            _set_propertiesEnabled_decorators = [auto()];
            _set_stylesEnabled_decorators = [auto()];
            _set_classesEnabled_decorators = [auto()];
            _set_replaceWithEnabled_decorators = [auto()];
            _set_transitionEnabled_decorators = [auto()];
            _set_properties_decorators = [auto()];
            _set_styles_decorators = [auto()];
            _set_classes_decorators = [auto()];
            _set_replaceWith_decorators = [auto()];
            _set_transitionProperties_decorators = [auto()];
            _set_transitionDuration_decorators = [auto()];
            _set_transitionTimingFunction_decorators = [auto()];
            _set_transitionDelay_decorators = [auto()];
            _set_transition_decorators = [auto()];
            tslib.__esDecorate(this, null, _set_enabled_decorators, { kind: "setter", name: "enabled", static: false, private: false, access: { has: obj => "enabled" in obj, set: (obj, value) => { obj.enabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_propertiesEnabled_decorators, { kind: "setter", name: "propertiesEnabled", static: false, private: false, access: { has: obj => "propertiesEnabled" in obj, set: (obj, value) => { obj.propertiesEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_stylesEnabled_decorators, { kind: "setter", name: "stylesEnabled", static: false, private: false, access: { has: obj => "stylesEnabled" in obj, set: (obj, value) => { obj.stylesEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_classesEnabled_decorators, { kind: "setter", name: "classesEnabled", static: false, private: false, access: { has: obj => "classesEnabled" in obj, set: (obj, value) => { obj.classesEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_replaceWithEnabled_decorators, { kind: "setter", name: "replaceWithEnabled", static: false, private: false, access: { has: obj => "replaceWithEnabled" in obj, set: (obj, value) => { obj.replaceWithEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_transitionEnabled_decorators, { kind: "setter", name: "transitionEnabled", static: false, private: false, access: { has: obj => "transitionEnabled" in obj, set: (obj, value) => { obj.transitionEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_properties_decorators, { kind: "setter", name: "properties", static: false, private: false, access: { has: obj => "properties" in obj, set: (obj, value) => { obj.properties = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_styles_decorators, { kind: "setter", name: "styles", static: false, private: false, access: { has: obj => "styles" in obj, set: (obj, value) => { obj.styles = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_classes_decorators, { kind: "setter", name: "classes", static: false, private: false, access: { has: obj => "classes" in obj, set: (obj, value) => { obj.classes = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_replaceWith_decorators, { kind: "setter", name: "replaceWith", static: false, private: false, access: { has: obj => "replaceWith" in obj, set: (obj, value) => { obj.replaceWith = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_transitionProperties_decorators, { kind: "setter", name: "transitionProperties", static: false, private: false, access: { has: obj => "transitionProperties" in obj, set: (obj, value) => { obj.transitionProperties = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_transitionDuration_decorators, { kind: "setter", name: "transitionDuration", static: false, private: false, access: { has: obj => "transitionDuration" in obj, set: (obj, value) => { obj.transitionDuration = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_transitionTimingFunction_decorators, { kind: "setter", name: "transitionTimingFunction", static: false, private: false, access: { has: obj => "transitionTimingFunction" in obj, set: (obj, value) => { obj.transitionTimingFunction = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_transitionDelay_decorators, { kind: "setter", name: "transitionDelay", static: false, private: false, access: { has: obj => "transitionDelay" in obj, set: (obj, value) => { obj.transitionDelay = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_transition_decorators, { kind: "setter", name: "transition", static: false, private: false, access: { has: obj => "transition" in obj, set: (obj, value) => { obj.transition = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        timeRegex = (tslib.__runInitializers(this, _instanceExtraInitializers), /^(\d+(?:\.\d+)?)(ms|s)?$/i);
        //List of attached objects
        attachedObjects = [];
        _states;
        values;
        /**
         * @description Creates an instance of StatefulReifier.
         * @param {StatefulReifectProperties<State, ClassType>} properties - The configuration properties.
         */
        constructor(properties) {
            //Initializing enabled state
            this.enable({
                global: true, properties: true, classes: true, styles: true,
                replaceWith: true, transition: true
            });
            this.properties = properties.properties || {};
            this.classes = properties.classes || {};
            this.styles = properties.styles || {};
            this.replaceWith = properties.replaceWith || {};
            this.transition = properties.transition ?? "all 0s linear 0s";
            if (properties.transitionProperties)
                this.transitionProperties = properties.transitionProperties;
            if (properties.transitionDuration !== undefined)
                this.transitionDuration = properties.transitionDuration;
            if (properties.transitionTimingFunction)
                this.transitionTimingFunction = properties.transitionTimingFunction;
            if (properties.transitionDelay !== undefined)
                this.transitionDelay = properties.transitionDelay;
            //Disable transition if undefined
            if (!properties.transition && !properties.transitionProperties && !properties.transitionDuration
                && !properties.transitionTimingFunction && !properties.transitionDelay)
                this.transitionEnabled = false;
            if (properties.states)
                this.states = properties.states;
            if (properties.attachedObjects)
                this.attachAll(...properties.attachedObjects);
        }
        /*
         *
         * *********************************
         *
         * Attached objects management
         *
         * *********************************
         *
         */
        /**
         * @function attach
         * @description Attaches an object to the reifier.
         * @param {ClassType} object - The object to attach.
         * @param {(state: State, index: number, total: number, object: ClassType) => void} [onSwitch] - Optional
         * callback fired when the reifier is applied to the object. The callback takes as parameters:
         * - `state: State`: The state being applied to the object.
         * - `index: number`: the index of the object in the applied list.
         * - `total: number`: the total number of objects in the applied list.
         * - `object: ClassType`: the object itself.
         * @param {number} [index] - Optional index to specify the position at which to insert the object in the reifier's
         * attached list.
         * @returns {this} - The reifier itself, for method chaining.
         */
        attach(object, onSwitch, index) {
            const data = this.getData(object);
            if (data && onSwitch)
                data.onSwitch = onSwitch;
            if (data)
                return;
            this.attachObject(object, index, onSwitch);
            return this;
        }
        /**
         * @function attachAll
         * @description Attaches multiple objects to the reifier.
         * @param {...ClassType[]} objects - The objects to attach.
         * @returns {this} - The reifier itself, for method chaining.
         */
        attachAll(...objects) {
            objects.forEach(object => {
                if (this.getData(object))
                    return;
                this.attachObject(object);
            });
            return this;
        }
        /**
         * @function attachAllAt
         * @description Attaches multiple objects to the reifier at a specified index.
         * @param {number} index - The index to specify the position at which to insert the objects in the reifier's
         * attached list.
         * @param {...ClassType[]} objects - The objects to attach.
         * @returns {this} - The reifier itself, for method chaining.
         */
        attachAllAt(index, ...objects) {
            objects.forEach((object, count) => {
                if (this.getData(object))
                    return;
                this.attachObject(object, index + count);
            });
            return this;
        }
        /**
         * @function detach
         * @description Detaches one or more objects from the reifier.
         * @param {...ClassType[]} objects - The objects to detach.
         * @returns {this} - The reifier itself, for method chaining.
         */
        detach(...objects) {
            objects.forEach(object => {
                const data = this.getData(object);
                if (!data)
                    return;
                this.detachObject(data);
            });
            return this;
        }
        /**
         * @protected
         * @function attachObject
         * @description Function used to generate a data entry for the given object, and add it to the attached list at
         * the provided index (if any).
         * @param {ClassType} object - The object to attach
         * @param {number} [index] - Optional index to specify the position at which to insert the object in the reifier's
         * attached list.
         * @param {(state: State, index: number, total: number, object: ClassType) => void} [onSwitch] - Optional
         * callback fired when the reifier is applied to the object. The callback takes as parameters:
         * - `state: State`: The state being applied to the object.
         * - `index: number`: the index of the object in the applied list.
         * - `total: number`: the total number of objects in the applied list.
         * - `object: ClassType`: the object itself.
         * @returns {ReifectObjectData<State, ClassType>} - The created data entry.
         */
        attachObject(object, index, onSwitch) {
            if (index == undefined || isNaN(index))
                index = this.attachedObjects.length;
            if (index < 0)
                index = 0;
            const data = this.generateNewData(object, onSwitch);
            this.attachedObjects.splice(index, 0, data);
            $(object).reifects?.attach(this);
            data.lastState = this.stateOf(object);
            this.applyResolvedValues(data, false, true);
            // this.applyTransition(data);
            return data;
        }
        /**
         * @protected
         * @function detachObject
         * @description Function used to remove a data entry from the attached objects list.
         * @param {ReifectObjectData<State, ClassType>} data - The data entry to remove.
         */
        detachObject(data) {
            this.attachedObjects.splice(this.attachedObjects.indexOf(data), 1);
        }
        /**
         * @function getData
         * @description Retrieve the data entry of a given object.
         * @param {ClassType} object - The object to find the data of.
         * @returns {ReifectObjectData<State, ClassType>} - The corresponding data, or `null` if was not found.
         */
        getData(object) {
            if (!object)
                return null;
            for (const entry of this.attachedObjects) {
                const entryObject = this.getObject(entry);
                if (entryObject && entryObject == object)
                    return entry;
            }
            return null;
        }
        /**
         * @function getObject
         * @description Retrieves the object attached to the given data entry.
         * @param {ReifectObjectData<State, ClassType>} data - The data entry to get the corresponding object of.
         * @returns {ClassType} The corresponding object, or `null` if was garbage collected.
         */
        getObject(data) {
            if (!data)
                return null;
            const object = data.object.deref();
            return object || null;
        }
        /*
         *
         * *********************************
         *
         * States stuff
         *
         * *********************************
         *
         */
        /**
         * @description All possible states.
         */
        get states() {
            return this._states;
        }
        set states(value) {
            if (!value)
                this._states = this.getAllStates();
            else
                this._states = value;
        }
        /**
         * @function stateOf
         * @description Determine the current state of the reifect on the provided object.
         * @param {ClassType} object - The object to determine the state for.
         * @returns {State | undefined} - The current state of the reifect or undefined if not determinable.
         */
        stateOf(object) {
            if (!object)
                return undefined;
            const data = this.getData(object);
            if (!data)
                return undefined;
            if (data.lastState)
                return data.lastState;
            if (!(object instanceof HTMLElement))
                return this.states[0];
            if (!data.resolvedValues)
                this.processRawProperties(data);
            for (const state of this.states) {
                if (!data.resolvedValues?.styles?.[state])
                    continue;
                let matches = true;
                for (const [property, value] of Object.entries(data.resolvedValues.styles[state])) {
                    if (object.style[property] != value) {
                        matches = false;
                        break;
                    }
                }
                if (!matches)
                    continue;
                data.lastState = state;
                return state;
            }
            return this.states[0];
        }
        getAllStates() {
            const states = [...this.states];
            for (const values of [this.properties,
                this.classes, this.styles, this.replaceWith]) {
                if (typeof values != "object")
                    continue;
                for (const state of Object.keys(values)) {
                    if (!states.includes(state))
                        states.push(state);
                }
            }
            if (states.length == 0)
                console.warn("No states found for this particular reifect:", this);
            return states;
        }
        /**
         * @protected
         * @function parseState
         * @description Parses a boolean into the corresponding state value.
         * @param {State | boolean} value - The value to parse.
         * @returns {State} The parsed value, or `null` if the boolean could not be parsed.
         */
        parseState(value) {
            if (typeof value != "boolean")
                return this.states.includes(value) ? value : this.states[0];
            else
                for (const str of value ? ["true", "on", "in", "enabled", "shown"]
                    : ["false", "off", "out", "disabled", "hidden"]) {
                    if (!this.states.includes(str))
                        continue;
                    return str;
                }
            return this.states[0];
        }
        /*
         *
         * *********************************
         *
         * Enabled stuff
         *
         * *********************************
         *
         */
        set enabled(value) {
            this.refreshResolvedValues();
        }
        set propertiesEnabled(value) {
            this.refreshProperties();
        }
        set stylesEnabled(value) {
            this.refreshStyles();
        }
        set classesEnabled(value) {
            this.refreshClasses();
        }
        set replaceWithEnabled(value) {
            this.refreshReplaceWith();
        }
        set transitionEnabled(value) {
            this.refreshTransition();
        }
        /**
         * @function enable
         * @description Sets/updates the `enabled` value corresponding to the provided object for this reifier.
         * @param {ClassType} object - The object to set the state of.
         * @param {boolean | ReifectEnabledObject} value - The value to set/update with. Setting it to a boolean will
         * accordingly update the value of `enabled.global`.
         */
        enable(value, object) {
            if (typeof value === "boolean")
                this.enabled = value;
            else if (!value)
                return;
            else
                Object.entries(value).forEach(([key, value]) => {
                    if (key == "global")
                        this.enabled = value;
                    else
                        this[key + "Enabled"] = value;
                });
        }
        enableObject(object, value) {
            const data = this.getData(object);
            if (!data)
                return;
            if (typeof value == "boolean")
                data.enabled.global = value;
            else if (!value)
                return;
            else
                Object.entries(value).forEach(([key, value]) => data.enabled[key] = value);
        }
        /**
         * @function getObjectEnabledState
         * @description Returns the `enabled` value corresponding to the provided object for this reifier.
         * @param {ClassType} object - The object to get the state of.
         * @returns {ReifectEnabledObject} - The corresponding enabled state.
         */
        getObjectEnabledState(object) {
            return this.getData(object)?.enabled;
        }
        /*
         *
         * *********************************
         *
         * Properties stuff
         *
         * *********************************
         *
         */
        /**
         * @description The properties to be assigned to the objects. It could take:
         * - A record of `{key: value}` pairs.
         * - A record of `{state: {key: value} pairs or an interpolation function that would return a record of
         * {key: value} pairs}`.
         * - An interpolation function that would return a record of `{key: value}` pairs based on the state value.
         *
         * The interpolation function would take as arguments:
         * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
         * defined for the whole field (and not for a specific state).
         * - `index: number`: the index of the object in the applied list.
         * - `total: number`: the total number of objects in the applied list.
         * - `object: ClassType`: the object itself.
         */
        set properties(value) {
        }
        /**
         * @description The styles to be assigned to the objects (only if they are eligible elements). It could take:
         * - A record of `{CSS property: value}` pairs.
         * - A record of `{state: {CSS property: value} pairs or an interpolation function that would return a record of
         * {key: value} pairs}`.
         * - An interpolation function that would return a record of `{key: value}` pairs based on the state value.
         *
         * The interpolation function would take as arguments:
         * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
         * defined for the whole field (and not for a specific state).
         * - `index: number`: the index of the object in the applied list.
         * - `total: number`: the total number of objects in the applied list.
         * - `object: ClassType`: the object itself.
         */
        set styles(value) {
        }
        /**
         * @description The classes to be assigned to the objects (only if they are eligible elements). It could take:
         * - A string of space-separated classes.
         * - An array of classes.
         * - A record of `{state: space-separated class string, array of classes, or an interpolation function that would
         * return any of the latter}`.
         * - An interpolation function that would return a string of space-separated classes or an array of classes based
         * on the state value.
         *
         * The interpolation function would take as arguments:
         * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
         * defined for the whole field (and not for a specific state).
         * - `index: number`: the index of the object in the applied list.
         * - `total: number`: the total number of objects in the applied list.
         * - `object: ClassType`: the object itself.
         */
        set classes(value) {
        }
        /**
         * @description The object that should replace (in the DOM as well if eligible) the attached objects. It could take:
         * - The object to be replaced with.
         * - A record of `{state: object to be replaced with, or an interpolation function that would return an object
         * to be replaced with}`.
         * - An interpolation function that would return the object to be replaced with based on the state value.
         *
         * The interpolation function would take as arguments:
         * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
         * defined for the whole field (and not for a specific state).
         * - `index: number`: the index of the object in the applied list.
         * - `total: number`: the total number of objects in the applied list.
         * - `object: ClassType`: the object itself.
         */
        set replaceWith(value) {
        }
        /**
         * @description The property(ies) to apply a CSS transition on, on the attached objects. Defaults to "all". It
         * could take:
         * - A string of space-separated CSS properties.
         * - An array of CSS properties.
         * - A record of `{state: space-separated CSS properties string, array of CSS properties, or an interpolation
         * function that would return any of the latter}`.
         * - An interpolation function that would return a string of space-separated CSS properties or an array of
         * CSS properties based on the state value.
         *
         * The interpolation function would take as arguments:
         * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
         * defined for the whole field (and not for a specific state).
         * - `index: number`: the index of the object in the applied list.
         * - `total: number`: the total number of objects in the applied list.
         * - `object: ClassType`: the object itself.
         */
        set transitionProperties(value) {
        }
        /**
         * @description The duration of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
         * - A numerical value (in seconds).
         * - A record of `{state: duration (number in seconds) or an interpolation function that would return a duration
         * (number in seconds)}`.
         * - An interpolation function that would return a duration (number in seconds) based on the state value.
         *
         * The interpolation function would take as arguments:
         * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
         * defined for the whole field (and not for a specific state).
         * - `index: number`: the index of the object in the applied list.
         * - `total: number`: the total number of objects in the applied list.
         * - `object: ClassType`: the object itself.
         */
        set transitionDuration(value) {
        }
        /**
         * @description The timing function of the CSS transition to apply on the attached objects. Defaults to "linear."
         * It could take:
         * - A string representing the timing function to apply.
         * - A record of `{state: timing function (string) or an interpolation function that would return a timing
         * function (string)}`.
         * - An interpolation function that would return a timing function (string) based on the state value.
         *
         * The interpolation function would take as arguments:
         * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
         * defined for the whole field (and not for a specific state).
         * - `index: number`: the index of the object in the applied list.
         * - `total: number`: the total number of objects in the applied list.
         * - `object: ClassType`: the object itself.
         */
        set transitionTimingFunction(value) {
        }
        /**
         * @description The delay of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
         * - A numerical value (in seconds).
         * - A record of `{state: delay (number in seconds) or an interpolation function that would return a delay
         * (number in seconds)}`.
         * - An interpolation function that would return a delay (number in seconds) based on the state value.
         *
         * The interpolation function would take as arguments:
         * - `state: State`: the state being applied to the object(s). Only passed to the callback function if it is
         * defined for the whole field (and not for a specific state).
         * - `index: number`: the index of the object in the applied list.
         * - `total: number`: the total number of objects in the applied list.
         * - `object: ClassType`: the object itself.
         */
        set transitionDelay(value) {
        }
        set transition(value) {
            if (!value)
                return;
            const object = typeof value === "string"
                ? this.processTransitionString(value)
                : this.processTransitionObject(value);
            if (object.transitionProperties !== undefined)
                this.transitionProperties = object.transitionProperties;
            if (object.transitionDuration !== undefined)
                this.transitionDuration = object.transitionDuration;
            if (object.transitionDelay !== undefined)
                this.transitionDelay = object.transitionDelay;
            if (object.transitionTimingFunction !== undefined)
                this.transitionTimingFunction = object.transitionTimingFunction;
        }
        processTransitionObject(transitionObject) {
            const transitionValues = {};
            for (const [state, entry] of Object.entries(transitionObject)) {
                if (!this.states.includes(state))
                    continue;
                if (typeof entry !== "string")
                    continue;
                const object = this.processTransitionString(entry);
                if (object.transitionProperties !== undefined)
                    transitionValues.transitionProperties[state] = object.transitionProperties;
                if (object.transitionDuration !== undefined)
                    transitionValues.transitionDuration[state] = object.transitionDuration;
                if (object.transitionDelay !== undefined)
                    transitionValues.transitionDelay[state] = object.transitionDelay;
                if (object.transitionTimingFunction !== undefined)
                    transitionValues.transitionTimingFunction[state] = object.transitionTimingFunction;
            }
            return transitionValues;
        }
        processTransitionString(transitionString) {
            // Normalize commas → spaces, split & filter
            const tokens = transitionString.trim().replace(/,/g, " ").split(/\s+/).filter(t => t.length > 0);
            const object = { transitionProperties: [] };
            let i = 0;
            //Properties
            while (i < tokens.length && !this.timeRegex.test(tokens[i])) {
                object.transitionProperties.push(tokens[i]);
                i++;
            }
            //Duration
            if (i < tokens.length) {
                const duration = this.parseTime(tokens[i]);
                if (!isNaN(duration))
                    object.transitionDuration = duration;
                i++;
            }
            //Timing function
            if (i < tokens.length) {
                object.transitionTimingFunction = tokens[i];
                i++;
            }
            //Delay
            if (i < tokens.length) {
                const delay = this.parseTime(tokens[i]);
                if (!isNaN(delay))
                    object.transitionDelay = delay;
                i++;
            }
            return object;
        }
        /**
         * @function getTransitionString
         * @description Gets the CSS transition string for the specified direction.
         * @param {ReifectObjectData<State, ClassType>} data - The target element's transition data entry.
         * @param state
         * @returns {string} The CSS transition string.
         */
        getTransitionString(data, state = data.lastState) {
            let transitionString = "";
            data.resolvedValues.transitionProperties[state].forEach(property => transitionString
                += ", " + property + " " + (data.resolvedValues.transitionDuration[state] || 0) + "s "
                    + (data.resolvedValues.transitionTimingFunction[state] || "linear") + " "
                    + (data.resolvedValues.transitionDelay[state] || 0) + "s");
            return transitionString.substring(2);
        }
        /*
         *
         * *********************************
         *
         * Usage methods
         *
         * *********************************
         *
         */
        initialize(state, objects, options) {
            if (!this.enabled)
                return;
            state = this.parseState(state);
            options = this.initializeOptions(options, objects);
            this.getEnabledObjectsData(objects, options).forEach(data => {
                if (options.recomputeProperties || !data.resolvedValues)
                    this.processRawProperties(data, options.propertiesOverride);
                data.lastState = state;
                this.applyResolvedValues(data, true, options?.applyStylesInstantly);
                if (data.onSwitch)
                    data.onSwitch(state, data.objectIndex, data.totalObjectCount, this.getObject(data));
            });
        }
        apply(state, objects, options) {
            if (!this.enabled)
                return;
            state = this.parseState(state);
            options = this.initializeOptions(options, objects);
            this.getEnabledObjectsData(objects, options).forEach(data => {
                if (options.recomputeProperties || !data.resolvedValues)
                    this.processRawProperties(data, options.propertiesOverride);
                data.lastState = state;
                this.applyResolvedValues(data, false, options?.applyStylesInstantly);
                if (data.onSwitch)
                    data.onSwitch(state, data.objectIndex, data.totalObjectCount, this.getObject(data));
            });
        }
        toggle(objects, options) {
            if (!this.enabled)
                return;
            if (!objects)
                objects = [];
            else if (objects instanceof HTMLCollection)
                objects = [...objects];
            else if (!Array.isArray(objects))
                objects = [objects];
            const previousState = this.getData(objects[0])?.lastState;
            const nextStateIndex = mod(!previousState ? 0 : this.states.indexOf(previousState) + 1, this.states.length);
            this.apply(this.states[nextStateIndex], objects, options);
        }
        /**
         * @function reloadFor
         * @description Generates the transition CSS string for the provided transition with the correct interpolation
         * information.
         * @param {ClassType} object - The element to apply the string to.
         * @returns {this} Itself for method chaining.
         */
        reloadFor(object) {
            if (!this.enabled)
                return this;
            const data = this.getData(object);
            if (!data || !data.enabled || !data.enabled.global)
                return this;
            this.applyResolvedValues(data);
            return this;
        }
        reloadTransitionFor(object) {
            if (!this.enabled || !this.transitionEnabled)
                return this;
            const data = this.getData(object);
            if (!data || !data.enabled || !data.enabled.global || !data.enabled.transition)
                return this;
            this.applyTransition(data, data.lastState);
            return this;
        }
        getEnabledObjectsData(objects, options) {
            if (!this.enabled) {
                console.warn("The reifier object you are trying to access is disabled.");
                return [];
            }
            if (!objects)
                objects = [];
            else if (objects instanceof HTMLCollection)
                objects = [...objects];
            else if (!Array.isArray(objects))
                objects = [objects];
            options = this.initializeOptions(options, objects);
            if (options.attachObjects)
                objects.forEach(element => this.attach(element));
            if (options.executeForAll) {
                objects = [];
                this.attachedObjects.forEach(entry => {
                    const object = entry.object.deref();
                    if (object)
                        objects.push(object);
                });
            }
            const enabledObjectsData = [];
            objects.forEach((object) => {
                const data = this.getData(object) || this.generateNewData(object);
                if (!this.filterEnabledObjects(data))
                    return;
                if (options.recomputeIndices || data.objectIndex == undefined)
                    data.objectIndex = enabledObjectsData.length;
                enabledObjectsData.push(data);
            });
            enabledObjectsData.forEach(data => {
                if (options.recomputeIndices || data.totalObjectCount == undefined) {
                    data.totalObjectCount = enabledObjectsData.length;
                }
            });
            return enabledObjectsData;
        }
        /*
         *
         * *********************************
         *
         * Property setting stuff
         *
         * *********************************
         *
         */
        applyResolvedValues(data, skipTransition = false, applyStylesInstantly = false) {
            this.applyStyles(data, data.lastState, applyStylesInstantly);
            if (!skipTransition) {
                const handler = $(data.object.deref()).reifects;
                if (this.attachedObjects.includes(data) && handler)
                    handler.reloadTransitions();
                else
                    this.applyTransition(data, data.lastState);
            }
            this.applyReplaceWith(data, data.lastState);
            this.applyProperties(data, data.lastState);
            this.applyClasses(data, data.lastState);
        }
        refreshResolvedValues() {
            this.refreshProperties();
            this.refreshStyles();
            this.refreshClasses();
            this.refreshReplaceWith();
            this.refreshTransition();
        }
        applyProperties(data, state = data.lastState) {
            if (!this.enabled || !this.propertiesEnabled)
                return;
            if (!data.enabled.global || !data.enabled.properties)
                return;
            const properties = data.resolvedValues?.properties?.[state];
            if (!properties)
                return;
            const object = data.object.deref();
            if (!object)
                return;
            for (const [field, value] of Object.entries(properties)) {
                if (!field || value == undefined)
                    continue;
                try {
                    object[field] = value;
                }
                catch (e) {
                    console.error(`Unable to set property ${field} to ${value}: ${e.message}`);
                }
            }
        }
        refreshProperties() {
            if (!this.enabled || !this.propertiesEnabled)
                return;
            this.attachedObjects.forEach(data => this.applyProperties(data));
        }
        applyReplaceWith(data, state = data.lastState) {
            if (!this.enabled || !this.replaceWithEnabled)
                return;
            if (!data.enabled.global || !data.enabled.replaceWith)
                return;
            const newObject = data.resolvedValues?.replaceWith?.[state];
            if (!newObject)
                return;
            try {
                const object = data.object.deref();
                if (object && object instanceof Node && newObject instanceof Node)
                    object.parentNode?.replaceChild(newObject, object);
                data.object = new WeakRef(newObject);
            }
            catch (e) {
                console.error(`Unable to replace object: ${e.message}`);
            }
        }
        refreshReplaceWith() {
            if (!this.enabled || !this.replaceWithEnabled)
                return;
            this.attachedObjects.forEach(data => this.applyReplaceWith(data));
        }
        applyClasses(data, state = data.lastState) {
            if (!this.enabled || !this.classesEnabled)
                return;
            if (!data.enabled.global || !data.enabled.classes)
                return;
            const classes = data.resolvedValues?.classes;
            if (!classes)
                return;
            const object = data.object.deref();
            if (!object || !(object instanceof Element))
                return;
            for (const [key, value] of Object.entries(classes)) {
                $(object).toggleClass(value, state == key);
            }
        }
        refreshClasses() {
            if (!this.enabled || !this.classesEnabled)
                return;
            this.attachedObjects.forEach(data => this.applyClasses(data));
        }
        applyStyles(data, state = data.lastState, applyStylesInstantly = false) {
            if (!this.enabled || !this.stylesEnabled)
                return;
            if (!data.enabled.global || !data.enabled.styles)
                return;
            if (!data.resolvedValues?.styles)
                return;
            const object = data.object.deref();
            if (!object || !(object instanceof Element))
                return;
            $(object).setStyles(data.resolvedValues.styles[state], applyStylesInstantly);
        }
        refreshStyles() {
            if (!this.enabled || !this.stylesEnabled)
                return;
            this.attachedObjects.forEach(data => this.applyStyles(data));
        }
        applyTransition(data, state = data.lastState) {
            if (!this.enabled || !this.transitionEnabled)
                return;
            if (!data.enabled.global || !data.enabled.transition)
                return;
            const object = data.object.deref();
            if (!object || !(object instanceof Element) || !data.resolvedValues)
                return;
            $(object).appendStyle("transition", this.getTransitionString(data, state), ", ", true);
        }
        refreshTransition() {
            for (const data of this.attachedObjects) {
                const handler = $(data.object?.deref()).reifects;
                if (handler)
                    handler.reloadTransitions();
            }
        }
        //General methods (to be overridden for custom functionalities)
        filterEnabledObjects(data) {
            if (!data.enabled || !data.enabled.global) {
                console.warn("The reified properties instance you are trying to set on an object is " +
                    "disabled for this particular object.");
                return false;
            }
            return true;
        }
        //Utilities
        processRawProperties(data, override) {
            if (!data.resolvedValues)
                data.resolvedValues = {
                    properties: undefined,
                    styles: undefined,
                    classes: undefined,
                    replaceWith: undefined,
                    transitionProperties: undefined,
                    transitionDuration: undefined,
                    transitionTimingFunction: undefined,
                    transitionDelay: undefined
                };
            if (isNull(override))
                return;
            const rawProperties = {
                properties: this.properties,
                styles: this.styles,
                classes: this.classes,
                replaceWith: this.replaceWith,
                transitionProperties: this.transitionProperties,
                transitionDuration: this.transitionDuration,
                transitionTimingFunction: this.transitionTimingFunction,
                transitionDelay: this.transitionDelay,
                ...(override || {})
            };
            data.resolvedValues.properties = {};
            this.states.forEach(state => this.processRawPropertyForState(data, "properties", rawProperties.properties, state));
            if ("transitionProperties" in rawProperties) {
                data.resolvedValues.transitionProperties = {};
                this.states.forEach(state => this.processRawPropertyForState(data, "transitionProperties", rawProperties.transitionProperties, state));
            }
            for (const [field, values] of Object.entries(rawProperties)) {
                if (field == "transitionProperties" || field == "properties")
                    continue;
                data.resolvedValues[field] = {};
                this.states.forEach(state => this.processRawPropertyForState(data, field, values, state));
            }
        }
        generateNewData(object, onSwitch) {
            return {
                object: new WeakRef(object),
                enabled: { global: true, properties: true, classes: true, styles: true, replaceWith: true, transition: true },
                lastState: this.stateOf(object),
                onSwitch: onSwitch
            };
        }
        initializeOptions(options, objects) {
            if (!objects)
                objects = [];
            else if (objects instanceof HTMLCollection)
                objects = [...objects];
            else if (!Array.isArray(objects))
                objects = [objects];
            options = options || {};
            options.attachObjects = options.attachObjects ?? true;
            options.executeForAll = options.executeForAll ?? (objects.length === 0);
            options.recomputeIndices = options.recomputeIndices ?? (objects.length !== 0);
            options.recomputeProperties = options.recomputeProperties ?? (objects.length !== 0);
            return options;
        }
        /**
         * @description Clone the reifect to create a new copy with the same properties but no attached objects.
         * @returns {StatefulReifect<State, ClassType>} - The new reifect.
         */
        clone() {
            return new StatefulReifect({
                states: this.states,
                properties: this.properties,
                classes: this.classes,
                styles: this.styles,
                replaceWith: this.replaceWith,
                transitionProperties: this.transitionProperties,
                transitionDuration: this.transitionDuration,
                transitionTimingFunction: this.transitionTimingFunction,
                transitionDelay: this.transitionDelay,
            });
        }
        processRawPropertyForState(data, field, value, state) {
            let resolvedValue;
            const object = data.object.deref();
            if (!object)
                return;
            if (typeof value == "function") {
                resolvedValue = value(state, data.objectIndex, data.totalObjectCount, object);
            }
            else if (typeof value == "object" && eachEqualToAny(this.states, ...Object.keys(value))) {
                const currentValue = value[state];
                if (typeof currentValue == "function")
                    resolvedValue = currentValue(data.objectIndex, data.totalObjectCount, object);
                else
                    resolvedValue = currentValue;
            }
            else
                resolvedValue = value;
            if ((field == "properties" || field == "transitionProperties") && typeof resolvedValue == "string") {
                resolvedValue = resolvedValue.split(" ");
            }
            else if (field == "styles") {
                if (data.resolvedValues.styles[state] == undefined)
                    data.resolvedValues.styles[state] = {};
                if (typeof resolvedValue == "number") {
                    data.resolvedValues.transitionProperties[state].forEach(property => data.resolvedValues.styles[state][property] = resolvedValue);
                    return;
                }
                else if (typeof resolvedValue == "string") {
                    const splitStyles = resolvedValue.split(";")
                        .map(entry => entry.split(":")
                        .map(part => part.trim()));
                    if (splitStyles.length == 1 && splitStyles[0].length == 1) {
                        data.resolvedValues.transitionProperties[state].forEach(property => data.resolvedValues.styles[state][property] = splitStyles[0][0]);
                        return;
                    }
                }
            }
            data.resolvedValues[field][state] = resolvedValue;
        }
        /**
         * @description Processes string durations like "200ms" or "0.3s", or even "100".
         * @param value
         * @private
         */
        parseTime(value) {
            const matches = value.match(this.timeRegex);
            if (!matches)
                return NaN;
            const num = parseFloat(matches[1]);
            const unit = matches[2]?.toLowerCase() ?? "s";
            return unit === "ms" ? num / 1000 : num;
        }
    };
})();
function statefulReifier(properties) {
    return new StatefulReifect(properties);
}

exports.Direction = void 0;
(function (Direction) {
    Direction["vertical"] = "vertical";
    Direction["horizontal"] = "horizontal";
})(exports.Direction || (exports.Direction = {}));
exports.SideH = void 0;
(function (SideH) {
    SideH["left"] = "left";
    SideH["right"] = "right";
})(exports.SideH || (exports.SideH = {}));
exports.SideV = void 0;
(function (SideV) {
    SideV["top"] = "top";
    SideV["bottom"] = "bottom";
})(exports.SideV || (exports.SideV = {}));
exports.Side = void 0;
(function (Side) {
    Side["top"] = "top";
    Side["bottom"] = "bottom";
    Side["left"] = "left";
    Side["right"] = "right";
})(exports.Side || (exports.Side = {}));
exports.InOut = void 0;
(function (InOut) {
    InOut["in"] = "in";
    InOut["out"] = "out";
})(exports.InOut || (exports.InOut = {}));
exports.OnOff = void 0;
(function (OnOff) {
    OnOff["on"] = "on";
    OnOff["off"] = "off";
})(exports.OnOff || (exports.OnOff = {}));
exports.Open = void 0;
(function (Open) {
    Open["open"] = "open";
    Open["closed"] = "closed";
})(exports.Open || (exports.Open = {}));
exports.Shown = void 0;
(function (Shown) {
    Shown["visible"] = "visible";
    Shown["hidden"] = "hidden";
})(exports.Shown || (exports.Shown = {}));
exports.AccessLevel = void 0;
(function (AccessLevel) {
    AccessLevel["public"] = "public";
    AccessLevel["protected"] = "protected";
    AccessLevel["private"] = "private";
})(exports.AccessLevel || (exports.AccessLevel = {}));
exports.Range = void 0;
(function (Range) {
    Range["min"] = "min";
    Range["max"] = "max";
})(exports.Range || (exports.Range = {}));

/**
 * @class ReifectHandler
 * @description A class to handle reifects for an attached element.
 * @template {object = Node} ClassType
 */
class ReifectHandler {
    attachedNode;
    reifects;
    _enabled;
    /**
     * @constructor
     * @param {Node} attachedNode - The element to attach transitions to.
     */
    constructor(attachedNode) {
        this.attachedNode = attachedNode;
        this.reifects = [];
        this._enabled = {};
        this.enabled = true;
    }
    //Set management
    /**
     * @function attach
     * @description Attach one or more transitions to the element.
     * @param {StatefulReifect<any, ClassType>[]} reifects - The transition(s) to attach.
     * @returns {this} The element's TransitionHandler instance.
     */
    attach(...reifects) {
        reifects.forEach(entry => {
            if (this.reifects.some(ref => ref.deref() == entry))
                return;
            this.reifects.push(new WeakRef(entry));
            entry.attach(this.attachedNode);
        });
        return this;
    }
    /**
     * @function detach
     * @description Detach one or more transitions from the element.
     * @param {StatefulReifect<any, ClassType>[]} reifects - The transition(s) to detach.
     * @returns {this} The element's TransitionHandler instance.
     */
    detach(...reifects) {
        reifects.forEach(entry => {
            const attachedEntry = this.reifects.find(ref => ref.deref() == entry);
            if (!attachedEntry)
                return;
            this.reifects.splice(this.reifects.indexOf(attachedEntry), 1);
            entry.detach(this.attachedNode);
        });
        return this;
    }
    //Transition methods
    /**
     * @function initialize
     * @description Initializes the element to the corresponding transition direction and styles.
     * @param {StatefulReifect<State, ClassType>} reifect - The transition to initialize.
     * @param {InOut} direction - The direction of the transition.
     * @param {ReifectAppliedOptions<State, ClassType>} [options] - Optional styles to override the defaults. Set to
     * `null` to not set any styles on the element.
     * @returns {this} The element's TransitionHandler instance.
     * @template {string | symbol | number} State
     * @template {object} ClassType
     */
    initialize(reifect, direction, options) {
        reifect.initialize(direction, this.attachedNode, options);
        return this;
    }
    /**
     * @function initialize
     * @description Initializes the element to the corresponding transition direction and styles.
     * @param {StatefulReifect<State, ClassType>} reifect - The transition to initialize.
     * @param {InOut} direction - The direction of the transition.
     * @param {ReifectAppliedOptions<State, ClassType>} [options] - Optional styles to override the defaults. Set to `null` to
     * not set any styles on the element.
     * @returns {this} The element's TransitionHandler instance.
     * @template {string | symbol | number} State
     * @template {object} ClassType
     */
    apply(reifect, direction, options) {
        reifect.apply(direction, this.attachedNode, options);
        return this;
    }
    /**
     * @function initialize
     * @description Initializes the element to the corresponding transition direction and styles.
     * @param {StatefulReifect<State, ClassType>} reifect - The transition to initialize.
     * @param {ReifectAppliedOptions<State, ClassType>} [options] - Optional styles to override the defaults. Set to
     * `null` to not set any styles on the element.
     * @returns {this} The element's TransitionHandler instance.
     * @template {string | symbol | number} State
     * @template {object} ClassType
     */
    toggle(reifect, options) {
        reifect.toggle(this.attachedNode, options);
        return this;
    }
    /**
     * @private
     * @function clear
     * @description Clears the set transition styles on the element.
     */
    clear() {
        if (!(this.attachedNode instanceof Node))
            return;
        $(this.attachedNode).setStyle("transition", "", true);
    }
    /**
     * @function reload
     * @description Reloads all transitions attached to the element. Doesn't recompute styles.
     */
    reload() {
        this.clear();
        this.reifects.forEach(reifect => reifect.deref()?.reloadFor(this.attachedNode));
    }
    /**
     * @function reload
     * @description Reloads all transitions attached to the element. Doesn't recompute styles.
     */
    reloadTransitions() {
        this.clear();
        this.reifects.forEach(reifect => reifect.deref()?.reloadTransitionFor(this.attachedNode));
    }
    //State management
    /**
     * @description The enabled state of the reifect (as a {@link ReifectEnabledObject}). Setting it to a boolean will
     * accordingly update the value of `enabled.global`.
     */
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        if (typeof value == "boolean")
            this._enabled.global = value;
        else if (!value)
            return;
        else
            for (const [key, state] of Object.entries(value))
                this._enabled[key] = state;
    }
    getReifectEnabledState(reifect) {
        return reifect.getObjectEnabledState(this.attachedNode);
    }
    enableReifect(reifect, value) {
        reifect.enableObject(this.attachedNode, value);
    }
}

class ReifectFunctionsUtils {
    dataMap = new WeakMap;
    data(element) {
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return {};
        if (!this.dataMap.has(element))
            this.dataMap.set(element, {});
        return this.dataMap.get(element);
    }
}

const utils$2 = new ReifectFunctionsUtils();
const showTransition = new StatefulReifect({
    states: [exports.Shown.visible, exports.Shown.hidden],
    styles: (state) => `visibility: ${state}`
});
function setupReifectFunctions() {
    /**
     * @description Adds a readonly "reifects" property to Node prototype.
     */
    Object.defineProperty(TurboSelector.prototype, "reifects", {
        get: function () {
            if (!this.element)
                return;
            const data = utils$2.data(this.element);
            if (!data.reifects)
                data.reifects = new ReifectHandler(this);
            return data.reifects;
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Adds a configurable "showTransition" property to Node prototype. Defaults to a global
     * transition assigned to all nodes.
     */
    Object.defineProperty(TurboSelector.prototype, "showTransition", {
        get: function () {
            if (!this.element)
                return;
            const data = utils$2.data(this.element);
            if (!data.showTransition)
                data.showTransition = showTransition;
            return data.showTransition;
        },
        set: function (value) {
            if (!this.element)
                return;
            utils$2.data(this.element).showTransition = value;
        },
        configurable: true,
        enumerable: true
    });
    /**
     * @description Boolean indicating whether the node is shown or not, based on its showTransition.
     */
    Object.defineProperty(TurboSelector.prototype, "isShown", {
        get: function () {
            if (!this.element)
                return;
            const state = this.showTransition.stateOf(this);
            if (state == exports.Shown.visible)
                return true;
            else if (state == exports.Shown.hidden)
                return false;
            return this.element.style.display != "none" && this.element.style.visibility != "hidden" && this.element.style.opacity != "0";
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Show or hide the element (based on CSS) by transitioning in/out of the element's showTransition.
     * @param {boolean} b - Whether to show the element or not
     * @param {ReifectAppliedOptions<Shown>} [options={executeForAll: false}] - The options to pass to the reifect
     * execution.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.show = function _show(b, options = { executeForAll: false }) {
        if (!this.element)
            return;
        this.showTransition.apply(b ? exports.Shown.visible : exports.Shown.hidden, this.element, options);
        return this;
    };
}

const cache$1 = new WeakMap();
function turbo(tagOrElement) {
    turbofy();
    let el;
    if (!tagOrElement)
        tagOrElement = "div";
    if (typeof tagOrElement === "string")
        el = element({ tag: tagOrElement });
    else if (typeof tagOrElement === "object") {
        if (tagOrElement instanceof TurboSelector)
            return tagOrElement;
        if (tagOrElement instanceof Node)
            el = tagOrElement;
        else if (tagOrElement["element"] && typeof tagOrElement["element"] === "object")
            el = tagOrElement["element"];
        else
            el = tagOrElement;
    }
    const cached = cache$1.get(el);
    if (cached)
        return cached;
    const turboSelector = new TurboSelector();
    turboSelector.element = el;
    cache$1.set(el, turboSelector);
    return turboSelector;
}
function tu(tagOrElement) {
    return turbo(tagOrElement);
}
function t(tagOrElement) {
    return turbo(tagOrElement);
}
function $(tagOrElement) {
    return turbo(tagOrElement);
}
const turbofy = callOnce(function (options = {}) {
    if (!options.excludeHierarchyFunctions)
        setupHierarchyFunctions();
    if (!options.excludeMiscFunctions)
        setupMiscFunctions();
    if (!options.excludeClassFunctions)
        setupClassFunctions();
    if (!options.excludeElementFunctions)
        setupElementFunctions();
    if (!options.excludeEventFunctions)
        setupEventFunctions();
    if (!options.excludeStyleFunctions)
        setupStyleFunctions();
    if (!options.excludeToolFunctions)
        setupToolFunctions();
    if (!options.excludeSubstrateFunctions)
        setupSubstrateFunctions();
    if (!options.excludeReifectFunctions)
        setupReifectFunctions();
});

/**
 * @internal
 */
function keyFromArgs(args) {
    if (!args || args.length === 0)
        return "__no_args__";
    return JSON.stringify(args.map((v) => {
        if (typeof v === "function")
            return `function:${v.name}`;
        if (v && typeof v === "object") {
            try {
                return JSON.stringify(Object.entries(v).sort());
            }
            catch {
                return "[[unserializable-object]]";
            }
        }
        return v === undefined ? "undefined" : v;
    }));
}
/**
 * @internal
 */
function cacheKeySymbolFor(name) {
    return Symbol(`__cache__${name}`);
}
/**
 * @internal
 */
function initInvalidation(instance, name, isGetterCache, cacheKey, timeouts, options, deleteFn) {
    // onEvent: attach to instance if it’s an EventTarget, else to document
    if (options.onEvent) {
        const target = typeof instance?.addEventListener === "function" ? instance : document;
        const names = Array.isArray(options.onEvent)
            ? options.onEvent
            : String(options.onEvent).split(/\s+/).filter(Boolean);
        for (const evt of names)
            $(target).on(evt, () => deleteFn());
    }
    // onFieldChange: wrap methods / define property setters to invalidate
    if (options.onFieldChange) {
        const list = Array.isArray(options.onFieldChange)
            ? options.onFieldChange
            : [options.onFieldChange];
        for (const fieldOrFn of list) {
            const fieldName = typeof fieldOrFn === "string" ? fieldOrFn : fieldOrFn.name;
            if (!fieldName)
                continue;
            const desc = getFirstDescriptorInChain(instance, fieldName);
            // If it's a method, wrap it (on the instance) to invalidate before/after
            const existing = instance[fieldName];
            if (typeof existing === "function") {
                const originalFn = existing;
                Object.defineProperty(instance, fieldName, {
                    configurable: true,
                    enumerable: desc?.enumerable ?? true,
                    writable: true,
                    value: function (...args) {
                        deleteFn(); // invalidate first
                        return originalFn.apply(this, args);
                    },
                });
            }
            else {
                // Data / accessor property — define an instance-level accessor that invalidates on set
                const getFallback = () => desc?.get ? desc.get.call(instance) : existing;
                const setFallback = (nv) => {
                    if (desc?.set)
                        desc.set.call(instance, nv);
                    else {
                        // define on instance to shadow proto
                        Object.defineProperty(instance, fieldName, {
                            configurable: true,
                            enumerable: true,
                            writable: true,
                            value: nv,
                        });
                    }
                };
                Object.defineProperty(instance, fieldName, {
                    configurable: true,
                    enumerable: desc?.enumerable ?? true,
                    get() {
                        return getFallback();
                    },
                    set(nv) {
                        deleteFn();
                        setFallback(nv);
                    },
                });
            }
        }
    }
    // onCallback (polling) — clears on a "destroy" event if the instance supports it
    if (options.onCallback) {
        const id = setInterval(() => {
            const res = options.onCallback.call(instance);
            if (res instanceof Promise) {
                res.then((v) => deleteFn(Boolean(v)));
            }
            else {
                deleteFn(Boolean(res));
            }
        }, options.onCallbackFrequency ?? 50);
        if (typeof instance?.addEventListener === "function") {
            instance.addEventListener("destroy", () => clearInterval(id), { once: true });
        }
    }
    // convenience time-based deletion helpers are scheduled where we write cache
}

/**
 * @decorator
 * @function cache
 * @description Stage-3 decorator that memorizes expensive reads.
 *
 * **What it does**
 * - **Method**: caches the return value **per unique arguments** (using a stable key from args).
 * - **Getter**: caches the value **once per instance** until invalidated.
 * - **Accessor**: wraps the `get` path like a cached getter; the `set` path invalidates cached value.
 *
 * @param {CacheOptions} [options] - Optional caching configuration to define when to clear it (on event, after
 * timeout, on next frame, on callback, etc.).
 *
 * @example
 * ```ts
 * class IconRenderer {
 *   #value = 0;
 *
 *   // Accessor: cached read; any write invalidates immediately
 *   @cache({clearOnNextFrame: true}) accessor data = {
 *     get: () => this.#value,
 *     set: (v: number) => { this.#value = v; }
 *   };
 *
 *   // Caches per argument list (e.g., same path ⇒ same result until invalidation)
 *   @cache({timeout: 5_000}) async loadSvg(path: string): Promise<string> {
 *     // ...expensive IO
 *     return fetch(path).then(r => r.text());
 *   }
 * }
 * ```
 */
//TODO FIX THEN TEST ON ICON loadSvg
function cache(options = {}) {
    return function (value, context) {
        const { kind, name, static: isStatic } = context;
        const key = name;
        const cacheKey = cacheKeySymbolFor(key);
        const setupKey = Symbol(`__cache__setup__${key}`);
        const timeouts = [];
        const deleteCallback = function (hard = true) {
            if (!hard)
                return;
            const slot = this[cacheKey];
            if (!slot)
                return;
            if (slot instanceof Map)
                slot.clear();
            else
                delete this[cacheKey];
            for (const t of timeouts)
                clearTimeout(t);
            timeouts.length = 0;
        };
        // one-time per-instance setup
        const ensureSetup = function () {
            if (this[setupKey])
                return;
            this[setupKey] = true;
            initInvalidation(this, key, kind === "getter" || kind === "accessor", cacheKey, timeouts, options, deleteCallback.bind(this));
        };
        if (kind === "method") {
            const original = value;
            context.addInitializer(function () {
                if (!this[cacheKey])
                    this[cacheKey] = new Map();
            });
            return function (...args) {
                ensureSetup.call(this);
                const map = this[cacheKey] ?? (this[cacheKey] = new Map());
                const k = keyFromArgs(args);
                if (map.has(k))
                    return map.get(k);
                const result = original.apply(this, args);
                map.set(k, result);
                // timeouts/RAF per-entry:
                if (options.timeout) {
                    const tid = setTimeout(() => map.delete(k), options.timeout);
                    timeouts.push(tid);
                }
                if (options.clearOnNextFrame) {
                    const raf = (typeof requestAnimationFrame === "function"
                        ? requestAnimationFrame
                        : (fn) => setTimeout(fn, 0));
                    raf(() => deleteCallback.call(this));
                }
                return result;
            };
        }
        // ---- GETTER -----------------------------------------------------------
        if (kind === "getter") {
            const originalGet = value;
            return function () {
                ensureSetup.call(this);
                if (this[cacheKey] === undefined) {
                    this[cacheKey] = originalGet.call(this);
                    if (options.timeout) {
                        const tid = setTimeout(() => deleteCallback.call(this), options.timeout);
                        timeouts.push(tid);
                    }
                    if (options.clearOnNextFrame) {
                        const raf = (typeof requestAnimationFrame === "function"
                            ? requestAnimationFrame
                            : (fn) => setTimeout(fn, 0));
                        raf(() => deleteCallback.call(this));
                    }
                }
                return this[cacheKey];
            };
        }
        // ---- ACCESSOR (wrap read path; keep set untouched) --------------------
        if (kind === "accessor") {
            const orig = value;
            return {
                get() {
                    ensureSetup.call(this);
                    if (this[cacheKey] === undefined) {
                        const out = orig.get ? orig.get.call(this) : undefined;
                        this[cacheKey] = out;
                        if (options.timeout) {
                            const tid = setTimeout(() => deleteCallback.call(this), options.timeout);
                            timeouts.push(tid);
                        }
                        if (options.clearOnNextFrame) {
                            const raf = (typeof requestAnimationFrame === "function"
                                ? requestAnimationFrame
                                : (fn) => setTimeout(fn, 0));
                            raf(() => deleteCallback.call(this));
                        }
                    }
                    return this[cacheKey];
                },
                set(v) {
                    // when the underlying value changes, invalidate cache immediately
                    deleteCallback.call(this);
                    if (orig.set)
                        orig.set.call(this, v);
                },
                init(initial) {
                    // keep normal accessor init behavior
                    return initial;
                },
            };
        }
    };
}
/**
 * @function clearCache
 * @description Clear *all* cache entries created by `@cache` on an instance.
 * @param {any} instance - The instance for which the cache should be cleared.
 */
function clearCache(instance) {
    for (const sym of Object.getOwnPropertySymbols(instance)) {
        if (String(sym).startsWith("Symbol(__cache__")) {
            delete instance[sym];
        }
    }
}
/**
 * @function clearCacheEntry
 * @description Clear a specific cache entry for a given method, function, or getter.
 * @param {any} instance - The instance for which the cache should be cleared.
 * @param {string | Function} field - The name (or the function itself) of the field to clear.
 */
function clearCacheEntry(instance, field) {
    const name = typeof field === "function" ? field.name : field;
    const sym = Object.getOwnPropertySymbols(instance).find((s) => String(s) === `Symbol(__cache__${name})`);
    if (sym)
        delete instance[sym];
}

class DefineDecoratorUtils {
    prototypeMap = new WeakMap;
    dataMap = new WeakMap;
    data(element) {
        if (element instanceof TurboSelector)
            element = element.element;
        if (!element)
            return {};
        if (!this.dataMap.has(element))
            this.dataMap.set(element, {});
        return this.dataMap.get(element);
    }
    prototype(prototype) {
        if (!prototype)
            return {};
        if (!this.prototypeMap.has(prototype))
            this.prototypeMap.set(prototype, {});
        return this.prototypeMap.get(prototype);
    }
    fieldSetInPrototype(prototype, field) {
        while (prototype && prototype !== HTMLElement.prototype) {
            if (this.prototype(prototype)[field])
                return true;
            prototype = Object.getPrototypeOf(prototype);
        }
        return false;
    }
    skipAttributeChangedCallback(prototype) {
        return this.fieldSetInPrototype(prototype, "setupAttributeChangedCallback");
    }
    skipConnectedCallback(prototype) {
        return this.fieldSetInPrototype(prototype, "setupConnectedCallback");
    }
    getNamesOfPrototypeChain(prototype) {
        const result = [];
        while (prototype && prototype !== HTMLElement.prototype) {
            const name = this.prototype(prototype).name;
            if (name)
                result.push(name);
            prototype = Object.getPrototypeOf(prototype);
        }
        return result;
    }
}

const utils$1 = new DefineDecoratorUtils();
/**
 * @decorator
 * @function define
 * @description Stage-3 **class** decorator factory. It:
 * - Registers the element with customElements (name inferred if omitted).
 * - Adds the defined (or inferred) customElement name as a class to all instances of this class (and the class's children).
 * - Publishes a *live* `observedAttributes` getter that lists all attributes associated with `@observed` fields in
 *   this class and its ancestors.
 * - Sets up an `attributeChangedCallback()` function to mirror changes from attributes to their associated
 * `@observed` fields.
 *
 * @param {string} [elementName] - The name of the custom HTML element. It is inferred if omitted.
 * @param {DefineOptions} [options] - Custom {@link DefineOptions} options object.
 *
 * @example
 * ```ts
 * @define() // name will be "my-el" (kebab case of class name).
 * class MyEl extends HTMLElement { ... }
 *
 * @define("my-el") // explicit name
 * class MyEl extends HTMLElement { ... }
 * ````
 */
function define(elementName, options = { injectAttributeBridge: true }) {
    return function (Base, context) {
        const name = elementName ?? camelToKebabCase(context.name);
        const prototype = Base.prototype;
        if (name)
            utils$1.prototype(prototype).name = name;
        Object.defineProperty(Base, "observedAttributes", {
            configurable: true,
            enumerable: false,
            get: function () {
                const combined = new Set();
                let constructor = this;
                while (constructor && constructor !== Function.prototype) {
                    const set = constructor[Symbol.metadata]?.observedAttributes;
                    if (set)
                        for (const entry of set)
                            combined.add(entry);
                    constructor = Object.getPrototypeOf(constructor);
                }
                return Array.from(combined);
            },
        });
        if (options.injectAttributeBridge !== false && !utils$1.skipAttributeChangedCallback(prototype)) {
            utils$1.prototype(prototype).setupAttributeChangedCallback = true;
            const wrapper = function (name, oldValue, newValue) {
                getSuperMethod(this, "attributeChangedCallback", wrapper)?.call(this, name, oldValue, newValue);
                if (newValue === oldValue)
                    return;
                if (utils$1.data(this).attributeBridgePass)
                    return;
                const property = kebabToCamelCase(name);
                if (!(property in this))
                    return;
                try {
                    utils$1.data(this).attributeBridgePass = true;
                    this[property] = newValue === null ? undefined : parse(newValue);
                }
                finally {
                    utils$1.data(this).attributeBridgePass = false;
                }
            };
            Object.defineProperty(prototype, "attributeChangedCallback", {
                configurable: true,
                enumerable: false,
                writable: true,
                value: wrapper
            });
        }
        if (!utils$1.skipConnectedCallback(prototype)) {
            utils$1.prototype(prototype).setupConnectedCallback = true;
            const wrapper = function () {
                getSuperMethod(this, "connectedCallback", wrapper)?.call(this);
                if (!(this instanceof HTMLElement))
                    return;
                for (const attribute of this.constructor.observedAttributes ?? []) {
                    const value = this[kebabToCamelCase(attribute)];
                    if (value === undefined)
                        continue;
                    const stringValue = stringify(value);
                    if (this.getAttribute(attribute) !== stringValue)
                        this.setAttribute(attribute, stringValue);
                }
                utils$1.getNamesOfPrototypeChain(Object.getPrototypeOf(this)).forEach(name => this.classList?.add(name));
            };
            Object.defineProperty(prototype, "connectedCallback", {
                configurable: true,
                enumerable: false,
                writable: true,
                value: wrapper,
            });
        }
        context.addInitializer(function () {
            if (name && !customElements.get(name))
                customElements.define(name, Base);
        });
        return Base;
    };
}

/**
 * @decorator
 * @function expose
 * @description Stage-3 decorator that augments fields, accessors, and methods to expose fields and methods
 * from inner instances.
 * @param {string} rootKey - The property key of the instance to expose from.
 * @param {boolean} [exposeSetter=true] - Whether to expose a setter for the property. Defaults to true.
 *
 * @example
 * ```ts
 * protected model: TurboModel;
 * @expose("model") public color: string;
 * ```
 * Is equivalent to:
 * ```ts
 * protected model: TurboModel;
 *
 * public get color(): string {
 *    return this.model.color;
 * }
 *
 * public set color(value: string) {
 *    this.model.color = value;
 * }
 * ```
 */
function expose(rootKey, exposeSetter = true) {
    return function (value, context) {
        if (!rootKey)
            return value;
        const { kind, name } = context;
        const key = String(name);
        const nestedRoots = rootKey.split(".").filter(Boolean);
        const getLowestRoot = function (host) {
            if (!host)
                return;
            let parent = host;
            for (const root of nestedRoots) {
                parent = parent[root];
                if (!parent)
                    return;
            }
            return parent;
        };
        if (kind === "method") {
            return function (...args) {
                const root = getLowestRoot(this);
                const fn = root?.[key];
                if (typeof fn === "function")
                    return fn.apply(root, args);
            };
        }
        context.addInitializer(function () {
            const read = function () { return getLowestRoot(this)?.[key]; };
            const write = function (value) {
                const root = getLowestRoot(this);
                if (root)
                    root[key] = value;
            };
            if (kind === "field" || kind === "accessor") {
                const descriptor = getFirstDescriptorInChain(this, key);
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor?.enumerable ?? true,
                    get: () => read.call(this),
                    set: (value) => {
                        if (exposeSetter)
                            write.call(this, value);
                    },
                });
            }
        });
    };
}

class ObserveUtils {
    constructorMap = new WeakMap();
    constructorData(target) {
        let obj = this.constructorMap.get(target);
        if (!obj) {
            obj = { installed: new Map() };
            this.constructorMap.set(target, obj);
        }
        return obj;
    }
}

if (!("metadata" in Symbol)) {
    Object.defineProperty(Symbol, "metadata", {
        value: Symbol.for("Symbol.metadata"),
        writable: false, enumerable: false, configurable: true,
    });
}
const utils = new ObserveUtils();
/**
 * @decorator
 * @function observe
 * @description Stage-3 decorator for fields, getters, setters, and accessors that reflects a property to an HTML
 * attribute. So when the value of the property changes, it is reflected in the element's HTML attributes.
 * It also records the attribute name into the class's `observedAttributed` to listen for changes on the HTML.
 *
 * @example
 * ```ts
 * @define()
 * class MyClass extends HTMLElement {
 *    @observe fieldName: string = "hello";
 * }
 * ```
 *
 * Leads to:
 * ```html
 * <my-class field-name="hello"></my-class>
 * ```
 *
 */
function observe(value, context) {
    const { kind, name, static: isStatic } = context;
    const key = String(name);
    const attribute = camelToKebabCase(key);
    const backing = Symbol(`__observed_${key}`);
    if (context.metadata) {
        const observedAttributes = context.metadata.observedAttributes;
        if (!Object.prototype.hasOwnProperty.call(context.metadata, "observedAttributes"))
            context.metadata.observedAttributes = new Set(observedAttributes);
        else if (!observedAttributes)
            context.metadata.observedAttributes = new Set();
        context.metadata.observedAttributes.add(attribute);
    }
    context.addInitializer(function () {
        const prototype = isStatic ? this : getFirstPrototypeInChainWith(this, key);
        let customGetter;
        let customSetter;
        if (kind === "field" || kind === "accessor")
            try {
                this[backing] = this[name];
            }
            catch { }
        const read = function () {
            return customGetter ? customGetter.call(this) : this[backing];
        };
        const write = function (value) {
            const previous = this[key];
            if (previous === value)
                return;
            if (customSetter)
                customSetter.call(this, value);
            else
                this[backing] = value;
            this.setAttribute?.(attribute, stringify(this[key]));
        };
        if (kind === "field" || kind === "accessor") {
            const accessor = value;
            if (accessor?.get)
                customGetter = accessor.get;
            if (accessor?.set)
                customSetter = accessor.set;
            const descriptor = getFirstDescriptorInChain(this, key);
            if (descriptor?.get)
                customGetter = descriptor.get;
            if (descriptor?.set)
                customSetter = descriptor.set;
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: descriptor?.enumerable ?? true,
                get: () => read.call(this),
                set: (value) => write.call(this, value),
            });
        }
        else if (kind === "getter" || kind === "setter") {
            const installed = utils.constructorData(prototype).installed;
            if (installed.get(key))
                return;
            installed.set(key, true);
            const descriptor = getFirstDescriptorInChain(prototype, key) ?? {};
            if (typeof descriptor.get === "function")
                customGetter = descriptor.get;
            if (typeof descriptor.set === "function")
                customSetter = descriptor.set;
            Object.defineProperty(prototype, key, {
                configurable: true,
                enumerable: !!descriptor?.enumerable,
                get: function () { return read.call(this); },
                set: function (value) { write.call(this, value); },
            });
        }
    });
}

/**
 * @decorator
 * @function solver
 * @description Stage-3 decorator that turns methods into substrate solvers.
 * @example
 * ```ts
 * @solver private constrainPosition(properties: SubstrateSolverProperties) {...}
 * ```
 * Is equivalent to:
 * ```ts
 * private constrainPosition(properties: SubstrateSolverProperties) {...}
 *
 * public initialize() {
 *   ...
 *   $(this).addSolver(this.constrainPosition);
 * }
 * ```
 */
function solver(value, context) {
    const { name } = context;
    context.addInitializer(function () { this["solverKeys"]?.push(name); });
    return value;
}

/**
 * @description Create a flex column element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
function flexCol(properties) {
    const el = element(properties);
    $(el).setStyles({ display: "flex", flexDirection: "column" }, true);
    return el;
}
/**
 * @description Create a flex column element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
function flexColCenter(properties) {
    const el = flexCol(properties);
    $(el).setStyles({ justifyContent: "center", alignItems: "center" }, true);
    return el;
}
/**
 * @description Create a flex row element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
function flexRow(properties) {
    const el = element(properties);
    $(el).setStyles({ display: "flex", flexDirection: "row" }, true);
    return el;
}
/**
 * @description Create a flex row element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
function flexRowCenter(properties) {
    const el = flexRow(properties);
    $(el).setStyles({ justifyContent: "center", alignItems: "center" }, true);
    return el;
}
/**
 * @description Create a spacer element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created spacer element.
 * @template {HTMLTag} Tag
 */
function spacer(properties) {
    const el = element(properties);
    $(el).setStyle("flexGrow", 1, true);
    return el;
}

/**
 * @class TurboView
 * @template {object} ElementType - The type of the element attached to the view.
 * @template {TurboModel} ModelType - The model type used in this view.
 * @template {TurboEmitter} EmitterType - The emitter type used in this view.
 * @description A base view class for MVC elements, providing structure for initializing and managing UI setup and
 * event listeners. Designed to be devoid of logic and only handle direct UI changes.
 */
class TurboView {
    /**
     * @description The main component this view is attached to.
     */
    element;
    /**
     * @description The model instance this view is bound to.
     */
    model;
    /**
     * @description The emitter instance used for event communication.
     */
    emitter;
    /**
     * @constructor
     * @param {TurboViewProperties<ElementType, ModelType, EmitterType>} properties - Properties to initialize the view with.
     */
    constructor(properties) {
        this.element = properties.element;
        if (properties.model)
            this.model = properties.model;
        if (properties.emitter)
            this.emitter = properties.emitter;
    }
    /**
     * @function initialize
     * @description Initializes the view by setting up change callbacks, UI elements, layout, and event listeners.
     */
    initialize() {
        this.setupUIElements();
        this.setupUILayout();
        this.setupUIListeners();
        this.setupChangedCallbacks();
    }
    /**
     * @function setupChangedCallbacks
     * @description Setup method for initializing data/model change listeners and associated UI logic.
     * @protected
     */
    setupChangedCallbacks() {
        initializeEffects(this);
    }
    /**
     * @function setupUIElements
     * @description Setup method for initializing and storing sub-elements of the UI.
     * @protected
     */
    setupUIElements() {
    }
    /**
     * @function setupUILayout
     * @description Setup method for creating the layout structure and injecting sub-elements into the DOM tree.
     * @protected
     */
    setupUILayout() {
    }
    /**
     * @function setupUIListeners
     * @description Setup method for defining DOM and input event listeners.
     * @protected
     */
    setupUIListeners() {
    }
}

/**
 * @class TurboInteractor
 * @extends TurboController
 * @template {object} ElementType - The type of the main component.
 * @template {TurboView} ViewType - The element's MVC view type.
 * @template {TurboModel} ModelType - The element's MVC model type.
 * @template {TurboEmitter} EmitterType - The element's MVC emitter type.
 * @description Class representing an MVC interactor. It holds event listeners to set up on the element itself, or
 * the custom defined target.
 */
class TurboInteractor extends TurboController {
    #target_accessor_storage;
    /**
     * @description The target of the event listeners. Defaults to the element itself.
     */
    get target() { return this.#target_accessor_storage; }
    set target(value) { this.#target_accessor_storage = value; }
    /**
     * @readonly
     * @description The name of the tool (if any) to listen for.
     */
    toolName;
    /**
     * @readonly
     * @description The associated event manager. Defaults to `TurboEventManager.instance`.
     */
    manager;
    /**
     *
     * @readonly
     * @description Optional custom options to define per event type.
     */
    options;
    constructor(properties) {
        super(properties);
        this.manager = properties.manager ?? this.manager ?? TurboEventManager.instance;
        this.toolName = properties.toolName ?? this.toolName ?? undefined;
        this.options = properties.listenerOptions ?? {};
        const host = this.element;
        this.target = properties.target ?? this.target ?? host instanceof Node ? host
            : host?.element instanceof Node ? host.element
                : undefined;
    }
    /**
     * @function initialize
     * @description Initialization function that sets up all the defined evnt listeners and attaches them to the target.
     */
    initialize() {
        super.initialize();
        const target = this.target ?? this;
        for (const [methodName, eventName] of Object.entries(DefaultEventName)) {
            const handler = this[methodName];
            if (typeof handler !== "function")
                continue;
            const options = this.options?.[methodName];
            if (this.toolName)
                $(target).onTool(eventName, this.toolName, e => handler.call(this, e), options, this.manager);
            else
                $(target).on(eventName, e => handler.call(this, e), options, this.manager);
        }
    }
}

/**
 * @class TurboSubstrate
 * @extends TurboController
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 * @description Class representing a substrate in MVC, bound to the provided element.
 */
class TurboSubstrate extends TurboController {
    /**
     * @description The name of the substrate.
     */
    substrateName;
    /**
     * @description The property keys of the substrate solvers defined in the instance.
     */
    solverKeys = [];
    /**
     * @description The list of objects constrained by the substrate. Retrieving it will return a shallow copy as a
     * Set. Use {@link addObject} and {@link removeObject} to manipulate the list.
     */
    get objectList() {
        return $(this).getSubstrateObjectList(this.substrateName);
    }
    set objectList(value) {
        $(this).setSubstrateObjectList(value, this.substrateName);
    }
    constructor(properties) {
        super(properties);
        this.substrateName = properties.substrateName ?? this.substrateName ?? undefined;
        if (properties.onActivate)
            this.onActivate = properties.onActivate;
        if (properties.onDeactivate)
            this.onDeactivate = properties.onDeactivate;
    }
    /**
     * @function initialize
     * @override
     * @description Initialization function that calls {@link makeSubstrate} on `this.element`, sets it up, and attaches
     * all the defined solvers.
     */
    initialize() {
        super.initialize();
        if (!this.substrateName)
            return;
        $(this).makeSubstrate(this.substrateName, {
            onActivate: typeof this.onActivate === "function" ? this.onActivate.bind(this) : undefined,
            onDeactivate: typeof this.onDeactivate === "function" ? this.onDeactivate.bind(this) : undefined,
        });
        this.solverKeys.forEach((key) => {
            $(this).addSolver(props => this[key]?.(props));
        });
    }
    /**
     * @function addObject
     * @description Adds the provided object to the substrate's list.
     * @param {object} object - The object to add.
     */
    addObject(object) {
        $(this).addObjectToSubstrate(object, this.substrateName);
    }
    /**
     * @function removeObject
     * @description Removes the provided object from the substrate's list.
     * @param {object} object - The object to remove.
     */
    removeObject(object) {
        $(this).removeObjectFromSubstrate(object, this.substrateName);
    }
    /**
     * @function hasObject
     * @description Whether the provided object is included in the substrate's list.
     * @param {object} object - The object to check.
     * @return {boolean} - Whether the object is present.
     */
    hasObject(object) {
        return $(this).hasObjectInSubstrate(object, this.substrateName);
    }
    /**
     * @function isProcessed
     * @description Whether the provided object is processed within the current resolving loop.
     * @param {object} object - The object to check.
     * @return {boolean} - Whether the object was processed.
     */
    isProcessed(object) {
        return $(this).wasObjectProcessedBySubstrate(object, this.substrateName);
    }
    /**
     * @function addSolver
     * @description Add the given function as a solver in the substrate.
     * @param {SubstrateSolver} fn - The solver function to execute when calling {@link resolve}.
     */
    addSolver(fn) {
        $(this).addSolver(fn, this.substrateName);
    }
    /**
     * @function removeSolver
     * @description Remove the given function from the substrate's list of solvers.
     * @param {SubstrateSolver} fn - The solver function to remove.
     */
    removeSolver(fn) {
        $(this).removeSolver(fn, this.substrateName);
    }
    /**
     * @function clearSolvers
     * @description Remove all solvers attached to the substrate.
     */
    clearSolvers() {
        $(this).clearSolvers(this.substrateName);
    }
    /**
     * @function resolve
     * @description Resolve the substrate by calling all the solvers on each of the objects in the substrate's list.
     * @param {SubstrateSolverProperties} [properties={}] - Optional properties to provide context to the resolving loop.
     */
    resolve(properties = {}) {
        $(this).resolveSubstrate({ ...properties, substrate: this.substrateName });
    }
}

/**
 * @class TurboTool
 * @extends TurboController
 * @template {object} ElementType - The type of the element.
 * @template {TurboView} ViewType - The element's view type, if any.
 * @template {TurboModel} ModelType - The element's model type, if any.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if any.
 * @description Class representing a tool in MVC, bound to the provided element.
 */
class TurboTool extends TurboController {
    /**
     * @description The name of the tool.
     */
    toolName;
    /**
     * @readonly
     * @description The target of this tool. If defined, will embed the tool.
     */
    embeddedTarget;
    /**
     * @readonly
     * @description The associated event manager. Defaults to `TurboEventManager.instance`.
     */
    manager;
    /**
     * @readonly
     * @description Custom activation event to listen to. Defaults to the default click event name.
     */
    activationEvent = DefaultEventName.click;
    /**
     * @readonly
     * @description Click mode that will hold this tool when activated. Defaults to `ClickMode.left`.
     */
    clickMode = exports.ClickMode.left;
    /**
     * @readonly
     * @description Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
     */
    key;
    constructor(properties) {
        super(properties);
        this.toolName = properties.toolName ?? this.toolName ?? undefined;
        if (properties.embeddedTarget)
            this.embeddedTarget = properties.embeddedTarget;
        if (properties.onActivate)
            this.onActivate = properties.onActivate;
        if (properties.onDeactivate)
            this.onDeactivate = properties.onDeactivate;
        if (properties.activationEvent)
            this.activationEvent = properties.activationEvent;
        if (properties.clickMode)
            this.clickMode = properties.clickMode;
        if (properties.customActivation)
            this.customActivation = properties.customActivation;
        if (properties.key)
            this.key = properties.key;
        this.manager = properties.manager ?? this.manager ?? TurboEventManager.instance;
    }
    /**
     * @function initialize
     * @override
     * @description Initialization function that calls {@link makeTool} on `this.element`, sets it up, and attaches
     * all the defined tool behaviors.
     */
    initialize() {
        super.initialize();
        if (!this.toolName)
            return;
        $(this).makeTool(this.toolName, {
            onActivate: typeof this.onActivate === "function" ? this.onActivate.bind(this) : undefined,
            onDeactivate: typeof this.onDeactivate === "function" ? this.onDeactivate.bind(this) : undefined,
            activationEvent: this.activationEvent,
            clickMode: this.clickMode,
            customActivation: typeof this.customActivation === "function" ? this.customActivation.bind(this) : undefined,
            key: this.key,
            manager: this.manager,
        });
        if (this.embeddedTarget)
            $(this).embedTool(this.embeddedTarget, this.manager);
        for (const [methodName, eventName] of Object.entries(DefaultEventName)) {
            const handler = this[methodName];
            if (typeof handler !== "function")
                continue;
            $(this).addToolBehavior(eventName, (e, target) => handler.call(this, e, target), this.toolName, this.manager);
        }
    }
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$3 = "turbo-button{align-items:center;background-color:#dadada;border:1px solid #000;border-radius:.4em;color:#000;display:inline-flex;flex-direction:row;gap:.4em;padding:.5em .7em;text-decoration:none}turbo-button>h4{flex-grow:1}";
styleInject(css_248z$3);

/**
 * @description Converts a string of tags into an Element.
 * @param {string} text - The string to convert
 * @return The Element
 */
function textToElement(text) {
    let wrapper = document.createElement("div");
    wrapper.innerHTML = text;
    return wrapper.children[0];
}
function createProxy(self, proxied) {
    return new Proxy(self, {
        get(target, prop, receiver) {
            if (prop in target)
                return Reflect.get(target, prop, receiver);
            if (prop in proxied)
                return Reflect.get(proxied, prop, receiver);
            return undefined;
        },
        set(target, prop, value, receiver) {
            if (prop in target)
                return Reflect.set(target, prop, value, receiver);
            return Reflect.set(proxied, prop, value, receiver);
        }
    });
}

/**
 * @description Fetches an SVG from the given path
 * @param {string} path - The path to the SVG
 * @param logError
 * @returns An SVGElement promise
 */
function fetchSvg(path, logError = true) {
    return new Promise((resolve, reject) => {
        if (!path || path.length === 0) {
            reject(new Error("Invalid path"));
            return;
        }
        fetch(path)
            .then(response => {
            if (!response.ok)
                throw new Error("Network response was not ok while loading your SVG");
            return response.text();
        })
            .then(svgText => {
            const svg = textToElement(svgText);
            if (!svg)
                throw new Error("Error parsing SVG text");
            resolve(svg);
        })
            .catch(error => {
            if (!logError)
                reject(error);
            console.error("Error fetching SVG:", error);
            reject(error);
        });
    });
}

function defineUIPrototype(constructor) {
    const prototype = constructor.prototype;
    const unsetDefaultClassesKey = Symbol("__unset_default_classes__");
    Object.defineProperty(prototype, "unsetDefaultClasses", {
        get: function () { return this[unsetDefaultClassesKey] ?? false; },
        set: function (value) {
            this[unsetDefaultClassesKey] = value;
            const defaultClasses = this.constructor?.config?.defaultClasses;
            if (!defaultClasses)
                return;
            $(this).toggleClass(defaultClasses, value);
        },
        enumerable: true,
        configurable: true,
    });
}

/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few useful tools and functions.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * */
class TurboElement extends HTMLElement {
    /**
     * @description Static configuration object.
     */
    static config = {
        shadowDOM: false,
        defaultSelectedClass: "selected"
    };
    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    mvc = new Mvc({ element: this });
    /**
     * @description Delegate fired when the element is attached to DOM.
     */
    onAttach = new Delegate();
    /**
     * @description Delegate fired when the element is detached from the DOM.
     */
    onDetach = new Delegate();
    /**
     * @description Delegate fired when the element is adopted by a new parent in the DOM.
     */
    onAdopt = new Delegate();
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined)
                this.config[key] = val;
        });
    }
    /**
     * @function setupChangedCallbacks
     * @description Setup method intended to initialize change listeners and callbacks. Called on `initialize()`.
     * @protected
     */
    setupChangedCallbacks() {
    }
    /**
     * @function setupUIElements
     * @description Setup method intended to initialize all direct sub-elements attached to this element, and store
     * them in fields. Called on `initialize()`.
     * @protected
     */
    setupUIElements() {
    }
    /**
     * @function setupUILayout
     * @description Setup method to create the layout structure of the element by adding all created sub-elements to
     * this element's child tree. Called on `initialize()`.
     * @protected
     */
    setupUILayout() {
    }
    /**
     * @function setupUIListeners
     * @description Setup method to initialize and define all input/DOM event listeners of the element. Called on
     * `initialize()`.
     * @protected
     */
    setupUIListeners() {
    }
    /**
     * @function connectedCallback
     * @description function called when the element is attached to the DOM.
     */
    connectedCallback() {
        this.onAttach.fire();
    }
    /**
     * @function disconnectedCallback
     * @description function called when the element is detached from the DOM.
     */
    disconnectedCallback() {
        this.onDetach.fire();
    }
    /**
     * @function adoptedCallback
     * @description function called when the element is adopted by a new parent in the DOM.
     */
    adoptedCallback() {
        this.onAdopt.fire();
    }
}
(() => {
    defineDefaultProperties(TurboElement);
    defineMvcAccessors(TurboElement);
    defineUIPrototype(TurboElement);
})();

/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
let TurboIcon = (() => {
    let _classDecorators = [define("turbo-icon")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    let _instanceExtraInitializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _type_extraInitializers = [];
    let _directory_decorators;
    let _directory_initializers = [];
    let _directory_extraInitializers = [];
    let _set_icon_decorators;
    let _set_iconColor_decorators;
    let _loadSvg_decorators;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _type_decorators = [observe, auto({
                    initialValueCallback: function () { return this.getPropertiesValue(this.type, "defaultType", "svg"); },
                    preprocessValue: function (value) {
                        if (!value || value.length == 0)
                            return this.type;
                        if (value[0] == ".")
                            value = value.substring(1);
                        return value;
                    },
                    callAfter: function () { this.generateIcon(); },
                })];
            _directory_decorators = [observe, auto({
                    initialValueCallback: function () { return this.getPropertiesValue(undefined, "defaultDirectory", ""); },
                    preprocessValue: function (value) {
                        if (isUndefined(value))
                            return this.directory;
                        if (value.length > 0 && !value.endsWith("/"))
                            value += "/";
                        return value;
                    },
                    callAfter: function () { this.generateIcon(); }
                })];
            _set_icon_decorators = [observe, auto()];
            _set_iconColor_decorators = [observe, auto()];
            _loadSvg_decorators = [cache()];
            tslib.__esDecorate(this, null, _set_icon_decorators, { kind: "setter", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_iconColor_decorators, { kind: "setter", name: "iconColor", static: false, private: false, access: { has: obj => "iconColor" in obj, set: (obj, value) => { obj.iconColor = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _loadSvg_decorators, { kind: "method", name: "loadSvg", static: false, private: false, access: { has: obj => "loadSvg" in obj, get: obj => obj.loadSvg }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            tslib.__esDecorate(null, null, _directory_decorators, { kind: "field", name: "directory", static: false, private: false, access: { has: obj => "directory" in obj, get: obj => obj.directory, set: (obj, value) => { obj.directory = value; } }, metadata: _metadata }, _directory_initializers, _directory_extraInitializers);
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static config = {
            ...TurboElement.config,
            defaultType: "svg",
            customLoaders: {}
        };
        static imageTypes = ["png", "jpg", "jpeg", "gif", "webp",
            "PNG", "JPG", "JPEG", "GIF", "WEBP"];
        _element = tslib.__runInitializers(this, _instanceExtraInitializers);
        _loadToken = 0;
        onLoaded;
        /**
         * @description The type of the icon.
         */
        type = tslib.__runInitializers(this, _type_initializers, void 0);
        /**
         * @description The user-provided (or statically configured) directory to the icon's file.
         */
        directory = (tslib.__runInitializers(this, _type_extraInitializers), tslib.__runInitializers(this, _directory_initializers, void 0));
        /**
         * @description The path to the icon's source file.
         */
        get path() {
            let extension = getFileExtension(this.icon);
            const icon = this.icon?.replace(extension, "");
            if (extension.length === 0 && this.type?.length > 0)
                extension = "." + this.type;
            return this.directory + icon + extension;
        }
        /**
         * @description The name (or path) of the icon. Might include the file extension (to override the icon's type).
         * Setting it will update the icon accordingly.
         */
        set icon(value) {
            const ext = getFileExtension(value).substring(1);
            if (ext)
                this.type = ext;
            this.generateIcon();
        }
        /**
         * @description The assigned color to the icon (if any)
         */
        set iconColor(value) {
            this.updateColor(value);
        }
        /**
         * @description The child element of the icon element (an HTML image or an SVG element).
         */
        set element(value) {
            this._element = value;
        }
        get element() {
            return this._element;
        }
        //Utilities
        loadSvg(path) {
            return fetchSvg(path);
        }
        loadImg(path) {
            return img({ src: path, alt: this.icon });
        }
        updateColor(value = this.iconColor) {
            if (value && this.element instanceof SVGElement)
                this.element.style.fill = value;
        }
        generateIcon() {
            const path = this.path;
            const type = getFileExtension(path)?.substring(1);
            if (this.element instanceof HTMLImageElement
                && equalToAny(type, ...this.constructor.imageTypes)) {
                this.element.src = this.path;
                this.element.alt = this.icon;
                return;
            }
            this.clear();
            if (!this.icon)
                return;
            const token = ++this._loadToken;
            const element = this.getLoader(type)(path);
            if (element instanceof Element)
                this.setupLoadedElement(element);
            else
                element.then(element => {
                    if (token !== this._loadToken)
                        return;
                    this.setupLoadedElement(element);
                }).catch(error => console.error(`Failed to load icon: ${error}`));
        }
        getLoader(type) {
            if (!type)
                return;
            const customLoader = this.constructor.config.customLoaders[type];
            if (customLoader)
                return customLoader;
            if (equalToAny(type, "svg", "SVG"))
                return this.loadSvg.bind(this);
            if (equalToAny(type, ...this.constructor.imageTypes))
                return this.loadImg.bind(this);
            throw new Error(`Unsupported icon type: ${type}`);
        }
        setupLoadedElement(element) {
            if (this.element || !element)
                return;
            if (element.parentElement)
                element = element.cloneNode(true);
            $(this).addChild(element);
            this.updateColor();
            this.onLoaded?.(element);
            this.element = element;
        }
        clear() {
            $(this.element).destroy();
            this.element = null;
        }
        constructor() {
            super(...arguments);
            tslib.__runInitializers(this, _directory_extraInitializers);
        }
        static {
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
    });
    return _classThis;
})();
function icon(properties) {
    if (!properties.tag)
        properties.tag = "turbo-icon";
    return element({ ...properties });
}

/**
 * Class for creating a rich turbo element (an element that is possibly accompanied by icons (or other elements) on
 * its left and/or right).
 * @class TurboRichElement
 * @extends TurboElement
 * @template {ValidTag} ElementTag - The tag of the main element to create the rich element from.
 */
let TurboRichElement = (() => {
    let _classDecorators = [define("turbo-rich-element")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    let _instanceExtraInitializers = [];
    let _elementTag_decorators;
    let _elementTag_initializers = [];
    let _elementTag_extraInitializers = [];
    let _set_leftCustomElements_decorators;
    let _set_leftIcon_decorators;
    let _set_prefixEntry_decorators;
    let _set_element_decorators;
    let _set_suffixEntry_decorators;
    let _set_rightIcon_decorators;
    let _set_rightCustomElements_decorators;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _elementTag_decorators = [auto({ initialValueCallback: function () { return this.getPropertiesValue(undefined, "defaultElementTag", "h4"); } })];
            _set_leftCustomElements_decorators = [auto({ executeSetterBeforeStoring: true })];
            _set_leftIcon_decorators = [auto({
                    preprocessValue: function (value) {
                        if (typeof value == "string") {
                            if (this.leftIcon) {
                                this.leftIcon.icon = value;
                                return this.leftIcon;
                            }
                            value = icon({ icon: value });
                        }
                        $(this).remChild(this.leftIcon);
                        this.addAtPosition(value, "leftIcon");
                        return value;
                    }
                })];
            _set_prefixEntry_decorators = [auto({
                    preprocessValue: function (value) {
                        if (typeof value == "string") {
                            if (this.prefixEntry) {
                                this.prefixEntry.textContent = value;
                                return this.prefixEntry;
                            }
                            value = element({ text: value });
                        }
                        $(this).remChild(this.prefixEntry);
                        this.addAtPosition(value, "prefixEntry");
                        return value;
                    }
                })];
            _set_element_decorators = [auto({
                    preprocessValue: function (value) {
                        if (typeof value === "string") {
                            if (this.element && "textContent" in this.element) {
                                this.element.textContent = value;
                                return this.element;
                            }
                            value = element({ tag: this.elementTag, text: value });
                        }
                        else if (typeof value === "object" && !(value instanceof Element)) {
                            if (!value.tag)
                                value.tag = this.elementTag;
                            value = element(value);
                        }
                        $(this).remChild(this.element);
                        this.addAtPosition(value, "element");
                        return value;
                    }
                })];
            _set_suffixEntry_decorators = [auto({
                    preprocessValue: function (value) {
                        if (typeof value == "string") {
                            if (this.suffixEntry) {
                                this.suffixEntry.textContent = value;
                                return this.suffixEntry;
                            }
                            value = element({ text: value });
                        }
                        $(this).remChild(this.suffixEntry);
                        this.addAtPosition(value, "suffixEntry");
                        return value;
                    }
                })];
            _set_rightIcon_decorators = [auto({
                    preprocessValue: function (value) {
                        if (typeof value == "string") {
                            if (this.rightIcon) {
                                this.rightIcon.icon = value;
                                return this.rightIcon;
                            }
                            value = icon({ icon: value });
                        }
                        $(this).remChild(this.rightIcon);
                        this.addAtPosition(value, "rightIcon");
                        return value;
                    }
                })];
            _set_rightCustomElements_decorators = [auto({ executeSetterBeforeStoring: true })];
            tslib.__esDecorate(this, null, _set_leftCustomElements_decorators, { kind: "setter", name: "leftCustomElements", static: false, private: false, access: { has: obj => "leftCustomElements" in obj, set: (obj, value) => { obj.leftCustomElements = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_leftIcon_decorators, { kind: "setter", name: "leftIcon", static: false, private: false, access: { has: obj => "leftIcon" in obj, set: (obj, value) => { obj.leftIcon = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_prefixEntry_decorators, { kind: "setter", name: "prefixEntry", static: false, private: false, access: { has: obj => "prefixEntry" in obj, set: (obj, value) => { obj.prefixEntry = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_element_decorators, { kind: "setter", name: "element", static: false, private: false, access: { has: obj => "element" in obj, set: (obj, value) => { obj.element = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_suffixEntry_decorators, { kind: "setter", name: "suffixEntry", static: false, private: false, access: { has: obj => "suffixEntry" in obj, set: (obj, value) => { obj.suffixEntry = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_rightIcon_decorators, { kind: "setter", name: "rightIcon", static: false, private: false, access: { has: obj => "rightIcon" in obj, set: (obj, value) => { obj.rightIcon = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_rightCustomElements_decorators, { kind: "setter", name: "rightCustomElements", static: false, private: false, access: { has: obj => "rightCustomElements" in obj, set: (obj, value) => { obj.rightCustomElements = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, null, _elementTag_decorators, { kind: "field", name: "elementTag", static: false, private: false, access: { has: obj => "elementTag" in obj, get: obj => obj.elementTag, set: (obj, value) => { obj.elementTag = value; } }, metadata: _metadata }, _elementTag_initializers, _elementTag_extraInitializers);
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static config = {
            ...TurboElement.config,
            defaultElementTag: "h4"
        };
        childrenOrder = (tslib.__runInitializers(this, _instanceExtraInitializers), ["leftCustomElements", "leftIcon",
            "prefixEntry", "element", "suffixEntry", "rightIcon", "rightCustomElements"]);
        /**
         * @description Adds a given element or elements to the button at a specified position.
         * @param {Element | Element[] | null} element - The element(s) to add.
         * @param {this["childrenOrder"][number]} type - The type of child element being added.
         */
        addAtPosition(element, type) {
            if (!element || !type)
                return;
            let nextSiblingIndex = 0;
            for (let i = 0; i < this.childrenOrder.length; i++) {
                const key = this.childrenOrder[i];
                if (key === type)
                    break;
                const el = this[key];
                if (el && el instanceof Element)
                    nextSiblingIndex++;
                else if (el && Array.isArray(el))
                    nextSiblingIndex += el.length;
            }
            $(this).addChild(element, nextSiblingIndex);
        }
        /**
         * @description The tag of the text element in the button
         */
        elementTag = tslib.__runInitializers(this, _elementTag_initializers, void 0);
        /**
         * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
         */
        set leftCustomElements(value) {
            $(this).remChild(this.leftCustomElements);
            this.addAtPosition(value, "leftCustomElements");
        }
        /**
         * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
         * icon, or a Turbo/HTML element).
         */
        set leftIcon(value) { }
        get leftIcon() { return; }
        /**
         * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
         * icon, or a Turbo/HTML element).
         */
        set prefixEntry(value) { }
        get prefixEntry() { return; }
        /**
         * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
         * string will update the text's textContent with the given string.
         */
        set element(value) { }
        get element() { return; }
        /**
         * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
         * string will update the text's textContent with the given string.
         */
        get text() {
            const element = this.element;
            if (!element)
                return "";
            return element.textContent;
        }
        set text(value) {
            if (!value)
                value = "";
            this.element = value;
        }
        /**
         * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
         * icon, or a Turbo/HTML element).
         */
        set suffixEntry(value) { }
        get suffixEntry() { return; }
        /**
         * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
         * icon, or a Turbo/HTML element).
         */
        set rightIcon(value) { }
        get rightIcon() { return; }
        /**
         * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
         */
        set rightCustomElements(value) {
            $(this).remChild(this.rightCustomElements);
            this.addAtPosition(value, "rightCustomElements");
        }
        constructor() {
            super(...arguments);
            tslib.__runInitializers(this, _elementTag_extraInitializers);
        }
        static {
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
    });
    return _classThis;
})();
function richElement(properties) {
    if (properties.text && !properties.element)
        properties.element = properties.text;
    if (properties.elementTag && typeof properties.element === "object" && !(properties.element instanceof Element)) {
        properties.element.tag = properties.elementTag;
    }
    if (!properties.tag)
        properties.tag = "turbo-rich-element";
    return element({ ...properties, text: undefined });
}

/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
let TurboButton = (() => {
    let _classDecorators = [define("turbo-button")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboRichElement;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static config = { ...TurboRichElement.config, defaultElementTag: "h4" };
        static {
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
    });
    return _classThis;
})();
function button(properties) {
    if (!properties.tag)
        properties.tag = "turbo-button";
    return richElement({ ...properties });
}

let TurboIconSwitch = (() => {
    let _classDecorators = [define("turbo-icon-switch")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboIcon;
    let _instanceExtraInitializers = [];
    let _set_switchReifect_decorators;
    let _set_defaultState_decorators;
    let _set_appendStateToIconName_decorators;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_switchReifect_decorators = [auto({
                    preprocessValue: function (value) {
                        if (value instanceof StatefulReifect)
                            return value;
                        else
                            return new StatefulReifect(value || {});
                    }
                })];
            _set_defaultState_decorators = [auto()];
            _set_appendStateToIconName_decorators = [auto()];
            tslib.__esDecorate(this, null, _set_switchReifect_decorators, { kind: "setter", name: "switchReifect", static: false, private: false, access: { has: obj => "switchReifect" in obj, set: (obj, value) => { obj.switchReifect = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_defaultState_decorators, { kind: "setter", name: "defaultState", static: false, private: false, access: { has: obj => "defaultState" in obj, set: (obj, value) => { obj.defaultState = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_appendStateToIconName_decorators, { kind: "setter", name: "appendStateToIconName", static: false, private: false, access: { has: obj => "appendStateToIconName" in obj, set: (obj, value) => { obj.appendStateToIconName = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
        config = (tslib.__runInitializers(this, _instanceExtraInitializers), { ...TurboIcon.config });
        get switchReifect() { return; }
        set switchReifect(value) {
            this.switchReifect.attach(this);
            if (this.defaultState)
                this.switchReifect.apply(this.defaultState, this);
        }
        set defaultState(value) {
            this.switchReifect?.apply(value, this);
        }
        set appendStateToIconName(value) {
            if (value) {
                const reifectProperties = this.switchReifect?.properties;
                this.switchReifect.states.forEach(state => {
                    if (!reifectProperties[state])
                        reifectProperties[state] = {};
                    reifectProperties[state].icon = this.icon + "-" + state.toString();
                });
            }
        }
        initialize() {
            super.initialize();
            if (this.defaultState && this.switchReifect)
                this.switchReifect.apply(this.defaultState, this);
        }
    });
    return _classThis;
})();
function iconSwitch(properties) {
    if (!properties.tag)
        properties.tag = "turbo-icon-switch";
    return icon({ ...properties });
}

let TurboIconToggle = (() => {
    let _classDecorators = [define("turbo-icon-toggle")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboIcon;
    let _instanceExtraInitializers = [];
    let _set_toggled_decorators;
    let _set_toggleOnClick_decorators;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_toggled_decorators = [auto({ initialValue: false })];
            _set_toggleOnClick_decorators = [auto({ initialValue: false })];
            tslib.__esDecorate(this, null, _set_toggled_decorators, { kind: "setter", name: "toggled", static: false, private: false, access: { has: obj => "toggled" in obj, set: (obj, value) => { obj.toggled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_toggleOnClick_decorators, { kind: "setter", name: "toggleOnClick", static: false, private: false, access: { has: obj => "toggleOnClick" in obj, set: (obj, value) => { obj.toggleOnClick = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
        config = (tslib.__runInitializers(this, _instanceExtraInitializers), { ...TurboIcon.config });
        stopPropagationOnClick = true;
        onToggle;
        clickListener = () => {
            this.toggle();
            return this.stopPropagationOnClick;
        };
        set toggled(value) {
            if (this.onToggle)
                this.onToggle(value, this);
        }
        set toggleOnClick(value) {
            if (value)
                $(this).on(DefaultEventName.click, this.clickListener);
            else
                $(this).removeListener(DefaultEventName.click, this.clickListener);
        }
        toggle() {
            this.toggled = !this.toggled;
        }
    });
    return _classThis;
})();
function iconToggle(properties) {
    if (!properties.tag)
        properties.tag = "turbo-icon-toggle";
    return icon({ ...properties });
}

function randomId(length = 8) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array)
        .map(b => b.toString(36).padStart(2, "0"))
        .join("")
        .slice(0, length);
}
function randomFromRange(n1, n2) {
    if (typeof n1 != "number" || typeof n2 != "number")
        return 0;
    const min = Math.min(n1, n2);
    const max = Math.max(n1, n2);
    return (Math.random() * (max - min)) + min;
}
function randomColor(saturation = [50, 70], lightness = [70, 85]) {
    if (typeof saturation != "number" && saturation.length >= 2)
        saturation = randomFromRange(saturation[0], saturation[1]);
    if (typeof lightness != "number" && lightness.length >= 2)
        lightness = randomFromRange(lightness[0], lightness[1]);
    return "hsl(" + Math.random() * 360 + " " + saturation + " " + lightness + ")";
}
function randomString(length = 12) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++)
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
}

class TurboInputInputInteractor extends TurboInteractor {
    keyName = "__input__interactor__";
    _composing = false;
    _resizeQueued = false;
    options = {
        compositionStart: { capture: true },
        compositionEnd: { capture: true },
        input: { capture: true },
    };
    get inputElement() {
        return this.element.element;
    }
    initialize() {
        super.initialize();
        $(this.target).bypassManagerOn = () => true;
    }
    setupChangedCallbacks() {
        super.setupChangedCallbacks();
        this.emitter.add("valueSet", () => this.handleInput());
    }
    click() {
        if (!this.element.locked)
            this.inputElement?.focus();
        return false;
    }
    focusIn(e) {
        if (e.target !== this.inputElement)
            return;
        if (this.element.locked) {
            this.inputElement.blur();
            return;
        }
        if (this.element.selectTextOnFocus)
            requestAnimationFrame(() => {
                try {
                    this.inputElement.select?.();
                }
                catch { }
            });
        this.element.onFocus.fire();
        return true;
    }
    focusOut(e) {
        if (e.target !== this.inputElement)
            return;
        this.element.value = this.element.element?.value;
        this.element.onBlur.fire();
    }
    compositionStart(e) {
        if (e.target !== this.inputElement)
            return;
        this._composing = true;
    }
    compositionEnd(e) {
        if (e.target !== this.inputElement)
            return;
        this._composing = false;
        this.handleInput();
        return true;
    }
    input(e) {
        if (e.target !== this.inputElement)
            return;
        this.handleInput();
        return true;
    }
    handleInput() {
        if (this._composing)
            return;
        if (!this.inputElement)
            return;
        if (this.element.dynamicVerticalResize && this.inputElement instanceof HTMLTextAreaElement) {
            if (!this._resizeQueued) {
                this._resizeQueued = true;
                queueMicrotask(() => {
                    this._resizeQueued = false;
                    $(this.inputElement)
                        .setStyle("height", "auto", true)
                        .setStyle("height", this.inputElement.scrollHeight + "px", true);
                });
            }
        }
        this.emitter.fire("processValue");
    }
}

let TurboInput = (() => {
    let _classDecorators = [define("turbo-input")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboRichElement;
    let _instanceExtraInitializers = [];
    let _set_label_decorators;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_label_decorators = [auto()];
            tslib.__esDecorate(this, null, _set_label_decorators, { kind: "setter", name: "label", static: false, private: false, access: { has: obj => "label" in obj, set: (obj, value) => { obj.label = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static config = {
            ...TurboRichElement.config,
            defaultElementTag: "input"
        };
        labelElement = tslib.__runInitializers(this, _instanceExtraInitializers);
        _content;
        get content() { return this._content; }
        set content(value) { this._content = value; }
        defaultId = "turbo-input-" + randomId();
        locked = false;
        selectTextOnFocus = false;
        dynamicVerticalResize = false;
        inputRegexCheck;
        blurRegexCheck;
        lastValidForInput = "";
        lastValidForBlur = "";
        onFocus = new Delegate();
        onBlur = new Delegate();
        onInput = new Delegate();
        set label(value) {
            if (!value || value.length === 0) {
                if (this.labelElement)
                    this.labelElement.remove();
                return;
            }
            if (!this.labelElement) {
                this.labelElement = element({ tag: "label", htmlFor: this.element?.id ?? this.defaultId });
                $(this).childHandler = this;
                $(this).addChild(this.labelElement, 0);
                if (this.content)
                    $(this).childHandler = this.content;
            }
            this.labelElement.textContent = value;
        }
        set element(value) {
            if (!(value instanceof Node) && typeof value === "object") {
                if (!value.name)
                    value.name = randomId();
                if (this.elementTag === "input" && !value.type)
                    value.type = "text";
            }
            super.element = value;
            if (this.element) {
                if (!this.element.id)
                    this.element.id = this.defaultId;
                else if (this.labelElement)
                    this.labelElement.htmlFor = this.element.id;
            }
        }
        get element() {
            return super.element;
        }
        initialize() {
            super.initialize();
            this.mvc.generate({ interactors: [TurboInputInputInteractor] });
            this.mvc.getInteractor("__input__interactor__").target = this.content;
        }
        setupUIElements() {
            super.setupUIElements();
            this.content = div();
        }
        setupUILayout() {
            super.setupUILayout();
            $(this.content).addChild($(this).childrenArray);
            $(this).addChild([this.labelElement, this.content]);
            $(this).childHandler = this.content;
        }
        setupChangedCallbacks() {
            super.setupChangedCallbacks();
            this.mvc.emitter.add("processValue", () => this.processInputValue());
        }
        get value() {
            const value = this.element?.value;
            try {
                const num = parseFloat(value);
                if (!isNaN(num))
                    return num;
            }
            catch { }
            return value;
        }
        set value(value) {
            if (!(this.element instanceof HTMLInputElement) && !(this.element instanceof HTMLTextAreaElement))
                return;
            let strValue = value.toString();
            if (this.blurRegexCheck) {
                const re = new RegExp(this.blurRegexCheck);
                if (!re.test(strValue))
                    strValue = this.lastValidForBlur;
            }
            this.element.value = strValue;
            this.mvc.emitter.fire("valueSet");
        }
        processInputValue(value = this.element.value) {
            if (this.inputRegexCheck) {
                const re = new RegExp(this.inputRegexCheck);
                if (!re.test(value)) {
                    const attemptSanitize = this.sanitizeByRegex(value, this.inputRegexCheck);
                    if (re.test(attemptSanitize))
                        value = attemptSanitize;
                    else
                        value = this.lastValidForInput;
                }
            }
            this.lastValidForInput = value.toString();
            if (this.blurRegexCheck) {
                const re = new RegExp(this.blurRegexCheck);
                if (re.test(value.toString()))
                    this.lastValidForBlur = value;
            }
            else {
                this.lastValidForBlur = value;
            }
            this.element.value = value;
            this.onInput.fire();
        }
        sanitizeByRegex(value, rule) {
            const src = typeof rule === "string" ? rule : rule.source;
            const flags = typeof rule === "string" ? "" : rule.flags.replace("g", "");
            const re = new RegExp(src, flags);
            let out = "";
            for (const ch of value) {
                const candidate = out + ch;
                re.lastIndex = 0;
                if (re.test(candidate))
                    out = candidate;
            }
            return out;
        }
        static {
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
    });
    return _classThis;
})();
function turboInput(properties) {
    properties.element = properties.input;
    properties.elementTag = properties.inputTag;
    if (!properties.elementTag)
        properties.elementTag = "input";
    if (!properties.element)
        properties.element = {};
    if (!properties.tag)
        properties.tag = "turbo-input";
    return richElement({ ...properties, input: undefined, inputTag: undefined });
}

let TurboNumericalInput = (() => {
    let _classDecorators = [define("turbo-numerical-input")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboInput;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
        multiplier = 1;
        decimalPlaces;
        min;
        max;
        get value() {
            return Number.parseFloat(this.element.value) / this.multiplier;
        }
        set value(value) {
            if (!value || value == "")
                value = 0;
            if (typeof value == "string")
                value = Number.parseFloat(value);
            value *= this.multiplier;
            if (this.min != undefined && value < this.min)
                value = this.min;
            if (this.max != undefined && value > this.max)
                value = this.max;
            if (this.decimalPlaces != undefined) {
                value = Math.round(value * Math.pow(10, this.decimalPlaces)) / Math.pow(10, this.decimalPlaces);
            }
            super.value = value;
        }
    });
    return _classThis;
})();
function numericalInput(properties) {
    if (!properties.inputRegexCheck)
        properties.inputRegexCheck = /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?\.?$|^-$|^$/;
    if (!properties.blurRegexCheck)
        properties.blurRegexCheck = /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;
    if (!properties.tag)
        properties.tag = "turbo-numerical-input";
    return turboInput({ ...properties });
}

class TurboSelectInputEvent extends TurboEvent {
    toggledEntry;
    values;
    constructor(properties) {
        super(properties);
        this.toggledEntry = properties.toggledEntry;
        this.values = properties.values;
    }
}

/**
 * @class TurboBaseElement
 * @description TurboHeadlessElement class, similar to TurboElement but without extending HTMLElement.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
class TurboBaseElement {
    /**
     * @description Static configuration object.
     */
    static config = {};
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined)
                this.config[key] = val;
        });
    }
}
(() => {
    defineDefaultProperties(TurboBaseElement);
})();

/**
 * Base class for creating a selection menu
 * @class TurboSelect
 * @extends TurboElement
 */
let TurboSelect = (() => {
    let _classSuper = TurboBaseElement;
    let _instanceExtraInitializers = [];
    let _set_parent_decorators;
    let _getValue_decorators;
    let _getValue_initializers = [];
    let _getValue_extraInitializers = [];
    let _getSecondaryValue_decorators;
    let _getSecondaryValue_initializers = [];
    let _getSecondaryValue_extraInitializers = [];
    let _createEntry_decorators;
    let _createEntry_initializers = [];
    let _createEntry_extraInitializers = [];
    let _onEntryAdded_decorators;
    let _onEntryAdded_initializers = [];
    let _onEntryAdded_extraInitializers = [];
    let _onEntryRemoved_decorators;
    let _onEntryRemoved_initializers = [];
    let _onEntryRemoved_extraInitializers = [];
    let _set_multiSelection_decorators;
    let _forceSelection_decorators;
    let _forceSelection_initializers = [];
    let _forceSelection_extraInitializers = [];
    let _selectedEntryClasses_decorators;
    let _selectedEntryClasses_initializers = [];
    let _selectedEntryClasses_extraInitializers = [];
    return class TurboSelect extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_parent_decorators = [auto()];
            _getValue_decorators = [auto({
                    defaultValue: (entry) => entry instanceof TurboRichElement ? entry.text
                        : entry instanceof HTMLElement ? entry.textContent
                            : entry instanceof Element ? entry.innerHTML
                                : undefined
                })];
            _getSecondaryValue_decorators = [auto({ defaultValue: () => "" })];
            _createEntry_decorators = [auto({
                    defaultValue: (value) => richElement({ text: stringify(value) })
                })];
            _onEntryAdded_decorators = [auto({
                    defaultValue: function (entry) {
                        this.initializeSelection();
                        $(entry).on(DefaultEventName.click, () => {
                            this.select(entry, !this.isSelected(entry));
                            return true;
                        });
                    },
                })];
            _onEntryRemoved_decorators = [auto({
                    defaultValue: function (entry) { },
                })];
            _set_multiSelection_decorators = [auto({ defaultValue: false })];
            _forceSelection_decorators = [auto({ defaultValueCallback: function () { return !this.multiSelection; } })];
            _selectedEntryClasses_decorators = [auto({
                    callBefore: function () { this.selectedEntries?.forEach(entry => turbo(entry).removeClass(this.selectedEntryClasses)); },
                    callAfter: function () { this.selectedEntries?.forEach(entry => turbo(entry).addClass(this.selectedEntryClasses)); },
                    initialValueCallback: function () { return this.getPropertiesValue(undefined, "defaultSelectedEntryClasses"); },
                })];
            tslib.__esDecorate(this, null, _set_parent_decorators, { kind: "setter", name: "parent", static: false, private: false, access: { has: obj => "parent" in obj, set: (obj, value) => { obj.parent = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_multiSelection_decorators, { kind: "setter", name: "multiSelection", static: false, private: false, access: { has: obj => "multiSelection" in obj, set: (obj, value) => { obj.multiSelection = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, null, _getValue_decorators, { kind: "field", name: "getValue", static: false, private: false, access: { has: obj => "getValue" in obj, get: obj => obj.getValue, set: (obj, value) => { obj.getValue = value; } }, metadata: _metadata }, _getValue_initializers, _getValue_extraInitializers);
            tslib.__esDecorate(null, null, _getSecondaryValue_decorators, { kind: "field", name: "getSecondaryValue", static: false, private: false, access: { has: obj => "getSecondaryValue" in obj, get: obj => obj.getSecondaryValue, set: (obj, value) => { obj.getSecondaryValue = value; } }, metadata: _metadata }, _getSecondaryValue_initializers, _getSecondaryValue_extraInitializers);
            tslib.__esDecorate(null, null, _createEntry_decorators, { kind: "field", name: "createEntry", static: false, private: false, access: { has: obj => "createEntry" in obj, get: obj => obj.createEntry, set: (obj, value) => { obj.createEntry = value; } }, metadata: _metadata }, _createEntry_initializers, _createEntry_extraInitializers);
            tslib.__esDecorate(null, null, _onEntryAdded_decorators, { kind: "field", name: "onEntryAdded", static: false, private: false, access: { has: obj => "onEntryAdded" in obj, get: obj => obj.onEntryAdded, set: (obj, value) => { obj.onEntryAdded = value; } }, metadata: _metadata }, _onEntryAdded_initializers, _onEntryAdded_extraInitializers);
            tslib.__esDecorate(null, null, _onEntryRemoved_decorators, { kind: "field", name: "onEntryRemoved", static: false, private: false, access: { has: obj => "onEntryRemoved" in obj, get: obj => obj.onEntryRemoved, set: (obj, value) => { obj.onEntryRemoved = value; } }, metadata: _metadata }, _onEntryRemoved_initializers, _onEntryRemoved_extraInitializers);
            tslib.__esDecorate(null, null, _forceSelection_decorators, { kind: "field", name: "forceSelection", static: false, private: false, access: { has: obj => "forceSelection" in obj, get: obj => obj.forceSelection, set: (obj, value) => { obj.forceSelection = value; } }, metadata: _metadata }, _forceSelection_initializers, _forceSelection_extraInitializers);
            tslib.__esDecorate(null, null, _selectedEntryClasses_decorators, { kind: "field", name: "selectedEntryClasses", static: false, private: false, access: { has: obj => "selectedEntryClasses" in obj, get: obj => obj.selectedEntryClasses, set: (obj, value) => { obj.selectedEntryClasses = value; } }, metadata: _metadata }, _selectedEntryClasses_initializers, _selectedEntryClasses_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static config = { defaultSelectedEntryClasses: "selected" };
        _inputField = tslib.__runInitializers(this, _instanceExtraInitializers);
        _entries = [];
        _entriesData = new WeakMap();
        parentObserver;
        onSelectDelegate = new Delegate();
        onEnabledDelegate = new Delegate();
        /**
         * The dropdown's entries.
         */
        get entries() {
            return this._entries;
        }
        set entries(value) {
            this.enableObserver(false);
            const previouslySelectedValues = this.selectedValues;
            this.clear();
            this._entries = (Array.isArray(value) ? value : Array.from(value))
                .filter(entry => entry !== this.inputField);
            if (value instanceof HTMLCollection && value.item(0))
                this.parent = value.item(0).parentElement;
            const array = this.entries;
            for (let i = 0; i < array.length; i++)
                this.onEntryAdded?.call(this, array[i], i);
            this.deselectAll();
            for (let i = 0; i < array.length; i++) {
                if (previouslySelectedValues.includes(this.getValue(array[i])))
                    this.select(array[i]);
            }
            if (this.selectedEntries.length === 0)
                this.initializeSelection();
            this.refreshInputField();
            this.enableObserver(true);
        }
        /**
         * @description The dropdown's values. Setting it will update the dropdown accordingly.
         */
        get values() {
            return this.entries.map(entry => this.getValue(entry));
        }
        set values(values) {
            const entries = [];
            values.forEach(value => {
                const entry = this.createEntry(value);
                if (entry instanceof Node && this.parent)
                    $(this.parent).addChild(entry);
                entries.push(entry);
            });
            this.entries = entries;
        }
        get selectedEntries() {
            return this.entries.filter(entry => this.getEntryData(entry).selected);
        }
        set selectedEntries(value) {
            this.deselectAll();
            if (!value)
                return;
            value.forEach(entry => this.select(entry));
        }
        set parent(value) {
            if (!(value instanceof Element))
                return;
            $(value).addChild(this.entries.filter(entry => entry instanceof Node));
            if (this.inputField)
                value.appendChild(this.inputField);
            this.setupParentObserver();
        }
        getValue = tslib.__runInitializers(this, _getValue_initializers, void 0);
        getSecondaryValue = (tslib.__runInitializers(this, _getValue_extraInitializers), tslib.__runInitializers(this, _getSecondaryValue_initializers, void 0));
        createEntry = (tslib.__runInitializers(this, _getSecondaryValue_extraInitializers), tslib.__runInitializers(this, _createEntry_initializers, void 0));
        onEntryAdded = (tslib.__runInitializers(this, _createEntry_extraInitializers), tslib.__runInitializers(this, _onEntryAdded_initializers, void 0));
        onEntryRemoved = (tslib.__runInitializers(this, _onEntryAdded_extraInitializers), tslib.__runInitializers(this, _onEntryRemoved_initializers, void 0));
        /**
         * The dropdown's underlying hidden input. Might be undefined.
         */
        get inputName() {
            return this.inputField?.name;
        }
        set inputName(value) {
            if (!this._inputField)
                this._inputField = input({
                    value: this.stringSelectedValue,
                    type: "hidden",
                    parent: this.parent ?? document.body
                });
            this.inputField.name = value;
        }
        get inputField() {
            return this._inputField;
        }
        set multiSelection(value) {
            this.forceSelection = !value;
        }
        forceSelection = (tslib.__runInitializers(this, _onEntryRemoved_extraInitializers), tslib.__runInitializers(this, _forceSelection_initializers, void 0));
        set onSelect(value) {
            if (value)
                this.onSelectDelegate.add(value);
        }
        set onEnabled(value) {
            if (value)
                this.onEnabledDelegate.add(value);
        }
        selectedEntryClasses = (tslib.__runInitializers(this, _forceSelection_extraInitializers), tslib.__runInitializers(this, _selectedEntryClasses_initializers, void 0));
        /**
         * @description Dropdown constructor
         * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
         */
        constructor(properties = {}) {
            super();
            tslib.__runInitializers(this, _selectedEntryClasses_extraInitializers);
            const selectedValues = properties.selectedValues || [];
            properties.selectedValues = undefined;
            if (!properties.onEnabled)
                properties.onEnabled = (b, entry) => {
                    if (!(entry instanceof HTMLElement))
                        return;
                    $(entry).setStyle("visibility", b ? "" : "hidden");
                };
            for (const property of Object.keys(properties)) {
                try {
                    this[property] = properties[property];
                }
                catch { }
            }
            if (!this.forceSelection)
                this.deselectAll();
            this.entries.forEach(entry => {
                if (selectedValues.includes(this.getValue(entry))) {
                    this.select(entry);
                }
            });
        }
        getEntryData(entry) {
            if (!entry)
                return {};
            let data = this._entriesData.get(entry);
            if (!data) {
                data = { selected: false, enabled: true };
                this._entriesData.set(entry, data);
            }
            return data;
        }
        clearEntryData(entry) {
            this._entriesData.delete(entry);
            const index = this.entries.indexOf(entry);
            if (index >= 0)
                this.entries.splice(index, 1);
        }
        addEntry(entry, index = this.entries.length) {
            if (index === undefined || typeof index !== "number" || index > this.entries.length)
                index = this.entries.length;
            if (index < 0)
                index = 0;
            this.enableObserver(false);
            this.onEntryAdded?.call(this, entry, index);
            if (Array.isArray(this.entries) && !this.entries.includes(entry))
                this.entries.splice(index, 0, entry);
            if (entry instanceof Node && !entry.parentElement && this.parent)
                $(this.parent).addChild(entry, index);
            this.enableObserver(true);
            requestAnimationFrame(() => this.select(this.selectedEntry));
        }
        getEntryFromSecondaryValue(value) {
            return this.entries.find((entry) => this.getSecondaryValue(entry) === value);
        }
        isSelected(entry) {
            return this.selectedEntries.includes(entry);
        }
        getEntry(value) {
            let entry;
            try {
                const fromValue = this.find(value);
                if (fromValue)
                    entry = fromValue;
                else {
                    const isEntry = this.entries.find(entry => entry === value);
                    if (isEntry)
                        entry = isEntry;
                }
            }
            catch { }
            return entry;
        }
        /**
         * @description Select an entry.
         * @param {string | EntryType} value - The DropdownEntry (or its string value) to select.
         * @param selected
         * @return {TurboSelect} - This Dropdown for chaining.
         */
        select(value, selected = true) {
            if (isNull(value) || isUndefined(value))
                return this;
            let entry;
            try {
                const fromValue = this.getEntry(value);
                if (fromValue)
                    entry = fromValue;
                else {
                    const isEntry = this.entries.find(entry => entry === value);
                    if (isEntry)
                        entry = isEntry;
                }
            }
            catch { }
            if (!entry)
                return this;
            const wasSelected = this.isSelected(entry);
            if (selected === wasSelected)
                return this;
            if (!selected && wasSelected && this.selectedEntries.length <= 1 && this.forceSelection)
                return this;
            if (!this.multiSelection)
                this.deselectAll();
            this.getEntryData(entry).selected = selected;
            if (entry instanceof HTMLElement)
                $(entry).toggleClass(this.selectedEntryClasses, selected);
            this.initializeSelection();
            this.refreshInputField();
            this.onSelectDelegate.fire(selected, entry, this.getIndex(entry));
            (this.parent ?? document).dispatchEvent(new TurboSelectInputEvent({
                toggledEntry: entry,
                values: this.selectedValues
            }));
            return this;
        }
        /**
         * @description Select an entry.
         * @param {number} index - The index of the entry to select
         * @param {(index: number, entriesCount: number, zero?: number) => number} [preprocess=trim] - Callback to execute
         * on the index to preprocess it. Defaults to trim().
         * @return {TurboSelect} - This Dropdown for chaining.
         */
        selectByIndex(index, preprocess = trim) {
            index = preprocess(index, this.entries.length - 1, 0);
            return this.select(this.entries[index]);
        }
        getIndex(entry) {
            return this.entries.indexOf(entry);
        }
        deselectAll() {
            this.selectedEntries.forEach(entry => {
                if (entry instanceof HTMLElement)
                    $(entry).toggleClass(this.selectedEntryClasses, false);
                this.getEntryData(entry).selected = false;
            });
            this.refreshInputField();
        }
        reset() {
            this.deselectAll();
            // todo this.onEntryClick(this.enabledEntries[0]);
        }
        get enabledEntries() {
            return this.entries.filter(entry => this.getEntryData(entry).enabled);
        }
        get enabledValues() {
            return this.enabledEntries.map(entry => this.getValue(entry));
        }
        get enabledSecondaryValues() {
            return this.enabledEntries.map(entry => this.getSecondaryValue(entry));
        }
        find(value) {
            return this.entries.find((entry) => this.getValue(entry) === value);
        }
        findBySecondaryValue(value) {
            return this.entries.find((entry) => this.getSecondaryValue(entry) === value);
        }
        findAll(...values) {
            return this.entries.filter(entry => values.includes(this.getValue(entry)));
        }
        findAllBySecondaryValue(...values) {
            return this.entries.filter((entry) => values.includes(this.getSecondaryValue(entry)));
        }
        enable(b, ...entries) {
            if (!entries || entries.length === 0)
                entries = this.entries;
            entries.forEach(value => {
                const entry = this.getEntry(value);
                if (!entry)
                    return;
                this.getEntryData(entry).enabled = b;
                this.onEnabledDelegate.fire(b, entry, this.getIndex(entry));
            });
        }
        /**
         * @description The dropdown's currently selected entries
         */
        get selectedEntry() {
            return this.selectedEntries[0];
        }
        /**
         * @description The dropdown's currently selected values
         */
        get selectedValues() {
            return this.selectedEntries.map(entry => this.getValue(entry));
        }
        get selectedValue() {
            const selectedEntry = this.selectedEntry;
            if (!selectedEntry)
                return;
            return this.getValue(selectedEntry);
        }
        get selectedSecondaryValues() {
            return this.selectedEntries.map(entry => this.getSecondaryValue(entry));
        }
        get selectedSecondaryValue() {
            const selectedEntry = this.selectedEntry;
            if (!selectedEntry)
                return;
            return this.getSecondaryValue(selectedEntry);
        }
        get stringSelectedValue() {
            return this.selectedEntries.map(entry => stringify(this.getValue(entry))).join(", ");
        }
        clear() {
            this.enableObserver(false);
            for (const entry of this.entries) {
                this.clearEntryData(entry);
                this.onEntryRemoved(entry);
                if (this.parent && entry instanceof HTMLElement)
                    entry.remove();
            }
            this._entries = [];
            this.refreshInputField();
            this.enableObserver(true);
        }
        refreshInputField() {
            if (this.inputField)
                this.inputField.value = this.stringSelectedValue;
        }
        destroy() {
            this.enableObserver(false);
            this.parentObserver = null;
            return this;
        }
        enableObserver(value) {
            if (!value)
                return this.parentObserver?.disconnect();
            if (this.parent instanceof Element && this.parentObserver)
                this.parentObserver.observe(this.parent, { childList: true });
        }
        initializeSelection() {
            if (this.forceSelection && this.enabledEntries.length && this.selectedEntries.length === 0) {
                const fallback = this.enabledEntries[0];
                if (fallback)
                    this.select(fallback);
            }
        }
        setupParentObserver() {
            this.enableObserver(false);
            this.parentObserver = new MutationObserver(records => {
                for (const record of records) {
                    for (const node of record.addedNodes) {
                        if (!(node instanceof Element) || node.parentElement !== this.parent)
                            continue;
                        if (node === this.inputField)
                            continue;
                        const entry = node;
                        const children = Array.from(this.parent.children)
                            .filter(el => el !== this.inputField)
                            .filter(el => this.entries.includes(el) || el === entry);
                        const targetIndex = children.indexOf(entry);
                        if (targetIndex < 0)
                            continue;
                        if (targetIndex === 0)
                            this.entries.splice(targetIndex, 0, entry);
                        else {
                            const previousIndex = this.entries.indexOf(children[targetIndex - 1]);
                            this.entries.splice(previousIndex + 1, 0, entry);
                        }
                        this.getEntryData(entry);
                        this.onEntryAdded?.call(this, entry, this.getIndex(entry));
                    }
                    for (const node of record.removedNodes) {
                        if (!(node instanceof Element))
                            continue;
                        if (node === this.inputField)
                            continue;
                        queueMicrotask(() => {
                            if (node.isConnected)
                                return;
                            const data = this.getEntryData(node);
                            if (data.selected && this.forceSelection && this.enabledEntries.length) {
                                const fallback = this.enabledEntries[0];
                                if (fallback)
                                    this.select(fallback);
                            }
                            data.selected = false;
                            this.onEntryRemoved?.call(this, node);
                            this.clearEntryData(node);
                        });
                    }
                }
            });
            this.enableObserver(true);
        }
    };
})();

var css_248z$2 = ".turbo-drawer{align-items:center;direction:ltr;display:inline-flex}.turbo-drawer-panel-container{align-items:center;display:flex;overflow:hidden;position:relative}.turbo-drawer-thumb{display:inline-block;position:relative}.top-drawer .turbo-drawer-panel-container,.turbo-drawer.top-drawer{flex-direction:column}.bottom-drawer .turbo-drawer-panel-container,.turbo-drawer.bottom-drawer{flex-direction:column-reverse}.left-drawer .turbo-drawer-panel-container,.turbo-drawer.left-drawer{flex-direction:row}.right-drawer .turbo-drawer-panel-container,.turbo-drawer.right-drawer{flex-direction:row-reverse}";
styleInject(css_248z$2);

//@ts-nocheck
/**
 * @class Reifect
 * @description A class to manage and apply dynamic properties, styles, classes, and transitions to a
 * set of objects.
 *
 * @template {object} ClassType - The object type this reifier will be applied to.
 */
class Reifect extends StatefulReifect {
    /**
     * @description Creates an instance of StatefulReifier.
     * @param {StatelessReifectProperties<ClassType>} properties - The configuration properties.
     */
    constructor(properties) {
        properties.states = [""];
        super(properties);
    }
    /**
     * @description The properties to be assigned to the objects. It could take:
     * - A record of `{key: value}` pairs.
     * - An interpolation function that would return a record of `{key: value}` pairs.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get properties() {
        const properties = super.properties;
        if (typeof properties == "object" && "" in properties)
            return properties[""];
        else
            return properties;
    }
    set properties(value) {
        super.properties = value;
    }
    /**
     * @description The styles to be assigned to the objects (only if they are eligible elements). It could take:
     * - A record of `{CSS property: value}` pairs.
     * - An interpolation function that would return a record of `{key: value}` pairs.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get styles() {
        const styles = super.styles;
        if (typeof styles == "object" && "" in styles)
            return styles[""];
        else
            return styles;
    }
    set styles(value) {
        super.styles = value;
    }
    /**
     * @description The classes to be assigned to the objects (only if they are eligible elements). It could take:
     * - A string of space-separated classes.
     * - An array of classes.
     * - An interpolation function that would return a string of space-separated classes or an array of classes.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get classes() {
        const classes = super.classes;
        if (typeof classes == "object" && "" in classes)
            return classes[""];
        else
            return classes;
    }
    set classes(value) {
        super.classes = value;
    }
    /**
     * @description The object that should replace (in the DOM as well if eligible) the attached objects. It could take:
     * - The object to be replaced with.
     * - An interpolation function that would return the object to be replaced with.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get replaceWith() {
        const replaceWith = super.replaceWith;
        if (typeof replaceWith == "object" && "" in replaceWith)
            return replaceWith[""];
        else
            return replaceWith;
    }
    set replaceWith(value) {
        super.replaceWith = value;
    }
    set transition(value) {
        super.transition = value;
    }
    /**
     * @description The property(ies) to apply a CSS transition on, on the attached objects. Defaults to "all". It
     * could take:
     * - A string of space-separated CSS properties.
     * - An array of CSS properties.
     * - An interpolation function that would return a string of space-separated CSS properties or an array of
     * CSS properties.
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get transitionProperties() {
        const transitionProperties = super.transitionProperties;
        if (typeof transitionProperties == "object" && "" in transitionProperties)
            return transitionProperties[""];
        else
            return transitionProperties;
    }
    set transitionProperties(value) {
        super.transitionProperties = value;
    }
    /**
     * @description The duration of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
     * - A numerical value (in seconds).
     * - An interpolation function that would return a duration (number in seconds).
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get transitionDuration() {
        const transitionDuration = super.transitionDuration;
        if (typeof transitionDuration == "object" && "" in transitionDuration)
            return transitionDuration[""];
        else
            return transitionDuration;
    }
    set transitionDuration(value) {
        super.transitionDuration = value;
    }
    /**
     * @description The timing function of the CSS transition to apply on the attached objects. Defaults to "linear."
     * It could take:
     * - A string representing the timing function to apply.
     * - An interpolation function that would return a timing function (string).
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get transitionTimingFunction() {
        const transitionTimingFunction = super.transitionTimingFunction;
        if (typeof transitionTimingFunction == "object" && "" in transitionTimingFunction)
            return transitionTimingFunction[""];
        else
            return transitionTimingFunction;
    }
    set transitionTimingFunction(value) {
        super.transitionTimingFunction = value;
    }
    /**
     * @description The delay of the CSS transition to apply on the attached objects. Defaults to 0. It could take:
     * - A numerical value (in seconds).
     * - An interpolation function that would return a delay (number in seconds).
     *
     * The interpolation function would take as arguments:
     * - `index: number`: the index of the object in the applied list.
     * - `total: number`: the total number of objects in the applied list.
     * - `object: ClassType`: the object itself.
     */
    get transitionDelay() {
        const transitionDelay = super.transitionDelay;
        if (typeof transitionDelay == "object" && "" in transitionDelay)
            return transitionDelay[""];
        else
            return transitionDelay;
    }
    set transitionDelay(value) {
        super.transitionDelay = value;
    }
    initialize(objects, options) {
        super.initialize("", objects, options);
    }
    apply(objects, options) {
        super.apply("", objects, options);
    }
}
function reifect(properties) {
    return new Reifect(properties);
}

//TODO TRY TO SEE IF HIDDEN OVERFLOW ELEMENT CAN CONTAIN ELEMENT THAT OVERFLOWS PAST PARENT
let TurboDrawer = (() => {
    let _classDecorators = [define("turbo-drawer")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    let _instanceExtraInitializers = [];
    let _set_thumb_decorators;
    let _set_panel_decorators;
    let _set_icon_decorators;
    let _set_hideOverflow_decorators;
    let _set_attachSideToIconName_decorators;
    let _set_rotateIconBasedOnSide_decorators;
    let _set_side_decorators;
    let _set_offset_decorators;
    let _set_open_decorators;
    let _set_translation_decorators;
    let _transition_decorators;
    let _transition_initializers = [];
    let _transition_extraInitializers = [];
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_thumb_decorators = [auto({
                    setIfUndefined: true,
                    callBefore: function () { if (this.thumb)
                        $(this).remChild(this.thumb); },
                    preprocessValue: (value) => value instanceof HTMLElement ? value : div(value)
                })];
            _set_panel_decorators = [auto({
                    setIfUndefined: true,
                    callBefore: function () { if (this.panel)
                        $(this).remChild(this.panel); console.log("EWFFEWFWWWWWWWWWWWWWW"); },
                    preprocessValue: (value) => value instanceof HTMLElement ? value : div(value)
                })];
            _set_icon_decorators = [auto({
                    callBefore: function () { if (this.icon?.parentElement === this.thumb)
                        this.thumb.removeChild(this.icon); },
                    preprocessValue: function (value) {
                        if (value instanceof Element)
                            return value;
                        if (typeof value === "string" && !this.attachSideToIconName && !this.rotateIconBasedOnSide)
                            this.attachSideToIconName = true;
                        return iconSwitch(typeof value === "object" ? value : {
                            icon: value,
                            switchReifect: { states: Object.values(exports.Side) },
                            defaultState: this.open ? this.getOppositeSide() : this.side,
                            appendStateToIconName: this.attachSideToIconName,
                        });
                    }
                })];
            _set_hideOverflow_decorators = [auto({ defaultValue: false })];
            _set_attachSideToIconName_decorators = [auto({ defaultValue: false })];
            _set_rotateIconBasedOnSide_decorators = [auto({ defaultValue: false })];
            _set_side_decorators = [auto({ defaultValue: exports.Side.bottom, cancelIfUnchanged: false })];
            _set_offset_decorators = [auto({
                    defaultValue: { open: 0, closed: 0 },
                    preprocessValue: (value) => typeof value === "number" ? { open: value, closed: value } : {
                        open: value?.open || 0,
                        closed: value?.closed || 0
                    }
                })];
            _set_open_decorators = [auto({ defaultValue: false })];
            _set_translation_decorators = [auto()];
            _transition_decorators = [auto({
                    defaultValueCallback: function () {
                        return new Reifect({
                            transitionProperties: ["transform", this.isVertical ? "height" : "width"],
                            transitionDuration: 0.2,
                            transitionTimingFunction: "ease-out",
                        });
                    },
                    callAfter: function () { this.transition.attachAll(this, this.panelContainer); },
                })];
            tslib.__esDecorate(this, null, _set_thumb_decorators, { kind: "setter", name: "thumb", static: false, private: false, access: { has: obj => "thumb" in obj, set: (obj, value) => { obj.thumb = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_panel_decorators, { kind: "setter", name: "panel", static: false, private: false, access: { has: obj => "panel" in obj, set: (obj, value) => { obj.panel = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_icon_decorators, { kind: "setter", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_hideOverflow_decorators, { kind: "setter", name: "hideOverflow", static: false, private: false, access: { has: obj => "hideOverflow" in obj, set: (obj, value) => { obj.hideOverflow = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_attachSideToIconName_decorators, { kind: "setter", name: "attachSideToIconName", static: false, private: false, access: { has: obj => "attachSideToIconName" in obj, set: (obj, value) => { obj.attachSideToIconName = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_rotateIconBasedOnSide_decorators, { kind: "setter", name: "rotateIconBasedOnSide", static: false, private: false, access: { has: obj => "rotateIconBasedOnSide" in obj, set: (obj, value) => { obj.rotateIconBasedOnSide = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_side_decorators, { kind: "setter", name: "side", static: false, private: false, access: { has: obj => "side" in obj, set: (obj, value) => { obj.side = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_offset_decorators, { kind: "setter", name: "offset", static: false, private: false, access: { has: obj => "offset" in obj, set: (obj, value) => { obj.offset = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_open_decorators, { kind: "setter", name: "open", static: false, private: false, access: { has: obj => "open" in obj, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_translation_decorators, { kind: "setter", name: "translation", static: false, private: false, access: { has: obj => "translation" in obj, set: (obj, value) => { obj.translation = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, null, _transition_decorators, { kind: "field", name: "transition", static: false, private: false, access: { has: obj => "transition" in obj, get: obj => obj.transition, set: (obj, value) => { obj.transition = value; } }, metadata: _metadata }, _transition_initializers, _transition_extraInitializers);
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
        _panelContainer = tslib.__runInitializers(this, _instanceExtraInitializers);
        get panelContainer() { return this._panelContainer; }
        dragging = false;
        animationOn = false;
        resizeObserver;
        set thumb(value) {
            $(value).addClass("turbo-drawer-thumb");
            if (this.initialized)
                this.setupUILayout();
        }
        get thumb() { return; }
        set panel(value) {
            console.log("WEEWFEFEFEFEFFEWFWEFEWFEW");
            $(value).addClass("turbo-drawer-panel");
            if (this.initialized)
                this.setupUILayout();
        }
        get panel() { return; }
        set icon(_value) {
            if (this.initialized)
                this.setupUILayout();
        }
        get icon() { return; }
        set hideOverflow(value) {
            $(this.panelContainer).setStyle("overflow", value ? "hidden" : "");
        }
        set attachSideToIconName(value) {
            if (this.icon instanceof TurboIconSwitch)
                this.icon.appendStateToIconName = value;
            if (value)
                this.rotateIconBasedOnSide = false;
        }
        set rotateIconBasedOnSide(value) {
            if (value)
                this.attachSideToIconName = false;
            if (this.icon instanceof TurboIconSwitch)
                this.icon.switchReifect.styles = {
                    top: "transform: rotate(180deg)",
                    bottom: "transform: rotate(0deg)",
                    left: "transform: rotate(90deg)",
                    right: "transform: rotate(270deg)",
                };
        }
        set side(value) {
            $(this).toggleClass("top-drawer", value == exports.Side.top);
            $(this).toggleClass("bottom-drawer", value == exports.Side.bottom);
            $(this).toggleClass("left-drawer", value == exports.Side.left);
            $(this).toggleClass("right-drawer", value == exports.Side.right);
            this.refresh();
        }
        set offset(value) { }
        get offset() { return; }
        get isVertical() {
            return this.side == exports.Side.top || this.side == exports.Side.bottom;
        }
        set open(value) {
            if (value)
                this.resizeObserver?.observe(this.panel, { box: "border-box" });
            else
                this.resizeObserver?.unobserve(this.panel);
            this.refresh();
        }
        set translation(value) {
            switch (this.side) {
                case exports.Side.top:
                    if (this.hideOverflow)
                        $(this.panelContainer).setStyle("height", value + "px");
                    else
                        $(this).setStyle("transform", `translateY(${-value}px)`);
                    break;
                case exports.Side.bottom:
                    if (this.hideOverflow)
                        $(this.panelContainer).setStyle("height", value + "px");
                    else
                        $(this).setStyle("transform", `translateY(${-value}px)`);
                    break;
                case exports.Side.left:
                    if (this.hideOverflow)
                        $(this.panelContainer).setStyle("width", value + "px");
                    else
                        $(this).setStyle("transform", `translateX(${-value}px)`);
                    break;
                case exports.Side.right:
                    if (this.hideOverflow)
                        $(this.panelContainer).setStyle("width", value + "px");
                    else
                        $(this).setStyle("transform", `translateX(${-value}px)`);
                    break;
            }
        }
        transition = tslib.__runInitializers(this, _transition_initializers, void 0);
        get translation() { return; }
        initialize() {
            super.initialize();
            this.transition.attachAll(this, this.panelContainer);
            // this.resizeObserver = new ResizeObserver(entries => {
            //     if (!this.open || this.dragging) return;
            //     requestAnimationFrame(() => {
            //         const isVertical = this.isVertical;
            //         const size1 = getSize(entries[0], isVertical);
            //         requestAnimationFrame(() => {
            //             const size2 = getSize(entries[0], isVertical);
            //             console.log(size1, size2);
            //             if (size1 !== size2) return;
            //             this.translation = (this.open ? this.offset.open : this.offset.closed) + size2;
            //         });
            //     });
            // });
            this.animationOn = true;
        }
        setupUIElements() {
            super.setupUIElements();
            this._panelContainer = div({ classes: "turbo-drawer-panel-container" });
        }
        setupUILayout() {
            super.setupUILayout();
            $(this).childHandler = this;
            $(this.panel).addChild($(this).childrenArray.filter(el => el !== this.panelContainer));
            $(this).addChild([this.thumb, this.panelContainer]);
            $(this.panelContainer).addChild(this.panel);
            $(this.thumb).addChild(this.icon);
            $(this).childHandler = this.panel;
        }
        setupUIListeners() {
            this.thumb.addEventListener(DefaultEventName.click, (e) => {
                e.stopImmediatePropagation();
                this.open = !this.open;
            });
            this.thumb.addEventListener(TurboEventName.dragStart, (e) => {
                e.stopImmediatePropagation();
                this.dragging = true;
                if (this.animationOn)
                    this.transition.enabled = false;
            });
            this.thumb.addEventListener(TurboEventName.drag, (e) => {
                if (!this.dragging)
                    return;
                e.stopImmediatePropagation();
                this.translation += this.isVertical ? e.scaledDeltaPosition.y : e.scaledDeltaPosition.x;
            });
            this.thumb.addEventListener(TurboEventName.dragEnd, (e) => {
                if (!this.dragging)
                    return;
                e.stopImmediatePropagation();
                this.dragging = false;
                const delta = e.positions.first.sub(e.origins.first);
                switch (this.side) {
                    case exports.Side.top:
                        if (this.open && delta.y > 100)
                            this.open = false;
                        else if (!this.open && delta.y < -100)
                            this.open = true;
                        break;
                    case exports.Side.bottom:
                        if (this.open && delta.y < -100)
                            this.open = false;
                        else if (!this.open && delta.y > 100)
                            this.open = true;
                        break;
                    case exports.Side.left:
                        if (this.open && delta.x > 100)
                            this.open = false;
                        else if (!this.open && delta.x < -100)
                            this.open = true;
                        break;
                    case exports.Side.right:
                        if (this.open && delta.x < -100)
                            this.open = false;
                        else if (!this.open && delta.x > 100)
                            this.open = true;
                        break;
                }
                this.refresh();
            });
        }
        getOppositeSide(side = this.side) {
            switch (side) {
                case exports.Side.top:
                    return exports.Side.bottom;
                case exports.Side.bottom:
                    return exports.Side.top;
                case exports.Side.left:
                    return exports.Side.right;
                case exports.Side.right:
                    return exports.Side.left;
            }
        }
        getAdjacentSide(side = this.side) {
            switch (side) {
                case exports.Side.top:
                    return exports.Side.right;
                case exports.Side.bottom:
                    return exports.Side.left;
                case exports.Side.left:
                    return exports.Side.top;
                case exports.Side.right:
                    return exports.Side.bottom;
            }
        }
        refresh() {
            if (this.animationOn) {
                this.transition.enabled = true;
                this.transition.apply();
            }
            if (this.hideOverflow)
                $(this.panel).setStyle("position", "absolute", true);
            if (this.icon instanceof TurboIconSwitch)
                this.icon.switchReifect.apply(this.open ? this.getOppositeSide() : this.side);
            requestAnimationFrame(() => {
                this.translation = (this.open ? this.offset.open : this.offset.closed)
                    + (this.open ? (this.isVertical ? this.panel.offsetHeight : this.panel.offsetWidth) : 0);
                if (this.hideOverflow)
                    $(this.panel).setStyle("position", "relative", true);
            });
        }
        constructor() {
            super(...arguments);
            tslib.__runInitializers(this, _transition_extraInitializers);
        }
    });
    return _classThis;
})();
function drawer(properties) {
    if (!properties.tag)
        properties.tag = "turbo-drawer";
    return element({ ...properties, text: undefined });
}

exports.PopupFallbackMode = void 0;
(function (PopupFallbackMode) {
    PopupFallbackMode["invert"] = "invert";
    PopupFallbackMode["offset"] = "offset";
    PopupFallbackMode["none"] = "none";
})(exports.PopupFallbackMode || (exports.PopupFallbackMode = {}));

var css_248z$1 = "#turbo-popup-parent-element{display:block;left:0;position:fixed;top:0;z-index:1000}.turbo-popup{display:block;inset:auto;overflow:auto;position:fixed}";
styleInject(css_248z$1);

let TurboPopup = (() => {
    let _classDecorators = [define("turbo-popup")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    let _instanceExtraInitializers = [];
    let _static_parentElement_decorators;
    let _static_parentElement_initializers = [];
    let _static_parentElement_extraInitializers = [];
    let _anchor_decorators;
    let _anchor_initializers = [];
    let _anchor_extraInitializers = [];
    let _set_popupPosition_decorators;
    let _set_anchorPosition_decorators;
    let _set_viewportMargin_decorators;
    let _set_offsetFromAnchor_decorators;
    let _set_fallbackModes_decorators;
    let _get_rect_decorators;
    let _get_anchorRect_decorators;
    let _get_computedStyle_decorators;
    let _get_anchorComputedStyle_decorators;
    let _get_computedMargins_decorators;
    var TurboPopup = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _static_parentElement_decorators = [auto({ defaultValue: div({ parent: document.body, id: "turbo-popup-parent-element" }) })];
            _anchor_decorators = [auto({ defaultValue: document.body })];
            _set_popupPosition_decorators = [auto({
                    initialValueCallback: function () {
                        return this.getPropertiesValue(undefined, "defaultPopupAnchor", { x: 50, y: 0 });
                    },
                    preprocessValue: (value) => new Point(value).bound(0, 100)
                })];
            _set_anchorPosition_decorators = [auto({
                    initialValueCallback: function () {
                        return this.getPropertiesValue(undefined, "defaultAnchorPosition", { x: 50, y: 100 });
                    },
                    preprocessValue: (value) => new Point(value).bound(0, 100)
                })];
            _set_viewportMargin_decorators = [auto({
                    initialValueCallback: function () { return this.getPropertiesValue(undefined, "defaultViewportMargin", 0); },
                    preprocessValue: (value) => new Point(value)
                })];
            _set_offsetFromAnchor_decorators = [auto({
                    initialValueCallback: function () { return this.getPropertiesValue(undefined, "defaultOffsetFromAnchor", 0); },
                    preprocessValue: (value) => new Point(value)
                })];
            _set_fallbackModes_decorators = [auto({
                    preprocessValue: (value) => {
                        return typeof value !== "object" ? { x: value, y: value } : value;
                    },
                    initialValueCallback: function () {
                        return {
                            x: Math.abs(this.anchorPosition.x - 50) > 25 ? exports.PopupFallbackMode.invert : exports.PopupFallbackMode.offset,
                            y: Math.abs(this.anchorPosition.y - 50) > 25 ? exports.PopupFallbackMode.invert : exports.PopupFallbackMode.offset,
                        };
                    }
                })];
            _get_rect_decorators = [cache({ clearOnNextFrame: true })];
            _get_anchorRect_decorators = [cache({ clearOnNextFrame: true })];
            _get_computedStyle_decorators = [cache({ clearOnNextFrame: true })];
            _get_anchorComputedStyle_decorators = [cache({ clearOnNextFrame: true })];
            _get_computedMargins_decorators = [cache({ clearOnNextFrame: true })];
            tslib.__esDecorate(this, null, _set_popupPosition_decorators, { kind: "setter", name: "popupPosition", static: false, private: false, access: { has: obj => "popupPosition" in obj, set: (obj, value) => { obj.popupPosition = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_anchorPosition_decorators, { kind: "setter", name: "anchorPosition", static: false, private: false, access: { has: obj => "anchorPosition" in obj, set: (obj, value) => { obj.anchorPosition = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_viewportMargin_decorators, { kind: "setter", name: "viewportMargin", static: false, private: false, access: { has: obj => "viewportMargin" in obj, set: (obj, value) => { obj.viewportMargin = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_offsetFromAnchor_decorators, { kind: "setter", name: "offsetFromAnchor", static: false, private: false, access: { has: obj => "offsetFromAnchor" in obj, set: (obj, value) => { obj.offsetFromAnchor = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_fallbackModes_decorators, { kind: "setter", name: "fallbackModes", static: false, private: false, access: { has: obj => "fallbackModes" in obj, set: (obj, value) => { obj.fallbackModes = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_rect_decorators, { kind: "getter", name: "rect", static: false, private: false, access: { has: obj => "rect" in obj, get: obj => obj.rect }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_anchorRect_decorators, { kind: "getter", name: "anchorRect", static: false, private: false, access: { has: obj => "anchorRect" in obj, get: obj => obj.anchorRect }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_computedStyle_decorators, { kind: "getter", name: "computedStyle", static: false, private: false, access: { has: obj => "computedStyle" in obj, get: obj => obj.computedStyle }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_anchorComputedStyle_decorators, { kind: "getter", name: "anchorComputedStyle", static: false, private: false, access: { has: obj => "anchorComputedStyle" in obj, get: obj => obj.anchorComputedStyle }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _get_computedMargins_decorators, { kind: "getter", name: "computedMargins", static: false, private: false, access: { has: obj => "computedMargins" in obj, get: obj => obj.computedMargins }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, null, _static_parentElement_decorators, { kind: "field", name: "parentElement", static: true, private: false, access: { has: obj => "parentElement" in obj, get: obj => obj.parentElement, set: (obj, value) => { obj.parentElement = value; } }, metadata: _metadata }, _static_parentElement_initializers, _static_parentElement_extraInitializers);
            tslib.__esDecorate(null, null, _anchor_decorators, { kind: "field", name: "anchor", static: false, private: false, access: { has: obj => "anchor" in obj, get: obj => obj.anchor, set: (obj, value) => { obj.anchor = value; } }, metadata: _metadata }, _anchor_initializers, _anchor_extraInitializers);
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TurboPopup = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static config = {
            ...TurboElement.config,
            defaultPopupPosition: { x: 0, y: -100 },
            defaultAnchorPosition: { x: 0, y: 100 },
            defaultViewportMargin: 4,
            defaultOffsetFromAnchor: { x: 0, y: 4 }
        };
        static parentElement = tslib.__runInitializers(_classThis, _static_parentElement_initializers, void 0);
        anchor = (tslib.__runInitializers(this, _instanceExtraInitializers), tslib.__runInitializers(this, _anchor_initializers, void 0));
        set popupPosition(value) { }
        get popupPosition() { return; }
        set anchorPosition(value) { }
        get anchorPosition() { return; }
        set viewportMargin(value) { }
        get viewportMargin() { return; }
        set offsetFromAnchor(value) { }
        get offsetFromAnchor() { return; }
        set fallbackModes(value) { }
        get fallbackModes() { return; }
        get rect() {
            return this.getBoundingClientRect();
        }
        get anchorRect() {
            return this.anchor.getBoundingClientRect();
        }
        get computedStyle() {
            return window.getComputedStyle(this);
        }
        get anchorComputedStyle() {
            return window.getComputedStyle(this.anchor);
        }
        get computedMargins() {
            return {
                x: parseFloat(this.computedStyle.marginLeft) + parseFloat(this.computedStyle.marginRight),
                y: parseFloat(this.computedStyle.marginTop) + parseFloat(this.computedStyle.marginBottom)
            };
        }
        initialize() {
            super.initialize();
            this.show(false);
            if (!this.parentElement)
                turbo(this).addToParent(TurboPopup.parentElement);
        }
        setupUIListeners() {
            super.setupUIListeners();
            document.addEventListener(DefaultEventName.scroll, () => this.show(false), { capture: true, passive: true });
            window.addEventListener(DefaultEventName.resize, () => { if (turbo(this).isShown)
                this.recomputePosition(); }, { passive: true });
            turbo(document.body).on(DefaultEventName.click, e => {
                if (!turbo(this).isShown)
                    return;
                const t = e.target;
                if (this.contains(t))
                    return;
                if (this.anchor instanceof Node && this.anchor.contains(t))
                    return;
                this.show(false);
            }, { capture: true });
        }
        recomputePosition() {
            if (!this.anchor)
                return;
            turbo(this).setStyles({ maxHeight: "", maxWidth: "" }, true);
            const left = this.computeAxis(exports.Direction.horizontal);
            const top = this.computeAxis(exports.Direction.vertical);
            turbo(this).setStyles({ left: `${left}px`, top: `${top}px` });
            const maxWidth = Math.max(0, Math.min(window.innerWidth - 2 * this.viewportMargin.x, window.innerWidth - 2 * this.viewportMargin.x - this.computedMargins.x));
            const maxHeight = Math.max(0, Math.min(window.innerHeight - 2 * this.viewportMargin.y, window.innerHeight - 2 * this.viewportMargin.y - this.computedMargins.y));
            turbo(this).setStyle("maxWidth", `${maxWidth}px`);
            turbo(this).setStyle("maxHeight", `${maxHeight}px`);
        }
        computeAxis(direction) {
            const axis = direction === exports.Direction.horizontal ? "x" : "y";
            const sizeAxis = direction === exports.Direction.horizontal ? "width" : "height";
            const viewportSize = direction === exports.Direction.horizontal ? window.innerWidth : window.innerHeight;
            const parentStart = this.anchorRect[direction === exports.Direction.horizontal ? "left" : "top"];
            const popupSize = this.rect[sizeAxis] + this.computedMargins[axis];
            const min = this.viewportMargin[axis];
            const max = viewportSize - this.viewportMargin[axis] - popupSize;
            const base = parentStart + (this.anchorRect[sizeAxis] * this.anchorPosition[axis] / 100)
                - (popupSize * this.popupPosition[axis] / 100) + this.offsetFromAnchor[axis];
            const fitsBase = base >= min && base <= max;
            if (fitsBase || this.fallbackModes[axis] === exports.PopupFallbackMode.offset) {
                return Math.min(Math.max(base, min), max);
            }
            const flipped = parentStart + this.anchorRect[sizeAxis] * (1 - this.anchorPosition[axis] / 100)
                - popupSize * (1 - this.popupPosition[axis] / 100) - this.offsetFromAnchor[axis];
            const fitsFlip = flipped >= min && flipped <= max;
            let finalOffset;
            if (fitsFlip)
                finalOffset = flipped;
            else if (fitsBase)
                finalOffset = base;
            else {
                const pick = Math.abs(base - Math.min(Math.max(base, min), max)) <=
                    Math.abs(flipped - Math.min(Math.max(flipped, min), max)) ? base : flipped;
                finalOffset = Math.min(Math.max(pick, min), max);
            }
            return finalOffset;
        }
        show(b) {
            if (b) {
                this.style.visibility = "hidden";
                this.style.display = "";
                this.recomputePosition();
                this.style.visibility = "";
                turbo(this).show(true);
            }
            else {
                turbo(this).setStyles({ maxHeight: "", maxWidth: "" }, true).show(false);
            }
            return this;
        }
        constructor() {
            super(...arguments);
            tslib.__runInitializers(this, _anchor_extraInitializers);
        }
        static {
            tslib.__runInitializers(_classThis, _static_parentElement_extraInitializers);
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return TurboPopup = _classThis;
})();
function popup(properties = {}) {
    return element({ ...properties, text: undefined, tag: "turbo-popup" });
}

var css_248z = "turbo-dropdown{display:inline-block;position:relative}turbo-dropdown>.turbo-popup{background-color:#fff;border:.1em solid #5e5e5e;border-radius:.4em;display:flex;flex-direction:column;overflow:hidden}turbo-dropdown>.turbo-popup>turbo-select-entry{padding:.5em}turbo-dropdown>.turbo-popup>turbo-select-entry:not(:last-child){border-bottom:.1em solid #bdbdbd}turbo-dropdown>turbo-select-entry{padding:.5em .7em;width:100%}turbo-dropdown>turbo-select-entry:hover{background-color:#d7d7d7}turbo-dropdown>turbo-select-entry:not(:last-child){border-bottom:.1em solid #bdbdbd}";
styleInject(css_248z);

/**
 * Dropdown class for creating Turbo button elements.
 * @class TurboDropdown
 * @extends TurboElement
 */
let TurboDropdown = (() => {
    let _classDecorators = [define("turbo-dropdown")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    let _instanceExtraInitializers = [];
    let _selectorTag_decorators;
    let _selectorTag_initializers = [];
    let _selectorTag_extraInitializers = [];
    let _selectorClasses_decorators;
    let _selectorClasses_initializers = [];
    let _selectorClasses_extraInitializers = [];
    let _popupClasses_decorators;
    let _popupClasses_initializers = [];
    let _popupClasses_extraInitializers = [];
    let _entries_decorators;
    let _entries_initializers = [];
    let _entries_extraInitializers = [];
    let _values_decorators;
    let _values_initializers = [];
    let _values_extraInitializers = [];
    let _set_selector_decorators;
    let _set_popup_decorators;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _selectorTag_decorators = [auto({ defaultValueCallback: function () { return this.getPropertiesValue(undefined, "defaultSelectorTag"); } })];
            _selectorClasses_decorators = [auto({
                    defaultValueCallback: function () { return this.getPropertiesValue(undefined, "defaultSelectorClasses"); },
                    callBefore: function () { turbo(this.selector).removeClass(this.selectorClasses); },
                    callAfter: function () { turbo(this.selector).addClass(this.selectorClasses); }
                })];
            _popupClasses_decorators = [auto({
                    defaultValueCallback: function () { return this.getPropertiesValue(undefined, "defaultPopupClasses"); },
                    callBefore: function () { turbo(this.popup).removeClass(this.popupClasses); },
                    callAfter: function () { turbo(this.popup).addClass(this.popupClasses); }
                })];
            _entries_decorators = [expose("select")];
            _values_decorators = [expose("select")];
            _set_selector_decorators = [auto({
                    setIfUndefined: true,
                    preprocessValue: function (value) {
                        if (value instanceof HTMLElement)
                            return value;
                        const text = typeof value === "string" ? value : stringify(this.select.getValue(this.entries[0]));
                        if (this.selector instanceof TurboButton)
                            this.selector.text = text;
                        else
                            return button({ text, elementTag: this.selectorTag });
                    }
                })];
            _set_popup_decorators = [auto({ defaultValueCallback: () => popup() })];
            tslib.__esDecorate(this, null, _set_selector_decorators, { kind: "setter", name: "selector", static: false, private: false, access: { has: obj => "selector" in obj, set: (obj, value) => { obj.selector = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_popup_decorators, { kind: "setter", name: "popup", static: false, private: false, access: { has: obj => "popup" in obj, set: (obj, value) => { obj.popup = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, null, _selectorTag_decorators, { kind: "field", name: "selectorTag", static: false, private: false, access: { has: obj => "selectorTag" in obj, get: obj => obj.selectorTag, set: (obj, value) => { obj.selectorTag = value; } }, metadata: _metadata }, _selectorTag_initializers, _selectorTag_extraInitializers);
            tslib.__esDecorate(null, null, _selectorClasses_decorators, { kind: "field", name: "selectorClasses", static: false, private: false, access: { has: obj => "selectorClasses" in obj, get: obj => obj.selectorClasses, set: (obj, value) => { obj.selectorClasses = value; } }, metadata: _metadata }, _selectorClasses_initializers, _selectorClasses_extraInitializers);
            tslib.__esDecorate(null, null, _popupClasses_decorators, { kind: "field", name: "popupClasses", static: false, private: false, access: { has: obj => "popupClasses" in obj, get: obj => obj.popupClasses, set: (obj, value) => { obj.popupClasses = value; } }, metadata: _metadata }, _popupClasses_initializers, _popupClasses_extraInitializers);
            tslib.__esDecorate(null, null, _entries_decorators, { kind: "field", name: "entries", static: false, private: false, access: { has: obj => "entries" in obj, get: obj => obj.entries, set: (obj, value) => { obj.entries = value; } }, metadata: _metadata }, _entries_initializers, _entries_extraInitializers);
            tslib.__esDecorate(null, null, _values_decorators, { kind: "field", name: "values", static: false, private: false, access: { has: obj => "values" in obj, get: obj => obj.values, set: (obj, value) => { obj.values = value; } }, metadata: _metadata }, _values_initializers, _values_extraInitializers);
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        //TODO MOVE DEFAULT CLICK TO MAIN CONFIG
        static config = { ...TurboElement.config, defaultSelectorTag: "h4" };
        select = (tslib.__runInitializers(this, _instanceExtraInitializers), new TurboSelect({
            onEntryAdded: (entry) => this.onEntryAdded(entry),
        }));
        popupOpen = false;
        selectorTag = tslib.__runInitializers(this, _selectorTag_initializers, void 0);
        selectorClasses = (tslib.__runInitializers(this, _selectorTag_extraInitializers), tslib.__runInitializers(this, _selectorClasses_initializers, void 0));
        popupClasses = (tslib.__runInitializers(this, _selectorClasses_extraInitializers), tslib.__runInitializers(this, _popupClasses_initializers, void 0));
        entries = (tslib.__runInitializers(this, _popupClasses_extraInitializers), tslib.__runInitializers(this, _entries_initializers, void 0));
        // public set values(values: ValueType[]) {
        //     this.select.values = values;
        // }
        //
        // public get values(): ValueType[] {
        //     return this.select.values;
        // }
        values = (tslib.__runInitializers(this, _entries_extraInitializers), tslib.__runInitializers(this, _values_initializers, void 0));
        onEntryAdded(entry) {
            this.select.initializeSelection();
            turbo(entry).on(DefaultEventName.click, () => {
                this.select.select(entry, !this.select.isSelected(entry));
                this.openPopup(false);
                return true;
            });
        }
        /**
         * The dropdown's selector element.
         */
        set selector(value) {
            if (!(value instanceof HTMLElement))
                return;
            turbo(value)
                .addClass(this.selectorClasses)
                .on(DefaultEventName.click, (e) => {
                this.openPopup(!this.popupOpen);
                return true;
            });
            if (this.popup instanceof TurboPopup)
                this.popup.anchor = value;
            turbo(this).addChild(value);
            if (value instanceof TurboButton)
                this.select.onSelect = () => value.text = this.stringSelectedValue;
        }
        get selector() { return; }
        /**
         * The dropdown's popup element.
         */
        set popup(value) {
            if (value instanceof TurboPopup)
                value.anchor = this.selector;
            turbo(value).addClass(this.popupClasses);
            this.select.parent = value;
        }
        initialize() {
            super.initialize();
            this.selector;
            turbo(document.body).on(DefaultEventName.click, () => e => {
                if (this.popupOpen && !this.contains(e.target))
                    this.openPopup(false);
            }, { capture: true });
        }
        openPopup(b) {
            if (this.popupOpen == b)
                return;
            this.popupOpen = b;
            if ("show" in this.popup && typeof this.popup.show === "function")
                this.popup.show(b);
            else
                turbo(this.popup).show(b);
        }
        get selectedValues() {
            return this.select.selectedValues;
        }
        get selectedValue() {
            return this.select.selectedValue;
        }
        get selectedSecondaryValues() {
            return this.select.selectedSecondaryValues;
        }
        get selectedSecondaryValue() {
            return this.select.selectedSecondaryValue;
        }
        get stringSelectedValue() {
            return this.select.stringSelectedValue;
        }
        constructor() {
            super(...arguments);
            tslib.__runInitializers(this, _values_extraInitializers);
        }
        static {
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
    });
    return _classThis;
})();
function dropdown(properties = {}) {
    if (!properties.tag)
        properties.tag = "turbo-dropdown";
    return element({ ...properties, text: undefined });
}

let TurboMarkingMenu = (() => {
    let _classDecorators = [define("turbo-marking-menu")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    let _startAngle_decorators;
    let _startAngle_initializers = [];
    let _startAngle_extraInitializers = [];
    let _endAngle_decorators;
    let _endAngle_initializers = [];
    let _endAngle_extraInitializers = [];
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _startAngle_decorators = [auto({
                    initialValue: 0,
                    preprocessValue: (value) => value - Math.PI / 2
                })];
            _endAngle_decorators = [auto({
                    initialValue: Math.PI * 2,
                    preprocessValue: (value) => value - Math.PI / 2
                })];
            tslib.__esDecorate(null, null, _startAngle_decorators, { kind: "field", name: "startAngle", static: false, private: false, access: { has: obj => "startAngle" in obj, get: obj => obj.startAngle, set: (obj, value) => { obj.startAngle = value; } }, metadata: _metadata }, _startAngle_initializers, _startAngle_extraInitializers);
            tslib.__esDecorate(null, null, _endAngle_decorators, { kind: "field", name: "endAngle", static: false, private: false, access: { has: obj => "endAngle" in obj, get: obj => obj.endAngle, set: (obj, value) => { obj.endAngle = value; } }, metadata: _metadata }, _endAngle_initializers, _endAngle_extraInitializers);
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
        transition;
        currentOrigin;
        minDragDistance = 20;
        semiMajor = 50;
        semiMinor = 45;
        startAngle = tslib.__runInitializers(this, _startAngle_initializers, void 0);
        endAngle = (tslib.__runInitializers(this, _startAngle_extraInitializers), tslib.__runInitializers(this, _endAngle_initializers, void 0));
        constructor() {
            super(...arguments);
            tslib.__runInitializers(this, _endAngle_extraInitializers);
        }
    });
    return _classThis;
})();

/**
 * @class TurboSelectWheel
 * @extends TurboSelect
 * @description Class to create a dynamic selection wheel.
 * @template {string} ValueType
 * @template {TurboSelectEntry<ValueType, any>} EntryType
 */
let TurboSelectWheel = (() => {
    let _classDecorators = [define("turbo-select-wheel")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    let _instanceExtraInitializers = [];
    let _set_alwaysOpen_decorators;
    let _set_open_decorators;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_alwaysOpen_decorators = [auto()];
            _set_open_decorators = [auto()];
            tslib.__esDecorate(this, null, _set_alwaysOpen_decorators, { kind: "setter", name: "alwaysOpen", static: false, private: false, access: { has: obj => "alwaysOpen" in obj, set: (obj, value) => { obj.alwaysOpen = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(this, null, _set_open_decorators, { kind: "setter", name: "open", static: false, private: false, access: { has: obj => "open" in obj, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            tslib.__esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            tslib.__runInitializers(_classThis, _classExtraInitializers);
        }
        _currentPosition = (tslib.__runInitializers(this, _instanceExtraInitializers), 0);
        _reifect;
        _size = { max: 100, min: -100 };
        sizePerEntry = [];
        positionPerEntry = [];
        totalSize = 0;
        dragLimitOffset = 30;
        /**
         * @description Hides after the set time has passed. Set to a negative value to never hide the wheel. In ms.
         */
        openTimeout = 3000;
        direction = exports.Direction.horizontal;
        scale = { max: 1, min: 0.5 };
        generateCustomStyling;
        dragging;
        openTimer;
        // public constructor(properties: TurboSelectWheelProperties<ValueType, SecondaryValueType, EntryType, ViewType,
        //     DataType, ModelType>) {
        //     properties.multiSelection = false;
        //     properties.forceSelection = true;
        //     super();
        //
        //     if (properties.scale) this.scale = properties.scale;
        //     if (properties.direction) this.direction = properties.direction;
        //
        //     this.opacity = properties.opacity ?? {max: 1, min: 0};
        //     this.size = properties.size;
        //     this.generateCustomStyling = properties.generateCustomStyling;
        //     this.reifect = properties.styleReifect;
        //
        //     $(this).setStyles({display: "block", position: "relative"});
        //     this.alwaysOpen = properties.alwaysOpen ?? false;
        //
        //     // this.initializeUI();
        //
        //     if (properties.selectedValues?.length > 0) this.select(properties.selectedValues[0]);
        //     requestAnimationFrame(() => this.refresh());
        // }
        //
        // public connectedCallback() {
        //     //TODO super.connectedCallback();
        //     requestAnimationFrame(() => this.refresh());
        // }
        //
        // @auto({preprocessValue: (value) => trim(value, 1)})
        // public set opacity(value: Record<Range, number>) {}
        //
        // public get size(): Record<Range, number> {
        //     return this._size;
        // }
        //
        // public set size(value: Record<Range, number> | number) {
        //     this._size = typeof value == "object" ? value : {max: value ?? 100, min: -(value ?? 100)};
        // }
        //
        // public get reifect(): Reifect {
        //     return this._reifect;
        // }
        //
        // public set reifect(value: Reifect | StatelessReifectProperties) {
        //     if (value instanceof Reifect) this._reifect = value;
        //     else {
        //         if (!value) value = {};
        //         if (!value.transitionProperties) value.transitionProperties = "opacity transform";
        //         if (value.transitionDuration == undefined) value.transitionDuration = 0.2;
        //         if (!value.transitionTimingFunction) value.transitionTimingFunction = "ease-in-out";
        //         this._reifect = new Reifect(value);
        //     }
        //     this._reifect.attachAll(...this.entries);
        // }
        set alwaysOpen(value) {
            if (value)
                $(document).removeListener(DefaultEventName.click, this.closeOnClick);
            else
                $(document).on(DefaultEventName.click, this.closeOnClick);
            this.open = value;
        }
        closeOnClick = () => this.open = false;
        get isVertical() {
            return this.direction == exports.Direction.vertical;
        }
        // @auto({cancelIfUnchanged: false})
        // public set index(value: number) {
        //     this.selectByIndex(this.trimmedIndex);
        // }
        //
        // protected get trimmedIndex() {
        //     return trim(Math.round(this.index), this.entries.length - 1);
        // }
        //
        // protected get flooredTrimmedIndex() {
        //     return trim(Math.floor(this.index), this.entries.length - 1);
        // }
        set open(value) {
            $(this).setStyle("overflow", value ? "visible" : "hidden");
        }
        get currentPosition() {
            return this._currentPosition;
        }
        // protected set currentPosition(value: number) {
        //     const min = -this.dragLimitOffset - this.sizePerEntry[0] / 2;
        //     const max = this.totalSize + this.dragLimitOffset - this.sizePerEntry[this.sizePerEntry.length - 1] / 2;
        //
        //     if (value < min) value = min;
        //     if (value > max) value = max;
        //
        //     this._currentPosition = value;
        //     const elements = this.reifect.getEnabledObjectsData();
        //     if (elements.length === 0) return;
        //
        //     elements.forEach((el, index) =>
        //         this.computeAndApplyStyling(el.object.deref() as HTMLElement, this.positionPerEntry[index] - value));
        // }
        // protected setupUIListeners() {
        //     super.setupUIListeners();
        //
        //     $(document.body).on(DefaultEventName.drag, (e: TurboDragEvent) => {
        //         if (!this.dragging) return;
        //         e.stopImmediatePropagation();
        //         this.currentPosition += this.computeDragValue(e.scaledDeltaPosition);
        //     });
        //
        //     $(document.body).on(DefaultEventName.dragEnd, (e: TurboDragEvent) => {
        //         if (!this.dragging) return;
        //         e.stopImmediatePropagation();
        //         this.dragging = false;
        //         this.recomputeIndex();
        //         // this.snapTo(this.trimmedIndex);
        //         if (!this.alwaysOpen) this.setOpenTimer();
        //     });
        // }
        computeDragValue(delta) {
            return -delta[this.isVertical ? "y" : "x"];
        }
        /**
         * Recalculates the dimensions and positions of all entries
         */
        // protected reloadEntrySizes() {
        //     if (!this.reifect) return;
        //
        //     this.sizePerEntry.length = 0;
        //     this.positionPerEntry.length = 0;
        //     this.totalSize = 0;
        //
        //     this.reifect.getEnabledObjectsData().forEach(entry => {
        //         const object = entry.object.deref();
        //         const size = object ? object[this.isVertical ? "offsetHeight" : "offsetWidth"] : 0;
        //         this.sizePerEntry.push(size);
        //         this.positionPerEntry.push(this.totalSize);
        //         this.totalSize += size;
        //     });
        //     const flooredIndex = Math.floor(this.index);
        //     const indexOffset = this.index - Math.floor(this.index);
        //
        //     this.currentPosition = 0;
        //     if (this.index < 0) this.currentPosition = -Math.abs(this.index) * this.sizePerEntry[0];
        //     else if (this.index >= this.sizePerEntry.length) this.currentPosition =
        //         (this.index - this.sizePerEntry.length + 1) * this.sizePerEntry[this.sizePerEntry.length - 1];
        //     else this.currentPosition = this.positionPerEntry[flooredIndex] + this.sizePerEntry[flooredIndex] * indexOffset;
        // }
        //
        // protected recomputeIndex() {
        //     let index = 0;
        //     while (index < this.positionPerEntry.length - 1 && this.positionPerEntry[index + 1] < this.currentPosition) index++;
        //     if (this.currentPosition - this.positionPerEntry[index] > this.sizePerEntry[index + 1] / 2) index++;
        //     this.index = index;
        // }
        // protected computeAndApplyStyling(element: HTMLElement, translationValue: number, size: Record<Range, number> = this.size) {
        //     let opacityValue: number, scaleValue: number;
        //     const bound = translationValue > 0 ? size.max : size.min;
        //     opacityValue = linearInterpolation(translationValue, 0, bound, this.opacity.max, this.opacity.min);
        //     scaleValue = linearInterpolation(translationValue, 0, bound, this.scale.max, this.scale.min);
        //
        //     let styles: string | PartialRecord<keyof CSSStyleDeclaration, string | number> = {
        //         left: "50%", top: "50%", opacity: opacityValue, transform: `translate3d(
        //         calc(${!this.isVertical ? translationValue : 0}px - 50%),
        //         calc(${this.isVertical ? translationValue : 0}px - 50%),
        //         0) scale3d(${scaleValue}, ${scaleValue}, 1)`
        //     };
        //
        //     if (this.generateCustomStyling) styles = this.generateCustomStyling({
        //         element: element,
        //         translationValue: translationValue,
        //         opacityValue: opacityValue,
        //         scaleValue: scaleValue,
        //         size: size,
        //         defaultComputedStyles: styles
        //     });
        //
        //     $(element).setStyles(styles);
        // }
        // public select(entry: ValueType | EntryType, selected: boolean = true): this {
        //     // super.select(entry, selected);
        //     if (entry === undefined || entry === null) return this;
        //
        //     const index = this.getIndex(this.selectedEntry);
        //     if (index != this.index) this.index = index;
        //
        //     if (this.reifect) {
        //         this.reifect.transitionEnabled = true;
        //         this.reloadEntrySizes();
        //     }
        //
        //     const computedStyle = getComputedStyle(this.selectedEntry);
        //     $(this).setStyles({minWidth: computedStyle.width, minHeight: computedStyle.height}, true);
        //     return this;
        // }
        //
        // protected onEntryClick(entry: EntryType, e?: Event) {
        //     super.onEntryClick(entry, e);
        //     e.stopImmediatePropagation();
        //     this.open = true;
        //     if (!this.alwaysOpen) this.setOpenTimer();
        // }
        //
        // public addEntry(entry: ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType,
        //                 index: number = this.entries.length): EntryType {
        //     entry = this.createEntry(entry);
        //     entry.onDetach.add(() => this.reifect?.detach(entry as TurboSelectEntry));
        //     entry.onAttach.add(() => {
        //         this.reifect?.attach(entry as TurboSelectEntry);
        //         this.reloadEntrySizes();
        //     });
        //
        //     entry = super.addEntry(entry, index);
        //     $(entry).setStyles({position: "absolute"});
        //
        //     $(entry).on(DefaultEventName.dragStart, (e: Event) => {
        //         e.stopImmediatePropagation();
        //         this.clearOpenTimer();
        //         this.open = true;
        //         this.dragging = true;
        //         this.reifect.transitionEnabled = false;
        //         this.reloadEntrySizes();
        //     });
        //
        //     let showTimer: NodeJS.Timeout;
        //     $(entry).on("mouseover", () => {
        //         clearTimeout(showTimer);
        //         showTimer = setTimeout(() => this.open = true, 1000);
        //     });
        //     $(entry).on("mouseout", () => {
        //         if (showTimer) clearTimeout(showTimer);
        //         showTimer = null;
        //     });
        //
        //     this.refresh();
        //     return entry;
        // }
        //
        // public clear(): void {
        //     this.reifect.detach(...this.entries);
        //     super.clear();
        // }
        //
        // public refresh() {
        //     if (this.selectedEntry) this.select(this.selectedEntry);
        //     else this.reset();
        // }
        //
        // public reset() {
        //     this.select(this.entries[0]);
        // }
        clearOpenTimer() {
            if (this.openTimer)
                clearTimeout(this.openTimer);
        }
        setOpenTimer() {
            this.clearOpenTimer();
            if (typeof this.openTimeout !== "number" || this.openTimeout < 0)
                return;
            this.openTimer = setTimeout(() => this.open = false, this.openTimeout);
        }
    });
    return _classThis;
})();

/**
 * @class TurboProxiedElement
 * @description TurboProxiedElement class, similar to TurboElement but containing an HTML element instead of being one.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
class TurboProxiedElement {
    /**
     * @description Static configuration object.
     */
    static config = { shadowDOM: false, defaultSelectedClass: "selected" };
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value) {
        Object.entries(value).forEach(([key, val]) => {
            if (val !== undefined)
                this.config[key] = val;
        });
    }
    /**
     * @description The HTML (or other) element wrapped inside this instance.
     */
    element;
    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    mvc = new Mvc({ element: this });
    constructor(properties = {}) {
        this.element = blindElement(properties);
    }
    setupChangedCallbacks() {
    }
    setupUIElements() {
    }
    setupUILayout() {
    }
    setupUIListeners() {
    }
}
(() => {
    defineDefaultProperties(TurboProxiedElement);
    defineMvcAccessors(TurboProxiedElement);
    defineUIPrototype(TurboProxiedElement);
})();

async function hashString(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}
async function hashBySize(input, chars = 12) {
    const bytes = Math.ceil((chars * 6) / 8);
    const enc = new TextEncoder();
    const digest = await crypto.subtle.digest("SHA-256", enc.encode(input));
    const slice = new Uint8Array(digest).slice(0, bytes);
    return (typeof btoa === "function"
        ? btoa(String.fromCharCode(...slice))
        : Buffer.from(slice).toString("base64"))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "")
        .slice(0, chars);
}

/**
 * @description Interpolates x linearly between (x1, y1) and (x2, y2). If strict is true, then x will not be allowed
 * to go beyond [x1, x2].
 * @param x
 * @param x1
 * @param x2
 * @param y1
 * @param y2
 * @param strict
 */
function linearInterpolation(x, x1, x2, y1, y2, strict = true) {
    if (strict) {
        const xMax = Math.max(x1, x2);
        const xMin = Math.min(x1, x2);
        if (x > xMax)
            x = xMax;
        if (x < xMin)
            x = xMin;
    }
    return y1 + ((x - x1) * (y2 - y1)) / (x2 - x1);
}

function getEventPosition(e) {
    if (e instanceof TurboEvent)
        return e.scaledPosition;
    if (e instanceof PointerEvent)
        return new Point(e.clientX, e.clientY);
    return;
}

/**
 * @description Computes the luminance of a color
 * @param {string} color - The color in Hex format
 * @return The luminance value, or NaN if the color is not valid.
 */
function luminance(color) {
    if (!color)
        return NaN;
    const rgb = parseInt(color.substring(1), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = ((rgb >> 0) & 0xff) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * @description Computes the contrast between two colors.
 * @param {string} color1 - The first color in Hex format
 * @param {string} color2 - The second color in Hex format
 * @return The contrast value, or NaN if one of the colors provided is not valid.
 */
function contrast(color1, color2) {
    if (!color1 || !color2)
        return NaN;
    const luminance1 = luminance(color1);
    const luminance2 = luminance(color2);
    return (Math.max(luminance1, luminance2) + 0.1) / (Math.min(luminance1, luminance2) + 0.1);
}

/**
 * @description Evaluates the best color out of two provided options to put on top of a base color in terms of contrast
 * (for readability).
 * @param {string} baseColor - The base color in Hex format.
 * @param {string} [overlayColor1="#000000"] - The first overlay color to evaluate in Hex format. Defaults to black.
 * @param {string} [overlayColor2="#FFFFFF"] - The second overlay color to evaluate in Hex format. Defaults to white.
 */
function bestOverlayColor(baseColor, overlayColor1 = "#000000", overlayColor2 = "#FFFFFF") {
    const contrastLight = contrast(baseColor, overlayColor2);
    const contrastDark = contrast(overlayColor1, baseColor);
    return contrastLight > contrastDark ? overlayColor2 : overlayColor1;
}

/**
 * @description Constructs a single CSS string from a template literal containing CSS rules.
 */
function css(strings, ...values) {
    let str = "";
    strings.forEach((string, i) => {
        str += string + (values[i] || '');
    });
    return str;
}

/**
 * @description Default font weights, sub-names, and styles when loading a font family.
 */
const defaultFamilyWeights = {
    900: { "Black": "normal", "BlackItalic": "italic" },
    800: { "ExtraBold": "normal", "ExtraBoldItalic": "italic" },
    700: { "Bold": "normal", "BoldItalic": "italic" },
    600: { "SemiBold": "normal", "SemiBoldItalic": "italic" },
    500: { "Medium": "normal", "MediumItalic": "italic" },
    400: { "Regular": "normal", "Italic": "italic" },
    300: { "Light": "normal", "LightItalic": "italic" },
    200: { "ExtraLight": "normal", "ExtraLightItalic": "italic" },
    100: { "Thin": "normal", "ThinItalic": "italic" },
};
function createFontFace(name, path, format, weight, style) {
    return css `
        @font-face {
            font-family: "${name}";
            src: url("${path}") format("${format}"), 
            url("${path}") format("woff"),
            url("${path}") format("truetype");
            font-weight: ${typeof weight == "string" ? "\"" + weight + "\"" : weight};
            font-style: "${style}";
        }`;
}
/**
 * @description Loads a local font file, or a family of fonts from a directory.
 * @param {FontProperties} font - The font properties
 */
function loadLocalFont(font) {
    if (!font.name || !font.pathOrDirectory)
        console.error("Please specify font name and path/directory");
    const isFamily = getFileExtension(font.pathOrDirectory).length == 0;
    if (!font.stylesPerWeights)
        font.stylesPerWeights = isFamily ? defaultFamilyWeights : { "normal": "normal" };
    if (!font.format)
        font.format = "woff2";
    if (!font.extension)
        font.extension = ".ttf";
    if (font.extension[0] != ".")
        font.extension = "." + font.extension;
    stylesheet(Object.entries(font.stylesPerWeights).map(([weight, value]) => {
        const weightNumber = Number.parseInt(weight);
        const typedWeight = weightNumber ? weightNumber : weight;
        if (typeof value == "string")
            return createFontFace(font.name, font.pathOrDirectory, font.format, typedWeight, value);
        return Object.entries(value).map(([weightName, style]) => createFontFace(font.name, `${font.pathOrDirectory}/${font.name}-${weightName}${font.extension}`, font.format, typedWeight, style)).join("\n");
    }).join("\n"));
}

/**
 * @class YModel
 * @abstract
 * @extends TurboModel
 * @template DataType - The plain shape of the shared data.
 * @template {YMap | YArray} YType - The Yjs type used (YMap or YArray).
 * @template {string | number} KeyType - The type of keys used to access values.
 * @template {string | number} IdType - The type of block identifiers.
 * @template {"array" | "map"} BlocksType - Either 'array' or 'map' depending on the block storage format.
 * @template {YDataBlock<YType, IdType>} BlockType - The structure of each block including observer.
 * @description A model that wraps and manages Yjs data structures (YMap/YArray), adding automatic observer support.
 *  */
let YModel = (() => {
    let _classSuper = TurboModel;
    let _instanceExtraInitializers = [];
    let _set_enabledCallbacks_decorators;
    return class YModel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_enabledCallbacks_decorators = [auto()];
            tslib.__esDecorate(this, null, _set_enabledCallbacks_decorators, { kind: "setter", name: "enabledCallbacks", static: false, private: false, access: { has: obj => "enabledCallbacks" in obj, set: (obj, value) => { obj.enabledCallbacks = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * @constructor
         * @param {DataType} [data] - Initial data. Not initialized if provided.
         * @param {BlocksType} [dataBlocksType] - Type of data blocks (array or map).
         */
        constructor(data, dataBlocksType) {
            super(data, dataBlocksType);
            tslib.__runInitializers(this, _instanceExtraInitializers);
        }
        /**
         * @description The data of the default block.
         */
        get data() {
            return super.data;
        }
        set data(value) {
            if (!(value instanceof yjs.AbstractType))
                return;
            super.data = value;
        }
        /**
         * @description Whether callbacks are enabled or disabled.
         */
        set enabledCallbacks(value) {
            this.getAllBlocks().forEach(block => {
                if (!block.observer || !block.data)
                    return;
                if (value)
                    block.data.observe(block.observer);
                else
                    block.data.unobserve(block.observer);
            });
        }
        /**
         * @function getData
         * @description Retrieves the value associated with a given key in the specified block.
         * @param {KeyType} key - The key to retrieve.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block from which to retrieve the
         * data.
         * @returns {unknown} The value associated with the key, or null if not found.
         */
        getData(key, blockKey = this.defaultBlockKey) {
            const data = this.getBlockData(blockKey);
            if (data instanceof yjs.Map)
                return data.get(key.toString());
            if (data instanceof yjs.Array) {
                const index = Number(key);
                if (index >= 0 && index < data.length)
                    return data.get(index);
            }
            return null;
        }
        /**
         * @function setData
         * @description Sets the value for a given key in the specified block and triggers callbacks (if enabled).
         * @param {KeyType} key - The key to update.
         * @param {unknown} value - The value to assign.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to update.
         */
        setData(key, value, blockKey = this.defaultBlockKey) {
            const data = this.getBlockData(blockKey);
            if (data instanceof yjs.Map)
                data.set(key.toString(), value);
            else if (data instanceof yjs.Array) {
                const index = Number(key);
                if (index < 0)
                    return;
                if (index < data.length)
                    data.delete(index, 1);
                data.insert(index, [value]);
            }
        }
        /**
         * @function getSize
         * @description Returns the size of the specified block.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to check.
         * @returns {number} The size.
         */
        getSize(blockKey = this.defaultBlockKey) {
            const data = this.getBlockData(blockKey);
            if (data instanceof yjs.Map || data instanceof yjs.Array)
                return (data instanceof yjs.Array) ? data.length : data.size;
            return 0;
        }
        /**
         * @function createBlock
         * @description Creates a data block entry.
         * @param {YType} value - The data of the block.
         * @param {IdType} [id] - The optional ID of the data.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The key of the block.
         * @protected
         * @return {BlockType} - The created block.
         */
        createBlock(value, id, blockKey = this.defaultBlockKey) {
            return {
                ...super.createBlock(value, id),
                observer: (event, transaction) => this.observeChanges(event, transaction, blockKey)
            };
        }
        /**
         * @function setBlock
         * @description Creates and sets a data block at the specified key.
         * @param {YType} value - The data to set.
         * @param {IdType} [id] - Optional block ID.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The key of the block.
         * @param {boolean} [initialize = true] - Whether to initialize the block after setting.
         */
        setBlock(value, id, blockKey = this.defaultBlockKey, initialize = true) {
            if (this.enabledCallbacks) {
                const block = this.getBlock(blockKey);
                if (block && block.data && block.observer)
                    block.data.unobserve(block.observer);
            }
            this.clear(blockKey);
            super.setBlock(value, id, blockKey, initialize);
        }
        /**
         * @function initialize
         * @description Initializes the block at the given key, and triggers callbacks for all the keys in its data.
         * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
         */
        initialize(blockKey = this.defaultBlockKey) {
            super.initialize(blockKey);
            const block = this.getBlock(blockKey);
            block?.data?.observe(block?.observer);
        }
        /**
         * @function getAllKeys
         * @description Retrieves all keys within the given block(s).
         * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
         * @returns {KeyType[]} Array of keys.
         */
        getAllKeys(blockKey = this.defaultComputationBlockKey) {
            const output = [];
            for (const block of this.getAllBlocks(blockKey)) {
                const data = block.data;
                if (data instanceof yjs.Map)
                    output.push(...Array.from(data.keys()));
                else if (data instanceof yjs.Array) {
                    for (let i = 0; i < data.length; i++)
                        output.push(i);
                }
            }
            return output;
        }
        /**
         * @function getAllObservers
         * @description Retrieves all observers within the given block(s).
         * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
         * @returns {((event: YEvent) => void)[]} Array of observers.
         */
        getAllObservers(blockKey = this.defaultComputationBlockKey) {
            return this.getAllBlocks(blockKey).map(block => block.observer);
        }
    };
})();

/**
 * @class YComponentModel
 * @extends YModel
 * @description An MVC model that handles a Yjs map and observes changes on its direct fields, firing change
 * callbacks at the keys that changed through the emitter.
 */
class YComponentModel extends YModel {
    observeChanges(event, transaction, blockKey) {
        event.keysChanged.forEach(key => {
            const change = event.changes.keys.get(key);
            if (!change) {
                console.warn(`No change info for key "${key}". Event:`, event);
                return;
            }
            this.fireKeyChangedCallback(key, blockKey, change?.action === "delete");
        });
    }
}

/**
 * @class YManagerModel
 * @template DataType - The type of the data stored in each block.
 * @template ComponentType - The type of component that corresponds to each entry/field of the data.
 * @template {string | number | symbol} KeyType - The type of the keys used to access data in blocks.
 * @template {YMap | YArray} YType - The type of the Yjs data (YMap or YArray).
 * @template {string | number | symbol} IdType - The type of the block IDs.
 * @template {"array" | "map"} BlocksType - Whether data blocks are stored as an array or a map.
 * @template {YDataBlock<YType, IdType>} BlockType - The structure of each data block.
 * @description MVC model that manages Yjs data and synchronizes it with a map or array of components, each attached to
 * one entry of the data object.
 */
class YManagerModel extends YModel {
    changeObservers = new TurboWeakSet();
    /**
     * @constructor
     * @param {DataType} [data] - Initial data. Not initialized if provided.
     * @param {BlocksType} [dataBlocksType] - Type of data blocks (array or map).
     */
    constructor(data, dataBlocksType) {
        super(data, dataBlocksType);
    }
    generateObserver(properties = {}) {
        const observer = {
            onAdded: new Delegate(),
            onUpdated: new Delegate(),
            onDeleted: new Delegate(),
            instances: new Map(),
            getInstance: (key, blockKey = this.defaultComputationBlockKey) => this.getInstance(observer, key, blockKey),
            getAllInstances: (blockKey = this.defaultComputationBlockKey) => this.getAllInstances(observer, blockKey),
            initialize: (blockKey) => {
                if (!this.isInitialized.get(blockKey))
                    return;
                for (const key of this.getAllKeys(blockKey)) {
                    this.fireKeyChangedCallbackForObserver(observer, this.getData(key, blockKey), key, blockKey);
                }
            },
            clear: (blockKey = this.defaultComputationBlockKey) => this.clearInstances(observer, blockKey),
            destroy: () => {
                this.getAllBlockKeys().forEach(blockKey => observer.clear(blockKey));
                this.changeObservers?.delete(observer);
            }
        };
        observer.onUpdated.add((data, instance, id) => {
            if (typeof instance === "object") {
                if ("data" in instance)
                    instance.data = data;
                if ("dataId" in instance)
                    instance.dataId = id.toString();
            }
        });
        observer.onDeleted.add((_data, instance, id, blockKey) => {
            this.removeInstance(instance);
            this.getInstancesMaps(observer, blockKey).forEach(map => map.delete(id));
        });
        if (properties.onAdded)
            observer.onAdded.add((data, id, blockKey) => properties.onAdded(data, id, blockKey));
        if (properties.onUpdated)
            observer.onUpdated.add((data, instance, id, blockKey) => properties.onUpdated(data, instance, id, blockKey));
        if (properties.onDeleted)
            observer.onDeleted.add((data, instance, id, blockKey) => properties.onDeleted(data, instance, id, blockKey));
        if (properties.initialize)
            for (const blockKey of this.getAllBlockKeys())
                observer.initialize(blockKey);
        this.changeObservers?.add(observer);
        return observer;
    }
    /**
     * @function clear
     * @description Clears the block data at the given key.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    clear(blockKey = this.defaultComputationBlockKey) {
        super.clear(blockKey);
        this.changeObservers?.toArray().forEach(observer => this.clearInstances(observer, blockKey));
    }
    getAllData(blockKey = this.defaultComputationBlockKey) {
        return super.getAllData(blockKey);
    }
    /**
     * @function fireKeyChangedCallback
     * @description Fires the emitter's change callback for the given key in a block, passing it the data at the key's value.
     * @param {KeyType} key - The key that changed.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block where the change occurred.
     * @param {boolean} [deleted=false] - Whether the key was deleted.
     */
    fireKeyChangedCallback(key, blockKey = this.defaultBlockKey, deleted = false) {
        if (!this.getAllKeys(blockKey).includes(key))
            return super.fireKeyChangedCallback(key, blockKey, deleted);
        const data = this.getData(key, blockKey);
        this.changeObservers?.toArray().forEach(observer => this.fireKeyChangedCallbackForObserver(observer, data, key, blockKey));
    }
    fireKeyChangedCallbackForObserver(observer, data, key, blockKey = this.defaultBlockKey) {
        if (!observer.instances.has(blockKey))
            observer.instances.set(blockKey, new Map());
        const map = observer.instances.get(blockKey);
        const existingInstance = map.get(key);
        if (existingInstance) {
            observer.onUpdated.fire(data, existingInstance, key, blockKey);
            return;
        }
        const instance = observer.onAdded.fire(data, key, blockKey);
        if (!instance)
            return;
        map.set(key, instance);
        observer.onUpdated.fire(data, instance, key, blockKey);
    }
    /*
     *
     * Utilities
     *
     */
    getInstancesMaps(observer, blockKey, sort = false) {
        const maps = [];
        if (blockKey !== null) {
            const map = observer.instances.get(blockKey);
            if (map)
                maps.push(map);
        }
        else {
            const blockKeys = this.getAllBlockKeys();
            if (sort)
                blockKeys.sort(this.sortingFunction);
            for (const curKey of blockKeys) {
                const map = observer.instances.get(curKey);
                if (map)
                    maps.push(map);
            }
        }
        return maps;
    }
    getInstance(observer, key, blockKey = this.defaultComputationBlockKey) {
        for (const map of this.getInstancesMaps(observer, blockKey)) {
            if (map.has(key))
                return map.get(key);
        }
        return null;
    }
    getAllInstances(observer, blockKey = this.defaultComputationBlockKey) {
        const maps = this.getInstancesMaps(observer, blockKey, true);
        if (!this.isDataBlocksArray)
            return maps.flatMap(map => Array.from(map.values()) || []);
        let instances = [];
        for (const map of maps) {
            const tempInstances = Array.from(map.entries());
            tempInstances.sort((a, b) => this.sortingFunction(a[0], b[0]));
            instances = instances.concat(...tempInstances.map(entry => entry[1]));
        }
        return instances;
    }
    removeInstance(instance) {
        if (instance && typeof instance === "object" && "remove" in instance && typeof instance.remove == "function")
            instance?.remove();
    }
    clearInstances(observer, blockKey = this.defaultComputationBlockKey) {
        this.getInstancesMaps(observer, blockKey).forEach(map => {
            map.forEach(instance => this.removeInstance(instance));
            map.clear();
        });
    }
    sortingFunction(a, b) {
        if (typeof a == "string" && typeof b == "string")
            return a.localeCompare(b);
        else if (typeof a == "number" && typeof b == "number")
            return a - b;
        return 0;
    }
    observeChanges(event, transaction, blockKey = this.defaultBlockKey) {
        //TODO
        !!transaction?.local;
        transaction?.origin;
        if (event instanceof yjs.YMapEvent) {
            event.keysChanged.forEach(key => {
                const change = event.changes.keys.get(key);
                switch (change.action) {
                    case "add":
                        this.fireKeyChangedCallback(key, blockKey);
                        break;
                    case "delete":
                        this.changeObservers?.toArray().forEach(observer => observer.onDeleted.fire(change.oldValue, this.getInstance(observer, key, blockKey), key, blockKey));
                        break;
                    case "update":
                        this.changeObservers?.toArray().forEach(observer => observer.onUpdated.fire(this.getData(key, blockKey), this.getInstance(observer, key, blockKey), key, blockKey));
                        break;
                }
            });
        }
        else if (event instanceof yjs.YArrayEvent) {
            let currentIndex = 0;
            for (const delta of event.delta) {
                if (delta.retain !== undefined)
                    currentIndex += delta.retain;
                else if (delta.insert) {
                    const insertedItems = Array.isArray(delta.insert) ? delta.insert : [delta.insert];
                    const count = insertedItems.length;
                    this.changeObservers?.toArray().forEach(observer => this.shiftIndices(observer, currentIndex, count, blockKey));
                    for (let i = 0; i < count; i++)
                        this.fireKeyChangedCallback((currentIndex + i), blockKey);
                    currentIndex += count;
                }
                else if (delta.delete) {
                    const count = delta.delete;
                    for (let i = 0; i < count; i++) {
                        this.changeObservers?.toArray().forEach(observer => observer.onDeleted.fire(undefined, this.getInstance(observer, (currentIndex + i), blockKey), (currentIndex + i), blockKey));
                    }
                    this.changeObservers?.toArray().forEach(observer => this.shiftIndices(observer, currentIndex + count, -count, blockKey));
                }
            }
        }
    }
    shiftIndices(observer, fromIndex, offset, blockKey = this.defaultBlockKey) {
        const block = this.getInstancesMaps(observer, blockKey)[0];
        if (!block)
            return;
        const itemsToShift = [];
        for (const [oldIndexStr, instance] of block.entries()) {
            const oldIndex = Number(oldIndexStr);
            if (oldIndex >= fromIndex)
                itemsToShift.push([oldIndex, instance]);
        }
        itemsToShift.sort((a, b) => a[0] - b[0]);
        for (const [oldIndex] of itemsToShift)
            block.delete(oldIndex);
        for (const [oldIndex, instance] of itemsToShift) {
            const newIndex = oldIndex + offset;
            if (typeof instance === "object" && "dataId" in instance)
                instance.dataId = newIndex;
            block.set((oldIndex + offset), instance);
        }
    }
}

/**
 * @function createYMap
 * @static
 * @description Creates a YMap and populates it with key-value pairs from a plain object.
 * @param {object} data - The initial data to populate the YMap with.
 * @returns {YMap} A new YMap instance.
 */
function createYMap(data) {
    const map = new yjs.Map();
    for (const [key, value] of Object.entries(data))
        map.set(key, value);
    return map;
}
/**
 * @function createYArray
 * @static
 * @template DataType - The type of the array's content.
 * @description Creates a YArray and populates it with elements from a plain array.
 * @param {DataType[]} data - The array of data to populate the YArray with.
 * @returns {YArray} A new YArray instance.
 */
function createYArray(data) {
    const array = new yjs.Array();
    array.push(data);
    return array;
}
/**
 * @function addInYMap
 * @static
 * @async
 * @description Adds the provided data in the provided parent in the Yjs document, with a unique ID as its field name.
 * @param {object} data - The data to append to the Yjs document.
 * @param {YMap} parentYMap - The YMap to add the data to.
 * @param {string} [id] - Optional ID to use. If not provided, a unique ID is generated.
 * @returns {Promise<string>} The ID of the inserted data.
 */
async function addInYMap(data, parentYMap, id) {
    const generateId = async () => await hashBySize(parentYMap?.doc?.clientID?.toString(32) + randomId());
    if (!id) {
        id = await generateId();
        while (parentYMap?.get(id) !== undefined)
            id = await generateId();
    }
    parentYMap.set(id, data);
    return id;
}
/**
 * @function addInYArray
 * @static
 * @description Adds the provided data in the provided parent array in the Yjs document.
 * @param {object} data - The data to append to the Yjs document.
 * @param {YArray} parentYArray - The YArray to which the data should be appended.
 * @param {number} [index] - The index to insert the data at. If omitted or invalid, it is appended at the end.
 * @returns {number} The index where the data was inserted.
 */
function addInYArray(data, parentYArray, index) {
    if (index == undefined || index > parentYArray.length) {
        index = parentYArray.length;
        parentYArray.push([data]);
    }
    else {
        if (index < 0)
            index = 0;
        parentYArray.insert(index, [data]);
    }
    return index;
}
/**
 * @function removeFromYArray
 * @static
 * @description Removes the first occurrence of the given entry from the YArray.
 * @param {unknown} entry - The entry to remove.
 * @param {YArray} parentYArray - The parent YArray.
 * @returns {boolean} True if removed, false otherwise.
 */
function removeFromYArray(entry, parentYArray) {
    for (const [index, child] of parentYArray.toArray()) {
        if (entry != child)
            continue;
        parentYArray.delete(index);
        return true;
    }
    return false;
}
/**
 * @function deepObserveAny
 * @static
 * @description Observes deeply for changes to any of the specified fields and invokes callback when any field
 * changes.
 * @param {YAbstractType} data - The Yjs type to observe.
 * @param {(fieldChanged: string, event: YEvent, target: YAbstractType) => void} callback - The function to call
 * when a matching field changes.
 * @param {...string} fieldNames - List of field names to observe.
 */
function deepObserveAny(data, callback, ...fieldNames) {
    if (!data)
        return;
    const fields = new Set(fieldNames);
    data.observeDeep((events) => {
        for (const event of events) {
            const target = event.target;
            const parentMap = target._item?.parent;
            const key = target._item?.parentSub;
            for (const field of fields) {
                if ((event instanceof yjs.YMapEvent && event.changes.keys.has(field)) ||
                    (event instanceof yjs.YArrayEvent && parentMap instanceof yjs.Map && key === field) ||
                    (event.path?.some(segment => segment === field))) {
                    callback(field, event, target);
                    return;
                }
            }
        }
    });
}
/**
 * @function deepObserveAll
 * @static
 * @description Observes deeply for changes to all specified fields and invokes callback only when all fields
 * have changed.
 * @param {YAbstractType} data - The Yjs type to observe.
 * @param {(event: YEvent, target: YAbstractType) => void} callback - The function to call when all fields change.
 * @param {...string} fieldNames - List of field names to observe.
 */
function deepObserveAll(data, callback, ...fieldNames) {
    if (!data)
        return;
    const fields = new Set(fieldNames);
    data.observeDeep(events => {
        const changedFields = new Set();
        for (const event of events) {
            const target = event.target;
            const parentMap = target._item?.parent;
            const key = target._item?.parentSub;
            for (const field of fields) {
                if ((event instanceof yjs.YMapEvent && event.changes.keys.has(field)) ||
                    (event instanceof yjs.YArrayEvent && parentMap instanceof yjs.Map && key === field) ||
                    (event.path?.some(segment => segment === field)))
                    changedFields.add(field);
            }
            if (changedFields.size === fields.size) {
                callback(event, target);
                return;
            }
        }
    });
}

Object.defineProperty(exports, "YAbstractType", {
    enumerable: true,
    get: function () { return yjs.AbstractType; }
});
Object.defineProperty(exports, "YArray", {
    enumerable: true,
    get: function () { return yjs.Array; }
});
Object.defineProperty(exports, "YArrayEvent", {
    enumerable: true,
    get: function () { return yjs.YArrayEvent; }
});
Object.defineProperty(exports, "YDoc", {
    enumerable: true,
    get: function () { return yjs.Doc; }
});
Object.defineProperty(exports, "YEvent", {
    enumerable: true,
    get: function () { return yjs.YEvent; }
});
Object.defineProperty(exports, "YMap", {
    enumerable: true,
    get: function () { return yjs.Map; }
});
Object.defineProperty(exports, "YMapEvent", {
    enumerable: true,
    get: function () { return yjs.YMapEvent; }
});
Object.defineProperty(exports, "YText", {
    enumerable: true,
    get: function () { return yjs.Text; }
});
exports.$ = $;
exports.ApplyDefaultsMergeProperties = ApplyDefaultsMergeProperties;
exports.BasicInputEvents = BasicInputEvents;
exports.DefaultClickEventName = DefaultClickEventName;
exports.DefaultDragEventName = DefaultDragEventName;
exports.DefaultEventName = DefaultEventName;
exports.DefaultKeyEventName = DefaultKeyEventName;
exports.DefaultMoveEventName = DefaultMoveEventName;
exports.DefaultWheelEventName = DefaultWheelEventName;
exports.Delegate = Delegate;
exports.MathMLNamespace = MathMLNamespace;
exports.MathMLTags = MathMLTags;
exports.Mvc = Mvc;
exports.NonPassiveEvents = NonPassiveEvents;
exports.Point = Point;
exports.Reifect = Reifect;
exports.ReifectHandler = ReifectHandler;
exports.StatefulReifect = StatefulReifect;
exports.SvgNamespace = SvgNamespace;
exports.SvgTags = SvgTags;
exports.TurboBaseElement = TurboBaseElement;
exports.TurboButton = TurboButton;
exports.TurboClickEventName = TurboClickEventName;
exports.TurboController = TurboController;
exports.TurboDragEvent = TurboDragEvent;
exports.TurboDragEventName = TurboDragEventName;
exports.TurboDrawer = TurboDrawer;
exports.TurboDropdown = TurboDropdown;
exports.TurboElement = TurboElement;
exports.TurboEmitter = TurboEmitter;
exports.TurboEvent = TurboEvent;
exports.TurboEventManager = TurboEventManager;
exports.TurboEventName = TurboEventName;
exports.TurboHandler = TurboHandler;
exports.TurboHeadlessElement = TurboHeadlessElement;
exports.TurboIcon = TurboIcon;
exports.TurboIconSwitch = TurboIconSwitch;
exports.TurboIconToggle = TurboIconToggle;
exports.TurboInput = TurboInput;
exports.TurboInteractor = TurboInteractor;
exports.TurboKeyEvent = TurboKeyEvent;
exports.TurboKeyEventName = TurboKeyEventName;
exports.TurboMap = TurboMap;
exports.TurboMarkingMenu = TurboMarkingMenu;
exports.TurboModel = TurboModel;
exports.TurboMoveEventName = TurboMoveEventName;
exports.TurboNumericalInput = TurboNumericalInput;
exports.TurboPopup = TurboPopup;
exports.TurboProxiedElement = TurboProxiedElement;
exports.TurboRichElement = TurboRichElement;
exports.TurboSelect = TurboSelect;
exports.TurboSelectInputEvent = TurboSelectInputEvent;
exports.TurboSelectWheel = TurboSelectWheel;
exports.TurboSelector = TurboSelector;
exports.TurboSubstrate = TurboSubstrate;
exports.TurboTool = TurboTool;
exports.TurboView = TurboView;
exports.TurboWeakSet = TurboWeakSet;
exports.TurboWheelEvent = TurboWheelEvent;
exports.TurboWheelEventName = TurboWheelEventName;
exports.YComponentModel = YComponentModel;
exports.YManagerModel = YManagerModel;
exports.YModel = YModel;
exports.a = a;
exports.addInYArray = addInYArray;
exports.addInYMap = addInYMap;
exports.areEqual = areEqual;
exports.auto = auto;
exports.bestOverlayColor = bestOverlayColor;
exports.blindElement = blindElement;
exports.blockIdSignal = blockIdSignal;
exports.blockSignal = blockSignal;
exports.button = button;
exports.cache = cache;
exports.callOnce = callOnce;
exports.callOncePerInstance = callOncePerInstance;
exports.camelToKebabCase = camelToKebabCase;
exports.canvas = canvas;
exports.clearCache = clearCache;
exports.clearCacheEntry = clearCacheEntry;
exports.contrast = contrast;
exports.controller = controller;
exports.createProxy = createProxy;
exports.createYArray = createYArray;
exports.createYMap = createYMap;
exports.css = css;
exports.deepObserveAll = deepObserveAll;
exports.deepObserveAny = deepObserveAny;
exports.define = define;
exports.disposeEffect = disposeEffect;
exports.disposeEffects = disposeEffects;
exports.div = div;
exports.drawer = drawer;
exports.dropdown = dropdown;
exports.eachEqualToAny = eachEqualToAny;
exports.effect = effect;
exports.element = element;
exports.equalToAny = equalToAny;
exports.expose = expose;
exports.fetchSvg = fetchSvg;
exports.flexCol = flexCol;
exports.flexColCenter = flexColCenter;
exports.flexRow = flexRow;
exports.flexRowCenter = flexRowCenter;
exports.form = form;
exports.generateTagFunction = generateTagFunction;
exports.getEventPosition = getEventPosition;
exports.getFileExtension = getFileExtension;
exports.getFirstDescriptorInChain = getFirstDescriptorInChain;
exports.getFirstPrototypeInChainWith = getFirstPrototypeInChainWith;
exports.getSignal = getSignal;
exports.getSuperDescriptor = getSuperDescriptor;
exports.getSuperMethod = getSuperMethod;
exports.h1 = h1;
exports.h2 = h2;
exports.h3 = h3;
exports.h4 = h4;
exports.h5 = h5;
exports.h6 = h6;
exports.handler = handler;
exports.hasPropertyInChain = hasPropertyInChain;
exports.hashBySize = hashBySize;
exports.hashString = hashString;
exports.icon = icon;
exports.iconSwitch = iconSwitch;
exports.iconToggle = iconToggle;
exports.img = img;
exports.initializeEffects = initializeEffects;
exports.input = input;
exports.interactor = interactor;
exports.isMathMLTag = isMathMLTag;
exports.isNull = isNull;
exports.isSvgTag = isSvgTag;
exports.isUndefined = isUndefined;
exports.kebabToCamelCase = kebabToCamelCase;
exports.linearInterpolation = linearInterpolation;
exports.link = link;
exports.loadLocalFont = loadLocalFont;
exports.luminance = luminance;
exports.markDirty = markDirty;
exports.mod = mod;
exports.modelSignal = modelSignal;
exports.numericalInput = numericalInput;
exports.observe = observe;
exports.p = p;
exports.parse = parse;
exports.popup = popup;
exports.randomColor = randomColor;
exports.randomFromRange = randomFromRange;
exports.randomId = randomId;
exports.randomString = randomString;
exports.reifect = reifect;
exports.removeFromYArray = removeFromYArray;
exports.richElement = richElement;
exports.setSignal = setSignal;
exports.setupClassFunctions = setupClassFunctions;
exports.setupElementFunctions = setupElementFunctions;
exports.setupEventFunctions = setupEventFunctions;
exports.setupHierarchyFunctions = setupHierarchyFunctions;
exports.setupMiscFunctions = setupMiscFunctions;
exports.setupReifectFunctions = setupReifectFunctions;
exports.setupStyleFunctions = setupStyleFunctions;
exports.setupSubstrateFunctions = setupSubstrateFunctions;
exports.setupToolFunctions = setupToolFunctions;
exports.signal = signal;
exports.solver = solver;
exports.spacer = spacer;
exports.span = span;
exports.statefulReifier = statefulReifier;
exports.stringify = stringify;
exports.style = style;
exports.stylesheet = stylesheet;
exports.substrate = substrate;
exports.t = t;
exports.textToElement = textToElement;
exports.textarea = textarea;
exports.tool = tool;
exports.trim = trim;
exports.tu = tu;
exports.turbo = turbo;
exports.turboInput = turboInput;
exports.turbofy = turbofy;
exports.video = video;
