/**
 * @typedef {Object} AutoOptions
 * @description Options for configuring the `auto` decorator.
 * @property {boolean} [cancelIfUnchanged=true] - If true, cancels the setter if the new value is the same as the
 * current value. Defaults to `true`.
 * @property {(value: Type) => Type} [callBefore] - Optional callback to execute on the value just before it is set.
 * @property {boolean} [returnDefinedGetterValue] - If true and a getter is defined, will not modify the latter.
 * @template Type
 */

/**
 * @typedef {Object} CacheOptions
 * @property {number} [timeout] - The duration (in milliseconds) after which the cache should expire.
 * @property {string | string[]} [onEvent] - A string of one or more space-separated event names or an array of
 * event names. The cache will be cleared when one of these events occur.
 * @property {() => boolean | Promise<boolean>} [onCallback] - A callback function that returns a boolean or a
 * promise resolving to a boolean. The cache will be cleared if the function returns true.
 * @property {number} [onCallbackFrequency] - The frequency (in milliseconds) at which the onCallback function is called.
 * @property {string | Function | (string | Function)[]} [onFieldChange] - The field or function names to watch for
 * changes. The cache will be cleared when any of these change. Multiple field names can be provided in the same.
 * @property {boolean} [clearOnNextFrame] - If set to true, the cache will be cleared on the next animation frame.
 * space-separated string.
 */

/**
 * @typedef {Object} ElementTagDefinition
 * @template {ValidTag} Tag
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {Tag} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svgManipulation" or "mathML" is provided,
 * the corresponding namespace will be used to create the element. Otherwise, the custom namespace provided will be used.
 */

/**
 * @typedef {Object} TurboProperties
 * @template {ValidTag} Tag - The HTML (or other) tag of the element, if passing it as a property. Defaults to "div".
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 *
 * @description Object containing properties for configuring a TurboElement, or any Element. A tag (and
 * possibly a namespace) can be provided for TurboProxiedElements for element creation. TurboElements will ignore these
 * properties if set.
 * Any HTML attribute can be passed as key to be processed by the class/function. A few of these attributes were
 * explicitly defined here for autocompletion in JavaScript. Use TypeScript for optimal autocompletion (with the target
 * generic type, if needed). The type also has the following described custom properties:
 *
 * @property {string} [id] - The ID of the element.
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of
 * space-separated classes or an array of class names).
 * @property {string} [style] - The inline style of the element. Use the css literal function for autocompletion.
 * @property {string} [stylesheet] - The associated stylesheet (if any) with the element. Declaring this property will
 * generate automatically a new style element in the element's corresponding root. Use the css literal function
 * for autocompletion.
 * @property {Record<string, EventListenerOrEventListenerObject | ((e: Event, el: Element) => void)>} [listeners]
 * - An object containing event listeners to be applied to this element.
 * @property {Element | Element[]} [children] - An array of child wrappers or elements to append to
 * the created element.
 * @property {Element} [parent] - The parent element to which the created element will be appended.
 * @property {string | Element} [out] - If defined, declares (or sets) the element in the parent as a field with the given value
 * as name.
 * @property {string} [text] - The text content of the element (if any).
 * @property {boolean} [shadowDOM] - If true, indicate that the element will be created under a shadow root.
 *
 * @property alt
 * @property src
 * @property href
 * @property target
 * @property action
 * @property method
 * @property type
 * @property value
 * @property placeholder
 * @property name
 * @property disabled
 * @property checked
 * @property selected
 */

/**
 * @typedef {Object} StylesRoot
 * @description A type that represents entities that can hold a <style> object (Shadow root or HTML head).
 */

/**
 * @typedef {Object} StylesType
 * @description A type that represents types that are accepted as styles entries (mainly by the HTMLElement.setStyles()
 * method).
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
 * @typedef {Object} TurboElementProperties
 * @extends TurboProperties
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 *
 * @description Object containing properties for configuring a custom HTML element. Is basically TurboProperties
 * without the tag.
 */

/**
 * @typedef {Object} TurboButtonProperties
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboProperties
 *
 * @property {string | Element} [buttonText] - The text content of the button.
 * @property {string | Element} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | Element} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {Element | Element[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {Element | Element[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 * @property {"button" | "submit" | "reset"} [type] - The type of the button (Can be "button", "submit", or "reset").
 * @property {ValidTag} [customTextTag] - The HTML tag to be used for the buttonText element (if the latter is passed as
 * a string). If not specified, the default text tag specified in the Button class will be used.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Button
 * to this instance of Button.
 */

/**
 * @typedef {Object} ButtonChildren
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {Element | Element[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {Element | null} leftIcon - The icon placed on the left side of the button.
 * @property {Element | null} text - The text element of the button.
 * @property {Element | null} rightIcon - The icon placed on the right side of the button.
 * @property {Element | Element[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
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
 * @typedef {Object} TurboRichElementChildren
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {Element | Element[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {Element | null} leftIcon - The icon placed on the left side of the button.
 * @property {Element | null} text - The text element of the button.
 * @property {Element | null} rightIcon - The icon placed on the right side of the button.
 * @property {Element | Element[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
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
 * @typedef {Object} TurboSelectEntryProperties
 * @description Properties for configuring a DropdownEntry.
 * @extends TurboProperties
 *
 * @property {string} value - The value associated with the dropdown entry.
 * @property {boolean} [selected=false] - Indicates whether the entry is initially selected.
 * @property {string | string[]} [selectedClasses=""] - CSS class(es) applied to the entry when it is selected.
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
 * @property {ValidTag} [customSelectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 * @property {ValidTag} [customEntryTag] - Custom HTML tag for dropdown entries.  Overrides the
 * default tag set in TurboConfig.Dropdown.
 *
 * @property {string | string[]} [customSelectorClasses] - Custom CSS class(es) for the selector. Overrides the default
 * classes set in TurboConfig.Dropdown.
 * @property {string | string[]} [customPopupClasses] - Custom CSS class(es) for the popup container. Overrides the
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
 * @property {ValidTag} [defaultEntryTag] - The default HTML tag for the creation of generic
 * dropdown entries.
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
 * @typedef {Object} MakeToolOptions
 * @description Options used when turning an element into a tool via `makeTool`.
 * @property {DefaultEventNameEntry} [activationEvent] - Custom activation event to listen to
 * (defaults to the framework's default click event name).
 * @property {ClickMode} [clickMode] -  Click mode that will hold this tool when activated (defaults to `ClickMode.left`).
 * @property {(el: Turbo, manager: TurboEventManager) => void} [activateOn] - Custom activator. If provided, is called with `(el, manager)` and should wire activation itself.
 * @property {string} [key] - Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults to `TurboEventManager.instance`.
 */

/**
 * @typedef {Object} ToolBehaviorCallback
 * @description Function signature for a tool behavior. Returning `true` marks the behavior as handled/consumed.
 * @param {Event} event - The original DOM/Turbo event.
 * @param {Node} target - The node the behavior should operate on (the object or its embedded target).
 * @param {ToolBehaviorOptions} [options] - Additional info (embedded context, etc.).
 * @return {boolean} Whether the behavior handled the action.
 */

/**
 * @typedef {Object} ToolBehaviorOptions
 * @description Options passed to tool behaviors at execution time.
 * @property {boolean} [isEmbedded] - Indicates if the tool is embedded in a target node (so behaviors may adjust accordingly).
 * @property {Node} [embeddedTarget] - The embedded target node, if any. Behaviors can use this as the operation target when appropriate.
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

const utils$7 = new AutoUtils();
/**
 * @function auto
 * @description Stage-3 decorator that adds the “missing half” (getter or setter) and/or
 * wraps existing ones. Works with field / getter / setter / accessor. Designed to chain
 * cleanly with `@observe`.
 *
 * Options (use `autoFactory(opts)` if you need to pass them):
 *  - cancelIfUnchanged (default: true)
 *  - callBefore?: (value) => value    (preprocess before storing/forwarding)
 *  - returnDefinedGetterValue (default: false)  (when user getter exists)
 */
function auto(options) {
    return function (value, context) {
        if (!options)
            options = {};
        const { kind, name, static: isStatic } = context;
        const key = name;
        const backing = Symbol(`__auto_${key}`);
        context.addInitializer(function () {
            const prototype = isStatic ? this : this.constructor.prototype;
            let customGetter;
            let customSetter;
            const read = function () {
                if (customGetter && options?.returnDefinedGetterValue)
                    return customGetter.call(this);
                return this[backing];
            };
            const write = function (value) {
                const next = options?.callBefore ? options.callBefore.call(this, value) : value;
                if ((options.cancelIfUnchanged ?? true) && this[backing] === next)
                    return;
                this[backing] = next;
                if (customSetter)
                    customSetter.call(this, next);
            };
            if (kind === "field" || kind === "accessor") {
                const accessor = value;
                if (accessor?.get)
                    customGetter = accessor.get;
                if (accessor?.set)
                    customSetter = accessor.set;
                const descriptor = Object.getOwnPropertyDescriptor(this, key);
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor?.enumerable ?? true,
                    get: () => read.call(this),
                    set: (value) => write.call(this, value),
                });
            }
            else if (kind === "getter" || kind === "setter") {
                const installed = utils$7.constructorData(prototype).installed;
                if (installed.get(key))
                    return;
                installed.set(key, true);
                const descriptor = Object.getOwnPropertyDescriptor(prototype, key) ?? {};
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
    };
}

/**
 * Stringify args into a stable cache key.
 * Matches your previous logic, preserving function/object handling.
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
/** Create the same symbol label you used before so clearing keeps working. */
function cacheKeySymbolFor(name) {
    return Symbol(`__cache__${name}`);
}
/**
 * Install invalidation triggers on first use per instance.
 */
function initInvalidation(instance, name, isGetterCache, cacheKey, timeouts, options, deleteFn) {
    // onEvent: attach to instance if it’s an EventTarget, else to document
    if (options.onEvent) {
        const target = typeof instance?.addEventListener === "function" ? instance : document;
        const names = Array.isArray(options.onEvent)
            ? options.onEvent
            : String(options.onEvent).split(/\s+/).filter(Boolean);
        for (const evt of names) {
            target.addEventListener(evt, () => deleteFn());
        }
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
            const hasOwn = Object.prototype.hasOwnProperty.call(instance, fieldName);
            let desc = hasOwn
                ? Object.getOwnPropertyDescriptor(instance, fieldName)
                : Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), fieldName);
            // If it's a method, wrap it (on the instance) to invalidate before/after
            const existing = (hasOwn ? instance[fieldName] : instance[fieldName]);
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
 * Stage-3 cache decorator:
 *  - method: caches per arguments
 *  - getter: caches once per instance
 *  - accessor: wraps the getter like a cached getter (setter unchanged)
 */
function cache(options = {}) {
    return function (value, // accessor
    ctx) {
        const name = String(ctx.name);
        const cacheKey = cacheKeySymbolFor(name);
        const setupKey = Symbol(`__cache__setup__${name}`);
        const timeouts = [];
        // delete function shared by variants
        const deleteCallback = function (hard = true) {
            if (!hard)
                return;
            const slot = this[cacheKey];
            if (!slot)
                return;
            // getter: single value; method: Map
            if (slot instanceof Map)
                slot.clear();
            else
                delete this[cacheKey];
            // clear pending timers
            for (const t of timeouts)
                clearTimeout(t);
            timeouts.length = 0;
        };
        // one-time per-instance setup
        const ensureSetup = function () {
            if (this[setupKey])
                return;
            this[setupKey] = true;
            initInvalidation(this, name, ctx.kind === "getter" || ctx.kind === "accessor", cacheKey, timeouts, options, deleteCallback.bind(this));
        };
        // ---- METHOD -----------------------------------------------------------
        if (ctx.kind === "method") {
            const original = value;
            ctx.addInitializer(function () {
                // initialize storage
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
        if (ctx.kind === "getter") {
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
        if (ctx.kind === "accessor") {
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
        // fields not supported by the original decorator; ignore
    };
}
/**
 * Clear *all* cache entries on an instance created by @cache
 * (we scan for symbols named Symbol(__cache__...)).
 */
function clearCache(instance) {
    for (const sym of Object.getOwnPropertySymbols(instance)) {
        if (String(sym).startsWith("Symbol(__cache__")) {
            delete instance[sym];
        }
    }
}
/**
 * Clear a specific cache entry for a given method/getter name (or function).
 */
function clearCacheEntry(instance, field) {
    const name = typeof field === "function" ? field.name : field;
    const sym = Object.getOwnPropertySymbols(instance).find((s) => String(s) === `Symbol(__cache__${name})`);
    if (sym)
        delete instance[sym];
}

/**
/**
 * @function callOnce
 * @description Stage-3 method decorator: ensures a method is called only once per instance.
 * Subsequent calls no-op and log a warning. Works for instance or static methods.
 *
 * Usage:
 *   class A {
 *     @callOnce
 *     init() { ... }
 *   }
 */
function callOnce(value, ctx) {
    if (ctx.kind !== "method") {
        throw new Error(`@callOnce can only be used on methods (got: ${ctx.kind}).`);
    }
    const name = String(ctx.name);
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
/**
 * @function callOncePerInstance
 * @description Stage-3 method decorator (factory) that ensures the method
 * runs only once per *instance*. Later calls no-op. If you pass a `key`,
 * all methods decorated with the same key on the same instance share the
 * same gate (i.e., only the first of them will run once).
 *
 * Usage:
 *   class A {
 *     @callOncePerInstance()           // unique per method
 *     init() { ... }
 *
 *     @callOncePerInstance("bootKey")  // shared gate with others using "bootKey"
 *     boot() { ... }
 *   }
 */
function callOncePerInstance(key) {
    return function (value, ctx) {
        if (ctx.kind !== "method") {
            throw new Error(`@callOncePerInstance can only be used on methods (got: ${ctx.kind}).`);
        }
        const name = String(ctx.name);
        const flag = key ?? Symbol(`__callOncePerInstance__${name}`);
        return function (...args) {
            if (this[flag])
                return;
            this[flag] = true;
            return value.apply(this, args);
        };
    };
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

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
        this.model = model;
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
        this.addWithBlock(key, this.model.defaultBlockKey, callback);
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
        this.removeWithBlock(key, this.model.defaultBlockKey, callback);
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
        this.fireWithBlock(key, this.model.defaultBlockKey, ...args);
    }
}

/**
 * @class Mvc
 * @description MVC -- Model-View-Component -- handler. Generates and manages an MVC structure for a certain object.
 * @template {object} ElementType - The type of the object that will be turned into MVC.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * */
let Mvc = (() => {
    let _instanceExtraInitializers = [];
    let _set_view_decorators;
    let _set_emitter_decorators;
    return class Mvc {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _set_view_decorators = [auto()];
            _set_emitter_decorators = [auto()];
            __esDecorate(this, null, _set_view_decorators, { kind: "setter", name: "view", static: false, private: false, access: { has: obj => "view" in obj, set: (obj, value) => { obj.view = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_emitter_decorators, { kind: "setter", name: "emitter", static: false, private: false, access: { has: obj => "emitter" in obj, set: (obj, value) => { obj.emitter = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        element = __runInitializers(this, _instanceExtraInitializers);
        _model;
        controllers = new Map();
        interactors = new Map();
        tools = new Map();
        substrates = new Map();
        constructor(properties) {
            if (properties.element)
                this.element = properties.element;
            this.generate(properties);
        }
        /**
         * @description The view (if any) of the current MVC structure. Setting it will link the current model (if any)
         * to this new view.
         */
        set view(value) {
            this.linkModelToView();
        }
        /**
         * @description The model (if any) of the current MVC structure. Setting it will de-link the previous model and link
         * the new one to the current view (if any) and emitter (if any).
         */
        get model() {
            return this._model;
        }
        set model(model) {
            this.deLinkModelFromEmitter();
            this._model = model;
            this.linkModelToEmitter();
            this.linkModelToView();
        }
        /**
         * @description The emitter (if any) of the current MVC structure. Setting it will link the current model (if any)
         * to this new emitter.
         */
        set emitter(emitter) {
            this.linkModelToEmitter();
        }
        /**
         * @description The main data block (if any) attached to the element, taken from its model (if any).
         */
        get data() {
            return this.model?.data;
        }
        set data(data) {
            if (this.model)
                this.model.data = data;
        }
        /**
         * @description The ID of the main data block (if any) of the element, taken from its model (if any).
         */
        get dataId() {
            return this.model?.dataId;
        }
        set dataId(value) {
            if (this.model)
                this.model.dataId = value;
        }
        /**
         * @description The numerical index of the main data block (if any) of the element, taken from its model (if any).
         */
        get dataIndex() {
            return Number.parseInt(this.dataId);
        }
        set dataIndex(value) {
            if (this.model)
                this.model.dataId = value.toString();
        }
        /**
         * @description The size (number) of the main data block (if any) of the element, taken from its model (if any).
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
            return this.controllers.get(key);
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
            this.controllers.set(controller.keyName, controller);
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
            return this.model.getHandler(key);
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
            this.model.addHandler(handler.keyName, handler);
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
            return this.interactors.get(key);
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
            this.interactors.set(interactor.keyName, interactor);
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
            return this.tools.get(key);
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
            this.tools.set(tool.keyName, tool);
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
            return this.substrates.get(key);
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
            this.substrates.set(substrate.keyName, substrate);
        }
        /**
         * @function generate
         * @description Generates the MVC structure based on the provided properties.
         * If no model or modelConstructor is defined, no model will be generated. Similarly for the view.
         * If the structure contains a model, an emitter will be created, even if it is not defined in the properties.
         * @param {MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>} properties - The properties to use
         * to generate the MVC structure.
         */
        generate(properties = {}) {
            const { view, model, emitter, controllers, handlers, interactors, tools, substrates, data, initialize = true, force = false } = properties;
            //Model
            if (model && (force || !this.model))
                this.model = this.generateInstance(model, data, false);
            if (data !== undefined && this.model && this.model.data !== data)
                this.model.data = data;
            //Emitter
            if ((emitter || this.model) && (force || !this.emitter)) {
                this.emitter = this.generateInstance(emitter ?? TurboEmitter, this.model, false);
            }
            const constructorProperties = {
                element: this.element,
                model: this.model,
                emitter: this.emitter,
                view: undefined
            };
            //View
            if (view && (force || !this.view)) {
                this.view = this.generateInstance(view, constructorProperties);
                if (typeof view !== "function") {
                    this.view.model = this.model;
                    this.view.emitter = this.emitter;
                    this.view.element = this.element;
                }
            }
            constructorProperties.view = this.view;
            //Controllers
            this.generateInstances(controllers, constructorProperties)
                .forEach(instance => this.addController(instance));
            //Handlers
            this.generateInstances(handlers, this.model, false)
                .forEach(instance => this.addHandler(instance));
            //Interactors
            this.generateInstances(interactors, constructorProperties)
                .forEach(instance => this.addInteractor(instance));
            //Tools
            this.generateInstances(tools, constructorProperties)
                .forEach(instance => this.addTool(instance));
            //Substrates
            this.generateInstances(substrates, constructorProperties)
                .forEach(instance => this.addSubstrate(instance));
            if (initialize)
                this.initialize();
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
        /**
         * @function initialize
         * @description Initializes the MVC parts: the view, the controllers, and the model (in this order). The model is
         * initialized last to allow for the view and controllers to setup their change callbacks.
         */
        initialize() {
            this.view?.initialize();
            this.controllers.forEach(controller => controller.initialize());
            this.model?.initialize();
            this.interactors.forEach(interactor => interactor.initialize());
            this.tools.forEach(tool => tool.initialize());
            this.substrates.forEach(substrate => substrate.initialize());
        }
        linkModelToView() {
            if (!this.view || !this.model)
                return;
            this.view.model = this.model;
        }
        emitterFireCallback = (keyName, blockKey, ...args) => this.emitter.fireWithBlock(keyName, blockKey, ...args);
        deLinkModelFromEmitter() {
            if (!this.emitter || !this.model)
                return;
            this.model.keyChangedCallback.remove(this.emitterFireCallback);
        }
        linkModelToEmitter() {
            if (!this.emitter || !this.model)
                return;
            this.emitter.model = this.model;
            this.model.keyChangedCallback.add(this.emitterFireCallback);
        }
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
    };
})();

function inferKey(name, type, context) {
    return name ?? (String(context.name).endsWith(type)
        ? String(context.name).slice(0, -type.length)
        : String(context.name));
}
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
                if (type === "Controller") {
                    if (this.mvc && this.mvc instanceof Mvc)
                        value = this.mvc.getController(keyName);
                    else if (this.getController && typeof this.getController === "function")
                        value = this.getController(keyName);
                }
                else {
                    if (this.mvc && this.mvc instanceof Mvc)
                        value = this.mvc.getHandler(keyName);
                    else if (this.getHandler && typeof this.getHandler === "function")
                        value = this.getHandler(keyName);
                }
                if (!value)
                    throw new Error(`${type} "${keyName}" not found on ${this?.constructor?.name}.`);
                this[cacheKey] = value;
                return value;
            },
            set: function (value) { this[cacheKey] = value; }
        });
    });
}
function controller(name) {
    return function (_unused, context) {
        generateField(context, "Controller", name);
    };
}
function handler(name) {
    return function (_unused, context) {
        generateField(context, "Handler", name);
    };
}

/**
 * @description Converts the passed variable into a string.
 * @param value - The variable to convert to string
 * @returns {string} - The string representation of the value
 */
function stringify(value) {
    if (value === null || value === undefined)
        return "";
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
    switch (str) {
        case "":
            return undefined;
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

/**
 * Class decorator factory.
 * - Registers the element with customElements (name inferred if omitted).
 * - Publishes a *live* `observedAttributes` getter that merges attributes from
 *   this class and its ancestors, using metadata collected by your member decorator(s).
 *
 * Usage:
 *   @define()            // name comes from ClassName -> class-name
 *   class MyEl extends HTMLElement { ... }
 *
 *   @define("my-el")     // explicit name
 *   class MyEl extends HTMLElement { ... }
 */
function define(elementName, options = { injectAttributeBridge: true }) {
    return function (constructor, context) {
        Object.defineProperty(constructor, "observedAttributes", {
            configurable: true,
            enumerable: false,
            get() {
                const combined = new Set();
                let constructor = this;
                while (constructor) {
                    const set = context.metadata.observedAttributes;
                    if (set)
                        for (const entry of set)
                            combined.add(entry);
                    constructor = Object.getPrototypeOf(constructor);
                }
                return Array.from(combined);
            },
        });
        if (options.injectAttributeBridge !== false) {
            const prototype = constructor.prototype;
            if (typeof prototype["attributeChangedCallback"] !== "function") {
                Object.defineProperty(prototype, "attributeChangedCallback", {
                    configurable: true,
                    enumerable: false,
                    writable: true,
                    value(name, oldValue, newValue) {
                        if (newValue === null || newValue === oldValue)
                            return;
                        const prop = kebabToCamelCase(name);
                        if (!(prop in this))
                            return;
                        try {
                            this[prop] = parse(newValue);
                        }
                        catch {
                            this[prop] = newValue;
                        }
                    },
                });
            }
        }
        const name = elementName ?? camelToKebabCase(constructor.name);
        if (name && !customElements.get(name))
            customElements.define(name, constructor);
        return constructor;
    };
}

if (!("metadata" in Symbol)) {
    Object.defineProperty(Symbol, "metadata", {
        value: Symbol.for("Symbol.metadata"),
        writable: false, enumerable: false, configurable: true,
    });
}
/** * @description Member decorator for fields or accessors that reflects a property to an HTML attribute. * Also records the attribute name into class metadata so @useObservedAttributes() can expose it. * @param {unknown} value - Optional explicit attribute name. Defaults to camelCase → kebab-case. * @param context */
function observe(value, context) {
    const propName = String(context.name);
    const attr = camelToKebabCase(propName);
    if (context.metadata) {
        const curList = context.metadata.observedAttributes;
        if (!Object.prototype.hasOwnProperty.call(context.metadata, "observedAttributes"))
            context.metadata.observedAttributes = new Set(curList);
        context.metadata.observedAttributes.add(attr);
    }
    const backing = Symbol(`__observed_${propName}`);
    if (context.kind === "getter")
        return generateGetter(value, backing);
    if (context.kind === "setter")
        return generateSetter(value, backing, propName, attr);
    if (context.kind === "accessor")
        return {
            get() { return generateGetter(value?.get, backing).call(this); },
            set(v) { generateSetter(value?.set, backing, propName, attr).call(this, v); }
        };
    if (context.kind === "field") {
        const init = value;
        context.addInitializer(function () {
            const hadOwn = Object.prototype.hasOwnProperty.call(this, propName);
            const initial = hadOwn ? this[propName] : undefined;
            Object.defineProperty(this, propName, {
                configurable: true,
                enumerable: true,
                get: function () { return this[backing]; },
                set: function (nv) {
                    if (this[backing] === nv)
                        return;
                    this[backing] = nv;
                    this.setAttribute?.(attr, stringify(nv));
                },
            });
            if (hadOwn)
                this[propName] = initial;
        });
        return (value) => (typeof init === "function" ? init(value) : value);
    }
}
function generateGetter(getter, backingField) {
    return getter ?? function () { return this[backingField]; };
}
function generateSetter(setter, backingField, propName, attr) {
    return function (value) {
        const prev = this[propName];
        if (prev === value)
            return;
        if (setter)
            setter.call(this, value);
        else
            this[backingField] = value;
        this.setAttribute?.(attr, stringify(this[propName]));
    };
}

class SignalUtils {
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
    createSignalEntry(target, key, read, write, options) {
        const subs = new Set();
        const self = this;
        if (!options)
            options = { diffOnWrite: true };
        const entry = {
            get() {
                self.track(entry);
                return read();
            },
            set(value) {
                //If "write" is passed, setup emit() behavior. Otherwise, reflect to already defined setter.
                if (write && !options.diffOnWrite) {
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
                    Reflect.set(target, key, value, target);
            },
            update(updater) {
                entry.set(updater(read()));
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
    getSignal(target, key) {
        return this.data(target).get(key);
    }
    setSignal(target, key, next) {
        const entry = this.data(target).get(key);
        if (entry)
            entry.set(next);
        else
            Reflect.set(target, key, next, target);
    }
    markDirty(target, key) {
        this.data(target).get(key)?.emit();
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

const utils$6 = new SignalUtils();
function effect(callback) {
    const effect = {
        callback: callback,
        dependencies: new Set(),
        cleanups: [],
        scheduled: false,
        run() {
            for (const cleanup of this.cleanups)
                cleanup();
            this.cleanups = [];
            this.dependencies = new Set();
            utils$6.activeEffect = this;
            try {
                this.callback();
            }
            finally {
                utils$6.activeEffect = null;
            }
            for (const dep of this.dependencies) {
                const unsub = dep.sub(() => utils$6.schedule(this));
                this.cleanups.push(unsub);
            }
        },
        dispose() {
            for (const cleanup of this.cleanups)
                cleanup();
            this.cleanups = [];
            this.dependencies.clear();
        }
    };
    effect.run();
    return () => effect.dispose();
}
/**
 * Works on:
 *  - fields:        `@signal foo = 0`
 *  - auto-accessors:`@signal accessor foo = 0`
 *  - getter:        `@signal get foo() { ... }`
 *  - setter:        `@signal set foo(v) { ... }`
 *
 * Private fields/getters/setters are NOT supported.
 */
//TODO MAYBE MAKE IT WORK FOR CHANGES IN NESTED FIELDS OF OBJECT/ARRAY VIA PROXY
function signal(value, context) {
    const { kind, name, static: isStatic, private: isPrivate } = context;
    if (isPrivate)
        throw new Error("@signal does not support private class elements.");
    const key = name;
    const backingKey = Symbol(`[[signal:${String(key)}]]`);
    const shadowKey = Symbol(`[[signal:${String(key)}:shadow]]`);
    context.addInitializer(function () {
        const prototype = isStatic ? this : this.constructor.prototype;
        let customGetter;
        let customSetter;
        const read = function () {
            if (customGetter && !this[shadowKey])
                return customGetter.call(this);
            return this[backingKey];
        };
        const write = function (value) {
            if (customSetter) {
                customSetter.call(this, value);
                if (!customGetter) {
                    this[backingKey] = value;
                    this[shadowKey] = true;
                }
            }
            else {
                this[backingKey] = value;
                this[shadowKey] = true;
            }
        };
        function ensureEntry(self, diffOnWrite = true) {
            let entry = utils$6.getSignal(self, key);
            if (entry)
                return entry;
            if (kind === "field" && !customGetter)
                self[backingKey] = self[key];
            entry = utils$6.createSignalEntry(self, key, () => read.call(self), (value) => write.call(self, value), { diffOnWrite });
            utils$6.data(self).set(key, entry);
            if (kind === "field")
                delete self[key];
            return entry;
        }
        if (kind === "field" || kind === "accessor") {
            const accessor = value;
            if (accessor?.get)
                customGetter = accessor.get;
            if (accessor?.set)
                customSetter = accessor.set;
            const entry = ensureEntry(this);
            const descriptor = Object.getOwnPropertyDescriptor(this, key);
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: descriptor?.enumerable ?? true,
                get: () => {
                    utils$6.track(entry);
                    return read.call(this);
                },
                set: (value) => entry.set(value),
            });
        }
        else if (kind === "getter" || kind === "setter") {
            const installed = utils$6.constructorData(prototype).installed;
            if (installed.get(key))
                return;
            installed.set(key, true);
            const descriptor = Object.getOwnPropertyDescriptor(prototype, key) ?? {};
            if (typeof descriptor.get === "function")
                customGetter = descriptor.get;
            if (typeof descriptor.set === "function")
                customSetter = descriptor.set;
            Object.defineProperty(prototype, key, {
                configurable: true,
                enumerable: !!descriptor?.enumerable,
                get: function () {
                    const entry = ensureEntry(this, false);
                    utils$6.track(entry);
                    return read.call(this);
                },
                set: function (value) {
                    const entry = ensureEntry(this, false);
                    entry.set(value);
                },
            });
        }
    });
}
function getSignal(target, key) {
    return utils$6.getSignal(target, key);
}
function setSignal(target, key, next) {
    return utils$6.setSignal(target, key, next);
}
function markDirty(target, key) {
    return utils$6.markDirty(target, key);
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

class TurboSelector {
    element;
    constructor() {
        return this.#generateProxy();
    }
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

const utils$5 = new HierarchyFunctionsUtils();
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
            utils$5.data(this).childHandler = value;
        },
        get: function () {
            const childHandler = utils$5.data(this).childHandler;
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
        if (!this || !children)
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
        if (!this || !children)
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
        if (!this || !children)
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
        if (!this || index === undefined || index < 0)
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
        if (!this)
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
        if (!this || index === undefined)
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
        if (!this || !child)
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
        if (!this || !children)
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
        if (!this || !type || !(this.element instanceof Element))
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
        if (!parents)
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
        if (!children)
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
        if (!referenceList)
            return -1;
        return referenceList.indexOf(this.element);
    };
}

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

const utils$4 = new ClassFunctionsUtils();
function setupClassFunctions() {
    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.addClass = function _addClass(classes) {
        if (!(this.element instanceof Element))
            return this;
        return utils$4.operateOnClasses(this, classes, entry => this.element.classList.add(entry));
    };
    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.removeClass = function _removeClass(classes) {
        if (!(this.element instanceof Element))
            return this;
        return utils$4.operateOnClasses(this, classes, entry => this.element.classList.remove(entry));
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
        return utils$4.operateOnClasses(this, classes, entry => this.element.classList.toggle(entry, force));
    };
    /**
     * @description Check if the element's class list contains the provided class(es).
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings
     * @return A boolean indicating whether the provided classes are included
     */
    TurboSelector.prototype.hasClass = function _hasClass(classes) {
        if (!this || !classes || !(this.element instanceof Element))
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
        Object.keys(properties).forEach(property => {
            switch (property) {
                case "tag":
                case "namespace":
                case "shadowDOM":
                    return;
                case "text":
                    if (!(this.element instanceof HTMLElement))
                        return;
                    this.element.innerText = properties.text;
                    return;
                case "style":
                    if (!(this.element instanceof HTMLElement || this.element instanceof SVGElement))
                        return;
                    this.element.style.cssText += properties.style;
                    return;
                case "stylesheet":
                    stylesheet(properties.stylesheet, this.closestRoot);
                    return;
                case "id":
                    this.element.id = properties.id;
                    return;
                case "classes":
                    this.addClass(properties.classes);
                    return;
                case "listeners":
                    Object.keys(properties.listeners).forEach(listenerType => this.on(listenerType, properties.listeners[listenerType]));
                    return;
                case "children":
                    this.addChild(properties.children);
                    return;
                case "parent":
                    if (!properties.parent)
                        return;
                    $(properties.parent).addChild(this.element);
                    return;
                default:
                    if (setOnlyBaseProperties)
                        return;
                    try {
                        this.element[property] = properties[property];
                    }
                    catch (e) {
                        try {
                            this.setAttribute(property, properties[property]);
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    return;
            }
        });
        return this;
    };
    /**
     * @description Destroys the node by removing it from the document and removing all its bound listeners.
     * @returns {this} Itself, allowing for method chaining.
     */
    TurboSelector.prototype.destroy = function _destroy() {
        this.removeAllListeners();
        this.remove();
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
    "wheel", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup",
];

var ActionMode;
(function (ActionMode) {
    ActionMode[ActionMode["none"] = 0] = "none";
    ActionMode[ActionMode["click"] = 1] = "click";
    ActionMode[ActionMode["longPress"] = 2] = "longPress";
    ActionMode[ActionMode["drag"] = 3] = "drag";
})(ActionMode || (ActionMode = {}));
var ClickMode;
(function (ClickMode) {
    ClickMode[ClickMode["none"] = 0] = "none";
    ClickMode[ClickMode["left"] = 1] = "left";
    ClickMode[ClickMode["right"] = 2] = "right";
    ClickMode[ClickMode["middle"] = 3] = "middle";
    ClickMode[ClickMode["other"] = 4] = "other";
    ClickMode[ClickMode["key"] = 5] = "key";
})(ClickMode || (ClickMode = {}));
var InputDevice;
(function (InputDevice) {
    InputDevice[InputDevice["unknown"] = 0] = "unknown";
    InputDevice[InputDevice["mouse"] = 1] = "mouse";
    InputDevice[InputDevice["trackpad"] = 2] = "trackpad";
    InputDevice[InputDevice["touch"] = 3] = "touch";
})(InputDevice || (InputDevice = {}));

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
    blur: "blur",
    resize: "resize"
};

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

class Delegate {
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
     * @description Invokes all callbacks with the provided arguments.
     * @param args - The arguments to pass to the callbacks.
     */
    fire(...args) {
        for (const callback of this.callbacks) {
            try {
                callback(...args);
            }
            catch (error) {
                console.error("Error invoking callback:", error);
            }
        }
    }
    /**
     * @description Clears added callbacks
     */
    clear() {
        this.callbacks.clear();
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
            __esDecorate(null, null, _enabledCallbacks_decorators, { kind: "field", name: "enabledCallbacks", static: false, private: false, access: { has: obj => "enabledCallbacks" in obj, get: obj => obj.enabledCallbacks, set: (obj, value) => { obj.enabledCallbacks = value; } }, metadata: _metadata }, _enabledCallbacks_initializers, _enabledCallbacks_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        isDataBlocksArray = false;
        dataBlocks;
        handlers = new Map();
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
            __runInitializers(this, _enabledCallbacks_extraInitializers);
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
        /**
         * @description Whether callbacks are enabled or disabled.
         */
        enabledCallbacks = __runInitializers(this, _enabledCallbacks_initializers, void 0);
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
         * @param {string} key - The identifier for the handler.
         * @param {TurboHandler} handler - The handler instance to register.
         */
        addHandler(key, handler) {
            this.handlers.set(key, handler);
        }
    };
})();

let TurboEventManagerModel = (() => {
    let _classSuper = TurboModel;
    let _utils_decorators;
    let _utils_initializers = [];
    let _utils_extraInitializers = [];
    return class TurboEventManagerModel extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _utils_decorators = [handler()];
            __esDecorate(null, null, _utils_decorators, { kind: "field", name: "utils", static: false, private: false, access: { has: obj => "utils" in obj, get: obj => obj.utils, set: (obj, value) => { obj.utils = value; } }, metadata: _metadata }, _utils_initializers, _utils_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        _inputDevice;
        utils = __runInitializers(this, _utils_initializers, void 0);
        state = (__runInitializers(this, _utils_extraInitializers), {});
        lockState = {};
        //Delegate fired when the input device changes
        onInputDeviceChange = new Delegate();
        /**
         * @description Delegate fired when a tool is changed on a certain click button/mode
         */
        onToolChange = new Delegate();
        //Input events states
        currentKeys = [];
        currentAction = ActionMode.none;
        currentClick = ClickMode.none;
        wasRecentlyTrackpad = false;
        //Threshold differentiating a click from a drag
        moveThreshold;
        //Duration to reach long press
        longPressDuration;
        authorizeEventScaling;
        scaleEventPosition;
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
        get inputDevice() {
            return this._inputDevice;
        }
        set inputDevice(value) {
            if (this.inputDevice == value)
                return;
            if (value == InputDevice.trackpad)
                this.wasRecentlyTrackpad = true;
            this._inputDevice = value;
            this.onInputDeviceChange.fire(value);
        }
    };
})();

var ClosestOrigin;
(function (ClosestOrigin) {
    ClosestOrigin["target"] = "target";
    ClosestOrigin["position"] = "position";
})(ClosestOrigin || (ClosestOrigin = {}));

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
            __esDecorate(this, null, _closest_decorators, { kind: "method", name: "closest", static: false, private: false, access: { has: obj => "closest" in obj, get: obj => obj.closest }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_scaledPosition_decorators, { kind: "getter", name: "scaledPosition", static: false, private: false, access: { has: obj => "scaledPosition" in obj, get: obj => obj.scaledPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * @description The event manager that fired this event.
         */
        eventManager = __runInitializers(this, _instanceExtraInitializers);
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
        closest(type, strict = true, from = ClosestOrigin.target) {
            const elements = from == ClosestOrigin.target ? [this.target]
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
 * @description The MVC base controller class. Its main job is to handle  (some part of or all of) the logic of the
 * component. It has access to the element, the model to read and write data, the view to update the UI, and the
 * emitter to listen for changes in the model. It can only communicate with other controllers via the emitter
 * (by firing or listening for changes on a certain key).
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
     * @description A reference to the component.
     * @protected
     */
    element;
    /**
     * @description A reference to the MVC view.
     * @protected
     */
    view;
    /**
     * @description A reference to the MVC model.
     * @protected
     */
    model;
    /**
     * @description A reference to the MVC emitter.
     * @protected
     */
    emitter;
    constructor(properties) {
        this.element = properties.element;
        this.view = properties.view;
        this.model = properties.model;
        this.emitter = properties.emitter;
    }
    /**
     * @function initialize
     * @description Initializes the controller. Specifically, it will setup the change callbacks.
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
            this.model.inputDevice = InputDevice.trackpad;
        //Set input device to mouse if it wasn't trackpad recently
        if (!this.model.wasRecentlyTrackpad)
            this.model.inputDevice = InputDevice.mouse;
        //Reset trackpad timer
        this.model.utils.clearTimer("recentlyTrackpadTimer");
        //Set timer to clear recently trackpad boolean after a delay
        this.model.utils.setTimer("recentlyTrackpadTimer", () => {
            if (this.model.inputDevice == InputDevice.trackpad)
                this.model.wasRecentlyTrackpad = false;
        }, 800);
        //Get name of event according to input type
        let eventName;
        //Trackpad pinching (for some reason Ctrl key is marked as pressed in the WheelEvent)
        if (this.model.inputDevice == InputDevice.trackpad && e.ctrlKey)
            eventName = TurboEventName.trackpadPinch;
        //Trackpad zooming
        else if (this.model.inputDevice == InputDevice.trackpad)
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
            __esDecorate(this, null, _get_scaledOrigins_decorators, { kind: "getter", name: "scaledOrigins", static: false, private: false, access: { has: obj => "scaledOrigins" in obj, get: obj => obj.scaledOrigins }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_scaledPreviousPositions_decorators, { kind: "getter", name: "scaledPreviousPositions", static: false, private: false, access: { has: obj => "scaledPreviousPositions" in obj, get: obj => obj.scaledPreviousPositions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_scaledPositions_decorators, { kind: "getter", name: "scaledPositions", static: false, private: false, access: { has: obj => "scaledPositions" in obj, get: obj => obj.scaledPositions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_deltaPositions_decorators, { kind: "getter", name: "deltaPositions", static: false, private: false, access: { has: obj => "deltaPositions" in obj, get: obj => obj.deltaPositions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_deltaPosition_decorators, { kind: "getter", name: "deltaPosition", static: false, private: false, access: { has: obj => "deltaPosition" in obj, get: obj => obj.deltaPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_scaledDeltaPositions_decorators, { kind: "getter", name: "scaledDeltaPositions", static: false, private: false, access: { has: obj => "scaledDeltaPositions" in obj, get: obj => obj.scaledDeltaPositions }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_scaledDeltaPosition_decorators, { kind: "getter", name: "scaledDeltaPosition", static: false, private: false, access: { has: obj => "scaledDeltaPosition" in obj, get: obj => obj.scaledDeltaPosition }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * @description Map containing the origins of the dragging points
         */
        origins = __runInitializers(this, _instanceExtraInitializers);
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
    pointerDownFn(e) {
        if (!e.composedPath().includes(this.model.lockState.lockOrigin)) {
            document.activeElement?.blur?.();
            this.element.unlock();
        }
        if (!this.element.enabled)
            return;
        //Check if it's touch
        const isTouch = e instanceof TouchEvent;
        //Prevent default actions (especially useful for touch events on iOS and iPadOS)
        if (this.element.preventDefaultMouse && !isTouch)
            e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch)
            e.preventDefault();
        //Update the input device
        if (isTouch)
            this.model.inputDevice = InputDevice.touch;
        else if (this.model.inputDevice == InputDevice.unknown || this.model.inputDevice == InputDevice.touch)
            this.model.inputDevice = InputDevice.mouse;
        //Touch start initialization
        if (isTouch) {
            //Loop on all changed touch points (new ones) and initialize them
            Array.from(e.changedTouches).forEach(touchPoint => {
                const position = new Point(touchPoint);
                this.model.origins.set(touchPoint.identifier, position);
                this.model.previousPositions.set(touchPoint.identifier, position);
            });
            //Update click mode according to number of current touch points
            this.model.utils.setClickMode(e.touches.length, true);
        }
        //Mouse down initialization
        else {
            //Initialize origin and previous position
            const position = new Point(e);
            this.model.origins.set(0, position);
            this.model.previousPositions.set(0, position);
            //Update click mode
            this.model.utils.setClickMode(e.button);
        }
        //Return if click events are disabled
        if (!this.element.clickEventEnabled)
            return;
        //Fire click start
        this.fireClick(this.model.origins.first, TurboEventName.clickStart);
        this.model.currentAction = ActionMode.click;
        //Set long press timer
        this.model.utils.setTimer(TurboEventName.longPress, () => {
            if (this.model.currentAction != ActionMode.click)
                return;
            //Turn a click into long press
            this.model.currentAction = ActionMode.longPress;
            //Fire long press
            this.fireClick(this.model.origins.first, TurboEventName.longPress);
        }, this.model.longPressDuration);
    }
    ;
    pointerMove = (e) => this.pointerMoveFn(e);
    pointerMoveFn(e) {
        if (!this.element.enabled)
            return;
        if (!this.element.moveEventsEnabled && !this.element.dragEventEnabled)
            return;
        //Check if is touch
        const isTouch = e instanceof TouchEvent;
        //Prevent default actions
        if (this.element.preventDefaultMouse && !isTouch)
            e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch)
            e.preventDefault();
        //Initialize a new positions map
        this.model.positions = new TurboMap();
        //Get current position(s) for touch (or mouse)
        if (isTouch) {
            Array.from(e.touches).forEach(touchPoint => this.model.positions.set(touchPoint.identifier, new Point(touchPoint)));
        }
        else {
            this.model.positions.set(0, new Point(e.clientX, e.clientY));
        }
        //Clear cached target origin if not dragging
        if (this.model.currentAction != ActionMode.drag)
            this.model.lastTargetOrigin = null;
        //Fire move event if enabled
        if (this.element.moveEventsEnabled)
            this.fireDrag(this.model.positions, TurboEventName.move);
        //If drag events are enabled and user is interacting
        if (this.model.currentAction != ActionMode.none && this.element.dragEventEnabled) {
            //Initialize drag
            if (this.model.currentAction != ActionMode.drag) {
                //Loop on saved origins points and check if any point's distance from its origin is greater than the threshold
                if (!Array.from(this.model.origins.entries()).some(([key, origin]) => {
                    const position = this.model.positions.get(key);
                    return position && Point.dist(position, origin) > this.model.moveThreshold;
                }))
                    return;
                //If didn't return --> fire drag start and set action to drag
                clearCache(this);
                this.fireDrag(this.model.origins, TurboEventName.dragStart);
                this.model.currentAction = ActionMode.drag;
            }
            //Fire drag and update previous points
            this.fireDrag(this.model.positions);
        }
        //Update previous positions
        this.model.positions.forEach((position, key) => this.model.previousPositions.set(key, position));
    }
    ;
    pointerUp = (e) => this.pointerUpFn(e);
    pointerUpFn(e) {
        if (!this.element.enabled)
            return;
        //Check if is touch
        const isTouch = e instanceof TouchEvent;
        //Prevent default actions
        if (this.element.preventDefaultMouse && !isTouch)
            e.preventDefault();
        if (this.element.preventDefaultTouch && isTouch)
            e.preventDefault();
        //Clear any timer set
        this.model.utils.clearTimer(TurboEventName.longPress);
        //Initialize a new positions map
        this.model.positions = new TurboMap();
        //Get current position(s) for touch (or mouse)
        if (isTouch) {
            Array.from(e.changedTouches).forEach(touchPoint => {
                this.model.positions.set(touchPoint.identifier, new Point(touchPoint));
            });
        }
        else {
            this.model.positions.set(0, new Point(e));
        }
        //If action was drag --> fire drag end
        if (this.model.currentAction == ActionMode.drag && this.element.dragEventEnabled)
            this.fireDrag(this.model.positions, TurboEventName.dragEnd);
        //If click events are enabled
        if (this.element.clickEventEnabled) {
            //If action is click --> fire click
            if (this.model.currentAction == ActionMode.click) {
                this.fireClick(this.model.positions.first, TurboEventName.click);
            }
            //Fire click end
            this.fireClick(this.model.origins.first, TurboEventName.clickEnd);
        }
        //Clear saved positions (or removed lifted touch points)
        if (isTouch) {
            Array.from(e.changedTouches).forEach(touchPoint => {
                this.model.origins.delete(touchPoint.identifier);
                this.model.previousPositions.delete(touchPoint.identifier);
            });
        }
        else {
            this.model.origins.clear();
            this.model.previousPositions.clear();
        }
        //Reset click mode and action
        this.model.currentAction = ActionMode.none;
        this.model.currentClick = ClickMode.none;
    }
    ;
    pointerLeave = () => this.pointerLeaveFn();
    pointerLeaveFn() {
        if (!this.element.enabled)
            return;
        if (this.model.currentAction == ActionMode.none)
            return;
        //Clear any timer set
        this.model.utils.clearTimer(TurboEventName.longPress);
        //If not drag --> fire click end
        if (this.model.currentAction != ActionMode.drag) {
            this.fireClick(this.model.origins.first, TurboEventName.clickEnd);
            this.model.currentAction = ActionMode.none;
        }
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
            this.element.setTool(undefined, ClickMode.key, { select: false });
        target.dispatchEvent(new eventType(properties));
    };
    getToolHandlingCallback(type, e) {
        const toolName = this.element.getCurrentToolName(this.model.currentClick);
        const tool = this.element.getCurrentTool(this.model.currentClick);
        if (!tool || !$(tool).hasToolBehavior(type))
            return;
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
 * functions to manipulate the model's data.
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
     * @description A reference to the MVC model.
     * @protected
     */
    model;
    constructor(model) {
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
                this.model.currentClick = ClickMode.none;
                return;
            case 0:
                this.model.currentClick = ClickMode.left;
                return;
            case 1:
                this.model.currentClick = ClickMode.middle;
                return;
            case 2:
                this.model.currentClick = ClickMode.right;
                return;
            default:
                this.model.currentClick = ClickMode.other;
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
            const configValue = this.constructor.config?.[configFieldName];
            if (configValue !== undefined && configValue !== null)
                return configValue;
            return defaultValue;
        },
        configurable: true,
        enumerable: false,
    });
}

function setup$2() {
    defineDefaultProperties(TurboHeadlessElement);
    defineMvcAccessors(TurboHeadlessElement);
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
        setup$2();
        this.mvc = new Mvc({ ...properties, element: this });
    }
}

//TODO Create merged events maybe --> fire event x when "mousedown" | "touchstart" | "mousemove" etc.
//ToDO Create "interaction" event --> when element interacted with
//TODO GO from toolname to tool --> each tool instance can have different data --> different behavior (+ maybe tool has some attached data)
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
            _set_keyEventsEnabled_decorators = [auto({ cancelIfUnchanged: true })];
            _set_wheelEventsEnabled_decorators = [auto({ cancelIfUnchanged: true })];
            _set_moveEventsEnabled_decorators = [auto({ cancelIfUnchanged: true })];
            _set_mouseEventsEnabled_decorators = [auto({ cancelIfUnchanged: true })];
            _set_touchEventsEnabled_decorators = [auto({ cancelIfUnchanged: true })];
            _set_clickEventEnabled_decorators = [auto({ cancelIfUnchanged: true })];
            _set_dragEventEnabled_decorators = [auto({ cancelIfUnchanged: true })];
            __esDecorate(this, null, _set_keyEventsEnabled_decorators, { kind: "setter", name: "keyEventsEnabled", static: false, private: false, access: { has: obj => "keyEventsEnabled" in obj, set: (obj, value) => { obj.keyEventsEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_wheelEventsEnabled_decorators, { kind: "setter", name: "wheelEventsEnabled", static: false, private: false, access: { has: obj => "wheelEventsEnabled" in obj, set: (obj, value) => { obj.wheelEventsEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_moveEventsEnabled_decorators, { kind: "setter", name: "moveEventsEnabled", static: false, private: false, access: { has: obj => "moveEventsEnabled" in obj, set: (obj, value) => { obj.moveEventsEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_mouseEventsEnabled_decorators, { kind: "setter", name: "mouseEventsEnabled", static: false, private: false, access: { has: obj => "mouseEventsEnabled" in obj, set: (obj, value) => { obj.mouseEventsEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_touchEventsEnabled_decorators, { kind: "setter", name: "touchEventsEnabled", static: false, private: false, access: { has: obj => "touchEventsEnabled" in obj, set: (obj, value) => { obj.touchEventsEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_clickEventEnabled_decorators, { kind: "setter", name: "clickEventEnabled", static: false, private: false, access: { has: obj => "clickEventEnabled" in obj, set: (obj, value) => { obj.clickEventEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_dragEventEnabled_decorators, { kind: "setter", name: "dragEventEnabled", static: false, private: false, access: { has: obj => "dragEventEnabled" in obj, set: (obj, value) => { obj.dragEventEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _keyController_decorators, { kind: "field", name: "keyController", static: false, private: false, access: { has: obj => "keyController" in obj, get: obj => obj.keyController, set: (obj, value) => { obj.keyController = value; } }, metadata: _metadata }, _keyController_initializers, _keyController_extraInitializers);
            __esDecorate(null, null, _wheelController_decorators, { kind: "field", name: "wheelController", static: false, private: false, access: { has: obj => "wheelController" in obj, get: obj => obj.wheelController, set: (obj, value) => { obj.wheelController = value; } }, metadata: _metadata }, _wheelController_initializers, _wheelController_extraInitializers);
            __esDecorate(null, null, _pointerController_decorators, { kind: "field", name: "pointerController", static: false, private: false, access: { has: obj => "pointerController" in obj, get: obj => obj.pointerController, set: (obj, value) => { obj.pointerController = value; } }, metadata: _metadata }, _pointerController_initializers, _pointerController_extraInitializers);
            __esDecorate(null, null, _dispatchController_decorators, { kind: "field", name: "dispatchController", static: false, private: false, access: { has: obj => "dispatchController" in obj, get: obj => obj.dispatchController, set: (obj, value) => { obj.dispatchController = value; } }, metadata: _metadata }, _dispatchController_initializers, _dispatchController_extraInitializers);
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
        keyController = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _keyController_initializers, void 0));
        wheelController = (__runInitializers(this, _keyController_extraInitializers), __runInitializers(this, _wheelController_initializers, void 0));
        pointerController = (__runInitializers(this, _wheelController_extraInitializers), __runInitializers(this, _pointerController_initializers, void 0));
        dispatchController = (__runInitializers(this, _pointerController_extraInitializers), __runInitializers(this, _dispatchController_initializers, void 0));
        /*
         *
         *
         * Constructor
         *
         *
         */
        constructor(properties = {}) {
            super();
            __runInitializers(this, _dispatchController_extraInitializers);
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
            //TODO
            this.dispatchController.setupCustomDispatcher("mousedown");
            this.dispatchController.setupCustomDispatcher("touchstart");
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
            const doc = $(document);
            if (value) {
                doc.on("keydown", this.keyController.keyDown);
                doc.on("keyup", this.keyController.keyUp);
            }
            else {
                doc.removeListener("keydown", this.keyController.keyDown);
                doc.removeListener("keyup", this.keyController.keyUp);
            }
            this.applyAndHookEvents(TurboKeyEventName, DefaultKeyEventName, value);
        }
        set wheelEventsEnabled(value) {
            if (value)
                $(document.body).on("wheel", this.wheelController.wheel, {
                    passive: false,
                    propagate: true
                });
            else
                $(document).removeListener("wheel", this.wheelController.wheel);
            this.applyAndHookEvents(TurboWheelEventName, DefaultWheelEventName, value);
        }
        set moveEventsEnabled(value) {
            this.applyAndHookEvents(TurboMoveEventName, DefaultMoveEventName, value);
        }
        set mouseEventsEnabled(value) {
            const doc = $(document);
            if (value) {
                doc.on("mousedown", this.pointerController.pointerDown, { propagate: true });
                doc.on("mousemove", this.pointerController.pointerMove, { propagate: true });
                doc.on("mouseup", this.pointerController.pointerUp, { propagate: true });
                doc.on("mouseleave", this.pointerController.pointerLeave, { propagate: true });
            }
            else {
                doc.removeListener("mousedown", this.pointerController.pointerDown);
                doc.removeListener("mousemove", this.pointerController.pointerMove);
                doc.removeListener("mouseup", this.pointerController.pointerUp);
                doc.removeListener("mouseleave", this.pointerController.pointerLeave);
            }
        }
        set touchEventsEnabled(value) {
            const doc = $(document);
            if (value) {
                doc.on("touchstart", this.pointerController.pointerDown, { passive: false, propagate: true });
                doc.on("touchmove", this.pointerController.pointerMove, { passive: false, propagate: true });
                doc.on("touchend", this.pointerController.pointerUp, { passive: false, propagate: true });
                doc.on("touchcancel", this.pointerController.pointerUp, { passive: false, propagate: true });
            }
            else {
                doc.removeListener("touchstart", this.pointerController.pointerDown);
                doc.removeListener("touchmove", this.pointerController.pointerMove);
                doc.removeListener("touchend", this.pointerController.pointerUp);
                doc.removeListener("touchcancel", this.pointerController.pointerUp);
            }
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
         * @description Returns the name of the tool currently held by the provided click mode
         * @param mode
         */
        getCurrentToolName(mode = this.model.currentClick) {
            return this.model.currentTools.get(mode);
        }
        /**
         * @description Returns the instances of the tool currently held by the provided click mode
         * @param mode
         */
        getCurrentTools(mode = this.model.currentClick) {
            return this.getToolsByName(this.getCurrentToolName(mode));
        }
        getCurrentTool(mode = this.model.currentClick) {
            return this.getToolByName(this.getCurrentToolName(mode));
        }
        /**
         * @description Sets the provided tool as a current tool associated with the provided type
         * @param toolName
         * @param type
         * @param options
         */
        setTool(toolName, type, options = {}) {
            //Initialize undefined options
            if (options.select == undefined)
                options.select = true;
            if (options.activate == undefined)
                options.activate = true;
            if (options.setAsNoAction == undefined)
                options.setAsNoAction = type == ClickMode.left;
            //Get previous tool
            const previousToolName = this.model.currentTools.get(type);
            if (previousToolName) {
                //Return if it's the same
                if (previousToolName === toolName)
                    return;
                //Deselect and deactivate previous tool
                (this.getToolsByName(previousToolName) || []).forEach(element => {
                    if (options.select)
                        this.model.utils.selectTool(element, false);
                    if (options.activate)
                        this.model.utils.activateTool(element, previousToolName, false);
                });
            }
            //Select new tool (and maybe set it as the tool for no click mode)
            this.model.currentTools.set(type, toolName);
            if (options.setAsNoAction)
                this.model.currentTools.set(ClickMode.none, toolName);
            //Select and activate the tool
            (this.getToolsByName(toolName) || []).forEach(element => {
                if (options.activate)
                    this.model.utils.activateTool(element, toolName, true);
                if (options.select)
                    this.model.utils.selectTool(element, true);
            });
            //Fire tool changed
            this.onToolChange.fire(previousToolName, toolName, type);
        }
        /**
         * @description Sets tool associated with the provided key as the current tool for the key mode
         * @param key
         */
        setToolByKey(key) {
            const toolName = this.model.mappedKeysToTool.get(key);
            if (!toolName)
                return false;
            this.setTool(toolName, ClickMode.key, { select: false });
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
        if (!options)
            options = {};
        return [...this.getBoundListenersSet(element)]
            .filter(entry => entry.type === type && entry.manager === manager && entry.toolName === toolName)
            .filter(entry => {
            if (!options || !entry.options)
                return true;
            for (const [option, value] of Object.entries(options)) {
                if (entry.options[option] !== value)
                    return false;
            }
            return true;
        });
    }
}

const utils$3 = new EventFunctionsUtils();
function setupEventFunctions() {
    /**
     * @description Initializes a `boundListeners` set in the Node prototype, that will hold all the element's bound
     * listeners.
     */
    Object.defineProperty(TurboSelector.prototype, "boundListeners", {
        get: function () {
            return utils$3.getBoundListenersSet(this);
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
            return utils$3.data(this)["bypassCallback"];
        },
        set: function (value) {
            utils$3.data(this)["bypassCallback"] = value;
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
        utils$3.getBoundListenersSet(this).add({ target: this, type, toolName, listener, bundledListener, options, manager });
        this.element.addEventListener(type, bundledListener, options);
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
            utils$3.bypassManager(this, manager, this.bypassManagerOn(event));
        const run = (target, tool) => {
            const ts = target instanceof TurboSelector ? target : $(target);
            const boundSet = utils$3.getBoundListenersSet(target);
            const entries = [...utils$3.getBoundListeners(target, type, tool, options, manager)];
            if (entries.length === 0)
                return false;
            let propagate = false;
            for (const entry of entries) {
                try {
                    entry.listener(event, ts);
                }
                finally {
                    if (entry.options?.once)
                        boundSet.delete(entry);
                    if (entry.options?.propagate)
                        propagate = true;
                }
            }
            return !propagate;
        };
        if (activeTool && run(this, activeTool))
            return true;
        if (!options.capture && activeTool && this.applyTool(activeTool, type, event, manager))
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
            for (const toolName of objectTools) {
                if ($(embeddedTarget).applyTool(toolName, type, event, manager))
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
        return utils$3.getBoundListeners(this, type, toolName, undefined, manager)
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
        return utils$3.getBoundListeners(this, type, toolName, undefined, manager).length > 0;
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
        const boundListeners = utils$3.getBoundListenersSet(this);
        utils$3.getBoundListeners(this, type, toolName, undefined, manager)
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
        const boundListeners = utils$3.getBoundListenersSet(this);
        utils$3.getBoundListeners(this, type, toolName, undefined, manager)
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
        utils$3.data(this.element).preventDefaultOn = options.preventDefaultOn
            ?? utils$3.data(this.element).preventDefaultOn ?? (() => true);
        const preventDefaultListeners = utils$3.getPreventDefaultListeners(this);
        if (options.clearPreviousListeners)
            for (const [type, listener] of Object.entries(preventDefaultListeners)) {
                this.removeListener(type, listener);
                delete preventDefaultListeners[type];
            }
        const shouldNotBePassive = new Set(NonPassiveEvents);
        for (const type of new Set(types)) {
            const handler = (event) => {
                if (!utils$3.data(this.element).preventDefaultOn(type, event))
                    return;
                event.preventDefault?.();
                if (stop === "immediate")
                    event.stopImmediatePropagation?.();
                else if (stop === "stop")
                    event.stopPropagation?.();
            };
            preventDefaultListeners[type] = handler;
            const options = {};
            if (phase === "capture")
                options.capture = true;
            if (shouldNotBePassive.has(type))
                options.passive = false;
            this.on(type, handler, options, manager);
        }
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

const utils$2 = new StyleFunctionsUtils();
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
        utils$2.setStyle(this, attribute, value, instant);
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
        utils$2.setStyle(this, attribute, currentStyle + separator + value, instant);
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
        Object.entries(stylesObject).forEach(([key, value]) => utils$2.setStyle(this, key, value, instant, false));
        if (!instant)
            utils$2.applyStyles(this);
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
            activationDelegates: new Map(),
            deactivationDelegates: new Map()
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
}

const utils$1 = new ToolFunctionsUtils();
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
        if (options.customActivation && typeof options.customActivation === "function")
            options.customActivation(this, options.manager);
        else {
            options.activationEvent ??= DefaultEventName.click;
            options.clickMode ??= ClickMode.left;
            this.on(options.activationEvent, () => options.manager.setTool(toolName, options.clickMode), undefined, options.manager);
        }
        utils$1.saveTool(this, toolName, options.manager);
        if (options.onActivate)
            utils$1.getActivationDelegate(this, toolName, options.manager).add(options.onActivate);
        if (options.onDeactivate)
            utils$1.getDeactivationDelegate(this, toolName, options.manager).add(options.onDeactivate);
        return this;
    };
    TurboSelector.prototype.isTool = function _isTool(manager = TurboEventManager.instance) {
        return utils$1.getToolNames(this.element, manager).length > 0;
    };
    TurboSelector.prototype.getToolNames = function _getToolName(manager = TurboEventManager.instance) {
        return utils$1.getToolNames(this.element, manager);
    };
    TurboSelector.prototype.getToolName = function _getToolName(manager = TurboEventManager.instance) {
        const toolNames = utils$1.getToolNames(this.element, manager);
        if (toolNames.length > 0)
            return toolNames[0];
    };
    /*
     *
     * Tool activation manipulation
     *
     */
    TurboSelector.prototype.onToolActivate = function _onActivate(toolName, manager = TurboEventManager.instance) {
        return utils$1.getActivationDelegate(this, toolName, manager);
    };
    TurboSelector.prototype.onToolDeactivate = function _onDeactivate(toolName, manager = TurboEventManager.instance) {
        return utils$1.getDeactivationDelegate(this, toolName, manager);
    };
    /*
     *
     * Tool behavior manipulation
     *
     */
    TurboSelector.prototype.addToolBehavior = function _addToolBehavior(type, callback, toolName = this.getToolName(), manager = TurboEventManager.instance) {
        if (type && toolName) {
            manager.setupCustomDispatcher?.(type);
            utils$1.addToolBehavior(toolName, type, callback, manager);
        }
        return this;
    };
    TurboSelector.prototype.hasToolBehavior = function _hasToolBehavior(type, toolName = this.getToolName(), manager = TurboEventManager.instance) {
        if (!type || !toolName)
            return false;
        return utils$1.getToolBehaviors(toolName, type, manager).length > 0;
    };
    TurboSelector.prototype.removeToolBehaviors = function _removeToolBehaviors(type, toolName = this.getToolName(), manager = TurboEventManager.instance) {
        if (type && toolName)
            utils$1.removeToolBehaviors(toolName, type, manager);
        return this;
    };
    TurboSelector.prototype.clearToolBehaviors = function _clearToolBehaviors(manager = TurboEventManager.instance) {
        utils$1.clearToolBehaviors(manager);
        return this;
    };
    /*
     *
     * Embedded tool manipulation
     *
     */
    TurboSelector.prototype.embedTool = function _embedTool(target, manager = TurboEventManager.instance) {
        if (this.isTool(manager))
            utils$1.setEmbeddedToolTarget(this.element, target, manager);
        return this;
    };
    TurboSelector.prototype.isEmbeddedTool = function _isEmbeddedTool(manager = TurboEventManager.instance) {
        return !!utils$1.getEmbeddedToolTarget(this.element, manager);
    };
    TurboSelector.prototype.getEmbeddedToolTarget = function _getEmbeddedToolTarget(manager = TurboEventManager.instance) {
        return utils$1.getEmbeddedToolTarget(this.element, manager);
    };
    /*
     *
     * Apply tool
     *
     */
    TurboSelector.prototype.applyTool = function _applyTool(toolName, type, event, manager = TurboEventManager.instance) {
        let pass = false;
        const behaviors = utils$1.getToolBehaviors(toolName, type, manager);
        const options = {};
        options.embeddedTarget = utils$1.getEmbeddedToolTarget(this.element, manager);
        options.isEmbedded = !!options.embeddedTarget;
        behaviors.forEach(behavior => {
            if (behavior(event, this.element, options))
                pass = true;
        });
        return pass;
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
            objectsMetadata: new WeakMap(),
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
    getObjectMetadata(element, substrate, object) {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.objectsMetadata)
            return;
        let metadata = substrateData.objectsMetadata.get(object);
        if (!metadata) {
            metadata = {};
            substrateData.objectsMetadata.set(object, metadata);
        }
        return metadata;
    }
    setObjectMetadata(element, substrate, object, metadata) {
        const substrateData = this.getSubstrateData(element, substrate);
        if (!substrateData || !substrateData.objectsMetadata)
            return;
        substrateData.objectsMetadata.set(object, metadata);
    }
}

const utils = new SubstrateFunctionsUtils();
function setupSubstrateFunctions() {
    TurboSelector.prototype.makeSubstrate = function _makeSubstrate(name, options) {
        utils.createSubstrate(this, name);
        if (options?.onActivate)
            this.onSubstrateActivate(name).add(options.onActivate);
        if (options?.onDeactivate)
            this.onSubstrateDeactivate(name).add(options.onDeactivate);
        if (!this.currentSubstrate)
            this.currentSubstrate = name;
        return this;
    };
    TurboSelector.prototype.getSubstrates = function _getSubstrates() {
        return utils.getSubstrates(this);
    };
    TurboSelector.prototype.getSubstrateObjectList = function _getSubstrateObjectList(substrate = this.currentSubstrate) {
        if (!substrate)
            return new Set();
        return utils.getSubstrateData(this, substrate).objects;
    };
    TurboSelector.prototype.setSubstrateObjectList = function _setSubstrateObjectList(list, substrate = this.currentSubstrate) {
        if (!list || !substrate)
            return this;
        utils.getSubstrateData(this, substrate).objects = list;
        return this;
    };
    TurboSelector.prototype.addObjectToSubstrate = function _addObjectToSubstrate(object, substrate) {
        const list = this.getSubstrateObjectList(substrate);
        if (list instanceof HTMLCollection || list instanceof NodeList)
            return false;
        try {
            if (list.has(object))
                return false;
            list.add(object);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    TurboSelector.prototype.removeObjectFromSubstrate = function _removeObjectFromSubstrate(object, substrate) {
        const list = this.getSubstrateObjectList(substrate);
        if (list instanceof HTMLCollection || list instanceof NodeList)
            return false;
        for (const obj of list) {
            if (obj === object) {
                list.delete(object);
                return true;
            }
        }
        return false;
    };
    TurboSelector.prototype.hasObjectInSubstrate = function _hasObjectInSubstrate(object, substrate) {
        const list = this.getSubstrateObjectList(substrate);
        for (const obj of list) {
            if (obj === object)
                return true;
        }
        return false;
    };
    TurboSelector.prototype.wasObjectProcessedBySubstrate = function _wasObjectProcessedBySubstrate(object, substrate) {
        return !!utils.getObjectMetadata(this.element, substrate, object)?.processed;
    };
    TurboSelector.prototype.setSubstrate = function _setSubstrate(name) {
        const prev = this.currentSubstrate;
        if (!utils.setCurrent(this, name))
            return this;
        this.onSubstrateChange.fire(prev, name);
    };
    Object.defineProperty(TurboSelector.prototype, "currentSubstrate", {
        set: function (value) { this.setSubstrate(value); },
        get: function () { return utils.data(this).current; },
        configurable: false,
        enumerable: true
    });
    Object.defineProperty(TurboSelector.prototype, "onSubstrateChange", {
        get: function () { return utils.data(this).onChange; },
        configurable: false,
        enumerable: true
    });
    TurboSelector.prototype.onSubstrateActivate = function _onSubstrateActivate(name = this.currentSubstrate) {
        return utils.getSubstrateData(this, name)?.onActivate;
    };
    TurboSelector.prototype.onSubstrateDeactivate = function _onSubstrateDeactivate(name = this.currentSubstrate) {
        return utils.getSubstrateData(this, name)?.onDeactivate;
    };
    TurboSelector.prototype.addSolver = function _addSolver(callback, name = this.currentSubstrate) {
        utils.getSubstrateData(this, name).solvers?.add(callback);
        return this;
    };
    TurboSelector.prototype.removeSolver = function _removeSolver(callback, name = this.currentSubstrate) {
        utils.getSubstrateData(this, name).solvers?.delete(callback);
        return this;
    };
    TurboSelector.prototype.clearSolvers = function _clearSolvers(name = this.currentSubstrate) {
        utils.getSubstrateData(this, name).solvers?.clear();
        return this;
    };
    TurboSelector.prototype.resolveSubstrate = function _resolveSubstrate(properties) {
        if (!properties)
            properties = {};
        if (!properties.substrate)
            properties.substrate = this.currentSubstrate;
        if (!properties.manager)
            properties.manager = TurboEventManager.instance;
        if (!properties.eventOptions)
            properties.eventOptions = {};
        const data = utils.getSubstrateData(this, properties.substrate);
        if (!data)
            return;
        data.solvers?.forEach(solver => {
            data.objectsMetadata = new WeakMap();
            if (properties.eventTarget) {
                data.objectsMetadata.set(properties.eventTarget, { processed: true, isMainTarget: true });
                solver({ ...properties, target: properties.eventTarget });
            }
            let target;
            do {
                target = Array
                    .from(this.getSubstrateObjectList(properties.substrate))
                    .find(entry => !data.objectsMetadata.get(entry)?.processed);
                if (target) {
                    data.objectsMetadata.set(target, { processed: true });
                    solver({ ...properties, target });
                }
            } while (target);
        });
        return this;
    };
}

let turbofied = false;
function $(element) {
    if (!turbofied)
        turbofy();
    if (!element)
        return new TurboSelector();
    if (element instanceof TurboSelector)
        return element;
    const turboSelector = new TurboSelector();
    if (element instanceof Node)
        turboSelector.element = element;
    else if (element["element"] && element["element"] instanceof Node)
        turboSelector.element = element["element"];
    return turboSelector;
}
function t(element) {
    if (!turbofied)
        turbofy();
    if (element instanceof TurboSelector)
        return element;
    const turboSelector = new TurboSelector();
    turboSelector.element = element;
    return turboSelector;
}
function turbo(element) {
    if (!turbofied)
        turbofy();
    if (element instanceof TurboSelector)
        return element;
    const turboSelector = new TurboSelector();
    turboSelector.element = element;
    return turboSelector;
}
function turbofy(options = {}) {
    turbofied = true;
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
    //todo addReifectManagementToNodePrototype();
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
        this.emitter = properties.emitter;
        this.model = properties.model;
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

class TurboInteractor extends TurboController {
    target;
    toolName;
    manager;
    options;
    constructor(properties) {
        super(properties);
        this.manager = properties.manager ?? this.manager ?? TurboEventManager.instance;
        this.toolName = properties.toolName ?? this.toolName ?? undefined;
        this.options = properties.listenerOptions ?? {};
        const host = this.element;
        this.target = this.target ?? host instanceof Node ? host
            : host?.element instanceof Node ? host.element
                : undefined;
    }
    initialize() {
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

class TurboSubstrate extends TurboController {
    substrateName;
    get objectList() {
        return $(this).getSubstrateObjectList(this.substrateName);
    }
    set objectList(value) {
        $(this).setSubstrateObjectList(value, this.substrateName);
    }
    constructor(properties) {
        super(properties);
        this.substrateName = properties.substrateName ?? this.substrateName ?? undefined;
    }
    initialize() {
        super.initialize();
        if (!this.substrateName)
            return;
        $(this).makeSubstrate(this.substrateName, {
            onActivate: typeof this["onActivate"] === "function" ? this["onActivate"] : undefined,
            onDeactivate: typeof this["onDeactivate"] === "function" ? this["onDeactivate"] : undefined,
        });
    }
    addObject(object) {
        $(this).addObjectToSubstrate(object, this.substrateName);
    }
    removeObject(object) {
        return $(this).removeObjectFromSubstrate(object, this.substrateName);
    }
    hasObject(object) {
        return $(this).hasObjectInSubstrate(object, this.substrateName);
    }
    isProcessed(object) {
        return $(this).wasObjectProcessedBySubstrate(object, this.substrateName);
    }
    resolve(properties = {}) {
        $(this).resolveSubstrate({ ...properties, substrate: this.substrateName });
    }
    addSolver(callback) {
        $(this).addSolver(callback, this.substrateName);
    }
    removeSolver(callback) {
        $(this).removeSolver(callback, this.substrateName);
    }
    clearSolvers() {
        $(this).clearSolvers(this.substrateName);
    }
}

class TurboTool extends TurboController {
    toolName;
    embeddedTarget;
    manager;
    activationEvent;
    clickMode;
    key;
    constructor(properties) {
        super(properties);
        this.manager = properties.manager ?? this.manager ?? TurboEventManager.instance;
        this.toolName = properties.toolName ?? this.toolName ?? undefined;
        if (properties.embeddedTarget)
            this.embeddedTarget = properties.embeddedTarget;
        if (properties.key)
            this.key = properties.key;
        if (properties.clickMode)
            this.clickMode = properties.clickMode;
        if (properties.activationEvent)
            this.activationEvent = properties.activationEvent;
    }
    initialize() {
        super.initialize();
        if (!this.toolName)
            return;
        $(this).makeTool(this.toolName, {
            clickMode: this.clickMode,
            key: this.key,
            activationEvent: this.activationEvent,
            onActivation: typeof this["onActivate"] === "function" ? this["onActivate"] : undefined,
            onDeactivation: typeof this["onDeactivate"] === "function" ? this["onDeactivate"] : undefined,
            customActivation: typeof this["customActivation"] === "function" ? this["customActivation"] : undefined,
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
 * @returns An SVGElement promise
 */
function fetchSvg(path) {
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
            console.error("Error fetching SVG:", error);
            reject(error);
        });
    });
}

function defineUIPrototype(constructor) {
    const prototype = constructor.prototype;
    Object.defineProperty(prototype, "initializeUI", {
        value: function initializeUI() {
            this.setupUIElements?.();
            this.setupUILayout?.();
            this.setupUIListeners?.();
            this.setupChangedCallbacks?.();
        },
        configurable: true,
        enumerable: false,
    });
}

function setup$1() {
    defineDefaultProperties(TurboElement);
    defineMvcAccessors(TurboElement);
    defineUIPrototype(TurboElement);
}
/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * */
class TurboElement extends HTMLElement {
    /**
     * @description Static configuration object.
     */
    static config = { shadowDOM: false, defaultSelectedClass: "selected" };
    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    mvc;
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
    constructor(properties = {}) {
        setup$1();
        super();
        if (this.getPropertiesValue(properties.shadowDOM, "shadowDOM"))
            this.attachShadow({ mode: "open" });
        $(this).setProperties(properties, true);
        this.mvc = new Mvc({ ...properties, element: this });
    }
    /**
     * @function setupChangedCallbacks
     * @description Setup method intended to initialize change listeners and callbacks.
     * @protected
     */
    setupChangedCallbacks() {
    }
    /**
     * @function setupUIElements
     * @description Setup method intended to initialize all direct sub-elements attached to this element, and store
     * them in fields.
     * @protected
     */
    setupUIElements() {
    }
    /**
     * @function setupUILayout
     * @description Setup method to create the layout structure of the element by adding all created sub-elements to
     * this element's child tree.
     * @protected
     */
    setupUILayout() {
    }
    /**
     * @function setupUIListeners
     * @description Setup method to initialize and define all input/DOM event listeners of the element.
     * @protected
     */
    setupUIListeners() {
    }
    connectedCallback() {
        this.onAttach.fire();
    }
    disconnectedCallback() {
        this.onDetach.fire();
    }
    adoptedCallback() {
        this.onAdopt.fire();
    }
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

/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
let TurboIcon = (() => {
    let _classDecorators = [define()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    let _instanceExtraInitializers = [];
    let _set_icon_decorators;
    let _set_iconColor_decorators;
    let _loadSvg_decorators;
    var TurboIcon = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_icon_decorators = [observe, auto()];
            _set_iconColor_decorators = [observe, auto()];
            _loadSvg_decorators = [cache()];
            __esDecorate(this, null, _set_icon_decorators, { kind: "setter", name: "icon", static: false, private: false, access: { has: obj => "icon" in obj, set: (obj, value) => { obj.icon = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_iconColor_decorators, { kind: "setter", name: "iconColor", static: false, private: false, access: { has: obj => "iconColor" in obj, set: (obj, value) => { obj.iconColor = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _loadSvg_decorators, { kind: "method", name: "loadSvg", static: false, private: false, access: { has: obj => "loadSvg" in obj, get: obj => obj.loadSvg }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TurboIcon = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        _element = __runInitializers(this, _instanceExtraInitializers);
        _type;
        _directory;
        onLoaded;
        static config = { ...TurboElement.config, defaultType: "svg", defaultDirectory: "", customLoaders: {} };
        static imageTypes = ["png", "jpg", "jpeg", "gif", "webp",
            "PNG", "JPG", "JPEG", "GIF", "WEBP"];
        /**
         * Creates an instance of Icon.
         * @param {TurboIconProperties} properties - Properties to configure the icon.
         */
        constructor(properties) {
            super(properties);
            if (properties.icon)
                this.update(properties);
        }
        update(properties) {
            if (properties.unsetDefaultClasses)
                $(this).removeClass(TurboIcon.config.defaultClasses);
            else
                $(this).addClass(TurboIcon.config.defaultClasses);
            this.type = properties.type;
            this.directory = properties.directory;
            if (properties.iconColor)
                this.iconColor = properties.iconColor;
            if (properties.onLoaded)
                this.onLoaded = properties.onLoaded;
            if (properties.icon)
                this.icon = properties.icon;
        }
        //Getters and setters
        /**
         * @description The type of the icon.
         */
        get type() {
            return this._type;
        }
        set type(value) {
            if (!value || value.length == 0)
                value = this.type || TurboIcon.config.defaultType || "svg";
            if (value[0] == ".")
                value = value.substring(1);
            this._type = value;
        }
        /**
         * @description The user-provided (or statically configured) directory to the icon's file.
         */
        get directory() {
            return this._directory;
        }
        set directory(value) {
            if (!value)
                value = this.directory || TurboIcon.config.defaultDirectory || "";
            if (value.length > 0 && !value.endsWith("/"))
                value += "/";
            this._directory = value;
        }
        /**
         * @description The path to the icon's source file.
         */
        get path() {
            let extension = (this.icon.endsWith("." + this.type) || this.type.length == 0) ? "" : "." + this.type;
            return this.directory + this.icon + extension;
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
            if (value && this.element instanceof SVGElement)
                this.element.style.fill = value;
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
            return img({ src: path, alt: this.icon, parent: this });
        }
        generateIcon() {
            if (this.element instanceof HTMLImageElement
                && equalToAny(this.type, ...TurboIcon.imageTypes)) {
                this.element.src = this.path;
                this.element.alt = this.icon;
                return;
            }
            this.clear();
            if (!this.icon)
                return;
            const element = this.getLoader()(this.path);
            if (element instanceof Element)
                this.setupLoadedElement(element);
            else
                element.then(element => this.setupLoadedElement(element))
                    .catch(error => console.error(`Failed to load icon: ${error}`));
        }
        getLoader() {
            if (!this.type)
                return;
            const customLoader = TurboIcon.config.customLoaders[this.type];
            if (customLoader)
                return customLoader;
            if (equalToAny(this.type, "svg", "SVG"))
                return this.loadSvg;
            if (equalToAny(this.type, ...TurboIcon.imageTypes))
                return this.loadImg;
            throw new Error(`Unsupported icon type: ${this.type}`);
        }
        setupLoadedElement(element) {
            if (this.element || !element)
                return;
            if (element.parentElement)
                element = element.cloneNode(true);
            $(this).addChild(element);
            if (this.iconColor && element instanceof SVGElement)
                element.style.fill = this.iconColor;
            if (this.onLoaded)
                this.onLoaded(element);
            this.element = element;
        }
        clear() {
            $(this.element).destroy();
            this.element = null;
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return TurboIcon = _classThis;
})();
function icon(properties) {
    return new TurboIcon(properties);
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
    let _set_elementTag_decorators;
    var TurboRichElement = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_elementTag_decorators = [auto({ callBefore: (value) => TurboRichElement.config.defaultElementTag || "h4" })];
            __esDecorate(this, null, _set_elementTag_decorators, { kind: "setter", name: "elementTag", static: false, private: false, access: { has: obj => "elementTag" in obj, set: (obj, value) => { obj.elementTag = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TurboRichElement = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * @description Object containing the children of the rich element.
         */
        elements = __runInitializers(this, _instanceExtraInitializers);
        static config = { ...TurboElement.config, defaultElementTag: "h4" };
        /**
         * Initializes a new instance of the Button class.
         * @param {TurboButtonProperties} properties - Properties to configure the button.
         */
        constructor(properties) {
            if (properties.text && !properties.element)
                properties.element = properties.text;
            super({ ...properties, text: null });
            if (!properties.unsetDefaultClasses)
                $(this).addClass(this.constructor.config.defaultClasses);
            this.elementTag = properties.elementTag;
            this.elements = {
                leftCustomElements: null,
                leftIcon: null,
                prefixEntry: null,
                element: null,
                suffixEntry: null,
                rightIcon: null,
                rightCustomElements: null,
            };
            this.leftCustomElements = properties.leftCustomElements;
            this.leftIcon = properties.leftIcon;
            this.prefixEntry = properties.prefixEntry;
            this.element = properties.element;
            this.suffixEntry = properties.suffixEntry;
            this.rightIcon = properties.rightIcon;
            this.rightCustomElements = properties.rightCustomElements;
        }
        /**
         * @description Adds a given element or elements to the button at a specified position.
         * @param {Element | Element[] | null} element - The element(s) to add.
         * @param {keyof ButtonChildren} type - The type of child element being added.
         */
        addAtPosition(element, type) {
            if (!element || !type)
                return;
            let nextSiblingIndex = 0;
            for (let key in this.elements) {
                if (key == type)
                    break;
                if (this.elements[key])
                    nextSiblingIndex++;
            }
            $(this).addChild(element, nextSiblingIndex);
        }
        /**
         * @description The tag of the text element in the button
         */
        set elementTag(value) { }
        /**
         * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
         */
        get leftCustomElements() {
            return this.elements.leftCustomElements;
        }
        set leftCustomElements(value) {
            $(this).remChild(this.leftCustomElements);
            if (!value)
                return;
            this.addAtPosition(value, "leftCustomElements");
            this.elements.leftCustomElements = value;
        }
        /**
         * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
         * icon, or a Turbo/HTML element).
         */
        get leftIcon() {
            return this.elements.leftIcon;
        }
        set leftIcon(value) {
            if (!value) {
                $(this).remChild(this.leftIcon);
                return;
            }
            if (typeof value == "string") {
                if (this.leftIcon) {
                    this.leftIcon.icon = value;
                    return;
                }
                value = new TurboIcon({ icon: value });
            }
            $(this).remChild(this.leftIcon);
            this.addAtPosition(value, "leftIcon");
            this.elements.leftIcon = value;
        }
        /**
         * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
         * icon, or a Turbo/HTML element).
         */
        get prefixEntry() {
            return this.elements.prefixEntry;
        }
        set prefixEntry(value) {
            if (!value) {
                $(this).remChild(this.prefixEntry);
                return;
            }
            if (typeof value == "string") {
                if (this.prefixEntry) {
                    this.prefixEntry.innerText = value;
                    return;
                }
                value = element({ text: value });
            }
            $(this).remChild(this.prefixEntry);
            this.addAtPosition(value, "prefixEntry");
            this.elements.prefixEntry = value;
        }
        /**
         * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
         * string will update the text's innerText with the given string.
         */
        get element() {
            return this.elements.element;
        }
        set element(value) {
            if (!value) {
                $(this).remChild(this.element);
                return;
            }
            if (typeof value == "string") {
                if (this.element && "innerText" in this.element) {
                    this.element.innerText = value;
                    return;
                }
                value = element({ tag: this.elementTag, text: value });
            }
            else if (typeof value == "object" && !(value instanceof Element)) {
                value = element(value);
            }
            $(this).remChild(this.element);
            this.addAtPosition(value, "element");
            this.elements.element = value;
        }
        /**
         * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
         * string will update the text's innerText with the given string.
         */
        get text() {
            const element = this.elements.element;
            if (!element)
                return "";
            if ("innerText" in element)
                return element.innerText;
            return element.innerHTML;
        }
        set text(value) {
            if (!value)
                return;
            this.element = value;
        }
        /**
         * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
         * icon, or a Turbo/HTML element).
         */
        get suffixEntry() {
            return this.elements.prefixEntry;
        }
        set suffixEntry(value) {
            if (!value) {
                $(this).remChild(this.suffixEntry);
                return;
            }
            if (typeof value == "string") {
                if (this.suffixEntry) {
                    this.suffixEntry.innerText = value;
                    return;
                }
                value = element({ text: value });
            }
            $(this).remChild(this.suffixEntry);
            this.addAtPosition(value, "suffixEntry");
            this.elements.suffixEntry = value;
        }
        /**
         * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
         * icon, or a Turbo/HTML element).
         */
        get rightIcon() {
            return this.elements.rightIcon;
        }
        set rightIcon(value) {
            if (!value) {
                $(this).remChild(this.rightIcon);
                return;
            }
            if (typeof value == "string") {
                if (this.rightIcon) {
                    this.rightIcon.icon = value;
                    return;
                }
                value = new TurboIcon({ icon: value });
            }
            $(this).remChild(this.rightIcon);
            this.addAtPosition(value, "rightIcon");
            this.elements.rightIcon = value;
        }
        /**
         * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
         */
        get rightCustomElements() {
            return this.elements.rightCustomElements;
        }
        set rightCustomElements(value) {
            $(this).remChild(this.rightCustomElements);
            if (!value)
                return;
            this.addAtPosition(value, "rightCustomElements");
            this.elements.rightCustomElements = value;
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return TurboRichElement = _classThis;
})();

/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
let TurboButton = (() => {
    let _classDecorators = [define()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboRichElement;
    let _instanceExtraInitializers = [];
    let _set_elementTag_decorators;
    var TurboButton = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_elementTag_decorators = [auto({ callBefore: (value) => TurboButton.config.defaultElementTag || "h4" })];
            __esDecorate(this, null, _set_elementTag_decorators, { kind: "setter", name: "elementTag", static: false, private: false, access: { has: obj => "elementTag" in obj, set: (obj, value) => { obj.elementTag = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TurboButton = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static config = { ...TurboRichElement.config, defaultElementTag: "h4" };
        /**
         * Initializes a new instance of the Button class.
         * @param {TurboButtonProperties} properties - Properties to configure the button.
         */
        constructor(properties) {
            super(properties);
            __runInitializers(this, _instanceExtraInitializers);
            if (!properties.unsetDefaultClasses)
                $(this).addClass(TurboButton.config.defaultClasses);
        }
        /**
         * @description The tag of the text element in the button
         */
        set elementTag(value) { }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return TurboButton = _classThis;
})();
function button(properties) {
    return new TurboButton(properties);
}

function isNull(value) {
    return value == null && value != undefined;
}
function isUndefined(value) {
    return typeof value == "undefined";
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
            __esDecorate(this, null, _set_enabled_decorators, { kind: "setter", name: "enabled", static: false, private: false, access: { has: obj => "enabled" in obj, set: (obj, value) => { obj.enabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_propertiesEnabled_decorators, { kind: "setter", name: "propertiesEnabled", static: false, private: false, access: { has: obj => "propertiesEnabled" in obj, set: (obj, value) => { obj.propertiesEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_stylesEnabled_decorators, { kind: "setter", name: "stylesEnabled", static: false, private: false, access: { has: obj => "stylesEnabled" in obj, set: (obj, value) => { obj.stylesEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_classesEnabled_decorators, { kind: "setter", name: "classesEnabled", static: false, private: false, access: { has: obj => "classesEnabled" in obj, set: (obj, value) => { obj.classesEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_replaceWithEnabled_decorators, { kind: "setter", name: "replaceWithEnabled", static: false, private: false, access: { has: obj => "replaceWithEnabled" in obj, set: (obj, value) => { obj.replaceWithEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_transitionEnabled_decorators, { kind: "setter", name: "transitionEnabled", static: false, private: false, access: { has: obj => "transitionEnabled" in obj, set: (obj, value) => { obj.transitionEnabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_properties_decorators, { kind: "setter", name: "properties", static: false, private: false, access: { has: obj => "properties" in obj, set: (obj, value) => { obj.properties = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_styles_decorators, { kind: "setter", name: "styles", static: false, private: false, access: { has: obj => "styles" in obj, set: (obj, value) => { obj.styles = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_classes_decorators, { kind: "setter", name: "classes", static: false, private: false, access: { has: obj => "classes" in obj, set: (obj, value) => { obj.classes = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_replaceWith_decorators, { kind: "setter", name: "replaceWith", static: false, private: false, access: { has: obj => "replaceWith" in obj, set: (obj, value) => { obj.replaceWith = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_transitionProperties_decorators, { kind: "setter", name: "transitionProperties", static: false, private: false, access: { has: obj => "transitionProperties" in obj, set: (obj, value) => { obj.transitionProperties = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_transitionDuration_decorators, { kind: "setter", name: "transitionDuration", static: false, private: false, access: { has: obj => "transitionDuration" in obj, set: (obj, value) => { obj.transitionDuration = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_transitionTimingFunction_decorators, { kind: "setter", name: "transitionTimingFunction", static: false, private: false, access: { has: obj => "transitionTimingFunction" in obj, set: (obj, value) => { obj.transitionTimingFunction = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_transitionDelay_decorators, { kind: "setter", name: "transitionDelay", static: false, private: false, access: { has: obj => "transitionDelay" in obj, set: (obj, value) => { obj.transitionDelay = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_transition_decorators, { kind: "setter", name: "transition", static: false, private: false, access: { has: obj => "transition" in obj, set: (obj, value) => { obj.transition = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        timeRegex = (__runInitializers(this, _instanceExtraInitializers), /^(\d+(?:\.\d+)?)(ms|s)?$/i);
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
            object.reifects?.attach(this);
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
                const handler = data.object.deref()?.reifects;
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
            const newObject = data.resolvedValues.replaceWith[state];
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
            const classes = data.resolvedValues.classes;
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
                const handler = data.object?.deref()?.reifects;
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

let TurboIconSwitch = (() => {
    let _classDecorators = [define()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboIcon;
    let _instanceExtraInitializers = [];
    let _set_appendStateToIconName_decorators;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_appendStateToIconName_decorators = [auto()];
            __esDecorate(this, null, _set_appendStateToIconName_decorators, { kind: "setter", name: "appendStateToIconName", static: false, private: false, access: { has: obj => "appendStateToIconName" in obj, set: (obj, value) => { obj.appendStateToIconName = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        switchReifect = __runInitializers(this, _instanceExtraInitializers);
        /**
         * Creates an instance of Icon.
         * @param {TurboIconSwitchProperties<State>} properties - Properties to configure the icon.
         */
        constructor(properties) {
            super({ ...properties });
            if (properties.switchReifect instanceof StatefulReifect)
                this.switchReifect = properties.switchReifect;
            else
                this.switchReifect = new StatefulReifect(properties.switchReifect || {});
            this.switchReifect.attach(this);
            this.appendStateToIconName = properties.appendStateToIconName;
            if (properties.defaultState)
                this.switchReifect.apply(properties.defaultState, this);
        }
        set appendStateToIconName(value) {
            if (value) {
                const reifectProperties = this.switchReifect.properties;
                this.switchReifect.states.forEach(state => {
                    if (!reifectProperties[state])
                        reifectProperties[state] = {};
                    reifectProperties[state].icon = this.icon + "-" + state.toString();
                });
            }
        }
    });
    return _classThis;
})();

let TurboIconToggle = (() => {
    let _classDecorators = [define()];
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
            _set_toggled_decorators = [auto({ cancelIfUnchanged: true })];
            _set_toggleOnClick_decorators = [auto({ cancelIfUnchanged: true })];
            __esDecorate(this, null, _set_toggled_decorators, { kind: "setter", name: "toggled", static: false, private: false, access: { has: obj => "toggled" in obj, set: (obj, value) => { obj.toggled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_toggleOnClick_decorators, { kind: "setter", name: "toggleOnClick", static: false, private: false, access: { has: obj => "toggleOnClick" in obj, set: (obj, value) => { obj.toggleOnClick = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        onToggle = __runInitializers(this, _instanceExtraInitializers);
        constructor(properties) {
            super(properties);
            this.toggled = properties.toggled ?? false;
            this.onToggle = properties.onToggle;
            this.toggleOnClick = properties.toggleOnClick ?? false;
        }
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
        clickListener = () => this.toggle();
    });
    return _classThis;
})();

let TurboInput = (() => {
    let _classDecorators = [define("turbo-input")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        labelElement;
        inputElement;
        locked;
        lastValueWithInputCheck;
        lastValueWithBlurCheck;
        constructor(properties = {}) {
            super(properties);
            this.locked = properties.locked || false;
            this.lastValueWithInputCheck = "";
            this.lastValueWithBlurCheck = "";
            if (properties.label)
                this.labelElement = element({ tag: "label", text: properties.label, parent: this });
            this.inputElement = new TurboRichElement({
                ...properties,
                elementTag: properties.elementTag || "input",
                element: properties.element || element({ tag: properties.elementTag || "input" }),
                parent: this
            });
            this.setupEvents(properties);
        }
        setupEvents(properties) {
            //TODO $(this.inputElement.element).bypassManagerOn = () => true;
            $(this.inputElement).on(DefaultEventName.blur, (e) => {
                if (properties.blurRegexCheck && this.stringValue != this.lastValueWithBlurCheck)
                    this.stringValue = this.lastValueWithBlurCheck;
                this.dispatchEvent(new FocusEvent(DefaultEventName.blur, e));
            });
            $(this.inputElement).on(DefaultEventName.focus, (e) => {
                if (this.locked)
                    this.inputElement.blur();
                if (properties.selectTextOnFocus)
                    this.inputElement.element.select();
                this.dispatchEvent(new FocusEvent(DefaultEventName.focus, e));
            });
            $(this.inputElement).on(DefaultEventName.input, (e) => {
                if (properties.dynamicVerticalResize) {
                    this.inputElement.style.height = "";
                    this.inputElement.style.height = this.inputElement.scrollHeight + "px";
                }
                if (properties.inputRegexCheck) {
                    const regex = new RegExp(properties.inputRegexCheck, "g");
                    if (!regex.test(this.stringValue))
                        this.stringValue = this.lastValueWithInputCheck;
                }
                this.lastValueWithInputCheck = this.stringValue;
                if (properties.blurRegexCheck) {
                    const regex = new RegExp(properties.blurRegexCheck, "g");
                    if (regex.test(this.stringValue))
                        this.lastValueWithBlurCheck = this.stringValue;
                }
                if (this.stringValue.length == 0) {
                    this.lastValueWithInputCheck = "0";
                    this.lastValueWithBlurCheck = "0";
                }
                this.dispatchEvent(new InputEvent(DefaultEventName.input, e));
            });
        }
        set stringValue(value) {
            this.inputElement.element.value = value;
        }
        get stringValue() {
            return this.inputElement.element.value;
        }
        get value() {
            const value = this.stringValue;
            // if (typeof value === "string" && value.trim() !== "") {
            //     if (typeof th === "number") {
            //         return parseFloat(value) as ValueType;
            //     }
            // }
            return value;
        }
        set value(value) {
            this.stringValue = value.toString();
        }
    });
    return _classThis;
})();

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
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        multiplier;
        decimalPlaces;
        min;
        max;
        constructor(properties = {}) {
            //Only allow numbers (positive, negative, and decimal)
            properties.inputRegexCheck = properties.inputRegexCheck || /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?\.?$|^-$|^$/;
            properties.blurRegexCheck = properties.blurRegexCheck || /^(?!-0?(\.0+)?$)-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/;
            super(properties);
            this.multiplier = properties.multiplier || 1;
            this.decimalPlaces = properties.decimalPlaces;
            this.min = properties.min;
            this.max = properties.max;
        }
        get value() {
            return Number.parseFloat(this.stringValue) / this.multiplier;
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

/**
 * @class TurboSelectEntry
 * @description Class representing an entry within a TurboSelect.
 * @extends TurboElement
 */
let TurboSelectEntry = (() => {
    let _classDecorators = [define()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboRichElement;
    let _instanceExtraInitializers = [];
    let _set_secondaryValue_decorators;
    let _set_value_decorators;
    let _set_selected_decorators;
    let _set_enabled_decorators;
    var TurboSelectEntry = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_secondaryValue_decorators = [auto()];
            _set_value_decorators = [auto()];
            _set_selected_decorators = [auto()];
            _set_enabled_decorators = [auto()];
            __esDecorate(this, null, _set_secondaryValue_decorators, { kind: "setter", name: "secondaryValue", static: false, private: false, access: { has: obj => "secondaryValue" in obj, set: (obj, value) => { obj.secondaryValue = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_value_decorators, { kind: "setter", name: "value", static: false, private: false, access: { has: obj => "value" in obj, set: (obj, value) => { obj.value = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_selected_decorators, { kind: "setter", name: "selected", static: false, private: false, access: { has: obj => "selected" in obj, set: (obj, value) => { obj.selected = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_enabled_decorators, { kind: "setter", name: "enabled", static: false, private: false, access: { has: obj => "enabled" in obj, set: (obj, value) => { obj.enabled = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TurboSelectEntry = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        /**
         * @description The class(es) assigned to the dropdown entry when it is selected
         */
        selectedClasses = (__runInitializers(this, _instanceExtraInitializers), "");
        action;
        onSelected;
        onEnabled;
        reflectedElement;
        inputElement;
        config = {};
        /**
         * @description DropdownEntry constructor
         * @param {TurboSelectEntryProperties} properties - Properties for configuring the dropdown entry.
         */
        constructor(properties) {
            super(properties);
            if (!properties.unsetDefaultClasses)
                $(this).addClass(TurboSelectEntry.config.defaultClasses);
            this.selectedClasses = properties.selectedClasses;
            this.action = properties.action || (() => { });
            this.onSelected = properties.onSelected || (() => { });
            this.onEnabled = properties.onEnabled || (() => { });
            this.reflectedElement = properties.reflectValueOn ? properties.reflectValueOn : !properties.element ? this : undefined;
            this.inputName = properties.inputName;
            this.value = properties.value;
            this.secondaryValue = properties.secondaryValue;
            this.selected = properties.selected || false;
            this.enabled = properties.enabled || true;
        }
        set secondaryValue(value) { }
        /**
         * @description The value of the dropdown entry
         */
        set value(value) {
            if (this.reflectedElement) {
                if (this.reflectedElement instanceof TurboRichElement)
                    this.reflectedElement.text = this.stringValue;
                else
                    this.reflectedElement.innerText = this.stringValue;
            }
            if (this.inputElement)
                this.inputElement.value = this.stringValue;
        }
        get stringValue() {
            return stringify(this.value);
        }
        /**
         * @description Whether or not the dropdown entry is selected
         */
        set selected(value) {
            $(this).toggleClass(this.selectedClasses, value);
            if (value)
                this.action();
            this.onSelected(value);
        }
        set enabled(value) {
            if (!value && this.selected)
                this.selected = false;
            this.reifects.enabled = value;
            $(this).setStyle("visibility", value ? "" : "hidden");
            this.onEnabled(value);
        }
        get inputName() {
            return this.inputElement?.name || null;
        }
        set inputName(value) {
            if (!value)
                return;
            if (!this.inputElement)
                this.inputElement = input({
                    type: "hidden",
                    name: value,
                    parent: this,
                    value: this.stringValue
                });
            else
                this.inputElement.name = value;
        }
        /**
         * @description Toggles the selection of this dropdown entry
         */
        toggle() {
            this.selected = !this.selected;
        }
    };
    return TurboSelectEntry = _classThis;
})();

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
 * Base class for creating a selection menu
 * @class TurboSelect
 * @extends TurboElement
 */
let TurboSelect = (() => {
    let _classDecorators = [define()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    var TurboSelect = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TurboSelect = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * The dropdown's entries.
         */
        entries = [];
        entriesParent;
        enabled;
        /**
         * The dropdown's underlying hidden input. Might be undefined.
         */
        inputName;
        multiSelection = false;
        forceSelection = false;
        onSelect;
        selectedEntryClasses;
        static config = {};
        /**
         * @description Dropdown constructor
         * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
         */
        constructor(properties) {
            super(properties);
            if (!properties.unsetDefaultClasses)
                $(this).addClass(TurboSelect.config.defaultClasses);
            if (!properties.selectedValues)
                properties.selectedValues = [];
            this.entriesParent = properties.entriesParent ?? this;
            this.multiSelection = properties.multiSelection ?? false;
            this.forceSelection = properties.forceSelection ?? !this.multiSelection;
            this.inputName = properties.inputName;
            this.onSelect = properties.onSelect || (() => { });
            this.selectedEntryClasses = properties.customSelectedEntryClasses || TurboSelect.config.defaultSelectedEntryClasses;
            (properties.values ?? []).forEach(entry => this.addEntry(entry));
            //TODO MAKE IT BETTER SOMEHOW (I WANT TO RUN IT AFTER CHILD CLASSES FINISH SETTING UP)
            requestAnimationFrame(() => {
                this.entries.forEach(entry => {
                    if (properties.selectedValues?.includes(entry.value))
                        this.select(entry);
                });
            });
        }
        createEntry(entry) {
            if (!(entry instanceof TurboSelectEntry)) {
                if (typeof entry == "object" && "value" in entry) {
                    if (!entry.inputName)
                        entry.inputName = this.inputName;
                    entry = new TurboSelectEntry(entry);
                }
                else {
                    entry = new TurboSelectEntry({ value: entry, inputName: this.inputName });
                }
            }
            return entry;
        }
        addEntry(entry, index = this.entries.length) {
            entry = this.createEntry(entry);
            if (index === undefined || typeof index !== "number" || index > this.entries.length)
                index = this.entries.length;
            if (index < 0)
                index = 0;
            if (!entry.selectedClasses)
                entry.selectedClasses = this.selectedEntryClasses;
            $(entry).on(DefaultEventName.click, (e) => this.onEntryClick(entry, e));
            entry.onAttach.add(() => {
                if (!this.entries.includes(entry)) {
                    const domIndex = $(this.entriesParent).indexOfChild(entry);
                    const insertionIndex = Math.max(0, Math.min(domIndex, this.entries.length));
                    this.entries.splice(insertionIndex, 0, entry);
                }
                requestAnimationFrame(() => this.select(this.selectedEntry));
            });
            entry.onDetach.add(() => {
                const i = this.entries.indexOf(entry);
                if (i !== -1)
                    this.entries.splice(i, 1);
                if (entry.selected)
                    entry.toggle();
            });
            this.entries.splice(index, 0, entry);
            $(this.entriesParent).addChild(entry, index);
            return entry;
        }
        onEntryClick(entry, e) {
            this.select(entry);
        }
        /**
         * @description Select an entry.
         * @param {string | EntryType} entry - The DropdownEntry (or its string value) to select.
         * @param selected
         * @return {TurboSelect} - This Dropdown for chaining.
         */
        select(entry, selected = true) {
            if (entry === undefined || entry === null)
                return this;
            if (!(entry instanceof TurboSelectEntry)) {
                let el = this.enabledEntries.find(el => el.value == entry);
                if (!el)
                    return this;
                entry = el;
            }
            if (entry.selected === selected)
                return this;
            if (!this.multiSelection)
                this.selectedEntries.forEach(selectedEntry => selectedEntry.selected = false);
            entry.selected = selected;
            if (this.selectedEntries.length === 0 && this.forceSelection)
                this.select(this.enabledEntries[0]);
            this.onSelect(entry.selected, entry, this.getIndex(entry));
            this.dispatchEvent(new TurboSelectInputEvent({
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
            this.selectedEntries.forEach(entry => entry.toggle());
        }
        reset() {
            this.deselectAll();
            this.onEntryClick(this.enabledEntries[0]);
        }
        get enabledEntries() {
            return this.entries.filter(entry => entry.enabled);
        }
        get enabledValues() {
            return this.enabledEntries.map(entry => entry.value);
        }
        get enabledSecondaryValues() {
            return this.enabledEntries.map(entry => entry.secondaryValue);
        }
        find(value) {
            return this.entries.find((entry) => entry.value == value);
        }
        findBySecondaryValue(value) {
            return this.entries.find((entry) => entry.secondaryValue == value);
        }
        findAll(...values) {
            return this.entries.filter(entry => values.includes(entry.value));
        }
        findAllBySecondaryValue(...values) {
            return this.entries.filter((entry) => values.includes(entry.secondaryValue));
        }
        enable(b, ...entries) {
            entries.forEach(entry => {
                if (entry instanceof TurboSelectEntry)
                    entry.enabled = b;
                else
                    this.find(entry).enabled = b;
            });
        }
        /**
         * @description The dropdown's currently selected entries
         */
        get selectedEntries() {
            return this.entries.filter(entry => entry.selected);
        }
        get selectedEntry() {
            return this.entries.find(entry => entry.selected);
        }
        /**
         * @description The dropdown's currently selected values
         */
        get selectedValues() {
            return this.selectedEntries.map(entry => entry.value);
        }
        get selectedValue() {
            return this.selectedEntry?.value;
        }
        get selectedSecondaryValues() {
            return this.selectedEntries.map(entry => entry.secondaryValue);
        }
        get selectedSecondaryValue() {
            return this.selectedEntry?.secondaryValue;
        }
        get stringSelectedValue() {
            return this.selectedEntries.map(entry => entry.stringValue).join(", ");
        }
        clear() {
            for (const entry of this.entries)
                entry.remove();
            this.entries.splice(0, this.entries.length);
        }
        /**
         * @description The dropdown's values. Setting it will update the dropdown accordingly.
         */
        get values() {
            return this.entries.map(entry => entry.value);
        }
        set values(values) {
            const selectedEntriesIndices = [];
            this.entries.filter((entry, index) => entry.selected && index < values.length);
            this.clear();
            for (const entry of values)
                this.addEntry(entry);
            for (const index of selectedEntriesIndices)
                this.select(this.entries[index]);
            if (!this.selectedEntry && this.forceSelection)
                this.select(this.entries[0]);
            this.select(this.selectedEntry);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return TurboSelect = _classThis;
})();

var css_248z$2 = ".turbo-drawer{align-items:center;display:inline-flex}.turbo-drawer.top-drawer,.turbo-drawer.top-drawer .turbo-drawer-panel-container{flex-direction:column}.turbo-drawer.bottom-drawer,.turbo-drawer.bottom-drawer .turbo-drawer-panel-container{flex-direction:column-reverse}.turbo-drawer.left-drawer,.turbo-drawer.left-drawer .turbo-drawer-panel-container{flex-direction:row}.turbo-drawer.right-drawer,.turbo-drawer.right-drawer .turbo-drawer-panel-container{flex-direction:row-reverse}.turbo-drawer>div:first-child{background-color:#fff;display:inline-block;position:relative}.turbo-drawer>div:nth-child(2){align-items:center;display:flex;position:relative}.turbo-drawer>div:nth-child(2)>:first-child{background-color:#fff;display:block}";
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

var Direction;
(function (Direction) {
    Direction["vertical"] = "vertical";
    Direction["horizontal"] = "horizontal";
})(Direction || (Direction = {}));
var SideH;
(function (SideH) {
    SideH["left"] = "left";
    SideH["right"] = "right";
})(SideH || (SideH = {}));
var SideV;
(function (SideV) {
    SideV["top"] = "top";
    SideV["bottom"] = "bottom";
})(SideV || (SideV = {}));
var Side;
(function (Side) {
    Side["top"] = "top";
    Side["bottom"] = "bottom";
    Side["left"] = "left";
    Side["right"] = "right";
})(Side || (Side = {}));
var InOut;
(function (InOut) {
    InOut["in"] = "in";
    InOut["out"] = "out";
})(InOut || (InOut = {}));
var OnOff;
(function (OnOff) {
    OnOff["on"] = "on";
    OnOff["off"] = "off";
})(OnOff || (OnOff = {}));
var Open;
(function (Open) {
    Open["open"] = "open";
    Open["closed"] = "closed";
})(Open || (Open = {}));
var Shown;
(function (Shown) {
    Shown["visible"] = "visible";
    Shown["hidden"] = "hidden";
})(Shown || (Shown = {}));
var AccessLevel;
(function (AccessLevel) {
    AccessLevel["public"] = "public";
    AccessLevel["protected"] = "protected";
    AccessLevel["private"] = "private";
})(AccessLevel || (AccessLevel = {}));
var Range;
(function (Range) {
    Range["min"] = "min";
    Range["max"] = "max";
})(Range || (Range = {}));

let TurboDrawer = (() => {
    let _classDecorators = [define()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    let _instanceExtraInitializers = [];
    let _set_hideOverflow_decorators;
    let _set_attachSideToIconName_decorators;
    let _set_rotateIconBasedOnSide_decorators;
    let _set_side_decorators;
    let _set_open_decorators;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_hideOverflow_decorators = [auto()];
            _set_attachSideToIconName_decorators = [auto()];
            _set_rotateIconBasedOnSide_decorators = [auto()];
            _set_side_decorators = [auto()];
            _set_open_decorators = [auto()];
            __esDecorate(this, null, _set_hideOverflow_decorators, { kind: "setter", name: "hideOverflow", static: false, private: false, access: { has: obj => "hideOverflow" in obj, set: (obj, value) => { obj.hideOverflow = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_attachSideToIconName_decorators, { kind: "setter", name: "attachSideToIconName", static: false, private: false, access: { has: obj => "attachSideToIconName" in obj, set: (obj, value) => { obj.attachSideToIconName = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_rotateIconBasedOnSide_decorators, { kind: "setter", name: "rotateIconBasedOnSide", static: false, private: false, access: { has: obj => "rotateIconBasedOnSide" in obj, set: (obj, value) => { obj.rotateIconBasedOnSide = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_side_decorators, { kind: "setter", name: "side", static: false, private: false, access: { has: obj => "side" in obj, set: (obj, value) => { obj.side = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_open_decorators, { kind: "setter", name: "open", static: false, private: false, access: { has: obj => "open" in obj, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        thumb = __runInitializers(this, _instanceExtraInitializers);
        panelContainer;
        panel;
        _icon;
        _offset;
        _translation = 0;
        transition;
        dragging = false;
        animationOn = false;
        resizeObserver;
        constructor(properties) {
            super(properties);
            $(this).addClass("turbo-drawer");
            this.thumb = properties.thumb instanceof HTMLElement ? properties.thumb : div(properties.thumb);
            this.panelContainer = div();
            this.panel = properties.panel instanceof HTMLElement ? properties.panel : div(properties.panel);
            $(this.thumb).addClass("turbo-drawer-thumb");
            $(this.panelContainer).addClass("turbo-drawer-panel-container");
            $(this.panel).addClass("turbo-drawer-panel");
            $(this).addChild([this.thumb, this.panelContainer]);
            $(this.panelContainer).addChild(this.panel);
            this.hideOverflow = properties.hideOverflow ?? false;
            this.side = properties.side || Side.bottom;
            this.offset = { open: properties.offset?.open || 0, closed: properties.offset?.closed || 0 };
            this.attachSideToIconName = properties.attachSideToIconName;
            this.rotateIconBasedOnSide = properties.rotateIconBasedOnSide;
            this.icon = properties.icon;
            $(this).childHandler = this.panel;
            //Transition
            this.transition = properties.transition ?? new Reifect({
                transitionProperties: ["transform", this.isVertical ? "height" : "width"],
                transitionDuration: 0.2,
                transitionTimingFunction: "ease-out",
                attachedObjects: [this, this.panelContainer]
            });
            let pending = false;
            this.resizeObserver = new ResizeObserver(entries => {
                if (!this.open || this.dragging)
                    return;
                if (pending)
                    return;
                pending = true;
                requestAnimationFrame(() => {
                    const size = Array.isArray(entries[0].borderBoxSize)
                        ? entries[0].borderBoxSize[0] : entries[0].borderBoxSize;
                    this.translation = (this.open ? this.offset.open : this.offset.closed)
                        + (this.isVertical ? size.blockSize : size.inlineSize);
                    pending = false;
                });
            });
            this.open = properties.initiallyOpen || false;
            this.animationOn = true;
            this.initEvents();
        }
        get icon() {
            return this._icon;
        }
        set icon(value) {
            if (this.icon?.parentElement === this.thumb)
                this.thumb.removeChild(this.icon);
            if (value instanceof Element) {
                this._icon = value;
                return;
            }
            let attachSideToIconName = this.attachSideToIconName;
            if (typeof value === "string" && !attachSideToIconName && !this.rotateIconBasedOnSide)
                attachSideToIconName = true;
            this._icon = new TurboIconSwitch(typeof value == "object"
                ? value
                : {
                    icon: value,
                    switchReifect: { states: Object.values(Side) },
                    defaultState: this.open ? this.getOppositeSide() : this.side,
                    appendStateToIconName: attachSideToIconName,
                });
            $(this.thumb).addChild(this.icon);
            this.attachSideToIconName = attachSideToIconName;
        }
        initEvents() {
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
                    case Side.top:
                        if (this.open && delta.y > 100)
                            this.open = false;
                        else if (!this.open && delta.y < -100)
                            this.open = true;
                        break;
                    case Side.bottom:
                        if (this.open && delta.y < -100)
                            this.open = false;
                        else if (!this.open && delta.y > 100)
                            this.open = true;
                        break;
                    case Side.left:
                        if (this.open && delta.x > 100)
                            this.open = false;
                        else if (!this.open && delta.x < -100)
                            this.open = true;
                        break;
                    case Side.right:
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
                case Side.top:
                    return Side.bottom;
                case Side.bottom:
                    return Side.top;
                case Side.left:
                    return Side.right;
                case Side.right:
                    return Side.left;
            }
        }
        getAdjacentSide(side = this.side) {
            switch (side) {
                case Side.top:
                    return Side.right;
                case Side.bottom:
                    return Side.left;
                case Side.left:
                    return Side.top;
                case Side.right:
                    return Side.bottom;
            }
        }
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
            $(this).toggleClass("top-drawer", value == Side.top);
            $(this).toggleClass("bottom-drawer", value == Side.bottom);
            $(this).toggleClass("left-drawer", value == Side.left);
            $(this).toggleClass("right-drawer", value == Side.right);
            this.refresh();
        }
        get offset() {
            return this._offset;
        }
        set offset(value) {
            if (typeof value == "number")
                this._offset = { open: value, closed: value };
            else
                this._offset = { open: value?.open || 0, closed: value?.closed || 0 };
        }
        get isVertical() {
            return this.side == Side.top || this.side == Side.bottom;
        }
        set open(value) {
            if (value)
                this.resizeObserver.observe(this.panel, { box: "border-box" });
            else
                this.resizeObserver.unobserve(this.panel);
            this.refresh();
        }
        get translation() {
            return this._translation;
        }
        set translation(value) {
            this._translation = value;
            switch (this.side) {
                case Side.top:
                    if (this.hideOverflow)
                        $(this.panelContainer).setStyle("height", value + "px");
                    else
                        $(this).setStyle("transform", `translateY(${-value}px)`);
                    break;
                case Side.bottom:
                    if (this.hideOverflow)
                        $(this.panelContainer).setStyle("height", value + "px");
                    else
                        $(this).setStyle("transform", `translateY(${-value}px)`);
                    break;
                case Side.left:
                    if (this.hideOverflow)
                        $(this.panelContainer).setStyle("width", value + "px");
                    else
                        $(this).setStyle("transform", `translateX(${-value}px)`);
                    break;
                case Side.right:
                    if (this.hideOverflow)
                        $(this.panelContainer).setStyle("width", value + "px");
                    else
                        $(this).setStyle("transform", `translateX(${-value}px)`);
                    break;
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
    });
    return _classThis;
})();

var PopupFallbackMode;
(function (PopupFallbackMode) {
    PopupFallbackMode["invert"] = "invert";
    PopupFallbackMode["offset"] = "offset";
    PopupFallbackMode["none"] = "none";
})(PopupFallbackMode || (PopupFallbackMode = {}));

var css_248z$1 = ".turbo-popup{display:block;position:fixed}";
styleInject(css_248z$1);

let TurboPopup = (() => {
    let _classDecorators = [define()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboElement;
    let _instanceExtraInitializers = [];
    let _get_rect_decorators;
    let _get_parentRect_decorators;
    let _get_computedStyle_decorators;
    let _get_parentComputedStyle_decorators;
    var TurboPopup = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _get_rect_decorators = [cache({ clearOnNextFrame: true })];
            _get_parentRect_decorators = [cache({ clearOnNextFrame: true })];
            _get_computedStyle_decorators = [cache({ clearOnNextFrame: true })];
            _get_parentComputedStyle_decorators = [cache({ clearOnNextFrame: true })];
            __esDecorate(this, null, _get_rect_decorators, { kind: "getter", name: "rect", static: false, private: false, access: { has: obj => "rect" in obj, get: obj => obj.rect }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_parentRect_decorators, { kind: "getter", name: "parentRect", static: false, private: false, access: { has: obj => "parentRect" in obj, get: obj => obj.parentRect }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_computedStyle_decorators, { kind: "getter", name: "computedStyle", static: false, private: false, access: { has: obj => "computedStyle" in obj, get: obj => obj.computedStyle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _get_parentComputedStyle_decorators, { kind: "getter", name: "parentComputedStyle", static: false, private: false, access: { has: obj => "parentComputedStyle" in obj, get: obj => obj.parentComputedStyle }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TurboPopup = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        _popupAnchor = __runInitializers(this, _instanceExtraInitializers);
        _parentAnchor;
        _viewportMargin;
        _offsetFromParent;
        fallbackModes;
        static config = {
            defaultPopupAnchor: { x: 0, y: -100 },
            defaultParentAnchor: { x: 0, y: 100 },
            defaultViewportMargin: 4,
            defaultOffsetFromParent: { x: 0, y: 4 }
        };
        constructor(properties = {}) {
            super(properties);
            $(this).addClass("turbo-popup");
            if (!properties.unsetDefaultClasses)
                $(this).addClass(TurboPopup.config.defaultClasses);
            this.popupAnchor = properties.popupAnchor || TurboPopup.config.defaultPopupAnchor || { x: 50, y: 0 };
            this.parentAnchor = properties.parentAnchor || TurboPopup.config.defaultParentAnchor || { x: 50, y: 100 };
            this.viewportMargin = properties.viewportMargin || TurboPopup.config.defaultViewportMargin || 0;
            this.offsetFromParent = properties.offsetFromParent || TurboPopup.config.defaultOffsetFromParent || 0;
            this.fallbackModes = properties.fallbackModes || {
                x: Math.abs(this.parentAnchor.x - 50) > 25 ? PopupFallbackMode.invert : PopupFallbackMode.offset,
                y: Math.abs(this.parentAnchor.y - 50) > 25 ? PopupFallbackMode.invert : PopupFallbackMode.offset,
            };
            this.addListeners();
            this.show(false);
        }
        addListeners() {
            window.addEventListener(DefaultEventName.scroll, () => this.show(false));
            window.addEventListener(DefaultEventName.resize, () => {
                if (this.isShown)
                    this.recomputePosition();
            });
            $(document).on(DefaultEventName.click, e => {
                if (this.isShown && !this.contains(e.target))
                    this.show(false);
            });
        }
        get popupAnchor() {
            return this._popupAnchor;
        }
        set popupAnchor(value) {
            this._popupAnchor = new Point(value).bound(0, 100);
        }
        get parentAnchor() {
            return this._parentAnchor;
        }
        set parentAnchor(value) {
            this._parentAnchor = new Point(value).bound(0, 100);
        }
        get viewportMargin() {
            return this._viewportMargin;
        }
        set viewportMargin(value) {
            this._viewportMargin = new Point(value);
        }
        get offsetFromParent() {
            return this._offsetFromParent;
        }
        set offsetFromParent(value) {
            this._offsetFromParent = new Point(value);
        }
        get rect() {
            return this.getBoundingClientRect();
        }
        get parentRect() {
            return this.parentElement.getBoundingClientRect();
        }
        get computedStyle() {
            return window.getComputedStyle(this);
        }
        get parentComputedStyle() {
            return window.getComputedStyle(this.parentElement);
        }
        recomputePosition() {
            if (!this.parentElement)
                return;
            this.clearMaxDimensions();
            const availableHeight = window.innerHeight - (2 * this.viewportMargin.y);
            const availableWidth = window.innerWidth - (2 * this.viewportMargin.x);
            $(this).setStyle("maxHeight", `${availableHeight}px`);
            $(this).setStyle("maxWidth", `${availableWidth}px`);
            const top = this.recomputeSide(Direction.vertical);
            const left = this.recomputeSide(Direction.horizontal);
            this.recomputeMaxSize(top, Direction.vertical);
            this.recomputeMaxSize(left, Direction.horizontal);
        }
        recomputeSide(direction) {
            const params = this.generateDimensionParameters(direction);
            const popupSizeWithMargins = this.rect[params.size] + this.offsetFromParent[params.coordinate]
                + parseFloat(this.computedStyle[params.marginStart]) + parseFloat(this.computedStyle[params.marginEnd]);
            const parentAnchorOffset = this.parentRect[params.size] * this.parentAnchor[params.coordinate] / 100;
            const popupSizeOffset = popupSizeWithMargins * this.popupAnchor[params.coordinate] / 100;
            const totalSizeOffset = parentAnchorOffset - popupSizeOffset;
            const incrementSign = totalSizeOffset > 0 ? 1 : -1;
            const offsetFromParent = this.offsetFromParent[params.coordinate] * incrementSign;
            const viewportMargin = this.viewportMargin[params.coordinate] * incrementSign;
            let offset = this.parentRect[params.side] + totalSizeOffset + offsetFromParent;
            const maxOffset = window[params.innerSize] - popupSizeWithMargins - viewportMargin;
            const minOffset = viewportMargin;
            if (this.fallbackModes[params.coordinate] === PopupFallbackMode.invert) {
                const inverseTotalSizeOffset = (this.parentRect[params.size] - parentAnchorOffset)
                    + (popupSizeWithMargins - popupSizeOffset);
                if ((offset + popupSizeWithMargins > maxOffset) || (offset < minOffset)) {
                    const inverseOffset = this.parentRect[params.side] - inverseTotalSizeOffset * incrementSign;
                    if (inverseOffset >= minOffset && (inverseOffset + popupSizeWithMargins) <= maxOffset) {
                        offset = inverseOffset;
                    }
                }
            }
            // Final boundary check
            offset = Math.min(Math.max(offset, minOffset), maxOffset);
            this.style[params.side] = `${offset}px`;
            return offset;
            // if (this.fallbackModes[params.coordinate] == PopupFallbackMode.invert) {
            //     const inverseTotalSizeOffset = (this.parentRect[params.size] - parentAnchorOffset)
            //         + (popupSizeWithMargins - popupSizeOffset);
            //     const inverseTotalSizeOffsetWithViewportMargin = inverseTotalSizeOffset - viewportMargin;
            //
            //     if ((totalSizeOffset >= 0
            //             && window[params.innerSize] - this.parentRect[params.side] <
            //             popupSizeWithMargins + totalSizeOffsetWithViewportMargin
            //             && this.parentRect[params.side] >= popupSizeWithMargins - inverseTotalSizeOffsetWithViewportMargin)
            //         || (totalSizeOffset < 0
            //             && this.parentRect[params.side] < -totalSizeOffset - totalSizeOffsetWithViewportMargin
            //             && window[params.innerSize] - this.parentRect[params.side] >=
            //             inverseTotalSizeOffset + inverseTotalSizeOffsetWithViewportMargin)) {
            //         offset = this.parentRect[params.side] - inverseTotalSizeOffset * incrementSign;
            //     }
            // } else if (this.fallbackModes[params.coordinate] == PopupFallbackMode.offset) {
            //     if (totalSizeOffset < 0) {
            //         const outOfBoundsStart: number = this.parentRect[params.side] + totalSizeOffsetWithViewportMargin;
            //         if (outOfBoundsStart < 0) offset -= outOfBoundsStart;
            //     } else {
            //         const outOfBoundsEnd: number = (window[params.innerSize] - this.parentRect[params.side])
            //             - (popupSizeWithMargins + totalSizeOffsetWithViewportMargin);
            //         if (outOfBoundsEnd > 0) offset -= outOfBoundsEnd;
            //     }
            // }
            //
            // this.style[params.side] = offset + "px";
            // return offset;
        }
        recomputeMaxSize(offset, direction) {
            const params = this.generateDimensionParameters(direction);
            const totalMargins = parseFloat(this.computedStyle[params.marginStart])
                + parseFloat(this.computedStyle[params.marginEnd])
                + (2 * this.viewportMargin[params.coordinate]);
            const maxSize = Math.min(window[params.innerSize] - totalMargins, // Total available space
            window[params.innerSize] - offset - this.viewportMargin[params.coordinate] // Space from offset to edge
            );
            // Only set if we need to constrain the size
            const currentMaxSize = this.computedStyle[params.maxSize]
                ? parseFloat(this.computedStyle[params.maxSize])
                : Infinity;
            if (!currentMaxSize || currentMaxSize > maxSize)
                this.style[params.maxSize] = `${maxSize}px`;
            // const maxSize = window[params.innerSize] - offset - this.viewportMargin[params.coordinate]
            //     - parseFloat(this.computedStyle[params.marginStart]) - parseFloat(this.computedStyle[params.marginEnd])
            //     - parseFloat(this.parentComputedStyle[params.marginStart]) - parseFloat(this.parentComputedStyle[params.marginEnd]);
            //
            // if (this.computedStyle[params.maxSize] && parseFloat(this.computedStyle[params.maxSize]) <= maxSize) return;
            // this.style[params.maxSize] = maxSize + "px";
        }
        clearMaxDimensions() {
            $(this).setStyle("maxHeight", "", true)
                .setStyle("maxWidth", "", true);
        }
        show(b) {
            if (this.isShown == b)
                return this;
            requestAnimationFrame(() => {
                if (b)
                    this.recomputePosition();
                else
                    this.clearMaxDimensions();
                super.show(b);
            });
            return this;
        }
        toggle() {
            return this.show(!this.isShown);
        }
        generateDimensionParameters(direction) {
            const isVertical = direction == Direction.vertical;
            return {
                size: isVertical ? "height" : "width",
                innerSize: isVertical ? "innerHeight" : "innerWidth",
                maxSize: isVertical ? "maxHeight" : "maxWidth",
                marginStart: isVertical ? "marginTop" : "marginLeft",
                marginEnd: isVertical ? "marginBottom" : "marginRight",
                side: isVertical ? "top" : "left",
                coordinate: isVertical ? "y" : "x"
            };
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return TurboPopup = _classThis;
})();

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
    let _classSuper = TurboSelect;
    var TurboDropdown = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TurboDropdown = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        /**
         * The dropdown's selector element.
         */
        selector;
        /**
         * The dropdown's popup element.
         */
        popup;
        popupOpen = false;
        //TODO MOVE DEFAULT CLICK TO MAIN CONFIG
        static config = { defaultEntryTag: "h4", defaultSelectorTag: "h4" };
        /**
         * @description Dropdown constructor
         * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
         */
        constructor(properties) {
            properties.entriesParent = properties.popup || new TurboPopup();
            super(properties);
            this.selector = properties.selector instanceof HTMLElement ? properties.selector : button({ buttonText: "",
                customTextTag: properties.customSelectorTag || TurboDropdown.config.defaultSelectorTag });
            this.popup = properties.entriesParent;
            this.initPopup(properties);
            this.initSelector(properties);
            requestAnimationFrame(() => $(document).on(DefaultEventName.click, e => {
                if (this.popupOpen && !this.contains(e.target))
                    this.openPopup(false);
            }));
        }
        initSelector(properties) {
            if (this.selector instanceof TurboButton) {
                if (typeof properties.selector == "string")
                    this.selector.text = properties.selector;
                else if (!properties.selector) {
                    const selectorText = this.entries[0]?.value;
                    if (typeof selectorText == "string" && !this.selector.text)
                        this.selector.text = selectorText;
                }
            }
            $(this.selector).on(DefaultEventName.click, (e) => {
                this.openPopup(!this.popupOpen);
                e.stopImmediatePropagation();
            });
            $(this).addChild(this.selector);
            $(this.selector).addClass(properties.customSelectorClasses
                ? properties.customSelectorClasses
                : TurboDropdown.config.defaultSelectorClasses);
        }
        initPopup(properties) {
            $(this).addChild(this.popup);
            $(this.popup).show(false);
            $(this.popup).addClass(properties.customPopupClasses
                ? properties.customPopupClasses
                : TurboDropdown.config.defaultPopupClasses);
        }
        onEntryClick(entry) {
            super.onEntryClick(entry);
            this.openPopup(false);
        }
        select(entry, selected = true) {
            super.select(entry, selected);
            if (this.selector instanceof TurboButton)
                this.selector.text = this.stringSelectedValue;
            return this;
        }
        openPopup(b) {
            if (this.popupOpen == b)
                return;
            this.popupOpen = b;
            if (this.popup instanceof TurboElement)
                this.popup.show(b);
            else
                this.popup.show(b);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return TurboDropdown = _classThis;
})();

function getEventPosition(e) {
    if (e instanceof TurboEvent)
        return e.scaledPosition;
    if (e instanceof PointerEvent)
        return new Point(e.clientX, e.clientY);
    return;
}

let TurboMarkingMenu = (() => {
    let _classDecorators = [define("turbo-marking-menu")];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = TurboSelect;
    let _instanceExtraInitializers = [];
    let _set_startAngle_decorators;
    let _set_endAngle_decorators;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_startAngle_decorators = [auto({ callBefore: (value) => value - Math.PI / 2 })];
            _set_endAngle_decorators = [auto({ callBefore: (value) => value - Math.PI / 2 })];
            __esDecorate(this, null, _set_startAngle_decorators, { kind: "setter", name: "startAngle", static: false, private: false, access: { has: obj => "startAngle" in obj, set: (obj, value) => { obj.startAngle = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_endAngle_decorators, { kind: "setter", name: "endAngle", static: false, private: false, access: { has: obj => "endAngle" in obj, set: (obj, value) => { obj.endAngle = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        transition = __runInitializers(this, _instanceExtraInitializers);
        semiMajor;
        semiMinor;
        currentOrigin;
        minDragDistance;
        set startAngle(value) { }
        ;
        set endAngle(value) { }
        ;
        constructor(properties = {}) {
            super(properties);
            super.show(false);
            this.startAngle = 0;
            this.endAngle = properties.endAngle ?? Math.PI * 2;
            this.semiMajor = properties.semiMajor ?? 50;
            this.semiMinor = properties.semiMinor ?? 45;
            this.minDragDistance = properties.minDragDistance ?? 20;
            this.transition = properties.transition instanceof StatefulReifect ? properties.transition
                : this.initializeTransition(properties.transition ?? {});
            this.transition.initialize(InOut.out, this.entries);
            $(this).setStyles({ position: "fixed", top: 0, left: 0 });
            this.showTransition = this.showTransition.clone();
            this.showTransition.transitionDelay = { hidden: (index, totalCount) => 0.13 + totalCount * 0.02, visible: 0 };
            this.initEvents();
        }
        get totalAngle() {
            let totalAngle = this.endAngle - this.startAngle;
            while (totalAngle > Math.PI * 2)
                totalAngle -= Math.PI * 2;
            return totalAngle;
        }
        initEvents() {
            const hideOnEvent = (e) => {
                if ($(e.target).findInParents(this))
                    return;
                if (this.isShown)
                    $(this).show(false);
            };
            $(document).on(DefaultEventName.scroll, hideOnEvent);
            $(document).on(DefaultEventName.clickEnd, hideOnEvent);
            $(document).on(DefaultEventName.dragStart, hideOnEvent);
        }
        initializeTransition(properties) {
            properties.states = [InOut.in, InOut.out];
            if (!properties.transitionProperties)
                properties.transitionProperties = "opacity transform";
            if (properties.transitionDuration == undefined)
                properties.transitionDuration = 0.1;
            if (!properties.transitionTimingFunction)
                properties.transitionTimingFunction = {
                    in: "ease-out",
                    out: "ease-in"
                };
            if (!properties.transitionDelay)
                properties.transitionDelay = {
                    in: (index) => 0.01 + index * 0.02,
                    out: (index, totalCount) => 0.01 + (totalCount - index) * 0.02
                };
            if (!properties.styles)
                properties.styles = {
                    in: (index, totalCount) => {
                        //Compute angle of current entry (offset by 90 deg)
                        const angle = this.computeAngle(index, totalCount);
                        //Compute x and y
                        const x = this.semiMajor * Math.cos(angle);
                        const y = this.semiMinor * Math.sin(angle);
                        //Translate the div to move its anchor as close as possible to the center
                        //I.e., for x, the more it's close to 0, the more centered horizontally it gets,
                        //and the farthest from 0, the closer it gets to the edge
                        const translations = {
                            x: -50 * (1 - x / this.semiMajor),
                            y: -50 * (1 - y / this.semiMinor)
                        };
                        return {
                            opacity: 1,
                            top: y + "px",
                            left: x + "px",
                            transform: `translate3d(${translations.x}%, ${translations.y}%, 0)`
                        };
                    },
                    out: { opacity: 0, transform: `translate3d(-50%, -50%, 0)` }
                };
            return statefulReifier(properties);
        }
        computeAngle(index, totalCount) {
            const totalAngleEntriesCount = totalCount - (this.totalAngle < Math.PI * 2 ? 1 : 0);
            let angle = this.totalAngle * index / totalAngleEntriesCount + this.startAngle;
            angle += Math.sin((angle + (Math.PI / 2)) * 2) * 0.2;
            while (angle < 0)
                angle += Math.PI * 2;
            while (angle >= Math.PI * 2)
                angle -= Math.PI * 2;
            return angle;
        }
        addEntry(entry, index = this.entries.length) {
            entry = super.addEntry(entry, index);
            this.transition?.initialize(this.isShown ? InOut.in : InOut.out, entry);
            $(entry).setStyles({ position: "absolute" });
            return entry;
        }
        show(b = !this.isShown, position) {
            if (position)
                this.currentOrigin = position;
            else
                this.currentOrigin = new Point(this.offsetLeft, this.offsetTop);
            if (position && b)
                $(this).setStyle("transform", `translate3d(${position.x}px, ${position.y}px, 0)`);
            this.transition.apply(b ? InOut.in : InOut.out, this.enabledEntries);
            super.show(b);
            return this;
        }
        getEntryInDirection(position) {
            if (!this.currentOrigin)
                return null;
            if (Point.dist(position, this.currentOrigin) < this.minDragDistance)
                return null;
            let angle = Math.atan2(position.y - this.currentOrigin.y, position.x - this.currentOrigin.x);
            if (angle < 0)
                angle += Math.PI * 2;
            // Find the closest entry based on the calculated angle
            let closestEntry = null;
            let smallestAngleDifference = Infinity;
            this.enabledEntries.forEach((entry, index) => {
                // Compute the angle of the current entry
                const entryAngle = this.computeAngle(index, this.enabledEntries.length);
                // Calculate the absolute difference between the entry angle and the position angle
                const angleDifference = Math.abs(entryAngle - angle);
                // Update the closest entry if this one is closer
                if (angleDifference < smallestAngleDifference) {
                    smallestAngleDifference = angleDifference;
                    closestEntry = entry;
                }
            });
            return closestEntry;
        }
        selectEntryInDirection(position) {
            this.select(this.getEntryInDirection(position));
        }
        attachTo(element, onClick = (e) => this.show(true, getEventPosition(e)), onDragStart = (e) => this.show(true, getEventPosition(e)), onDragEnd = onDragStart
            ? (e) => this.selectEntryInDirection(getEventPosition(e))
            : null) {
            //Cancel default hide operation on click end
            $(element).on(DefaultEventName.clickEnd, (e) => e.stopImmediatePropagation());
            //Setup click if defined
            if (onClick)
                $(element).on(DefaultEventName.click, (e) => {
                    e.stopImmediatePropagation();
                    onClick(e);
                }, this);
            //Cancel default hide operation on drag start
            $(element).on(DefaultEventName.dragStart, (e) => {
                e.stopImmediatePropagation();
                //Setup drag start if defined
                if (onDragStart)
                    onDragStart(e);
            }, this);
            //Setup drag end if defined
            if (onDragEnd)
                $(element).on(DefaultEventName.dragEnd, (e) => {
                    e.stopImmediatePropagation();
                    onDragEnd(e);
                }, this);
        }
    });
    return _classThis;
})();

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
    let _classSuper = TurboSelect;
    let _instanceExtraInitializers = [];
    let _set_opacity_decorators;
    let _set_alwaysOpen_decorators;
    let _set_index_decorators;
    let _set_open_decorators;
    (class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _set_opacity_decorators = [auto({ callBefore: (value) => trim(value, 1) })];
            _set_alwaysOpen_decorators = [auto()];
            _set_index_decorators = [auto({ cancelIfUnchanged: false })];
            _set_open_decorators = [auto()];
            __esDecorate(this, null, _set_opacity_decorators, { kind: "setter", name: "opacity", static: false, private: false, access: { has: obj => "opacity" in obj, set: (obj, value) => { obj.opacity = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_alwaysOpen_decorators, { kind: "setter", name: "alwaysOpen", static: false, private: false, access: { has: obj => "alwaysOpen" in obj, set: (obj, value) => { obj.alwaysOpen = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_index_decorators, { kind: "setter", name: "index", static: false, private: false, access: { has: obj => "index" in obj, set: (obj, value) => { obj.index = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _set_open_decorators, { kind: "setter", name: "open", static: false, private: false, access: { has: obj => "open" in obj, set: (obj, value) => { obj.open = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        _currentPosition = (__runInitializers(this, _instanceExtraInitializers), 0);
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
        direction = Direction.horizontal;
        scale = { max: 1, min: 0.5 };
        generateCustomStyling;
        dragging;
        openTimer;
        constructor(properties) {
            properties.multiSelection = false;
            properties.forceSelection = true;
            super(properties);
            if (properties.scale)
                this.scale = properties.scale;
            if (properties.direction)
                this.direction = properties.direction;
            this.opacity = properties.opacity ?? { max: 1, min: 0 };
            this.size = properties.size;
            this.generateCustomStyling = properties.generateCustomStyling;
            this.reifect = properties.styleReifect;
            $(this).setStyles({ display: "block", position: "relative" });
            this.alwaysOpen = properties.alwaysOpen ?? false;
            this.initializeUI();
            if (properties.selectedValues?.length > 0)
                this.select(properties.selectedValues[0]);
            requestAnimationFrame(() => this.refresh());
        }
        connectedCallback() {
            //TODO super.connectedCallback();
            requestAnimationFrame(() => this.refresh());
        }
        set opacity(value) { }
        get size() {
            return this._size;
        }
        set size(value) {
            this._size = typeof value == "object" ? value : { max: value ?? 100, min: -(value ?? 100) };
        }
        get reifect() {
            return this._reifect;
        }
        set reifect(value) {
            if (value instanceof Reifect)
                this._reifect = value;
            else {
                if (!value)
                    value = {};
                if (!value.transitionProperties)
                    value.transitionProperties = "opacity transform";
                if (value.transitionDuration == undefined)
                    value.transitionDuration = 0.2;
                if (!value.transitionTimingFunction)
                    value.transitionTimingFunction = "ease-in-out";
                this._reifect = new Reifect(value);
            }
            this._reifect.attachAll(...this.entries);
        }
        set alwaysOpen(value) {
            if (value)
                $(document).removeListener(DefaultEventName.click, this.closeOnClick);
            else
                $(document).on(DefaultEventName.click, this.closeOnClick);
            this.open = value;
        }
        closeOnClick = () => this.open = false;
        get isVertical() {
            return this.direction == Direction.vertical;
        }
        set index(value) {
            this.selectByIndex(this.trimmedIndex);
        }
        get trimmedIndex() {
            return trim(Math.round(this.index), this.entries.length - 1);
        }
        get flooredTrimmedIndex() {
            return trim(Math.floor(this.index), this.entries.length - 1);
        }
        set open(value) {
            $(this).setStyle("overflow", value ? "visible" : "hidden");
        }
        get currentPosition() {
            return this._currentPosition;
        }
        set currentPosition(value) {
            const min = -this.dragLimitOffset - this.sizePerEntry[0] / 2;
            const max = this.totalSize + this.dragLimitOffset - this.sizePerEntry[this.sizePerEntry.length - 1] / 2;
            if (value < min)
                value = min;
            if (value > max)
                value = max;
            this._currentPosition = value;
            const elements = this.reifect.getEnabledObjectsData();
            if (elements.length === 0)
                return;
            elements.forEach((el, index) => this.computeAndApplyStyling(el.object.deref(), this.positionPerEntry[index] - value));
        }
        setupUIListeners() {
            super.setupUIListeners();
            $(document.body).on(DefaultEventName.drag, (e) => {
                if (!this.dragging)
                    return;
                e.stopImmediatePropagation();
                this.currentPosition += this.computeDragValue(e.scaledDeltaPosition);
            });
            $(document.body).on(DefaultEventName.dragEnd, (e) => {
                if (!this.dragging)
                    return;
                e.stopImmediatePropagation();
                this.dragging = false;
                this.recomputeIndex();
                // this.snapTo(this.trimmedIndex);
                if (!this.alwaysOpen)
                    this.setOpenTimer();
            });
        }
        computeDragValue(delta) {
            return -delta[this.isVertical ? "y" : "x"];
        }
        /**
         * Recalculates the dimensions and positions of all entries
         */
        reloadEntrySizes() {
            if (!this.reifect)
                return;
            this.sizePerEntry.length = 0;
            this.positionPerEntry.length = 0;
            this.totalSize = 0;
            this.reifect.getEnabledObjectsData().forEach(entry => {
                const object = entry.object.deref();
                const size = object ? object[this.isVertical ? "offsetHeight" : "offsetWidth"] : 0;
                this.sizePerEntry.push(size);
                this.positionPerEntry.push(this.totalSize);
                this.totalSize += size;
            });
            const flooredIndex = Math.floor(this.index);
            const indexOffset = this.index - Math.floor(this.index);
            this.currentPosition = 0;
            if (this.index < 0)
                this.currentPosition = -Math.abs(this.index) * this.sizePerEntry[0];
            else if (this.index >= this.sizePerEntry.length)
                this.currentPosition =
                    (this.index - this.sizePerEntry.length + 1) * this.sizePerEntry[this.sizePerEntry.length - 1];
            else
                this.currentPosition = this.positionPerEntry[flooredIndex] + this.sizePerEntry[flooredIndex] * indexOffset;
        }
        recomputeIndex() {
            let index = 0;
            while (index < this.positionPerEntry.length - 1 && this.positionPerEntry[index + 1] < this.currentPosition)
                index++;
            if (this.currentPosition - this.positionPerEntry[index] > this.sizePerEntry[index + 1] / 2)
                index++;
            this.index = index;
        }
        computeAndApplyStyling(element, translationValue, size = this.size) {
            let opacityValue, scaleValue;
            const bound = translationValue > 0 ? size.max : size.min;
            opacityValue = linearInterpolation(translationValue, 0, bound, this.opacity.max, this.opacity.min);
            scaleValue = linearInterpolation(translationValue, 0, bound, this.scale.max, this.scale.min);
            let styles = {
                left: "50%", top: "50%", opacity: opacityValue, transform: `translate3d(
            calc(${!this.isVertical ? translationValue : 0}px - 50%), 
            calc(${this.isVertical ? translationValue : 0}px - 50%),
            0) scale3d(${scaleValue}, ${scaleValue}, 1)`
            };
            if (this.generateCustomStyling)
                styles = this.generateCustomStyling({
                    element: element,
                    translationValue: translationValue,
                    opacityValue: opacityValue,
                    scaleValue: scaleValue,
                    size: size,
                    defaultComputedStyles: styles
                });
            $(element).setStyles(styles);
        }
        select(entry, selected = true) {
            super.select(entry, selected);
            if (entry === undefined || entry === null)
                return this;
            const index = this.getIndex(this.selectedEntry);
            if (index != this.index)
                this.index = index;
            if (this.reifect) {
                this.reifect.transitionEnabled = true;
                this.reloadEntrySizes();
            }
            const computedStyle = getComputedStyle(this.selectedEntry);
            $(this).setStyles({ minWidth: computedStyle.width, minHeight: computedStyle.height }, true);
            return this;
        }
        onEntryClick(entry, e) {
            super.onEntryClick(entry, e);
            e.stopImmediatePropagation();
            this.open = true;
            if (!this.alwaysOpen)
                this.setOpenTimer();
        }
        addEntry(entry, index = this.entries.length) {
            entry = this.createEntry(entry);
            entry.onDetach.add(() => this.reifect?.detach(entry));
            entry.onAttach.add(() => {
                this.reifect?.attach(entry);
                this.reloadEntrySizes();
            });
            entry = super.addEntry(entry, index);
            $(entry).setStyles({ position: "absolute" });
            $(entry).on(DefaultEventName.dragStart, (e) => {
                e.stopImmediatePropagation();
                this.clearOpenTimer();
                this.open = true;
                this.dragging = true;
                this.reifect.transitionEnabled = false;
                this.reloadEntrySizes();
            });
            let showTimer;
            $(entry).on("mouseover", () => {
                clearTimeout(showTimer);
                showTimer = setTimeout(() => this.open = true, 1000);
            });
            $(entry).on("mouseout", () => {
                if (showTimer)
                    clearTimeout(showTimer);
                showTimer = null;
            });
            this.refresh();
            return entry;
        }
        clear() {
            this.reifect.detach(...this.entries);
            super.clear();
        }
        refresh() {
            if (this.selectedEntry)
                this.select(this.selectedEntry);
            else
                this.reset();
        }
        reset() {
            this.select(this.entries[0]);
        }
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

function addReifectManagementToNodePrototype() {
    const showTransition = new StatefulReifect({
        states: [Shown.visible, Shown.hidden],
        styles: (state) => `visibility: ${state}`
    });
    /**
     * @description Adds a readonly "reifects" property to Node prototype.
     */
    Object.defineProperty(Node.prototype, "reifects", {
        get: function () {
            if (!this._reifects)
                this._reifects = new ReifectHandler(this);
            return this._reifects;
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Adds a configurable "showTransition" property to Node prototype. Defaults to a global
     * transition assigned to all nodes.
     */
    Object.defineProperty(Node.prototype, "showTransition", {
        value: showTransition,
        writable: true,
        configurable: true,
        enumerable: true
    });
    /**
     * @description Boolean indicating whether the node is shown or not, based on its showTransition.
     */
    Object.defineProperty(Node.prototype, "isShown", {
        get: function () {
            const state = this.showTransition.stateOf(this);
            if (state == Shown.visible)
                return true;
            else if (state == Shown.hidden)
                return false;
            return this.style.display != "none" && this.style.visibility != "hidden" && this.style.opacity != "0";
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
    Node.prototype.show = function _show(b, options = { executeForAll: false }) {
        if (!(this instanceof HTMLElement) && !(this instanceof SVGElement))
            return this;
        this.showTransition.apply(b ? Shown.visible : Shown.hidden, this, options);
        return this;
    };
}

function setup() {
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
let TurboProxiedElement = (() => {
    let _instanceExtraInitializers = [];
    let _set_selected_decorators;
    return class TurboProxiedElement {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _set_selected_decorators = [auto()];
            __esDecorate(this, null, _set_selected_decorators, { kind: "setter", name: "selected", static: false, private: false, access: { has: obj => "selected" in obj, set: (obj, value) => { obj.selected = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
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
        element = __runInitializers(this, _instanceExtraInitializers);
        /**
         * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
         * @protected
         */
        mvc;
        constructor(properties = {}) {
            setup();
            this.element = blindElement(properties);
            if (this.getPropertiesValue(properties.shadowDOM, "shadowDOM"))
                this.element.attachShadow({ mode: "open" });
            this.mvc = new Mvc({ ...properties, element: this });
        }
        setupChangedCallbacks() {
        }
        setupUIElements() {
        }
        setupUILayout() {
        }
        setupUIListeners() {
        }
        set selected(value) {
            const selectedClass = this.getPropertiesValue(null, "defaultSelectedClass", "selected");
            $(this.element).toggleClass(selectedClass, value);
        }
    };
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

class YDocument extends TurboElement {
    document;
    constructor(properties) {
        super(properties);
        this.document = properties.document;
    }
}

/**
 * Utility module to work with key-value stores.
 *
 * @module map
 */

/**
 * Creates a new Map instance.
 *
 * @function
 * @return {Map<any, any>}
 *
 * @function
 */
const create$5 = () => new Map();

/**
 * Copy a Map object into a fresh Map object.
 *
 * @function
 * @template K,V
 * @param {Map<K,V>} m
 * @return {Map<K,V>}
 */
const copy = m => {
  const r = create$5();
  m.forEach((v, k) => { r.set(k, v); });
  return r
};

/**
 * Get map property. Create T if property is undefined and set T on map.
 *
 * ```js
 * const listeners = map.setIfUndefined(events, 'eventName', set.create)
 * listeners.add(listener)
 * ```
 *
 * @function
 * @template {Map<any, any>} MAP
 * @template {MAP extends Map<any,infer V> ? function():V : unknown} CF
 * @param {MAP} map
 * @param {MAP extends Map<infer K,any> ? K : unknown} key
 * @param {CF} createT
 * @return {ReturnType<CF>}
 */
const setIfUndefined = (map, key, createT) => {
  let set = map.get(key);
  if (set === undefined) {
    map.set(key, set = createT());
  }
  return set
};

/**
 * Creates an Array and populates it with the content of all key-value pairs using the `f(value, key)` function.
 *
 * @function
 * @template K
 * @template V
 * @template R
 * @param {Map<K,V>} m
 * @param {function(V,K):R} f
 * @return {Array<R>}
 */
const map = (m, f) => {
  const res = [];
  for (const [key, value] of m) {
    res.push(f(value, key));
  }
  return res
};

/**
 * Tests whether any key-value pairs pass the test implemented by `f(value, key)`.
 *
 * @todo should rename to some - similarly to Array.some
 *
 * @function
 * @template K
 * @template V
 * @param {Map<K,V>} m
 * @param {function(V,K):boolean} f
 * @return {boolean}
 */
const any = (m, f) => {
  for (const [key, value] of m) {
    if (f(value, key)) {
      return true
    }
  }
  return false
};

/**
 * Utility module to work with sets.
 *
 * @module set
 */

const create$4 = () => new Set();

/**
 * Utility module to work with Arrays.
 *
 * @module array
 */


/**
 * Return the last element of an array. The element must exist
 *
 * @template L
 * @param {ArrayLike<L>} arr
 * @return {L}
 */
const last = arr => arr[arr.length - 1];

/**
 * Transforms something array-like to an actual Array.
 *
 * @function
 * @template T
 * @param {ArrayLike<T>|Iterable<T>} arraylike
 * @return {T}
 */
const from = Array.from;

const isArray = Array.isArray;

/**
 * Observable class prototype.
 *
 * @module observable
 */


/**
 * Handles named events.
 * @experimental
 *
 * This is basically a (better typed) duplicate of Observable, which will replace Observable in the
 * next release.
 *
 * @template {{[key in keyof EVENTS]: function(...any):void}} EVENTS
 */
class ObservableV2 {
  constructor () {
    /**
     * Some desc.
     * @type {Map<string, Set<any>>}
     */
    this._observers = create$5();
  }

  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  on (name, f) {
    setIfUndefined(this._observers, /** @type {string} */ (name), create$4).add(f);
    return f
  }

  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  once (name, f) {
    /**
     * @param  {...any} args
     */
    const _f = (...args) => {
      this.off(name, /** @type {any} */ (_f));
      f(...args);
    };
    this.on(name, /** @type {any} */ (_f));
  }

  /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */
  off (name, f) {
    const observers = this._observers.get(name);
    if (observers !== undefined) {
      observers.delete(f);
      if (observers.size === 0) {
        this._observers.delete(name);
      }
    }
  }

  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name The event name.
   * @param {Parameters<EVENTS[NAME]>} args The arguments that are applied to the event listener.
   */
  emit (name, args) {
    // copy all listeners to an array first to make sure that no event is emitted to listeners that are subscribed while the event handler is called.
    return from((this._observers.get(name) || create$5()).values()).forEach(f => f(...args))
  }

  destroy () {
    this._observers = create$5();
  }
}
/* c8 ignore end */

/**
 * Common Math expressions.
 *
 * @module math
 */

const floor = Math.floor;
const abs = Math.abs;

/**
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number} The smaller element of a and b
 */
const min = (a, b) => a < b ? a : b;

/**
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number} The bigger element of a and b
 */
const max = (a, b) => a > b ? a : b;

/**
 * @param {number} n
 * @return {boolean} Wether n is negative. This function also differentiates between -0 and +0
 */
const isNegativeZero = n => n !== 0 ? n < 0 : 1 / n < 0;

/* eslint-env browser */

/**
 * Binary data constants.
 *
 * @module binary
 */

/**
 * n-th bit activated.
 *
 * @type {number}
 */
const BIT1 = 1;
const BIT2 = 2;
const BIT3 = 4;
const BIT4 = 8;
const BIT6 = 32;
const BIT7 = 64;
const BIT8 = 128;
const BITS5 = 31;
const BITS6 = 63;
const BITS7 = 127;
/**
 * @type {number}
 */
const BITS31 = 0x7FFFFFFF;

/**
 * Utility helpers for working with numbers.
 *
 * @module number
 */


/* c8 ignore next */
const isInteger = Number.isInteger || (num => typeof num === 'number' && isFinite(num) && floor(num) === num);

/**
 * @param {string} s
 * @return {string}
 */
const toLowerCase = s => s.toLowerCase();

const trimLeftRegex = /^\s*/g;

/**
 * @param {string} s
 * @return {string}
 */
const trimLeft = s => s.replace(trimLeftRegex, '');

const fromCamelCaseRegex = /([A-Z])/g;

/**
 * @param {string} s
 * @param {string} separator
 * @return {string}
 */
const fromCamelCase = (s, separator) => trimLeft(s.replace(fromCamelCaseRegex, match => `${separator}${toLowerCase(match)}`));

/**
 * @param {string} str
 * @return {Uint8Array}
 */
const _encodeUtf8Polyfill = str => {
  const encodedString = unescape(encodeURIComponent(str));
  const len = encodedString.length;
  const buf = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buf[i] = /** @type {number} */ (encodedString.codePointAt(i));
  }
  return buf
};

/* c8 ignore next */
const utf8TextEncoder = /** @type {TextEncoder} */ (typeof TextEncoder !== 'undefined' ? new TextEncoder() : null);

/**
 * @param {string} str
 * @return {Uint8Array}
 */
const _encodeUtf8Native = str => utf8TextEncoder.encode(str);

/**
 * @param {string} str
 * @return {Uint8Array}
 */
/* c8 ignore next */
const encodeUtf8 = utf8TextEncoder ? _encodeUtf8Native : _encodeUtf8Polyfill;

/* c8 ignore next */
let utf8TextDecoder = typeof TextDecoder === 'undefined' ? null : new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });

/* c8 ignore start */
if (utf8TextDecoder && utf8TextDecoder.decode(new Uint8Array()).length === 1) {
  // Safari doesn't handle BOM correctly.
  // This fixes a bug in Safari 13.0.5 where it produces a BOM the first time it is called.
  // utf8TextDecoder.decode(new Uint8Array()).length === 1 on the first call and
  // utf8TextDecoder.decode(new Uint8Array()).length === 1 on the second call
  // Another issue is that from then on no BOM chars are recognized anymore
  /* c8 ignore next */
  utf8TextDecoder = null;
}

/**
 * Efficient schema-less binary encoding with support for variable length encoding.
 *
 * Use [lib0/encoding] with [lib0/decoding]. Every encoding function has a corresponding decoding function.
 *
 * Encodes numbers in little-endian order (least to most significant byte order)
 * and is compatible with Golang's binary encoding (https://golang.org/pkg/encoding/binary/)
 * which is also used in Protocol Buffers.
 *
 * ```js
 * // encoding step
 * const encoder = encoding.createEncoder()
 * encoding.writeVarUint(encoder, 256)
 * encoding.writeVarString(encoder, 'Hello world!')
 * const buf = encoding.toUint8Array(encoder)
 * ```
 *
 * ```js
 * // decoding step
 * const decoder = decoding.createDecoder(buf)
 * decoding.readVarUint(decoder) // => 256
 * decoding.readVarString(decoder) // => 'Hello world!'
 * decoding.hasContent(decoder) // => false - all data is read
 * ```
 *
 * @module encoding
 */


/**
 * A BinaryEncoder handles the encoding to an Uint8Array.
 */
class Encoder {
  constructor () {
    this.cpos = 0;
    this.cbuf = new Uint8Array(100);
    /**
     * @type {Array<Uint8Array>}
     */
    this.bufs = [];
  }
}

/**
 * @function
 * @return {Encoder}
 */
const createEncoder = () => new Encoder();

/**
 * The current length of the encoded data.
 *
 * @function
 * @param {Encoder} encoder
 * @return {number}
 */
const length = encoder => {
  let len = encoder.cpos;
  for (let i = 0; i < encoder.bufs.length; i++) {
    len += encoder.bufs[i].length;
  }
  return len
};

/**
 * Transform to Uint8Array.
 *
 * @function
 * @param {Encoder} encoder
 * @return {Uint8Array} The created ArrayBuffer.
 */
const toUint8Array = encoder => {
  const uint8arr = new Uint8Array(length(encoder));
  let curPos = 0;
  for (let i = 0; i < encoder.bufs.length; i++) {
    const d = encoder.bufs[i];
    uint8arr.set(d, curPos);
    curPos += d.length;
  }
  uint8arr.set(new Uint8Array(encoder.cbuf.buffer, 0, encoder.cpos), curPos);
  return uint8arr
};

/**
 * Verify that it is possible to write `len` bytes wtihout checking. If
 * necessary, a new Buffer with the required length is attached.
 *
 * @param {Encoder} encoder
 * @param {number} len
 */
const verifyLen = (encoder, len) => {
  const bufferLen = encoder.cbuf.length;
  if (bufferLen - encoder.cpos < len) {
    encoder.bufs.push(new Uint8Array(encoder.cbuf.buffer, 0, encoder.cpos));
    encoder.cbuf = new Uint8Array(max(bufferLen, len) * 2);
    encoder.cpos = 0;
  }
};

/**
 * Write one byte to the encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The byte that is to be encoded.
 */
const write = (encoder, num) => {
  const bufferLen = encoder.cbuf.length;
  if (encoder.cpos === bufferLen) {
    encoder.bufs.push(encoder.cbuf);
    encoder.cbuf = new Uint8Array(bufferLen * 2);
    encoder.cpos = 0;
  }
  encoder.cbuf[encoder.cpos++] = num;
};

/**
 * Write one byte as an unsigned integer.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeUint8 = write;

/**
 * Write a variable length unsigned integer. Max encodable integer is 2^53.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeVarUint = (encoder, num) => {
  while (num > BITS7) {
    write(encoder, BIT8 | (BITS7 & num));
    num = floor(num / 128); // shift >>> 7
  }
  write(encoder, BITS7 & num);
};

/**
 * Write a variable length integer.
 *
 * We use the 7th bit instead for signaling that this is a negative number.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeVarInt = (encoder, num) => {
  const isNegative = isNegativeZero(num);
  if (isNegative) {
    num = -num;
  }
  //             |- whether to continue reading         |- whether is negative     |- number
  write(encoder, (num > BITS6 ? BIT8 : 0) | (isNegative ? BIT7 : 0) | (BITS6 & num));
  num = floor(num / 64); // shift >>> 6
  // We don't need to consider the case of num === 0 so we can use a different
  // pattern here than above.
  while (num > 0) {
    write(encoder, (num > BITS7 ? BIT8 : 0) | (BITS7 & num));
    num = floor(num / 128); // shift >>> 7
  }
};

/**
 * A cache to store strings temporarily
 */
const _strBuffer = new Uint8Array(30000);
const _maxStrBSize = _strBuffer.length / 3;

/**
 * Write a variable length string.
 *
 * @function
 * @param {Encoder} encoder
 * @param {String} str The string that is to be encoded.
 */
const _writeVarStringNative = (encoder, str) => {
  if (str.length < _maxStrBSize) {
    // We can encode the string into the existing buffer
    /* c8 ignore next */
    const written = utf8TextEncoder.encodeInto(str, _strBuffer).written || 0;
    writeVarUint(encoder, written);
    for (let i = 0; i < written; i++) {
      write(encoder, _strBuffer[i]);
    }
  } else {
    writeVarUint8Array(encoder, encodeUtf8(str));
  }
};

/**
 * Write a variable length string.
 *
 * @function
 * @param {Encoder} encoder
 * @param {String} str The string that is to be encoded.
 */
const _writeVarStringPolyfill = (encoder, str) => {
  const encodedString = unescape(encodeURIComponent(str));
  const len = encodedString.length;
  writeVarUint(encoder, len);
  for (let i = 0; i < len; i++) {
    write(encoder, /** @type {number} */ (encodedString.codePointAt(i)));
  }
};

/**
 * Write a variable length string.
 *
 * @function
 * @param {Encoder} encoder
 * @param {String} str The string that is to be encoded.
 */
/* c8 ignore next */
const writeVarString = (utf8TextEncoder && /** @type {any} */ (utf8TextEncoder).encodeInto) ? _writeVarStringNative : _writeVarStringPolyfill;

/**
 * Append fixed-length Uint8Array to the encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {Uint8Array} uint8Array
 */
const writeUint8Array = (encoder, uint8Array) => {
  const bufferLen = encoder.cbuf.length;
  const cpos = encoder.cpos;
  const leftCopyLen = min(bufferLen - cpos, uint8Array.length);
  const rightCopyLen = uint8Array.length - leftCopyLen;
  encoder.cbuf.set(uint8Array.subarray(0, leftCopyLen), cpos);
  encoder.cpos += leftCopyLen;
  if (rightCopyLen > 0) {
    // Still something to write, write right half..
    // Append new buffer
    encoder.bufs.push(encoder.cbuf);
    // must have at least size of remaining buffer
    encoder.cbuf = new Uint8Array(max(bufferLen * 2, rightCopyLen));
    // copy array
    encoder.cbuf.set(uint8Array.subarray(leftCopyLen));
    encoder.cpos = rightCopyLen;
  }
};

/**
 * Append an Uint8Array to Encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {Uint8Array} uint8Array
 */
const writeVarUint8Array = (encoder, uint8Array) => {
  writeVarUint(encoder, uint8Array.byteLength);
  writeUint8Array(encoder, uint8Array);
};

/**
 * Create an DataView of the next `len` bytes. Use it to write data after
 * calling this function.
 *
 * ```js
 * // write float32 using DataView
 * const dv = writeOnDataView(encoder, 4)
 * dv.setFloat32(0, 1.1)
 * // read float32 using DataView
 * const dv = readFromDataView(encoder, 4)
 * dv.getFloat32(0) // => 1.100000023841858 (leaving it to the reader to find out why this is the correct result)
 * ```
 *
 * @param {Encoder} encoder
 * @param {number} len
 * @return {DataView}
 */
const writeOnDataView = (encoder, len) => {
  verifyLen(encoder, len);
  const dview = new DataView(encoder.cbuf.buffer, encoder.cpos, len);
  encoder.cpos += len;
  return dview
};

/**
 * @param {Encoder} encoder
 * @param {number} num
 */
const writeFloat32 = (encoder, num) => writeOnDataView(encoder, 4).setFloat32(0, num, false);

/**
 * @param {Encoder} encoder
 * @param {number} num
 */
const writeFloat64 = (encoder, num) => writeOnDataView(encoder, 8).setFloat64(0, num, false);

/**
 * @param {Encoder} encoder
 * @param {bigint} num
 */
const writeBigInt64 = (encoder, num) => /** @type {any} */ (writeOnDataView(encoder, 8)).setBigInt64(0, num, false);

const floatTestBed = new DataView(new ArrayBuffer(4));
/**
 * Check if a number can be encoded as a 32 bit float.
 *
 * @param {number} num
 * @return {boolean}
 */
const isFloat32 = num => {
  floatTestBed.setFloat32(0, num);
  return floatTestBed.getFloat32(0) === num
};

/**
 * Encode data with efficient binary format.
 *
 * Differences to JSON:
 * • Transforms data to a binary format (not to a string)
 * • Encodes undefined, NaN, and ArrayBuffer (these can't be represented in JSON)
 * • Numbers are efficiently encoded either as a variable length integer, as a
 *   32 bit float, as a 64 bit float, or as a 64 bit bigint.
 *
 * Encoding table:
 *
 * | Data Type           | Prefix   | Encoding Method    | Comment |
 * | ------------------- | -------- | ------------------ | ------- |
 * | undefined           | 127      |                    | Functions, symbol, and everything that cannot be identified is encoded as undefined |
 * | null                | 126      |                    | |
 * | integer             | 125      | writeVarInt        | Only encodes 32 bit signed integers |
 * | float32             | 124      | writeFloat32       | |
 * | float64             | 123      | writeFloat64       | |
 * | bigint              | 122      | writeBigInt64      | |
 * | boolean (false)     | 121      |                    | True and false are different data types so we save the following byte |
 * | boolean (true)      | 120      |                    | - 0b01111000 so the last bit determines whether true or false |
 * | string              | 119      | writeVarString     | |
 * | object<string,any>  | 118      | custom             | Writes {length} then {length} key-value pairs |
 * | array<any>          | 117      | custom             | Writes {length} then {length} json values |
 * | Uint8Array          | 116      | writeVarUint8Array | We use Uint8Array for any kind of binary data |
 *
 * Reasons for the decreasing prefix:
 * We need the first bit for extendability (later we may want to encode the
 * prefix with writeVarUint). The remaining 7 bits are divided as follows:
 * [0-30]   the beginning of the data range is used for custom purposes
 *          (defined by the function that uses this library)
 * [31-127] the end of the data range is used for data encoding by
 *          lib0/encoding.js
 *
 * @param {Encoder} encoder
 * @param {undefined|null|number|bigint|boolean|string|Object<string,any>|Array<any>|Uint8Array} data
 */
const writeAny = (encoder, data) => {
  switch (typeof data) {
    case 'string':
      // TYPE 119: STRING
      write(encoder, 119);
      writeVarString(encoder, data);
      break
    case 'number':
      if (isInteger(data) && abs(data) <= BITS31) {
        // TYPE 125: INTEGER
        write(encoder, 125);
        writeVarInt(encoder, data);
      } else if (isFloat32(data)) {
        // TYPE 124: FLOAT32
        write(encoder, 124);
        writeFloat32(encoder, data);
      } else {
        // TYPE 123: FLOAT64
        write(encoder, 123);
        writeFloat64(encoder, data);
      }
      break
    case 'bigint':
      // TYPE 122: BigInt
      write(encoder, 122);
      writeBigInt64(encoder, data);
      break
    case 'object':
      if (data === null) {
        // TYPE 126: null
        write(encoder, 126);
      } else if (isArray(data)) {
        // TYPE 117: Array
        write(encoder, 117);
        writeVarUint(encoder, data.length);
        for (let i = 0; i < data.length; i++) {
          writeAny(encoder, data[i]);
        }
      } else if (data instanceof Uint8Array) {
        // TYPE 116: ArrayBuffer
        write(encoder, 116);
        writeVarUint8Array(encoder, data);
      } else {
        // TYPE 118: Object
        write(encoder, 118);
        const keys = Object.keys(data);
        writeVarUint(encoder, keys.length);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          writeVarString(encoder, key);
          writeAny(encoder, data[key]);
        }
      }
      break
    case 'boolean':
      // TYPE 120/121: boolean (true/false)
      write(encoder, data ? 120 : 121);
      break
    default:
      // TYPE 127: undefined
      write(encoder, 127);
  }
};

/**
 * Now come a few stateful encoder that have their own classes.
 */

/**
 * Basic Run Length Encoder - a basic compression implementation.
 *
 * Encodes [1,1,1,7] to [1,3,7,1] (3 times 1, 1 time 7). This encoder might do more harm than good if there are a lot of values that are not repeated.
 *
 * It was originally used for image compression. Cool .. article http://csbruce.com/cbm/transactor/pdfs/trans_v7_i06.pdf
 *
 * @note T must not be null!
 *
 * @template T
 */
class RleEncoder extends Encoder {
  /**
   * @param {function(Encoder, T):void} writer
   */
  constructor (writer) {
    super();
    /**
     * The writer
     */
    this.w = writer;
    /**
     * Current state
     * @type {T|null}
     */
    this.s = null;
    this.count = 0;
  }

  /**
   * @param {T} v
   */
  write (v) {
    if (this.s === v) {
      this.count++;
    } else {
      if (this.count > 0) {
        // flush counter, unless this is the first value (count = 0)
        writeVarUint(this, this.count - 1); // since count is always > 0, we can decrement by one. non-standard encoding ftw
      }
      this.count = 1;
      // write first value
      this.w(this, v);
      this.s = v;
    }
  }
}

/**
 * @param {UintOptRleEncoder} encoder
 */
const flushUintOptRleEncoder = encoder => {
  if (encoder.count > 0) {
    // flush counter, unless this is the first value (count = 0)
    // case 1: just a single value. set sign to positive
    // case 2: write several values. set sign to negative to indicate that there is a length coming
    writeVarInt(encoder.encoder, encoder.count === 1 ? encoder.s : -encoder.s);
    if (encoder.count > 1) {
      writeVarUint(encoder.encoder, encoder.count - 2); // since count is always > 1, we can decrement by one. non-standard encoding ftw
    }
  }
};

/**
 * Optimized Rle encoder that does not suffer from the mentioned problem of the basic Rle encoder.
 *
 * Internally uses VarInt encoder to write unsigned integers. If the input occurs multiple times, we write
 * write it as a negative number. The UintOptRleDecoder then understands that it needs to read a count.
 *
 * Encodes [1,2,3,3,3] as [1,2,-3,3] (once 1, once 2, three times 3)
 */
class UintOptRleEncoder {
  constructor () {
    this.encoder = new Encoder();
    /**
     * @type {number}
     */
    this.s = 0;
    this.count = 0;
  }

  /**
   * @param {number} v
   */
  write (v) {
    if (this.s === v) {
      this.count++;
    } else {
      flushUintOptRleEncoder(this);
      this.count = 1;
      this.s = v;
    }
  }

  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array () {
    flushUintOptRleEncoder(this);
    return toUint8Array(this.encoder)
  }
}

/**
 * @param {IntDiffOptRleEncoder} encoder
 */
const flushIntDiffOptRleEncoder = encoder => {
  if (encoder.count > 0) {
    //          31 bit making up the diff | wether to write the counter
    // const encodedDiff = encoder.diff << 1 | (encoder.count === 1 ? 0 : 1)
    const encodedDiff = encoder.diff * 2 + (encoder.count === 1 ? 0 : 1);
    // flush counter, unless this is the first value (count = 0)
    // case 1: just a single value. set first bit to positive
    // case 2: write several values. set first bit to negative to indicate that there is a length coming
    writeVarInt(encoder.encoder, encodedDiff);
    if (encoder.count > 1) {
      writeVarUint(encoder.encoder, encoder.count - 2); // since count is always > 1, we can decrement by one. non-standard encoding ftw
    }
  }
};

/**
 * A combination of the IntDiffEncoder and the UintOptRleEncoder.
 *
 * The count approach is similar to the UintDiffOptRleEncoder, but instead of using the negative bitflag, it encodes
 * in the LSB whether a count is to be read. Therefore this Encoder only supports 31 bit integers!
 *
 * Encodes [1, 2, 3, 2] as [3, 1, 6, -1] (more specifically [(1 << 1) | 1, (3 << 0) | 0, -1])
 *
 * Internally uses variable length encoding. Contrary to normal UintVar encoding, the first byte contains:
 * * 1 bit that denotes whether the next value is a count (LSB)
 * * 1 bit that denotes whether this value is negative (MSB - 1)
 * * 1 bit that denotes whether to continue reading the variable length integer (MSB)
 *
 * Therefore, only five bits remain to encode diff ranges.
 *
 * Use this Encoder only when appropriate. In most cases, this is probably a bad idea.
 */
class IntDiffOptRleEncoder {
  constructor () {
    this.encoder = new Encoder();
    /**
     * @type {number}
     */
    this.s = 0;
    this.count = 0;
    this.diff = 0;
  }

  /**
   * @param {number} v
   */
  write (v) {
    if (this.diff === v - this.s) {
      this.s = v;
      this.count++;
    } else {
      flushIntDiffOptRleEncoder(this);
      this.count = 1;
      this.diff = v - this.s;
      this.s = v;
    }
  }

  /**
   * Flush the encoded state and transform this to a Uint8Array.
   *
   * Note that this should only be called once.
   */
  toUint8Array () {
    flushIntDiffOptRleEncoder(this);
    return toUint8Array(this.encoder)
  }
}

/**
 * Optimized String Encoder.
 *
 * Encoding many small strings in a simple Encoder is not very efficient. The function call to decode a string takes some time and creates references that must be eventually deleted.
 * In practice, when decoding several million small strings, the GC will kick in more and more often to collect orphaned string objects (or maybe there is another reason?).
 *
 * This string encoder solves the above problem. All strings are concatenated and written as a single string using a single encoding call.
 *
 * The lengths are encoded using a UintOptRleEncoder.
 */
class StringEncoder {
  constructor () {
    /**
     * @type {Array<string>}
     */
    this.sarr = [];
    this.s = '';
    this.lensE = new UintOptRleEncoder();
  }

  /**
   * @param {string} string
   */
  write (string) {
    this.s += string;
    if (this.s.length > 19) {
      this.sarr.push(this.s);
      this.s = '';
    }
    this.lensE.write(string.length);
  }

  toUint8Array () {
    const encoder = new Encoder();
    this.sarr.push(this.s);
    this.s = '';
    writeVarString(encoder, this.sarr.join(''));
    writeUint8Array(encoder, this.lensE.toUint8Array());
    return toUint8Array(encoder)
  }
}

/**
 * Error helpers.
 *
 * @module error
 */

/**
 * @param {string} s
 * @return {Error}
 */
/* c8 ignore next */
const create$3 = s => new Error(s);

/**
 * @throws {Error}
 * @return {never}
 */
/* c8 ignore next 3 */
const methodUnimplemented = () => {
  throw create$3('Method unimplemented')
};

/**
 * @throws {Error}
 * @return {never}
 */
/* c8 ignore next 3 */
const unexpectedCase = () => {
  throw create$3('Unexpected case')
};

/* eslint-env browser */

const getRandomValues = crypto.getRandomValues.bind(crypto);

/**
 * Isomorphic module for true random numbers / buffers / uuids.
 *
 * Attention: falls back to Math.random if the browser does not support crypto.
 *
 * @module random
 */


const uint32 = () => getRandomValues(new Uint32Array(1))[0];

// @ts-ignore
const uuidv4Template = [1e7] + -1e3 + -4e3 + -8e3 + -1e11;

/**
 * @return {string}
 */
const uuidv4 = () => uuidv4Template.replace(/[018]/g, /** @param {number} c */ c =>
  (c ^ uint32() & 15 >> c / 4).toString(16)
);

/**
 * Utility helpers to work with promises.
 *
 * @module promise
 */


/**
 * @template T
 * @callback PromiseResolve
 * @param {T|PromiseLike<T>} [result]
 */

/**
 * @template T
 * @param {function(PromiseResolve<T>,function(Error):void):any} f
 * @return {Promise<T>}
 */
const create$2 = f => /** @type {Promise<T>} */ (new Promise(f));

/**
 * `Promise.all` wait for all promises in the array to resolve and return the result
 * @template {unknown[] | []} PS
 *
 * @param {PS} ps
 * @return {Promise<{ -readonly [P in keyof PS]: Awaited<PS[P]> }>}
 */
Promise.all.bind(Promise);

/**
 * Often used conditions.
 *
 * @module conditions
 */

/**
 * @template T
 * @param {T|null|undefined} v
 * @return {T|null}
 */
/* c8 ignore next */
const undefinedToNull = v => v === undefined ? null : v;

/* eslint-env browser */

/**
 * Isomorphic variable storage.
 *
 * Uses LocalStorage in the browser and falls back to in-memory storage.
 *
 * @module storage
 */

/* c8 ignore start */
class VarStoragePolyfill {
  constructor () {
    this.map = new Map();
  }

  /**
   * @param {string} key
   * @param {any} newValue
   */
  setItem (key, newValue) {
    this.map.set(key, newValue);
  }

  /**
   * @param {string} key
   */
  getItem (key) {
    return this.map.get(key)
  }
}
/* c8 ignore stop */

/**
 * @type {any}
 */
let _localStorage = new VarStoragePolyfill();
let usePolyfill = true;

/* c8 ignore start */
try {
  // if the same-origin rule is violated, accessing localStorage might thrown an error
  if (typeof localStorage !== 'undefined' && localStorage) {
    _localStorage = localStorage;
    usePolyfill = false;
  }
} catch (e) { }
/* c8 ignore stop */

/**
 * This is basically localStorage in browser, or a polyfill in nodejs
 */
/* c8 ignore next */
const varStorage = _localStorage;

/**
 * Utility functions for working with EcmaScript objects.
 *
 * @module object
 */


/**
 * Object.assign
 */
const assign = Object.assign;

/**
 * @param {Object<string,any>} obj
 */
const keys = Object.keys;

/**
 * @template V
 * @param {{[k:string]:V}} obj
 * @param {function(V,string):any} f
 */
const forEach = (obj, f) => {
  for (const key in obj) {
    f(obj[key], key);
  }
};

/**
 * @param {Object<string,any>} obj
 * @return {number}
 */
const size = obj => keys(obj).length;

/**
 * @param {Object|null|undefined} obj
 */
const isEmpty = obj => {
  // eslint-disable-next-line no-unreachable-loop
  for (const _k in obj) {
    return false
  }
  return true
};

/**
 * @template {{ [key:string|number|symbol]: any }} T
 * @param {T} obj
 * @param {(v:T[keyof T],k:keyof T)=>boolean} f
 * @return {boolean}
 */
const every = (obj, f) => {
  for (const key in obj) {
    if (!f(obj[key], key)) {
      return false
    }
  }
  return true
};

/**
 * Calls `Object.prototype.hasOwnProperty`.
 *
 * @param {any} obj
 * @param {string|number|symbol} key
 * @return {boolean}
 */
const hasProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * @param {Object<string,any>} a
 * @param {Object<string,any>} b
 * @return {boolean}
 */
const equalFlat = (a, b) => a === b || (size(a) === size(b) && every(a, (val, key) => (val !== undefined || hasProperty(b, key)) && b[key] === val));

/**
 * Make an object immutable. This hurts performance and is usually not needed if you perform good
 * coding practices.
 */
const freeze = Object.freeze;

/**
 * Make an object and all its children immutable.
 * This *really* hurts performance and is usually not needed if you perform good coding practices.
 *
 * @template {any} T
 * @param {T} o
 * @return {Readonly<T>}
 */
const deepFreeze = (o) => {
  for (const key in o) {
    const c = o[key];
    if (typeof c === 'object' || typeof c === 'function') {
      deepFreeze(o[key]);
    }
  }
  return freeze(o)
};

/**
 * Common functions and function call helpers.
 *
 * @module function
 */


/**
 * Calls all functions in `fs` with args. Only throws after all functions were called.
 *
 * @param {Array<function>} fs
 * @param {Array<any>} args
 */
const callAll = (fs, args, i = 0) => {
  try {
    for (; i < fs.length; i++) {
      fs[i](...args);
    }
  } finally {
    if (i < fs.length) {
      callAll(fs, args, i + 1);
    }
  }
};

/**
 * @template V
 * @template {V} OPTS
 *
 * @param {V} value
 * @param {Array<OPTS>} options
 */
// @ts-ignore
const isOneOf = (value, options) => options.includes(value);

/**
 * Isomorphic module to work access the environment (query params, env variables).
 *
 * @module environment
 */


/* c8 ignore next 2 */
// @ts-ignore
const isNode = typeof process !== 'undefined' && process.release && /node|io\.js/.test(process.release.name) && Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

/**
 * @type {Map<string,string>}
 */
let params;

/* c8 ignore start */
const computeParams = () => {
  if (params === undefined) {
    if (isNode) {
      params = create$5();
      const pargs = process.argv;
      let currParamName = null;
      for (let i = 0; i < pargs.length; i++) {
        const parg = pargs[i];
        if (parg[0] === '-') {
          if (currParamName !== null) {
            params.set(currParamName, '');
          }
          currParamName = parg;
        } else {
          if (currParamName !== null) {
            params.set(currParamName, parg);
            currParamName = null;
          }
        }
      }
      if (currParamName !== null) {
        params.set(currParamName, '');
      }
      // in ReactNative for example this would not be true (unless connected to the Remote Debugger)
    } else if (typeof location === 'object') {
      params = create$5(); // eslint-disable-next-line no-undef
      (location.search || '?').slice(1).split('&').forEach((kv) => {
        if (kv.length !== 0) {
          const [key, value] = kv.split('=');
          params.set(`--${fromCamelCase(key, '-')}`, value);
          params.set(`-${fromCamelCase(key, '-')}`, value);
        }
      });
    } else {
      params = create$5();
    }
  }
  return params
};
/* c8 ignore stop */

/**
 * @param {string} name
 * @return {boolean}
 */
/* c8 ignore next */
const hasParam = (name) => computeParams().has(name);

/**
 * @param {string} name
 * @return {string|null}
 */
/* c8 ignore next 4 */
const getVariable = (name) =>
  isNode
    ? undefinedToNull(process.env[name.toUpperCase().replaceAll('-', '_')])
    : undefinedToNull(varStorage.getItem(name));

/**
 * @param {string} name
 * @return {boolean}
 */
/* c8 ignore next 2 */
const hasConf = (name) =>
  hasParam('--' + name) || getVariable(name) !== null;

/* c8 ignore next */
hasConf('production');

/* c8 ignore next 2 */
const forceColor = isNode &&
  isOneOf(process.env.FORCE_COLOR, ['true', '1', '2']);

/* c8 ignore start */
/**
 * Color is enabled by default if the terminal supports it.
 *
 * Explicitly enable color using `--color` parameter
 * Disable color using `--no-color` parameter or using `NO_COLOR=1` environment variable.
 * `FORCE_COLOR=1` enables color and takes precedence over all.
 */
const supportsColor = forceColor || (
  !hasParam('--no-colors') && // @todo deprecate --no-colors
  !hasConf('no-color') &&
  (!isNode || process.stdout.isTTY) && (
    !isNode ||
    hasParam('--color') ||
    getVariable('COLORTERM') !== null ||
    (getVariable('TERM') || '').includes('color')
  )
);
/* c8 ignore stop */

/**
 * Working with value pairs.
 *
 * @module pair
 */

/**
 * @template L,R
 */
class Pair {
  /**
   * @param {L} left
   * @param {R} right
   */
  constructor (left, right) {
    this.left = left;
    this.right = right;
  }
}

/**
 * @template L,R
 * @param {L} left
 * @param {R} right
 * @return {Pair<L,R>}
 */
const create$1 = (left, right) => new Pair(left, right);

/* eslint-env browser */


/** @type {DOMParser} */ (typeof DOMParser !== 'undefined' ? new DOMParser() : null);

/**
 * @param {Map<string,string>} m
 * @return {string}
 */
const mapToStyleString = m => map(m, (value, key) => `${key}:${value};`).join('');
/* c8 ignore stop */

/**
 * Utility module to work with EcmaScript Symbols.
 *
 * @module symbol
 */

/**
 * Return fresh symbol.
 */
const create = Symbol;

const BOLD = create();
const UNBOLD = create();
const BLUE = create();
const GREY = create();
const GREEN = create();
const RED = create();
const PURPLE = create();
const ORANGE = create();
const UNCOLOR = create();

/* c8 ignore start */
/**
 * @param {Array<undefined|string|Symbol|Object|number|function():any>} args
 * @return {Array<string|object|number|undefined>}
 */
const computeNoColorLoggingArgs = args => {
  if (args.length === 1 && args[0]?.constructor === Function) {
    args = /** @type {Array<string|Symbol|Object|number>} */ (/** @type {[function]} */ (args)[0]());
  }
  const strBuilder = [];
  const logArgs = [];
  // try with formatting until we find something unsupported
  let i = 0;
  for (; i < args.length; i++) {
    const arg = args[i];
    if (arg === undefined) {
      break
    } else if (arg.constructor === String || arg.constructor === Number) {
      strBuilder.push(arg);
    } else if (arg.constructor === Object) {
      break
    }
  }
  if (i > 0) {
    // create logArgs with what we have so far
    logArgs.push(strBuilder.join(''));
  }
  // append the rest
  for (; i < args.length; i++) {
    const arg = args[i];
    if (!(arg instanceof Symbol)) {
      logArgs.push(arg);
    }
  }
  return logArgs
};
/* c8 ignore stop */

/**
 * Isomorphic logging module with support for colors!
 *
 * @module logging
 */


/**
 * @type {Object<Symbol,pair.Pair<string,string>>}
 */
const _browserStyleMap = {
  [BOLD]: create$1('font-weight', 'bold'),
  [UNBOLD]: create$1('font-weight', 'normal'),
  [BLUE]: create$1('color', 'blue'),
  [GREEN]: create$1('color', 'green'),
  [GREY]: create$1('color', 'grey'),
  [RED]: create$1('color', 'red'),
  [PURPLE]: create$1('color', 'purple'),
  [ORANGE]: create$1('color', 'orange'), // not well supported in chrome when debugging node with inspector - TODO: deprecate
  [UNCOLOR]: create$1('color', 'black')
};

/**
 * @param {Array<string|Symbol|Object|number|function():any>} args
 * @return {Array<string|object|number>}
 */
/* c8 ignore start */
const computeBrowserLoggingArgs = (args) => {
  if (args.length === 1 && args[0]?.constructor === Function) {
    args = /** @type {Array<string|Symbol|Object|number>} */ (/** @type {[function]} */ (args)[0]());
  }
  const strBuilder = [];
  const styles = [];
  const currentStyle = create$5();
  /**
   * @type {Array<string|Object|number>}
   */
  let logArgs = [];
  // try with formatting until we find something unsupported
  let i = 0;
  for (; i < args.length; i++) {
    const arg = args[i];
    // @ts-ignore
    const style = _browserStyleMap[arg];
    if (style !== undefined) {
      currentStyle.set(style.left, style.right);
    } else {
      if (arg === undefined) {
        break
      }
      if (arg.constructor === String || arg.constructor === Number) {
        const style = mapToStyleString(currentStyle);
        if (i > 0 || style.length > 0) {
          strBuilder.push('%c' + arg);
          styles.push(style);
        } else {
          strBuilder.push(arg);
        }
      } else {
        break
      }
    }
  }
  if (i > 0) {
    // create logArgs with what we have so far
    logArgs = styles;
    logArgs.unshift(strBuilder.join(''));
  }
  // append the rest
  for (; i < args.length; i++) {
    const arg = args[i];
    if (!(arg instanceof Symbol)) {
      logArgs.push(arg);
    }
  }
  return logArgs
};
/* c8 ignore stop */

/* c8 ignore start */
const computeLoggingArgs = supportsColor
  ? computeBrowserLoggingArgs
  : computeNoColorLoggingArgs;
/* c8 ignore stop */

/**
 * @param {Array<string|Symbol|Object|number>} args
 */
const print = (...args) => {
  console.log(...computeLoggingArgs(args));
  /* c8 ignore next */
  vconsoles.forEach((vc) => vc.print(args));
};

/* c8 ignore start */
/**
 * @param {Array<string|Symbol|Object|number>} args
 */
const warn = (...args) => {
  console.warn(...computeLoggingArgs(args));
  args.unshift(ORANGE);
  vconsoles.forEach((vc) => vc.print(args));
};

const vconsoles = create$4();

/**
 * Utility module to create and manipulate Iterators.
 *
 * @module iterator
 */


/**
 * @template T
 * @param {function():IteratorResult<T>} next
 * @return {IterableIterator<T>}
 */
const createIterator = next => ({
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator] () {
    return this
  },
  // @ts-ignore
  next
});

/**
 * @template T
 * @param {Iterator<T>} iterator
 * @param {function(T):boolean} filter
 */
const iteratorFilter = (iterator, filter) => createIterator(() => {
  let res;
  do {
    res = iterator.next();
  } while (!res.done && !filter(res.value))
  return res
});

/**
 * @template T,M
 * @param {Iterator<T>} iterator
 * @param {function(T):M} fmap
 */
const iteratorMap = (iterator, fmap) => createIterator(() => {
  const { done, value } = iterator.next();
  return { done, value: done ? undefined : fmap(value) }
});

class DeleteItem {
  /**
   * @param {number} clock
   * @param {number} len
   */
  constructor (clock, len) {
    /**
     * @type {number}
     */
    this.clock = clock;
    /**
     * @type {number}
     */
    this.len = len;
  }
}

/**
 * We no longer maintain a DeleteStore. DeleteSet is a temporary object that is created when needed.
 * - When created in a transaction, it must only be accessed after sorting, and merging
 *   - This DeleteSet is send to other clients
 * - We do not create a DeleteSet when we send a sync message. The DeleteSet message is created directly from StructStore
 * - We read a DeleteSet as part of a sync/update message. In this case the DeleteSet is already sorted and merged.
 */
class DeleteSet {
  constructor () {
    /**
     * @type {Map<number,Array<DeleteItem>>}
     */
    this.clients = new Map();
  }
}

/**
 * Iterate over all structs that the DeleteSet gc's.
 *
 * @param {Transaction} transaction
 * @param {DeleteSet} ds
 * @param {function(GC|Item):void} f
 *
 * @function
 */
const iterateDeletedStructs = (transaction, ds, f) =>
  ds.clients.forEach((deletes, clientid) => {
    const structs = /** @type {Array<GC|Item>} */ (transaction.doc.store.clients.get(clientid));
    if (structs != null) {
      const lastStruct = structs[structs.length - 1];
      const clockState = lastStruct.id.clock + lastStruct.length;
      for (let i = 0, del = deletes[i]; i < deletes.length && del.clock < clockState; del = deletes[++i]) {
        iterateStructs(transaction, structs, del.clock, del.len, f);
      }
    }
  });

/**
 * @param {Array<DeleteItem>} dis
 * @param {number} clock
 * @return {number|null}
 *
 * @private
 * @function
 */
const findIndexDS = (dis, clock) => {
  let left = 0;
  let right = dis.length - 1;
  while (left <= right) {
    const midindex = floor((left + right) / 2);
    const mid = dis[midindex];
    const midclock = mid.clock;
    if (midclock <= clock) {
      if (clock < midclock + mid.len) {
        return midindex
      }
      left = midindex + 1;
    } else {
      right = midindex - 1;
    }
  }
  return null
};

/**
 * @param {DeleteSet} ds
 * @param {ID} id
 * @return {boolean}
 *
 * @private
 * @function
 */
const isDeleted = (ds, id) => {
  const dis = ds.clients.get(id.client);
  return dis !== undefined && findIndexDS(dis, id.clock) !== null
};

/**
 * @param {DeleteSet} ds
 *
 * @private
 * @function
 */
const sortAndMergeDeleteSet = ds => {
  ds.clients.forEach(dels => {
    dels.sort((a, b) => a.clock - b.clock);
    // merge items without filtering or splicing the array
    // i is the current pointer
    // j refers to the current insert position for the pointed item
    // try to merge dels[i] into dels[j-1] or set dels[j]=dels[i]
    let i, j;
    for (i = 1, j = 1; i < dels.length; i++) {
      const left = dels[j - 1];
      const right = dels[i];
      if (left.clock + left.len >= right.clock) {
        left.len = max(left.len, right.clock + right.len - left.clock);
      } else {
        if (j < i) {
          dels[j] = right;
        }
        j++;
      }
    }
    dels.length = j;
  });
};

/**
 * @param {DeleteSet} ds
 * @param {number} client
 * @param {number} clock
 * @param {number} length
 *
 * @private
 * @function
 */
const addToDeleteSet = (ds, client, clock, length) => {
  setIfUndefined(ds.clients, client, () => /** @type {Array<DeleteItem>} */ ([])).push(new DeleteItem(clock, length));
};

/**
 * @param {DSEncoderV1 | DSEncoderV2} encoder
 * @param {DeleteSet} ds
 *
 * @private
 * @function
 */
const writeDeleteSet = (encoder, ds) => {
  writeVarUint(encoder.restEncoder, ds.clients.size);

  // Ensure that the delete set is written in a deterministic order
  from(ds.clients.entries())
    .sort((a, b) => b[0] - a[0])
    .forEach(([client, dsitems]) => {
      encoder.resetDsCurVal();
      writeVarUint(encoder.restEncoder, client);
      const len = dsitems.length;
      writeVarUint(encoder.restEncoder, len);
      for (let i = 0; i < len; i++) {
        const item = dsitems[i];
        encoder.writeDsClock(item.clock);
        encoder.writeDsLen(item.len);
      }
    });
};

/**
 * @module Y
 */


const generateNewClientId = uint32;

/**
 * @typedef {Object} DocOpts
 * @property {boolean} [DocOpts.gc=true] Disable garbage collection (default: gc=true)
 * @property {function(Item):boolean} [DocOpts.gcFilter] Will be called before an Item is garbage collected. Return false to keep the Item.
 * @property {string} [DocOpts.guid] Define a globally unique identifier for this document
 * @property {string | null} [DocOpts.collectionid] Associate this document with a collection. This only plays a role if your provider has a concept of collection.
 * @property {any} [DocOpts.meta] Any kind of meta information you want to associate with this document. If this is a subdocument, remote peers will store the meta information as well.
 * @property {boolean} [DocOpts.autoLoad] If a subdocument, automatically load document. If this is a subdocument, remote peers will load the document as well automatically.
 * @property {boolean} [DocOpts.shouldLoad] Whether the document should be synced by the provider now. This is toggled to true when you call ydoc.load()
 */

/**
 * @typedef {Object} DocEvents
 * @property {function(Doc):void} DocEvents.destroy
 * @property {function(Doc):void} DocEvents.load
 * @property {function(boolean, Doc):void} DocEvents.sync
 * @property {function(Uint8Array, any, Doc, Transaction):void} DocEvents.update
 * @property {function(Uint8Array, any, Doc, Transaction):void} DocEvents.updateV2
 * @property {function(Doc):void} DocEvents.beforeAllTransactions
 * @property {function(Transaction, Doc):void} DocEvents.beforeTransaction
 * @property {function(Transaction, Doc):void} DocEvents.beforeObserverCalls
 * @property {function(Transaction, Doc):void} DocEvents.afterTransaction
 * @property {function(Transaction, Doc):void} DocEvents.afterTransactionCleanup
 * @property {function(Doc, Array<Transaction>):void} DocEvents.afterAllTransactions
 * @property {function({ loaded: Set<Doc>, added: Set<Doc>, removed: Set<Doc> }, Doc, Transaction):void} DocEvents.subdocs
 */

/**
 * A Yjs instance handles the state of shared data.
 * @extends ObservableV2<DocEvents>
 */
class Doc extends ObservableV2 {
  /**
   * @param {DocOpts} opts configuration
   */
  constructor ({ guid = uuidv4(), collectionid = null, gc = true, gcFilter = () => true, meta = null, autoLoad = false, shouldLoad = true } = {}) {
    super();
    this.gc = gc;
    this.gcFilter = gcFilter;
    this.clientID = generateNewClientId();
    this.guid = guid;
    this.collectionid = collectionid;
    /**
     * @type {Map<string, AbstractType<YEvent<any>>>}
     */
    this.share = new Map();
    this.store = new StructStore();
    /**
     * @type {Transaction | null}
     */
    this._transaction = null;
    /**
     * @type {Array<Transaction>}
     */
    this._transactionCleanups = [];
    /**
     * @type {Set<Doc>}
     */
    this.subdocs = new Set();
    /**
     * If this document is a subdocument - a document integrated into another document - then _item is defined.
     * @type {Item?}
     */
    this._item = null;
    this.shouldLoad = shouldLoad;
    this.autoLoad = autoLoad;
    this.meta = meta;
    /**
     * This is set to true when the persistence provider loaded the document from the database or when the `sync` event fires.
     * Note that not all providers implement this feature. Provider authors are encouraged to fire the `load` event when the doc content is loaded from the database.
     *
     * @type {boolean}
     */
    this.isLoaded = false;
    /**
     * This is set to true when the connection provider has successfully synced with a backend.
     * Note that when using peer-to-peer providers this event may not provide very useful.
     * Also note that not all providers implement this feature. Provider authors are encouraged to fire
     * the `sync` event when the doc has been synced (with `true` as a parameter) or if connection is
     * lost (with false as a parameter).
     */
    this.isSynced = false;
    this.isDestroyed = false;
    /**
     * Promise that resolves once the document has been loaded from a persistence provider.
     */
    this.whenLoaded = create$2(resolve => {
      this.on('load', () => {
        this.isLoaded = true;
        resolve(this);
      });
    });
    const provideSyncedPromise = () => create$2(resolve => {
      /**
       * @param {boolean} isSynced
       */
      const eventHandler = (isSynced) => {
        if (isSynced === undefined || isSynced === true) {
          this.off('sync', eventHandler);
          resolve();
        }
      };
      this.on('sync', eventHandler);
    });
    this.on('sync', isSynced => {
      if (isSynced === false && this.isSynced) {
        this.whenSynced = provideSyncedPromise();
      }
      this.isSynced = isSynced === undefined || isSynced === true;
      if (this.isSynced && !this.isLoaded) {
        this.emit('load', [this]);
      }
    });
    /**
     * Promise that resolves once the document has been synced with a backend.
     * This promise is recreated when the connection is lost.
     * Note the documentation about the `isSynced` property.
     */
    this.whenSynced = provideSyncedPromise();
  }

  /**
   * Notify the parent document that you request to load data into this subdocument (if it is a subdocument).
   *
   * `load()` might be used in the future to request any provider to load the most current data.
   *
   * It is safe to call `load()` multiple times.
   */
  load () {
    const item = this._item;
    if (item !== null && !this.shouldLoad) {
      transact(/** @type {any} */ (item.parent).doc, transaction => {
        transaction.subdocsLoaded.add(this);
      }, null, true);
    }
    this.shouldLoad = true;
  }

  getSubdocs () {
    return this.subdocs
  }

  getSubdocGuids () {
    return new Set(from(this.subdocs).map(doc => doc.guid))
  }

  /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @template T
   * @param {function(Transaction):T} f The function that should be executed as a transaction
   * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
   * @return T
   *
   * @public
   */
  transact (f, origin = null) {
    return transact(this, f, origin)
  }

  /**
   * Define a shared data type.
   *
   * Multiple calls of `ydoc.get(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `ydoc.get(name, Y.Array) === ydoc.get(name, Y.Array)`
   *
   * After this method is called, the type is also available on `ydoc.share.get(name)`.
   *
   * *Best Practices:*
   * Define all types right after the Y.Doc instance is created and store them in a separate object.
   * Also use the typed methods `getText(name)`, `getArray(name)`, ..
   *
   * @template {typeof AbstractType<any>} Type
   * @example
   *   const ydoc = new Y.Doc(..)
   *   const appState = {
   *     document: ydoc.getText('document')
   *     comments: ydoc.getArray('comments')
   *   }
   *
   * @param {string} name
   * @param {Type} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
   * @return {InstanceType<Type>} The created type. Constructed with TypeConstructor
   *
   * @public
   */
  get (name, TypeConstructor = /** @type {any} */ (AbstractType)) {
    const type = setIfUndefined(this.share, name, () => {
      // @ts-ignore
      const t = new TypeConstructor();
      t._integrate(this, null);
      return t
    });
    const Constr = type.constructor;
    if (TypeConstructor !== AbstractType && Constr !== TypeConstructor) {
      if (Constr === AbstractType) {
        // @ts-ignore
        const t = new TypeConstructor();
        t._map = type._map;
        type._map.forEach(/** @param {Item?} n */ n => {
          for (; n !== null; n = n.left) {
            // @ts-ignore
            n.parent = t;
          }
        });
        t._start = type._start;
        for (let n = t._start; n !== null; n = n.right) {
          n.parent = t;
        }
        t._length = type._length;
        this.share.set(name, t);
        t._integrate(this, null);
        return /** @type {InstanceType<Type>} */ (t)
      } else {
        throw new Error(`Type with the name ${name} has already been defined with a different constructor`)
      }
    }
    return /** @type {InstanceType<Type>} */ (type)
  }

  /**
   * @template T
   * @param {string} [name]
   * @return {YArray<T>}
   *
   * @public
   */
  getArray (name = '') {
    return /** @type {YArray<T>} */ (this.get(name, YArray))
  }

  /**
   * @param {string} [name]
   * @return {YText}
   *
   * @public
   */
  getText (name = '') {
    return this.get(name, YText)
  }

  /**
   * @template T
   * @param {string} [name]
   * @return {YMap<T>}
   *
   * @public
   */
  getMap (name = '') {
    return /** @type {YMap<T>} */ (this.get(name, YMap))
  }

  /**
   * @param {string} [name]
   * @return {YXmlElement}
   *
   * @public
   */
  getXmlElement (name = '') {
    return /** @type {YXmlElement<{[key:string]:string}>} */ (this.get(name, YXmlElement))
  }

  /**
   * @param {string} [name]
   * @return {YXmlFragment}
   *
   * @public
   */
  getXmlFragment (name = '') {
    return this.get(name, YXmlFragment)
  }

  /**
   * Converts the entire document into a js object, recursively traversing each yjs type
   * Doesn't log types that have not been defined (using ydoc.getType(..)).
   *
   * @deprecated Do not use this method and rather call toJSON directly on the shared types.
   *
   * @return {Object<string, any>}
   */
  toJSON () {
    /**
     * @type {Object<string, any>}
     */
    const doc = {};

    this.share.forEach((value, key) => {
      doc[key] = value.toJSON();
    });

    return doc
  }

  /**
   * Emit `destroy` event and unregister all event handlers.
   */
  destroy () {
    this.isDestroyed = true;
    from(this.subdocs).forEach(subdoc => subdoc.destroy());
    const item = this._item;
    if (item !== null) {
      this._item = null;
      const content = /** @type {ContentDoc} */ (item.content);
      content.doc = new Doc({ guid: this.guid, ...content.opts, shouldLoad: false });
      content.doc._item = item;
      transact(/** @type {any} */ (item).parent.doc, transaction => {
        const doc = content.doc;
        if (!item.deleted) {
          transaction.subdocsAdded.add(doc);
        }
        transaction.subdocsRemoved.add(this);
      }, null, true);
    }
    // @ts-ignore
    this.emit('destroyed', [true]); // DEPRECATED!
    this.emit('destroy', [this]);
    super.destroy();
  }
}

class DSEncoderV1 {
  constructor () {
    this.restEncoder = createEncoder();
  }

  toUint8Array () {
    return toUint8Array(this.restEncoder)
  }

  resetDsCurVal () {
    // nop
  }

  /**
   * @param {number} clock
   */
  writeDsClock (clock) {
    writeVarUint(this.restEncoder, clock);
  }

  /**
   * @param {number} len
   */
  writeDsLen (len) {
    writeVarUint(this.restEncoder, len);
  }
}

class UpdateEncoderV1 extends DSEncoderV1 {
  /**
   * @param {ID} id
   */
  writeLeftID (id) {
    writeVarUint(this.restEncoder, id.client);
    writeVarUint(this.restEncoder, id.clock);
  }

  /**
   * @param {ID} id
   */
  writeRightID (id) {
    writeVarUint(this.restEncoder, id.client);
    writeVarUint(this.restEncoder, id.clock);
  }

  /**
   * Use writeClient and writeClock instead of writeID if possible.
   * @param {number} client
   */
  writeClient (client) {
    writeVarUint(this.restEncoder, client);
  }

  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo (info) {
    writeUint8(this.restEncoder, info);
  }

  /**
   * @param {string} s
   */
  writeString (s) {
    writeVarString(this.restEncoder, s);
  }

  /**
   * @param {boolean} isYKey
   */
  writeParentInfo (isYKey) {
    writeVarUint(this.restEncoder, isYKey ? 1 : 0);
  }

  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef (info) {
    writeVarUint(this.restEncoder, info);
  }

  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen (len) {
    writeVarUint(this.restEncoder, len);
  }

  /**
   * @param {any} any
   */
  writeAny (any) {
    writeAny(this.restEncoder, any);
  }

  /**
   * @param {Uint8Array} buf
   */
  writeBuf (buf) {
    writeVarUint8Array(this.restEncoder, buf);
  }

  /**
   * @param {any} embed
   */
  writeJSON (embed) {
    writeVarString(this.restEncoder, JSON.stringify(embed));
  }

  /**
   * @param {string} key
   */
  writeKey (key) {
    writeVarString(this.restEncoder, key);
  }
}

class DSEncoderV2 {
  constructor () {
    this.restEncoder = createEncoder(); // encodes all the rest / non-optimized
    this.dsCurrVal = 0;
  }

  toUint8Array () {
    return toUint8Array(this.restEncoder)
  }

  resetDsCurVal () {
    this.dsCurrVal = 0;
  }

  /**
   * @param {number} clock
   */
  writeDsClock (clock) {
    const diff = clock - this.dsCurrVal;
    this.dsCurrVal = clock;
    writeVarUint(this.restEncoder, diff);
  }

  /**
   * @param {number} len
   */
  writeDsLen (len) {
    if (len === 0) {
      unexpectedCase();
    }
    writeVarUint(this.restEncoder, len - 1);
    this.dsCurrVal += len;
  }
}

class UpdateEncoderV2 extends DSEncoderV2 {
  constructor () {
    super();
    /**
     * @type {Map<string,number>}
     */
    this.keyMap = new Map();
    /**
     * Refers to the next unique key-identifier to me used.
     * See writeKey method for more information.
     *
     * @type {number}
     */
    this.keyClock = 0;
    this.keyClockEncoder = new IntDiffOptRleEncoder();
    this.clientEncoder = new UintOptRleEncoder();
    this.leftClockEncoder = new IntDiffOptRleEncoder();
    this.rightClockEncoder = new IntDiffOptRleEncoder();
    this.infoEncoder = new RleEncoder(writeUint8);
    this.stringEncoder = new StringEncoder();
    this.parentInfoEncoder = new RleEncoder(writeUint8);
    this.typeRefEncoder = new UintOptRleEncoder();
    this.lenEncoder = new UintOptRleEncoder();
  }

  toUint8Array () {
    const encoder = createEncoder();
    writeVarUint(encoder, 0); // this is a feature flag that we might use in the future
    writeVarUint8Array(encoder, this.keyClockEncoder.toUint8Array());
    writeVarUint8Array(encoder, this.clientEncoder.toUint8Array());
    writeVarUint8Array(encoder, this.leftClockEncoder.toUint8Array());
    writeVarUint8Array(encoder, this.rightClockEncoder.toUint8Array());
    writeVarUint8Array(encoder, toUint8Array(this.infoEncoder));
    writeVarUint8Array(encoder, this.stringEncoder.toUint8Array());
    writeVarUint8Array(encoder, toUint8Array(this.parentInfoEncoder));
    writeVarUint8Array(encoder, this.typeRefEncoder.toUint8Array());
    writeVarUint8Array(encoder, this.lenEncoder.toUint8Array());
    // @note The rest encoder is appended! (note the missing var)
    writeUint8Array(encoder, toUint8Array(this.restEncoder));
    return toUint8Array(encoder)
  }

  /**
   * @param {ID} id
   */
  writeLeftID (id) {
    this.clientEncoder.write(id.client);
    this.leftClockEncoder.write(id.clock);
  }

  /**
   * @param {ID} id
   */
  writeRightID (id) {
    this.clientEncoder.write(id.client);
    this.rightClockEncoder.write(id.clock);
  }

  /**
   * @param {number} client
   */
  writeClient (client) {
    this.clientEncoder.write(client);
  }

  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeInfo (info) {
    this.infoEncoder.write(info);
  }

  /**
   * @param {string} s
   */
  writeString (s) {
    this.stringEncoder.write(s);
  }

  /**
   * @param {boolean} isYKey
   */
  writeParentInfo (isYKey) {
    this.parentInfoEncoder.write(isYKey ? 1 : 0);
  }

  /**
   * @param {number} info An unsigned 8-bit integer
   */
  writeTypeRef (info) {
    this.typeRefEncoder.write(info);
  }

  /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */
  writeLen (len) {
    this.lenEncoder.write(len);
  }

  /**
   * @param {any} any
   */
  writeAny (any) {
    writeAny(this.restEncoder, any);
  }

  /**
   * @param {Uint8Array} buf
   */
  writeBuf (buf) {
    writeVarUint8Array(this.restEncoder, buf);
  }

  /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @param {any} embed
   */
  writeJSON (embed) {
    writeAny(this.restEncoder, embed);
  }

  /**
   * Property keys are often reused. For example, in y-prosemirror the key `bold` might
   * occur very often. For a 3d application, the key `position` might occur very often.
   *
   * We cache these keys in a Map and refer to them via a unique number.
   *
   * @param {string} key
   */
  writeKey (key) {
    const clock = this.keyMap.get(key);
    if (clock === undefined) {
      /**
       * @todo uncomment to introduce this feature finally
       *
       * Background. The ContentFormat object was always encoded using writeKey, but the decoder used to use readString.
       * Furthermore, I forgot to set the keyclock. So everything was working fine.
       *
       * However, this feature here is basically useless as it is not being used (it actually only consumes extra memory).
       *
       * I don't know yet how to reintroduce this feature..
       *
       * Older clients won't be able to read updates when we reintroduce this feature. So this should probably be done using a flag.
       *
       */
      // this.keyMap.set(key, this.keyClock)
      this.keyClockEncoder.write(this.keyClock++);
      this.stringEncoder.write(key);
    } else {
      this.keyClockEncoder.write(clock);
    }
  }
}

/**
 * @module encoding
 */
/*
 * We use the first five bits in the info flag for determining the type of the struct.
 *
 * 0: GC
 * 1: Item with Deleted content
 * 2: Item with JSON content
 * 3: Item with Binary content
 * 4: Item with String content
 * 5: Item with Embed content (for richtext content)
 * 6: Item with Format content (a formatting marker for richtext content)
 * 7: Item with Type
 */


/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {Array<GC|Item>} structs All structs by `client`
 * @param {number} client
 * @param {number} clock write structs starting with `ID(client,clock)`
 *
 * @function
 */
const writeStructs = (encoder, structs, client, clock) => {
  // write first id
  clock = max(clock, structs[0].id.clock); // make sure the first id exists
  const startNewStructs = findIndexSS(structs, clock);
  // write # encoded structs
  writeVarUint(encoder.restEncoder, structs.length - startNewStructs);
  encoder.writeClient(client);
  writeVarUint(encoder.restEncoder, clock);
  const firstStruct = structs[startNewStructs];
  // write first struct with an offset
  firstStruct.write(encoder, clock - firstStruct.id.clock);
  for (let i = startNewStructs + 1; i < structs.length; i++) {
    structs[i].write(encoder, 0);
  }
};

/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {StructStore} store
 * @param {Map<number,number>} _sm
 *
 * @private
 * @function
 */
const writeClientsStructs = (encoder, store, _sm) => {
  // we filter all valid _sm entries into sm
  const sm = new Map();
  _sm.forEach((clock, client) => {
    // only write if new structs are available
    if (getState(store, client) > clock) {
      sm.set(client, clock);
    }
  });
  getStateVector(store).forEach((_clock, client) => {
    if (!_sm.has(client)) {
      sm.set(client, 0);
    }
  });
  // write # states that were updated
  writeVarUint(encoder.restEncoder, sm.size);
  // Write items with higher client ids first
  // This heavily improves the conflict algorithm.
  from(sm.entries()).sort((a, b) => b[0] - a[0]).forEach(([client, clock]) => {
    writeStructs(encoder, /** @type {Array<GC|Item>} */ (store.clients.get(client)), client, clock);
  });
};

/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {Transaction} transaction
 *
 * @private
 * @function
 */
const writeStructsFromTransaction = (encoder, transaction) => writeClientsStructs(encoder, transaction.doc.store, transaction.beforeState);

/**
 * General event handler implementation.
 *
 * @template ARG0, ARG1
 *
 * @private
 */
class EventHandler {
  constructor () {
    /**
     * @type {Array<function(ARG0, ARG1):void>}
     */
    this.l = [];
  }
}

/**
 * @template ARG0,ARG1
 * @returns {EventHandler<ARG0,ARG1>}
 *
 * @private
 * @function
 */
const createEventHandler = () => new EventHandler();

/**
 * Adds an event listener that is called when
 * {@link EventHandler#callEventListeners} is called.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {function(ARG0,ARG1):void} f The event handler.
 *
 * @private
 * @function
 */
const addEventHandlerListener = (eventHandler, f) =>
  eventHandler.l.push(f);

/**
 * Removes an event listener.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {function(ARG0,ARG1):void} f The event handler that was added with
 *                     {@link EventHandler#addEventListener}
 *
 * @private
 * @function
 */
const removeEventHandlerListener = (eventHandler, f) => {
  const l = eventHandler.l;
  const len = l.length;
  eventHandler.l = l.filter(g => f !== g);
  if (len === eventHandler.l.length) {
    console.error('[yjs] Tried to remove event handler that doesn\'t exist.');
  }
};

/**
 * Call all event listeners that were added via
 * {@link EventHandler#addEventListener}.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {ARG0} arg0
 * @param {ARG1} arg1
 *
 * @private
 * @function
 */
const callEventHandlerListeners = (eventHandler, arg0, arg1) =>
  callAll(eventHandler.l, [arg0, arg1]);

class ID {
  /**
   * @param {number} client client id
   * @param {number} clock unique per client id, continuous number
   */
  constructor (client, clock) {
    /**
     * Client id
     * @type {number}
     */
    this.client = client;
    /**
     * unique per client id, continuous number
     * @type {number}
     */
    this.clock = clock;
  }
}

/**
 * @param {ID | null} a
 * @param {ID | null} b
 * @return {boolean}
 *
 * @function
 */
const compareIDs = (a, b) => a === b || (a !== null && b !== null && a.client === b.client && a.clock === b.clock);

/**
 * @param {number} client
 * @param {number} clock
 *
 * @private
 * @function
 */
const createID = (client, clock) => new ID(client, clock);

/**
 * The top types are mapped from y.share.get(keyname) => type.
 * `type` does not store any information about the `keyname`.
 * This function finds the correct `keyname` for `type` and throws otherwise.
 *
 * @param {AbstractType<any>} type
 * @return {string}
 *
 * @private
 * @function
 */
const findRootTypeKey = type => {
  // @ts-ignore _y must be defined, otherwise unexpected case
  for (const [key, value] of type.doc.share.entries()) {
    if (value === type) {
      return key
    }
  }
  throw unexpectedCase()
};

/**
 * @param {Item} item
 * @param {Snapshot|undefined} snapshot
 *
 * @protected
 * @function
 */
const isVisible = (item, snapshot) => snapshot === undefined
  ? !item.deleted
  : snapshot.sv.has(item.id.client) && (snapshot.sv.get(item.id.client) || 0) > item.id.clock && !isDeleted(snapshot.ds, item.id);

/**
 * @param {Transaction} transaction
 * @param {Snapshot} snapshot
 */
const splitSnapshotAffectedStructs = (transaction, snapshot) => {
  const meta = setIfUndefined(transaction.meta, splitSnapshotAffectedStructs, create$4);
  const store = transaction.doc.store;
  // check if we already split for this snapshot
  if (!meta.has(snapshot)) {
    snapshot.sv.forEach((clock, client) => {
      if (clock < getState(store, client)) {
        getItemCleanStart(transaction, createID(client, clock));
      }
    });
    iterateDeletedStructs(transaction, snapshot.ds, _item => {});
    meta.add(snapshot);
  }
};

class StructStore {
  constructor () {
    /**
     * @type {Map<number,Array<GC|Item>>}
     */
    this.clients = new Map();
    /**
     * @type {null | { missing: Map<number, number>, update: Uint8Array }}
     */
    this.pendingStructs = null;
    /**
     * @type {null | Uint8Array}
     */
    this.pendingDs = null;
  }
}

/**
 * Return the states as a Map<client,clock>.
 * Note that clock refers to the next expected clock id.
 *
 * @param {StructStore} store
 * @return {Map<number,number>}
 *
 * @public
 * @function
 */
const getStateVector = store => {
  const sm = new Map();
  store.clients.forEach((structs, client) => {
    const struct = structs[structs.length - 1];
    sm.set(client, struct.id.clock + struct.length);
  });
  return sm
};

/**
 * @param {StructStore} store
 * @param {number} client
 * @return {number}
 *
 * @public
 * @function
 */
const getState = (store, client) => {
  const structs = store.clients.get(client);
  if (structs === undefined) {
    return 0
  }
  const lastStruct = structs[structs.length - 1];
  return lastStruct.id.clock + lastStruct.length
};

/**
 * @param {StructStore} store
 * @param {GC|Item} struct
 *
 * @private
 * @function
 */
const addStruct = (store, struct) => {
  let structs = store.clients.get(struct.id.client);
  if (structs === undefined) {
    structs = [];
    store.clients.set(struct.id.client, structs);
  } else {
    const lastStruct = structs[structs.length - 1];
    if (lastStruct.id.clock + lastStruct.length !== struct.id.clock) {
      throw unexpectedCase()
    }
  }
  structs.push(struct);
};

/**
 * Perform a binary search on a sorted array
 * @param {Array<Item|GC>} structs
 * @param {number} clock
 * @return {number}
 *
 * @private
 * @function
 */
const findIndexSS = (structs, clock) => {
  let left = 0;
  let right = structs.length - 1;
  let mid = structs[right];
  let midclock = mid.id.clock;
  if (midclock === clock) {
    return right
  }
  // @todo does it even make sense to pivot the search?
  // If a good split misses, it might actually increase the time to find the correct item.
  // Currently, the only advantage is that search with pivoting might find the item on the first try.
  let midindex = floor((clock / (midclock + mid.length - 1)) * right); // pivoting the search
  while (left <= right) {
    mid = structs[midindex];
    midclock = mid.id.clock;
    if (midclock <= clock) {
      if (clock < midclock + mid.length) {
        return midindex
      }
      left = midindex + 1;
    } else {
      right = midindex - 1;
    }
    midindex = floor((left + right) / 2);
  }
  // Always check state before looking for a struct in StructStore
  // Therefore the case of not finding a struct is unexpected
  throw unexpectedCase()
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {StructStore} store
 * @param {ID} id
 * @return {GC|Item}
 *
 * @private
 * @function
 */
const find = (store, id) => {
  /**
   * @type {Array<GC|Item>}
   */
  // @ts-ignore
  const structs = store.clients.get(id.client);
  return structs[findIndexSS(structs, id.clock)]
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 * @private
 * @function
 */
const getItem = /** @type {function(StructStore,ID):Item} */ (find);

/**
 * @param {Transaction} transaction
 * @param {Array<Item|GC>} structs
 * @param {number} clock
 */
const findIndexCleanStart = (transaction, structs, clock) => {
  const index = findIndexSS(structs, clock);
  const struct = structs[index];
  if (struct.id.clock < clock && struct instanceof Item) {
    structs.splice(index + 1, 0, splitItem(transaction, struct, clock - struct.id.clock));
    return index + 1
  }
  return index
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {Transaction} transaction
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */
const getItemCleanStart = (transaction, id) => {
  const structs = /** @type {Array<Item>} */ (transaction.doc.store.clients.get(id.client));
  return structs[findIndexCleanStart(transaction, structs, id.clock)]
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {Transaction} transaction
 * @param {StructStore} store
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */
const getItemCleanEnd = (transaction, store, id) => {
  /**
   * @type {Array<Item>}
   */
  // @ts-ignore
  const structs = store.clients.get(id.client);
  const index = findIndexSS(structs, id.clock);
  const struct = structs[index];
  if (id.clock !== struct.id.clock + struct.length - 1 && struct.constructor !== GC) {
    structs.splice(index + 1, 0, splitItem(transaction, struct, id.clock - struct.id.clock + 1));
  }
  return struct
};

/**
 * Replace `item` with `newitem` in store
 * @param {StructStore} store
 * @param {GC|Item} struct
 * @param {GC|Item} newStruct
 *
 * @private
 * @function
 */
const replaceStruct = (store, struct, newStruct) => {
  const structs = /** @type {Array<GC|Item>} */ (store.clients.get(struct.id.client));
  structs[findIndexSS(structs, struct.id.clock)] = newStruct;
};

/**
 * Iterate over a range of structs
 *
 * @param {Transaction} transaction
 * @param {Array<Item|GC>} structs
 * @param {number} clockStart Inclusive start
 * @param {number} len
 * @param {function(GC|Item):void} f
 *
 * @function
 */
const iterateStructs = (transaction, structs, clockStart, len, f) => {
  if (len === 0) {
    return
  }
  const clockEnd = clockStart + len;
  let index = findIndexCleanStart(transaction, structs, clockStart);
  let struct;
  do {
    struct = structs[index++];
    if (clockEnd < struct.id.clock + struct.length) {
      findIndexCleanStart(transaction, structs, clockEnd);
    }
    f(struct);
  } while (index < structs.length && structs[index].id.clock < clockEnd)
};

/**
 * A transaction is created for every change on the Yjs model. It is possible
 * to bundle changes on the Yjs model in a single transaction to
 * minimize the number on messages sent and the number of observer calls.
 * If possible the user of this library should bundle as many changes as
 * possible. Here is an example to illustrate the advantages of bundling:
 *
 * @example
 * const ydoc = new Y.Doc()
 * const map = ydoc.getMap('map')
 * // Log content when change is triggered
 * map.observe(() => {
 *   console.log('change triggered')
 * })
 * // Each change on the map type triggers a log message:
 * map.set('a', 0) // => "change triggered"
 * map.set('b', 0) // => "change triggered"
 * // When put in a transaction, it will trigger the log after the transaction:
 * ydoc.transact(() => {
 *   map.set('a', 1)
 *   map.set('b', 1)
 * }) // => "change triggered"
 *
 * @public
 */
class Transaction {
  /**
   * @param {Doc} doc
   * @param {any} origin
   * @param {boolean} local
   */
  constructor (doc, origin, local) {
    /**
     * The Yjs instance.
     * @type {Doc}
     */
    this.doc = doc;
    /**
     * Describes the set of deleted items by ids
     * @type {DeleteSet}
     */
    this.deleteSet = new DeleteSet();
    /**
     * Holds the state before the transaction started.
     * @type {Map<Number,Number>}
     */
    this.beforeState = getStateVector(doc.store);
    /**
     * Holds the state after the transaction.
     * @type {Map<Number,Number>}
     */
    this.afterState = new Map();
    /**
     * All types that were directly modified (property added or child
     * inserted/deleted). New types are not included in this Set.
     * Maps from type to parentSubs (`item.parentSub = null` for YArray)
     * @type {Map<AbstractType<YEvent<any>>,Set<String|null>>}
     */
    this.changed = new Map();
    /**
     * Stores the events for the types that observe also child elements.
     * It is mainly used by `observeDeep`.
     * @type {Map<AbstractType<YEvent<any>>,Array<YEvent<any>>>}
     */
    this.changedParentTypes = new Map();
    /**
     * @type {Array<AbstractStruct>}
     */
    this._mergeStructs = [];
    /**
     * @type {any}
     */
    this.origin = origin;
    /**
     * Stores meta information on the transaction
     * @type {Map<any,any>}
     */
    this.meta = new Map();
    /**
     * Whether this change originates from this doc.
     * @type {boolean}
     */
    this.local = local;
    /**
     * @type {Set<Doc>}
     */
    this.subdocsAdded = new Set();
    /**
     * @type {Set<Doc>}
     */
    this.subdocsRemoved = new Set();
    /**
     * @type {Set<Doc>}
     */
    this.subdocsLoaded = new Set();
    /**
     * @type {boolean}
     */
    this._needFormattingCleanup = false;
  }
}

/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {Transaction} transaction
 * @return {boolean} Whether data was written.
 */
const writeUpdateMessageFromTransaction = (encoder, transaction) => {
  if (transaction.deleteSet.clients.size === 0 && !any(transaction.afterState, (clock, client) => transaction.beforeState.get(client) !== clock)) {
    return false
  }
  sortAndMergeDeleteSet(transaction.deleteSet);
  writeStructsFromTransaction(encoder, transaction);
  writeDeleteSet(encoder, transaction.deleteSet);
  return true
};

/**
 * If `type.parent` was added in current transaction, `type` technically
 * did not change, it was just added and we should not fire events for `type`.
 *
 * @param {Transaction} transaction
 * @param {AbstractType<YEvent<any>>} type
 * @param {string|null} parentSub
 */
const addChangedTypeToTransaction = (transaction, type, parentSub) => {
  const item = type._item;
  if (item === null || (item.id.clock < (transaction.beforeState.get(item.id.client) || 0) && !item.deleted)) {
    setIfUndefined(transaction.changed, type, create$4).add(parentSub);
  }
};

/**
 * @param {Array<AbstractStruct>} structs
 * @param {number} pos
 * @return {number} # of merged structs
 */
const tryToMergeWithLefts = (structs, pos) => {
  let right = structs[pos];
  let left = structs[pos - 1];
  let i = pos;
  for (; i > 0; right = left, left = structs[--i - 1]) {
    if (left.deleted === right.deleted && left.constructor === right.constructor) {
      if (left.mergeWith(right)) {
        if (right instanceof Item && right.parentSub !== null && /** @type {AbstractType<any>} */ (right.parent)._map.get(right.parentSub) === right) {
          /** @type {AbstractType<any>} */ (right.parent)._map.set(right.parentSub, /** @type {Item} */ (left));
        }
        continue
      }
    }
    break
  }
  const merged = pos - i;
  if (merged) {
    // remove all merged structs from the array
    structs.splice(pos + 1 - merged, merged);
  }
  return merged
};

/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 * @param {function(Item):boolean} gcFilter
 */
const tryGcDeleteSet = (ds, store, gcFilter) => {
  for (const [client, deleteItems] of ds.clients.entries()) {
    const structs = /** @type {Array<GC|Item>} */ (store.clients.get(client));
    for (let di = deleteItems.length - 1; di >= 0; di--) {
      const deleteItem = deleteItems[di];
      const endDeleteItemClock = deleteItem.clock + deleteItem.len;
      for (
        let si = findIndexSS(structs, deleteItem.clock), struct = structs[si];
        si < structs.length && struct.id.clock < endDeleteItemClock;
        struct = structs[++si]
      ) {
        const struct = structs[si];
        if (deleteItem.clock + deleteItem.len <= struct.id.clock) {
          break
        }
        if (struct instanceof Item && struct.deleted && !struct.keep && gcFilter(struct)) {
          struct.gc(store, false);
        }
      }
    }
  }
};

/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 */
const tryMergeDeleteSet = (ds, store) => {
  // try to merge deleted / gc'd items
  // merge from right to left for better efficiency and so we don't miss any merge targets
  ds.clients.forEach((deleteItems, client) => {
    const structs = /** @type {Array<GC|Item>} */ (store.clients.get(client));
    for (let di = deleteItems.length - 1; di >= 0; di--) {
      const deleteItem = deleteItems[di];
      // start with merging the item next to the last deleted item
      const mostRightIndexToCheck = min(structs.length - 1, 1 + findIndexSS(structs, deleteItem.clock + deleteItem.len - 1));
      for (
        let si = mostRightIndexToCheck, struct = structs[si];
        si > 0 && struct.id.clock >= deleteItem.clock;
        struct = structs[si]
      ) {
        si -= 1 + tryToMergeWithLefts(structs, si);
      }
    }
  });
};

/**
 * @param {Array<Transaction>} transactionCleanups
 * @param {number} i
 */
const cleanupTransactions = (transactionCleanups, i) => {
  if (i < transactionCleanups.length) {
    const transaction = transactionCleanups[i];
    const doc = transaction.doc;
    const store = doc.store;
    const ds = transaction.deleteSet;
    const mergeStructs = transaction._mergeStructs;
    try {
      sortAndMergeDeleteSet(ds);
      transaction.afterState = getStateVector(transaction.doc.store);
      doc.emit('beforeObserverCalls', [transaction, doc]);
      /**
       * An array of event callbacks.
       *
       * Each callback is called even if the other ones throw errors.
       *
       * @type {Array<function():void>}
       */
      const fs = [];
      // observe events on changed types
      transaction.changed.forEach((subs, itemtype) =>
        fs.push(() => {
          if (itemtype._item === null || !itemtype._item.deleted) {
            itemtype._callObserver(transaction, subs);
          }
        })
      );
      fs.push(() => {
        // deep observe events
        transaction.changedParentTypes.forEach((events, type) => {
          // We need to think about the possibility that the user transforms the
          // Y.Doc in the event.
          if (type._dEH.l.length > 0 && (type._item === null || !type._item.deleted)) {
            events = events
              .filter(event =>
                event.target._item === null || !event.target._item.deleted
              );
            events
              .forEach(event => {
                event.currentTarget = type;
                // path is relative to the current target
                event._path = null;
              });
            // sort events by path length so that top-level events are fired first.
            events
              .sort((event1, event2) => event1.path.length - event2.path.length);
            // We don't need to check for events.length
            // because we know it has at least one element
            callEventHandlerListeners(type._dEH, events, transaction);
          }
        });
      });
      fs.push(() => doc.emit('afterTransaction', [transaction, doc]));
      callAll(fs, []);
      if (transaction._needFormattingCleanup) {
        cleanupYTextAfterTransaction(transaction);
      }
    } finally {
      // Replace deleted items with ItemDeleted / GC.
      // This is where content is actually remove from the Yjs Doc.
      if (doc.gc) {
        tryGcDeleteSet(ds, store, doc.gcFilter);
      }
      tryMergeDeleteSet(ds, store);

      // on all affected store.clients props, try to merge
      transaction.afterState.forEach((clock, client) => {
        const beforeClock = transaction.beforeState.get(client) || 0;
        if (beforeClock !== clock) {
          const structs = /** @type {Array<GC|Item>} */ (store.clients.get(client));
          // we iterate from right to left so we can safely remove entries
          const firstChangePos = max(findIndexSS(structs, beforeClock), 1);
          for (let i = structs.length - 1; i >= firstChangePos;) {
            i -= 1 + tryToMergeWithLefts(structs, i);
          }
        }
      });
      // try to merge mergeStructs
      // @todo: it makes more sense to transform mergeStructs to a DS, sort it, and merge from right to left
      //        but at the moment DS does not handle duplicates
      for (let i = mergeStructs.length - 1; i >= 0; i--) {
        const { client, clock } = mergeStructs[i].id;
        const structs = /** @type {Array<GC|Item>} */ (store.clients.get(client));
        const replacedStructPos = findIndexSS(structs, clock);
        if (replacedStructPos + 1 < structs.length) {
          if (tryToMergeWithLefts(structs, replacedStructPos + 1) > 1) {
            continue // no need to perform next check, both are already merged
          }
        }
        if (replacedStructPos > 0) {
          tryToMergeWithLefts(structs, replacedStructPos);
        }
      }
      if (!transaction.local && transaction.afterState.get(doc.clientID) !== transaction.beforeState.get(doc.clientID)) {
        print(ORANGE, BOLD, '[yjs] ', UNBOLD, RED, 'Changed the client-id because another client seems to be using it.');
        doc.clientID = generateNewClientId();
      }
      // @todo Merge all the transactions into one and provide send the data as a single update message
      doc.emit('afterTransactionCleanup', [transaction, doc]);
      if (doc._observers.has('update')) {
        const encoder = new UpdateEncoderV1();
        const hasContent = writeUpdateMessageFromTransaction(encoder, transaction);
        if (hasContent) {
          doc.emit('update', [encoder.toUint8Array(), transaction.origin, doc, transaction]);
        }
      }
      if (doc._observers.has('updateV2')) {
        const encoder = new UpdateEncoderV2();
        const hasContent = writeUpdateMessageFromTransaction(encoder, transaction);
        if (hasContent) {
          doc.emit('updateV2', [encoder.toUint8Array(), transaction.origin, doc, transaction]);
        }
      }
      const { subdocsAdded, subdocsLoaded, subdocsRemoved } = transaction;
      if (subdocsAdded.size > 0 || subdocsRemoved.size > 0 || subdocsLoaded.size > 0) {
        subdocsAdded.forEach(subdoc => {
          subdoc.clientID = doc.clientID;
          if (subdoc.collectionid == null) {
            subdoc.collectionid = doc.collectionid;
          }
          doc.subdocs.add(subdoc);
        });
        subdocsRemoved.forEach(subdoc => doc.subdocs.delete(subdoc));
        doc.emit('subdocs', [{ loaded: subdocsLoaded, added: subdocsAdded, removed: subdocsRemoved }, doc, transaction]);
        subdocsRemoved.forEach(subdoc => subdoc.destroy());
      }

      if (transactionCleanups.length <= i + 1) {
        doc._transactionCleanups = [];
        doc.emit('afterAllTransactions', [doc, transactionCleanups]);
      } else {
        cleanupTransactions(transactionCleanups, i + 1);
      }
    }
  }
};

/**
 * Implements the functionality of `y.transact(()=>{..})`
 *
 * @template T
 * @param {Doc} doc
 * @param {function(Transaction):T} f
 * @param {any} [origin=true]
 * @return {T}
 *
 * @function
 */
const transact = (doc, f, origin = null, local = true) => {
  const transactionCleanups = doc._transactionCleanups;
  let initialCall = false;
  /**
   * @type {any}
   */
  let result = null;
  if (doc._transaction === null) {
    initialCall = true;
    doc._transaction = new Transaction(doc, origin, local);
    transactionCleanups.push(doc._transaction);
    if (transactionCleanups.length === 1) {
      doc.emit('beforeAllTransactions', [doc]);
    }
    doc.emit('beforeTransaction', [doc._transaction, doc]);
  }
  try {
    result = f(doc._transaction);
  } finally {
    if (initialCall) {
      const finishCleanup = doc._transaction === transactionCleanups[0];
      doc._transaction = null;
      if (finishCleanup) {
        // The first transaction ended, now process observer calls.
        // Observer call may create new transactions for which we need to call the observers and do cleanup.
        // We don't want to nest these calls, so we execute these calls one after
        // another.
        // Also we need to ensure that all cleanups are called, even if the
        // observes throw errors.
        // This file is full of hacky try {} finally {} blocks to ensure that an
        // event can throw errors and also that the cleanup is called.
        cleanupTransactions(transactionCleanups, 0);
      }
    }
  }
  return result
};

const errorComputeChanges = 'You must not compute changes after the event-handler fired.';

/**
 * @template {AbstractType<any>} T
 * YEvent describes the changes on a YType.
 */
class YEvent {
  /**
   * @param {T} target The changed type.
   * @param {Transaction} transaction
   */
  constructor (target, transaction) {
    /**
     * The type on which this event was created on.
     * @type {T}
     */
    this.target = target;
    /**
     * The current target on which the observe callback is called.
     * @type {AbstractType<any>}
     */
    this.currentTarget = target;
    /**
     * The transaction that triggered this event.
     * @type {Transaction}
     */
    this.transaction = transaction;
    /**
     * @type {Object|null}
     */
    this._changes = null;
    /**
     * @type {null | Map<string, { action: 'add' | 'update' | 'delete', oldValue: any, newValue: any }>}
     */
    this._keys = null;
    /**
     * @type {null | Array<{ insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any> }>}
     */
    this._delta = null;
    /**
     * @type {Array<string|number>|null}
     */
    this._path = null;
  }

  /**
   * Computes the path from `y` to the changed type.
   *
   * @todo v14 should standardize on path: Array<{parent, index}> because that is easier to work with.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */
  get path () {
    return this._path || (this._path = getPathTo(this.currentTarget, this.target))
  }

  /**
   * Check if a struct is deleted by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  deletes (struct) {
    return isDeleted(this.transaction.deleteSet, struct.id)
  }

  /**
   * @type {Map<string, { action: 'add' | 'update' | 'delete', oldValue: any, newValue: any }>}
   */
  get keys () {
    if (this._keys === null) {
      if (this.transaction.doc._transactionCleanups.length === 0) {
        throw create$3(errorComputeChanges)
      }
      const keys = new Map();
      const target = this.target;
      const changed = /** @type Set<string|null> */ (this.transaction.changed.get(target));
      changed.forEach(key => {
        if (key !== null) {
          const item = /** @type {Item} */ (target._map.get(key));
          /**
           * @type {'delete' | 'add' | 'update'}
           */
          let action;
          let oldValue;
          if (this.adds(item)) {
            let prev = item.left;
            while (prev !== null && this.adds(prev)) {
              prev = prev.left;
            }
            if (this.deletes(item)) {
              if (prev !== null && this.deletes(prev)) {
                action = 'delete';
                oldValue = last(prev.content.getContent());
              } else {
                return
              }
            } else {
              if (prev !== null && this.deletes(prev)) {
                action = 'update';
                oldValue = last(prev.content.getContent());
              } else {
                action = 'add';
                oldValue = undefined;
              }
            }
          } else {
            if (this.deletes(item)) {
              action = 'delete';
              oldValue = last(/** @type {Item} */ item.content.getContent());
            } else {
              return // nop
            }
          }
          keys.set(key, { action, oldValue });
        }
      });
      this._keys = keys;
    }
    return this._keys
  }

  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {Array<{insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any>}>}
   */
  get delta () {
    return this.changes.delta
  }

  /**
   * Check if a struct is added by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  adds (struct) {
    return struct.id.clock >= (this.transaction.beforeState.get(struct.id.client) || 0)
  }

  /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes () {
    let changes = this._changes;
    if (changes === null) {
      if (this.transaction.doc._transactionCleanups.length === 0) {
        throw create$3(errorComputeChanges)
      }
      const target = this.target;
      const added = create$4();
      const deleted = create$4();
      /**
       * @type {Array<{insert:Array<any>}|{delete:number}|{retain:number}>}
       */
      const delta = [];
      changes = {
        added,
        deleted,
        delta,
        keys: this.keys
      };
      const changed = /** @type Set<string|null> */ (this.transaction.changed.get(target));
      if (changed.has(null)) {
        /**
         * @type {any}
         */
        let lastOp = null;
        const packOp = () => {
          if (lastOp) {
            delta.push(lastOp);
          }
        };
        for (let item = target._start; item !== null; item = item.right) {
          if (item.deleted) {
            if (this.deletes(item) && !this.adds(item)) {
              if (lastOp === null || lastOp.delete === undefined) {
                packOp();
                lastOp = { delete: 0 };
              }
              lastOp.delete += item.length;
              deleted.add(item);
            } // else nop
          } else {
            if (this.adds(item)) {
              if (lastOp === null || lastOp.insert === undefined) {
                packOp();
                lastOp = { insert: [] };
              }
              lastOp.insert = lastOp.insert.concat(item.content.getContent());
              added.add(item);
            } else {
              if (lastOp === null || lastOp.retain === undefined) {
                packOp();
                lastOp = { retain: 0 };
              }
              lastOp.retain += item.length;
            }
          }
        }
        if (lastOp !== null && lastOp.retain === undefined) {
          packOp();
        }
      }
      this._changes = changes;
    }
    return /** @type {any} */ (changes)
  }
}

/**
 * Compute the path from this type to the specified target.
 *
 * @example
 *   // `child` should be accessible via `type.get(path[0]).get(path[1])..`
 *   const path = type.getPathTo(child)
 *   // assuming `type instanceof YArray`
 *   console.log(path) // might look like => [2, 'key1']
 *   child === type.get(path[0]).get(path[1])
 *
 * @param {AbstractType<any>} parent
 * @param {AbstractType<any>} child target
 * @return {Array<string|number>} Path to the target
 *
 * @private
 * @function
 */
const getPathTo = (parent, child) => {
  const path = [];
  while (child._item !== null && child !== parent) {
    if (child._item.parentSub !== null) {
      // parent is map-ish
      path.unshift(child._item.parentSub);
    } else {
      // parent is array-ish
      let i = 0;
      let c = /** @type {AbstractType<any>} */ (child._item.parent)._start;
      while (c !== child._item && c !== null) {
        if (!c.deleted && c.countable) {
          i += c.length;
        }
        c = c.right;
      }
      path.unshift(i);
    }
    child = /** @type {AbstractType<any>} */ (child._item.parent);
  }
  return path
};

/**
 * https://docs.yjs.dev/getting-started/working-with-shared-types#caveats
 */
const warnPrematureAccess = () => { warn('Invalid access: Add Yjs type to a document before reading data.'); };

const maxSearchMarker = 80;

/**
 * A unique timestamp that identifies each marker.
 *
 * Time is relative,.. this is more like an ever-increasing clock.
 *
 * @type {number}
 */
let globalSearchMarkerTimestamp = 0;

class ArraySearchMarker {
  /**
   * @param {Item} p
   * @param {number} index
   */
  constructor (p, index) {
    p.marker = true;
    this.p = p;
    this.index = index;
    this.timestamp = globalSearchMarkerTimestamp++;
  }
}

/**
 * @param {ArraySearchMarker} marker
 */
const refreshMarkerTimestamp = marker => { marker.timestamp = globalSearchMarkerTimestamp++; };

/**
 * This is rather complex so this function is the only thing that should overwrite a marker
 *
 * @param {ArraySearchMarker} marker
 * @param {Item} p
 * @param {number} index
 */
const overwriteMarker = (marker, p, index) => {
  marker.p.marker = false;
  marker.p = p;
  p.marker = true;
  marker.index = index;
  marker.timestamp = globalSearchMarkerTimestamp++;
};

/**
 * @param {Array<ArraySearchMarker>} searchMarker
 * @param {Item} p
 * @param {number} index
 */
const markPosition = (searchMarker, p, index) => {
  if (searchMarker.length >= maxSearchMarker) {
    // override oldest marker (we don't want to create more objects)
    const marker = searchMarker.reduce((a, b) => a.timestamp < b.timestamp ? a : b);
    overwriteMarker(marker, p, index);
    return marker
  } else {
    // create new marker
    const pm = new ArraySearchMarker(p, index);
    searchMarker.push(pm);
    return pm
  }
};

/**
 * Search marker help us to find positions in the associative array faster.
 *
 * They speed up the process of finding a position without much bookkeeping.
 *
 * A maximum of `maxSearchMarker` objects are created.
 *
 * This function always returns a refreshed marker (updated timestamp)
 *
 * @param {AbstractType<any>} yarray
 * @param {number} index
 */
const findMarker = (yarray, index) => {
  if (yarray._start === null || index === 0 || yarray._searchMarker === null) {
    return null
  }
  const marker = yarray._searchMarker.length === 0 ? null : yarray._searchMarker.reduce((a, b) => abs(index - a.index) < abs(index - b.index) ? a : b);
  let p = yarray._start;
  let pindex = 0;
  if (marker !== null) {
    p = marker.p;
    pindex = marker.index;
    refreshMarkerTimestamp(marker); // we used it, we might need to use it again
  }
  // iterate to right if possible
  while (p.right !== null && pindex < index) {
    if (!p.deleted && p.countable) {
      if (index < pindex + p.length) {
        break
      }
      pindex += p.length;
    }
    p = p.right;
  }
  // iterate to left if necessary (might be that pindex > index)
  while (p.left !== null && pindex > index) {
    p = p.left;
    if (!p.deleted && p.countable) {
      pindex -= p.length;
    }
  }
  // we want to make sure that p can't be merged with left, because that would screw up everything
  // in that cas just return what we have (it is most likely the best marker anyway)
  // iterate to left until p can't be merged with left
  while (p.left !== null && p.left.id.client === p.id.client && p.left.id.clock + p.left.length === p.id.clock) {
    p = p.left;
    if (!p.deleted && p.countable) {
      pindex -= p.length;
    }
  }

  // @todo remove!
  // assure position
  // {
  //   let start = yarray._start
  //   let pos = 0
  //   while (start !== p) {
  //     if (!start.deleted && start.countable) {
  //       pos += start.length
  //     }
  //     start = /** @type {Item} */ (start.right)
  //   }
  //   if (pos !== pindex) {
  //     debugger
  //     throw new Error('Gotcha position fail!')
  //   }
  // }
  // if (marker) {
  //   if (window.lengths == null) {
  //     window.lengths = []
  //     window.getLengths = () => window.lengths.sort((a, b) => a - b)
  //   }
  //   window.lengths.push(marker.index - pindex)
  //   console.log('distance', marker.index - pindex, 'len', p && p.parent.length)
  // }
  if (marker !== null && abs(marker.index - pindex) < /** @type {YText|YArray<any>} */ (p.parent).length / maxSearchMarker) {
    // adjust existing marker
    overwriteMarker(marker, p, pindex);
    return marker
  } else {
    // create new marker
    return markPosition(yarray._searchMarker, p, pindex)
  }
};

/**
 * Update markers when a change happened.
 *
 * This should be called before doing a deletion!
 *
 * @param {Array<ArraySearchMarker>} searchMarker
 * @param {number} index
 * @param {number} len If insertion, len is positive. If deletion, len is negative.
 */
const updateMarkerChanges = (searchMarker, index, len) => {
  for (let i = searchMarker.length - 1; i >= 0; i--) {
    const m = searchMarker[i];
    if (len > 0) {
      /**
       * @type {Item|null}
       */
      let p = m.p;
      p.marker = false;
      // Ideally we just want to do a simple position comparison, but this will only work if
      // search markers don't point to deleted items for formats.
      // Iterate marker to prev undeleted countable position so we know what to do when updating a position
      while (p && (p.deleted || !p.countable)) {
        p = p.left;
        if (p && !p.deleted && p.countable) {
          // adjust position. the loop should break now
          m.index -= p.length;
        }
      }
      if (p === null || p.marker === true) {
        // remove search marker if updated position is null or if position is already marked
        searchMarker.splice(i, 1);
        continue
      }
      m.p = p;
      p.marker = true;
    }
    if (index < m.index || (len > 0 && index === m.index)) { // a simple index <= m.index check would actually suffice
      m.index = max(index, m.index + len);
    }
  }
};

/**
 * Call event listeners with an event. This will also add an event to all
 * parents (for `.observeDeep` handlers).
 *
 * @template EventType
 * @param {AbstractType<EventType>} type
 * @param {Transaction} transaction
 * @param {EventType} event
 */
const callTypeObservers = (type, transaction, event) => {
  const changedType = type;
  const changedParentTypes = transaction.changedParentTypes;
  while (true) {
    // @ts-ignore
    setIfUndefined(changedParentTypes, type, () => []).push(event);
    if (type._item === null) {
      break
    }
    type = /** @type {AbstractType<any>} */ (type._item.parent);
  }
  callEventHandlerListeners(changedType._eH, event, transaction);
};

/**
 * @template EventType
 * Abstract Yjs Type class
 */
class AbstractType {
  constructor () {
    /**
     * @type {Item|null}
     */
    this._item = null;
    /**
     * @type {Map<string,Item>}
     */
    this._map = new Map();
    /**
     * @type {Item|null}
     */
    this._start = null;
    /**
     * @type {Doc|null}
     */
    this.doc = null;
    this._length = 0;
    /**
     * Event handlers
     * @type {EventHandler<EventType,Transaction>}
     */
    this._eH = createEventHandler();
    /**
     * Deep event handlers
     * @type {EventHandler<Array<YEvent<any>>,Transaction>}
     */
    this._dEH = createEventHandler();
    /**
     * @type {null | Array<ArraySearchMarker>}
     */
    this._searchMarker = null;
  }

  /**
   * @return {AbstractType<any>|null}
   */
  get parent () {
    return this._item ? /** @type {AbstractType<any>} */ (this._item.parent) : null
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item|null} item
   */
  _integrate (y, item) {
    this.doc = y;
    this._item = item;
  }

  /**
   * @return {AbstractType<EventType>}
   */
  _copy () {
    throw methodUnimplemented()
  }

  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {AbstractType<EventType>}
   */
  clone () {
    throw methodUnimplemented()
  }

  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} _encoder
   */
  _write (_encoder) { }

  /**
   * The first non-deleted item
   */
  get _first () {
    let n = this._start;
    while (n !== null && n.deleted) {
      n = n.right;
    }
    return n
  }

  /**
   * Creates YEvent and calls all type observers.
   * Must be implemented by each type.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} _parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, _parentSubs) {
    if (!transaction.local && this._searchMarker) {
      this._searchMarker.length = 0;
    }
  }

  /**
   * Observe all events that are created on this type.
   *
   * @param {function(EventType, Transaction):void} f Observer function
   */
  observe (f) {
    addEventHandlerListener(this._eH, f);
  }

  /**
   * Observe all events that are created by this type and its children.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  observeDeep (f) {
    addEventHandlerListener(this._dEH, f);
  }

  /**
   * Unregister an observer function.
   *
   * @param {function(EventType,Transaction):void} f Observer function
   */
  unobserve (f) {
    removeEventHandlerListener(this._eH, f);
  }

  /**
   * Unregister an observer function.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */
  unobserveDeep (f) {
    removeEventHandlerListener(this._dEH, f);
  }

  /**
   * @abstract
   * @return {any}
   */
  toJSON () {}
}

/**
 * @param {AbstractType<any>} type
 * @param {number} start
 * @param {number} end
 * @return {Array<any>}
 *
 * @private
 * @function
 */
const typeListSlice = (type, start, end) => {
  type.doc ?? warnPrematureAccess();
  if (start < 0) {
    start = type._length + start;
  }
  if (end < 0) {
    end = type._length + end;
  }
  let len = end - start;
  const cs = [];
  let n = type._start;
  while (n !== null && len > 0) {
    if (n.countable && !n.deleted) {
      const c = n.content.getContent();
      if (c.length <= start) {
        start -= c.length;
      } else {
        for (let i = start; i < c.length && len > 0; i++) {
          cs.push(c[i]);
          len--;
        }
        start = 0;
      }
    }
    n = n.right;
  }
  return cs
};

/**
 * @param {AbstractType<any>} type
 * @return {Array<any>}
 *
 * @private
 * @function
 */
const typeListToArray = type => {
  type.doc ?? warnPrematureAccess();
  const cs = [];
  let n = type._start;
  while (n !== null) {
    if (n.countable && !n.deleted) {
      const c = n.content.getContent();
      for (let i = 0; i < c.length; i++) {
        cs.push(c[i]);
      }
    }
    n = n.right;
  }
  return cs
};

/**
 * Executes a provided function on once on every element of this YArray.
 *
 * @param {AbstractType<any>} type
 * @param {function(any,number,any):void} f A function to execute on every element of this YArray.
 *
 * @private
 * @function
 */
const typeListForEach = (type, f) => {
  let index = 0;
  let n = type._start;
  type.doc ?? warnPrematureAccess();
  while (n !== null) {
    if (n.countable && !n.deleted) {
      const c = n.content.getContent();
      for (let i = 0; i < c.length; i++) {
        f(c[i], index++, type);
      }
    }
    n = n.right;
  }
};

/**
 * @template C,R
 * @param {AbstractType<any>} type
 * @param {function(C,number,AbstractType<any>):R} f
 * @return {Array<R>}
 *
 * @private
 * @function
 */
const typeListMap = (type, f) => {
  /**
   * @type {Array<any>}
   */
  const result = [];
  typeListForEach(type, (c, i) => {
    result.push(f(c, i, type));
  });
  return result
};

/**
 * @param {AbstractType<any>} type
 * @return {IterableIterator<any>}
 *
 * @private
 * @function
 */
const typeListCreateIterator = type => {
  let n = type._start;
  /**
   * @type {Array<any>|null}
   */
  let currentContent = null;
  let currentContentIndex = 0;
  return {
    [Symbol.iterator] () {
      return this
    },
    next: () => {
      // find some content
      if (currentContent === null) {
        while (n !== null && n.deleted) {
          n = n.right;
        }
        // check if we reached the end, no need to check currentContent, because it does not exist
        if (n === null) {
          return {
            done: true,
            value: undefined
          }
        }
        // we found n, so we can set currentContent
        currentContent = n.content.getContent();
        currentContentIndex = 0;
        n = n.right; // we used the content of n, now iterate to next
      }
      const value = currentContent[currentContentIndex++];
      // check if we need to empty currentContent
      if (currentContent.length <= currentContentIndex) {
        currentContent = null;
      }
      return {
        done: false,
        value
      }
    }
  }
};

/**
 * @param {AbstractType<any>} type
 * @param {number} index
 * @return {any}
 *
 * @private
 * @function
 */
const typeListGet = (type, index) => {
  type.doc ?? warnPrematureAccess();
  const marker = findMarker(type, index);
  let n = type._start;
  if (marker !== null) {
    n = marker.p;
    index -= marker.index;
  }
  for (; n !== null; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index < n.length) {
        return n.content.getContent()[index]
      }
      index -= n.length;
    }
  }
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item?} referenceItem
 * @param {Array<Object<string,any>|Array<any>|boolean|number|null|string|Uint8Array>} content
 *
 * @private
 * @function
 */
const typeListInsertGenericsAfter = (transaction, parent, referenceItem, content) => {
  let left = referenceItem;
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  const store = doc.store;
  const right = referenceItem === null ? parent._start : referenceItem.right;
  /**
   * @type {Array<Object|Array<any>|number|null>}
   */
  let jsonContent = [];
  const packJsonContent = () => {
    if (jsonContent.length > 0) {
      left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentAny(jsonContent));
      left.integrate(transaction, 0);
      jsonContent = [];
    }
  };
  content.forEach(c => {
    if (c === null) {
      jsonContent.push(c);
    } else {
      switch (c.constructor) {
        case Number:
        case Object:
        case Boolean:
        case Array:
        case String:
          jsonContent.push(c);
          break
        default:
          packJsonContent();
          switch (c.constructor) {
            case Uint8Array:
            case ArrayBuffer:
              left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentBinary(new Uint8Array(/** @type {Uint8Array} */ (c))));
              left.integrate(transaction, 0);
              break
            case Doc:
              left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentDoc(/** @type {Doc} */ (c)));
              left.integrate(transaction, 0);
              break
            default:
              if (c instanceof AbstractType) {
                left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentType(c));
                left.integrate(transaction, 0);
              } else {
                throw new Error('Unexpected content type in insert operation')
              }
          }
      }
    }
  });
  packJsonContent();
};

const lengthExceeded = () => create$3('Length exceeded!');

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @param {Array<Object<string,any>|Array<any>|number|null|string|Uint8Array>} content
 *
 * @private
 * @function
 */
const typeListInsertGenerics = (transaction, parent, index, content) => {
  if (index > parent._length) {
    throw lengthExceeded()
  }
  if (index === 0) {
    if (parent._searchMarker) {
      updateMarkerChanges(parent._searchMarker, index, content.length);
    }
    return typeListInsertGenericsAfter(transaction, parent, null, content)
  }
  const startIndex = index;
  const marker = findMarker(parent, index);
  let n = parent._start;
  if (marker !== null) {
    n = marker.p;
    index -= marker.index;
    // we need to iterate one to the left so that the algorithm works
    if (index === 0) {
      // @todo refactor this as it actually doesn't consider formats
      n = n.prev; // important! get the left undeleted item so that we can actually decrease index
      index += (n && n.countable && !n.deleted) ? n.length : 0;
    }
  }
  for (; n !== null; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index <= n.length) {
        if (index < n.length) {
          // insert in-between
          getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
        }
        break
      }
      index -= n.length;
    }
  }
  if (parent._searchMarker) {
    updateMarkerChanges(parent._searchMarker, startIndex, content.length);
  }
  return typeListInsertGenericsAfter(transaction, parent, n, content)
};

/**
 * Pushing content is special as we generally want to push after the last item. So we don't have to update
 * the search marker.
 *
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Array<Object<string,any>|Array<any>|number|null|string|Uint8Array>} content
 *
 * @private
 * @function
 */
const typeListPushGenerics = (transaction, parent, content) => {
  // Use the marker with the highest index and iterate to the right.
  const marker = (parent._searchMarker || []).reduce((maxMarker, currMarker) => currMarker.index > maxMarker.index ? currMarker : maxMarker, { index: 0, p: parent._start });
  let n = marker.p;
  if (n) {
    while (n.right) {
      n = n.right;
    }
  }
  return typeListInsertGenericsAfter(transaction, parent, n, content)
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @param {number} length
 *
 * @private
 * @function
 */
const typeListDelete = (transaction, parent, index, length) => {
  if (length === 0) { return }
  const startIndex = index;
  const startLength = length;
  const marker = findMarker(parent, index);
  let n = parent._start;
  if (marker !== null) {
    n = marker.p;
    index -= marker.index;
  }
  // compute the first item to be deleted
  for (; n !== null && index > 0; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index < n.length) {
        getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
      }
      index -= n.length;
    }
  }
  // delete all items until done
  while (length > 0 && n !== null) {
    if (!n.deleted) {
      if (length < n.length) {
        getItemCleanStart(transaction, createID(n.id.client, n.id.clock + length));
      }
      n.delete(transaction);
      length -= n.length;
    }
    n = n.right;
  }
  if (length > 0) {
    throw lengthExceeded()
  }
  if (parent._searchMarker) {
    updateMarkerChanges(parent._searchMarker, startIndex, -startLength + length /* in case we remove the above exception */);
  }
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {string} key
 *
 * @private
 * @function
 */
const typeMapDelete = (transaction, parent, key) => {
  const c = parent._map.get(key);
  if (c !== undefined) {
    c.delete(transaction);
  }
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @param {Object|number|null|Array<any>|string|Uint8Array|AbstractType<any>} value
 *
 * @private
 * @function
 */
const typeMapSet = (transaction, parent, key, value) => {
  const left = parent._map.get(key) || null;
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  let content;
  if (value == null) {
    content = new ContentAny([value]);
  } else {
    switch (value.constructor) {
      case Number:
      case Object:
      case Boolean:
      case Array:
      case String:
      case Date:
      case BigInt:
        content = new ContentAny([value]);
        break
      case Uint8Array:
        content = new ContentBinary(/** @type {Uint8Array} */ (value));
        break
      case Doc:
        content = new ContentDoc(/** @type {Doc} */ (value));
        break
      default:
        if (value instanceof AbstractType) {
          content = new ContentType(value);
        } else {
          throw new Error('Unexpected content type')
        }
    }
  }
  new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, null, null, parent, key, content).integrate(transaction, 0);
};

/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @return {Object<string,any>|number|null|Array<any>|string|Uint8Array|AbstractType<any>|undefined}
 *
 * @private
 * @function
 */
const typeMapGet = (parent, key) => {
  parent.doc ?? warnPrematureAccess();
  const val = parent._map.get(key);
  return val !== undefined && !val.deleted ? val.content.getContent()[val.length - 1] : undefined
};

/**
 * @param {AbstractType<any>} parent
 * @return {Object<string,Object<string,any>|number|null|Array<any>|string|Uint8Array|AbstractType<any>|undefined>}
 *
 * @private
 * @function
 */
const typeMapGetAll = (parent) => {
  /**
   * @type {Object<string,any>}
   */
  const res = {};
  parent.doc ?? warnPrematureAccess();
  parent._map.forEach((value, key) => {
    if (!value.deleted) {
      res[key] = value.content.getContent()[value.length - 1];
    }
  });
  return res
};

/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @return {boolean}
 *
 * @private
 * @function
 */
const typeMapHas = (parent, key) => {
  parent.doc ?? warnPrematureAccess();
  const val = parent._map.get(key);
  return val !== undefined && !val.deleted
};

/**
 * @param {AbstractType<any>} parent
 * @param {Snapshot} snapshot
 * @return {Object<string,Object<string,any>|number|null|Array<any>|string|Uint8Array|AbstractType<any>|undefined>}
 *
 * @private
 * @function
 */
const typeMapGetAllSnapshot = (parent, snapshot) => {
  /**
   * @type {Object<string,any>}
   */
  const res = {};
  parent._map.forEach((value, key) => {
    /**
     * @type {Item|null}
     */
    let v = value;
    while (v !== null && (!snapshot.sv.has(v.id.client) || v.id.clock >= (snapshot.sv.get(v.id.client) || 0))) {
      v = v.left;
    }
    if (v !== null && isVisible(v, snapshot)) {
      res[key] = v.content.getContent()[v.length - 1];
    }
  });
  return res
};

/**
 * @param {AbstractType<any> & { _map: Map<string, Item> }} type
 * @return {IterableIterator<Array<any>>}
 *
 * @private
 * @function
 */
const createMapIterator = type => {
  type.doc ?? warnPrematureAccess();
  return iteratorFilter(type._map.entries(), /** @param {any} entry */ entry => !entry[1].deleted)
};

/**
 * @module YArray
 */


/**
 * Event that describes the changes on a YArray
 * @template T
 * @extends YEvent<YArray<T>>
 */
class YArrayEvent extends YEvent {}

/**
 * A shared Array implementation.
 * @template T
 * @extends AbstractType<YArrayEvent<T>>
 * @implements {Iterable<T>}
 */
class YArray extends AbstractType {
  constructor () {
    super();
    /**
     * @type {Array<any>?}
     * @private
     */
    this._prelimContent = [];
    /**
     * @type {Array<ArraySearchMarker>}
     */
    this._searchMarker = [];
  }

  /**
   * Construct a new YArray containing the specified items.
   * @template {Object<string,any>|Array<any>|number|null|string|Uint8Array} T
   * @param {Array<T>} items
   * @return {YArray<T>}
   */
  static from (items) {
    /**
     * @type {YArray<T>}
     */
    const a = new YArray();
    a.push(items);
    return a
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item);
    this.insert(0, /** @type {Array<any>} */ (this._prelimContent));
    this._prelimContent = null;
  }

  /**
   * @return {YArray<T>}
   */
  _copy () {
    return new YArray()
  }

  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YArray<T>}
   */
  clone () {
    /**
     * @type {YArray<T>}
     */
    const arr = new YArray();
    arr.insert(0, this.toArray().map(el =>
      el instanceof AbstractType ? /** @type {typeof el} */ (el.clone()) : el
    ));
    return arr
  }

  get length () {
    this.doc ?? warnPrematureAccess();
    return this._length
  }

  /**
   * Creates YArrayEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    super._callObserver(transaction, parentSubs);
    callTypeObservers(this, transaction, new YArrayEvent(this, transaction));
  }

  /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(1, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<T>} content The array of content
   */
  insert (index, content) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListInsertGenerics(transaction, this, index, /** @type {any} */ (content));
      });
    } else {
      /** @type {Array<any>} */ (this._prelimContent).splice(index, 0, ...content);
    }
  }

  /**
   * Appends content to this YArray.
   *
   * @param {Array<T>} content Array of content to append.
   *
   * @todo Use the following implementation in all types.
   */
  push (content) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListPushGenerics(transaction, this, /** @type {any} */ (content));
      });
    } else {
      /** @type {Array<any>} */ (this._prelimContent).push(...content);
    }
  }

  /**
   * Prepends content to this YArray.
   *
   * @param {Array<T>} content Array of content to prepend.
   */
  unshift (content) {
    this.insert(0, content);
  }

  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */
  delete (index, length = 1) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListDelete(transaction, this, index, length);
      });
    } else {
      /** @type {Array<any>} */ (this._prelimContent).splice(index, length);
    }
  }

  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {T}
   */
  get (index) {
    return typeListGet(this, index)
  }

  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<T>}
   */
  toArray () {
    return typeListToArray(this)
  }

  /**
   * Returns a portion of this YArray into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<T>}
   */
  slice (start = 0, end = this.length) {
    return typeListSlice(this, start, end)
  }

  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array<any>}
   */
  toJSON () {
    return this.map(c => c instanceof AbstractType ? c.toJSON() : c)
  }

  /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @template M
   * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
   * @return {Array<M>} A new array with each element being the result of the
   *                 callback function
   */
  map (f) {
    return typeListMap(this, /** @type {any} */ (f))
  }

  /**
   * Executes a provided function once on every element of this YArray.
   *
   * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
   */
  forEach (f) {
    typeListForEach(this, f);
  }

  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator] () {
    return typeListCreateIterator(this)
  }

  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write (encoder) {
    encoder.writeTypeRef(YArrayRefID);
  }
}

/**
 * @module YMap
 */


/**
 * @template T
 * @extends YEvent<YMap<T>>
 * Event that describes the changes on a YMap.
 */
class YMapEvent extends YEvent {
  /**
   * @param {YMap<T>} ymap The YArray that changed.
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed.
   */
  constructor (ymap, transaction, subs) {
    super(ymap, transaction);
    this.keysChanged = subs;
  }
}

/**
 * @template MapType
 * A shared Map implementation.
 *
 * @extends AbstractType<YMapEvent<MapType>>
 * @implements {Iterable<[string, MapType]>}
 */
class YMap extends AbstractType {
  /**
   *
   * @param {Iterable<readonly [string, any]>=} entries - an optional iterable to initialize the YMap
   */
  constructor (entries) {
    super();
    /**
     * @type {Map<string,any>?}
     * @private
     */
    this._prelimContent = null;

    if (entries === undefined) {
      this._prelimContent = new Map();
    } else {
      this._prelimContent = new Map(entries);
    }
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item)
    ;/** @type {Map<string, any>} */ (this._prelimContent).forEach((value, key) => {
      this.set(key, value);
    });
    this._prelimContent = null;
  }

  /**
   * @return {YMap<MapType>}
   */
  _copy () {
    return new YMap()
  }

  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YMap<MapType>}
   */
  clone () {
    /**
     * @type {YMap<MapType>}
     */
    const map = new YMap();
    this.forEach((value, key) => {
      map.set(key, value instanceof AbstractType ? /** @type {typeof value} */ (value.clone()) : value);
    });
    return map
  }

  /**
   * Creates YMapEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    callTypeObservers(this, transaction, new YMapEvent(this, transaction, parentSubs));
  }

  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object<string,any>}
   */
  toJSON () {
    this.doc ?? warnPrematureAccess();
    /**
     * @type {Object<string,MapType>}
     */
    const map = {};
    this._map.forEach((item, key) => {
      if (!item.deleted) {
        const v = item.content.getContent()[item.length - 1];
        map[key] = v instanceof AbstractType ? v.toJSON() : v;
      }
    });
    return map
  }

  /**
   * Returns the size of the YMap (count of key/value pairs)
   *
   * @return {number}
   */
  get size () {
    return [...createMapIterator(this)].length
  }

  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */
  keys () {
    return iteratorMap(createMapIterator(this), /** @param {any} v */ v => v[0])
  }

  /**
   * Returns the values for each element in the YMap Type.
   *
   * @return {IterableIterator<MapType>}
   */
  values () {
    return iteratorMap(createMapIterator(this), /** @param {any} v */ v => v[1].content.getContent()[v[1].length - 1])
  }

  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  entries () {
    return iteratorMap(createMapIterator(this), /** @param {any} v */ v => /** @type {any} */ ([v[0], v[1].content.getContent()[v[1].length - 1]]))
  }

  /**
   * Executes a provided function on once on every key-value pair.
   *
   * @param {function(MapType,string,YMap<MapType>):void} f A function to execute on every element of this YArray.
   */
  forEach (f) {
    this.doc ?? warnPrematureAccess();
    this._map.forEach((item, key) => {
      if (!item.deleted) {
        f(item.content.getContent()[item.length - 1], key, this);
      }
    });
  }

  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<[string, MapType]>}
   */
  [Symbol.iterator] () {
    return this.entries()
  }

  /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */
  delete (key) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapDelete(transaction, this, key);
      });
    } else {
      /** @type {Map<string, any>} */ (this._prelimContent).delete(key);
    }
  }

  /**
   * Adds or updates an element with a specified key and value.
   * @template {MapType} VAL
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {VAL} value The value of the element to add
   * @return {VAL}
   */
  set (key, value) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapSet(transaction, this, key, /** @type {any} */ (value));
      });
    } else {
      /** @type {Map<string, any>} */ (this._prelimContent).set(key, value);
    }
    return value
  }

  /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key
   * @return {MapType|undefined}
   */
  get (key) {
    return /** @type {any} */ (typeMapGet(this, key))
  }

  /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @return {boolean}
   */
  has (key) {
    return typeMapHas(this, key)
  }

  /**
   * Removes all elements from this YMap.
   */
  clear () {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        this.forEach(function (_value, key, map) {
          typeMapDelete(transaction, map, key);
        });
      });
    } else {
      /** @type {Map<string, any>} */ (this._prelimContent).clear();
    }
  }

  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write (encoder) {
    encoder.writeTypeRef(YMapRefID);
  }
}

/**
 * @module YText
 */


/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
const equalAttrs = (a, b) => a === b || (typeof a === 'object' && typeof b === 'object' && a && b && equalFlat(a, b));

class ItemTextListPosition {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {number} index
   * @param {Map<string,any>} currentAttributes
   */
  constructor (left, right, index, currentAttributes) {
    this.left = left;
    this.right = right;
    this.index = index;
    this.currentAttributes = currentAttributes;
  }

  /**
   * Only call this if you know that this.right is defined
   */
  forward () {
    if (this.right === null) {
      unexpectedCase();
    }
    switch (this.right.content.constructor) {
      case ContentFormat:
        if (!this.right.deleted) {
          updateCurrentAttributes(this.currentAttributes, /** @type {ContentFormat} */ (this.right.content));
        }
        break
      default:
        if (!this.right.deleted) {
          this.index += this.right.length;
        }
        break
    }
    this.left = this.right;
    this.right = this.right.right;
  }
}

/**
 * @param {Transaction} transaction
 * @param {ItemTextListPosition} pos
 * @param {number} count steps to move forward
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */
const findNextPosition = (transaction, pos, count) => {
  while (pos.right !== null && count > 0) {
    switch (pos.right.content.constructor) {
      case ContentFormat:
        if (!pos.right.deleted) {
          updateCurrentAttributes(pos.currentAttributes, /** @type {ContentFormat} */ (pos.right.content));
        }
        break
      default:
        if (!pos.right.deleted) {
          if (count < pos.right.length) {
            // split right
            getItemCleanStart(transaction, createID(pos.right.id.client, pos.right.id.clock + count));
          }
          pos.index += pos.right.length;
          count -= pos.right.length;
        }
        break
    }
    pos.left = pos.right;
    pos.right = pos.right.right;
    // pos.forward() - we don't forward because that would halve the performance because we already do the checks above
  }
  return pos
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @param {boolean} useSearchMarker
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */
const findPosition = (transaction, parent, index, useSearchMarker) => {
  const currentAttributes = new Map();
  const marker = useSearchMarker ? findMarker(parent, index) : null;
  if (marker) {
    const pos = new ItemTextListPosition(marker.p.left, marker.p, marker.index, currentAttributes);
    return findNextPosition(transaction, pos, index - marker.index)
  } else {
    const pos = new ItemTextListPosition(null, parent._start, 0, currentAttributes);
    return findNextPosition(transaction, pos, index)
  }
};

/**
 * Negate applied formats
 *
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {Map<string,any>} negatedAttributes
 *
 * @private
 * @function
 */
const insertNegatedAttributes = (transaction, parent, currPos, negatedAttributes) => {
  // check if we really need to remove attributes
  while (
    currPos.right !== null && (
      currPos.right.deleted === true || (
        currPos.right.content.constructor === ContentFormat &&
        equalAttrs(negatedAttributes.get(/** @type {ContentFormat} */ (currPos.right.content).key), /** @type {ContentFormat} */ (currPos.right.content).value)
      )
    )
  ) {
    if (!currPos.right.deleted) {
      negatedAttributes.delete(/** @type {ContentFormat} */ (currPos.right.content).key);
    }
    currPos.forward();
  }
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  negatedAttributes.forEach((val, key) => {
    const left = currPos.left;
    const right = currPos.right;
    const nextFormat = new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentFormat(key, val));
    nextFormat.integrate(transaction, 0);
    currPos.right = nextFormat;
    currPos.forward();
  });
};

/**
 * @param {Map<string,any>} currentAttributes
 * @param {ContentFormat} format
 *
 * @private
 * @function
 */
const updateCurrentAttributes = (currentAttributes, format) => {
  const { key, value } = format;
  if (value === null) {
    currentAttributes.delete(key);
  } else {
    currentAttributes.set(key, value);
  }
};

/**
 * @param {ItemTextListPosition} currPos
 * @param {Object<string,any>} attributes
 *
 * @private
 * @function
 */
const minimizeAttributeChanges = (currPos, attributes) => {
  // go right while attributes[right.key] === right.value (or right is deleted)
  while (true) {
    if (currPos.right === null) {
      break
    } else if (currPos.right.deleted || (currPos.right.content.constructor === ContentFormat && equalAttrs(attributes[(/** @type {ContentFormat} */ (currPos.right.content)).key] ?? null, /** @type {ContentFormat} */ (currPos.right.content).value))) ; else {
      break
    }
    currPos.forward();
  }
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {Object<string,any>} attributes
 * @return {Map<string,any>}
 *
 * @private
 * @function
 **/
const insertAttributes = (transaction, parent, currPos, attributes) => {
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  const negatedAttributes = new Map();
  // insert format-start items
  for (const key in attributes) {
    const val = attributes[key];
    const currentVal = currPos.currentAttributes.get(key) ?? null;
    if (!equalAttrs(currentVal, val)) {
      // save negated attribute (set null if currentVal undefined)
      negatedAttributes.set(key, currentVal);
      const { left, right } = currPos;
      currPos.right = new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentFormat(key, val));
      currPos.right.integrate(transaction, 0);
      currPos.forward();
    }
  }
  return negatedAttributes
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {string|object|AbstractType<any>} text
 * @param {Object<string,any>} attributes
 *
 * @private
 * @function
 **/
const insertText = (transaction, parent, currPos, text, attributes) => {
  currPos.currentAttributes.forEach((_val, key) => {
    if (attributes[key] === undefined) {
      attributes[key] = null;
    }
  });
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  minimizeAttributeChanges(currPos, attributes);
  const negatedAttributes = insertAttributes(transaction, parent, currPos, attributes);
  // insert content
  const content = text.constructor === String ? new ContentString(/** @type {string} */ (text)) : (text instanceof AbstractType ? new ContentType(text) : new ContentEmbed(text));
  let { left, right, index } = currPos;
  if (parent._searchMarker) {
    updateMarkerChanges(parent._searchMarker, currPos.index, content.getLength());
  }
  right = new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, content);
  right.integrate(transaction, 0);
  currPos.right = right;
  currPos.index = index;
  currPos.forward();
  insertNegatedAttributes(transaction, parent, currPos, negatedAttributes);
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {number} length
 * @param {Object<string,any>} attributes
 *
 * @private
 * @function
 */
const formatText = (transaction, parent, currPos, length, attributes) => {
  const doc = transaction.doc;
  const ownClientId = doc.clientID;
  minimizeAttributeChanges(currPos, attributes);
  const negatedAttributes = insertAttributes(transaction, parent, currPos, attributes);
  // iterate until first non-format or null is found
  // delete all formats with attributes[format.key] != null
  // also check the attributes after the first non-format as we do not want to insert redundant negated attributes there
  // eslint-disable-next-line no-labels
  iterationLoop: while (
    currPos.right !== null &&
    (length > 0 ||
      (
        negatedAttributes.size > 0 &&
        (currPos.right.deleted || currPos.right.content.constructor === ContentFormat)
      )
    )
  ) {
    if (!currPos.right.deleted) {
      switch (currPos.right.content.constructor) {
        case ContentFormat: {
          const { key, value } = /** @type {ContentFormat} */ (currPos.right.content);
          const attr = attributes[key];
          if (attr !== undefined) {
            if (equalAttrs(attr, value)) {
              negatedAttributes.delete(key);
            } else {
              if (length === 0) {
                // no need to further extend negatedAttributes
                // eslint-disable-next-line no-labels
                break iterationLoop
              }
              negatedAttributes.set(key, value);
            }
            currPos.right.delete(transaction);
          } else {
            currPos.currentAttributes.set(key, value);
          }
          break
        }
        default:
          if (length < currPos.right.length) {
            getItemCleanStart(transaction, createID(currPos.right.id.client, currPos.right.id.clock + length));
          }
          length -= currPos.right.length;
          break
      }
    }
    currPos.forward();
  }
  // Quill just assumes that the editor starts with a newline and that it always
  // ends with a newline. We only insert that newline when a new newline is
  // inserted - i.e when length is bigger than type.length
  if (length > 0) {
    let newlines = '';
    for (; length > 0; length--) {
      newlines += '\n';
    }
    currPos.right = new Item(createID(ownClientId, getState(doc.store, ownClientId)), currPos.left, currPos.left && currPos.left.lastId, currPos.right, currPos.right && currPos.right.id, parent, null, new ContentString(newlines));
    currPos.right.integrate(transaction, 0);
    currPos.forward();
  }
  insertNegatedAttributes(transaction, parent, currPos, negatedAttributes);
};

/**
 * Call this function after string content has been deleted in order to
 * clean up formatting Items.
 *
 * @param {Transaction} transaction
 * @param {Item} start
 * @param {Item|null} curr exclusive end, automatically iterates to the next Content Item
 * @param {Map<string,any>} startAttributes
 * @param {Map<string,any>} currAttributes
 * @return {number} The amount of formatting Items deleted.
 *
 * @function
 */
const cleanupFormattingGap = (transaction, start, curr, startAttributes, currAttributes) => {
  /**
   * @type {Item|null}
   */
  let end = start;
  /**
   * @type {Map<string,ContentFormat>}
   */
  const endFormats = create$5();
  while (end && (!end.countable || end.deleted)) {
    if (!end.deleted && end.content.constructor === ContentFormat) {
      const cf = /** @type {ContentFormat} */ (end.content);
      endFormats.set(cf.key, cf);
    }
    end = end.right;
  }
  let cleanups = 0;
  let reachedCurr = false;
  while (start !== end) {
    if (curr === start) {
      reachedCurr = true;
    }
    if (!start.deleted) {
      const content = start.content;
      switch (content.constructor) {
        case ContentFormat: {
          const { key, value } = /** @type {ContentFormat} */ (content);
          const startAttrValue = startAttributes.get(key) ?? null;
          if (endFormats.get(key) !== content || startAttrValue === value) {
            // Either this format is overwritten or it is not necessary because the attribute already existed.
            start.delete(transaction);
            cleanups++;
            if (!reachedCurr && (currAttributes.get(key) ?? null) === value && startAttrValue !== value) {
              if (startAttrValue === null) {
                currAttributes.delete(key);
              } else {
                currAttributes.set(key, startAttrValue);
              }
            }
          }
          if (!reachedCurr && !start.deleted) {
            updateCurrentAttributes(currAttributes, /** @type {ContentFormat} */ (content));
          }
          break
        }
      }
    }
    start = /** @type {Item} */ (start.right);
  }
  return cleanups
};

/**
 * @param {Transaction} transaction
 * @param {Item | null} item
 */
const cleanupContextlessFormattingGap = (transaction, item) => {
  // iterate until item.right is null or content
  while (item && item.right && (item.right.deleted || !item.right.countable)) {
    item = item.right;
  }
  const attrs = new Set();
  // iterate back until a content item is found
  while (item && (item.deleted || !item.countable)) {
    if (!item.deleted && item.content.constructor === ContentFormat) {
      const key = /** @type {ContentFormat} */ (item.content).key;
      if (attrs.has(key)) {
        item.delete(transaction);
      } else {
        attrs.add(key);
      }
    }
    item = item.left;
  }
};

/**
 * This function is experimental and subject to change / be removed.
 *
 * Ideally, we don't need this function at all. Formatting attributes should be cleaned up
 * automatically after each change. This function iterates twice over the complete YText type
 * and removes unnecessary formatting attributes. This is also helpful for testing.
 *
 * This function won't be exported anymore as soon as there is confidence that the YText type works as intended.
 *
 * @param {YText} type
 * @return {number} How many formatting attributes have been cleaned up.
 */
const cleanupYTextFormatting = type => {
  let res = 0;
  transact(/** @type {Doc} */ (type.doc), transaction => {
    let start = /** @type {Item} */ (type._start);
    let end = type._start;
    let startAttributes = create$5();
    const currentAttributes = copy(startAttributes);
    while (end) {
      if (end.deleted === false) {
        switch (end.content.constructor) {
          case ContentFormat:
            updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (end.content));
            break
          default:
            res += cleanupFormattingGap(transaction, start, end, startAttributes, currentAttributes);
            startAttributes = copy(currentAttributes);
            start = end;
            break
        }
      }
      end = end.right;
    }
  });
  return res
};

/**
 * This will be called by the transaction once the event handlers are called to potentially cleanup
 * formatting attributes.
 *
 * @param {Transaction} transaction
 */
const cleanupYTextAfterTransaction = transaction => {
  /**
   * @type {Set<YText>}
   */
  const needFullCleanup = new Set();
  // check if another formatting item was inserted
  const doc = transaction.doc;
  for (const [client, afterClock] of transaction.afterState.entries()) {
    const clock = transaction.beforeState.get(client) || 0;
    if (afterClock === clock) {
      continue
    }
    iterateStructs(transaction, /** @type {Array<Item|GC>} */ (doc.store.clients.get(client)), clock, afterClock, item => {
      if (
        !item.deleted && /** @type {Item} */ (item).content.constructor === ContentFormat && item.constructor !== GC
      ) {
        needFullCleanup.add(/** @type {any} */ (item).parent);
      }
    });
  }
  // cleanup in a new transaction
  transact(doc, (t) => {
    iterateDeletedStructs(transaction, transaction.deleteSet, item => {
      if (item instanceof GC || !(/** @type {YText} */ (item.parent)._hasFormatting) || needFullCleanup.has(/** @type {YText} */ (item.parent))) {
        return
      }
      const parent = /** @type {YText} */ (item.parent);
      if (item.content.constructor === ContentFormat) {
        needFullCleanup.add(parent);
      } else {
        // If no formatting attribute was inserted or deleted, we can make due with contextless
        // formatting cleanups.
        // Contextless: it is not necessary to compute currentAttributes for the affected position.
        cleanupContextlessFormattingGap(t, item);
      }
    });
    // If a formatting item was inserted, we simply clean the whole type.
    // We need to compute currentAttributes for the current position anyway.
    for (const yText of needFullCleanup) {
      cleanupYTextFormatting(yText);
    }
  });
};

/**
 * @param {Transaction} transaction
 * @param {ItemTextListPosition} currPos
 * @param {number} length
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */
const deleteText = (transaction, currPos, length) => {
  const startLength = length;
  const startAttrs = copy(currPos.currentAttributes);
  const start = currPos.right;
  while (length > 0 && currPos.right !== null) {
    if (currPos.right.deleted === false) {
      switch (currPos.right.content.constructor) {
        case ContentType:
        case ContentEmbed:
        case ContentString:
          if (length < currPos.right.length) {
            getItemCleanStart(transaction, createID(currPos.right.id.client, currPos.right.id.clock + length));
          }
          length -= currPos.right.length;
          currPos.right.delete(transaction);
          break
      }
    }
    currPos.forward();
  }
  if (start) {
    cleanupFormattingGap(transaction, start, currPos.right, startAttrs, currPos.currentAttributes);
  }
  const parent = /** @type {AbstractType<any>} */ (/** @type {Item} */ (currPos.left || currPos.right).parent);
  if (parent._searchMarker) {
    updateMarkerChanges(parent._searchMarker, currPos.index, -startLength + length);
  }
  return currPos
};

/**
 * The Quill Delta format represents changes on a text document with
 * formatting information. For more information visit {@link https://quilljs.com/docs/delta/|Quill Delta}
 *
 * @example
 *   {
 *     ops: [
 *       { insert: 'Gandalf', attributes: { bold: true } },
 *       { insert: ' the ' },
 *       { insert: 'Grey', attributes: { color: '#cccccc' } }
 *     ]
 *   }
 *
 */

/**
  * Attributes that can be assigned to a selection of text.
  *
  * @example
  *   {
  *     bold: true,
  *     font-size: '40px'
  *   }
  *
  * @typedef {Object} TextAttributes
  */

/**
 * @extends YEvent<YText>
 * Event that describes the changes on a YText type.
 */
class YTextEvent extends YEvent {
  /**
   * @param {YText} ytext
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed
   */
  constructor (ytext, transaction, subs) {
    super(ytext, transaction);
    /**
     * Whether the children changed.
     * @type {Boolean}
     * @private
     */
    this.childListChanged = false;
    /**
     * Set of all changed attributes.
     * @type {Set<string>}
     */
    this.keysChanged = new Set();
    subs.forEach((sub) => {
      if (sub === null) {
        this.childListChanged = true;
      } else {
        this.keysChanged.add(sub);
      }
    });
  }

  /**
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */
  get changes () {
    if (this._changes === null) {
      /**
       * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string|AbstractType<any>|object, delete?:number, retain?:number}>}}
       */
      const changes = {
        keys: this.keys,
        delta: this.delta,
        added: new Set(),
        deleted: new Set()
      };
      this._changes = changes;
    }
    return /** @type {any} */ (this._changes)
  }

  /**
   * Compute the changes in the delta format.
   * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
   *
   * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
   *
   * @public
   */
  get delta () {
    if (this._delta === null) {
      const y = /** @type {Doc} */ (this.target.doc);
      /**
       * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
       */
      const delta = [];
      transact(y, transaction => {
        const currentAttributes = new Map(); // saves all current attributes for insert
        const oldAttributes = new Map();
        let item = this.target._start;
        /**
         * @type {string?}
         */
        let action = null;
        /**
         * @type {Object<string,any>}
         */
        const attributes = {}; // counts added or removed new attributes for retain
        /**
         * @type {string|object}
         */
        let insert = '';
        let retain = 0;
        let deleteLen = 0;
        const addOp = () => {
          if (action !== null) {
            /**
             * @type {any}
             */
            let op = null;
            switch (action) {
              case 'delete':
                if (deleteLen > 0) {
                  op = { delete: deleteLen };
                }
                deleteLen = 0;
                break
              case 'insert':
                if (typeof insert === 'object' || insert.length > 0) {
                  op = { insert };
                  if (currentAttributes.size > 0) {
                    op.attributes = {};
                    currentAttributes.forEach((value, key) => {
                      if (value !== null) {
                        op.attributes[key] = value;
                      }
                    });
                  }
                }
                insert = '';
                break
              case 'retain':
                if (retain > 0) {
                  op = { retain };
                  if (!isEmpty(attributes)) {
                    op.attributes = assign({}, attributes);
                  }
                }
                retain = 0;
                break
            }
            if (op) delta.push(op);
            action = null;
          }
        };
        while (item !== null) {
          switch (item.content.constructor) {
            case ContentType:
            case ContentEmbed:
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  addOp();
                  action = 'insert';
                  insert = item.content.getContent()[0];
                  addOp();
                }
              } else if (this.deletes(item)) {
                if (action !== 'delete') {
                  addOp();
                  action = 'delete';
                }
                deleteLen += 1;
              } else if (!item.deleted) {
                if (action !== 'retain') {
                  addOp();
                  action = 'retain';
                }
                retain += 1;
              }
              break
            case ContentString:
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  if (action !== 'insert') {
                    addOp();
                    action = 'insert';
                  }
                  insert += /** @type {ContentString} */ (item.content).str;
                }
              } else if (this.deletes(item)) {
                if (action !== 'delete') {
                  addOp();
                  action = 'delete';
                }
                deleteLen += item.length;
              } else if (!item.deleted) {
                if (action !== 'retain') {
                  addOp();
                  action = 'retain';
                }
                retain += item.length;
              }
              break
            case ContentFormat: {
              const { key, value } = /** @type {ContentFormat} */ (item.content);
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  const curVal = currentAttributes.get(key) ?? null;
                  if (!equalAttrs(curVal, value)) {
                    if (action === 'retain') {
                      addOp();
                    }
                    if (equalAttrs(value, (oldAttributes.get(key) ?? null))) {
                      delete attributes[key];
                    } else {
                      attributes[key] = value;
                    }
                  } else if (value !== null) {
                    item.delete(transaction);
                  }
                }
              } else if (this.deletes(item)) {
                oldAttributes.set(key, value);
                const curVal = currentAttributes.get(key) ?? null;
                if (!equalAttrs(curVal, value)) {
                  if (action === 'retain') {
                    addOp();
                  }
                  attributes[key] = curVal;
                }
              } else if (!item.deleted) {
                oldAttributes.set(key, value);
                const attr = attributes[key];
                if (attr !== undefined) {
                  if (!equalAttrs(attr, value)) {
                    if (action === 'retain') {
                      addOp();
                    }
                    if (value === null) {
                      delete attributes[key];
                    } else {
                      attributes[key] = value;
                    }
                  } else if (attr !== null) { // this will be cleaned up automatically by the contextless cleanup function
                    item.delete(transaction);
                  }
                }
              }
              if (!item.deleted) {
                if (action === 'insert') {
                  addOp();
                }
                updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (item.content));
              }
              break
            }
          }
          item = item.right;
        }
        addOp();
        while (delta.length > 0) {
          const lastOp = delta[delta.length - 1];
          if (lastOp.retain !== undefined && lastOp.attributes === undefined) {
            // retain delta's if they don't assign attributes
            delta.pop();
          } else {
            break
          }
        }
      });
      this._delta = delta;
    }
    return /** @type {any} */ (this._delta)
  }
}

/**
 * Type that represents text with formatting information.
 *
 * This type replaces y-richtext as this implementation is able to handle
 * block formats (format information on a paragraph), embeds (complex elements
 * like pictures and videos), and text formats (**bold**, *italic*).
 *
 * @extends AbstractType<YTextEvent>
 */
class YText extends AbstractType {
  /**
   * @param {String} [string] The initial value of the YText.
   */
  constructor (string) {
    super();
    /**
     * Array of pending operations on this type
     * @type {Array<function():void>?}
     */
    this._pending = string !== undefined ? [() => this.insert(0, string)] : [];
    /**
     * @type {Array<ArraySearchMarker>|null}
     */
    this._searchMarker = [];
    /**
     * Whether this YText contains formatting attributes.
     * This flag is updated when a formatting item is integrated (see ContentFormat.integrate)
     */
    this._hasFormatting = false;
  }

  /**
   * Number of characters of this text type.
   *
   * @type {number}
   */
  get length () {
    this.doc ?? warnPrematureAccess();
    return this._length
  }

  /**
   * @param {Doc} y
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item);
    try {
      /** @type {Array<function>} */ (this._pending).forEach(f => f());
    } catch (e) {
      console.error(e);
    }
    this._pending = null;
  }

  _copy () {
    return new YText()
  }

  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YText}
   */
  clone () {
    const text = new YText();
    text.applyDelta(this.toDelta());
    return text
  }

  /**
   * Creates YTextEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    super._callObserver(transaction, parentSubs);
    const event = new YTextEvent(this, transaction, parentSubs);
    callTypeObservers(this, transaction, event);
    // If a remote change happened, we try to cleanup potential formatting duplicates.
    if (!transaction.local && this._hasFormatting) {
      transaction._needFormattingCleanup = true;
    }
  }

  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */
  toString () {
    this.doc ?? warnPrematureAccess();
    let str = '';
    /**
     * @type {Item|null}
     */
    let n = this._start;
    while (n !== null) {
      if (!n.deleted && n.countable && n.content.constructor === ContentString) {
        str += /** @type {ContentString} */ (n.content).str;
      }
      n = n.right;
    }
    return str
  }

  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @return {string}
   * @public
   */
  toJSON () {
    return this.toString()
  }

  /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {Array<any>} delta The changes to apply on this element.
   * @param {object}  opts
   * @param {boolean} [opts.sanitize] Sanitize input delta. Removes ending newlines if set to true.
   *
   *
   * @public
   */
  applyDelta (delta, { sanitize = true } = {}) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        const currPos = new ItemTextListPosition(null, this._start, 0, new Map());
        for (let i = 0; i < delta.length; i++) {
          const op = delta[i];
          if (op.insert !== undefined) {
            // Quill assumes that the content starts with an empty paragraph.
            // Yjs/Y.Text assumes that it starts empty. We always hide that
            // there is a newline at the end of the content.
            // If we omit this step, clients will see a different number of
            // paragraphs, but nothing bad will happen.
            const ins = (!sanitize && typeof op.insert === 'string' && i === delta.length - 1 && currPos.right === null && op.insert.slice(-1) === '\n') ? op.insert.slice(0, -1) : op.insert;
            if (typeof ins !== 'string' || ins.length > 0) {
              insertText(transaction, this, currPos, ins, op.attributes || {});
            }
          } else if (op.retain !== undefined) {
            formatText(transaction, this, currPos, op.retain, op.attributes || {});
          } else if (op.delete !== undefined) {
            deleteText(transaction, currPos, op.delete);
          }
        }
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.applyDelta(delta));
    }
  }

  /**
   * Returns the Delta representation of this YText type.
   *
   * @param {Snapshot} [snapshot]
   * @param {Snapshot} [prevSnapshot]
   * @param {function('removed' | 'added', ID):any} [computeYChange]
   * @return {any} The Delta representation of this type.
   *
   * @public
   */
  toDelta (snapshot, prevSnapshot, computeYChange) {
    this.doc ?? warnPrematureAccess();
    /**
     * @type{Array<any>}
     */
    const ops = [];
    const currentAttributes = new Map();
    const doc = /** @type {Doc} */ (this.doc);
    let str = '';
    let n = this._start;
    function packStr () {
      if (str.length > 0) {
        // pack str with attributes to ops
        /**
         * @type {Object<string,any>}
         */
        const attributes = {};
        let addAttributes = false;
        currentAttributes.forEach((value, key) => {
          addAttributes = true;
          attributes[key] = value;
        });
        /**
         * @type {Object<string,any>}
         */
        const op = { insert: str };
        if (addAttributes) {
          op.attributes = attributes;
        }
        ops.push(op);
        str = '';
      }
    }
    const computeDelta = () => {
      while (n !== null) {
        if (isVisible(n, snapshot) || (prevSnapshot !== undefined && isVisible(n, prevSnapshot))) {
          switch (n.content.constructor) {
            case ContentString: {
              const cur = currentAttributes.get('ychange');
              if (snapshot !== undefined && !isVisible(n, snapshot)) {
                if (cur === undefined || cur.user !== n.id.client || cur.type !== 'removed') {
                  packStr();
                  currentAttributes.set('ychange', computeYChange ? computeYChange('removed', n.id) : { type: 'removed' });
                }
              } else if (prevSnapshot !== undefined && !isVisible(n, prevSnapshot)) {
                if (cur === undefined || cur.user !== n.id.client || cur.type !== 'added') {
                  packStr();
                  currentAttributes.set('ychange', computeYChange ? computeYChange('added', n.id) : { type: 'added' });
                }
              } else if (cur !== undefined) {
                packStr();
                currentAttributes.delete('ychange');
              }
              str += /** @type {ContentString} */ (n.content).str;
              break
            }
            case ContentType:
            case ContentEmbed: {
              packStr();
              /**
               * @type {Object<string,any>}
               */
              const op = {
                insert: n.content.getContent()[0]
              };
              if (currentAttributes.size > 0) {
                const attrs = /** @type {Object<string,any>} */ ({});
                op.attributes = attrs;
                currentAttributes.forEach((value, key) => {
                  attrs[key] = value;
                });
              }
              ops.push(op);
              break
            }
            case ContentFormat:
              if (isVisible(n, snapshot)) {
                packStr();
                updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (n.content));
              }
              break
          }
        }
        n = n.right;
      }
      packStr();
    };
    if (snapshot || prevSnapshot) {
      // snapshots are merged again after the transaction, so we need to keep the
      // transaction alive until we are done
      transact(doc, transaction => {
        if (snapshot) {
          splitSnapshotAffectedStructs(transaction, snapshot);
        }
        if (prevSnapshot) {
          splitSnapshotAffectedStructs(transaction, prevSnapshot);
        }
        computeDelta();
      }, 'cleanup');
    } else {
      computeDelta();
    }
    return ops
  }

  /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} [attributes] Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */
  insert (index, text, attributes) {
    if (text.length <= 0) {
      return
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        const pos = findPosition(transaction, this, index, !attributes);
        if (!attributes) {
          attributes = {};
          // @ts-ignore
          pos.currentAttributes.forEach((v, k) => { attributes[k] = v; });
        }
        insertText(transaction, this, pos, text, attributes);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.insert(index, text, attributes));
    }
  }

  /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object | AbstractType<any>} embed The Object that represents the embed.
   * @param {TextAttributes} [attributes] Attribute information to apply on the
   *                                    embed
   *
   * @public
   */
  insertEmbed (index, embed, attributes) {
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        const pos = findPosition(transaction, this, index, !attributes);
        insertText(transaction, this, pos, embed, attributes || {});
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.insertEmbed(index, embed, attributes || {}));
    }
  }

  /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */
  delete (index, length) {
    if (length === 0) {
      return
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        deleteText(transaction, findPosition(transaction, this, index, true), length);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.delete(index, length));
    }
  }

  /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */
  format (index, length, attributes) {
    if (length === 0) {
      return
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        const pos = findPosition(transaction, this, index, false);
        if (pos.right === null) {
          return
        }
        formatText(transaction, this, pos, length, attributes);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.format(index, length, attributes));
    }
  }

  /**
   * Removes an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute (attributeName) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapDelete(transaction, this, attributeName);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.removeAttribute(attributeName));
    }
  }

  /**
   * Sets or updates an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {any} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute (attributeName, attributeValue) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapSet(transaction, this, attributeName, attributeValue);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.setAttribute(attributeName, attributeValue));
    }
  }

  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {any} The queried attribute value.
   *
   * @public
   */
  getAttribute (attributeName) {
    return /** @type {any} */ (typeMapGet(this, attributeName))
  }

  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes () {
    return typeMapGetAll(this)
  }

  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */
  _write (encoder) {
    encoder.writeTypeRef(YTextRefID);
  }
}

/**
 * @module YXml
 */


/**
 * Define the elements to which a set of CSS queries apply.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors|CSS_Selectors}
 *
 * @example
 *   query = '.classSelector'
 *   query = 'nodeSelector'
 *   query = '#idSelector'
 *
 * @typedef {string} CSS_Selector
 */

/**
 * Dom filter function.
 *
 * @callback domFilter
 * @param {string} nodeName The nodeName of the element
 * @param {Map} attributes The map of attributes.
 * @return {boolean} Whether to include the Dom node in the YXmlElement.
 */

/**
 * Represents a subset of the nodes of a YXmlElement / YXmlFragment and a
 * position within them.
 *
 * Can be created with {@link YXmlFragment#createTreeWalker}
 *
 * @public
 * @implements {Iterable<YXmlElement|YXmlText|YXmlElement|YXmlHook>}
 */
class YXmlTreeWalker {
  /**
   * @param {YXmlFragment | YXmlElement} root
   * @param {function(AbstractType<any>):boolean} [f]
   */
  constructor (root, f = () => true) {
    this._filter = f;
    this._root = root;
    /**
     * @type {Item}
     */
    this._currentNode = /** @type {Item} */ (root._start);
    this._firstCall = true;
    root.doc ?? warnPrematureAccess();
  }

  [Symbol.iterator] () {
    return this
  }

  /**
   * Get the next node.
   *
   * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
   *
   * @public
   */
  next () {
    /**
     * @type {Item|null}
     */
    let n = this._currentNode;
    let type = n && n.content && /** @type {any} */ (n.content).type;
    if (n !== null && (!this._firstCall || n.deleted || !this._filter(type))) { // if first call, we check if we can use the first item
      do {
        type = /** @type {any} */ (n.content).type;
        if (!n.deleted && (type.constructor === YXmlElement || type.constructor === YXmlFragment) && type._start !== null) {
          // walk down in the tree
          n = type._start;
        } else {
          // walk right or up in the tree
          while (n !== null) {
            /**
             * @type {Item | null}
             */
            const nxt = n.next;
            if (nxt !== null) {
              n = nxt;
              break
            } else if (n.parent === this._root) {
              n = null;
            } else {
              n = /** @type {AbstractType<any>} */ (n.parent)._item;
            }
          }
        }
      } while (n !== null && (n.deleted || !this._filter(/** @type {ContentType} */ (n.content).type)))
    }
    this._firstCall = false;
    if (n === null) {
      // @ts-ignore
      return { value: undefined, done: true }
    }
    this._currentNode = n;
    return { value: /** @type {any} */ (n.content).type, done: false }
  }
}

/**
 * Represents a list of {@link YXmlElement}.and {@link YXmlText} types.
 * A YxmlFragment is similar to a {@link YXmlElement}, but it does not have a
 * nodeName and it does not have attributes. Though it can be bound to a DOM
 * element - in this case the attributes and the nodeName are not shared.
 *
 * @public
 * @extends AbstractType<YXmlEvent>
 */
class YXmlFragment extends AbstractType {
  constructor () {
    super();
    /**
     * @type {Array<any>|null}
     */
    this._prelimContent = [];
  }

  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get firstChild () {
    const first = this._first;
    return first ? first.content.getContent()[0] : null
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item);
    this.insert(0, /** @type {Array<any>} */ (this._prelimContent));
    this._prelimContent = null;
  }

  _copy () {
    return new YXmlFragment()
  }

  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlFragment}
   */
  clone () {
    const el = new YXmlFragment();
    // @ts-ignore
    el.insert(0, this.toArray().map(item => item instanceof AbstractType ? item.clone() : item));
    return el
  }

  get length () {
    this.doc ?? warnPrematureAccess();
    return this._prelimContent === null ? this._length : this._prelimContent.length
  }

  /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */
  createTreeWalker (filter) {
    return new YXmlTreeWalker(this, filter)
  }

  /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
   *
   * @public
   */
  querySelector (query) {
    query = query.toUpperCase();
    // @ts-ignore
    const iterator = new YXmlTreeWalker(this, element => element.nodeName && element.nodeName.toUpperCase() === query);
    const next = iterator.next();
    if (next.done) {
      return null
    } else {
      return next.value
    }
  }

  /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * @todo Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
   *
   * @public
   */
  querySelectorAll (query) {
    query = query.toUpperCase();
    // @ts-ignore
    return from(new YXmlTreeWalker(this, element => element.nodeName && element.nodeName.toUpperCase() === query))
  }

  /**
   * Creates YXmlEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    callTypeObservers(this, transaction, new YXmlEvent(this, parentSubs, transaction));
  }

  /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */
  toString () {
    return typeListMap(this, xml => xml.toString()).join('')
  }

  /**
   * @return {string}
   */
  toJSON () {
    return this.toString()
  }

  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM (_document = document, hooks = {}, binding) {
    const fragment = _document.createDocumentFragment();
    if (binding !== undefined) {
      binding._createAssociation(fragment, this);
    }
    typeListForEach(this, xmlType => {
      fragment.insertBefore(xmlType.toDOM(_document, hooks, binding), null);
    });
    return fragment
  }

  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {number} index The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insert (index, content) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListInsertGenerics(transaction, this, index, content);
      });
    } else {
      // @ts-ignore _prelimContent is defined because this is not yet integrated
      this._prelimContent.splice(index, 0, ...content);
    }
  }

  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {null|Item|YXmlElement|YXmlText} ref The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insertAfter (ref, content) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        const refItem = (ref && ref instanceof AbstractType) ? ref._item : ref;
        typeListInsertGenericsAfter(transaction, this, refItem, content);
      });
    } else {
      const pc = /** @type {Array<any>} */ (this._prelimContent);
      const index = ref === null ? 0 : pc.findIndex(el => el === ref) + 1;
      if (index === 0 && ref !== null) {
        throw create$3('Reference item not found')
      }
      pc.splice(index, 0, ...content);
    }
  }

  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} [length=1] The number of elements to remove. Defaults to 1.
   */
  delete (index, length = 1) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListDelete(transaction, this, index, length);
      });
    } else {
      // @ts-ignore _prelimContent is defined because this is not yet integrated
      this._prelimContent.splice(index, length);
    }
  }

  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<YXmlElement|YXmlText|YXmlHook>}
   */
  toArray () {
    return typeListToArray(this)
  }

  /**
   * Appends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to append.
   */
  push (content) {
    this.insert(this.length, content);
  }

  /**
   * Prepends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to prepend.
   */
  unshift (content) {
    this.insert(0, content);
  }

  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {YXmlElement|YXmlText}
   */
  get (index) {
    return typeListGet(this, index)
  }

  /**
   * Returns a portion of this YXmlFragment into a JavaScript Array selected
   * from start to end (end not included).
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<YXmlElement|YXmlText>}
   */
  slice (start = 0, end = this.length) {
    return typeListSlice(this, start, end)
  }

  /**
   * Executes a provided function on once on every child element.
   *
   * @param {function(YXmlElement|YXmlText,number, typeof self):void} f A function to execute on every element of this YArray.
   */
  forEach (f) {
    typeListForEach(this, f);
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write (encoder) {
    encoder.writeTypeRef(YXmlFragmentRefID);
  }
}

/**
 * @typedef {Object|number|null|Array<any>|string|Uint8Array|AbstractType<any>} ValueTypes
 */

/**
 * An YXmlElement imitates the behavior of a
 * https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element
 *
 * * An YXmlElement has attributes (key value pairs)
 * * An YXmlElement has childElements that must inherit from YXmlElement
 *
 * @template {{ [key: string]: ValueTypes }} [KV={ [key: string]: string }]
 */
class YXmlElement extends YXmlFragment {
  constructor (nodeName = 'UNDEFINED') {
    super();
    this.nodeName = nodeName;
    /**
     * @type {Map<string, any>|null}
     */
    this._prelimAttrs = new Map();
  }

  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get nextSibling () {
    const n = this._item ? this._item.next : null;
    return n ? /** @type {YXmlElement|YXmlText} */ (/** @type {ContentType} */ (n.content).type) : null
  }

  /**
   * @type {YXmlElement|YXmlText|null}
   */
  get prevSibling () {
    const n = this._item ? this._item.prev : null;
    return n ? /** @type {YXmlElement|YXmlText} */ (/** @type {ContentType} */ (n.content).type) : null
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item)
    ;(/** @type {Map<string, any>} */ (this._prelimAttrs)).forEach((value, key) => {
      this.setAttribute(key, value);
    });
    this._prelimAttrs = null;
  }

  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @return {YXmlElement}
   */
  _copy () {
    return new YXmlElement(this.nodeName)
  }

  /**
   * Makes a copy of this data type that can be included somewhere else.
   *
   * Note that the content is only readable _after_ it has been included somewhere in the Ydoc.
   *
   * @return {YXmlElement<KV>}
   */
  clone () {
    /**
     * @type {YXmlElement<KV>}
     */
    const el = new YXmlElement(this.nodeName);
    const attrs = this.getAttributes();
    forEach(attrs, (value, key) => {
      if (typeof value === 'string') {
        el.setAttribute(key, value);
      }
    });
    // @ts-ignore
    el.insert(0, this.toArray().map(item => item instanceof AbstractType ? item.clone() : item));
    return el
  }

  /**
   * Returns the XML serialization of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {string} The string representation of this type.
   *
   * @public
   */
  toString () {
    const attrs = this.getAttributes();
    const stringBuilder = [];
    const keys = [];
    for (const key in attrs) {
      keys.push(key);
    }
    keys.sort();
    const keysLen = keys.length;
    for (let i = 0; i < keysLen; i++) {
      const key = keys[i];
      stringBuilder.push(key + '="' + attrs[key] + '"');
    }
    const nodeName = this.nodeName.toLocaleLowerCase();
    const attrsString = stringBuilder.length > 0 ? ' ' + stringBuilder.join(' ') : '';
    return `<${nodeName}${attrsString}>${super.toString()}</${nodeName}>`
  }

  /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {string} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute (attributeName) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapDelete(transaction, this, attributeName);
      });
    } else {
      /** @type {Map<string,any>} */ (this._prelimAttrs).delete(attributeName);
    }
  }

  /**
   * Sets or updates an attribute.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that is to be set.
   * @param {KV[KEY]} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute (attributeName, attributeValue) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapSet(transaction, this, attributeName, attributeValue);
      });
    } else {
      /** @type {Map<string, any>} */ (this._prelimAttrs).set(attributeName, attributeValue);
    }
  }

  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {KV[KEY]|undefined} The queried attribute value.
   *
   * @public
   */
  getAttribute (attributeName) {
    return /** @type {any} */ (typeMapGet(this, attributeName))
  }

  /**
   * Returns whether an attribute exists
   *
   * @param {string} attributeName The attribute name to check for existence.
   * @return {boolean} whether the attribute exists.
   *
   * @public
   */
  hasAttribute (attributeName) {
    return /** @type {any} */ (typeMapHas(this, attributeName))
  }

  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @param {Snapshot} [snapshot]
   * @return {{ [Key in Extract<keyof KV,string>]?: KV[Key]}} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes (snapshot) {
    return /** @type {any} */ (snapshot ? typeMapGetAllSnapshot(this, snapshot) : typeMapGetAll(this))
  }

  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM (_document = document, hooks = {}, binding) {
    const dom = _document.createElement(this.nodeName);
    const attrs = this.getAttributes();
    for (const key in attrs) {
      const value = attrs[key];
      if (typeof value === 'string') {
        dom.setAttribute(key, value);
      }
    }
    typeListForEach(this, yxml => {
      dom.appendChild(yxml.toDOM(_document, hooks, binding));
    });
    if (binding !== undefined) {
      binding._createAssociation(dom, this);
    }
    return dom
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */
  _write (encoder) {
    encoder.writeTypeRef(YXmlElementRefID);
    encoder.writeKey(this.nodeName);
  }
}

/**
 * @extends YEvent<YXmlElement|YXmlText|YXmlFragment>
 * An Event that describes changes on a YXml Element or Yxml Fragment
 */
class YXmlEvent extends YEvent {
  /**
   * @param {YXmlElement|YXmlText|YXmlFragment} target The target on which the event is created.
   * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Transaction} transaction The transaction instance with which the
   *                                  change was created.
   */
  constructor (target, subs, transaction) {
    super(target, transaction);
    /**
     * Whether the children changed.
     * @type {Boolean}
     * @private
     */
    this.childListChanged = false;
    /**
     * Set of all changed attributes.
     * @type {Set<string>}
     */
    this.attributesChanged = new Set();
    subs.forEach((sub) => {
      if (sub === null) {
        this.childListChanged = true;
      } else {
        this.attributesChanged.add(sub);
      }
    });
  }
}

class AbstractStruct {
  /**
   * @param {ID} id
   * @param {number} length
   */
  constructor (id, length) {
    this.id = id;
    this.length = length;
  }

  /**
   * @type {boolean}
   */
  get deleted () {
    throw methodUnimplemented()
  }

  /**
   * Merge this struct with the item to the right.
   * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
   * Also this method does *not* remove right from StructStore!
   * @param {AbstractStruct} right
   * @return {boolean} whether this merged with right
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   * @param {number} encodingRef
   */
  write (encoder, offset, encodingRef) {
    throw methodUnimplemented()
  }

  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate (transaction, offset) {
    throw methodUnimplemented()
  }
}

const structGCRefNumber = 0;

/**
 * @private
 */
class GC extends AbstractStruct {
  get deleted () {
    return true
  }

  delete () {}

  /**
   * @param {GC} right
   * @return {boolean}
   */
  mergeWith (right) {
    if (this.constructor !== right.constructor) {
      return false
    }
    this.length += right.length;
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate (transaction, offset) {
    if (offset > 0) {
      this.id.clock += offset;
      this.length -= offset;
    }
    addStruct(transaction.doc.store, this);
  }

  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    encoder.writeInfo(structGCRefNumber);
    encoder.writeLen(this.length - offset);
  }

  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing (transaction, store) {
    return null
  }
}

class ContentBinary {
  /**
   * @param {Uint8Array} content
   */
  constructor (content) {
    this.content = content;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return [this.content]
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentBinary}
   */
  copy () {
    return new ContentBinary(this.content)
  }

  /**
   * @param {number} offset
   * @return {ContentBinary}
   */
  splice (offset) {
    throw methodUnimplemented()
  }

  /**
   * @param {ContentBinary} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    encoder.writeBuf(this.content);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 3
  }
}

class ContentDeleted {
  /**
   * @param {number} len
   */
  constructor (len) {
    this.len = len;
  }

  /**
   * @return {number}
   */
  getLength () {
    return this.len
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return []
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return false
  }

  /**
   * @return {ContentDeleted}
   */
  copy () {
    return new ContentDeleted(this.len)
  }

  /**
   * @param {number} offset
   * @return {ContentDeleted}
   */
  splice (offset) {
    const right = new ContentDeleted(this.len - offset);
    this.len = offset;
    return right
  }

  /**
   * @param {ContentDeleted} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.len += right.len;
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {
    addToDeleteSet(transaction.deleteSet, item.id.client, item.id.clock, this.len);
    item.markDeleted();
  }

  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    encoder.writeLen(this.len - offset);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 1
  }
}

/**
 * @param {string} guid
 * @param {Object<string, any>} opts
 */
const createDocFromOpts = (guid, opts) => new Doc({ guid, ...opts, shouldLoad: opts.shouldLoad || opts.autoLoad || false });

/**
 * @private
 */
class ContentDoc {
  /**
   * @param {Doc} doc
   */
  constructor (doc) {
    if (doc._item) {
      console.error('This document was already integrated as a sub-document. You should create a second instance instead with the same guid.');
    }
    /**
     * @type {Doc}
     */
    this.doc = doc;
    /**
     * @type {any}
     */
    const opts = {};
    this.opts = opts;
    if (!doc.gc) {
      opts.gc = false;
    }
    if (doc.autoLoad) {
      opts.autoLoad = true;
    }
    if (doc.meta !== null) {
      opts.meta = doc.meta;
    }
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return [this.doc]
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentDoc}
   */
  copy () {
    return new ContentDoc(createDocFromOpts(this.doc.guid, this.opts))
  }

  /**
   * @param {number} offset
   * @return {ContentDoc}
   */
  splice (offset) {
    throw methodUnimplemented()
  }

  /**
   * @param {ContentDoc} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {
    // this needs to be reflected in doc.destroy as well
    this.doc._item = item;
    transaction.subdocsAdded.add(this.doc);
    if (this.doc.shouldLoad) {
      transaction.subdocsLoaded.add(this.doc);
    }
  }

  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {
    if (transaction.subdocsAdded.has(this.doc)) {
      transaction.subdocsAdded.delete(this.doc);
    } else {
      transaction.subdocsRemoved.add(this.doc);
    }
  }

  /**
   * @param {StructStore} store
   */
  gc (store) { }

  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    encoder.writeString(this.doc.guid);
    encoder.writeAny(this.opts);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 9
  }
}

/**
 * @private
 */
class ContentEmbed {
  /**
   * @param {Object} embed
   */
  constructor (embed) {
    this.embed = embed;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return [this.embed]
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentEmbed}
   */
  copy () {
    return new ContentEmbed(this.embed)
  }

  /**
   * @param {number} offset
   * @return {ContentEmbed}
   */
  splice (offset) {
    throw methodUnimplemented()
  }

  /**
   * @param {ContentEmbed} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    encoder.writeJSON(this.embed);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 5
  }
}

/**
 * @private
 */
class ContentFormat {
  /**
   * @param {string} key
   * @param {Object} value
   */
  constructor (key, value) {
    this.key = key;
    this.value = value;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return []
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return false
  }

  /**
   * @return {ContentFormat}
   */
  copy () {
    return new ContentFormat(this.key, this.value)
  }

  /**
   * @param {number} _offset
   * @return {ContentFormat}
   */
  splice (_offset) {
    throw methodUnimplemented()
  }

  /**
   * @param {ContentFormat} _right
   * @return {boolean}
   */
  mergeWith (_right) {
    return false
  }

  /**
   * @param {Transaction} _transaction
   * @param {Item} item
   */
  integrate (_transaction, item) {
    // @todo searchmarker are currently unsupported for rich text documents
    const p = /** @type {YText} */ (item.parent);
    p._searchMarker = null;
    p._hasFormatting = true;
  }

  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    encoder.writeKey(this.key);
    encoder.writeJSON(this.value);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 6
  }
}

const isDevMode = getVariable('node_env') === 'development';

class ContentAny {
  /**
   * @param {Array<any>} arr
   */
  constructor (arr) {
    /**
     * @type {Array<any>}
     */
    this.arr = arr;
    isDevMode && deepFreeze(arr);
  }

  /**
   * @return {number}
   */
  getLength () {
    return this.arr.length
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return this.arr
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentAny}
   */
  copy () {
    return new ContentAny(this.arr)
  }

  /**
   * @param {number} offset
   * @return {ContentAny}
   */
  splice (offset) {
    const right = new ContentAny(this.arr.slice(offset));
    this.arr = this.arr.slice(0, offset);
    return right
  }

  /**
   * @param {ContentAny} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.arr = this.arr.concat(right.arr);
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    const len = this.arr.length;
    encoder.writeLen(len - offset);
    for (let i = offset; i < len; i++) {
      const c = this.arr[i];
      encoder.writeAny(c);
    }
  }

  /**
   * @return {number}
   */
  getRef () {
    return 8
  }
}

/**
 * @private
 */
class ContentString {
  /**
   * @param {string} str
   */
  constructor (str) {
    /**
     * @type {string}
     */
    this.str = str;
  }

  /**
   * @return {number}
   */
  getLength () {
    return this.str.length
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return this.str.split('')
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentString}
   */
  copy () {
    return new ContentString(this.str)
  }

  /**
   * @param {number} offset
   * @return {ContentString}
   */
  splice (offset) {
    const right = new ContentString(this.str.slice(offset));
    this.str = this.str.slice(0, offset);

    // Prevent encoding invalid documents because of splitting of surrogate pairs: https://github.com/yjs/yjs/issues/248
    const firstCharCode = this.str.charCodeAt(offset - 1);
    if (firstCharCode >= 0xD800 && firstCharCode <= 0xDBFF) {
      // Last character of the left split is the start of a surrogate utf16/ucs2 pair.
      // We don't support splitting of surrogate pairs because this may lead to invalid documents.
      // Replace the invalid character with a unicode replacement character (� / U+FFFD)
      this.str = this.str.slice(0, offset - 1) + '�';
      // replace right as well
      right.str = '�' + right.str.slice(1);
    }
    return right
  }

  /**
   * @param {ContentString} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.str += right.str;
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    encoder.writeString(offset === 0 ? this.str : this.str.slice(offset));
  }

  /**
   * @return {number}
   */
  getRef () {
    return 4
  }
}

const YArrayRefID = 0;
const YMapRefID = 1;
const YTextRefID = 2;
const YXmlElementRefID = 3;
const YXmlFragmentRefID = 4;

/**
 * @private
 */
class ContentType {
  /**
   * @param {AbstractType<any>} type
   */
  constructor (type) {
    /**
     * @type {AbstractType<any>}
     */
    this.type = type;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return [this.type]
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentType}
   */
  copy () {
    return new ContentType(this.type._copy())
  }

  /**
   * @param {number} offset
   * @return {ContentType}
   */
  splice (offset) {
    throw methodUnimplemented()
  }

  /**
   * @param {ContentType} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {
    this.type._integrate(transaction.doc, item);
  }

  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {
    let item = this.type._start;
    while (item !== null) {
      if (!item.deleted) {
        item.delete(transaction);
      } else if (item.id.clock < (transaction.beforeState.get(item.id.client) || 0)) {
        // This will be gc'd later and we want to merge it if possible
        // We try to merge all deleted items after each transaction,
        // but we have no knowledge about that this needs to be merged
        // since it is not in transaction.ds. Hence we add it to transaction._mergeStructs
        transaction._mergeStructs.push(item);
      }
      item = item.right;
    }
    this.type._map.forEach(item => {
      if (!item.deleted) {
        item.delete(transaction);
      } else if (item.id.clock < (transaction.beforeState.get(item.id.client) || 0)) {
        // same as above
        transaction._mergeStructs.push(item);
      }
    });
    transaction.changed.delete(this.type);
  }

  /**
   * @param {StructStore} store
   */
  gc (store) {
    let item = this.type._start;
    while (item !== null) {
      item.gc(store, true);
      item = item.right;
    }
    this.type._start = null;
    this.type._map.forEach(/** @param {Item | null} item */ (item) => {
      while (item !== null) {
        item.gc(store, true);
        item = item.left;
      }
    });
    this.type._map = new Map();
  }

  /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    this.type._write(encoder);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 7
  }
}

/**
 * Split leftItem into two items
 * @param {Transaction} transaction
 * @param {Item} leftItem
 * @param {number} diff
 * @return {Item}
 *
 * @function
 * @private
 */
const splitItem = (transaction, leftItem, diff) => {
  // create rightItem
  const { client, clock } = leftItem.id;
  const rightItem = new Item(
    createID(client, clock + diff),
    leftItem,
    createID(client, clock + diff - 1),
    leftItem.right,
    leftItem.rightOrigin,
    leftItem.parent,
    leftItem.parentSub,
    leftItem.content.splice(diff)
  );
  if (leftItem.deleted) {
    rightItem.markDeleted();
  }
  if (leftItem.keep) {
    rightItem.keep = true;
  }
  if (leftItem.redone !== null) {
    rightItem.redone = createID(leftItem.redone.client, leftItem.redone.clock + diff);
  }
  // update left (do not set leftItem.rightOrigin as it will lead to problems when syncing)
  leftItem.right = rightItem;
  // update right
  if (rightItem.right !== null) {
    rightItem.right.left = rightItem;
  }
  // right is more specific.
  transaction._mergeStructs.push(rightItem);
  // update parent._map
  if (rightItem.parentSub !== null && rightItem.right === null) {
    /** @type {AbstractType<any>} */ (rightItem.parent)._map.set(rightItem.parentSub, rightItem);
  }
  leftItem.length = diff;
  return rightItem
};

/**
 * Abstract class that represents any content.
 */
class Item extends AbstractStruct {
  /**
   * @param {ID} id
   * @param {Item | null} left
   * @param {ID | null} origin
   * @param {Item | null} right
   * @param {ID | null} rightOrigin
   * @param {AbstractType<any>|ID|null} parent Is a type if integrated, is null if it is possible to copy parent from left or right, is ID before integration to search for it.
   * @param {string | null} parentSub
   * @param {AbstractContent} content
   */
  constructor (id, left, origin, right, rightOrigin, parent, parentSub, content) {
    super(id, content.getLength());
    /**
     * The item that was originally to the left of this item.
     * @type {ID | null}
     */
    this.origin = origin;
    /**
     * The item that is currently to the left of this item.
     * @type {Item | null}
     */
    this.left = left;
    /**
     * The item that is currently to the right of this item.
     * @type {Item | null}
     */
    this.right = right;
    /**
     * The item that was originally to the right of this item.
     * @type {ID | null}
     */
    this.rightOrigin = rightOrigin;
    /**
     * @type {AbstractType<any>|ID|null}
     */
    this.parent = parent;
    /**
     * If the parent refers to this item with some kind of key (e.g. YMap, the
     * key is specified here. The key is then used to refer to the list in which
     * to insert this item. If `parentSub = null` type._start is the list in
     * which to insert to. Otherwise it is `parent._map`.
     * @type {String | null}
     */
    this.parentSub = parentSub;
    /**
     * If this type's effect is redone this type refers to the type that undid
     * this operation.
     * @type {ID | null}
     */
    this.redone = null;
    /**
     * @type {AbstractContent}
     */
    this.content = content;
    /**
     * bit1: keep
     * bit2: countable
     * bit3: deleted
     * bit4: mark - mark node as fast-search-marker
     * @type {number} byte
     */
    this.info = this.content.isCountable() ? BIT2 : 0;
  }

  /**
   * This is used to mark the item as an indexed fast-search marker
   *
   * @type {boolean}
   */
  set marker (isMarked) {
    if (((this.info & BIT4) > 0) !== isMarked) {
      this.info ^= BIT4;
    }
  }

  get marker () {
    return (this.info & BIT4) > 0
  }

  /**
   * If true, do not garbage collect this Item.
   */
  get keep () {
    return (this.info & BIT1) > 0
  }

  set keep (doKeep) {
    if (this.keep !== doKeep) {
      this.info ^= BIT1;
    }
  }

  get countable () {
    return (this.info & BIT2) > 0
  }

  /**
   * Whether this item was deleted or not.
   * @type {Boolean}
   */
  get deleted () {
    return (this.info & BIT3) > 0
  }

  set deleted (doDelete) {
    if (this.deleted !== doDelete) {
      this.info ^= BIT3;
    }
  }

  markDeleted () {
    this.info |= BIT3;
  }

  /**
   * Return the creator clientID of the missing op or define missing items and return null.
   *
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */
  getMissing (transaction, store) {
    if (this.origin && this.origin.client !== this.id.client && this.origin.clock >= getState(store, this.origin.client)) {
      return this.origin.client
    }
    if (this.rightOrigin && this.rightOrigin.client !== this.id.client && this.rightOrigin.clock >= getState(store, this.rightOrigin.client)) {
      return this.rightOrigin.client
    }
    if (this.parent && this.parent.constructor === ID && this.id.client !== this.parent.client && this.parent.clock >= getState(store, this.parent.client)) {
      return this.parent.client
    }

    // We have all missing ids, now find the items

    if (this.origin) {
      this.left = getItemCleanEnd(transaction, store, this.origin);
      this.origin = this.left.lastId;
    }
    if (this.rightOrigin) {
      this.right = getItemCleanStart(transaction, this.rightOrigin);
      this.rightOrigin = this.right.id;
    }
    if ((this.left && this.left.constructor === GC) || (this.right && this.right.constructor === GC)) {
      this.parent = null;
    } else if (!this.parent) {
      // only set parent if this shouldn't be garbage collected
      if (this.left && this.left.constructor === Item) {
        this.parent = this.left.parent;
        this.parentSub = this.left.parentSub;
      } else if (this.right && this.right.constructor === Item) {
        this.parent = this.right.parent;
        this.parentSub = this.right.parentSub;
      }
    } else if (this.parent.constructor === ID) {
      const parentItem = getItem(store, this.parent);
      if (parentItem.constructor === GC) {
        this.parent = null;
      } else {
        this.parent = /** @type {ContentType} */ (parentItem.content).type;
      }
    }
    return null
  }

  /**
   * @param {Transaction} transaction
   * @param {number} offset
   */
  integrate (transaction, offset) {
    if (offset > 0) {
      this.id.clock += offset;
      this.left = getItemCleanEnd(transaction, transaction.doc.store, createID(this.id.client, this.id.clock - 1));
      this.origin = this.left.lastId;
      this.content = this.content.splice(offset);
      this.length -= offset;
    }

    if (this.parent) {
      if ((!this.left && (!this.right || this.right.left !== null)) || (this.left && this.left.right !== this.right)) {
        /**
         * @type {Item|null}
         */
        let left = this.left;

        /**
         * @type {Item|null}
         */
        let o;
        // set o to the first conflicting item
        if (left !== null) {
          o = left.right;
        } else if (this.parentSub !== null) {
          o = /** @type {AbstractType<any>} */ (this.parent)._map.get(this.parentSub) || null;
          while (o !== null && o.left !== null) {
            o = o.left;
          }
        } else {
          o = /** @type {AbstractType<any>} */ (this.parent)._start;
        }
        // TODO: use something like DeleteSet here (a tree implementation would be best)
        // @todo use global set definitions
        /**
         * @type {Set<Item>}
         */
        const conflictingItems = new Set();
        /**
         * @type {Set<Item>}
         */
        const itemsBeforeOrigin = new Set();
        // Let c in conflictingItems, b in itemsBeforeOrigin
        // ***{origin}bbbb{this}{c,b}{c,b}{o}***
        // Note that conflictingItems is a subset of itemsBeforeOrigin
        while (o !== null && o !== this.right) {
          itemsBeforeOrigin.add(o);
          conflictingItems.add(o);
          if (compareIDs(this.origin, o.origin)) {
            // case 1
            if (o.id.client < this.id.client) {
              left = o;
              conflictingItems.clear();
            } else if (compareIDs(this.rightOrigin, o.rightOrigin)) {
              // this and o are conflicting and point to the same integration points. The id decides which item comes first.
              // Since this is to the left of o, we can break here
              break
            } // else, o might be integrated before an item that this conflicts with. If so, we will find it in the next iterations
          } else if (o.origin !== null && itemsBeforeOrigin.has(getItem(transaction.doc.store, o.origin))) { // use getItem instead of getItemCleanEnd because we don't want / need to split items.
            // case 2
            if (!conflictingItems.has(getItem(transaction.doc.store, o.origin))) {
              left = o;
              conflictingItems.clear();
            }
          } else {
            break
          }
          o = o.right;
        }
        this.left = left;
      }
      // reconnect left/right + update parent map/start if necessary
      if (this.left !== null) {
        const right = this.left.right;
        this.right = right;
        this.left.right = this;
      } else {
        let r;
        if (this.parentSub !== null) {
          r = /** @type {AbstractType<any>} */ (this.parent)._map.get(this.parentSub) || null;
          while (r !== null && r.left !== null) {
            r = r.left;
          }
        } else {
          r = /** @type {AbstractType<any>} */ (this.parent)._start
          ;/** @type {AbstractType<any>} */ (this.parent)._start = this;
        }
        this.right = r;
      }
      if (this.right !== null) {
        this.right.left = this;
      } else if (this.parentSub !== null) {
        // set as current parent value if right === null and this is parentSub
        /** @type {AbstractType<any>} */ (this.parent)._map.set(this.parentSub, this);
        if (this.left !== null) {
          // this is the current attribute value of parent. delete right
          this.left.delete(transaction);
        }
      }
      // adjust length of parent
      if (this.parentSub === null && this.countable && !this.deleted) {
        /** @type {AbstractType<any>} */ (this.parent)._length += this.length;
      }
      addStruct(transaction.doc.store, this);
      this.content.integrate(transaction, this);
      // add parent to transaction.changed
      addChangedTypeToTransaction(transaction, /** @type {AbstractType<any>} */ (this.parent), this.parentSub);
      if ((/** @type {AbstractType<any>} */ (this.parent)._item !== null && /** @type {AbstractType<any>} */ (this.parent)._item.deleted) || (this.parentSub !== null && this.right !== null)) {
        // delete if parent is deleted or if this is not the current attribute value of parent
        this.delete(transaction);
      }
    } else {
      // parent is not defined. Integrate GC struct instead
      new GC(this.id, this.length).integrate(transaction, 0);
    }
  }

  /**
   * Returns the next non-deleted item
   */
  get next () {
    let n = this.right;
    while (n !== null && n.deleted) {
      n = n.right;
    }
    return n
  }

  /**
   * Returns the previous non-deleted item
   */
  get prev () {
    let n = this.left;
    while (n !== null && n.deleted) {
      n = n.left;
    }
    return n
  }

  /**
   * Computes the last content address of this Item.
   */
  get lastId () {
    // allocating ids is pretty costly because of the amount of ids created, so we try to reuse whenever possible
    return this.length === 1 ? this.id : createID(this.id.client, this.id.clock + this.length - 1)
  }

  /**
   * Try to merge two items
   *
   * @param {Item} right
   * @return {boolean}
   */
  mergeWith (right) {
    if (
      this.constructor === right.constructor &&
      compareIDs(right.origin, this.lastId) &&
      this.right === right &&
      compareIDs(this.rightOrigin, right.rightOrigin) &&
      this.id.client === right.id.client &&
      this.id.clock + this.length === right.id.clock &&
      this.deleted === right.deleted &&
      this.redone === null &&
      right.redone === null &&
      this.content.constructor === right.content.constructor &&
      this.content.mergeWith(right.content)
    ) {
      const searchMarker = /** @type {AbstractType<any>} */ (this.parent)._searchMarker;
      if (searchMarker) {
        searchMarker.forEach(marker => {
          if (marker.p === right) {
            // right is going to be "forgotten" so we need to update the marker
            marker.p = this;
            // adjust marker index
            if (!this.deleted && this.countable) {
              marker.index -= this.length;
            }
          }
        });
      }
      if (right.keep) {
        this.keep = true;
      }
      this.right = right.right;
      if (this.right !== null) {
        this.right.left = this;
      }
      this.length += right.length;
      return true
    }
    return false
  }

  /**
   * Mark this Item as deleted.
   *
   * @param {Transaction} transaction
   */
  delete (transaction) {
    if (!this.deleted) {
      const parent = /** @type {AbstractType<any>} */ (this.parent);
      // adjust the length of parent
      if (this.countable && this.parentSub === null) {
        parent._length -= this.length;
      }
      this.markDeleted();
      addToDeleteSet(transaction.deleteSet, this.id.client, this.id.clock, this.length);
      addChangedTypeToTransaction(transaction, parent, this.parentSub);
      this.content.delete(transaction);
    }
  }

  /**
   * @param {StructStore} store
   * @param {boolean} parentGCd
   */
  gc (store, parentGCd) {
    if (!this.deleted) {
      throw unexpectedCase()
    }
    this.content.gc(store);
    if (parentGCd) {
      replaceStruct(store, this, new GC(this.id, this.length));
    } else {
      this.content = new ContentDeleted(this.length);
    }
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   */
  write (encoder, offset) {
    const origin = offset > 0 ? createID(this.id.client, this.id.clock + offset - 1) : this.origin;
    const rightOrigin = this.rightOrigin;
    const parentSub = this.parentSub;
    const info = (this.content.getRef() & BITS5) |
      (origin === null ? 0 : BIT8) | // origin is defined
      (rightOrigin === null ? 0 : BIT7) | // right origin is defined
      (parentSub === null ? 0 : BIT6); // parentSub is non-null
    encoder.writeInfo(info);
    if (origin !== null) {
      encoder.writeLeftID(origin);
    }
    if (rightOrigin !== null) {
      encoder.writeRightID(rightOrigin);
    }
    if (origin === null && rightOrigin === null) {
      const parent = /** @type {AbstractType<any>} */ (this.parent);
      if (parent._item !== undefined) {
        const parentItem = parent._item;
        if (parentItem === null) {
          // parent type on y._map
          // find the correct key
          const ykey = findRootTypeKey(parent);
          encoder.writeParentInfo(true); // write parentYKey
          encoder.writeString(ykey);
        } else {
          encoder.writeParentInfo(false); // write parent id
          encoder.writeLeftID(parentItem.id);
        }
      } else if (parent.constructor === String) { // this edge case was added by differential updates
        encoder.writeParentInfo(true); // write parentYKey
        encoder.writeString(parent);
      } else if (parent.constructor === ID) {
        encoder.writeParentInfo(false); // write parent id
        encoder.writeLeftID(parent);
      } else {
        unexpectedCase();
      }
      if (parentSub !== null) {
        encoder.writeString(parentSub);
      }
    }
    this.content.write(encoder, offset);
  }
}

/** eslint-env browser */


const glo = /** @type {any} */ (typeof globalThis !== 'undefined'
  ? globalThis
  : typeof window !== 'undefined'
    ? window
    // @ts-ignore
    : typeof global !== 'undefined' ? global : {});

const importIdentifier = '__ $YJS$ __';

if (glo[importIdentifier] === true) {
  /**
   * Dear reader of this message. Please take this seriously.
   *
   * If you see this message, make sure that you only import one version of Yjs. In many cases,
   * your package manager installs two versions of Yjs that are used by different packages within your project.
   * Another reason for this message is that some parts of your project use the commonjs version of Yjs
   * and others use the EcmaScript version of Yjs.
   *
   * This often leads to issues that are hard to debug. We often need to perform constructor checks,
   * e.g. `struct instanceof GC`. If you imported different versions of Yjs, it is impossible for us to
   * do the constructor checks anymore - which might break the CRDT algorithm.
   *
   * https://github.com/yjs/yjs/issues/438
   */
  console.error('Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438');
}
glo[importIdentifier] = true;

/**
 * @function createYMap
 * @static
 * @description Creates a YMap and populates it with key-value pairs from a plain object.
 * @param {object} data - The initial data to populate the YMap with.
 * @returns {YMap} A new YMap instance.
 */
function createYMap(data) {
    const map = new YMap();
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
    const array = new YArray();
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
                if ((event instanceof YMapEvent && event.changes.keys.has(field)) ||
                    (event instanceof YArrayEvent && parentMap instanceof YMap && key === field) ||
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
                if ((event instanceof YMapEvent && event.changes.keys.has(field)) ||
                    (event instanceof YArrayEvent && parentMap instanceof YMap && key === field) ||
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

export { $, AccessLevel, ActionMode, BasicInputEvents, ClickMode, ClosestOrigin, DefaultClickEventName, DefaultDragEventName, DefaultEventName, DefaultKeyEventName, DefaultMoveEventName, DefaultWheelEventName, Delegate, Direction, InOut, InputDevice, MathMLNamespace, MathMLTags, Mvc, NonPassiveEvents, OnOff, Open, Point, PopupFallbackMode, Range, Reifect, ReifectHandler, Shown, Side, SideH, SideV, StatefulReifect, SvgNamespace, SvgTags, TurboButton, TurboClickEventName, TurboController, TurboDragEvent, TurboDragEventName, TurboDrawer, TurboDropdown, TurboElement, TurboEmitter, TurboEvent, TurboEventManager, TurboEventName, TurboHandler, TurboHeadlessElement, TurboIcon, TurboIconSwitch, TurboIconToggle, TurboInput, TurboInteractor, TurboKeyEvent, TurboKeyEventName, TurboMap, TurboMarkingMenu, TurboModel, TurboMoveEventName, TurboNumericalInput, TurboPopup, TurboProxiedElement, TurboRichElement, TurboSelect, TurboSelectEntry, TurboSelectInputEvent, TurboSelectWheel, TurboSelector, TurboSubstrate, TurboTool, TurboView, TurboWeakSet, TurboWheelEvent, TurboWheelEventName, AbstractType as YAbstractType, YArray, YArrayEvent, Doc as YDoc, YDocument, YEvent, YMap, YMapEvent, YText, a, addInYArray, addInYMap, addReifectManagementToNodePrototype, areEqual, auto, bestOverlayColor, blindElement, button, cache, callOnce, callOncePerInstance, camelToKebabCase, canvas, clearCache, clearCacheEntry, contrast, controller, createProxy, createYArray, createYMap, css, deepObserveAll, deepObserveAny, define, div, eachEqualToAny, effect, element, equalToAny, fetchSvg, flexCol, flexColCenter, flexRow, flexRowCenter, form, generateTagFunction, getEventPosition, getFileExtension, getSignal, h1, h2, h3, h4, h5, h6, handler, hashBySize, hashString, icon, img, input, isMathMLTag, isNull, isSvgTag, isUndefined, kebabToCamelCase, linearInterpolation, link, loadLocalFont, luminance, markDirty, mod, observe, p, parse, randomColor, randomFromRange, randomId, randomString, reifect, removeFromYArray, setSignal, setupClassFunctions, setupElementFunctions, setupEventFunctions, setupHierarchyFunctions, setupMiscFunctions, setupStyleFunctions, setupSubstrateFunctions, setupToolFunctions, signal, spacer, span, statefulReifier, stringify, style, stylesheet, t, textToElement, textarea, trim, turbo, turbofy, video };
