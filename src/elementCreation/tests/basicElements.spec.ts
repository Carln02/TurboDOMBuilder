import {describe, it, expect, beforeEach, vi} from "vitest";
import {
    generateTagFunction, a, canvas, div, form, h1, h2, h3, h4, h5, h6, img, input, link, p, span, style, textarea, video
} from "../basicElements";
import {TurboSelector} from "../../turboFunctions/turboFunctions";

function isHtmlNS(ns?: string | null) {
    return !!ns && /1999\/xhtml$/.test(ns);
}

beforeEach(() => document.body.innerHTML = "");

describe("HTML tag helpers", () => {
    it("each helper creates the right HTML tag and calls setProperties", () => {
        const cases: Array<[fn: Function, expectedTag: string, name: string]> = [
            [a, "a", "a"],
            [canvas, "canvas", "canvas"],
            [div, "div", "div"],
            [form, "form", "form"],
            [h1, "h1", "h1"],
            [h2, "h2", "h2"],
            [h3, "h3", "h3"],
            [h4, "h4", "h4"],
            [h5, "h5", "h5"],
            [h6, "h6", "h6"],
            [img, "img", "img"],
            [input, "input", "input"],
            [link, "link", "link"],
            [p, "p", "p"],
            [span, "span", "span"],
            [style, "style", "style"],
            [textarea, "textarea", "textarea"],
            [video, "video", "video"],
        ];

        const spy = vi.spyOn(TurboSelector.prototype as any, "setProperties");

        for (const [fn, expectedTag, name] of cases) {
            const props: any = {id: `#${name}`, className: "x"};
            const el = fn(props);

            expect(el.tagName.toLowerCase()).toBe(expectedTag);
            expect(isHtmlNS(el.namespaceURI)).toBe(true);
            expect(spy).toHaveBeenCalledWith(expect.objectContaining({id: `#${name}`}));
        }

        spy.mockRestore();
    });
});

describe("generateTagFunction", () => {
    it("returns a factory that always sets the requested tag", () => {
        const makeSection = generateTagFunction("section" as any);
        const props: any = {id: "foo", tag: "div"};

        const el = makeSection(props);
        expect(el.tagName.toLowerCase()).toBe("section");
        expect(isHtmlNS(el.namespaceURI)).toBe(true);
        expect(props.tag).toBe("section");
    });

    it("calls setProperties with the provided props (including overridden tag)", () => {
        const spy = vi.spyOn(TurboSelector.prototype as any, "setProperties");
        const makeP = generateTagFunction("p" as any);
        const props: any = {className: "para"};

        const el = makeP(props);
        expect(el.tagName.toLowerCase()).toBe("p");
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy.mock.calls[0][0]).toEqual(expect.objectContaining({className: "para", tag: "p"}));
        spy.mockRestore();
    });
});
