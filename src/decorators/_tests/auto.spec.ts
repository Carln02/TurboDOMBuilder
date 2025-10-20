import {describe, it, expect, vi} from "vitest";
import {auto} from "../auto/auto";

describe("@auto", () => {
    it("initializes via field initializer and reads/writes through generated accessors", () => {
        class F {
            @auto() value = 10;
        }

        const f = new F();
        f.value = 10;
        expect(f.value).toBe(10);
        f.value = 42;
        expect(f.value).toBe(42);
    });

    it("wraps a setter, stores to backing, and generates getter", () => {
        const spy = vi.fn();

        class A {
            @auto() set n(v: number) { spy(v); }
        }

        const a = new A();
        a.n = 7;
        expect(spy).toHaveBeenCalledWith(7);
        expect(a.n).toBe(7);

        const desc = Object.getOwnPropertyDescriptor(A.prototype, "n");
        expect(typeof desc?.get).toBe("function");
        expect(typeof desc?.set).toBe("function");
    });

    it("respects returnDefinedGetterValue when true", () => {
        class B {
            #hidden = 5;

            @auto({returnDefinedGetterValue: true})
            get k() { return this.#hidden * 2; }

            set k(v: number) { this.#hidden = v; }
        }

        const b = new B();
        expect(b.k).toBe(10);
        b.k = 11;
        expect(b.k).toBe(22);
    });

    it("honors cancelIfUnchanged and avoids re-calling user setter", () => {
        const setSpy = vi.fn();

        class S2 {
            @auto() set v(n: number) { setSpy(n); }
        }

        const s2 = new S2();
        s2.v = 10;
        s2.v = 10;
        expect(setSpy).toHaveBeenCalledTimes(1);
        expect(s2.v).toBe(10);
    });

    it("by default reads backing (not user getter) unless returnDefinedGetterValue=true", () => {
        class G {
            #v = 21;

            @auto() get x() { return this.#v * 2; }
        }

        const g = new G();
        expect(g.x).toBeUndefined();

        class G2 {
            #v = 7;

            @auto({returnDefinedGetterValue: true}) get y() { return this.#v * 3; }
        }

        const g2 = new G2();
        expect(g2.y).toBe(21);
    });

    it("applies preprocessValue before storing/forwarding", () => {
        const spy = vi.fn();

        class C {
            @auto({preprocessValue: (v: string) => String(v).trim().toUpperCase()})
            set name(v: string) { spy(v); }
        }

        const c = new C();
        c.name = "  alice  ";
        expect(c.name).toBe("ALICE");
        expect(spy).toHaveBeenCalledWith("ALICE");
    });
});