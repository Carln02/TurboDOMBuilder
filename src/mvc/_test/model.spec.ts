import {describe, it, expect, vi} from "vitest";
import {TurboModel} from "../core/model";

class MapModel<Data extends object = Record<string, any>> extends TurboModel<Data, string, string, "map"> {
    private _enabled = true;

    public get enabledCallbacks() { return this._enabled; }

    public set enabledCallbacks(v: boolean) { this._enabled = v; }
}

class ArrayModel<Data extends object = Record<string, any>> extends TurboModel<Data, string, number, "array"> {
    private _enabled = true;

    public get enabledCallbacks() { return this._enabled; }

    public set enabledCallbacks(v: boolean) { this._enabled = v; }
}

describe("TurboModel (map mode)", () => {
    it("initializes with one default block (no auto-initialize on ctor)", () => {
        const model = new MapModel({a: 1, b: 2}, "map");
        expect(model.getBlock()).not.toBeNull();
        expect(model.data).toEqual({a: 1, b: 2});
        expect(model.defaultBlockKey).toBe("__turbo_default_block_key__");
    });

    it("get/set data and fire keyChangedCallback on setData when enabled", () => {
        const model = new MapModel<{ a?: number }>({a: 1}, "map");
        const spy = vi.fn();
        model.keyChangedCallback.fire = spy as any;

        model.setData("a", 42);
        expect(model.getData("a")).toBe(42);
        expect(spy).toHaveBeenCalledTimes(1);
        // signature: fire(key, blockKey, value)
        expect(spy).toHaveBeenCalledWith("a", model.defaultBlockKey, 42);
    });

    it("setBlock creates a block and optional initialize fires for all keys", () => {
        const model = new MapModel<Record<string, any>>({}, "map");
        const spy = vi.fn();
        model.keyChangedCallback.fire = spy as any;

        model.setBlock({x: 10, y: 20}, "id-1", model.defaultBlockKey, true);

        expect(model.getBlockId()).toBe("id-1");
        expect(model.getData("x")).toBe(10);
        expect(model.getData("y")).toBe(20);

        // initialize() should emit per key (since enabledCallbacks defaults true)
        expect(spy).toHaveBeenCalledTimes(2);
        // We don't enforce order here, just values:
        const args = spy.mock.calls.map(c => c.slice(0, 3));
        expect(args).toContainEqual(["x", model.defaultBlockKey, 10]);
        expect(args).toContainEqual(["y", model.defaultBlockKey, 20]);
    });

    it("getAllKeys / getAllData / getAllIds", () => {
        const model = new MapModel<Record<string, any>>({}, "map");
        model.setBlock({a: 1, b: 2}, "id-1", model.defaultBlockKey, false);

        expect(model.getAllKeys()).toEqual(["a", "b"]);
        expect(model.getAllValues()).toEqual([1, 2]);
        expect(model.getAllBlockIds()).toEqual(["id-1"]);
    });

    it("hasBlock works and getAllBlockKeys returns keys", () => {
        const model = new MapModel({}, "map");
        const key = model.defaultBlockKey;
        model.setBlock({z: 9}, "id-z", key, false);

        expect(model.hasBlock(key)).toBe(true);
        expect(model.getAllBlockKeys()).toEqual([key]);
    });

    it("setBlockId updates id", () => {
        const model = new MapModel({}, "map");
        model.setBlock({a: 1}, "id-1", model.defaultBlockKey, false);
        model.setBlockId("id-2");
        expect(model.getBlockId()).toBe("id-2");
    });

    it("getAllBlocks returns single block when only one; all blocks when multiple", () => {
        const model = new MapModel({}, "map");
        model.setBlock({a: 1}, "id-1", model.defaultBlockKey, false);

        // single
        let blocks = model.getAllBlocks(); // defaultComputationBlockKey -> single
        expect(blocks.length).toBe(1);
        expect(blocks[0].id).toBe("id-1");

        // add another
        model.setBlock({b: 2}, "id-2", "secondary" as any, false);

        blocks = model.getAllBlocks(); // now should iterate all
        expect(blocks.length).toBe(2);
        expect(blocks.map(b => b.id).sort()).toEqual(["id-1", "id-2"]);
    });
});

describe("TurboModel (array mode)", () => {
    it("defaultBlockKey is 0 and addBlock inserts at index or appends", () => {
        const model = new ArrayModel<{ a?: number }>(undefined, "array");

        console.log(model.getAllBlockKeys())

        // addBlock appends when index invalid
        model.addBlock({a: 1}, 100, undefined, false);
        // insert at 0
        model.addBlock({a: 0}, 0, 0, false);

        console.log(model.getAllBlockKeys())
        expect(model.getAllBlockKeys()).toEqual([0, 1]);
        expect(model.getBlock(0)?.data).toEqual({a: 0});
        expect(model.getBlock(1)?.data).toEqual({a: 1});
    });

    it("initialize(index) fires per key for that block only", () => {
        const model = new ArrayModel<{ a: number; b: number }>(undefined, "array");
        model.enabledCallbacks = true;

        const spyFn = vi.fn();
        model.keyChangedCallback.add(spyFn);

        // create two blocks without auto-init
        model.setBlock({a: 1, b: 2}, 10, 0,false);
        model.setBlock({a: 3, b: 4}, 11, 1, false);

        model.initialize(1);

        // should only fire for block index 1
        const calls = spyFn.mock.calls.map(c => [c[0], c[1], c[2]]);
        expect(calls).toContainEqual(["a", 1, 3]);
        expect(calls).toContainEqual(["b", 1, 4]);
        // ensure no fires for block 0 keys
        expect(calls).not.toContainEqual(["a", 0, 1]);
        expect(calls).not.toContainEqual(["b", 0, 2]);
    });
});