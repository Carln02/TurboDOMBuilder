import {describe, it, expect, vi} from "vitest";
import {div} from "../../../elementCreation/basicElements";
import {turbo} from "../../turboFunctions";

describe("Substrate functions – extras", () => {
    it("addObjectToSubstrate / removeObjectFromSubstrate with Set", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");

        const set = new Set<object>();
        turbo(host).setSubstrateObjectList(set, "main");

        const a = {id: "a"};
        const b = {id: "b"};

        // add
        turbo(host).addObjectToSubstrate(a);
        turbo(host).addObjectToSubstrate(a); // duplicate
        turbo(host).addObjectToSubstrate(b);
        expect(turbo(host).getSubstrateObjectList().size).toBe(2);

        // has
        expect(turbo(host).hasObjectInSubstrate(a)).toBe(true);
        expect(turbo(host).hasObjectInSubstrate({id: "z"})).toBe(false);

        // remove
        turbo(host).removeObjectFromSubstrate(a, "main");
        expect(turbo(host).getSubstrateObjectList("main").size).toBe(1);
    });

    it("hasObjectInSubstrate works for HTMLCollection and NodeList", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");

        // HTMLCollection (children)
        const span = document.createElement("span");
        host.appendChild(span);
        expect(turbo(host).hasObjectInSubstrate(span, "main")).toBe(true);

        // NodeList (childNodes)
        const txt = document.createTextNode("x");
        turbo(host).setSubstrateObjectList(host.childNodes, "main");
        host.appendChild(txt);
        expect(turbo(host).hasObjectInSubstrate(txt, "main")).toBe(true);
    });

    it("wasObjectProcessedBySubstrate changes after resolveSubstrate", () => {
        const host = div({parent: document.body});
        turbo(host).makeSubstrate("main");

        const set = new Set<object>();
        const a = {id: "a"};
        set.add(a);
        turbo(host).setSubstrateObjectList(set, "main");

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

        const set = new Set<object>();
        const a = {id: "a"};
        const b = {id: "b"};
        set.add(a);
        set.add(b);
        turbo(host).setSubstrateObjectList(set, "main");

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

        const set = new Set<object>();
        const a = {id: "a"};
        const b = {id: "b"};
        const c = {id: "c"};
        set.add(a);
        set.add(b);
        turbo(host).setSubstrateObjectList(set, "main");

        const seen: object[] = [];
        const solver = vi.fn((props: any) => {
            seen.push(props.target);
            // When first called, add 'c' so the next iterations should pick it up
            if (!turbo(host).hasObjectInSubstrate(c)) turbo(host).addObjectToSubstrate(c);
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