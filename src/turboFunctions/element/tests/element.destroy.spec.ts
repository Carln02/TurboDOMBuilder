import {describe, expect, it, vi} from "vitest";
import {$, TurboSelector} from "../../turboFunctions";

describe("destroy()", () => {
    it("removes all listeners then detaches the node", () => {
        const el = document.createElement("button");
        document.body.appendChild(el);

        const sel = $(el);
        const h = vi.fn();
        sel.on("click", h as any);

        const spy = vi.spyOn(TurboSelector.prototype as any, "removeAllListeners");
        sel.destroy();

        expect(spy).toHaveBeenCalledTimes(1);
        expect(document.body.contains(el)).toBe(false);
        spy.mockRestore();
    });
});