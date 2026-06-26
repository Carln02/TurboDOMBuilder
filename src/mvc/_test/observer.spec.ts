import {describe, it, expect} from "vitest";
import {TurboObserver} from "../model/observer";
import {TurboModel} from "../model/model";

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

    // ── generateObserver path tests ───────────────────────────────────────────────

    describe("generateObserver paths", () => {
        it("ALL: fires onAdded for all existing children", () => {
            const model = TurboModel.create({data: {a: 1, b: 2, c: 3}, initialize: true});
            const added: string[] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys[0] as string)
            });
            expect(added.sort()).toEqual(["a", "b", "c"]);
        });

        it("ALL: fires onAdded for children added after observer creation", () => {
            const model = TurboModel.create({data: {} as Record<string, number>, initialize: true});
            const added: string[] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => { added.push(keys[0] as string); return {}; }
            });
            model.set(10, "x" as any);
            model.set(20, "y" as any);
            expect(added.sort()).toEqual(["x", "y"]);
        });

        it("ALL, ALL: fires onAdded for all existing leaf entries", () => {
            const model = TurboModel.create({
                data: {row0: {a: 1, b: 2}, row1: {c: 3}},
                initialize: true
            });
            const added: string[][] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => { added.push(keys as string[]); }
            }, TurboModel.ALL);
            expect(added).toHaveLength(3);
            expect(added.map(k => k.join(".")).sort()).toEqual(["row0.a", "row0.b", "row1.c"]);
        });

        it("ALL, ALL: fires onAdded for leaf entries added after observer creation", () => {
            const model = TurboModel.create({data: {row0: {}}, initialize: true});
            model.bubbleChanges = true;
            const added: string[][] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys as string[])
            }, TurboModel.ALL);

            model.set(99, "row0", "x");
            model.set({"y": 42}, "row1");
            model.set(42, "row1", "y");
            expect(added.map(k => k.join(".")).sort()).toEqual(["row0.x", "row1.y"]);
        });

        it("ALL, ALL: fires onAdded when a new top-level row is added with existing children", () => {
            const model = TurboModel.create({data: {}, initialize: true});
            const added: string[][] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys as string[])
            }, TurboModel.ALL);

            model.set({p: 1, q: 2}, "row0");
            expect(added.map(k => k.join(".")).sort()).toEqual(["row0.p", "row0.q"]);
        });

        it("ALL, 5, 4, ALL: fires onAdded only for leaf entries at correct path", () => {
            const model = TurboModel.create({
                data: {
                    row0: {5: {4: {leaf0: "v0", leaf1: "v1"}}},
                    row1: {5: {4: {leaf2: "v2"}}},
                },
                initialize: true
            });
            const added: string[][] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys as string[])
            }, TurboModel.ALL, "5", "4");

            expect(added).toHaveLength(3);
            expect(added.map(k => k.join(".")).sort()).toEqual([
                "row0.5.4.leaf0", "row0.5.4.leaf1", "row1.5.4.leaf2"
            ]);
        });

        it("ALL, 5, 4, ALL: fires onAdded for new leaf entries added after observer creation", () => {
            const model = TurboModel.create({data: {row0: {5: {4: {}}}}, initialize: true});
            const added: string[][] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys as string[])
            }, TurboModel.ALL, "5", "4");

            model.set("newVal", "row0", "5", "4", "newLeaf");
            expect(added.map(k => k.join(".")).sort()).toEqual(["row0.5.4.newLeaf"]);
        });

        it("onUpdated fires with correct keys on subsequent change", () => {
            const model = TurboModel.create({data: {a: 1}, initialize: true});
            const updated: any[][] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => ({id: keys[0]}),
                onUpdated: (_d, _i, _s, ...keys) => updated.push(keys as any[]),
            });

            model.set(99, "a");
            expect(updated).toHaveLength(2);
            expect(updated[0]).toEqual(["a"]);
        });

        it("onDeleted fires and removes instance on delete", () => {
            const model = TurboModel.create({data: {a: 1, b: 2}, initialize: true});
            const deleted: string[] = [];
            const obs = model.generateObserver({
                onAdded: (_d, _s, ...keys) => ({id: keys[0]}),
            });
            obs.onDeleted.add((_d, _i, _s, ...keys) => deleted.push(keys[0] as string));

            model.delete("a");
            expect(deleted).toEqual(["a"]);
            expect(obs.get("a")).toBeUndefined();
        });

        it("destroy() unregisters the observer so future changes don't fire", () => {
            const model = TurboModel.create({data: {}, initialize: true});
            const added: string[] = [];
            const obs = model.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys[0] as string)
            }, TurboModel.ALL);

            obs.destroy();
            model.set(1, "z");
            expect(added).toHaveLength(0);
        });
    });
});
// ── Flat observer: deep nested deletion must not fire onDeleted at top-level ─────────────────
// Guards the bug where matchObserverAndNotify propagated deleted=true from a deep nested
// deletion to a flat (no ALL) observer, causing onDeleted to fire for the top-level key even
// though that key was never removed.

describe("flat observer — deep nested deletion fires onUpdated, not onDeleted", () => {
    it("deleting a depth-2 key fires onUpdated (not onDeleted) on the flat observer", () => {
        const model = TurboModel.create({
            data: {flow: {entries: {a: "x", b: "y"}}},
            initialize: true,
        });
        const deleted: string[] = [];
        const updated: string[] = [];
        const obs = model.generateObserver<any, {id: string}>({
            onAdded: (_d, _s, ...keys) => ({id: keys[0] as string}),
            onUpdated: (_d, _i, _s, ...keys) => updated.push(keys[0] as string),
            onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[0] as string),
        });

        expect(obs.size).toBe(1);
        expect(obs.get("flow")).toBeDefined();

        // Delete a key 2 levels deep — "flow" itself is NOT removed
        model.delete("flow", "entries", "a");

        expect(deleted).toHaveLength(0);          // onDeleted must NOT fire for "flow"
        expect(updated).toContain("flow");         // onUpdated SHOULD fire for "flow"
        expect(obs.get("flow")).toBeDefined();     // instance must still be in the observer
        expect(obs.size).toBe(1);
    });

    it("deleting the actual top-level key correctly fires onDeleted", () => {
        const model = TurboModel.create({
            data: {flow: {entries: {a: "x"}}},
            initialize: true,
        });
        const deleted: string[] = [];
        model.generateObserver<any, {id: string}>({
            onAdded: (_d, _s, ...keys) => ({id: keys[0] as string}),
            onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[0] as string),
        });

        model.delete("flow");
        expect(deleted).toContain("flow");
    });
});

// ── Cascade deletion (depth-2 observer, 3+ outer keys) ───────────────────────────────────────
// These tests guard against the bug where deleting one inner/outer entry corrupts siblings.

describe("cascade deletion with 3+ outer keys (ALL observer)", () => {
    function makeObs(model: TurboModel) {
        return model.generateObserver<any, {id: string}>({
            onAdded: (_d, _s, ...keys) => ({id: keys.join(".")}),
        }, TurboModel.ALL);
    }

    it("depth-2 inner delete does not remove sibling entries", () => {
        const model = TurboModel.create({
            data: {A: {0: "fa"}, B: {0: "fb"}, C: {0: "fc"}},
            initialize: true,
        });
        const obs = makeObs(model);
        expect(obs.size).toBe(3);

        model.delete("C", "0");

        expect(obs.get("C", "0")).toBeUndefined();
        expect(obs.get("A", "0")).toBeDefined();
        expect(obs.get("B", "0")).toBeDefined();
        expect(obs.size).toBe(2);
    });

    it("outer key delete (Bug 2 cascade) does not remove sibling entries", () => {
        const model = TurboModel.create({
            data: {A: {0: "fa"}, B: {0: "fb"}, C: {0: "fc"}},
            initialize: true,
        });
        const obs = makeObs(model);
        expect(obs.size).toBe(3);

        model.delete("C");

        expect(obs.get("C", "0")).toBeUndefined();
        expect(obs.get("A", "0")).toBeDefined();
        expect(obs.get("B", "0")).toBeDefined();
        expect(obs.size).toBe(2);
    });

    it("deleting in the middle does not corrupt remaining entries", () => {
        const model = TurboModel.create({
            data: {A: {0: "fa"}, B: {0: "fb"}, C: {0: "fc"}},
            initialize: true,
        });
        const obs = makeObs(model);

        model.delete("B");

        expect(obs.get("B", "0")).toBeUndefined();
        expect(obs.get("A", "0")).toBeDefined();
        expect(obs.get("C", "0")).toBeDefined();
        expect(obs.size).toBe(2);
    });
});
