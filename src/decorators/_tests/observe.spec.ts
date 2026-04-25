import {describe, it, expect} from "vitest";
import {observe} from "../observe/observe";
import {define} from "../define/define";
import {TurboElement} from "../../turboElement/turboElement";

describe("@observe", () => {
    it("reflects a field to an attribute + publishes observedAttributes", () => {
        class X extends TurboElement {
            @observe fooBar = 10;
        }
        define(X, "obs-x")

        expect((X as any).observedAttributes).toEqual(["foo-bar"]);

        const el = X.create();
        document.body.appendChild(el);

        expect(el.getAttribute("foo-bar")).toBe("10");
        el.fooBar = 42;
        expect(el.getAttribute("foo-bar")).toBe("42");
        el.setAttribute("foo-bar", "67");
        expect(el.fooBar).toBe(67);
    });

    it("wraps accessors and reflects both ways", () => {
        class Y extends HTMLElement {
            #v = "";
            @observe public get userName() { return this.#v; }
            @observe public set userName(v) { this.#v = v; }
        }
        define(Y, "obs-y")

        const el = new Y();
        el.userName = "Alice";
        expect(el.getAttribute("user-name")).toBe("Alice");

        el.setAttribute("user-name", "Bob");
        expect(el.userName).toBe("Bob");
    });
});
