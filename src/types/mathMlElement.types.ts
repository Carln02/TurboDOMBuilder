
/**
 * @group Types
 * @category MathML Element
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type MathMLTag<Tag extends keyof MathMLElementTagNameMap = keyof MathMLElementTagNameMap> = Tag;

/**
 * @group Types
 * @category MathML Element
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidMathMLElement<Tag extends MathMLTag = MathMLTag> = MathMLElementTagNameMap[Tag] extends
    MathMLElement ? MathMLElementTagNameMap[Tag] : MathMLElement;

/**
 * @group Types
 * @category MathML Element
 * @description URL to the MathML namespace.
 */
const MathMLNamespace = "http://www.w3.org/1998/Math/MathML";

/**
 * @group Types
 * @category MathML Element
 * @description Set of Valid MathML tags.
 */
const MathMLTags = new Set<MathMLTag>([
    "annotation","annotation-xml","maction","math","merror","mfrac","mi","mmultiscripts","mn","mo",
    "mover","mpadded","mphantom","mprescripts","mroot","mrow","ms","mspace","msqrt","mstyle","msub",
    "msubsup","msup","mtable","mtd","mtext","mtr","munder","munderover","semantics",
]);

declare global {
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

export {MathMLTag, ValidMathMLElement, MathMLNamespace, MathMLTags};