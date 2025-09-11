import {describe, it, expect, vi, beforeEach} from "vitest";
import {$} from "../../turboFunctions";
import {ManagerStub} from "../../../setup.vitest";
import {div} from "../../../elementCreation/basicElements";

beforeEach(() => (document.body.innerHTML = ""));

describe("Tool: activation", () => {
    it("default activation wires a generic listener that calls manager.setTool(toolName)", () => {
        const mgr = new ManagerStub() as any;
        const host = div({id: "act-1"});

        const setToolSpy = vi.spyOn(mgr as any, "setTool");

        $(host).makeTool("brush", {manager: mgr});
        $(host).executeAction("click", undefined as any, new Event("x"), {}, mgr);

        expect(setToolSpy).toHaveBeenCalledWith("brush", expect.anything()); // clickMode param may be passed
    });

    it("custom activation via options.activateOn is invoked immediately with (selector, manager)", () => {
        const mgr = new ManagerStub() as any;
        const host = div({id: "act-2"});

        const activate = vi.fn();
        $(host).makeTool("brush", {manager: mgr, activateOn: activate});

        expect(activate).toHaveBeenCalledTimes(1);
        const [selArg, mgrArg] = activate.mock.calls[0];

        expect(selArg).toHaveProperty("element", host);
        expect(mgrArg).toBe(mgr);
    });
});
