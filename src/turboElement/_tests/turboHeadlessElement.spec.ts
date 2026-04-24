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
});