import {describe, it, expect} from "vitest";
import {flexCol, flexColCenter, flexRow, flexRowCenter, spacer} from "../flexElements";

describe("flex elements", () => {
    it("flexCol: creates an element with display:flex; flexDirection:column", () => {
        const el = flexCol();
        expect(el).toBeInstanceOf(HTMLElement);
        expect(el.style.display).toBe("flex");
        expect(el.style.flexDirection).toBe("column");
    });

    it("flexCol: respects explicit tag via properties", () => {
        const el = flexCol({tag: "section"} as any);
        expect(el.tagName).toBe("SECTION");
        expect(el.style.display).toBe("flex");
        expect(el.style.flexDirection).toBe("column");
    });

    it("flexColCenter: adds center alignment on top of flex column", () => {
        const el = flexColCenter();
        expect(el.style.display).toBe("flex");
        expect(el.style.flexDirection).toBe("column");
        expect(el.style.justifyContent).toBe("center");
        expect(el.style.alignItems).toBe("center");
    });

    it("flexRow: creates an element with display:flex; flexDirection:row", () => {
        const el = flexRow();
        expect(el.style.display).toBe("flex");
        expect(el.style.flexDirection).toBe("row");
    });

    it("flexRowCenter: adds center alignment on top of flex row", () => {
        const el = flexRowCenter();
        expect(el.style.display).toBe("flex");
        expect(el.style.flexDirection).toBe("row");
        expect(el.style.justifyContent).toBe("center");
        expect(el.style.alignItems).toBe("center");
    });

    it("spacer: sets flexGrow = 1", () => {
        const el = spacer();
        expect(el.style.flexGrow).toBe("1");
    });

    it("plays nice with initial style provided in properties", () => {
        const el = flexRow({tag: "div", style: "background:red"} as any);
        expect(el.style.display).toBe("flex");
        expect(el.style.flexDirection).toBe("row");
        expect(el.style.background).toBe("red");
    });
});