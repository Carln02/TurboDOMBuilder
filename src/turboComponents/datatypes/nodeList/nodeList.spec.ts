import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {TurboNodeList} from "./nodeList";
import {turbo} from "../../../turboFunctions/turboFunctions";

function makeEntry(id: string) {
    return {id};
}

function collectChanges(list: TurboNodeList<any>) {
    const log: {entry: any, state: "added" | "removed"}[] = [];
    list.onChanged.add((entry, state) => log.push({entry, state}));
    return log;
}

function wait() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

describe("TurboNodeList", () => {
    let parent: HTMLElement;

    beforeEach(() => {
        parent = document.createElement("div");
        turbo(document.body).addChild(parent);
    });

    afterEach(() => turbo(document.body).removeChild(parent));

    describe("constructor", () => {
        it("initializes empty with no arguments", () => {
            const list = new TurboNodeList();
            expect(list.size).toBe(0);
            expect(list.slotCount).toBe(0);
        });

        it("initializes with a single entry", () => {
            const a = makeEntry("a");
            const list = new TurboNodeList(a);
            expect(list.size).toBe(1);
            expect(list.has(a)).toBe(true);
        });

        it("initializes with an array", () => {
            const a = makeEntry("a");
            const b = makeEntry("b");
            const list = new TurboNodeList([a, b]);
            expect(list.size).toBe(2);
        });

        it("initializes with a Set", () => {
            const a = makeEntry("a");
            const b = makeEntry("b");
            const list = new TurboNodeList(new Set([a, b]));
            expect(list.size).toBe(2);
        });

        it("initializes with multiple values via spread", () => {
            const a = makeEntry("a");
            const b = makeEntry("b");
            const list = new TurboNodeList(a as any, b as any);
            expect(list.size).toBe(2);
        });
    });

    describe("add", () => {
        it("adds a single entry", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a);
            expect(list.has(a)).toBe(true);
            expect(list.size).toBe(1);
        });

        it("adds multiple entries", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add(a, b);
            expect(list.size).toBe(2);
        });

        it("does not add duplicate entries", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a, a);
            expect(list.size).toBe(1);
            expect(list.slotCount).toBe(1);
        });

        it("expands arrays inline", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add([a, b]);
            expect(list.size).toBe(2);
            expect(list.slotCount).toBe(2);
        });

        it("expands Sets inline", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add(new Set([a, b]));
            expect(list.size).toBe(2);
        });

        it("fires onChanged for each added entry", () => {
            const list = new TurboNodeList();
            const log = collectChanges(list);
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add(a, b);
            expect(log).toEqual([
                {entry: a, state: "added"},
                {entry: b, state: "added"},
            ]);
        });

        it("does not fire onChanged for duplicate adds", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a);
            const log = collectChanges(list);
            list.add(a);
            expect(log).toHaveLength(0);
        });

        it("is chainable", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const result = list.add(a);
            expect(result).toBe(list);
        });
    });

    describe("addAt", () => {
        it("inserts an entry at the specified slot index", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            const c = makeEntry("c");
            list.add(a, c);
            list.addAt(1, b);
            expect(list.array).toEqual([a, b, c]);
        });

        it("inserts multiple entries consecutively at the given index", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const d = makeEntry("d");
            const b = makeEntry("b");
            const c = makeEntry("c");
            list.add(a, d);
            list.addAt(1, b, c);
            expect(list.array).toEqual([a, b, c, d]);
        });

        it("clamps index to valid range", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.addAt(999, a);
            expect(list.has(a)).toBe(true);
        });

        it("inserts at index 0 correctly", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add(b);
            list.addAt(0, a);
            expect(list.array).toEqual([a, b]);
        });
    });

    describe("remove", () => {
        it("removes a single entry", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a);
            list.remove(a);
            expect(list.has(a)).toBe(false);
            expect(list.size).toBe(0);
        });

        it("fires onChanged with removed state", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a);
            const log = collectChanges(list);
            list.remove(a);
            expect(log).toEqual([{entry: a, state: "removed"}]);
        });

        it("does not fire onChanged if entry not present", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const log = collectChanges(list);
            list.remove(a);
            expect(log).toHaveLength(0);
        });

        it("removes entries from arrays inline", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add(a, b);
            list.remove([a, b]);
            expect(list.size).toBe(0);
        });

        it("is chainable", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a);
            expect(list.remove(a)).toBe(list);
        });
    });

    describe("removeAt", () => {
        it("removes a single slot by index", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add(a, b);
            list.removeAt(0);
            expect(list.has(a)).toBe(false);
            expect(list.has(b)).toBe(true);
        });

        it("removes multiple consecutive slots", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            const c = makeEntry("c");
            list.add(a, b, c);
            list.removeAt(0, 2);
            expect(list.has(a)).toBe(false);
            expect(list.has(b)).toBe(false);
            expect(list.has(c)).toBe(true);
        });

        it("is chainable", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a);
            expect(list.removeAt(0)).toBe(list);
        });
    });

    describe("has", () => {
        it("returns false for empty list", () => {
            const list = new TurboNodeList();
            expect(list.has(makeEntry("a"))).toBe(false);
        });

        it("returns true after add", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a);
            expect(list.has(a)).toBe(true);
        });

        it("returns false after remove", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a);
            list.remove(a);
            expect(list.has(a)).toBe(false);
        });

        it("returns true for array if all items are present", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add(a, b);
            expect(list.has([a, b])).toBe(true);
        });

        it("returns false for array if any item is missing", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add(a);
            expect(list.has([a, b])).toBe(false);
        });

        it("returns false for empty array", () => {
            const list = new TurboNodeList();
            expect(list.has([])).toBe(false);
        });
    });

    describe("clear", () => {
        it("removes all entries", () => {
            const list = new TurboNodeList();
            list.add(makeEntry("a"), makeEntry("b"));
            list.clear();
            expect(list.size).toBe(0);
            expect(list.slotCount).toBe(0);
        });

        it("fires onChanged removed for all entries", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add(a, b);
            const log = collectChanges(list);
            list.clear();
            expect(log).toContainEqual({entry: a, state: "removed"});
            expect(log).toContainEqual({entry: b, state: "removed"});
        });

        it("is chainable", () => {
            const list = new TurboNodeList();
            expect(list.clear()).toBe(list);
        });
    });

    describe("size and slotCount", () => {
        it("size counts unique resolved entries", () => {
            const list = new TurboNodeList();
            list.add(makeEntry("a"), makeEntry("b"), makeEntry("c"));
            expect(list.size).toBe(3);
        });

        it("slotCount equals number of direct slots", () => {
            const list = new TurboNodeList();
            list.add(makeEntry("a"), makeEntry("b"));
            expect(list.slotCount).toBe(2);
        });

        it("slotCount is 1 for a sub-list slot regardless of sub-list size", () => {
            const sub = new TurboNodeList();
            sub.add(makeEntry("a"), makeEntry("b"));
            const list = new TurboNodeList();
            list.add(sub);
            expect(list.slotCount).toBe(1);
            expect(list.size).toBe(2);
        });
    });

    describe("list and array", () => {
        it("list returns a Set snapshot", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a);
            const snap = list.list;
            expect(snap).toBeInstanceOf(Set);
            expect(snap.has(a)).toBe(true);
        });

        it("list setter replaces contents", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add(a);
            list.list = [b] as any;
            expect(list.has(a)).toBe(false);
            expect(list.has(b)).toBe(true);
        });

        it("array returns an array snapshot", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            list.add(a, b);
            expect(list.array).toEqual([a, b]);
        });
    });

    describe("sub-list (TurboNodeList) slots", () => {
        it("resolves sub-list entries on iteration", () => {
            const sub = new TurboNodeList();
            const a = makeEntry("a");
            sub.add(a);
            const list = new TurboNodeList();
            list.add(sub);
            expect(list.has(a)).toBe(true);
            expect([...list]).toContain(a);
        });

        it("fires onChanged when sub-list entry is added", () => {
            const sub = new TurboNodeList();
            const list = new TurboNodeList();
            list.add(sub);
            const log = collectChanges(list);
            const a = makeEntry("a");
            sub.add(a);
            expect(log).toContainEqual({entry: a, state: "added"});
        });

        it("fires onChanged when sub-list entry is removed", () => {
            const sub = new TurboNodeList();
            const a = makeEntry("a");
            sub.add(a);
            const list = new TurboNodeList();
            list.add(sub);
            const log = collectChanges(list);
            sub.remove(a);
            expect(log).toContainEqual({entry: a, state: "removed"});
        });

        it("fires onChanged for existing sub-list entries on add", () => {
            const sub = new TurboNodeList();
            const a = makeEntry("a");
            sub.add(a);
            const list = new TurboNodeList();
            const log = collectChanges(list);
            list.add(sub);
            expect(log).toContainEqual({entry: a, state: "added"});
        });

        it("fires onChanged for sub-list entries on remove of sub-list", () => {
            const sub = new TurboNodeList();
            const a = makeEntry("a");
            sub.add(a);
            const list = new TurboNodeList();
            list.add(sub);
            const log = collectChanges(list);
            list.remove(sub);
            expect(log).toContainEqual({entry: a, state: "removed"});
        });

        it("unregisters sub-list handler on remove", () => {
            const sub = new TurboNodeList();
            const list = new TurboNodeList();
            list.add(sub);
            list.remove(sub);
            const log = collectChanges(list);
            sub.add(makeEntry("a"));
            expect(log).toHaveLength(0);
        });

        it("has() returns true for a registered sub-list", () => {
            const sub = new TurboNodeList();
            const list = new TurboNodeList();
            list.add(sub);
            expect(list.has(sub)).toBe(true);
        });

        it("has() returns false after sub-list removed", () => {
            const sub = new TurboNodeList();
            const list = new TurboNodeList();
            list.add(sub);
            list.remove(sub);
            expect(list.has(sub)).toBe(false);
        });
    });

    describe("re-add after remove", () => {
        it("can re-add an entry after it was removed", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a);
            list.remove(a);
            list.add(a);
            expect(list.has(a)).toBe(true);
            expect(list.size).toBe(1);
        });

        it("fires onChanged added when re-adding", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            list.add(a);
            list.remove(a);
            const log = collectChanges(list);
            list.add(a);
            expect(log).toContainEqual({entry: a, state: "added"});
        });
    });

    describe("ordering", () => {
        it("maintains insertion order", () => {
            const list = new TurboNodeList();
            const a = makeEntry("a");
            const b = makeEntry("b");
            const c = makeEntry("c");
            list.add(a, b, c);
            expect(list.array).toEqual([a, b, c]);
        });

        it("addAt respects slot ordering vs sub-list", () => {
            const sub = new TurboNodeList();
            const b = makeEntry("b");
            const c = makeEntry("c");
            sub.add(b, c);

            const list = new TurboNodeList();
            const a = makeEntry("a");
            const d = makeEntry("d");
            list.add(a, d);
            list.addAt(1, sub);

            expect(list.array).toEqual([a, b, c, d]);
        });

        it("de-duplicates across sub-lists and direct entries", () => {
            const a = makeEntry("a");
            const sub = new TurboNodeList();
            sub.add(a);

            const list = new TurboNodeList();
            list.add(sub);
            list.add(a); // a already visible via sub, should not appear twice

            const arr = list.array;
            expect(arr.filter(e => e === a)).toHaveLength(1);
        });
    });

    describe("adding an HTMLCollection slot", () => {
        it("iterates the collection's current entries", () => {
            const a = document.createElement("span");
            const b = document.createElement("span");
            parent.appendChild(a);
            parent.appendChild(b);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);

            expect([...list]).toContain(a);
            expect([...list]).toContain(b);
            expect(list.size).toBe(2);
        });

        it("counts as one slot regardless of collection size", () => {
            const a = document.createElement("span");
            const b = document.createElement("span");
            parent.appendChild(a);
            parent.appendChild(b);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);

            expect(list.slotCount).toBe(1);
        });

        it("fires onChanged for each entry in the collection on add", () => {
            const a = document.createElement("span");
            const b = document.createElement("span");
            parent.appendChild(a);
            parent.appendChild(b);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            const log = collectChanges(list);
            list.add(collection);

            expect(log).toContainEqual({entry: a, state: "added"});
            expect(log).toContainEqual({entry: b, state: "added"});
        });

        it("reflects live collection changes on next iteration", () => {
            parent.appendChild(document.createElement("span"));
            const collection = parent.getElementsByTagName("span");
            const list = new TurboNodeList<Element>();
            list.add(collection);

            const c = document.createElement("span");
            parent.appendChild(c); // live collection grows

            expect([...list]).toContain(c);
        });
    });

    describe("has and remove for dom list slots", () => {
        it("has() returns true for a registered collection", () => {
            const collection = parent.getElementsByTagName("span");
            const list = new TurboNodeList<Element>();
            list.add(collection);
            expect(list.has(collection)).toBe(true);
        });

        it("has() returns false after collection is removed", () => {
            const collection = parent.getElementsByTagName("span");
            const list = new TurboNodeList<Element>();
            list.add(collection);
            list.remove(collection);
            expect(list.has(collection)).toBe(false);
        });

        it("fires onChanged removed for each entry when collection slot is removed", () => {
            const a = document.createElement("span");
            const b = document.createElement("span");
            parent.appendChild(a);
            parent.appendChild(b);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);
            const log = collectChanges(list);
            list.remove(collection);

            expect(log).toContainEqual({entry: a, state: "removed"});
            expect(log).toContainEqual({entry: b, state: "removed"});
        });

        it("does not iterate collection entries after removal", () => {
            const a = document.createElement("span");
            parent.appendChild(a);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);
            list.remove(collection);

            expect([...list]).not.toContain(a);
        });

        it("does not add a duplicate collection slot", () => {
            const collection = parent.getElementsByTagName("span");
            const list = new TurboNodeList<Element>();
            list.add(collection);
            list.add(collection);
            expect(list.slotCount).toBe(1);
        });
    });

    describe("removeAt with dom list slot", () => {
        it("removes the collection slot by index", () => {
            const a = document.createElement("span");
            parent.appendChild(a);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);
            list.removeAt(0);

            expect(list.has(collection)).toBe(false);
            expect(list.slotCount).toBe(0);
        });
    });

    describe("observeDomLists", () => {
        it("fires onChanged added when a node is added to the DOM", async () => {
            const a = document.createElement("span");
            parent.appendChild(a);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);
            list.observeDomLists = true;

            const log = collectChanges(list);
            const b = document.createElement("span");
            parent.appendChild(b);

            await wait(); // let MutationObserver flush
            expect(log).toContainEqual({entry: b, state: "added"});
        });

        it("fires onChanged removed when a node is removed from the DOM", async () => {
            const a = document.createElement("span");
            parent.appendChild(a);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);
            list.observeDomLists = true;

            const log = collectChanges(list);
            parent.removeChild(a);

            await wait();
            expect(log).toContainEqual({entry: a, state: "removed"});
        });

        it("does not fire onChanged after observeDomLists is turned off", async () => {
            const a = document.createElement("span");
            parent.appendChild(a);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);
            list.observeDomLists = true;
            list.observeDomLists = false;

            const log = collectChanges(list);
            const b = document.createElement("span");
            parent.appendChild(b);

            await wait();
            expect(log).toHaveLength(0);
        });

        it("does not fire for nodes added outside the observed parent", async () => {
            const a = document.createElement("span");
            parent.appendChild(a);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);
            list.observeDomLists = true;

            const log = collectChanges(list);
            const otherParent = document.createElement("div");
            document.body.appendChild(otherParent);
            otherParent.appendChild(document.createElement("span"));

            await wait();
            expect(log).toHaveLength(0);
            document.body.removeChild(otherParent);
        });

        it("does not fire for already-snapshot nodes re-added", async () => {
            const a = document.createElement("span");
            parent.appendChild(a);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);
            list.observeDomLists = true;

            parent.removeChild(a);
            await wait();

            const log = collectChanges(list);
            parent.appendChild(a); // re-add — snapshot already had it removed

            await wait();
            // should fire added since it was removed from snapshot on removal
            expect(log).toContainEqual({entry: a, state: "added"});
        });

        it("disconnects observer when collection slot is removed", async () => {
            const a = document.createElement("span");
            parent.appendChild(a);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);
            list.observeDomLists = true;
            list.remove(collection);

            const log = collectChanges(list);
            parent.appendChild(document.createElement("span"));

            await wait();
            expect(log).toHaveLength(0);
        });

        it("re-attaches observers when observeDomLists is toggled back on", async () => {
            const a = document.createElement("span");
            parent.appendChild(a);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            list.add(collection);
            list.observeDomLists = true;
            list.observeDomLists = false;
            list.observeDomLists = true;

            const log = collectChanges(list);
            const b = document.createElement("span");
            parent.appendChild(b);

            await wait();
            expect(log).toContainEqual({entry: b, state: "added"});
        });
    });

    describe("ordering with dom list slots", () => {
        it("respects addAt slot index relative to other entries", () => {
            const a = document.createElement("span");
            parent.appendChild(a);
            const collection = parent.getElementsByTagName("span");

            const list = new TurboNodeList<Element>();
            const x = document.createElement("div");
            const z = document.createElement("div");
            list.add(x, z);
            list.addAt(1, collection);

            expect(list.array).toEqual([x, a, z]);
        });
    });
});

