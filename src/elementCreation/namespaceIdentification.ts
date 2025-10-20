import {MathMLTag, SVGTag} from "../core.types";

const SvgNamespace = "http://www.w3.org/2000/svg";
const MathMLNamespace = "http://www.w3.org/1998/Math/MathML";

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

const MathMLTags = new Set<MathMLTag>([
    "annotation","annotation-xml","maction","math","merror","mfrac","mi","mmultiscripts","mn","mo",
    "mover","mpadded","mphantom","mprescripts","mroot","mrow","ms","mspace","msqrt","mstyle","msub",
    "msubsup","msup","mtable","mtd","mtext","mtr","munder","munderover","semantics",
]);

/**
 * @description Evaluates whether the provided string is an SVG tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the SVG namespace or not.
 */
function isSvgTag(tag?: string): boolean {
    return SvgTags.has(tag as any) || tag?.startsWith("svg");
}

/**
 * @description Evaluates whether the provided string is a MathML tag.
 * @param {string} [tag] - The string to evaluate
 * @return A boolean indicating whether the tag is in the MathML namespace or not.
 */
function isMathMLTag(tag?: string): boolean {
    return MathMLTags.has(tag as any) || tag?.startsWith("math");
}

export {SvgNamespace, MathMLNamespace, SvgTags, MathMLTags, isSvgTag, isMathMLTag};