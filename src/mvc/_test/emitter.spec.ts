import {describe, it, expect} from "vitest";
import {TurboEmitter} from "../emitter/emitter";
import {TurboModel} from "../model/model";

describe("TurboEmitter", () => {
    describe("custom event add / fire / remove", () => {
        it("registers and fires callbacks for an event", () => {
            const emitter = new TurboEmitter();
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

        it("multiple callbacks on same event all fire", () => {
            const emitter = new TurboEmitter();
            const results: number[] = [];

            emitter.add("tick", () => results.push(1));
            emitter.add("tick", () => results.push(2));
            emitter.fire("tick");

            expect(results).toEqual([1, 2]);
        });

        it("removes a specific callback", () => {
            const emitter = new TurboEmitter();
            let a = 0, b = 0;
            const cbA = () => (a++);
            const cbB = () => (b++);

            emitter.add("evt", cbA);
            emitter.add("evt", cbB);

            emitter.fire("evt");
            expect(a).toBe(1);
            expect(b).toBe(1);

            emitter.remove("evt", cbA);
            emitter.fire("evt");
            expect(a).toBe(1); // cbA not called again
            expect(b).toBe(2);
        });

        it("remove with no callback clears all callbacks for that event", () => {
            const emitter = new TurboEmitter();
            let count = 0;

            emitter.add("evt", () => count++);
            emitter.add("evt", () => count++);

            emitter.fire("evt");
            expect(count).toBe(2);

            emitter.remove("evt"); // clear all
            emitter.fire("evt");
            expect(count).toBe(2); // no more callbacks
        });

        it("firing an unregistered event does not throw", () => {
            const emitter = new TurboEmitter();
            expect(() => emitter.fire("unknown")).not.toThrow();
        });
    });

    describe("model-key scoped callbacks: addKey / fireKey / removeKey", () => {
        it("addKey / fireKey invokes callbacks with value and keys", () => {
            const emitter = new TurboEmitter();
            const seen: Array<{value: any; keys: any[]}> = [];

            emitter.addKey((value, ...keys) => seen.push({value, keys}), "name");
            emitter.fireKey("Alice", "name");

            expect(seen).toHaveLength(1);
            expect(seen[0]).toEqual({value: "Alice", keys: ["name"]});
        });

        it("addKey callbacks are scoped to their key path", () => {
            const emitter = new TurboEmitter();
            const seenA: any[] = [];
            const seenB: any[] = [];

            emitter.addKey((v) => seenA.push(v), "a");
            emitter.addKey((v) => seenB.push(v), "b");

            emitter.fireKey(1, "a");
            emitter.fireKey(2, "b");
            emitter.fireKey(3, "a");

            expect(seenA).toEqual([1, 3]);
            expect(seenB).toEqual([2]);
        });

        it("nested key paths are scoped independently", () => {
            const emitter = new TurboEmitter();
            const top: any[] = [];
            const nested: any[] = [];

            emitter.addKey((v) => top.push(v), "data");
            emitter.addKey((v) => nested.push(v), "data", "x");

            emitter.fireKey(42, "data", "x");
            emitter.fireKey(99, "data");

            expect(top).toEqual([99]);
            expect(nested).toEqual([42]);
        });

        it("removeKey removes a specific callback", () => {
            const emitter = new TurboEmitter();
            let count = 0;
            const cb = () => count++;

            emitter.addKey(cb, "key");
            emitter.fireKey("v", "key");
            expect(count).toBe(1);

            emitter.removeKey(cb, "key");
            emitter.fireKey("v", "key");
            expect(count).toBe(1); // not called again
        });

        it("removeKey with no callback clears all callbacks for that key path", () => {
            const emitter = new TurboEmitter();
            let count = 0;
            emitter.addKey(() => count++, "x");
            emitter.addKey(() => count++, "x");

            emitter.fireKey("v", "x");
            expect(count).toBe(2);

            emitter.removeKey(undefined, "x");
            emitter.fireKey("v", "x");
            expect(count).toBe(2); // all cleared
        });

        it("firing an unregistered key path does not throw", () => {
            const emitter = new TurboEmitter();
            expect(() => emitter.fireKey(42, "no-such-key")).not.toThrow();
        });
    });

    describe("model integration", () => {
        it("accepts a model reference", () => {
            const model = new TurboModel({data: {x: 1}});
            const emitter = new TurboEmitter(model);
            expect(emitter.model).toBe(model);
        });

        it("model can be set after construction", () => {
            const emitter = new TurboEmitter();
            const model = new TurboModel({data: {}});
            emitter.model = model;
            expect(emitter.model).toBe(model);
        });
    });
});