import { describe, it, expect, beforeEach } from "vitest";
import {TurboEventManager} from "../../../eventHandling/turboEventManager/turboEventManager";
import {$} from "../../turboFunctions";
import {div} from "../../../elementCreation/basicElements";
import {ManagerStub} from "../../../setup.vitest";

beforeEach(() => document.body.innerHTML = "");

describe("bypassManagerOn", () => {
    it("calls manager.lock with predicate result for mousedown", () => {
        const mgr = new ManagerStub();
        TurboEventManager.allManagers = [mgr as any];

        const node = div({id: "by"});
        const ts = $(node) as any;

        const handlers: Record<string, Function> = {};
        ts.addEventListener = (type: string, fn: Function) => { handlers[type] = fn; };
        ts.bypassManagerOn = (_e: any) => true;

        const fakeEvent = new Event("mousedown") as any;
        handlers["mousedown"]?.(fakeEvent);

        expect(mgr.locks.length).toBe(1);
        expect(mgr.locks[0].props).toMatchObject({
            enabled: true,
            preventDefaultWheel: true,
            preventDefaultMouse: true,
            preventDefaultTouch: true,
        });
    });
});
