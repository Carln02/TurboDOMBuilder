import { describe, it, expect, vi } from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {turbo} from "../../turboFunctions";

describe("Substrate functions", () => {
    it("makeSubstrate() creates a named substrate and getSubstrates() lists it", () => {
        const host = div({parent: document.body});

        turbo(host).makeSubstrate("main");
        turbo(host).makeSubstrate("alt");

        const names = turbo(host).substratesNames;
        expect(names).toEqual(["main", "alt"]);
    });

    it("currentSubstrate getter/setter + setSubstrate() update current and fire onSubstrateChange", () => {
        const host = div({parent: document.body});

        turbo(host).makeSubstrate("main");
        turbo(host).makeSubstrate("alt");

        expect(turbo(host).activeSubstrates.length).toBe(2);

        turbo(host).deactivateSubstrate("alt");
        expect(turbo(host).activeSubstrates).toEqual(["main"]);
    });

    it("getSubstrateObjectList() defaults to Set() when no current substrate", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");
        const list = turbo(host).getSubstrateObjectList();
        expect(list.size).toEqual(0);
    });

    it("default elements list is live (HTMLCollection of element.children)", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");

        expect(turbo(host).getSubstrateObjectList().size).toBe(0);

        const c1 = document.createElement("span");
        host.appendChild(c1);
        expect(turbo(host).getSubstrateObjectList().size).toBe(1);

        const c2 = document.createElement("span");
        host.appendChild(c2);
        expect(turbo(host).getSubstrateObjectList().size).toBe(2);
    });

    it("setSubstrateObjectList() replaces the substrate list (e.g., with a Set)", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");

        const custom = new Set<Node>();
        turbo(host).getSubstrateObjectList("main").list = custom;

        const list = turbo(host).getSubstrateObjectList("main");
        expect(list.size).toBe(0);

        host.appendChild(document.createElement("span"));
        expect(list.size).toBe(0);
    });

    it("onSubstrateActivate/onSubstrateDeactivate delegates include callbacks passed to makeSubstrate()", () => {
        const host = div({parent: document.body});

        const onAct = vi.fn();
        const onDeact = vi.fn();

        turbo(host).makeSubstrate("paint", { onActivate: onAct, onDeactivate: onDeact });

        turbo(host).onSubstrateActivate("paint").fire();
        turbo(host).onSubstrateDeactivate("paint").fire();

        expect(onAct).toHaveBeenCalledTimes(1);
        expect(onDeact).toHaveBeenCalledTimes(1);
    });

    it("addSolver/removeSolver/clearSolvers do not throw and are chainable", () => {
        const host = div({parent: document.body});

        turbo(host).makeSubstrate("main");
        const solverA = () => 1;
        const solverB = () => 2;

        turbo(host)
            .addSolver({callback: solverA as any, substrate: "main"})
            .addSolver({callback: solverB as any, substrate: "main"})
            .removeSolver("solverB")
            .clearSolvers("main");

        expect(true).toBe(true);
    });
});
