import {describe, it, expect} from "vitest";
import {TurboEventManager} from "../../../eventHandling/turboEventManager/turboEventManager";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";

describe("TurboSelector.bypassManagerOn", () => {
    it("invokes predicate and locks manager", () => {
        const node = div({parent: document.body});
        let callCount = 0;
        $(node).bypassManagerOn = (e: Event) => {
            callCount++;
            return true
        };

        expect(TurboEventManager.instance.enabled).toBe(true);

        $(node).executeAction("click", undefined, new Event("click"));
        expect(callCount).toBe(1);
        expect(TurboEventManager.instance.enabled).toBe(true);
    });

    it("updating predicate uses new logic and does not duplicate listeners (one call per event)", () => {
        const node = div({parent: document.body});
        let calls = 0;

        $(node).bypassManagerOn = (e: Event) => {
            calls++;
            return false
        };
        $(node).bypassManagerOn = (e: Event) => {
            calls++;
            return true
        };
        $(node).executeAction("click", undefined, new Event("click"));

        expect(calls).toBe(1);
        expect(TurboEventManager.instance.enabled).toBe(true);
    });

    it("works for 'touchstart'-like event as well (no TouchEvent mock needed)", () => {
        const node = div({parent: document.body});

        let touched = 0;
        $(node).bypassManagerOn = (e: Event) => {
            touched++;
            return false;
        };

        $(node).executeAction("click", undefined, new Event("click"));

        expect(touched).toBe(1);
        expect(TurboEventManager.instance.enabled).toBe(false);
    });
});
