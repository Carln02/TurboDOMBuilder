import { MathMLTag, SVGTag } from "../core.types";
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
export { SvgNamespace, MathMLNamespace, SvgTagsDefinitions, MathMLTagsDefinitions, isSvgTag, isMathMLTag };
