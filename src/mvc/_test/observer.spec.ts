import {describe, it, expect} from "vitest";
import {TurboObserver} from "../model/observer";
import {DataKeyType} from "../model/model.types";

describe("Observer", () => {
    describe("TurboObserver — lifecycle", () => {
        it("starts uninitialized", () => {
            const observer = new TurboObserver();
            expect(observer.isInitialized).toBe(false);
        });

        it("initialize() fires onInitialize and sets isInitialized", () => {
            let fired = false;
            const observer = new TurboObserver({
                onInitialize: () => { fired = true; },
            });

            expect(observer.isInitialized).toBe(false);
            observer.initialize();
            expect(observer.isInitialized).toBe(true);
            expect(fired).toBe(true);
        });

        it("initialize() is a no-op if already initialized", () => {
            let count = 0;
            const observer = new TurboObserver({
                onInitialize: () => count++,
            });

            observer.initialize();
            observer.initialize();
            expect(count).toBe(1);
        });

        it("initialize: true in properties initializes immediately", () => {
            let fired = false;
            const observer = new TurboObserver({
                onInitialize: () => { fired = true; },
                initialize: true,
            });
            expect(observer.isInitialized).toBe(true);
            expect(fired).toBe(true);
        });

        it("clear() resets isInitialized and removes all entries", () => {
            const observer = new TurboObserver<string, object>({
                onAdded: () => ({}),
            });

            observer.keyChanged(["key1"], "data1");
            expect(observer.get("key1" as any)).toBeDefined();

            observer.initialize();
            observer.clear(false);

            expect(observer.isInitialized).toBe(false);
            expect(observer.get("key1" as any)).toBeUndefined();
        });

        it("destroy() clears entries and fires onDestroy", () => {
            let destroyed = false;
            const observer = new TurboObserver({
                onDestroy: () => { destroyed = true; },
            });

            observer.destroy(false);
            expect(destroyed).toBe(true);
        });
    });

    describe("TurboObserver — keyChanged", () => {
        it("keyChanged with no existing instance fires onAdded and stores result", () => {
            const added: string[] = [];
            const observer = new TurboObserver<string, {id: string}>({
                onAdded: (data, _self, ...keys) => {
                    added.push(keys[0] as string);
                    return {id: keys[0] as string};
                },
            });

            observer.keyChanged(["item1"], "data-for-item1");

            expect(added).toEqual(["item1"]);
            expect(observer.get("item1" as any)).toEqual({id: "item1"});
        });

        it("keyChanged with existing instance fires onUpdated (also fires after onAdded)", () => {
            const updated: string[] = [];
            const observer = new TurboObserver<string, {id: string}>({
                onAdded: (_data, _self, ...keys) => ({id: keys[0] as string}),
                onUpdated: (_data, _instance, _self, ...keys) => {
                    updated.push(keys[0] as string);
                },
            });

            // First call: onAdded fires then onUpdated fires (once for initial add)
            observer.keyChanged(["item1"], "first");
            // Second call: only onUpdated fires (instance already exists)
            observer.keyChanged(["item1"], "second");

            // onUpdated is called once on add + once on update = 2 total
            expect(updated).toHaveLength(2);
            expect(updated).toEqual(["item1", "item1"]);
        });

        it("keyChanged with deleted=true fires onDeleted", () => {
            const deleted: string[] = [];
            const observer = new TurboObserver<string, {id: string}>({
                onAdded: (_data, _self, ...keys) => ({id: keys[0] as string}),
                onDeleted: (_data, _instance, _self, ...keys) => {
                    deleted.push(keys[0] as string);
                },
            });

            observer.keyChanged(["item1"], "data");       // add
            observer.keyChanged(["item1"], "data", true); // delete

            expect(deleted).toHaveLength(1);
            expect(deleted[0]).toBe("item1");
        });

        it("keyChanged with deleted=true and no custom onDeleted removes the instance by default", () => {
            const observer = new TurboObserver<string, {id: string}>({
                onAdded: (_data, _self, ...keys) => ({id: keys[0] as string}),
                // No custom onDeleted → default behaviour removes the instance
            });

            observer.keyChanged(["item1"], "data");       // add
            expect(observer.get("item1" as any)).toBeDefined();

            observer.keyChanged(["item1"], "data", true); // delete via default handler
            expect(observer.get("item1" as any)).toBeUndefined();
        });

        it("keyChanged with deleted=true but no existing instance is a no-op", () => {
            let deletedCalled = false;
            const observer = new TurboObserver<any, any, DataKeyType>({
                onDeleted: () => { deletedCalled = true; }
            });

            observer.keyChanged(["ghost"], "data", true);
            expect(deletedCalled).toBe(false);
        });

        it("keyChanged without onAdded returning instance is a no-op after add", () => {
            const updated: any[] = [];
            const observer = new TurboObserver<string, object>({
                // onAdded returns void — nothing stored
                onUpdated: (_d, _i, _s, ...keys) => updated.push(keys[0]),
            });

            observer.keyChanged(["item"], "data"); // onAdded returns void -> nothing stored
            expect(observer.get("item" as any)).toBeUndefined();
            expect(updated).toHaveLength(0); // onUpdated not called if no instance stored
        });
    });

    describe("TurboObserver — remove / detach", () => {
        it("remove() deletes the instance from the map", () => {
            const observer = new TurboObserver<string, {id: string}>({
                onAdded: (_d, _s, ...keys) => ({id: keys[0] as string}),
            });

            observer.keyChanged(["k"], "v");
            expect(observer.get("k" as any)).toBeDefined();

            observer.remove("k" as any);
            expect(observer.get("k" as any)).toBeUndefined();
        });

        it("detach() removes from map without calling instance.remove()", () => {
            let removeCalled = false;
            const observer = new TurboObserver<string, {id: string; remove: () => void}>({
                onAdded: (_d, _s, ...keys) => ({
                    id: keys[0] as string,
                    remove: () => { removeCalled = true; },
                }),
            });

            observer.keyChanged(["k"], "v");
            observer.detach("k" as any);

            expect(observer.get("k" as any)).toBeUndefined();
            expect(removeCalled).toBe(false);
        });
    });

    describe("TurboObserver — nested key paths", () => {
        it("stores and retrieves instances at nested key paths", () => {
            const observer = new TurboObserver<string, {label: string}>({
                onAdded: (_d, _s, ...keys) => ({label: keys.join(".")}),
            });

            observer.keyChanged(["group1", "item1"], "data");

            const instance = observer.get("group1" as any, "item1" as any);
            expect(instance).toBeDefined();
            expect(instance?.label).toBe("group1.item1");
        });
    });
})