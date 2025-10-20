import {describe, it, expect} from "vitest";
import {define} from "../define/define";
import {observe} from "../observe/observe";

describe("@define", () => {
    it("registers the element and exposes observedAttributes (inferred name)", () => {
        @define()
        class SampleEl extends HTMLElement {
            @observe fooBar = 10;
        }

        const C = customElements.get("sample-el")!;
        expect(C).toBe(SampleEl);

        expect((SampleEl as any).observedAttributes).toEqual(["foo-bar"]);

        const el = new SampleEl();
        document.body.appendChild(el);

        expect(el.getAttribute("foo-bar")).toBe("10");
        el.fooBar = 42;
        expect(el.getAttribute("foo-bar")).toBe("42");
    });

    it("registers with explicit name", () => {
        @define("explicit-el")
        class ExplicitEl extends HTMLElement {
            @observe count = 1;
        }

        const C = customElements.get("explicit-el")!;
        expect(C).toBe(ExplicitEl);
        expect((ExplicitEl as any).observedAttributes).toEqual(["count"]);
    });

    it("merges observedAttributes through inheritance", () => {
        @define("base-el")
        class BaseEl extends HTMLElement {
            @observe baseProp = "x";
        }

        @define("child-el")
        class ChildEl extends BaseEl {
            @observe accessor childProp = "y";
        }

        @define("random-el")
        class RandomEl extends BaseEl {
            @observe accessor randProp = "y";
        }

        expect((BaseEl as any).observedAttributes).toEqual(["base-prop"]);
        // Child includes base + child (order is not guaranteed; compare as sets)

        const childAttrs = new Set((ChildEl as any).observedAttributes);
        expect(childAttrs).toEqual(new Set(["base-prop", "child-prop"]));
    });
});