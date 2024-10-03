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
export { PartialRecord, SVGTagMap, ElementTagMap, ValidTag, ValidElement, ValidNode, HTMLTag, ValidHTMLElement, SVGTag, ValidSVGElement, MathMLTag, ValidMathMLElement };
