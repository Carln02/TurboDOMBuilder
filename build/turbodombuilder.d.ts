type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
type ReadonlyKeys<T> = {
    [P in keyof T]-?: IfEquals<{
        [Q in P]: T[P];
    }, {
        -readonly [Q in P]: T[P];
    }, P>;
}[keyof T];
type RemoveReadonly<T> = Pick<T, Exclude<keyof T, ReadonlyKeys<T>>>;
type HTMLElementNonFunctions<K extends HTMLElement = HTMLElement> = {
    [T in keyof K]: K[T] extends Function ? never : T;
}[keyof K];
type HTMLElementMutableFields<K extends HTMLElement = HTMLElement> = RemoveReadonly<Omit<Partial<Pick<K, HTMLElementNonFunctions<K>>>, "children" | "className" | "style">>;
/**
 * @type {TurboProperties}
 * @description Object containing properties for configuring a TurboWrapper or a TurboElement. Any HTML attribute can
 * be passed as key to be processed by the class/function. A few of these attributes were explicitly defined here
 * for autocompletion in JavaScript. Use TypeScript for optimal autocompletion (with the target generic type, if
 * needed). The type also has the following described custom properties:
 *
 * @property {keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | keyof MathMLElementTagNameMap} [tag="div"] -
 * For TurboWrapper only. The HTML tag of the element (e.g., "div", "span", "input").
 * @property {string} [id] - The ID of the element.
 * @property {string | string[]} [classes] - The CSS class(es) to apply to the element (either a string of
 * space-separated classes or an array of class names).
 * @property {string} [style] - The inline style of the element. Use the css literal function for autocompletion.
 * @property {string} [stylesheet] - The associated stylesheet (if any) with the element. Declaring this property will
 * generate automatically a new style element in the element's corresponding root. Use the css literal function
 * for autocompletion.
 * @property {Record<string, EventListenerOrEventListenerObject | ((e: Event, el: HTMLElement) => void)>} [listeners]
 * - An object containing event listeners to be applied to this element.
 * @property {HTMLElement | HTMLElement[]} [children] - An array of child wrappers or elements to append to
 * the created element.
 * @property {HTMLElement} [parent] - The parent element or wrapper to which the created element will be appended.
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
type TurboProperties<K extends HTMLElement = HTMLElement> = HTMLElementMutableFields<K> & {
    tag?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | keyof MathMLElementTagNameMap;
    id?: string;
    classes?: string | string[];
    style?: string;
    stylesheet?: string;
    listeners?: Record<string, EventListenerOrEventListenerObject | ((e: Event, el: HTMLElement) => void)>;
    children?: HTMLElement | HTMLElement[];
    parent?: HTMLElement;
    text?: string;
    shadowDOM?: boolean;
    [key: string]: any;
};

declare const TurboDiv_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        align: string;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboDiv
 * @extends HTMLDivElement
 * @implements ITurbo
 * @description Div TurboElement class, extending the base HTML Div element with a few powerful tools and functions.
 */
declare class TurboDiv extends TurboDiv_base {
    constructor(properties?: TurboProperties<HTMLDivElement>);
}
/**
 * @description Creates a div TurboElement with the given properties.
 * @param {TurboProperties<HTMLDivElement>} [properties] - The properties object.
 * @returns The Turbo div element.
 */
declare function div(properties?: TurboProperties<HTMLDivElement>): TurboDiv;

declare const TurboH1_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        align: string;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboH1
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H1 TurboElement class, extending the base HTML h1 element with a few powerful tools and functions.
 */
declare class TurboH1 extends TurboH1_base {
    constructor(properties?: TurboProperties<HTMLHeadingElement>);
}
/**
 * @description Creates a h1 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h1 element.
 */
declare function h1(properties?: TurboProperties<HTMLHeadingElement>): TurboH1;

declare const TurboH2_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        align: string;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboH2
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H2 TurboElement class, extending the base HTML h2 element with a few powerful tools and functions.
 */
declare class TurboH2 extends TurboH2_base {
    constructor(properties?: TurboProperties<HTMLHeadingElement>);
}
/**
 * @description Creates a h2 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h2 element.
 */
declare function h2(properties?: TurboProperties<HTMLHeadingElement>): TurboH2;

declare const TurboH3_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        align: string;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboH3
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H3 TurboElement class, extending the base HTML h3 element with a few powerful tools and functions.
 */
declare class TurboH3 extends TurboH3_base {
    constructor(properties?: TurboProperties<HTMLHeadingElement>);
}
/**
 * @description Creates a h3 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h3 element.
 */
declare function h3(properties?: TurboProperties<HTMLHeadingElement>): TurboH3;

declare const TurboH4_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        align: string;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboH4
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H4 TurboElement class, extending the base HTML h4 element with a few powerful tools and functions.
 */
declare class TurboH4 extends TurboH4_base {
    constructor(properties?: TurboProperties<HTMLHeadingElement>);
}
/**
 * @description Creates a h4 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h4 element.
 */
declare function h4(properties?: TurboProperties<HTMLHeadingElement>): TurboH4;

declare const TurboH5_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        align: string;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboH5
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H5 TurboElement class, extending the base HTML h5 element with a few powerful tools and functions.
 */
declare class TurboH5 extends TurboH5_base {
    constructor(properties?: TurboProperties<HTMLHeadingElement>);
}
/**
 * @description Creates a h5 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h5 element.
 */
declare function h5(properties?: TurboProperties<HTMLHeadingElement>): TurboH5;

declare const TurboH6_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        align: string;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLHeadingElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboH6
 * @extends HTMLHeadingElement
 * @implements ITurbo
 * @description H6 TurboElement class, extending the base HTML h6 element with a few powerful tools and functions.
 */
declare class TurboH6 extends TurboH6_base {
    constructor(properties?: TurboProperties<HTMLHeadingElement>);
}
/**
 * @description Creates a h6 TurboElement with the given properties.
 * @param {TurboProperties<HTMLHeadingElement>} [properties] - The properties object.
 * @returns The Turbo h6 element.
 */
declare function h6(properties?: TurboProperties<HTMLHeadingElement>): TurboH6;

declare const TurboImage_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        align: string;
        alt: string;
        border: string;
        readonly complete: boolean;
        crossOrigin: string;
        readonly currentSrc: string;
        decoding: "async" | "sync" | "auto";
        fetchPriority: string;
        height: number;
        hspace: number;
        isMap: boolean;
        loading: "eager" | "lazy";
        longDesc: string;
        lowsrc: string;
        name: string;
        readonly naturalHeight: number;
        readonly naturalWidth: number;
        referrerPolicy: string;
        sizes: string;
        src: string;
        srcset: string;
        useMap: string;
        vspace: number;
        width: number;
        readonly x: number;
        readonly y: number;
        decode(): Promise<void>;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLImageElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLImageElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboImage
 * @extends HTMLImageElement
 * @implements ITurbo
 * @description Image TurboElement class, extending the base HTML Image element with a few powerful tools and functions.
 */
declare class TurboImage extends TurboImage_base {
    constructor(properties?: TurboProperties<HTMLImageElement>);
}
/**
 * @description Creates an image TurboElement with the given properties.
 * @param {TurboProperties<HTMLImageElement>} [properties] - The properties object.
 * @returns The Turbo image element.
 */
declare function img(properties?: TurboProperties<HTMLImageElement>): TurboImage;

declare const TurboInput_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        accept: string;
        align: string;
        alt: string;
        autocomplete: AutoFill;
        capture: string;
        checked: boolean;
        defaultChecked: boolean;
        defaultValue: string;
        dirName: string;
        disabled: boolean;
        files: FileList;
        readonly form: HTMLFormElement;
        formAction: string;
        formEnctype: string;
        formMethod: string;
        formNoValidate: boolean;
        formTarget: string;
        height: number;
        indeterminate: boolean;
        readonly labels: NodeListOf<HTMLLabelElement>;
        readonly list: HTMLDataListElement;
        max: string;
        maxLength: number;
        min: string;
        minLength: number;
        multiple: boolean;
        name: string;
        pattern: string;
        placeholder: string;
        readOnly: boolean;
        required: boolean;
        selectionDirection: "none" | "forward" | "backward";
        selectionEnd: number;
        selectionStart: number;
        size: number;
        src: string;
        step: string;
        type: string;
        useMap: string;
        readonly validationMessage: string;
        readonly validity: ValidityState;
        value: string;
        valueAsDate: Date;
        valueAsNumber: number;
        readonly webkitEntries: readonly FileSystemEntry[];
        webkitdirectory: boolean;
        width: number;
        readonly willValidate: boolean;
        checkValidity(): boolean;
        reportValidity(): boolean;
        select(): void;
        setCustomValidity(error: string): void;
        setRangeText(replacement: string): void;
        setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
        setSelectionRange(start: number, end: number, direction?: "none" | "forward" | "backward"): void;
        showPicker(): void;
        stepDown(n?: number): void;
        stepUp(n?: number): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLInputElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLInputElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
        popoverTargetAction: string;
        popoverTargetElement: Element;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboInput
 * @extends HTMLInputElement
 * @implements ITurbo
 * @description Input TurboElement class, extending the base HTML Input element with a few powerful tools and functions.
 */
declare class TurboInput extends TurboInput_base {
    constructor(properties?: TurboProperties<HTMLInputElement>);
}
/**
 * @description Creates an input TurboElement with the given properties.
 * @param {TurboProperties<HTMLInputElement>} [properties] - The properties object.
 * @returns The Turbo input element.
 */
declare function input(properties?: TurboProperties<HTMLInputElement>): TurboInput;

declare const TurboP_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        align: string;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLParagraphElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLParagraphElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboP
 * @extends HTMLParagraphElement
 * @implements ITurbo
 * @description P TurboElement class, extending the base HTML p element with a few powerful tools and functions.
 */
declare class TurboP extends TurboP_base {
    constructor(properties?: TurboProperties<HTMLParagraphElement>);
}
/**
 * @description Creates a p TurboElement with the given properties.
 * @param {TurboProperties<HTMLParagraphElement>} [properties] - The properties object.
 * @returns The Turbo p element.
 */
declare function p(properties?: TurboProperties<HTMLParagraphElement>): TurboP;

declare const TurboTextArea_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        autocomplete: AutoFill;
        cols: number;
        defaultValue: string;
        dirName: string;
        disabled: boolean;
        readonly form: HTMLFormElement;
        readonly labels: NodeListOf<HTMLLabelElement>;
        maxLength: number;
        minLength: number;
        name: string;
        placeholder: string;
        readOnly: boolean;
        required: boolean;
        rows: number;
        selectionDirection: "none" | "forward" | "backward";
        selectionEnd: number;
        selectionStart: number;
        readonly textLength: number;
        readonly type: string;
        readonly validationMessage: string;
        readonly validity: ValidityState;
        value: string;
        readonly willValidate: boolean;
        wrap: string;
        checkValidity(): boolean;
        reportValidity(): boolean;
        select(): void;
        setCustomValidity(error: string): void;
        setRangeText(replacement: string): void;
        setRangeText(replacement: string, start: number, end: number, selectionMode?: SelectionMode): void;
        setSelectionRange(start: number, end: number, direction?: "none" | "forward" | "backward"): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLTextAreaElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLTextAreaElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboTextArea
 * @extends HTMLTextAreaElement
 * @implements ITurbo
 * @description TextArea TurboElement class, extending the base HTML TextArea element with a few powerful tools and functions.
 */
declare class TurboTextArea extends TurboTextArea_base {
    constructor(properties?: TurboProperties<HTMLTextAreaElement>);
}
/**
 * @description Creates a text area TurboElement with the given properties.
 * @param {TurboProperties<HTMLTextAreaElement>} [properties] - The properties object.
 * @returns The Turbo input element.
 */
declare function textArea(properties?: TurboProperties<HTMLTextAreaElement>): TurboTextArea;

/**
 * @type {TurboButtonProperties}
 * @description Properties object for configuring a Button. Extends TurboElementProperties.
 * @extends TurboProperties
 *
 * @property {string | HTMLElement} [buttonText] - The text content of the button.
 * @property {string | HTMLElement} [leftIcon] - An icon to be placed on the left side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {string | HTMLElement} [rightIcon] - An icon to be placed on the right side of the button text. Can be a
 * string (icon name/path) or an Icon instance.
 * @property {HTMLElement | HTMLElement[]} [leftCustomElements] - Custom elements
 * to be placed on the left side of the button (before the left icon).
 * @property {HTMLElement | HTMLElement[]} [rightCustomElements] - Custom elements
 * to be placed on the right side of the button (after the right icon).
 * @property {"button" | "submit" | "reset"} [type] - The type of the button (Can be "button", "submit", or "reset").
 * @property {keyof HTMLElementTagNameMap} [customTextTag] - The HTML tag to be used for the text element. If not
 * specified, the default tag specified in the Button class will be used.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Button
 * to this instance of Button.
 */
type TurboButtonProperties = TurboProperties & {
    buttonText?: string | HTMLElement;
    leftIcon?: string | HTMLElement;
    rightIcon?: string | HTMLElement;
    leftCustomElements?: HTMLElement | HTMLElement[];
    rightCustomElements?: HTMLElement | HTMLElement[];
    type?: "button" | "submit" | "reset";
    customTextTag?: keyof HTMLElementTagNameMap;
    unsetDefaultClasses?: boolean;
};
/**
 * @type {ButtonChildren}
 * @description Holds references to the button's child elements for internal management.
 *
 * @property {HTMLElement | HTMLElement[] | null} leftCustomElements - Elements placed
 * on the left side of the button.
 * @property {HTMLElement | null} leftIcon - The icon placed on the left side of the button.
 * @property {HTMLElement | null} text - The text element of the button.
 * @property {HTMLElement | null} rightIcon - The icon placed on the right side of the button.
 * @property {HTMLElement | HTMLElement[] | null} rightCustomElements - Elements placed
 * on the right side of the button.
 */
type ButtonChildren = {
    leftCustomElements: HTMLElement | HTMLElement[] | null;
    leftIcon: HTMLElement | null;
    buttonText: HTMLElement | null;
    rightIcon: HTMLElement | null;
    rightCustomElements: HTMLElement | HTMLElement[] | null;
};
/**
 * @type {TurboButtonConfig}
 * @description Configuration object for the Button class. Set it via TurboConfig.Button.
 *
 * @property {keyof HTMLElementTagNameMap} [defaultTextTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */
type TurboButtonConfig = {
    defaultTextTag?: keyof HTMLElementTagNameMap;
    defaultClasses?: string | string[];
};

declare const TurboButton_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any; /**
         * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
         * string will update the text's innerText with the given string.
         */
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        disabled: boolean;
        readonly form: HTMLFormElement;
        formAction: string;
        formEnctype: string;
        formMethod: string;
        formNoValidate: boolean;
        formTarget: string;
        readonly labels: NodeListOf<HTMLLabelElement>;
        name: string;
        type: "button" | "reset" | "submit";
        readonly validationMessage: string;
        readonly validity: ValidityState;
        value: string;
        readonly willValidate: boolean;
        checkValidity(): boolean;
        reportValidity(): boolean;
        setCustomValidity(error: string): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLButtonElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLButtonElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
        popoverTargetAction: string;
        popoverTargetElement: Element;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
declare class TurboButton extends TurboButton_base {
    private textTag;
    private _elements;
    static readonly config: TurboButtonConfig;
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties: TurboButtonProperties);
    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {HTMLElement | HTMLElement[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    private addAtPosition;
    /**
     * @description Removes a given element or elements from the button.
     * @param {HTMLElement | HTMLElement[] | null} element - The element(s) to remove.
     */
    private removeElement;
    /**
     * @description Object containing the button's children.
     */
    private get elements();
    private set elements(value);
    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    get leftCustomElements(): HTMLElement | HTMLElement[] | null;
    set leftCustomElements(value: HTMLElement | HTMLElement[] | null);
    /**
     * @description The left icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get leftIcon(): HTMLElement | null;
    set leftIcon(value: string | HTMLElement | null);
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get buttonText(): HTMLElement | null;
    set buttonText(value: string | HTMLElement | null);
    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon(): HTMLElement | null;
    set rightIcon(value: string | HTMLElement | null);
    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    get rightCustomElements(): HTMLElement | HTMLElement[] | null;
    set rightCustomElements(value: HTMLElement | HTMLElement[] | null);
}
declare function button(properties: TurboButtonProperties): TurboButton;

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
/**
 * @type {TurboDropdownProperties}
 * @description Properties for configuring a Dropdown.
 * @extends TurboProperties
 *
 * @property {(string | DropdownEntry)[]} values - The values or DropdownEntry instances to be used as dropdown options.
 * @property {string[]} [selectedValues=[]] - Array of values that are initially selected.
 * @property {(string | HTMLElement)} [selector] - Element or descriptor used as the dropdown selector. If a
 * string is passed, a Button with the given string as text will be assigned as the selector.
 * @property {HTMLElement} [popup] - The element used as a container for the dropdown entries.
 *
 * @property {boolean} [multiSelection=false] - Enables selection of multiple dropdown entries.
 * @property {string} [underlyingInputName] - Name attribute for a hidden input element to store the selected value(s).
 * If not declared, the hidden input will not be created.
 *
 * @property {keyof HTMLElementTagNameMap} [customSelectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 * @property {keyof HTMLElementTagNameMap} [customEntryTag] - Custom HTML tag for dropdown entries.  Overrides the
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
type TurboDropdownProperties = TurboProperties & {
    values: (string | DropdownEntry)[];
    selectedValues?: string[];
    selector?: string | HTMLElement;
    popup?: HTMLElement;
    multiSelection?: boolean;
    underlyingInputName?: string;
    customSelectorTag?: keyof HTMLElementTagNameMap;
    customEntryTag?: keyof HTMLElementTagNameMap;
    customSelectorClasses?: string;
    customPopupClasses?: string;
    customEntriesClasses?: string;
    customSelectedEntriesClasses?: string;
};
/**
 * @type {TurboDropdownConfig}
 * @description Configuration object for the Dropdown class. Set it via TurboConfig.Dropdown.
 *
 * @property {keyof HTMLElementTagNameMap} [defaultEntryTag] - The default HTML tag for the creation of generic
 * dropdown entries.
 * @property {keyof HTMLElementTagNameMap} [defaultSelectorTag] - The default HTML tag for the creation of the text
 * element in generic selectors (which are Buttons).
 *
 * @property {string | string[]} [defaultSelectorClasses] - The default classes to assign to the selector.
 * @property {string | string[]} [defaultPopupClasses] - The default classes to assign to the popup element.
 * @property {string | string[]} [defaultEntriesClasses] - The default classes to assign to the dropdown entries.
 * @property {string | string[]} [defaultSelectedEntriesClasses] - The default classes to assign to the selected
 * dropdown entries.
 */
type TurboDropdownConfig = {
    defaultEntryTag?: keyof HTMLElementTagNameMap;
    defaultSelectorTag?: keyof HTMLElementTagNameMap;
    defaultSelectorClasses?: string | string[];
    defaultPopupClasses?: string | string[];
    defaultEntriesClasses?: string | string[];
    defaultSelectedEntriesClasses?: string | string[];
};

declare const TurboElement_base: {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): any;
        addClass(classes: string | string[]): any;
        removeClass(classes: string | string[]): any;
        toggleClass(classes: string | string[], force?: boolean): any;
        addChild(children: HTMLElement | HTMLElement[]): any;
        remChild(children: HTMLElement | HTMLElement[]): any;
        addChildBefore(children: HTMLElement | HTMLElement[], sibling: HTMLElement): any;
        removeAllChildren(): any;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): any;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): any;
        setStyles(cssText: string): any;
        execute(callback: (el: any) => void): any;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): any;
        setAttribute(name: string, value?: string | boolean): any;
        removeAttribute(name: string): any;
        blur(): any;
        focus(): any;
        remove(): any;
        show(b: boolean): any;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    readonly config: any;
    configure(value: any): void;
};
/**
 * @class TurboElement
 * @extends HTMLElement
 * @implements ITurbo
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 */
declare abstract class TurboElement extends TurboElement_base {
    protected constructor(properties?: TurboProperties);
}

/**
 * @class DropdownEntry
 * @description Class representing an entry within a Dropdown.
 * @extends TurboElement
 */
declare class DropdownEntry extends TurboElement {
    private _value;
    private _selected;
    private _selectedClass;
    /**
     * @description DropdownEntry constructor
     * @param {TurboDropdownEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties: TurboDropdownEntryProperties);
    /**
     * @description Toggles the selection of this dropdown entry
     */
    toggle(): void;
    /**
     * @description The value of the dropdown entry
     */
    get value(): string;
    set value(value: string);
    /**
     * @description Whether or not the dropdown entry is selected
     */
    get selected(): boolean;
    set selected(value: boolean);
    /**
     * @description The class(es) assigned to the dropdown entry when it is selected
     */
    get selectedClass(): string | string[];
    set selectedClass(value: string | string[]);
}
declare function dropdownEntry(properties: TurboDropdownEntryProperties): DropdownEntry;

/**
 * Dropdown class for creating Turbo button elements.
 * @class Dropdown
 * @extends TurboElement
 */
declare class Dropdown extends TurboElement {
    /**
     * The dropdown's selector element.
     */
    readonly selector: HTMLElement;
    /**
     * The dropdown's popup element.
     */
    readonly popup: HTMLElement;
    /**
     * The dropdown's entries.
     */
    private _entries;
    /**
     * The dropdown's underlying hidden input. Might be undefined.
     */
    readonly underlyingInput?: TurboInput;
    private popupOpen;
    private readonly multiSelection;
    static readonly config: TurboDropdownConfig;
    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties: TurboDropdownProperties);
    private createSelector;
    private createPopup;
    private createDropdownEntry;
    /**
     * @description Select an entry.
     * @param {string | DropdownEntry} entry - The DropdownEntry (or its string value) to select.
     * @return {Dropdown} - This Dropdown for chaining.
     */
    select(entry: string | DropdownEntry): Dropdown;
    reset(): void;
    get entries(): DropdownEntry[];
    private set entries(value);
    /**
     * @description The dropdown's currently selected entries
     */
    get selectedEntries(): DropdownEntry[];
    /**
     * @description The dropdown's currently selected values
     */
    get selectedValues(): string[];
    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    get values(): string[];
    set values(values: string[]);
    private updateSelectorText;
    private openPopup;
}
declare function dropdown(properties: TurboDropdownProperties): Dropdown;

/**
 * @type {TurboIconProperties}
 * @description Properties object that extends TurboElementProperties with properties specific to icons.
 * @extends TurboProperties
 *
 * @property {string} icon - The name of the icon.
 * @property {string} [iconColor] - The color of the icon.
 * @property {((svg: SVGElement) => {})} [executeOnLoad] - Custom function that takes an SVG element to execute on the
 * SVG icon (if it is one) once it is loaded. This property will be disregarded if the icon is not of type SVG.
 *
 * @property {string} [customType] - Custom type of the icon, overrides the default type assigned to Icon.type
 * (whose default value is "svg").
 * @property {string} [customPath] - Custom path to the icon, overrides the default path assigned to Icon.path.
 * @property {boolean} [unsetDefaultClasses] - Set to true to not add the default classes specified in TurboConfig.Icon
 * to this instance of Icon.
 */
type TurboIconProperties = TurboProperties & {
    icon: string;
    iconColor?: string;
    executeOnLoad?: ((svg: SVGElement) => {});
    customType?: string;
    customPath?: string;
    unsetDefaultClasses?: boolean;
};
/**
 * @type {TurboIconConfig}
 * @description Configuration object for the Icon class. Set it via TurboConfig.Icon.
 *
 * @property {string} [type] - The default type to assign to newly created Icons. Defaults to "svg".
 * @property {string} [[path]] - The default path to the directory containing the icons in the project. Specify the
 * directory once here to not type it again at every Icon generation.
 * @property {string} [customType] - Custom type of the icon, overrides the default type assigned to Icon.type.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created icons.
 */
type TurboIconConfig = {
    type?: string;
    path?: string;
    defaultClasses?: string | string[];
};
/**
 * @type {TurboIconButtonConfig}
 * @description Configuration object for the IconButton class. Set it via TurboConfig.IconButton. Note that all Icon
 * configs are also applied to the IconButton class.
 *
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created icons.
 */
type TurboIconButtonConfig = {
    defaultClasses?: string | string[];
};

/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
declare class TurboIcon extends TurboElement {
    private _icon;
    private _iconColor;
    private _svg?;
    static readonly config: TurboIconConfig;
    private static cache;
    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties: TurboIconProperties);
    private static getType;
    private static getPath;
    /**
     * @description The name of the icon.
     */
    get icon(): string;
    private set icon(value);
    /**
     * @description The assigned color to the icon (if any)
     */
    get iconColor(): string | null;
    set iconColor(value: string | null);
    private set svg(value);
    /**
     * @description The underlying SVG element (if any).
     */
    get svg(): SVGElement;
}
declare function icon(properties: TurboIconProperties): TurboIcon;

/**
 * Class for creating icon buttons.
 * @class TurboIconButton
 * @extends TurboIcon
 */
declare class TurboIconButton extends TurboIcon {
    static readonly config: TurboIconButtonConfig;
    /**
     * Creates an instance of TurboIconButton.
     * @param {TurboIconProperties} properties - Properties to configure the button and its icon.
     */
    constructor(properties: TurboIconProperties);
}
declare function iconButton(properties: TurboIconProperties): TurboIconButton;

/**
 * @description Create a Turbo or HTML element with the specified properties.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created Turbo or HTML element.
 */
declare function element(properties?: TurboProperties): HTMLElement;

/**
 * @description Create a flex column element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
declare function flexColCenter(properties?: TurboProperties): HTMLElement;

/**
 * @description Create a flex column element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
declare function flexCol(properties?: TurboProperties): HTMLElement;

/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
declare function flexRowCenter(properties?: TurboProperties): HTMLElement;

/**
 * @description Create a flex row element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created flex element
 */
declare function flexRow(properties?: TurboProperties): HTMLElement;

/**
 * @description Create a spacer element.
 * @param {TurboProperties} properties - Object containing properties of the element.
 * @returns {HTMLElement} The created spacer element
 */
declare function spacer(properties?: TurboProperties): HTMLElement;

/**
 * @interface ITurbo
 * @description Interface declaring all the base functions to be implemented by Turbo classes.
 */
interface ITurbo {
    /**
     * @description The root of the element (the document's head or the shadow root - if enabled).
     */
    readonly root: ShadowRoot | HTMLHeadElement;
    /**
     * Sets the declared properties to the element.
     * @param {TurboProperties} properties - The properties object.
     * @returns {this} Itself, allowing for method chaining.
     */
    setProperties(properties: TurboProperties): this;
    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    addClass(classes: string | string[] | undefined): this;
    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    removeClass(classes: string | string[] | undefined): this;
    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns {this} Itself, allowing for method chaining.
     */
    toggleClass(classes: string | string[] | undefined, force?: boolean): this;
    /**
     * @description Add one or more child elements to the element.
     * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    addChild(children: HTMLElement | HTMLElement[] | undefined): this;
    /**
     * @description Remove one or more child elements from the element.
     * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    remChild(children: HTMLElement | HTMLElement[] | undefined): this;
    /**
     * @description Add one or more child elements to the element.
     * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child Turbo or HTML elements to
     * insert before sibling.
     * @param {HTMLElement} sibling - The sibling element
     * @returns {this} Itself, allowing for method chaining.
     */
    addChildBefore(children: HTMLElement | HTMLElement[] | undefined, sibling: HTMLElement): this;
    /**
     * @description Remove all child elements of the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    removeAllChildren(): this;
    /**
     * @description Set a certain style attribute of the element to the provided value.
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns {this} Itself, allowing for method chaining.
     */
    setStyle(attribute: keyof CSSStyleDeclaration, value: string): this;
    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons. Use the
     * css literal function for autocompletion.
     * @returns {this} Itself, allowing for method chaining.
     */
    setStyles(cssText: string): this;
    /**
     * @description Adds an event listener to the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener The function
     * or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: this) => void), options?: boolean | AddEventListenerOptions): this;
    /**
     * @description Removes an event listener from the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that was previously added as a listener.
     * @param {boolean | EventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): this;
    /**
     * @description Execute a callback while still benefiting from chaining.
     * @param {(el: ITurbo) => void} callback The function to execute, with 1 parameter representing the instance itself.
     * @returns {this} Itself, allowing for method chaining.
     */
    execute(callback: ((el: this) => void)): this;
    /**
     * @description Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | boolean} [value] The value of the attribute. Can be left blank to represent a true boolean.
     * @returns {this} Itself, allowing for method chaining.
     */
    setAttribute(name: string, value?: string | boolean): this;
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
    /**
     * @description Removes the element from its parent node.
     * @returns {this} Itself, allowing for method chaining.
     */
    remove(): this;
    show(b: boolean): this;
}

/**
 * @class {TurboConfig}
 * @description Static configuration class for TurboDOMBuilder.
 */
declare class TurboConfig {
    static shadowDOM: boolean;
}

/**
 * @description Factory method that takes a class extending HTMLElement and returns a TurboBase class that extends the
 * provided HTML element with a few powerful tools and functions.
 */
declare function Turbo<T extends HTMLElement>(BaseElement: new (...args: any[]) => T): {
    new (...args: any[]): {
        readonly root: ShadowRoot | HTMLHeadElement;
        setProperties(properties: TurboProperties): this;
        addClass(classes: string | string[] | undefined): this;
        removeClass(classes: string | string[] | undefined): this;
        toggleClass(classes: string | string[] | undefined, force?: boolean): this;
        addChild(children: HTMLElement | HTMLElement[] | undefined): this;
        remChild(children: HTMLElement | HTMLElement[] | undefined): this;
        addChildBefore(children: HTMLElement | HTMLElement[] | undefined, sibling: HTMLElement): this;
        removeAllChildren(): this;
        addListener(type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: any) => void), options?: boolean | AddEventListenerOptions): this;
        setStyle(attribute: keyof CSSStyleDeclaration, value: string): this;
        setStyles(cssText: string): this;
        execute(callback: (el: any) => void): this;
        removeListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): this;
        setAttribute(name: string, value?: string | boolean): this;
        removeAttribute(name: string): this;
        blur(): this;
        focus(): this;
        remove(): this;
        show(b: boolean): this;
        accessKey: string;
        readonly accessKeyLabel: string;
        autocapitalize: string;
        dir: string;
        draggable: boolean;
        hidden: boolean;
        inert: boolean;
        innerText: string;
        lang: string;
        readonly offsetHeight: number;
        readonly offsetLeft: number;
        readonly offsetParent: Element;
        readonly offsetTop: number;
        readonly offsetWidth: number;
        outerText: string;
        popover: string;
        spellcheck: boolean;
        title: string;
        translate: boolean;
        attachInternals(): ElementInternals;
        click(): void;
        hidePopover(): void;
        showPopover(): void;
        togglePopover(force?: boolean): boolean;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K_1 extends keyof HTMLElementEventMap>(type: K_1, listener: (this: HTMLElement, ev: HTMLElementEventMap[K_1]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        readonly attributes: NamedNodeMap;
        readonly classList: DOMTokenList;
        className: string;
        readonly clientHeight: number;
        readonly clientLeft: number;
        readonly clientTop: number;
        readonly clientWidth: number;
        id: string;
        readonly localName: string;
        readonly namespaceURI: string;
        onfullscreenchange: (this: Element, ev: Event) => any;
        onfullscreenerror: (this: Element, ev: Event) => any;
        outerHTML: string;
        readonly ownerDocument: Document;
        readonly part: DOMTokenList;
        readonly prefix: string;
        readonly scrollHeight: number;
        scrollLeft: number;
        scrollTop: number;
        readonly scrollWidth: number;
        readonly shadowRoot: ShadowRoot;
        slot: string;
        readonly tagName: string;
        attachShadow(init: ShadowRootInit): ShadowRoot;
        checkVisibility(options?: CheckVisibilityOptions): boolean;
        closest<K_2 extends keyof HTMLElementTagNameMap>(selector: K_2): HTMLElementTagNameMap[K_2];
        closest<K_3 extends keyof SVGElementTagNameMap>(selector: K_3): SVGElementTagNameMap[K_3];
        closest<K_4 extends keyof MathMLElementTagNameMap>(selector: K_4): MathMLElementTagNameMap[K_4];
        closest<E extends Element = Element>(selectors: string): E;
        computedStyleMap(): StylePropertyMapReadOnly;
        getAttribute(qualifiedName: string): string;
        getAttributeNS(namespace: string, localName: string): string;
        getAttributeNames(): string[];
        getAttributeNode(qualifiedName: string): Attr;
        getAttributeNodeNS(namespace: string, localName: string): Attr;
        getBoundingClientRect(): DOMRect;
        getClientRects(): DOMRectList;
        getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
        getElementsByTagName<K_5 extends keyof HTMLElementTagNameMap>(qualifiedName: K_5): HTMLCollectionOf<HTMLElementTagNameMap[K_5]>;
        getElementsByTagName<K_6 extends keyof SVGElementTagNameMap>(qualifiedName: K_6): HTMLCollectionOf<SVGElementTagNameMap[K_6]>;
        getElementsByTagName<K_7 extends keyof MathMLElementTagNameMap>(qualifiedName: K_7): HTMLCollectionOf<MathMLElementTagNameMap[K_7]>;
        getElementsByTagName<K_8 extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K_8): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K_8]>;
        getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
        getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
        getElementsByTagNameNS(namespace: string, localName: string): HTMLCollectionOf<Element>;
        hasAttribute(qualifiedName: string): boolean;
        hasAttributeNS(namespace: string, localName: string): boolean;
        hasAttributes(): boolean;
        hasPointerCapture(pointerId: number): boolean;
        insertAdjacentElement(where: InsertPosition, element: Element): Element;
        insertAdjacentHTML(position: InsertPosition, text: string): void;
        insertAdjacentText(where: InsertPosition, data: string): void;
        matches(selectors: string): boolean;
        releasePointerCapture(pointerId: number): void;
        removeAttributeNS(namespace: string, localName: string): void;
        removeAttributeNode(attr: Attr): Attr;
        requestFullscreen(options?: FullscreenOptions): Promise<void>;
        requestPointerLock(): void;
        scroll(options?: ScrollToOptions): void;
        scroll(x: number, y: number): void;
        scrollBy(options?: ScrollToOptions): void;
        scrollBy(x: number, y: number): void;
        scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
        scrollTo(options?: ScrollToOptions): void;
        scrollTo(x: number, y: number): void;
        setAttributeNS(namespace: string, qualifiedName: string, value: string): void;
        setAttributeNode(attr: Attr): Attr;
        setAttributeNodeNS(attr: Attr): Attr;
        setPointerCapture(pointerId: number): void;
        toggleAttribute(qualifiedName: string, force?: boolean): boolean;
        webkitMatchesSelector(selectors: string): boolean;
        readonly baseURI: string;
        readonly childNodes: NodeListOf<ChildNode>;
        readonly firstChild: ChildNode;
        readonly isConnected: boolean;
        readonly lastChild: ChildNode;
        readonly nextSibling: ChildNode;
        readonly nodeName: string;
        readonly nodeType: number;
        nodeValue: string;
        readonly parentElement: HTMLElement;
        readonly parentNode: ParentNode;
        readonly previousSibling: ChildNode;
        textContent: string;
        appendChild<T extends Node>(node: T): T;
        cloneNode(deep?: boolean): Node;
        compareDocumentPosition(other: Node): number;
        contains(other: Node): boolean;
        getRootNode(options?: GetRootNodeOptions): Node;
        hasChildNodes(): boolean;
        insertBefore<T_1 extends Node>(node: T_1, child: Node): T_1;
        isDefaultNamespace(namespace: string): boolean;
        isEqualNode(otherNode: Node): boolean;
        isSameNode(otherNode: Node): boolean;
        lookupNamespaceURI(prefix: string): string;
        lookupPrefix(namespace: string): string;
        normalize(): void;
        removeChild<T_2 extends Node>(child: T_2): T_2;
        replaceChild<T_3 extends Node>(node: Node, child: T_3): T_3;
        readonly ELEMENT_NODE: 1;
        readonly ATTRIBUTE_NODE: 2;
        readonly TEXT_NODE: 3;
        readonly CDATA_SECTION_NODE: 4;
        readonly ENTITY_REFERENCE_NODE: 5;
        readonly ENTITY_NODE: 6;
        readonly PROCESSING_INSTRUCTION_NODE: 7;
        readonly COMMENT_NODE: 8;
        readonly DOCUMENT_NODE: 9;
        readonly DOCUMENT_TYPE_NODE: 10;
        readonly DOCUMENT_FRAGMENT_NODE: 11;
        readonly NOTATION_NODE: 12;
        readonly DOCUMENT_POSITION_DISCONNECTED: 1;
        readonly DOCUMENT_POSITION_PRECEDING: 2;
        readonly DOCUMENT_POSITION_FOLLOWING: 4;
        readonly DOCUMENT_POSITION_CONTAINS: 8;
        readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
        readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
        dispatchEvent(event: Event): boolean;
        ariaAtomic: string;
        ariaAutoComplete: string;
        ariaBusy: string;
        ariaChecked: string;
        ariaColCount: string;
        ariaColIndex: string;
        ariaColSpan: string;
        ariaCurrent: string;
        ariaDescription: string;
        ariaDisabled: string;
        ariaExpanded: string;
        ariaHasPopup: string;
        ariaHidden: string;
        ariaInvalid: string;
        ariaKeyShortcuts: string;
        ariaLabel: string;
        ariaLevel: string;
        ariaLive: string;
        ariaModal: string;
        ariaMultiLine: string;
        ariaMultiSelectable: string;
        ariaOrientation: string;
        ariaPlaceholder: string;
        ariaPosInSet: string;
        ariaPressed: string;
        ariaReadOnly: string;
        ariaRequired: string;
        ariaRoleDescription: string;
        ariaRowCount: string;
        ariaRowIndex: string;
        ariaRowSpan: string;
        ariaSelected: string;
        ariaSetSize: string;
        ariaSort: string;
        ariaValueMax: string;
        ariaValueMin: string;
        ariaValueNow: string;
        ariaValueText: string;
        role: string;
        animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options?: number | KeyframeAnimationOptions): Animation;
        getAnimations(options?: GetAnimationsOptions): Animation[];
        after(...nodes: (string | Node)[]): void;
        before(...nodes: (string | Node)[]): void;
        replaceWith(...nodes: (string | Node)[]): void;
        innerHTML: string;
        readonly nextElementSibling: Element;
        readonly previousElementSibling: Element;
        readonly childElementCount: number;
        readonly children: HTMLCollection;
        readonly firstElementChild: Element;
        readonly lastElementChild: Element;
        append(...nodes: (string | Node)[]): void;
        prepend(...nodes: (string | Node)[]): void;
        querySelector<K_9 extends keyof HTMLElementTagNameMap>(selectors: K_9): HTMLElementTagNameMap[K_9];
        querySelector<K_10 extends keyof SVGElementTagNameMap>(selectors: K_10): SVGElementTagNameMap[K_10];
        querySelector<K_11 extends keyof MathMLElementTagNameMap>(selectors: K_11): MathMLElementTagNameMap[K_11];
        querySelector<K_12 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_12): HTMLElementDeprecatedTagNameMap[K_12];
        querySelector<E_1 extends Element = Element>(selectors: string): E_1;
        querySelectorAll<K_13 extends keyof HTMLElementTagNameMap>(selectors: K_13): NodeListOf<HTMLElementTagNameMap[K_13]>;
        querySelectorAll<K_14 extends keyof SVGElementTagNameMap>(selectors: K_14): NodeListOf<SVGElementTagNameMap[K_14]>;
        querySelectorAll<K_15 extends keyof MathMLElementTagNameMap>(selectors: K_15): NodeListOf<MathMLElementTagNameMap[K_15]>;
        querySelectorAll<K_16 extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K_16): NodeListOf<HTMLElementDeprecatedTagNameMap[K_16]>;
        querySelectorAll<E_2 extends Element = Element>(selectors: string): NodeListOf<E_2>;
        replaceChildren(...nodes: (string | Node)[]): void;
        readonly assignedSlot: HTMLSlotElement;
        readonly attributeStyleMap: StylePropertyMap;
        readonly style: CSSStyleDeclaration;
        contentEditable: string;
        enterKeyHint: string;
        inputMode: string;
        readonly isContentEditable: boolean;
        onabort: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onanimationcancel: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationend: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationiteration: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onanimationstart: (this: GlobalEventHandlers, ev: AnimationEvent) => any;
        onauxclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onbeforeinput: (this: GlobalEventHandlers, ev: InputEvent) => any;
        onbeforetoggle: (this: GlobalEventHandlers, ev: Event) => any;
        onblur: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        oncancel: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplay: (this: GlobalEventHandlers, ev: Event) => any;
        oncanplaythrough: (this: GlobalEventHandlers, ev: Event) => any;
        onchange: (this: GlobalEventHandlers, ev: Event) => any;
        onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onclose: (this: GlobalEventHandlers, ev: Event) => any;
        oncontextmenu: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        oncopy: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        oncuechange: (this: GlobalEventHandlers, ev: Event) => any;
        oncut: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        ondblclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        ondrag: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragend: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragenter: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragleave: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragover: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondragstart: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondrop: (this: GlobalEventHandlers, ev: DragEvent) => any;
        ondurationchange: (this: GlobalEventHandlers, ev: Event) => any;
        onemptied: (this: GlobalEventHandlers, ev: Event) => any;
        onended: (this: GlobalEventHandlers, ev: Event) => any;
        onerror: OnErrorEventHandlerNonNull;
        onfocus: (this: GlobalEventHandlers, ev: FocusEvent) => any;
        onformdata: (this: GlobalEventHandlers, ev: FormDataEvent) => any;
        ongotpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        oninput: (this: GlobalEventHandlers, ev: Event) => any;
        oninvalid: (this: GlobalEventHandlers, ev: Event) => any;
        onkeydown: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeypress: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onkeyup: (this: GlobalEventHandlers, ev: KeyboardEvent) => any;
        onload: (this: GlobalEventHandlers, ev: Event) => any;
        onloadeddata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadedmetadata: (this: GlobalEventHandlers, ev: Event) => any;
        onloadstart: (this: GlobalEventHandlers, ev: Event) => any;
        onlostpointercapture: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onmousedown: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseenter: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseleave: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmousemove: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseout: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseover: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onmouseup: (this: GlobalEventHandlers, ev: MouseEvent) => any;
        onpaste: (this: GlobalEventHandlers, ev: ClipboardEvent) => any;
        onpause: (this: GlobalEventHandlers, ev: Event) => any;
        onplay: (this: GlobalEventHandlers, ev: Event) => any;
        onplaying: (this: GlobalEventHandlers, ev: Event) => any;
        onpointercancel: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerdown: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerenter: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerleave: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointermove: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerout: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerover: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onpointerup: (this: GlobalEventHandlers, ev: PointerEvent) => any;
        onprogress: (this: GlobalEventHandlers, ev: ProgressEvent<EventTarget>) => any;
        onratechange: (this: GlobalEventHandlers, ev: Event) => any;
        onreset: (this: GlobalEventHandlers, ev: Event) => any;
        onresize: (this: GlobalEventHandlers, ev: UIEvent) => any;
        onscroll: (this: GlobalEventHandlers, ev: Event) => any;
        onscrollend: (this: GlobalEventHandlers, ev: Event) => any;
        onsecuritypolicyviolation: (this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any;
        onseeked: (this: GlobalEventHandlers, ev: Event) => any;
        onseeking: (this: GlobalEventHandlers, ev: Event) => any;
        onselect: (this: GlobalEventHandlers, ev: Event) => any;
        onselectionchange: (this: GlobalEventHandlers, ev: Event) => any;
        onselectstart: (this: GlobalEventHandlers, ev: Event) => any;
        onslotchange: (this: GlobalEventHandlers, ev: Event) => any;
        onstalled: (this: GlobalEventHandlers, ev: Event) => any;
        onsubmit: (this: GlobalEventHandlers, ev: SubmitEvent) => any;
        onsuspend: (this: GlobalEventHandlers, ev: Event) => any;
        ontimeupdate: (this: GlobalEventHandlers, ev: Event) => any;
        ontoggle: (this: GlobalEventHandlers, ev: Event) => any;
        ontouchcancel?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchend?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchmove?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontouchstart?: (this: GlobalEventHandlers, ev: TouchEvent) => any;
        ontransitioncancel: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionend: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionrun: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        ontransitionstart: (this: GlobalEventHandlers, ev: TransitionEvent) => any;
        onvolumechange: (this: GlobalEventHandlers, ev: Event) => any;
        onwaiting: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationend: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationiteration: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkitanimationstart: (this: GlobalEventHandlers, ev: Event) => any;
        onwebkittransitionend: (this: GlobalEventHandlers, ev: Event) => any;
        onwheel: (this: GlobalEventHandlers, ev: WheelEvent) => any;
        autofocus: boolean;
        readonly dataset: DOMStringMap;
        nonce?: string;
        tabIndex: number;
    };
    /**
     * @description Static configuration object.
     */
    readonly config: any;
    /**
     * @description Update the class's static configurations. Will only overwrite the set properties.
     * @property {typeof this.config} value - The object containing the new configurations.
     */
    configure(value: typeof this.config): void;
};

/**
 * @type {TransitionProperties}
 * @description Object containing properties for a Transition element.
 *
 * @property {string} [property] - The CSS property (or properties) to apply the transition on. Set to "all" or don't
 * specify to apply to all CSS properties.
 *
 * @property {number} [duration] - The duration of the transition in seconds.
 * @property {string} [durationIn] - The duration of transitioning in, in seconds. Has priority over the "duration" property
 * (if the latter is set).
 * @property {string} [durationOut] - The duration of transitioning out, in seconds. Has priority over the "duration" property
 * (if the latter is set).
 *
 * @property {number} [delay] - The delay of the transition in seconds.
 * @property {string} [delayIn] - The delay before transitioning in, in seconds. Has priority over the "delay" property
 * (if the latter is set).
 * @property {string} [delayOut] - The delay before transitioning out, in seconds. Has priority over the "delay" property
 * (if the latter is set).
 *
 * @property {number} [timingFunction] - The timing function to apply to the transition.
 * @property {string} [timingFunctionIn] - The timing function to apply for transitioning in. Has priority over the
 * "timingFunction" property (if the latter is set).
 * @property {string} [timingFunctionOut] - The timing function to apply for transitioning out. Has priority over the
 * "timingFunction" property (if the latter is set).
 */
type TransitionProperties = {
    property?: string;
    duration?: number;
    durationIn?: number;
    durationOut?: number;
    delay?: number;
    delayIn?: number;
    delayOut?: number;
    timingFunction?: string;
    timingFunctionIn?: string;
    timingFunctionOut?: string;
};
/**
 * @class Transition
 * @description A class representing a CSS transition. It has two states (in and out), which you can set up
 * almost independently (they must only share the animation property). Use a Transition to transition one or more
 * TurboElement(s) or HTMLElement(s) easily using your predefined transition.
 */
declare class Transition {
    private transitionProperties;
    /**
     * @constructor
     * @param {TransitionProperties} transition - The transition properties to apply to this newly created Transition
    */
    constructor(transition: TransitionProperties);
    /**
     * @function transition
     * @description A function to apply the transition (in or out) on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {boolean} out - Set to true to transition out, and false to transition in.
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    transition(element: TurboElement | HTMLElement | TurboElement[] | HTMLElement[], customTransitionProperties: TransitionProperties, out?: boolean): void;
    /**
     * @function transitionIn
     * @description A function to apply the transition in on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    transitionIn(element: TurboElement | HTMLElement, customTransitionProperties: TransitionProperties): void;
    /**
     * @function transitionOut
     * @description A function to apply the transition out on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    transitionOut(element: TurboElement | HTMLElement, customTransitionProperties: TransitionProperties): void;
    /**
     * @function update
     * @description Function to update certain (or every) properties of the current Transition.
     * @param {TransitionProperties} changedProperties - The updated transition properties
     */
    update(changedProperties: TransitionProperties): void;
}

/**
 * @description Add children elements to a parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {HTMLElement} sibling - Sibling Turbo or HTML DOM element
 * @return The element itself
 */
declare function addChildBefore(element: HTMLElement, children: HTMLElement | HTMLElement[] | undefined, sibling: HTMLElement): HTMLElement;

/**
 * @description Add children elements to a parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
declare function addChild(element: HTMLElement, children: HTMLElement | HTMLElement[] | undefined): HTMLElement;

/**
 * @description Remove all children of the given parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @return The element itself
 */
declare function removeAllChildren(element: HTMLElement): HTMLElement;

/**
 * @description Remove children elements from a parent element.
 * @param {HTMLElement} element - Parent Turbo or HTML DOM element
 * @param {HTMLElement | HTMLElement[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
declare function removeChild(element: HTMLElement, children: HTMLElement | HTMLElement[] | undefined): HTMLElement;

/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {HTMLElement} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
declare function addClass(element: HTMLElement, classes: string | string[] | undefined): HTMLElement;

/**
 * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
 * @param {HTMLElement} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
declare function removeClass(element: HTMLElement, classes: string | string[] | undefined): HTMLElement;

/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {HTMLElement} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 * @return The element itself
 */
declare function toggleClass(element: HTMLElement, classes: string | string[] | undefined, force?: boolean): HTMLElement;

/**
 * Creates an HTML element from the given properties object
 * @param {TurboProperties} [properties] - The properties object.
 * @return {HTMLElement} The created element.
 */
declare function createWithProperties(properties?: TurboProperties): HTMLElement;

/**
 * Sets the declared properties to the provided element.
 * @param {HTMLElement} element - The element onto which the properties will be applied.
 * @param {TurboProperties} [properties] - The properties object.
 * @return The element itself.
 */
declare function setProperties(element: HTMLElement, properties?: TurboProperties): HTMLElement;

/**
 * @description Adds the provided event listener to the element.
 * @param {HTMLElement} element - The element to which the event listener should be applied.
 * @param {string} type - The type of the event.
 * @param {EventListenerOrEventListenerObject | (e: Event, el: HTMLElement) => void} listener - The function
 * or object that receives a notification. Has (optionally) two parameters: the event, and the element itself.
 * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the
 * event listener.
 * @return The element itself
 */
declare function addListener(element: HTMLElement, type: string, listener: EventListenerOrEventListenerObject | ((e: Event, el: HTMLElement) => void), options?: boolean | AddEventListenerOptions): HTMLElement;

/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string | undefined} styles - The css string. Use the css literal function for autocompletion.
 * @param {HTMLHeadElement | ShadowRoot} [root] - The root to which the style element will be added.
 */
declare function addStylesheet(styles: string | undefined, root?: HTMLHeadElement | ShadowRoot): void;

/**
 * @description Constructs a single CSS string from a template literal containing CSS rules.
 */
declare function css(strings: TemplateStringsArray, ...values: any[]): string;

declare class SvgCache {
    cache: Record<string, SVGElement>;
    fetchSvg(path: any, onLoaded: (svg: SVGElement) => void): void;
}

declare function fetchSvg(path: any, onLoaded: (svg: SVGElement) => void): void;

export { type ButtonChildren, Dropdown, DropdownEntry, type ITurbo, SvgCache, Transition, type TransitionProperties, Turbo, TurboButton, type TurboButtonConfig, type TurboButtonProperties, TurboConfig, TurboDiv, type TurboDropdownConfig, type TurboDropdownEntryProperties, type TurboDropdownProperties, TurboElement, TurboH1, TurboH2, TurboH3, TurboH4, TurboH5, TurboH6, TurboIcon, TurboIconButton, type TurboIconButtonConfig, type TurboIconConfig, type TurboIconProperties, TurboImage, TurboInput, TurboP, type TurboProperties, TurboTextArea, addChild, addChildBefore, addClass, addListener, addStylesheet, button, createWithProperties, css, div, dropdown, dropdownEntry, element, fetchSvg, flexCol, flexColCenter, flexRow, flexRowCenter, h1, h2, h3, h4, h5, h6, icon, iconButton, img, input, p, removeAllChildren, removeChild, removeClass, setProperties, spacer, textArea, toggleClass };
