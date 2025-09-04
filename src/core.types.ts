type PartialRecord<Property extends keyof any, Value> = { [P in Property]?: Value };

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
type ValidElement<Tag extends ValidTag = ValidTag> = Tag extends HTMLTag ? ValidHTMLElement<Tag>
    : (Tag extends SVGTag ? ValidSVGElement<Tag>
        : (Tag extends MathMLTag ? ValidMathMLElement<Tag>
            : (ElementTagMap[Tag] extends Element ? ElementTagMap[Tag]
                : Element)));

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
type ValidHTMLElement<Tag extends HTMLTag = HTMLTag> = HTMLElementTagNameMap[Tag] extends
    HTMLElement ? HTMLElementTagNameMap[Tag] : HTMLElement;

/**
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type SVGTag<Tag extends keyof SVGElementTagNameMap = keyof SVGElementTagNameMap> = Tag;

/**
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidSVGElement<Tag extends SVGTag = SVGTag> = SVGElementTagNameMap[Tag] extends
    SVGElement ? SVGElementTagNameMap[Tag] : SVGElement;

/**
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type MathMLTag<Tag extends keyof MathMLElementTagNameMap = keyof MathMLElementTagNameMap> = Tag;

/**
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidMathMLElement<Tag extends MathMLTag = MathMLTag> = MathMLElementTagNameMap[Tag] extends
    MathMLElement ? MathMLElementTagNameMap[Tag] : MathMLElement;

declare global {
    //Document interfaces
    interface Document extends Node {}
    interface DocumentFragment extends Node {}
    interface HTMLDocument extends Document {}
    interface XMLDocument extends Document {}

    //CharacterData interfaces
    interface CharacterData extends Node {}
    interface Text extends CharacterData {}
    interface Comment extends CharacterData {}
    interface CDATASection extends CharacterData {}

    //Element interfaces
    interface Element extends Node {}
    interface HTMLElement extends Element {}
    interface SVGElement extends Element {}
    interface MathMLElement extends Element {}
    interface TurboElement extends HTMLElement {}
    interface ShadowRoot extends Element {}

    //Other interfaces
    interface ChildNode extends Node {}
    interface ParentNode extends Node {}
    interface ProcessingInstruction extends Node {}
    interface DocumentType extends Node {}

    //Deprecated interfaces
    interface EntityReference extends Node {}
    interface Entity extends Node {}
    interface Notation extends Node {}

    //HTML Elements
    interface HTMLAnchorElement extends HTMLElement {}
    interface HTMLAreaElement extends HTMLElement {}
    interface HTMLAudioElement extends HTMLElement {}
    interface HTMLBaseElement extends HTMLElement {}
    interface HTMLQuoteElement extends HTMLElement {}
    interface HTMLBodyElement extends HTMLElement {}
    interface HTMLBRElement extends HTMLElement {}
    interface HTMLButtonElement extends HTMLElement {}
    interface HTMLCanvasElement extends HTMLElement {}
    interface HTMLTableCaptionElement extends HTMLElement {}
    interface HTMLTableColElement extends HTMLElement {}
    interface HTMLDataElement extends HTMLElement {}
    interface HTMLDataListElement extends HTMLElement {}
    interface HTMLModElement extends HTMLElement {}
    interface HTMLDetailsElement extends HTMLElement {}
    interface HTMLDialogElement extends HTMLElement {}
    interface HTMLDivElement extends HTMLElement {}
    interface HTMLDListElement extends HTMLElement {}
    interface HTMLEmbedElement extends HTMLElement {}
    interface HTMLFieldSetElement extends HTMLElement {}
    interface HTMLFormElement extends HTMLElement {}
    interface HTMLHeadingElement extends HTMLElement {}
    interface HTMLHeadElement extends HTMLElement {}
    interface HTMLHRElement extends HTMLElement {}
    interface HTMLHtmlElement extends HTMLElement {}
    interface HTMLIFrameElement extends HTMLElement {}
    interface HTMLImageElement extends HTMLElement {}
    interface HTMLInputElement extends HTMLElement {}
    interface HTMLLabelElement extends HTMLElement {}
    interface HTMLLegendElement extends HTMLElement {}
    interface HTMLLIElement extends HTMLElement {}
    interface HTMLLinkElement extends HTMLElement {}
    interface HTMLMapElement extends HTMLElement {}
    interface HTMLMenuElement extends HTMLElement {}
    interface HTMLMetaElement extends HTMLElement {}
    interface HTMLMeterElement extends HTMLElement {}
    interface HTMLObjectElement extends HTMLElement {}
    interface HTMLOListElement extends HTMLElement {}
    interface HTMLOptGroupElement extends HTMLElement {}
    interface HTMLOptionElement extends HTMLElement {}
    interface HTMLOutputElement extends HTMLElement {}
    interface HTMLParagraphElement extends HTMLElement {}
    interface HTMLPictureElement extends HTMLElement {}
    interface HTMLPreElement extends HTMLElement {}
    interface HTMLProgressElement extends HTMLElement {}
    interface HTMLQuoteElement extends HTMLElement {}
    interface HTMLScriptElement extends HTMLElement {}
    interface HTMLSelectElement extends HTMLElement {}
    interface HTMLSlotElement extends HTMLElement {}
    interface HTMLSourceElement extends HTMLElement {}
    interface HTMLSpanElement extends HTMLElement {}
    interface HTMLStyleElement extends HTMLElement {}
    interface HTMLTableElement extends HTMLElement {}
    interface HTMLTableSectionElement extends HTMLElement {}
    interface HTMLTableCellElement extends HTMLElement {}
    interface HTMLTemplateElement extends HTMLElement {}
    interface HTMLTextAreaElement extends HTMLElement {}
    interface HTMLTableSectionElement extends HTMLElement {}
    interface HTMLTimeElement extends HTMLElement {}
    interface HTMLTitleElement extends HTMLElement {}
    interface HTMLTableRowElement extends HTMLElement {}
    interface HTMLTrackElement extends HTMLElement {}
    interface HTMLUListElement extends HTMLElement {}
    interface HTMLVideoElement extends HTMLElement {}

    //Deprecated HTML Elements
    interface HTMLAppletElement extends HTMLElement {}
    interface HTMLFrameElement extends HTMLElement {}
    interface HTMLFrameSetElement extends HTMLElement {}
    interface HTMLMarqueeElement extends HTMLElement {}

    //SVG Elements
    interface SVGSVGElement extends SVGElement {}
    interface SVGCircleElement extends SVGElement {}
    interface SVGEllipseElement extends SVGElement {}
    interface SVGLineElement extends SVGElement {}
    interface SVGPathElement extends SVGElement {}
    interface SVGPolygonElement extends SVGElement {}
    interface SVGPolylineElement extends SVGElement {}
    interface SVGRectElement extends SVGElement {}
    interface SVGTextElement extends SVGElement {}
    interface SVGUseElement extends SVGElement {}
    interface SVGImageElement extends SVGElement {}
    interface SVGAElement extends SVGElement {}
    interface SVGDefsElement extends SVGElement {}
    interface SVGGradientElement extends SVGElement {}
    interface SVGSymbolElement extends SVGElement {}
    interface SVGMarkerElement extends SVGElement {}
    interface SVGClipPathElement extends SVGElement {}
    interface SVGMPathElement extends SVGElement {}
    interface SVGMaskElement extends SVGElement {}
    interface SVGMetadataElement extends SVGElement {}
    interface SVGPatternElement extends SVGElement {}
    interface SVGStopElement extends SVGElement {}
    interface SVGSwitchElement extends SVGElement {}
    interface SVGViewElement extends SVGElement {}
    interface SVGDescElement extends SVGElement {}
    interface SVGForeignObjectElement extends SVGElement {}
    interface SVGTitleElement extends SVGElement {}
    interface SVGScriptElement extends SVGElement {}
    interface SVGStyleElement extends SVGElement {}
    interface SVGFontElement extends SVGElement {}
    interface SVGFontFaceElement extends SVGElement {}
    interface SVGGElement extends SVGElement {}
    interface SVGSymbolElement extends SVGElement {}
    interface SVGTextPathElement extends SVGElement {}
    interface SVGTSpanElement extends SVGElement {}
    interface SVGAltGlyphElement extends SVGElement {}
    interface SVGAltGlyphDefElement extends SVGElement {}
    interface SVGAltGlyphItemElement extends SVGElement {}
    interface SVGGlyphElement extends SVGElement {}
    interface SVGMissingGlyphElement extends SVGElement {}
    interface SVGAnimateElement extends SVGElement {}
    interface SVGAnimateMotionElement extends SVGElement {}
    interface SVGAnimateTransformElement extends SVGElement {}
    interface SVGDiscardElement extends SVGElement {}
    interface SVGFEBlendElement extends SVGElement {}
    interface SVGFEColorMatrixElement extends SVGElement {}
    interface SVGFEComponentTransferElement extends SVGElement {}
    interface SVGFECompositeElement extends SVGElement {}
    interface SVGFEConvolveMatrixElement extends SVGElement {}
    interface SVGFEDiffuseLightingElement extends SVGElement {}
    interface SVGFEDisplacementMapElement extends SVGElement {}
    interface SVGFEDistantLightElement extends SVGElement {}
    interface SVGFEDropShadowElement extends SVGElement {}
    interface SVGFEFloodElement extends SVGElement {}
    interface SVGFEFuncAElement extends SVGElement {}
    interface SVGFEFuncBElement extends SVGElement {}
    interface SVGFEFuncGElement extends SVGElement {}
    interface SVGFEFuncRElement extends SVGElement {}
    interface SVGFEGaussianBlurElement extends SVGElement {}
    interface SVGFEImageElement extends SVGElement {}
    interface SVGFEMergeElement extends SVGElement {}
    interface SVGFEMergeNodeElement extends SVGElement {}
    interface SVGFEMorphologyElement extends SVGElement {}
    interface SVGFEOffsetElement extends SVGElement {}
    interface SVGFEPointLightElement extends SVGElement {}
    interface SVGFESpecularLightingElement extends SVGElement {}
    interface SVGFESpotLightElement extends SVGElement {}
    interface SVGFETileElement extends SVGElement {}
    interface SVGFETurbulenceElement extends SVGElement {}
    interface SVGFilterElement extends SVGElement {}
    interface SVGForeignObjectElement extends SVGElement {}
    interface SVGHatchElement extends SVGElement {}
    interface SVGHatchpathElement extends SVGElement {}
    interface SVGMeshElement extends SVGElement {}
    interface SVGMeshgradientElement extends SVGElement {}
    interface SVGMeshpatchElement extends SVGElement {}
    interface SVGMeshrowElement extends SVGElement {}
    interface SVGSolidcolorElement extends SVGElement {}
    interface SVGVKernElement extends SVGElement {}

    //MathML Elements
    interface MathMLElement extends Element {}
    interface MathMLMathElement extends MathMLElement {}
    interface MathMLAnnotationElement extends MathMLElement {}
    interface MathMLAnnotationXmlElement extends MathMLElement {}
    interface MathMLMencloseElement extends MathMLElement {}
    interface MathMLMerrorElement extends MathMLElement {}
    interface MathMLMfencedElement extends MathMLElement {}
    interface MathMLMfracElement extends MathMLElement {}
    interface MathMLMiElement extends MathMLElement {}
    interface MathMLMnElement extends MathMLElement {}
    interface MathMLMoElement extends MathMLElement {}
    interface MathMLMoverElement extends MathMLElement {}
    interface MathMLMunderElement extends MathMLElement {}
    interface MathMLMunderoverElement extends MathMLElement {}
    interface MathMLMsElement extends MathMLElement {}
    interface MathMLMsubElement extends MathMLElement {}
    interface MathMLMsupElement extends MathMLElement {}
    interface MathMLMsubsupElement extends MathMLElement {}
    interface MathMLMtableElement extends MathMLElement {}
    interface MathMLMtdElement extends MathMLElement {}
    interface MathMLMtrElement extends MathMLElement {}
    interface MathMLMtextElement extends MathMLElement {}
    interface MathMLMspaceElement extends MathMLElement {}
    interface MathMLMsqrtElement extends MathMLElement {}
    interface MathMLMrootElement extends MathMLElement {}
    interface MathMLMrowElement extends MathMLElement {}
    interface MathMLMstyleElement extends MathMLElement {}
    interface MathMLMtokenElement extends MathMLElement {}
    interface MathMLSemanticsElement extends MathMLElement {}
    interface MathMLNoneElement extends MathMLElement {}
}

export {
    PartialRecord,
    SVGTagMap,
    ElementTagMap,
    ValidTag,
    ValidElement,
    ValidNode,
    HTMLTag,
    ValidHTMLElement,
    SVGTag,
    ValidSVGElement,
    MathMLTag,
    ValidMathMLElement
};