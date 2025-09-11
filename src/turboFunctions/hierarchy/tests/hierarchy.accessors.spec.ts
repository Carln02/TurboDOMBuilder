import {describe, it, expect, beforeEach} from "vitest";
import {$} from "../../turboFunctions";
import {div, span} from "../../../elementCreation/basicElements";
import {element} from "../../../elementCreation/element";

beforeEach(() => { document.body.innerHTML = ""; });

describe("Hierarchy: accessors & queries", () => {
    it("childHandler defaults to element; can be overridden", () => {
        const node = div({id: "h-1"});
        const sel = $(node);

        expect(sel.childHandler).toBe(node);

        const frag = document.createDocumentFragment();
        sel.childHandler = frag as unknown as Node;
        expect(sel.childHandler).toBe(frag);
    });

    it("childNodesArray / childrenArray reflect current children", () => {
        const parent = div({id: "h-2"});
        const t = document.createTextNode("x");
        const a = document.createElement("a");
        parent.appendChild(t);
        parent.appendChild(a);

        const sel = $(parent);
        expect(sel.childNodesArray.length).toBe(2);
        expect(sel.childrenArray.length).toBe(1);
        expect(sel.childrenArray[0]).toBe(a);
    });

    it("siblingNodes / siblings include self and match parent lists", () => {
        const p = div({id: "h-3-parent"});
        const a = div();
        const b = span();
        const t = document.createTextNode("x");
        p.appendChild(a);
        p.appendChild(t);
        p.appendChild(b);

        expect($(a).siblingNodes).toEqual($(p).childNodesArray);
        expect($(a).siblings).toEqual($(p).childrenArray);
    });

    it("childAt supports negatives and clamps overflow", () => {
        const p = div({id: "h-4"});
        const c1 = div();
        const c2 = div();
        const c3 = div();
        p.append(c1, c2, c3);

        expect($(p).childAt(0)).toBe(c1);
        expect($(p).childAt(5)).toBe(c3);
        expect($(p).childAt(-1)).toBe(c3);
        expect($(p).childAt(-4)).toBe(c3);
    });

    it("indexOfChild finds correct index in childrenArray", () => {
        const p = div({id: "h-5"});
        const c1 = div();
        const c2 = div();
        p.append(c1, c2);

        expect($(p).indexOfChild(c1)).toBe(0);
        expect($(p).indexOfChild(c2)).toBe(1);
        expect($(p).indexOfChild(div())).toBe(-1);
    });

    it("hasChild works with single node and arrays", () => {
        const p = div({id: "h-6"});
        const c1 = div();
        const c2 = span();
        p.append(c1, c2);

        expect($(p).hasChild(c1)).toBe(true);
        expect($(p).hasChild([c1, c2])).toBe(true);
        expect($(p).hasChild([c1, element({tag: "i"})])).toBe(false);
    });

    it("closest by selector and by constructor", () => {
        const outer = element({tag: "section"});
        const inner = div();
        const leaf = span();
        document.body.appendChild(outer);
        outer.appendChild(inner);
        inner.appendChild(leaf);

        expect($(leaf).closest("section")).toBe(outer);
        expect($(leaf).closest(HTMLDivElement)).toBe(inner);
        expect($(leaf).closest("header")).toBeNull();
    });

    it("findInParents returns true if all provided parents are in the chain", () => {
        const a = div();
        const b = div();
        const c = div();
        a.appendChild(b);
        b.appendChild(c);

        expect($(c).findInParents(a)).toBe(true);
        expect($(c).findInParents([a, b])).toBe(true);
        expect($(c).findInParents([a, div()])).toBe(false);
    });

    it("findInSubTree checks membership in subtree (any depth)", () => {
        const root = div({id: "h-9"});
        const mid = div();
        const leaf1 = element({tag: "em"});
        const leaf2 = element({tag: "strong"});
        root.appendChild(mid);
        mid.append(leaf1, leaf2);

        expect($(root).findInSubTree(leaf1)).toBe(true);
        expect($(root).findInSubTree([leaf1, leaf2])).toBe(true);
        expect($(mid).findInSubTree(root)).toBe(false);
    });

    it("indexInParent returns index among siblings (elements)", () => {
        const p = div({id: "h-10"});
        const a = document.createElement("div");
        const b = document.createElement("div");
        const c = document.createElement("div");
        p.append(a, b, c);

        expect($(a).indexInParent()).toBe(0);
        expect($(b).indexInParent()).toBe(1);
        expect($(c).indexInParent()).toBe(2);
    });
});
