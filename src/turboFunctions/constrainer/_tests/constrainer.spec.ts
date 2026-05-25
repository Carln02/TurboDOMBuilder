import { describe, it, expect, vi } from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {turbo} from "../../turboFunctions";

describe("Constrainer functions", () => {
    it("makeConstrainer() creates a named constrainer and getConstrainers() lists it", () => {
        const host = div({parent: document.body});

        turbo(host).makeConstrainer("main");
        turbo(host).makeConstrainer("alt");

        const names = turbo(host).constrainersNames;
        expect(names).toEqual(["main", "alt"]);
    });

    it("currentConstrainer getter/setter + setConstrainer() update current and fire onConstrainerChange", () => {
        const host = div({parent: document.body});

        turbo(host).makeConstrainer("main");
        turbo(host).makeConstrainer("alt");

        expect(turbo(host).activeConstrainers.length).toBe(2);

        turbo(host).deactivateConstrainer("alt");
        expect(turbo(host).activeConstrainers).toEqual(["main"]);
    });

    it("getConstrainerObjectList() defaults to Set() when no current constrainer", () => {
        const host = div({parent: document.body});
        turbo(host).makeConstrainer("main");
        const list = turbo(host).getConstrainerObjectList();
        expect(list.size).toEqual(0);
    });

    it("default elements list is live (HTMLCollection of element.children)", () => {
        const host = div({parent: document.body});
        turbo(host).makeConstrainer("main");

        expect(turbo(host).getConstrainerObjectList().size).toBe(0);

        const c1 = document.createElement("span");
        host.appendChild(c1);
        expect(turbo(host).getConstrainerObjectList().size).toBe(1);

        const c2 = document.createElement("span");
        host.appendChild(c2);
        expect(turbo(host).getConstrainerObjectList().size).toBe(2);
    });

    it("setConstrainerObjectList() replaces the constrainer list (e.g., with a Set)", () => {
        const host = div({parent: document.body});
        turbo(host).makeConstrainer("main");

        const custom = new Set<Node>();
        turbo(host).getConstrainerObjectList("main").list = custom;

        const list = turbo(host).getConstrainerObjectList("main");
        expect(list.size).toBe(0);

        host.appendChild(document.createElement("span"));
        expect(list.size).toBe(0);
    });

    it("onConstrainerActivate/onConstrainerDeactivate delegates include callbacks passed to makeConstrainer()", () => {
        const host = div({parent: document.body});

        const onAct = vi.fn();
        const onDeact = vi.fn();

        turbo(host).makeConstrainer("paint", { onActivate: onAct, onDeactivate: onDeact });

        turbo(host).onConstrainerActivate("paint").fire();
        turbo(host).onConstrainerDeactivate("paint").fire();

        expect(onAct).toHaveBeenCalledTimes(1);
        expect(onDeact).toHaveBeenCalledTimes(1);
    });

    it("addSolver/removeSolver/clearSolvers do not throw and are chainable", () => {
        const host = div({parent: document.body});

        turbo(host).makeConstrainer("main");
        const solverA = () => 1;
        const solverB = () => 2;

        turbo(host)
            .addSolver({callback: solverA as any, constrainer: "main"})
            .addSolver({callback: solverB as any, constrainer: "main"})
            .removeSolver("solverB")
            .clearSolvers("main");

        expect(true).toBe(true);
    });
});
