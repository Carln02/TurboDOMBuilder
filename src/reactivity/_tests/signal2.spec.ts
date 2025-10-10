import {describe, it, expect} from "vitest";
import {effect, getSignal, markDirty, signal} from "../reactivity";
import {SignalBox} from "../reactivity.types";

// tiny helper: effect re-runs are queued via microtasks twice:
// 1) emit -> subscriber microtask -> schedule()
// 2) schedule() microtask -> effect.run()
const flushEffects = async () => {
    await Promise.resolve();
    await Promise.resolve();
};

describe("signal (free box)", () => {
    it("reads/writes via .value and coerces with Symbol.toPrimitive", () => {
        const x: SignalBox<number> = signal(1);

        expect(x.value).toBe(1);
        x.value = 2;
        expect(x.value).toBe(2);

        // coercion to string and number
        expect(String(x)).toBe("2");
        expect(x + 1).toBe(3); // uses valueOf / toPrimitive
    });

    it("does not emit/rerun effects when setting the same value (Object.is)", async () => {
        const x: SignalBox<number> = signal(2);

        let runs = 0;
        // function-form effect: runs immediately
        const dispose = effect(() => {
            // read to track dependency
            // NOTE: reading x.value, not x, to avoid accidental coercion
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            x.value;
            runs++;
        });

        // initial run
        expect(runs).toBe(1);

        // set to same value -> no emit
        x.value = 2;
        await flushEffects();
        expect(runs).toBe(1);

        // set to different value -> emit -> rerun
        x.value = 3;
        await flushEffects();
        expect(runs).toBe(2);

        dispose();
    });
});

describe("signal (decorator on fields/accessors)", () => {
    it("field: @signal redefines the property and emits only on changes", async () => {
        class C {
            @signal count = 0;
        }

        const c = new C();

        let seen: number[] = [];
        const dispose = effect(() => {
            // track the decorated field
            seen.push(c.count);
        });

        // initial immediate run
        expect(seen).toEqual([0]);

        // changing emits and re-runs
        c.count = 1;
        await flushEffects();
        expect(seen).toEqual([0, 1]);

        // same value -> no rerun
        c.count = 1;
        await flushEffects();
        expect(seen).toEqual([0, 1]);

        dispose();
    });

    it("accessor with custom {get,set}: emits even if getter result is stable (diffOnWrite=false)", async () => {
        class Mod2 {
            private _x = 0;

            // custom getter/setter means diffOnWrite=false
            @signal get x() {
                return this._x % 2;
            }

            @signal set x(v: number) {
                this._x = v;
            }
        }

        const m = new Mod2();

        let runs = 0;
        let values: number[] = [];

        const dispose = effect(() => {
            values.push(m.x);
            runs++;
        });

        // initial
        expect(runs).toBe(1);
        expect(values).toEqual([0]);

        // set to 1 -> getter returns 1 -> rerun
        m.x = 1;
        await flushEffects();
        expect(runs).toBe(2);
        expect(values).toEqual([0, 1]);

        // set to 3 -> getter still returns 1 (stable), but diffOnWrite=false -> rerun
        m.x = 3;
        await flushEffects();
        expect(runs).toBe(3);
        expect(values).toEqual([0, 1, 1]);

        dispose();
    });

    it("getSignal/markDirty interop on decorated fields", async () => {
        class C {
            @signal count = 5;
        }

        const c = new C();

        const entry = getSignal<number>(c, "count");
        expect(entry).toBeTruthy();
        expect(entry?.get()).toBe(5);

        let seen: number[] = [];
        const dispose = effect(() => {
            seen.push(c.count);
        });

        expect(seen).toEqual([5]);

        // mark as dirty without change -> still schedules a rerun
        markDirty(c, "count");
        await flushEffects();
        expect(seen).toEqual([5, 5]);

        dispose();
    });
});
