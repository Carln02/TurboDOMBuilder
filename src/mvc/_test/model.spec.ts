import {describe, it, expect} from "vitest";
import {TurboModel} from "../model/model";
import {TurboHandler} from "../handler/handler";

describe("TurboModel", () => {
    describe("TurboModel — construction & basic properties", () => {
        it("constructs with data and id properties", () => {
            const model = new TurboModel({data: {a: 1, b: 2}, id: "my-id"});
            expect(model.data).toEqual({a: 1, b: 2});
            expect(model.id).toBe("my-id");
        });

        it("constructs with no arguments", () => {
            const model = new TurboModel();
            expect(model.data).toBeUndefined();
            expect(model.size).toBe(0);
        });

        it("id can be updated after construction", () => {
            const model = new TurboModel({data: {x: 0}});
            model.id = "new-id" as any;
            expect(model.id).toBe("new-id");
        });

        it("size reflects the number of top-level keys", () => {
            const model = new TurboModel({data: {a: 1, b: 2, c: 3}});
            expect(model.size).toBe(3);
        });

        it("keys returns all top-level data keys", () => {
            const model = new TurboModel({data: {x: 10, y: 20}});
            expect(model.keys).toContain("x");
            expect(model.keys).toContain("y");
            expect(model.keys).toHaveLength(2);
        });

        it("values returns all top-level data values", () => {
            const model = new TurboModel({data: {a: 1, b: 2}});
            expect(model.values).toContain(1);
            expect(model.values).toContain(2);
            expect(model.values).toHaveLength(2);
        });
    });

    describe("TurboModel — get / set / has / delete / add", () => {
        it("get returns the value at a key", () => {
            const model = new TurboModel({data: {name: "Alice"}});
            expect(model.get("name")).toBe("Alice");
        });

        it("set updates the value at a key", () => {
            const model = new TurboModel({data: {count: 0}});
            model.set(5, "count");
            expect(model.get("count")).toBe(5);
        });

        it("set creates a new key if it does not exist", () => {
            const model = new TurboModel({data: {}});
            model.set(42, "newKey");
            expect(model.get("newKey")).toBe(42);
            expect(model.has("newKey")).toBe(true);
        });

        it("has returns true for existing keys and false otherwise", () => {
            const model = new TurboModel({data: {present: true}});
            expect(model.has("present")).toBe(true);
            expect(model.has("absent")).toBe(false);
        });

        it("delete removes a key", () => {
            const model = new TurboModel({data: {a: 1, b: 2}});
            model.delete("a");
            expect(model.has("a")).toBe(false);
            expect(model.has("b")).toBe(true);
            expect(model.size).toBe(1);
        });

        it("add inserts a value at a key", () => {
            const model = new TurboModel({data: {}});
            model.add(7, "num");
            expect(model.get("num")).toBe(7);
            expect(model.has("num")).toBe(true);
        });

        it("nested get/set traverses key path", () => {
            const model = new TurboModel({data: {user: {age: 30}}});
            expect(model.get("user", "age")).toBe(30);
            model.set(31, "user", "age");
            expect(model.get("user", "age")).toBe(31);
        });

        it("nested has/delete works on deep paths", () => {
            const model = new TurboModel({data: {user: {name: "Bob"}}});
            expect(model.has("user", "name")).toBe(true);
            model.delete("user", "name");
            expect(model.has("user", "name")).toBe(false);
        });
    });

    describe("TurboModel — data getter/setter & setDataWithoutInitializing", () => {
        it("data setter replaces the entire dataset", () => {
            const model = new TurboModel({data: {a: 1}});
            model.data = {b: 2} as any;
            expect(model.data).toEqual({b: 2});
            expect(model.has("a")).toBe(false);
            expect(model.has("b")).toBe(true);
        });

        it("setDataWithoutInitializing sets data without firing onKeyChanged", () => {
            const model = new TurboModel({data: {a: 1}});
            const calls: any[] = [];
            model.onKeyChanged.add((v) => calls.push(v));

            model.setDataWithoutInitializing({b: 2} as any);

            expect(calls).toHaveLength(0);
            expect(model.data).toEqual({b: 2});
        });
    });

    describe("TurboModel — onKeyChanged callbacks", () => {
        it("set fires onKeyChanged with value and key when enabledCallbacks is true", () => {
            const model = new TurboModel({data: {a: 0}});
            const calls: Array<{value: any; keys: any[]}> = [];
            model.onKeyChanged.add((value, ...keys) => calls.push({value, keys}));

            model.set(42, "a");

            expect(calls).toHaveLength(1);
            expect(calls[0]).toEqual({value: 42, keys: ["a"]});
        });

        it("delete fires onKeyChanged", () => {
            const model = new TurboModel({data: {a: 1}});
            const calls: Array<{value: any; keys: any[]}> = [];
            model.onKeyChanged.add((value, ...keys) => calls.push({value, keys}));

            model.delete("a");

            expect(calls).toHaveLength(1);
            expect(calls[0].keys).toEqual(["a"]);
        });

        it("set does NOT fire onKeyChanged when enabledCallbacks is false", () => {
            const model = new TurboModel({data: {a: 0}});
            model.enabledCallbacks = false;
            const calls: any[] = [];
            model.onKeyChanged.add((v) => calls.push(v));

            model.set(99, "a");

            expect(calls).toHaveLength(0);
        });

        it("set fires onKeyChanged again after re-enabling enabledCallbacks", () => {
            const model = new TurboModel({data: {a: 0}});
            model.enabledCallbacks = false;
            const calls: any[] = [];
            model.onKeyChanged.add((v) => calls.push(v));

            model.set(1, "a");
            expect(calls).toHaveLength(0);

            model.enabledCallbacks = true;
            model.set(2, "a");
            expect(calls).toHaveLength(1);
        });

        it("nested set updates the data at the given key path", () => {
            // onKeyChanged fires for top-level changes; deep mutation of a plain nested object
            // bubbles as a change on the top-level key that contains it.
            const model = new TurboModel({data: {user: {age: 30}}});
            model.set(31, "user", "age");
            expect(model.get("user", "age")).toBe(31);
        });
    });

    describe("TurboModel — initialize()", () => {
        it("initialize fires onKeyChanged for all current keys", () => {
            const model = new TurboModel({data: {x: 1, y: 2}});
            const calls: Array<{value: any; keys: any[]}> = [];
            model.onKeyChanged.add((value, ...keys) => calls.push({value, keys}));

            model.initialize();

            expect(calls).toHaveLength(2);
            const pairs = calls.map(c => ({key: c.keys[0], value: c.value}));
            expect(pairs).toContainEqual({key: "x", value: 1});
            expect(pairs).toContainEqual({key: "y", value: 2});
        });

        it("initialize() fires callbacks exactly once (subsequent calls are no-ops)", () => {
            const model = new TurboModel({data: {a: 10}});
            const calls: any[] = [];
            model.onKeyChanged.add((v, ...keys) => calls.push({v, keys}));

            model.initialize();
            model.initialize(); // no-op

            // Only the first initialize() fires
            expect(calls.length).toBe(1);
            expect(calls[0]).toEqual({v: 10, keys: ["a"]});
        });
    });

    describe("TurboModel — entries / forEach / iteration", () => {
        it("entries() returns all [key, value] pairs", () => {
            const model = new TurboModel({data: {a: 1, b: 2}});
            const entries = model.entries();
            expect(entries).toContainEqual(["a", 1]);
            expect(entries).toContainEqual(["b", 2]);
            expect(entries).toHaveLength(2);
        });

        it("forEach iterates over all entries", () => {
            const model = new TurboModel({data: {a: 1, b: 2}});
            const result: Record<string, any> = {};
            model.forEach((value, key) => {
                result[key as string] = value;
            });
            expect(result).toEqual({a: 1, b: 2});
        });

        it("for-of iteration yields [key, value] pairs", () => {
            const model = new TurboModel({data: {p: 10, q: 20}});
            const pairs: [any, any][] = [];
            for (const [key, value] of model) {
                pairs.push([key, value]);
            }
            expect(pairs).toContainEqual(["p", 10]);
            expect(pairs).toContainEqual(["q", 20]);
        });
    });

    describe("TurboModel — clear() / toJSON()", () => {
        it("clear() removes all data", () => {
            const model = new TurboModel({data: {a: 1, b: 2}});
            model.clear();
            expect(model.size).toBe(0);
            expect(model.keys).toHaveLength(0);
        });

        it("toJSON() returns the serialized data", () => {
            const model = new TurboModel({data: {x: 1, y: 2}});
            const json = model.toJSON();
            expect(json).toEqual({x: 1, y: 2});
        });
    });

    describe("TurboModel — flat key utilities", () => {
        it("flattenKey joins keys into a flat key", () => {
            const model = new TurboModel({data: {a: {b: 1}}});
            const flat = model.flattenKey("a", "b");
            expect(typeof flat === "string" || typeof flat === "number").toBe(true);
        });

        it("scopeKey reverses a flat string key back to key parts", () => {
            const model = new TurboModel({data: {a: {b: 1}}});
            const flat = model.flattenKey("a", "b") as string;
            const scoped = model.scopeKey(flat);
            expect(scoped).toContain("a");
            expect(scoped).toContain("b");
        });

        it("getFlat / setFlat work consistently with flattenKey", () => {
            const model = new TurboModel({data: {a: {b: 42}}});
            const flat = model.flattenKey("a", "b") as string;
            expect(model.getFlat(flat, 1)).toBe(42);

            model.setFlat(99, flat, 1);
            expect(model.getFlat(flat, 1)).toBe(99);
        });

        it("hasFlat returns true for existing flat key", () => {
            const model = new TurboModel({data: {a: {b: 1}}});
            const flat = model.flattenKey("a", "b") as string;
            expect(model.hasFlat(flat, 1)).toBe(true);
            expect(model.hasFlat("no|such|path", 2)).toBe(false);
        });
    });

    describe("TurboModel — getKey / getFlatKey", () => {
        it("getKey returns the key path for a value", () => {
            const model = new TurboModel({data: {a: 1, b: 2}});
            const keyPath = model.getKey(1);
            expect(keyPath).toBeDefined();
            expect(keyPath).toContain("a");
        });

        it("getFlatKey returns a flat key for a value", () => {
            const model = new TurboModel({data: {a: 1}});
            const flat = model.getFlatKey(1);
            expect(flat).toBeDefined();
        });

        it("getKeys returns all paths to a value that appears multiple times", () => {
            const model = new TurboModel({data: {a: 5, b: 5}});
            const paths = model.getKeys(5);
            expect(paths.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("TurboModel — nest / nestAll / getNested", () => {
        it("nest() creates a nested TurboModel for a key", () => {
            const model = new TurboModel({data: {user: {name: "Alice", age: 30}}});
            const nested = model.nest("user");
            expect(nested).toBeInstanceOf(TurboModel);
            expect(nested.get("name")).toBe("Alice");
            expect(nested.get("age")).toBe(30);
        });

        it("getNested() retrieves a previously nested model", () => {
            const model = new TurboModel({data: {user: {name: "Bob"}}});
            model.nest("user");
            const retrieved = model.getNested("user");
            expect(retrieved).toBeInstanceOf(TurboModel);
        });

        it("getNested() returns undefined for a non-nested key", () => {
            const model = new TurboModel({data: {a: 1}});
            expect(model.getNested("a")).toBeUndefined();
        });

        it("nestAll() returns an array of TurboModel instances", () => {
            const model = new TurboModel({
                data: {
                    users: {alice: {age: 25}, bob: {age: 30}},
                },
            });
            const nested = model.nestAll("users");
            expect(Array.isArray(nested)).toBe(true);
            expect(nested.length).toBeGreaterThan(0);
            nested.forEach(n => expect(n).toBeInstanceOf(TurboModel));
        });
    });

    describe("TurboModel — signals", () => {
        it("makeSignal() creates a signal box for a key", () => {
            const model = new TurboModel({data: {count: 0}});
            const signal = model.makeSignal("count");
            expect(signal).toBeDefined();
        });

        it("getSignal() returns the signal previously created for a key", () => {
            const model = new TurboModel({data: {count: 0}});
            const created = model.makeSignal("count");
            const retrieved = model.getSignal("count");
            expect(retrieved).toBe(created);
        });

        it("makeSignals() returns an array of signals", () => {
            const model = new TurboModel({data: {a: {b: 1}}});
            // makeSignals("a", "b") creates a signal at the nested path a.b
            const signals = model.makeSignals("a", "b");
            expect(Array.isArray(signals)).toBe(true);
            expect(signals.length).toBeGreaterThan(0);
        });
    });

    describe("TurboModel — observer integration", () => {
        it("generateObserver() creates an observer watching a key path", () => {
            const model = new TurboModel({data: {items: {a: "first", b: "second"}}});
            const added: string[] = [];

            const observer = model.generateObserver(
                {
                    onAdded: (data, _self, ...keys) => {
                        added.push(keys[0] as string);
                        return {};
                    },
                    initialize: true,
                },
                "items",
            );

            expect(observer).toBeDefined();
            expect(added).toContain("a");
            expect(added).toContain("b");
        });
    });

    describe("TurboModel — handlers", () => {
        it("addHandler / getHandler registers and retrieves a handler", () => {
            const model = new TurboModel({data: {}});
            const handler = new TurboHandler();
            handler.keyName = "myHandler";
            model.addHandler(handler);
            expect(model.getHandler("myHandler")).toBe(handler);
        });

        it("getHandler returns undefined for unknown key", () => {
            const model = new TurboModel({data: {}});
            expect(model.getHandler("nonexistent")).toBeUndefined();
        });
    });
})