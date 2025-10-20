import { describe, it, expect, vi } from "vitest";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";

describe("preventDefault + removeAllListeners", () => {
    it("preventDefault adds handlers that call preventDefault", () => {
        const node = div({id: "pd"});

        $(node).preventDefault({types: ["click"]});

        const ev = new Event("click", {bubbles: true, cancelable: true});
        const consumed = $(node).executeAction("click", undefined, ev);

        expect(consumed).toBe(true);
        expect(ev.defaultPrevented).toBe(true);
    });

    it("removeAllListeners clears both bound and preventDefault handlers", () => {
        const node = div({id: "rm"});

        const generic = vi.fn().mockReturnValue(true);
        $(node).on("click", generic);
        $(node).preventDefault({types: ["click"]});

        let ev = new Event("click", { bubbles: true, cancelable: true });
        $(node).executeAction("click", undefined as any, ev);
        expect(ev.defaultPrevented).toBe(true);
        expect(generic).toHaveBeenCalledTimes(1);

        $(node).removeAllListeners();

        ev = new Event("click", { bubbles: true, cancelable: true });
        const consumed = $(node).executeAction("click", undefined, ev);
        expect(consumed).toBe(false);
        expect(ev.defaultPrevented).toBe(false);
    });
});
