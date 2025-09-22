import {describe, it, expect, vi} from "vitest";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";

const count = (list: HTMLCollection | NodeList | Set<object>) =>
    "length" in list ? list.length : (list as Set<object>).size;

describe("Substrate functions – extras", () => {
    it("addObjectToSubstrate / removeObjectFromSubstrate with Set", () => {
        const host = div({parent: document.body});

        $(host).makeSubstrate("main");
        $(host).setSubstrate("main");

        const set = new Set<object>();
        $(host).setSubstrateObjectList(set, "main");

        const a = {id: "a"};
        const b = {id: "b"};

        // add
        expect($(host).addObjectToSubstrate(a, "main")).toBe(true);
        expect($(host).addObjectToSubstrate(a, "main")).toBe(false); // duplicate
        expect($(host).addObjectToSubstrate(b, "main")).toBe(true);
        expect(count($(host).getSubstrateObjectList("main"))).toBe(2);

        // has
        expect($(host).hasObjectInSubstrate(a, "main")).toBe(true);
        expect($(host).hasObjectInSubstrate({id: "z"}, "main")).toBe(false);

        // remove
        expect($(host).removeObjectFromSubstrate(a, "main")).toBe(true);
        expect($(host).removeObjectFromSubstrate(a, "main")).toBe(false); // already gone
        expect(count($(host).getSubstrateObjectList("main"))).toBe(1);
    });

    it("addObjectToSubstrate / removeObjectFromSubstrate return false for HTMLCollection/NodeList", () => {
        const host = div({parent: document.body});

        $(host).makeSubstrate("main");
        $(host).setSubstrate("main");

        // default objects list for an Element substrate is a live HTMLCollection (children)
        const obj = {k: 1};
        expect($(host).addObjectToSubstrate(obj, "main")).toBe(false);
        expect($(host).removeObjectFromSubstrate(obj, "main")).toBe(false);

        // Force NodeList (childNodes)
        $(host).setSubstrateObjectList(host.childNodes, "main");
        expect($(host).addObjectToSubstrate(obj, "main")).toBe(false);
        expect($(host).removeObjectFromSubstrate(obj, "main")).toBe(false);
    });

    it("hasObjectInSubstrate works for HTMLCollection and NodeList", () => {
        const host = div({parent: document.body});

        $(host).makeSubstrate("main");
        $(host).setSubstrate("main");

        // HTMLCollection (children)
        const span = document.createElement("span");
        host.appendChild(span);
        expect($(host).hasObjectInSubstrate(span, "main")).toBe(true);

        // NodeList (childNodes)
        const txt = document.createTextNode("x");
        $(host).setSubstrateObjectList(host.childNodes, "main");
        host.appendChild(txt);
        expect($(host).hasObjectInSubstrate(txt, "main")).toBe(true);
    });

    it("wasObjectProcessedBySubstrate changes after resolveSubstrate", () => {
        const host = div({parent: document.body});

        $(host).makeSubstrate("main");
        $(host).setSubstrate("main");

        const set = new Set<object>();
        const a = {id: "a"};
        set.add(a);
        $(host).setSubstrateObjectList(set, "main");

        const solver = vi.fn();
        $(host).addSolver(solver, "main");

        expect($(host).wasObjectProcessedBySubstrate(a, "main")).toBe(false);

        $(host).resolveSubstrate(); // processes 'a'

        expect(solver).toHaveBeenCalledTimes(1);
        expect($(host).wasObjectProcessedBySubstrate(a, "main")).toBe(true);
    });

    it("resolveSubstrate processes all items in a Set and honors eventTarget first", () => {
        const host = div({parent: document.body});

        $(host).makeSubstrate("main");
        $(host).setSubstrate("main");

        const set = new Set<object>();
        const a = {id: "a"};
        const b = {id: "b"};
        set.add(a);
        set.add(b);
        $(host).setSubstrateObjectList(set, "main");

        const calls: any[] = [];
        const solver = vi.fn((props) => calls.push(props.target));
        $(host).addSolver(solver, "main");

        $(host).resolveSubstrate({eventTarget: b as any});

        expect(calls.length).toBe(2);
        // First call should be eventTarget
        expect(calls[0]).toBe(b);
        expect(new Set(calls)).toEqual(new Set([a, b]));
    });

    it("resolveSubstrate picks up items added during the same pass (Set)", () => {
        const host = div({parent: document.body});

        $(host).makeSubstrate("main");
        $(host).setSubstrate("main");

        const set = new Set<object>();
        const a = {id: "a"};
        const b = {id: "b"};
        const c = {id: "c"};
        set.add(a);
        set.add(b);
        $(host).setSubstrateObjectList(set, "main");

        const seen: object[] = [];
        const solver = vi.fn((props: any) => {
            seen.push(props.target);
            // When first called, add 'c' so the next iterations should pick it up
            if (!set.has(c)) set.add(c);
        });
        $(host).addSolver(solver, "main");

        $(host).resolveSubstrate();

        expect(new Set(seen)).toEqual(new Set([a, b, c]));
        expect(solver).toHaveBeenCalledTimes(3);
    });

    it("resolveSubstrate with default HTMLCollection processes existing and newly appended children", () => {
        const host = div({parent: document.body});

        $(host).makeSubstrate("main");
        $(host).setSubstrate("main");

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
            }
        });
        $(host).addSolver(solver, "main");

        $(host).resolveSubstrate();

        // Should have processed s1, s2, and s3
        expect(processed.length).toBe(3);
        expect(host.children.length).toBe(3);
    });
});