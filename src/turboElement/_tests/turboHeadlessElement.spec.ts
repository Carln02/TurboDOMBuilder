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

    it("MVC accessors proxy to internal mvc (view/model/data...)", () => {
        const el = new TurboHeadlessElement();

        (el as any).view = {v: 1};
        expect((el as any).view).toEqual({v: 1});

        (el as any).model = {m: 2};
        expect((el as any).model).toEqual({m: 2});

        (el as any).data = {d: 3};
        expect((el as any).data).toEqual({d: 3});

        (el as any).dataId = "abc";
        expect((el as any).dataId).toBe("abc");

        (el as any).dataIndex = 7;
        expect((el as any).dataIndex).toBe(7);

        void (el as any).dataSize;
    });

    it("getPropertiesValue helper picks value → config → default", () => {
        const el = new TurboHeadlessElement();

        expect(el.getPropertiesValue(5, "x", 9)).toBe(5);
        (TurboHeadlessElement as any).configure({ x: 7 });
        expect(el.getPropertiesValue(undefined, "x", 9)).toBe(7);
        expect(el.getPropertiesValue(undefined, "y", 9)).toBe(9);
    });
});