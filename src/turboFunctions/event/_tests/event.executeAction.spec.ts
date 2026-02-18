import {describe, it, expect, vi, beforeEach} from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {turbo} from "../../turboFunctions";
import {Propagation} from "../event.types";

describe("executeAction order + semantics", () => {
    beforeEach(() => turbo().clearToolBehaviors());

    it("1) custom (tool,event) wins", () => {
        const node = div({id: "obj"});
        const hit = vi.fn();

        turbo(node).onTool("click", "brush", hit);

        const consumed = turbo(node).executeAction("click", "brush", new Event("x"));
        expect(consumed).toBe(Propagation.stopPropagation);
        expect(hit).toHaveBeenCalledTimes(1);
    });

    it("2) tool defaults run on object when no custom", () => {
        const node2 = div({id: "obj2"});
        const def = vi.fn().mockReturnValue(Propagation.stopPropagation);

        turbo(node2).addToolBehavior("click", (ev, target) => def(ev, target), "brush");
        const consumed = turbo(node2).executeAction("click", "brush", new Event("click"));

        expect(consumed).toBe(Propagation.stopPropagation);
        expect(def).toHaveBeenCalledTimes(1);
        expect(def.mock.calls[0][1]).toBe(node2);
    });

    it("3) embedded: custom on embedded for ANY of the object tools", () => {
        const embeddedTool = div({id: "obj3"});
        const target = div({id: "emb3"});

        turbo(embeddedTool).makeTool("eraser");
        turbo(embeddedTool).embedTool(target);

        const embeddedEraserListener = vi.fn().mockReturnValue(Propagation.stopPropagation);
        turbo(target).onTool("click", "eraser", embeddedEraserListener);
        const consumed = turbo(embeddedTool).executeAction("click", "brush", new Event("x"));

        expect(consumed).toBe(Propagation.stopPropagation);
        expect(embeddedEraserListener).toHaveBeenCalledTimes(1);
    });

    it("4) embedded: object defaults run on embedded if no custom", () => {
        const embeddedTool = div({id: "obj4"});
        const target = div({id: "emb4"});

        turbo(embeddedTool).makeTool("eraser");
        turbo(embeddedTool).embedTool(target);

        const def = vi.fn().mockReturnValue(Propagation.stopPropagation);
        turbo(embeddedTool).addToolBehavior("click", (ev, target) => def(ev, target), "eraser");
        const consumed = turbo(embeddedTool).executeAction("click", "brush", new Event("x"));

        expect(consumed).toBe(Propagation.stopPropagation);
        expect(def.mock.calls[0][1]).toBe(target);
    });

    it("5) falls back to generic (no-tool) listeners last", () => {
        const node = div({id: "obj5"});

        const generic = vi.fn().mockReturnValue(Propagation.stopPropagation);
        turbo(node).on("pointerdown", generic);

        const consumed = turbo(node).executeAction("pointerdown", "nonexistent", new Event("x"));
        expect(consumed).toBe(Propagation.stopPropagation);
        expect(generic).toHaveBeenCalledTimes(1);
    });

    it("propagate flag makes group NOT consumed", () => {
        const node = div({id: "p"});
        const A = vi.fn().mockReturnValue(Propagation.propagate);
        const B = vi.fn().mockReturnValue(Propagation.propagate);

        turbo(node).onTool("pointerdown", "brush", A);
        turbo(node).onTool("pointerdown", "brush", B);

        const consumed = turbo(node).executeAction("pointerdown", "brush", new Event("x"));
        expect(consumed).toBe(Propagation.propagate);
        expect(A).toHaveBeenCalledTimes(1);
        expect(B).toHaveBeenCalledTimes(1);
    });

    it("once removes listener after first run", () => {
        const node = div({id: "o"});
        const L = vi.fn().mockReturnValue(Propagation.stopPropagation);

        turbo(node).onTool("click", "brush", L, {once: true});

        turbo(node).executeAction("click", "brush", new Event("x"));
        turbo(node).executeAction("click", "brush", new Event("x"));

        expect(L).toHaveBeenCalledTimes(1);
    });

    it("ignored tool on element: skips custom listeners and default behaviors", () => {
        const node = div({ id: "ign-el" });
        const custom = vi.fn().mockReturnValue(Propagation.stopPropagation);
        const def = vi.fn().mockReturnValue(Propagation.stopPropagation);

        turbo(node).onTool("click", "brush", custom);
        turbo(node).addToolBehavior("click", (ev, target) => def(ev, target), "brush");
        turbo(node).ignoreTool("brush");

        const consumed = turbo(node).executeAction("click", "brush", new Event("x"));

        expect(consumed).toBe(Propagation.stopPropagation);
        expect(custom).toHaveBeenCalled();
        expect(def).not.toHaveBeenCalled();
    });

    it("ignored specific (tool,type): skips only that event type, others still work", () => {
        const node = div({ id: "ign-type" });

        const customClick = vi.fn();
        const customDown  = vi.fn();
        const defClick    = vi.fn();

        turbo(node).onTool("click", "brush", customClick);
        turbo(node).onTool("pointerdown", "brush", customDown);
        turbo(node).addToolBehavior("click", (ev, target) => defClick(ev, target), "brush");

        turbo(node).ignoreTool("brush", "click");

        const consumedClick = turbo(node).executeAction("click", "brush", new Event("x"));
        expect(consumedClick).toBe(Propagation.stopPropagation);
        expect(customClick).toHaveBeenCalled();
        expect(defClick).not.toHaveBeenCalled();

        const consumedDown = turbo(node).executeAction("pointerdown", "brush", new Event("y"));
        expect(consumedDown).toBe(Propagation.stopPropagation);
        expect(customDown).toHaveBeenCalledTimes(1);
    });
});