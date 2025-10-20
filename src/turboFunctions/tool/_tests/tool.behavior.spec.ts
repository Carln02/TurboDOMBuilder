import {describe, it, expect, vi} from "vitest";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";

describe("Tool: behaviors", () => {
    it("addToolBehavior registers and hasToolBehavior sees it", () => {
        const node = div({id: "beh-1"});

        $(node).makeTool("brush");
        const cb = vi.fn().mockReturnValue(true);

        $(node).addToolBehavior("click", cb, "brush");
        expect($(node).hasToolBehavior("click", "brush")).toBe(true);
    });

    it("applyTool returns true if any behavior returns true (and passes TurboSelector as target)", () => {
        const node = div({id: "beh-2"});

        $(node).makeTool("brush");

        const cb1 = vi.fn().mockReturnValue(false);
        const cb2 = vi.fn().mockReturnValue(true);

        $(node).addToolBehavior("click", cb1, "brush");
        $(node).addToolBehavior("click", cb2, "brush");

        const consumed = $(node).applyTool("brush", "click", new Event("x"));
        expect(consumed).toBe(true);

        expect(cb2).toHaveBeenCalledTimes(1);
        expect(cb2.mock.calls[0][1]).toBe(node);
    });

    it("removeToolBehaviors clears the handlers", () => {
        const node = div({id: "beh-3"});

        $(node).makeTool("brush");
        const cb = vi.fn().mockReturnValue(true);

        $(node).addToolBehavior("pointerdown", cb, "brush");
        expect($(node).hasToolBehavior("pointerdown", "brush")).toBe(true);

        $(node).removeToolBehaviors("pointerdown", "brush");
        expect($(node).hasToolBehavior("pointerdown", "brush")).toBe(false);

        const consumed = $(node).applyTool("brush", "pointerdown", new Event("x"));
        expect(consumed).toBe(false);
        expect(cb).not.toHaveBeenCalled();
    });
});