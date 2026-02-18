import {describe, it, expect, vi} from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {turbo} from "../../turboFunctions";
import {Propagation} from "../../event/event.types";

describe("Tool: behaviors", () => {
    it("addToolBehavior registers and hasToolBehavior sees it", () => {
        const node = div({id: "beh-1"});

        turbo(node).makeTool("brush");
        const cb = vi.fn().mockReturnValue(true);

        turbo(node).addToolBehavior("click", cb, "brush");
        expect(turbo(node).hasToolBehavior("click", "brush")).toBe(true);
    });

    it("applyTool returns true if any behavior returns true (and passes TurboSelector as target)", () => {
        const node = div({id: "beh-2"});

        turbo(node).makeTool("brush");

        const cb1 = vi.fn().mockReturnValue(Propagation.propagate);
        const cb2 = vi.fn().mockReturnValue(Propagation.stopPropagation);

        turbo(node).addToolBehavior("click", cb1, "brush");
        turbo(node).addToolBehavior("click", cb2, "brush");

        const consumed = turbo(node).applyTool("brush", "click", new Event("x"));
        expect(consumed).toBe(Propagation.stopPropagation);

        expect(cb2).toHaveBeenCalledTimes(1);
        expect(cb2.mock.calls[0][1]).toBe(node);
    });

    it("removeToolBehaviors clears the handlers", () => {
        const node = div({id: "beh-3"});

        turbo(node).makeTool("brush");
        const cb = vi.fn().mockReturnValue(Propagation.stopPropagation);

        turbo(node).addToolBehavior("pointerdown", cb, "brush");
        expect(turbo(node).hasToolBehavior("pointerdown", "brush")).toBe(true);

        turbo(node).removeToolBehaviors("pointerdown", "brush");
        expect(turbo(node).hasToolBehavior("pointerdown", "brush")).toBe(false);

        const consumed = turbo(node).applyTool("brush", "pointerdown", new Event("x"));
        expect(consumed).toBe(Propagation.propagate);
        expect(cb).not.toHaveBeenCalled();
    });
});