import {describe, it, expect} from "vitest";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";

describe("Tool: basics", () => {
    it("isTool is false before makeTool, true after", () => {
        const node = div({id: "basic-1"});

        expect($(node).isTool()).toBe(false);

        $(node).makeTool("brush");
        expect($(node).isTool()).toBe(true);
    });

    it("getToolNames / getToolName reflect what was registered", () => {
        const node = div({id: "basic-2"});

        $(node).makeTool("brush");
        $(node).makeTool("eraser");

        const names = $(node).getToolNames();
        expect(names).toEqual(expect.arrayContaining(["brush", "eraser"]));

        const first = $(node).getToolName();
        expect(["brush", "eraser"]).toContain(first);
    });

    it("getToolName is undefined when no tools", () => {
        const node = div({id: "basic-3"});
        expect($(node).getToolName()).toBeUndefined();
    });
});
