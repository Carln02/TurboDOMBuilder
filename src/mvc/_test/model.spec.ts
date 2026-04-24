import {describe, it, expect} from "vitest";
import {TurboObserver} from "../model/observer";
import {TurboModel} from "../model/model";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Flush all pending microtasks (signal emissions use queueMicrotask) */
const flush = () => new Promise(resolve => setTimeout(resolve, 0));
// ─────────────────────────────────────────────────────────────────────────────
// TurboModel — basics
// ─────────────────────────────────────────────────────────────────────────────

describe("TurboModel", () => {

    describe("construction & basic properties", () => {
        it("constructs with data and id", () => {
            const m = new TurboModel({data: {a: 1}, id: "x"});
            expect(m.data).toEqual({a: 1});
            expect(m.id).toBe("x");
        });

        it("constructs with no arguments", () => {
            const m = new TurboModel();
            expect(m.data).toEqual({});
            expect(m.size).toBe(0);
        });

        it("id can be updated", () => {
            const m = new TurboModel({data: {x: 0}});
            m.id = "new-id" as any;
            expect(m.id).toBe("new-id");
        });

        it("size reflects top-level key count", () => {
            expect(new TurboModel({data: {a: 1, b: 2, c: 3}}).size).toBe(3);
        });

        it("keys returns all top-level keys", () => {
            const m = new TurboModel({data: {x: 10, y: 20}});
            expect(m.keys).toContain("x");
            expect(m.keys).toContain("y");
            expect(m.keys).toHaveLength(2);
        });

        it("values returns all top-level values", () => {
            const m = new TurboModel({data: {a: 1, b: 2}});
            expect(m.values).toContain(1);
            expect(m.values).toContain(2);
        });
    });

    // ── get / set / has / delete / add ────────────────────────────────────────

    describe("get / set / has / delete / add — object data", () => {
        it("get returns the value at a key", () => {
            const m = new TurboModel({data: {name: "Alice"}});
            expect(m.get("name")).toBe("Alice");
        });

        it("get with no keys returns root data", () => {
            const data = {a: 1};
            const m = new TurboModel({data});
            expect(m.get()).toBe(data);
        });

        it("get returns undefined for missing key", () => {
            const m = new TurboModel({data: {}});
            expect(m.get("missing" as any)).toBeUndefined();
        });

        it("get returns undefined for missing deep path", () => {
            const m = new TurboModel({data: {a: {}}});
            expect(m.get("a", "b", "c")).toBeUndefined();
        });

        it("set updates an existing key", () => {
            const m = new TurboModel({data: {count: 0}});
            m.set(5, "count");
            expect(m.get("count")).toBe(5);
        });

        it("set creates a new key", () => {
            const m = new TurboModel({data: {}});
            m.set(42, "newKey");
            expect(m.get("newKey")).toBe(42);
            expect(m.has("newKey")).toBe(true);
        });

        it("set does not fire onKeyChanged when value is unchanged", () => {
            const m = new TurboModel({data: {a: 1}});
            const calls: any[] = [];
            m.onKeyChanged.add(v => calls.push(v));
            m.set(1, "a");
            expect(calls).toHaveLength(0);
        });

        it("set works on a deep nested path", () => {
            const m = new TurboModel({data: {user: {age: 30}}});
            m.set(31, "user", "age");
            expect(m.get("user", "age")).toBe(31);
        });

        it("has returns true for existing key and false otherwise", () => {
            const m = new TurboModel({data: {present: true}});
            expect(m.has("present")).toBe(true);
            expect(m.has("absent" as any)).toBe(false);
        });

        it("has works on deep path", () => {
            const m = new TurboModel({data: {user: {name: "Bob"}}});
            expect(m.has("user", "name")).toBe(true);
            expect(m.has("user", "missing" as any)).toBe(false);
        });

        it("delete removes a key", () => {
            const m = new TurboModel({data: {a: 1, b: 2}});
            m.delete("a");
            expect(m.has("a")).toBe(false);
            expect(m.size).toBe(1);
        });

        it("delete works on a deep path", () => {
            const m = new TurboModel({data: {user: {name: "Bob"}}});
            m.delete("user", "name");
            expect(m.has("user", "name")).toBe(false);
        });

        it("delete on non-existent key is a no-op", () => {
            const m = new TurboModel({data: {a: 1}});
            expect(() => m.delete("nope" as any)).not.toThrow();
        });

        it("add inserts at a key", () => {
            const m = new TurboModel({data: {}});
            m.add(7, "num");
            expect(m.get("num")).toBe(7);
        });
    });

    // ── array-backed data ─────────────────────────────────────────────────────

    describe("get / set / has / delete / add — array data", () => {
        it("get returns value at numeric index", () => {
            const m = new TurboModel({data: ["a", "b", "c"]});
            expect(m.get(0)).toBe("a");
            expect(m.get(2)).toBe("c");
        });

        it("set updates value at index", () => {
            const m = new TurboModel({data: ["a", "b"]});
            m.set("z", 1);
            expect(m.get(1)).toBe("z");
        });

        it("keys returns numeric indices", () => {
            const m = new TurboModel({data: [10, 20, 30]});
            expect(m.keys).toEqual([0, 1, 2]);
            expect(m.size).toBe(3);
        });

        it("add pushes to end when no key given", () => {
            const m = new TurboModel({data: [1, 2]});
            m.add(3);
            expect(m.size).toBe(3);
            expect(m.get(2)).toBe(3);
        });

        it("add inserts at given index", () => {
            const m = new TurboModel({data: [1, 3]});
            m.add(2, 1);
            expect(m.get(0)).toBe(1);
            expect(m.get(1)).toBe(2);
            expect(m.get(2)).toBe(3);
        });

        it("add clamps negative index to 0", () => {
            const m = new TurboModel({data: [1, 2]});
            m.add(0, -5);
            expect(m.get(0)).toBe(0);
        });

        it("add clamps out-of-bounds index to end", () => {
            const m = new TurboModel({data: [1, 2]});
            m.add(99, 1000);
            expect(m.get(m.size - 1)).toBe(99);
        });

        it("has returns true for valid index", () => {
            const m = new TurboModel({data: [10, 20]});
            expect(m.has(0)).toBe(true);
            expect(m.has(1)).toBe(true);
            expect(m.has(99 as any)).toBe(false);
        });

        it("delete removes element at index", () => {
            const m = new TurboModel({data: ["a", "b", "c"]});
            m.delete(1);
            expect(m.size).toBe(2);
            expect(m.get(0)).toBe("a");
            expect(m.get(1)).toBe("c");
        });
    });

    // ── Map-backed data ───────────────────────────────────────────────────────

    describe("get / set / has / delete — Map data", () => {
        it("get reads from a Map", () => {
            const map = new Map([["key", "value"]]);
            const m = new TurboModel({data: map as any});
            expect(m.get("key" as any)).toBe("value");
        });

        it("set writes to a Map", () => {
            const map = new Map([["key", "old"]]);
            const m = new TurboModel({data: map as any});
            m.set("new", "key");
            expect(m.get("key" as any)).toBe("new");
        });

        it("has checks Map membership", () => {
            const map = new Map([["a", 1]]);
            const m = new TurboModel({data: map as any});
            expect(m.has("a" as any)).toBe(true);
            expect(m.has("b" as any)).toBe(false);
        });

        it("delete removes from Map", () => {
            const map = new Map([["a", 1], ["b", 2]]);
            const m = new TurboModel({data: map as any});
            m.delete("a");
            expect(m.has("a" as any)).toBe(false);
            expect(m.size).toBe(1);
        });

        it("keys returns all Map keys", () => {
            const map = new Map([["x", 1], ["y", 2]]);
            const m = new TurboModel({data: map as any});
            expect(m.keys).toContain("x");
            expect(m.keys).toContain("y");
        });
    });

    // ── data getter/setter ────────────────────────────────────────────────────

    describe("data getter / setter", () => {
        it("data setter replaces the entire dataset", () => {
            const m = new TurboModel({data: {a: 1}});
            m.data = {b: 2} as any;
            expect(m.data).toEqual({b: 2});
            expect(m.has("a")).toBe(false);
        });

        it("data setter clears signals from previous data", () => {
            const m = new TurboModel({data: {a: 1}});
            m.makeSignal("a");
            m.data = {b: 2} as any;
            // Signal for "a" should not exist on new data
            expect(m.getSignal("a" as any)).toBeUndefined();
        });

        it("setDataWithoutInitializing sets data without firing onKeyChanged", () => {
            const m = new TurboModel({data: {a: 1}});
            const calls: any[] = [];
            m.onKeyChanged.add(v => calls.push(v));
            (m as any).setDataWithoutInitializing?.({b: 2});
            expect(calls).toHaveLength(0);
        });

        it("clear(false) resets state without clearing data", () => {
            const m = new TurboModel({data: {a: 1}});
            m.initialize();
            m.clear(false);
            expect(m.data).toBeDefined();
            expect((m as any).isInitialized).toBe(false);
        });

        it("clear(true) clears both data and state", () => {
            const m = new TurboModel({data: {a: 1}});
            m.clear(true);
            expect(m.data).toBeUndefined();
            expect(m.size).toBe(0);
        });
    });

    // ── onKeyChanged ──────────────────────────────────────────────────────────

    describe("onKeyChanged callbacks", () => {
        it("set fires onKeyChanged with value and key", () => {
            const m = new TurboModel({data: {a: 0}});
            const calls: Array<{value: any; keys: any[]}> = [];
            m.onKeyChanged.add((value, ...keys) => calls.push({value, keys}));
            m.set(42, "a");
            expect(calls).toHaveLength(1);
            expect(calls[0]).toEqual({value: 42, keys: ["a"]});
        });

        it("delete fires onKeyChanged", () => {
            const m = new TurboModel({data: {a: 1}});
            const calls: any[] = [];
            m.onKeyChanged.add((_v, ...keys) => calls.push(keys));
            m.delete("a");
            expect(calls).toHaveLength(1);
            expect(calls[0]).toEqual(["a"]);
        });

        it("add fires onKeyChanged", () => {
            const m = new TurboModel({data: [1, 2]});
            const calls: any[] = [];
            m.onKeyChanged.add((_v, ...keys) => calls.push(keys[0]));
            m.add(3);
            expect(calls).toHaveLength(1);
        });

        it("set does not fire when enabledCallbacks is false", () => {
            const m = new TurboModel({data: {a: 0}});
            m.enabledCallbacks = false;
            const calls: any[] = [];
            m.onKeyChanged.add(v => calls.push(v));
            m.set(99, "a");
            expect(calls).toHaveLength(0);
        });

        it("set fires again after re-enabling enabledCallbacks", () => {
            const m = new TurboModel({data: {a: 0}});
            m.enabledCallbacks = false;
            const calls: any[] = [];
            m.onKeyChanged.add(v => calls.push(v));
            m.set(1, "a");
            m.enabledCallbacks = true;
            m.set(2, "a");
            expect(calls).toHaveLength(1);
        });
    });

    // ── initialize ────────────────────────────────────────────────────────────

    describe("initialize()", () => {
        it("fires onKeyChanged for all current keys", () => {
            const m = new TurboModel({data: {x: 1, y: 2}});
            const calls: Array<{value: any; key: any}> = [];
            m.onKeyChanged.add((value, ...keys) => calls.push({value, key: keys[0]}));
            m.initialize();
            expect(calls).toHaveLength(2);
            expect(calls.map(c => c.key)).toContain("x");
            expect(calls.map(c => c.key)).toContain("y");
        });

        it("subsequent calls are no-ops", () => {
            const m = new TurboModel({data: {a: 1}});
            const calls: any[] = [];
            m.onKeyChanged.add(v => calls.push(v));
            m.initialize();
            m.initialize();
            expect(calls).toHaveLength(1);
        });

        it("initialize: true in constructor initializes immediately", () => {
            const calls: any[] = [];
            const m = new TurboModel({
                data: {a: 1},
                initialize: true,
            });
            m.onKeyChanged.add(v => calls.push(v));
            // Already initialized — registering callback after the fact doesn't replay
            expect((m as any).isInitialized).toBe(true);
        });
    });

    // ── entries / forEach / iteration ─────────────────────────────────────────

    describe("entries / forEach / iteration", () => {
        it("entries() returns all [key, value] pairs", () => {
            const m = new TurboModel({data: {a: 1, b: 2}});
            expect(m.entries()).toContainEqual(["a", 1]);
            expect(m.entries()).toContainEqual(["b", 2]);
            expect(m.entries()).toHaveLength(2);
        });

        it("forEach iterates all entries", () => {
            const m = new TurboModel({data: {a: 1, b: 2}});
            const result: Record<string, any> = {};
            m.forEach((value, key) => { result[key as string] = value; });
            expect(result).toEqual({a: 1, b: 2});
        });

        it("for-of yields [key, value] pairs", () => {
            const m = new TurboModel({data: {p: 10, q: 20}});
            const pairs: [any, any][] = [];
            for (const entry of m) pairs.push(entry);
            expect(pairs).toContainEqual(["p", 10]);
            expect(pairs).toContainEqual(["q", 20]);
        });
    });

    // ── toJSON ────────────────────────────────────────────────────────────────

    describe("toJSON()", () => {
        it("serializes a plain object", () => {
            const m = new TurboModel({data: {x: 1, y: 2}});
            expect(m.toJSON()).toEqual({x: 1, y: 2});
        });

        it("serializes a Map as a plain object", () => {
            const map = new Map([["a", 1], ["b", 2]]);
            const m = new TurboModel({data: map as any});
            expect(m.toJSON()).toEqual({a: 1, b: 2});
        });

        it("returns primitive data as-is", () => {
            const m = new TurboModel({data: 42 as any});
            expect(m.toJSON()).toBe(42);
        });
    });

    // ── flat key utilities ────────────────────────────────────────────────────

    describe("flat key utilities", () => {
        it("flattenKey produces a string for string keys", () => {
            const m = new TurboModel({data: {a: {b: 1}}});
            expect(typeof m.flattenKey("a", "b")).toBe("string");
        });

        it("flattenKey produces a number for fully numeric array paths", () => {
            const m = new TurboModel({data: [[10, 20], [30, 40]]});
            const flat = m.flattenKey(0, 1);
            expect(typeof flat).toBe("number");
        });

        it("scopeKey reverses a flat string key", () => {
            const m = new TurboModel({data: {a: {b: 1}}});
            const flat = m.flattenKey("a", "b") as string;
            const scoped = m.scopeKey(flat);
            expect(scoped).toContain("a");
            expect(scoped).toContain("b");
        });

        it("flattenKey encodes symbols as @@description", () => {
            const sym = Symbol("mySymbol");
            const m = new TurboModel({data: {}});
            const flat = m.flattenKey(sym) as string;
            expect(flat).toBe("@@mySymbol");
        });

        it("scopeKey decodes @@ back to a Symbol", () => {
            const m = new TurboModel({data: {}});
            const scoped = m.scopeKey("@@mySymbol");
            expect(typeof scoped[0]).toBe("symbol");
            expect((scoped[0] as symbol).description).toBe("mySymbol");
        });

        it("getFlat / setFlat round-trip", () => {
            const m = new TurboModel({data: {a: {b: 42}}});
            const flat = m.flattenKey("a", "b") as string;
            expect(m.getFlat(flat)).toBe(42);
            m.setFlat(99, flat);
            expect(m.getFlat(flat)).toBe(99);
        });

        it("hasFlat returns true for existing path", () => {
            const m = new TurboModel({data: {a: {b: 1}}});
            const flat = m.flattenKey("a", "b") as string;
            expect(m.hasFlat(flat)).toBe(true);
        });

        it("hasFlat returns false for non-existent path", () => {
            const m = new TurboModel({data: {}});
            expect(m.hasFlat("no|such|path")).toBe(false);
        });

        it("deleteFlat removes the entry", () => {
            const m = new TurboModel({data: {a: {b: 1}}});
            const flat = m.flattenKey("a", "b") as string;
            m.deleteFlat(flat);
            expect(m.hasFlat(flat)).toBe(false);
        });

        it("addFlat inserts into an array via flat key", () => {
            const m = new TurboModel({data: [[1, 2], [3, 4]]});
            const flat = m.flattenKey(0, 0) as number;
            m.addFlat(99, flat, 2);
            expect(m.get(0, 0)).toBe(99);
        });
    });

    // ── getKey / getFlatKey / getKeys / getFlatKeys ────────────────────────────

    describe("getKey / getFlatKey / getKeys / getFlatKeys", () => {
        it("getKey returns the path of the first matching value", () => {
            const m = new TurboModel({data: {a: 1, b: 2}});
            expect(m.getKey(1)).toContain("a");
        });

        it("getKey returns undefined for missing value", () => {
            const m = new TurboModel({data: {a: 1}});
            expect(m.getKey(999)).toBeUndefined();
        });

        it("getKey finds deeply nested values", () => {
            const m = new TurboModel({data: {x: {y: {z: "deep"}}}});
            const path = m.getKey("deep");
            expect(path).toEqual(["x", "y", "z"]);
        });

        it("getFlatKey returns a flat key for a value", () => {
            const m = new TurboModel({data: {a: 1}});
            expect(m.getFlatKey(1)).toBeDefined();
        });

        it("getFlatKey returns undefined for missing value", () => {
            const m = new TurboModel({data: {a: 1}});
            expect(m.getFlatKey(999)).toBeUndefined();
        });

        it("getKeys returns all paths to a repeated value", () => {
            const m = new TurboModel({data: {a: 5, b: 5, c: 6}});
            const paths = m.getKeys(5);
            expect(paths).toHaveLength(2);
            const keys = paths.map(p => p[0]);
            expect(keys).toContain("a");
            expect(keys).toContain("b");
        });

        it("getKeys returns empty array when value not found", () => {
            const m = new TurboModel({data: {a: 1}});
            expect(m.getKeys(999)).toHaveLength(0);
        });

        it("getFlatKeys returns flat keys for all occurrences", () => {
            const m = new TurboModel({data: {a: 5, b: 5}});
            const flatKeys = m.getFlatKeys(5);
            expect(flatKeys).toHaveLength(2);
        });
    });

    // ── nest / nestAll / getNested ─────────────────────────────────────────────

    describe("nest / nestAll / getNested", () => {
        it("nest() creates a nested TurboModel", () => {
            const m = new TurboModel({data: {user: {name: "Alice", age: 30}}});
            const nested = m.nest("user");
            expect(nested).toBeInstanceOf(TurboModel);
            expect(nested.get("name")).toBe("Alice");
            expect(nested.get("age")).toBe(30);
        });

        it("nest() returns the same instance on repeated calls", () => {
            const m = new TurboModel({data: {user: {name: "Alice"}}});
            expect(m.nest("user")).toBe(m.nest("user"));
        });

        it("getNested() retrieves a previously nested model", () => {
            const m = new TurboModel({data: {user: {name: "Bob"}}});
            m.nest("user");
            expect(m.getNested("user")).toBeInstanceOf(TurboModel);
        });

        it("getNested() returns undefined for non-nested key", () => {
            const m = new TurboModel({data: {a: 1}});
            expect(m.getNested("a" as any)).toBeUndefined();
        });

        it("getNested() with no args returns this", () => {
            const m = new TurboModel({data: {a: 1}});
            expect(m.getNested()).toBe(m);
        });

        it("nest() with deep key path navigates multiple levels", () => {
            const m = new TurboModel({data: {a: {b: {c: 42}}}});
            const nested = m.nest("a", "b");
            expect(nested.get("c")).toBe(42);
        });

        it("nestAll() without ALL returns one nested model", () => {
            const m = new TurboModel({data: {
                    users: {
                        alice: {age: 25},
                        bob: {age: 30}
                    }
                }});
            const nested = m.nestAll("users", "alice");
            expect(nested).toHaveLength(1);
            nested.forEach(n => expect(n).toBeInstanceOf(TurboModel));
        });

        it("nestAll() with ALL returns one nested model per key", () => {
            const m = new TurboModel({data: {
                    users: {
                        alice: {age: 25},
                        bob: {age: 30}
                    }
                }});
            const nested = m.nestAll("users", TurboModel.ALL);
            expect(nested).toHaveLength(2);
            nested.forEach(n => expect(n).toBeInstanceOf(TurboModel));
        });

        it("nestAll() with ALL expands all entries at that level", () => {
            const m = new TurboModel({
                data: {
                    users: {alice: {score: 10}, bob: {score: 20}},
                },
            });
            const nested = m.nestAll(TurboModel.ALL);
            // ALL at root expands all top-level keys — just "users" here
            expect(nested).toHaveLength(1);
        });

        it("nestAll() with ALL on an array expands all elements", () => {
            const m = new TurboModel({data: [{name: "a"}, {name: "b"}, {name: "c"}]});
            const nested = m.nestAll(TurboModel.ALL);
            expect(nested).toHaveLength(3);
            expect(nested[0].get("name")).toBe("a");
            expect(nested[2].get("name")).toBe("c");
        });

        it("nestAll() with path + ALL expands nested level", () => {
            const m = new TurboModel({
                data: {
                    teams: {
                        alpha: {score: 1},
                        beta: {score: 2},
                    },
                },
            });
            const nested = m.nestAll("teams", TurboModel.ALL);
            expect(nested).toHaveLength(2);
            const scores = nested.map(n => n.get("score")).sort();
            expect(scores).toEqual([1, 2]);
        });

        it("bubbleChanges: nested model changes propagate to parent", () => {
            const m = new TurboModel({data: {a: {x: 1}}, bubbleChanges: true});
            const calls: any[] = [];
            m.onKeyChanged.add((_v, ...keys) => calls.push(keys));
            const nested = m.nest("a");
            nested.set(2, "x");
            expect(calls.length).toBeGreaterThan(0);
        });

        it("bubbleChanges: false (default) does not propagate", () => {
            const m = new TurboModel({data: {a: {x: 1}}});
            const calls: any[] = [];
            m.onKeyChanged.add(v => calls.push(v));
            const nested = m.nest("a");
            nested.set(2, "x");
            expect(calls).toHaveLength(0);
        });
    });

    // ── signals ───────────────────────────────────────────────────────────────

    describe("signals", () => {
        it("makeSignal() creates a SignalBox", () => {
            const m = new TurboModel({data: {count: 0}});
            const sig = m.makeSignal("count");
            expect(sig).toBeDefined();
        });

        it("getSignal() returns the same SignalBox created by makeSignal", () => {
            const m = new TurboModel({data: {count: 0}});
            const created = m.makeSignal("count");
            expect(m.getSignal("count" as any)).toBe(created);
        });

        it("signal emits when value changes via model.set", async () => {
            const m = new TurboModel({data: {count: 0}});
            const sig = m.makeSignal("count");
            let emitted = false;
            sig.sub(() => { emitted = true; });
            m.set(1, "count");
            await flush();
            expect(emitted).toBe(true);
        });

        it("signal does not emit when value is unchanged", async () => {
            const m = new TurboModel({data: {count: 1}});
            const sig = m.makeSignal("count");
            let emitCount = 0;
            sig.sub(() => emitCount++);
            m.set(1, "count"); // same value
            await flush();
            expect(emitCount).toBe(0);
        });

        it("makeSignals() with ALL creates signals for every key", () => {
            const m = new TurboModel({data: {a: 1, b: 2, c: 3}});
            const sigs = m.makeSignals(TurboModel.ALL);
            expect(sigs).toHaveLength(3);
        });

        it("makeSignals() with path creates signal for nested key", () => {
            const m = new TurboModel({data: {user: {score: 5}}});
            const sigs = m.makeSignals("user", "score");
            expect(sigs).toHaveLength(1);
        });

        it("signals are cleared when data is replaced", () => {
            const m = new TurboModel({data: {a: 1}});
            m.makeSignal("a");
            m.data = {b: 2} as any;
            expect(m.getSignal("a" as any)).toBeUndefined();
        });
    });

    // ── generateObserver ──────────────────────────────────────────────────────

    describe("generateObserver — basic integration", () => {
        it("creates an observer attached to the model", () => {
            const m = new TurboModel({data: {a: 1, b: 2}});
            const obs = m.generateObserver({
                onAdded: () => ({}),
                initialize: true,
            });
            expect(obs).toBeInstanceOf(TurboObserver);
        });

        it("observer picks up existing keys on initialization", () => {
            const m = new TurboModel({data: {x: 10, y: 20}, initialize: true});
            const added: string[] = [];
            m.generateObserver({
                onAdded: (_d, _s, ...keys) => { added.push(keys[0] as string); return {}; },
                initialize: true,
            });
            expect(added).toContain("x");
            expect(added).toContain("y");
        });

        it("observer receives updates when model data changes", () => {
            const m = new TurboModel({data: {count: 0}, initialize: true});
            const updated: any[] = [];
            m.generateObserver({
                onAdded: () => ({}),
                onUpdated: (data) => updated.push(data),
                initialize: true,
            });
            m.set(42, "count");
            expect(updated).toContain(42);
        });

        it("observer fires onDeleted when a key is removed", () => {
            const m = new TurboModel({data: {a: 1}, initialize: true});
            const deleted: any[] = [];
            m.generateObserver({
                onAdded: () => ({}),
                onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[0]),
                initialize: true,
            });
            m.delete("a");
            expect(deleted).toContain("a");
        });

        it("observer is removed when destroyed", () => {
            const m = new TurboModel({data: {a: 1}, initialize: true});
            const updated: any[] = [];
            const obs = m.generateObserver({
                onAdded: () => ({}),
                onUpdated: (data) => updated.push(data),
                initialize: true,
            });
            obs.destroy();
            m.set(99, "a");
            expect(updated).toHaveLength(1); // only the initial onUpdated from initialize
        });

        it("disabling enabledCallbacks stops observer notifications", () => {
            const m = new TurboModel({data: {a: 0}, initialize: true});
            const updated: any[] = [];
            m.generateObserver({
                onAdded: () => ({}),
                onUpdated: (data) => updated.push(data),
                initialize: true,
            });
            m.enabledCallbacks = false;
            m.set(99, "a");
            expect(updated).toHaveLength(1); // only the one from initialize
        });
    });

    // ── nested observers with arrays ──────────────────────────────────────────

    describe("generateObserver — nested arrays", () => {
        const makeListModel = () => new TurboModel({
            data: {
                items: [
                    {id: "a", value: 10},
                    {id: "b", value: 20},
                    {id: "c", value: 30},
                ],
            },
            initialize: true,
        });

        it("observer on a nested array sees all initial elements", () => {
            const m = makeListModel();
            const added: number[] = [];
            m.generateObserver(
                {
                    onAdded: (_d, _s, ...keys) => { added.push(keys[0] as number); return {}; },
                    initialize: true,
                },
                "items",
            );
            expect(added).toContain(0);
            expect(added).toContain(1);
            expect(added).toContain(2);
        });

        it("observer on nested array receives update when element changes", () => {
            const m = makeListModel();
            const updated: any[] = [];
            m.generateObserver(
                {
                    onAdded: () => ({}),
                    onUpdated: (data) => updated.push(data),
                    initialize: true,
                },
                "items",
            );
            m.set({id: "a", value: 99}, "items", 0);
            expect(updated.some(d => d?.value === 99)).toBe(true);
        });

        it("observer on nested array fires onDeleted when element is removed", () => {
            const m = makeListModel();
            const deleted: any[] = [];
            m.generateObserver(
                {
                    onAdded: () => ({}),
                    onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[0]),
                    initialize: true,
                },
                "items",
            );
            m.delete("items", 1);
            expect(deleted).toContain(1);
        });

        it("observer on nested array fires onAdded when element is added", () => {
            const m = makeListModel();
            const added: any[] = [];
            m.generateObserver(
                {
                    onAdded: (_d, _s, ...keys) => { added.push(keys[0]); return {}; },
                    initialize: true,
                },
                "items",
            );
            const initialCount = added.length;
            m.add({id: "d", value: 40}, "items");
            expect(added.length).toBeGreaterThan(initialCount);
        });
    });

    // ── nested observers with maps ────────────────────────────────────────────

    describe("generateObserver — nested maps/objects", () => {
        const makeMapModel = () => new TurboModel({
            data: {
                users: {
                    alice: {score: 100},
                    bob: {score: 200},
                    carol: {score: 300},
                },
            },
            initialize: true,
        });

        it("observer on nested object sees all initial keys", () => {
            const m = makeMapModel();
            const added: string[] = [];
            m.generateObserver(
                {
                    onAdded: (_d, _s, ...keys) => { added.push(keys[0] as string); return {}; },
                    initialize: true,
                },
                "users",
            );
            expect(added).toContain("alice");
            expect(added).toContain("bob");
            expect(added).toContain("carol");
        });

        it("observer on nested object receives update when value changes", () => {
            const m = makeMapModel();
            const updated: any[] = [];
            m.generateObserver(
                {
                    onAdded: () => ({}),
                    onUpdated: (data) => updated.push(data),
                    initialize: true,
                },
                "users",
            );
            m.set({score: 999}, "users", "alice");
            expect(updated.some(d => d?.score === 999)).toBe(true);
        });

        it("observer on nested object fires onDeleted when key is removed", () => {
            const m = makeMapModel();
            const deleted: string[] = [];
            m.generateObserver(
                {
                    onAdded: () => ({}),
                    onDeleted: (_d, _i, _s, ...keys) => deleted.push(keys[0] as string),
                    initialize: true,
                },
                "users",
            );
            m.delete("users", "bob");
            expect(deleted).toContain("bob");
        });

        it("observer on nested object fires onAdded when new key appears", () => {
            const m = makeMapModel();
            const added: string[] = [];
            m.generateObserver(
                {
                    onAdded: (_d, _s, ...keys) => { added.push(keys[0] as string); return {}; },
                    initialize: true,
                },
                "users",
            );
            const initialCount = added.length;
            m.set({score: 0}, "users", "dave");
            expect(added.length).toBeGreaterThan(initialCount);
        });
    });

    // ── generateObserver with TurboModel.ALL ──────────────────────────────────

    describe("generateObserver — with TurboModel.ALL", () => {
        it("ALL at root observes all top-level subtrees", () => {
            const m = new TurboModel({
                data: {
                    groupA: {x: 1, y: 2},
                    groupB: {x: 3, y: 4},
                },
                initialize: true,
            });

            const added: string[] = [];
            m.generateObserver(
                {
                    onAdded: (_d, _s, ...keys) => { added.push(keys[0] as string); return {}; },
                    initialize: true,
                },
                TurboModel.ALL,
            );

            // ALL expands groupA and groupB, observer sees "x" and "y" in each
            expect(added).toContain("x");
            expect(added).toContain("y");
        });

        it("ALL on array of objects observes each element's keys", () => {
            const m = new TurboModel({
                data: {
                    rows: [
                        {name: "first", active: true},
                        {name: "second", active: false},
                    ],
                },
                initialize: true,
            });

            const added: string[] = [];
            m.generateObserver(
                {
                    onAdded: (_d, _s, ...keys) => { added.push(keys[0] as string); return {}; },
                    initialize: true,
                },
                "rows", TurboModel.ALL,
            );

            expect(added).toContain("name");
            expect(added).toContain("active");
        });

        it("ALL observer receives update fired on any of the expanded subtrees", () => {
            const m = new TurboModel({
                data: {
                    groupA: {score: 1},
                    groupB: {score: 2},
                },
                initialize: true,
            });

            const updated: number[] = [];
            m.generateObserver(
                {
                    onAdded: () => ({}),
                    onUpdated: (data) => updated.push(data),
                    initialize: true,
                },
                TurboModel.ALL,
            );

            m.set({score: 99}, "groupA");
            expect(updated).toContain(99);
        });

        it("multiple layers of nesting with ALL", () => {
            const m = new TurboModel({
                data: {
                    departments: {
                        eng: {headcount: 10, budget: 500},
                        sales: {headcount: 5, budget: 300},
                    },
                },
                initialize: true,
            });

            const added: string[] = [];
            m.generateObserver(
                {
                    onAdded: (_d, _s, ...keys) => { added.push(keys[0] as string); return {}; },
                    initialize: true,
                },
                "departments", TurboModel.ALL,
            );

            expect(added).toContain("headcount");
            expect(added).toContain("budget");
        });
    });

    // ── complex mock data: deeply nested mixed structure ───────────────────────

    describe("complex nested data — mixed arrays, objects, maps", () => {
        const makeMockModel = () => new TurboModel({
            data: {
                meta: {version: "1.0", tags: ["alpha", "beta"]},
                teams: [
                    {
                        id: "team-1",
                        members: {
                            alice: {role: "lead", score: 95},
                            bob: {role: "dev", score: 80},
                        },
                    },
                    {
                        id: "team-2",
                        members: {
                            carol: {role: "dev", score: 88},
                            dave: {role: "qa", score: 72},
                        },
                    },
                ],
            },
            initialize: true,
        });

        it("can get deeply nested values across mixed structures", () => {
            const m = makeMockModel();
            expect(m.get("meta", "version")).toBe("1.0");
            expect(m.get("teams", 0, "id")).toBe("team-1");
            expect(m.get("teams", 1, "members", "carol", "score")).toBe(88);
        });

        it("can set deeply nested values across mixed structures", () => {
            const m = makeMockModel();
            m.set(100, "teams", 0, "members", "alice", "score");
            expect(m.get("teams", 0, "members", "alice", "score")).toBe(100);
        });

        it("can delete a deeply nested key", () => {
            const m = makeMockModel();
            m.delete("teams", 1, "members", "dave");
            expect(m.has("teams", 1, "members", "dave")).toBe(false);
            expect(m.has("teams", 1, "members", "carol")).toBe(true);
        });

        it("observer on teams array sees each team", () => {
            const m = makeMockModel();
            const added: number[] = [];
            m.generateObserver(
                {
                    onAdded: (_d, _s, ...keys) => { added.push(keys[0] as number); return {}; },
                    initialize: true,
                },
                "teams",
            );
            expect(added).toContain(0);
            expect(added).toContain(1);
        });

        it("observer on teams members with ALL sees all member keys", () => {
            const m = makeMockModel();
            const added: string[] = [];
            m.generateObserver(
                {
                    onAdded: (_d, _s, ...keys) => { added.push(keys[0] as string); return {}; },
                    initialize: true,
                },
                "teams", TurboModel.ALL, "members",
            );
            expect(added).toContain("alice");
            expect(added).toContain("bob");
            expect(added).toContain("carol");
            expect(added).toContain("dave");
        });

        it("observer on all member scores fires when score changes", () => {
            const m = makeMockModel();
            const updated = [];
            m.generateObserver(
                {
                    onAdded: () => ({}),
                    onUpdated: (data) => updated.push(data),
                    initialize: true,
                },
                "teams", TurboModel.ALL, "members", TurboModel.ALL,
            );
            m.set({role: "lead", score: 999}, "teams", 0, "members", "alice");
            expect(updated.some(d => d === 999)).toBe(true);
        });

        it("meta tags array observer sees all tag indices", () => {
            const m = makeMockModel();
            const added: number[] = [];
            m.generateObserver(
                {
                    onAdded: (_d, _s, ...keys) => { added.push(keys[0] as number); return {}; },
                    initialize: true,
                },
                "meta", "tags",
            );
            expect(added).toContain(0);
            expect(added).toContain(1);
        });

        it("adding a new team fires observer onAdded", () => {
            const m = makeMockModel();
            const added: number[] = [];
            m.generateObserver(
                {
                    onAdded: (_d, _s, ...keys) => { added.push(keys[0] as number); return {}; },
                    initialize: true,
                },
                "teams",
            );
            const initialCount = added.length;
            m.add({id: "team-3", members: {}}, "teams");
            expect(added.length).toBeGreaterThan(initialCount);
        });

        it("getKey finds a deeply nested value in mixed structure", () => {
            const m = makeMockModel();
            const path = m.getKey("lead");
            expect(path).toBeDefined();
            expect(path).toContain("role");
        });

        it("flattenKey / scopeKey round-trips for string paths in mixed data", () => {
            const m = makeMockModel();
            const flat = m.flattenKey("meta", "version") as string;
            const scoped = m.scopeKey(flat);
            expect(scoped).toContain("meta");
            expect(scoped).toContain("version");
        });
    });

    // ── handlers ──────────────────────────────────────────────────────────────

    describe("handlers", () => {
        it("addHandler / getHandler registers and retrieves a handler", () => {
            const m = new TurboModel({data: {}});
            const handler = {keyName: "myHandler"} as any;
            m.addHandler(handler);
            expect(m.getHandler("myHandler")).toBe(handler);
        });

        it("getHandler returns undefined for unknown key", () => {
            const m = new TurboModel({data: {}});
            expect(m.getHandler("nope")).toBeUndefined();
        });

        it("addHandler is a no-op when handler has no keyName", () => {
            const m = new TurboModel({data: {}});
            const handler = {} as any;
            expect(() => m.addHandler(handler)).not.toThrow();
        });
    });

    // ── edge cases ────────────────────────────────────────────────────────────

    describe("edge cases", () => {
        it("get on null/non-object intermediate returns undefined", () => {
            const m = new TurboModel({data: {a: null}});
            expect(m.get("a", "b" as any)).toBeUndefined();
        });

        it("set on a path through a primitive intermediate does nothing", () => {
            const m = new TurboModel({data: {a: 42}});
            // "a" is a number, so "a.b" can't be set meaningfully
            expect(() => m.set(1, "a", "b" as any)).not.toThrow();
        });

        it("size returns 0 for undefined data", () => {
            const m = new TurboModel();
            expect(m.size).toBe(0);
        });

        it("keys returns empty array for undefined data", () => {
            const m = new TurboModel();
            expect(m.keys).toHaveLength(0);
        });

        it("has with empty keys returns false", () => {
            const m = new TurboModel({data: {a: 1}});
            expect(m.has()).toBe(false);
        });

        it("set with only value and no key does nothing", () => {
            const m = new TurboModel({data: {a: 1}});
            expect(() => (m as any).set(99)).not.toThrow();
            expect(m.get("a")).toBe(1);
        });

        it("storing the same value instance at two paths — getKeys finds both", () => {
            const shared = {ref: true};
            const m = new TurboModel({data: {a: shared, b: shared}});
            const paths = m.getKeys(shared);
            expect(paths.length).toBe(2);
        });

        it("flatSize returns correct count for depth-1 array", () => {
            const m = new TurboModel({data: [[1, 2, 3], [4, 5]]});
            expect(m.flatSize(2)).toBe(5);
        });

        it("flatSize returns 1 for non-array data", () => {
            const m = new TurboModel({data: {a: 1}});
            expect(m.flatSize(1)).toBe(1);
        });

        it("observer on empty data initializes without error", () => {
            const m = new TurboModel({data: {}, initialize: true});
            expect(() => m.generateObserver({onAdded: () => ({}), initialize: true})).not.toThrow();
        });

        it("generateObserver before initialize — onInitialize fires existing keys when observer initializes", () => {
            const m = new TurboModel({data: {a: 1, b: 2}, initialize: true});
            const seen: string[] = [];
            m.generateObserver({
                onAdded: (_d, _s, ...keys) => { seen.push(keys[0] as string); return {}; },
                initialize: true,
            });
            expect(seen).toContain("a");
            expect(seen).toContain("b");
        });

        it("multiple observers on the same model all receive notifications", () => {
            const m = new TurboModel({data: {x: 0}, initialize: true});
            const seen1: any[] = [];
            const seen2: any[] = [];
            m.generateObserver({onAdded: () => ({}), onUpdated: (d) => seen1.push(d), initialize: true});
            m.generateObserver({onAdded: () => ({}), onUpdated: (d) => seen2.push(d), initialize: true});
            m.set(42, "x");
            expect(seen1).toContain(42);
            expect(seen2).toContain(42);
        });

        it("replacing data clears nested models", () => {
            const m = new TurboModel({data: {a: {x: 1}}});
            m.nest("a");
            expect(m.getNested("a")).toBeDefined();
            m.data = {b: 2} as any;
            expect(m.getNested("a" as any)).toBeUndefined();
        });
    });
});