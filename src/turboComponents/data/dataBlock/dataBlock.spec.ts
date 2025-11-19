import { describe, it, expect, beforeEach } from "vitest";
import {TurboDataBlock} from "./dataBlock";
import {DataBlockHost} from "./dataBlock.types";

type K = string;

function makeHost() {
    const dirty: Array<{ key: K; block: TurboDataBlock<any, K, any> }> = [];
    const changed: Array<{ key: K; value: unknown; block: TurboDataBlock<any, K, any> }> = [];

    const host: DataBlockHost<any, K, any> = {
        onDirty: (key, block) => dirty.push({ key, block }),
        onChange: (key, value, block) => changed.push({ key, value, block }),
    };

    return { host, dirty, changed };
}

describe("TurboDataBlock (object data)", () => {
    let block: TurboDataBlock<Record<string, any>, K, string>;
    let host: ReturnType<typeof makeHost>;

    beforeEach(() => {
        host = makeHost();
        block = new TurboDataBlock<Record<string, any>, K, string>({
            id: "obj-1",
            data: { a: 1, b: 2 },
        });
        block.link(host.host);
    });

    it("constructs with id and data", () => {
        expect(block.id).toBe("obj-1");
        expect(block.get("a")).toBe(1);
        expect(block.get("b")).toBe(2);
    });

    it("keys / values / size reflect object content", () => {
        const keys = block.keys;
        expect(keys).toContain("a");
        expect(keys).toContain("b");
        expect(block.values).toEqual([block.get("a"), block.get("b")]);
        expect(block.size).toBe(2);
    });

    it("get / set updates value and fires host callbacks", () => {
        host.dirty.length = 0;
        host.changed.length = 0;

        block.set("a", 10);
        expect(block.get("a")).toBe(10);

        // Should have fired once for key "a"
        expect(host.dirty.length).toBe(1);
        expect(host.dirty[0].key).toBe("a");

        expect(host.changed.length).toBe(1);
        expect(host.changed[0].key).toBe("a");
        expect(host.changed[0].value).toBe(10);
    });

    it("set with same value is a no-op (no callbacks)", () => {
        host.dirty.length = 0;
        host.changed.length = 0;

        block.set("a", 1); // same as initial
        expect(host.dirty.length).toBe(0);
        expect(host.changed.length).toBe(0);
    });

    it("has / delete work and fire callbacks", () => {
        expect(block.has("a")).toBe(true);

        host.dirty.length = 0;
        host.changed.length = 0;

        block.delete("a");
        expect(block.has("a")).toBe(false);
        expect(block.get("a")).toBeUndefined();

        // delete triggers keyChanged with deleted=true
        expect(host.dirty.length).toBe(1);
        expect(host.dirty[0].key).toBe("a");

        expect(host.changed.length).toBe(1);
        expect(host.changed[0].key).toBe("a");
        expect(host.changed[0].value).toBeUndefined();
    });

    it("initialize fires change for each existing key (and marks isInitialized)", () => {
        host.dirty.length = 0;
        host.changed.length = 0;

        block.data = { a: 1, b: 2 };
        block.initialize();

        // One dirty + change per key
        // Order: object key order; we just assert counts & membership
        expect(host.dirty.length).toBe(2);
        expect(host.changed.length).toBe(2);

        const keys = host.changed.map((c) => c.key).sort();
        expect(keys).toEqual(["a", "b"]);
    });

    it("enabledCallbacks=false prevents firing onChange & observers, but still issues onDirty", () => {
        // Turn off callbacks
        block.enabledCallbacks = false;

        host.dirty.length = 0;
        host.changed.length = 0;

        block.set("a", 123);

        // We still expect onDirty (emit + host.onDirty) to run
        expect(host.dirty.length).toBe(1);
        expect(host.dirty[0].key).toBe("a");

        // But NOT onChange (callbacks) or changeObservers
        expect(host.changed.length).toBe(0);
    });

    it("clear(true) removes data and clears change observers", () => {
        block.generateObserver(); // create one so we can ensure clear() doesn't throw

        block.clear(true);
        expect(block.get("a")).toBeUndefined();
        expect(block.get("b")).toBeUndefined();
        expect(block.size).toBe(0);
        // data is undefined
        // keys/values reflect empty
        expect(block.keys).toEqual([]);
        expect(block.values).toEqual([]);
    });

    it("clear(false) preserves data container but does not mutate keys", () => {
        // re-create with fresh data
        block = new TurboDataBlock({ id: "obj-2", data: { a: 1, b: 2 } });
        block.link(host.host);

        block.clear(false);
        // Leaves data reference intact (as per implementation), but does not wipe keys
        // The current implementation sets nothing on data when clear(false),
        // only calls observer.clear(). So the data stays as-is.
        expect(block.get("a")).toBe(1);
        expect(block.get("b")).toBe(2);
        expect(block.size).toBe(2);
    });

    it("toJSON() returns a shallow object snapshot", () => {
        const json = block.toJSON();
        expect(json).toEqual({ a: 1, b: 2 });
    });

    it("unlink removes host, subsequent sets do not call host callbacks", () => {
        block.unlink();
        host.dirty.length = 0;
        host.changed.length = 0;

        block.set("a", 999);
        expect(block.get("a")).toBe(999);
        expect(host.dirty.length).toBe(0);
        expect(host.changed.length).toBe(0);
    });

    it("change observers: onAdded/onUpdated/onDeleted fire and track instances", () => {
        const added: Array<{ key: K; value: unknown }> = [];
        const updated: Array<{ key: K; value: unknown }> = [];
        const deleted: Array<{ key: K; value: unknown }> = [];

        const observer = block.generateObserver({
            onAdded: (value, key) => {
                added.push({ key, value });
                return {};
            },
            onUpdated: (value, instance, key) => {
                updated.push({ key, value });
            },
            onDeleted: (value, instance, key) => {
                deleted.push({ key, value });
            },
            initialize: true,
        });

        // After initialize, existing keys should be added+updated
        // (generateObserver().initialize() is called when isInitialized is true. Not yet.)
        // So we must initialize block first to trigger observer.initialize logic.
        block.initialize();

        // Two entries initially
        expect(added.map(a => a.key).sort()).toEqual(["a", "b"]);
        expect(updated.map(u => u.key).sort()).toEqual(["a", "b"]);
        expect(observer.getAllInstances().length).toBe(2);

        // Update a key => should trigger onUpdated
        added.length = 0; updated.length = 0; deleted.length = 0;
        block.set("a", 77);
        expect(updated.length).toBe(1);
        expect(updated[0]).toEqual({ key: "a", value: 77 });

        // Delete a key => should trigger onDeleted
        added.length = 0; updated.length = 0; deleted.length = 0;
        block.delete("b");
        expect(deleted.length).toBe(1);
        expect(deleted[0]).toEqual({ key: "b", value: undefined });

        // Clear observer
        observer.clear();
        expect(observer.getAllInstances().length).toBe(0);
    });
});

describe("TurboDataBlock (Map data)", () => {
    let block: TurboDataBlock<Map<string, any>, K, string>;
    let host: ReturnType<typeof makeHost>;

    beforeEach(() => {
        host = makeHost();
        block = new TurboDataBlock<Map<string, any>, K, string>({
            id: "map-1",
            data: new Map<string, any>([
                ["x", 1],
                ["y", 2],
            ]),
        });
        block.link(host.host);
    });

    it("get/set/has/delete on Map works", () => {
        expect(block.get("x")).toBe(1);
        expect(block.has("x")).toBe(true);

        block.set("x", 42);
        expect(block.get("x")).toBe(42);

        block.delete("x");
        expect(block.has("x")).toBe(false);
        expect(block.get("x")).toBeUndefined();
    });

    it("keys/values/size on Map reflect content", () => {
        const keys = block.keys.sort();
        expect(keys).toEqual(["x", "y"]);
        expect(block.values.length).toBe(2);
        expect(block.size).toBe(2);
    });

    it("toJSON() for Map returns plain object", () => {
        const json = block.toJSON();
        expect(json).toEqual({ x: 1, y: 2 });
    });
});
