import { describe, it, expect } from "vitest";
import {TurboEmitter} from "../core/emitter";

class MiniModel {
    defaultBlockKey = "__turbo_default_block_key__";
}

describe("TurboEmitter", () => {
    it("adds and fires callbacks on default block", () => {
        const emitter = new TurboEmitter<any>(new MiniModel() as any);
        let called = 0;
        let lastArgs: any[] = [];

        emitter.add("change", (...args) => {
            called++;
            lastArgs = args;
        });

        emitter.fire("change", 1, 2, 3);
        expect(called).toBe(1);
        expect(lastArgs).toEqual([1, 2, 3]);

        emitter.fire("change", "x");
        expect(called).toBe(2);
        expect(lastArgs).toEqual(["x"]);
    });

    it("scopes by block keys with addWithBlock / fireWithBlock", () => {
        const emitter = new TurboEmitter<any>(new MiniModel() as any);
        const A = "A";
        const B = "B";
        const seen: string[] = [];

        emitter.addWithBlock("ping", A, () => seen.push("A"));
        emitter.addWithBlock("ping", B, () => seen.push("B"));

        emitter.fireWithBlock("ping", A);
        emitter.fireWithBlock("ping", B);
        expect(seen).toEqual(["A", "B"]);
    });

    it("removes specific callbacks or clears key bucket", () => {
        const emitter = new TurboEmitter<any>(new MiniModel() as any);
        let a = 0, b = 0;

        const cbA = () => (a += 1);
        const cbB = () => (b += 1);

        emitter.add("evt", cbA);
        emitter.add("evt", cbB);

        emitter.fire("evt");
        expect(a).toBe(1);
        expect(b).toBe(1);

        emitter.remove("evt", cbA);
        emitter.fire("evt");
        expect(a).toBe(1);
        expect(b).toBe(2);

        emitter.remove("evt"); // clear all for key
        emitter.fire("evt");
        expect(a).toBe(1);
        expect(b).toBe(2);
    });
});
