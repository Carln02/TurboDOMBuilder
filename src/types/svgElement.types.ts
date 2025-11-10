/**
 * @group Types
 * @category SVG Element
 */
type SVGTagMap = Omit<SVGElementTagNameMap, "style">;

/**
 * @group Types
 * @category SVG Element
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type SVGTag<Tag extends keyof SVGElementTagNameMap = keyof SVGElementTagNameMap> = Tag;

/**
 * @group Types
 * @category SVG Element
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidSVGElement<Tag extends SVGTag = SVGTag> = SVGElementTagNameMap[Tag] extends
    SVGElement ? SVGElementTagNameMap[Tag] : SVGElement;

/**
 * @group Types
 * @category SVG Element
 * @description URL to the SVG namespace.
 */
const SvgNamespace = "http://www.w3.org/2000/svg";

/**
 * @group Types
 * @category SVG Element
 * @description Set of Valid SVG tags.
 */
const SvgTags = new Set<SVGTag>([
    "a","animate","animateMotion","animateTransform","circle","clipPath","defs","desc","ellipse",
    "feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting",
    "feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR",
    "feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight",
    "feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image",
    "line","linearGradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline",
    "radialGradient","rect","script","set","stop","style","svg","switch","symbol","text","textPath",
    "title","tspan","use","view",
]);

declare global {
    interface SVGElement extends Element {}
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
}

export {SVGTag, SVGTagMap, ValidSVGElement, SvgNamespace, SvgTags};