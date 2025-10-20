import {describe, it, expect, vi, beforeEach, afterEach} from "vitest";
import {cache, clearCache, clearCacheEntry} from "../cache/cache";

describe("@cache", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    it("caches by argument list", () => {
        class C {
            calls = 0;

            @cache() sum(a: number, b: number) {
                this.calls++;
                return a + b;
            }
        }

        const c = new C();
        expect(c.sum(1, 2)).toBe(3);
        expect(c.sum(1, 2)).toBe(3);
        expect(c.calls).toBe(1); // cached

        expect(c.sum(2, 2)).toBe(4);
        expect(c.calls).toBe(2);
    });

    it("invalidates entries after timeout", () => {
        class C {
            calls = 0;

            @cache({timeout: 1000}) sum(a: number, b: number) {
                this.calls++;
                return a + b;
            }
        }

        const c = new C();
        expect(c.sum(1, 2)).toBe(3);
        expect(c.calls).toBe(1);

        vi.advanceTimersByTime(999);
        expect(c.sum(1, 2)).toBe(3);
        expect(c.calls).toBe(1);

        vi.advanceTimersByTime(1);
        expect(c.sum(1, 2)).toBe(3);
        expect(c.calls).toBe(2);
    });

    it("clearOnNextFrame invalidates method cache on next tick", () => {
        class C {
            calls = 0;

            @cache({clearOnNextFrame: true}) greet(name: string) {
                this.calls++;
                return `hi ${name}`;
            }
        }

        const c = new C();
        expect(c.greet("a")).toBe("hi a");
        expect(c.greet("a")).toBe("hi a");
        expect(c.calls).toBe(1); // cached this tick

        // rAF (or setTimeout(0)) clears before the next turn
        vi.runAllTimers();
        expect(c.greet("a")).toBe("hi a");
        expect(c.calls).toBe(2);
    });

    it("caches a getter once per instance", () => {
        class G {
            calls = 0;

            @cache() get value() {
                this.calls++;
                return 42;
            }
        }

        const g = new G();
        expect(g.value).toBe(42);
        expect(g.value).toBe(42);
        expect(g.calls).toBe(1);
    });

    it("invalidates getter after timeout", () => {
        class G {
            calls = 0;

            @cache({timeout: 10}) get value() {
                this.calls++;
                return 1;
            }
        }

        const g = new G();
        expect(g.value).toBe(1);
        expect(g.calls).toBe(1);

        vi.advanceTimersByTime(9);
        expect(g.value).toBe(1);
        expect(g.calls).toBe(1);

        vi.advanceTimersByTime(1);
        expect(g.value).toBe(1);
        expect(g.calls).toBe(2);
    });

    it("clearOnNextFrame invalidates getter next tick", () => {
        class G {
            calls = 0;

            @cache({clearOnNextFrame: true}) get value() {
                this.calls++;
                return 7;
            }
        }

        const g = new G();
        expect(g.value).toBe(7);
        expect(g.value).toBe(7);
        expect(g.calls).toBe(1);

        vi.runAllTimers();
        expect(g.value).toBe(7);
        expect(g.calls).toBe(2);
    });

    it("caches accessor get; set invalidates", () => {
        class A {
            @cache() accessor x = 1;
            calls = 0;

            @cache({onFieldChange: "x"}) get computed() {
                this.calls++;
                return this.x * 2;
            }
        }

        const a = new A();
        expect(a.computed).toBe(2);
        expect(a.computed).toBe(2);
        expect(a.calls).toBe(1);

        // change underlying accessor -> should invalidate computed getter cache (via our delete on set)
        a.x = 3;
        expect(a.computed).toBe(6);
        expect(a.calls).toBe(2);

        // cached again
        expect(a.computed).toBe(6);
        expect(a.calls).toBe(2);
    });

    it("onEvent invalidates when the event fires", () => {
        class E extends EventTarget {
            calls = 0;

            @cache({onEvent: "boom"}) get v() {
                this.calls++;
                return "X";
            }
        }

        const e = new E();
        expect(e.v).toBe("X");
        expect(e.v).toBe("X");
        expect(e.calls).toBe(1);

        e.dispatchEvent(new Event("boom"));
        expect(e.v).toBe("X");
        expect(e.calls).toBe(2);
    });

    it("onFieldChange (data prop) invalidates when the property is set", () => {
        class F {
            x = 1;

            calls = 0;

            @cache({onFieldChange: "x"}) get doubled() {
                this.calls++;
                return this.x * 2;
            }
        }

        const f = new F();

        expect(f.doubled).toBe(2);
        expect(f.doubled).toBe(2);
        expect(f.calls).toBe(1);

        f.x = 10; // should invalidate
        expect(f.doubled).toBe(20);
        expect(f.calls).toBe(2);
    });

    it("onFieldChange (method) invalidates when the method is called", () => {
        class F {
            n = 1;

            bump() { this.n++; }

            calls = 0;

            @cache({onFieldChange: "bump"}) get tripled() {
                this.calls++;
                return this.n * 3;
            }
        }

        const f = new F();
        expect(f.tripled).toBe(3);
        expect(f.tripled).toBe(3);
        expect(f.calls).toBe(1);

        f.bump(); // should invalidate first
        expect(f.tripled).toBe(6);
        expect(f.calls).toBe(2);
    });

    it("onCallback invalidates when callback returns true (or resolves truthy)", async () => {
        class Z {
            calls = 0;

            @cache({onCallback: () => true, onCallbackFrequency: 50}) get val() {
                this.calls++;
                return 123;
            }
        }

        const z = new Z();
        expect(z.val).toBe(123);
        expect(z.calls).toBe(1);

        // after 50ms, callback fires and invalidates
        vi.advanceTimersByTime(50);

        expect(z.val).toBe(123);
        expect(z.calls).toBe(2);
    });
});

describe("cache clear helpers", () => {
    it("clearCache removes all cache for an instance", () => {
        class C {
            calls = 0;

            @cache() get a() {
                this.calls++;
                return "A";
            }

            @cache() b(x: number) {
                this.calls++;
                return x * 2;
            }
        }

        const c = new C();
        c.a;
        c.a;
        c.b(1);
        c.b(1);
        expect(c.calls).toBe(2);

        clearCache(c);

        c.a;
        c.b(1);
        expect(c.calls).toBe(4);
    });

    it("clearCacheEntry removes a specific entry", () => {
        class C {
            calls = 0;

            @cache() get a() {
                this.calls++;
                return "A";
            }

            @cache() b(x: number) {
                this.calls++;
                return x * 2;
            }
        }

        const c = new C();
        c.a;
        c.a;
        c.b(1);
        c.b(1);
        expect(c.calls).toBe(2);

        clearCacheEntry(c, "a");
        c.a;
        expect(c.calls).toBe(3);

        c.b(1);
        expect(c.calls).toBe(3);
    });
});
