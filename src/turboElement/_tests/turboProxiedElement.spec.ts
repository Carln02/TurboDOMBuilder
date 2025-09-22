import {describe, it, expect} from "vitest";
import {TurboProxiedElement} from "../turboProxiedElement/turboProxiedElement";
import {div} from "../../elementCreation/basicElements";

class TE extends TurboProxiedElement<"div"> {
}

describe("TurboProxiedElement: selected toggling", () => {
    it("adds/removes the default selected class on the wrapped element", () => {
        const p = new TE({tag: "div"});
        document.body.appendChild(p.element);

        p.selected = true;
        expect(p.element.classList.contains("selected")).toBe(true);

        p.selected = false;
        expect(p.element.classList.contains("selected")).toBe(false);
    });

    it("plays nice when element is created via helper (div()) and then proxied", () => {
        const host = div({id: "h"});
        document.body.appendChild(host);

        const p = new (class extends TurboProxiedElement<"div"> {})({tag: "div"});
        document.body.appendChild(p.element);

        p.selected = true;
        expect(p.element.classList.contains("selected")).toBe(true);
        expect(host.classList.contains("selected")).toBe(false);
    });
});