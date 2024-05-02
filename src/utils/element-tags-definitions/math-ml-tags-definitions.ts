const MathMLNamespace = "http://www.w3.org/1998/Math/MathML";

const MathMlTagsDefinitions: Record<any, any> = {
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
function isMathMLTag(tag?: string): boolean {
    return Object.keys(MathMlTagsDefinitions).includes(tag) || tag?.startsWith("math");
}

export {MathMLNamespace, MathMlTagsDefinitions, isMathMLTag};