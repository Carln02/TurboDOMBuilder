const SvgNamespace = "http://www.w3.org/2000/svg";

const SvgTagsDefinitions: Record<any, any> = {
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
function isSvgTag(tag?: string): boolean {
    return Object.keys(SvgTagsDefinitions).includes(tag) || tag?.startsWith("svg");
}

export {SvgNamespace, SvgTagsDefinitions, isSvgTag};