import {describe, it, expect, vi} from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {turbo} from "../../turboFunctions";
import {Propagation} from "../../event/event.types";

describe("Tool: embedded", () => {
    it("embedTool is a no-op when the element is not a tool", () => {
        const host = div({id: "emb-0"});
        const target = div({id: "emb-0-target"});

        turbo(host).embedTool(target);
        expect(turbo(host).isEmbeddedTool()).toBe(false);
        expect(turbo(host).getEmbeddedToolTarget()).toBeUndefined();
    });

    it("embedTool stores and exposes the embedded target once the node is a tool", () => {
        const host = div({id: "emb-1"});
        const target = div({id: "emb-1-target"});

        turbo(host).makeTool("brush");
        turbo(host).embedTool(target);

        expect(turbo(host).isEmbeddedTool()).toBe(true);
        expect(turbo(host).getEmbeddedToolTarget()).toBe(target);
    });

    it("applyTool runs behaviors on the host (not auto-proxied to embedded)", () => {
        const host = div({id: "emb-2-host"});
        const target = div({id: "emb-2-target"});

        turbo(host).makeTool("brush");
        turbo(host).embedTool(target);

        const def = vi.fn().mockReturnValue(Propagation.stopPropagation);
        turbo(host).addToolBehavior("pointerdown", def, "brush");

        const consumed = turbo(host).applyTool("brush", "pointerdown", new Event("x"));
        expect(consumed).toBe(Propagation.stopPropagation);

        expect(def.mock.calls[0][1]).toBe(host);
    });
});
