import {describe, it, expect} from "vitest";
import {TurboObserver} from "../model/observer";

function makeInstance(id: string) {
    return {id, removed: false, remove() { this.removed = true; }};
}

describe("TurboObserver", () => {

    // ── Lifecycle ─────────────────────────────────────────────────────────────

    describe("lifecycle", () => {
        it("starts uninitialized", () => {
            expect(new TurboObserver().isInitialized).toBe(false);
        });

        it("initialize() fires onInitialize and sets isInitialized", () => {
            let fired = false;
            const obs = new TurboObserver({onInitialize: () => { fired = true; }});
            obs.initialize();
            expect(obs.isInitialized).toBe(true);
            expect(fired).toBe(true);
        });

        it("initialize() is a no-op when already initialized", () => {
            let count = 0;
            const obs = new TurboObserver({onInitialize: () => count++});
            obs.initialize();
            obs.initialize();
            expect(count).toBe(1);
        });

        it("initialize: true in properties initializes immediately", () => {
            let fired = false;
            const obs = new TurboObserver({onInitialize: () => { fired = true; }, initialize: true});
            expect(obs.isInitialized).toBe(true);
            expect(fired).toBe(true);
        });

        it("destroy() clears and fires onDestroy", () => {
            let destroyed = false;
            const obs = new TurboObserver({onDestroy: () => { destroyed = true; }});
            obs.destroy(false);
            expect(destroyed).toBe(true);
            expect(obs.isInitialized).toBe(false);
        });

        it("clear(true) calls instance.remove() on all stored instances", () => {
            const inst = makeInstance("a");
            const obs = new TurboObserver<string, typeof inst>({
                onAdded: () => inst,
            });
            obs.keyChanged(["k"], "v");
            obs.clear(true);
            expect(inst.removed).toBe(true);
        });

        it("clear(false) does not call instance.remove()", () => {
            const inst = makeInstance("a");
            const obs = new TurboObserver<string, typeof inst>({onAdded: () => inst});
            obs.keyChanged(["k"], "v");
            obs.clear(false);
            expect(inst.removed).toBe(false);
            expect(obs.isInitialized).toBe(false);
        });
    });

    // ── keyChanged ────────────────────────────────────────────────────────────

    describe("keyChanged", () => {
        it("fires onAdded and stores the returned instance", () => {
            const added: string[] = [];
            const obs = new TurboObserver<string, {id: string}>({
                onAdded: (_d, _s, ...keys) => { added.push(keys[0] as string); return {id: keys[0] as string}; },
            });
            obs.keyChanged(["item1"], "data");
            expect(added).toEqual(["item1"]);
            expect(obs.get("item1" as any)).toEqual({id: "item1"});
        });

        it("fires onUpdated after onAdded on first keyChanged", () => {
            const updated: string[] = [];
            const obs = new TurboObserver<string, {id: string}>({
                onAdded: (_d, _s, ...keys) => ({id: keys[0] as string}),
                onUpdated: (_d, _i, _s, ...keys) => updated.push(keys[0] as string),
            });
            obs.keyChanged(["item1"], "data");
            expect(updated).toEqual(["item1"]);
        });

        it("fires only onUpdated on subsequent keyChanged for same key", () => {
            const added: string[] = [];
            const updated: string[] = [];
            const obs = new TurboObserver<string, {id: string}>({
                onAdded: (_d, _s, ...keys) => { added.push("add"); return {id: keys[0] as string}; },
                onUpdated: (_d, _i, _s, ...keys) => updated.push("update"),
            });
            obs.keyChanged(["k"], "first");
            obs.keyChanged(["k"], "second");
            expect(added).toHaveLength(1);
            expect(updated).toHaveLength(2);
        });

        it("fires onDeleted when deleted=true and instance exists", () => {
            const deleted: string[] = [];
            const obs = new TurboObserver<string, {id: string}>({
                onAdded: (_d, _s, ...keys) => ({id: keys[0] as string}),
                onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[0] as string),
            });
            obs.keyChanged(["item1"], "data");
            obs.keyChanged(["item1"], "data", true);
            expect(deleted).toEqual(["item1"]);
        });

        it("default onDeleted removes the instance", () => {
            const obs = new TurboObserver<string, {id: string}>({
                onAdded: (_d, _s, ...keys) => ({id: keys[0] as string}),
            });
            obs.keyChanged(["item1"], "data");
            obs.keyChanged(["item1"], "data", true);
            expect(obs.get("item1" as any)).toBeUndefined();
        });

        it("deleted=true with no existing instance is a no-op", () => {
            let called = false;
            const obs = new TurboObserver<any>({onDeleted: () => { called = true; }});
            obs.keyChanged(["ghost"], "data", true);
            expect(called).toBe(false);
        });

        it("onAdded returning void stores nothing and skips onUpdated", () => {
            const updated: any[] = [];
            const obs = new TurboObserver<string, object>({
                onUpdated: (_d, _i, _s, ...keys) => updated.push(keys[0]),
            });
            obs.keyChanged(["item"], "data");
            expect(obs.get("item" as any)).toBeUndefined();
            expect(updated).toHaveLength(0);
        });

        it("default onUpdated sets data on instance with .data field", () => {
            let instanceData: any = null;
            const obs = new TurboObserver<string, {data: any}>({
                onAdded: () => ({ data: null }),
            });
            obs.keyChanged(["k"], "initial");
            const inst = obs.get("k" as any);
            obs.keyChanged(["k"], "updated");
            expect(inst.data).toBe("updated");
        });

        it("default onUpdated sets dataId on instance with .dataId field", () => {
            const obs = new TurboObserver<string, {dataId: any}>({
                onAdded: () => ({dataId: null}),
            });
            obs.keyChanged(["myKey"], "v");
            const inst = obs.get("myKey" as any);
            expect(inst.dataId).toBe("myKey");
        });

        it("works with multi-level key paths", () => {
            const obs = new TurboObserver<string, {label: string}>({
                onAdded: (_d, _s, ...keys) => ({label: keys.join(".")}),
            });
            obs.keyChanged(["group1", "item1"], "data");
            const inst = obs.get("group1" as any, "item1" as any);
            expect(inst?.label).toBe("group1.item1");
        });

        it("works with depth-3 key paths", () => {
            const obs = new TurboObserver<string, {path: string}>({
                onAdded: (_d, _s, ...keys) => ({path: keys.join("/")}),
            });
            obs.keyChanged(["a", "b", "c"], "deep");
            const inst = obs.get("a" as any, "b" as any, "c" as any);
            expect(inst?.path).toBe("a/b/c");
        });
    });

    // ── remove / detach ───────────────────────────────────────────────────────

    describe("remove / detach", () => {
        it("remove() deletes from the map and calls instance.remove()", () => {
            const inst = makeInstance("x");
            const obs = new TurboObserver<string, typeof inst>({onAdded: () => inst});
            obs.keyChanged(["k"], "v");
            obs.remove("k" as any);
            expect(obs.get("k" as any)).toBeUndefined();
            expect(inst.removed).toBe(true);
        });

        it("detach() removes from the map without calling instance.remove()", () => {
            const inst = makeInstance("x");
            const obs = new TurboObserver<string, typeof inst>({onAdded: () => inst});
            obs.keyChanged(["k"], "v");
            obs.detach("k" as any);
            expect(obs.get("k" as any)).toBeUndefined();
            expect(inst.removed).toBe(false);
        });

        it("removeValue() removes the first matching instance", () => {
            const inst = makeInstance("x");
            const obs = new TurboObserver<string, typeof inst>({onAdded: () => inst});
            obs.keyChanged(["k"], "v");
            obs.removeValue(inst);
            expect(obs.get("k" as any)).toBeUndefined();
        });

        it("hasValue() returns true when the instance is stored", () => {
            const inst = makeInstance("x");
            const obs = new TurboObserver<string, typeof inst>({onAdded: () => inst});
            obs.keyChanged(["k"], "v");
            expect(obs.hasValue(inst)).toBe(true);
        });

        it("hasValue() returns false after removal", () => {
            const inst = makeInstance("x");
            const obs = new TurboObserver<string, typeof inst>({onAdded: () => inst});
            obs.keyChanged(["k"], "v");
            obs.detach("k" as any);
            expect(obs.hasValue(inst)).toBe(false);
        });
    });
});