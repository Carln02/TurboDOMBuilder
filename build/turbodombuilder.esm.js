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
 * @typedef {Object} TurboProperties
 * @description Object containing properties for configuring a TurboWrapper, a TurboElement, or any Element. A tag (and
 * possibly a namespace) can be provided for TurboWrappers or for element creation. TurboElements will ignore these
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
 * @property {Element} [parent] - The parent element or wrapper to which the created element will be appended.
 * @property {string | Element} [out] - If defined, declares (or sets) the element in the parent as a field with the given value
 * as name.
 * @property {string} [text] - The text content of the element (if any).
 * @property {boolean} [shadowDOM] - If true, indicate that the element or wrapper will be created under a shadow root.
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
 * @typedef {Object} ChildHandler
 * @description A type that represents all entities that can hold and manage children (an element or a shadow root).
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

/**
 * @function auto
 * @description A decorator that automatically creates a getter or setter if only one of them is defined. Works only
 * with public fields.
 * @param {AutoOptions} [options] - Optional object to configure the decorator.
 * @returns {Function} - The updated property descriptor.
 * @template Type
 */
function auto(options) {
    return function (target, propertyKey, descriptor) {
        const originalGetter = descriptor?.get;
        const originalSetter = descriptor?.set;
        if (!originalSetter && !(options?.callBefore))
            return descriptor;
        const hiddenPropertyKey = Symbol(`__${String(propertyKey)}__`);
        const newGetter = function () {
            if (originalGetter) {
                const value = originalGetter.call(this);
                if (options?.returnDefinedGetterValue)
                    return value;
            }
            return this[hiddenPropertyKey];
        };
        const newSetter = function (value) {
            if (options?.cancelIfUnchanged != false && value == this[hiddenPropertyKey])
                return;
            if (options?.callBefore)
                value = (function () {
                    return options.callBefore.call(this, value);
                }).call(this);
            this[hiddenPropertyKey] = value;
            if (originalSetter)
                originalSetter.call(this, value);
        };
        if (descriptor) {
            if (options?.returnDefinedGetterValue || !originalGetter)
                descriptor.get = newGetter;
            descriptor.set = newSetter;
        }
        else {
            Object.defineProperty(target, propertyKey, {
                get: newGetter,
                set: newSetter,
                enumerable: true,
                configurable: true
            });
        }
        return descriptor;
    };
}

/**
 * @function callOnce
 * @description A decorator that ensures a method is called only once on a given instance. If the method is called
 * more than once, a warning is logged to the console.
 * @param {any} target - The target object.
 * @param {string} propertyKey - The name of the method being decorated.
 * @param {PropertyDescriptor} [descriptor=Object.getOwnPropertyDescriptor(target, propertyKey)] - The property
 * descriptor of the method.
 * @returns {PropertyDescriptor} - The updated property descriptor.
 */
function callOnce(target, propertyKey, descriptor = Object.getOwnPropertyDescriptor(target, propertyKey)) {
    const originalMethod = descriptor?.value;
    if (!originalMethod)
        throw new Error(`No method ${propertyKey} found on target`);
    const calledFlagKey = Symbol(`__callOnce__${propertyKey}`);
    descriptor.value = function (...args) {
        if (!this[calledFlagKey]) {
            this[calledFlagKey] = true;
            return originalMethod.apply(this, args);
        }
        else {
            console.warn(`Function ${propertyKey} has already been called once on this instance and will not be called again.`);
        }
    };
    return descriptor;
}
/**
 * @function callOncePerInstance
 * @description A function wrapper that ensures the wrapped function is called only once per instance.
 * @param {Function} fn - The function to wrap.
 * @param {string|symbol} [key=Symbol(`__callOncePerInstance__${fn.name}`)] - A unique key to track if the function
 * has been called.
 * @returns {Function} - The wrapped function that will only execute once per instance.
 */
function callOncePerInstance(fn, key = Symbol(`__callOncePerInstance__${fn.name}`)) {
    return function (...args) {
        if (!this[key]) {
            this[key] = true;
            return fn.apply(this, args);
        }
    };
}

/**
 * @function cache
 * @description Decorator for caching the result of a method or getter.
 * @param {CacheOptions} [options={}] - Configuration options for the cache.
 * @returns {Function} - A decorator function.
 */
function cache(options = {}) {
    return function (target, propertyKey, descriptor = Object.getOwnPropertyDescriptor(target, propertyKey)) {
        const originalMethod = descriptor?.value || descriptor?.get;
        if (!originalMethod)
            throw new Error(`No method ${propertyKey} found on target`);
        const isGetter = !!descriptor.get;
        const cacheKey = Symbol(`__cache__${propertyKey}`);
        const setupKey = Symbol(`__cache__setup__${propertyKey}`);
        const timeoutIds = [];
        const deleteCallback = function (b = true) {
            deleteCacheEntry.call(this, isGetter, cacheKey, timeoutIds, b);
        };
        const setupOptionsCallback = callOncePerInstance(function (instance) {
            setupOptions(instance, propertyKey, options, target, deleteCallback);
        }, setupKey);
        if (isGetter) {
            descriptor.get = function () {
                const instance = this || target;
                if (!instance[cacheKey]) {
                    setupOptionsCallback.call(instance, instance);
                    instance[cacheKey] = originalMethod.apply(instance);
                    if (options.timeout)
                        timeoutIds.push(setTimeout(() => deleteCallback.call(instance), options.timeout));
                    if (options.clearOnNextFrame)
                        requestAnimationFrame(() => deleteCallback.call(instance));
                }
                return instance[cacheKey];
            };
        }
        else {
            descriptor.value = function (...args) {
                const instance = this || target;
                if (!instance[cacheKey]) {
                    instance[cacheKey] = new Map();
                    setupOptionsCallback.call(instance, instance);
                }
                const key = args.length == 0 ? "__no_args__" : JSON.stringify(args.map(value => {
                    if (typeof value == "function")
                        return `function:${value.name}`;
                    if (typeof value == "object" && value != null)
                        return JSON.stringify(Object.entries(value).sort());
                    return value == undefined ? "undefined" : value;
                }));
                if (instance[cacheKey].has(key)) {
                    return instance[cacheKey].get(key);
                }
                else {
                    const result = originalMethod.apply(instance, args);
                    instance[cacheKey].set(key, result);
                    if (options.timeout)
                        timeoutIds.push(setTimeout(() => instance[cacheKey].delete(key), options.timeout));
                    if (options.clearOnNextFrame)
                        requestAnimationFrame(() => deleteCallback.call(instance));
                    return result;
                }
            };
        }
    };
}
/**
 * @function deleteCacheEntry
 * @description Deletes the cache entry for the given property.
 * @param {boolean} isGetter - Whether the cache is for a getter.
 * @param {symbol} cacheKey - The cache key.
 * @param {NodeJS.Timeout[]} timeoutIds - List of timeout IDs.
 * @param {boolean} [b] - Whether to proceed with the deletion.
 */
function deleteCacheEntry(isGetter, cacheKey, timeoutIds, b) {
    if (!b)
        return;
    if (isGetter)
        delete this[cacheKey];
    else
        this[cacheKey]?.clear();
    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutIds.splice(0, timeoutIds.length);
}
/**
 * @function setupOptions
 * @description Sets up the cache invalidation options.
 * @param {any} instance - The instance of the class.
 * @param {string} propertyKey - The property key.
 * @param {CacheOptions} options - The cache options.
 * @param {any} target - The target class.
 * @param {Function} deleteCallback - The callback to delete the cache.
 */
function setupOptions(instance, propertyKey, options, target, deleteCallback) {
    //Handle onEvent
    if (options.onEvent) {
        const eventTarget = typeof target.addEventListener == "function" ? target : document;
        const eventNames = Array.isArray(options.onEvent)
            ? options.onEvent
            : options.onEvent.split(" ");
        eventNames.forEach(eventName => eventTarget.addEventListener(eventName, () => deleteCallback.call(instance)));
    }
    //Handle onFieldChange
    if (options.onFieldChange) {
        const observedFields = Array.isArray(options.onFieldChange)
            ? options.onFieldChange
            : [options.onFieldChange];
        observedFields.forEach(fieldOrFunction => {
            if (typeof fieldOrFunction == "string")
                fieldOrFunction.split(" ")
                    .forEach(entry => clearCacheOnFieldChange(instance, entry, propertyKey, deleteCallback));
            else
                clearCacheOnFieldChange(instance, fieldOrFunction.name, propertyKey, deleteCallback);
        });
    }
    //Handle onCallback
    if (options.onCallback) {
        const intervalId = setInterval(() => {
            const result = options.onCallback.call(instance);
            if (result instanceof Promise)
                result.then(value => deleteCallback.call(instance, value));
            else
                deleteCallback.call(instance, result);
        }, options.onCallbackFrequency || 50);
        if (typeof target.addEventListener == "function") {
            target.addEventListener("destroy", () => clearInterval(intervalId));
        }
    }
}
/**
 * @function clearCacheOnFieldChange
 * @description Clears the cache when the specified field or method is changed or called.
 * @param {any} instance - The instance of the class.
 * @param {string} fieldName - The field name.
 * @param {string} propertyKey - The property key.
 * @param {Function} deleteCallback - The callback to delete the cache.
 */
function clearCacheOnFieldChange(instance, fieldName, propertyKey, deleteCallback) {
    const originalField = instance[fieldName];
    if (originalField == undefined) {
        console.warn(`No method ${propertyKey} found on target. It will be ignored.`);
        return;
    }
    if (typeof originalField == "function") {
        instance[fieldName] = function (...args) {
            deleteCallback.call(instance);
            return originalField.apply(instance, args);
        };
    }
    else {
        const originalFieldDescriptor = Object.getOwnPropertyDescriptor(instance, fieldName);
        console.log(originalFieldDescriptor);
        Object.defineProperty(instance, fieldName, {
            get() {
                return originalFieldDescriptor?.get?.call(instance) || instance[originalField];
            },
            set(newValue) {
                deleteCallback.call(instance);
                if (originalFieldDescriptor?.set)
                    originalFieldDescriptor.set.call(instance, newValue);
                else
                    instance[originalField] = newValue;
            },
            configurable: true,
            enumerable: true
        });
    }
}
/**
 * @function clearCache
 * @description Clears all cache entries for the given instance.
 * @param {any} instance - The instance to clear the cache from.
 */
function clearCache(instance) {
    for (const key of Object.getOwnPropertySymbols(instance)) {
        if (key.toString().startsWith("Symbol(__cache__)"))
            delete instance[key];
    }
}
/**
 * @function clearCacheEntry
 * @description Clears the cache entry for the provided field in the given instance.
 * @param {any} instance - The instance to clear the cache from.
 * @param {string | Function} field - The name of the field or the field itself (if it is a method) to clear.
 */
function clearCacheEntry(instance, field) {
    const fieldName = typeof field === "function" ? field.name : field;
    const cacheKey = Object.getOwnPropertySymbols(instance)
        .find(symbol => symbol.toString() === `Symbol(__cache__${fieldName})`);
    if (cacheKey && instance[cacheKey])
        delete instance[cacheKey];
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
 * @description Defines the element as a custom element with the given name. Use as class decorator in TypeScript
 * (e.g.: @define("my-class")), and as a regular function call in JavaScript (e.g.: define("my-class")(MyClass)).
 * If the elementName is not provided, it defaults to the class name.
 * @param {string} [elementName] - The name of the custom element.
 */
const define = (elementName) => (constructor) => {
    customElements.define(elementName || camelToKebabCase(constructor.name), constructor);
};

function getPropertyDescriptor(prototype, field) {
    while (prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, field);
        if (descriptor)
            return descriptor;
        prototype = Object.getPrototypeOf(prototype);
    }
    return undefined;
}
/**
 * @description Sets the corresponding property as observed, to sync its changes with a corresponding HTML attribute.
 * @param {HTMLElement} target - The HTML element to observe
 * @param {string} propertyKey - The name of the field to observe
 */
function observe(target, propertyKey) {
    let constructor = target.constructor;
    if (!constructor.observedAttributes)
        constructor.observedAttributes = [];
    const attributeName = camelToKebabCase(propertyKey);
    const observedFieldKey = Symbol(`__observed__${propertyKey}`);
    constructor.observedAttributes.push(attributeName);
    let descriptor = getPropertyDescriptor(constructor.prototype, propertyKey) || {
        enumerable: true,
        configurable: true
    };
    Object.defineProperty(constructor.prototype, propertyKey, {
        get: descriptor.get || function () {
            return this[observedFieldKey];
        },
        set: function (value) {
            if (this[propertyKey] === value)
                return;
            if (descriptor.set)
                descriptor.set.call(this, value);
            else
                this[observedFieldKey] = value;
            if (typeof this.setAttribute === "function")
                this.setAttribute(attributeName, stringify(this[observedFieldKey]));
        },
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable
    });
}

const SvgNamespace = "http://www.w3.org/2000/svg";
const MathMLNamespace = "http://www.w3.org/1998/Math/MathML";
const SvgTagsDefinitions = {
    a: SVGAElement,
    animate: SVGAnimateElement,
    animateMotion: SVGAnimateMotionElement,
    animateTransform: SVGAnimateTransformElement,
    circle: SVGCircleElement,
    clipPath: SVGClipPathElement,
    defs: SVGDefsElement,
    desc: SVGDescElement,
    ellipse: SVGEllipseElement,
    feBlend: SVGFEBlendElement,
    feColorMatrix: SVGFEColorMatrixElement,
    feComponentTransfer: SVGFEComponentTransferElement,
    feComposite: SVGFECompositeElement,
    feConvolveMatrix: SVGFEConvolveMatrixElement,
    feDiffuseLighting: SVGFEDiffuseLightingElement,
    feDisplacementMap: SVGFEDisplacementMapElement,
    feDistantLight: SVGFEDistantLightElement,
    feDropShadow: SVGFEDropShadowElement,
    feFlood: SVGFEFloodElement,
    feFuncA: SVGFEFuncAElement,
    feFuncB: SVGFEFuncBElement,
    feFuncG: SVGFEFuncGElement,
    feFuncR: SVGFEFuncRElement,
    feGaussianBlur: SVGFEGaussianBlurElement,
    feImage: SVGFEImageElement,
    feMerge: SVGFEMergeElement,
    feMergeNode: SVGFEMergeNodeElement,
    feMorphology: SVGFEMorphologyElement,
    feOffset: SVGFEOffsetElement,
    fePointLight: SVGFEPointLightElement,
    feSpecularLighting: SVGFESpecularLightingElement,
    feSpotLight: SVGFESpotLightElement,
    feTile: SVGFETileElement,
    feTurbulence: SVGFETurbulenceElement,
    filter: SVGFilterElement,
    foreignObject: SVGForeignObjectElement,
    g: SVGGElement,
    image: SVGImageElement,
    line: SVGLineElement,
    linearGradient: SVGLinearGradientElement,
    marker: SVGMarkerElement,
    mask: SVGMaskElement,
    metadata: SVGMetadataElement,
    mpath: SVGMPathElement,
    path: SVGPathElement,
    pattern: SVGPatternElement,
    polygon: SVGPolygonElement,
    polyline: SVGPolylineElement,
    radialGradient: SVGRadialGradientElement,
    rect: SVGRectElement,
    script: SVGScriptElement,
    set: SVGSetElement,
    stop: SVGStopElement,
    style: SVGStyleElement,
    svg: SVGSVGElement,
    switch: SVGSwitchElement,
    symbol: SVGSymbolElement,
    text: SVGTextElement,
    textPath: SVGTextPathElement,
    title: SVGTitleElement,
    tspan: SVGTSpanElement,
    use: SVGUseElement,
    view: SVGViewElement,
};
const MathMLTagsDefinitions = {
    annotation: MathMLElement,
    "annotation-xml": MathMLElement,
    maction: MathMLElement,
    math: MathMLElement,
    merror: MathMLElement,
    mfrac: MathMLElement,
    mi: MathMLElement,
    mmultiscripts: MathMLElement,
    mn: MathMLElement,
    mo: MathMLElement,
    mover: MathMLElement,
    mpadded: MathMLElement,
    mphantom: MathMLElement,
    mprescripts: MathMLElement,
    mroot: MathMLElement,
    mrow: MathMLElement,
    ms: MathMLElement,
    mspace: MathMLElement,
    msqrt: MathMLElement,
    mstyle: MathMLElement,
    msub: MathMLElement,
    msubsup: MathMLElement,
    msup: MathMLElement,
    mtable: MathMLElement,
    mtd: MathMLElement,
    mtext: MathMLElement,
    mtr: MathMLElement,
    munder: MathMLElement,
    munderover: MathMLElement,
    semantics: MathMLElement
};
/**
 * @description Evaluates whether the provided string is an SVG tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the SVG namespace or not.
 */
function isSvgTag(tag) {
    return Object.keys(SvgTagsDefinitions).includes(tag) || tag?.startsWith("svg");
}
/**
 * @description Evaluates whether the provided string is a MathML tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the MathML namespace or not.
 */
function isMathMLTag(tag) {
    return Object.keys(MathMLTagsDefinitions).includes(tag) || tag?.startsWith("math");
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
    element.setProperties(properties);
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
    element.setProperties(properties);
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
    el.setStyles({ display: "flex", flexDirection: "column" }, true);
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
    el.setStyles({ justifyContent: "center", alignItems: "center" }, true);
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
    el.setStyles({ display: "flex", flexDirection: "row" }, true);
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
    el.setStyles({ justifyContent: "center", alignItems: "center" }, true);
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
    el.setStyle("flexGrow", 1, true);
    return el;
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
    root.addChild(stylesheet);
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


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class TurboEmitter {
    callbacks = new Map();
    model;
    constructor(model) {
        this.model = model;
    }
    getBlock(blockKey) {
        return this.callbacks.get(blockKey);
    }
    getOrGenerateBlock(blockKey) {
        if (!this.callbacks.has(blockKey))
            this.callbacks.set(blockKey, new Map());
        return this.callbacks.get(blockKey);
    }
    getKey(key, blockKey) {
        const block = this.getBlock(blockKey);
        if (!block)
            return undefined;
        return block.get(key);
    }
    getOrGenerateKey(key, blockKey) {
        const block = this.getOrGenerateBlock(blockKey);
        if (!block.has(key))
            block.set(key, []);
        return block.get(key);
    }
    addWithBlock(key, blockKey, callback) {
        this.getOrGenerateKey(key, blockKey).push(callback);
    }
    add(key, callback) {
        this.addWithBlock(key, this.model.defaultBlockKey, callback);
    }
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
    remove(key, callback) {
        this.removeWithBlock(key, this.model.defaultBlockKey, callback);
    }
    fireWithBlock(key, blockKey, ...args) {
        this.callbacks.get(blockKey)?.get(key)?.forEach((callback) => {
            if (callback && typeof callback == "function")
                callback(...args);
        });
    }
    fire(key, ...args) {
        this.fireWithBlock(key, this.model.defaultBlockKey, ...args);
    }
}

class MvcHandler {
    element;
    controllers = new Map();
    constructor(properties) {
        if (properties.element)
            this.element = properties.element;
        if (properties.emitter)
            this.emitter = properties.emitter;
        if (properties.view)
            this.view = properties.view;
        if (properties.model) {
            this.model = properties.model;
            if (properties.data)
                this.model.data = properties.data;
        }
        if (properties.generate)
            this.generate(properties);
    }
    set view(view) {
    }
    set model(model) {
        this.linkModelToEmitter();
        this.linkModelToView();
    }
    set emitter(emitter) {
    }
    get data() {
        return this.model?.data;
    }
    set data(data) {
        if (this.model)
            this.model.data = data;
    }
    get dataId() {
        return this.model?.dataId;
    }
    set dataId(value) {
        if (this.model)
            this.model.dataId = value;
    }
    get dataIndex() {
        return Number.parseInt(this.dataId);
    }
    set dataIndex(value) {
        if (this.model)
            this.model.dataId = value.toString();
    }
    get dataSize() {
        return this.model?.getSize();
    }
    getController(key) {
        return this.controllers.get(key);
    }
    addController(controller) {
        if (!controller.keyName)
            controller.keyName =
                this.extractClassEssenceName(controller.constructor);
        this.controllers.set(controller.keyName, controller);
    }
    getHandler(key) {
        return this.model.getHandler(key);
    }
    addHandler(handler) {
        if (!handler.keyName)
            handler.keyName =
                this.extractClassEssenceName(handler.constructor);
        this.model.addHandler(handler.keyName, handler);
    }
    generate(properties = {}) {
        if (properties.initialize == undefined)
            properties.initialize = true;
        if (properties.modelConstructor && (!this.model || properties.force)) {
            this.model = new properties.modelConstructor(properties.data);
        }
        if ((properties.emitterConstructor || properties.modelConstructor || this.model)
            && (!this.emitter || properties.force)) {
            this.emitter = properties.emitterConstructor
                ? new properties.emitterConstructor(this.model)
                : new TurboEmitter(this.model);
            this.linkModelToEmitter();
        }
        if (properties.viewConstructor && (!this.view || properties.force)) {
            this.view = new properties.viewConstructor({
                element: this.element,
                model: this.model,
                emitter: this.emitter
            });
            this.linkModelToView();
        }
        if (properties.controllerConstructors) {
            const controllerProperties = {
                element: this.element,
                view: this.view,
                model: this.model,
                emitter: this.emitter
            };
            properties.controllerConstructors.forEach(controllerConstructor => this.addController(new controllerConstructor(controllerProperties)));
        }
        if (properties.handlerConstructors) {
            properties.handlerConstructors.forEach(handlerConstructor => this.addHandler(new handlerConstructor(this.model)));
        }
        if (properties.initialize)
            this.initialize();
    }
    initialize() {
        this.view?.initialize();
        this.controllers.forEach((controller) => controller.initialize());
        this.model?.initialize();
    }
    linkModelToView() {
        if (!this.view || !this.model)
            return;
        this.view.model = this.model;
    }
    linkModelToEmitter() {
        if (!this.emitter || !this.model)
            return;
        this.emitter.model = this.model;
        this.model.keyChangedCallback = (keyName, blockKey, ...args) => this.emitter.fireWithBlock(keyName, blockKey, ...args);
    }
    extractClassEssenceName(constructor) {
        let className = constructor.name;
        let prototype = Object.getPrototypeOf(this.element);
        while (prototype && prototype.constructor !== Object) {
            const name = prototype.constructor.name;
            if (className.startsWith(name)) {
                className = className.slice(name.length);
                break;
            }
            prototype = Object.getPrototypeOf(prototype);
        }
        if (className.endsWith("Handler"))
            className = className.slice(0, -("Handler".length));
        else if (className.endsWith("Controller"))
            className = className.slice(0, -("Controller".length));
        return className.charAt(0).toLowerCase() + className.slice(1);
    }
}
__decorate([
    auto()
], MvcHandler.prototype, "view", null);
__decorate([
    auto()
], MvcHandler.prototype, "model", null);
__decorate([
    auto()
], MvcHandler.prototype, "emitter", null);

class TurboController {
    keyName;
    element;
    view;
    model;
    emitter;
    constructor(properties) {
        this.element = properties.element;
        this.view = properties.view;
        this.model = properties.model;
        this.emitter = properties.emitter;
    }
    initialize() {
        this.setupChangedCallbacks();
    }
    setupChangedCallbacks() {
    }
}

class TurboHandler {
    keyName;
    model;
    constructor(model) {
        this.model = model;
    }
}

class TurboModel {
    dataMap = new Map();
    idMap = new Map();
    handlers = new Map();
    keyChangedCallback;
    constructor(data) {
        this.enabledCallbacks = true;
        this.setDataBlock(data, undefined, this.defaultBlockKey, false);
    }
    get data() {
        return this.getDataBlock();
    }
    set data(value) {
        this.setDataBlock(value);
    }
    get dataId() {
        return this.getDataBlockId();
    }
    set dataId(value) {
        this.setDataBlockId(value);
    }
    set enabledCallbacks(value) { }
    getData(key, blockKey) {
        if (!blockKey)
            return null;
        return this.dataMap.get(blockKey)?.[key];
    }
    setData(key, value, blockKey) {
        if (!blockKey)
            return;
        const block = this.dataMap.get(blockKey);
        if (block)
            block[key] = value;
        if (this.enabledCallbacks)
            this.fireKeyChangedCallback(key, blockKey);
    }
    getSize(blockKey = this.defaultBlockKey) {
        const block = this.dataMap.get(blockKey);
        return block ? Object.keys(block).length : 0;
    }
    getDataBlock(blockKey = this.defaultBlockKey) {
        if (!blockKey)
            return null;
        return this.dataMap.get(blockKey);
    }
    setDataBlock(value, id, blockKey = this.defaultBlockKey, initialize = true) {
        if (!value)
            return;
        this.dataMap.set(blockKey, value);
        if (id)
            this.dataMap.set(id, value);
        if (initialize)
            this.initialize(blockKey);
    }
    getDataBlockId(blockKey = this.defaultBlockKey) {
        if (!blockKey)
            return null;
        return this.idMap.get(blockKey);
    }
    setDataBlockId(value, blockKey = this.defaultBlockKey) {
        if (!value)
            return;
        this.idMap.set(blockKey, value);
    }
    fireKeyChangedCallback(key, blockKey = this.defaultBlockKey, deleted = false) {
        if (blockKey == undefined)
            blockKey = this.dataMap.keys().next().value;
        this.keyChangedCallback(key, blockKey, deleted ? undefined : this.getData(key, blockKey));
    }
    fireCallback(key, ...args) {
        this.keyChangedCallback(key, this.defaultBlockKey, ...args);
    }
    fireBlockCallback(key, blockKey = this.defaultBlockKey, ...args) {
        this.keyChangedCallback(key, blockKey, ...args);
    }
    initialize(blockKey = this.defaultBlockKey) {
        const block = this.getDataBlock(blockKey);
        if (!block || !this.enabledCallbacks)
            return;
        Object.keys(block).forEach(key => this.fireKeyChangedCallback(key, blockKey));
    }
    clear(blockKey = this.defaultBlockKey) {
    }
    get defaultBlockKey() {
        return "__turbo_default_block_key__";
    }
    get defaultComputationBlockKey() {
        return this.dataMap.size > 1 ? null : this.defaultBlockKey;
    }
    getAllBlockKeys() {
        return Array.from(this.dataMap.keys());
    }
    getAllIds() {
        return Array.from(this.idMap.values());
    }
    getAllKeys(blockKey = this.defaultComputationBlockKey) {
        const output = [];
        if (blockKey) {
            const block = this.dataMap.get(blockKey);
            if (block)
                output.push(...Object.keys(block));
        }
        else {
            for (const block of this.dataMap.values()) {
                if (block)
                    output.push(...Object.keys(block));
            }
        }
        return output;
    }
    getAllData(blockKey = this.defaultComputationBlockKey) {
        const output = [];
        if (blockKey) {
            this.getAllKeys(blockKey)?.forEach(key => output.push(this.getData(key, blockKey)));
        }
        else {
            for (const curBlockKey of this.dataMap.keys()) {
                this.getAllKeys(curBlockKey)?.forEach(key => output.push(this.getData(key, curBlockKey)));
            }
        }
        return output;
    }
    getHandler(key) {
        return this.handlers.get(key);
    }
    addHandler(key, handler) {
        this.handlers.set(key, handler);
    }
}
__decorate([
    auto()
], TurboModel.prototype, "enabledCallbacks", null);

class TurboView {
    element;
    model;
    emitter;
    constructor(properties) {
        this.element = properties.element;
        this.emitter = properties.emitter;
        this.model = properties.model;
    }
    initialize() {
        this.setupChangedCallbacks();
        this.setupUIElements();
        this.setupUILayout();
        this.setupUIListeners();
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

/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 * @template ViewType - TurboView
 * @template DataType - object
 * @template ModelType - TurboModel<DataType>
 */
class TurboElement extends HTMLElement {
    //STATIC CONFIG
    /**
     * @description Static configuration object.
     */
    static config = { shadowDOM: false, defaultSelectedClass: "selected" };
    mvc;
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
    //ELEMENT
    constructor(properties = {}) {
        super();
        if (this.getPropertiesValue(properties.shadowDOM, "shadowDOM"))
            this.attachShadow({ mode: "open" });
        this.setProperties(properties, true);
        this.mvc = new MvcHandler({ ...properties, element: this });
    }
    connectedCallback() {
    }
    disconnectedCallback() {
    }
    adoptedCallback() {
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (!newValue || newValue == oldValue)
            return;
        this[kebabToCamelCase(name)] = parse(newValue);
    }
    initializeUI() {
        this.setupChangedCallbacks();
        this.setupUIElements();
        this.setupUILayout();
        this.setupUIListeners();
    }
    setupChangedCallbacks() {
    }
    setupUIElements() {
    }
    setupUILayout() {
    }
    setupUIListeners() {
    }
    /**
     * @description Whether the element is selected or not. Setting it will accordingly toggle the "selected" CSS
     * class on the element and update the UI.
     */
    set selected(value) {
        const selectedClass = this.getPropertiesValue(null, "defaultSelectedClass", "selected");
        this.toggleClass(selectedClass, value);
    }
    get view() {
        return this.mvc.view;
    }
    set view(view) {
        this.mvc.view = view;
    }
    get model() {
        return this.mvc.model;
    }
    set model(model) {
        this.mvc.model = model;
    }
    get data() {
        return this.mvc.data;
    }
    set data(data) {
        this.mvc.data = data;
    }
    get dataId() {
        return this.mvc.dataId;
    }
    set dataId(value) {
        this.mvc.dataId = value;
    }
    get dataIndex() {
        return this.mvc.dataIndex;
    }
    set dataIndex(value) {
        this.mvc.dataIndex = value;
    }
    get dataSize() {
        return this.mvc.dataSize;
    }
    getPropertiesValue(propertiesValue, configFieldName, defaultValue) {
        if (propertiesValue !== undefined && propertiesValue !== null)
            return propertiesValue;
        const configValue = this.constructor.config[configFieldName];
        if (configValue !== undefined && configValue !== null)
            return configValue;
        return defaultValue;
    }
}
__decorate([
    auto()
], TurboElement.prototype, "selected", null);

/**
 * @class TurboProxiedElement
 * @description TurboProxiedElement class, similar to TurboElement but containing an HTML element instead of being one.
 * @template ViewType - TurboView
 * @template DataType - object
 * @template ModelType - TurboModel<DataType>
 */
class TurboProxiedElement {
    //STATIC CONFIG
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
    //ELEMENT
    element;
    mvc;
    constructor(properties = {}) {
        this.element = blindElement(properties);
        if (this.getPropertiesValue(properties.shadowDOM, "shadowDOM"))
            this.element.attachShadow({ mode: "open" });
        this.mvc = new MvcHandler({ ...properties, element: this });
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (!newValue || newValue == oldValue)
            return;
        this[kebabToCamelCase(name)] = parse(newValue);
    }
    initializeUI() {
        this.setupChangedCallbacks();
        this.setupUIElements();
        this.setupUILayout();
        this.setupUIListeners();
    }
    setupChangedCallbacks() {
    }
    setupUIElements() {
    }
    setupUILayout() {
    }
    setupUIListeners() {
    }
    /**
     * @description Whether the element is selected or not. Setting it will accordingly toggle the "selected" CSS
     * class on the element and update the UI.
     */
    set selected(value) {
        const selectedClass = this.getPropertiesValue(null, "defaultSelectedClass", "selected");
        this.element.toggleClass(selectedClass, value);
    }
    get view() {
        return this.mvc.view;
    }
    set view(view) {
        this.mvc.view = view;
    }
    get model() {
        return this.mvc.model;
    }
    set model(model) {
        this.mvc.model = model;
    }
    get data() {
        return this.mvc.data;
    }
    set data(data) {
        this.mvc.data = data;
    }
    get dataId() {
        return this.mvc.dataId;
    }
    set dataId(value) {
        this.mvc.dataId = value;
    }
    get dataIndex() {
        return this.mvc.dataIndex;
    }
    set dataIndex(value) {
        this.mvc.dataIndex = value;
    }
    get dataSize() {
        return this.mvc.dataSize;
    }
    getPropertiesValue(propertiesValue, configFieldName, defaultValue) {
        if (propertiesValue !== undefined && propertiesValue !== null)
            return propertiesValue;
        const configValue = this.constructor.config[configFieldName];
        if (configValue !== undefined && configValue !== null)
            return configValue;
        return defaultValue;
    }
}
__decorate([
    auto()
], TurboProxiedElement.prototype, "selected", null);

function updateChainingPropertiesInElementPrototype() {
    const originalSetAttribute = Element.prototype.setAttribute;
    const originalRemoveAttribute = Element.prototype.removeAttribute;
    const originalBlur = HTMLElement.prototype.blur;
    const originalFocus = HTMLElement.prototype.focus;
    /**
     * @description Execute a callback on the node while still benefiting from chaining.
     * @param {(el: this) => void} callback The function to execute, with 1 parameter representing the instance itself.
     * @returns {this} Itself, allowing for method chaining.
     */
    Node.prototype.execute = function _execute(callback) {
        callback(this);
        return this;
    };
    /**
     * @description Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | number | boolean} [value] The value of the attribute. Can be left blank to represent a
     * true boolean.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.setAttribute = function _setAttribute(name, value) {
        originalSetAttribute.call(this, name, value?.toString() || "true");
        return this;
    };
    /**
     * @description Removes an attribute from the underlying element.
     * @param {string} name The name of the attribute to remove.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.removeAttribute = function _removeAttribute(name) {
        originalRemoveAttribute.call(this, name);
        return this;
    };
    /**
     * @description Causes the element to lose focus.
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.blur = function _blur() {
        originalBlur.call(this);
        return this;
    };
    /**
     * @description Sets focus on the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.focus = function _focus() {
        originalFocus.call(this);
        return this;
    };
}

function addChildManipulationToElementPrototype() {
    const originalRemoveChild = Node.prototype.removeChild;
    const originalRemove = Element.prototype.remove;
    const originalClosest = Element.prototype.closest;
    //Readonly fields
    /**
     * @description The child handler object associated with the node. It is the node itself (if it is handling
     * its children) or its shadow root (if defined). Set it to change the node where the children are added/removed/
     * queried from when manipulating the node's children.
     */
    Object.defineProperty(Node.prototype, "childHandler", {
        set: function (value) {
            this["__childHandler__"] = value;
        },
        get: function () {
            if (this["__childHandler__"])
                return this["__childHandler__"];
            if (this instanceof Element && this.shadowRoot)
                return this.shadowRoot;
            return this;
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Static array of all the child nodes of the node.
     */
    Object.defineProperty(Node.prototype, "childNodesArray", {
        get: function () {
            return Array.from(this.childHandler.childNodes);
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Static array of all the child elements of the node.
     */
    Object.defineProperty(Node.prototype, "childrenArray", {
        get: function () {
            return this.childNodesArray.filter((node) => node.nodeType === 1);
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Static array of all the sibling nodes (including the node itself) of the node.
     */
    Object.defineProperty(Node.prototype, "siblingNodes", {
        get: function () {
            return this.parentNode?.childNodesArray || [];
        },
        configurable: false,
        enumerable: true
    });
    /**
     * @description Static array of all the sibling elements (including the element itself, if it is one) of the node.
     */
    Object.defineProperty(Node.prototype, "siblings", {
        get: function () {
            return this.parentElement?.childrenArray;
        },
        configurable: false,
        enumerable: true
    });
    //Self manipulation
    Node.prototype.bringToFront = function _bringToFront() {
        this.parentNode?.addChild(this);
        return this;
    };
    Node.prototype.sendToBack = function _sendToBack() {
        this.parentNode?.addChild(this, 0);
        return this;
    };
    /**
     * @description Removes the node from the document.
     * @returns {this} Itself, allowing for method chaining.
     */
    Node.prototype.remove = function _remove() {
        this.parentNode?.removeChild(this);
        return this;
    };
    /**
     * @description Removes the element from the document.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.remove = function _remove() {
        originalRemove.call(this);
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
    Node.prototype.addChild = function _addChild(children, index, referenceList = this.childrenArray) {
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
                    this.childHandler.appendChild(child);
                    if (child["__outName"] && !this[child["__outName"]])
                        this[child["__outName"]] = child;
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
    Node.prototype.removeChild = function _removeChild(children) {
        if (!this || !children)
            return this;
        // Try to remove every provided child (according to its type)
        try {
            if (!Array.isArray(children))
                children = [children];
            children.forEach(child => {
                if (!child)
                    return;
                originalRemoveChild.call(this.childHandler, child);
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
    Node.prototype.addChildBefore = function _addChildBefore(children, sibling) {
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
    Node.prototype.removeChildAt = function _removeChildAt(index, count = 1, referenceList = this.childrenArray) {
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
    Node.prototype.removeAllChildren = function _removeAllChildren(referenceList = this.childrenArray) {
        if (!this)
            return this;
        try {
            for (let i = 0; i < referenceList.length; i++) {
                this.removeChild(referenceList[i]);
            }
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
    Node.prototype.childAt = function _childAt(index, referenceList = this.childrenArray) {
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
    Node.prototype.indexOfChild = function _indexOfChild(child, referenceList = this.childrenArray) {
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
    Node.prototype.hasChild = function _hasChild(children) {
        if (!this || !children)
            return false;
        const nodesArray = Array.from(this.childNodes);
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
    Element.prototype.closest = function _closest(type) {
        if (!this || !type)
            return null;
        if (typeof type === "string") {
            return originalClosest.call(this, type);
        }
        else if (typeof type === "function") {
            let element = this;
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
    Node.prototype.findInParents = function _findInParents(parents) {
        if (!parents)
            return false;
        if (parents instanceof Node)
            parents = [parents];
        let element = this;
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
    Node.prototype.findInSubTree = function _findInSubTree(children) {
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
        recur(this);
        return count >= children.length;
    };
    /**
     * @description Finds whether one or more children belong to this node.
     * @param {Node[]} [referenceList=this.siblings] - The siblings list to use as computation
     * reference for index placement. Defaults to the node's `siblings`.
     * @returns {boolean} True if the children belong to the node, false otherwise.
     */
    Node.prototype.indexInParent = function _indexInParent(referenceList = this.siblings) {
        if (!referenceList)
            return -1;
        return referenceList.indexOf(this);
    };
}

function addClassManipulationToElementPrototype() {
    /**
     * @description Utility function to operate on the provided classes
     * @param element
     * @param classes
     * @param callback
     */
    function operateOnClasses(element, classes, callback = (() => { })) {
        if (!element || !classes)
            return element;
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
        return element;
    }
    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.addClass = function _addClass(classes) {
        return operateOnClasses(this, classes, entry => this.classList.add(entry));
    };
    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.removeClass = function _removeClass(classes) {
        return operateOnClasses(this, classes, entry => this.classList.remove(entry));
    };
    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.toggleClass = function _toggleClass(classes, force) {
        return operateOnClasses(this, classes, entry => this.classList.toggle(entry, force));
    };
    /**
     * @description Check if the element's class list contains the provided class(es).
     * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings
     * @return A boolean indicating whether the provided classes are included
     */
    Element.prototype.hasClass = function _hasClass(classes) {
        if (!this || !classes)
            return false;
        if (typeof classes === "string")
            return this.classList.contains(classes);
        for (let entry of classes) {
            if (!this.classList.contains(entry))
                return false;
        }
        return true;
    };
}

function addElementManipulationToElementPrototype() {
    /**
     * Sets the declared properties to the element.
     * @param {TurboProperties<Tag>} [properties] - The properties object.
     * @param {boolean} [setOnlyBaseProperties=false] - If set to true, will only set the base turbo properties (classes,
     * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
     * @returns {this} Itself, allowing for method chaining.
     * @template Tag
     */
    Element.prototype.setProperties = function _setProperties(properties = {}, setOnlyBaseProperties = false) {
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
                    if (!(this instanceof HTMLElement))
                        return;
                    this.innerText = properties.text;
                    return;
                case "style":
                    if (!(this instanceof HTMLElement || this instanceof SVGElement))
                        return;
                    this.style.cssText += properties.style;
                    return;
                case "stylesheet":
                    stylesheet(properties.stylesheet, this.closestRoot);
                    return;
                case "id":
                    this.id = properties.id;
                    return;
                case "classes":
                    this.addClass(properties.classes);
                    return;
                case "listeners":
                    Object.keys(properties.listeners).forEach(listenerType => this.addListener(listenerType, properties.listeners[listenerType], this));
                    return;
                case "children":
                    this.addChild(properties.children);
                    return;
                case "parent":
                    if (!properties.parent)
                        return;
                    properties.parent.addChild(this);
                    return;
                default:
                    if (setOnlyBaseProperties)
                        return;
                    try {
                        this[property] = properties[property];
                    }
                    catch (e) {
                        console.error(e);
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
    Node.prototype.destroy = function _destroy() {
        this.removeAllListeners();
        this.remove();
        return this;
    };
}

function addListenerManipulationToElementPrototype() {
    /**
     * @description Initializes a `boundListeners` set in the Node prototype, that will hold all the element's bound
     * listeners.
     */
    Object.defineProperty(Node.prototype, "boundListeners", {
        value: new Set(),
        writable: false,
        configurable: true,
        enumerable: true
    });
    /**
     * @description Adds an event listener to the element.
     * @param {string} type - The type of the event.
     * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function
     * or object that receives a notification.
     * @param {Node} [boundTo=this] - The element or node to which the listener is bound. Defaults to the element itself.
     * @param {boolean | AddEventListenerOptions} [options] - An options object that specifies characteristics about
     * the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    Node.prototype.addListener = function _addListener(type, listener, boundTo = this, options) {
        const wrappedListener = ((e) => {
            if (typeof listener === "object" && listener.handleEvent)
                listener.handleEvent(e);
            if (typeof listener === "function")
                listener(e, this);
        });
        boundTo.boundListeners.add({
            target: this,
            type: type,
            originalListener: listener,
            listener: wrappedListener,
            options: options
        });
        this.addEventListener(type, wrappedListener, options);
        return this;
    };
    /**
     * @description Removes an event listener that is bound to the element (in its boundListeners list).
     * @param {string} type - The type of the event.
     * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function
     * or object that receives a notification.
     * @param {boolean | EventListenerOptions} [options] - An options object that specifies characteristics about the
     * event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    Node.prototype.removeListener = function _removeListener(type, listener, options) {
        for (let entry of this.boundListeners) {
            if (entry.type === type && entry.originalListener === listener && entry.options === options) {
                entry.target.removeEventListener(type, entry.listener, options);
                this.boundListeners.delete(entry);
                break;
            }
        }
        return this;
    };
    /**
     * @description Removes all event listeners bound to the element (in its boundListeners list) assigned to the
     * specified type.
     * @param {string} type - The type of the event.
     * @returns {this} Itself, allowing for method chaining.
     */
    Node.prototype.removeListenersByType = function _removeListenersByType(type) {
        for (let entry of this.boundListeners) {
            if (entry.type === type) {
                this.removeEventListener(type, entry.listener, entry.options);
                this.boundListeners.delete(entry);
            }
        }
        return this;
    };
    /**
     * @description Removes all event listeners bound to the element (in its boundListeners list).
     * @returns {this} Itself, allowing for method chaining.
     */
    Node.prototype.removeAllListeners = function _removeListeners() {
        for (let entry of this.boundListeners) {
            this.removeEventListener(entry.type, entry.listener, entry.options);
            this.boundListeners.delete(entry);
        }
        return this;
    };
}

function addStylesManipulationToElementPrototype() {
    /**
     * @description The closest root to the element in the document (the closest ShadowRoot, or the document's head).
     */
    Object.defineProperty(Node.prototype, "closestRoot", {
        get: function () {
            let node = this;
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
    Node.prototype.setStyle = function _setStyle(attribute, value, instant = false) {
        if (!attribute || value == undefined)
            return this;
        if (!(this instanceof HTMLElement) && !(this instanceof SVGElement))
            return this;
        if (!this.pendingStyles)
            this.pendingStyles = {};
        if (instant)
            this.style[attribute] = value.toString();
        else
            this.pendingStyles[attribute] = value.toString();
        if (!instant)
            this.applyStyles();
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
    Node.prototype.appendStyle = function _appendStyle(attribute, value, separator = ", ", instant = false) {
        if (!attribute || value == undefined)
            return this;
        if (!(this instanceof HTMLElement) && !(this instanceof SVGElement))
            return this;
        if (!this.pendingStyles)
            this.pendingStyles = {};
        const currentStyle = (this.style[attribute] || "");
        separator = currentStyle.length > 0 ? separator : "";
        if (instant)
            this.style[attribute] = currentStyle + separator + value;
        else
            this.pendingStyles[attribute] = currentStyle + separator + value;
        if (!instant)
            this.applyStyles();
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
    Node.prototype.setStyles = function _setStyles(styles, instant = false) {
        if (!styles || typeof styles == "number")
            return this;
        if (!(this instanceof HTMLElement) && !(this instanceof SVGElement))
            return this;
        if (!this.pendingStyles)
            this.pendingStyles = {};
        if (typeof styles == "string")
            styles.split(";").forEach(entry => {
                const [property, value] = entry.split(":").map(part => part.trim());
                if (!property || !value)
                    return;
                if (instant)
                    this.style[property] = value;
                else
                    this.pendingStyles[property] = value;
            });
        else
            for (const [property, value] of Object.entries(styles)) {
                if (instant)
                    this.style[property] = value.toString();
                else
                    this.pendingStyles[property] = value.toString();
            }
        if (!instant)
            this.applyStyles();
        return this;
    };
    /**
     * @description Apply the pending styles to the element.
     */
    Node.prototype.applyStyles = function _applyStyles() {
        if (!(this instanceof HTMLElement) && !(this instanceof SVGElement))
            return;
        requestAnimationFrame(() => {
            for (const property in this.pendingStyles) {
                if (property == "cssText")
                    this.style.cssText += ";" + this.pendingStyles["cssText"];
                else
                    this.style[property] = this.pendingStyles[property];
            }
            this.pendingStyles = {};
        });
    };
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
        this.attachedNode.setStyle("transition", "", true);
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
     * @description The enabled state of the reifect (as a {@link ReifectEnabledState}). Setting it to a boolean will
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
            for (const [key, state] of Object.entries(value)) {
                this._enabled[key] = state;
            }
    }
    getEnabledState(reifect) {
        return reifect.getEnabledState(this.attachedNode);
    }
    setEnabledState(reifect, value) {
        reifect.setEnabledState(this.attachedNode, value);
    }
}

function isNull(value) {
    return value == null && value != undefined;
}
function isUndefined(value) {
    return typeof value == "undefined";
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
class StatefulReifect {
    //List of attached objects
    attachedObjects;
    _states;
    _enabled;
    values;
    /**
     * @description Creates an instance of StatefulReifier.
     * @param {StatefulReifectProperties<State, ClassType>} properties - The configuration properties.
     */
    constructor(properties) {
        this.attachedObjects = [];
        if (properties.attachedObjects)
            this.attachAll(...properties.attachedObjects);
        //Initializing enabled state
        this._enabled = {
            global: true, properties: true, classes: true, styles: true,
            replaceWith: true, transition: true
        };
        this.values = {
            properties: properties.properties || {},
            classes: properties.classes || {},
            styles: properties.styles || {},
            replaceWith: properties.replaceWith || {},
            transitionProperties: properties.transitionProperties || ["all"],
            transitionDuration: properties.transitionDuration || 0,
            transitionTimingFunction: properties.transitionTimingFunction || "linear",
            transitionDelay: properties.transitionDelay || 0,
        };
        //Disable transition if undefined
        if (!properties.transitionProperties && !properties.transitionDuration
            && !properties.transitionTimingFunction && !properties.transitionDelay)
            this.enabled.transition = false;
        this.states = properties.states;
    }
    //Attached objects management
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
    /**
     * @function getEnabledState
     * @description Returns the `enabled` value corresponding to the provided object for this reifier.
     * @param {ClassType} object - The object to get the state of.
     * @returns {ReifectEnabledState} - The corresponding enabled state.
     */
    getEnabledState(object) {
        return this.getData(object)?.enabled;
    }
    /**
     * @function setEnabledState
     * @description Sets/updates the `enabled` value corresponding to the provided object for this reifier.
     * @param {ClassType} object - The object to set the state of.
     * @param {boolean | ReifectEnabledState} value - The value to set/update with. Setting it to a boolean will
     * accordingly update the value of `enabled.global`.
     */
    setEnabledState(object, value) {
        const data = this.getData(object);
        if (!data)
            return;
        if (typeof value == "boolean")
            data.enabled.global = value;
        else if (!value)
            return;
        else
            for (const [key, state] of Object.entries(value)) {
                data.enabled[key] = state;
            }
    }
    //Getters and setters
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
     * @description The enabled state of the reifier (as a {@link ReifectEnabledState}). Setting it to a boolean will
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
            for (const [key, state] of Object.entries(value)) {
                this._enabled[key] = state;
            }
    }
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
    get properties() {
        return this.values.properties;
    }
    set properties(value) {
        this.values.properties = value;
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
    get styles() {
        return this.values.styles;
    }
    set styles(value) {
        this.values.styles = value;
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
    get classes() {
        return this.values.classes;
    }
    set classes(value) {
        this.values.classes = value;
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
    get replaceWith() {
        return this.values.replaceWith;
    }
    set replaceWith(value) {
        this.values.replaceWith = value;
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
    get transitionProperties() {
        return this.values.transitionProperties;
    }
    set transitionProperties(value) {
        this.values.transitionProperties = value;
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
    get transitionDuration() {
        return this.values.transitionDuration;
    }
    set transitionDuration(value) {
        this.values.transitionDuration = value;
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
    get transitionTimingFunction() {
        return this.values.transitionTimingFunction;
    }
    set transitionTimingFunction(value) {
        this.values.transitionTimingFunction = value;
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
    get transitionDelay() {
        return this.values.transitionDelay;
    }
    set transitionDelay(value) {
        this.values.transitionDelay = value;
    }
    //Usage methods
    initialize(state, objects, options) {
        if (!this.enabled.global)
            return;
        state = this.parseState(state);
        options = this.initializeOptions(options, objects);
        this.getEnabledObjectsData(objects, options).forEach(data => {
            if (options.recomputeProperties || !data.resolvedValues)
                this.processRawProperties(data, options.propertiesOverride);
            data.lastState = state;
            this.applyResolvedValues(data, data.lastState, true, options?.applyStylesInstantly);
            if (data.onSwitch)
                data.onSwitch(state, data.objectIndex, data.totalObjectCount, this.getObject(data));
        });
    }
    apply(state, objects, options) {
        if (!this.enabled.global)
            return;
        state = this.parseState(state);
        options = this.initializeOptions(options, objects);
        this.getEnabledObjectsData(objects, options).forEach(data => {
            if (options.recomputeProperties || !data.resolvedValues)
                this.processRawProperties(data, options.propertiesOverride);
            data.lastState = state;
            const handler = data.object.deref()?.reifects;
            if (handler)
                handler.reloadTransitions();
            this.applyResolvedValues(data, data.lastState, false, options?.applyStylesInstantly);
            if (data.onSwitch)
                data.onSwitch(state, data.objectIndex, data.totalObjectCount, this.getObject(data));
        });
    }
    toggle(objects, options) {
        if (!this.enabled.global)
            return;
        if (!objects)
            objects = [];
        else if (objects instanceof HTMLCollection)
            objects = [...objects];
        else if (!Array.isArray(objects))
            objects = [objects];
        const previousState = this.getData(objects[0])?.lastState;
        const nextStateIndex = mod(previousState != undefined
            ? this.states.indexOf(previousState) + 1 : 0, this.states.length);
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
        if (!this.enabled.global)
            return this;
        const data = this.getData(object);
        if (!data || !data.enabled || !data.enabled.global)
            return this;
        this.applyResolvedValues(data, data.lastState);
        return this;
    }
    reloadTransitionFor(object) {
        if (!this.enabled.global)
            return this;
        const data = this.getData(object);
        if (!data || !data.enabled || !data.enabled.global)
            return this;
        if (this.enabled.transition && data.enabled.transition)
            this.applyTransition(data, data.lastState);
        return this;
    }
    getEnabledObjectsData(objects, options) {
        if (!this.enabled.global) {
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
            if (!data.resolvedValues.styles[state])
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
    //Property setting methods
    applyResolvedValues(data, state = data.lastState, skipTransition = false, applyStylesInstantly = false) {
        if (this.enabled.transition && data.enabled.transition && !skipTransition)
            this.applyTransition(data, state);
        if (this.enabled.replaceWith && data.enabled.replaceWith)
            this.replaceObject(data, state);
        if (this.enabled.properties && data.enabled.properties)
            this.setProperties(data, state);
        if (this.enabled.classes && data.enabled.classes)
            this.applyClasses(data, state);
        if (this.enabled.styles && data.enabled.styles)
            this.applyStyles(data, state, applyStylesInstantly);
    }
    replaceObject(data, state = data.lastState) {
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
    setProperties(data, state = data.lastState) {
        const properties = data.resolvedValues.properties[state];
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
                console.log(value);
                console.error(`Unable to set property ${field} to ${value}: ${e.message}`);
            }
        }
    }
    applyClasses(data, state = data.lastState) {
        const classes = data.resolvedValues.classes;
        if (!classes)
            return;
        const object = data.object.deref();
        if (!object || !(object instanceof Element))
            return;
        for (const [key, value] of Object.entries(classes)) {
            object.toggleClass(value, state == key);
        }
    }
    applyStyles(data, state = data.lastState, applyStylesInstantly = false) {
        const object = data.object.deref();
        if (!object || !(object instanceof Element))
            return;
        object.setStyles(data.resolvedValues.styles[state], applyStylesInstantly);
    }
    applyTransition(data, state = data.lastState) {
        const object = data.object.deref();
        if (!object || !(object instanceof Element))
            return;
        object.appendStyle("transition", this.getTransitionString(data, state), ", ", true);
    }
    //General methods (to be overridden for custom functionalities)
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
    filterEnabledObjects(data) {
        if (!data.enabled || !data.enabled.global) {
            console.warn("The reified properties instance you are trying to set on an object is " +
                "disabled for this particular object.");
            return false;
        }
        return true;
    }
    //Utilities
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
            enabled: {
                global: true,
                properties: true,
                classes: true,
                styles: true,
                replaceWith: true,
                transition: true
            },
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
    /**
     * @protected
     * @function parseState
     * @description Parses a boolean into the corresponding state value.
     * @param {State | boolean} value - The value to parse.
     * @returns {State} The parsed value, or `null` if the boolean could not be parsed.
     */
    parseState(value) {
        if (typeof value != "boolean")
            return value;
        else
            for (const str of value ? ["true", "on", "in", "enabled", "shown"]
                : ["false", "off", "out", "disabled", "hidden"]) {
                if (!this.states.includes(str))
                    continue;
                return str;
            }
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
}
function statefulReifier(properties) {
    return new StatefulReifect(properties);
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

//TODO ADD CONFIG
function turbofy() {
    addClassManipulationToElementPrototype();
    addChildManipulationToElementPrototype();
    addListenerManipulationToElementPrototype();
    addElementManipulationToElementPrototype();
    addStylesManipulationToElementPrototype();
    updateChainingPropertiesInElementPrototype();
    addReifectManagementToNodePrototype();
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

const TurboKeyEventName = {
    keyPressed: "turbo-key-pressed",
    keyReleased: "turbo-key-released"
};
const TurboClickEventName = {
    click: "turbo-click",
    clickStart: "turbo-click-start",
    clickEnd: "turbo-click-end",
    longPress: "turbo-long-press"
};
const TurboMoveName = {
    move: "turbo-move"
};
const TurboDragEventName = {
    drag: "turbo-drag",
    dragStart: "turbo-drag-start",
    dragEnd: "turbo-drag-end"
};
const TurboWheelEventName = {
    trackpadScroll: "turbo-trackpad-scroll",
    trackpadPinch: "turbo-trackpad-pinch",
    mouseWheel: "turbo-mouse-wheel"
};
const TurboEventName = {
    ...TurboClickEventName,
    ...TurboKeyEventName,
    ...TurboMoveName,
    ...TurboDragEventName,
    ...TurboWheelEventName,
    selectInput: "turbo-select-input",
};
/**
 * @description Object containing the names of events fired by default by the turboComponents. Modifying it (prior to
 * setting up new turbo components) will subsequently alter the events that the instantiated components will listen for.
 */
const DefaultEventName = {
    keyPressed: "keydown",
    keyReleased: "keyup",
    click: "click",
    clickStart: "mousedown",
    clickEnd: "mouseup",
    longPress: TurboEventName.longPress,
    move: "mousemove",
    drag: TurboEventName.drag,
    dragStart: TurboEventName.dragStart,
    dragEnd: TurboEventName.dragEnd,
    wheel: "wheel",
    trackpadScroll: "wheel",
    trackpadPinch: "wheel",
    mouseWheel: "wheel",
    scroll: "scroll",
    input: "input",
    change: "change",
    focus: "focus",
    blur: "blur",
    resize: "resize"
};

var ClosestOrigin;
(function (ClosestOrigin) {
    ClosestOrigin["target"] = "target";
    ClosestOrigin["position"] = "position";
})(ClosestOrigin || (ClosestOrigin = {}));

/**
 * Generic turbo event
 */
class TurboEvent extends Event {
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
    constructor(position, clickMode, keys, eventName, authorizeScaling, scalePosition, eventInitDict) {
        super(eventName, { bubbles: true, cancelable: true, ...eventInitDict });
        this.authorizeScaling = authorizeScaling ?? true;
        this.scalePosition = scalePosition ?? ((position) => position);
        this.clickMode = clickMode;
        this.keys = keys;
        this.position = position;
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
        for (let element of elements) {
            while (element && !((element instanceof type)
                && (!strict || this.isPositionInsideElement(this.position, element))))
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
}
__decorate([
    cache()
], TurboEvent.prototype, "closest", null);
__decorate([
    cache()
], TurboEvent.prototype, "scaledPosition", null);

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
    abs() {
        return new Point(Math.abs(this.x), Math.abs(this.y));
    }
    /**
     * @description Get the maximum value between x and y coordinates
     * @returns The maximum value
     */
    max() {
        return Math.max(this.x, this.y);
    }
    /**
     * @description Get the minimum value between x and y coordinates
     * @returns The minimum value
     */
    min() {
        return Math.min(this.x, this.y);
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

/**
 * @class TurboDragEvent
 * @extends TurboEvent
 * @description Turbo drag event class, fired on turbo-drag, turbo-drag-start, turbo-drag-end, etc.
 */
class TurboDragEvent extends TurboEvent {
    /**
     * @description Map containing the origins of the dragging points
     */
    origins;
    /**
     * @description Map containing the previous positions of the dragging points
     */
    previousPositions;
    /**
     * @description Map containing the positions of the dragging points
     */
    positions;
    constructor(origins, previousPositions, positions, clickMode, keys, eventName = TurboEventName.drag, authorizeScaling, scalePosition, eventInitDict) {
        super(positions.first, clickMode, keys, eventName, authorizeScaling, scalePosition, { bubbles: true, cancelable: true, ...eventInitDict });
        this.origins = origins;
        this.previousPositions = previousPositions;
        this.positions = positions;
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
}
__decorate([
    cache()
], TurboDragEvent.prototype, "scaledOrigins", null);
__decorate([
    cache()
], TurboDragEvent.prototype, "scaledPreviousPositions", null);
__decorate([
    cache()
], TurboDragEvent.prototype, "scaledPositions", null);
__decorate([
    cache()
], TurboDragEvent.prototype, "deltaPositions", null);
__decorate([
    cache()
], TurboDragEvent.prototype, "deltaPosition", null);
__decorate([
    cache()
], TurboDragEvent.prototype, "scaledDeltaPositions", null);
__decorate([
    cache()
], TurboDragEvent.prototype, "scaledDeltaPosition", null);

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
    constructor(keyPressed, keyReleased, clickMode, keys, eventName = TurboEventName.keyPressed, authorizeScaling, scalePosition, eventInitDict) {
        super(null, clickMode, keys, eventName, authorizeScaling, scalePosition, { bubbles: true, cancelable: true, ...eventInitDict });
        this.keyPressed = keyPressed;
        this.keyReleased = keyReleased;
    }
}

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
    constructor(delta, keys, eventName, authorizeScaling, scalePosition, eventInitDict) {
        super(null, ClickMode.none, keys, eventName, authorizeScaling, scalePosition, { bubbles: true, cancelable: true, ...eventInitDict });
        this.delta = delta;
    }
}

function setupTurboEventManagerBypassing(eventManager) {
    HTMLElement.prototype.lockTurboEventManagerOn = (e) => false;
    const bypassManager = function (e) {
        const bypassingResult = this.lockTurboEventManagerOn(e);
        if (typeof bypassingResult == "boolean")
            eventManager.setLockState(this, {
                enabled: bypassingResult,
                preventDefaultWheel: bypassingResult,
                preventDefaultMouse: bypassingResult,
                preventDefaultTouch: bypassingResult
            });
        else
            eventManager.setLockState(this, {
                enabled: bypassingResult.enabled || false,
                preventDefaultWheel: bypassingResult.preventDefaultWheel || false,
                preventDefaultMouse: bypassingResult.preventDefaultMouse || false,
                preventDefaultTouch: bypassingResult.preventDefaultTouch || false,
            });
    };
    HTMLElement.prototype.bypassTurboEventManager = function _bypassTurboEventManager() {
        this.addListener("mousedown", (e) => bypassManager.call(this, e));
        this.addListener("touchstart", (e) => bypassManager.call(this, e));
        return this;
    };
    callOnce(HTMLElement.prototype, "bypassTurboEventManager");
}

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
 * @description Class that manages default mouse, trackpad, and touch events, and accordingly fires custom events for
 * easier management of input.
 */
let TurboEventManager = class TurboEventManager extends TurboElement {
    _inputDevice = InputDevice.unknown;
    //Delegate fired when the input device changes
    onInputDeviceChange;
    //Manager states
    defaultState = {};
    lockState = {};
    disabledEventTypes = {};
    //Input events states
    currentKeys = [];
    currentAction = ActionMode.none;
    currentClick = ClickMode.none;
    wasRecentlyTrackpad = false;
    //Saved values (Maps to account for different touch points and their IDs)
    origins;
    previousPositions;
    positions;
    lastTargetOrigin;
    //Single timer instance --> easily cancel it and set it again
    timerMap;
    //Threshold differentiating a click from a drag
    moveThreshold;
    //Duration to reach long press
    longPressDuration;
    authorizeEventScaling;
    scaleEventPosition;
    constructor(properties = {}) {
        super({ parent: document.body });
        this.onInputDeviceChange = new Delegate();
        this.authorizeEventScaling = properties.authorizeEventScaling;
        this.scaleEventPosition = properties.scaleEventPosition;
        this.defaultState = {
            enabled: properties.enabled ?? true,
            preventDefaultWheel: properties.preventDefaultWheel ?? true,
            preventDefaultMouse: properties.preventDefaultMouse ?? true,
            preventDefaultTouch: properties.preventDefaultTouch ?? true,
        };
        this.resetLockState();
        this.disabledEventTypes = { ...properties };
        this.moveThreshold = properties.moveThreshold || 10;
        this.longPressDuration = properties.longPressDuration || 500;
        //Init positions
        this.origins = new TurboMap();
        this.previousPositions = new TurboMap();
        this.timerMap = new TurboMap();
        for (let eventName in TurboEventName) {
            DefaultEventName[eventName] = TurboEventName[eventName];
        }
        this.initEvents();
        setupTurboEventManagerBypassing(this);
    }
    initEvents() {
        try {
            if (!this.disabledEventTypes.disableKeyEvents) {
                document.addListener("keydown", this.keyDown);
                document.addListener("keyup", this.keyUp);
                this.applyEventNames(TurboKeyEventName);
            }
            if (!this.disabledEventTypes.disableWheelEvents) {
                document.body.addListener("wheel", this.wheel, this, { passive: false });
                this.applyEventNames(TurboWheelEventName);
            }
            if (!this.disabledEventTypes.disableMoveEvent) {
                this.applyEventNames(TurboMoveName);
            }
            if (!this.disabledEventTypes.disableMouseEvents) {
                document.body.addListener("mousedown", this.pointerDown);
                document.body.addListener("mousemove", this.pointerMove);
                document.body.addListener("mouseup", this.pointerUp);
                document.body.addListener("mouseleave", this.pointerLeave);
            }
            if (!this.disabledEventTypes.disableTouchEvents) {
                document.body.addListener("touchstart", this.pointerDown, this, { passive: false });
                document.body.addListener("touchmove", this.pointerMove, this, { passive: false });
                document.body.addListener("touchend", this.pointerUp, this, { passive: false });
                document.body.addListener("touchcancel", this.pointerUp, this, { passive: false });
            }
            if (!this.disabledEventTypes.disableMouseEvents || !this.disabledEventTypes.disableTouchEvents) {
                if (!this.disabledEventTypes.disableClickEvents)
                    this.applyEventNames(TurboClickEventName);
                if (!this.disabledEventTypes.disableDragEvents)
                    this.applyEventNames(TurboDragEventName);
            }
        }
        catch (error) {
            console.error("Error initializing events: ", error);
        }
    }
    /**
     * @description The currently identified input device. It is not 100% accurate, especially when differentiating
     * between mouse and trackpad.
     */
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
    /**
     * @description Sets the lock state for the event manager.
     * @param origin - The element that initiated the lock state.
     * @param value - The state properties to set.
     */
    setLockState(origin, value) {
        this.lockState.lockOrigin = origin;
        for (const key in value)
            this.lockState[key] = value[key];
    }
    /**
     * @description Resets the lock state to the default values.
     */
    resetLockState() {
        this.lockState.enabled = this.defaultState.enabled;
        this.lockState.preventDefaultWheel = this.defaultState.preventDefaultWheel;
        this.lockState.preventDefaultMouse = this.defaultState.preventDefaultMouse;
        this.lockState.preventDefaultTouch = this.defaultState.preventDefaultTouch;
        this.lockState.lockOrigin = document.body;
    }
    get enabled() {
        return this.defaultState.enabled && this.lockState.enabled;
    }
    get preventDefaultWheel() {
        return this.defaultState.preventDefaultWheel && this.lockState.preventDefaultWheel;
    }
    get preventDefaultMouse() {
        return this.defaultState.preventDefaultMouse && this.lockState.preventDefaultMouse;
    }
    get preventDefaultTouch() {
        return this.defaultState.preventDefaultTouch && this.lockState.preventDefaultTouch;
    }
    //Key Events
    keyDown = (e) => {
        if (!this.enabled)
            return;
        //Return if key already pressed
        if (this.currentKeys.includes(e.key))
            return;
        //Add key to currentKeys
        this.currentKeys.push(e.key);
        //Fire a keyPressed event (only once)
        document.dispatchEvent(new TurboKeyEvent(e.key, null, this.currentClick, this.currentKeys, TurboEventName.keyPressed, this.authorizeEventScaling, this.scaleEventPosition));
    };
    keyUp = (e) => {
        if (!this.enabled)
            return;
        //Return if key not pressed
        if (!this.currentKeys.includes(e.key))
            return;
        //Remove key from currentKeys
        this.currentKeys.splice(this.currentKeys.indexOf(e.key), 1);
        //Fire a keyReleased event
        document.dispatchEvent(new TurboKeyEvent(null, e.key, this.currentClick, this.currentKeys, TurboEventName.keyReleased, this.authorizeEventScaling, this.scaleEventPosition));
    };
    //Wheel Event
    wheel = (e) => {
        if (!this.enabled)
            return;
        //Prevent default scroll behavior
        if (this.preventDefaultWheel)
            e.preventDefault();
        //Most likely trackpad
        if (Math.abs(e.deltaY) <= 40 || e.deltaX != 0)
            this.inputDevice = InputDevice.trackpad;
        //Set input device to mouse if it wasn't trackpad recently
        if (!this.wasRecentlyTrackpad)
            this.inputDevice = InputDevice.mouse;
        //Reset trackpad timer
        this.clearTimer("recentlyTrackpadTimer");
        //Set timer to clear recently trackpad boolean after a delay
        this.setTimer("recentlyTrackpadTimer", () => {
            if (this.inputDevice == InputDevice.trackpad)
                this.wasRecentlyTrackpad = false;
        }, 800);
        //Get name of event according to input type
        let eventName;
        //Trackpad pinching (for some reason Ctrl key is marked as pressed in the WheelEvent)
        if (this.inputDevice == InputDevice.trackpad && e.ctrlKey)
            eventName = TurboEventName.trackpadPinch;
        //Trackpad zooming
        else if (this.inputDevice == InputDevice.trackpad)
            eventName = TurboEventName.trackpadScroll;
        //Mouse scrolling
        else
            eventName = TurboEventName.mouseWheel;
        document.dispatchEvent(new TurboWheelEvent(new Point(e.deltaX, e.deltaY), this.currentKeys, eventName, this.authorizeEventScaling, this.scaleEventPosition));
    };
    //Mouse and Touch Events
    pointerDown = (e) => {
        if (!e.composedPath().includes(this.lockState.lockOrigin)) {
            document.activeElement?.blur();
            this.resetLockState();
        }
        if (!this.enabled)
            return;
        //Check if it's touch
        const isTouch = e instanceof TouchEvent;
        //Prevent default actions (especially useful for touch events on iOS and iPadOS)
        if (this.preventDefaultMouse && !isTouch)
            e.preventDefault();
        if (this.preventDefaultTouch && isTouch)
            e.preventDefault();
        //Update the input device
        if (isTouch)
            this.inputDevice = InputDevice.touch;
        else if (this.inputDevice == InputDevice.unknown || this.inputDevice == InputDevice.touch)
            this.inputDevice = InputDevice.mouse;
        //Touch start initialization
        if (isTouch) {
            //Loop on all changed touch points (new ones) and initialize them
            Array.from(e.changedTouches).forEach(touchPoint => {
                const position = new Point(touchPoint);
                this.origins.set(touchPoint.identifier, position);
                this.previousPositions.set(touchPoint.identifier, position);
            });
            //Update click mode according to number of current touch points
            this.setClickMode(e.touches.length, true);
        }
        //Mouse down initialization
        else {
            //Initialize origin and previous position
            const position = new Point(e);
            this.origins.set(0, position);
            this.previousPositions.set(0, position);
            //Update click mode
            this.setClickMode(e.button);
        }
        //Return if click events are disabled
        if (this.disabledEventTypes.disableClickEvents)
            return;
        //Fire click start
        this.fireClick(this.origins.first, TurboEventName.clickStart);
        this.currentAction = ActionMode.click;
        //Set long press timer
        this.setTimer(TurboEventName.longPress, () => {
            if (this.currentAction != ActionMode.click)
                return;
            //Turn a click into long press
            this.currentAction = ActionMode.longPress;
            //Fire long press
            this.fireClick(this.origins.first, TurboEventName.longPress);
        }, this.longPressDuration);
    };
    pointerMove = (e) => {
        if (!this.enabled)
            return;
        if (this.disabledEventTypes.disableMoveEvent && this.disabledEventTypes.disableDragEvents)
            return;
        //Check if is touch
        const isTouch = e instanceof TouchEvent;
        //Prevent default actions
        if (this.preventDefaultMouse && !isTouch)
            e.preventDefault();
        if (this.preventDefaultTouch && isTouch)
            e.preventDefault();
        //Initialize a new positions map
        this.positions = new TurboMap();
        //Get current position(s) for touch (or mouse)
        if (isTouch) {
            Array.from(e.touches).forEach(touchPoint => this.positions.set(touchPoint.identifier, new Point(touchPoint)));
        }
        else {
            this.positions.set(0, new Point(e.clientX, e.clientY));
        }
        //Clear cached target origin if not dragging
        if (this.currentAction != ActionMode.drag)
            this.lastTargetOrigin = null;
        //Fire move event if enabled
        if (!this.disabledEventTypes.disableMoveEvent)
            this.fireDrag(this.positions, TurboEventName.move);
        //If drag events are enabled and user is interacting
        if (this.currentAction != ActionMode.none && !this.disabledEventTypes.disableDragEvents) {
            //Initialize drag
            if (this.currentAction != ActionMode.drag) {
                //Loop on saved origins points and check if any point's distance from its origin is greater than the threshold
                if (!Array.from(this.origins.entries()).some(([key, origin]) => {
                    const position = this.positions.get(key);
                    return position && Point.dist(position, origin) > this.moveThreshold;
                }))
                    return;
                //If didn't return --> fire drag start and set action to drag
                clearCache(this);
                this.fireDrag(this.origins, TurboEventName.dragStart);
                this.currentAction = ActionMode.drag;
            }
            //Fire drag and update previous points
            this.fireDrag(this.positions);
        }
        //Update previous positions
        this.positions.forEach((position, key) => this.previousPositions.set(key, position));
    };
    pointerUp = (e) => {
        if (!this.enabled)
            return;
        //Check if is touch
        const isTouch = e instanceof TouchEvent;
        //Prevent default actions
        if (this.preventDefaultMouse && !isTouch)
            e.preventDefault();
        if (this.preventDefaultTouch && isTouch)
            e.preventDefault();
        //Clear any timer set
        this.clearTimer(TurboEventName.longPress);
        //Initialize a new positions map
        this.positions = new TurboMap();
        //Get current position(s) for touch (or mouse)
        if (isTouch) {
            Array.from(e.changedTouches).forEach(touchPoint => {
                this.positions.set(touchPoint.identifier, new Point(touchPoint));
            });
        }
        else {
            this.positions.set(0, new Point(e));
        }
        //If action was drag --> fire drag end
        if (this.currentAction == ActionMode.drag && !this.disabledEventTypes.disableDragEvents)
            this.fireDrag(this.positions, TurboEventName.dragEnd);
        //If click events are enabled
        if (!this.disabledEventTypes.disableClickEvents) {
            //If action is click --> fire click
            if (this.currentAction == ActionMode.click) {
                this.fireClick(this.positions.first, TurboEventName.click);
            }
            //Fire click end
            this.fireClick(this.origins.first, TurboEventName.clickEnd);
        }
        //Clear saved positions (or removed lifted touch points)
        if (isTouch) {
            Array.from(e.changedTouches).forEach(touchPoint => {
                this.origins.delete(touchPoint.identifier);
                this.previousPositions.delete(touchPoint.identifier);
            });
        }
        else {
            this.origins.clear();
            this.previousPositions.clear();
        }
        //Reset click mode and action
        this.currentAction = ActionMode.none;
        this.currentClick = ClickMode.none;
    };
    pointerLeave = () => {
        if (!this.enabled)
            return;
        if (this.currentAction == ActionMode.none)
            return;
        //Clear any timer set
        this.clearTimer(TurboEventName.longPress);
        //If not drag --> fire click end
        if (this.currentAction != ActionMode.drag) {
            this.fireClick(this.origins.first, TurboEventName.clickEnd);
            this.currentAction = ActionMode.none;
        }
    };
    getFireOrigin(positions, reload = false) {
        if (!this.lastTargetOrigin || reload) {
            const origin = this.origins.first ? this.origins.first : positions.first;
            this.lastTargetOrigin = document.elementFromPoint(origin.x, origin.y);
        }
        return this.lastTargetOrigin;
    }
    //Event triggering
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
        target.dispatchEvent(new TurboEvent(p, this.currentClick, this.currentKeys, eventName, this.authorizeEventScaling, this.scaleEventPosition));
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
        this.getFireOrigin(positions).dispatchEvent(new TurboDragEvent(this.origins, this.previousPositions, positions, this.currentClick, this.currentKeys, eventName, this.authorizeEventScaling, this.scaleEventPosition));
    }
    //Timer
    //Sets a timer function associated with a certain event name, with its duration
    setTimer(timerName, callback, duration) {
        this.clearTimer(timerName);
        this.timerMap.set(timerName, setTimeout(() => {
            callback();
            this.clearTimer(timerName);
        }, duration));
    }
    //Clears timer associated with the provided event name
    clearTimer(timerName) {
        const timer = this.timerMap.get(timerName);
        if (!timer)
            return;
        clearTimeout(timer);
        this.timerMap.delete(timerName);
    }
    //Click mode
    setClickMode(button, isTouch = false) {
        if (isTouch)
            button--;
        switch (button) {
            case -1:
                this.currentClick = ClickMode.none;
                return;
            case 0:
                this.currentClick = ClickMode.left;
                return;
            case 1:
                this.currentClick = ClickMode.middle;
                return;
            case 2:
                this.currentClick = ClickMode.right;
                return;
            default:
                this.currentClick = ClickMode.other;
                return;
        }
    }
    applyEventNames(eventNames) {
        for (const eventName in eventNames) {
            DefaultEventName[eventName] = eventNames[eventName];
        }
    }
};
TurboEventManager = __decorate([
    define()
], TurboEventManager);

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

var TurboIcon_1;
/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
let TurboIcon = class TurboIcon extends TurboElement {
    static { TurboIcon_1 = this; }
    _element;
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
            this.removeClass(TurboIcon_1.config.defaultClasses);
        else
            this.addClass(TurboIcon_1.config.defaultClasses);
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
            value = this.type || TurboIcon_1.config.defaultType || "svg";
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
            value = this.directory || TurboIcon_1.config.defaultDirectory || "";
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
        this.type = getFileExtension(value).substring(1);
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
            && equalToAny(this.type, ...TurboIcon_1.imageTypes)) {
            this.element.src = this.path;
            this.element.alt = this.icon;
            return;
        }
        this.clear();
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
        const customLoader = TurboIcon_1.config.customLoaders[this.type];
        if (customLoader)
            return customLoader;
        if (equalToAny(this.type, "svg", "SVG"))
            return this.loadSvg;
        if (equalToAny(this.type, ...TurboIcon_1.imageTypes))
            return this.loadImg;
        throw new Error(`Unsupported icon type: ${this.type}`);
    }
    setupLoadedElement(element) {
        if (this.element || !element)
            return;
        if (element.parentElement)
            element = element.cloneNode(true);
        this.addChild(element);
        if (this.iconColor && element instanceof SVGElement)
            element.style.fill = this.iconColor;
        if (this.onLoaded)
            this.onLoaded(element);
        this.element = element;
    }
    clear() {
        this.element?.destroy();
        this.element = null;
    }
};
__decorate([
    observe,
    auto()
], TurboIcon.prototype, "icon", null);
__decorate([
    observe,
    auto()
], TurboIcon.prototype, "iconColor", null);
__decorate([
    cache()
], TurboIcon.prototype, "loadSvg", null);
TurboIcon = TurboIcon_1 = __decorate([
    define()
], TurboIcon);
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
let TurboRichElement = class TurboRichElement extends TurboElement {
    /**
     * @description Object containing the children of the rich element.
     */
    elements;
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
            this.addClass(this.constructor.config.defaultClasses);
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
        this.addChild(element, nextSiblingIndex);
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
        this.removeChild(this.leftCustomElements);
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
            this.removeChild(this.leftIcon);
            return;
        }
        if (typeof value == "string") {
            if (this.leftIcon) {
                this.leftIcon.icon = value;
                return;
            }
            value = new TurboIcon({ icon: value });
        }
        this.removeChild(this.leftIcon);
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
            this.removeChild(this.prefixEntry);
            return;
        }
        if (typeof value == "string") {
            if (this.prefixEntry) {
                this.prefixEntry.innerText = value;
                return;
            }
            value = element({ text: value });
        }
        this.removeChild(this.prefixEntry);
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
            this.removeChild(this.element);
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
        this.removeChild(this.element);
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
            this.removeChild(this.suffixEntry);
            return;
        }
        if (typeof value == "string") {
            if (this.suffixEntry) {
                this.suffixEntry.innerText = value;
                return;
            }
            value = element({ text: value });
        }
        this.removeChild(this.suffixEntry);
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
            this.removeChild(this.rightIcon);
            return;
        }
        if (typeof value == "string") {
            if (this.rightIcon) {
                this.rightIcon.icon = value;
                return;
            }
            value = new TurboIcon({ icon: value });
        }
        this.removeChild(this.rightIcon);
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
        this.removeChild(this.rightCustomElements);
        if (!value)
            return;
        this.addAtPosition(value, "rightCustomElements");
        this.elements.rightCustomElements = value;
    }
};
__decorate([
    auto({ callBefore: (value) => TurboRichElement.config.defaultElementTag || "h4" })
], TurboRichElement.prototype, "elementTag", null);
TurboRichElement = __decorate([
    define("turbo-rich-element")
], TurboRichElement);

var TurboButton_1;
/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
let TurboButton = class TurboButton extends TurboRichElement {
    static { TurboButton_1 = this; }
    static config = { ...TurboRichElement.config, defaultElementTag: "h4" };
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties) {
        super(properties);
        if (!properties.unsetDefaultClasses)
            this.addClass(TurboButton_1.config.defaultClasses);
    }
    /**
     * @description The tag of the text element in the button
     */
    set elementTag(value) { }
};
__decorate([
    auto({ callBefore: (value) => TurboButton.config.defaultElementTag || "h4" })
], TurboButton.prototype, "elementTag", null);
TurboButton = TurboButton_1 = __decorate([
    define()
], TurboButton);
function button(properties) {
    return new TurboButton(properties);
}

let TurboIconSwitch = class TurboIconSwitch extends TurboIcon {
    switchReifect;
    /**
     * Creates an instance of Icon.
     * @param {TurboIconSwitchProperties<State>} properties - Properties to configure the icon.
     */
    constructor(properties) {
        super({ ...properties, icon: undefined });
        if (properties.switchReifect instanceof StatefulReifect)
            this.switchReifect = properties.switchReifect;
        else
            this.switchReifect = new StatefulReifect(properties.switchReifect || {});
        const reifectProperties = this.switchReifect.properties;
        this.switchReifect.attach(this);
        if (properties.appendStateToIconName)
            this.switchReifect.states.forEach(state => {
                if (!reifectProperties[state])
                    reifectProperties[state] = {};
                reifectProperties[state].icon = properties.icon + "-" + state.toString();
            });
        this.update(properties.appendStateToIconName ? { ...properties, icon: undefined } : properties);
        if (properties.defaultState)
            this.switchReifect.apply(properties.defaultState, this);
    }
};
TurboIconSwitch = __decorate([
    define()
], TurboIconSwitch);

let TurboIconToggle = class TurboIconToggle extends TurboIcon {
    onToggle;
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
            this.addListener(DefaultEventName.click, this.clickListener);
        else
            this.removeListener(DefaultEventName.click, this.clickListener);
    }
    toggle() {
        this.toggled = !this.toggled;
    }
    clickListener = () => this.toggle();
};
__decorate([
    auto({ cancelIfUnchanged: true })
], TurboIconToggle.prototype, "toggled", null);
__decorate([
    auto({ cancelIfUnchanged: true })
], TurboIconToggle.prototype, "toggleOnClick", null);
TurboIconToggle = __decorate([
    define()
], TurboIconToggle);

let TurboInput = class TurboInput extends TurboElement {
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
        if ("bypassTurboEventManager" in this.inputElement.element)
            this.inputElement.element.bypassTurboEventManager();
        this.inputElement.element.addListener(DefaultEventName.blur, (e) => {
            if (properties.blurRegexCheck && this.stringValue != this.lastValueWithBlurCheck)
                this.stringValue = this.lastValueWithBlurCheck;
            this.dispatchEvent(new FocusEvent(DefaultEventName.blur, e));
        });
        this.inputElement.element.addListener(DefaultEventName.focus, (e) => {
            if (this.locked)
                this.inputElement.blur();
            if (properties.selectTextOnFocus)
                this.inputElement.element.select();
            this.dispatchEvent(new FocusEvent(DefaultEventName.focus, e));
        });
        this.inputElement.element.addListener(DefaultEventName.input, (e) => {
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
};
TurboInput = __decorate([
    define("turbo-input")
], TurboInput);

let TurboNumericalInput = class TurboNumericalInput extends TurboInput {
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
};
TurboNumericalInput = __decorate([
    define("turbo-numerical-input")
], TurboNumericalInput);

var TurboSelectEntry_1;
/**
 * @class TurboSelectEntry
 * @description Class representing an entry within a TurboSelect.
 * @extends TurboElement
 */
let TurboSelectEntry = TurboSelectEntry_1 = class TurboSelectEntry extends TurboRichElement {
    /**
     * @description The class(es) assigned to the dropdown entry when it is selected
     */
    selectedClasses = "";
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
            this.addClass(TurboSelectEntry_1.config.defaultClasses);
        this.selectedClasses = properties.selectedClasses;
        this.action = properties.action || (() => { });
        this.onSelected = properties.onSelected || (() => { });
        this.onEnabled = properties.onEnabled || (() => { });
        this.reflectedElement = properties.reflectValueOn != undefined && !properties.element ? properties.reflectValueOn : this;
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
        this.toggleClass(this.selectedClasses, value);
        if (value)
            this.action();
        this.onSelected(value);
    }
    set enabled(value) {
        if (!value && this.selected)
            this.selected = false;
        this.reifects.enabled = value;
        this.setStyle("visibility", value ? "" : "hidden");
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
__decorate([
    auto()
], TurboSelectEntry.prototype, "secondaryValue", null);
__decorate([
    auto()
], TurboSelectEntry.prototype, "value", null);
__decorate([
    auto()
], TurboSelectEntry.prototype, "selected", null);
__decorate([
    auto()
], TurboSelectEntry.prototype, "enabled", null);
TurboSelectEntry = TurboSelectEntry_1 = __decorate([
    define()
], TurboSelectEntry);

class TurboSelectInputEvent extends TurboEvent {
    toggledEntry;
    values;
    constructor(toggledEntry, values, clickMode = ClickMode.left, authorizeScaling, scalePosition, eventInitDict) {
        super(null, clickMode, null, TurboEventName.selectInput, authorizeScaling, scalePosition, eventInitDict);
        this.toggledEntry = toggledEntry;
        this.values = values;
    }
}

var TurboSelect_1;
/**
 * Base class for creating a selection menu
 * @class TurboSelect
 * @extends TurboElement
 */
let TurboSelect = class TurboSelect extends TurboElement {
    static { TurboSelect_1 = this; }
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
            this.addClass(TurboSelect_1.config.defaultClasses);
        if (!properties.selectedValues)
            properties.selectedValues = [];
        this.entriesParent = properties.entriesParent ?? this;
        this.multiSelection = properties.multiSelection ?? false;
        this.forceSelection = properties.forceSelection ?? !this.multiSelection;
        this.inputName = properties.inputName;
        this.onSelect = properties.onSelect || (() => { });
        this.selectedEntryClasses = properties.customSelectedEntryClasses || TurboSelect_1.config.defaultSelectedEntryClasses;
        (properties.values ?? []).forEach(entry => this.addEntry(entry));
        //TODO MAKE IT BETTER SOMEHOW (I WANT TO RUN IT AFTER CHILD CLASSES FINISH SETTING UP)
        requestAnimationFrame(() => {
            this.entries.forEach(entry => {
                if (properties.selectedValues?.includes(entry.value))
                    this.select(entry);
            });
        });
    }
    addEntry(entry) {
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
        if (!entry.selectedClasses)
            entry.selectedClasses = this.selectedEntryClasses;
        entry.addListener(DefaultEventName.click, (e) => this.onEntryClick(entry, e));
        this.entriesParent.addChild(entry);
        this.entries.push(entry);
        return entry;
    }
    onEntryClick(entry, e) {
        this.select(entry);
    }
    /**
     * @description Select an entry.
     * @param {string | EntryType} entry - The DropdownEntry (or its string value) to select.
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    select(entry) {
        if (!(entry instanceof TurboSelectEntry)) {
            let el = this.enabledEntries.find(el => el.value == entry);
            if (!el)
                return this;
            entry = el;
        }
        if (!this.multiSelection)
            this.selectedEntries.forEach(selectedEntry => selectedEntry.toggle());
        entry.toggle();
        this.onSelect(entry.selected, entry, this.getIndex(entry));
        this.dispatchEvent(new TurboSelectInputEvent(entry, this.selectedValues));
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
    }
};
TurboSelect = TurboSelect_1 = __decorate([
    define()
], TurboSelect);

var css_248z$2 = ".turbo-drawer{align-items:center;display:inline-flex}.turbo-drawer.top-drawer,.turbo-drawer.top-drawer .turbo-drawer-panel-container{flex-direction:column}.turbo-drawer.bottom-drawer,.turbo-drawer.bottom-drawer .turbo-drawer-panel-container{flex-direction:column-reverse}.turbo-drawer.left-drawer,.turbo-drawer.left-drawer .turbo-drawer-panel-container{flex-direction:row}.turbo-drawer.right-drawer,.turbo-drawer.right-drawer .turbo-drawer-panel-container{flex-direction:row-reverse}.turbo-drawer>div:first-child{background-color:#fff;display:inline-block;position:relative}.turbo-drawer>div:nth-child(2){align-items:center;display:flex;position:relative}.turbo-drawer>div:nth-child(2)>:first-child{background-color:#fff;display:block}";
styleInject(css_248z$2);

// @ts-nocheck
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
        const statefulProperties = properties;
        statefulProperties.states = [""];
        super(statefulProperties);
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

let TurboDrawer = class TurboDrawer extends TurboElement {
    thumb;
    panelContainer;
    panel;
    icon;
    transition;
    hideOverflow;
    dragging = false;
    animationOn = false;
    _offset;
    _translation = 0;
    constructor(properties) {
        super(properties);
        this.addClass("turbo-drawer");
        this.thumb = properties.thumb instanceof HTMLElement ? properties.thumb : div(properties.thumb);
        this.panelContainer = div();
        this.panel = properties.panel instanceof HTMLElement ? properties.panel : div(properties.panel);
        this.thumb.addClass("turbo-drawer-thumb");
        this.panelContainer.addClass("turbo-drawer-panel-container");
        this.panel.addClass("turbo-drawer-panel");
        this.addChild([this.thumb, this.panelContainer]);
        this.panelContainer.addChild(this.panel);
        this.hideOverflow = properties.hideOverflow ?? false;
        if (this.hideOverflow)
            this.panelContainer.setStyle("overflow", "hidden");
        this.side = properties.side || Side.bottom;
        this.offset = { open: properties.offset?.open || 0, closed: properties.offset?.closed || 0 };
        this.icon = this.generateIcon(properties);
        this.thumb.addChild(this.icon);
        this.childHandler = this.panel;
        //Transition
        this.transition = properties.transition ?? new Reifect({
            transitionProperties: ["transform", this.isVertical ? "height" : "width"],
            transitionDuration: 0.2,
            transitionTimingFunction: "ease-out",
            attachedObjects: [this, this.panelContainer]
        });
        this.initState(properties.initiallyOpen || false);
        this.initEvents();
    }
    generateIcon(properties) {
        if (properties.icon instanceof Element)
            return properties.icon;
        const attachSideToIconName = properties.attachSideToIconName ?? typeof properties.icon == "string";
        const rotateIconBasedOnSide = properties.rotateIconBasedOnSide ?? !attachSideToIconName;
        const iconProperties = typeof properties.icon == "object"
            ? properties.icon : {
            icon: properties.icon,
            switchReifect: { states: Object.values(Side) },
            defaultState: this.open ? this.getOppositeSide() : this.side,
            appendStateToIconName: attachSideToIconName,
        };
        const iconElement = new TurboIconSwitch(iconProperties);
        if (rotateIconBasedOnSide) {
            iconElement.switchReifect.styles = {
                top: "transform: rotate(180deg)",
                bottom: "transform: rotate(0deg)",
                left: "transform: rotate(90deg)",
                right: "transform: rotate(270deg)",
            };
        }
        return iconElement;
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
    initState(isOpen) {
        this.open = isOpen;
        this.animationOn = true;
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
    set side(value) {
        this.toggleClass("top-drawer", value == Side.top);
        this.toggleClass("bottom-drawer", value == Side.bottom);
        this.toggleClass("left-drawer", value == Side.left);
        this.toggleClass("right-drawer", value == Side.right);
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
                    this.panelContainer.setStyle("height", value + "px");
                else
                    this.setStyle("transform", `translateY(${-value}px)`);
                break;
            case Side.bottom:
                if (this.hideOverflow)
                    this.panelContainer.setStyle("height", value + "px");
                else
                    this.setStyle("transform", `translateY(${-value}px)`);
                break;
            case Side.left:
                if (this.hideOverflow)
                    this.panelContainer.setStyle("width", value + "px");
                else
                    this.setStyle("transform", `translateX(${-value}px)`);
                break;
            case Side.right:
                if (this.hideOverflow)
                    this.panelContainer.setStyle("width", value + "px");
                else
                    this.setStyle("transform", `translateX(${-value}px)`);
                break;
        }
    }
    refresh() {
        if (this.animationOn) {
            this.transition.enabled = true;
            this.transition.apply();
        }
        if (this.hideOverflow)
            this.panel.setStyle("position", "absolute", true);
        requestAnimationFrame(() => {
            this.translation = (this.open ? this.offset.open : this.offset.closed)
                + (this.open ? (this.isVertical ? this.panel.offsetHeight : this.panel.offsetWidth) : 0);
            if (this.icon instanceof TurboIconSwitch)
                this.icon.switchReifect.apply(this.open ? this.getOppositeSide() : this.side);
            if (this.hideOverflow)
                this.panel.setStyle("position", "relative", true);
        });
    }
};
__decorate([
    auto()
], TurboDrawer.prototype, "side", null);
__decorate([
    auto()
], TurboDrawer.prototype, "open", null);
TurboDrawer = __decorate([
    define()
], TurboDrawer);

var PopupFallbackMode;
(function (PopupFallbackMode) {
    PopupFallbackMode["invert"] = "invert";
    PopupFallbackMode["offset"] = "offset";
    PopupFallbackMode["none"] = "none";
})(PopupFallbackMode || (PopupFallbackMode = {}));

var css_248z$1 = ".turbo-popup{display:block;position:fixed}";
styleInject(css_248z$1);

var TurboPopup_1;
let TurboPopup = class TurboPopup extends TurboElement {
    static { TurboPopup_1 = this; }
    _popupAnchor;
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
        this.addClass("turbo-popup");
        if (!properties.unsetDefaultClasses)
            this.addClass(TurboPopup_1.config.defaultClasses);
        this.popupAnchor = properties.popupAnchor || TurboPopup_1.config.defaultPopupAnchor || { x: 50, y: 0 };
        this.parentAnchor = properties.parentAnchor || TurboPopup_1.config.defaultParentAnchor || { x: 50, y: 100 };
        this.viewportMargin = properties.viewportMargin || TurboPopup_1.config.defaultViewportMargin || 0;
        this.offsetFromParent = properties.offsetFromParent || TurboPopup_1.config.defaultOffsetFromParent || 0;
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
        document.addListener(DefaultEventName.click, e => {
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
        this.setStyle("maxHeight", `${availableHeight}px`);
        this.setStyle("maxWidth", `${availableWidth}px`);
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
        this.setStyle("maxHeight", "", true);
        this.setStyle("maxWidth", "", true);
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
};
__decorate([
    cache({ clearOnNextFrame: true })
], TurboPopup.prototype, "rect", null);
__decorate([
    cache({ clearOnNextFrame: true })
], TurboPopup.prototype, "parentRect", null);
__decorate([
    cache({ clearOnNextFrame: true })
], TurboPopup.prototype, "computedStyle", null);
__decorate([
    cache({ clearOnNextFrame: true })
], TurboPopup.prototype, "parentComputedStyle", null);
TurboPopup = TurboPopup_1 = __decorate([
    define()
], TurboPopup);

var css_248z = "turbo-dropdown{display:inline-block;position:relative}turbo-dropdown>.turbo-popup{background-color:#fff;border:.1em solid #5e5e5e;border-radius:.4em;display:flex;flex-direction:column;overflow:hidden}turbo-dropdown>.turbo-popup>turbo-select-entry{padding:.5em}turbo-dropdown>.turbo-popup>turbo-select-entry:not(:last-child){border-bottom:.1em solid #bdbdbd}turbo-dropdown>turbo-select-entry{padding:.5em .7em;width:100%}turbo-dropdown>turbo-select-entry:hover{background-color:#d7d7d7}turbo-dropdown>turbo-select-entry:not(:last-child){border-bottom:.1em solid #bdbdbd}";
styleInject(css_248z);

var TurboDropdown_1;
/**
 * Dropdown class for creating Turbo button elements.
 * @class TurboDropdown
 * @extends TurboElement
 */
let TurboDropdown = class TurboDropdown extends TurboSelect {
    static { TurboDropdown_1 = this; }
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
            customTextTag: properties.customSelectorTag || TurboDropdown_1.config.defaultSelectorTag });
        this.popup = properties.entriesParent;
        this.initPopup(properties);
        this.initSelector(properties);
        requestAnimationFrame(() => document.addListener(DefaultEventName.click, e => {
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
        this.selector.addListener(DefaultEventName.click, (e) => {
            this.openPopup(!this.popupOpen);
            e.stopImmediatePropagation();
        });
        this.addChild(this.selector);
        this.selector.addClass(properties.customSelectorClasses
            ? properties.customSelectorClasses
            : TurboDropdown_1.config.defaultSelectorClasses);
    }
    initPopup(properties) {
        this.addChild(this.popup);
        this.popup.show(false);
        this.popup.addClass(properties.customPopupClasses
            ? properties.customPopupClasses
            : TurboDropdown_1.config.defaultPopupClasses);
    }
    onEntryClick(entry) {
        super.onEntryClick(entry);
        this.openPopup(false);
    }
    select(entry) {
        super.select(entry);
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
};
TurboDropdown = TurboDropdown_1 = __decorate([
    define("turbo-dropdown")
], TurboDropdown);

function getEventPosition(e) {
    if (e instanceof TurboEvent)
        return e.scaledPosition;
    if (e instanceof PointerEvent)
        return new Point(e.clientX, e.clientY);
    return;
}

let TurboMarkingMenu = class TurboMarkingMenu extends TurboSelect {
    transition;
    semiMajor;
    semiMinor;
    currentOrigin;
    minDragDistance;
    set startAngle(value) { }
    ;
    set endAngle(value) { }
    ;
    constructor(properties = {}) {
        super({ ...properties });
        super.show(false);
        this.startAngle = 0;
        this.endAngle = properties.endAngle ?? Math.PI * 2;
        this.semiMajor = properties.semiMajor ?? 50;
        this.semiMinor = properties.semiMinor ?? 45;
        this.minDragDistance = properties.minDragDistance ?? 20;
        this.transition = properties.transition instanceof StatefulReifect ? properties.transition
            : this.initializeTransition(properties.transition ?? {});
        this.transition.initialize(InOut.out, this.entries);
        this.setStyles({ position: "fixed", top: 0, left: 0 });
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
            if (e.target.findInParents(this))
                return;
            if (this.isShown)
                this.show(false);
        };
        document.addListener(DefaultEventName.scroll, hideOnEvent);
        document.addListener(DefaultEventName.clickEnd, hideOnEvent);
        document.addListener(DefaultEventName.dragStart, hideOnEvent);
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
    addEntry(entry) {
        entry = super.addEntry(entry);
        this.transition?.initialize(this.isShown ? InOut.in : InOut.out, entry);
        entry.setStyles({ position: "absolute" });
        return entry;
    }
    show(b = !this.isShown, position) {
        if (position)
            this.currentOrigin = position;
        else
            this.currentOrigin = new Point(this.offsetLeft, this.offsetTop);
        if (position && b)
            this.setStyle("transform", `translate3d(${position.x}px, ${position.y}px, 0)`);
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
        element.addListener(DefaultEventName.clickEnd, (e) => e.stopImmediatePropagation());
        //Setup click if defined
        if (onClick)
            element.addListener(DefaultEventName.click, (e) => {
                e.stopImmediatePropagation();
                onClick(e);
            }, this);
        //Cancel default hide operation on drag start
        element.addListener(DefaultEventName.dragStart, (e) => {
            e.stopImmediatePropagation();
            //Setup drag start if defined
            if (onDragStart)
                onDragStart(e);
        }, this);
        //Setup drag end if defined
        if (onDragEnd)
            element.addListener(DefaultEventName.dragEnd, (e) => {
                e.stopImmediatePropagation();
                onDragEnd(e);
            }, this);
    }
};
__decorate([
    auto({ callBefore: (value) => value - Math.PI / 2 })
], TurboMarkingMenu.prototype, "startAngle", null);
__decorate([
    auto({ callBefore: (value) => value - Math.PI / 2 })
], TurboMarkingMenu.prototype, "endAngle", null);
TurboMarkingMenu = __decorate([
    define("turbo-marking-menu")
], TurboMarkingMenu);

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
let TurboSelectWheel = class TurboSelectWheel extends TurboSelect {
    _currentPosition = 0;
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
        this.setStyles({ display: "block", position: "relative" });
        this.alwaysOpen = properties.alwaysOpen ?? false;
        this.initializeUI();
        if (properties.selectedValues?.length > 0)
            this.select(properties.selectedValues[0]);
        requestAnimationFrame(() => this.refresh());
    }
    connectedCallback() {
        super.connectedCallback();
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
            document.removeListener(DefaultEventName.click, this.closeOnClick);
        else
            document.addListener(DefaultEventName.click, this.closeOnClick);
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
        this.setStyle("overflow", value ? "visible" : "hidden");
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
        document.addListener(DefaultEventName.drag, (e) => {
            if (!this.dragging)
                return;
            e.stopImmediatePropagation();
            this.currentPosition += this.computeDragValue(e.scaledDeltaPosition);
        });
        document.addListener(DefaultEventName.dragEnd, (e) => {
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
        element.setStyles(styles);
    }
    select(entry) {
        super.select(entry);
        const index = this.getIndex(this.selectedEntry);
        if (index != this.index)
            this.index = index;
        if (this.reifect) {
            this.reifect.enabled.transition = true;
            this.reifect.apply();
            this.reloadEntrySizes();
        }
        const computedStyle = getComputedStyle(this.selectedEntry);
        this.setStyles({ minWidth: computedStyle.width, minHeight: computedStyle.height }, true);
        return this;
    }
    onEntryClick(entry, e) {
        super.onEntryClick(entry, e);
        e.stopImmediatePropagation();
        this.open = true;
        if (!this.alwaysOpen)
            this.setOpenTimer();
    }
    addEntry(entry) {
        entry = super.addEntry(entry);
        entry.setStyles({ position: "absolute" });
        entry.addListener(DefaultEventName.dragStart, (e) => {
            e.stopImmediatePropagation();
            this.clearOpenTimer();
            this.open = true;
            this.dragging = true;
            this.reifect.enabled.transition = false;
            this.reifect.apply();
            this.reloadEntrySizes();
        });
        let showTimer;
        entry.addListener("mouseover", () => {
            clearTimeout(showTimer);
            showTimer = setTimeout(() => this.open = true, 1000);
        });
        entry.addListener("mouseout", () => {
            if (showTimer)
                clearTimeout(showTimer);
            showTimer = null;
        });
        if (this.reifect) {
            this.reifect.attach(entry);
            this.reifect.apply();
            this.reloadEntrySizes();
        }
        this.refresh();
        return entry;
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
};
__decorate([
    auto({ callBefore: (value) => trim(value, 1) })
], TurboSelectWheel.prototype, "opacity", null);
__decorate([
    auto()
], TurboSelectWheel.prototype, "alwaysOpen", null);
__decorate([
    auto({ cancelIfUnchanged: false })
], TurboSelectWheel.prototype, "index", null);
__decorate([
    auto()
], TurboSelectWheel.prototype, "open", null);
TurboSelectWheel = __decorate([
    define("turbo-select-wheel")
], TurboSelectWheel);

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

export { AccessLevel, ActionMode, ClickMode, ClosestOrigin, DefaultEventName, Delegate, Direction, InOut, InputDevice, MathMLNamespace, MathMLTagsDefinitions, MvcHandler, OnOff, Open, Point, PopupFallbackMode, Range, Reifect, ReifectHandler, Shown, Side, SideH, SideV, StatefulReifect, SvgNamespace, SvgTagsDefinitions, TurboButton, TurboClickEventName, TurboController, TurboDragEvent, TurboDragEventName, TurboDrawer, TurboDropdown, TurboElement, TurboEmitter, TurboEvent, TurboEventManager, TurboEventName, TurboHandler, TurboIcon, TurboIconSwitch, TurboIconToggle, TurboInput, TurboKeyEvent, TurboKeyEventName, TurboMap, TurboMarkingMenu, TurboModel, TurboMoveName, TurboNumericalInput, TurboPopup, TurboProxiedElement, TurboRichElement, TurboSelect, TurboSelectEntry, TurboSelectInputEvent, TurboSelectWheel, TurboView, TurboWeakSet, TurboWheelEvent, TurboWheelEventName, a, addChildManipulationToElementPrototype, addClassManipulationToElementPrototype, addElementManipulationToElementPrototype, addListenerManipulationToElementPrototype, addReifectManagementToNodePrototype, addStylesManipulationToElementPrototype, areEqual, auto, bestOverlayColor, blindElement, button, cache, callOnce, callOncePerInstance, camelToKebabCase, canvas, clearCache, clearCacheEntry, contrast, createProxy, css, define, div, eachEqualToAny, element, equalToAny, fetchSvg, flexCol, flexColCenter, flexRow, flexRowCenter, form, generateTagFunction, getEventPosition, getFileExtension, h1, h2, h3, h4, h5, h6, icon, img, input, isMathMLTag, isNull, isSvgTag, isUndefined, kebabToCamelCase, linearInterpolation, link, loadLocalFont, luminance, mod, observe, p, parse, reifect, setupTurboEventManagerBypassing, spacer, span, statefulReifier, stringify, style, stylesheet, textToElement, textarea, trim, turbofy, updateChainingPropertiesInElementPrototype, video };
