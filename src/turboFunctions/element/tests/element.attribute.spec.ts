import {describe, expect, it} from "vitest";
import {$} from "../../turboFunctions";

describe("setAttribute/removeAttribute", () => {
    it("sets/removes attributes on the underlying element", () => {
        const el = document.createElement("div");
        const sel = $(el);

        sel.setAttribute("data-k", "v");
        expect(el.getAttribute("data-k")).toBe("v");

        sel.setAttribute("hidden", undefined);
        expect(el.getAttribute("hidden")).toBe("true");

        sel.removeAttribute("hidden");
        expect(el.hasAttribute("hidden")).toBe(false);
    });
});