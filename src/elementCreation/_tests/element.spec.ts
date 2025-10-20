import {describe, it, expect, vi} from "vitest";
import {TurboSelector} from "../../turboFunctions/turboSelector";
import {element} from "../element";
import {MathMLNamespace, SvgNamespace} from "../namespaceIdentification";

describe("element(properties)", () => {
    it("defaults to <div> in HTML namespace when no props", () => {
        const el = element();
        expect(el.tagName.toLowerCase()).toBe("div");
        expect(el.namespaceURI).toMatch(/1999\/xhtml$/); // jsdom HTML namespace
    });

    it("respects properties.tag for HTML", () => {
        const el = element({tag: "span"} as any);
        expect(el.tagName.toLowerCase()).toBe("span");
        expect(el.namespaceURI).toMatch(/1999\/xhtml$/);
    });

    it("creates SVG in the SVG namespace when namespace='svg' (default tag svg)", () => {
        const el = element({namespace: "svg"} as any);
        expect(el.namespaceURI).toBe(SvgNamespace);
        expect(el.localName).toBe("svg");
    });

    it("creates SVG element for provided tag under namespace='svg'", () => {
        const el = element({namespace: "svg", tag: "path"} as any);
        expect(el.namespaceURI).toBe(SvgNamespace);
        expect(el.localName).toBe("path");
    });

    it("creates MathML element with namespace='mathML'", () => {
        const el = element({namespace: "mathML", tag: "math"} as any);
        expect(el.namespaceURI).toBe(MathMLNamespace);
        expect(el.localName).toBe("math");
    });

    it("creates element in a custom namespace", () => {
        const ns = "http://example.com/ns";
        const el = element({namespace: ns, tag: "x-foo"} as any);
        expect(el.namespaceURI).toBe(ns);
        expect(el.localName).toBe("x-foo");
    });

    it("attaches open shadow DOM when shadowDOM=true", () => {
        const el = element({shadowDOM: true} as any);
        expect(el.shadowRoot).toBeTruthy();
        expect(el.shadowRoot?.mode).toBe("open");
    });

    it("invokes $(el).setProperties(props) with the object provided", () => {
        const spy = vi.spyOn(TurboSelector.prototype as any, "setProperties");
        const props = {tag: "section", id: "hello", dataset: {a: "1"}} as any;

        const el = element(props);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(props);
        expect(el.tagName.toLowerCase()).toBe("section");

        spy.mockRestore();
    });
});