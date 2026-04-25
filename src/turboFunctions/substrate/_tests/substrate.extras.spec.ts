import {describe, it, expect, vi} from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {turbo} from "../../turboFunctions";

describe("Substrate functions – extras", () => {
    it("addObjectToSubstrate / removeObjectFromSubstrate with Set", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");

        const objectList = turbo(host).getSubstrateObjectList("main");

        const a = {id: "a"};
        const b = {id: "b"};

        // add
        objectList.add(a, a, b);
        expect(objectList.size).toBe(2);

        // has
        expect(objectList.has(a)).toBe(true);
        expect(objectList.has({id: "z"})).toBe(false);

        // remove
        objectList.remove(a);
        expect(objectList.size).toBe(1);
    });

    it("hasObjectInSubstrate works for HTMLCollection and NodeList", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");

        // HTMLCollection (children)
        const span = document.createElement("span");
        host.appendChild(span);
        const objectList = turbo(host).getSubstrateObjectList("main");
        expect(objectList.has(span)).toBe(true);

        // NodeList (childNodes)
        const txt = document.createTextNode("x");
        objectList.list = host.childNodes;
        host.appendChild(txt);
        expect(objectList.has(txt)).toBe(true);
    });

    it("wasObjectProcessedBySubstrate changes after resolveSubstrate", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");

        const objectList = turbo(host).getSubstrateObjectList("main");
        const a = {id: "a"};
        objectList.add(a);

        const solver = vi.fn();
        turbo(host).addSolver({callback: solver});

        expect(turbo(host).getObjectPassesForSubstrate(a, "main")).toBe(0);

        turbo(host).solveSubstrate(); // processes 'a'

        expect(solver).toHaveBeenCalledTimes(1);
        expect(turbo(host).getObjectPassesForSubstrate(a, "main")).toBe(1);
    });

    it("resolveSubstrate processes all items in a Set and honors eventTarget first", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");

        const objectList = turbo(host).getSubstrateObjectList("main");
        const a = {id: "a"};
        const b = {id: "b"};
        objectList.add(a, b);

        const calls: any[] = [];
        const solver = vi.fn((props) => calls.push(props.target));
        turbo(host).addSolver({callback: solver as any});

        turbo(host).solveSubstrate({eventTarget: b as any});

        expect(calls.length).toBe(2);
        // First call should be eventTarget
        expect(calls[0]).toBe(b);
        expect(new Set(calls)).toEqual(new Set([a, b]));
    });

    it("resolveSubstrate picks up items added during the same pass (Set)", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");

        const objectList = turbo(host).getSubstrateObjectList("main");
        const a = {id: "a"};
        const b = {id: "b"};
        const c = {id: "c"};
        objectList.add(a, b);

        const seen: object[] = [];
        const solver = vi.fn((props: any) => {
            seen.push(props.target);
            objectList.add(c);
        });
        turbo(host).addSolver({callback: solver, substrate: "main"});
        turbo(host).solveSubstrate();

        expect(new Set(seen)).toEqual(new Set([a, b, c]));
        expect(solver).toHaveBeenCalledTimes(3);
    });

    it("resolveSubstrate with default HTMLCollection processes existing and newly appended children", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");

        // default: objects = host.children (HTMLCollection)
        const s1 = document.createElement("span");
        const s2 = document.createElement("span");
        host.appendChild(s1);
        host.appendChild(s2);

        const processed: Element[] = [];
        const solver = vi.fn((props: any) => {
            processed.push(props.target as Element);
            // On first call, append another element (live list should include it later)
            if (processed.length === 1) {
                const s3 = document.createElement("span");
                host.appendChild(s3);
                turbo(host).getSubstrateQueue().push(s3);
            }
        });
        turbo(host).addSolver({callback: solver});

        turbo(host).solveSubstrate();

        // Should have processed s1, s2, and s3
        expect(processed.length).toBe(3);
        expect(host.children.length).toBe(3);
    });
});