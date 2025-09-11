import {describe, it, expect, beforeEach} from "vitest";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";

beforeEach(() => { document.body.innerHTML = ""; });

describe("Class methods on TurboSelector", () => {
    it("addClass accepts string with spaces and adds all tokens", () => {
        const node = div({id: "c-1"});
        $(node).addClass("foo  bar   baz");
        expect(node.classList.contains("foo")).toBe(true);
        expect(node.classList.contains("bar")).toBe(true);
        expect(node.classList.contains("baz")).toBe(true);
    });

    it("addClass accepts array of strings", () => {
        const node = div({id: "c-2"});
        $(node).addClass(["x", "y", "z"]);
        expect(node.classList.contains("x")).toBe(true);
        expect(node.classList.contains("y")).toBe(true);
        expect(node.classList.contains("z")).toBe(true);
    });

    it("removeClass removes provided tokens", () => {
        const node = div({id: "c-3"});
        node.className = "x y z";
        $(node).removeClass("y z");
        expect(node.classList.contains("x")).toBe(true);
        expect(node.classList.contains("y")).toBe(false);
        expect(node.classList.contains("z")).toBe(false);
    });

    it("toggleClass with no force toggles membership", () => {
        const node = div({id: "c-4"});
        $(node).toggleClass("foo");
        expect(node.classList.contains("foo")).toBe(true);
        $(node).toggleClass("foo");
        expect(node.classList.contains("foo")).toBe(false);
    });

    it("toggleClass with force=true only adds; with force=false only removes", () => {
        const node = div({id: "c-5"});
        $(node).toggleClass("k", true);
        expect(node.classList.contains("k")).toBe(true);

        $(node).toggleClass("k", true);
        expect(node.classList.contains("k")).toBe(true);

        $(node).toggleClass("k", false);
        expect(node.classList.contains("k")).toBe(false);

        $(node).toggleClass("k", false);
        expect(node.classList.contains("k")).toBe(false);
    });

    it("hasClass returns true for single token and for arrays only if *all* present", () => {
        const node = div({id: "c-6"});
        node.className = "a b";
        expect($(node).hasClass("a")).toBe(true);
        expect($(node).hasClass("c")).toBe(false);
        expect($(node).hasClass(["a", "b"])).toBe(true);
        expect($(node).hasClass(["a", "c"])).toBe(false);
    });

    it("add/remove/toggle return the selector for chaining", () => {
        const node = div({id: "c-7"});
        const sel = $(node);
        const ret1 = sel.addClass("a");
        const ret2 = sel.removeClass("a");
        const ret3 = sel.toggleClass("b");
        expect(ret1.element).toBe(node);
        expect(ret2.element).toBe(node);
        expect(ret3.element).toBe(node);
    });

    it("methods are no-ops on non-Element nodes", () => {
        const text = document.createTextNode("hello");
        const sel = $(text);
        sel.addClass("a").removeClass("a").toggleClass("a");
        expect($(text).hasClass("a")).toBe(false);
    });

    it("addClass with undefined/null does nothing and does not throw", () => {
        const node = div({id: "c-8"});
        $(node).addClass(undefined);
        $(node).addClass(null);
        expect(node.className).toBe("");
    });
});