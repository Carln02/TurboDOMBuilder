import {describe, it, expect, vi} from 'vitest';
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";

describe("on/onTool & has/remove APIs", () => {
    it("onTool registers a listener and hasToolListener sees it", () => {
        const node = div({id: "a"});
        const spy = vi.fn();

        $(node).onTool("click", "brush", spy);
        expect($(node).hasToolListener("click", "brush", spy)).toBe(true);
        expect($(node).hasToolListener("click", "eraser", spy)).toBe(false);
    });

    it("on registers generic listener and hasListener sees it", () => {
        const node = div({id: "b"});
        const spy = vi.fn();

        $(node).on("click", spy, {});
        expect($(node).hasListener("click", spy)).toBe(true);
    });

    it("removeToolListener and removeListener work", () => {
        const node = div({id: "c"});
        const s1 = vi.fn();
        const s2 = vi.fn();

        $(node).onTool("click", "brush", s1);
        $(node).on("click", s2);

        $(node).removeToolListener("click", "brush", s1);
        expect($(node).hasToolListener("click", "brush", s1)).toBe(false);

        $(node).removeListener("click", s2);
        expect($(node).hasListener("click", s2)).toBe(false);
    });

    it("removeListenersByType removes all listeners for type/tool", () => {
        const node = div({id: "d"});
        const s1 = vi.fn();
        const s2 = vi.fn();

        $(node).onTool("click", "brush", s1);
        $(node).onTool("click", 'brush', s2);

        $(node).removeListenersByType("click", "brush");
        expect($(node).hasListenersByType("click", "brush")).toBe(false);
    });
});
