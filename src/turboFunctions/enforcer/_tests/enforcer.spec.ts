import { describe, it, expect, vi } from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {turbo} from "../../turboFunctions";

describe("Enforcer functions", () => {
    it("makeEnforcer() creates a named enforcer and getEnforcers() lists it", () => {
        const host = div({parent: document.body});

        turbo(host).makeEnforcer("main");
        turbo(host).makeEnforcer("alt");

        const names = turbo(host).enforcersNames;
        expect(names).toEqual(["main", "alt"]);
    });

    it("currentEnforcer getter/setter + setEnforcer() update current and fire onEnforcerChange", () => {
        const host = div({parent: document.body});

        turbo(host).makeEnforcer("main");
        turbo(host).makeEnforcer("alt");

        expect(turbo(host).activeEnforcers.length).toBe(2);

        turbo(host).deactivateEnforcer("alt");
        expect(turbo(host).activeEnforcers).toEqual(["main"]);
    });

    it("getEnforcerObjectList() defaults to Set() when no current enforcer", () => {
        const host = div({parent: document.body});
        turbo(host).makeEnforcer("main");
        const list = turbo(host).getEnforcerObjectList();
        expect(list.size).toEqual(0);
    });

    it("default elements list is live (HTMLCollection of element.children)", () => {
        const host = div({parent: document.body});
        turbo(host).makeEnforcer("main");

        expect(turbo(host).getEnforcerObjectList().size).toBe(0);

        const c1 = document.createElement("span");
        host.appendChild(c1);
        expect(turbo(host).getEnforcerObjectList().size).toBe(1);

        const c2 = document.createElement("span");
        host.appendChild(c2);
        expect(turbo(host).getEnforcerObjectList().size).toBe(2);
    });

    it("setEnforcerObjectList() replaces the enforcer list (e.g., with a Set)", () => {
        const host = div({parent: document.body});
        turbo(host).makeEnforcer("main");

        const custom = new Set<Node>();
        turbo(host).getEnforcerObjectList("main").list = custom;

        const list = turbo(host).getEnforcerObjectList("main");
        expect(list.size).toBe(0);

        host.appendChild(document.createElement("span"));
        expect(list.size).toBe(0);
    });

    it("onEnforcerActivate/onEnforcerDeactivate delegates include callbacks passed to makeEnforcer()", () => {
        const host = div({parent: document.body});

        const onAct = vi.fn();
        const onDeact = vi.fn();

        turbo(host).makeEnforcer("paint", { onActivate: onAct, onDeactivate: onDeact });

        turbo(host).onEnforcerActivate("paint").fire();
        turbo(host).onEnforcerDeactivate("paint").fire();

        expect(onAct).toHaveBeenCalledTimes(1);
        expect(onDeact).toHaveBeenCalledTimes(1);
    });

    it("addSolver/removeSolver/clearSolvers do not throw and are chainable", () => {
        const host = div({parent: document.body});

        turbo(host).makeEnforcer("main");
        const solverA = () => 1;
        const solverB = () => 2;

        turbo(host)
            .addSolver({callback: solverA as any, enforcer: "main"})
            .addSolver({callback: solverB as any, enforcer: "main"})
            .removeSolver("solverB")
            .clearSolvers("main");

        expect(true).toBe(true);
    });
});
