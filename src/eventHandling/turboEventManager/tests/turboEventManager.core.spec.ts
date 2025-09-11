import { describe, it, expect, beforeEach, vi } from "vitest";
import {TurboEventManager} from "../turboEventManager";
import {div} from "../../../elementCreation/basicElements";
import {$} from "../../../turboFunctions/turboFunctions";
import {ClickMode} from "../turboEventManager.types";


beforeEach(() => {
    document.body.innerHTML = "";
    (TurboEventManager as any).allManagers = [];
});

describe("TurboEventManager: tools & locks", () => {
    it("addTool / setTool selects & activates; onToolChange fires", () => {
        const mgr = new TurboEventManager();

        const toolEl = div({parent: document.body});
        const sel = $(toolEl);

        // Observe tool activation/deactivation delegates
        const onAct = vi.fn();
        const onDeact = vi.fn();
        sel.onToolActivation.add?.(onAct);
        sel.onToolDeactivation.add?.(onDeact);

        // Add & select tool
        mgr.addTool("brush", toolEl);
        const fired = vi.fn();
        mgr.onToolChange.add?.(fired);

        mgr.setTool("brush", ClickMode.left, { select: true, activate: true });
        expect(mgr.getCurrentToolName(ClickMode.left)).toBe("brush");

        // activation fired once for all instances with that name
        expect(onAct).toHaveBeenCalledTimes(1);
        expect(fired).toHaveBeenCalledTimes(1);
        expect(fired.mock.calls[0]).toEqual([undefined, "brush", ClickMode.left]);

        // switch to another tool
        const tool2 = div({parent: document.body});
        mgr.addTool("eraser", tool2);
        mgr.setTool("eraser", ClickMode.left, { select: true, activate: true });
        expect(onDeact).toHaveBeenCalledTimes(1);    // previous tool deactivated
        expect(mgr.getCurrentToolName(ClickMode.left)).toBe("eraser");
    });

    it("key mapping: setToolByKey picks the mapped tool; key release clears key mode", () => {
        const mgr = new TurboEventManager();
        const toolEl = div({parent: document.body});
        mgr.addTool("pan", toolEl, "p");

        // key pressed selects tool for ClickMode.key
        const ok = mgr.setToolByKey("p");
        expect(ok).toBe(true);
        expect(mgr.getCurrentToolName(ClickMode.key)).toBe("pan");

        // simulate key-release path via dispatchController (handled in key controller tests)
    });

    it("lock/unlock affects getters", () => {
        const mgr = new TurboEventManager({ enabled: true, preventDefaultMouse: true });

        expect(mgr.enabled).toBe(true);
        mgr.lock(document.body, { enabled: false, preventDefaultMouse: false });
        expect(mgr.enabled).toBe(false);
        expect(mgr.preventDefaultMouse).toBe(false);

        mgr.unlock();
        expect(mgr.enabled).toBe(true);
        expect(mgr.preventDefaultMouse).toBe(true);
    });
});
