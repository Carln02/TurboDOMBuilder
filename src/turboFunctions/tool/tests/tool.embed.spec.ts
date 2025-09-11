import {describe, it, expect, vi, beforeEach} from "vitest";
import {$} from "../../turboFunctions";
import {ManagerStub} from "../../../setup.vitest";
import {div} from "../../../elementCreation/basicElements";

beforeEach(() => (document.body.innerHTML = ""));

describe("Tool: embedded", () => {
    it("embedTool is a no-op when the element is not a tool", () => {
        const mgr = new ManagerStub() as any;
        const host = div({id: "emb-0"});
        const target = div({id: "emb-0-target"});

        $(host).embedTool(target, mgr);
        expect($(host).isEmbeddedTool(mgr)).toBe(false);
        expect($(host).getEmbeddedToolTarget(mgr)).toBeUndefined();
    });

    it("embedTool stores and exposes the embedded target once the node is a tool", () => {
        const mgr = new ManagerStub() as any;
        const host = div({id: "emb-1"});
        const target = div({id: "emb-1-target"});

        $(host).makeTool("brush", {manager: mgr});
        $(host).embedTool(target, mgr);

        expect($(host).isEmbeddedTool(mgr)).toBe(true);
        expect($(host).getEmbeddedToolTarget(mgr)).toBe(target);
    });

    it("applyTool runs behaviors on the host (not auto-proxied to embedded)", () => {
        const mgr = new ManagerStub() as any;
        const host = div({id: "emb-2-host"});
        const target = div({id: "emb-2-target"});

        $(host).makeTool("brush", {manager: mgr});
        $(host).embedTool(target, mgr);

        const def = vi.fn().mockReturnValue(true);
        $(host).addToolBehavior("pointerdown", def, "brush", mgr);

        const consumed = $(host).applyTool("brush", "pointerdown", new Event("x"), mgr);
        expect(consumed).toBe(true);

        expect(def.mock.calls[0][1].element).toBe(host);
    });
});
