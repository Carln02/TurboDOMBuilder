import {describe, it, expect, vi} from "vitest";
import {
    disposeEffect,
    effect,
    getSignal,
    initializeEffects,
    markDirty,
    setSignal,
    signal
} from "../reactivity/reactivity";
import {SignalBox} from "../reactivity/reactivity.types";

async function flushMicrotasks(times = 2) {
    for (let i = 0; i < times; i++) await Promise.resolve();
}

describe("@signal — fields", () => {
    it("reacts to field changes and re-runs effect once per microtask batch", async () => {
        class A {
            @signal foo = 1;
        }

        const a = new A();

        let runs = 0;
        let seen: number | undefined;

        const stop = effect(() => {
            runs++;
            seen = a.foo;
        });

        expect(runs).toBe(1);
        expect(seen).toBe(1);

        a.foo = 2;
        await flushMicrotasks();
        expect(runs).toBe(2);
        expect(seen).toBe(2);

        // Coalesce multiple sync updates
        a.foo = 3;
        a.foo = 4;
        a.foo = 5;
        await flushMicrotasks();
        expect(runs).toBe(3);
        expect(seen).toBe(5);

        // markDirty forces re-run even with same value
        const before = runs;
        a.foo = 5; // no change
        await flushMicrotasks();
        expect(runs).toBe(before); // unchanged
        markDirty(a, "foo");
        await flushMicrotasks();
        expect(runs).toBe(before + 1);

        stop(); // dispose
        a.foo = 42;
        await flushMicrotasks();
        expect(seen).toBe(5); // no further runs after dispose
    });

    it("supports setSignal() and getSignal().update()", async () => {
        class B {
            @signal bar = 10;
        }

        const b = new B();

        let seen: number | undefined;
        effect(() => {
            seen = b.bar;
        });

        await flushMicrotasks();
        setSignal(b, "bar", 11);
        await flushMicrotasks();
        expect(seen).toBe(11);

        const entry = getSignal<number>(b, "bar")!;
        expect(entry).toBeTruthy();

        entry.update((prev) => prev + 9);
        await flushMicrotasks();
        expect(seen).toBe(20);
    });
});

describe("@signal — auto-accessors", () => {
    it("tracks reads and notifies on writes for accessor", async () => {
        class C {
            @signal accessor count = 0;
        }

        const c = new C();

        let runs = 0;
        let seen = -1;

        effect(() => {
            runs++;
            seen = c.count;
        });

        expect(runs).toBe(1);
        expect(seen).toBe(0);

        c.count = 1;
        await flushMicrotasks();
        expect(runs).toBe(2);
        expect(seen).toBe(1);

        getSignal<number>(c, "count")!.update((n) => n + 4);
        await flushMicrotasks();
        expect(runs).toBe(3);
        expect(seen).toBe(5);
    });
});

describe("@signal — regular getter/setter", () => {
    it("tracks from getter and emits from setter (decorate both)", async () => {
        class G {
            private _x = 1;
            getXCalls = 0;

            @signal
            get x() {
                this.getXCalls++;
                return this._x * 2;
            }

            @signal
            set x(v: number) {
                this._x = v;
            }
        }

        const g = new G();

        let runs = 0;
        let seen = -1;

        effect(() => {
            runs++;
            seen = g.x;
        });

        expect(runs).toBe(1);
        expect(seen).toBe(2);
        expect(g.getXCalls).toBe(1); // no double evaluation on initial run

        g.x = 5; // triggers emit via setter
        await flushMicrotasks();
        expect(runs).toBe(2);
        expect(seen).toBe(10);
        // On re-run, getter should be evaluated once
        expect(g.getXCalls).toBe(2);

        // Multiple sync sets coalesce to one re-run
        g.x = 6;
        g.x = 7;
        g.x = 8;
        await flushMicrotasks();
        expect(runs).toBe(3);
        expect(seen).toBe(16);
        expect(g.getXCalls).toBe(3);
    });

    it("tracks from getter and emits from setter (decorate only setter)", async () => {
        class G {
            private _x = 1;
            getXCalls = 0;

            get x() {
                this.getXCalls++;
                return this._x * 2;
            }

            @signal
            set x(v: number) {
                this._x = v;
            }
        }

        const g = new G();

        let runs = 0;
        let seen = -1;

        effect(() => {
            runs++;
            seen = g.x;
        });

        expect(runs).toBe(1);
        expect(seen).toBe(2);
        expect(g.getXCalls).toBe(1); // no double evaluation on initial run

        g.x = 5; // triggers emit via setter
        await flushMicrotasks();
        expect(runs).toBe(2);
        expect(seen).toBe(10);
        // On re-run, getter should be evaluated once
        expect(g.getXCalls).toBe(2);

        // Multiple sync sets coalesce to one re-run
        g.x = 6;
        g.x = 7;
        g.x = 8;
        await flushMicrotasks();
        expect(runs).toBe(3);
        expect(seen).toBe(16);
        expect(g.getXCalls).toBe(3);
    });

    it("tracks from getter and emits from setter (decorate only getter)", async () => {
        class G {
            private _x = 1;
            getXCalls = 0;

            @signal
            get x() {
                this.getXCalls++;
                return this._x * 2;
            }

            set x(v: number) {
                this._x = v;
            }
        }

        const g = new G();

        let runs = 0;
        let seen = -1;

        effect(() => {
            runs++;
            seen = g.x;
        });

        expect(runs).toBe(1);
        expect(seen).toBe(2);
        expect(g.getXCalls).toBe(1); // no double evaluation on initial run

        g.x = 5; // triggers emit via setter
        await flushMicrotasks();
        expect(runs).toBe(2);
        expect(seen).toBe(10);
        // On re-run, getter should be evaluated once
        expect(g.getXCalls).toBe(2);

        // Multiple sync sets coalesce to one re-run
        g.x = 6;
        g.x = 7;
        g.x = 8;
        await flushMicrotasks();
        expect(runs).toBe(3);
        expect(seen).toBe(16);
        expect(g.getXCalls).toBe(3);
    });
});

describe("@signal — statics", () => {
    it("reacts to static field changes", async () => {
        class S {
            @signal static value = 0;
        }

        let runs = 0;
        let seen = -1;

        effect(() => {
            runs++;
            seen = S.value;
        });

        expect(runs).toBe(1);
        expect(seen).toBe(0);

        S.value = 3;
        await flushMicrotasks();
        expect(runs).toBe(2);
        expect(seen).toBe(3);
    });
});

describe("Effects — multiple effects & cleanup", () => {
    it("notifies all observers, and disposed effect stops receiving updates", async () => {
        class M {
            @signal n = 0;
        }

        const m = new M();

        let aRuns = 0, bRuns = 0;
        const stopA = effect(() => {
            aRuns++; /* read */ m.n;
        });
        const stopB = effect(() => {
            bRuns++; /* read */ m.n;
        });

        expect(aRuns).toBe(1);
        expect(bRuns).toBe(1);

        m.n = 1;
        await flushMicrotasks();
        expect(aRuns).toBe(2);
        expect(bRuns).toBe(2);

        // dispose A
        stopA();
        m.n = 2;
        await flushMicrotasks();
        expect(aRuns).toBe(2); // unchanged
        expect(bRuns).toBe(3); // B still re-runs
    });
});

describe("Subscriptions via getSignal()", () => {
    it("custom subscribers receive notifications", async () => {
        class T {
            @signal t = 1;
        }
        const t = new T();

        const spy = vi.fn();
        const entry = getSignal<number>(t, "t")!;
        const off = entry.sub(spy);

        t.t = 2;
        await flushMicrotasks();
        expect(spy).toHaveBeenCalledTimes(1);

        // no notification if no change
        t.t = 2;
        await flushMicrotasks();
        expect(spy).toHaveBeenCalledTimes(1);

        // force via emit
        entry.emit();
        await flushMicrotasks();
        expect(spy).toHaveBeenCalledTimes(2);

        off(); // unsubscribe
        t.t = 3;
        await flushMicrotasks();
        expect(spy).toHaveBeenCalledTimes(2);
    });
});

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
        await flushMicrotasks();
        expect(runs).toBe(1);

        // set to different value -> emit -> rerun
        x.value = 3;
        await flushMicrotasks();
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
        await flushMicrotasks();
        expect(seen).toEqual([0, 1]);

        // same value -> no rerun
        c.count = 1;
        await flushMicrotasks();
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
        await flushMicrotasks();
        expect(runs).toBe(2);
        expect(values).toEqual([0, 1]);

        // set to 3 -> getter still returns 1 (stable), but diffOnWrite=false -> rerun
        m.x = 3;
        await flushMicrotasks();
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
        await flushMicrotasks();
        expect(seen).toEqual([5, 5]);

        dispose();
    });
});

describe("effect (function form)", () => {
    it("runs immediately and reruns on dependency changes", async () => {
        const x: SignalBox<number> = signal(0);

        let seen: number[] = [];
        const stop = effect(() => {
            seen.push(x.value);
        });

        // initial run
        expect(seen).toEqual([0]);

        // change -> rerun
        x.value = 1;
        await flushMicrotasks();
        expect(seen).toEqual([0, 1]);

        // change again -> rerun
        x.value = 2;
        await flushMicrotasks();
        expect(seen).toEqual([0, 1, 2]);

        // dispose stops further runs
        stop();
        x.value = 3;
        await flushMicrotasks();
        expect(seen).toEqual([0, 1, 2]);
    });
});

describe("effect (decorator form, deferred start)", () => {
    it("does not run until initializeEffects(instance) is called", async () => {
        class VM {
            @signal count = 0;

            seen: number[] = [];

            @effect autorun() {
                // reads the decorated signal to track
                this.seen.push(this.count);
            }
        }

        const vm = new VM();

        // Not started yet
        expect(vm.seen).toEqual([]);

        // Start all decorated effects now
        initializeEffects(vm);
        expect(vm.seen).toEqual([0]);

        // mutate -> rerun
        vm.count = 1;
        await flushMicrotasks();
        expect(vm.seen).toEqual([0, 1]);

        // dispose a single effect by name
        disposeEffect(vm, "autorun");
        vm.count = 2;
        await flushMicrotasks();
        expect(vm.seen).toEqual([0, 1]); // no more runs
    });
});
