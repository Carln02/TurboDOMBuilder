import {describe, expect, it, vi} from "vitest";
import {TurboEventManager} from "../turboEventManager";
import {div} from "../../../elementCreation/basicElements";
import {$} from "../../../turboFunctions/turboFunctions";
import {ClickMode} from "../turboEventManager.types";

describe("TurboEventManager: tools & locks", () => {
    it("addTool / setTool selects & activates; onToolChange fires", () => {
        const mgr = new TurboEventManager();

        const toolEl = div({parent: document.body});
        const sel = $(toolEl);
        sel.makeTool("brush");

        const onAct = vi.fn();
        const onDeact = vi.fn();
        sel.onToolActivate("brush").add(onAct);
        sel.onToolDeactivate("brush").add(onDeact);

        const fired = vi.fn();
        mgr.onToolChange.add?.(fired);

        mgr.setTool("brush", ClickMode.left, { select: true, activate: true });
        expect(mgr.getCurrentToolName(ClickMode.left)).toBe("brush");

        expect(onAct).toHaveBeenCalledTimes(1);
        expect(fired).toHaveBeenCalledTimes(1);
        expect(fired.mock.calls[0]).toEqual([undefined, "brush", ClickMode.left]);

        const tool2 = div({parent: document.body});
        mgr.addTool("eraser", tool2);
        mgr.setTool("eraser", ClickMode.left, { select: true, activate: true });
        expect(onDeact).toHaveBeenCalledTimes(1);
        expect(mgr.getCurrentToolName(ClickMode.left)).toBe("eraser");
    });

    it("key mapping: setToolByKey picks the mapped tool; key release clears key mode", () => {
        const mgr = new TurboEventManager();
        const toolEl = div({parent: document.body});
        mgr.addTool("pan", toolEl, "p");

        const ok = mgr.setToolByKey("p");
        expect(ok).toBe(true);
        expect(mgr.getCurrentToolName(ClickMode.key)).toBe("pan");
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
