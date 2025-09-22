import {describe, it, expect} from "vitest";
import {observe} from "../observe";
import {define} from "../define/define";
import {TurboElement} from "../../turboElement/turboElement";

describe("@observe", () => {
    it("reflects a field to an attribute + publishes observedAttributes", () => {
        @define("obs-x")
        class X extends TurboElement {
            @observe fooBar = 10;
        }

        expect((X as any).observedAttributes).toEqual(["foo-bar"]);

        const el = new X();
        document.body.appendChild(el);

        expect(el.getAttribute("foo-bar")).toBe("10");
        el.fooBar = 42;
        expect(el.getAttribute("foo-bar")).toBe("42");
        el.setAttribute("foo-bar", "67");
        expect(el.fooBar).toBe(67);
    });

    it("wraps accessors and reflects both ways", () => {
        @define("obs-y")
        class Y extends HTMLElement {
            #v = "";
            @observe get userName() { return this.#v; }
            @observe set userName(v) { this.#v = v; }
        }

        const el = new Y();
        el.userName = "Alice";
        expect(el.getAttribute("user-name")).toBe("Alice");

        el.setAttribute("user-name", "Bob");
        expect(el.userName).toBe("Bob");
    });
});
