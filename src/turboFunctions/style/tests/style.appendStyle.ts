import {beforeEach, describe, expect, it} from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {$} from "../../turboFunctions";

beforeEach(() => document.body.innerHTML = "");

describe("Style: appendStyle", () => {
    it("appends with default separator ', ' when there is an existing value", () => {
        const el = div({parent: document.body});

        $(el).appendStyle("fontFamily", "A", ", ", true);
        expect(el.style.fontFamily).toBe("A");

        $(el).appendStyle("fontFamily", "B", ", ", true);
        expect(el.style.fontFamily).toBe("A, B");
    });

    it("uses custom separator and omits it when starting from empty", () => {
        const el = div({parent: document.body});

        $(el).appendStyle("transform", "translateX(10px)", " ", true);
        expect(el.style.transform).toBe("translateX(10px)");

        $(el).appendStyle("transform", "scale(2)", " ", true);
        expect(el.style.transform).toBe("translateX(10px) scale(2)");
    });
});