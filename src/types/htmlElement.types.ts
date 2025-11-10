/**
 * @group Types
 * @category Element
 * @description Ensures that only valid tags are used, i.e., those that map to elements.
 */
type HTMLTag<Tag extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> = Tag;

/**
 * @group Types
 * @category Element
 * @description Ensures that only valid elements are used, i.e., those that extend Element.
 */
type ValidHTMLElement<Tag extends HTMLTag = HTMLTag> = HTMLElementTagNameMap[Tag] extends
    HTMLElement ? HTMLElementTagNameMap[Tag] : HTMLElement;

declare global {
    interface HTMLElement extends Element {}
    interface TurboElement extends HTMLElement {}

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
}

export {HTMLTag, ValidHTMLElement};