import { describe, it, expect, vi } from "vitest";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";

describe("Substrate functions", () => {
    it("makeSubstrate() creates a named substrate and getSubstrates() lists it", () => {
        const host = div({parent: document.body});

        $(host).makeSubstrate("main");
        $(host).makeSubstrate("alt");

        const names = $(host).substrates;
        expect(names).toEqual(["main", "alt"]);
    });

    it("currentSubstrate getter/setter + setSubstrate() update current and fire onSubstrateChange", () => {
        const host = div({parent: document.body});

        $(host).makeSubstrate("main");
        $(host).makeSubstrate("alt");

        const seen: Array<{ prev: string | undefined; next: string }> = [];
        $(host).onSubstrateChange.add((prev, next) => seen.push({ prev, next }));
        expect($(host).currentSubstrate).toBe("main");

        $(host).currentSubstrate = "alt";
        expect($(host).currentSubstrate).toBe("alt");
        expect(seen[0]).toEqual({ prev: "main", next: "alt" });
    });

    it("getSubstrateObjectList() defaults to Set() when no current substrate", () => {
        const host = div({parent: document.body});

        $(host).makeSubstrate("main");
        const list = $(host).getSubstrateObjectList();
        expect(list).toEqual(new Set());
    });

    it("default elements list is live (HTMLCollection of element.children)", () => {
        const host = div({parent: document.body});
        $(host).makeSubstrate("main");

        expect($(host).getSubstrateObjectList().size).toBe(0);

        const c1 = document.createElement("span");
        host.appendChild(c1);
        expect($(host).getSubstrateObjectList().size).toBe(1);

        const c2 = document.createElement("span");
        host.appendChild(c2);
        expect($(host).getSubstrateObjectList().size).toBe(2);
    });

    it("setSubstrateObjectList() replaces the substrate list (e.g., with a Set)", () => {
        const host = div({parent: document.body});
        $(host).makeSubstrate("main");

        const custom = new Set<Node>();
        $(host).setSubstrateObjectList(custom, "main");

        const list = $(host).getSubstrateObjectList("main");
        expect(list).toEqual(custom);
        expect(list.size).toBe(0);

        host.appendChild(document.createElement("span"));
        expect(list.size).toBe(0);
    });

    it("onSubstrateActivate/onSubstrateDeactivate delegates include callbacks passed to makeSubstrate()", () => {
        const host = div({parent: document.body});

        const onAct = vi.fn();
        const onDeact = vi.fn();

        $(host).makeSubstrate("paint", { onActivate: onAct, onDeactivate: onDeact });

        $(host).onSubstrateActivate("paint").fire();
        $(host).onSubstrateDeactivate("paint").fire();

        expect(onAct).toHaveBeenCalledTimes(1);
        expect(onDeact).toHaveBeenCalledTimes(1);
    });

    it("addSolver/removeSolver/clearSolvers do not throw and are chainable", () => {
        const host = div({parent: document.body});

        $(host).makeSubstrate("main");
        const solverA = () => 1;
        const solverB = () => 2;

        $(host)
            .addSolver(solverA, "main")
            .addSolver(solverB, "main")
            .removeSolver(solverA, "main")
            .clearSolvers("main");

        expect(true).toBe(true);
    });
});
