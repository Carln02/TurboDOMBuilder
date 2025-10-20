import { describe, it, expect, vi, beforeEach } from "vitest";
import {callOnce, callOncePerInstance} from "../callOnce";

describe("callOnce (function wrapper)", () => {
    const delay = (ms: number) => new Promise<void>(res => setTimeout(res, ms));

    it("calls a sync function only once and caches the first result", () => {
        const fn = vi.fn((x: number) => x * 2);
        const once = callOnce(fn);

        expect(once(2)).toBe(4);
        // Subsequent calls ignore new args and return cached result
        expect(once(999)).toBe(4);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("preserves `this` on the first invocation; returns cached value thereafter", () => {
        const target = {
            factor: 3,
            calc(this: any, x: number) {
                return this.factor * x;
            }
        };
        const once = callOnce(target.calc);

        const out1 = once.call({ factor: 10 }, 2); // 20
        expect(out1).toBe(20);

        // New `this`/args are ignored; cached value returned
        const out2 = once.call({ factor: 99 }, 999);
        expect(out2).toBe(20);
    });

    it("de-dupes concurrent async calls (returns the same in-flight Promise)", async () => {
        const fn = vi.fn(async (x: number) => {
            await delay(10);
            return x * 10;
        });
        const once = callOnce(fn);

        const p1 = once(2);
        const p2 = once(999); // should be the SAME promise while in-flight
        expect(p1).toBe(p2);

        const val = await p1;
        expect(val).toBe(20);
        expect(await p2).toBe(20);
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("after async resolves, subsequent calls return the cached resolved value (not a Promise)", async () => {
        const fn = vi.fn(async () => {
            await delay(5);
            return "OK";
        });
        const once = callOnce(fn);

        const p = once();
        expect(p).toBeInstanceOf(Promise);
        await expect(p).resolves.toBe("OK");

        const again = once();
        expect(again).toBe("OK"); // cached value, not a Promise
        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("wrapping the same function twice yields the same wrapper (registry hit)", () => {
        const fn = (n: number) => n + 1;
        const w1 = callOnce(fn);
        const w2 = callOnce(fn);
        expect(w1).toBe(w2);
    });

    it("if a sync function throws, the error propagates and a later call can retry", () => {
        let tries = 0;
        const fn = vi.fn(() => {
            tries++;
            if (tries === 1) throw new Error("boom");
            return "recovered";
        });
        const once = callOnce(fn);

        expect(() => once()).toThrowError("boom");
        expect(once()).toBe("recovered");
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it("if an async function rejects, the error propagates and a later call can retry", async () => {
        let tries = 0;
        const fn = vi.fn(async () => {
            tries++;
            if (tries === 1) {
                await delay(1);
                throw new Error("nope");
            }
            await delay(1);
            return "ok";
        });
        const once = callOnce(fn);

        await expect(once()).rejects.toThrowError("nope");
        await expect(once()).resolves.toBe("ok");
        expect(fn).toHaveBeenCalledTimes(2);
    });
});

describe("@callOncePerInstance", () => {
    let warnSpy: ReturnType<typeof vi.spyOn>;
    beforeEach(() => warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {}));

    it("runs the method only once per instance", () => {
        class A {
            count = 0;

            @callOncePerInstance init() {
                this.count++;
                return "ok";
            }
        }

        const a = new A();
        expect(a.init()).toBe("ok");
        expect(a.count).toBe(1);

        expect(a.init()).toBeUndefined();
        expect(a.count).toBe(1);
        expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it("is per-instance: each instance can call once", () => {
        class A {
            n = 0;
            @callOncePerInstance boot() {this.n++;}
        }

        const a1 = new A();
        const a2 = new A();

        a1.boot();
        a2.boot();

        a1.boot();
        a2.boot();

        expect(a1.n).toBe(1);
        expect(a2.n).toBe(1);
        expect(console.warn).toHaveBeenCalledTimes(2);
    });

    it("works on static methods as well", () => {
        class S {
            static times = 0;

            @callOncePerInstance
            static setup() {
                this.times++;
                return "done";
            }
        }

        expect(S.setup()).toBe("done");
        expect(S.times).toBe(1);

        expect(S.setup()).toBeUndefined();
        expect(S.times).toBe(1);
        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it("throws if applied to non-method kinds", () => {
        const bad = () => {
            class B {
                //@ts-ignore
                @callOncePerInstance accessor x = 1;
            }
            new B();
        };
        expect(bad).toThrow(/can only be used on methods/);
    });
});