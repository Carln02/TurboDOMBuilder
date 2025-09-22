import {describe, it, expect, vi} from "vitest";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";

describe("Style: setStyles", () => {
    it("applies multiple properties in a single deferred batch", () => {
        const el = div({parent: document.body});

        vi.useFakeTimers();
        $(el).setStyles({opacity: "0.5", width: "123px"});
        expect(el.style.opacity).toBe("");
        expect(el.style.width).toBe("");

        vi.runAllTimers();
        expect(el.style.opacity).toBe("0.5");
        expect(el.style.width).toBe("123px");
        vi.useRealTimers();
    });

    it("should parse a CSS string and apply entries", () => {
        const el = document.createElement("div");
        document.body.appendChild(el);

        vi.useFakeTimers();
        $(el).setStyles("color: red; width: 10px;");
        vi.runAllTimers();

        expect(el.style.color).toBe("red");
        expect(el.style.width).toBe("10px");
        vi.useRealTimers();
    });

    it("is a no-op on non-HTMLElement/SVGElement nodes", () => {
        const text = document.createTextNode("x");
        const sel = $(text).setStyles({opacity: "0.2"});
        expect(sel.element).toBe(text);
    });
});
