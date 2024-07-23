type PartialRecord<Property extends keyof any, Value> = {
    [P in Property]?: Value;
};
type SVGTagMap = Omit<SVGElementTagNameMap, "style">;
/**
 * @description A type that represents a union of HTML, SVG, and MathML tag name maps.`
 */
type ElementTagMap = HTMLElementTagNameMap & SVGTagMap & MathMLElementTagNameMap;
/**
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type ValidTag<Tag extends keyof ElementTagMap = keyof ElementTagMap> = Tag;
/**
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidElement<Tag extends ValidTag = ValidTag> = Tag extends HTMLTag ? ValidHTMLElement<Tag> : (Tag extends SVGTag ? ValidSVGElement<Tag> : (Tag extends MathMLTag ? ValidMathMLElement<Tag> : (ElementTagMap[Tag] extends Element ? ElementTagMap[Tag] : Element)));
/**
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidNode<Tag = ValidTag> = Tag extends ValidTag ? ValidElement<Tag> : Node;
/**
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type HTMLTag<Tag extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> = Tag;
/**
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidHTMLElement<Tag extends HTMLTag = HTMLTag> = HTMLElementTagNameMap[Tag] extends HTMLElement ? HTMLElementTagNameMap[Tag] : HTMLElement;
/**
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type SVGTag<Tag extends keyof SVGElementTagNameMap = keyof SVGElementTagNameMap> = Tag;
/**
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidSVGElement<Tag extends SVGTag = SVGTag> = SVGElementTagNameMap[Tag] extends SVGElement ? SVGElementTagNameMap[Tag] : SVGElement;
/**
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type MathMLTag<Tag extends keyof MathMLElementTagNameMap = keyof MathMLElementTagNameMap> = Tag;
/**
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidMathMLElement<Tag extends MathMLTag = MathMLTag> = MathMLElementTagNameMap[Tag] extends MathMLElement ? MathMLElementTagNameMap[Tag] : MathMLElement;

/**
 * @type {AutoOptions}
 * @description Options for configuring the `auto` decorator.
 * @property {boolean} [cancelIfUnchanged=true] - If true, cancels the setter if the new value is the same as the
 * current value. Defaults to `true`.
 * @property {(value: Type) => Type} [callBefore] - Optional callback to execute on the value just before it is set.
 * @property {boolean} [returnDefinedGetterValue] - If true and a getter is defined, will not modify the latter.
 * @template Type
 */
type AutoOptions<Type = any> = {
    cancelIfUnchanged?: boolean;
    callBefore?: (value: Type) => Type;
    returnDefinedGetterValue?: boolean;
};

/**
 * @function auto
 * @description A decorator that automatically creates a getter or setter if only one of them is defined. Works only
 * with public fields.
 * @param {AutoOptions} [options] - Optional object to configure the decorator.
 * @returns {Function} - The updated property descriptor.
 * @template Type
 */
declare function auto<Type = any>(options?: AutoOptions): Function;

/**
 * @type {CacheOptions}
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
type CacheOptions = {
    timeout?: number;
    onEvent?: string | string[];
    onCallback?: () => boolean | Promise<boolean>;
    onCallbackFrequency?: number;
    onFieldChange?: string | Function | (string | Function)[];
    clearOnNextFrame?: boolean;
};

/**
 * @function cache
 * @description Decorator for caching the result of a method or getter.
 * @param {CacheOptions} [options={}] - Configuration options for the cache.
 * @returns {Function} - A decorator function.
 */
declare function cache(options?: CacheOptions): Function;
/**
 * @function clearCache
 * @description Clears all cache entries for the given instance.
 * @param {any} instance - The instance to clear the cache from.
 */
declare function clearCache(instance: any): void;
/**
 * @function clearCacheEntry
 * @description Clears the cache entry for the provided field in the given instance.
 * @param {any} instance - The instance to clear the cache from.
 * @param {string | Function} field - The name of the field or the field itself (if it is a method) to clear.
 */
declare function clearCacheEntry(instance: any, field: string | Function): void;

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
declare function callOnce(target: any, propertyKey: string, descriptor?: PropertyDescriptor): PropertyDescriptor;
/**
 * @function callOncePerInstance
 * @description A function wrapper that ensures the wrapped function is called only once per instance.
 * @param {Function} fn - The function to wrap.
 * @param {string|symbol} [key=Symbol(`__callOncePerInstance__${fn.name}`)] - A unique key to track if the function
 * has been called.
 * @returns {Function} - The wrapped function that will only execute once per instance.
 */
declare function callOncePerInstance(fn: Function, key?: string | symbol): Function;

/**
 * @description Defines the element as a custom element with the given name. Use as class decorator in TypeScript
 * (e.g.: @define("my-class")), and as a regular function call in JavaScript (e.g.: define("my-class")(MyClass)).
 * @param {string} elementName - The name of the custom element.
 */
declare const define: (elementName: string) => (constructor: CustomElementConstructor) => void;

/**
 * @description Sets the corresponding property as observed, to sync its changes with a corresponding HTML attribute.
 * @param {HTMLElement} target - The HTML element to observe
 * @param {string} propertyKey - The name of the field to observe
 */
declare function observe(target: HTMLElement, propertyKey: string): void;

/**
 * @description Ensures that non-function properties of an element are selected.
 */
type HTMLElementNonFunctions<Tag extends ValidTag = ValidTag> = {
    [ElementField in keyof ValidElement<Tag>]: ValidElement<Tag>[ElementField] extends Function ? never : ElementField;
}[keyof ValidElement<Tag>];
/**
 * @description Represents mutable fields of an HTML element, excluding specific fields.
 */
type HTMLElementMutableFields<Tag extends ValidTag = ValidTag> = Omit<Partial<Pick<ValidElement<Tag>, HTMLElementNonFunctions<Tag>>>, "children" | "className" | "style">;
/**
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {Tag} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svgManipulation" or "mathML" is provided,
 * the corresponding namespace will be used to create the element. Otherwise, the custom namespace provided will be used.
 * @template {ValidTag} Tag
 */
type ElementTagDefinition<Tag extends ValidTag> = {
    tag?: Tag;
    namespace?: string;
};
/**
 * @type {TurboProperties}
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
type TurboProperties<Tag extends ValidTag = "div"> = HTMLElementMutableFields<Tag> & ElementTagDefinition<Tag> & {
    id?: string;
    classes?: string | string[];
    style?: string;
    stylesheet?: string;
    listeners?: Record<string, EventListenerOrEventListenerObject | ((e: Event, el: ValidElement<Tag>) => void)>;
    children?: Element | Element[];
    parent?: Element;
    out?: string | Element;
    text?: string;
    shadowDOM?: boolean;
    [key: string]: any;
};

/**
 * @description returns a function that generates an HTML element with the provided tag that takes TurboProperties
 * as input.
 * @param {keyof ElementTagMap} tag - The tag to generate the function from.
 * @return The function
 */
declare function generateTagFunction<Tag extends ValidTag>(tag: Tag): (properties?: TurboProperties<Tag>) => ValidElement<Tag>;
/**
 * @description Creates an "a" element with the specified properties.
 * @param {TurboProperties<"a">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"a">} The created element.
 */
declare function a(properties?: TurboProperties<"a">): ValidElement<"a">;
/**
 * @description Creates a "canvas" element with the specified properties.
 * @param {TurboProperties<"canvas">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"canvas">} The created element.
 */
declare function canvas(properties?: TurboProperties<"canvas">): ValidElement<"canvas">;
/**
 * @description Creates a "div" element with the specified properties.
 * @param {TurboProperties<"div">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"div">} The created element.
 */
declare function div(properties?: TurboProperties): ValidElement<"div">;
/**
 * @description Creates a "form" element with the specified properties.
 * @param {TurboProperties<"form">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"form">} The created element.
 */
declare function form(properties?: TurboProperties<"form">): ValidElement<"form">;
/**
 * @description Creates a "h1" element with the specified properties.
 * @param {TurboProperties<"h1">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h1">} The created element.
 */
declare function h1(properties?: TurboProperties<"h1">): ValidElement<"h1">;
/**
 * @description Creates a "h2" element with the specified properties.
 * @param {TurboProperties<"h2">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h2">} The created element.
 */
declare function h2(properties?: TurboProperties<"h2">): ValidElement<"h2">;
/**
 * @description Creates a "h3" element with the specified properties.
 * @param {TurboProperties<"h3">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h3">} The created element.
 */
declare function h3(properties?: TurboProperties<"h3">): ValidElement<"h3">;
/**
 * @description Creates a "h4" element with the specified properties.
 * @param {TurboProperties<"h4">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h4">} The created element.
 */
declare function h4(properties?: TurboProperties<"h4">): ValidElement<"h4">;
/**
 * @description Creates a "h5" element with the specified properties.
 * @param {TurboProperties<"h5">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h5">} The created element.
 */
declare function h5(properties?: TurboProperties<"h5">): ValidElement<"h5">;
/**
 * @description Creates a "h6" element with the specified properties.
 * @param {TurboProperties<"h6">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"h6">} The created element.
 */
declare function h6(properties?: TurboProperties<"h6">): ValidElement<"h6">;
/**
 * @description Creates an "img" element with the specified properties.
 * @param {TurboProperties<"img">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"img">} The created element.
 */
declare function img(properties?: TurboProperties<"img">): ValidElement<"img">;
/**
 * @description Creates an "input" element with the specified properties.
 * @param {TurboProperties<"input">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"input">} The created element.
 */
declare function input(properties?: TurboProperties<"input">): ValidElement<"input">;
/**
 * @description Creates a "link" element with the specified properties.
 * @param {TurboProperties<"link">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"link">} The created element.
 */
declare function link(properties?: TurboProperties<"link">): ValidElement<"link">;
/**
 * @description Creates a "p" element with the specified properties.
 * @param {TurboProperties<"p">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"p">} The created element.
 */
declare function p(properties?: TurboProperties<"p">): ValidElement<"p">;
/**
 * @description Creates a "span" element with the specified properties.
 * @param {TurboProperties<"span">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"span">} The created element.
 */
declare function span(properties?: TurboProperties<"span">): ValidElement<"span">;
/**
 * @description Creates a "style" element with the specified properties.
 * @param {TurboProperties<"style">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"style">} The created element.
 */
declare function style(properties?: TurboProperties<"style">): ValidElement<"style">;
/**
 * @description Creates a "textarea" element with the specified properties.
 * @param {TurboProperties<"textarea">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"textarea">} The created element.
 */
declare function textarea(properties?: TurboProperties<"textarea">): ValidElement<"textarea">;
/**
 * @description Creates a "video" element with the specified properties.
 * @param {TurboProperties<"video">} [properties] - Object containing properties of the element.
 * @returns {ValidElement<"video">} The created element.
 */
declare function video(properties?: TurboProperties<"video">): ValidElement<"video">;

/**
 * @description Create an element with the specified properties (and the specified namespace if applicable).
 * @param {TurboProperties<Tag>} [properties] - Object containing properties of the element.
 * @returns {ValidElement<Tag>} The created element.
 * @template Tag
 */
declare function element<Tag extends ValidTag>(properties?: TurboProperties<Tag>): ValidElement<Tag>;
/**
 * @description Create an element with the specified properties. Supports SVG and MathML.
 * @param {TurboProperties<Tag>} [properties] - Object containing properties of the element.
 * @returns {ValidElement<Tag>} The created element.
 * @template Tag
 */
declare function blindElement<Tag extends ValidTag>(properties?: TurboProperties<Tag>): ValidElement<Tag>;

/**
 * @description Create a flex column element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexCol<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @description Create a flex column element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexColCenter<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @description Create a flex row element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexRow<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @description Create a flex row element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created flex element.
 * @template {HTMLTag} Tag
 */
declare function flexRowCenter<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;
/**
 * @description Create a spacer element.
 * @param {TurboProperties<Tag>} properties - Object containing properties of the element.
 * @returns {ValidHTMLElement<Tag>} The created spacer element.
 * @template {HTMLTag} Tag
 */
declare function spacer<Tag extends HTMLTag>(properties?: TurboProperties<Tag>): ValidHTMLElement<Tag>;

declare enum Direction {
    vertical = "vertical",
    horizontal = "horizontal"
}
declare enum InOut {
    in = "in",
    out = "out"
}
declare enum AccessLevel {
    public = "public",
    protected = "protected",
    private = "private"
}
declare enum Range {
    min = "min",
    max = "max"
}

/**
 * @type {TransitionInterpolation}
 * @description Represents a callback function that would return the appropriate transition value based on the index
 * and total count.
 */
type TransitionInterpolation<Type = number> = (index: number, total: number, element: HTMLElement) => Type;
/**
 * @type {TransitionStyles}
 * @description Represents all types accepted by styles options and parameters for Transitions.
 */
type TransitionStyles = StylesType | TransitionInterpolation<StylesType> | PartialRecord<keyof CSSStyleDeclaration, TransitionInterpolation<string | number>>;
/**
 * @enum {TransitionMode}
 * @description Enum representing a transition mode. `stylesOnly` will disable the transition and only apply the
 * corresponding style, while `transitionOnly` will disable setting styles and only apply the transition.
 */
declare enum TransitionMode {
    enabled = "enabled",
    disabled = "disabled",
    stylesOnly = "stylesOnly",
    transitionOnly = "transitionOnly"
}
/**
 * @type {TransitionProperties}
 * @description Object containing properties for a Transition element.
 *
 * @property {string | string[]} [properties] - The CSS properties (or property) to apply the transition on. Takes a
 * string of whitespace-separated properties, or an array of strings. Set to `"all"` or don't specify to apply to all
 * CSS properties.
 * @property {number | TransitionInterpolation | PartialRecord<InOut, number | TransitionInterpolation>} [duration] -
 * The duration of the transition in seconds. Optionally, provide separate values for "in" and "out" transitions.
 * @property {string | PartialRecord<InOut, string>} [timingFunction] - The timing function to apply to the transition.
 * Optionally, provide separate values for "in" and "out" transitions.
 * @property {number | TransitionInterpolation | PartialRecord<InOut, number | TransitionInterpolation>} [delay] -
 * The delay of the transition in seconds. Optionally, provide separate values for "in" and "out" transitions.
 * @property {TransitionStyles | PartialRecord<InOut, TransitionStyles>} [defaultStyles] - The default styles
 * applied when transitioning, per transition direction ("in" or "out").
 * @property {TransitionInterpolation<void>} [beforeComputing] - Optional callback to be executed on all concerned
 * elements before computing and setting the transitions and styles.
 */
type TransitionProperties = {
    properties?: string | string[];
    duration?: number | TransitionInterpolation | PartialRecord<InOut, number | TransitionInterpolation>;
    timingFunction?: string | Record<InOut, string>;
    delay?: number | TransitionInterpolation | PartialRecord<InOut, number | TransitionInterpolation>;
    defaultStyles?: TransitionStyles | PartialRecord<InOut, TransitionStyles>;
    beforeComputing?: TransitionInterpolation<void>;
};
/**
 * @type {TransitionData}
 * @description Object representing the data associated with a transition for an element.
 *
 * @property {HTMLElement} element - The element associated with the data.
 * @property {TransitionMode} [enabled=TransitionMode.enabled] - Indicates the transition mode of the transition
 * for the element.
 * @property {InOut} [lastState] - The last applied state (in or out) of the transition.
 * @property {PartialRecord<InOut, PartialRecord<keyof CSSStyleDeclaration, string | number> | null>} [resolvedStyles] -
 * The resolved styles to be applied for the transition.
 * @property {number} [elementIndex] - The position of the element for interpolation computations.
 * @property {number} [totalElementCount] - The total count of elements for interpolation computations.
 */
type TransitionData = {
    element: HTMLElement;
    enabled?: TransitionMode;
    lastState?: InOut;
    resolvedStyles?: PartialRecord<InOut, PartialRecord<keyof CSSStyleDeclaration, string | number> | null>;
    elementIndex?: number;
    totalElementCount?: number;
};
/**
 * @type {TransitionEntry}
 * @description Object representing the properties of a transition entry.
 *
 * @property {string} property - The CSS property (or properties) to which the transition applies.
 * @property {number | TransitionInterpolation} duration - The duration of the transition in seconds.
 * @property {string} timingFunction - The timing function of the transition.
 * @property {number | TransitionInterpolation} delay - The delay of the transition in seconds.
 * @property {TransitionStyles} [defaultStyles] - The default styles applied when transitioning.
 */
type TransitionEntry = {
    properties: string[];
    duration: number | TransitionInterpolation;
    timingFunction: string;
    delay: number | TransitionInterpolation;
    defaultStyles?: TransitionStyles;
};

/**
 * @class Transition
 * @description A class representing a CSS transition. It has two states (in and out), which you can set up
 * almost independently (they must only share the animation properties). Use a Transition to transition one or more
 * HTMLElement(s) easily.
 */
declare class Transition {
    private readonly inTransition;
    private readonly outTransition;
    private readonly attachedElements;
    /**
     * @description Callback executed on the concerned elements before applying their transition/styles.
     */
    beforeComputing: TransitionInterpolation<void>;
    /**
     * @constructor
     * @param {TransitionProperties} [properties={}] - The transition properties to apply to this newly created
     * Transition.
     */
    constructor(properties?: TransitionProperties);
    /**
     * @function attach
     * @description Attach one or more elements to the transition.
     * @param {...HTMLElement} elements - The element(s) to attach.
     * @returns {this} The transition itself.
     */
    attach(...elements: HTMLElement[]): this;
    /**
     * @function detach
     * @description Detach one or more elements from the transition.
     * @param {...HTMLElement} elements - The element(s) to detach.
     * @returns {this} The transition itself.
     */
    detach(...elements: HTMLElement[]): this;
    /**
     * @function initialize
     * @description Initializes the element to the corresponding transition direction and styles. Interpolation values
     * will be computed from the provided array (or element).
     * @param {InOut} [direction=InOut.out] - The direction of the transition.
     * @param {HTMLElement | HTMLElement[] | HTMLCollection} [elements] - One or more HTMLElements to which the
     * transition will be applied. Defaults to the transition's attached elements.
     * @param {boolean} [executeForAll=false] - If set to true, the function will be applied also to all
     * the previously attached/transitioned elements, and interpolation values will be computed from the stored list
     * of attached elements (containing both previous and new elements).
     * @param {boolean} [recomputeIndices=true] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @param {TransitionStyles} [overrideStyles] - Optional styles to override the defaults. Set to `null` to
     * not set any styles on the element(s).
     * @param {TransitionInterpolation<void>} [overrideBeforeComputing=this.beforeComputing] - The callback to execute
     * on all concerned elements before returning the elements' list.
     * @returns {this} Itself for method chaining.
     */
    initialize(direction?: InOut, elements?: HTMLElement | HTMLElement[] | HTMLCollection, executeForAll?: boolean, recomputeIndices?: boolean, overrideStyles?: TransitionStyles, overrideBeforeComputing?: TransitionInterpolation<void>): this;
    /**
     * @function apply
     * @description Applies the transition (in or out) to the provided element(s). Interpolation values will be
     * computed from the provided array (or element).
     * @param {InOut} [direction=InOut.out] - The direction of the transition.
     * @param {HTMLElement | HTMLElement[] | HTMLCollection} [elements] - One or more HTMLElements to which the
     * transition will be applied. Defaults to the transition's attached elements.
     * @param {boolean} [executeForAll=false] - If set to true, the function will be applied also to all
     * the previously attached/transitioned elements, and interpolation values will be computed from the stored list
     * of attached elements (containing both previous and new elements).
     * @param {boolean} [recomputeIndices=true] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @param {TransitionStyles} [overrideStyles] - Optional styles to override the defaults. Set to `null` to
     * not set any styles on the element(s).
     * @param {TransitionInterpolation<void>} [overrideBeforeComputing=this.beforeComputing] - The callback to execute
     * on all concerned elements before returning the elements' list.
     * @returns {this} Itself for method chaining.
     */
    apply(direction?: InOut, elements?: HTMLElement | HTMLElement[] | HTMLCollection, executeForAll?: boolean, recomputeIndices?: boolean, overrideStyles?: TransitionStyles, overrideBeforeComputing?: TransitionInterpolation<void>): this;
    /**
     * @function toggle
     * @description Toggles the transition (in or out) for the provided element(s). Interpolation values will be
     * computed from the provided array (or element).
     * @param {HTMLElement | HTMLElement[] | HTMLCollection} [elements] - One or more HTMLElements to which the
     * transition will be applied. Defaults to the transition's attached elements.
     * @param {boolean} [executeForAll=false] - If set to true, the function will be applied also to all
     * the previously attached/transitioned elements, and interpolation values will be computed from the stored list
     * of attached elements (containing both previous and new elements).
     * @param {boolean} [recomputeIndices=true] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @param {PartialRecord<InOut, TransitionStyles>} [overrideStyles] - Optional styles to override the defaults.
     * Set to `Record<InOut, null>` or `null` to not set any styles on the element(s).
     * @param {TransitionInterpolation<void>} [overrideBeforeComputing=this.beforeComputing] - The callback to execute
     * on all concerned elements before returning the elements' list.
     * @returns {this} Itself for method chaining.
     */
    toggle(elements?: HTMLElement | HTMLElement[] | HTMLCollection, executeForAll?: boolean, recomputeIndices?: boolean, overrideStyles?: PartialRecord<InOut, TransitionStyles>, overrideBeforeComputing?: TransitionInterpolation<void>): this;
    /**
     * @function getEnabledEntriesData
     * @description Resolves the provided elements into an array, attaches all those who aren't already attached,
     * skips if disabled, update indices, and executes the beforeComputing callback on the indicated list of elements.
     * @param {HTMLElement | HTMLElement[] | HTMLCollection} [elements] - One or more HTMLElements to which the
     * transition will be applied. Defaults to the transition's attached elements.
     * @param {boolean} [executeForAll=false] - If set to true, the function will be applied also to all
     * the previously attached/transitioned elements, and interpolation values will be computed from the stored list
     * of attached elements (containing both previous and new elements).
     * @param {boolean} [recomputeIndices=true] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @param {TransitionInterpolation<void>} [overrideBeforeComputing=this.beforeComputing] - The callback to execute
     * on all concerned elements before returning the elements' list.
     * @returns {this} Itself for method chaining.
     */
    getEnabledEntriesData(elements?: HTMLElement | HTMLElement[] | HTMLCollection, executeForAll?: boolean, recomputeIndices?: boolean, overrideBeforeComputing?: TransitionInterpolation<void>): TransitionData[];
    /**
     * @function reload
     * @description Reloads the transitions for all the attached elements, without recomputing styles.
     * @returns {this} Itself for method chaining.
     */
    reload(): this;
    /**
     * @function reloadFor
     * @description Generates the transition CSS string for the provided transition with the correct interpolation
     * information.
     * @param {HTMLElement} element - The element to apply the string to.
     * @returns {this} Itself for method chaining.
     */
    reloadFor(element: HTMLElement): this;
    /**
     * @description The enabled state of the transition. Modifying it will automatically reload the transition for
     * all attached elements.
     */
    set enabled(value: boolean | TransitionMode);
    /**
     * @description The properties (or property) being transitioned.
     */
    get properties(): string[];
    set properties(value: string | string[]);
    /**
     * @description The duration of the transition.
     */
    get duration(): Record<InOut, number | TransitionInterpolation>;
    set duration(value: number | TransitionInterpolation | PartialRecord<InOut, number | TransitionInterpolation>);
    /**
     * @description The timing function of the transition.
     */
    get timingFunction(): Record<InOut, string>;
    set timingFunction(value: string | PartialRecord<InOut, string>);
    /**
     * @description The delay of the transition.
     */
    get delay(): Record<InOut, number | TransitionInterpolation>;
    set delay(value: number | TransitionInterpolation | PartialRecord<InOut, number | TransitionInterpolation>);
    /**
     * @description The default styles applied when transitioning.
     */
    get defaultStyles(): Record<InOut, TransitionStyles>;
    set defaultStyles(value: TransitionStyles | PartialRecord<InOut, TransitionStyles>);
    /**
     * @description The transition string for the in direction.
     */
    get inTransitionString(): string;
    /**
     * @description The transition string for the out direction.
     */
    get outTransitionString(): string;
    /**
     * @function update
     * @description Function to update certain (or every) parameter in the Transition.
     * @param {TransitionProperties} [properties={}] - The new transition properties.
     */
    update(properties?: TransitionProperties): void;
    /**
     * @function enableTransitionFor
     * @description Enable or disable the transition for a specific element.
     * @param {HTMLElement} element - The element to enable or disable the transition for.
     * @param {TransitionMode | boolean} state - The state to set (enabled, disabled, or styleOnly).
     */
    enableTransitionFor(element: HTMLElement, state: TransitionMode | boolean): void;
    /**
     * @private
     * @function getTransitionField
     * @description Gets the specified field for both in and out states.
     * @param {string} field - The field to get.
     * @returns {Record<InOut, Type>}
     */
    private getTransitionField;
    /**
     * @private
     * @function setTransitionField
     * @description Sets the specified field for both in and out states.
     * @param {Type | PartialRecord<InOut, Type>} value - The value to set.
     * @param {string} field - The field to set.
     */
    private setTransitionField;
    /**
     * @private
     * @function findData
     * @description Find the data entry for a given element.
     * @param {HTMLElement} element - The element to find the data of.
     * @returns {TransitionData} The corresponding transition data.
     */
    private findData;
    /**
     * @function stateOf
     * @description Determine the current state (In or Out) of the transition on the provided element.
     * @param {HTMLElement} element - The element to determine the state for.
     * @returns {InOut | undefined} - The current state of the transition or undefined if not determinable.
     */
    stateOf(element: HTMLElement): InOut | undefined;
    /**
     * @description Clone the transition to create a new copy with the same properties but no attached elements.
     * @returns {Transition} - The new transition.
     */
    clone(): Transition;
    /**
     * @function getTransitionString
     * @description Gets the CSS transition string for the specified direction.
     * @param {TransitionData} data - The target element's transition data entry.
     * @returns {string} The CSS transition string.
     */
    private getTransitionString;
    /**
     * @private
     * @description Computes interpolations and resolves accepted styles for transitions into a record of properties
     * to values. Stores the resolved styles in the element's data.
     * @param {TransitionData} data - The concerned transition data.
     * @param {TransitionStyles} overrideStyles - The styles to override.
     */
    private resolveAndOverrideStyles;
    /**
     * @function parseMode
     * @description Parse the transition mode from a boolean or TransitionMode.
     * @param {boolean | TransitionMode} state - The state to parse.
     * @returns {TransitionMode} The parsed transition mode.
     */
    static parseMode(state: boolean | TransitionMode): TransitionMode;
}
declare function transition(properties?: TransitionProperties): Transition;

/**
 * @class TransitionHandler
 * @description A class to handle transitions for an attached element.
 */
declare class TransitionHandler {
    private readonly attachedElement;
    private readonly transitions;
    /**
     * @constructor
     * @param {HTMLElement} attachedElement - The element to attach transitions to.
     */
    constructor(attachedElement: HTMLElement);
    /**
     * @function attach
     * @description Attach one or more transitions to the element.
     * @param {Transition} transitions - The transition(s) to attach.
     * @returns {this} The element's TransitionHandler instance.
     */
    attach(...transitions: Transition[]): this;
    /**
     * @function detach
     * @description Detach one or more transitions from the element.
     * @param {Transition} transitions - The transition(s) to detach.
     * @returns {this} The element's TransitionHandler instance.
     */
    detach(...transitions: Transition[]): this;
    /**
     * @function initialize
     * @description Initializes the element to the corresponding transition direction and styles.
     * @param {Transition} transition - The transition to initialize.
     * @param {InOut} direction - The direction of the transition.
     * @param {TransitionStyles | null} [overrideStyles] - Optional styles to override the defaults. Set to `null` to
     * not set any styles on the element.
     * @param {boolean} [recomputeIndices=false] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @returns {this} The element's TransitionHandler instance.
     */
    initialize(transition: Transition, direction: InOut, overrideStyles?: TransitionStyles | null, recomputeIndices?: boolean): this;
    /**
     * @function apply
     * @description Apply a transition to the element.
     * @param {Transition} transition - The transition to apply.
     * @param {InOut} direction - The direction of the transition.
     * @param {TransitionStyles | null} [overrideStyles] - Optional styles to override the defaults. Set to `null` to
     * not set any styles on the element.
     * @param {boolean} [recomputeIndices=false] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @returns {this} The element's TransitionHandler instance.
     */
    apply(transition: Transition, direction: InOut, overrideStyles?: TransitionStyles | null, recomputeIndices?: boolean): this;
    /**
     * @function toggle
     * @description Toggle the provided transition on the element.
     * @param {Transition} transition - The transition to apply.
     * @param {PartialRecord<InOut, TransitionStyles | null>} [overrideStyles] - Optional styles to override the
     * defaults. Set to a `Record<InOut, null>` or `null` to not set any styles on the element.
     * @param {boolean} [recomputeIndices=false] - Define whether to keep previously computed indices or recompute them
     * based on the passed elements list.
     * @returns {this} The element's TransitionHandler instance.
     */
    toggle(transition: Transition, overrideStyles?: PartialRecord<InOut, TransitionStyles | null> | null, recomputeIndices?: boolean): this;
    /**
     * @private
     * @function clear
     * @description Clears the set transition styles on the element.
     */
    clear(): void;
    /**
     * @function reload
     * @description Reloads all transitions attached to the element. Doesn't recompute styles.
     */
    reload(): void;
    /**
     * @description Dictates whether the transitions on the element are enabled. Will automatically remove/reload
     * the transitions when set.
     * @param value
     */
    set enabled(value: boolean | TransitionMode);
    /**
     * @description Enable or disable a certain transition for this element only. Will automatically remove/add back
     * the transition when set.
     * @param transition
     * @param state
     */
    enableTransition(transition: Transition, state: boolean | TransitionMode): void;
}

/**
 * @type {StylesRoot}
 * @description A type that represents entities that can hold a <style> object (Shadow root or HTML head).
 */
type StylesRoot = ShadowRoot | HTMLHeadElement;
/**
 * @type {StylesType}
 * @description A type that represents types that are accepted as styles entries (mainly by the HTMLElement.setStyles()
 * method).
 */
type StylesType = string | number | PartialRecord<keyof CSSStyleDeclaration, string | number>;
declare global {
    interface Element {
        /**
         * @description The closest root to the element in the document (the closest ShadowRoot, or the document's head).
         */
        readonly closestRoot: StylesRoot;
    }
    interface HTMLElement {
        /**
         * @description Handler for all Transitions attached to this element.
         */
        readonly transitions: TransitionHandler;
        /**
         * @description The transition used by the element's show() and isShown methods. Directly modifying its
         * value will modify all elements' default showTransition. Unless this is the desired outcome, set it to a
         * new custom Transition.
         */
        showTransition: Transition;
        /**
         * @description Object containing the pending styles to be applied on next animation frame.
         */
        pendingStyles: PartialRecord<keyof CSSStyleDeclaration, string>;
        /**
         * @description Boolean indicating whether the element is shown or not, based on its showTransition.
         */
        readonly isShown: boolean;
        /**
         * @description Set a certain style attribute of the element to the provided value.
         * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
         * @param {string} value - A string representing the value to set the attribute to.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        setStyle(attribute: keyof CSSStyleDeclaration, value: string | number, instant?: boolean): this;
        /**
         * @description Set a certain style attribute of the element to the provided value.
         * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
         * @param {string} value - A string representing the value to set the attribute to.
         * @param {string} [separator=", "] - The separator to use between the existing and new value.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        appendStyle(attribute: keyof CSSStyleDeclaration, value: string | number, separator?: string, instant?: boolean): this;
        /**
         * @description Parses and applies the given CSS to the element's inline styles.
         * @param {string | PartialRecord<keyof CSSStyleDeclaration, string | number>} styles - A CSS string of style
         * attributes and their values, seperated by semicolons, or an object of CSS properties. Use the css literal
         * function for autocompletion.
         * @param {boolean} [instant=false] - If true, will set the fields directly. Otherwise, will set them on next
         * animation frame.
         * @returns {this} Itself, allowing for method chaining.
         */
        setStyles(styles: StylesType, instant?: boolean): this;
        /**
         * @description Apply the pending styles to the element.
         */
        applyStyles(): void;
        /**
         * @description Show or hide the element (based on CSS) by transitioning in/out of the element's showTransition.
         * @param {boolean} b - Whether to show the element or not
         * @returns {this} Itself, allowing for method chaining.
         */
        show(b: boolean): this;
    }
}

/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string} [styles] - The css string. Use the css literal function for autocompletion.
 * @param {StylesRoot} [root] - The root to which the style element will be added.
 */
declare function stylesheet(styles?: string, root?: StylesRoot): void;

declare const SvgNamespace = "http://www.w3.org/2000/svg";
declare const MathMLNamespace = "http://www.w3.org/1998/Math/MathML";
declare const SvgTagsDefinitions: Record<SVGTag, any>;
declare const MathMLTagsDefinitions: Record<MathMLTag, any>;
/**
 * @description Evaluates whether the provided string is an SVG tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the SVG namespace or not.
 */
declare function isSvgTag(tag?: string): boolean;
/**
 * @description Evaluates whether the provided string is a MathML tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the MathML namespace or not.
 */
declare function isMathMLTag(tag?: string): boolean;

/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 */
declare class TurboElement extends HTMLElement {
    constructor(properties?: TurboProperties);
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    /**
     * @description Static configuration object.
     */
    static readonly config: any;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value: typeof this.config): void;
}

declare global {
    interface Node {
        /**
         * @description Execute a callback on the node while still benefiting from chaining.
         * @param {(el: this) => void} callback The function to execute, with 1 parameter representing the instance
         * itself.
         * @returns {this} Itself, allowing for method chaining.
         */
        execute(callback: ((el: this) => void)): this;
    }
    interface Element {
        /**
         * @description Sets the value of an attribute on the underlying element.
         * @param {string} name The name of the attribute.
         * @param {string | number | boolean} [value] The value of the attribute. Can be left blank to represent
         * a true boolean.
         * @returns {this} Itself, allowing for method chaining.
         */
        setAttribute(name: string, value?: string | number | boolean): this;
        /**
         * @description Removes an attribute from the underlying element.
         * @param {string} name The name of the attribute to remove.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAttribute(name: string): this;
    }
    interface HTMLElement {
        /**
         * @description Causes the element to lose focus.
         * @returns {this} Itself, allowing for method chaining.
         */
        blur(): this;
        /**
         * @description Sets focus on the element.
         * @returns {this} Itself, allowing for method chaining.
         */
        focus(): this;
    }
}

declare function updateChainingPropertiesInElementPrototype(): void;

/**
 * @type {ChildHandler}
 * @description A type that represents all entities that can hold and manage children (an element or a shadow root).
 */
type ChildHandler = Node | ShadowRoot;
declare global {
    interface Node {
        /**
         * @description The child handler object associated with the node. It is the node itself (if it is handling
         * its children) or its shadow root (if defined).
         */
        readonly childHandler: ChildHandler;
        /**
         * @description Static array of all the child nodes of the node.
         */
        readonly childNodesArray: Node[];
        /**
         * @description Static array of all the child elements of the node.
         */
        readonly childrenArray: Element[];
        /**
         * @description Static array of all the sibling nodes (including the node itself) of the node.
         */
        readonly siblingNodes: Node[];
        /**
         * @description Static array of all the sibling elements (including the element itself, if it is one) of the node.
         */
        readonly siblings: Element[];
        /**
         * @description Removes the node from the document.
         * @returns {this} Itself, allowing for method chaining.
         */
        remove(): this;
        /**
         * @description Add one or more children to the referenced parent node.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes.
         * @param {number} [index] - The position at which to add the child relative to the parent's child list.
         * Leave undefined to add the child at the end.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        addChild(children?: Node | Node[], index?: number, referenceList?: Node[] | NodeListOf<Node>): this;
        /**
         * @description Remove one or more children from the referenced parent node.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeChild(children?: Node | Node[]): this;
        /**
         * @description Add one or more children to the referenced parent node before the provided sibling. If the
         * sibling is not found in the parent's children, the nodes will be added to the end of the parent's child list.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes to insert before sibling.
         * @param {Node} [sibling] - The sibling node to insert the children before.
         * @returns {this} Itself, allowing for method chaining.
         */
        addChildBefore(children?: Node | Node[], sibling?: Node): this;
        /**
         * @description Remove one or more child nodes from the referenced parent node.
         * @param {number} [index] - The index of the child(ren) to remove.
         * @param {number} [count=1] - The number of children to remove.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement and count. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeChildAt(index?: number, count?: number, referenceList?: Node[] | NodeListOf<Node>): this;
        /**
         * @description Remove all children of the node.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * representing all the nodes to remove. Defaults to the node's `childrenArray`.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllChildren(referenceList?: Node[] | NodeListOf<Node>): this;
        /**
         * @description Returns the child of the parent node at the given index. Any number inputted (including negatives)
         * will be reduced modulo length of the list size.
         * @param {number} [index] - The index of the child to retrieve.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {Node | Element | null} The child at the given index, or `null` if the index is invalid.
         */
        childAt<ChildType extends Node | Element>(index?: number, referenceList?: ChildType[] | NodeListOf<ChildType>): ChildType | null;
        /**
         * @description Returns the index of the given child.
         * @param {Node} [child] - The child element to find.
         * @param {Node[] | NodeListOf<Node>} [referenceList=this.childrenArray] - The child list to
         * use as computation reference for index placement. Defaults to the node's `childrenArray`.
         * @returns {number} The index of the child node in the provided list, or -1 if the child is not found.
         */
        indexOfChild(child?: Node, referenceList?: Node[] | NodeListOf<Node>): number;
        /**
         * @description Identify whether one or more children belong to this parent node.
         * @param {Node | Node[]} [children] - Array of (or single) child nodes.
         * @returns {boolean} A boolean indicating whether the provided nodes belong to the parent or not.
         */
        hasChild(children?: Node | Node[]): boolean;
        /**
         * @description Finds whether one or more children belong to this node.
         * @param {Node | Node[]} [children] - The child or children to check.
         * @returns {boolean} True if the children belong to the node, false otherwise.
         */
        findInSubTree(children?: Node | Node[]): boolean;
        /**
         * @description Finds whether this node is within the given parent(s).
         * @param {Node | Node[]} [parents] - The parent(s) to check.
         * @returns {boolean} True if the node is within the given parents, false otherwise.
         */
        findInParents(parents?: Node | Node[]): boolean;
        /**
         * @description Finds whether one or more children belong to this node.
         * @param {Node[]} [referenceList=this.siblings] - The siblings list to use as computation
         * reference for index placement. Defaults to the node's `siblings`.
         * @returns {boolean} True if the children belong to the node, false otherwise.
         */
        indexInParent(referenceList?: Node[]): number;
    }
    interface ChildNode {
        /**
         * @description Removes the node from the document.
         * @returns {this} Itself, allowing for method chaining.
         */
        remove(): this;
    }
    interface Element {
        /**
         * @description Removes the element from the document.
         * @returns {this} Itself, allowing for method chaining.
         */
        remove(): this;
        /**
         * Finds the closest ancestor of the current element (or the current element itself) that matches the provided
         * CSS selector or element type.
         * @param {ValidTag | (new (...args: any[]) => Element)} type - The (valid) CSS selector string, or element
         * constructor/class to match.
         * @returns {Element | null} The matching ancestor element, or null if no match is found.
         */
        closest<TagOrType extends ValidTag | (new (...args: any[]) => Element)>(this: Element, type: TagOrType | (new (...args: any[]) => TagOrType)): (TagOrType extends ValidTag ? ValidElement<TagOrType> : TagOrType) | null;
    }
}

declare function addChildManipulationToElementPrototype(): void;

declare global {
    interface Element {
        /**
         * @description Add one or more CSS classes to the element.
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
         * @returns {this} Itself, allowing for method chaining.
         */
        addClass(classes?: string | string[]): this;
        /**
         * @description Remove one or more CSS classes from the element.
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeClass(classes?: string | string[]): this;
        /**
         * @description Toggle one or more CSS classes in the element.
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings.
         * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
         * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
         * @returns {this} Itself, allowing for method chaining.
         */
        toggleClass(classes?: string | string[], force?: boolean): this;
        /**
         * @description Check if the element's class list contains the provided class(es).
         * @param {string | string[]} [classes] - String of classes separated by spaces, or array of strings
         * @return A boolean indicating whether the provided classes are included
         */
        hasClass(classes?: string | string[]): boolean;
    }
}

declare function addClassManipulationToElementPrototype(): void;

declare global {
    interface Element {
        /**
         * Sets the declared properties to the element.
         * @param {TurboProperties<Tag>} properties - The properties object.
         * @param {boolean} [setOnlyBaseProperties=false] - If set to true, will only set the base turbo properties (classes,
         * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
         * @returns {this} Itself, allowing for method chaining.
         * @template Tag
         */
        setProperties<Tag extends ValidTag>(properties: TurboProperties<Tag>, setOnlyBaseProperties?: boolean): this;
    }
    interface Node {
        /**
         * @description Destroys the node by removing it from the document and removing all its bound listeners.
         * @returns {this} Itself, allowing for method chaining.
         */
        destroy(): this;
    }
}

declare function addElementManipulationToElementPrototype(): void;

type ListenerEntry = {
    target: Node;
    type: string;
    originalListener: EventListenerOrEventListenerObject | ((e: Event, el: Node) => void);
    listener: EventListenerOrEventListenerObject;
    options?: boolean | AddEventListenerOptions;
};
declare global {
    interface Node {
        /**
         * @description Readonly set of listeners bound to this node.
         */
        readonly boundListeners: Set<ListenerEntry>;
        /**
         * @description Adds an event listener to the element.
         * @param {string} type - The type of the event.
         * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function
         * or object that receives a notification.
         * @param {Node} [boundTo=this] - The element or node to which the listener is bound. Defaults to the element
         * itself.
         * @param {boolean | AddEventListenerOptions} [options] - An options object that specifies characteristics
         * about the event listener.
         * @returns {this} Itself, allowing for method chaining.
         */
        addListener<Type extends Node>(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: Type) => void), boundTo?: Node, options?: boolean | AddEventListenerOptions): Type;
        /**
         * @description Removes an event listener that is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener - The function or object
         * that receives a notification.
         * @param {boolean | EventListenerOptions} [options] - An options object that specifies characteristics about
         * the event listener.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): this;
        /**
         * @description Removes all event listeners bound to the element (in its boundListeners list) assigned to the
         * specified type.
         * @param {string} type - The type of the event.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListenersByType(type: string): this;
        /**
         * @description Removes all event listeners bound to the element (in its boundListeners list).
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllListeners(): this;
    }
}

declare function addListenerManipulationToElementPrototype(): void;

declare function addStylesManipulationToElementPrototype(): void;

declare global {
    interface Document extends Node {
    }
    interface DocumentFragment extends Node {
    }
    interface HTMLDocument extends Document {
    }
    interface XMLDocument extends Document {
    }
    interface CharacterData extends Node {
    }
    interface Text extends CharacterData {
    }
    interface Comment extends CharacterData {
    }
    interface CDATASection extends CharacterData {
    }
    interface Element extends Node {
    }
    interface HTMLElement extends Element {
    }
    interface SVGElement extends Element {
    }
    interface MathMLElement extends Element {
    }
    interface TurboElement extends HTMLElement {
    }
    interface ShadowRoot extends Element {
    }
    interface ChildNode extends Node {
    }
    interface ProcessingInstruction extends Node {
    }
    interface DocumentType extends Node {
    }
    interface EntityReference extends Node {
    }
    interface Entity extends Node {
    }
    interface Notation extends Node {
    }
    interface HTMLAnchorElement extends HTMLElement {
    }
    interface HTMLAreaElement extends HTMLElement {
    }
    interface HTMLAudioElement extends HTMLElement {
    }
    interface HTMLBaseElement extends HTMLElement {
    }
    interface HTMLQuoteElement extends HTMLElement {
    }
    interface HTMLBodyElement extends HTMLElement {
    }
    interface HTMLBRElement extends HTMLElement {
    }
    interface HTMLButtonElement extends HTMLElement {
    }
    interface HTMLCanvasElement extends HTMLElement {
    }
    interface HTMLTableCaptionElement extends HTMLElement {
    }
    interface HTMLTableColElement extends HTMLElement {
    }
    interface HTMLDataElement extends HTMLElement {
    }
    interface HTMLDataListElement extends HTMLElement {
    }
    interface HTMLModElement extends HTMLElement {
    }
    interface HTMLDetailsElement extends HTMLElement {
    }
    interface HTMLDialogElement extends HTMLElement {
    }
    interface HTMLDivElement extends HTMLElement {
    }
    interface HTMLDListElement extends HTMLElement {
    }
    interface HTMLEmbedElement extends HTMLElement {
    }
    interface HTMLFieldSetElement extends HTMLElement {
    }
    interface HTMLFormElement extends HTMLElement {
    }
    interface HTMLHeadingElement extends HTMLElement {
    }
    interface HTMLHeadElement extends HTMLElement {
    }
    interface HTMLHRElement extends HTMLElement {
    }
    interface HTMLHtmlElement extends HTMLElement {
    }
    interface HTMLIFrameElement extends HTMLElement {
    }
    interface HTMLImageElement extends HTMLElement {
    }
    interface HTMLInputElement extends HTMLElement {
    }
    interface HTMLLabelElement extends HTMLElement {
    }
    interface HTMLLegendElement extends HTMLElement {
    }
    interface HTMLLIElement extends HTMLElement {
    }
    interface HTMLLinkElement extends HTMLElement {
    }
    interface HTMLMapElement extends HTMLElement {
    }
    interface HTMLMenuElement extends HTMLElement {
    }
    interface HTMLMetaElement extends HTMLElement {
    }
    interface HTMLMeterElement extends HTMLElement {
    }
    interface HTMLObjectElement extends HTMLElement {
    }
    interface HTMLOListElement extends HTMLElement {
    }
    interface HTMLOptGroupElement extends HTMLElement {
    }
    interface HTMLOptionElement extends HTMLElement {
    }
    interface HTMLOutputElement extends HTMLElement {
    }
    interface HTMLParagraphElement extends HTMLElement {
    }
    interface HTMLPictureElement extends HTMLElement {
    }
    interface HTMLPreElement extends HTMLElement {
    }
    interface HTMLProgressElement extends HTMLElement {
    }
    interface HTMLQuoteElement extends HTMLElement {
    }
    interface HTMLScriptElement extends HTMLElement {
    }
    interface HTMLSelectElement extends HTMLElement {
    }
    interface HTMLSlotElement extends HTMLElement {
    }
    interface HTMLSourceElement extends HTMLElement {
    }
    interface HTMLSpanElement extends HTMLElement {
    }
    interface HTMLStyleElement extends HTMLElement {
    }
    interface HTMLTableElement extends HTMLElement {
    }
    interface HTMLTableSectionElement extends HTMLElement {
    }
    interface HTMLTableCellElement extends HTMLElement {
    }
    interface HTMLTemplateElement extends HTMLElement {
    }
    interface HTMLTextAreaElement extends HTMLElement {
    }
    interface HTMLTableSectionElement extends HTMLElement {
    }
    interface HTMLTimeElement extends HTMLElement {
    }
    interface HTMLTitleElement extends HTMLElement {
    }
    interface HTMLTableRowElement extends HTMLElement {
    }
    interface HTMLTrackElement extends HTMLElement {
    }
    interface HTMLUListElement extends HTMLElement {
    }
    interface HTMLVideoElement extends HTMLElement {
    }
    interface HTMLAppletElement extends HTMLElement {
    }
    interface HTMLFrameElement extends HTMLElement {
    }
    interface HTMLFrameSetElement extends HTMLElement {
    }
    interface HTMLMarqueeElement extends HTMLElement {
    }
    interface SVGSVGElement extends SVGElement {
    }
    interface SVGCircleElement extends SVGElement {
    }
    interface SVGEllipseElement extends SVGElement {
    }
    interface SVGLineElement extends SVGElement {
    }
    interface SVGPathElement extends SVGElement {
    }
    interface SVGPolygonElement extends SVGElement {
    }
    interface SVGPolylineElement extends SVGElement {
    }
    interface SVGRectElement extends SVGElement {
    }
    interface SVGTextElement extends SVGElement {
    }
    interface SVGUseElement extends SVGElement {
    }
    interface SVGImageElement extends SVGElement {
    }
    interface SVGAElement extends SVGElement {
    }
    interface SVGDefsElement extends SVGElement {
    }
    interface SVGGradientElement extends SVGElement {
    }
    interface SVGSymbolElement extends SVGElement {
    }
    interface SVGMarkerElement extends SVGElement {
    }
    interface SVGClipPathElement extends SVGElement {
    }
    interface SVGMPathElement extends SVGElement {
    }
    interface SVGMaskElement extends SVGElement {
    }
    interface SVGMetadataElement extends SVGElement {
    }
    interface SVGPatternElement extends SVGElement {
    }
    interface SVGStopElement extends SVGElement {
    }
    interface SVGSwitchElement extends SVGElement {
    }
    interface SVGViewElement extends SVGElement {
    }
    interface SVGDescElement extends SVGElement {
    }
    interface SVGForeignObjectElement extends SVGElement {
    }
    interface SVGTitleElement extends SVGElement {
    }
    interface SVGScriptElement extends SVGElement {
    }
    interface SVGStyleElement extends SVGElement {
    }
    interface SVGFontElement extends SVGElement {
    }
    interface SVGFontFaceElement extends SVGElement {
    }
    interface SVGGElement extends SVGElement {
    }
    interface SVGSymbolElement extends SVGElement {
    }
    interface SVGTextPathElement extends SVGElement {
    }
    interface SVGTSpanElement extends SVGElement {
    }
    interface SVGAltGlyphElement extends SVGElement {
    }
    interface SVGAltGlyphDefElement extends SVGElement {
    }
    interface SVGAltGlyphItemElement extends SVGElement {
    }
    interface SVGGlyphElement extends SVGElement {
    }
    interface SVGMissingGlyphElement extends SVGElement {
    }
    interface SVGAnimateElement extends SVGElement {
    }
    interface SVGAnimateMotionElement extends SVGElement {
    }
    interface SVGAnimateTransformElement extends SVGElement {
    }
    interface SVGDiscardElement extends SVGElement {
    }
    interface SVGFEBlendElement extends SVGElement {
    }
    interface SVGFEColorMatrixElement extends SVGElement {
    }
    interface SVGFEComponentTransferElement extends SVGElement {
    }
    interface SVGFECompositeElement extends SVGElement {
    }
    interface SVGFEConvolveMatrixElement extends SVGElement {
    }
    interface SVGFEDiffuseLightingElement extends SVGElement {
    }
    interface SVGFEDisplacementMapElement extends SVGElement {
    }
    interface SVGFEDistantLightElement extends SVGElement {
    }
    interface SVGFEDropShadowElement extends SVGElement {
    }
    interface SVGFEFloodElement extends SVGElement {
    }
    interface SVGFEFuncAElement extends SVGElement {
    }
    interface SVGFEFuncBElement extends SVGElement {
    }
    interface SVGFEFuncGElement extends SVGElement {
    }
    interface SVGFEFuncRElement extends SVGElement {
    }
    interface SVGFEGaussianBlurElement extends SVGElement {
    }
    interface SVGFEImageElement extends SVGElement {
    }
    interface SVGFEMergeElement extends SVGElement {
    }
    interface SVGFEMergeNodeElement extends SVGElement {
    }
    interface SVGFEMorphologyElement extends SVGElement {
    }
    interface SVGFEOffsetElement extends SVGElement {
    }
    interface SVGFEPointLightElement extends SVGElement {
    }
    interface SVGFESpecularLightingElement extends SVGElement {
    }
    interface SVGFESpotLightElement extends SVGElement {
    }
    interface SVGFETileElement extends SVGElement {
    }
    interface SVGFETurbulenceElement extends SVGElement {
    }
    interface SVGFilterElement extends SVGElement {
    }
    interface SVGForeignObjectElement extends SVGElement {
    }
    interface SVGHatchElement extends SVGElement {
    }
    interface SVGHatchpathElement extends SVGElement {
    }
    interface SVGMeshElement extends SVGElement {
    }
    interface SVGMeshgradientElement extends SVGElement {
    }
    interface SVGMeshpatchElement extends SVGElement {
    }
    interface SVGMeshrowElement extends SVGElement {
    }
    interface SVGSolidcolorElement extends SVGElement {
    }
    interface SVGVKernElement extends SVGElement {
    }
    interface MathMLElement extends Element {
    }
    interface MathMLMathElement extends MathMLElement {
    }
    interface MathMLAnnotationElement extends MathMLElement {
    }
    interface MathMLAnnotationXmlElement extends MathMLElement {
    }
    interface MathMLMencloseElement extends MathMLElement {
    }
    interface MathMLMerrorElement extends MathMLElement {
    }
    interface MathMLMfencedElement extends MathMLElement {
    }
    interface MathMLMfracElement extends MathMLElement {
    }
    interface MathMLMiElement extends MathMLElement {
    }
    interface MathMLMnElement extends MathMLElement {
    }
    interface MathMLMoElement extends MathMLElement {
    }
    interface MathMLMoverElement extends MathMLElement {
    }
    interface MathMLMunderElement extends MathMLElement {
    }
    interface MathMLMunderoverElement extends MathMLElement {
    }
    interface MathMLMsElement extends MathMLElement {
    }
    interface MathMLMsubElement extends MathMLElement {
    }
    interface MathMLMsupElement extends MathMLElement {
    }
    interface MathMLMsubsupElement extends MathMLElement {
    }
    interface MathMLMtableElement extends MathMLElement {
    }
    interface MathMLMtdElement extends MathMLElement {
    }
    interface MathMLMtrElement extends MathMLElement {
    }
    interface MathMLMtextElement extends MathMLElement {
    }
    interface MathMLMspaceElement extends MathMLElement {
    }
    interface MathMLMsqrtElement extends MathMLElement {
    }
    interface MathMLMrootElement extends MathMLElement {
    }
    interface MathMLMrowElement extends MathMLElement {
    }
    interface MathMLMstyleElement extends MathMLElement {
    }
    interface MathMLMtokenElement extends MathMLElement {
    }
    interface MathMLSemanticsElement extends MathMLElement {
    }
    interface MathMLNoneElement extends MathMLElement {
    }
}

declare function turbofy(): void;

declare class Delegate<CallbackType extends (...args: any[]) => any> {
    private callbacks;
    /**
     * @description Adds a callback to the list.
     * @param callback - The callback function to add.
     */
    add(callback: CallbackType): void;
    /**
     * @description Removes a callback from the list.
     * @param callback - The callback function to remove.
     * @returns A boolean indicating whether the callback was found and removed.
     */
    remove(callback: CallbackType): boolean;
    /**
     * @description Invokes all callbacks with the provided arguments.
     * @param args - The arguments to pass to the callbacks.
     */
    fire(...args: Parameters<CallbackType>): void;
    /**
     * @description Clears added callbacks
     */
    clear(): void;
}

declare const TurboKeyEventName: {
    readonly keyPressed: "turbo-key-pressed";
    readonly keyReleased: "turbo-key-released";
};
declare const TurboClickEventName: {
    readonly click: "turbo-click";
    readonly clickStart: "turbo-click-start";
    readonly clickEnd: "turbo-click-end";
    readonly longPress: "turbo-long-press";
};
declare const TurboMoveName: {
    readonly move: "turbo-move";
};
declare const TurboDragEventName: {
    readonly drag: "turbo-drag";
    readonly dragStart: "turbo-drag-start";
    readonly dragEnd: "turbo-drag-end";
};
declare const TurboWheelEventName: {
    readonly trackpadScroll: "turbo-trackpad-scroll";
    readonly trackpadPinch: "turbo-trackpad-pinch";
    readonly mouseWheel: "turbo-mouse-wheel";
};
declare const TurboEventName: {
    readonly selectInput: "turbo-select-input";
    readonly trackpadScroll: "turbo-trackpad-scroll";
    readonly trackpadPinch: "turbo-trackpad-pinch";
    readonly mouseWheel: "turbo-mouse-wheel";
    readonly drag: "turbo-drag";
    readonly dragStart: "turbo-drag-start";
    readonly dragEnd: "turbo-drag-end";
    readonly move: "turbo-move";
    readonly keyPressed: "turbo-key-pressed";
    readonly keyReleased: "turbo-key-released";
    readonly click: "turbo-click";
    readonly clickStart: "turbo-click-start";
    readonly clickEnd: "turbo-click-end";
    readonly longPress: "turbo-long-press";
};
/**
 * @description Object containing the names of events fired by default by the turboComponents. Modifying it (prior to
 * setting up new turbo components) will subsequently alter the events that the instantiated components will listen for.
 */
declare const DefaultEventName: {
    keyPressed: string;
    keyReleased: string;
    click: string;
    clickStart: string;
    clickEnd: string;
    longPress: "turbo-long-press";
    move: string;
    drag: "turbo-drag";
    dragStart: "turbo-drag-start";
    dragEnd: "turbo-drag-end";
    wheel: string;
    trackpadScroll: string;
    trackpadPinch: string;
    mouseWheel: string;
    scroll: string;
    input: string;
    change: string;
    focus: string;
    blur: string;
};
type DefaultEventNameEntry = typeof DefaultEventName[keyof typeof DefaultEventName];
type TurboEventNameEntry = typeof TurboEventName[keyof typeof TurboEventName];

type TurboEventManagerStateProperties = {
    enabled?: boolean;
    preventDefaultWheel?: boolean;
    preventDefaultMouse?: boolean;
    preventDefaultTouch?: boolean;
};
type DisabledTurboEventTypes = {
    disableKeyEvents?: boolean;
    disableWheelEvents?: boolean;
    disableMouseEvents?: boolean;
    disableTouchEvents?: boolean;
    disableClickEvents?: boolean;
    disableDragEvents?: boolean;
    disableMoveEvent?: boolean;
};
type TurboEventManagerProperties = TurboEventManagerStateProperties & DisabledTurboEventTypes & {
    moveThreshold?: number;
    longPressDuration?: number;
};
type TurboEventManagerLockStateProperties = TurboEventManagerStateProperties & {
    lockOrigin?: Element;
};
declare enum ActionMode {
    none = 0,
    click = 1,
    longPress = 2,
    drag = 3
}
declare enum ClickMode {
    none = 0,
    left = 1,
    right = 2,
    middle = 3,
    other = 4,
    key = 5
}
declare enum InputDevice {
    unknown = 0,
    mouse = 1,
    trackpad = 2,
    touch = 3
}

type Coordinate<Type = number> = {
    x: Type;
    y: Type;
};

declare class Point {
    readonly x: number;
    readonly y: number;
    /**
     * @description Create a point with coordinates (0, 0)
     */
    constructor();
    /**
     * @description Create a point with coordinates (n, n)
     * @param {number} n - The input value
     */
    constructor(n: number);
    /**
     * @description Create a point with coordinates (x, y)
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     */
    constructor(x: number, y: number);
    /**
     * @description Create a point with the clientX/clientY values. Useful for events.
     * @param {{clientX: number, clientY: number}} e - The coordinates
     */
    constructor(e: {
        clientX: number;
        clientY: number;
    });
    /**
     * @description Create a point with the provided coordinates
     * @param {Coordinate} p - The coordinates (or Point)
     */
    constructor(p: Coordinate);
    /**
     * @description Create a point with the provided [x, y] values.
     * @param {[number, number]} arr - The array of size 2.
     */
    constructor(arr: [number, number]);
    constructor(x: number | Coordinate | {
        clientX: number;
        clientY: number;
    } | [number, number]);
    /**
     * @description Calculate the distance between two Position2D points.
     * @param {Point} p1 - First point
     * @param {Point} p2 - Second point
     */
    static dist(p1: Coordinate, p2: Coordinate): number;
    /**
     * @description Calculate the mid-point from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static midPoint(...arr: Coordinate[]): Point;
    /**
     * @description Calculate the max on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static max(...arr: Coordinate[]): Point;
    /**
     * @description Calculate the min on both x and y from the provided points
     * @param {Point[]} arr - Undetermined number of point parameters
     */
    static min(...arr: Coordinate[]): Point;
    /**
     * @description Determine whether this point is equal to the provided coordinates
     * @param {Coordinate} p - The coordinates to compare it to
     * @return A boolean indicating whether they are equal
     */
    equals(p: Coordinate): boolean;
    /**
     * @description Determine whether this point is equal to the provided coordinates
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @return A boolean indicating whether they are equal
     */
    equals(x: number, y: number): boolean;
    boundX(x1: number, x2: number): number;
    boundY(y1: number, y2: number): number;
    bound(n1: number, n2: number): Point;
    /**
     * @description Add coordinates to this point
     * @param {number} n - The value to add to both x and y
     * @returns A new Point object with the result
     */
    add(n: number): Point;
    /**
     * @description Add coordinates to this point
     * @param {number} x - The value to add to the x coordinate
     * @param {number} y - The value to add to the y coordinate
     * @returns A new Point object with the result
     */
    add(x: number, y: number): Point;
    /**
     * @description Add coordinates to this point
     * @param {Coordinate} p - The coordinates to add
     * @returns A new Point object with the result
     */
    add(p: Coordinate): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {number} n - The value to subtract from both x and y
     * @returns A new Point object with the result
     */
    sub(n: number): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {number} x - The value to subtract from the x coordinate
     * @param {number} y - The value to subtract from the y coordinate
     * @returns A new Point object with the result
     */
    sub(x: number, y: number): Point;
    /**
     * @description Subtract coordinates from this point
     * @param {Coordinate} p - The coordinates to subtract
     * @returns A new Point object with the result
     */
    sub(p: Coordinate): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {number} n - The value to multiply both x and y
     * @returns A new Point object with the result
     */
    mul(n: number): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {number} x - The value to multiply the x coordinate
     * @param {number} y - The value to multiply the y coordinate
     * @returns A new Point object with the result
     */
    mul(x: number, y: number): Point;
    /**
     * @description Multiply coordinates of this point
     * @param {Coordinate} p - The coordinates to multiply
     * @returns A new Point object with the result
     */
    mul(p: Coordinate): Point;
    /**
     * @description Divide coordinates of this point
     * @param {number} n - The value to divide both x and y
     * @returns A new Point object with the result
     */
    div(n: number): Point;
    /**
     * @description Divide coordinates of this point
     * @param {number} x - The value to divide the x coordinate
     * @param {number} y - The value to divide the y coordinate
     * @returns A new Point object with the result
     */
    div(x: number, y: number): Point;
    /**
     * @description Divide coordinates of this point
     * @param {Coordinate} p - The coordinates to divide
     * @returns A new Point object with the result
     */
    div(p: Coordinate): Point;
    /**
     * @description Calculate the absolute value of the coordinates
     * @returns A new Point object with the absolute values
     */
    abs(): Point;
    /**
     * @description Get the maximum value between x and y coordinates
     * @returns The maximum value
     */
    max(): number;
    /**
     * @description Get the minimum value between x and y coordinates
     * @returns The minimum value
     */
    min(): number;
    /**
     * @description Create a copy of the current point
     * @returns A new Point object with the same coordinates
     */
    copy(): Point;
    /**
     * @description Get the coordinates as an array
     * @returns An array with x and y coordinates
     */
    arr(): number[];
}

declare enum ClosestOrigin {
    target = "target",
    position = "position"
}

declare class TurboMap<KeyType, ValueType> extends Map<KeyType, ValueType> {
    enforceImmutability: boolean;
    set(key: KeyType, value: ValueType): any;
    get(key: KeyType): ValueType;
    get first(): ValueType | null;
    get last(): ValueType | null;
    keysArray(): KeyType[];
    valuesArray(): ValueType[];
    private copy;
    mapKeys<C>(callback: (key: KeyType, value: ValueType) => C): TurboMap<C, ValueType>;
    mapValues<C>(callback: (key: KeyType, value: ValueType) => C): TurboMap<KeyType, C>;
    filter(callback: (key: KeyType, value: ValueType) => boolean): TurboMap<KeyType, ValueType>;
    merge(map: Map<KeyType, ValueType>): TurboMap<KeyType, ValueType>;
}

/**
 * Generic turbo event
 */
declare class TurboEvent extends Event {
    /**
     * @description The click mode of the fired event
     */
    readonly clickMode: ClickMode;
    /**
     * @description The keys pressed when the event was fired
     */
    readonly keys: string[];
    /**
     * @description The screen position from where the event was fired
     */
    readonly position: Point;
    constructor(position: Point, clickMode: ClickMode, keys: string[], eventName: TurboEventNameEntry, eventInitDict?: EventInit);
    /**
     * @description Returns the closest element of the provided type to the target (Searches through the element and
     * all its parents to find one of matching type).
     * @param type
     * @param strict
     * @param from
     */
    closest<T extends Element>(type: new (...args: any[]) => T, strict?: boolean, from?: ClosestOrigin): T | null;
    /**
     * @description Checks if the position is inside the given element's bounding box.
     * @param position
     * @param element
     */
    private isPositionInsideElement;
    /**
     * @description The target of the event (as an Element - or the document)
     */
    get target(): Element | Document;
    /**
     * @description The position of the fired event transformed and/or scaled using the class's scalePosition().
     */
    get scaledPosition(): Point;
    /**
     * @description Function to be overridden to specify how to transform a position from screen to document space.
     * @param position
     */
    scalePosition(position: Point): Point;
    /**
     * @description Function to be overridden to specify when to allow transformation and/or scaling (or not).
     */
    authorizeScaling(): boolean;
    /**
     * @private
     * @description Takes a map of points and returns a new map where each point is transformed accordingly.
     * @param positions
     */
    protected scalePositionsMap(positions?: TurboMap<number, Point>): TurboMap<number, Point>;
}

/**
 * @class TurboDragEvent
 * @extends TurboEvent
 * @description Turbo drag event class, fired on turbo-drag, turbo-drag-start, turbo-drag-end, etc.
 */
declare class TurboDragEvent extends TurboEvent {
    /**
     * @description Map containing the origins of the dragging points
     */
    readonly origins: TurboMap<number, Point>;
    /**
     * @description Map containing the previous positions of the dragging points
     */
    readonly previousPositions: TurboMap<number, Point>;
    /**
     * @description Map containing the positions of the dragging points
     */
    readonly positions: TurboMap<number, Point>;
    constructor(origins: TurboMap<number, Point>, previousPositions: TurboMap<number, Point>, positions: TurboMap<number, Point>, clickMode: ClickMode, keys: string[], eventName?: TurboEventNameEntry, eventInitDict?: EventInit);
    /**
     * @description Map of the origins mapped to the current canvas translation and scale
     */
    get scaledOrigins(): TurboMap<number, Point>;
    /**
     * @description Map of the previous positions mapped to the current canvas translation and scale
     */
    get scaledPreviousPositions(): TurboMap<number, Point>;
    /**
     * @description Map of the positions mapped to the current canvas translation and scale
     */
    get scaledPositions(): TurboMap<number, Point>;
    get deltaPositions(): TurboMap<number, Point>;
    get deltaPosition(): Point;
    get scaledDeltaPositions(): TurboMap<number, Point>;
    get scaledDeltaPosition(): Point;
}

/**
 * @class TurboKeyEvent
 * @extends TurboEvent
 * @description Custom key event
 */
declare class TurboKeyEvent extends TurboEvent {
    /**
     * @description The key pressed (if any) when the event was fired
     */
    readonly keyPressed: string;
    /**
     * @description The key released (if any) when the event was fired
     */
    readonly keyReleased: string;
    constructor(keyPressed: string, keyReleased: string, clickMode: ClickMode, keys: string[], eventName?: TurboEventNameEntry, eventInitDict?: EventInit);
}

/**
 * @class TurboWheelEvent
 * @extends TurboEvent
 * @description Custom wheel event
 */
declare class TurboWheelEvent extends TurboEvent {
    /**
     * @description The delta amount of scrolling
     */
    readonly delta: Point;
    constructor(delta: Point, keys: string[], eventName: TurboEventNameEntry, eventInitDict?: EventInit);
}

declare global {
    interface HTMLElement {
        bypassTurboEventManagerOn: (e: Event) => (boolean | TurboEventManagerStateProperties);
        bypassTurboEventManager(): this;
    }
}

/**
 * @description Class that manages default mouse, trackpad, and touch events, and accordingly fires custom events for
 * easier management of input.
 */
declare class TurboEventManager {
    private _inputDevice;
    readonly onInputDeviceChange: Delegate<(device: InputDevice) => void>;
    readonly defaultState: TurboEventManagerStateProperties;
    private readonly lockState;
    private readonly disabledEventTypes;
    private readonly currentKeys;
    private currentAction;
    private currentClick;
    private wasRecentlyTrackpad;
    private readonly origins;
    private readonly previousPositions;
    private readonly timerMap;
    private readonly moveThreshold;
    private readonly longPressDuration;
    constructor(properties?: TurboEventManagerProperties);
    private initEvents;
    destroy(): void;
    /**
     * @description The currently identified input device. It is not 100% accurate, especially when differentiating
     * between mouse and trackpad.
     */
    get inputDevice(): InputDevice;
    private set inputDevice(value);
    /**
     * @description Sets the lock state for the event manager.
     * @param origin - The element that initiated the lock state.
     * @param value - The state properties to set.
     */
    setLockState(origin: Element, value: TurboEventManagerStateProperties): void;
    /**
     * @description Resets the lock state to the default values.
     */
    resetLockState(): void;
    get enabled(): boolean;
    get preventDefaultWheel(): boolean;
    get preventDefaultMouse(): boolean;
    get preventDefaultTouch(): boolean;
    private keyDown;
    private keyUp;
    private wheel;
    private pointerDown;
    private pointerMove;
    private pointerUp;
    private pointerLeave;
    private getFireOrigin;
    /**
     * @description Fires a custom Turbo click event at the click target with the click position
     * @param p
     * @param eventName
     * @private
     */
    private fireClick;
    /**
     * @description Fires a custom Turbo drag event at the target with the origin of the drag, the last drag position, and the current position
     * @param positions
     * @param eventName
     * @private
     */
    private fireDrag;
    private setTimer;
    private clearTimer;
    private setClickMode;
    private applyEventNames;
}

declare function setupTurboEventManagerBypassing(eventManager: TurboEventManager): void;

/**
 * @type {TurboButtonProperties}
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
type TurboButtonProperties = TurboProperties & {
    buttonText?: string | Element;
    leftIcon?: string | Element;
    rightIcon?: string | Element;
    leftCustomElements?: Element | Element[];
    rightCustomElements?: Element | Element[];
    customTextTag?: HTMLTag;
    unsetDefaultClasses?: boolean;
};
/**
 * @type {ButtonChildren}
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
type ButtonChildren = {
    leftCustomElements: Element | Element[] | null;
    leftIcon: Element | null;
    buttonText: Element | null;
    rightIcon: Element | null;
    rightCustomElements: Element | Element[] | null;
};
/**
 * @type {TurboButtonConfig}
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {ValidTag} [defaultTextTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboButtonConfig = {
    defaultTextTag?: HTMLTag;
    defaultClasses?: string | string[];
};

/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
declare class TurboButton extends TurboElement {
    /**
     * @description Object containing the children of the button.
     */
    private readonly elements;
    private _buttonTextTag;
    static readonly config: TurboButtonConfig;
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboButtonProperties);
    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {Element | Element[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    private addAtPosition;
    /**
     * @description Removes a given element or elements from the button.
     * @param {Element | Element[] | null} element - The element(s) to remove.
     */
    private removeElement;
    /**
     * @description The tag of the text element in the button
     */
    get buttonTextTag(): HTMLTag;
    set buttonTextTag(value: HTMLTag | undefined);
    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    get leftCustomElements(): Element | Element[] | null;
    set leftCustomElements(value: Element | Element[] | null);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon(): Element | null;
    set leftIcon(value: string | Element | null);
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get buttonText(): Element | null;
    set buttonText(value: string | Element | null);
    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon(): Element | null;
    set rightIcon(value: string | Element | null);
    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    get rightCustomElements(): Element | Element[] | null;
    set rightCustomElements(value: Element | Element[] | null);
}
declare function button(properties: TurboButtonProperties): TurboButton;

/**
 * @type {TurboIconProperties}
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
type TurboIconProperties = TurboProperties & {
    type?: string;
    directory?: string;
    icon: string;
    iconColor?: string;
    onLoaded?: ((svg: SVGElement) => {});
    unsetDefaultClasses?: boolean;
};
/**
 * @type {TurboIconConfig}
 * @description Configuration object for the Icon class. Set it via TurboConfig.Icon.
 *
 * @property {string} [type] - The default type to assign to newly created Icons. Defaults to "svgManipulation".
 * @property {string} [[path]] - The default path to the directory containing the icons in the project. Specify the
 * directory once here to not type it again at every Icon generation.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created icons.
 */
type TurboIconConfig = {
    defaultType?: string;
    defaultDirectory?: string;
    defaultClasses?: string | string[];
};

/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
declare class TurboIcon extends TurboElement {
    private _element;
    private _type;
    private _directory;
    private _icon;
    private _iconColor;
    private _onLoaded;
    static readonly config: TurboIconConfig;
    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties);
    update(properties: TurboIconProperties): void;
    private fetchSvg;
    private generateSvg;
    private generateImg;
    private clear;
    /**
     * @description The type of the icon.
     */
    get type(): string;
    private set type(value);
    /**
     * @description The user-provided (or statically configured) directory to the icon's file.
     */
    get directory(): string;
    private set directory(value);
    /**
     * @description The path to the icon's source file.
     */
    get path(): string;
    /**
     * @description The name (or path) of the icon. Might include the file extension (to override the icon's type).
     * Setting it will update the icon accordingly.
     */
    get icon(): string;
    set icon(value: string);
    /**
     * @description The assigned color to the icon (if any)
     */
    get iconColor(): string | null;
    set iconColor(value: string | null);
    /**
     * @description The child element of the icon element (an HTML image or an SVG element).
     */
    private set element(value);
    get element(): HTMLImageElement | SVGElement;
}
declare function icon(properties: TurboIconProperties): TurboIcon;

type TurboIconToggleProperties = TurboIconProperties & {
    toggled?: boolean;
    onToggle?: (value: boolean, el: TurboIconToggle) => void;
};

declare class TurboIconToggle extends TurboIcon {
    private _toggled;
    private readonly onToggle;
    constructor(properties: TurboIconToggleProperties);
    get toggled(): boolean;
    set toggled(value: boolean);
    toggle(): void;
}
declare function iconToggle(properties: TurboIconToggleProperties): TurboIconToggle;

type ValidInputElement<Tag extends "input" | "textarea"> = Tag extends "input" ? HTMLInputElement : HTMLTextAreaElement;
type TurboInputProperties<InputTag extends "input" | "textarea" = "input"> = TurboProperties & {
    inputTag?: InputTag;
    inputProperties?: TurboProperties<InputTag>;
    label?: string;
    prefix?: string;
    suffix?: string;
    locked?: boolean;
    dynamicVerticalResize?: boolean;
    regexCheck?: RegExp | string;
    selectTextOnFocus?: boolean;
    onClick?: (e: Event) => void;
    onInput?: (e: Event) => void;
    onBlur?: (e: Event) => void;
};

declare class TurboInput<InputTag extends "input" | "textarea"> extends TurboElement {
    readonly inputElement: ValidInputElement<InputTag>;
    readonly labelElement: HTMLLabelElement;
    readonly prefixElement: HTMLSpanElement;
    readonly suffixElement: HTMLSpanElement;
    locked: boolean;
    constructor(properties?: TurboInputProperties<InputTag>);
    private setupEvents;
    get value(): string | number;
    set value(value: string | number);
}
declare function turboInput<T extends ("input" | "textarea")>(properties?: TurboInputProperties<T>): TurboInput<T>;

type TurboNumericalInputProperties = TurboInputProperties & {
    multiplier?: number;
    decimalPlaces?: number;
    min?: number;
    max?: number;
};

declare class TurboNumericalInput extends TurboInput<"input"> {
    multiplier: number;
    decimalPlaces: number;
    min: number;
    max: number;
    constructor(properties?: TurboInputProperties);
    get value(): number;
    set value(value: string | number);
}
declare function numericalInput(properties?: TurboNumericalInputProperties): TurboNumericalInput;

type TurboPopupProperties = TurboProperties & {
    popupAnchor?: Coordinate;
    parentAnchor?: Coordinate;
    fallbackModes?: Coordinate<PopupFallbackMode>;
    viewportMargin?: number | Coordinate;
    offsetFromParent?: number | Coordinate;
    unsetDefaultClasses?: boolean;
};
type DimensionProperties = {
    side: "top" | "left";
    coordinate: "y" | "x";
    size: "height" | "width";
    innerSize: "innerHeight" | "innerWidth";
    maxSize: "maxHeight" | "maxWidth";
    marginStart: "marginTop" | "marginLeft";
    marginEnd: "marginBottom" | "marginRight";
};
type TurboPopupConfig = {
    defaultClasses?: string | string[];
    defaultPopupAnchor?: Coordinate;
    defaultParentAnchor?: Coordinate;
    defaultViewportMargin?: number | Coordinate;
    defaultOffsetFromParent?: number | Coordinate;
};
declare enum PopupFallbackMode {
    invert = "invert",
    offset = "offset",
    none = "none"
}

declare class TurboPopup extends TurboElement {
    private _popupAnchor;
    private _parentAnchor;
    private _viewportMargin;
    private _offsetFromParent;
    fallbackModes: Coordinate<PopupFallbackMode>;
    static readonly config: TurboPopupConfig;
    constructor(properties?: TurboPopupProperties);
    private addListeners;
    get popupAnchor(): Point;
    set popupAnchor(value: Coordinate);
    get parentAnchor(): Point;
    set parentAnchor(value: Coordinate);
    get viewportMargin(): Point;
    set viewportMargin(value: number | Coordinate);
    get offsetFromParent(): Point;
    set offsetFromParent(value: number | Coordinate);
    get rect(): DOMRect;
    get parentRect(): DOMRect;
    get computedStyle(): CSSStyleDeclaration;
    get parentComputedStyle(): CSSStyleDeclaration;
    private recomputePosition;
    private recomputeSide;
    private recomputeMaxSize;
    private clearMaxDimensions;
    show(b: boolean): this;
    toggle(): this;
    private generateDimensionParameters;
}
declare function popup(properties?: TurboProperties): TurboPopup;

/**
 * @type {TurboDropdownEntryProperties}
 * @description Properties for configuring a DropdownEntry.
 * @extends TurboProperties
 *
 * @property {string} value - The value associated with the dropdown entry.
 * @property {boolean} [selected=false] - Indicates whether the entry is initially selected.
 * @property {string | string[]} [selectedClass=""] - CSS class(es) applied to the entry when it is selected.
 */
type TurboSelectEntryProperties<ValueType = string> = TurboProperties & {
    unsetDefaultClasses?: boolean;
    selectedClasses?: string | string[];
    value: ValueType;
    selected?: boolean;
    enabled?: boolean;
    onSelected?: (selected: boolean) => void;
    onEnabled?: (enabled: boolean) => void;
    reflectValueOn?: HTMLElement;
    inputName?: string;
};
type TurboSelectEntryConfig = {
    defaultClasses?: string | string[];
};

/**
 * @class TurboSelectEntry
 * @description Class representing an entry within a TurboSelect.
 * @extends TurboElement
 */
declare class TurboSelectEntry<ValueType = string> extends TurboElement {
    private _value;
    private _selected;
    private _enabled;
    /**
     * @description The class(es) assigned to the dropdown entry when it is selected
     */
    selectedClasses: string | string[];
    private readonly onSelected;
    private readonly onEnabled;
    private readonly reflectedElement;
    private inputElement;
    readonly config: TurboSelectEntryConfig;
    /**
     * @description DropdownEntry constructor
     * @param {TurboDropdownEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties: TurboSelectEntryProperties<ValueType>);
    /**
     * @description Toggles the selection of this dropdown entry
     */
    toggle(): void;
    /**
     * @description The value of the dropdown entry
     */
    get value(): ValueType;
    set value(value: ValueType);
    get stringValue(): string;
    /**
     * @description Whether or not the dropdown entry is selected
     */
    get selected(): boolean;
    set selected(value: boolean);
    set enabled(value: boolean);
    get inputName(): string;
    set inputName(value: string);
}
declare function selectEntry<ValueType = string>(properties: TurboSelectEntryProperties<ValueType>): TurboSelectEntry<ValueType>;

type TurboSelectProperties<EntryType extends TurboSelectEntry<ValueType>, ValueType = string> = TurboProperties & {
    unsetDefaultClasses?: boolean;
    customSelectedEntryClasses?: string;
    values?: (ValueType | TurboSelectEntryProperties<ValueType> | EntryType)[];
    selectedValues?: ValueType[];
    multiSelection?: boolean;
    forceSelection?: boolean;
    inputName?: string;
    entriesParent?: Element;
};
type TurboSelectConfig = {
    defaultClasses?: string | string[];
    defaultSelectedEntryClasses?: string | string[];
};

/**
 * Base class for creating a selection menu
 * @class TurboSelect
 * @extends TurboElement
 */
declare class TurboSelect<EntryType extends TurboSelectEntry<ValueType>, ValueType = string> extends TurboElement {
    /**
     * The dropdown's entries.
     */
    readonly entries: EntryType[];
    protected entriesParent: Element;
    enabled: boolean;
    /**
     * The dropdown's underlying hidden input. Might be undefined.
     */
    readonly inputName: string;
    private readonly multiSelection;
    private readonly forceSelection;
    private readonly selectedEntryClasses;
    static readonly config: TurboSelectConfig;
    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties: TurboSelectProperties<EntryType, ValueType>);
    protected addEntry(entry: ValueType | TurboSelectEntryProperties<ValueType> | EntryType): EntryType;
    protected onEntryClick(entry: EntryType, e?: Event): void;
    /**
     * @description Select an entry.
     * @param {string | EntryType} entry - The DropdownEntry (or its string value) to select.
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    select(entry: ValueType | EntryType): this;
    /**
     * @description Select an entry.
     * @param {number} index - The index of the entry to select
     * @param {(index: number, entriesCount: number, zero?: number) => number} [preprocess=trim] - Callback to execute
     * on the index to preprocess it. Defaults to trim().
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    selectByIndex(index: number, preprocess?: (index: number, entriesCount: number, zero?: number) => number): this;
    deselectAll(): void;
    reset(): void;
    get enabledEntries(): EntryType[];
    get enabledValues(): ValueType[];
    find(value: ValueType): EntryType;
    findAll(...values: ValueType[]): EntryType[];
    enable(b: boolean, ...entries: (ValueType | EntryType)[]): void;
    /**
     * @description The dropdown's currently selected entries
     */
    get selectedEntries(): EntryType[];
    get selectedEntry(): EntryType;
    /**
     * @description The dropdown's currently selected values
     */
    get selectedValues(): ValueType[];
    get selectedValue(): ValueType;
    get stringSelectedValue(): string;
    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    get values(): ValueType[];
    set values(values: (ValueType | TurboSelectEntryProperties<ValueType> | EntryType)[]);
}
declare function select<EntryType extends TurboSelectEntry<ValueType>, ValueType = string>(properties: TurboSelectProperties<EntryType, ValueType>): TurboSelect<EntryType, ValueType>;

declare class TurboSelectInputEvent<EntryType extends TurboSelectEntry<ValueType>, ValueType = string> extends TurboEvent {
    readonly toggledEntry: EntryType;
    readonly values: ValueType[];
    constructor(toggledEntry: EntryType, values: ValueType[], clickMode?: ClickMode, eventInitDict?: EventInit);
}

/**
 * @class TurboDropdownEntry
 * @description Class representing an entry within a Dropdown.
 * @extends TurboElement
 */
declare class TurboDropdownEntry extends TurboSelectEntry {
    /**
     * @description DropdownEntry constructor
     * @param {TurboSelectEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties: TurboSelectEntryProperties);
}
declare function dropdownEntry(properties: TurboSelectEntryProperties): TurboDropdownEntry;

/**
 * @type {TurboDropdownProperties}
 * @description Properties for configuring a Dropdown.
 * @extends TurboProperties
 *
 * @property {(string | TurboDropdownEntry)[]} values - The values or DropdownEntry instances to be used as dropdown options.
 * @property {string[]} [selectedValues=[]] - Array of values that are initially selected.
 * @property {(string | HTMLElement)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {HTMLElement} [popup] - The element used as a container for the dropdown entries.
 *
 * @property {boolean} [multiSelection=false] - Enables selection of multiple dropdown entries.
 * @property {string} [underlyingInputName] - Name attribute for a hidden input element to store the selected value(s).
 * If not declared, the hidden input will not be created.
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
type TurboDropdownProperties = TurboSelectProperties<TurboDropdownEntry> & {
    selector?: string | HTMLElement;
    popup?: HTMLElement;
    customSelectorTag?: HTMLTag;
    customEntryTag?: HTMLTag;
    customSelectorClasses?: string;
    customPopupClasses?: string;
    customEntriesClasses?: string;
    customSelectedEntriesClasses?: string;
};
/**
 * @type {TurboDropdownConfig}
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
type TurboDropdownConfig = TurboSelectConfig & {
    defaultEntryTag?: HTMLTag;
    defaultSelectorTag?: HTMLTag;
    defaultSelectorClasses?: string | string[];
    defaultPopupClasses?: string | string[];
    defaultEntriesClasses?: string | string[];
    defaultSelectedEntriesClasses?: string | string[];
};

/**
 * Dropdown class for creating Turbo button elements.
 * @class TurboDropdown
 * @extends TurboElement
 */
declare class TurboDropdown extends TurboSelect<TurboDropdownEntry> {
    /**
     * The dropdown's selector element.
     */
    selector: HTMLElement;
    /**
     * The dropdown's popup element.
     */
    readonly popup: HTMLElement;
    private popupOpen;
    static readonly config: TurboDropdownConfig;
    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties: TurboDropdownProperties);
    private initSelector;
    private initPopup;
    protected onEntryClick(entry: TurboSelectEntry): void;
    select(entry: string | TurboSelectEntry): this;
    private openPopup;
}
declare function dropdown(properties: TurboDropdownProperties): TurboDropdown;

/**
 * @type {TurboDropdownEntryProperties}
 * @description Properties for configuring a DropdownEntry.
 * @extends TurboProperties
 *
 * @property {string} value - The value associated with the dropdown entry.
 * @property {boolean} [selected=false] - Indicates whether the entry is initially selected.
 * @property {string | string[]} [selectedClass=""] - CSS class(es) applied to the entry when it is selected.
 */
type TurboDropdownEntryProperties = TurboProperties & {
    value: string;
    selected?: boolean;
    selectedClass?: string;
};

type MarkingMenuProperties<EntryType extends TurboSelectEntry<ValueType>, ValueType = string> = TurboSelectProperties<EntryType, ValueType> & {
    transition?: Transition | TransitionProperties;
    startAngle?: number;
    endAngle?: number;
    semiMajor?: number;
    semiMinor?: number;
    minDragDistance?: number;
};

declare class MarkingMenu<EntryType extends TurboSelectEntry<ValueType>, ValueType = string> extends TurboSelect<EntryType, ValueType> {
    private readonly transition;
    semiMajor: number;
    semiMinor: number;
    private currentOrigin;
    minDragDistance: number;
    set startAngle(value: number);
    set endAngle(value: number);
    constructor(properties?: MarkingMenuProperties<EntryType, ValueType>);
    get totalAngle(): number;
    private initEvents;
    private initializeTransition;
    private computeAngle;
    protected addEntry(entry: TurboSelectEntryProperties<ValueType> | ValueType | EntryType): EntryType;
    show(b?: boolean, position?: Point): this;
    getEntryInDirection(position: Point): EntryType | null;
}

type TurboSelectWheelProperties<EntryType extends TurboSelectEntry<ValueType>, ValueType = string> = TurboSelectProperties<EntryType, ValueType> & {
    direction?: Direction;
    transition?: Transition | TransitionProperties;
    size?: number | Record<Range, number>;
    opacity?: Record<Range, number>;
    scale?: Record<Range, number>;
};

declare class TurboSelectWheel<EntryType extends TurboSelectEntry<ValueType>, ValueType = string> extends TurboSelect<EntryType, ValueType> {
    private readonly transition;
    private sizePerEntry;
    private readonly direction;
    private readonly opacity;
    private readonly scale;
    private readonly size;
    private dragging;
    private openTimeout;
    constructor(properties: TurboSelectWheelProperties<EntryType, ValueType>);
    private initializeTransition;
    private reloadStyles;
    private applyStyling;
    set index(value: number);
    private get trimmedIndex();
    private get flooredTrimmedIndex();
    set open(value: boolean);
    protected onEntryClick(entry: EntryType, e?: Event): void;
    protected addEntry(entry: TurboSelectEntryProperties<ValueType> | ValueType | EntryType): EntryType;
    reset(): void;
    private snapTo;
    private clearOpenTimeout;
    private setOpenTimeout;
    private initEvents;
}
declare function selectWheel<EntryType extends TurboSelectEntry<ValueType>, ValueType = string>(properties: TurboSelectProperties<EntryType, ValueType>): TurboSelectWheel<EntryType, ValueType>;

declare function areEqual<Type = any>(...entries: Type[]): boolean;
declare function eachEqualToAny<Type = any>(values: Type[], ...entries: Type[]): boolean;

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
declare function linearInterpolation(x: number, x1: number, x2: number, y1: number, y2: number, strict?: boolean): number;

declare function trim(value: number, max: number, min?: number): number;
declare function mod(value: number, modValue?: number): number;

/**
 * @description Converts a string of tags into an Element.
 * @param {string} text - The string to convert
 * @return The Element
 */
declare function textToElement(text: string): Element;

declare function isNull(value: any): boolean;
declare function isUndefined(value: any): boolean;

/**
 * @description Converts the passed variable into a string.
 * @param value - The variable to convert to string
 * @returns {string} - The string representation of the value
 */
declare function stringify(value: any): string;
/**
 * @description Attempts to convert the passed string back to its original type.
 * @param str - The string to convert back to its original type
 * @returns {any} - The original value
 */
declare function parse(str: string): any;
/**
 * @description Extracts the extension from the given filename or path (e.g.: ".png").
 * @param {string} str - The filename or path
 * @return The extension, or an empty string if not found.
 */
declare function getFileExtension(str?: string): string;
/**
 * @description converts the provided string from camelCase to kebab-case.
 * @param {string} str - The string to convert
 */
declare function camelToKebabCase(str?: string): string;
/**
 * @description converts the provided string from kebab-case to camelCase.
 * @param {string} str - The string to convert
 */
declare function kebabToCamelCase(str?: string): string;

/**
 * @description Fetches an SVG from the given path
 * @param {string} path - The path to the SVG
 * @returns An SVGElement promise
 */
declare function fetchSvg(path: string): Promise<SVGElement>;

/**
 * @description Evaluates the best color out of two provided options to put on top of a base color in terms of contrast
 * (for readability).
 * @param {string} baseColor - The base color in Hex format.
 * @param {string} [overlayColor1="#000000"] - The first overlay color to evaluate in Hex format. Defaults to black.
 * @param {string} [overlayColor2="#FFFFFF"] - The second overlay color to evaluate in Hex format. Defaults to white.
 */
declare function bestOverlayColor(baseColor: string, overlayColor1?: string, overlayColor2?: string): string;

/**
 * @description Computes the contrast between two colors.
 * @param {string} color1 - The first color in Hex format
 * @param {string} color2 - The second color in Hex format
 * @return The contrast value, or NaN if one of the colors provided is not valid.
 */
declare function contrast(color1?: string, color2?: string): number;

/**
 * @description Computes the luminance of a color
 * @param {string} color - The color in Hex format
 * @return The luminance value, or NaN if the color is not valid.
 */
declare function luminance(color?: string): number;

/**
 * @description Constructs a single CSS string from a template literal containing CSS rules.
 */
declare function css(strings: TemplateStringsArray, ...values: any[]): string;

/**
 * @type {FontProperties}
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
type FontProperties = {
    name: string;
    pathOrDirectory: string;
    stylesPerWeights?: Record<string, string> | Record<number, Record<string, string>>;
    format?: string;
    extension?: string;
};

/**
 * @description Loads a local font file, or a family of fonts from a directory.
 * @param {FontProperties} font - The font properties
 */
declare function loadLocalFont(font: FontProperties): void;

export { AccessLevel, ActionMode, type AutoOptions, type ButtonChildren, type CacheOptions, type ChildHandler, ClickMode, ClosestOrigin, type Coordinate, DefaultEventName, type DefaultEventNameEntry, Delegate, type DimensionProperties, Direction, type DisabledTurboEventTypes, type ElementTagMap, type FontProperties, type HTMLTag, InOut, InputDevice, type ListenerEntry, MarkingMenu, type MarkingMenuProperties, MathMLNamespace, type MathMLTag, MathMLTagsDefinitions, type PartialRecord, Point, PopupFallbackMode, Range, type SVGTag, type SVGTagMap, type StylesRoot, type StylesType, SvgNamespace, SvgTagsDefinitions, Transition, type TransitionData, type TransitionEntry, TransitionHandler, type TransitionInterpolation, TransitionMode, type TransitionProperties, type TransitionStyles, TurboButton, type TurboButtonConfig, type TurboButtonProperties, TurboClickEventName, TurboDragEvent, TurboDragEventName, TurboDropdown, type TurboDropdownConfig, TurboDropdownEntry, type TurboDropdownEntryProperties, type TurboDropdownProperties, TurboElement, TurboEvent, TurboEventManager, type TurboEventManagerLockStateProperties, type TurboEventManagerProperties, type TurboEventManagerStateProperties, TurboEventName, type TurboEventNameEntry, TurboIcon, type TurboIconConfig, type TurboIconProperties, TurboIconToggle, type TurboIconToggleProperties, TurboInput, type TurboInputProperties, TurboKeyEvent, TurboKeyEventName, TurboMap, TurboMoveName, TurboNumericalInput, type TurboNumericalInputProperties, TurboPopup, type TurboPopupConfig, type TurboPopupProperties, type TurboProperties, TurboSelect, type TurboSelectConfig, TurboSelectEntry, type TurboSelectEntryConfig, type TurboSelectEntryProperties, TurboSelectInputEvent, type TurboSelectProperties, TurboSelectWheel, type TurboSelectWheelProperties, TurboWheelEvent, TurboWheelEventName, type ValidElement, type ValidHTMLElement, type ValidInputElement, type ValidMathMLElement, type ValidNode, type ValidSVGElement, type ValidTag, a, addChildManipulationToElementPrototype, addClassManipulationToElementPrototype, addElementManipulationToElementPrototype, addListenerManipulationToElementPrototype, addStylesManipulationToElementPrototype, areEqual, auto, bestOverlayColor, blindElement, button, cache, callOnce, callOncePerInstance, camelToKebabCase, canvas, clearCache, clearCacheEntry, contrast, css, define, div, dropdown, dropdownEntry, eachEqualToAny, element, fetchSvg, flexCol, flexColCenter, flexRow, flexRowCenter, form, generateTagFunction, getFileExtension, h1, h2, h3, h4, h5, h6, icon, iconToggle, img, input, isMathMLTag, isNull, isSvgTag, isUndefined, kebabToCamelCase, linearInterpolation, link, loadLocalFont, luminance, mod, numericalInput, observe, p, parse, popup, select, selectEntry, selectWheel, setupTurboEventManagerBypassing, spacer, span, stringify, style, stylesheet, textToElement, textarea, transition, trim, turboInput, turbofy, updateChainingPropertiesInElementPrototype, video };
