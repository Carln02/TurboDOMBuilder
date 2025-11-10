import { describe, it, expect, vi } from "vitest";
import {TurboEventManager} from "../turboEventManager";
import {TurboEventName} from "../../../types/eventNaming.types";

function patchElementFromPoint(target: Element) {
    const orig = document.elementFromPoint;
    document.elementFromPoint = () => target;
    return () => (document.elementFromPoint = orig);
}

describe("Pointer controller → TurboEvent/TurboDragEvent dispatch", () => {
    it("clickStart → longPress (after timeout) → clickEnd sequence", () => {
        const mgr = new TurboEventManager({ longPressDuration: 100 });
        const ptr = (mgr as any).pointerController;

        const target = document.createElement("div");
        document.body.appendChild(target);
        const restore = patchElementFromPoint(target);

        const start = vi.fn();
        const longp = vi.fn();
        const end = vi.fn();

        target.addEventListener(TurboEventName.clickStart, start as any);
        target.addEventListener(TurboEventName.longPress, longp as any);
        target.addEventListener(TurboEventName.clickEnd, end as any);

        vi.useFakeTimers();

        // down at (10,10)
        ptr.pointerDown(new MouseEvent("mousedown", { clientX: 10, clientY: 10, bubbles: true }));
        expect(start).toHaveBeenCalledTimes(1);

        // wait past longPress
        vi.advanceTimersByTime(110);
        expect(longp).toHaveBeenCalledTimes(1);

        // release → clickEnd (no "click", since action became longPress)
        ptr.pointerUp(new MouseEvent("mouseup", { clientX: 10, clientY: 10, bubbles: true }));
        expect(end).toHaveBeenCalledTimes(1);

        vi.useRealTimers();
        restore();
    });

    it("dragStart/drag/dragEnd when movement exceeds threshold; move events fire too", () => {
        const mgr = new TurboEventManager({ moveThreshold: 10 });
        const ptr = (mgr as any).pointerController;

        const origin = document.createElement("div");
        document.body.appendChild(origin);
        const restore = patchElementFromPoint(origin);

        const move = vi.fn();
        const dstart = vi.fn();
        const dmove = vi.fn();
        const dend = vi.fn();

        origin.addEventListener(TurboEventName.move, move as any);
        origin.addEventListener(TurboEventName.dragStart, dstart as any);
        origin.addEventListener(TurboEventName.drag, dmove as any);
        origin.addEventListener(TurboEventName.dragEnd, dend as any);

        // pointer down at (0,0)
        ptr.pointerDown(new MouseEvent("mousedown", { clientX: 0, clientY: 0, bubbles: true }));

        // small move (under threshold) → only move
        ptr.pointerMove(new MouseEvent("mousemove", { clientX: 5, clientY: 0, bubbles: true }));
        expect(move).toHaveBeenCalledTimes(1);
        expect(dstart).toHaveBeenCalledTimes(0);

        // exceed threshold → dragStart then drag
        ptr.pointerMove(new MouseEvent("mousemove", { clientX: 20, clientY: 0, bubbles: true }));
        expect(dstart).toHaveBeenCalledTimes(1);
        expect(dmove).toHaveBeenCalledTimes(1);

        // more drag
        ptr.pointerMove(new MouseEvent("mousemove", { clientX: 30, clientY: 5, bubbles: true }));
        expect(dmove).toHaveBeenCalledTimes(2);

        // release → dragEnd + clickEnd (clickEnd always fires)
        ptr.pointerUp(new MouseEvent("mouseup", { clientX: 30, clientY: 5, bubbles: true }));
        expect(dend).toHaveBeenCalledTimes(1);

        restore();
    });

    it("disabling dragEventEnabled prevents dragStart/drag/dragEnd", () => {
        const mgr = new TurboEventManager({ moveThreshold: 5 });
        const ptr = (mgr as any).pointerController;

        mgr.dragEventEnabled = false;

        const target = document.createElement("div");
        document.body.appendChild(target);
        const restore = patchElementFromPoint(target);

        const dstart = vi.fn();
        const dmove = vi.fn();
        const dend = vi.fn();

        target.addEventListener(TurboEventName.dragStart, dstart as any);
        target.addEventListener(TurboEventName.drag, dmove as any);
        target.addEventListener(TurboEventName.dragEnd, dend as any);

        ptr.pointerDown(new MouseEvent("mousedown", { clientX: 0, clientY: 0, bubbles: true }));
        ptr.pointerMove(new MouseEvent("mousemove", { clientX: 100, clientY: 0, bubbles: true }));
        ptr.pointerUp(new MouseEvent("mouseup", { clientX: 100, clientY: 0, bubbles: true }));

        expect(dstart).toHaveBeenCalledTimes(0);
        expect(dmove).toHaveBeenCalledTimes(0);
        expect(dend).toHaveBeenCalledTimes(0);

        restore();
    });
});