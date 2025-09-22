/// <reference types="node" />
import { Doc, YEvent, AbstractType, Map as Map$1, Array } from 'yjs';
export { AbstractType as YAbstractType, Array as YArray, YArrayEvent, Doc as YDoc, YEvent, Map as YMap, YMapEvent, Text as YText } from 'yjs';

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
    interface ParentNode extends Node {
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
 * @description Stage-3 decorator that adds the “missing half” (getter or setter) and/or
 * wraps existing ones. Works with field / getter / setter / accessor. Designed to chain
 * cleanly with `@observe`.
 *
 * Options (use `autoFactory(opts)` if you need to pass them):
 *  - cancelIfUnchanged (default: true)
 *  - callBefore?: (value) => value    (preprocess before storing/forwarding)
 *  - returnDefinedGetterValue (default: false)  (when user getter exists)
 */
declare function auto(options?: AutoOptions): <Type extends object, Value>(value: {
    get?: (this: Type) => Value;
    set?: (this: Type, value: Value) => void;
} | ((initial: Value) => Value) | ((this: Type) => Value) | ((this: Type, v: Value) => void), context: ClassFieldDecoratorContext<Type, Value> | ClassGetterDecoratorContext<Type, Value> | ClassSetterDecoratorContext<Type, Value> | ClassAccessorDecoratorContext<Type, Value>) => any;

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
 * Stage-3 cache decorator:
 *  - method: caches per arguments
 *  - getter: caches once per instance
 *  - accessor: wraps the getter like a cached getter (setter unchanged)
 */
declare function cache(options?: CacheOptions): (value: ((...args: any[]) => any) | (() => any) | {
    get?: () => any;
    set?: (v: any) => void;
}, ctx: ClassMethodDecoratorContext | ClassGetterDecoratorContext | ClassAccessorDecoratorContext) => any;
/**
 * Clear *all* cache entries on an instance created by @cache
 * (we scan for symbols named Symbol(__cache__...)).
 */
declare function clearCache(instance: any): void;
/**
 * Clear a specific cache entry for a given method/getter name (or function).
 */
declare function clearCacheEntry(instance: any, field: string | Function): void;

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
declare function callOnce<T extends object>(value: (this: T, ...args: any[]) => any, ctx: ClassMethodDecoratorContext<T>): any;
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
declare function callOncePerInstance(key?: string | symbol): <T extends object>(value: (this: T, ...args: any[]) => any, ctx: ClassMethodDecoratorContext<T>) => (this: any, ...args: any[]) => any;

declare function controller(name?: string): (_unused: unknown, context: ClassFieldDecoratorContext) => void;
declare function handler(name?: string): (_unused: unknown, context: ClassFieldDecoratorContext) => void;

type DefineOptions = {
    /** If true, injects attributeChangedCallback when missing. Default: true */
    injectAttributeBridge?: boolean;
};

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
declare function define(elementName?: string, options?: DefineOptions): <T extends new (...args: any[]) => HTMLElement>(constructor: T, context: ClassDecoratorContext<T>) => T;

declare global {
    interface SymbolConstructor {
        metadata: symbol;
    }
}
/** * @description Member decorator for fields or accessors that reflects a property to an HTML attribute. * Also records the attribute name into class metadata so @useObservedAttributes() can expose it. * @param {unknown} value - Optional explicit attribute name. Defaults to camelCase → kebab-case. * @param context */
declare function observe<Type extends object, Value>(value: ((initial: Value) => Value) | ((this: Type) => Value) | ((this: Type, v: Value) => void) | {
    get?: (this: Type) => Value;
    set?: (this: Type, value: Value) => void;
}, context: ClassFieldDecoratorContext<Type, Value> | ClassGetterDecoratorContext<Type, Value> | ClassSetterDecoratorContext<Type, Value> | ClassAccessorDecoratorContext<Type, Value>): any;

type SignalSubscriber = () => void;
type SignalEntry<Type = any> = {
    get(): Type;
    set(value: Type): void;
    update(updater: (previous: Type) => Type): void;
    sub(fn: SignalSubscriber): () => void;
    emit(): void;
};

declare function effect(callback: () => void): () => void;
/**
 * Works on:
 *  - fields:        `@signal foo = 0`
 *  - auto-accessors:`@signal accessor foo = 0`
 *  - getter:        `@signal get foo() { ... }`
 *  - setter:        `@signal set foo(v) { ... }`
 *
 * Private fields/getters/setters are NOT supported.
 */
declare function signal<Type extends object, Value>(value: ((initial: Value) => Value) | ((this: Type) => Value) | ((this: Type, v: Value) => void) | {
    get?: (this: Type) => Value;
    set?: (this: Type, value: Value) => void;
}, context: ClassFieldDecoratorContext<Type, Value> | ClassGetterDecoratorContext<Type, Value> | ClassSetterDecoratorContext<Type, Value> | ClassAccessorDecoratorContext<Type, Value>): any;
declare function getSignal<Type = any>(target: object, key: PropertyKey): SignalEntry<Type>;
declare function setSignal<Type = any>(target: object, key: PropertyKey, next: Type): void;
declare function markDirty(target: object, key: PropertyKey): void;

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
 * @type {ElementTagDefinition}
 * @template {ValidTag} Tag
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {Tag} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svgManipulation" or "mathML" is provided,
 * the corresponding namespace will be used to create the element. Otherwise, the custom namespace provided will be used.
 */
type ElementTagDefinition<Tag extends ValidTag> = {
    tag?: Tag;
    namespace?: string;
};
/**
 * @type {TurboProperties}
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
type TurboProperties<Tag extends ValidTag = "div"> = HTMLElementMutableFields<Tag> & ElementTagDefinition<Tag> & {
    id?: string;
    classes?: string | string[];
    style?: string;
    stylesheet?: string;
    shadowDOM?: boolean;
    parent?: Element;
    children?: Element | Element[];
    text?: string;
    listeners?: Record<string, ((e: Event, el: ValidElement<Tag>) => void)>;
    out?: string | Node;
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
/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string} [styles] - The css string. Use the css literal function for autocompletion.
 * @param {StylesRoot} [root] - The root to which the style element will be added.
 */
declare function stylesheet(styles?: string, root?: StylesRoot): void;

declare const SvgNamespace = "http://www.w3.org/2000/svg";
declare const MathMLNamespace = "http://www.w3.org/1998/Math/MathML";
declare const SvgTags: Set<keyof SVGElementTagNameMap>;
declare const MathMLTags: Set<keyof MathMLElementTagNameMap>;
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
declare const DefaultKeyEventName: {
    readonly keyPressed: "keydown";
    readonly keyReleased: "keyup";
};
declare const TurboClickEventName: {
    readonly click: "turbo-click";
    readonly clickStart: "turbo-click-start";
    readonly clickEnd: "turbo-click-end";
    readonly longPress: "turbo-long-press";
};
declare const DefaultClickEventName: {
    readonly click: "click";
    readonly clickStart: "mousedown";
    readonly clickEnd: "mouseup";
    readonly longPress: "turbo-long-press";
};
declare const TurboMoveEventName: {
    readonly move: "turbo-move";
};
declare const DefaultMoveEventName: {
    readonly move: "mousemove";
};
declare const TurboDragEventName: {
    readonly drag: "turbo-drag";
    readonly dragStart: "turbo-drag-start";
    readonly dragEnd: "turbo-drag-end";
};
declare const DefaultDragEventName: {
    readonly drag: "turbo-drag";
    readonly dragStart: "turbo-drag-start";
    readonly dragEnd: "turbo-drag-end";
};
declare const TurboWheelEventName: {
    readonly trackpadScroll: "turbo-trackpad-scroll";
    readonly trackpadPinch: "turbo-trackpad-pinch";
    readonly mouseWheel: "turbo-mouse-wheel";
};
declare const DefaultWheelEventName: {
    readonly trackpadScroll: "wheel";
    readonly trackpadPinch: "wheel";
    readonly mouseWheel: "wheel";
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
    wheel: string;
    scroll: string;
    input: string;
    change: string;
    focus: string;
    blur: string;
    resize: string;
    trackpadScroll: "wheel";
    trackpadPinch: "wheel";
    mouseWheel: "wheel";
    drag: "turbo-drag";
    dragStart: "turbo-drag-start";
    dragEnd: "turbo-drag-end";
    move: "mousemove";
    click: "click";
    clickStart: "mousedown";
    clickEnd: "mouseup";
    longPress: "turbo-long-press";
    keyPressed: "keydown";
    keyReleased: "keyup";
};
type DefaultEventNameKey = keyof typeof DefaultEventName;
type DefaultEventNameEntry = typeof DefaultEventName[DefaultEventNameKey];
type TurboEventNameKey = keyof typeof TurboEventName;
type TurboEventNameEntry = typeof TurboEventName[TurboEventNameKey];

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
    get object(): Coordinate;
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
     * @param {Coordinate} p - The coordinates to divide with
     * @returns A new Point object with the result
     */
    div(p: Coordinate): Point;
    /**
     * @description Mod coordinates of this point
     * @param {number} n - The value to mod both x and y
     * @returns A new Point object with the result
     */
    mod(n: number): Point;
    /**
     * @description Mod coordinates of this point
     * @param {number} x - The value to mod the x coordinate
     * @param {number} y - The value to mod the y coordinate
     * @returns A new Point object with the result
     */
    mod(x: number, y: number): Point;
    /**
     * @description Mod coordinates of this point
     * @param {Coordinate} p - The coordinates to mod with
     * @returns A new Point object with the result
     */
    mod(p: Coordinate): Point;
    /**
     * @description Calculate the absolute value of the coordinates
     * @returns A new Point object with the absolute values
     */
    get abs(): Point;
    /**
     * @description Get the maximum value between x and y coordinates
     * @returns The maximum value
     */
    get max(): number;
    /**
     * @description Get the minimum value between x and y coordinates
     * @returns The minimum value
     */
    get min(): number;
    get length2(): number;
    get length(): number;
    dot(p: Point): number;
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
    authorizeEventScaling?: boolean | (() => boolean);
    scaleEventPosition?: (position: Point) => Point;
};
type TurboEventManagerLockStateProperties = TurboEventManagerStateProperties & {
    lockOrigin?: Node;
};
/**
 * @description Object representing options passed to the ToolManager's setTool() function.
 * @property select - Indicate whether to visually select the tool on all toolbars, defaults to true
 * @property activate - Indicate whether to fire activation on the tool when setting it, defaults to true
 * @property setAsNoAction - Indicate whether the tool will also be set as the tool for ClickMode == none, defaults
 * to true if the click mode is left.
 */
type SetToolOptions = {
    select?: boolean;
    activate?: boolean;
    setAsNoAction?: boolean;
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
 * @class TurboEmitter
 * @template {TurboModel} ModelType -The element's MVC model type.
 * @description The base MVC emitter class. Its role is basically an event bus. It allows the different parts of the
 * MVC structure to fire events or listen to some, with various methods.
 */
declare class TurboEmitter<ModelType extends TurboModel = TurboModel> {
    /**
     * @description Map containing all callbacks.
     * @protected
     */
    protected readonly callbacks: Map<string, Map<string, ((...args: any[]) => void)[]>>;
    /**
     * @description The attached MVC model.
     */
    model: ModelType;
    constructor(model: ModelType);
    /**
     * @function getBlock
     * @description Retrieves the callback block by the given blockKey.
     * @param {number | string} [blockKey] - The key of the block to retrieve.
     * @protected
     */
    protected getBlock(blockKey?: number | string): Map<string, ((...args: any[]) => void)[]>;
    /**
     * @function getOrGenerateBlock
     * @description Retrieves or creates a callback map for a given blockKey.
     * @param {number | string} [blockKey] - The block key.
     * @returns {Map<string, ((...args: any[]) => void)[]>} - The ensured callback map.
     * @protected
     */
    protected getOrGenerateBlock(blockKey?: number | string): Map<string, ((...args: any[]) => void)[]>;
    /**
     * @function getKey
     * @description Gets all callbacks for a given event key within a block.
     * @param {string} key - The event name.
     * @param {number | string} [blockKey] - The block in which the event is scoped.
     * @returns {((...args: any[]) => void)[]} - An array of callbacks for that event.
     * @protected
     */
    protected getKey(key: string, blockKey?: number | string): ((...args: any[]) => void)[];
    /**
     * @function getOrGenerateKey
     * @description Ensures and returns the array of callbacks for a given event key within a block.
     * @param {string} key - The event name.
     * @param {number | string} [blockKey] - The block in which the event is scoped.
     * @returns {((...args: any[]) => void)[]} - An array of callbacks for that event.
     * @protected
     */
    protected getOrGenerateKey(key: string, blockKey?: number | string): ((...args: any[]) => void)[];
    /**
     * @function addWithBlock
     * @description Registers a callback for an event key within a specified block -- usually for the corresponding
     * data block in the model.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block to register the event in.
     * @param {(...args: any[]) => void} callback - The callback function to invoke when the event is fired.
     */
    addWithBlock(key: string, blockKey: number | string, callback: (...args: any[]) => void): void;
    /**
     * @function add
     * @description Registers a callback for an event key in the default block.
     * @param {string} key - The event name.
     * @param {(...args: any[]) => void} callback - The callback function.
     */
    add(key: string, callback: (...args: any[]) => void): void;
    /**
     * @function removeWithBlock
     * @description Removes a specific callback or all callbacks for a key within a block.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block from which to remove the event.
     * @param {(...args: any[]) => void} [callback] - The specific callback to remove. If undefined, all callbacks
     * for the key are removed.
     */
    removeWithBlock(key: string, blockKey: number | string, callback?: (...args: any[]) => void): void;
    /**
     * @function remove
     * @description Removes a specific callback or all callbacks for a key in the default block.
     * @param {string} key - The event name.
     * @param {(...args: any[]) => void} [callback] - The callback to remove. If omitted, all callbacks are removed.
     */
    remove(key: string, callback?: (...args: any[]) => void): void;
    /**
     * @function fireWithBlock
     * @description Triggers all callbacks associated with an event key in a specified block.
     * @param {string} key - The event name.
     * @param {number | string} blockKey - The block in which the event is scoped.
     * @param {...any[]} args - Arguments passed to each callback.
     */
    fireWithBlock(key: string, blockKey: string | number, ...args: any[]): void;
    /**
     * @function fire
     * @description Triggers all callbacks associated with an event key in the default block.
     * @param {string} key - The event name.
     * @param {...any[]} args - Arguments passed to the callback.
     */
    fire(key: string, ...args: any[]): void;
}

type MvcBlocksType<Type extends "array" | "map" = "map", BlockType extends MvcDataBlock = MvcDataBlock> = Type extends "map" ? Map<string, BlockType> : BlockType[];
type MvcBlockKeyType<Type extends "array" | "map" = "map"> = Type extends "map" ? string : number;
type MvcDataBlock<DataType = any, IdType extends string | number | symbol = any> = {
    id: IdType;
    data: DataType;
};
type TurboViewProperties<ElementType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = {
    element: ElementType;
    model: ModelType;
    emitter: EmitterType;
};

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
declare class TurboModel<DataType = any, KeyType extends string | number | symbol = any, IdType extends string | number | symbol = any, BlocksType extends "array" | "map" = "array" | "map", BlockType extends MvcDataBlock<DataType, IdType> = MvcDataBlock<DataType, IdType>> {
    protected readonly isDataBlocksArray: boolean;
    protected readonly dataBlocks: MvcBlocksType<BlocksType, BlockType>;
    protected readonly handlers: Map<string, TurboHandler>;
    /**
     * @description Delegate triggered when a key changes.
     */
    keyChangedCallback: Delegate<(keyName: KeyType, blockKey: MvcBlockKeyType<BlocksType>, ...args: any[]) => void>;
    /**
     * @constructor
     * @param {DataType} [data] - Initial data. Not initialized if provided.
     * @param {BlocksType} [dataBlocksType] - Type of data blocks (array or map).
     */
    constructor(data?: DataType, dataBlocksType?: BlocksType);
    /**
     * @description The data of the default block.
     */
    get data(): DataType;
    set data(value: DataType);
    /**
     * @description The ID of the default block.
     */
    get dataId(): IdType;
    set dataId(value: IdType);
    /**
     * @description Whether callbacks are enabled or disabled.
     */
    enabledCallbacks: boolean;
    /**
     * @function getData
     * @description Retrieves the value associated with a given key in the specified block.
     * @param {KeyType} key - The key to retrieve.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block from which to retrieve the
     * data.
     * @returns {unknown} The value associated with the key, or null if not found.
     */
    getData(key: KeyType, blockKey?: MvcBlockKeyType<BlocksType>): unknown;
    /**
     * @function setData
     * @description Sets the value for a given key in the specified block and triggers callbacks (if enabled).
     * @param {KeyType} key - The key to update.
     * @param {unknown} value - The value to assign.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to update.
     */
    setData(key: KeyType, value: unknown, blockKey?: MvcBlockKeyType<BlocksType>): void;
    /**
     * @function getSize
     * @description Returns the size of the specified block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block to check.
     * @returns {number} The size.
     */
    getSize(blockKey?: MvcBlockKeyType<BlocksType>): number;
    /**
     * @function getBlock
     * @description Retrieves the data block for the given blockKey.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key to retrieve.
     * @returns {BlockType | null} The block or null if it doesn't exist.
     */
    getBlock(blockKey?: MvcBlockKeyType<BlocksType>): BlockType | null;
    /**
     * @function createBlock
     * @description Creates a data block entry.
     * @param {DataType} value - The data of the block.
     * @param {IdType} [id] - The optional ID of the data.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The key of the block.
     * @protected
     * @return {BlockType} - The created block.
     */
    protected createBlock(value: DataType, id?: IdType, blockKey?: MvcBlockKeyType<BlocksType>): BlockType;
    /**
     * @function setBlock
     * @description Creates and sets a data block at the specified key.
     * @param {DataType} value - The data to set.
     * @param {IdType} [id] - Optional block ID.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The key of the block.
     * @param {boolean} [initialize = true] - Whether to initialize the block after setting.
     */
    setBlock(value: DataType, id?: IdType, blockKey?: MvcBlockKeyType<BlocksType>, initialize?: boolean): void;
    /**
     * @function hasBlock
     * @description Check if a block exists at the given key.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey] - Block key.
     * @return {boolean} - Whether the block exists or not.
     */
    hasBlock(blockKey: MvcBlockKeyType<BlocksType>): boolean;
    /**
     * @function addBlock
     * @description Adds a new block into the structure. Appends or inserts based on key if using array.
     * @param {DataType} value - The block data.
     * @param {IdType} [id] - Optional block ID.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey] - Block key (used for insertion in arrays).
     * @param {boolean} [initialize=true] - Whether to initialize after adding.
     */
    addBlock(value: DataType, id?: IdType, blockKey?: MvcBlockKeyType<BlocksType>, initialize?: boolean): void;
    /**
     * @function getBlockData
     * @description Retrieves the data from a specific block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     * @returns {DataType | null} The block's data or  if it doesn't exist.
     */
    getBlockData(blockKey?: MvcBlockKeyType<BlocksType>): DataType | null;
    /**
     * @function getBlockId
     * @description Retrieves the ID from a specific block.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     * @returns {IdType | null} The block ID or null.
     */
    getBlockId(blockKey?: MvcBlockKeyType<BlocksType>): IdType | null;
    /**
     * @function setBlockId
     * @description Sets the ID for a specific block.
     * @param {IdType} value - The new ID.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block key.
     */
    setBlockId(value: IdType, blockKey?: MvcBlockKeyType<BlocksType>): void;
    /**
     * @function fireKeyChangedCallback
     * @description Fires the emitter's change callback for the given key in a block, passing it the data at the key's value.
     * @param {KeyType} key - The key that changed.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block where the change occurred.
     * @param {boolean} [deleted=false] - Whether the key was deleted.
     */
    protected fireKeyChangedCallback(key: KeyType, blockKey?: MvcBlockKeyType<BlocksType>, deleted?: boolean): void;
    /**
     * @function fireCallback
     * @description Fires the emitter's change callback for the given key in the default blocks.
     * @param {string | KeyType} key - The key to fire for.
     * @param {...any[]} args - Additional arguments.
     */
    protected fireCallback(key: string | KeyType, ...args: any[]): void;
    /**
     * @function fireBlockCallback
     * @description Fires the emitter's change callback for the given key in a specific block with custom arguments.
     * @param {string | KeyType} key - The key to fire for.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultBlockKey] - The block key.
     * @param {...any[]} args - Additional arguments.
     */
    protected fireBlockCallback(key: string | KeyType, blockKey?: MvcBlockKeyType<BlocksType>, ...args: any[]): void;
    /**
     * @function initialize
     * @description Initializes the block at the given key, and triggers callbacks for all the keys in its data.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    initialize(blockKey?: MvcBlockKeyType<BlocksType>): void;
    /**
     * @function clear
     * @description Clears the block data at the given key.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey = this.defaultBlockKey] - The block key.
     */
    clear(blockKey?: MvcBlockKeyType<BlocksType>): void;
    /**
     * @description The default block key based on whether the data structure is an array or map.
     */
    get defaultBlockKey(): MvcBlockKeyType<BlocksType>;
    /**
     * @description The default block key if there's only one block, otherwise null.
     */
    protected get defaultComputationBlockKey(): MvcBlockKeyType<BlocksType>;
    /**
     * @function isValidBlockKey
     * @description Checks if the block key is a valid string or number.
     * @param {MvcBlockKeyType<BlocksType>} blockKey - The block key to validate.
     * @returns {boolean} True if valid, false otherwise.
     */
    protected isValidBlockKey(blockKey: MvcBlockKeyType<BlocksType>): boolean;
    /**
     * @function getAllBlockKeys
     * @description Retrieves all block keys in the model.
     * @returns {MvcBlockKeyType<BlocksType>[]} Array of block keys.
     */
    getAllBlockKeys(): MvcBlockKeyType<BlocksType>[];
    /**
     * @function getAllIds
     * @description Retrieves all block (data) IDs in the model.
     * @returns {IdType[]} Array of IDs.
     */
    getAllIds(): IdType[];
    /**
     * @function getAllBlocks
     * @description Retrieves all blocks or a specific one if blockKey is defined.
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {BlockType[]} Array of blocks.
     */
    getAllBlocks(blockKey?: MvcBlockKeyType<BlocksType>): BlockType[];
    /**
     * @function getAllKeys
     * @description Retrieves all keys within the given block(s).
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {KeyType[]} Array of keys.
     */
    getAllKeys(blockKey?: MvcBlockKeyType<BlocksType>): KeyType[];
    /**
     * @function getAllData
     * @description Retrieves all values across block(s).
     * @param {MvcBlockKeyType<BlocksType>} [blockKey=this.defaultComputationBlockKey] - The block key.
     * @returns {unknown[]} Array of values.
     */
    getAllData(blockKey?: MvcBlockKeyType<BlocksType>): unknown[];
    /**
     * @function getHandler
     * @description Retrieves the attached MVC handler with the given key.
     * By default, unless manually defined in the handler, if the element's class name is MyElement
     * and the handler's class name is MyElementSomethingHandler, the key would be "something".
     * @param {string} key - The handler's key.
     * @return {TurboHandler} - The handler.
     */
    getHandler(key: string): TurboHandler;
    /**
     * @function addHandler
     * @description Registers a TurboHandler for the given key.
     * @param {string} key - The identifier for the handler.
     * @param {TurboHandler} handler - The handler instance to register.
     */
    addHandler(key: string, handler: TurboHandler): void;
}

/**
 * @class TurboHandler
 * @description The MVC base handler class. It's an extension of the model, and its main job is to provide some utility
 * functions to manipulate the model's data.
 * @template {TurboModel} ModelType - The element's MVC model type.
 */
declare class TurboHandler<ModelType extends TurboModel = TurboModel> {
    /**
     * @description The key of the handler. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the handler's class name is MyElementSomethingHandler, the key would
     * default to "something".
     */
    keyName: string;
    /**
     * @description A reference to the MVC model.
     * @protected
     */
    protected readonly model: ModelType;
    constructor(model: ModelType);
}

declare class TurboEventManagerUtilsHandler extends TurboHandler<TurboEventManagerModel> {
    keyName: string;
    setClickMode(button: number, isTouch?: boolean): ClickMode;
    applyEventNames(eventNames: Record<string, string>): void;
    setTimer(timerName: string, callback: () => void, duration: number): void;
    clearTimer(timerName: string): void;
    selectTool(element: Node, value: boolean): void;
    activateTool(element: Node, toolName: string, value: boolean): void;
}

declare class TurboWeakSet<Type extends object = object> {
    private readonly _weakRefs;
    constructor();
    add(obj: Type): this;
    has(obj: Type): boolean;
    delete(obj: Type): boolean;
    cleanup(): void;
    toArray(): Type[];
    get size(): number;
    clear(): void;
}

declare class TurboEventManagerModel extends TurboModel {
    private _inputDevice;
    utils: TurboEventManagerUtilsHandler;
    readonly state: TurboEventManagerStateProperties;
    readonly lockState: TurboEventManagerLockStateProperties;
    readonly onInputDeviceChange: Delegate<(device: InputDevice) => void>;
    /**
     * @description Delegate fired when a tool is changed on a certain click button/mode
     */
    readonly onToolChange: Delegate<(oldTool: string, newTool: string, type: ClickMode) => void>;
    readonly currentKeys: string[];
    currentAction: ActionMode;
    currentClick: ClickMode;
    wasRecentlyTrackpad: boolean;
    moveThreshold: number;
    longPressDuration: number;
    authorizeEventScaling: boolean | (() => boolean);
    scaleEventPosition: (position: Point) => Point;
    readonly origins: TurboMap<number, Point>;
    readonly previousPositions: TurboMap<number, Point>;
    positions: TurboMap<number, Point>;
    lastTargetOrigin: Node;
    readonly timerMap: TurboMap<string, NodeJS.Timeout>;
    readonly tools: Map<string, TurboWeakSet<Node>>;
    readonly mappedKeysToTool: Map<string, string>;
    readonly currentTools: Map<ClickMode, string>;
    get inputDevice(): InputDevice;
    set inputDevice(value: InputDevice);
}

/**
 * @class TurboView
 * @template {object} ElementType - The type of the element attached to the view.
 * @template {TurboModel} ModelType - The model type used in this view.
 * @template {TurboEmitter} EmitterType - The emitter type used in this view.
 * @description A base view class for MVC elements, providing structure for initializing and managing UI setup and
 * event listeners. Designed to be devoid of logic and only handle direct UI changes.
 */
declare class TurboView<ElementType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> {
    /**
     * @description The main component this view is attached to.
     */
    element: ElementType;
    /**
     * @description The model instance this view is bound to.
     */
    model: ModelType;
    /**
     * @description The emitter instance used for event communication.
     */
    emitter: EmitterType;
    /**
     * @constructor
     * @param {TurboViewProperties<ElementType, ModelType, EmitterType>} properties - Properties to initialize the view with.
     */
    constructor(properties: TurboViewProperties<ElementType, ModelType, EmitterType>);
    /**
     * @function initialize
     * @description Initializes the view by setting up change callbacks, UI elements, layout, and event listeners.
     */
    initialize(): void;
    /**
     * @function setupChangedCallbacks
     * @description Setup method for initializing data/model change listeners and associated UI logic.
     * @protected
     */
    protected setupChangedCallbacks(): void;
    /**
     * @function setupUIElements
     * @description Setup method for initializing and storing sub-elements of the UI.
     * @protected
     */
    protected setupUIElements(): void;
    /**
     * @function setupUILayout
     * @description Setup method for creating the layout structure and injecting sub-elements into the DOM tree.
     * @protected
     */
    protected setupUILayout(): void;
    /**
     * @function setupUIListeners
     * @description Setup method for defining DOM and input event listeners.
     * @protected
     */
    protected setupUIListeners(): void;
}

type TurboControllerProperties<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboViewProperties<ElementType, ModelType, EmitterType> & {
    view: ViewType;
};

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
declare class TurboController<ElementType extends object = object, ViewType extends TurboView = TurboView, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> {
    /**
     * @description The key of the controller. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the controller's class name is MyElementSomethingController, the key would
     * default to "something".
     */
    keyName: string;
    /**
     * @description A reference to the component.
     * @protected
     */
    protected readonly element: ElementType;
    /**
     * @description A reference to the MVC view.
     * @protected
     */
    protected readonly view: ViewType;
    /**
     * @description A reference to the MVC model.
     * @protected
     */
    protected readonly model: ModelType;
    /**
     * @description A reference to the MVC emitter.
     * @protected
     */
    protected readonly emitter: EmitterType;
    constructor(properties: TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType>);
    /**
     * @function initialize
     * @description Initializes the controller. Specifically, it will setup the change callbacks.
     */
    initialize(): void;
    /**
     * @function setupChangedCallbacks
     * @description Setup method intended to initialize change listeners and callbacks.
     * @protected
     */
    protected setupChangedCallbacks(): void;
}

declare class TurboEventManagerKeyController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    keyName: string;
    keyDown: (e: KeyboardEvent) => void;
    protected keyDownFn(e: KeyboardEvent): void;
    keyUp: (e: KeyboardEvent) => void;
    protected keyUpFn(e: KeyboardEvent): void;
}

declare class TurboEventManagerWheelController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    keyName: string;
    wheel: (e: WheelEvent) => void;
}

declare class TurboEventManagerPointerController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    keyName: string;
    pointerDown: (e: MouseEvent | TouchEvent) => void;
    protected pointerDownFn(e: MouseEvent | TouchEvent): void;
    pointerMove: (e: MouseEvent | TouchEvent) => void;
    protected pointerMoveFn(e: MouseEvent | TouchEvent): void;
    pointerUp: (e: MouseEvent | TouchEvent) => void;
    protected pointerUpFn(e: MouseEvent | TouchEvent): void;
    pointerLeave: () => void;
    protected pointerLeaveFn(): void;
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
    private getFireOrigin;
}

/**
 * Generic turbo event
 */
declare class TurboEvent extends Event {
    /**
     * @description The event manager that fired this event.
     */
    readonly eventManager: TurboEventManager;
    /**
     * @description The name of the tool (if any) associated with this event.
     */
    readonly toolName: string;
    /**
     * @description The name of the event.
     */
    readonly eventName: TurboEventNameEntry;
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
    /**
     * @description Callback function (or boolean) to be overridden to specify when to allow transformation
     * and/or scaling.
     */
    authorizeScaling: boolean | (() => boolean);
    /**
     * @description Callback function to be overridden to specify how to transform a position from screen to
     * document space.
     */
    scalePosition: (position: Point) => Point;
    constructor(properties: TurboEventProperties);
    /**
     * @description The tool (if any) associated with this event.
     */
    get tool(): Node;
    /**
     * @description Returns the closest element of the provided type to the target (Searches through the element and
     * all its parents to find one of matching type).
     * @param type
     * @param strict
     * @param from
     */
    closest<T extends Element>(type: new (...args: any[]) => T, strict?: Element | boolean, from?: ClosestOrigin): T | null;
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
     * @description Specifies whether to allow transformation and/or scaling.
     */
    get scalingAuthorized(): boolean;
    /**
     * @private
     * @description Takes a map of points and returns a new map where each point is transformed accordingly.
     * @param positions
     */
    protected scalePositionsMap(positions?: TurboMap<number, Point>): TurboMap<number, Point>;
}

declare class TurboEventManagerDispatchController extends TurboController<TurboEventManager, any, TurboEventManagerModel> {
    keyName: string;
    private boundHooks;
    protected setupChangedCallbacks(): void;
    protected dispatchEvent: <EventType extends TurboEvent = TurboEvent, PropertiesType extends TurboRawEventProperties = TurboRawEventProperties>(target: Node, eventType: new (properties: PropertiesType) => EventType, properties: Partial<PropertiesType>) => void;
    private getToolHandlingCallback;
    setupCustomDispatcher(type: string): void;
    removeCustomDispatcher(type: string): void;
}

type ListenerEntry = {
    target: Node;
    type: string;
    toolName?: string;
    listener: ((e: Event, el: Node) => void);
    bundledListener: ((e: Event) => void);
    options?: ListenerOptions;
    manager: TurboEventManager;
};
type ListenerOptions = AddEventListenerOptions & {
    propagate?: boolean;
};
type PreventDefaultOptions = {
    types?: string[];
    phase?: "capture" | "bubble";
    stop?: false | "stop" | "immediate";
    preventDefaultOn?: (type: string, e: Event) => boolean;
    clearPreviousListeners?: boolean;
    manager?: TurboEventManager;
};
declare const BasicInputEvents: readonly ["mousedown", "mouseup", "mousemove", "click", "dblclick", "contextmenu", "dragstart", "selectstart", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "wheel"];
declare const NonPassiveEvents: readonly ["wheel", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup"];
type TurboInteractorProperties<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & {
    manager?: TurboEventManager;
    toolName?: string;
    listenerOptions?: PartialRecord<DefaultEventNameKey, ListenerOptions>;
};

declare class TurboInteractor<ElementType extends object = object, ViewType extends TurboView = TurboView, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboController<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the interactor. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the interactor's class name is MyElementSomethingInteractor, the key would
     * default to "something".
     */
    keyName: string;
    readonly target: Node;
    readonly toolName: string;
    readonly manager: TurboEventManager;
    protected readonly options: PartialRecord<DefaultEventNameKey, ListenerOptions>;
    constructor(properties: TurboInteractorProperties<ElementType, ViewType, ModelType, EmitterType>);
    initialize(): void;
}

declare class TurboSelector<Type extends Node = Node> {
    #private;
    element: Type;
    constructor();
}

type Turbo<Type extends Node = Node> = TurboSelector<Type> & Type;
type TurbofyOptions = {
    excludeHierarchyFunctions?: boolean;
    excludeStyleFunctions?: boolean;
    excludeClassFunctions?: boolean;
    excludeElementFunctions?: boolean;
    excludeEventFunctions?: boolean;
    excludeToolFunctions?: boolean;
    excludeSubstrateFunctions?: boolean;
    excludeMiscFunctions?: boolean;
};
type TurboToolProperties<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & {
    manager?: TurboEventManager;
    toolName?: string;
    embeddedTarget?: Node;
    activationEvent?: DefaultEventNameEntry;
    clickMode?: ClickMode;
    key?: string;
};

declare class TurboTool<ElementType extends object = object, ViewType extends TurboView = TurboView, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboController<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the tool. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the tool's class name is MyElementSomethingTool, the key would
     * default to "something".
     */
    keyName: string;
    toolName: string;
    readonly embeddedTarget: Node;
    readonly manager: TurboEventManager;
    readonly activationEvent: DefaultEventNameEntry;
    readonly clickMode: ClickMode;
    readonly key: string;
    constructor(properties: TurboToolProperties<ElementType, ViewType, ModelType, EmitterType>);
    initialize(): void;
}

type TurboSubstrateProperties<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboControllerProperties<ElementType, ViewType, ModelType, EmitterType> & {
    substrateName?: string;
};
type MakeSubstrateOptions = {
    onActivate?: () => void;
    onDeactivate?: () => void;
};
type SubstrateSolverProperties = {
    substrate?: string;
    target?: object;
    event?: Event;
    eventType?: string;
    eventTarget?: Node;
    toolName?: string;
    eventOptions?: ListenerOptions;
    manager?: TurboEventManager;
};
type SubstrateSolver = (properties: SubstrateSolverProperties, ...args: any[]) => any;

declare class TurboSubstrate<ElementType extends object = object, ViewType extends TurboView = TurboView, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboController<ElementType, ViewType, ModelType, EmitterType> {
    /**
     * @description The key of the substrate. Used to retrieve it in the main component. If not set, if the element's
     * class name is MyElement and the substrate's class name is MyElementSomethingSubstrate, the key would
     * default to "something".
     */
    keyName: string;
    readonly substrateName: string;
    get objectList(): HTMLCollection | NodeList | Set<object>;
    set objectList(value: HTMLCollection | NodeList | Set<object>);
    constructor(properties: TurboSubstrateProperties<ElementType, ViewType, ModelType, EmitterType>);
    initialize(): void;
    addObject(object: object): void;
    removeObject(object: object): boolean;
    hasObject(object: object): boolean;
    isProcessed(object: object): boolean;
    resolve(properties?: SubstrateSolverProperties): void;
    addSolver(callback: (...args: any[]) => any): void;
    removeSolver(callback: (...args: any[]) => any): void;
    clearSolvers(): void;
}

type MvcInstanceOrConstructor<Type, PropertiesType> = Type | (new (properties: PropertiesType) => Type);
type MvcManyInstancesOrConstructors<Type, PropertiesType> = MvcInstanceOrConstructor<Type, PropertiesType> | MvcInstanceOrConstructor<Type, PropertiesType>[];
type MvcGenerationProperties<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = {
    view?: MvcInstanceOrConstructor<ViewType, TurboViewProperties>;
    model?: ModelType | (new (data?: any, dataBlocksType?: "map" | "array") => ModelType);
    emitter?: MvcInstanceOrConstructor<EmitterType, ModelType>;
    controllers?: MvcManyInstancesOrConstructors<TurboController, TurboControllerProperties>;
    handlers?: MvcManyInstancesOrConstructors<TurboHandler, ModelType>;
    interactors?: MvcManyInstancesOrConstructors<TurboInteractor, TurboInteractorProperties>;
    tools?: MvcManyInstancesOrConstructors<TurboTool, TurboToolProperties>;
    substrates?: MvcManyInstancesOrConstructors<TurboSubstrate, TurboSubstrateProperties>;
    data?: DataType;
    initialize?: boolean;
    force?: boolean;
};
type MvcProperties<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = Omit<MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>, "force"> & {
    element?: ElementType;
};

/**
 * @class Mvc
 * @description MVC -- Model-View-Component -- handler. Generates and manages an MVC structure for a certain object.
 * @template {object} ElementType - The type of the object that will be turned into MVC.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * */
declare class Mvc<ElementType extends object = object, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter<any>> {
    private readonly element;
    private _model;
    private readonly controllers;
    private readonly interactors;
    private readonly tools;
    private readonly substrates;
    constructor(properties: MvcProperties<ElementType, ViewType, DataType, ModelType, EmitterType>);
    /**
     * @description The view (if any) of the current MVC structure. Setting it will link the current model (if any)
     * to this new view.
     */
    set view(value: ViewType);
    /**
     * @description The model (if any) of the current MVC structure. Setting it will de-link the previous model and link
     * the new one to the current view (if any) and emitter (if any).
     */
    get model(): ModelType;
    set model(model: ModelType);
    /**
     * @description The emitter (if any) of the current MVC structure. Setting it will link the current model (if any)
     * to this new emitter.
     */
    set emitter(emitter: EmitterType);
    /**
     * @description The main data block (if any) attached to the element, taken from its model (if any).
     */
    get data(): DataType;
    set data(data: DataType);
    /**
     * @description The ID of the main data block (if any) of the element, taken from its model (if any).
     */
    get dataId(): string;
    set dataId(value: string);
    /**
     * @description The numerical index of the main data block (if any) of the element, taken from its model (if any).
     */
    get dataIndex(): number;
    set dataIndex(value: number);
    /**
     * @description The size (number) of the main data block (if any) of the element, taken from its model (if any).
     */
    get dataSize(): number;
    /**
     * @function getController
     * @description Retrieves the attached MVC controller with the given key.
     * By default, unless manually defined in the controller, if the element's class name is MyElement
     * and the controller's class name is MyElementSomethingController, the key would be "something".
     * @param {string} key - The controller's key.
     * @return {TurboController} - The controller.
     */
    getController(key: string): TurboController;
    /**
     * @function addController
     * @description Adds the given controller to the MVC structure.
     * @param {TurboController} controller - The controller to add.
     */
    addController(controller: TurboController): void;
    /**
     * @function getHandler
     * @description Retrieves the attached MVC handler with the given key.
     * By default, unless manually defined in the handler, if the element's class name is MyElement
     * and the handler's class name is MyElementSomethingHandler, the key would be "something".
     * @param {string} key - The handler's key.
     * @return {TurboHandler} - The handler.
     */
    getHandler(key: string): TurboHandler;
    /**
     * @function addHandler
     * @description Adds the given handler to the MVC structure.
     * @param {TurboHandler} handler - The handler to add.
     */
    addHandler(handler: TurboHandler): void;
    /**
     * @function getInteractor
     * @description Retrieves the attached MVC interactor with the given key.
     * By default, unless manually defined in the interactor, if the element's class name is MyElement
     * and the interactor's class name is MyElementSomethingInteractor, the key would be "something".
     * @param {string} key - The interactor's key.
     * @return {TurboInteractor} - The interactor.
     */
    getInteractor(key: string): TurboInteractor;
    /**
     * @function addInteractor
     * @description Adds the given interactor to the MVC structure.
     * @param {TurboInteractor} interactor - The interactor to add.
     */
    addInteractor(interactor: TurboInteractor): void;
    /**
     * @function getTool
     * @description Retrieves the attached MVC Tool with the given key.
     * By default, unless manually defined in the tool, if the element's class name is MyElement
     * and the tool's class name is MyElementSomethingTool, the key would be "something".
     * @param {string} key - The tool's key.
     * @return {TurboTool} - The tool.
     */
    getTool(key: string): TurboTool;
    /**
     * @function addTool
     * @description Adds the given tool to the MVC structure.
     * @param {TurboTool} tool - The tool to add.
     */
    addTool(tool: TurboTool): void;
    /**
     * @function getSubstrate
     * @description Retrieves the attached MVC Substrate with the given key.
     * By default, unless manually defined in the substrate, if the element's class name is MyElement
     * and the substrate's class name is MyElementSomethingSubstrate, the key would be "something".
     * @param {string} key - The substrate's key.
     * @return {TurboSubstrate} - The substrate.
     */
    getSubstrate(key: string): TurboSubstrate;
    /**
     * @function addSubstrate
     * @description Adds the given substrate to the MVC structure.
     * @param {TurboSubstrate} substrate - The substrate to add.
     */
    addSubstrate(substrate: TurboSubstrate): void;
    /**
     * @function generate
     * @description Generates the MVC structure based on the provided properties.
     * If no model or modelConstructor is defined, no model will be generated. Similarly for the view.
     * If the structure contains a model, an emitter will be created, even if it is not defined in the properties.
     * @param {MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>} properties - The properties to use
     * to generate the MVC structure.
     */
    generate(properties?: MvcGenerationProperties<ViewType, DataType, ModelType, EmitterType>): void;
    private generateInstance;
    private generateInstances;
    /**
     * @function initialize
     * @description Initializes the MVC parts: the view, the controllers, and the model (in this order). The model is
     * initialized last to allow for the view and controllers to setup their change callbacks.
     */
    initialize(): void;
    private linkModelToView;
    private emitterFireCallback;
    private deLinkModelFromEmitter;
    private linkModelToEmitter;
    protected extractClassEssenceName(constructor: new (...args: any[]) => any, type: string): string;
}

interface TurboElementMvcInterface<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel> {
    /**
     * @description The view (if any) of the element. Only when initializing MVC.
     */
    view: ViewType;
    /**
     * @description The model (if any) of the element. Only when initializing MVC.
     */
    model: ModelType;
    /**
     * @description The main data block (if any) attached to the element, taken from its model (if any). Only when
     * initializing MVC.
     */
    data: DataType;
    /**
     * @description The ID of the main data block (if any) of the element, taken from its model (if any). Only when
     * initializing MVC.
     */
    dataId: string;
    /**
     * @description The numerical index of the main data block (if any) of the element, taken from its model (if any).
     * Only when initializing MVC.
     */
    dataIndex: number;
    /**
     * @description The size (number) of the main data block (if any) of the element, taken from its model (if any).
     * Only when initializing MVC.
     */
    readonly dataSize: number;
}

interface TurboElementDefaultInterface {
    /**
     * @description Whether the element is selected or not.
     */
    selected: boolean;
    /**
     * @function getPropertiesValue
     * @description Returns the value with some fallback mechanisms on the static config field and a default value.
     * @param {Type} propertiesValue - The actual value; could be null.
     * @param {string} [configFieldName] - The field name of the associated value in the static config. Will be returned
     * if the actual value is null.
     * @param {Type} [defaultValue] - The default fallback value. Will be returned if both the actual and
     * config values are null.
     * @protected
     */
    getPropertiesValue<Type>(propertiesValue: Type, configFieldName?: string, defaultValue?: Type): Type;
}

/**
 * @type {TurboHeadlessProperties}
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * @description Object containing properties for configuring a headless (non-HTML) element, with possibly MVC properties.
 */
type TurboHeadlessProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = Omit<MvcProperties<object, ViewType, DataType, ModelType, EmitterType>, "element"> & {
    out?: string | Node;
    [key: string]: any;
};

/**
 * @class TurboHeadlessElement
 * @description TurboHeadlessElement class, similar to TurboElement but without extending HTMLElement.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
declare class TurboHeadlessElement<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter<any>> {
    /**
     * @description Static configuration object.
     */
    static readonly config: any;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value: typeof this.config): void;
    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    protected mvc: Mvc<this, ViewType, DataType, ModelType, EmitterType>;
    constructor(properties?: TurboHeadlessProperties<ViewType, DataType, ModelType, EmitterType>);
}

/**
 * @description Class that manages default mouse, trackpad, and touch events, and accordingly fires custom events for
 * easier management of input.
 */
declare class TurboEventManager<ToolType extends string = string> extends TurboHeadlessElement<any, any, TurboEventManagerModel> {
    protected static managers: TurboEventManager[];
    static get instance(): TurboEventManager;
    static get allManagers(): TurboEventManager[];
    static set allManagers(managers: TurboEventManager[]);
    protected keyController: TurboEventManagerKeyController;
    protected wheelController: TurboEventManagerWheelController;
    protected pointerController: TurboEventManagerPointerController;
    protected dispatchController: TurboEventManagerDispatchController;
    constructor(properties?: TurboEventManagerProperties);
    /**
     * @description The currently identified input device. It is not 100% accurate, especially when differentiating
     * between mouse and trackpad.
     */
    get inputDevice(): InputDevice;
    get onInputDeviceChange(): Delegate<(device: InputDevice) => void>;
    get currentClick(): ClickMode;
    get currentKeys(): string[];
    /**
     * @description Delegate fired when a tool is changed on a certain click button/mode
     */
    get onToolChange(): Delegate<(oldTool: ToolType, newTool: ToolType, type: ClickMode) => void>;
    get authorizeEventScaling(): boolean | (() => boolean);
    set authorizeEventScaling(value: boolean | (() => boolean));
    get scaleEventPosition(): (position: Point) => Point;
    set scaleEventPosition(value: (position: Point) => Point);
    get moveThreshold(): number;
    set moveThreshold(value: number);
    get longPressDuration(): number;
    set longPressDuration(value: number);
    set keyEventsEnabled(value: boolean);
    set wheelEventsEnabled(value: boolean);
    set moveEventsEnabled(value: boolean);
    set mouseEventsEnabled(value: boolean);
    set touchEventsEnabled(value: boolean);
    set clickEventEnabled(value: boolean);
    set dragEventEnabled(value: boolean);
    /**
     * @description Sets the lock state for the event manager.
     * @param origin - The element that initiated the lock state.
     * @param value - The state properties to set.
     */
    lock(origin: Node, value: TurboEventManagerStateProperties): void;
    /**
     * @description Resets the lock state to the default values.
     */
    unlock(): void;
    get enabled(): boolean;
    set enabled(value: boolean);
    get preventDefaultWheel(): boolean;
    set preventDefaultWheel(value: boolean);
    get preventDefaultMouse(): boolean;
    set preventDefaultMouse(value: boolean);
    get preventDefaultTouch(): boolean;
    set preventDefaultTouch(value: boolean);
    /**
     * @description All attached tools in an array
     */
    get toolsArray(): Node[];
    /**
     * @description Returns the tool with the given name (or undefined)
     * @param name
     */
    getToolsByName(name: ToolType): Node[];
    /**
     * @description Returns the first tool with the given name (or undefined)
     * @param name
     * @param predicate
     */
    getToolByName(name: ToolType, predicate?: (tool: Node) => boolean): Node;
    /**
     * @description Returns the tools associated with the given key
     * @param key
     */
    getToolsByKey(key: string): Node[];
    /**
     * @description Returns the first tool associated with the given key
     * @param key
     * @param predicate
     */
    getToolByKey(key: string, predicate?: (tool: Element) => boolean): Node;
    /**
     * @description Adds a tool to the tools map, identified by its name. Optionally, provide a key to bind the tool to.
     * @param toolName
     * @param tool
     * @param key
     */
    addTool(toolName: ToolType, tool: Node, key?: string): void;
    /**
     * @description Returns the name of the tool currently held by the provided click mode
     * @param mode
     */
    getCurrentToolName(mode?: ClickMode): ToolType;
    /**
     * @description Returns the instances of the tool currently held by the provided click mode
     * @param mode
     */
    getCurrentTools(mode?: ClickMode): Node[];
    getCurrentTool(mode?: ClickMode): Node;
    /**
     * @description Sets the provided tool as a current tool associated with the provided type
     * @param toolName
     * @param type
     * @param options
     */
    setTool(toolName: ToolType, type: ClickMode, options?: SetToolOptions): void;
    /**
     * @description Sets tool associated with the provided key as the current tool for the key mode
     * @param key
     */
    setToolByKey(key: string): boolean;
    setupCustomDispatcher(type: string): void;
    protected applyAndHookEvents(turboEventNames: Record<string, string>, defaultEventNames: Record<string, string>, applyTurboEvents: boolean): void;
    destroy(): void;
}

declare enum ClosestOrigin {
    target = "target",
    position = "position"
}
type TurboRawEventProperties = {
    clickMode?: ClickMode;
    keys?: string[];
    eventName?: TurboEventNameEntry;
    eventManager?: TurboEventManager;
    toolName?: string;
    authorizeScaling?: boolean | (() => boolean);
    scalePosition?: (position: Point) => Point;
    eventInitDict?: EventInit;
};
type TurboEventProperties = TurboRawEventProperties & {
    position?: Point;
};
type TurboDragEventProperties = TurboRawEventProperties & {
    origins?: TurboMap<number, Point>;
    previousPositions?: TurboMap<number, Point>;
    positions?: TurboMap<number, Point>;
};
type TurboKeyEventProperties = TurboRawEventProperties & {
    keyPressed?: string;
    keyReleased?: string;
};
type TurboWheelEventProperties = TurboRawEventProperties & {
    delta?: Point;
};

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
    constructor(properties: TurboDragEventProperties);
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
    constructor(properties: TurboKeyEventProperties);
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
    constructor(properties: TurboWheelEventProperties);
}

interface TurboElementUiInterface {
    /**
     * @description Whether the element is selected or not. Setting it will accordingly toggle the "selected" CSS
     * class (or whichever default selected class was set in the config) on the element and update the UI.
     */
    selected: boolean;
    /**
     * @function initializeUI
     * @description Initializes the element's UI by calling all the setup methods (setupChangedCallbacks,
     * setupUIElements, setupUILayout, setupUIListeners).
     */
    initializeUI(): void;
}

type TurboProxiedProperties<Tag extends ValidTag = "div", ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboProperties<Tag> & TurboHeadlessProperties<ViewType, DataType, ModelType, EmitterType>;
/**
 * @type {TurboElementProperties}
 * @extends TurboProperties
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 *
 * @description Object containing properties for configuring a custom HTML element. Is basically TurboProperties
 * without the tag.
 */
type TurboElementProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboProxiedProperties<"div", ViewType, DataType, ModelType, EmitterType>;
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
type TurboButtonProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboElementProperties<ViewType, DataType, ModelType> & {
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
 * @property {ValidTag} [defaultElementTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboButtonConfig = {
    defaultElementTag?: HTMLTag;
    defaultClasses?: string | string[];
};

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
type TurboIconProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboElementProperties<ViewType, DataType, ModelType> & {
    type?: string;
    directory?: string;
    icon: string;
    iconColor?: string;
    onLoaded?: (svg: SVGElement) => void;
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
    customLoaders?: Record<string, (path: string) => Promise<Element>>;
};

/**
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 * */
declare class TurboElement<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter<any>> extends HTMLElement {
    /**
     * @description Static configuration object.
     */
    static readonly config: any;
    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    protected mvc: Mvc<this, ViewType, DataType, ModelType, EmitterType>;
    /**
     * @description Delegate fired when the element is attached to DOM.
     */
    readonly onAttach: Delegate<() => void>;
    /**
     * @description Delegate fired when the element is detached from the DOM.
     */
    readonly onDetach: Delegate<() => void>;
    /**
     * @description Delegate fired when the element is adopted by a new parent in the DOM.
     */
    readonly onAdopt: Delegate<() => void>;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value: typeof this.config): void;
    constructor(properties?: TurboElementProperties<ViewType, DataType, ModelType, EmitterType>);
    /**
     * @function setupChangedCallbacks
     * @description Setup method intended to initialize change listeners and callbacks.
     * @protected
     */
    protected setupChangedCallbacks(): void;
    /**
     * @function setupUIElements
     * @description Setup method intended to initialize all direct sub-elements attached to this element, and store
     * them in fields.
     * @protected
     */
    protected setupUIElements(): void;
    /**
     * @function setupUILayout
     * @description Setup method to create the layout structure of the element by adding all created sub-elements to
     * this element's child tree.
     * @protected
     */
    protected setupUILayout(): void;
    /**
     * @function setupUIListeners
     * @description Setup method to initialize and define all input/DOM event listeners of the element.
     * @protected
     */
    protected setupUIListeners(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    adoptedCallback(): void;
}

/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
declare class TurboIcon<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboElement<ViewType, DataType, ModelType> {
    private _element;
    private _type;
    private _directory;
    onLoaded: (element: Element) => void;
    static readonly config: TurboIconConfig;
    private static imageTypes;
    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties<ViewType, DataType, ModelType>);
    update(properties: TurboIconProperties): void;
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
    set icon(value: string);
    /**
     * @description The assigned color to the icon (if any)
     */
    set iconColor(value: string);
    /**
     * @description The child element of the icon element (an HTML image or an SVG element).
     */
    private set element(value);
    get element(): Element;
    loadSvg(path: string): Promise<SVGElement>;
    private loadImg;
    private generateIcon;
    private getLoader;
    private setupLoadedElement;
    private clear;
}
declare function icon<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>>(properties: TurboIconProperties<ViewType, DataType, ModelType>): TurboIcon<ViewType, DataType, ModelType>;

/**
 * @type {TurboRichElementProperties}
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
type TurboRichElementProperties<ElementTag extends ValidTag = "div", ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboElementProperties<ViewType, DataType, ModelType> & {
    elementTag?: ElementTag;
    text?: string;
    leftCustomElements?: Element | Element[];
    leftIcon?: string | TurboIcon;
    prefixEntry?: string | HTMLElement;
    element?: string | TurboProperties<ElementTag> | ValidElement<ElementTag>;
    suffixEntry?: string | HTMLElement;
    rightIcon?: string | TurboIcon;
    rightCustomElements?: Element | Element[];
    unsetDefaultClasses?: boolean;
};
type TurboRichElementData = {
    leftCustomElements?: Element | Element[];
    leftIcon?: string;
    prefixEntry?: string;
    text?: string;
    suffixEntry?: string;
    rightIcon?: string;
    rightCustomElements?: Element | Element[];
    elementTag?: string;
};
/**
 * @type {TurboRichElementChildren}
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
type TurboRichElementChildren<ElementTag extends ValidTag = "p"> = {
    leftCustomElements: Element | Element[];
    leftIcon: TurboIcon;
    prefixEntry?: HTMLElement;
    element: ValidElement<ElementTag>;
    suffixEntry?: HTMLElement;
    rightIcon: TurboIcon;
    rightCustomElements: Element | Element[];
};
/**
 * @type {TurboRichElementConfig}
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {HTMLTag} [defaultElementTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboRichElementConfig = {
    defaultElementTag?: HTMLTag;
    defaultClasses?: string | string[];
};

/**
 * Class for creating a rich turbo element (an element that is possibly accompanied by icons (or other elements) on
 * its left and/or right).
 * @class TurboRichElement
 * @extends TurboElement
 * @template {ValidTag} ElementTag - The tag of the main element to create the rich element from.
 */
declare class TurboRichElement<ElementTag extends ValidTag = any, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboElement<ViewType, DataType, ModelType> {
    /**
     * @description Object containing the children of the rich element.
     */
    private readonly elements;
    static readonly config: TurboRichElementConfig;
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboRichElementProperties<ElementTag, ViewType, DataType, ModelType>);
    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {Element | Element[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    private addAtPosition;
    /**
     * @description The tag of the text element in the button
     */
    set elementTag(value: ElementTag);
    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    get leftCustomElements(): Element | Element[];
    set leftCustomElements(value: Element | Element[]);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon(): TurboIcon;
    set leftIcon(value: string | TurboIcon);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get prefixEntry(): HTMLElement;
    set prefixEntry(value: string | HTMLElement);
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get element(): ValidElement<ElementTag>;
    set element(value: string | TurboProperties<ElementTag> | ValidElement<ElementTag>);
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get text(): string;
    set text(value: string);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get suffixEntry(): HTMLElement;
    set suffixEntry(value: string | HTMLElement);
    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon(): TurboIcon;
    set rightIcon(value: string | TurboIcon);
    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    get rightCustomElements(): Element | Element[];
    set rightCustomElements(value: Element | Element[]);
}

/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
declare class TurboButton<ElementTag extends ValidTag = "p", ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboRichElement<ElementTag, ViewType, DataType, ModelType> {
    static readonly config: TurboButtonConfig;
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboRichElementProperties<ElementTag, ViewType, DataType, ModelType>);
    /**
     * @description The tag of the text element in the button
     */
    set elementTag(value: ElementTag);
}
declare function button<ElementTag extends ValidTag = "p">(properties: TurboRichElementProperties<ElementTag>): TurboButton<ElementTag>;

/**
 * @description A function type that interpolates a value based on the index, total count, and the object.
 *
 * @template Type
 * @template ClassType
 * @param {number} index - The index of the object.
 * @param {number} total - The total number of objects.
 * @param {ClassType} object - The object being interpolated.
 * @returns {Type}
 */
type ReifectInterpolator<Type, ClassType extends object = Element> = ((index: number, total: number, object: ClassType) => Type);
/**
 * @description A function type that interpolates a value based on the state, index, total count, and the object.
 *
 * @template Type
 * @template State
 * @template ClassType
 * @param {State} state - The current state.
 * @param {number} index - The index of the object.
 * @param {number} total - The total number of objects.
 * @param {ClassType} object - The object being interpolated.
 * @returns {Type}
 */
type StateInterpolator<Type, State extends string | number | symbol, ClassType extends object = Element> = ((state: State, index: number, total: number, object: ClassType) => Type);
/**
 * @description A type that represents a property specific to a state or an interpolated value.
 *
 * @template Type
 * @template ClassType
 */
type StateSpecificProperty<Type, ClassType extends object = Element> = Type | ReifectInterpolator<Type, ClassType>;
/**
 * @description A configuration type for properties based on states or interpolated values.
 *
 * @template Type
 * @template State
 * @template ClassType
 */
type BasicPropertyConfig<Type, State extends string | number | symbol> = PartialRecord<State, Type> | Type;
/**
 * @description A configuration type for properties based on states or interpolated values.
 *
 * @template Type
 * @template State
 * @template ClassType
 */
type PropertyConfig<Type, State extends string | number | symbol, ClassType extends object = Element> = PartialRecord<State, StateSpecificProperty<Type, ClassType>> | Type | StateInterpolator<Type, State, ClassType>;
type ReifectObjectData<State extends string | number | symbol, ClassType extends object = Element> = {
    object: WeakRef<ClassType>;
    enabled: ReifectEnabledObject;
    lastState?: State;
    resolvedValues?: ReifectObjectComputedProperties<State, ClassType>;
    objectIndex?: number;
    totalObjectCount?: number;
    onSwitch?: (state: State, index: number, total: number, object: ClassType) => void;
};
type ReifectObjectComputedProperties<State extends string | number | symbol, ClassType extends object = Element> = {
    properties: PartialRecord<State, PartialRecord<keyof ClassType, any>>;
    styles: PartialRecord<State, StylesType>;
    classes: PartialRecord<State, string | string[]>;
    replaceWith: PartialRecord<State, ClassType>;
    transitionProperties: PartialRecord<State, string[]>;
    transitionDuration: PartialRecord<State, number>;
    transitionTimingFunction: PartialRecord<State, string>;
    transitionDelay: PartialRecord<State, number>;
};
type StatefulReifectCoreProperties<State extends string | number | symbol, ClassType extends object = Element> = {
    properties?: PropertyConfig<PartialRecord<keyof ClassType, any>, State, ClassType>;
    styles?: PropertyConfig<StylesType, State, ClassType>;
    classes?: PropertyConfig<string | string[], State, ClassType>;
    replaceWith?: PropertyConfig<ClassType, State, ClassType>;
    transitionProperties?: PropertyConfig<string | string[], State, ClassType>;
    transitionDuration?: PropertyConfig<number, State, ClassType>;
    transitionTimingFunction?: PropertyConfig<string, State, ClassType>;
    transitionDelay?: PropertyConfig<number, State, ClassType>;
};
type StatefulReifectProperties<State extends string | number | symbol, ClassType extends object = Element> = StatefulReifectCoreProperties<State, ClassType> & {
    states?: State[];
    attachedObjects?: ClassType[];
    transition?: BasicPropertyConfig<string, State>;
};
type ReifectAppliedOptions<State extends string | number | symbol, ClassType extends object = Element> = {
    attachObjects?: boolean;
    executeForAll?: boolean;
    recomputeIndices?: boolean;
    recomputeProperties?: boolean;
    applyStylesInstantly?: boolean;
    propertiesOverride?: StatefulReifectCoreProperties<State, ClassType>;
};
type ReifectEnabledObject = {
    global?: boolean;
    properties?: boolean;
    styles?: boolean;
    classes?: boolean;
    replaceWith?: boolean;
    transition?: boolean;
};

/**
 * @class StatefulReifect
 * @description A class to manage and apply dynamic state-based properties, styles, classes, and transitions to a
 * set of objects.
 *
 * @template {string | number | symbol} State - The type of the reifier's states.
 * @template {object} ClassType - The object type this reifier will be applied to.
 */
declare class StatefulReifect<State extends string | number | symbol, ClassType extends object = Node> {
    protected readonly timeRegex: RegExp;
    protected readonly attachedObjects: ReifectObjectData<State, ClassType>[];
    protected _states: State[];
    protected readonly values: StatefulReifectCoreProperties<State, ClassType>;
    /**
     * @description Creates an instance of StatefulReifier.
     * @param {StatefulReifectProperties<State, ClassType>} properties - The configuration properties.
     */
    constructor(properties: StatefulReifectProperties<State, ClassType>);
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
    attach(object: ClassType, onSwitch?: (state: State, index: number, total: number, object: ClassType) => void, index?: number): this;
    /**
     * @function attachAll
     * @description Attaches multiple objects to the reifier.
     * @param {...ClassType[]} objects - The objects to attach.
     * @returns {this} - The reifier itself, for method chaining.
     */
    attachAll(...objects: ClassType[]): this;
    /**
     * @function attachAllAt
     * @description Attaches multiple objects to the reifier at a specified index.
     * @param {number} index - The index to specify the position at which to insert the objects in the reifier's
     * attached list.
     * @param {...ClassType[]} objects - The objects to attach.
     * @returns {this} - The reifier itself, for method chaining.
     */
    attachAllAt(index: number, ...objects: ClassType[]): this;
    /**
     * @function detach
     * @description Detaches one or more objects from the reifier.
     * @param {...ClassType[]} objects - The objects to detach.
     * @returns {this} - The reifier itself, for method chaining.
     */
    detach(...objects: ClassType[]): this;
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
    protected attachObject(object: ClassType, index?: number, onSwitch?: (state: State, index: number, total: number, object: ClassType) => void): ReifectObjectData<State, ClassType>;
    /**
     * @protected
     * @function detachObject
     * @description Function used to remove a data entry from the attached objects list.
     * @param {ReifectObjectData<State, ClassType>} data - The data entry to remove.
     */
    protected detachObject(data: ReifectObjectData<State, ClassType>): void;
    /**
     * @function getData
     * @description Retrieve the data entry of a given object.
     * @param {ClassType} object - The object to find the data of.
     * @returns {ReifectObjectData<State, ClassType>} - The corresponding data, or `null` if was not found.
     */
    getData(object: ClassType): ReifectObjectData<State, ClassType>;
    /**
     * @function getObject
     * @description Retrieves the object attached to the given data entry.
     * @param {ReifectObjectData<State, ClassType>} data - The data entry to get the corresponding object of.
     * @returns {ClassType} The corresponding object, or `null` if was garbage collected.
     */
    getObject(data: ReifectObjectData<State, ClassType>): ClassType;
    /**
     * @description All possible states.
     */
    get states(): State[];
    set states(value: State[]);
    /**
     * @function stateOf
     * @description Determine the current state of the reifect on the provided object.
     * @param {ClassType} object - The object to determine the state for.
     * @returns {State | undefined} - The current state of the reifect or undefined if not determinable.
     */
    stateOf(object: ClassType): State;
    getAllStates(): State[];
    /**
     * @protected
     * @function parseState
     * @description Parses a boolean into the corresponding state value.
     * @param {State | boolean} value - The value to parse.
     * @returns {State} The parsed value, or `null` if the boolean could not be parsed.
     */
    protected parseState(value: State | boolean): State;
    set enabled(value: boolean);
    set propertiesEnabled(value: boolean);
    set stylesEnabled(value: boolean);
    set classesEnabled(value: boolean);
    set replaceWithEnabled(value: boolean);
    set transitionEnabled(value: boolean);
    /**
     * @function enable
     * @description Sets/updates the `enabled` value corresponding to the provided object for this reifier.
     * @param {ClassType} object - The object to set the state of.
     * @param {boolean | ReifectEnabledObject} value - The value to set/update with. Setting it to a boolean will
     * accordingly update the value of `enabled.global`.
     */
    enable(value: boolean | ReifectEnabledObject, object?: ClassType): void;
    enableObject(object: ClassType, value: boolean | ReifectEnabledObject): void;
    /**
     * @function getObjectEnabledState
     * @description Returns the `enabled` value corresponding to the provided object for this reifier.
     * @param {ClassType} object - The object to get the state of.
     * @returns {ReifectEnabledObject} - The corresponding enabled state.
     */
    getObjectEnabledState(object: ClassType): ReifectEnabledObject;
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
    set properties(value: PropertyConfig<PartialRecord<keyof ClassType, any>, State, ClassType>);
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
    set styles(value: PropertyConfig<StylesType, State, ClassType>);
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
    set classes(value: PropertyConfig<string | string[], State, ClassType>);
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
    set replaceWith(value: PropertyConfig<ClassType, State, ClassType>);
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
    set transitionProperties(value: PropertyConfig<string | string[], State, ClassType>);
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
    set transitionDuration(value: PropertyConfig<number, State, ClassType>);
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
    set transitionTimingFunction(value: PropertyConfig<string, State, ClassType>);
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
    set transitionDelay(value: PropertyConfig<number, State, ClassType>);
    set transition(value: BasicPropertyConfig<string, State>);
    protected processTransitionObject(transitionObject: BasicPropertyConfig<string, State>): StatefulReifectCoreProperties<State, ClassType>;
    protected processTransitionString(transitionString: string): StatefulReifectCoreProperties<State, ClassType>;
    /**
     * @function getTransitionString
     * @description Gets the CSS transition string for the specified direction.
     * @param {ReifectObjectData<State, ClassType>} data - The target element's transition data entry.
     * @param state
     * @returns {string} The CSS transition string.
     */
    private getTransitionString;
    initialize(state: State | boolean, objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>): void;
    apply(state: State | boolean, objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>): void;
    toggle(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>): void;
    /**
     * @function reloadFor
     * @description Generates the transition CSS string for the provided transition with the correct interpolation
     * information.
     * @param {ClassType} object - The element to apply the string to.
     * @returns {this} Itself for method chaining.
     */
    reloadFor(object: ClassType): this;
    reloadTransitionFor(object: ClassType): this;
    getEnabledObjectsData(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<State, ClassType>): ReifectObjectData<State, ClassType>[];
    applyResolvedValues(data: ReifectObjectData<State, ClassType>, skipTransition?: boolean, applyStylesInstantly?: boolean): void;
    refreshResolvedValues(): void;
    applyProperties(data: ReifectObjectData<State, ClassType>, state?: State): void;
    refreshProperties(): void;
    applyReplaceWith(data: ReifectObjectData<State, ClassType>, state?: State): void;
    refreshReplaceWith(): void;
    applyClasses(data: ReifectObjectData<State, ClassType>, state?: State): void;
    refreshClasses(): void;
    applyStyles(data: ReifectObjectData<State, ClassType>, state?: State, applyStylesInstantly?: boolean): void;
    refreshStyles(): void;
    applyTransition(data: ReifectObjectData<State, ClassType>, state?: State): void;
    refreshTransition(): void;
    protected filterEnabledObjects(data: ReifectObjectData<State, ClassType>): boolean;
    protected processRawProperties(data: ReifectObjectData<State, ClassType>, override?: StatefulReifectCoreProperties<State, ClassType>): void;
    private generateNewData;
    private initializeOptions;
    /**
     * @description Clone the reifect to create a new copy with the same properties but no attached objects.
     * @returns {StatefulReifect<State, ClassType>} - The new reifect.
     */
    clone(): StatefulReifect<State, ClassType>;
    protected processRawPropertyForState<Type>(data: ReifectObjectData<State, ClassType>, field: keyof StatefulReifectCoreProperties<State, ClassType>, value: PropertyConfig<Type, State, ClassType>, state: State): void;
    /**
     * @description Processes string durations like "200ms" or "0.3s", or even "100".
     * @param value
     * @private
     */
    private parseTime;
}
declare function statefulReifier<State extends string | number | symbol, ClassType extends object = Element>(properties: StatefulReifectProperties<State, ClassType>): StatefulReifect<State, ClassType>;

type TurboIconSwitchProperties<State extends string | number | symbol, ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboIconProperties<ViewType, DataType, ModelType> & {
    switchReifect?: StatefulReifect<State, TurboIcon> | StatefulReifectProperties<State, TurboIcon>;
    defaultState?: State;
    appendStateToIconName?: boolean;
};

declare enum Direction {
    vertical = "vertical",
    horizontal = "horizontal"
}
declare enum SideH {
    left = "left",
    right = "right"
}
declare enum SideV {
    top = "top",
    bottom = "bottom"
}
declare enum Side {
    top = "top",
    bottom = "bottom",
    left = "left",
    right = "right"
}
declare enum InOut {
    in = "in",
    out = "out"
}
declare enum OnOff {
    on = "on",
    off = "off"
}
declare enum Open {
    open = "open",
    closed = "closed"
}
declare enum Shown {
    visible = "visible",
    hidden = "hidden"
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
type FlexRect = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
};

declare class TurboIconSwitch<State extends string | number | symbol = OnOff, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboIcon<ViewType, DataType, ModelType> {
    switchReifect: StatefulReifect<State, TurboIcon>;
    /**
     * Creates an instance of Icon.
     * @param {TurboIconSwitchProperties<State>} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconSwitchProperties<State, ViewType, DataType, ModelType>);
    set appendStateToIconName(value: boolean);
}

type TurboIconToggleProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboIconProperties<ViewType, DataType, ModelType> & {
    toggled?: boolean;
    toggleOnClick?: boolean;
    onToggle?: (value: boolean, el: TurboIconToggle) => void;
};

declare class TurboIconToggle<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel> extends TurboIcon<ViewType, DataType, ModelType> {
    onToggle: (value: boolean, el: TurboIconToggle) => void;
    constructor(properties: TurboIconToggleProperties<ViewType, DataType, ModelType>);
    set toggled(value: boolean);
    set toggleOnClick(value: boolean);
    toggle(): void;
    private clickListener;
}

type TurboInputProperties<InputTag extends "input" | "textarea" = "input", ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboRichElementProperties<InputTag, ViewType, DataType, ModelType> & {
    label?: string;
    locked?: boolean;
    dynamicVerticalResize?: boolean;
    inputRegexCheck?: RegExp | string;
    blurRegexCheck?: RegExp | string;
    selectTextOnFocus?: boolean;
};

declare class TurboInput<InputTag extends "input" | "textarea" = "input", ValueType extends string | number = string, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboElement {
    readonly labelElement: HTMLLabelElement;
    readonly inputElement: TurboRichElement<InputTag>;
    locked: boolean;
    private lastValueWithInputCheck;
    private lastValueWithBlurCheck;
    constructor(properties?: TurboInputProperties<InputTag, ViewType, DataType, ModelType>);
    private setupEvents;
    protected set stringValue(value: string);
    protected get stringValue(): string;
    get value(): ValueType;
    set value(value: string | ValueType);
}

declare class TurboNumericalInput<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboInput<"input", number, ViewType, DataType, ModelType> {
    multiplier: number;
    decimalPlaces: number;
    min: number;
    max: number;
    constructor(properties?: TurboInputProperties<"input", ViewType, DataType, ModelType>);
    get value(): number;
    set value(value: string | number);
}

type TurboNumericalInputProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboInputProperties<"input", ViewType, DataType, ModelType> & {
    multiplier?: number;
    decimalPlaces?: number;
    min?: number;
    max?: number;
};

/**
 * @type {TurboSelectEntryProperties}
 * @description Properties for configuring a DropdownEntry.
 * @extends TurboProperties
 *
 * @property {string} value - The value associated with the dropdown entry.
 * @property {boolean} [selected=false] - Indicates whether the entry is initially selected.
 * @property {string | string[]} [selectedClasses=""] - CSS class(es) applied to the entry when it is selected.
 */
type TurboSelectEntryProperties<ValueType = string, SecondaryValueType = string, ElementTag extends ValidTag = "p", ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<DataType>> = TurboRichElementProperties<ElementTag, ViewType, DataType, ModelType> & {
    unsetDefaultClasses?: boolean;
    selectedClasses?: string | string[];
    value: ValueType;
    secondaryValue?: SecondaryValueType;
    selected?: boolean;
    enabled?: boolean;
    action?: () => void;
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
declare class TurboSelectEntry<ValueType = string, SecondaryValueType = string, ElementTag extends ValidTag = "p", ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboRichElement<ElementTag, ViewType, DataType, ModelType> {
    /**
     * @description The class(es) assigned to the dropdown entry when it is selected
     */
    selectedClasses: string | string[];
    private readonly action;
    onSelected: (selected: boolean) => void;
    onEnabled: (enabled: boolean) => void;
    private readonly reflectedElement;
    private inputElement;
    readonly config: TurboSelectEntryConfig;
    /**
     * @description DropdownEntry constructor
     * @param {TurboSelectEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties: TurboSelectEntryProperties<ValueType, SecondaryValueType, ElementTag, ViewType, DataType, ModelType>);
    set secondaryValue(value: SecondaryValueType);
    /**
     * @description The value of the dropdown entry
     */
    set value(value: ValueType);
    get stringValue(): string;
    /**
     * @description Whether or not the dropdown entry is selected
     */
    set selected(value: boolean);
    set enabled(value: boolean);
    get inputName(): string;
    set inputName(value: string);
    /**
     * @description Toggles the selection of this dropdown entry
     */
    toggle(): void;
}

type TurboSelectProperties<ValueType = string, SecondaryValueType = string, EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>, ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboElementProperties<ViewType, DataType, ModelType> & {
    unsetDefaultClasses?: boolean;
    customSelectedEntryClasses?: string;
    values?: (ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType)[];
    selectedValues?: ValueType[];
    multiSelection?: boolean;
    forceSelection?: boolean;
    inputName?: string;
    entriesParent?: Element;
    onSelect?: (b: boolean, entry: EntryType, index: number) => void;
};
type TurboSelectConfig = {
    defaultClasses?: string | string[];
    defaultSelectedEntryClasses?: string | string[];
};
type TurboSelectInputEventProperties<ValueType = string, SecondaryValueType = string, EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>> = TurboRawEventProperties & {
    toggledEntry: EntryType;
    values: ValueType[];
};

/**
 * Base class for creating a selection menu
 * @class TurboSelect
 * @extends TurboElement
 */
declare class TurboSelect<ValueType = string, SecondaryValueType = string, EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboElement<ViewType, DataType, ModelType> {
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
    protected readonly multiSelection: boolean;
    protected readonly forceSelection: boolean;
    onSelect: (b: boolean, entry: EntryType, index: number) => void;
    protected readonly selectedEntryClasses: string | string[];
    static readonly config: TurboSelectConfig;
    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties: TurboSelectProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType>);
    createEntry(entry: ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType): EntryType;
    addEntry(entry: ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType, index?: number): EntryType;
    protected onEntryClick(entry: EntryType, e?: Event): void;
    /**
     * @description Select an entry.
     * @param {string | EntryType} entry - The DropdownEntry (or its string value) to select.
     * @param selected
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    select(entry: ValueType | EntryType, selected?: boolean): this;
    /**
     * @description Select an entry.
     * @param {number} index - The index of the entry to select
     * @param {(index: number, entriesCount: number, zero?: number) => number} [preprocess=trim] - Callback to execute
     * on the index to preprocess it. Defaults to trim().
     * @return {TurboSelect} - This Dropdown for chaining.
     */
    selectByIndex(index: number, preprocess?: (index: number, entriesCount: number, zero?: number) => number): this;
    getIndex(entry: EntryType): number;
    deselectAll(): void;
    reset(): void;
    get enabledEntries(): EntryType[];
    get enabledValues(): ValueType[];
    get enabledSecondaryValues(): SecondaryValueType[];
    find(value: ValueType): EntryType;
    findBySecondaryValue(value: SecondaryValueType): EntryType;
    findAll(...values: ValueType[]): EntryType[];
    findAllBySecondaryValue(...values: SecondaryValueType[]): EntryType[];
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
    get selectedSecondaryValues(): SecondaryValueType[];
    get selectedSecondaryValue(): SecondaryValueType;
    get stringSelectedValue(): string;
    clear(): void;
    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    get values(): ValueType[];
    set values(values: (ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType)[]);
}

declare class TurboSelectInputEvent<ValueType = string, SecondaryValueType = string, EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>> extends TurboEvent {
    readonly toggledEntry: EntryType;
    readonly values: ValueType[];
    constructor(properties: TurboSelectInputEventProperties<ValueType, SecondaryValueType, EntryType>);
}

/**
 * @description A configuration type for properties based on states or interpolated values.
 *
 * @template Type
 * @template State
 * @template ClassType
 */
type StatelessPropertyConfig<Type, ClassType extends object = Element> = Type | ReifectInterpolator<Type, ClassType>;
type StatelessReifectCoreProperties<ClassType extends object = Element> = {
    properties?: StatelessPropertyConfig<PartialRecord<keyof ClassType, any>, ClassType>;
    styles?: StatelessPropertyConfig<StylesType, ClassType>;
    classes?: StatelessPropertyConfig<string | string[], ClassType>;
    replaceWith?: StatelessPropertyConfig<ClassType, ClassType>;
    transitionProperties?: StatelessPropertyConfig<string | string[], ClassType>;
    transitionDuration?: StatelessPropertyConfig<number, ClassType>;
    transitionTimingFunction?: StatelessPropertyConfig<string, ClassType>;
    transitionDelay?: StatelessPropertyConfig<number, ClassType>;
};
type StatelessReifectProperties<ClassType extends object = Element> = StatelessReifectCoreProperties<ClassType> & {
    attachedObjects?: ClassType[];
};

/**
 * @class Reifect
 * @description A class to manage and apply dynamic properties, styles, classes, and transitions to a
 * set of objects.
 *
 * @template {object} ClassType - The object type this reifier will be applied to.
 */
declare class Reifect<ClassType extends object = Node> extends StatefulReifect<"", ClassType> {
    /**
     * @description Creates an instance of StatefulReifier.
     * @param {StatelessReifectProperties<ClassType>} properties - The configuration properties.
     */
    constructor(properties: StatelessReifectProperties<ClassType>);
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
    get properties(): StatelessPropertyConfig<PartialRecord<keyof ClassType, any>, ClassType>;
    set properties(value: StatelessPropertyConfig<PartialRecord<keyof ClassType, any>, ClassType>);
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
    get styles(): StatelessPropertyConfig<StylesType, ClassType>;
    set styles(value: StatelessPropertyConfig<StylesType, ClassType>);
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
    get classes(): StatelessPropertyConfig<string | string[], ClassType>;
    set classes(value: StatelessPropertyConfig<string | string[], ClassType>);
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
    get replaceWith(): StatelessPropertyConfig<ClassType, ClassType>;
    set replaceWith(value: StatelessPropertyConfig<ClassType, ClassType>);
    set transition(value: string);
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
    get transitionProperties(): StatelessPropertyConfig<string | string[], ClassType>;
    set transitionProperties(value: StatelessPropertyConfig<string | string[], ClassType>);
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
    get transitionDuration(): StatelessPropertyConfig<number, ClassType>;
    set transitionDuration(value: StatelessPropertyConfig<number, ClassType>);
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
    get transitionTimingFunction(): StatelessPropertyConfig<string, ClassType>;
    set transitionTimingFunction(value: StatelessPropertyConfig<string, ClassType>);
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
    get transitionDelay(): StatelessPropertyConfig<number, ClassType>;
    set transitionDelay(value: StatelessPropertyConfig<number, ClassType>);
    initialize(objects?: ClassType | ClassType[], options?: ReifectAppliedOptions<"", ClassType>): void;
    apply(objects?: ClassType[] | ClassType, options?: ReifectAppliedOptions<"", ClassType>): void;
}
declare function reifect<ClassType extends object = Node>(properties: StatelessReifectProperties<ClassType>): Reifect<ClassType>;

type TurboDrawerProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboElementProperties<ViewType, DataType, ModelType> & {
    side?: Side;
    offset?: PartialRecord<Open, number>;
    hideOverflow?: boolean;
    panel?: TurboProperties | HTMLElement;
    thumb?: TurboProperties | HTMLElement;
    icon?: string | Element | TurboIconSwitchProperties<Side> | TurboIconSwitch<Side>;
    attachSideToIconName?: boolean;
    rotateIconBasedOnSide?: boolean;
    initiallyOpen?: boolean;
    transition?: Reifect<HTMLElement>;
};

declare class TurboDrawer<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel> extends TurboElement<ViewType, DataType, ModelType> {
    readonly thumb: HTMLElement;
    readonly panelContainer: HTMLElement;
    readonly panel: HTMLElement;
    private _icon;
    private _offset;
    private _translation;
    readonly transition: Reifect;
    private dragging;
    private animationOn;
    protected resizeObserver: ResizeObserver;
    constructor(properties: TurboDrawerProperties<ViewType, DataType, ModelType>);
    get icon(): TurboIconSwitch<Side> | Element;
    set icon(value: string | Element | TurboIconSwitchProperties<Side> | TurboIconSwitch<Side>);
    private initEvents;
    getOppositeSide(side?: Side): Side;
    getAdjacentSide(side?: Side): Side;
    set hideOverflow(value: boolean);
    set attachSideToIconName(value: boolean);
    set rotateIconBasedOnSide(value: boolean);
    set side(value: Side);
    get offset(): PartialRecord<Open, number>;
    set offset(value: number | PartialRecord<Open, number>);
    get isVertical(): boolean;
    set open(value: boolean);
    get translation(): number;
    private set translation(value);
    refresh(): void;
}

type TurboPopupProperties<ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboElementProperties<ViewType, DataType, ModelType> & {
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

declare class TurboPopup<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboElement<ViewType, DataType, ModelType> {
    private _popupAnchor;
    private _parentAnchor;
    private _viewportMargin;
    private _offsetFromParent;
    fallbackModes: Coordinate<PopupFallbackMode>;
    static readonly config: TurboPopupConfig;
    constructor(properties?: TurboPopupProperties<ViewType, DataType, ModelType>);
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

/**
 * @type {TurboDropdownProperties}
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
type TurboDropdownProperties<ValueType = string, SecondaryValueType = string, EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>, ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<DataType>> = TurboSelectProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType> & {
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
declare class TurboDropdown<ValueType = string, SecondaryValueType = string, EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboSelect<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType> {
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
    constructor(properties: TurboDropdownProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType>);
    private initSelector;
    private initPopup;
    protected onEntryClick(entry: EntryType): void;
    select(entry: ValueType | EntryType, selected?: boolean): this;
    private openPopup;
}

type TurboMarkingMenuProperties<ValueType = string, SecondaryValueType = string, EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>, ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboSelectProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType> & {
    transition?: StatefulReifect<InOut> | StatefulReifectProperties<InOut>;
    startAngle?: number;
    endAngle?: number;
    semiMajor?: number;
    semiMinor?: number;
    minDragDistance?: number;
};

declare class TurboMarkingMenu<ValueType = string, SecondaryValueType = string, EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboSelect<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType> {
    private readonly transition;
    semiMajor: number;
    semiMinor: number;
    private currentOrigin;
    minDragDistance: number;
    set startAngle(value: number);
    set endAngle(value: number);
    constructor(properties?: TurboMarkingMenuProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType>);
    get totalAngle(): number;
    private initEvents;
    private initializeTransition;
    private computeAngle;
    addEntry(entry: ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType, index?: number): EntryType;
    show(b?: boolean, position?: Point): this;
    getEntryInDirection(position: Point): EntryType | null;
    selectEntryInDirection(position: Point): void;
    attachTo(element: Element, onClick?: (e: Event) => void, onDragStart?: (e: Event) => void, onDragEnd?: (e: Event) => void): void;
}

type TurboSelectWheelProperties<ValueType = string, SecondaryValueType = string, EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>, ViewType extends TurboView = TurboView, DataType extends object = object, ModelType extends TurboModel = TurboModel> = TurboSelectProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType> & {
    direction?: Direction;
    styleReifect?: Reifect | StatelessReifectProperties;
    generateCustomStyling?: (properties: TurboSelectWheelStylingProperties) => string | PartialRecord<keyof CSSStyleDeclaration, string | number>;
    size?: number | Record<Range, number>;
    opacity?: Record<Range, number>;
    scale?: Record<Range, number>;
    alwaysOpen?: boolean;
};
type TurboSelectWheelStylingProperties = {
    element: HTMLElement;
    translationValue: number;
    scaleValue: number;
    opacityValue: number;
    size: Record<Range, number>;
    defaultComputedStyles: PartialRecord<keyof CSSStyleDeclaration, string | number>;
};

/**
 * @class TurboSelectWheel
 * @extends TurboSelect
 * @description Class to create a dynamic selection wheel.
 * @template {string} ValueType
 * @template {TurboSelectEntry<ValueType, any>} EntryType
 */
declare class TurboSelectWheel<ValueType = string, SecondaryValueType = string, EntryType extends TurboSelectEntry<ValueType, SecondaryValueType> = TurboSelectEntry<ValueType, SecondaryValueType>, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel<any>> extends TurboSelect<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType> {
    private _currentPosition;
    private _reifect;
    private _size;
    protected readonly sizePerEntry: number[];
    protected readonly positionPerEntry: number[];
    protected totalSize: number;
    dragLimitOffset: number;
    /**
     * @description Hides after the set time has passed. Set to a negative value to never hide the wheel. In ms.
     */
    openTimeout: number;
    direction: Direction;
    scale: Record<Range, number>;
    generateCustomStyling: (properties: TurboSelectWheelStylingProperties) => string | PartialRecord<keyof CSSStyleDeclaration, string | number>;
    protected dragging: boolean;
    protected openTimer: NodeJS.Timeout;
    constructor(properties: TurboSelectWheelProperties<ValueType, SecondaryValueType, EntryType, ViewType, DataType, ModelType>);
    connectedCallback(): void;
    set opacity(value: Record<Range, number>);
    get size(): Record<Range, number>;
    set size(value: Record<Range, number> | number);
    get reifect(): Reifect;
    set reifect(value: Reifect | StatelessReifectProperties);
    set alwaysOpen(value: boolean);
    private readonly closeOnClick;
    get isVertical(): boolean;
    set index(value: number);
    protected get trimmedIndex(): number;
    protected get flooredTrimmedIndex(): number;
    set open(value: boolean);
    get currentPosition(): number;
    protected set currentPosition(value: number);
    protected setupUIListeners(): void;
    protected computeDragValue(delta: Point): number;
    /**
     * Recalculates the dimensions and positions of all entries
     */
    protected reloadEntrySizes(): void;
    protected recomputeIndex(): void;
    protected computeAndApplyStyling(element: HTMLElement, translationValue: number, size?: Record<Range, number>): void;
    select(entry: ValueType | EntryType, selected?: boolean): this;
    protected onEntryClick(entry: EntryType, e?: Event): void;
    addEntry(entry: ValueType | TurboSelectEntryProperties<ValueType, SecondaryValueType> | EntryType, index?: number): EntryType;
    clear(): void;
    refresh(): void;
    reset(): void;
    protected clearOpenTimer(): void;
    protected setOpenTimer(): void;
}

/**
 * @class ReifectHandler
 * @description A class to handle reifects for an attached element.
 * @template {object = Node} ClassType
 */
declare class ReifectHandler<ClassType extends object = Node> {
    private readonly attachedNode;
    private readonly reifects;
    private readonly _enabled;
    /**
     * @constructor
     * @param {Node} attachedNode - The element to attach transitions to.
     */
    constructor(attachedNode: ClassType);
    /**
     * @function attach
     * @description Attach one or more transitions to the element.
     * @param {StatefulReifect<any, ClassType>[]} reifects - The transition(s) to attach.
     * @returns {this} The element's TransitionHandler instance.
     */
    attach(...reifects: StatefulReifect<any, ClassType>[]): this;
    /**
     * @function detach
     * @description Detach one or more transitions from the element.
     * @param {StatefulReifect<any, ClassType>[]} reifects - The transition(s) to detach.
     * @returns {this} The element's TransitionHandler instance.
     */
    detach(...reifects: StatefulReifect<any, ClassType>[]): this;
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
    initialize<State extends string | symbol | number>(reifect: StatefulReifect<State, ClassType>, direction: State, options?: ReifectAppliedOptions<State, ClassType>): this;
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
    apply<State extends string | symbol | number>(reifect: StatefulReifect<State, ClassType>, direction: State, options?: ReifectAppliedOptions<State, ClassType>): this;
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
    toggle<State extends string | symbol | number>(reifect: StatefulReifect<State, ClassType>, options?: ReifectAppliedOptions<State, ClassType>): this;
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
     * @function reload
     * @description Reloads all transitions attached to the element. Doesn't recompute styles.
     */
    reloadTransitions(): void;
    /**
     * @description The enabled state of the reifect (as a {@link ReifectEnabledObject}). Setting it to a boolean will
     * accordingly update the value of `enabled.global`.
     */
    get enabled(): ReifectEnabledObject;
    set enabled(value: boolean | ReifectEnabledObject);
    getReifectEnabledState(reifect: StatefulReifect<any, ClassType>): ReifectEnabledObject;
    enableReifect(reifect: StatefulReifect<any, ClassType>, value: boolean | ReifectEnabledObject): void;
}

declare global {
    interface Node {
        /**
         * @description Handler for all Reifects attached to this element.
         */
        readonly reifects: ReifectHandler;
        /**
         * @description The transition used by the element's show() and isShown methods. Directly modifying its
         * value will modify all elements' default showTransition. Unless this is the desired outcome, set it to a
         * new custom StatefulReifect.
         */
        showTransition: StatefulReifect<Shown>;
        /**
         * @description Boolean indicating whether the element is shown or not, based on its showTransition.
         */
        readonly isShown: boolean;
        /**
         * @description Show or hide the element (based on CSS) by transitioning in/out of the element's showTransition.
         * @param {boolean} b - Whether to show the element or not
         * @returns {this} Itself, allowing for method chaining.
         */
        show(b: boolean): this;
    }
}

declare function addReifectManagementToNodePrototype(): void;

/**
 * @class TurboProxiedElement
 * @description TurboProxiedElement class, similar to TurboElement but containing an HTML element instead of being one.
 * @template {TurboView} ViewType - The element's view type, if initializing MVC.
 * @template {object} DataType - The element's data type, if initializing MVC.
 * @template {TurboModel<DataType>} ModelType - The element's model type, if initializing MVC.
 * @template {TurboEmitter} EmitterType - The element's emitter type, if initializing MVC.
 */
declare class TurboProxiedElement<ElementTag extends ValidTag = ValidTag, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel, EmitterType extends TurboEmitter = TurboEmitter<any>> {
    /**
     * @description Static configuration object.
     */
    static readonly config: any;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    static configure(value: typeof this.config): void;
    /**
     * @description The HTML (or other) element wrapped inside this instance.
     */
    readonly element: ValidElement<ElementTag>;
    /**
     * @description The MVC handler of the element. If initialized, turns the element into an MVC structure.
     * @protected
     */
    protected mvc: Mvc<this, ViewType, DataType, ModelType, EmitterType>;
    constructor(properties?: TurboProxiedProperties<ElementTag, ViewType, DataType, ModelType, EmitterType>);
    protected setupChangedCallbacks(): void;
    protected setupUIElements(): void;
    protected setupUILayout(): void;
    protected setupUIListeners(): void;
    set selected(value: boolean);
}

declare function setupClassFunctions(): void;

declare function setupElementFunctions(): void;

declare function setupEventFunctions(): void;

/**
 * @type {ChildHandler}
 * @description A type that represents all entities that can hold and manage children (an element or a shadow root).
 */
type ChildHandler = Node | ShadowRoot;
declare function setupHierarchyFunctions(): void;

declare function setupMiscFunctions(): void;

declare function setupStyleFunctions(): void;

declare function setupSubstrateFunctions(): void;

declare function setupToolFunctions(): void;

/**
 * @type {MakeToolOptions}
 * @description Options used when turning an element into a tool via `makeTool`.
 * @property {DefaultEventNameEntry} [activationEvent] - Custom activation event to listen to
 * (defaults to the framework's default click event name).
 * @property {ClickMode} [clickMode] -  Click mode that will hold this tool when activated (defaults to `ClickMode.left`).
 * @property {(el: Turbo, manager: TurboEventManager) => void} [activateOn] - Custom activator. If provided, is called with `(el, manager)` and should wire activation itself.
 * @property {string} [key] - Optional keyboard key to map to this tool. When pressed, it will be set as the current key tool.
 * @property {TurboEventManager} [manager] - The event manager instance this tool should register against. Defaults to `TurboEventManager.instance`.
 */
type MakeToolOptions = {
    onActivate?: () => void;
    onDeactivate?: () => void;
    activationEvent?: DefaultEventNameEntry;
    clickMode?: ClickMode;
    customActivation?: (element: Turbo, manager: TurboEventManager) => void;
    key?: string;
    manager?: TurboEventManager;
};
/**
 * @type {ToolBehaviorCallback}
 * @description Function signature for a tool behavior. Returning `true` marks the behavior as handled/consumed.
 * @param {Event} event - The original DOM/Turbo event.
 * @param {Node} target - The node the behavior should operate on (the object or its embedded target).
 * @param {ToolBehaviorOptions} [options] - Additional info (embedded context, etc.).
 * @return {boolean} Whether the behavior handled the action.
 */
type ToolBehaviorCallback = (event: Event, target: Node, options?: any) => boolean;
/**
 * @type {ToolBehaviorOptions}
 * @description Options passed to tool behaviors at execution time.
 * @property {boolean} [isEmbedded] - Indicates if the tool is embedded in a target node (so behaviors may adjust accordingly).
 * @property {Node} [embeddedTarget] - The embedded target node, if any. Behaviors can use this as the operation target when appropriate.
 */
type ToolBehaviorOptions = {
    isEmbedded?: boolean;
    embeddedTarget?: Node;
};
declare function $<Type extends Node = Node>(element?: Type | object): Turbo<Type>;
declare function t<Type extends Node = Node>(element: Type): Turbo<Type>;
declare function turbo<Type extends Node = Node>(element: Type): Turbo<Type>;
declare function turbofy(options?: TurbofyOptions): void;

declare function areEqual<Type = any>(...entries: Type[]): boolean;
declare function equalToAny<Type = any>(entry: Type, ...values: Type[]): boolean;
declare function eachEqualToAny<Type = any>(values: Type[], ...entries: Type[]): boolean;

declare function hashString(input: string): Promise<string>;
declare function hashBySize(input: string, chars?: number): Promise<string>;

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

declare function randomId(length?: number): string;
declare function randomFromRange(n1: number, n2: number): number;
declare function randomColor(saturation?: number | [number, number], lightness?: number | [number, number]): string;
declare function randomString(length?: number): string;

/**
 * @description Converts a string of tags into an Element.
 * @param {string} text - The string to convert
 * @return The Element
 */
declare function textToElement(text: string): Element;
declare function createProxy<SelfType extends object, ProxiedType extends object>(self: SelfType, proxied: ProxiedType): SelfType & ProxiedType;

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

declare function getEventPosition(e: Event): Point;

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

declare module "yjs" {
    interface Map<MapType = any> {
    }
    interface Array<T = any> {
    }
    interface AbstractType<EventType = any> {
    }
    interface YEvent<T = any, EventType = any> {
    }
    interface YMapEvent<T = any, EventType = any> {
    }
    interface YArrayEvent<T = any, EventType = any> {
    }
}
type YDocumentProperties<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> = TurboElementProperties<ViewType, DataType, ModelType, EmitterType> & {
    document: Doc;
};
type YDataBlock<DataType = any, IdType extends string | number | symbol = any> = MvcDataBlock<DataType, IdType> & {
    observer: (event: YEvent, transaction: any) => void;
    data: DataType;
};
type YManagerDataBlock<DataType = any, IdType extends string | number | symbol = any, ComponentType = object, KeyType extends string | number = string | number> = YDataBlock<DataType, IdType> & {
    instances: Map<KeyType, ComponentType>;
};

declare class YDocument<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel<DataType> = TurboModel, EmitterType extends TurboEmitter = TurboEmitter> extends TurboElement<ViewType, DataType, ModelType, EmitterType> {
    protected readonly document: Doc;
    constructor(properties: YDocumentProperties<ViewType, DataType, ModelType, EmitterType>);
}

/**
 * @function createYMap
 * @static
 * @description Creates a YMap and populates it with key-value pairs from a plain object.
 * @param {object} data - The initial data to populate the YMap with.
 * @returns {YMap} A new YMap instance.
 */
declare function createYMap<DataType = object>(data: DataType): Map$1 & DataType;
/**
 * @function createYArray
 * @static
 * @template DataType - The type of the array's content.
 * @description Creates a YArray and populates it with elements from a plain array.
 * @param {DataType[]} data - The array of data to populate the YArray with.
 * @returns {YArray} A new YArray instance.
 */
declare function createYArray<DataType = object>(data: DataType[]): Array;
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
declare function addInYMap(data: object, parentYMap: Map$1, id?: string): Promise<string>;
/**
 * @function addInYArray
 * @static
 * @description Adds the provided data in the provided parent array in the Yjs document.
 * @param {object} data - The data to append to the Yjs document.
 * @param {YArray} parentYArray - The YArray to which the data should be appended.
 * @param {number} [index] - The index to insert the data at. If omitted or invalid, it is appended at the end.
 * @returns {number} The index where the data was inserted.
 */
declare function addInYArray(data: object, parentYArray: Array, index?: number): number;
/**
 * @function removeFromYArray
 * @static
 * @description Removes the first occurrence of the given entry from the YArray.
 * @param {unknown} entry - The entry to remove.
 * @param {YArray} parentYArray - The parent YArray.
 * @returns {boolean} True if removed, false otherwise.
 */
declare function removeFromYArray(entry: unknown, parentYArray: Array): boolean;
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
declare function deepObserveAny(data: AbstractType, callback: (fieldChanged: string, event: YEvent, target: AbstractType) => void, ...fieldNames: string[]): void;
/**
 * @function deepObserveAll
 * @static
 * @description Observes deeply for changes to all specified fields and invokes callback only when all fields
 * have changed.
 * @param {YAbstractType} data - The Yjs type to observe.
 * @param {(event: YEvent, target: YAbstractType) => void} callback - The function to call when all fields change.
 * @param {...string} fieldNames - List of field names to observe.
 */
declare function deepObserveAll(data: AbstractType, callback: (event: YEvent, target: AbstractType) => void, ...fieldNames: string[]): void;

// Flattened from relative module augmentations
interface TurboSelector {
        /**
         * Sets the declared properties to the element.
         * @param {TurboProperties<Tag>} properties - The properties object.
         * @param {boolean} [setOnlyBaseProperties=false] - If set to true, will only set the base turbo properties (classes,
         * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
         * @returns {this} Itself, allowing for method chaining.
         * @template Tag
         */
        setProperties<Tag extends ValidTag>(properties: TurboProperties<Tag>, setOnlyBaseProperties?: boolean): this;
        /**
         * @description Destroys the node by removing it from the document and removing all its bound listeners.
         * @returns {this} Itself, allowing for method chaining.
         */
        destroy(): this;
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
interface TurboSelector {
        /**
         * @description The closest root to the element in the document (the closest ShadowRoot, or the document's head).
         */
        readonly closestRoot: StylesRoot;
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
    }
interface TurboSelector {
        /**
         * @description Readonly set of listeners bound to this node.
         */
        readonly boundListeners: Set<ListenerEntry>;
        /**
         * @description If you want the element to bypass the event manager and allow native events to seep through,
         * you can set this field to a predicate that defines when to bypass the manager.
         * @param {TurboEvent} e The event.
         */
        bypassManagerOn: (e: Event) => boolean | TurboEventManagerStateProperties;
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
        on<Type extends Node>(type: string, listener: ((e: Event, el: Type) => void), options?: ListenerOptions, manager?: TurboEventManager): Type;
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
        onTool<Type extends Node>(type: string, toolName: string, listener: ((e: Event, el: Type) => void), options?: ListenerOptions, manager?: TurboEventManager): Type;
        executeAction(type: string, toolName: string, event: Event, options?: ListenerOptions, manager?: TurboEventManager): boolean;
        /**
         * @description Checks if the given event listener is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {boolean} - Whether the element has the given listener.
         */
        hasListener(type: string, listener: ((e: Event, el: this) => void), manager?: TurboEventManager): boolean;
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
        hasToolListener(type: string, toolName: string, listener: ((e: Event, el: this) => void), manager?: TurboEventManager): boolean;
        /**
         * @description Checks if the element has bound listeners of the given type (in its boundListeners list).
         * @param {string} type - The type of the event. Set to null or undefined to get all event types.
         * @param {string} toolName - The name of the tool to consider (if any). Set to null or undefined
         * to check for listeners not bound to a tool.
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {boolean} - Whether the element has the given listener.
         */
        hasListenersByType(type: string, toolName?: string, manager?: TurboEventManager): boolean;
        /**
         * @description Removes an event listener that is bound to the element (in its boundListeners list).
         * @param {string} type - The type of the event.
         * @param {(e: Event, el: this) => void} listener - The function that receives a notification.
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeListener(type: string, listener: ((e: Event, el: this) => void), manager?: TurboEventManager): this;
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
        removeToolListener(type: string, toolName: string, listener: ((e: Event, el: this) => void), manager?: TurboEventManager): this;
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
        removeListenersByType(type: string, toolName?: string, manager?: TurboEventManager): this;
        /**
         * @description Removes all event listeners bound to the element (in its boundListeners list).
         * @param {TurboEventManager} manager - The associated event manager. Defaults to the first created manager,
         * or a new instantiated one if none already exist.
         * @returns {this} Itself, allowing for method chaining.
         */
        removeAllListeners(manager?: TurboEventManager): this;
        /**
         * @description Prevent default browser behavior on the provided event types. By default, all basic input events
         * will be processed.
         * @param {PreventDefaultOptions} options - An options object to customize the behavior of the function.
         */
        preventDefault(options?: PreventDefaultOptions): void;
    }
interface TurboInteractor {
        /**
         * @description Fired on click start
         * @param e
         */
        clickStart(e: Event): void;
        /**
         * @description Fired on click
         * @param e
         */
        click(e: Event): void;
        /**
         * @description Fired on click end
         * @param e
         */
        clickEnd(e: Event): void;
        /**
         * @description Fired on pointer move
         * @param e
         */
        move(e: Event): void;
        /**
         * @description Fired on drag start
         * @param e
         */
        dragStart(e: Event): void;
        /**
         * @description Fired on drag
         * @param e
         */
        drag(e: Event): void;
        /**
         * @description Fired on drag end
         * @param e
         */
        dragEnd(e: Event): void;
    }
interface TurboSelector extends Node {
    }
interface TurboTool {
        customActivation(element: Turbo, manager: TurboEventManager): void;
        onActivation(): void;
        onDeactivation(): void;
        /**
         * @description Fired on click start
         * @param e
         * @param target
         */
        clickStart(e: Event, target: Node): boolean;
        /**
         * @description Fired on click
         * @param e
         * @param target
         */
        click(e: Event, target: Node): boolean;
        /**
         * @description Fired on click end
         * @param e
         * @param target
         */
        clickEnd(e: Event, target: Node): boolean;
        /**
         * @description Fired on pointer move
         * @param e
         * @param target
         */
        move(e: Event, target: Node): boolean;
        /**
         * @description Fired on drag start
         * @param e
         * @param target
         */
        dragStart(e: Event, target: Node): boolean;
        /**
         * @description Fired on drag
         * @param e
         * @param target
         */
        drag(e: Event, target: Node): boolean;
        /**
         * @description Fired on drag end
         * @param e
         * @param target
         */
        dragEnd(e: Event, target: Node): boolean;
    }
interface TurboSubstrate {
        onActivate(): void;
        onDeactivate(): void;
    }
interface TurboSelector {
        makeSubstrate(name: string, options?: MakeSubstrateOptions): this;
        getSubstrates(): string[];
        getSubstrateObjectList(substrate?: string): HTMLCollection | NodeList | Set<object>;
        setSubstrateObjectList(list: HTMLCollection | NodeList | Set<object>, substrate?: string): this;
        addObjectToSubstrate(object: object, substrate?: string): void;
        removeObjectFromSubstrate(object: object, substrate?: string): boolean;
        hasObjectInSubstrate(object: object, substrate?: string): boolean;
        wasObjectProcessedBySubstrate(object: object, substrate?: string): boolean;
        setSubstrate(name: string): this;
        currentSubstrate: string;
        readonly onSubstrateChange: Delegate<(prev: string, next: string) => void>;
        onSubstrateActivate(name?: string): Delegate<() => void>;
        onSubstrateDeactivate(name?: string): Delegate<() => void>;
        addSolver(callback: SubstrateSolver, name?: string): this;
        removeSolver(callback: SubstrateSolver, name?: string): this;
        clearSolvers(name?: string): this;
        resolveSubstrate(properties?: SubstrateSolverProperties): this;
    }
interface TurboHeadlessElement extends TurboElementDefaultInterface {
    }
interface TurboHeadlessElement<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel> extends TurboElementMvcInterface<ViewType, DataType, ModelType> {
    }
interface TurboProxiedElement extends TurboElementDefaultInterface {
    }
interface TurboProxiedElement<ElementTag extends ValidTag = ValidTag, ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel> extends TurboElementMvcInterface<ViewType, DataType, ModelType> {
    }
interface TurboProxiedElement extends TurboElementUiInterface {
    }
interface TurboElement extends TurboElementDefaultInterface {
    }
interface TurboElement<ViewType extends TurboView = TurboView<any, any>, DataType extends object = object, ModelType extends TurboModel = TurboModel> extends TurboElementMvcInterface<ViewType, DataType, ModelType> {
    }
interface TurboElement extends TurboElementUiInterface {
    }
interface TurboSelector {
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
interface TurboSelector {
        /**
         * @description The child handler object associated with the node. It is the node itself (if it is handling
         * its children) or its shadow root (if defined). Set it to change the node where the children are added/
         * removed/queried from when manipulating the node's children.
         */
        childHandler: ChildHandler;
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
        bringToFront(): this;
        sendToBack(): this;
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
        remChild(children?: Node | Node[]): this;
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
        closest<Type extends ValidTag>(type: Type): ValidElement<Type> | null;
        closest<Type extends Element>(type: new (...args: any[]) => Type): Type | null;
    }
interface TurboSelector {
        /**
         * @description Turns the element into a tool identified by `toolName`, optionally wiring activation and key mapping.
         * @param {string} toolName - The unique name of the tool to register under the manager.
         * @param {MakeToolOptions} [options] - Tool creation options (activation, click mode, key mapping, manager).
         * @returns {void}
         */
        makeTool(toolName: string, options?: MakeToolOptions): this;
        /**
         * @description Whether this element is registered as a tool for the provided manager.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if the element is a tool, false otherwise.
         */
        isTool(manager?: TurboEventManager): boolean;
        /**
         * @description Returns all tool names registered on this element for the provided manager.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {string[]} The list of tool names.
         */
        getToolNames(manager?: TurboEventManager): string[];
        /**
         * @description Returns the first registered tool name on this element for the provided manager.
         * @param {TurboEventManager} [manager] - The associated event manager (defaults to `TurboEventManager.instance`).
         * @return {string} The first tool name, if any.
         */
        getToolName(manager?: TurboEventManager): string;
        /**
         * @description Delegate fired when this tool is activated (selected + activated by the manager).
         */
        onToolActivate(toolName: string, manager?: TurboEventManager): Delegate<() => void>;
        /**
         * @description Delegate fired when this tool is deactivated.
         */
        onToolDeactivate(toolName: string, manager?: TurboEventManager): Delegate<() => void>;
        /**
         * @description Adds a behavior callback for a given tool and a given type. It is applied to all instances of the tool.
         * @param {string} type - The behavior type/event name (e.g., "pointerdown", "click", custom turbo event).
         * @param {ToolBehaviorCallback} callback - The behavior function. Return `true` to consume.
         * @param {string} [toolName=this.getToolName()] - Tool name to bind the behavior to. Defaults to this element's first tool.
         * @param {TurboEventManager} [manager] - The manager under which the behavior is registered.
         * @returns {void}
         */
        addToolBehavior(type: string, callback: ToolBehaviorCallback, toolName?: string, manager?: TurboEventManager): this;
        /**
         * @description Checks whether there is at least one behavior for `(type, toolName)`.
         * @param {string} type - The behavior/event type to check.
         * @param {string} [toolName=this.getToolName()] - The tool name to check under.
         * @param {TurboEventManager} [manager] - The associated manager.
         * @return {boolean} True if one or more behaviors are registered.
         */
        hasToolBehavior(type: string, toolName?: string, manager?: TurboEventManager): boolean;
        /**
         * @description Removes all behaviors for `(type, toolName)` under the given manager.
         * @param {string} type - The behavior/event type to clear.
         * @param {string} [toolName=this.getToolName()] - The tool name whose behaviors will be removed.
         * @param {TurboEventManager} [manager] - The associated manager.
         * @returns {void}
         */
        removeToolBehaviors(type: string, toolName?: string, manager?: TurboEventManager): this;
        /**
         * @description Executes all behaviors registered for `(toolName, type)` against this element.
         * @param {string} toolName - The tool whose behaviors should run.
         * @param {string} type - The behavior/event type to execute.
         * @param {Event} event - The triggering event instance.
         * @param {TurboEventManager} [manager] - The associated manager.
         * @return {boolean} True if at least one behavior returned `true` (consumed).
         */
        applyTool(toolName: string, type: string, event: Event, manager?: TurboEventManager): boolean;
        clearToolBehaviors(manager?: TurboEventManager): this;
        /**
         * @description Embeds this tool into a target node, so interactions on the tool apply to the target.
         * @param {Node} target - The node to manipulate when interacting with the element itself.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @returns {void}
         */
        embedTool(target: Node, manager?: TurboEventManager): this;
        /**
         * @description Whether this tool is embedded under the provided manager.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {boolean} True if an embedded target is present.
         */
        isEmbeddedTool(manager?: TurboEventManager): boolean;
        /**
         * @description Returns the target node for this embedded tool under the provided manager.
         * @param {TurboEventManager} [manager] - The associated manager (defaults to `TurboEventManager.instance`).
         * @return {Node} The embedded target node, if any.
         */
        getEmbeddedToolTarget(manager?: TurboEventManager): Node;
    }

export { $, AccessLevel, ActionMode, type AutoOptions, BasicInputEvents, type BasicPropertyConfig, type ButtonChildren, type CacheOptions, type ChildHandler, ClickMode, ClosestOrigin, type Coordinate, DefaultClickEventName, DefaultDragEventName, DefaultEventName, type DefaultEventNameEntry, type DefaultEventNameKey, DefaultKeyEventName, DefaultMoveEventName, DefaultWheelEventName, type DefineOptions, Delegate, type DimensionProperties, Direction, type DisabledTurboEventTypes, type ElementTagMap, type FlexRect, type FontProperties, type HTMLTag, InOut, InputDevice, type ListenerEntry, type ListenerOptions, type MakeSubstrateOptions, type MakeToolOptions, MathMLNamespace, type MathMLTag, MathMLTags, Mvc, type MvcBlockKeyType, type MvcBlocksType, type MvcDataBlock, type MvcGenerationProperties, type MvcProperties, NonPassiveEvents, OnOff, Open, type PartialRecord, Point, PopupFallbackMode, type PreventDefaultOptions, type PropertyConfig, Range, Reifect, type ReifectAppliedOptions, type ReifectEnabledObject, ReifectHandler, type ReifectInterpolator, type ReifectObjectData, type SVGTag, type SVGTagMap, type SetToolOptions, Shown, Side, SideH, SideV, type StateInterpolator, type StateSpecificProperty, StatefulReifect, type StatefulReifectCoreProperties, type StatefulReifectProperties, type StatelessPropertyConfig, type StatelessReifectCoreProperties, type StatelessReifectProperties, type StylesRoot, type StylesType, type SubstrateSolver, type SubstrateSolverProperties, SvgNamespace, SvgTags, type ToolBehaviorCallback, type ToolBehaviorOptions, type Turbo, TurboButton, type TurboButtonConfig, type TurboButtonProperties, TurboClickEventName, TurboController, type TurboControllerProperties, TurboDragEvent, TurboDragEventName, type TurboDragEventProperties, TurboDrawer, type TurboDrawerProperties, TurboDropdown, type TurboDropdownConfig, type TurboDropdownProperties, TurboElement, type TurboElementDefaultInterface, type TurboElementMvcInterface, type TurboElementProperties, type TurboElementUiInterface, TurboEmitter, TurboEvent, TurboEventManager, type TurboEventManagerLockStateProperties, type TurboEventManagerProperties, type TurboEventManagerStateProperties, TurboEventName, type TurboEventNameEntry, type TurboEventNameKey, type TurboEventProperties, TurboHandler, TurboHeadlessElement, type TurboHeadlessProperties, TurboIcon, type TurboIconConfig, type TurboIconProperties, TurboIconSwitch, type TurboIconSwitchProperties, TurboIconToggle, type TurboIconToggleProperties, TurboInput, type TurboInputProperties, TurboInteractor, type TurboInteractorProperties, TurboKeyEvent, TurboKeyEventName, type TurboKeyEventProperties, TurboMap, TurboMarkingMenu, type TurboMarkingMenuProperties, TurboModel, TurboMoveEventName, TurboNumericalInput, type TurboNumericalInputProperties, TurboPopup, type TurboPopupConfig, type TurboPopupProperties, type TurboProperties, TurboProxiedElement, type TurboProxiedProperties, type TurboRawEventProperties, TurboRichElement, type TurboRichElementChildren, type TurboRichElementConfig, type TurboRichElementData, type TurboRichElementProperties, TurboSelect, type TurboSelectConfig, TurboSelectEntry, type TurboSelectEntryConfig, type TurboSelectEntryProperties, TurboSelectInputEvent, type TurboSelectInputEventProperties, type TurboSelectProperties, TurboSelectWheel, type TurboSelectWheelProperties, type TurboSelectWheelStylingProperties, TurboSelector, TurboSubstrate, type TurboSubstrateProperties, TurboTool, type TurboToolProperties, TurboView, type TurboViewProperties, TurboWeakSet, TurboWheelEvent, TurboWheelEventName, type TurboWheelEventProperties, type TurbofyOptions, type ValidElement, type ValidHTMLElement, type ValidMathMLElement, type ValidNode, type ValidSVGElement, type ValidTag, type YDataBlock, YDocument, type YDocumentProperties, type YManagerDataBlock, a, addInYArray, addInYMap, addReifectManagementToNodePrototype, areEqual, auto, bestOverlayColor, blindElement, button, cache, callOnce, callOncePerInstance, camelToKebabCase, canvas, clearCache, clearCacheEntry, contrast, controller, createProxy, createYArray, createYMap, css, deepObserveAll, deepObserveAny, define, div, eachEqualToAny, effect, element, equalToAny, fetchSvg, flexCol, flexColCenter, flexRow, flexRowCenter, form, generateTagFunction, getEventPosition, getFileExtension, getSignal, h1, h2, h3, h4, h5, h6, handler, hashBySize, hashString, icon, img, input, isMathMLTag, isNull, isSvgTag, isUndefined, kebabToCamelCase, linearInterpolation, link, loadLocalFont, luminance, markDirty, mod, observe, p, parse, randomColor, randomFromRange, randomId, randomString, reifect, removeFromYArray, setSignal, setupClassFunctions, setupElementFunctions, setupEventFunctions, setupHierarchyFunctions, setupMiscFunctions, setupStyleFunctions, setupSubstrateFunctions, setupToolFunctions, signal, spacer, span, statefulReifier, stringify, style, stylesheet, t, textToElement, textarea, trim, turbo, turbofy, video };
