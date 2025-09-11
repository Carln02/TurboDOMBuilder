import {describe, it, expect, beforeEach, vi} from "vitest";
import {TurboSelector} from "../../turboFunctions/turboFunctions";
import {MathMLNamespace, SvgNamespace} from "../namespaceIdentification";
import {blindElement} from "../element";

beforeEach(() => { document.body.innerHTML = ""; });

describe("blindElement(properties)", () => {
    it("creates HTML element when tag is a regular HTML tag", () => {
        const el = blindElement({tag: "div"} as any);
        expect(el.tagName.toLowerCase()).toBe("div");
        expect(el.namespaceURI).toMatch(/1999\/xhtml$/);
    });

    it("creates <svg> in SVG namespace when tag='svg'", () => {
        const el = blindElement({tag: "svg"} as any);
        expect(el.namespaceURI).toBe(SvgNamespace);
        expect(el.localName).toBe("svg");
    });

    it("creates SVG child element (e.g., 'path') in SVG namespace", () => {
        const el = blindElement({tag: "path"} as any);
        expect(el.namespaceURI).toBe(SvgNamespace);
        expect(el.localName).toBe("path");
    });

    it("creates MathML root when tag='math'", () => {
        const el = blindElement({tag: "math"} as any);
        expect(el.namespaceURI).toBe(MathMLNamespace);
        expect(el.localName).toBe("math");
    });

    it("creates MathML child (e.g., 'mi') in MathML namespace", () => {
        const el = blindElement({tag: "mi"} as any);
        expect(el.namespaceURI).toBe(MathMLNamespace);
        expect(el.localName).toBe("mi");
    });

    it("attaches shadow root when shadowDOM=true", () => {
        const el = blindElement({tag: "div", shadowDOM: true} as any);
        expect(el.shadowRoot).toBeTruthy();
        expect(el.shadowRoot?.mode).toBe("open");
    });

    it("invokes $(el).setProperties(props) with provided object", () => {
        const spy = vi.spyOn(TurboSelector.prototype as any, "setProperties");
        const props = {tag: "div", classes: "x", dataset: {k: "v"}} as any;

        const el = blindElement(props);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(props);
        expect(el.tagName.toLowerCase()).toBe("div");

        spy.mockRestore();
    });
});