import {describe, it, expect} from "vitest";
import {$} from "../../turboFunctions";
import {ClassFunctionsUtils} from "../class.utils";
import {div} from "../../../elementCreation/basicElements";

const utils = new ClassFunctionsUtils();

describe("ClassFunctionsUtils.operateOnClasses", () => {
    it("splits a string by spaces, trims blanks, and calls the callback for each token", () => {
        const sel = $(div({parent: document.body}));
        const tokens: string[] = [];
        utils.operateOnClasses(sel, " a   b   c  ", (t) => tokens.push(t));
        expect(tokens).toEqual(["a", "b", "c"]);
    });

    it("accepts an array and ignores empty/whitespace tokens", () => {
        const sel = $(div({parent: document.body}));
        const tokens: string[] = [];
        utils.operateOnClasses(sel, ["x", " ", "", "y"], (t) => tokens.push(t));
        expect(tokens).toEqual(["x", "y"]);
    });

    it("returns the same selector and is safe on undefined classes", () => {
        const sel = $(div({parent: document.body}));
        const ret = utils.operateOnClasses(sel, undefined as any, () => {});
        expect(ret).toBe(sel);
    });

    it("is a no-op if selector has no element", () => {
        const fake: any = {element: null};
        const ret = utils.operateOnClasses(fake, "a b", () => {});
        expect(ret).toBe(fake);
    });
});