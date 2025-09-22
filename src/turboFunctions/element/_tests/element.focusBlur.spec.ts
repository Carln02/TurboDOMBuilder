import {describe, expect, it, vi} from "vitest";
import {$} from "../../turboFunctions";

describe("focus/blur", () => {
    it("calls the element's focus/blur when HTMLElement", () => {
        const el = document.createElement("button");
        el.tabIndex = 0; // make it focusable in jsdom

        const fSpy = vi.spyOn(el, "focus");
        const bSpy = vi.spyOn(el, "blur");

        const sel = $(el);
        sel.focus();
        sel.blur();

        expect(fSpy).toHaveBeenCalledTimes(1);
        expect(bSpy).toHaveBeenCalledTimes(1);

        fSpy.mockRestore();
        bSpy.mockRestore();
    });

    it("no-ops for non-HTMLElement nodes", () => {
        const text = document.createTextNode("x");
        const sel = $(text) as any;

        expect(() => sel.focus()).not.toThrow();
        expect(() => sel.blur()).not.toThrow();
    });
});