import {describe, it, expect, vi} from "vitest";
import * as Y from "yjs";
import {TurboYModel} from "../model/yModel";
import {TurboModel} from "../model/model";

// ─── Helpers ──────────────────────────────────────────────────────────────────

describe("YModel", () => {
    const flush = () => new Promise(resolve => setTimeout(resolve, 0));

    /** Create a fresh Yjs doc + a YMap at root */
    function makeYMapModel<T extends Record<string, any> = Record<string, any>>(
        init: T = {} as T
    ) {
        const doc = new Y.Doc();
        const ymap = doc.getMap("root");
        for (const [k, v] of Object.entries(init)) ymap.set(k, v);
        const model = TurboYModel.create({data: ymap as any, initialize: true});
        return {doc, ymap, model};
    }

    /** Create a fresh Yjs doc + a YArray at root */
    function makeYArrayModel<T = any>(init: T[] = []) {
        const doc = new Y.Doc();
        const yarray = doc.getArray<T>("root");
        if (init.length) yarray.push(init);
        const model = TurboYModel.create({data: yarray as any, initialize: true});
        return {doc, yarray, model};
    }

    /** Create a YArray of YMaps — the canonical nested structure */
    function makeNestedModel() {
        const doc = new Y.Doc();
        const yarray = doc.getArray<Y.Map<any>>("rows");
        const row0 = new Y.Map([["x", 1], ["y", 2]] as [string, any][]);
        const row1 = new Y.Map([["x", 3], ["y", 4]] as [string, any][]);
        yarray.push([row0, row1]);
        const model = TurboYModel.create({data: yarray as any, initialize: true});
        return {doc, yarray, row0, row1, model};
    }

// ─────────────────────────────────────────────────────────────────────────────
// TurboYModel — YMap basics
// ─────────────────────────────────────────────────────────────────────────────

    describe("TurboYModel — YMap", () => {

        describe("get / set / has / delete", () => {
            it("get reads from a YMap", () => {
                const {model} = makeYMapModel({name: "Alice"});
                expect(model.get("name")).toBe("Alice");
            });

            it("set writes to a YMap", () => {
                const {model} = makeYMapModel({count: 0});
                model.set(42, "count");
                expect(model.get("count")).toBe(42);
            });

            it("set with no previous key creates the entry", () => {
                const {model} = makeYMapModel({});
                model.set("hello", "greeting");
                expect(model.get("greeting")).toBe("hello");
                expect(model.has("greeting")).toBe(true);
            });

            it("set does not fire onKeyChanged when value is unchanged", () => {
                const {model} = makeYMapModel({a: 1});
                const calls: any[] = [];
                model.onKeyChanged.add(v => calls.push(v));
                model.set(1, "a");
                expect(calls).toHaveLength(0);
            });

            it("has returns true for existing key", () => {
                const {model} = makeYMapModel({x: 10});
                expect(model.has("x")).toBe(true);
                expect(model.has("z" as any)).toBe(false);
            });

            it("delete removes a key from the YMap", () => {
                const {model} = makeYMapModel({a: 1, b: 2});
                model.delete("a");
                expect(model.has("a")).toBe(false);
                expect(model.dataSize).toBe(1);
            });

            it("keys returns all YMap keys", () => {
                const {model} = makeYMapModel({p: 1, q: 2, r: 3});
                expect(model.keys).toContain("p");
                expect(model.keys).toContain("q");
                expect(model.keys).toContain("r");
                expect(model.keys).toHaveLength(3);
            });

            it("values returns all YMap values", () => {
                const {model} = makeYMapModel({a: 10, b: 20});
                expect(model.values).toContain(10);
                expect(model.values).toContain(20);
            });

            it("dataSize reflects entry count", () => {
                const {model} = makeYMapModel({a: 1, b: 2});
                expect(model.dataSize).toBe(2);
                model.set(3, "c");
                expect(model.dataSize).toBe(3);
            });
        });

        describe("onKeyChanged via model API", () => {
            it("set fires onKeyChanged with value and key", () => {
                const {model} = makeYMapModel({a: 0});
                const calls: Array<{value: any; key: any}> = [];
                model.onKeyChanged.add((value, ...keys) => calls.push({value, key: keys[0]}));
                model.set(99, "a");
                expect(calls).toHaveLength(1);
                expect(calls[0].value).toBe(99);
            });

            it("delete fires onKeyChanged", () => {
                const {model} = makeYMapModel({a: 1});
                const deleted: any[] = [];
                model.onKeyChanged.add((_v, ...keys) => deleted.push(keys[0]));
                model.delete("a");
                expect(deleted).toContain("a");
            });
        });

        describe("Yjs remote changes via YMap observer", () => {
            it("remote ymap.set fires onKeyChanged", () => {
                const {ymap, model} = makeYMapModel({});
                const calls: any[] = [];
                model.onKeyChanged.add((value, ...keys) => calls.push({value, key: keys[0]}));
                ymap.set("remote", "value");
                expect(calls.some(c => c.key === "remote")).toBe(true);
            });

            it("remote ymap.delete fires onKeyChanged with deleted=true", () => {
                const {ymap, model} = makeYMapModel({toDelete: "yes"});
                const deleted: any[] = [];
                // Use generateObserver to detect deleted flag
                model.generateObserver({
                    onAdded: () => ({}),
                    onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[0]),
                    initialize: true,
                });
                ymap.delete("toDelete");
                expect(deleted).toContain("toDelete");
            });

            it("remote change synced between two docs via Yjs provider simulation", () => {
                const doc1 = new Y.Doc();
                const doc2 = new Y.Doc();
                const map1 = doc1.getMap("root");
                const map2 = doc2.getMap("root");

                // Wire docs together manually
                doc1.on("update", (update: Uint8Array) => Y.applyUpdate(doc2, update));
                doc2.on("update", (update: Uint8Array) => Y.applyUpdate(doc1, update));

                const model2 = TurboYModel.create({data: map2 as any, initialize: true});
                const received: any[] = [];
                model2.onKeyChanged.add((value, ...keys) => received.push({value, key: keys[0]}));

                map1.set("synced", 42);
                expect(received.some(r => r.key === "synced" && r.value === 42)).toBe(true);
            });
        });

        describe("toJSON", () => {
            it("serializes a YMap to a plain object", () => {
                const {model} = makeYMapModel({x: 1, y: 2});
                const json = model.toJSON() as any;
                expect(json.x).toBe(1);
                expect(json.y).toBe(2);
            });
        });
    });

// ─────────────────────────────────────────────────────────────────────────────
// TurboYModel — YArray basics
// ─────────────────────────────────────────────────────────────────────────────

    describe("TurboYModel — YArray", () => {

        describe("get / set / add / delete / has", () => {
            it("get reads by numeric index", () => {
                const {model} = makeYArrayModel(["a", "b", "c"]);
                expect(model.get(0)).toBe("a");
                expect(model.get(2)).toBe("c");
            });

            it("set replaces at index", () => {
                const {model} = makeYArrayModel(["a", "b"]);
                model.set("z", 1);
                expect(model.get(1)).toBe("z");
            });

            it("add pushes to end", () => {
                const {model} = makeYArrayModel([1, 2]);
                model.add(3);
                expect(model.dataSize).toBe(3);
                expect(model.get(2)).toBe(3);
            });

            it("add inserts at given index", () => {
                const {model} = makeYArrayModel([1, 3]);
                model.add(2, 1);
                expect(model.get(0)).toBe(1);
                expect(model.get(1)).toBe(2);
                expect(model.get(2)).toBe(3);
            });

            it("delete removes element at index", () => {
                const {model} = makeYArrayModel(["a", "b", "c"]);
                model.delete(1);
                expect(model.dataSize).toBe(2);
                expect(model.get(0)).toBe("a");
                expect(model.get(1)).toBe("c");
            });

            it("has returns true for valid index", () => {
                const {model} = makeYArrayModel([10, 20]);
                expect(model.has(0)).toBe(true);
                expect(model.has(1)).toBe(true);
                expect(model.has(99 as any)).toBe(false);
            });

            it("keys returns numeric indices", () => {
                const {model} = makeYArrayModel([10, 20, 30]);
                expect(model.keys).toEqual([0, 1, 2]);
            });

            it("dataSize reflects element count", () => {
                const {model} = makeYArrayModel([1, 2, 3]);
                expect(model.dataSize).toBe(3);
            });
        });

        describe("Yjs remote changes via YArray observer", () => {
            it("remote yarray.push fires onKeyChanged", () => {
                const {yarray, model} = makeYArrayModel<number>([]);
                const calls: any[] = [];
                model.onKeyChanged.add((_v, ...keys) => calls.push(keys[0]));
                yarray.push([99]);
                expect(calls).toContain(0);
            });

            it("remote yarray.insert fires onKeyChanged for each inserted item", () => {
                const {yarray, model} = makeYArrayModel([1, 2, 3]);
                const fired: number[] = [];
                model.onKeyChanged.add((_v, ...keys) => fired.push(keys[0] as number));
                yarray.insert(1, [10, 11]);
                expect(fired).toContain(1);
                expect(fired).toContain(2);
            });

            it("remote yarray.delete fires onKeyChanged with deleted=true", () => {
                const {yarray, model} = makeYArrayModel(["a", "b", "c"]);
                const deleted: number[] = [];
                model.generateObserver({
                    onAdded: () => ({}),
                    onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[0] as number),
                    initialize: true,
                });
                yarray.delete(1, 1);
                expect(deleted).toContain(1);
            });
        });

        describe("index shifting on insert/delete", () => {
            it("observer instances shift correctly after insert", () => {
                const {yarray, model} = makeYArrayModel(["a", "b", "c"]);
                const instances: Record<number, any> = {};
                model.generateObserver({
                    onAdded: (_d, _s, ...keys) => {
                        const inst = {dataId: keys[0]};
                        instances[keys[0] as number] = inst;
                        return inst;
                    },
                    initialize: true,
                });

                // Insert before index 1 — "b" and "c" should shift to 2 and 3
                yarray.insert(1, ["inserted"]);
                expect(model.get(0)).toBe("a");
                expect(model.get(1)).toBe("inserted");
                expect(model.get(2)).toBe("b");
            });

            it("observer instances shift correctly after delete", () => {
                const {yarray, model} = makeYArrayModel(["a", "b", "c"]);
                const addedKeys: number[] = [];
                model.generateObserver({
                    onAdded: (_d, _s, ...keys) => {
                        addedKeys.push(keys[0] as number);
                        return {dataId: keys[0]};
                    },
                    initialize: true,
                });

                yarray.delete(0, 1); // remove "a"
                expect(model.get(0)).toBe("b");
                expect(model.get(1)).toBe("c");
            });
        });
    });

// ─────────────────────────────────────────────────────────────────────────────
// TurboYModel — nested YArray of YMaps
// ─────────────────────────────────────────────────────────────────────────────

    describe("TurboYModel — nested YArray<YMap>", () => {

        describe("get / set across levels", () => {
            it("get reads nested YMap values", () => {
                const {model} = makeNestedModel();
                expect(model.get(0, "x")).toBe(1);
                expect(model.get(1, "y")).toBe(4);
            });

            it("set writes into a nested YMap", () => {
                const {model} = makeNestedModel();
                model.set(99, 0, "x");
                expect(model.get(0, "x")).toBe(99);
            });
        });

        describe("generateObserver with ALL on nested structure", () => {
            it("ALL: fires onAdded for each YArray element", () => {
                const {model} = makeNestedModel();
                const added: number[] = [];
                model.generateObserver({
                    onAdded: (_d, _s, ...keys) => added.push(keys[0] as number),
                });
                expect(added).toContain(0);
                expect(added).toContain(1);
            });

            it("ALL: fires onAdded for element added after observer creation", () => {
                const {yarray, model} = makeNestedModel();
                const added: number[] = [];
                model.generateObserver({
                    onAdded: (_d, _s, ...keys) => added.push(keys[0] as number),
                });
                const initialCount = added.length;
                const row2 = new Y.Map([["x", 5], ["y", 6]] as [string, any][]);
                yarray.push([row2]);
                expect(added.length).toBeGreaterThan(initialCount);
            });

            it("ALL: onUpdated fires when a YMap entry changes", () => {
                const {row0, model} = makeNestedModel();
                const updated: any[] = [];
                model.generateObserver({
                    onAdded: () => ({}),
                    onUpdated: (data) => updated.push(data),
                    initialize: true,
                });
                row0.set("x", 999);
                expect(updated.length).toBeGreaterThan(0);
            });

            it("ALL: onDeleted fires when a YArray element is removed", () => {
                const {yarray, model} = makeNestedModel();
                const deleted: number[] = [];
                model.generateObserver({
                    onAdded: () => ({}),
                    onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[0] as number),
                    initialize: true,
                });
                yarray.delete(0, 1);
                expect(deleted).toContain(0);
            });
        });

        describe("generateObserver with literal path into nested YMap", () => {
            it("observer on nested YMap element fires onAdded for its keys", () => {
                const {model} = makeNestedModel();
                const added: string[] = [];
                // Watch keys inside each row (ALL expands rows, then we get their keys)
                model.generateObserver({
                    onAdded: (_d, _s, ...keys) => {
                        added.push(keys[1] as string);
                        return {};
                    },
                    initialize: true,
                }, TurboModel.ALL);
                expect(added).toContain("x");
                expect(added).toContain("y");
            });

            it("observer with ALL sees new YMap keys added after creation", () => {
                const {row0, model} = makeNestedModel();
                const added: string[] = [];
                model.generateObserver({
                    onAdded: (_d, _s, ...keys) => added.push(keys[1] as string),
                    initialize: true,
                }, TurboModel.ALL);
                const initialCount = added.length;
                row0.set("z", 7);
                expect(added.length).toBeGreaterThan(initialCount);
                expect(added).toContain("z");
            });
        });

        describe("remote sync between two docs", () => {
            it("observer on doc2 fires when doc1 mutates nested YMap", () => {
                const doc1 = new Y.Doc();
                const doc2 = new Y.Doc();
                doc1.on("update", (u: Uint8Array) => Y.applyUpdate(doc2, u));
                doc2.on("update", (u: Uint8Array) => Y.applyUpdate(doc1, u));

                const arr1 = doc1.getArray<Y.Map<any>>("rows");
                const arr2 = doc2.getArray<Y.Map<any>>("rows");

                const row = new Y.Map([["score", 0]] as [string, any][]);
                arr1.push([row]);

                const model2 = TurboYModel.create({data: arr2 as any, initialize: true});
                const updated: any[] = [];
                model2.generateObserver({
                    onAdded: () => ({}),
                    onUpdated: (data) => updated.push(data),
                    initialize: true,
                });

                // Mutate on doc1 — should propagate to model2
                arr1.get(0).set("score", 100);
                expect(updated.length).toBeGreaterThan(0);
            });
        });
    });

// ─────────────────────────────────────────────────────────────────────────────
// TurboYModel — mixed nested structure
// ─────────────────────────────────────────────────────────────────────────────

    describe("TurboYModel — mixed YArray / YMap / plain nesting", () => {
        function makeMixedModel() {
            const doc = new Y.Doc();
            // Root is a YMap with a "teams" YArray, each element is a YMap
            const root = doc.getMap("root");
            const teams = new Y.Array<Y.Map<any>>();

            const team1 = new Y.Map<any>();
            team1.set("id", "team-1");
            const members1 = new Y.Map<any>();
            members1.set("alice", 95);
            members1.set("bob", 80);
            team1.set("members", members1);

            const team2 = new Y.Map<any>();
            team2.set("id", "team-2");
            const members2 = new Y.Map<any>();
            members2.set("carol", 88);
            team2.set("members", members2);

            teams.push([team1, team2]);
            root.set("teams", teams);

            const model = TurboYModel.create({data: root as any, initialize: true});
            return {doc, root, teams, team1, team2, members1, members2, model};
        }

        it("can read deeply nested values", () => {
            const {model} = makeMixedModel();
            expect(model.get("teams", 0, "id")).toBe("team-1");
            expect(model.get("teams", 0, "members", "alice")).toBe(95);
            expect(model.get("teams", 1, "members", "carol")).toBe(88);
        });

        it("can write deeply nested values", () => {
            const {model} = makeMixedModel();
            model.set(100, "teams", 0, "members", "alice");
            expect(model.get("teams", 0, "members", "alice")).toBe(100);
        });

        it("observer on teams array sees each team", () => {
            const {model} = makeMixedModel();
            const added: number[] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys[1] as number),
            }, "teams");
            expect(added).toContain(0);
            expect(added).toContain(1);
        });

        it("observer on teams ALL members sees all member keys", () => {
            const {model} = makeMixedModel();
            const added: string[] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys[3] as string),
            }, "teams", TurboModel.ALL, "members");
            expect(added).toContain("alice");
            expect(added).toContain("bob");
            expect(added).toContain("carol");
        });

        it("observer fires onUpdated when nested member score changes", () => {
            const {members1, model} = makeMixedModel();
            const updated: any[] = [];
            model.generateObserver({
                onAdded: () => ({}),
                onUpdated: (data) => updated.push(data),
            }, "teams", TurboModel.ALL, "members");
            members1.set("alice", 999);
            expect(updated).toContain(999);
        });

        it("observer fires onAdded when new member added to a team", () => {
            const {members2, model} = makeMixedModel();
            const added: string[] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys[3] as string),
            }, "teams", TurboModel.ALL, "members");
            const initialCount = added.length;
            members2.set("dave", 72);
            expect(added.length).toBeGreaterThan(initialCount);
            expect(added).toContain("dave");
        });

        it("observer fires onDeleted when member is removed", () => {
            const {members1, model} = makeMixedModel();
            const deleted: string[] = [];
            model.generateObserver({
                onAdded: () => ({}),
                onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[3] as string),
                initialize: true,
            }, "teams", TurboModel.ALL, "members");
            members1.delete("bob");
            expect(deleted).toContain("bob");
        });

        it("observer on teams fires onAdded when new team inserted", () => {
            const {teams, model} = makeMixedModel();
            const added: number[] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => {
                    added.push(keys[1] as number);
                    return {};
                },
                initialize: true,
            }, "teams");
            const initialCount = added.length;
            const team3 = new Y.Map<any>();
            team3.set("id", "team-3");
            teams.push([team3]);
            expect(added.length).toBeGreaterThan(initialCount);
        });

        it("destroy() stops observer from receiving further updates", () => {
            const {members1, model} = makeMixedModel();
            const updated: any[] = [];
            const obs = model.generateObserver({
                onAdded: () => ({}),
                onUpdated: (data) => updated.push(data),
                initialize: true,
            }, "teams", TurboModel.ALL, "members");
            obs.destroy();
            members1.set("alice", 777);
            expect(updated).not.toContain(777);
        });
    });

// ─────────────────────────────────────────────────────────────────────────────
// TurboYModel — signals
// ─────────────────────────────────────────────────────────────────────────────

    describe("TurboYModel — signals", () => {
        it("makeSignal emits when value changes via model.set", async () => {
            const {model} = makeYMapModel({count: 0});
            const sig = model.makeSignal("count");
            let emitted = false;
            sig.sub(() => { emitted = true; });
            model.set(1, "count");
            await flush();
            expect(emitted).toBe(true);
        });

        it("makeSignal emits when value changes via remote Yjs update", async () => {
            const {ymap, model} = makeYMapModel({count: 0});
            const sig = model.makeSignal("count");
            let emitted = false;
            sig.sub(() => { emitted = true; });
            ymap.set("count", 99);
            await flush();
            expect(emitted).toBe(true);
        });

        it("makeSignal does not emit when value is unchanged", async () => {
            const {model} = makeYMapModel({a: 1});
            const sig = model.makeSignal("a");
            let count = 0;
            sig.sub(() => count++);
            model.set(1, "a");
            await flush();
            expect(count).toBe(0);
        });

        it("makeSignals with ALL creates signals for every YMap key", () => {
            const {model} = makeYMapModel({x: 1, y: 2, z: 3});
            const sigs = model.makeSignals(TurboModel.ALL);
            expect(sigs).toHaveLength(3);
        });
    });

// ─────────────────────────────────────────────────────────────────────────────
// TurboYModel — clear / initialize lifecycle
// ─────────────────────────────────────────────────────────────────────────────

    describe("TurboYModel — lifecycle", () => {
        it("clear(true) stops observing Yjs changes", () => {
            const {ymap, model} = makeYMapModel({a: 1});
            const calls: any[] = [];
            model.onKeyChanged.add(v => calls.push(v));
            model.clear(true);
            ymap.set("a", 99);
            expect(calls).toHaveLength(0);
        });

        it("clear(false) retains data but resets initialized state", () => {
            const {model} = makeYMapModel({a: 1});
            model.clear(false);
            expect(model.data).toBeDefined();
            expect((model as any).isInitialized).toBe(false);
        });

        it("initialize() re-fires all keys after clear(false)", () => {
            const {model} = makeYMapModel({a: 1, b: 2});
            model.clear(false);
            const fired: string[] = [];
            model.onKeyChanged.add((_v, ...keys) => fired.push(keys[0] as string));
            model.initialize();
            expect(fired).toContain("a");
            expect(fired).toContain("b");
        });

        it("repeated data reassignment does not accumulate Yjs observers or emit warnings", () => {
            // Simulates setClip() being called multiple times (e.g. thumbnail capture path)
            // Each call: old content detached, new content attached.
            // Before the fix, detachNestedObservers called unobserve() on types that were never
            // observed (first call) or already detached, producing console.error from Yjs.
            const doc = new Y.Doc();
            const warnSpy = vi.spyOn(console, "error").mockImplementation(() => {});

            const makeContent = () => {
                const arr = new Y.Array<Y.Map<any>>();
                const item = new Y.Map([["text", "hello"]] as [string, any][]);
                arr.push([item]);
                return arr;
            };

            const content1 = makeContent();
            const content2 = makeContent();
            const content3 = makeContent();

            // Nest content under a plain-JS-object model (mimics ClipRendererModel.text.data)
            const model = TurboYModel.create({data: {content: content1} as any, initialize: true});

            // First re-assignment: old = content1 (observed), new = content2
            model.set(content2 as any, "content");
            // Second re-assignment: old = content2 (observed), new = content3
            model.set(content3 as any, "content");
            // Third re-assignment back to content1 (was detached)
            model.set(content1 as any, "content");

            expect(warnSpy).not.toHaveBeenCalled();
            warnSpy.mockRestore();
        });

        it("replacing data with new YMap re-initializes observers", () => {
            const doc = new Y.Doc();
            const map1 = doc.getMap("m1");
            map1.set("x", 1);
            const map2 = doc.getMap("m2");
            map2.set("y", 2);

            const model = TurboYModel.create({data: map1 as any, initialize: true});
            const added: string[] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys[0] as string),
                initialize: true,
            });
            expect(added).toContain("x");

            model.data = map2 as any;
            expect(added).toContain("y");
        });
    });

// ─────────────────────────────────────────────────────────────────────────────
// TurboObserver — standalone tests with YModel
// ─────────────────────────────────────────────────────────────────────────────

    describe("TurboObserver — integration with TurboYModel", () => {
        it("observer.get retrieves instance by key after onAdded", () => {
            const {model} = makeYMapModel({a: 1, b: 2});
            const obs = model.generateObserver({
                onAdded: (_d, _s, ...keys) => ({id: keys[0]}),
                initialize: true,
            });
            expect(obs.get("a" as any)).toEqual({id: "a"});
            expect(obs.get("b" as any)).toEqual({id: "b"});
        });

        it("observer.remove() calls instance.remove() and removes from map", () => {
            const {model} = makeYMapModel({a: 1});
            let removed = false;
            const obs = model.generateObserver({
                onAdded: () => ({remove() { removed = true; }}),
                initialize: true,
            });
            obs.remove("a" as any);
            expect(removed).toBe(true);
            expect(obs.get("a" as any)).toBeUndefined();
        });

        it("observer.detach() removes from map without calling remove()", () => {
            const {model} = makeYMapModel({a: 1});
            let removed = false;
            const obs = model.generateObserver({
                onAdded: () => ({remove() { removed = true; }}),
                initialize: true,
            });
            obs.detach("a" as any);
            expect(removed).toBe(false);
            expect(obs.get("a" as any)).toBeUndefined();
        });

        it("observer.hasValue() returns true when instance is stored", () => {
            const {model} = makeYMapModel({a: 1});
            const inst = {id: "a"};
            const obs = model.generateObserver({
                onAdded: () => inst,
                initialize: true,
            });
            expect(obs.hasValue(inst)).toBe(true);
        });

        it("observer.values returns all instances", () => {
            const {model} = makeYMapModel({a: 1, b: 2});
            const obs = model.generateObserver({
                onAdded: (_d, _s, ...keys) => ({id: keys[0]}),
                initialize: true,
            });
            expect(obs.values).toHaveLength(2);
        });

        it("multiple observers on same YModel all receive notifications", () => {
            const {model} = makeYMapModel({x: 0});
            const seen1: any[] = [];
            const seen2: any[] = [];
            model.generateObserver({onAdded: () => ({}), onUpdated: (d) => seen1.push(d), initialize: true});
            model.generateObserver({onAdded: () => ({}), onUpdated: (d) => seen2.push(d), initialize: true});
            model.set(42, "x");
            expect(seen1).toContain(42);
            expect(seen2).toContain(42);
        });

        it("observer on YArray with nested YMap tracks multi-level keys", () => {
            const {model} = makeNestedModel();
            const obs = model.generateObserver({
                onAdded: (_d, _s, ...keys) => ({path: keys.join(".")}),
                initialize: true,
            }, TurboModel.ALL);

            // Should have instances for keys inside each row
            expect(obs.values.length).toBeGreaterThan(0);
        });

        it("clear(true) on observer calls remove() on all instances", () => {
            const {model} = makeYMapModel({a: 1, b: 2});
            const removed: string[] = [];
            const obs = model.generateObserver({
                onAdded: (_d, _s, ...keys) => ({
                    id: keys[0] as string,
                    remove() { removed.push(this.id); }
                }),
                initialize: true,
            });
            obs.clear(true);
            expect(removed).toContain("a");
            expect(removed).toContain("b");
        });

        it("clear(false) on observer does not call remove()", () => {
            const {model} = makeYMapModel({a: 1});
            let removed = false;
            const obs = model.generateObserver({
                onAdded: () => ({remove() { removed = true; }}),
                initialize: true,
            });
            obs.clear(false);
            expect(removed).toBe(false);
            expect(obs.isInitialized).toBe(false);
        });
    });


    describe("TurboYModel — ProjectModel-like usage", () => {
        function makeProjectModel() {
            const doc = new Y.Doc();
            const root = doc.getMap("document_content");

            // Simulate ProjectModel.initialize()
            for (const key of ["cards", "nodes", "flows", "media"]) {
                if (!root.has(key)) root.set(key, new Y.Map());
            }
            root.set("counters", new Y.Map([["cards", 0], ["flows", 0]] as [string, any][]));

            const model = TurboYModel.create({data: root as any, initialize: true});
            return {doc, root, model};
        }

        it("nested model at 'cards' is a TurboYModel", () => {
            const {model} = makeProjectModel();
            const cards = model.nest("cards");
            expect(cards).toBeInstanceOf(TurboYModel);
        });

        it("generateObserver on nested 'cards' model fires onAdded for existing cards", () => {
            const {root, model} = makeProjectModel();
            const cardsMap = root.get("cards") as Y.Map<any>;
            cardsMap.set("card-1", new Y.Map([["title", "Card 1"]] as [string, any][]));
            cardsMap.set("card-2", new Y.Map([["title", "Card 2"]] as [string, any][]));

            // Re-initialize so model sees the cards
            const model2 = TurboYModel.create({data: root as any, initialize: true});
            const added: string[] = [];
            model2.generateObserver({
                onAdded: (_d, _s, ...keys) => { added.push(keys[1] as string); return {}; },
                initialize: true,
            }, "cards");

            expect(added).toContain("card-1");
            expect(added).toContain("card-2");
        });

        it("generateObserver on nested 'cards' fires onAdded when card added remotely", () => {
            const {root, model} = makeProjectModel();
            const cardsMap = root.get("cards") as Y.Map<any>;

            const added: string[] = [];
            model.generateObserver({
                onAdded: (_d, _s, ...keys) => { added.push(keys[1] as string); return {}; },
                initialize: true,
            }, "cards");

            cardsMap.set("card-1", new Y.Map([["title", "Card 1"]] as [string, any][]));
            expect(added).toContain("card-1");
        });

        it("generateObserver on nested 'nodes' fires independently from 'cards'", () => {
            const {root, model} = makeProjectModel();
            const nodesMap = root.get("nodes") as Y.Map<any>;

            const addedCards: string[] = [];
            const addedNodes: string[] = [];

            model.generateObserver({
                onAdded: (_d, _s, ...keys) => { addedCards.push(keys[1] as string); return {}; },
                initialize: true,
            }, "cards");

            model.generateObserver({
                onAdded: (_d, _s, ...keys) => { addedNodes.push(keys[1] as string); return {}; },
                initialize: true,
            }, "nodes");

            nodesMap.set("node-1", new Y.Map([["x", 10], ["y", 20]] as [string, any][]));
            expect(addedNodes).toContain("node-1");
            expect(addedCards).not.toContain("node-1");
        });

        it("nested model observer fires onUpdated when card data changes", () => {
            const {root, model} = makeProjectModel();
            const cardsMap = root.get("cards") as Y.Map<any>;
            const card1 = new Y.Map([["title", "Card 1"]] as [string, any][]);
            cardsMap.set("card-1", card1);

            const updated: any[] = [];
            model.generateObserver({
                onAdded: () => ({}),
                onUpdated: (data) => updated.push(data),
                initialize: true,
            }, "cards");

            card1.set("title", "Updated Title");
            expect(updated.length).toBeGreaterThan(0);
        });

        it("syncs cards between two docs", () => {
            const doc1 = new Y.Doc();
            const doc2 = new Y.Doc();
            doc1.on("update", (u: Uint8Array) => Y.applyUpdate(doc2, u));
            doc2.on("update", (u: Uint8Array) => Y.applyUpdate(doc1, u));

            const root1 = doc1.getMap("document_content");
            const root2 = doc2.getMap("document_content");
            root1.set("cards", new Y.Map());

            const model2 = TurboYModel.create({data: root2 as any, initialize: true});
            const added: string[] = [];
            model2.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys[1] as string)
            }, "cards");

            const cardsMap = root1.get("cards") as Y.Map<any>;
            cardsMap.set("card-1", new Y.Map([["title", "Remote Card"]] as [string, any][]));
            expect(added).toContain("card-1");
        });

        it("observer created before model initialization sees existing data when model initializes", () => {
            const doc = new Y.Doc();
            const root = doc.getMap("document_content");

            const projectMap = new Y.Map();
            root.set("project", projectMap);

            const cardsMap = new Y.Map<any>();
            cardsMap.set("card-1", new Y.Map([["title", "Card 1"]]));
            cardsMap.set("card-2", new Y.Map([["title", "Card 2"]]));
            projectMap.set("cards", cardsMap);

            const model = TurboYModel.create({data: projectMap});
            const nestedCards = model.nest("cards");
            expect(nestedCards).toBeInstanceOf(TurboYModel);

            const added: string[] = [];
            nestedCards.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys[0] as string),
            });

            expect(added).toHaveLength(0);
            model.initialize();

            expect(added).toContain("card-1");
            expect(added).toContain("card-2");
        });

        it("observer on nested model survives parent data replacement", () => {
            const doc = new Y.Doc();

            // Start with empty root
            const emptyRoot = new Y.Map<any>();
            doc.getMap("doc").set("root", emptyRoot);

            const model = TurboYModel.create({data: emptyRoot as any});

            // Create nested model and observer before data arrives
            const nestedCards = model.nest("cards");
            const added: string[] = [];
            nestedCards.generateObserver({
                onAdded: (_d, _s, ...keys) => added.push(keys[0] as string),
            });

            expect(added).toHaveLength(0);

            // Now the real data arrives — simulate async Yjs sync
            const realRoot = doc.getMap("document_content");
            const cardsMap = new Y.Map<any>();
            cardsMap.set("card-1", new Y.Map([["title", "Card 1"]] as [string, any][]));
            cardsMap.set("card-2", new Y.Map([["title", "Card 2"]] as [string, any][]));
            realRoot.set("cards", cardsMap);

            // Replace model data with real Yjs data
            model.data = realRoot as any;

            expect(added).toContain("card-1");
            expect(added).toContain("card-2");
        });
    });

// ─────────────────────────────────────────────────────────────────────────────
// Cascade deletion — YMap<string → YArray> with 3+ outer keys
// Guards the flow-entries pattern: outer keys are startNodeId strings,
// each maps to a YArray. Deleting one outer key must not corrupt siblings.
// ─────────────────────────────────────────────────────────────────────────────

    describe("cascade deletion with 3+ outer keys — YMap<string, YArray> (flow-entries pattern)", () => {
        function makeFlowEntriesModel() {
            const doc = new Y.Doc();
            const ymap = doc.getMap<Y.Array<any>>("flowEntries");

            const arrA = new Y.Array<any>();
            arrA.push(["entryA0"]);
            const arrB = new Y.Array<any>();
            arrB.push(["entryB0"]);
            const arrC = new Y.Array<any>();
            arrC.push(["entryC0"]);

            ymap.set("A", arrA);
            ymap.set("B", arrB);
            ymap.set("C", arrC);

            const model = TurboYModel.create({data: ymap as any, initialize: true});
            return {doc, ymap, arrA, arrB, arrC, model};
        }

        function makeObs(model: TurboYModel) {
            return model.generateObserver<any, {id: string}>({
                onAdded: (_d, _s, ...keys) => ({id: keys.join(".")}),
            }, TurboModel.ALL);
        }

        it("outer-key delete (Bug 2 cascade) via ymap.delete does not remove sibling entries", () => {
            const {ymap, model} = makeFlowEntriesModel();
            const obs = makeObs(model);
            expect(obs.size).toBe(3);

            ymap.delete("C");

            expect(obs.get("C", 0)).toBeUndefined();
            expect(obs.get("A", 0)).toBeDefined();
            expect(obs.get("B", 0)).toBeDefined();
            expect(obs.size).toBe(2);
        });

        it("inner-array delete via arr.delete does not remove sibling entries", () => {
            const {arrC, model} = makeFlowEntriesModel();
            const obs = makeObs(model);
            expect(obs.size).toBe(3);

            arrC.delete(0, 1);

            expect(obs.get("C", 0)).toBeUndefined();
            expect(obs.get("A", 0)).toBeDefined();
            expect(obs.get("B", 0)).toBeDefined();
            expect(obs.size).toBe(2);
        });

        it("deleting middle outer key does not corrupt first or last entry", () => {
            const {ymap, model} = makeFlowEntriesModel();
            const obs = makeObs(model);

            ymap.delete("B");

            expect(obs.get("B", 0)).toBeUndefined();
            expect(obs.get("A", 0)).toBeDefined();
            expect(obs.get("C", 0)).toBeDefined();
            expect(obs.size).toBe(2);
        });

        it("deleting inner array entry of middle outer key does not corrupt others", () => {
            const {arrB, model} = makeFlowEntriesModel();
            const obs = makeObs(model);

            arrB.delete(0, 1);

            expect(obs.get("B", 0)).toBeUndefined();
            expect(obs.get("A", 0)).toBeDefined();
            expect(obs.get("C", 0)).toBeDefined();
            expect(obs.size).toBe(2);
        });
    });

// ─────────────────────────────────────────────────────────────────────────────
// Flat observer — deep nested deletion must not fire onDeleted at top-level
// Guards the bug where a YArray deletion 4 levels deep inside a flow caused the
// flat flows observer to fire onDeleted for the entire flow entry.
// ─────────────────────────────────────────────────────────────────────────────

    describe("flat observer — deep nested YArray deletion fires onUpdated, not onDeleted", () => {
        it("arr.delete inside nested YArray does not trigger onDeleted on flat parent observer", () => {
            const doc = new Y.Doc();
            const root = doc.getMap<any>("flows");

            // flow "vP" → YMap with "flowEntries" → YMap → "Eg4r" → YArray
            const innerArr = new Y.Array<any>();
            innerArr.push(["entry0"]);

            const flowEntries = new Y.Map<any>();
            flowEntries.set("Eg4r", innerArr);

            const flowMap = new Y.Map<any>();
            flowMap.set("flowEntries", flowEntries);

            root.set("vP", flowMap);

            const model = TurboYModel.create({data: root as any, initialize: true});

            const deleted: string[] = [];
            const updated: string[] = [];
            const obs = model.generateObserver<any, {id: string}>({
                onAdded: (_d, _s, ...keys) => ({id: keys[0] as string}),
                onUpdated: (_d, _i, _s, ...keys) => updated.push(keys[0] as string),
                onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[0] as string),
            });

            expect(obs.size).toBe(1);
            expect(obs.get("vP")).toBeDefined();

            // Delete 4 levels deep — "vP" itself must NOT be removed from the observer
            innerArr.delete(0, 1);

            expect(deleted).toHaveLength(0);       // onDeleted must NOT fire for "vP"
            expect(updated).toContain("vP");        // onUpdated SHOULD fire for "vP"
            expect(obs.get("vP")).toBeDefined();    // instance must still be in the observer
            expect(obs.size).toBe(1);
        });

        it("deleting the actual top-level YMap key correctly fires onDeleted on flat observer", () => {
            const doc = new Y.Doc();
            const root = doc.getMap<any>("flows");

            const flowMap = new Y.Map<any>();
            root.set("vP", flowMap);

            const model = TurboYModel.create({data: root as any, initialize: true});
            const deleted: string[] = [];
            model.generateObserver<any, {id: string}>({
                onAdded: (_d, _s, ...keys) => ({id: keys[0] as string}),
                onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[0] as string),
            });

            root.delete("vP");
            expect(deleted).toContain("vP");
        });
    });
});