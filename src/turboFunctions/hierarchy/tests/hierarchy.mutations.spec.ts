import { describe, it, expect, beforeEach } from "vitest";
import { $ } from "../../turboFunctions";
import {div, span} from "../../../elementCreation/basicElements";

beforeEach(() => { document.body.innerHTML = ""; });

describe("Hierarchy: mutations", () => {
    it("addChild appends by default; accepts single or array; accepts TurboSelector", () => {
        const parent = div({id: "m-1"});
        const c1 = document.createElement("i");
        const c2 = document.createElement("b");

        $(parent).addChild(c1);
        expect(parent.lastChild).toBe(c1);

        $(parent).addChild([c2]);
        expect(parent.lastChild).toBe(c2);

        const c3 = document.createElement("u");
        $(parent).addChild($(c3));
        expect(parent.lastChild).toBe(c3);
    });

    it("addChild with index inserts before referenceList[index]", () => {
        const parent = div({id: "m-2"});
        const a = document.createElement("a");
        const b = document.createElement("b");
        const c = document.createElement("c");
        parent.append(a, b);

        // insert c at index 1 → before 'b'
        $(parent).addChild(c, 1);
        expect([...parent.children].map(n => n.tagName.toLowerCase())).toEqual(["a", "c", "b"]);
    });

    it("addChildBefore inserts before sibling; falls back to append when sibling missing", () => {
        const parent = div({id: "m-3"});
        const a = document.createElement("a");
        const b = document.createElement("b");
        const c = document.createElement("c");
        parent.append(a, b);

        $(parent).addChildBefore(c, b);
        expect([...parent.children].map(n => n.tagName.toLowerCase())).toEqual(["a", "c", "b"]);

        const d = document.createElement("d");
        $(parent).addChildBefore(d, null as any);
        expect(parent.lastElementChild).toBe(d);
    });

    it("remChild removes provided child/children (Node or TurboSelector)", () => {
        const parent = div({id: "m-4"});
        const a = document.createElement("a");
        const b = document.createElement("b");
        parent.append(a, b);

        $(parent).remChild(a);
        expect([...parent.children]).toEqual([b]);

        $(parent).remChild($(b));
        expect(parent.children.length).toBe(0);
    });

    it("removeChildAt removes count children from index using childrenArray as default reference", () => {
        const parent = div({id: "m-5"});
        const a = document.createElement("a");
        const b = document.createElement("b");
        const c = document.createElement("c");
        const d = document.createElement("d");
        parent.append(a, b, c, d);

        $(parent).removeChildAt(1, 2); // remove b, c
        expect([...parent.children].map(n => n.tagName.toLowerCase())).toEqual(["a", "d"]);
    });

    it("removeAllChildren clears all", () => {
        const parent = div({id: "m-6"});
        parent.append(document.createElement("a"), document.createElement("b"));
        $(parent).removeAllChildren();
        expect(parent.children.length).toBe(0);
    });

    it("bringToFront moves current node to end within its parent", () => {
        const parent = div({id: "m-7"});
        const a = document.createElement("a");
        const b = document.createElement("b");
        parent.append(a, b);

        $(a).bringToFront();
        expect([...parent.children]).toEqual([b, a]);
    });

    it("sendToBack moves current node to index 0", () => {
        const parent = div({id: "m-8"});
        const a = document.createElement("a");
        const b = document.createElement("b");
        const c = document.createElement("c");
        parent.append(a, b, c);

        $(c).sendToBack();
        expect([...parent.children]).toEqual([c, a, b]);
    });

    it("remove() detaches the node and returns the selector for chaining", () => {
        const parent = div({id: "m-9"});
        const a = document.createElement("a");
        parent.append(a);

        const sel = $(a).remove();
        expect(parent.contains(a)).toBe(false);
        expect(sel.element).toBe(a);
    });

    it("addChild respects custom childHandler when set", () => {
        const host = div({id: "m-10"});
        const handler = div();
        const child = span();
        host.appendChild(handler);

        const sel = $(host);
        sel.childHandler = handler;

        sel.addChild(child);
        expect(handler.contains(child)).toBe(true);
        expect(host.contains(child)).toBe(true);
    });
});
