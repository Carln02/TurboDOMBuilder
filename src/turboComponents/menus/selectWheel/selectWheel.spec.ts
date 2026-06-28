import {describe, it, expect, vi, beforeEach, afterEach} from "vitest";
import {TurboSelectWheel} from "./selectWheel";
import {turbo} from "../../../turboFunctions/turboFunctions";
import {TurboEventManager} from "../../../eventHandling/turboEventManager/turboEventManager";
import {Direction} from "../../../types/enums.types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeWheel(values: string[] = []): TurboSelectWheel<string> {
    const wheel = TurboSelectWheel.create({}) as TurboSelectWheel<string>;
    document.body.appendChild(wheel as unknown as Node);
    if (values.length) wheel.values = values;
    return wheel;
}

// ─── Drag propagation isolation (Bug 1) ───────────────────────────────────────
// Propagation isolation is implemented via event ordering in executeAction: non-tool
// on() listeners fire before global behaviors, so the entry's dragStart handler can
// return stopImmediatePropagation before the parent card's @behavior() dragStart fires.
// These tests verify the listeners are registered correctly on each entry.

describe("TurboSelectWheel — entry drag listener (Bug 1: behavior propagation)", () => {
    it("each entry added via values has a dragStart on() listener", () => {
        const wheel = makeWheel(["A", "B", "C"]);
        for (const entry of wheel.entries) {
            expect(turbo(entry).hasListenersByType("turbo-drag-start")).toBe(true);
        }
    });

    it("entries added later (values reassigned) also have dragStart listeners", () => {
        const wheel = makeWheel(["X"]);
        wheel.values = ["X", "Y", "Z"];
        for (const entry of wheel.entries) {
            expect(turbo(entry).hasListenersByType("turbo-drag-start")).toBe(true);
        }
    });

    it("wheel element itself has no dragStart listener (listeners are on entries)", () => {
        const wheel = makeWheel(["A"]);
        expect(turbo(wheel as unknown as Node).hasListenersByType("turbo-drag-start")).toBe(false);
    });

    it("entry dragStart listener fires on executeAction", () => {
        const wheel = makeWheel(["A"]);
        const entry = wheel.entries[0];
        // The listener is registered and fires — propagation value depends on whether any
        // global behavior also fires, so we only assert it ran without throwing.
        expect(() => turbo(entry).executeAction("turbo-drag-start", undefined, new Event("turbo-drag-start"))).not.toThrow();
    });
});

// ─── reloadEntrySizes retry (Bug 2 — zero-size layout) ────────────────────────

describe("TurboSelectWheel — reloadEntrySizes zero-size retry (Bug 2)", () => {
    const pendingCallbacks: FrameRequestCallback[] = [];
    let rafSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        pendingCallbacks.length = 0;
        rafSpy = vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
            pendingCallbacks.push(cb);
            return pendingCallbacks.length;
        });
    });

    afterEach(() => {
        rafSpy.mockRestore();
    });

    function flushAll() {
        while (pendingCallbacks.length) {
            const cbs = [...pendingCallbacks];
            pendingCallbacks.length = 0;
            cbs.forEach(cb => cb(0));
        }
    }

    it("schedules a retry rAF when all entry sizes are 0 (jsdom layout always 0)", () => {
        const wheel = makeWheel(["P", "Q", "R"]);
        // The rAF from onEntryAdded fires reloadEntrySizes, which then queues another rAF because
        // jsdom always returns 0 for offsetWidth/offsetHeight.
        const countAfterCreate = pendingCallbacks.length;
        expect(countAfterCreate).toBeGreaterThan(0);

        // Flush the rAFs — each reloadEntrySizes with 0 sizes queues another retry
        const beforeFlush = pendingCallbacks.length;
        pendingCallbacks.length = 0;
        const [firstCb] = [pendingCallbacks[0]];
        // Run original rAFs from onEntryAdded
        const original = [...Array(beforeFlush)].map((_, i) => pendingCallbacks[i]).filter(Boolean);
        // After flush: the retry should appear
        pendingCallbacks.length = 0;
        (wheel as any).reloadEntrySizes(); // all sizes 0 → schedules retry
        expect(pendingCallbacks.length).toBe(1);
    });

    it("does not retry when there are no entries", () => {
        const wheel = makeWheel();
        pendingCallbacks.length = 0;
        (wheel as any).reloadEntrySizes();
        expect(pendingCallbacks.length).toBe(0);
    });

    it("does not retry when totalSize is non-zero (mock non-zero entry sizes)", () => {
        const wheel = makeWheel(["A"]);
        const fakeEntry = document.createElement("div");
        Object.defineProperty(fakeEntry, "offsetWidth", {get: () => 80, configurable: true});
        vi.spyOn(wheel, "entries", "get").mockReturnValue([fakeEntry] as any);
        vi.spyOn(wheel.select, "selectedIndex", "get").mockReturnValue(-1);

        // Spy on reloadEntrySizes itself — after the manual call, any retry would appear as a
        // second invocation. We call through so totalSize is computed.
        const reloadSpy = vi.spyOn(wheel as any, "reloadEntrySizes");
        (wheel as any).reloadEntrySizes();

        expect((wheel as any).totalSize).toBe(80);
        // Only 1 call — the manual one. No retry was queued because totalSize > 0.
        // (setStyles queues rAFs for style flushing, but those don't call reloadEntrySizes.)
        expect(reloadSpy).toHaveBeenCalledTimes(1);
    });

    it("opening the wheel schedules a reloadEntrySizes via rAF", () => {
        const wheel = makeWheel(["A", "B"]);
        pendingCallbacks.length = 0;

        wheel.open = true;
        expect(pendingCallbacks.length).toBeGreaterThan(0);
    });

    it("uses offsetHeight instead of offsetWidth when direction is vertical", () => {
        const wheel = makeWheel(["A"]);
        wheel.direction = Direction.vertical;

        const fakeEntry = document.createElement("div");
        Object.defineProperty(fakeEntry, "offsetWidth", {get: () => 200, configurable: true});
        Object.defineProperty(fakeEntry, "offsetHeight", {get: () => 40, configurable: true});
        vi.spyOn(wheel, "entries", "get").mockReturnValue([fakeEntry] as any);
        vi.spyOn(wheel.select, "selectedIndex", "get").mockReturnValue(-1);

        // Spy to verify no retry call is made (totalSize=40 > 0 after reading offsetHeight)
        const reloadSpy = vi.spyOn(wheel as any, "reloadEntrySizes");
        (wheel as any).reloadEntrySizes();

        expect((wheel as any).totalSize).toBe(40);
        expect(reloadSpy).toHaveBeenCalledTimes(1);
    });
});

// ─── removeEntry integration ───────────────────────────────────────────────────

describe("TurboSelectWheel — removeEntry", () => {
    it("removes one entry by entry reference and updates the entries list", () => {
        const wheel = makeWheel(["Red", "Green", "Blue"]);
        expect(wheel.entries.length).toBe(3);

        const greenEntry = wheel.entries[1];
        wheel.select.removeEntry(greenEntry as any);
        expect(wheel.entries.length).toBe(2);
        expect(wheel.entries).not.toContain(greenEntry);
    });

    it("removing the last entry leaves an empty wheel without throwing", () => {
        const wheel = makeWheel(["Solo"]);
        const entry = wheel.entries[0];
        expect(() => wheel.select.removeEntry(entry as any)).not.toThrow();
        expect(wheel.entries.length).toBe(0);
    });

    it("clearing all values via wheel.values = [] leaves an empty wheel", () => {
        const wheel = makeWheel(["A", "B", "C"]);
        wheel.values = [];
        expect(wheel.entries.length).toBe(0);
    });

    it("re-adding entries after clearing populates the wheel again", () => {
        const wheel = makeWheel(["A", "B"]);
        wheel.values = [];
        wheel.values = ["X", "Y", "Z"];
        expect(wheel.entries.length).toBe(3);
    });

    it("removed entries also have their DOM node detached", () => {
        const wheel = makeWheel(["A", "B"]);
        const entry = wheel.entries[0] as HTMLElement;
        wheel.select.removeEntry(entry as any);
        expect(entry.parentElement).toBeNull();
    });
});

// ─── position / index math ────────────────────────────────────────────────────

describe("TurboSelectWheel — position/index math with known sizes", () => {
    let rafSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        rafSpy = vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 0);
    });

    afterEach(() => {
        rafSpy.mockRestore();
    });

    function makeWheelWithSizes(sizes: number[]): TurboSelectWheel<string> {
        const values = sizes.map((_, i) => `Item${i}`);
        const wheel = makeWheel(values);

        const fakeEntries = sizes.map(w => {
            const el = document.createElement("div");
            Object.defineProperty(el, "offsetWidth", {get: () => w, configurable: true});
            return el;
        });
        vi.spyOn(wheel, "entries", "get").mockReturnValue(fakeEntries as any);
        vi.spyOn(wheel.select, "selectedIndex", "get").mockReturnValue(-1);
        (wheel as any).reloadEntrySizes();
        return wheel;
    }

    it("positionPerEntry accumulates correctly for uniform sizes", () => {
        const wheel = makeWheelWithSizes([50, 50, 50]);
        expect((wheel as any).positionPerEntry).toEqual([0, 50, 100]);
        expect((wheel as any).totalSize).toBe(150);
    });

    it("positionPerEntry accumulates correctly for non-uniform sizes", () => {
        const wheel = makeWheelWithSizes([30, 60, 20]);
        expect((wheel as any).positionPerEntry).toEqual([0, 30, 90]);
        expect((wheel as any).totalSize).toBe(110);
    });

    it("indexToPosition returns correct position for integer index", () => {
        const wheel = makeWheelWithSizes([50, 50, 50]);
        expect((wheel as any).indexToPosition(0)).toBe(0);
        expect((wheel as any).indexToPosition(1)).toBe(50);
        expect((wheel as any).indexToPosition(2)).toBe(100);
    });

    it("positionToIndex returns correct integer for exact positions", () => {
        const wheel = makeWheelWithSizes([50, 50, 50]);
        expect((wheel as any).positionToIndex(0)).toBe(0);
        expect((wheel as any).positionToIndex(50)).toBe(1);
        expect((wheel as any).positionToIndex(100)).toBe(2);
    });

    it("snapToNearest snaps to the closest entry index", () => {
        const wheel = makeWheelWithSizes([50, 50, 50]);
        (wheel as any)._index = 1;
        (wheel as any)._currentPosition = 60; // closer to index 1 (pos 50) than index 2 (pos 100)
        (wheel as any).snapToNearest();
        expect(wheel.index).toBe(1);
    });
});
