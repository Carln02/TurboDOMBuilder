/**
 * @typedef {Object} ChildHandler
 * @description A type that represents all entities that can hold and manage children (an element or a shadow root).
 */

/**
 * @typedef {Object} StylesRoot
 * @description A type that represents entities that can hold a <style> object (Shadow root or HTML head).
 */

/**
 * @typedef {Object} ElementTagMap
 * @description A type that represents a union of HTML, SVG, and MathML tag name maps.
 */

/**
 * @typedef {Object} ElementTagDefinition
 * @description Represents an element's definition of its tag and its namespace (both optional).
 *
 * @property {ElementTagMap} [tag="div"] - The HTML tag of the element (e.g., "div", "span", "input"). Defaults to "div."
 * @property {string} [namespace] - The namespace of the element. Defaults to HTML. If "svgManipulation" or "mathML" is provided,
 * the corresponding namespace will be used to create the element. Otherwise, the custom namespace provided will be used.
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
 * @property {keyof ElementTagMap} [customTextTag] - The HTML tag to be used for the buttonText element (if the latter is passed as
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
 * @property {keyof ElementTagMap} [defaultTextTag] - The default HTML tag for the creation of the text
 * element in the button.
 * @property {string | string[]} [defaultClasses] - The default classes to assign to newly created buttons.
 */

/**
 * @typedef {Object} TurboDropdownEntryProperties
 * @description Properties for configuring a DropdownEntry.
 * @extends TurboProperties
 *
 * @property {string} value - The value associated with the dropdown entry.
 * @property {boolean} [selected=false] - Indicates whether the entry is initially selected.
 * @property {string | string[]} [selectedClass=""] - CSS class(es) applied to the entry when it is selected.
 */

/**
 * @typedef {Object} TurboDropdownProperties
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
 * @property {keyof ElementTagMap} [customSelectorTag] - Custom HTML tag for the selector's text. Overrides the
 * default tag set in TurboConfig.Dropdown.
 * @property {keyof ElementTagMap} [customEntryTag] - Custom HTML tag for dropdown entries.  Overrides the
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
 * @property {keyof ElementTagMap} [defaultEntryTag] - The default HTML tag for the creation of generic
 * dropdown entries.
 * @property {keyof ElementTagMap} [defaultSelectorTag] - The default HTML tag for the creation of the text
 * element in generic selectors (which are Buttons).
 *
 * @property {string | string[]} [defaultSelectorClasses] - The default classes to assign to the selector.
 * @property {string | string[]} [defaultPopupClasses] - The default classes to assign to the popup element.
 * @property {string | string[]} [defaultEntriesClasses] - The default classes to assign to the dropdown entries.
 * @property {string | string[]} [defaultSelectedEntriesClasses] - The default classes to assign to the selected
 * dropdown entries.
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
 * @typedef {Object} TransitionProperties
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

/**
 * @description Retrieves the closest root to the provided element in  the document.
 * @param {Element} [element] - The element from which to start the search.
 * @return The closest root, or the document's head.
 */
function closestRoot(element) {
    while (element) {
        if (element.shadowRoot)
            return element.shadowRoot;
        element = element.parentElement;
    }
    return document.head;
}

/**
 * @description Adds the provided string as a new style element to the provided root.
 * @param {string | undefined} styles - The css string. Use the css literal function for autocompletion.
 * @param {StylesRoot} [root] - The root to which the style element will be added.
 */
function stylesheet(styles, root = document.head) {
    if (!styles)
        return;
    const stylesheet = style({ innerHTML: styles });
    root.appendChild(stylesheet);
}

/**
 * Sets the declared properties to the provided element.
 * @param {Element} element - The element onto which the properties will be applied.
 * @param {TurboProperties} [properties] - The properties object.
 * @param {boolean} [setOnlyBaseProperties="false"] - If set to true, will only set the base turbo properties (classes,
 * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
 * @return The element itself.
 */
function setProperties(element, properties = {}, setOnlyBaseProperties = false) {
    Object.keys(properties).forEach(property => {
        switch (property) {
            case "tag"  :
                return;
            case "text":
                if (!(element instanceof HTMLElement))
                    return;
                element.innerText = properties.text;
                return;
            case "style":
                if (!(element instanceof HTMLElement || element instanceof SVGElement))
                    return;
                element.style.cssText += properties.style;
                return;
            case "stylesheet":
                stylesheet(properties.stylesheet, closestRoot(element));
                return;
            case "id":
                element.id = properties.id;
                return;
            case "classes":
                element.addClass(properties.classes);
                return;
            case "listeners":
                Object.keys(properties.listeners).forEach(listenerType => element.addListener(listenerType, properties.listeners[listenerType]));
                return;
            case "children":
                element.addChild(properties.children);
                return;
            case "parent":
                properties.parent.addChild(element);
                return;
            default:
                if (setOnlyBaseProperties)
                    return;
                try {
                    element[property] = properties[property];
                }
                catch (e) {
                    console.error(e);
                }
                return;
        }
    });
    return element;
}

const SvgNamespace = "http://www.w3.org/2000/svg";
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
/**
 * @description Evaluates whether the provided string is an SVG tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the SVG namespace or not.
 */
function isSvgTag(tag) {
    return Object.keys(SvgTagsDefinitions).includes(tag) || tag?.startsWith("svg");
}

const MathMLNamespace = "http://www.w3.org/1998/Math/MathML";
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
 * @description Evaluates whether the provided string is a MathML tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the MathML namespace or not.
 */
function isMathMLTag(tag) {
    return Object.keys(MathMLTagsDefinitions).includes(tag) || tag?.startsWith("math");
}

/**
 * @description Create an element with the specified properties (and the specified namespace if applicable).
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created element.
 */
function element(properties = {}) {
    let element;
    if (properties.namespace) {
        if (properties.namespace == "svg")
            element = document.createElementNS(SvgNamespace, properties.tag);
        else if (properties.namespace == "mathML")
            element = document.createElementNS(MathMLNamespace, properties.tag);
        else
            element = document.createElementNS(properties.namespace, properties.tag);
    }
    else {
        element = document.createElement(properties.tag || "div");
    }
    if (properties.shadowDOM)
        element.attachShadow({ mode: "open" });
    setProperties(element, properties);
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
        return element(properties);
    };
}

/**
 * @description Creates an "a" element with the specified properties.
 * @param {TurboProperties<"a">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["a"]} The created element.
 */
const a = generateTagFunction("a");
/**
 * @description Creates a canvas element with the specified properties.
 * @param {TurboProperties<"canvas">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["canvas"]} The created element.
 */
const canvas = generateTagFunction("canvas");
/**
 * @description Creates a div element with the specified properties.
 * @param {TurboProperties<"div">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["div"]} The created element.
 */
const div = generateTagFunction("div");
/**
 * @description Creates a form element with the specified properties.
 * @param {TurboProperties<"form">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["form"]} The created element.
 */
const form = generateTagFunction("form");
/**
 * @description Creates a h1 element with the specified properties.
 * @param {TurboProperties<"h1">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h1"]} The created element.
 */
const h1 = generateTagFunction("h1");
/**
 * @description Creates a h2 element with the specified properties.
 * @param {TurboProperties<"h2">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h2"]} The created element.
 */
const h2 = generateTagFunction("h2");
/**
 * @description Creates a h3 element with the specified properties.
 * @param {TurboProperties<"h3">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h3"]} The created element.
 */
const h3 = generateTagFunction("h3");
/**
 * @description Creates a h4 element with the specified properties.
 * @param {TurboProperties<"h4">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h4"]} The created element.
 */
const h4 = generateTagFunction("h4");
/**
 * @description Creates a h5 element with the specified properties.
 * @param {TurboProperties<"h5">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h5"]} The created element.
 */
const h5 = generateTagFunction("h5");
/**
 * @description Creates a h6 element with the specified properties.
 * @param {TurboProperties<"h6">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["h6"]} The created element.
 */
const h6 = generateTagFunction("h6");
/**
 * @description Creates an image element with the specified properties.
 * @param {TurboProperties<"img">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["img"]} The created element.
 */
const img = generateTagFunction("img");
/**
 * @description Creates an input element with the specified properties.
 * @param {TurboProperties<"input">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["input"]} The created element.
 */
const input = generateTagFunction("input");
/**
 * @description Creates a link element with the specified properties.
 * @param {TurboProperties<"link">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["link"]} The created element.
 */
const link = generateTagFunction("link");
/**
 * @description Creates a p element with the specified properties.
 * @param {TurboProperties<"p">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["p"]} The created element.
 */
const p = generateTagFunction("p");
/**
 * @description Creates a style element with the specified properties.
 * @param {TurboProperties<"style">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["style"]} The created element.
 */
const style = generateTagFunction("style");
/**
 * @description Creates a textarea element with the specified properties.
 * @param {TurboProperties<"textarea">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["textarea"]} The created element.
 */
const textarea = generateTagFunction("textarea");
/**
 * @description Creates a video element with the specified properties.
 * @param {TurboProperties<"video">} properties - Object containing properties of the element.
 * @returns {ElementTagMap["video"]} The created element.
 */
const video = generateTagFunction("video");

/**
 * @description Create an element with the specified properties. Supports SVG and MathML.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created element.
 */
function blindElement(properties = {}) {
    let element;
    if (isSvgTag(properties.tag))
        element = document.createElementNS(SvgNamespace, properties.tag);
    else if (isMathMLTag(properties.tag))
        element = document.createElementNS(MathMLNamespace, properties.tag);
    else
        element = document.createElement(properties.tag || "div");
    if (properties.shadowDOM)
        element.attachShadow({ mode: "open" });
    setProperties(element, properties);
    return element;
}

/**
 * @description Create a flex column element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
function flexCol(properties) {
    let el = element(properties);
    el.style.display = "flex";
    el.style.flexDirection = "column";
    return el;
}

/**
 * @description Create a flex column element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
function flexColCenter(properties) {
    let el = flexCol(properties);
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
    return el;
}

/**
 * @description Create a flex row element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
function flexRow(properties) {
    let el = element(properties);
    el.style.display = "flex";
    el.style.flexDirection = "row";
    return el;
}

/**
 * @description Create a flex row element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created flex element
 */
function flexRowCenter(properties) {
    let el = flexRow(properties);
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
    return el;
}

/**
 * @description Create a spacer element.
 * @param {TurboProperties<T>} properties - Object containing properties of the element.
 * @returns {ElementTagMap[T]} The created spacer element
 */
function spacer(properties) {
    let el = element(properties);
    el.style.flexGrow = "1";
    return el;
}

/**
 * @description Returns the HTML child handler object associated with the provided Turbo compatible entity.
 * @param {Element} element - The element to get the handler object from
 * @return The HTML element or its shadow root (if defined)
 */
function childHandler(element) {
    if (element.shadowRoot)
        return element.shadowRoot;
    return element;
}

/**
 * @description Add children elements to a parent element.
 * @param {Element} [element] - Parent Turbo or HTML DOM element
 * @param {Element | Element[]} [children] - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
function addChild(element, children) {
    if (!element || !children)
        return element;
    let htmlElement = childHandler(element);
    //Try to append every provided child (according to its type)
    try {
        if (!Array.isArray(children))
            htmlElement.appendChild(children);
        else
            children.forEach((child) => htmlElement.appendChild(child));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}

/**
 * @description Add children elements to a parent element.
 * @param {Element} element - Parent Turbo or HTML DOM element
 * @param {Element | Element[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements to insert before sibling
 * @param {Element} sibling - Sibling Turbo or HTML DOM element
 * @return The element itself
 */
function addChildBefore(element, children, sibling) {
    if (!element || !children)
        return element;
    if (!sibling)
        return element.addChild(children);
    let htmlElement = childHandler(element);
    //Try to append every provided child (according to its type)
    try {
        if (!Array.isArray(children))
            htmlElement.insertBefore(children, sibling);
        else
            children.forEach((child) => htmlElement.insertBefore(child, sibling));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}

/**
 * @description Remove all children of the given parent element.
 * @param {Element} element - Parent Turbo or HTML DOM element
 * @return The element itself
 */
function removeAllChildren(element) {
    if (!element)
        return element;
    try {
        Array.from(childHandler(element).children).forEach(child => child.remove());
    }
    catch (e) {
        console.error(e);
    }
    return element;
}

/**
 * @description Remove children elements from a parent element.
 * @param {Element} element - Parent Turbo or HTML DOM element
 * @param {Element | Element[]} children - Array of (or single element) child
 * Turbo or HTML DOM elements
 * @return The element itself
 */
function removeChild(element, children) {
    if (!element || !children)
        return element;
    let htmlElement = childHandler(element);
    //Try to remove every provided child (according to its type)
    try {
        if (!Array.isArray(children))
            htmlElement.removeChild(children);
        else
            children.forEach(child => htmlElement.removeChild(child));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}

/**
 * @description Add one or more classes to the provided HTML DOM element's (or TurboElement) class list.
 * @param {Element} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
function addClass(element, classes) {
    if (!element || !classes)
        return element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.filter(entry => entry.trim().length > 0).forEach(entry => element.classList.add(entry));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}

/**
 * @description Remove one or more classes from the provided HTML DOM element's (or TurboElement) class list.
 * @param {Element} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @return The element itself
 */
function removeClass(element, classes) {
    if (!element || !classes)
        return element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.filter(entry => entry.trim().length > 0).forEach(entry => element.classList.remove(entry));
    }
    catch (e) {
        console.error(e);
    }
    return element;
}

/**
 * @description Toggle one or more classes in the provided HTML DOM element's (or TurboElement) class list.
 * @param {Element} element - Turbo or HTML DOM element
 * @param {string | string[]} classes - String of classes separated by spaces, or array of strings
 * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
 * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
 * @return The element itself
 */
function toggleClass(element, classes, force) {
    if (!element || !classes)
        return element;
    try {
        // If string provided --> split by spaces
        if (typeof classes === "string")
            classes = classes.split(" ");
        classes.filter(entry => entry.trim().length > 0).forEach(entry => {
            if (force != undefined)
                element.classList.toggle(entry, force);
            else
                element.classList.toggle(entry);
        });
    }
    catch (e) {
        console.error(e);
    }
    return element;
}

function closest(element, type) {
    if (!element || !type)
        return null;
    while (element && !(element instanceof type))
        element = element.parentElement;
    return element || null;
}

/**
 * @description Adds the provided event listener to the element.
 * @param {Element} element - The element to which the event listener should be applied.
 * @param {string} type - The type of the event.
 * @param {EventListenerOrEventListenerObject | (e: Event, el: Element) => void} listener - The function
 * or object that receives a notification. Has (optionally) two parameters: the event, and the element itself.
 * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the
 * event listener.
 * @return The element itself
 */
function addListener(element, type, listener, options) {
    if (!element)
        return element;
    const wrappedListener = (e) => {
        if (typeof listener === "function")
            listener(e, element);
        else if (typeof listener === "object" && listener.handleEvent)
            listener.handleEvent(e);
    };
    element.addEventListener(type, wrappedListener, options);
    return element;
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

function getPropertyDescriptor(prototype, field) {
    while (prototype) {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, field);
        if (descriptor)
            return descriptor;
        prototype = Object.getPrototypeOf(prototype);
    }
    return undefined;
}
function updateObservedFieldProperty(prototype, field, attribute) {
    let descriptor = getPropertyDescriptor(prototype, field) || {
        enumerable: true,
        configurable: true
    };
    Object.defineProperty(prototype, field, {
        get: descriptor.get || function () {
            return this["__" + field];
        },
        set: function (value) {
            if (this["__" + field] === value)
                return;
            if (descriptor.set)
                descriptor.set.call(this, value);
            else
                this["__" + field] = value;
            if (this.setAttribute && typeof this.setAttribute === "function") {
                this.setAttribute(attribute, value.toString());
            }
        },
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable
    });
}
/**
 * @description Defines the element as a custom element with the given name, and processes all observed fields
 * and handles them. Use as class decorator in TypeScript (e.g.: @define("my-class")), and as a regular function call
 * in JavaScript (e.g.: define("my-class")(MyClass)).
 * @param {string} elementName - The name of the custom element.
 * @return Function that takes as parameter "constructor," the class to define.
 */
const define = (elementName) => (constructor) => {
    if (!constructor.observedAttributes)
        constructor.observedAttributes = [];
    if (constructor.observedFields) {
        constructor.observedFields.forEach((field) => {
            const attribute = camelToKebabCase(field);
            constructor.observedAttributes.push(attribute);
            updateObservedFieldProperty(constructor.prototype, field, attribute);
        });
    }
    customElements.define(elementName, constructor);
    return constructor;
};

/**
 * @description Sets the corresponding property as observed, to sync its changes with a corresponding HTML attribute.
 * @param {Object} target
 * @param {string} propertyKey
 */
function observe(target, propertyKey) {
    let constructor = target.constructor;
    if (!constructor.observedFields)
        constructor.observedFields = [];
    if (!constructor.observedFields.includes(propertyKey)) {
        constructor.observedFields.push(propertyKey);
    }
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
 * @class TurboElement
 * @extends HTMLElement
 * @description Base TurboElement class, extending the base HTML element with a few powerful tools and functions.
 */
class TurboElement extends HTMLElement {
    constructor(properties = {}) {
        super();
        if (properties.shadowDOM)
            this.attachShadow({ mode: "open" });
        this.setProperties(properties, true);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue == null || newValue == oldValue)
            return;
        this[kebabToCamelCase(name)] = newValue;
    }
    //Config
    /**
     * @description Static configuration object.
     */
    static config = { shadowDOM: false };
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

function turbofy() {
    const originalSetAttribute = HTMLElement.prototype.setAttribute;
    const originalRemoveAttribute = HTMLElement.prototype.removeAttribute;
    const originalBlur = HTMLElement.prototype.blur;
    const originalFocus = HTMLElement.prototype.focus;
    const originalRemove = Element.prototype.remove;
    /**
     * Sets the declared properties to the element.
     * @param {TurboProperties<T>} properties - The properties object.
     * @param {boolean} [setOnlyBaseProperties="false"] - If set to true, will only set the base turbo properties (classes,
     * text, style, id, children, parent, etc.) and ignore all other properties not explicitly defined in TurboProperties.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.setProperties = function _setProperties(properties, setOnlyBaseProperties = false) {
        setProperties(this, properties, setOnlyBaseProperties);
        return this;
    };
    /**
     * @description Add one or more CSS classes to the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.addClass = function _addClass(classes) {
        addClass(this, classes);
        return this;
    };
    /**
     * @description Remove one or more CSS classes from the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.removeClass = function _removeClass(classes) {
        removeClass(this, classes);
        return this;
    };
    /**
     * @description Toggle one or more CSS classes in the element.
     * @param {string | string[]} classes - String of classes separated by spaces, or array of strings.
     * @param {boolean} force - (Optional) Boolean that turns the toggle into a one way-only operation. If set to false,
     * then the class will only be removed, but not added. If set to true, then token will only be added, but not removed.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.toggleClass = function _toggleClass(classes, force) {
        toggleClass(this, classes, force);
        return this;
    };
    /**
     * @description Add one or more child elements to the element.
     * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.addChild = function _addChild(children) {
        addChild(this, children);
        return this;
    };
    /**
     * @description Remove one or more child elements from the element.
     * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.remChild = function _remChild(children) {
        removeChild(this, children);
        return this;
    };
    /**
     * @description Add one or more child elements to the element.
     * @param {Element | Element[]} children - Array of (or single element) child Turbo or HTML elements to
     * insert before sibling.
     * @param {Element} sibling - The sibling element
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.addChildBefore = function _addChildBefore(children, sibling) {
        addChildBefore(this, children, sibling);
        return this;
    };
    /**
     * @description Remove all child elements of the element.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.removeAllChildren = function _removeAllChildren() {
        removeAllChildren(this);
        return this;
    };
    Element.prototype.getClosest = function _getClosest(type) {
        return closest(this, type);
    };
    /**
     * @description Adds an event listener to the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject | (e: Event, el: this) => void} listener The function
     * or object that receives a notification.
     * @param {boolean | AddEventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.addListener = function _addListener(type, listener, options) {
        // @ts-ignore
        addListener(this, type, listener, options);
        return this;
    };
    /**
     * @description Set a certain style attribute of the element to the provided value.
     * @param {keyof CSSStyleDeclaration} attribute - A string representing the style attribute to set.
     * @param {string} value - A string representing the value to set the attribute to.
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.setStyle = function _setStyle(attribute, value) {
        if (!this.pendingStyles)
            this.pendingStyles = {};
        this.pendingStyles[attribute] = value;
        this.applyStyles();
        return this;
    };
    /**
     * @description Appends the given CSS to the element's inline styles.
     * @param {string} cssText - A CSS string of style attributes and their values, seperated by semicolons. Use the
     * css literal function for autocompletion.
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.setStyles = function _setStyles(cssText) {
        if (!this.pendingStyles)
            this.pendingStyles = {};
        this.pendingStyles["cssText"] = cssText;
        this.applyStyles();
        return this;
    };
    HTMLElement.prototype.applyStyles = function _applyStyles() {
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
    /**
     * @description Execute a callback while still benefiting from chaining.
     * @param {(el: this) => void} callback The function to execute, with 1 parameter representing the instance itself.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.execute = function _execute(callback) {
        callback(this);
        return this;
    };
    /**
     * @description Removes an event listener from the element.
     * @param {string} type The type of the event.
     * @param {EventListenerOrEventListenerObject} listener The function or object that was previously added as a listener.
     * @param {boolean | EventListenerOptions} [options] An options object that specifies characteristics about the event listener.
     * @returns {this} Itself, allowing for method chaining.
     */
    Element.prototype.removeListener = function _removeListener(type, listener, options) {
        this.removeEventListener(type, listener, options);
        return this;
    };
    /**
     * @description Sets the value of an attribute on the underlying element.
     * @param {string} name The name of the attribute.
     * @param {string | boolean} [value] The value of the attribute. Can be left blank to represent a true boolean.
     * @returns {this} Itself, allowing for method chaining.
     */
    function _setAttribute(name, value) {
        originalSetAttribute.call(this, name, value?.toString() || "true");
        return this;
    }
    Element.prototype.setAttribute = _setAttribute;
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
    Element.prototype.remove = function _remove() {
        originalRemove.call(this);
        return this;
    };
    /**
     * @description Show or hide the element (based on CSS)
     * @param {boolean} b - Whether to show the element or not
     * @returns {this} Itself, allowing for method chaining.
     */
    HTMLElement.prototype.show = function _show(b) {
        this.setStyle("display", b ? "" : "none");
        return this;
    };
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

var TurboEventName;
(function (TurboEventName) {
    TurboEventName["keyPressed"] = "turbo-key-pressed";
    TurboEventName["keyReleased"] = "turbo-key-released";
    TurboEventName["click"] = "turbo-click";
    TurboEventName["clickStart"] = "turbo-click-start";
    TurboEventName["clickEnd"] = "turbo-click-end";
    TurboEventName["move"] = "turbo-move";
    TurboEventName["dragStart"] = "turbo-drag-start";
    TurboEventName["drag"] = "turbo-drag";
    TurboEventName["dragEnd"] = "turbo-drag-end";
    TurboEventName["trackpadScroll"] = "turbo-trackpad-scroll";
    TurboEventName["trackpadPinch"] = "turbo-trackpad-pinch";
    TurboEventName["mouseWheel"] = "turbo-mouse-wheel";
})(TurboEventName || (TurboEventName = {}));

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
    equals(x, y = 0) {
        if (typeof x == "number")
            return this.x == x && this.y == y;
        return this.x == x.x && this.y == x.y;
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

class TurboEvent extends Event {
    clickMode;
    keys;
    firePosition;
    constructor(firePosition, clickMode, keys, eventName, eventInitDict) {
        super(eventName, { bubbles: true, cancelable: true, ...eventInitDict });
        this.clickMode = clickMode;
        this.keys = keys;
        this.firePosition = firePosition;
    }
    closest(type) {
        return closest(this.target, type);
    }
    get target() {
        return super.target || document;
    }
}

class TurboKeyEvent extends TurboEvent {
    keyPressed;
    keyReleased;
    constructor(keyPressed, keyReleased, clickMode, keys, eventName = TurboEventName.keyPressed, eventInitDict) {
        super(null, clickMode, keys, eventName, { bubbles: true, cancelable: true, ...eventInitDict });
        this.keyPressed = keyPressed;
        this.keyReleased = keyReleased;
    }
}

class TurboWheelEvent extends TurboEvent {
    delta;
    constructor(delta, keys, eventName, eventInitDict) {
        super(null, ClickMode.none, keys, eventName, { bubbles: true, cancelable: true, ...eventInitDict });
        this.delta = delta;
    }
}

class TurboDragEvent extends TurboEvent {
    _origins;
    _previousPositions;
    _positions;
    constructor(origins, previousPositions, positions, clickMode, keys, eventName = TurboEventName.drag, eventInitDict) {
        super(positions.first, clickMode, keys, eventName, { bubbles: true, cancelable: true, ...eventInitDict });
        this.origins = origins;
        this.previousPositions = previousPositions;
        this.positions = positions;
    }
    //Origins
    get origins() {
        return this._origins;
    }
    set origins(value) {
        this._origins = value;
    }
    //Previous positions
    get previousPositions() {
        return this._previousPositions;
    }
    set previousPositions(value) {
        this._previousPositions = value;
    }
    //Positions
    get positions() {
        return this._positions;
    }
    set positions(value) {
        this._positions = value;
    }
}

class EventManager {
    static _instance;
    _inputDevice = InputDevice.unknown;
    onInputDeviceChange = new Delegate();
    //States
    currentKeys = [];
    currentAction = ActionMode.none;
    currentClick = ClickMode.none;
    //Saved values
    origins;
    previousPositions;
    timer = null;
    moveThreshold = 10;
    longPressDuration = 500;
    constructor() {
        //Cancel construction if exists already
        if (EventManager.instance)
            return EventManager.instance;
        EventManager.instance = this;
        this.origins = new TurboMap();
        this.previousPositions = new TurboMap();
        this.initEvents();
    }
    initEvents() {
        document.addEventListener("keydown", this.keyDown);
        document.addEventListener("keyup", this.keyUp);
        document.addEventListener("wheel", this.wheel, { passive: false });
        document.addEventListener("mousedown", this.pointerDown);
        document.addEventListener("mousemove", this.pointerMove);
        document.addEventListener("mouseup", this.pointerUp);
        document.addEventListener("mouseleave", this.pointerLeave);
        document.addEventListener("touchstart", this.pointerDown, { passive: false });
        document.addEventListener("touchmove", this.pointerMove, { passive: false });
        document.addEventListener("touchend", this.pointerUp, { passive: false });
    }
    /**
     * @description The singleton instance.
     */
    static get instance() {
        return this._instance;
    }
    static set instance(value) {
        this._instance = value;
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
        this._inputDevice = value;
        this.onInputDeviceChange.fire(value);
    }
    //Key Events
    keyDown = (e) => {
        if (this.currentKeys.includes(e.key))
            return;
        this.currentKeys.push(e.key);
        document.dispatchEvent(new TurboKeyEvent(e.key, null, this.currentClick, this.currentKeys, TurboEventName.keyPressed));
    };
    keyUp = (e) => {
        if (!this.currentKeys.includes(e.key))
            return;
        this.currentKeys.splice(this.currentKeys.indexOf(e.key), 1);
        document.dispatchEvent(new TurboKeyEvent(null, e.key, this.currentClick, this.currentKeys, TurboEventName.keyReleased));
    };
    //Wheel Event
    wheel = (e) => {
        e.preventDefault();
        if (this.inputDevice != InputDevice.trackpad)
            this.inputDevice = InputDevice.mouse;
        //Most likely trackpad
        if (Math.abs(e.deltaY) <= 40 || e.deltaX != 0)
            this.inputDevice = InputDevice.trackpad;
        //Reset trackpad timer
        this.clearTimer();
        this.setTimer(() => {
            if (this.inputDevice == InputDevice.trackpad)
                this.inputDevice = InputDevice.mouse;
        });
        //Get name of event according to input type
        let eventName;
        //Trackpad pinching
        if (this.inputDevice == InputDevice.trackpad && e.ctrlKey)
            eventName = TurboEventName.trackpadPinch;
        //Trackpad zooming
        else if (e.ctrlKey)
            eventName = TurboEventName.trackpadScroll;
        //Mouse scrolling
        else
            eventName = TurboEventName.mouseWheel;
        document.dispatchEvent(new TurboWheelEvent(new Point(e.deltaX, e.deltaY), this.currentKeys, eventName));
    };
    //Mouse and Touch Events
    pointerDown = (e) => {
        e.preventDefault();
        const isTouch = e instanceof TouchEvent;
        if (isTouch)
            this.inputDevice = InputDevice.touch;
        else if (this.inputDevice == InputDevice.unknown)
            this.inputDevice = InputDevice.mouse;
        //Touch start initialization
        if (isTouch) {
            Array.from(e.touches).forEach(touchPoint => {
                const position = new Point(touchPoint);
                this.origins.set(touchPoint.identifier, position);
                this.previousPositions.set(touchPoint.identifier, position);
            });
            this.setClickMode(e.touches.length, true);
        }
        //Mouse down initialization
        else {
            const position = new Point(e);
            this.origins.set(0, position);
            this.previousPositions.set(0, position);
            this.setClickMode(e.button);
        }
        //Fire click start and set click timer
        if (this.origins.first) {
            this.currentAction = ActionMode.click;
            this.setTimer(this.clickTimer);
            this.fireClick(this.origins.first, TurboEventName.clickStart);
        }
    };
    pointerMove = (e) => {
        e.preventDefault();
        const isTouch = e instanceof TouchEvent;
        const positions = new TurboMap();
        //Get current positions
        if (isTouch) {
            Array.from(e.touches).forEach(touchPoint => {
                positions.set(touchPoint.identifier, new Point(touchPoint));
            });
        }
        else {
            positions.set(0, new Point(e));
        }
        //Fire move event
        this.fireDrag(positions, TurboEventName.move);
        if (this.currentAction == ActionMode.none)
            return;
        //Initialize drag
        if (this.currentAction != ActionMode.drag) {
            if (!Array.from(this.origins.entries()).some(([key, origin]) => {
                const position = positions.get(key);
                return position && Point.dist(position, origin) > this.moveThreshold;
            }))
                return;
            this.fireDrag(positions, TurboEventName.dragStart);
            this.currentAction = ActionMode.drag;
        }
        //Fire drag and update previous points
        this.fireDrag(positions);
        positions.forEach((position, key) => this.previousPositions.set(key, position));
    };
    pointerUp = (e) => {
        e.preventDefault();
        this.clearTimer();
        const positions = new TurboMap();
        const isTouch = e instanceof TouchEvent;
        if (isTouch) {
            Array.from(e.changedTouches).forEach(touchPoint => {
                positions.set(touchPoint.identifier, new Point(touchPoint));
            });
        }
        else {
            positions.set(0, new Point(e));
        }
        if (this.currentAction == ActionMode.click)
            this.fireClick(positions.first);
        if (this.currentAction == ActionMode.drag)
            this.fireDrag(positions, TurboEventName.dragEnd);
        this.fireClick(this.origins.first, TurboEventName.clickEnd);
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
        this.currentAction = ActionMode.none;
        this.currentClick = ClickMode.none;
    };
    pointerLeave = () => {
        if (this.currentAction == ActionMode.none)
            return;
        this.clearTimer();
        if (this.currentAction != ActionMode.drag) {
            this.fireClick(this.origins.first, TurboEventName.clickEnd);
            this.currentAction = ActionMode.none;
        }
    };
    //Event triggering
    //Fires a custom VC click event at the click target with the click position
    //All this to deal with issues caused by Apple...
    fireClick(p, eventName = TurboEventName.click) {
        (document.elementFromPoint(p.x, p.y) || document).dispatchEvent(new TurboEvent(p, this.currentClick, this.currentKeys, eventName));
    }
    //Fires a custom VC drag event at the target with the origin of the drag, the last drag position,
    //and the current position
    fireDrag(positions, eventName = TurboEventName.drag) {
        (document.elementFromPoint(positions.first.x, positions.first.y) || document).dispatchEvent(new TurboDragEvent(this.origins, this.previousPositions, positions, this.currentClick, this.currentKeys, eventName));
    }
    //Timer
    //Timer function, executed when timer ends
    clickTimer = () => {
        //Turn a click into long press
        if (this.currentAction == ActionMode.click)
            this.currentAction = ActionMode.longPress;
    };
    //Sets a timer function with its duration (defaults to longPressDuration)
    setTimer(callback, duration = this.longPressDuration) {
        this.clearTimer();
        this.timer = setTimeout(() => {
            callback();
            this.clearTimer();
        }, duration);
    }
    //Clears timer and sets it to null
    clearTimer() {
        if (!this.timer)
            return;
        clearTimeout(this.timer);
        this.timer = null;
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

/**
 * @description Fetches an SVG from the given path, then executes on it the provided callback
 * @param {string} path - The path to the SVG
 * @param {(svgManipulation: SVGElement) => void} onLoaded - The callback to execute
 */
function fetchSvg(path, onLoaded) {
    if (!path || path.length == 0)
        return;
    fetch(path)
        .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok while loading your SVG");
        }
        return response.text();
    })
        .then(svgText => {
        let svg = textToElement(svgText);
        if (svg && onLoaded) {
            onLoaded(svg);
        }
    })
        .catch(error => console.error("Error fetching SVG:", error));
}

/**
 * @class SvgCache
 * @description Class representing a cache for SVG files. Use it to not fetch the same SVG file multiple times.
 */
class SvgCache {
    /**
     * @description The instance's current cache
     */
    cache = {};
    /**
     * @description Fetches an SVG from the given path, then executes on it the provided callback, and stores it in
     * the cache.
     * @param {string} path - The path to the SVG
     * @param {(svgManipulation: SVGElement) => void} onLoaded - The callback to execute
     */
    fetchSvg(path, onLoaded) {
        if (!path || path.length == 0)
            return;
        let savedEl = this.cache[path];
        if (savedEl) {
            onLoaded(savedEl.cloneNode(true));
            return;
        }
        fetchSvg(path, (svg) => {
            this.cache[path] = svg.cloneNode(true);
            onLoaded(svg);
        });
    }
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

var TurboIcon_1;
/**
 * Icon class for creating icon elements.
 * @class TurboIcon
 * @extends TurboElement
 */
let TurboIcon = class TurboIcon extends TurboElement {
    static { TurboIcon_1 = this; }
    _element = null;
    _type;
    _directory;
    _icon;
    _iconColor = null;
    _onLoaded = null;
    static config = { type: "svg", path: "" };
    static cache = new SvgCache();
    /**
     * Creates an instance of Icon.
     * @param {TurboIconProperties} properties - Properties to configure the icon.
     */
    constructor(properties) {
        super(properties);
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
            this._onLoaded = properties.onLoaded;
        this.icon = properties.icon;
    }
    generateSvg() {
        this.clear();
        TurboIcon_1.cache.fetchSvg(this.path, (svg) => {
            if (this.element)
                return;
            this.element = svg;
            this.addChild(this.element);
            if (this.element) {
                if (this.iconColor)
                    this.element.style.fill = this.iconColor;
                if (this._onLoaded)
                    this._onLoaded(this.element);
            }
        });
    }
    generateImg() {
        if (this.element instanceof HTMLImageElement) {
            this.element.src = this.path;
            this.element.alt = this.icon;
            return;
        }
        this.clear();
        this.element = img({ src: this.path, alt: this.icon, parent: this });
    }
    clear() {
        this.removeAllChildren();
        this.element = null;
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
            value = this.type || TurboIcon_1.config.type || "svg";
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
            value = this.directory || TurboIcon_1.config.path || "";
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
    get icon() {
        return this._icon;
    }
    set icon(value) {
        this.type = getFileExtension(value).substring(1);
        this._icon = value;
        if (this.type == "svg")
            this.generateSvg();
        else
            this.generateImg();
    }
    /**
     * @description The assigned color to the icon (if any)
     */
    get iconColor() {
        return this._iconColor;
    }
    set iconColor(value) {
        this._iconColor = value;
        if (this.element instanceof SVGElement && value)
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
};
__decorate([
    observe
], TurboIcon.prototype, "icon", null);
__decorate([
    observe
], TurboIcon.prototype, "iconColor", null);
TurboIcon = TurboIcon_1 = __decorate([
    define("turbo-icon")
], TurboIcon);
function icon(properties) {
    return new TurboIcon(properties);
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

var TurboButton_1;
/**
 * Button class for creating Turbo button elements.
 * @class TurboButton
 * @extends TurboElement
 */
let TurboButton = class TurboButton extends TurboElement {
    static { TurboButton_1 = this; }
    _elements;
    _buttonTextTag;
    static config = { defaultTextTag: "h4" };
    /**
     * Initializes a new instance of the Button class.
     * @param {TurboButtonProperties} properties - Properties to configure the button.
     */
    constructor(properties) {
        super(properties);
        this.elements = {
            leftCustomElements: null,
            leftIcon: null,
            buttonText: null,
            rightIcon: null,
            rightCustomElements: null,
        };
        this.buttonTextTag = properties.customTextTag;
        if (!properties.unsetDefaultClasses)
            this.addClass(TurboButton_1.config.defaultClasses);
        if (properties.leftCustomElements)
            this.leftCustomElements = properties.leftCustomElements;
        if (properties.leftIcon)
            this.leftIcon = properties.leftIcon;
        if (properties.buttonText)
            this.buttonText = properties.buttonText;
        if (properties.rightIcon)
            this.rightIcon = properties.rightIcon;
        if (properties.rightCustomElements)
            this.rightCustomElements = properties.rightCustomElements;
    }
    /**
     * @description Adds a given element or elements to the button at a specified position.
     * @param {Element | Element[] | null} element - The element(s) to add.
     * @param {keyof ButtonChildren} type - The type of child element being added.
     */
    addAtPosition(element, type) {
        if (!element)
            return;
        let nextSiblingIndex = 0;
        for (let key in this.elements) {
            if (key == type)
                break;
            if (this.elements[key])
                nextSiblingIndex++;
        }
        this.addChildBefore(element, this.children[nextSiblingIndex]);
    }
    /**
     * @description Removes a given element or elements from the button.
     * @param {Element | Element[] | null} element - The element(s) to remove.
     */
    removeElement(element) {
        if (!element)
            return;
        if (!Array.isArray(element))
            this.removeChild(element);
        else
            element.forEach(el => this.removeChild(el));
    }
    // Getters and setters
    /**
     * @description Object containing the children of the button.
     */
    get elements() {
        return this._elements;
    }
    set elements(value) {
        this._elements = value;
    }
    /**
     * @description The tag of the text element in the button
     */
    get buttonTextTag() {
        return this._buttonTextTag;
    }
    set buttonTextTag(value) {
        if (!value)
            value = TurboButton_1.config.defaultTextTag || "h4";
        this._buttonTextTag = value;
    }
    /**
     * @description The custom element(s) on the left. Can be set to new element(s) by a simple assignment.
     */
    get leftCustomElements() {
        return this.elements.leftCustomElements;
    }
    set leftCustomElements(value) {
        this.addAtPosition(value, "leftCustomElements");
        this.removeElement(this.leftCustomElements);
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
        if (typeof value == "string")
            value = new TurboIcon({ icon: value });
        this.addAtPosition(value, "leftIcon");
        this.removeElement(this.leftIcon);
        this.elements.leftIcon = value;
    }
    /**
     * @description The text element. Can be set to a new element by a simple assignment. Setting the value to a new
     * string will update the text's innerText with the given string.
     */
    get buttonText() {
        return this.elements.buttonText;
    }
    set buttonText(value) {
        if (typeof value == "string") {
            if (this.buttonText && "innerText" in this.buttonText) {
                this.buttonText.innerText = value;
                return;
            }
            value = element({ tag: this.buttonTextTag, text: value });
        }
        this.addAtPosition(value, "buttonText");
        this.removeElement(this.buttonText);
        this.elements.buttonText = value;
    }
    /**
     * @description The right icon element. Can be set with a new icon by a simple assignment (the name/path of the
     * icon, or a Turbo/HTML element).
     */
    get rightIcon() {
        return this.elements.rightIcon;
    }
    set rightIcon(value) {
        if (typeof value == "string")
            value = new TurboIcon({ icon: value });
        this.addAtPosition(value, "rightIcon");
        this.removeElement(this.rightIcon);
        this.elements.rightIcon = value;
    }
    /**
     * @description The custom element(s) on the right. Can be set to new element(s) by a simple assignment.
     */
    get rightCustomElements() {
        return this.elements.rightCustomElements;
    }
    set rightCustomElements(value) {
        this.addAtPosition(value, "rightCustomElements");
        this.removeElement(this.rightCustomElements);
        this.elements.rightCustomElements = value;
    }
};
TurboButton = TurboButton_1 = __decorate([
    define("turbo-button")
], TurboButton);
function button(properties) {
    return new TurboButton(properties);
}

var css_248z$2 = "turbo-dropdown-entry{padding:.5em .7em;width:100%}turbo-dropdown-entry:hover{background-color:#d7d7d7}turbo-dropdown-entry:not(:last-child){border-bottom:.1em solid #bdbdbd}";
styleInject(css_248z$2);

/**
 * @class TurboDropdownEntry
 * @description Class representing an entry within a Dropdown.
 * @extends TurboElement
 */
let TurboDropdownEntry = class TurboDropdownEntry extends TurboElement {
    _value;
    _selected = false;
    _selectedClass = "";
    /**
     * @description DropdownEntry constructor
     * @param {TurboDropdownEntryProperties} properties - Properties for configuring the dropdown entry.
     */
    constructor(properties) {
        super(properties);
        this.value = properties.value;
        if (properties.selectedClass)
            this.selectedClass = properties.selectedClass;
        if (properties.selected)
            this.selected = properties.selected;
    }
    /**
     * @description Toggles the selection of this dropdown entry
     */
    toggle() {
        this.selected = !this.selected;
    }
    /**
     * @description The value of the dropdown entry
     */
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.innerText = value;
    }
    /**
     * @description Whether or not the dropdown entry is selected
     */
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.toggleClass(this.selectedClass, value);
    }
    /**
     * @description The class(es) assigned to the dropdown entry when it is selected
     */
    get selectedClass() {
        return this._selectedClass;
    }
    set selectedClass(value) {
        this._selectedClass = value;
    }
};
TurboDropdownEntry = __decorate([
    define("turbo-dropdown-entry")
], TurboDropdownEntry);
function dropdownEntry(properties) {
    return new TurboDropdownEntry(properties);
}

var css_248z$1 = "turbo-dropdown{display:inline-block;position:relative}turbo-dropdown>:nth-child(2){background-color:#fff;border:.1em solid #5e5e5e;border-radius:.4em;display:flex;flex-direction:column;left:0;overflow:hidden;top:calc(100% + .4em);z-index:1}";
styleInject(css_248z$1);

var css_248z = "turbo-popup{position:fixed}";
styleInject(css_248z);

let TurboPopup = class TurboPopup extends TurboElement {
    viewportMargin = 0;
    offsetFromParent = 0;
    constructor(properties = {}) {
        super(properties);
        if (properties.viewportMargin)
            this.viewportMargin = properties.viewportMargin;
        if (properties.offsetFromParent)
            this.offsetFromParent = properties.offsetFromParent;
        this.addListeners();
        this.show(false);
    }
    addListeners() {
        document.addEventListener("scroll", () => this.show(false));
        document.addEventListener("click", e => {
            if (this.isShown && !this.contains(e.target))
                this.show(false);
        });
    }
    recomputePosition() {
        const rect = this.getBoundingClientRect();
        const parentRect = this.parentElement.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(this);
        const parentComputedStyle = window.getComputedStyle(this.parentElement);
        const top = this.recomputeTop(rect, parentRect, computedStyle, parentComputedStyle);
        const left = this.recomputeLeft(rect, parentRect, computedStyle, parentComputedStyle);
        this.recomputeMaxHeight(top, computedStyle, parentComputedStyle);
        this.recomputeMaxWidth(left, computedStyle, parentComputedStyle);
    }
    recomputeTop(rect, parentRect, computedStyle, parentComputedStyle) {
        let top;
        const popupHeightWithMargins = rect.height + this.offsetFromParent + this.viewportMargin
            + parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);
        if (window.innerHeight - parentRect.bottom >= popupHeightWithMargins)
            top = parentRect.bottom + this.offsetFromParent;
        else if (parentRect.top >= popupHeightWithMargins)
            top = parentRect.top - rect.height - this.offsetFromParent;
        else
            top = parentRect.bottom + this.offsetFromParent;
        this.setStyle("top", top + "px");
        return top;
    }
    recomputeLeft(rect, parentRect, computedStyle, parentComputedStyle) {
        let left = parentRect.left + (parentRect.width / 2) - (rect.width / 2) +
            parseFloat(parentComputedStyle.marginLeft) - parseFloat(computedStyle.marginLeft);
        if (left < this.viewportMargin)
            left = this.viewportMargin;
        else if (left + rect.width > window.innerWidth - this.viewportMargin)
            left = window.innerWidth - rect.width - parseFloat(computedStyle.marginLeft)
                - parseFloat(computedStyle.marginRight) - this.viewportMargin;
        this.setStyle("left", left + "px");
        return left;
    }
    recomputeMaxHeight(top, computedStyle, parentComputedStyle) {
        const maxHeight = window.innerHeight - top - this.viewportMargin
            - parseFloat(computedStyle.marginBottom) - parseFloat(computedStyle.marginTop)
            - parseFloat(parentComputedStyle.marginBottom) - parseFloat(parentComputedStyle.marginTop);
        if (computedStyle.maxHeight && parseFloat(computedStyle.maxHeight) <= maxHeight)
            return;
        this.setStyle("maxHeight", maxHeight + "px");
    }
    recomputeMaxWidth(left, computedStyle, parentComputedStyle) {
        const maxWidth = window.innerWidth - left - this.viewportMargin
            - parseFloat(computedStyle.marginLeft) - parseFloat(computedStyle.marginRight)
            - parseFloat(parentComputedStyle.marginLeft) - parseFloat(parentComputedStyle.marginRight);
        if (computedStyle.maxWidth && parseFloat(computedStyle.maxWidth) <= maxWidth)
            return;
        this.setStyle("maxWidth", maxWidth + "px");
    }
    clearMaxDimensions() {
        this.setStyle("maxHeight", "");
        this.setStyle("maxWidth", "");
    }
    get isShown() {
        return this.style.display != "none";
    }
    show(b) {
        if (this.isShown == b)
            return this;
        this.setStyle("display", b ? "" : "none");
        if (b)
            requestAnimationFrame(() => this.recomputePosition());
        else
            this.clearMaxDimensions();
        return this;
    }
    toggle() {
        return this.show(!this.isShown);
    }
};
TurboPopup = __decorate([
    define("turbo-popup")
], TurboPopup);
function popup(properties = {}) {
    return new TurboPopup(properties);
}

var TurboDropdown_1;
/**
 * Dropdown class for creating Turbo button elements.
 * @class TurboDropdown
 * @extends TurboElement
 */
let TurboDropdown = class TurboDropdown extends TurboElement {
    static { TurboDropdown_1 = this; }
    /**
     * The dropdown's selector element.
     */
    selector;
    /**
     * The dropdown's popup element.
     */
    popup;
    /**
     * The dropdown's entries.
     */
    _entries = [];
    /**
     * The dropdown's underlying hidden input. Might be undefined.
     */
    underlyingInput;
    popupOpen = false;
    multiSelection = false;
    static config = { defaultEntryTag: "h4", defaultSelectorTag: "h4" };
    /**
     * @description Dropdown constructor
     * @param {TurboDropdownProperties} properties - Properties for configuring the dropdown.
     */
    constructor(properties) {
        super(properties);
        if (!properties.selectedValues)
            properties.selectedValues = [];
        if (properties.multiSelection)
            this.multiSelection = properties.multiSelection;
        if (properties.underlyingInputName)
            this.underlyingInput = input({ type: "hidden", name: properties.underlyingInputName });
        this.selector = this.createSelector(properties);
        this.popup = this.createPopup(properties);
        this.entries = properties.values.map(entry => this.createDropdownEntry(entry, properties));
        this.entries.forEach(entry => {
            if (properties.selectedValues?.includes(entry.value))
                this.select(entry);
        });
        document.addEventListener("click", e => {
            if (this.popupOpen && !this.contains(e.target))
                this.openPopup(false);
        });
    }
    createSelector(properties) {
        let selector;
        if (properties.selector instanceof HTMLElement) {
            selector = properties.selector;
        }
        else {
            let textTag = properties.customSelectorTag
                ? properties.customSelectorTag
                : TurboDropdown_1.config.defaultSelectorTag;
            let initialText = typeof properties.selector == "string"
                ? properties.selector
                : typeof properties.values[0] == "string"
                    ? properties.values[0]
                    : properties.values[0].value;
            selector = button({ buttonText: initialText, customTextTag: textTag });
        }
        let selectorClasses = properties.customSelectorClasses
            ? properties.customSelectorClasses
            : TurboDropdown_1.config.defaultSelectorClasses;
        selector.addEventListener("click", () => this.openPopup(!this.popupOpen));
        this.addChild(selector);
        addClass(selector, selectorClasses);
        return selector;
    }
    createPopup(properties) {
        let popupEl = properties.popup ? properties.popup : popup();
        let popupClasses = properties.customPopupClasses
            ? properties.customPopupClasses
            : TurboDropdown_1.config.defaultPopupClasses;
        this.addChild(popupEl);
        popupEl.style.display = "none";
        addClass(popupEl, popupClasses);
        return popupEl;
    }
    createDropdownEntry(entry, properties) {
        if (typeof entry == "string")
            entry = dropdownEntry({ value: entry });
        entry.addClass(properties.customEntriesClasses
            ? properties.customEntriesClasses
            : TurboDropdown_1.config.defaultEntriesClasses);
        entry.selectedClass += " " + (properties.customSelectedEntriesClasses
            ? properties.customSelectedEntriesClasses
            : TurboDropdown_1.config.defaultSelectedEntriesClasses);
        entry.addEventListener("click", () => {
            this.select(entry);
            this.openPopup(false);
        });
        this.popup.addChild(entry);
        return entry;
    }
    /**
     * @description Select an entry.
     * @param {string | TurboDropdownEntry} entry - The DropdownEntry (or its string value) to select.
     * @return {TurboDropdown} - This Dropdown for chaining.
     */
    select(entry) {
        if (typeof entry == "string") {
            let el = this.entries.find(el => el.value == entry);
            if (!el)
                return this;
            entry = el;
        }
        if (!this.multiSelection)
            this.selectedEntries.forEach(entry => entry.toggle());
        entry.toggle();
        this.updateSelectorText();
        this.dispatchEvent(new CustomEvent("change", {
            detail: { selectedValues: this.selectedValues }
        }));
        return this;
    }
    reset() {
        this.entries[0].click();
    }
    get entries() {
        return this._entries;
    }
    set entries(values) {
        this._entries = values;
    }
    /**
     * @description The dropdown's currently selected entries
     */
    get selectedEntries() {
        return this.entries.filter(entry => entry.selected);
    }
    /**
     * @description The dropdown's currently selected values
     */
    get selectedValues() {
        return this.selectedEntries.map(entry => entry.value);
    }
    /**
     * @description The dropdown's values. Setting it will update the dropdown accordingly.
     */
    get values() {
        return this.entries.map(entry => entry.value);
    }
    set values(values) {
        for (let i = 0; i < Math.min(this.entries.length, values.length); i++) {
            this.entries[i].value = values[i];
        }
        this.updateSelectorText();
    }
    updateSelectorText() {
        let newValue = this.selectedValues.join(", ");
        if (this.underlyingInput)
            this.underlyingInput.value = newValue;
        if (this.selector instanceof TurboButton)
            this.selector.buttonText = newValue;
    }
    openPopup(b) {
        if (this.popupOpen == b)
            return;
        this.popupOpen = b;
        if (this.popup instanceof TurboElement)
            this.popup.show(b);
        else
            this.popup.style.display = b ? "" : "none";
    }
};
TurboDropdown = TurboDropdown_1 = __decorate([
    define("turbo-dropdown")
], TurboDropdown);
function dropdown(properties) {
    return new TurboDropdown(properties);
}

let TurboIconToggle = class TurboIconToggle extends TurboIcon {
    _toggled = false;
    onToggle;
    constructor(properties) {
        super(properties);
        this.toggled = properties.toggled;
        this.onToggle = properties.onToggle;
    }
    get toggled() {
        return this._toggled;
    }
    set toggled(value) {
        this._toggled = value;
        if (this.onToggle)
            this.onToggle(value, this);
    }
    toggle() {
        this.toggled = !this.toggled;
    }
};
TurboIconToggle = __decorate([
    define("turbo-icon-toggle")
], TurboIconToggle);
function iconToggle(properties) {
    return new TurboIconToggle(properties);
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
            src: local("${name}"), url("${path}") format("${format}");
            font-weight: "${weight}";
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
        if (typeof value == "string")
            return createFontFace(font.name, font.pathOrDirectory, font.format, weight, value);
        return Object.entries(value).map(([weightName, style]) => createFontFace(font.name, `${font.pathOrDirectory}/${font.name}-${weightName}${font.extension}`, font.format, weight, style)).join("\n");
    }).join("\n"));
}

/**
 * @class Transition
 * @description A class representing a CSS transition. It has two states (in and out), which you can set up
 * almost independently (they must only share the animation property). Use a Transition to transition one or more
 * TurboElement(s) or HTMLElement(s) easily using your predefined transition.
 */
class Transition {
    transitionProperties = [];
    /**
     * @constructor
     * @param {TransitionProperties} transition - The transition properties to apply to this newly created Transition
    */
    constructor(transition) {
        if (!transition.property)
            transition.property = "all";
        //Create fixed transition in and out values
        for (let i = 0; i < 2; i++) {
            let k = i === 0 ? "In" : "Out";
            this.transitionProperties.push({
                property: transition.property,
                duration: transition["duration" + k] ? transition["duration" + k] : (transition.duration ? transition.duration : 0),
                delay: transition["delay" + k] ? transition["delay" + k] : (transition.delay ? transition.delay : 0),
                timingFunction: transition["timingFunction" + k] ? transition["timingFunction" + k] :
                    (transition.timingFunction ? transition.timingFunction : "linear")
            });
        }
    }
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
    transition(element, customTransitionProperties, out = false) {
        let i = out ? 1 : 0;
        let k = out ? "Out" : "In";
        let list = (element instanceof TurboElement) ||
            (element instanceof HTMLElement) ? [element] : element;
        list.forEach(el => {
            el.style.transitionProperty = customTransitionProperties.property ? customTransitionProperties.property :
                this.transitionProperties[i].property;
            el.style.transitionDuration = (customTransitionProperties["duration" + k] ? customTransitionProperties["duration" + k] :
                (customTransitionProperties.duration ? customTransitionProperties.duration :
                    this.transitionProperties[i].duration)) + "s";
            el.style.transitionDelay = (customTransitionProperties["delay" + k] ? customTransitionProperties["delay" + k] :
                (customTransitionProperties.delay ? customTransitionProperties.delay :
                    this.transitionProperties[i].delay)) + "s";
            el.style.transitionTimingFunction = (customTransitionProperties["timingFunction" + k] ?
                customTransitionProperties["timingFunction" + k] : (customTransitionProperties.timingFunction ?
                customTransitionProperties.timingFunction : this.transitionProperties[i].timingFunction));
        });
    }
    /**
     * @function transitionIn
     * @description A function to apply the transition in on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    transitionIn(element, customTransitionProperties) {
        this.transition(element, customTransitionProperties, false);
    }
    /**
     * @function transitionOut
     * @description A function to apply the transition out on the provided TurboElement(s) or HTMLElement(s)
     *
     * @param {TurboElement | HTMLElement | TurboElement[] | HTMLElement[]} element - A TurboElement or HTMLElement,
     * or a list of the latter, to which the transition will be applied.
     * @param {TransitionProperties} customTransitionProperties - Custom transition properties (if any) to apply to this
     * instance of the transition only.
     */
    transitionOut(element, customTransitionProperties) {
        this.transition(element, customTransitionProperties, true);
    }
    /**
     * @function update
     * @description Function to update certain (or every) properties of the current Transition.
     * @param {TransitionProperties} changedProperties - The updated transition properties
     */
    update(changedProperties) {
        if (changedProperties.property) {
            this.transitionProperties[0].property = changedProperties.property;
            this.transitionProperties[1].property = changedProperties.property;
        }
        if (changedProperties.durationIn)
            this.transitionProperties[0].duration = changedProperties.durationIn;
        else if (changedProperties.duration)
            this.transitionProperties[0].duration = changedProperties.duration;
        if (changedProperties.durationOut)
            this.transitionProperties[1].duration = changedProperties.durationOut;
        else if (changedProperties.duration)
            this.transitionProperties[1].duration = changedProperties.duration;
        if (changedProperties.delayIn)
            this.transitionProperties[0].delay = changedProperties.delayIn;
        else if (changedProperties.delay)
            this.transitionProperties[0].delay = changedProperties.delay;
        if (changedProperties.delayOut)
            this.transitionProperties[1].delay = changedProperties.delayOut;
        else if (changedProperties.delay)
            this.transitionProperties[1].delay = changedProperties.delay;
        if (changedProperties.timingFunctionIn)
            this.transitionProperties[0].timingFunction = changedProperties.timingFunctionIn;
        else if (changedProperties.timingFunction)
            this.transitionProperties[0].timingFunction = changedProperties.timingFunction;
        if (changedProperties.timingFunctionOut)
            this.transitionProperties[1].timingFunction = changedProperties.timingFunctionOut;
        else if (changedProperties.timingFunction)
            this.transitionProperties[1].timingFunction = changedProperties.timingFunction;
    }
}

export { ActionMode, ClickMode, Delegate, EventManager, InputDevice, MathMLNamespace, MathMLTagsDefinitions, Point, SvgCache, SvgNamespace, SvgTagsDefinitions, Transition, TurboButton, TurboDragEvent, TurboDropdown, TurboDropdownEntry, TurboElement, TurboEvent, TurboEventName, TurboIcon, TurboIconToggle, TurboKeyEvent, TurboMap, TurboPopup, TurboWheelEvent, a, addChild, addChildBefore, addClass, addListener, bestOverlayColor, blindElement, button, camelToKebabCase, canvas, childHandler, closest, closestRoot, contrast, css, define, div, dropdown, dropdownEntry, element, fetchSvg, flexCol, flexColCenter, flexRow, flexRowCenter, form, generateTagFunction, getFileExtension, h1, h2, h3, h4, h5, h6, icon, iconToggle, img, input, isMathMLTag, isSvgTag, kebabToCamelCase, link, loadLocalFont, luminance, observe, p, popup, removeAllChildren, removeChild, removeClass, setProperties, spacer, style, stylesheet, textToElement, textarea, toggleClass, turbofy, video };
