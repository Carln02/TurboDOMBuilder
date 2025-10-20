import {describe, expect, it, vi} from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {$} from "../../turboFunctions";

describe("Style: setStyle (instant & deferred)", () => {
    it("sets style instantly when instant=true", () => {
        const el = div({parent: document.body});
        $(el).setStyle("opacity", 0.4, true);
        expect(el.style.opacity).toBe("0.4");
    });

    it("defers style until next animation frame when instant=false", () => {
        const el = div({parent: document.body});

        vi.useFakeTimers();
        $(el).setStyle("opacity", "0.7");
        expect(el.style.opacity).toBe("");

        vi.runAllTimers();
        expect(el.style.opacity).toBe("0.7");
        vi.useRealTimers();
    });
});