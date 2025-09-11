import { describe, it, expect, vi, beforeEach } from 'vitest';
import {$} from "../../turboFunctions";
import {ManagerStub} from "../../../setup.vitest";
import {div} from "../../../elementCreation/basicElements";

beforeEach(() => document.body.innerHTML = '');

describe("on/onTool & has/remove APIs", () => {
    it("onTool registers a listener and hasToolListener sees it", () => {
        const mgr = new ManagerStub() as any;
        const node = div({id: "a"});
        const spy = vi.fn();

        $(node).onTool("click", "brush", spy, undefined, mgr);
        expect($(node).hasToolListener("click", "brush", spy, mgr)).toBe(true);
        expect($(node).hasToolListener("click", "eraser", spy, mgr)).toBe(false);
    });

    it("on registers generic listener and hasListener sees it", () => {
        const mgr = new ManagerStub() as any;
        const node = div({id: "b"});
        const spy = vi.fn();

        $(node).on("click", spy, {}, mgr);
        expect($(node).hasListener("click", spy, mgr)).toBe(true);
    });

    it("removeToolListener and removeListener work", () => {
        const mgr = new ManagerStub() as any;
        const node = div({id: "c"});
        const s1 = vi.fn();
        const s2 = vi.fn();

        $(node).onTool("click", "brush", s1, undefined, mgr);
        $(node).on("click", s2, undefined, mgr);

        $(node).removeToolListener("click", "brush", s1, mgr);
        expect($(node).hasToolListener("click", "brush", s1, mgr)).toBe(false);

        $(node).removeListener("click", s2, mgr);
        expect($(node).hasListener("click", s2, mgr)).toBe(false);
    });

    it("removeListenersByType removes all listeners for type/tool", () => {
        const mgr = new ManagerStub() as any;
        const node = div({id: "d"});
        const s1 = vi.fn();
        const s2 = vi.fn();

        $(node).onTool("click", "brush", s1, {}, mgr);
        $(node).onTool("click", 'brush', s2, {}, mgr);

        $(node).removeListenersByType("click", "brush", mgr);
        expect($(node).hasListenersByType("click", "brush", mgr)).toBe(false);
    });
});
