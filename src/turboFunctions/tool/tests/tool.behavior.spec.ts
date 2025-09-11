import {describe, it, expect, vi, beforeEach} from "vitest";
import {$} from "../../turboFunctions";
import {ManagerStub} from "../../../setup.vitest";
import {div} from "../../../elementCreation/basicElements";

beforeEach(() => (document.body.innerHTML = ""));

describe("Tool: behaviors", () => {
    it("addToolBehavior registers and hasToolBehavior sees it", () => {
        const mgr = new ManagerStub() as any;
        const node = div({id: "beh-1"});

        $(node).makeTool("brush", {manager: mgr});
        const cb = vi.fn().mockReturnValue(true);

        $(node).addToolBehavior("click", cb, "brush", mgr);
        expect($(node).hasToolBehavior("click", "brush", mgr)).toBe(true);
    });

    it("applyTool returns true if any behavior returns true (and passes TurboSelector as target)", () => {
        const mgr = new ManagerStub() as any;
        const node = div({id: "beh-2"});

        $(node).makeTool("brush", {manager: mgr});

        const cb1 = vi.fn().mockReturnValue(false);
        const cb2 = vi.fn().mockReturnValue(true);

        $(node).addToolBehavior("click", cb1, "brush", mgr);
        $(node).addToolBehavior("click", cb2, "brush", mgr);

        const consumed = $(node).applyTool("brush", "click", new Event("x"), mgr);
        expect(consumed).toBe(true);

        // Your current implementation passes TurboSelector as the target, not Node.
        expect(cb2).toHaveBeenCalledTimes(1);
        const targetPassed = cb2.mock.calls[0][1];
        expect(targetPassed).toHaveProperty("element", node);
    });

    it("removeToolBehaviors clears the handlers", () => {
        const mgr = new ManagerStub() as any;
        const node = div({id: "beh-3"});

        $(node).makeTool("brush", {manager: mgr});
        const cb = vi.fn().mockReturnValue(true);

        $(node).addToolBehavior("pointerdown", cb, "brush", mgr);
        expect($(node).hasToolBehavior("pointerdown", "brush", mgr)).toBe(true);

        $(node).removeToolBehaviors("pointerdown", "brush", mgr);
        expect($(node).hasToolBehavior("pointerdown", "brush", mgr)).toBe(false);

        const consumed = $(node).applyTool("brush", "pointerdown", new Event("x"), mgr);
        expect(consumed).toBe(false);
        expect(cb).not.toHaveBeenCalled();
    });
});