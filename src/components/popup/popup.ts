import {TurboElement} from "../../core/turbo-element";
import {TurboProperties} from "../../core/definitions/turbo-types";
import "./popup.css";

class TurboPopup extends TurboElement {
    public viewportMargin: number = 0;
    public offsetFromParent: number = 0;

    constructor(properties: TurboProperties = {}) {
        super(properties);
        this.addListeners();
        this.show(false);
    }

    private addListeners() {
        document.addEventListener("scroll", () => this.show(false));
        document.addEventListener("click", e => {
            if (this.isShown && !this.contains(e.target as Node)) this.show(false);
        });
    }

    private recomputePosition() {
        const rect = this.getBoundingClientRect();
        const parentRect = this.parentElement.getBoundingClientRect();

        const computedStyle = window.getComputedStyle(this);
        const parentComputedStyle = window.getComputedStyle(this.parentElement);

        const top = this.recomputeTop(rect, parentRect);
        const left = this.recomputeLeft(rect, parentRect);

        this.recomputeMaxHeight(top, computedStyle, parentComputedStyle);
        this.recomputeMaxWidth(left, computedStyle, parentComputedStyle);
    }

    private recomputeTop(rect: DOMRect, parentRect: DOMRect): number {
        let top: number;

        const popupHeightWithMargins = rect.height + this.offsetFromParent + this.viewportMargin;

        if (window.innerHeight - parentRect.bottom >= popupHeightWithMargins) top = parentRect.bottom;
        else if (parentRect.top >= popupHeightWithMargins) top = parentRect.top - rect.height;
        else top = parentRect.bottom;

        this.setStyle("top", top + "px");
        return top;
    }

    private recomputeLeft(rect: DOMRect, parentRect: DOMRect): number {
        let left = parentRect.left + (parentRect.width / 2) - (rect.width / 2);

        if (left < this.viewportMargin) left = 0;
        else if (left + rect.width > window.innerWidth - this.viewportMargin)
            left = window.innerWidth - rect.width;

        this.setStyle("left", left + "px");
        return left;
    }

    private recomputeMaxHeight(top: number, computedStyle: CSSStyleDeclaration, parentComputedStyle: CSSStyleDeclaration) {
        const maxHeight = window.innerHeight - top - this.viewportMargin
            - parseFloat(computedStyle.marginBottom) - parseFloat(computedStyle.marginTop)
            - parseFloat(parentComputedStyle.marginBottom) - parseFloat(parentComputedStyle.marginTop);

        if (computedStyle.maxHeight && parseFloat(computedStyle.maxHeight) <= maxHeight) return;
        this.setStyle("maxHeight", maxHeight + "px");
    }

    private recomputeMaxWidth(left: number, computedStyle: CSSStyleDeclaration, parentComputedStyle: CSSStyleDeclaration) {
        const maxWidth = window.innerWidth - left - this.viewportMargin
            - parseFloat(computedStyle.marginLeft) - parseFloat(computedStyle.marginRight)
            - parseFloat(parentComputedStyle.marginLeft) - parseFloat(parentComputedStyle.marginRight);

        if (computedStyle.maxWidth && parseFloat(computedStyle.maxWidth) <= maxWidth) return;
        this.setStyle("maxWidth", maxWidth + "px");
    }

    private clearMaxDimensions() {
        this.setStyle("maxHeight", "");
        this.setStyle("maxWidth", "");
    }

    public get isShown(): boolean {
        return this.style.display != "none";
    }

    public show(b: boolean): this {
        if (this.isShown == b) return this;
        this.setStyle("display", b ? "" : "none");
        if (b) requestAnimationFrame(() => this.recomputePosition());
        else this.clearMaxDimensions();
        return this;
    }

    public toggle(): this {
        return this.show(!this.isShown);
    }
}

customElements.define("turbo-popup", TurboPopup);

function popup(properties: TurboProperties = {}): TurboPopup {
    return new TurboPopup(properties);
}

export {TurboPopup, popup};