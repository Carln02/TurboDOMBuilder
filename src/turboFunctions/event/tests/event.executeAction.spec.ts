import { describe, it, expect, vi, beforeEach } from "vitest";
import {$} from "../../turboFunctions";
import {ManagerStub} from "../../../setup.vitest";
import {div} from "../../../elementCreation/basicElements";

beforeEach(() => document.body.innerHTML = "");

describe("executeAction order + semantics", () => {
    it("1) custom (tool,event) wins", () => {
        const manager = new ManagerStub() as any;

        const node = div({id: "obj"});
        const hit = vi.fn().mockReturnValue(true);

        $(node).onTool("click", "brush", hit, undefined, manager);

        const consumed = $(node).executeAction("click", "brush", new Event("x"), undefined, manager);
        expect(consumed).toBe(true);
        expect(hit).toHaveBeenCalledTimes(1);
    });

    it("2) tool defaults run on object when no custom", () => {
        const manager = new ManagerStub() as any;

        const node = div({id: "obj2"});
        const def = vi.fn().mockReturnValue(true);

        $(node).addToolBehavior("click", (ev, target) => def(ev, target), "brush", manager);
        const consumed = $(node).executeAction("click", "brush", new Event("x"), undefined, manager);

        expect(consumed).toBe(true);
        expect(def).toHaveBeenCalledTimes(1);
        expect(def.mock.calls[0][1].element).toBe(node);
    });

    it("3) embedded: custom on embedded for ANY of the object tools", () => {
        const manager = new ManagerStub() as any;

        const embeddedTool = div({id: "obj3"});
        const target = div({id: "emb3"});

        $(embeddedTool).makeTool("eraser", { manager: manager });
        $(embeddedTool).embedTool(target, manager);

        const embeddedEraserListener = vi.fn().mockReturnValue(true);
        $(target).onTool("click", "eraser", embeddedEraserListener, undefined, manager);
        const consumed = $(embeddedTool).executeAction("click", "brush", new Event("x"), undefined, manager);

        expect(consumed).toBe(true);
        expect(embeddedEraserListener).toHaveBeenCalledTimes(1);
    });

    it("4) embedded: object defaults run on embedded if no custom", () => {
        const manager = new ManagerStub() as any;

        const embeddedTool = div({id: "obj4"});
        const target = div({id: "emb4"});

        $(embeddedTool).makeTool("eraser", { manager: manager });
        $(embeddedTool).embedTool(target, manager);

        const def = vi.fn().mockReturnValue(true);
        // $(embeddedTool).addToolBehavior("click", (ev, target) => def(ev, target), "brush", manager);
        $(embeddedTool).addToolBehavior("click", (ev, target) => def(ev, target), "eraser", manager);
        const consumed = $(embeddedTool).executeAction("click", "brush", new Event("x"), undefined, manager);

        expect(consumed).toBe(true);
        expect(def.mock.calls[0][1].element).toBe(target);
    });

    it("5) falls back to generic (no-tool) listeners last", () => {
        const manager = new ManagerStub() as any;
        const node = div({id: "obj5"});

        const generic = vi.fn().mockReturnValue(true);
        $(node).on("pointerdown", generic, {}, manager);

        const consumed = $(node).executeAction("pointerdown", "nonexistent", new Event("x"), {}, manager);
        expect(consumed).toBe(true);
        expect(generic).toHaveBeenCalledTimes(1);
    });

    it("propagate flag makes group NOT consumed", () => {
        const mgr = new ManagerStub();
        mgr.setTool("brush");
        const manager = mgr as any;

        const node = div({id: "p"});
        const A = vi.fn();
        const B = vi.fn();

        $(node).onTool("pointerdown", "brush", A, { propagate: true }, manager);
        $(node).onTool("pointerdown", "brush", B, {}, manager);

        const consumed = $(node).executeAction("pointerdown", "brush", new Event("x"), {}, manager);
        expect(consumed).toBe(false);
        expect(A).toHaveBeenCalledTimes(1);
        expect(B).toHaveBeenCalledTimes(1);
    });

    it("once removes listener after first run", () => {
        const mgr = new ManagerStub();
        mgr.setTool("brush");
        const manager = mgr as any;

        const node = div({id: "o"});
        const L = vi.fn().mockReturnValue(true);

        $(node).onTool("click", "brush", L, { once: true }, manager);

        $(node).executeAction("click", "brush", new Event("x"), {}, manager);
        $(node).executeAction("click", "brush", new Event("x"), {}, manager);

        expect(L).toHaveBeenCalledTimes(1);
    });
});