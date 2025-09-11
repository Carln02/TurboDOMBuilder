import {describe, it, expect, beforeEach} from "vitest";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";
import {ManagerStub} from "../../../setup.vitest";

beforeEach(() => (document.body.innerHTML = ""));

describe("Tool: basics", () => {
    it("isTool is false before makeTool, true after", () => {
        const mgr = new ManagerStub() as any;
        const node = div({id: "basic-1"});

        expect($(node).isTool(mgr)).toBe(false);

        $(node).makeTool("brush", {manager: mgr});
        expect($(node).isTool(mgr)).toBe(true);
    });

    it("getToolNames / getToolName reflect what was registered", () => {
        const mgr = new ManagerStub() as any;
        const node = div({id: "basic-2"});

        $(node).makeTool("brush", {manager: mgr});
        $(node).makeTool("eraser", {manager: mgr});

        const names = $(node).getToolNames(mgr);
        expect(names).toEqual(expect.arrayContaining(["brush", "eraser"]));

        const first = $(node).getToolName(mgr);
        expect(["brush", "eraser"]).toContain(first);
    });

    it("getToolName is undefined when no tools", () => {
        const mgr = new ManagerStub() as any;
        const node = div({id: "basic-3"});
        expect($(node).getToolName(mgr)).toBeUndefined();
    });
});
