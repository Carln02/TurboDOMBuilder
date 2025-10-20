import {describe, it, expect} from "vitest";
import {TurboHeadlessElement} from "../turboHeadlessElement/turboHeadlessElement";

describe("TurboHeadlessElement: default properties & MVC accessors", () => {
    it("selected works on headless instances (no DOM element)", () => {
        const h = new TurboHeadlessElement();

        h.selected = true;
        expect(h.selected).toBe(true);

        h.selected = false;
        expect(h.selected).toBe(false);
    });

    it("getPropertiesValue helper picks value → config → default", () => {
        const el = new TurboHeadlessElement();

        expect(el.getPropertiesValue(5, "x", 9)).toBe(5);
        (TurboHeadlessElement as any).configure({ x: 7 });
        expect(el.getPropertiesValue(undefined, "x", 9)).toBe(7);
        expect(el.getPropertiesValue(undefined, "y", 9)).toBe(9);
    });
});