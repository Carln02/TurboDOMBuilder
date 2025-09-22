import {describe, it, expect, vi, beforeEach} from "vitest";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";

describe("executeAction order + semantics", () => {
    beforeEach(() => $().clearToolBehaviors());

    it("1) custom (tool,event) wins", () => {
        const node = div({id: "obj"});
        const hit = vi.fn().mockReturnValue(true);

        $(node).onTool("click", "brush", hit);

        const consumed = $(node).executeAction("click", "brush", new Event("x"));
        expect(consumed).toBe(true);
        expect(hit).toHaveBeenCalledTimes(1);
    });

    it("2) tool defaults run on object when no custom", () => {
        const node2 = div({id: "obj2"});
        const def = vi.fn().mockReturnValue(true);

        $(node2).addToolBehavior("click", (ev, target) => def(ev, target), "brush");
        const consumed = $(node2).executeAction("click", "brush", new Event("x"));

        expect(consumed).toBe(true);
        expect(def).toHaveBeenCalledTimes(1);
        expect(def.mock.calls[0][1]).toBe(node2);
    });

    it("3) embedded: custom on embedded for ANY of the object tools", () => {
        const embeddedTool = div({id: "obj3"});
        const target = div({id: "emb3"});

        $(embeddedTool).makeTool("eraser");
        $(embeddedTool).embedTool(target);

        const embeddedEraserListener = vi.fn().mockReturnValue(true);
        $(target).onTool("click", "eraser", embeddedEraserListener);
        const consumed = $(embeddedTool).executeAction("click", "brush", new Event("x"));

        expect(consumed).toBe(true);
        expect(embeddedEraserListener).toHaveBeenCalledTimes(1);
    });

    it("4) embedded: object defaults run on embedded if no custom", () => {
        const embeddedTool = div({id: "obj4"});
        const target = div({id: "emb4"});

        $(embeddedTool).makeTool("eraser");
        $(embeddedTool).embedTool(target);

        const def = vi.fn().mockReturnValue(true);
        $(embeddedTool).addToolBehavior("click", (ev, target) => def(ev, target), "eraser");
        const consumed = $(embeddedTool).executeAction("click", "brush", new Event("x"));

        expect(consumed).toBe(true);
        expect(def.mock.calls[0][1]).toBe(target);
    });

    it("5) falls back to generic (no-tool) listeners last", () => {
        const node = div({id: "obj5"});

        const generic = vi.fn().mockReturnValue(true);
        $(node).on("pointerdown", generic);

        const consumed = $(node).executeAction("pointerdown", "nonexistent", new Event("x"));
        expect(consumed).toBe(true);
        expect(generic).toHaveBeenCalledTimes(1);
    });

    it("propagate flag makes group NOT consumed", () => {
        const node = div({id: "p"});
        const A = vi.fn();
        const B = vi.fn();

        $(node).onTool("pointerdown", "brush", A, {propagate: true});
        $(node).onTool("pointerdown", "brush", B);

        const consumed = $(node).executeAction("pointerdown", "brush", new Event("x"));
        expect(consumed).toBe(false);
        expect(A).toHaveBeenCalledTimes(1);
        expect(B).toHaveBeenCalledTimes(1);
    });

    it("once removes listener after first run", () => {
        const node = div({id: "o"});
        const L = vi.fn().mockReturnValue(true);

        $(node).onTool("click", "brush", L, {once: true});

        $(node).executeAction("click", "brush", new Event("x"));
        $(node).executeAction("click", "brush", new Event("x"));

        expect(L).toHaveBeenCalledTimes(1);
    });
});