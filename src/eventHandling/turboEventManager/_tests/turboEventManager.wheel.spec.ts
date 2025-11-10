import { describe, it, expect, vi } from "vitest";
import {TurboEventManager} from "../turboEventManager";
import {TurboEventName} from "../../../types/eventNaming.types";

describe("Wheel controller → TurboWheelEvent dispatch", () => {
    it("emits trackpadScroll for small delta; later mouseWheel after timeout", () => {
        const mgr = new TurboEventManager();
        const wheelCtl = (mgr as any).wheelController;

        const trackpadSpy = vi.fn();
        const mouseSpy = vi.fn();
        document.addEventListener(TurboEventName.trackpadScroll, trackpadSpy as any);
        document.addEventListener(TurboEventName.mouseWheel, mouseSpy as any);

        vi.useFakeTimers();

        // small delta → trackpad
        wheelCtl.wheel(new WheelEvent("wheel", { deltaY: 20, deltaX: 0, ctrlKey: false }));
        expect(trackpadSpy).toHaveBeenCalledTimes(1);
        expect(mouseSpy).toHaveBeenCalledTimes(0);

        // big delta immediately after still counts as recently trackpad → stays trackpad
        wheelCtl.wheel(new WheelEvent("wheel", { deltaY: 200, deltaX: 0 }));
        expect(trackpadSpy).toHaveBeenCalledTimes(2);
        expect(mouseSpy).toHaveBeenCalledTimes(0);

        // advance 800ms to clear "recently trackpad" and emit big-delta again → mouseWheel
        vi.advanceTimersByTime(800);
        wheelCtl.wheel(new WheelEvent("wheel", { deltaY: 200, deltaX: 0 }));
        expect(mouseSpy).toHaveBeenCalledTimes(1);

        vi.useRealTimers();
    });

    it("emits trackpadPinch when ctrlKey is true", () => {
        const mgr = new TurboEventManager();
        const wheelCtl = (mgr as any).wheelController;

        const pinchSpy = vi.fn();
        document.addEventListener(TurboEventName.trackpadPinch, pinchSpy as any);

        // small delta with ctrl key → pinch
        wheelCtl.wheel(new WheelEvent("wheel", { deltaY: 5, ctrlKey: true }));
        expect(pinchSpy).toHaveBeenCalledTimes(1);
    });
});
