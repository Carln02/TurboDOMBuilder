import {describe, it, expect} from "vitest";
import * as Y from "yjs";
import {deepObserveAny} from "../yjs";

describe("deepObserveAny", () => {
    function makeRoot() {
        const doc = new Y.Doc();
        const root = doc.getMap("root");
        return {doc, root};
    }

    it("fires when an observed field changes on a YMap", () => {
        const {root} = makeRoot();
        const calls: string[] = [];
        deepObserveAny(root, field => calls.push(field), "title");

        root.set("title", "hello");
        expect(calls).toEqual(["title"]);

        root.set("other", "ignored");
        expect(calls).toEqual(["title"]);
    });

    it("fires for insertions into a Y.Array stored under an observed field", () => {
        const {root} = makeRoot();
        const content = new Y.Array();
        root.set("content", content);

        const calls: string[] = [];
        deepObserveAny(root, field => calls.push(field), "content");

        content.push([new Y.Map([["a", 1]])]);
        expect(calls).toEqual(["content"]);

        content.delete(0, 1);
        expect(calls).toEqual(["content", "content"]);
    });

    it("fires for insertions into a Y.Array nested deeper under an observed field", () => {
        const {root} = makeRoot();
        const content = new Y.Map();
        root.set("content", content);
        const inner = new Y.Array();
        content.set("items", inner);

        const calls: string[] = [];
        deepObserveAny(root, field => calls.push(field), "content");

        inner.push(["entry"]);
        expect(calls).toEqual(["content"]);
    });
});
