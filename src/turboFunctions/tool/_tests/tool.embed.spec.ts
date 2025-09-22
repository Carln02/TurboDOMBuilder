import {describe, it, expect, vi} from "vitest";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";

describe("Tool: embedded", () => {
    it("embedTool is a no-op when the element is not a tool", () => {
        const host = div({id: "emb-0"});
        const target = div({id: "emb-0-target"});

        $(host).embedTool(target);
        expect($(host).isEmbeddedTool()).toBe(false);
        expect($(host).getEmbeddedToolTarget()).toBeUndefined();
    });

    it("embedTool stores and exposes the embedded target once the node is a tool", () => {
        const host = div({id: "emb-1"});
        const target = div({id: "emb-1-target"});

        $(host).makeTool("brush");
        $(host).embedTool(target);

        expect($(host).isEmbeddedTool()).toBe(true);
        expect($(host).getEmbeddedToolTarget()).toBe(target);
    });

    it("applyTool runs behaviors on the host (not auto-proxied to embedded)", () => {
        const host = div({id: "emb-2-host"});
        const target = div({id: "emb-2-target"});

        $(host).makeTool("brush");
        $(host).embedTool(target);

        const def = vi.fn().mockReturnValue(true);
        $(host).addToolBehavior("pointerdown", def, "brush");

        const consumed = $(host).applyTool("brush", "pointerdown", new Event("x"));
        expect(consumed).toBe(true);

        expect(def.mock.calls[0][1]).toBe(host);
    });
});
