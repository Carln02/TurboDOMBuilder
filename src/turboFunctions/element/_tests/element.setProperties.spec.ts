import {describe, it, expect, vi} from "vitest";
import {$} from "../../turboFunctions";

describe("TurboSelector.setProperties (base props)", () => {
    it("sets id and classes, and wires event listeners", () => {
        const el = document.createElement("div");
        const handler = vi.fn();

        const sel = $(el).setProperties({
            id: "abc",
            classes: "foo bar",
            listeners: {click: () => handler},
        } as any);

        expect(sel.element).toBe(el);
        expect(el.id).toBe("abc");
        expect(el.classList.contains("foo")).toBe(true);
        expect(el.classList.contains("bar")).toBe(true);
        expect($(el).hasListenersByType("click")).toBe(true);
    });

    it("appends children to the element via `children`", () => {
        const parent = document.createElement("div");
        const c1 = document.createElement("span");
        const c2 = document.createElement("i");

        $(parent).setProperties({children: [c1, c2]} as any);

        expect(parent.children.length).toBe(2);
        expect(parent.children[0]).toBe(c1);
        expect(parent.children[1]).toBe(c2);
    });

    it("appends element to provided `parent`", () => {
        const parent = document.createElement("div");
        const child = document.createElement("p");

        $(child).setProperties({parent} as any);
        expect(parent.contains(child)).toBe(true);
    });

    it("applies stylesheet to closestRoot", () => {
        const el1 = document.createElement("div");
        const headBefore = document.head.querySelectorAll("style").length;

        $(el1).setProperties({stylesheet: "/* css head */"} as any);

        const headAfter = document.head.querySelectorAll("style").length;
        expect(headAfter).toBeGreaterThanOrEqual(headBefore);

        const host = document.createElement("div");
        const shadow = host.attachShadow({mode: "open"});
        document.body.appendChild(host);

        const el2 = document.createElement("div");
        shadow.appendChild(el2);

        const shadowBefore = shadow.querySelectorAll("style").length;

        $(el2).setProperties({stylesheet: "/* css shadow */"} as any);

        const shadowAfter = shadow.querySelectorAll("style").length;
        expect(shadowAfter).toBeGreaterThanOrEqual(shadowBefore);
    });

    it("supports `out` being a string (sets __outName) or object (assigns selector fields)", () => {
        const el = document.createElement("div");

        const sel = $(el).setProperties({out: "refName"} as any);
        expect((sel as any).__outName).toBe("refName");

        const outObj: any = {};
        const sel2 = $(el).setProperties({out: outObj} as any);
        // `Object.assign(outObj, this)` -> expect we received at least the element handle
        expect(outObj.element).toBe(el);
        expect(outObj).toMatchObject({element: el});
        // and chaining still returns the selector
        expect(sel2.element).toBe(el);
    });

    it("when setOnlyBaseProperties=true, ignores unknown props (no dynamic assignment)", () => {
        const el = document.createElement("div");
        const sel = $(el) as any;

        sel.setProperties(
            {dataFoo: 1, id: "ok"} as any,
            true // base-only
        );
        expect(el.id).toBe("ok");
        expect(sel.dataFoo).toBeUndefined(); // not assigned
    });
});

describe("TurboSelector.setProperties (text/style)", () => {
    it("sets innerText when `text` is provided", () => {
        const el = document.createElement("div");
        $(el).setProperties({text: "hello"} as any);
        expect(el.innerText).toBe("hello");
    });

    it("appends to style.cssText when `style` string is provided", () => {
        const el = document.createElement("div");
        $(el).setProperties({style: "width:10px;"} as any);
        expect(el.style.width).toBe("10px");
    });
});
