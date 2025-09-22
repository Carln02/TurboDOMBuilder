import { describe, it, expect, vi, beforeEach } from "vitest";
import {callOnce, callOncePerInstance} from "../callOnce";

describe("@callOnce", () => {
    let warnSpy: ReturnType<typeof vi.spyOn>;
    beforeEach(() => warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {}));

    it("runs the method only once per instance", () => {
        class A {
            count = 0;

            @callOnce init() {
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
            @callOnce boot() {this.n++;}
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

            @callOnce
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
                @callOnce accessor x = 1;
            }
            new B();
        };
        expect(bad).toThrow(/can only be used on methods/);
    });
});

describe("callOncePerInstance (stage-3 decorator)", () => {
    it("runs only once per instance (method style)", () => {
        class W {
            count = 0;
            @callOncePerInstance() run() {
                this.count++;
                return "ran";
            }
        }

        const w = new W();
        expect(w.run()).toBe("ran");
        expect(w.run()).toBeUndefined();
        expect(w.count).toBe(1);
    });

    it("resets across different instances", () => {
        class W {
            count = 0;
            @callOncePerInstance() run() {this.count++;}
        }

        const a = new W();
        const b = new W();

        a.run();
        a.run();
        b.run();

        expect(a.count).toBe(1);
        expect(b.count).toBe(1);
    });

    it("shared explicit key causes subsequent decorated methods to no-op", () => {
        const KEY = Symbol("once-key");

        class K {
            aCalls = 0;
            bCalls = 0;

            @callOncePerInstance(KEY) callA() {
                this.aCalls++;
                return "A";
            }

            @callOncePerInstance(KEY) callB() {
                this.bCalls++;
                return "B";
            }
        }

        const k = new K();

        expect(k.callA()).toBe("A");
        expect(k.callB()).toBeUndefined();

        expect(k.aCalls).toBe(1);
        expect(k.bCalls).toBe(0);
    });

    it("different keys are independent (each runs once)", () => {
        class Z {
            a = 0;
            b = 0;

            @callOncePerInstance("k1") first() { this.a++; return "F"; }
            @callOncePerInstance("k2") second() { this.b++; return "S"; }
        }

        const z = new Z();
        expect(z.first()).toBe("F");
        expect(z.second()).toBe("S");
        expect(z.first()).toBeUndefined();
        expect(z.second()).toBeUndefined();
        expect(z.a).toBe(1);
        expect(z.b).toBe(1);
    });
});