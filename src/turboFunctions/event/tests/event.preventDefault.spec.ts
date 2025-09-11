import { describe, it, expect, beforeEach, vi } from "vitest";
import {$} from "../../turboFunctions";
import {ManagerStub} from "../../../setup.vitest";
import {div} from "../../../elementCreation/basicElements";

beforeEach(() => document.body.innerHTML = "");

describe("preventDefault + removeAllListeners", () => {
    it("preventDefault adds handlers that call preventDefault", () => {
        const manager = new ManagerStub() as any;
        const node = div({id: "pd"});

        $(node).preventDefault({
            types: ["click"],
            manager: manager
        });

        const ev = new Event("click", {bubbles: true, cancelable: true});
        const consumed = $(node).executeAction("click", undefined, ev, undefined, manager);

        expect(consumed).toBe(true);
        expect(ev.defaultPrevented).toBe(true);
    });

    it("removeAllListeners clears both bound and preventDefault handlers", () => {
        const manager = new ManagerStub() as any;
        const node = div({id: "rm"});

        const generic = vi.fn().mockReturnValue(true);
        $(node).on("click", generic, {}, manager);
        $(node).preventDefault({
            types: ["click"],
            manager: manager
        });

        let ev = new Event("click", { bubbles: true, cancelable: true });
        $(node).executeAction("click", undefined as any, ev, {}, manager as any);
        expect(ev.defaultPrevented).toBe(true);
        expect(generic).toHaveBeenCalledTimes(1);

        $(node).removeAllListeners(manager as any);

        ev = new Event("click", { bubbles: true, cancelable: true });
        const consumed = $(node).executeAction("click", undefined, ev, undefined, manager);
        expect(consumed).toBe(false);
        expect(ev.defaultPrevented).toBe(false);
    });
});
